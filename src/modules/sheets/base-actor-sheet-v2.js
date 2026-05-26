// src/modules/sheets/base-actor-sheet-v2.js
// Purpose: Shared AppV2 actor-sheet foundation.
// How it fits: Defines the stable edit/render/submit contract that every V2
// actor sheet now builds on, so actor-specific sheets stay thin.


import { LOG_HEAD, SYSTEM_NAME } from "../constants.js";
import { Misc } from "../misc.js";
import { openTokenStatusDialog } from "../dialog/token-status-dialog.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { activatePendingEvadeFromCombatMenu } from "../chat/chat-actions.js";
import { buildSkillDisplay } from "../mwd/skills.js";
import { getDepletingMachineMonitorClickValue, isMachineActorType } from "../mwd/machine-monitors.js";
import { launchOwnedWeaponAttack } from "../roll/weapon-attack-actions.js";
import { notifyRollError } from "../roll/roll-errors.js";
import { collectDocumentFormUpdates } from "./document-sheet-form.js";


/**
 * CSB-style: deterministic AppV2 sheet base.
 * - AppV2 actions for event routing (no activateListeners)
 * - CSB tab state is reconciled in _onRender (post-DOM, stable)
 * - Theme class injection in _initializeApplicationOptions
 * - Stable template contract in _prepareContext (legacy-friendly)
 * - No i18n usage (fork requirement)
 */
const { HandlebarsApplicationMixin } = foundry.applications.api;
const { HTMLField } = foundry.data.fields;

function createActorHTMLField(name) {
  const field = new HTMLField({ required: false, blank: true, initial: "" });
  field.name = name;
  return field;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export class BaseActorSheetV2 extends HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {
  #editing = false;

  // Shared size bounds keep the V2 actor sheets visually consistent while still
  // allowing each subclass to request a slightly different preferred size.
  static MIN_WIDTH  = 800;
  static MAX_WIDTH  = 950;
  static MIN_HEIGHT = 600;
  static MAX_HEIGHT = 1400;

  /** Track active CSB tab per group across rerenders */
  #activeTabsByGroup = new Map(); // group -> tabId
  #activeAccordionSectionsByGroup = new Map(); // group -> sectionId|null
  #pendingScrollRestore = null;
  #openCombatMenuId = null;
  #combatMenuOutsideHandler = null;
  #expandedInventoryRows = new Set();
  #combatAwarenessHookIds = [];
  #combatAwarenessRefreshId = null;

  /** @override */
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["sheet", "actor", SYSTEM_NAME, "appv2", "mwd-sheet", "mwd-character-sheet"],
    position: { width: 760, height: 760 },
    window: { resizable: true, minimizable: true },
    actions: {
      toggleViewMode: BaseActorSheetV2.prototype._onToggleViewMode,
      tab: BaseActorSheetV2.prototype._onClickTab,
      accordion: BaseActorSheetV2.prototype._onClickAccordion,
      roll: BaseActorSheetV2.prototype._onRollAction,
      monitorSet: BaseActorSheetV2.prototype._onMonitorSet,
      editImage: BaseActorSheetV2.prototype._onEditImage,
      createOwnedItem: BaseActorSheetV2.prototype._onCreateOwnedItem,
      editOwnedItem: BaseActorSheetV2.prototype._onEditOwnedItem,
      deleteOwnedItem: BaseActorSheetV2.prototype._onDeleteOwnedItem,
      toggleOwnedItemEquipped: BaseActorSheetV2.prototype._onToggleOwnedItemEquipped,
      setOwnedItemPrimary: BaseActorSheetV2.prototype._onSetOwnedItemPrimary,
      toggleInventoryAccordion: BaseActorSheetV2.prototype._onToggleInventoryAccordion,
      adjustGearQuantity: BaseActorSheetV2.prototype._onAdjustGearQuantity,
      attackWeapon: BaseActorSheetV2.prototype._onAttackWeapon,
      toggleCombatMenu: BaseActorSheetV2.prototype._onToggleCombatMenu,
      toggleStatuses: BaseActorSheetV2.prototype._onToggleStatuses,
      combatSpend: BaseActorSheetV2.prototype._onCombatSpend,
      combatAction: BaseActorSheetV2.prototype._onCombatAction,
      combatAssist: BaseActorSheetV2.prototype._onCombatAssist,
      combatEvade: BaseActorSheetV2.prototype._onCombatEvade,
      combatInterrupt: BaseActorSheetV2.prototype._onCombatInterrupt,
      combatReduceBurn: BaseActorSheetV2.prototype._onCombatReduceBurn,
      combatOverloadCheck: BaseActorSheetV2.prototype._onCombatOverloadCheck,
      combatAttack: BaseActorSheetV2.prototype._onCombatAttack,
      removeActivationAction: BaseActorSheetV2.prototype._onRemoveActivationAction
    }
  }, { inplace: false });

 /** @override */
  _updatePosition(position) {
    const resolved = super._updatePosition(position);

    const {
      MIN_WIDTH,
      MAX_WIDTH,
      MIN_HEIGHT,
      MAX_HEIGHT
    } = this.constructor;

    if (typeof resolved.width === "number") {
      resolved.width = Math.min(
        MAX_WIDTH,
        Math.max(MIN_WIDTH, resolved.width)
      );
    }

    if (typeof resolved.height === "number") {
      resolved.height = Math.min(
        MAX_HEIGHT,
        Math.max(MIN_HEIGHT, resolved.height)
      );
    }

    return resolved;
  }
  
  // Legacy callers still probe defaultOptions directly, so keep the alias until
  // the remaining compatibility surfaces are gone.
  static get defaultOptions() { return this.DEFAULT_OPTIONS; }

  /** Editing mode flag for templates */
  get editing() {
    return this.#editing;
  }

  toggleEditing() {
    // Permissions gate: if you can't edit, you can't enter edit mode or commit.
    if (!this.isEditable) return;

    // If we are currently editing and about to exit edit mode, commit changes first.
    if (this.#editing) {
      // Fire and forget is tempting, but don't: we want commit to finish before re-render.
      this._commitEditsToActor().finally(() => {
        this.#editing = !this.#editing;
        this.render({ force: true });
      });
      return;
    }

    // Entering edit mode: just flip and re-render.
    this.#editing = !this.#editing;
    this.render({ force: true });
  }

  /** Get the root HTMLElement for this application */
  _getRootElement() {
  return (this.element instanceof HTMLElement) ? this.element : this.element?.[0];
}

  _getPrimaryScroller() {
    const root = this._getRootElement();
    if (!root) return null;

    return root.querySelector(".mwd-scroll-area")
      ?? root.querySelector(".csb-tab-panels")
      ?? root.querySelector(".window-content");
  }

  _captureScrollPosition() {
    const scroller = this._getPrimaryScroller();
    if (!(scroller instanceof HTMLElement)) {
      this.#pendingScrollRestore = null;
      return;
    }

    this.#pendingScrollRestore = {
      top: scroller.scrollTop,
      left: scroller.scrollLeft,
    };
  }

  _restoreScrollPosition() {
    const pending = this.#pendingScrollRestore;
    if (!pending) return;

    const apply = () => {
      const scroller = this._getPrimaryScroller();
      if (!(scroller instanceof HTMLElement)) return;
      scroller.scrollTop = pending.top;
      scroller.scrollLeft = pending.left;
    };

    apply();
    requestAnimationFrame(apply);
    this.#pendingScrollRestore = null;
  }

  _renderPreservingScroll(renderOptions = false) {
    this._captureScrollPosition();
    this.render(renderOptions);
  }

  _inventoryAccordionId(section, itemId) {
    return `${String(section ?? "").trim()}:${String(itemId ?? "").trim()}`;
  }

  _isInventoryRowExpanded(accordionId) {
    return this.#expandedInventoryRows.has(String(accordionId ?? "").trim());
  }

  _buildCombatActionsContext(combatActions = {}) {
    const menuIds = new Set((combatActions.menus ?? []).map(menu => menu.id));
    if (this.#openCombatMenuId && !menuIds.has(this.#openCombatMenuId)) {
      this.#openCombatMenuId = null;
    }

    return {
      ...combatActions,
      menus: (combatActions.menus ?? []).map(menu => ({
        ...menu,
        isOpen: menu.id === this.#openCombatMenuId
      }))
    };
  }

  /**
   * Resolve the TokenDocument that launched this sheet when one exists.
   * This keeps linked-token behavior aligned with Foundry's token API.
   */
  getSheetTokenDocument() {
    const actor = this.actor ?? this.document ?? null;
    const actorToken = actor?.token ?? null;
    const tokenDoc = this.document?.isToken
      ? (this.document?.token ?? actorToken ?? null)
      : actorToken;

    if (!tokenDoc) return null;
    return tokenDoc?.document ?? tokenDoc;
  }

  /**
   * Resolve the document that should persist actor-backed state.
   * Linked token sheets should write to the base actor document so state survives scene changes.
   */
  getPersistentActor() {
    const actor = this.actor ?? this.document ?? null;
    if (!actor) return null;

    const tokenDoc = this.getSheetTokenDocument();
    if (!tokenDoc?.isLinked) return actor;

    return tokenDoc.baseActor
      ?? game.actors?.get?.(tokenDoc?.baseActor?.id ?? "")
      ?? tokenDoc.actor
      ?? actor;
  }

/** @override */
_initializeApplicationOptions(options) {
  options = super._initializeApplicationOptions(options);

  // Foundry may pass option arrays by reference. Clone here so per-instance
  // class mutation never bleeds across other open sheets.
  options.classes = Array.from(options.classes ?? []);

  const doc = options?.document ?? this.document;
  const type = doc?.type ?? this.actor?.type;

  if (type) options.classes.push(String(type));

  const theme = game.system?.anarchy?.styles?.selectCssClass?.() ?? "mwd-theme-default";
  const managedThemes = ["mwd-theme-default", "mwd-theme-sra"];

  for (let i = options.classes.length - 1; i >= 0; i--) {
    if (managedThemes.includes(options.classes[i])) options.classes.splice(i, 1);
  }

  options.classes.push(theme);
  return options;
}

  /**
   * No localization: provide a concrete title so Foundry doesn't show "TYPES.Actor.<type>".
   * @override
   */
  get title() {
    const type = this.actor?.type ?? "actor";
    const labels = {
      character: "Character",
      npc: "NPC",
      battlemech: "BattleMech",
      vehicle: "Vehicle",
      device: "Device"
    };

    const typeLabel =
      labels[type] ??
      String(type).replace(/(^|[-_])([a-z])/g, (_, sep, c) => (sep ? " " : "") + c.toUpperCase());

    const name = this.actor?.name ?? "Actor";
    return `${name} — ${typeLabel}`;
  }

  /**
   * Window actions (header/menu). Centralize here and dedupe by action key.
   * @override
   */
  _getHeaderControls() {
    let controls = super._getHeaderControls?.() ?? [];
    const isToken = this.document?.isToken ?? false;

    // Prefer filtering by action when available (more stable than label text)
    const removeActions = new Set();

    // These action keys vary a bit across versions/modules, so we include both and
    // keep a label fallback.
    if (isToken) {
      removeActions.add("prototypeToken");
      removeActions.add("configurePrototypeToken");
    } else {
      removeActions.add("token");
      removeActions.add("configureToken");
    }

    controls = controls.filter(c => {
      const action = c?.action ?? "";
      const label = String(c?.label ?? "");

      if (removeActions.has(action)) return false;

      // Fallback label matching (legacy / localization-free environments)
      if (isToken && label.includes("Prototype")) return false;
      if (!isToken && label === "Token") return false;

      return true;
    });

  // Header controls can be contributed by core and modules. Deduping here keeps
  // repeated token/config buttons from stacking up across versions.
  const seen = new Set();
    controls = controls.filter(c => {
      const action = c?.action;
      const key = action ? `a:${action}` : `il:${c?.icon ?? ""}|${c?.label ?? ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return controls;
  }

  /**
   * AppV2 action handler: Edit/View toggle.
   * Note: actions mapping already routes clicks here; we keep this lean.
   */
  async _onToggleViewMode(event) {
    event?.preventDefault?.();
    this.toggleEditing();
  }

  /**
   * AppV2 action handler: CSB tab click.
   * Defensive: derive the tab link from target or event.
   */
  _onClickTab(event, target) {
    const el =
      target?.closest?.(".csb-tab-link[data-tab]") ??
      event?.target?.closest?.(".csb-tab-link[data-tab]");
    if (!el) return;

    const tabId = el.dataset.tab;
    const tabs = el.closest(".csb-tabs");
    if (!tabs || !tabId) return;

    const group = tabs.dataset.group || "default";
    this.#activeTabsByGroup.set(group, tabId);

    this.#applyTabState(tabs, tabId);
  }

  _onClickAccordion(event, target) {
    const el =
      target?.closest?.(".csb-accordion__trigger[data-section]") ??
      event?.target?.closest?.(".csb-accordion__trigger[data-section]");
    if (!el) return;

    const sectionId = el.dataset.section;
    const accordion = el.closest(".csb-accordion");
    if (!accordion || !sectionId) return;

    const group = accordion.dataset.group || "default";
    const current = this.#activeAccordionSectionsByGroup.has(group)
      ? this.#activeAccordionSectionsByGroup.get(group)
      : (accordion.dataset.default || null);
    const nextSectionId = current === sectionId ? null : sectionId;

    this.#activeAccordionSectionsByGroup.set(group, nextSectionId);
    this.#applyAccordionState(accordion, nextSectionId);
  }
  
  /**
   * Universal roll action: data-action="roll" + data-roll='{"intent":"skill","key":"gunnery"}'
   */
  async _onRollAction(event, target) {
    event?.preventDefault?.();

    const el = target?.closest?.("[data-roll]") ?? event?.target?.closest?.("[data-roll]");
    const raw = el?.dataset?.roll;
    if (!raw) return;

    let payload;
    try {
      payload = JSON.parse(raw);
    } catch (err) {
      console.warn("MWD | Invalid data-roll JSON:", raw, err);
      return;
    }

    // Future: default dialog, Shift = quick roll.
    // For now: everything is “quick roll” until dialog exists.
    const quick = !!event?.shiftKey;

    // Ensure roll namespace exists
    const rollApi = game.mwd?.roll ?? game.system?.mwd?.roll;
    if (!rollApi?.execute) {
      ui.notifications?.error("MWD roll system not initialized (game.mwd.roll.execute missing).");
      return;
    }

    try {
      return await rollApi.execute({ actor: this.actor, payload, event, quick });
    } catch (error) {
      console.error("MWD | Failed to execute roll action", error);
      notifyRollError(error, "Unable to execute that roll.");
      return null;
    }
  }

  async _onEditImage(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.isEditable) return;
    if (!this.editing) return;

    const FilePickerV2 = foundry.applications.apps.FilePicker.implementation;

    const picker = new FilePickerV2({
      type: "image",
      current: this.actor?.img ?? "",
      callback: async (path) => {
        if (!path) return;
        const actorWriteTarget = this.getPersistentActor() ?? this.actor;
        await actorWriteTarget.update({ img: path });
      }
    });

    // render() is sync in Foundry; awaiting is fine but not required
    picker.render(true);
  }

  /* -------------------------------------------- */
  /* Shared Owned Item Actions                     */
  /* -------------------------------------------- */

  // The character sheet already has richer item affordances, but NPC, vehicle,
  // and battlemech sheets only need a stable baseline: create, open, delete,
  // and the two common loadout toggles.
  _getOwnedItemFromTarget(target, event) {
    const itemId = String(
      target?.dataset?.itemId
      ?? target?.closest?.("[data-item-id]")?.dataset?.itemId
      ?? event?.target?.closest?.("[data-item-id]")?.dataset?.itemId
      ?? ""
    ).trim();

    if (!itemId) return null;
    return this.actor?.items?.get?.(itemId) ?? null;
  }

  _getItemTypeLabel(itemType = "") {
    const normalized = String(itemType ?? "").trim();
    const labels = {
      personalWeapon: "Personal Weapon",
      mechWeapon: "Mech Weapon",
      assetModule: "Asset Module",
      lifeModule: "Life Module",
      consumable: "Consumable",
    };

    return labels[normalized] ?? normalized.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, char => char.toUpperCase());
  }

  async _onCreateOwnedItem(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.isEditable) return;

    const itemType = String(target?.dataset?.itemType ?? "").trim();
    if (!itemType) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const existingCount = actorWriteTarget.items.filter(item => (item.canonicalType ?? item.type) === itemType).length;

    await actorWriteTarget.createEmbeddedDocuments("Item", [{
      name: `${this._getItemTypeLabel(itemType)} ${existingCount + 1}`,
      type: itemType
    }]);

    this._renderPreservingScroll({ force: true });
  }

  async _onEditOwnedItem(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const item = this._getOwnedItemFromTarget(target, event);
    item?.sheet?.render(true);
  }

  async _onDeleteOwnedItem(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.isEditable) return;

    const item = this._getOwnedItemFromTarget(target, event);
    if (!item) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    await actorWriteTarget.deleteEmbeddedDocuments("Item", [item.id]);
    this._renderPreservingScroll({ force: true });
  }

  async _onToggleOwnedItemEquipped(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.isEditable) return;

    const item = this._getOwnedItemFromTarget(target, event);
    if (!item) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    await actorWriteTarget.setOwnedItemEquipped?.(item.id, !item.system?.equipped);
    this._renderPreservingScroll({ force: true });
  }

  async _onSetOwnedItemPrimary(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.isEditable) return;

    const item = this._getOwnedItemFromTarget(target, event);
    if (!item) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    await actorWriteTarget.setOwnedItemPrimary?.(item.id, !item.system?.isPrimary);
    this._renderPreservingScroll({ force: true });
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

    this._renderPreservingScroll(false);
  }

  async _onAdjustGearQuantity(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.isEditable) return;

    const item = this._getOwnedItemFromTarget(target, event);
    if (!item || !["gear", "consumable"].includes(String(item.canonicalType ?? item.type ?? "").trim())) return;

    const delta = Math.trunc(Number(
      target?.dataset?.delta
      ?? target?.closest?.("[data-delta]")?.dataset?.delta
      ?? event?.target?.closest?.("[data-delta]")?.dataset?.delta
      ?? 0
    ) || 0);
    if (!delta) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const targetItem = actorWriteTarget.items.get(item.id) ?? item;
    const nextQuantity = Math.max(0, Math.trunc(Number(targetItem.system?.quantity ?? 1) || 0) + delta);

    await targetItem.update({ "system.quantity": nextQuantity });
    this._renderPreservingScroll({ force: true });
  }

  async _onAttackWeapon(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (this._notifyUnavailableAction(target, event, "Equip that weapon before attacking.")) return;

    const item = this._getOwnedItemFromTarget(target, event);
    if (!item?.isPersonalWeapon?.()) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const token = this.getSheetTokenDocument?.()
      ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
      ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor);
    const result = await launchOwnedWeaponAttack({ weapon: item, event, token });
    if (!result) return;

    this._renderPreservingScroll({ force: true });
  }

  _notifyUnavailableAction(target, event, fallback = "That action is not available right now.") {
    const el =
      target?.closest?.("[data-action-disabled='true']")
      ?? event?.target?.closest?.("[data-action-disabled='true']");
    if (!el) return false;

    const reason = String(el.dataset?.actionReason ?? fallback).trim() || fallback;
    ui.notifications?.warn(reason);
    return true;
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
    this._renderPreservingScroll(false);
  }

  async _onToggleStatuses(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (this._notifyUnavailableAction(target, event, "Statuses are not available right now.")) return;
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

    return openTokenStatusDialog({ actor: actorWriteTarget, token });
  }

  async _onCombatSpend(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (this._notifyUnavailableAction(target, event, "That combat action is not available right now.")) return;
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
      this._renderPreservingScroll({ force: true });
    } catch (error) {
      console.error("MWD | Failed to spend combat action", error);
      ui.notifications?.error("Unable to spend action.");
    }
  }

  async _onCombatAction(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (this._notifyUnavailableAction(target, event, "That combat action is not available right now.")) return;
    if (!this.isEditable) return;

    const actionId = String(target?.dataset?.combatAction ?? "").trim();
    if (!actionId) return;

    try {
      const actorWriteTarget = this.getPersistentActor() ?? this.actor;
      const metadata = await this.#getCombatActionMetadata(actionId);
      if (!metadata) return;

      const result = await PersonalCombatTracker.executeAction(actorWriteTarget, {
        token: this.getSheetTokenDocument?.()
          ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
          ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor),
        actionId,
        metadata
      });

      if (!result?.ok) {
        ui.notifications?.warn(result?.reason ?? "Unable to perform action.");
        return;
      }

      this.#closeCombatMenu({ rerender: false });
      this._renderPreservingScroll({ force: true });
    } catch (error) {
      console.error("MWD | Failed to perform combat action", error);
      ui.notifications?.error("Unable to perform action.");
    }
  }

  async _onRemoveActivationAction(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.isEditable) return;

    const logIndex = Number(target?.dataset?.logIndex ?? -1);
    if (!Number.isInteger(logIndex) || logIndex < 0) return;

    try {
      const actorWriteTarget = this.getPersistentActor() ?? this.actor;
      const result = await PersonalCombatTracker.removeActivationLogEntry(actorWriteTarget, {
        token: this.getSheetTokenDocument?.()
          ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
          ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor),
        index: logIndex
      });

      if (!result?.ok) {
        ui.notifications?.warn(result?.reason ?? "Unable to remove action.");
        return;
      }

      this._renderPreservingScroll({ force: true });
    } catch (error) {
      console.error("MWD | Failed to remove activation action", error);
      ui.notifications?.error("Unable to remove action.");
    }
  }

  async _onCombatReduceBurn(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (this._notifyUnavailableAction(target, event, "Burn recovery is not available right now.")) return;
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
      this._renderPreservingScroll({ force: true });
    } catch (error) {
      console.error("MWD | Failed to reduce Burn", error);
      ui.notifications?.error("Unable to reduce Burn.");
    }
  }

  async _onCombatAssist(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (this._notifyUnavailableAction(target, event, "Assist is not available right now.")) return;
    if (!this.isEditable) return;

    try {
      const actorWriteTarget = this.getPersistentActor() ?? this.actor;
      const token = this.getSheetTokenDocument?.()
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor);
      const snapshot = PersonalCombatTracker.getSnapshot(actorWriteTarget, { token });

      if (!snapshot.hasCombatant) {
        ui.notifications?.warn("No combatant on the current scene.");
        return;
      }
      if (snapshot.isCurrentTurn) {
        ui.notifications?.warn("Only outside your activation.");
        return;
      }

      const assistTarget = await this.#promptAssistTarget(snapshot);
      if (!assistTarget) return;

      const result = await PersonalCombatTracker.executeAction(actorWriteTarget, {
        token,
        actionId: "assist",
        metadata: {
          targetCombatantId: assistTarget.combatantId,
          targetActorUuid: assistTarget.actorUuid,
          targetTokenUuid: assistTarget.tokenUuid,
          targetName: assistTarget.name
        }
      });

      if (!result?.ok) {
        ui.notifications?.warn(result?.reason ?? "Unable to assist.");
        return;
      }

      await this.#createAssistChatCard({
        actor: actorWriteTarget,
        token,
        target: assistTarget,
        costLabel: result.costLabel
      });

      this.#closeCombatMenu({ rerender: false });
      this._renderPreservingScroll({ force: true });
    } catch (error) {
      console.error("MWD | Failed to assist", error);
      ui.notifications?.error("Unable to assist.");
    }
  }

  async _onCombatEvade(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (this._notifyUnavailableAction(target, event, "Evade is not available right now.")) return;
    if (!this.isEditable) return;

    try {
      const actorWriteTarget = this.getPersistentActor() ?? this.actor;
      const token = this.getSheetTokenDocument?.()
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor);
      const result = await activatePendingEvadeFromCombatMenu(actorWriteTarget, { token });
      if (!result?.ok) {
        ui.notifications?.warn(result?.reason ?? "Unable to activate Evade.");
        return;
      }

      this.#closeCombatMenu({ rerender: false });
      this._renderPreservingScroll({ force: true });
    } catch (error) {
      console.error("MWD | Failed to activate Evade", error);
      ui.notifications?.error("Unable to activate Evade.");
    }
  }

  async _onCombatInterrupt(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (this._notifyUnavailableAction(target, event, "Interrupt is not available right now.")) return;
    if (!this.isEditable) return;

    try {
      const actorWriteTarget = this.getPersistentActor() ?? this.actor;
      const token = this.getSheetTokenDocument?.()
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor);
      const snapshot = PersonalCombatTracker.getSnapshot(actorWriteTarget, { token });
      const preparedInterrupt = PersonalCombatTracker.getPreparedInterrupt(snapshot);

      if (!snapshot.hasCombatant) {
        ui.notifications?.warn("No combatant on the current scene.");
        return;
      }
      if (snapshot.isCurrentTurn) {
        ui.notifications?.warn("Only outside your activation.");
        return;
      }
      if (!preparedInterrupt) {
        ui.notifications?.warn("Prepare an interrupt first.");
        return;
      }

      const confirmed = await this.#confirmInterrupt(preparedInterrupt);
      if (!confirmed) return;

      const result = await PersonalCombatTracker.executeAction(actorWriteTarget, {
        token,
        actionId: "interrupt",
        metadata: preparedInterrupt
      });

      if (!result?.ok) {
        ui.notifications?.warn(result?.reason ?? "Unable to interrupt.");
        return;
      }

      await PersonalCombatTracker.clearPreparedInterrupt(actorWriteTarget, { token });
      await this.#createInterruptChatCard({
        actor: actorWriteTarget,
        token,
        preparedInterrupt,
        costLabel: result.costLabel
      });

      this.#closeCombatMenu({ rerender: false });
      this._renderPreservingScroll({ force: true });
    } catch (error) {
      console.error("MWD | Failed to interrupt", error);
      ui.notifications?.error("Unable to interrupt.");
    }
  }

  async _onCombatOverloadCheck(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (this._notifyUnavailableAction(target, event, "Overload check is not available right now.")) return;
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
        this._renderPreservingScroll(false);
        return;
      }
      this._renderPreservingScroll({ force: true });
    } catch (error) {
      console.error("MWD | Failed to launch overload check", error);
      ui.notifications?.error("Unable to launch overload check.");
    }
  }

  async _onCombatAttack(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (this._notifyUnavailableAction(target, event, "Attack is not available right now.")) return;
    if (!this.isEditable) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const token = this.getSheetTokenDocument?.()
      ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
      ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor);
    const actionId = String(target?.dataset?.combatAction ?? "attack").trim() || "attack";
    const actionLabel = String(target?.dataset?.combatLabel ?? (actionId === "opportunity" ? "Opportunity" : "Attack")).trim() || "Attack";
    const isOpportunity = actionId === "opportunity";

    const snapshot = PersonalCombatTracker.getSnapshot(actorWriteTarget, { token });
    const hasAim = Boolean(snapshot.state?.actionState?.aim);
    if (!snapshot.hasCombatant) {
      ui.notifications?.warn("No combatant on the current scene.");
      return;
    }
    if (isOpportunity && snapshot.isCurrentTurn) {
      ui.notifications?.warn("Only outside your activation.");
      return;
    }
    if (!isOpportunity && !snapshot.isCurrentTurn) {
      ui.notifications?.warn("Only available during your activation.");
      return;
    }
    if (!isOpportunity && snapshot.overloaded) {
      ui.notifications?.warn("Overloaded actors can only recover Burn.");
      return;
    }
    if (!isOpportunity) {
      const activationCap = 3 + Math.floor((
        Math.max(0, Number(actorWriteTarget.system?.attributes?.reflexes?.value ?? 0))
        + Math.max(0, Number(actorWriteTarget.system?.attributes?.willpower?.value ?? 0))
      ) / 2);
      const saCapacityRemaining = Math.max(0, activationCap - Math.max(0, Number(snapshot.state?.saSpentThisActivation ?? 0)));
      if (saCapacityRemaining < 2) {
        ui.notifications?.warn("Activation SA cap reached.");
        return;
      }
    }

    const payload = {
      intent: "attack",
      mode: "auto",
      fallback: "unarmed",
      edge: { pool: "physical.grit", allowed: ["pre", "post"] },
      tags: isOpportunity ? ["combat", "attack", "reaction", "opportunity"] : ["combat", "attack"],
      aim: hasAim ? { active: true } : null,
      sourceTokenId: token?.id ?? null
    };

    try {
      const result = await game.mwd?.roll?.execute?.({ actor: actorWriteTarget, payload, event });
      this.#closeCombatMenu({ rerender: false });
      if (!result) {
        this._renderPreservingScroll(false);
        return;
      }
      if (hasAim) {
        await PersonalCombatTracker.clearAim(actorWriteTarget, { token });
      }

      const spend = isOpportunity
        ? await PersonalCombatTracker.executeAction(actorWriteTarget, { token, actionId: "opportunity" })
        : await PersonalCombatTracker.spendResource(actorWriteTarget, {
          token,
          resource: "sa",
          cost: 2,
          actionId: "attack",
          actionLabel: "Attack",
          actionCostLabel: "2 SA",
          actionCategory: "complex"
        });

      if (!spend?.ok) {
        ui.notifications?.warn(spend?.reason ?? `Unable to spend ${actionLabel} action.`);
      }

      this._renderPreservingScroll({ force: true });
    } catch (error) {
      console.error(`MWD | Failed to launch ${actionLabel}`, error);
      notifyRollError(error, `Unable to launch ${actionLabel}.`);
    }
  }

  async #getCombatActionMetadata(actionId) {
    if (actionId !== "prepare") return {};

    const content = `
      <form class="mwd-quick-select">
        <div class="mwd-field">
          <label>Trigger</label>
          <input type="text" name="condition" placeholder="When..." />
        </div>
        <div class="mwd-field">
          <label>Scope</label>
          <input type="text" name="scope" placeholder="What you will do" />
        </div>
      </form>`;

    const result = await Dialog.prompt({
      title: "Prepare Interrupt",
      content,
      label: "Prepare",
      callback: html => ({
        condition: String(html.find('input[name="condition"]').val() ?? "").trim(),
        scope: String(html.find('input[name="scope"]').val() ?? "").trim()
      })
    });

    return result ? result : null;
  }

  async #confirmInterrupt(preparedInterrupt = {}) {
    const condition = String(preparedInterrupt?.condition ?? "").trim();
    const scope = String(preparedInterrupt?.scope ?? "").trim();
    const content = `
      <div class="mwd-quick-select">
        <p><strong>Trigger:</strong> ${escapeHtml(condition || "Unspecified trigger")}</p>
        <p><strong>Scope:</strong> ${escapeHtml(scope || "Unspecified response")}</p>
      </div>`;

    const result = await Dialog.confirm({
      title: "Resolve Interrupt",
      content,
      yes: () => true,
      no: () => false
    });

    return Boolean(result);
  }

  #getCombatants(combat) {
    if (!combat?.combatants) return [];
    if (typeof combat.combatants.values === "function") return Array.from(combat.combatants.values());
    return Array.from(combat.combatants ?? []);
  }

  #getAssistTargetChoices(snapshot) {
    const currentCombatantId = String(snapshot?.combatant?.id ?? "").trim();
    return this.#getCombatants(snapshot?.combat)
      .filter(combatant => combatant && String(combatant.id ?? "").trim() !== currentCombatantId)
      .map(combatant => {
        const tokenDoc = combatant.token?.document ?? combatant.token ?? null;
        const actor = combatant.actor ?? tokenDoc?.actor ?? null;
        const name = String(combatant.name ?? tokenDoc?.name ?? actor?.name ?? "Combatant").trim() || "Combatant";
        return {
          combatantId: String(combatant.id ?? "").trim(),
          actorUuid: actor?.uuid ?? null,
          tokenUuid: tokenDoc?.uuid ?? null,
          name
        };
      })
      .filter(choice => choice.combatantId && choice.name)
      .sort((left, right) => left.name.localeCompare(right.name));
  }

  async #promptAssistTarget(snapshot) {
    const choices = this.#getAssistTargetChoices(snapshot);
    if (!choices.length) {
      ui.notifications?.warn("No other combatants are available to assist.");
      return null;
    }

    const content = `
      <form class="mwd-quick-select">
        <div class="mwd-field">
          <label>Assist</label>
          <select name="combatant">
            ${choices.map(choice => `<option value="${escapeHtml(choice.combatantId)}">${escapeHtml(choice.name)}</option>`).join("")}
          </select>
        </div>
      </form>`;

    const selectedId = await Dialog.prompt({
      title: "Assist Combatant",
      content,
      label: "Assist",
      callback: html => String(html.find('select[name="combatant"]').val() ?? choices[0]?.combatantId ?? "").trim()
    });

    if (!selectedId) return null;
    return choices.find(choice => choice.combatantId === selectedId) ?? null;
  }

  async #createAssistChatCard({ actor, token = null, target = null, costLabel = "" } = {}) {
    const actorName = String(actor?.name ?? "Ally").trim() || "Ally";
    const targetName = String(target?.name ?? "an ally").trim() || "an ally";
    const cost = String(costLabel ?? "").trim();
    const content = `
      <div class="mwd-chat-card mwd-chat-card--assist">
        <h3>Assist</h3>
        <p><strong>${escapeHtml(actorName)}</strong> assists <strong>${escapeHtml(targetName)}</strong>.</p>
        ${cost ? `<p><small>Cost: ${escapeHtml(cost)}</small></p>` : ""}
      </div>`;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor, token: token?.object ?? token }),
      content
    });
  }

  async #createInterruptChatCard({ actor, token = null, preparedInterrupt = null, costLabel = "" } = {}) {
    const actorName = String(actor?.name ?? "Combatant").trim() || "Combatant";
    const condition = String(preparedInterrupt?.condition ?? "").trim();
    const scope = String(preparedInterrupt?.scope ?? "").trim();
    const cost = String(costLabel ?? "").trim();
    const content = `
      <div class="mwd-chat-card mwd-chat-card--interrupt">
        <h3>Interrupt</h3>
        <p><strong>${escapeHtml(actorName)}</strong> resolves a prepared interrupt.</p>
        ${condition ? `<p><strong>Trigger:</strong> ${escapeHtml(condition)}</p>` : ""}
        ${scope ? `<p><strong>Scope:</strong> ${escapeHtml(scope)}</p>` : ""}
        ${cost ? `<p><small>Cost: ${escapeHtml(cost)}</small></p>` : ""}
      </div>`;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor, token: token?.object ?? token }),
      content
    });
  }

  #closeCombatMenu({ rerender = true } = {}) {
    if (!this.#openCombatMenuId) return;
    this.#openCombatMenuId = null;
    if (rerender) this._renderPreservingScroll(false);
  }

  /**
   * Post-render reconciliation hook (stable DOM).
   * Ensures every .csb-tabs group has exactly one active tab/panel:
   * - prefer remembered selection
   * - else use data-default
   * - else use first tab link
   * @override
   */
  _onRender(context, options) {
    super._onRender?.(context, options);
    this.#bindCombatAwarenessHooks();
    this.#syncCombatMenuOutsideHandler();

    const root = this._getRootElement();
    if (!root) return;

    for (const tabs of root.querySelectorAll(".csb-tabs")) {
      const group = tabs.dataset.group || "default";

      const remembered = this.#activeTabsByGroup.get(group);
      const fallback =
        tabs.dataset.default ||
        tabs.querySelector(".csb-tab-link[data-tab]")?.dataset.tab;

      const tabId = remembered || fallback;
      if (!tabId) continue;

      this.#applyTabState(tabs, tabId);
    }

    for (const accordion of root.querySelectorAll(".csb-accordion")) {
      const group = accordion.dataset.group || "default";
      const sectionId = this.#activeAccordionSectionsByGroup.has(group)
        ? this.#activeAccordionSectionsByGroup.get(group)
        : (accordion.dataset.default || null);
      this.#applyAccordionState(accordion, sectionId);
    }

      // Debugging aid: warn if tabs exist but no active tab applied
    if (root.querySelectorAll(".csb-tabs").length && !root.querySelector(".csb-tab-panel.is-active")) {
      console.warn(`${LOG_HEAD} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, { sheet: this.constructor?.name
      });
     }

    for (const editor of root.querySelectorAll('prose-mirror[name="system.biography.history"]')) {
      editor.addEventListener("change", event => {
        event.preventDefault();
        void this._updateRichTextHistory(editor);
      });
    }

    this._restoreScrollPosition();
  }

  async close(options = {}) {
    this.#removeCombatMenuOutsideHandler();
    this.#teardownCombatAwarenessHooks();
    return super.close(options);
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

  #bindCombatAwarenessHooks() {
    if (this.#combatAwarenessHookIds.length || !globalThis.Hooks?.on) return;

    this.#combatAwarenessHookIds = [
      ["targetToken", Hooks.on("targetToken", user => {
        if (user?.id !== game.user?.id) return;
        this.#queueCombatAwarenessRefresh();
      })],
      ["updateToken", Hooks.on("updateToken", (tokenDocument, changed) => {
        if (!this.#didTokenAwarenessChange(changed)) return;
        if (!this.#isRelevantCombatAwarenessToken(tokenDocument)) return;
        this.#queueCombatAwarenessRefresh();
      })],
      ["updateActor", Hooks.on("updateActor", actor => {
        if (!this.#isRelevantCombatAwarenessActor(actor)) return;
        this.#queueCombatAwarenessRefresh();
      })],
      ["createActiveEffect", Hooks.on("createActiveEffect", effect => {
        if (!this.#isRelevantCombatAwarenessActor(effect?.parent)) return;
        this.#queueCombatAwarenessRefresh();
      })],
      ["updateActiveEffect", Hooks.on("updateActiveEffect", effect => {
        if (!this.#isRelevantCombatAwarenessActor(effect?.parent)) return;
        this.#queueCombatAwarenessRefresh();
      })],
      ["deleteActiveEffect", Hooks.on("deleteActiveEffect", effect => {
        if (!this.#isRelevantCombatAwarenessActor(effect?.parent)) return;
        this.#queueCombatAwarenessRefresh();
      })],
      ["createItem", Hooks.on("createItem", item => {
        if (!this.#isRelevantCombatAwarenessActor(item?.parent)) return;
        this.#queueCombatAwarenessRefresh();
      })],
      ["updateItem", Hooks.on("updateItem", item => {
        if (!this.#isRelevantCombatAwarenessActor(item?.parent)) return;
        this.#queueCombatAwarenessRefresh();
      })],
      ["deleteItem", Hooks.on("deleteItem", item => {
        if (!this.#isRelevantCombatAwarenessActor(item?.parent)) return;
        this.#queueCombatAwarenessRefresh();
      })],
      ["updateCombatant", Hooks.on("updateCombatant", combatant => {
        if (!this.#isRelevantCombatAwarenessCombatant(combatant)) return;
        this.#queueCombatAwarenessRefresh();
      })],
      ["createCombatant", Hooks.on("createCombatant", combatant => {
        if (!this.#isRelevantCombatAwarenessCombatant(combatant)) return;
        this.#queueCombatAwarenessRefresh();
      })],
      ["deleteCombatant", Hooks.on("deleteCombatant", combatant => {
        if (!this.#isRelevantCombatAwarenessCombatant(combatant)) return;
        this.#queueCombatAwarenessRefresh();
      })],
      ["updateCombat", Hooks.on("updateCombat", () => {
        this.#queueCombatAwarenessRefresh();
      })],
    ];
  }

  #teardownCombatAwarenessHooks() {
    for (const [hookName, hookId] of this.#combatAwarenessHookIds) {
      Hooks.off(hookName, hookId);
    }
    this.#combatAwarenessHookIds = [];

    if (this.#combatAwarenessRefreshId !== null) {
      clearTimeout(this.#combatAwarenessRefreshId);
      this.#combatAwarenessRefreshId = null;
    }
  }

  #queueCombatAwarenessRefresh() {
    if (!this.rendered) return;
    if (this.#combatAwarenessRefreshId !== null) clearTimeout(this.#combatAwarenessRefreshId);
    this.#combatAwarenessRefreshId = setTimeout(() => {
      this.#combatAwarenessRefreshId = null;
      if (!this.rendered) return;
      this._captureScrollPosition();
      this.render({ force: false });
    }, 75);
  }

  #isRelevantCombatAwarenessToken(token) {
    const tokenId = String(token?.id ?? token?.document?.id ?? "").trim();
    if (!tokenId) return false;

    const sheetToken = this.getSheetTokenDocument?.() ?? this.actor?.getActiveTokens?.(true, true)?.[0] ?? null;
    const sheetTokenId = String(sheetToken?.id ?? sheetToken?.document?.id ?? "").trim();
    if (sheetTokenId && tokenId === sheetTokenId) return true;

    const targetedTokenIds = new Set(
      Array.from(game.user?.targets ?? [])
        .map(targetToken => String(targetToken?.id ?? targetToken?.document?.id ?? "").trim())
        .filter(Boolean)
    );
    return targetedTokenIds.has(tokenId);
  }

  #isRelevantCombatAwarenessActor(actor) {
    const resolvedActor = this.#resolveCombatAwarenessActor(actor);
    const actorId = String(resolvedActor?.id ?? "").trim();
    if (!actorId) return false;
    if (actorId === String(this.actor?.id ?? "").trim()) return true;

    return Array.from(game.user?.targets ?? []).some(targetToken => {
      const targetActorId = String(targetToken?.actor?.id ?? targetToken?.document?.actor?.id ?? "").trim();
      return targetActorId && targetActorId === actorId;
    });
  }

  #resolveCombatAwarenessActor(document) {
    if (!document) return null;
    if (document.documentName === "Actor" || document.type === "character" || document.type === "npc" || document.type === "vehicle" || document.type === "battlemech") {
      return document;
    }
    if (document.actor) return document.actor;
    if (document.parent && document.parent !== document) return this.#resolveCombatAwarenessActor(document.parent);
    return null;
  }

  #isRelevantCombatAwarenessCombatant(combatant) {
    const tokenId = String(combatant?.tokenId ?? combatant?.token?.id ?? combatant?.token?.document?.id ?? "").trim();
    if (!tokenId) return false;
    return this.#isRelevantCombatAwarenessToken({ id: tokenId });
  }

  #didTokenAwarenessChange(changed) {
    return foundry.utils.hasProperty(changed, "x")
      || foundry.utils.hasProperty(changed, "y")
      || foundry.utils.hasProperty(changed, "elevation")
      || foundry.utils.hasProperty(changed, "actorId");
  }

  async _updateRichTextHistory(editor) {
    if (!this.isEditable || editor?.name !== "system.biography.history") return;

    const value = String(editor.value ?? "");
    const current = String(foundry.utils.getProperty(this.actor, "system.biography.history") ?? "");
    if (value === current) return;

    try {
      const actorWriteTarget = this.getPersistentActor() ?? this.actor;
      await actorWriteTarget.update({ "system.biography.history": value });
    } catch (err) {
      console.warn("MWD | Rich text history update failed:", err);
    }
  }

  async _commitEditsToActor() {
    // If the sheet isn't rendered yet, nothing to commit.
    const root = this.element;
    if (!root) return;

    const updates = collectDocumentFormUpdates({
      root,
      document: this.actor,
      selector: 'input[name][data-edit-field="staged"], select[name][data-edit-field="staged"], textarea[name][data-edit-field="staged"]',
      clampByPath: this._clampByPath.bind(this),
      skipNames: ["system.biography.history"],
    });

    if (
      ["vehicle", "battlemech"].includes(this.actor?.type)
      && updates["system.movement.ground"] !== undefined
    ) {
      updates["system.moves"] = updates["system.movement.ground"];
    }

    if (!Object.keys(updates).length) return;

    // Permissions: let Foundry enforce. If it fails, it fails (expected).
    try {
      const actorWriteTarget = this.getPersistentActor() ?? this.actor;
      await actorWriteTarget.update(updates);
    } catch (err) {
      console.warn("MWD | Commit failed (permissions or validation):", err);
    }
  }

  /**
   * Apply active-state classes within a single .csb-tabs root.
   * Idempotent: safe to call every render.
   */
  #applyTabState(tabsRoot, tabId) {
    tabsRoot.querySelectorAll(".csb-tab-link").forEach(a => {
      a.classList.toggle("is-active", a.dataset.tab === tabId);
    });

    tabsRoot.querySelectorAll(".csb-tab-panel").forEach(p => {
      p.classList.toggle("is-active", p.dataset.tab === tabId);
    });
  }

  #applyAccordionState(accordionRoot, sectionId) {
    accordionRoot.dataset.activeSection = sectionId ?? "";

    accordionRoot.querySelectorAll(".csb-accordion__section").forEach(section => {
      const isActive = section.dataset.section === sectionId;
      section.classList.toggle("is-active", isActive);
    });

    accordionRoot.querySelectorAll(".csb-accordion__trigger").forEach(trigger => {
      const isActive = trigger.dataset.section === sectionId;
      trigger.classList.toggle("is-active", isActive);
      trigger.setAttribute("aria-expanded", isActive ? "true" : "false");
    });

    accordionRoot.querySelectorAll(".csb-accordion__panel").forEach(panel => {
      const parentSection = panel.closest(".csb-accordion__section");
      const isActive = parentSection?.dataset.section === sectionId;
      panel.classList.toggle("is-active", isActive);
    });
  }

  /** @override */
async _prepareContext(options) {
  console.log(`${LOG_HEAD}BaseActorSheetV2._prepareContext:start`, {
    actorName: this.actor?.name,
    actorType: this.actor?.type
  });

  const base = await super._prepareContext(options);

  // Some AppV2 paths hand through references that alias this.options. Build a
  // template-only copy so downstream context shaping never mutates live app
  // configuration by accident.
  const templateOptions = foundry.utils.deepClone(base?.options ?? {});
  templateOptions.classes = Array.from(this.options?.classes ?? []);
  templateOptions.cssClass = templateOptions.classes.join(" ");

  // Keep legacy aliases in the context while migrating templates onto the V2
  // contract. That lets us delete old template branches without forcing one
  // giant sheet rewrite in a single patch.
  const hbsData = foundry.utils.mergeObject(
    base,
    {
      actor: this.actor,
      system: this.actor?.system,
      editable: this.isEditable,
      owner: this.document?.isOwner ?? false,
      limited: !(this.document?.isOwner ?? false),
      editing: this.#editing,

      data: this.actor,
      options: templateOptions,
      cssClass: templateOptions.cssClass
    },
    { inplace: false }
  );

  // Mirror common flags in options for templates that still read options.*
  hbsData.options.owner = hbsData.owner;
  hbsData.options.limited = hbsData.limited;
  hbsData.options.editable = hbsData.editable;
  hbsData.options.editing = hbsData.editing;
  hbsData.options.viewMode = !hbsData.editing;

  // Shared skill display keeps all actor sheets aligned on one prepared shape
  // even if a given template only renders part of it today.
  hbsData.skillsDisplay = buildSkillDisplay(this.actor?.system ?? {});
  hbsData.bio = {
    ...(hbsData.bio ?? {}),
    fields: {
      history: createActorHTMLField("system.biography.history")
    }
  };

  const isMachineHeader = ["battlemech", "vehicle"].includes(this.actor?.type ?? "");
  hbsData.machineHeader = {
    enabled: isMachineHeader,
    model: String(this.actor?.system?.mwd?.model ?? "").trim(),
    path: "system.mwd.model",
    placeholder: this.actor?.type === "battlemech" ? "WHM-6R Warhammer" : "Vehicle model",
    cbillCost: Number(this.actor?.system?.mwd?.cbillCost ?? 0) || 0,
    cbillDisplay: new Intl.NumberFormat("en-US").format(Number(this.actor?.system?.mwd?.cbillCost ?? 0) || 0),
    cbillPath: "system.mwd.cbillCost",
  };

  // Preserve the historical item buckets while the new sheets move toward the
  // explicit actorSheet.itemCollections contract.
  hbsData.items ??= {};
  if (this.actor?.items && typeof Misc?.classifyInto === "function") {
    Misc.classifyInto(hbsData.items, this.actor.items);
    hbsData.items.weapon = [
      ...(hbsData.items.mechWeapon ?? []),
      ...(hbsData.items.personalWeapon ?? [])
    ];
  }

  // Keep the old npcItems alias until every surviving template has moved to the
  // new actorSheet context shape.
  hbsData.npcItems = {
    traits: (hbsData.items.quality ?? []),
    weapons: (hbsData.items.weapon ?? []),
    assetModules: (hbsData.items.assetModule ?? []),
    // Legacy partials still read npcItems.inventory, so fold consumables into
    // that alias until every remaining actor surface reads explicit buckets.
    inventory: [
      ...(hbsData.items.gear ?? []),
      ...(hbsData.items.consumable ?? [])
    ]
  };

  console.log(`${LOG_HEAD}BaseActorSheetV2._prepareContext:done`, {
    actorType: this.actor?.type,
    cssClass: hbsData.cssClass,
    itemCount: this.actor?.items?.size ?? 0,
    editing: this.#editing
  });

  return hbsData;
}

  
  /** Clamp certain actor system paths to valid ranges */
  _clampByPath(path, value) {
    if (typeof value !== "number") return value;

    // Force integers for attributes + skills
    if (
      /^system\.skills\.[^.]+\.rating$/.test(path) ||
      /^system\.attributes\.[^.]+\.value$/.test(path)
    ) {
      value = Math.trunc(value); // or Math.floor, but trunc is clearer
    }

    // Skill rating clamp
    if (/^system\.skills\.[^.]+\.rating$/.test(path)) {
      return Math.clamp(value, 0, 12);
    }

    // Attribute value clamp
    if (/^system\.attributes\.[^.]+\.value$/.test(path)) {
      return Math.clamp(value, 0, 10);
    }

    if (path === "system.speed") {
      return Math.max(0, Math.trunc(value));
    }

    if (/^system\.movement\.(ground|flight|jump)$/.test(path)) {
      return Math.max(0, Math.trunc(value));
    }

    return value;
  }
  
  /** Action handler: Condition Monitor set */
  async _onMonitorSet(event, target) {
    event.preventDefault();
    event.stopPropagation?.();
    if (!this.isEditable) return;

    const control =
      target?.closest?.("[data-action='monitorSet']") ??
      event?.target?.closest?.("[data-action='monitorSet']") ??
      target;
    const monitorId = String(control?.dataset?.monitor ?? "").trim();
    const raw = Number(control?.dataset?.value);

    if (!monitorId || !Number.isFinite(raw)) return;

    // Monitor clicks usually trigger an actor update and sheet redraw; preserve
    // the current tab scroll so deep systems panels do not snap back to top.
    this._captureScrollPosition();

    // Toggle: clicking the currently filled edge pip clears that pip.
    const currentPath = monitorId === "burn"
      ? "system.burn.value"
      : `system.monitors.${monitorId}.value`;
    const current = Number(foundry.utils.getProperty(this.actor, currentPath) ?? 0);
    const depletingMachineMonitor = isMachineActorType(this.actor)
      && (monitorId === "armor" || monitorId === "structure");
    const next = depletingMachineMonitor
      ? getDepletingMachineMonitorClickValue(current, raw)
      : (current === raw ? 0 : raw);

    // Prefer actor-owned semantics
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    if (typeof actorWriteTarget?.setMonitorValue === "function") {
      return actorWriteTarget.setMonitorValue(monitorId, next, { source: "sheet" });
    }

    // Fallback: raw value update only (still generic)
    const basePath = `system.monitors.${monitorId}`;
    const max = Number(foundry.utils.getProperty(actorWriteTarget, `${basePath}.max`)) || 0;
    const value = Math.min(Math.max(0, next), Math.max(0, max));
    return actorWriteTarget.update({ [`${basePath}.value`]: value });
  }

  /**
 * Compute -1 penalty per 3 full damage (3,6,9...)
 * Returns 0, -1, -2, ...
 */
  static _mwdPenaltyFromDamage(damage) {
    const d = Math.max(0, Number(damage) || 0);
    return -Math.floor(d / 3);
  }

/**
 * Compute resistance = ceil(value / 4), with 0 -> 0
 * 1-4 => 1, 5-8 => 2, ...
 */
  static _mwdResistanceFromValue(value) {
    const v = Math.max(0, Number(value) || 0);
    return v === 0 ? 0 : Math.ceil(v / 4);
  }
}
