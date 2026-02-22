// /mwd/src/modules/actor/mwd-actor.js
import { ensureCoreSkillRatings } from "../mwd/skills.js";
import { MONITOR_DEFS } from "../constants.js";
import { DERIVE_FNS, resolveDerivedSource,  deriveMonitors } from "../mwd/derive-monitors.js";

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

    // Characters: compute derived for real pools if present
    if (this.type === "character" && this.hasEdgePools()) {
      const pools = this.system?.counters?.edgePools ?? {};
      const derived = {};

      for (const [key, p] of Object.entries(pools)) {
        const rating = Math.max(0, Number(p?.rating ?? 0));
        const value = Math.max(0, Number(p?.value ?? 0));

        const effectiveMax = Math.min(rating, cap);
        const effectiveValue = Math.min(value, effectiveMax);

        derived[key] = {
          key,
          rating,
          value,
          cap,
          effectiveMax,
          effectiveValue,
          hasPools: true,
          isEmpty: effectiveValue <= 0,
          isCapped: rating > cap,
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
    const effectiveMax = Math.min(rating, cap);
    const effectiveValue = Math.min(value, effectiveMax);

    return {
      key: poolKey,
      value,
      rating,
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

    // Compute clamp from raw rating + cap (do not depend on derived fields)
    const cap = this.getEdgeCap();
    const raw = this.getEdgePoolRaw(poolKey);
    const rating = Math.max(0, Number(raw?.rating ?? 0));
    const effectiveMax = Math.min(rating, cap);

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
    const effectiveMax = Math.min(rating, cap);

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
              isCapped: (p.rating ?? 0) > (p.cap ?? cap),
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
          isCapped: (p.rating ?? 0) > (p.cap ?? cap),
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
  async spendEdge(poolKey, amount = 1) {
    if (!this.hasEdgePools()) return;
    const a = Math.max(0, Number(amount ?? 1));
    if (!a) return;

    // delta spend: subtract
    return this.adjustEdgePoolValue(poolKey, -a);
  }

  async gainEdge(poolKey, amount = 1) {
    if (!this.hasEdgePools()) return;

    const current = Math.max(
      0,
      Number(this.getEdgePoolRaw(poolKey)?.value ?? 0)
    );

    const delta = Number(amount ?? 0);
    return this.adjustEdgePoolValue(poolKey, delta);
  }

  /* -------------------------------------------- */
  /* Condition Monitors                            */
  /* -------------------------------------------- */

  async setMonitorValue(monitorId, rawValue, { source = "unknown" } = {}) {
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
}
