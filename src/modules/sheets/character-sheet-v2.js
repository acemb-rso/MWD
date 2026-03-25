import { TEMPLATES_PATH, SYSTEM_NAME } from "../constants.js";
import { BaseActorSheetV2 } from "./base-actor-sheet-v2.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import { EDGE_POOL_GROUPS } from "../constants.js";
import { openTokenStatusDialog } from "../dialog/token-status-dialog.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";


export class CharacterSheetV2 extends BaseActorSheetV2 {
  #openCombatMenuId = null;
  #combatMenuOutsideHandler = null;
  #pendingScrollRestore = null;

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
      weapons: (loadout?.weapons ?? []).map(weapon => ({
        id: weapon.id,
        name: weapon.name,
        img: weapon.img,
        category: weapon.category,
        skill: weapon.skill,
        damage: weapon.damage,
        ap: weapon.ap,
        damageType: weapon.damageType,
        equipped: !!weapon.equipped,
        isPrimary: !!weapon.isPrimary,
        traitsLabel: (weapon.traits ?? []).join(", "),
        attackRoll: JSON.stringify({
          intent: "attack",
          weaponId: weapon.id,
          edge: { pool: "physical.grit", allowed: ["pre", "post"] },
          tags: ["combat", "attack"]
        })
      })),
      armor: (loadout?.armor ?? []).map(armor => {
        const activeArmor = loadout?.activeArmor?.id === armor.id ? loadout.activeArmor : null;
        return {
          id: armor.id,
          name: armor.name,
          img: armor.img,
          rating: Number(activeArmor?.ratingCurrent ?? armor.rating ?? 0),
          baseResistance: Number(activeArmor?.baseMitigation ?? activeArmor?.baseResistance ?? 0),
          defenseBonus: Number(armor.defenseBonus ?? 0),
          equipped: !!armor.equipped,
          isPrimary: !!armor.isPrimary,
          durability: `${Number(activeArmor?.durability?.current ?? armor.durability?.current ?? 0)}/${Number(activeArmor?.durability?.max ?? armor.durability?.max ?? 0)}`,
          mitigationLabel: Object.entries(activeArmor?.mitigationByType ?? activeArmor?.typedMitigation ?? armor.mitigationByType ?? {})
            .filter(([, value]) => Number(value) > 0)
            .map(([key, value]) => `${key} +${value}`)
            .join(", ")
        };
      }),
      gear: (ctx.items?.gear ?? []).map(item => ({
        id: item.id,
        name: item.name,
        img: item.img,
        quantity: Number(item.system?.quantity ?? 1) || 1,
        equipped: !!item.system?.equipped
      }))
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


}
