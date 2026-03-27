// src/modules/actor/anarchy-actor-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application. Preloads or manages Handlebars templates. References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


﻿import { ANARCHY } from "../config.js";
import { LOG_HEAD, TEMPLATES_PATH } from "../constants.js";
import { ConfirmationDialog } from "../confirmation.js";
import { Misc } from "../misc.js";
import { Enums } from "../enums.js";
import { ResistanceByTypeDialog } from "../dialog/resistance-by-type.js";

const { HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * AppV2-only Actor Sheet base class.
 * - No localization/i18n usage in our code
 * - Uses DEFAULT_OPTIONS.actions + data-action in templates
 */
export class AnarchyActorSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {
  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/actor/character.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: [game.system.anarchy.styles.selectCssClass(), "sheet", "actor", "mwd"],
      dragDrop: [{ dragSelector: ".item", dropSelector: null }],
      position: { width: 760, height: 760 },
      actions: {
        // Items
        itemAdd: this._onItemAdd,
        itemEdit: this._onItemEdit,
        itemDelete: this._onItemDelete,

        // Favorites
        toggleFavorite: this._onToggleFavorite,

        // Ownership
        ownerUnlink: this._onOwnerUnlink,
        ownedActorView: this._onOwnedActorView,
        ownedActorUnlink: this._onOwnedActorUnlink,

        // Monitors/counters
        toggleMonitor: this._onToggleMonitor,

        // Rolls
        rollSkill: this._onRollSkill,
        rollAttribute: this._onRollAttribute,
        rollAttributeAction: this._onRollAttributeAction,
        rollWeapon: this._onRollWeapon,

        // Image
        editImage: this._onEditImage,

        // Dialogs
        showResistanceByType: this._onShowResistanceByType
      }
    });
  }

  /**
   * Keep support for code paths that still read {@link defaultOptions}.
   */
  static get defaultOptions() {
    return this.DEFAULT_OPTIONS;
  }

  /**
   * NO i18n: Provide a concrete title so Foundry doesn't display "TYPES.Actor.<type>".
   * @override
   */
  get title() {
    const type = this.actor?.type ?? "actor";

    const TYPE_LABELS = {
      character: "Character",
      npc: "NPC",
      battlemech: "BattleMech",
      vehicle: "Vehicle",
      device: "Device"
    };

    const typeLabel =
      TYPE_LABELS[type] ??
      String(type).replace(/(^|[-_])([a-z])/g, (_, sep, c) => (sep ? " " : "") + c.toUpperCase());

    const name = this.actor?.name ?? "Actor";
    return `${name} — ${typeLabel}`;
  }

  /** @override */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);

    // Choose template by actor type, WITHOUT mutating static PARTS.
    const type = this.actor?.type ?? "character";
    const template = `${TEMPLATES_PATH}/actor/${type}.hbs`;

    options.parts = foundry.utils.mergeObject(options.parts ?? {}, {
      sheet: { template }
    });

    // Diagnostic: confirm template resolution in-console
    console.debug(`${LOG_HEAD}Sheet render options`, {
      actorType: type,
      template,
      parts: options.parts
    });
  }

  /** @override */
  async _prepareContext(options) {
    this._debug("prepareContext:start", { options });

    let base;
    try {
      base = await super._prepareContext(options);
    } catch (err) {
      console.error(`${LOG_HEAD}super._prepareContext failed`, err);
      throw err;
    }

    // Build HBS data: keep it deterministic and data-only.
    const hbsData = foundry.utils.mergeObject(base, {
      actor: this.actor,
      system: this.actor.system,
      editable: this.isEditable,
      owner: this.document.isOwner,
      limited: !this.document.isOwner,

      // System-specific
      anarchy: this.actor.getAnarchy?.() ?? {},
      ownerActor: this.actor.getOwnerActor?.() ?? null,
      ownedActors: this.actor.getOwnedActors?.() ?? [],

      ENUMS: foundry.utils.mergeObject(
        { attributeAction: this.actor.getAttributeActions?.() ?? {} },
        Enums.getEnums()
      ),
      ANARCHY
    });

    // -----------------------------------------------------------------------
    // COMPAT LAYER (critical)
    // Your templates (and many partials) expect:
    //   {{data.*}}, {{cssClass}}, {{options.cssClass}}, {{options.classes}}
    // AppV2 doesn't guarantee these unless we provide them.
    // -----------------------------------------------------------------------

    // Legacy alias used throughout the forked templates
    hbsData.data = this.actor;

    // Ensure options exists
    hbsData.options = hbsData.options ?? {};

    // Ensure options.classes is an array and includes this.options.classes
    const sheetClasses = Array.isArray(this.options?.classes) ? this.options.classes : [];
    const existing = Array.isArray(hbsData.options.classes) ? hbsData.options.classes : [];
    hbsData.options.classes = Misc.distinct([ ...existing, ...sheetClasses ]);

    // Provide a string cssClass for templates
    hbsData.options.cssClass = hbsData.options.classes.join(" ");
    hbsData.cssClass = hbsData.options.cssClass;

    // Ownership flags often referenced inside options
    hbsData.options.owner = hbsData.owner;
    hbsData.options.limited = hbsData.limited;
    hbsData.options.editable = hbsData.editable;

    // Items classified by your helper
    hbsData.items = hbsData.items ?? {};
    if (this.actor.items) {
      Misc.classifyInto(hbsData.items, this.actor.items);

      // Convenience “weapon” bucket combining both types
      hbsData.items.weapon = [
        ...(hbsData.items.mechWeapon ?? []),
        ...(hbsData.items.personalWeapon ?? [])
      ];
    }

    // NPC compatibility: npc.hbs expects npcItems.*
    hbsData.npcItems = {
      traits: (hbsData.items.quality ?? []),
      weapons: (hbsData.items.weapon ?? []),
      assetModules: (hbsData.items.assetModule ?? []),
      inventory: (hbsData.items.gear ?? [])
    };

    this._debug("prepareContext:done", {
      actorType: this.actor?.type,
      itemCount: this.actor?.items?.size ?? 0,
      cssClass: hbsData.cssClass
    });

    return hbsData;
  }

  /** @override */
  _attachPartListeners(partId, htmlElement, options) {
    super._attachPartListeners(partId, htmlElement, options);
  }

  /** @override */
  _getHeaderControls() {
    let controls = super._getHeaderControls?.() ?? [];
    const isToken = this.document?.isToken ?? false;

    controls = controls.filter(control => {
      const label = control.label ?? "";
      if (isToken && (label.includes("Prototype") || control.action === "prototypeToken")) return false;
      if (!isToken && label === "Token" && control.action === "token") return false;
      return true;
    });

    // Dedupe icon+label
    const seen = new Set();
    controls = controls.filter(c => {
      const key = `${c.icon ?? ""}|${c.label ?? ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return controls;
  }

  // =========================
  // Action handlers (AppV2)
  // =========================

  static async _onItemAdd(event, target) {
    event.preventDefault();
    event.stopPropagation();

    const itemType =
      target?.dataset?.itemType ??
      target.closest?.("[data-item-type]")?.dataset?.itemType;

    if (!itemType) return;
    await this._createNewItem(itemType);
  }

  static async _onItemEdit(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const item = this._getItemFromTarget(target);
    item?.sheet?.render(true);
  }

  static async _onItemDelete(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const item = this._getItemFromTarget(target);
    if (!item) return;

    ConfirmationDialog.confirmDeleteItem(item, async () => {
      await this.actor.deleteEmbeddedDocuments("Item", [item.id]);
    });
  }

  static async _onToggleFavorite(event, target) {
    event.preventDefault();
    event.stopPropagation();

    await this._onClickFavorite({
      skillId: target.dataset.skillId,
      specialization: target.dataset.specialization,
      weaponId: target.dataset.weaponId,
      attributeAction: target.dataset.attributeAction,
      isFavorite: target.dataset.isFavorite
    });
  }

  static async _onOwnerUnlink(event, target) {
    event.preventDefault();
    event.stopPropagation();
    await this._detachFromOwner(this.actor.getOwnerActor?.(), this.actor);
  }

  static async _onOwnedActorView(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const owned = this._getOwnedActorFromTarget(target);
    owned?.sheet?.render(true);
  }

  static async _onOwnedActorUnlink(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const owned = this._getOwnedActorFromTarget(target);
    await this._detachFromOwner(this.actor, owned);
  }

  static async _onToggleMonitor(event, target) {
    event.preventDefault();
    event.stopPropagation();

    const item = this._getItemFromTarget(target);
    const handler = item ?? this.actor;

    const monitorRoot = target.closest?.(".checkbar-root");
    const monitor = monitorRoot?.dataset?.monitorCode;

    const index = Number.parseInt(target.dataset.index ?? "", 10);
    const checked = target.dataset.checked === "true";

    if (!monitor || Number.isNaN(index)) return;
    await handler.switchMonitorCheck(monitor, index, checked, item);
  }

  static async _onRollSkill(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const item = this._getItemFromTarget(target);
    const specialization = target.dataset.specialization;
    this.actor.rollSkill(item, specialization);
  }

  static async _onRollAttribute(event, target) {
    event.preventDefault();
    event.stopPropagation();

    const item = this._getItemFromTarget(target);
    const handler = item ?? this.actor;

    const attrRoot = target.closest?.(".anarchy-attribute");
    const attribute = attrRoot?.dataset?.attribute;
    if (!attribute) return;

    handler.rollAttribute(attribute);
  }

  static async _onRollAttributeAction(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const actionCode =
      target.dataset.actionCode ??
      target.closest?.("[data-action-code]")?.dataset?.actionCode;

    if (!actionCode) return;
    this.actor.rollAttributeAction(actionCode);
  }

  static async _onRollWeapon(event, target) {
    event.preventDefault();
    event.stopPropagation();
    const weapon = this._getItemFromTarget(target);
    if (!weapon) {
      ui.notifications.warn("ANARCHY.common.errors.weaponNotFound");
      return;
    }
    this.actor.rollWeapon(weapon);
  }

  static async _onShowResistanceByType(event, target) {
    event.preventDefault();
    event.stopPropagation();

    const root = target.closest?.(".checkbar-root");
    const monitor = root?.dataset?.monitorCode;
    if (!monitor) return;

    await ResistanceByTypeDialog.show(this.actor, monitor);
  }

  static async _onEditImage(event, target) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.isEditable || this.options?.viewMode) return;

    const current = this.document.img;
    const fp = new FilePicker({
      type: "image",
      current,
      callback: async (path) => {
        if (!path) return;
        await this.document.update({ img: path });
      }
    });

    fp.render(true);
  }

  // =========================
  // Helpers (instance context)
  // =========================

  _debug(stage, extra = {}) {
    console.debug(`${LOG_HEAD}ActorSheet`, {
      stage,
      actorId: this.actor?.id,
      actorName: this.actor?.name,
      actorType: this.actor?.type,
      template: this.options?.parts?.sheet?.template ?? this.constructor.PARTS?.sheet?.template,
      ...extra
    });
  }

  _getItemFromTarget(target) {
    const itemId = target.closest?.("[data-item-id]")?.dataset?.itemId;
    return itemId ? this.actor.items.get(itemId) : null;
  }

  _getOwnedActorFromTarget(target) {
    const actorId = target.closest?.("[data-owned-actor-id]")?.dataset?.ownedActorId;
    return actorId ? game.actors.get(actorId) : null;
  }

  async _createNewItem(itemType) {
    const singular = ANARCHY.itemType?.singular?.[itemType] ?? itemType;
    const existingCount = this.actor.items.filter(it => it.type === itemType).length;
    const name = `${singular} ${existingCount}`;

    await this.actor.createEmbeddedDocuments("Item", [{ name, type: itemType }]);
  }

  async _onClickFavorite({ skillId, specialization, weaponId, attributeAction, isFavorite }) {
    const favorite = isFavorite !== "true";
    if (skillId) return this.actor.setSkillFavorite(skillId, specialization, favorite);
    if (weaponId) return this.actor.setWeaponFavorite(weaponId, favorite);
    if (attributeAction) return this.actor.setAttributeActionFavorite(attributeAction, favorite);
  }

  async _detachFromOwner(owner, owned) {
    if (!owner || !owned) return;

    const ownerId = owned.system.ownerId;
    if (ownerId === owner.id) await owned.update({ "system.ownerId": "" });

    const ownedActorIds = owner.system.ownedActorIds;
    if (ownedActorIds?.includes(owned.id)) {
      await owner.update({ "system.ownedActorIds": ownedActorIds.filter(id => id !== owned.id) });
    }
  }

  static async _preloadTemplates() {
    const paths = this._getSheetSpecificTemplates();
    if (!paths?.length) return;
    return foundry.applications.handlebars.loadTemplates(paths);
  }

  static _getSheetSpecificTemplates() {
    return [];
  }
}
