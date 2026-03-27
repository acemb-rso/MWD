// src/modules/sheets/character-sheet-v2.js
// Purpose: Defines helper or exported constant `getNum`.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { TEMPLATES_PATH, SYSTEM_NAME } from "../constants.js";
import { BaseActorSheetV2 } from "./base-actor-sheet-v2.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import { EDGE_POOL_GROUPS } from "../constants.js";
import { openTokenStatusDialog } from "../dialog/token-status-dialog.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function stripHtml(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toSnippet(value, max = 180) {
  const plain = stripHtml(value);
  if (!plain) return "";
  if (plain.length <= max) return plain;
  return `${plain.slice(0, Math.max(0, max - 3)).trim()}...`;
}

function compactList(values = []) {
  return values
    .map(value => String(value ?? "").trim())
    .filter(Boolean);
}

function buildSummaryStats(stats = []) {
  return stats
    .filter(stat => stat && stat.value !== undefined && stat.value !== null && String(stat.value).trim() !== "")
    .map(stat => ({
      label: String(stat.label ?? "").trim(),
      value: String(stat.value ?? "").trim(),
      emphasis: stat.emphasis ?? ""
    }));
}

function buildDetailTags(tags = []) {
  return compactList(tags).map(label => ({ label }));
}

function buildDetailRows(rows = []) {
  return rows
    .filter(row => row && row.value !== undefined && row.value !== null && String(row.value).trim() !== "")
    .map(row => ({
      label: String(row.label ?? "").trim(),
      value: String(row.value ?? "").trim()
    }));
}

function formatBandValues(bands = {}, order = ["close", "near", "far", "extreme"]) {
  return order
    .map(key => {
      const value = toNumber(bands?.[key], 0);
      return `${key.charAt(0).toUpperCase() + key.slice(1)} ${value}`;
    })
    .join(" | ");
}

function formatRangeBandLabel(rangeKey = "") {
  const value = String(rangeKey ?? "").trim().toLowerCase();
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export class CharacterSheetV2 extends BaseActorSheetV2 {
  #openCombatMenuId = null;
  #combatMenuOutsideHandler = null;
  #pendingScrollRestore = null;
  #expandedInventoryRows = new Set();

  static PARTS = {
    sheet: {
      get template() {
        return `${TEMPLATES_PATH}/v2/actor/character-sheet.hbs`;
      },
    }

  };

  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["character-sheet", SYSTEM_NAME, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
    window: { minWidth: 450, minHeight: 740, resizable: true},
    position: { width: 980, height: 900 },
    actions: { 
      ...super.DEFAULT_OPTIONS.actions,
      edgeSet: CharacterSheetV2.prototype._onEdgeSet,
      toggleCombatMenu: CharacterSheetV2.prototype._onToggleCombatMenu,
      toggleStatuses: CharacterSheetV2.prototype._onToggleStatuses,
      combatSpend: CharacterSheetV2.prototype._onCombatSpend,
      combatReduceBurn: CharacterSheetV2.prototype._onCombatReduceBurn,
      combatOverloadCheck: CharacterSheetV2.prototype._onCombatOverloadCheck,
      combatAttack: CharacterSheetV2.prototype._onCombatAttack,
      createOwnedItem: CharacterSheetV2.prototype._onCreateOwnedItem,
      editOwnedItem: CharacterSheetV2.prototype._onEditOwnedItem,
      deleteOwnedItem: CharacterSheetV2.prototype._onDeleteOwnedItem,
      toggleInventoryAccordion: CharacterSheetV2.prototype._onToggleInventoryAccordion,
      toggleOwnedItemEquipped: CharacterSheetV2.prototype._onToggleOwnedItemEquipped,
      setOwnedItemPrimary: CharacterSheetV2.prototype._onSetOwnedItemPrimary,
      attackWeapon: CharacterSheetV2.prototype._onAttackWeapon
    }
  });

    /** @override */
  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    const sheetToken = this.getSheetTokenDocument?.() ?? null;
    ctx._mwdThemeClass = game.system.mwd.styles.selectCssClass();
    ctx.layout = await LayoutRegistry.get("character");

    // Character-only Edge console context
    const cap = this.actor.getEdgeCap?.() ?? Number(this.actor.system?.attributes?.edge?.value ?? 0);
    const editable = !!this.isEditable;

    const GROUP_LABELS = { physical: "Physical", mental: "Mental", social: "Social" };
        const POOL_LABELS = {
          grit: "Grit",
          insight: "Insight",
          legend: "Legend",
          chaos: "Chaos",
          rumor: "Rumor",
          credibility: "Credibility"
        };

    // Use actor helper to get grouped pools in canonical order
    const summary = this.actor.getEdgePoolSummary
      ? this.actor.getEdgePoolSummary({ groups: EDGE_POOL_GROUPS })
      : { cap, hasPools: false, groups: [], pools: [] };

    // Build a render-ready console model
   ctx.edgeConsole = {
      cap,
      editable,
      capPips: Array.from({ length: Math.max(0, cap) }, (_, i) => i + 1),
      groups: (summary.groups ?? []).map(g => ({
        id: g.id,
        label: GROUP_LABELS[g.id] ?? g.id,
        pools: (g.pools ?? []).map(p => {
          const value = Number(p.effectiveValue ?? 0);
          const max = Number(p.effectiveMax ?? 0);

          // Precompute pip buttons so HBS needs no math helpers and never calls range() with bad args
          const pips = Array.from({ length: Math.max(0, max) }, (_, i) => {
            const n = i + 1;
            return { n, filled: n <= value };
          });
          
          const shortKey = String(p.key ?? "").split(".").pop();

          return {
            key: p.key,
            label: POOL_LABELS[shortKey] ?? shortKey ?? p.key,
            value,
            max,
            rating: Number(p.rating ?? 0),
            isCapped: Number(p.rating ?? 0) > Number(p.cap ?? cap),
            pips,

            // Paths for edit-mode inputs
            pathRating: `system.counters.edgePools.${p.key}.rating`,
            pathValue: `system.counters.edgePools.${p.key}.value`,

            // Keep the roll payload if you want pool-name click to route through BaseActorSheetV2 roll handler
            roll: JSON.stringify({ intent: "edge", pool: p.key })
          };
        })
      }))
    };
    // Interleaved 3x2 render order:
    // [Grit][Insight][Legend]
    // [Chaos][Rumor][Credibility]
    const order = ["grit", "insight", "legend", "chaos", "rumor", "credibility"];

    const poolByShortKey = new Map();
    for (const g of ctx.edgeConsole.groups ?? []) {
      for (const p of g.pools ?? []) {
        const shortKey = String(p.key ?? "").split(".").pop(); // grit/chaos/...
        if (shortKey) poolByShortKey.set(shortKey, p);
        p.domain = g.id;
      }
    }

ctx.edgeConsole.poolsOrdered = order
  .map(k => poolByShortKey.get(k))
  .filter(Boolean);


    /* -------------------------------------------- */
    /* Condition Monitors (character)               */
    /* -------------------------------------------- */
    const sys = this.actor.system ?? {};
    const monitors = sys.monitors ?? {};

    const TRACKS = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue",  label: "Fatigue",  kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor",    label: "Armor",    kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ];

    const getNum = (obj, path, d = 0) => {
      const v = foundry.utils.getProperty(obj, path);
      const n = Number(v);
      return Number.isFinite(n) ? n : d;
    };

    ctx.conditionMonitors = TRACKS.map(t => {
      const m = monitors?.[t.id] ?? {};
      const max = Math.max(0, getNum(m, "max", 0));
      const value = Math.min(Math.max(0, getNum(m, "value", 0)), max);

      return {
        id: t.id,
        label: t.label,
        kind: t.kind,
        editable: !!this.isEditable,
        value,
        max,
        segments: Array.from({ length: max }, (_, i) => {
          const n = i + 1;
          return { value: n, filled: n <= value };
        }),
        status: t.status
          ? { label: t.status.label, value: getNum(m, t.status.path, 0) }
          : null
      };
    });
    const burn = Number(this.actor.system?.burn?.value ?? 0);
    const burnDisplayMax = 10;
    const burnThreshold = 6;
    const burnFilled = Math.min(burn, burnDisplayMax);

    ctx.burnOverflow = Math.max(0, burn - burnDisplayMax);
    ctx.burnPenalty = Math.floor(burn / 2);
    ctx.burnPips = Array.from({ length: burnDisplayMax }, (_, i) => {
      const pipValue = i + 1;
      return {
        pipValue,
        filled: pipValue <= burnFilled,
        threshold: pipValue === burnThreshold
      };
    });

    ctx.combat = {
      roll: {
        initiative: JSON.stringify({ intent: "initiative" }),
        overload: JSON.stringify({ intent: "overload" })
      }
    };

    ctx.burn = {
      value: burn,
      penalty: Math.floor(burn / 2),
      overflow: Math.max(0, burn - 10),
      canOverloadCheck: burn >= 6,
      overloaded: !!this.actor.system?.burn?.overloaded
    };

    const combatSnapshot = PersonalCombatTracker.getSnapshot(this.actor, { token: sheetToken });
    ctx.combatDashboard = {
      overloadedLabel: combatSnapshot.overloaded ? "Yes" : "No",
      burnLabel: String(combatSnapshot.burn.value),
      burnPenaltyLabel: combatSnapshot.burn.penalty > 0 ? `-${combatSnapshot.burn.penalty}` : "0",
      actionSummary: combatSnapshot.summaryText,
      burnThisActivationLabel: `+${Math.max(0, Number(combatSnapshot.state.burnThisActivation ?? 0))}`,
      statuses: combatSnapshot.statuses,
      modifiers: combatSnapshot.modifierSummary,
      inactiveReason: combatSnapshot.inactiveReason
    };

    const combatActions = PersonalCombatTracker.buildActionModel(this.actor, combatSnapshot);
    const menuIds = new Set((combatActions.menus ?? []).map(menu => menu.id));
    if (this.#openCombatMenuId && !menuIds.has(this.#openCombatMenuId)) {
      this.#openCombatMenuId = null;
    }

    ctx.combatActions = {
      ...combatActions,
      menus: (combatActions.menus ?? []).map(menu => ({
        ...menu,
        isOpen: menu.id === this.#openCombatMenuId
      }))
    };

    const loadout = this.actor.getPersonalCombatLoadout?.() ?? null;
    ctx.personalInventory = {
      warnings: [...(loadout?.warnings ?? [])],
      weapons: (loadout?.weapons ?? []).map(weapon => {
        const accordionId = this.#inventoryAccordionId("weapons", weapon.id);
        const ammoTracked = Boolean(weapon?.ammoState?.isTracked);
        const ammoLabel = weapon?.ammoLabel ? `Loaded ${weapon.ammoLabel}` : "";
        const ammoCount = ammoTracked
          ? `${toNumber(weapon?.ammoState?.current, 0)}/${toNumber(weapon?.ammoState?.max, 0)}`
          : "";
        const detailRows = buildDetailRows([
          { label: "Skill", value: weapon.skillDef?.label ?? weapon.skill ?? "" },
          { label: "Category", value: weapon.category ?? "" },
          { label: "Max Range", value: formatRangeBandLabel(weapon.range?.max ?? weapon.defaultRangeBand ?? "") },
          { label: "Attack Rating", value: formatBandValues(weapon.attackRatingBand) },
          { label: "Ammo", value: ammoTracked ? `${ammoCount} tracked` : (weapon.ammoLabel || "Untracked") },
          { label: "Traits", value: compactList(weapon.traits ?? []).join(", ") }
        ]);

        return {
          id: weapon.id,
          accordionId,
          isExpanded: this.#expandedInventoryRows.has(accordionId),
          name: weapon.name,
          img: weapon.img,
          subtitle: weapon.skillDef?.label ?? weapon.category ?? "",
          summaryStats: buildSummaryStats([
            { label: "DV", value: toNumber(weapon.damage, 0), emphasis: "strong" },
            { label: "AP", value: toNumber(weapon.ap, 0) },
            { label: "Type", value: weapon.damageTypeLabel ?? weapon.damageType ?? "" },
            { label: "Ammo", value: ammoTracked ? ammoCount : (weapon.ammoLabel || "--") }
          ]),
          detailTags: buildDetailTags([
            weapon.equipped ? "Equipped" : "",
            weapon.isPrimary ? "Primary" : "",
            ammoLabel,
            ...compactList(weapon.traits ?? [])
          ]),
          detailRows,
          detailText: toSnippet(weapon.notes),
          equipped: !!weapon.equipped,
          isPrimary: !!weapon.isPrimary,
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: weapon.id,
            ammoTypeId: weapon?.ammoState?.activeTypeId ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: (loadout?.armor ?? []).map(armor => {
        const activeArmor = loadout?.activeArmor?.id === armor.id ? loadout.activeArmor : null;
        const accordionId = this.#inventoryAccordionId("armor", armor.id);
        const reinforcedMax = toNumber(activeArmor?.traitState?.reinforced?.max ?? armor?.traitState?.reinforced?.max, 0);
        const reinforcedLabel = reinforcedMax > 0
          ? `${toNumber(activeArmor?.traitState?.reinforced?.current ?? armor?.traitState?.reinforced?.current, 0)}/${reinforcedMax}`
          : "";
        const mitigationLabel = [
          Object.entries(activeArmor?.mitigationByType ?? activeArmor?.typedMitigation ?? armor.mitigationByType ?? {})
            .filter(([, value]) => Number(value) > 0)
            .map(([key, value]) => `${key} +${value}`)
            .join(", "),
          reinforcedLabel ? `Reinforced ${reinforcedLabel}` : ""
        ].filter(Boolean).join(" | ");

        return {
          id: armor.id,
          accordionId,
          isExpanded: this.#expandedInventoryRows.has(accordionId),
          name: armor.name,
          img: armor.img,
          subtitle: armor.tags?.length ? armor.tags.join(", ") : "Armor",
          summaryStats: buildSummaryStats([
            { label: "Rating", value: toNumber(activeArmor?.ratingCurrent ?? armor.rating, 0), emphasis: "strong" },
            { label: "Res", value: toNumber(activeArmor?.baseMitigation ?? activeArmor?.baseResistance, 0) },
            { label: "Def", value: toNumber(armor.defenseBonus, 0) },
            { label: "Dur", value: `${toNumber(activeArmor?.durability?.current ?? armor.durability?.current, 0)}/${toNumber(activeArmor?.durability?.max ?? armor.durability?.max, 0)}` }
          ]),
          detailTags: buildDetailTags([
            armor.equipped ? "Equipped" : "",
            armor.isPrimary ? "Primary" : "",
            reinforcedLabel ? `Reinforced ${reinforcedLabel}` : "",
            ...compactList(armor.traits ?? [])
          ]),
          detailRows: buildDetailRows([
            { label: "Mitigation", value: mitigationLabel },
            { label: "Defense Bonus", value: toNumber(armor.defenseBonus, 0) },
            { label: "Traits", value: compactList(armor.traits ?? []).join(", ") },
            { label: "Tags", value: compactList(armor.tags ?? []).join(", ") }
          ]),
          detailText: toSnippet(armor.notes),
          equipped: !!armor.equipped,
          isPrimary: !!armor.isPrimary,
        };
      }),
      gear: (ctx.items?.gear ?? []).map(item => {
        const accordionId = this.#inventoryAccordionId("gear", item.id);
        const quantity = toNumber(item.system?.quantity ?? 1, 1) || 1;
        const tags = compactList(item.system?.tags ?? item.system?.traits ?? []);
        return {
          id: item.id,
          accordionId,
          isExpanded: this.#expandedInventoryRows.has(accordionId),
          name: item.name,
          img: item.img,
          subtitle: item.system?.category ?? item.type ?? "Gear",
          summaryStats: buildSummaryStats([
            { label: "Qty", value: quantity, emphasis: "strong" },
            { label: "State", value: item.system?.equipped ? "Readied" : "" }
          ]),
          detailTags: buildDetailTags([
            item.system?.equipped ? "Readied" : "",
            ...tags
          ]),
          detailRows: buildDetailRows([
            { label: "Quantity", value: quantity },
            { label: "Source", value: item.system?.sourceReference ?? "" },
            { label: "Tags", value: tags.join(", ") }
          ]),
          detailText: toSnippet(item.system?.notes ?? item.system?.description),
          equipped: !!item.system?.equipped
        };
      })
    };

    return ctx;
  }

 _onRender(context, options) {
  super._onRender(context, options);
  this.#syncCombatMenuOutsideHandler();
  this.#restoreScrollPosition();
 }

 async close(options = {}) {
  this.#removeCombatMenuOutsideHandler();
  return super.close(options);
 }

 async _onEdgeSet(event, target) {
  event.preventDefault();
  event.stopPropagation();

  if (!this.isEditable) return;

  const el =
    target?.closest?.("[data-edge-pool][data-edge-value]") ??
    event?.target?.closest?.("[data-edge-pool][data-edge-value]");
  if (!el) return;

  const poolKey = String(el.dataset.edgePool ?? "").trim();
  const clicked = Number(el.dataset.edgeValue ?? NaN);
  if (!poolKey || !Number.isFinite(clicked)) return;

  const pool = this.actor.getEdgePool(poolKey);
  if (!pool?.hasPools) return;

  let next = clicked;

  // Toggle behavior: clicking the last filled pip clears it
  if (clicked === pool.effectiveValue) {
    next = clicked - 1;
  }

  // right click (or context menu) clears entirely
  if (event.button === 2 || event.type === "contextmenu") next = 0;

  // UX helpers
 if (event.altKey) next = 0;
  if (event.shiftKey) next = pool.effectiveMax;

  return this.actor.setEdgePoolValue(poolKey, next);
}

 async _onToggleCombatMenu(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  const menuId = String(
    target?.dataset?.combatMenu
    ?? event?.target?.closest?.("[data-combat-menu]")?.dataset?.combatMenu
    ?? ""
  ).trim();

  if (!menuId) return;

  this.#openCombatMenuId = this.#openCombatMenuId === menuId ? null : menuId;
  this.#renderPreservingScroll(false);
 }

 #syncCombatMenuOutsideHandler() {
  this.#removeCombatMenuOutsideHandler();

  if (!this.#openCombatMenuId) return;

  this.#combatMenuOutsideHandler = (event) => {
    const root = this._getRootElement();
    if (!root) return;

    const target = event.target;
    if (!(target instanceof Node)) return;

    if (target.closest?.(".mwd-combat-menu")) return;
    if (!root.contains(target)) {
      this.#closeCombatMenu();
      return;
    }

    this.#closeCombatMenu();
  };

  document.addEventListener("click", this.#combatMenuOutsideHandler);
 }

 #removeCombatMenuOutsideHandler() {
  if (!this.#combatMenuOutsideHandler) return;
  document.removeEventListener("click", this.#combatMenuOutsideHandler);
  this.#combatMenuOutsideHandler = null;
 }

 #getPrimaryScroller() {
  const root = this._getRootElement();
  if (!root) return null;

  return root.querySelector(".mwd-scroll-area")
    ?? root.querySelector(".csb-tab-panels");
 }

 #captureScrollPosition() {
  const scroller = this.#getPrimaryScroller();
  if (!(scroller instanceof HTMLElement)) {
    this.#pendingScrollRestore = null;
    return;
  }

  this.#pendingScrollRestore = {
    top: scroller.scrollTop,
    left: scroller.scrollLeft
  };
 }

 #restoreScrollPosition() {
  const pending = this.#pendingScrollRestore;
  if (!pending) return;

  const scroller = this.#getPrimaryScroller();
  if (!(scroller instanceof HTMLElement)) return;

  scroller.scrollTop = pending.top;
  scroller.scrollLeft = pending.left;

  requestAnimationFrame(() => {
    const nextScroller = this.#getPrimaryScroller();
    if (!(nextScroller instanceof HTMLElement)) return;
    nextScroller.scrollTop = pending.top;
    nextScroller.scrollLeft = pending.left;
  });

  this.#pendingScrollRestore = null;
 }

 #renderPreservingScroll(renderOptions = false) {
  this.#captureScrollPosition();
  this.render(renderOptions);
 }

 #closeCombatMenu({ rerender = true } = {}) {
  if (!this.#openCombatMenuId) return;
  this.#openCombatMenuId = null;
  if (rerender) this.#renderPreservingScroll(false);
 }

  async _onToggleStatuses(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  const token = this.getSheetTokenDocument?.()
    ?? PersonalCombatTracker.getSnapshot(actorWriteTarget, { token: this.getSheetTokenDocument?.() ?? null })?.tokenDocument
    ?? PersonalCombatTracker.getSnapshot(this.actor, { token: this.getSheetTokenDocument?.() ?? null })?.tokenDocument
    ?? null;
  if (!token) {
    ui.notifications?.warn("Statuses require a token for this actor on the current scene.");
    return;
  }

  return openTokenStatusDialog({
    actor: actorWriteTarget,
    token
  });
 }

 async _onCombatSpend(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const resource = String(target?.dataset?.resource ?? "").trim();
  const cost = Math.max(0, Number(target?.dataset?.cost ?? 0));
  const actionId = String(target?.dataset?.combatAction ?? "").trim();
  const actionLabel = String(target?.dataset?.combatLabel ?? "").trim();
  const actionCostLabel = String(target?.dataset?.combatCostLabel ?? "").trim();
  if (!resource || !cost || !actionId) return;

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const result = await PersonalCombatTracker.spendResource(actorWriteTarget, {
      token: this.getSheetTokenDocument?.()
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor),
      resource,
      cost,
      actionId,
      actionLabel,
      actionCostLabel
    });

    if (!result?.ok) {
      ui.notifications?.warn(result?.reason ?? "Unable to spend action.");
      return;
    }

    this.#closeCombatMenu({ rerender: false });
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to spend combat action", error);
    ui.notifications?.error("Unable to spend action.");
  }
 }

 async _onCombatReduceBurn(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const result = await PersonalCombatTracker.reduceBurn(actorWriteTarget, {
      token: this.getSheetTokenDocument?.()
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor)
    });

    if (!result?.ok) {
      ui.notifications?.warn(result?.reason ?? "Unable to reduce Burn.");
      return;
    }

    this.#closeCombatMenu({ rerender: false });
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to reduce Burn", error);
    ui.notifications?.error("Unable to reduce Burn.");
  }
 }

 async _onCombatOverloadCheck(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const raw = target?.dataset?.roll ?? event?.target?.closest?.("[data-roll]")?.dataset?.roll;
  if (!raw) return;

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (error) {
    console.warn("MWD | Invalid overload payload", raw, error);
    return;
  }

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const result = await game.mwd?.roll?.execute?.({ actor: actorWriteTarget, payload, event });
    this.#closeCombatMenu({ rerender: false });
    if (!result) {
      this.#renderPreservingScroll(false);
      return;
    }
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to launch overload check", error);
    ui.notifications?.error("Unable to launch overload check.");
  }
 }

 async _onCombatAttack(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  const token = this.getSheetTokenDocument?.()
    ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
    ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor);

  const snapshot = PersonalCombatTracker.getSnapshot(actorWriteTarget, { token });
  if (!snapshot.hasCombatant) {
    ui.notifications?.warn("No combatant on the current scene.");
    return;
  }
  if (!snapshot.isCurrentTurn) {
    ui.notifications?.warn("Only available during your activation.");
    return;
  }
  if (snapshot.overloaded) {
    ui.notifications?.warn("Overloaded actors can only recover Burn.");
    return;
  }
  if (snapshot.state.saRemaining < 2) {
    ui.notifications?.warn("Need 2 SA remaining to attack.");
    return;
  }

  const payload = {
    intent: "attack",
    mode: "auto",
    fallback: "unarmed",
    edge: { pool: "physical.grit", allowed: ["pre", "post"] },
    tags: ["combat", "attack"]
  };

  try {
    const result = await game.mwd?.roll?.execute?.({ actor: actorWriteTarget, payload, event });
    this.#closeCombatMenu({ rerender: false });
    if (!result) {
      this.#renderPreservingScroll(false);
      return;
    }

    const spend = await PersonalCombatTracker.spendResource(actorWriteTarget, {
      token,
      resource: "sa",
      cost: 2,
      actionId: "attack",
      actionLabel: "Attack",
      actionCostLabel: "2 SA"
    });

    if (!spend?.ok) {
      ui.notifications?.warn(spend?.reason ?? "Unable to spend attack action.");
    }

    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to launch attack", error);
    ui.notifications?.error(error?.message ?? "Unable to launch attack.");
  }
 }

 async _onCreateOwnedItem(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const itemType = String(target?.dataset?.itemType ?? "").trim();
  if (!itemType) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  const existingCount = actorWriteTarget.items.filter(item => item.type === itemType).length;
  const label = itemType === "personalWeapon"
    ? "Personal Weapon"
    : itemType === "armor"
      ? "Armor"
      : itemType.charAt(0).toUpperCase() + itemType.slice(1);

  await actorWriteTarget.createEmbeddedDocuments("Item", [{
    name: `${label} ${existingCount + 1}`,
    type: itemType
  }]);

  this.#renderPreservingScroll({ force: true });
 }

 async _onEditOwnedItem(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  const item = this.#getOwnedItemFromTarget(target, event);
  item?.sheet?.render(true);
 }

 async _onDeleteOwnedItem(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const item = this.#getOwnedItemFromTarget(target, event);
  if (!item) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  await actorWriteTarget.deleteEmbeddedDocuments("Item", [item.id]);
  this.#renderPreservingScroll({ force: true });
 }

 async _onToggleInventoryAccordion(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  const accordionId = String(
    target?.dataset?.accordionId
    ?? target?.closest?.("[data-accordion-id]")?.dataset?.accordionId
    ?? event?.target?.closest?.("[data-accordion-id]")?.dataset?.accordionId
    ?? ""
  ).trim();

  if (!accordionId) return;

  if (this.#expandedInventoryRows.has(accordionId)) {
    this.#expandedInventoryRows.delete(accordionId);
  } else {
    this.#expandedInventoryRows.add(accordionId);
  }

  this.#renderPreservingScroll(false);
 }

 async _onToggleOwnedItemEquipped(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const item = this.#getOwnedItemFromTarget(target, event);
  if (!item) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  await actorWriteTarget.setOwnedItemEquipped?.(item.id, !item.system?.equipped);
  this.#renderPreservingScroll({ force: true });
 }

 async _onSetOwnedItemPrimary(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const item = this.#getOwnedItemFromTarget(target, event);
  if (!item) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  await actorWriteTarget.setOwnedItemPrimary?.(item.id, !item.system?.isPrimary);
  this.#renderPreservingScroll({ force: true });
 }

 async _onAttackWeapon(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  const raw = target?.dataset?.roll ?? event?.target?.closest?.("[data-roll]")?.dataset?.roll;
  if (!raw) return;

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (error) {
    console.warn("MWD | Invalid attack payload", raw, error);
    return;
  }

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const result = await game.mwd?.roll?.execute?.({ actor: actorWriteTarget, payload, event });
    if (!result) return;
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to launch weapon attack", error);
    ui.notifications?.error(error?.message ?? "Unable to attack with that weapon.");
  }
 }

 #getOwnedItemFromTarget(target, event) {
  const itemId = String(
    target?.dataset?.itemId
    ?? target?.closest?.("[data-item-id]")?.dataset?.itemId
    ?? event?.target?.closest?.("[data-item-id]")?.dataset?.itemId
    ?? ""
  ).trim();

  if (!itemId) return null;
  return this.actor.items.get(itemId) ?? null;
 }

 #inventoryAccordionId(section, itemId) {
  return `${String(section ?? "").trim()}:${String(itemId ?? "").trim()}`;
 }


}
