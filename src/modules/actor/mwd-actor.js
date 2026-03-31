// src/modules/actor/mwd-actor.js
// Purpose: Defines function `mitigationLabel`.
// How it fits: Describes role within src/modules or template rendering pipeline.

import { MONITOR_DEFS, TEMPLATE } from "../constants.js";
import { WeaponItem } from "../item/weapon-item.js";
import {
  computeArmorBaseMitigation,
  normalizeArmorMitigationByType,
} from "../mwd/personal-damage.js";
import { ensureCoreSkillRatings } from "../mwd/skills.js";
import {
  DERIVE_FNS,
  deriveMonitors,
  resolveDerivedSource,
} from "../mwd/derive-monitors.js";
import { evaluateActorLifeModules } from "../mwd/life-modules.js";
import {
  applyTraitMutations,
  buildEdgeTraitFacts,
  evaluateTraitPhase,
} from "../mwd/traits.js";

function mitigationLabel(mitigation = {}) {
  return Object.entries(normalizeArmorMitigationByType(mitigation))
    .filter(([, value]) => Number(value) > 0)
    .map(([key, value]) => `${key} +${value}`)
    .join(", ");
}

export class MWDActor extends Actor {
  /* -------------------------------------------- */
  /* Base & Derived Data                           */
  /* -------------------------------------------- */

  /** @override */
  prepareBaseData() {
    super.prepareBaseData();

    // Only character-like actors get skills scaffolding
    if (this.isCharacterLike()) {
      const system = this.system ?? {};
      ensureCoreSkillRatings(system);

      // Cleanup if any bad nesting already happened in-memory
      if (system.skills?.skills && typeof system.skills.skills === "object") {
        for (const [k, v] of Object.entries(system.skills.skills)) {
          system.skills[k] ??= v;
        }
        delete system.skills.skills;
      }

    }

    // Edge pools: schema hygiene only
    this._prepareEdgePoolsBase();
  }

  /** @override */
  prepareDerivedData() {
    super.prepareDerivedData();

    // Compute derived caches (no document writes)
    this._prepareEdgePoolsDerived();

    // Condition monitors derived (penalties/resistance)
    this._prepareMonitors();
    this._preparePersonalCombatDerived();
  }

  /**
   * Base-data prep for Edge pools:
   * - Ensure numeric rating/value where present
   * - Initialize value ONLY if missing/invalid (NOT if 0)
   * - Remove legacy keys (max)
   * - No clamping, no "start full" behavior
   */
  _prepareEdgePoolsBase() {
    if (this.type !== "character") return;

    const pools = this.system?.counters?.edgePools;
    if (!pools || typeof pools !== "object") return;

    for (const p of Object.values(pools)) {
      if (!p || typeof p !== "object") continue;

      // Rating is always numeric >= 0
      p.rating = Math.max(0, Number(p.rating ?? 0));

      // Value: ONLY initialize if missing/invalid. Do NOT treat 0 as missing.
      const hasValue = Object.prototype.hasOwnProperty.call(p, "value");
      const parsed = Number(p.value);
      if (!hasValue || !Number.isFinite(parsed)) p.value = p.rating;

      // Strip legacy keys
      if ("max" in p) delete p.max;
    }
  }

  /**
   * Derived-data prep for Edge pools:
   * - Computes cap/effectiveMax/effectiveValue
   * - Stores in a non-persisted cache on the actor instance
   * - No writes to system data (prevents UI snap-back / loops)
   */
  _prepareEdgePoolsDerived() {
    // Always reset cache each derived pass
    this._mwdDerived ??= {};
    this._mwdDerived.edgePools = null;

    const cap = this.getEdgeCap();
    const lifeModulePoolBonuses = this.type === "character"
      ? (evaluateActorLifeModules(this).bonusByEdgePool ?? {})
      : {};

    // Characters: compute derived for real pools if present
    if (this.type === "character" && this.hasEdgePools()) {
      const pools = this.system?.counters?.edgePools ?? {};
      const derived = {};

      for (const [key, p] of Object.entries(pools)) {
        const rating = Math.max(0, Number(p?.rating ?? 0));
        const value = Math.max(0, Number(p?.value ?? 0));
        const ratingBonus = Math.max(0, Number(lifeModulePoolBonuses?.[key] ?? 0));
        const effectiveRating = rating + ratingBonus;

        const effectiveMax = Math.min(effectiveRating, cap);
        const effectiveValue = Math.min(value, effectiveMax);

        derived[key] = {
          key,
          rating,
          ratingBonus,
          effectiveRating,
          value,
          cap,
          effectiveMax,
          effectiveValue,
          hasPools: true,
          isEmpty: effectiveValue <= 0,
          isCapped: effectiveRating > cap,
        };
      }

      this._mwdDerived.edgePools = { cap, pools: derived };
      return;
    }

    // NPCs/vehicles/mechs: no derived pools
    this._mwdDerived.edgePools = { cap, pools: {} };
  }

  /* -------------------------------------------- */
  /* Capabilities                                  */
  /* -------------------------------------------- */

  isCharacterLike() {
    return this.type === "character" || this.type === "npc";
  }

  hasSkills() {
    return this.type === "character" || this.type === "npc";
  }

  hasEdgePools() {
    return this.type === "character" && !!this.system?.counters?.edgePools;
  }

  getAttributeValue(attributeKey) {
    return Math.max(0, Number(this.system?.attributes?.[attributeKey]?.value ?? 0));
  }

  getSkillRating(skillKey) {
    return Math.max(0, Number(this.system?.skills?.[skillKey]?.rating ?? 0));
  }

  getOwnedItem(itemId) {
    return this.items?.get?.(itemId) ?? null;
  }

  async setCheckbarValue(path, value) {
    return await this.update({ [path]: value });
  }

  getPersonalCombatLoadout({ refresh = false } = {}) {
    if (!refresh) {
      const cached = this._mwdDerived?.personalCombat;
      if (cached) return cached;
    }

    const loadout = this._computePersonalCombatLoadout();
    this._mwdDerived ??= {};
    this._mwdDerived.personalCombat = loadout;
    return loadout;
  }

  _computePersonalCombatLoadout() {
    const warnings = [];
    const weapons = this.items
      .filter(item => item.isPersonalWeapon?.() ?? item.type === TEMPLATE.itemType.personalWeapon)
      .map(item => item.getCombatProfile?.() ?? null)
      .filter(Boolean);

    const armor = this.items
      .filter(item => item.isArmor?.() ?? item.type === TEMPLATE.itemType.armor)
      .map(item => item.getArmorProfile?.({ actor: this }) ?? null)
      .filter(Boolean);

    const equippedWeapons = weapons.filter(item => item.equipped);
    const equippedArmor = armor.filter(item => item.equipped);

    const primaryWeapons = equippedWeapons.filter(item => item.isPrimary);
    const primaryArmor = equippedArmor.filter(item => item.isPrimary);

    let defaultWeapon = null;
    let primaryWeapon = null;
    let weaponChoiceRequired = false;

    if (primaryWeapons.length === 1) {
      primaryWeapon = primaryWeapons[0];
      defaultWeapon = primaryWeapon;
    } else if (primaryWeapons.length > 1) {
      warnings.push("Multiple equipped primary weapons found; attack selection requires a chooser.");
      weaponChoiceRequired = true;
    } else if (equippedWeapons.length === 1) {
      defaultWeapon = equippedWeapons[0];
    } else if (equippedWeapons.length > 1) {
      weaponChoiceRequired = true;
    } else {
      defaultWeapon = {
        ...WeaponItem.DEFAULT_UNARMED,
        uuid: null,
        img: null,
        item: null,
        equipped: true,
        isPrimary: false,
        defaultRangeBand: "close",
        isSynthetic: true
      };
    }

    let primaryArmorItem = null;
    let activeArmor = null;

    if (primaryArmor.length === 1) {
      primaryArmorItem = primaryArmor[0];
      activeArmor = this._buildActiveArmorState(primaryArmorItem);
    } else if (primaryArmor.length > 1) {
      warnings.push("Multiple equipped primary armor items found; using the first equipped armor.");
      activeArmor = equippedArmor[0] ? this._buildActiveArmorState(equippedArmor[0]) : null;
    } else if (equippedArmor.length === 1) {
      activeArmor = this._buildActiveArmorState(equippedArmor[0]);
    } else if (equippedArmor.length > 1) {
      warnings.push("Multiple equipped armor items found without a single primary; using the first equipped armor.");
      activeArmor = this._buildActiveArmorState(equippedArmor[0]);
    }

    return {
      weapons,
      equippedWeapons,
      primaryWeapon,
      defaultWeapon,
      weaponChoiceRequired,
      armor,
      equippedArmor,
      primaryArmor: primaryArmorItem,
      activeArmor,
      warnings
    };
  }

  _buildActiveArmorState(armorProfile) {
    if (!armorProfile) return null;

    const max = Math.max(0, Number(armorProfile?.durability?.max ?? armorProfile?.rating ?? 0));
    const current = Math.min(
      max,
      Math.max(0, Number(armorProfile?.durability?.current ?? armorProfile?.currentArmorRating ?? max))
    );
    const mitigationByType = normalizeArmorMitigationByType(armorProfile?.mitigationByType);
    const baseMitigation = computeArmorBaseMitigation(current);

    return {
      ...armorProfile,
      armorId: armorProfile.id,
      remainingDurability: current,
      currentArmorRating: current,
      baseMitigation,
      baseResistance: baseMitigation,
      mitigationByType,
      typedMitigation: mitigationByType,
      ratingCurrent: current,
      isDestroyed: current <= 0,
      durability: {
        current,
        max
      }
    };
  }

  async setOwnedItemEquipped(itemId, equipped) {
    const item = this.getOwnedItem(itemId);
    if (!item) return null;
    if (!(item.isPersonalWeapon?.() || item.isArmor?.())) return null;

    return this.updateEmbeddedDocuments("Item", [{
      _id: item.id,
      "system.equipped": Boolean(equipped),
      "system.isPrimary": Boolean(equipped) ? Boolean(item.system?.isPrimary) : false
    }]);
  }

  async setOwnedItemPrimary(itemId, isPrimary) {
    const item = this.getOwnedItem(itemId);
    if (!item) return null;
    if (!(item.isPersonalWeapon?.() || item.isArmor?.())) return null;

    const updates = [];
    const shouldEnable = Boolean(isPrimary);

    if (shouldEnable) {
      for (const other of this.items.filter(candidate => candidate.type === item.type && candidate.id !== item.id)) {
        if (other.system?.isPrimary) {
          updates.push({ _id: other.id, "system.isPrimary": false });
        }
      }
    }

    updates.push({
      _id: item.id,
      "system.isPrimary": shouldEnable,
      "system.equipped": shouldEnable ? true : Boolean(item.system?.equipped)
    });

    return this.updateEmbeddedDocuments("Item", updates);
  }

  /* -------------------------------------------- */
  /* Edge API (cap + pools w/ rating + current)    */
  /* -------------------------------------------- */

  getEdgeCap() {
    return Math.max(0, Number(this.system?.attributes?.edge?.value ?? 0));
  }

  getEdgePoolRaw(poolKey) {
    return this.system?.counters?.edgePools?.[poolKey] ?? null;
  }

  /**
   * Canonical pool accessor.
   * - Character: returns raw + effective values (effective is clamped by cap)
   * - NPC: no pools; Edge attribute acts as a single “pool” (effective max/value = cap)
   * - Vehicle/Mech: safe zeros
   */
  getEdgePool(poolKey) {
    const cap = this.getEdgeCap();

    // NPC fallback: Edge attribute acts as pool (no per-pool tracking)
    if (this.type === "npc" && !this.hasEdgePools()) {
      const rating = cap;
      const value = cap;
      return {
        key: poolKey,
        value,
        rating,
        effectiveValue: value,
        effectiveMax: rating,
        cap,
        hasPools: false,
      };
    }

    // Non-characters (vehicles/mechs) or missing pools → safe zeros
    if (!this.hasEdgePools()) {
      return {
        key: poolKey,
        value: 0,
        rating: 0,
        effectiveValue: 0,
        effectiveMax: 0,
        cap,
        hasPools: false,
      };
    }

    // Use derived cache when available
    const cached = this._mwdDerived?.edgePools?.pools?.[poolKey];
    if (cached) {
      return {
        key: cached.key,
        value: cached.value,
        rating: cached.rating,
        ratingBonus: cached.ratingBonus,
        effectiveRating: cached.effectiveRating,
        effectiveValue: cached.effectiveValue,
        effectiveMax: cached.effectiveMax,
        cap: cached.cap,
        hasPools: true,
      };
    }

    // Fallback if derived hasn’t run yet (should be rare)
    const raw = this.getEdgePoolRaw(poolKey);
    const rating = Math.max(0, Number(raw?.rating ?? 0));
    const value = Math.max(0, Number(raw?.value ?? 0));
    const ratingBonus = Math.max(0, Number(evaluateActorLifeModules(this).bonusByEdgePool?.[poolKey] ?? 0));
    const effectiveRating = rating + ratingBonus;
    const effectiveMax = Math.min(effectiveRating, cap);
    const effectiveValue = Math.min(value, effectiveMax);

    return {
      key: poolKey,
      value,
      rating,
      ratingBonus,
      effectiveRating,
      effectiveValue,
      effectiveMax,
      cap,
      hasPools: true,
    };
  }

  getEdgePoolValue(poolKey) {
    return this.getEdgePool(poolKey).effectiveValue;
  }

  getEdgePoolMax(poolKey) {
    return this.getEdgePool(poolKey).effectiveMax;
  }

  /**
   * Set the CURRENT value for a pool (admin/adjustment or spend).
   * - Characters only (six pools).
   * - Clamps to [0, effectiveMax] where effectiveMax = min(rating, edgeCap).
   * - Does not modify rating.
   */
  async setEdgePoolValue(poolKey, newValue) {
    if (!this.hasEdgePools()) return;

    const effectiveMax = Math.max(0, Number(this.getEdgePool(poolKey)?.effectiveMax ?? 0));

    const v = Number(newValue ?? 0);
    const clamped = Math.max(0, Math.min(v, effectiveMax));

    return this.update({
      [`system.counters.edgePools.${poolKey}.value`]: clamped,
    });
  }

  /**
   * Convenience: adjust CURRENT value by delta (e.g., spend -1, award +1).
   */
  async adjustEdgePoolValue(poolKey, delta) {
    if (!this.hasEdgePools()) return;

    const current = Math.max(0, Number(this.getEdgePoolRaw(poolKey)?.value ?? 0));
    const d = Number(delta ?? 0);
    return this.setEdgePoolValue(poolKey, current + d);
  }

  /**
   * Set the RATING (advancement ceiling) for a pool.
   * Stores true rating (not cap-clamped), then clamps current value to new effective max.
   */
  async setEdgePoolRating(poolKey, newRating) {
    if (!this.hasEdgePools()) return;

    const cap = this.getEdgeCap();
    const rating = Math.max(0, Number(newRating ?? 0));
    const ratingBonus = Math.max(0, Number(evaluateActorLifeModules(this).bonusByEdgePool?.[poolKey] ?? 0));
    const effectiveMax = Math.min(rating + ratingBonus, cap);

    const rawValue = Math.max(0, Number(this.getEdgePoolRaw(poolKey)?.value ?? 0));
    const value = Math.min(rawValue, effectiveMax);

    return this.update({
      [`system.counters.edgePools.${poolKey}.rating`]: rating,
      [`system.counters.edgePools.${poolKey}.value`]: value,
    });
  }

  /**
   * Sheet-facing summary for rendering.
   * If `groups` is provided, returns grouped pool arrays.
   */
  getEdgePoolSummary({ groups } = {}) {
    const cap = this.getEdgeCap();

    if (this.hasEdgePools()) {
      const cached = this._mwdDerived?.edgePools?.pools ?? {};

      if (groups && typeof groups === "object") {
        const outGroups = Object.entries(groups).map(([groupId, poolKeys]) => {
          const pools = (poolKeys ?? []).map((poolKey) => {
            const p = cached[poolKey] ?? this.getEdgePool(poolKey);
            return {
              ...p,
              isEmpty: (p.effectiveValue ?? 0) <= 0,
              isCapped: (p.effectiveRating ?? p.rating ?? 0) > (p.cap ?? cap),
            };
          });
          return { id: groupId, pools };
        });

        return { cap, hasPools: true, groups: outGroups, pools: [] };
      }

      const pools = Object.keys(this.system?.counters?.edgePools ?? {}).map((poolKey) => {
        const p = cached[poolKey] ?? this.getEdgePool(poolKey);
        return {
          ...p,
          isEmpty: (p.effectiveValue ?? 0) <= 0,
          isCapped: (p.effectiveRating ?? p.rating ?? 0) > (p.cap ?? cap),
        };
      });

      return { cap, hasPools: true, groups: [], pools };
    }

    // NPCs/vehicles/mechs: no pool tracking
    return { cap, hasPools: false, groups: [], pools: [] };
  }
  
  /**
   * Spend Edge from a pool (decrement current value).
   * - Characters only (six pools)
   * - Amount defaults to 1
   * - Safe no-op if pool missing
   */
  async spendEdge(poolKey, amount = 1, options = {}) {
    if (!this.hasEdgePools()) return;
    const requested = Math.max(0, Number(amount ?? 1));
    if (!requested) return;

    let actualAmount = requested;
    if (!options.skipTraitHooks) {
      const runtime = options.runtime ?? {};
      const packet = {
        poolKey,
        amount: requested,
        source: String(options.source ?? "").trim(),
        eventKey: String(options.eventKey ?? "").trim(),
      };
      const phaseResult = evaluateTraitPhase({
        actor: this,
        phase: "onEdgeSpend",
        facts: buildEdgeTraitFacts({ actor: this, packet, phase: "onEdgeSpend", runtime }),
        packet,
        options: { runtime, consumeUsage: true },
      });
      await applyTraitMutations({ actor: this, mutations: phaseResult.mutations, runtime });
      actualAmount = Math.max(0, Number(phaseResult.packet.amount ?? requested) || 0);
    }

    const a = actualAmount;
    if (!a) return;

    // delta spend: subtract
    return this.adjustEdgePoolValue(poolKey, -a);
  }

  async gainEdge(poolKey, amount = 1, options = {}) {
    if (!this.hasEdgePools()) return;
    const requested = Number(amount ?? 0);
    if (!requested) return;

    let actualAmount = requested;
    if (!options.skipTraitHooks) {
      const runtime = options.runtime ?? {};
      const packet = {
        poolKey,
        amount: requested,
        source: String(options.source ?? "").trim(),
        eventKey: String(options.eventKey ?? "").trim(),
      };
      const phaseResult = evaluateTraitPhase({
        actor: this,
        phase: "onEdgeGain",
        facts: buildEdgeTraitFacts({ actor: this, packet, phase: "onEdgeGain", runtime }),
        packet,
        options: { runtime, consumeUsage: true },
      });
      await applyTraitMutations({ actor: this, mutations: phaseResult.mutations, runtime });
      actualAmount = Number(phaseResult.packet.amount ?? requested) || 0;
    }

    return this.adjustEdgePoolValue(poolKey, actualAmount);
  }

  /* -------------------------------------------- */
  /* Document Lifecycle                            */
  /* -------------------------------------------- */

  /** @override */
  async _onUpdate(data, options, userId) {
    await super._onUpdate(data, options, userId);

    // Only the initiating client syncs the ActiveEffect to avoid duplicate writes
    if (game.userId !== userId) return;
    if (options?.mwdSyncOverloadedFromEffect) return;

    if (foundry.utils.hasProperty(data, "system.burn.overloaded")) {
      await this._syncOverloadedEffect(!!data.system.burn.overloaded);
    }
  }

  _onCreateDescendantDocuments(parent, collection, documents, data, options, userId) {
    super._onCreateDescendantDocuments(parent, collection, documents, data, options, userId);
    if (collection === "effects") void this._syncOverloadedFieldFromEffects();
  }

  _onUpdateDescendantDocuments(parent, collection, documents, changes, options, userId) {
    super._onUpdateDescendantDocuments(parent, collection, documents, changes, options, userId);
    if (collection === "effects") void this._syncOverloadedFieldFromEffects();
  }

  _onDeleteDescendantDocuments(parent, collection, documents, ids, options, userId) {
    super._onDeleteDescendantDocuments(parent, collection, documents, ids, options, userId);
    if (collection === "effects") void this._syncOverloadedFieldFromEffects();
  }

  async _syncOverloadedEffect(overloaded) {
    const STATUS_ID = "overloaded";
    await this.toggleStatusEffect(STATUS_ID, { active: overloaded, overlay: false });
  }

  async _syncOverloadedFieldFromEffects() {
    const overloadedFromStatus = this.statuses?.has?.("overloaded") ?? false;
    const overloadedFromSystem = !!this.system?.burn?.overloaded;
    if (overloadedFromStatus === overloadedFromSystem) return;

    await this.update(
      { "system.burn.overloaded": overloadedFromStatus },
      { mwdSyncOverloadedFromEffect: true }
    );
  }

  /* -------------------------------------------- */
  /* Condition Monitors                            */
  /* -------------------------------------------- */

  async setMonitorValue(monitorId, rawValue, { source = "unknown" } = {}) {
    if (monitorId === "burn") {
      const nextValue = Math.max(0, Number(rawValue) || 0);
      return this.update({ "system.burn.value": nextValue });
    }

    if (monitorId === "armor" && this.isCharacterLike()) {
      const loadout = this.getPersonalCombatLoadout({ refresh: true });
      const activeArmorId = loadout?.activeArmor?.armorId ?? loadout?.activeArmor?.id ?? null;
      const activeArmorItem = activeArmorId ? this.items.get(activeArmorId) : null;
      if (!activeArmorItem?.id) return null;

      const rating = Math.max(0, Number(activeArmorItem.system?.rating ?? 0) || 0);
      const configuredMax = Math.max(0, Number(activeArmorItem.system?.durability?.max ?? 0) || 0);
      const max = configuredMax > 0 ? configuredMax : rating;
      const nextValue = Math.min(Math.max(0, Number(rawValue) || 0), max);

      return this.updateEmbeddedDocuments("Item", [{
        _id: activeArmorItem.id,
        "system.durability.max": max,
        "system.durability.current": nextValue
      }]);
    }

    const basePath = `system.monitors.${monitorId}`;

    const max = Number(foundry.utils.getProperty(this, `${basePath}.max`)) || 0;
    const clampedMax = Math.max(0, max);
    const nextValue = Math.min(Math.max(0, Number(rawValue) || 0), clampedMax);

    const update = { [`${basePath}.value`]: nextValue };

    // Derive based on actor type + monitor id
    const type = this.type; // "character" | "battlemech" | "vehicle" | ...
    const def = MONITOR_DEFS?.[type]?.[monitorId];

    if (def?.derived) {
      for (const [derivedKey, spec] of Object.entries(def.derived)) {
        const fn = DERIVE_FNS?.[spec.fn];
        if (typeof fn !== "function") continue;

        const src = resolveDerivedSource(this, monitorId, spec.source, nextValue);
        update[`${basePath}.derived.${derivedKey}`] = fn(src);
      }
    }

    return this.update(update);
  }

  _prepareMonitors() {
    const monitors = this.system.monitors ?? {};
    const derived = deriveMonitors(monitors);

    this.system.derived ??= {};
    this.system.derived.monitors = derived;

    const phys = Number(derived?.physical?.penalty ?? 0);
    const fat  = Number(derived?.fatigue?.penalty ?? 0);

    // Both apply (stack)
    const total = phys + fat;

    // Keep explicit components (useful for sheets + providers)
    this.system.derived.condition ??= {};
    this.system.derived.condition.physicalPenalty = phys;
    this.system.derived.condition.fatiguePenalty  = fat;
    this.system.derived.condition.totalPenalty    = total;

    // Optional: keep the old field for backward compatibility
    this.system.derived.conditionPenalty = total;
  }

  _preparePersonalCombatDerived() {
    if (!this.isCharacterLike()) return;

    const loadout = this.getPersonalCombatLoadout({ refresh: true });
    const armorMonitor = this.system?.monitors?.armor;
    if (!armorMonitor) return;

    const activeArmor = loadout.activeArmor;
    const max = Math.max(0, Number(activeArmor?.durability?.max ?? 0));
    const currentArmorRating = Math.max(0, Number(activeArmor?.currentArmorRating ?? activeArmor?.durability?.current ?? 0));
    armorMonitor.max = max;
    armorMonitor.value = Math.min(max, currentArmorRating);
    armorMonitor.resistance = {
      default: Number(activeArmor?.baseMitigation ?? activeArmor?.baseResistance ?? 0),
      byType: {}
    };
    armorMonitor.resistanceBonusByType = activeArmor?.isDestroyed ? {} : (activeArmor?.mitigationByType ?? activeArmor?.typedMitigation ?? {});
    armorMonitor.derived ??= {};
    armorMonitor.derived.resistance = Number(activeArmor?.baseMitigation ?? activeArmor?.baseResistance ?? 0);
    armorMonitor.effect = activeArmor?.isDestroyed ? "Destroyed" : (activeArmor ? mitigationLabel(activeArmor.mitigationByType ?? activeArmor.typedMitigation) : "");

    this.system.derived ??= {};
    this.system.derived.personalCombat = {
      defaultWeaponId: loadout.defaultWeapon?.id ?? null,
      activeArmorId: activeArmor?.id ?? null,
      warnings: [...(loadout.warnings ?? [])]
    };
  }
}
