// src/modules/sheets/base-actor-sheet-v2.js
// Purpose: Shared AppV2 actor-sheet foundation.
// How it fits: Defines the stable edit/render/submit contract that every V2
// actor sheet now builds on, so actor-specific sheets stay thin.


import { LOG_HEAD, SYSTEM_NAME } from "../constants.js";
import { Misc } from "../misc.js";
import { buildSkillDisplay } from "../mwd/skills.js";
import { getDepletingMachineMonitorClickValue, isMachineActorType } from "../mwd/machine-monitors.js";
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
      setOwnedItemPrimary: BaseActorSheetV2.prototype._onSetOwnedItemPrimary
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

    this.render({ force: true });
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
    this.render({ force: true });
  }

  async _onToggleOwnedItemEquipped(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.isEditable) return;

    const item = this._getOwnedItemFromTarget(target, event);
    if (!item) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    await actorWriteTarget.setOwnedItemEquipped?.(item.id, !item.system?.equipped);
    this.render({ force: true });
  }

  async _onSetOwnedItemPrimary(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.isEditable) return;

    const item = this._getOwnedItemFromTarget(target, event);
    if (!item) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    await actorWriteTarget.setOwnedItemPrimary?.(item.id, !item.system?.isPrimary);
    this.render({ force: true });
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
