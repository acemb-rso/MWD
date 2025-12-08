import { ANARCHY } from "../config.js";
import { LOG_HEAD, TEMPLATE, TEMPLATES_PATH } from "../constants.js";
import { ConfirmationDialog } from "../confirmation.js";
import { Misc } from "../misc.js";
import { Enums } from "../enums.js";
import { SelectActor } from "../dialog/select-actor.js";
import { ResistanceByTypeDialog } from "../dialog/resistance-by-type.js";

const { HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Base Actor Sheet class for the Anarchy system, fully converted to ApplicationV2.
 * Uses _attachPartListeners instead of activateListeners for AppV2 compliance.
 */
export class AnarchyActorSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {

  static PARTS = {
    sheet: {
      template: TEMPLATES_PATH + "/actor/character.hbs",
      scrollable: [".sheet-body"]
    }
  };

  // ApplicationV2 tabs configuration - override in subclasses if needed
  static TABS = {};

  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      isGM: game.user.isGM,
      dragDrop: [{ dragSelector: ".item", dropSelector: null }],
      classes: [game.system.anarchy.styles.selectCssClass(), "sheet", "actor"],
      actions: {
        // Item actions
        itemAdd: this._onItemAdd,
        itemEdit: this._onItemEdit,
        itemActivate: this._onItemActivate,
        itemDelete: this._onItemDelete,
        
        // Favorite actions
        toggleFavorite: this._onToggleFavorite,
        
        // Ownership actions
        ownerUnlink: this._onOwnerUnlink,
        ownedActorView: this._onOwnedActorView,
        ownedActorUnlink: this._onOwnedActorUnlink,
        
        // Monitor/counter actions
        toggleMonitor: this._onToggleMonitor,
        
        // Roll actions
        rollSkill: this._onRollSkill,
        rollAttribute: this._onRollAttribute,
        rollAttributeAction: this._onRollAttributeAction,
        rollWeapon: this._onRollWeapon,
        
        // Dialog actions
        showResistanceByType: this._onShowResistanceByType,
      },
      position: {
        width: 760,
        height: 760
      }
    });
  }

  /**
   * Keep support for code paths that still read {@link defaultOptions} from app-v1 style classes.
   */
  static get defaultOptions() {
    return this.DEFAULT_OPTIONS;
  }

  /** @override */
  _getHeaderButtons() {
    let buttons = super._getHeaderButtons?.() ?? [];
    
    // Remove duplicates - Application V2 can cause buttons to be added multiple times
    const seen = new Set();
    buttons = buttons.filter(button => {
      // Create a unique key based on action or label
      const key = JSON.stringify({
        action: button.action || null,
        label: button.label || null,
        tooltip: button.tooltip || null,
        icon: button.icon || null
      });
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
    
    // Filter Token/Prototype Token based on context
    const isToken = this.document.isToken; // true if this is a synthetic token actor
    
    buttons = buttons.filter(button => {
      const label = button.label || button.tooltip || '';
      
      // If viewing a token actor, remove "Prototype Token" button
      if (isToken && (label.includes('Prototype') || button.action === 'prototypeToken')) {
        return false;
      }
      
      // If viewing the base actor, remove "Token" button (keep only "Prototype Token")
      if (!isToken && label === 'Token' && !label.includes('Prototype') && button.action === 'token') {
        return false;
      }
      
      return true;
    });
    
    return buttons;
  }

  /** @override */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);

    // Dynamically set the template based on actor type
    if (this.actor?.type) {
      const template = `${TEMPLATES_PATH}/actor/${this.actor.type}.hbs`;
      this.constructor.PARTS.sheet.template = template;
      options.parts = foundry.utils.mergeObject(options.parts ?? {}, {
        sheet: { template }
      });
    }
  }

  /** @override */
  async _prepareContext(options) {
    this._logSheetDiagnostics('prepareContext-start', { options });
    
    const context = await super._prepareContext(options);

    console.log(`${LOG_HEAD}Actor data for template:`, {
      actor: this.actor,
      system: this.actor?.system,
      type: this.actor?.type,
      hasGetAnarchy: typeof this.actor?.getAnarchy === 'function'
    });

    // Merge in your custom data
    const hbsData = foundry.utils.mergeObject(context, {
      items: {},
      anarchy: this.actor.getAnarchy?.() ?? {},
      ownerActor: this.actor.getOwnerActor?.() ?? null,
      ownedActors: this.actor.getOwnedActors?.() ?? [],
      editable: this.isEditable,
      owner: this.document.isOwner,
      limited: !this.document.isOwner,
      actor: this.actor,
      data: context.data ?? this.actor,
      ENUMS: foundry.utils.mergeObject(
        { attributeAction: this.actor.getAttributeActions?.() ?? {} },
        Enums.getEnums()
      ),
      ANARCHY: ANARCHY,
      system: this.actor.system
    });

    // Classify items
    if (this.actor.items) {
      Misc.classifyInto(hbsData.items, this.actor.items);
      hbsData.items.weapon = [
        ...(hbsData.items.mechWeapon ?? []),
        ...(hbsData.items.personalWeapon ?? []),
      ];
    }

    this._logSheetDiagnostics('prepareContext-complete', { 
      hasItems: !!hbsData.items,
      itemCount: this.actor.items?.size ?? 0 
    });
    
    return hbsData;
  }

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);
    this._logSheetDiagnostics('onRender-complete');
  }

  /**
   * AppV2 method for attaching event listeners to rendered parts.
   * This replaces the old activateListeners pattern.
   * @override
   */
  _attachPartListeners(partId, htmlElement, options) {
    super._attachPartListeners(partId, htmlElement, options);
    
    // Note: In AppV2, actions defined in DEFAULT_OPTIONS.actions are handled automatically
    // via data-action attributes in the template. However, we can still attach custom
    // listeners here for events that don't fit the action pattern.
    
    // For compatibility with existing templates that may use old-style click handlers,
    // we attach them here. Ideally, templates should be updated to use data-action.
    const html = $(htmlElement);
    
    // Legacy click handlers (these should eventually be converted to actions)
    this._attachLegacyClickHandlers(html);
  }

  /**
   * Attach legacy click handlers for backwards compatibility.
   * These should eventually be converted to use the actions system.
   * @private
   */
  _attachLegacyClickHandlers(html) {
    // Items standard actions (add/edit/activate/delete)
    html.find('.click-item-add').on('click', async (event) => {
      event.stopPropagation();
      await this.createNewItem(this.getEventItemType(event));
    });

    html.find('.click-item-edit').on('click', async (event) => {
      event.stopPropagation();
      this.getEventItem(event)?.sheet.render(true);
    });

    html.find('.click-item-activate').on('click', async (event) => {
      event.stopPropagation();
      const item = this.getEventItem(event);
      const inactive = item.system.inactive;
      await item.update({ 'system.inactive': !inactive });
    });

    html.find('.click-item-delete').on('click', async (event) => {
      event.stopPropagation();
      const item = this.getEventItem(event);
      ConfirmationDialog.confirmDeleteItem(item, async () => {
        await this.actor.deleteEmbeddedDocuments('Item', [item.id]);
      });
    });

    html.find('.click-favorite').on('click', async (event) => {
      event.stopPropagation();
      this.onClickFavorite({
        skillId: $(event.currentTarget).attr('data-skill-id'),
        specialization: $(event.currentTarget).attr('data-specialization'),
        weaponId: $(event.currentTarget).attr('data-weapon-id'),
        attributeAction: $(event.currentTarget).attr('data-attributeAction'),
        isFavorite: $(event.currentTarget).attr('data-isFavorite')
      });
    });

    // Ownership management
    html.find('.click-owner-actor-unlink').on('click', async (event) => {
      event.stopPropagation();
      this.detachFromOwner(this.actor.getOwnerActor(), this.actor);
    });
    
    html.find('.click-owned-actor-view').on('click', async (event) => {
      event.stopPropagation();
      this.getEventOwnedActor(event)?.sheet.render(true);
    });
    
    html.find('.click-owned-actor-unlink').on('click', async (event) => {
      event.stopPropagation();
      this.detachFromOwner(this.actor, this.getEventOwnedActor(event));
    });

    // Counters & monitors
    html.find('a.click-checkbar-element').on('click', async (event) => {
      event.stopPropagation();
      const item = this.getEventItem(event);
      const handler = item ?? this.actor;
      const monitor = this.getEventMonitorCode(event);
      await handler.switchMonitorCheck(
        monitor,
        this.getEventIndex(event),
        this.isEventChecked(event),
        item
      );
    });

    // Rolls
    html.find('.click-skill-roll').on('click', async (event) => {
      event.stopPropagation();
      this.actor.rollSkill(
        this.getEventItem(event),
        this.getEventSkillSpecialization(event)
      );
    });

    html.find('.click-roll-attribute').on('click', async (event) => {
      event.stopPropagation();
      const handler = this.getEventItem(event) ?? this.actor;
      handler.rollAttribute(
        $(event.currentTarget).closest('.anarchy-attribute').attr('data-attribute')
      );
    });

    html.find('.click-roll-attribute-action').on('click', async (event) => {
      event.stopPropagation();
      this.actor.rollAttributeAction(this.getEventActionCode(event));
    });

    html.find('.click-weapon-roll').on('click', async (event) => {
      event.stopPropagation();
      const weapon = this.getEventItem(event);
      if (!weapon) {
        ui.notifications.warn('ANARCHY.common.errors.weaponNotFound');
        return;
      }
      this.actor.rollWeapon(weapon);
    });

    html.find('.click-resistance-by-type').on('click', async (event) => {
      event.stopPropagation();
      const monitor = this.getEventMonitorCode(event);
      await ResistanceByTypeDialog.show(this.actor, monitor);
    });
  }

  // ==================== ACTION HANDLERS ====================
  // These are called automatically when elements with data-action attributes are clicked

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async _onItemAdd(event, target) {
    event.stopPropagation();
    const itemType = target.closest('[data-item-type]')?.dataset.itemType;
    if (itemType) {
      await this.createNewItem(itemType);
    }
  }

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async _onItemEdit(event, target) {
    event.stopPropagation();
    const item = this._getItemFromTarget(target);
    item?.sheet.render(true);
  }

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async _onItemActivate(event, target) {
    event.stopPropagation();
    const item = this._getItemFromTarget(target);
    if (item) {
      const inactive = item.system.inactive;
      await item.update({ 'system.inactive': !inactive });
    }
  }

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async _onItemDelete(event, target) {
    event.stopPropagation();
    const item = this._getItemFromTarget(target);
    if (item) {
      ConfirmationDialog.confirmDeleteItem(item, async () => {
        await this.actor.deleteEmbeddedDocuments('Item', [item.id]);
      });
    }
  }

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async _onToggleFavorite(event, target) {
    event.stopPropagation();
    this.onClickFavorite({
      skillId: target.dataset.skillId,
      specialization: target.dataset.specialization,
      weaponId: target.dataset.weaponId,
      attributeAction: target.dataset.attributeAction,
      isFavorite: target.dataset.isFavorite
    });
  }

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async _onOwnerUnlink(event, target) {
    event.stopPropagation();
    this.detachFromOwner(this.actor.getOwnerActor(), this.actor);
  }

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async _onOwnedActorView(event, target) {
    event.stopPropagation();
    const ownedActor = this._getOwnedActorFromTarget(target);
    ownedActor?.sheet.render(true);
  }

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async _onOwnedActorUnlink(event, target) {
    event.stopPropagation();
    const ownedActor = this._getOwnedActorFromTarget(target);
    this.detachFromOwner(this.actor, ownedActor);
  }

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async _onToggleMonitor(event, target) {
    event.stopPropagation();
    const item = this._getItemFromTarget(target);
    const handler = item ?? this.actor;
    const monitorElement = target.closest('.checkbar-root');
    const monitor = monitorElement?.dataset.monitorCode;
    const index = parseInt(target.dataset.index);
    const checked = target.dataset.checked === 'true';
    
    if (monitor !== undefined && !isNaN(index)) {
      await handler.switchMonitorCheck(monitor, index, checked, item);
    }
  }

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async _onRollSkill(event, target) {
    event.stopPropagation();
    const item = this._getItemFromTarget(target);
    const specialization = target.dataset.specialization;
    this.actor.rollSkill(item, specialization);
  }

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async _onRollAttribute(event, target) {
    event.stopPropagation();
    const item = this._getItemFromTarget(target);
    const handler = item ?? this.actor;
    const attributeElement = target.closest('.anarchy-attribute');
    const attribute = attributeElement?.dataset.attribute;
    
    if (attribute) {
      handler.rollAttribute(attribute);
    }
  }

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async _onRollAttributeAction(event, target) {
    event.stopPropagation();
    const actionCode = target.dataset.actionCode || target.closest('[data-action-code]')?.dataset.actionCode;
    if (actionCode) {
      this.actor.rollAttributeAction(actionCode);
    }
  }

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async _onRollWeapon(event, target) {
    event.stopPropagation();
    const weapon = this._getItemFromTarget(target);
    if (!weapon) {
      ui.notifications.warn('ANARCHY.common.errors.weaponNotFound');
      return;
    }
    this.actor.rollWeapon(weapon);
  }

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async _onShowResistanceByType(event, target) {
    event.stopPropagation();
    const monitorElement = target.closest('.checkbar-root');
    const monitor = monitorElement?.dataset.monitorCode;
    if (monitor) {
      await ResistanceByTypeDialog.show(this.actor, monitor);
    }
  }

  // ==================== HELPER METHODS ====================

  /**
   * Get an item from a target element
   * @param {HTMLElement} target
   * @returns {Item|null}
   * @private
   */
  static _getItemFromTarget(target) {
    const itemId = target.closest('[data-item-id]')?.dataset.itemId;
    return itemId ? this.actor.items.get(itemId) : null;
  }

  /**
   * Get an owned actor from a target element
   * @param {HTMLElement} target
   * @returns {Actor|null}
   * @private
   */
  static _getOwnedActorFromTarget(target) {
    const actorId = target.closest('[data-owned-actor-id]')?.dataset.ownedActorId;
    return actorId ? game.actors.get(actorId) : null;
  }

  /**
   * Diagnostic logging for sheet lifecycle
   * @private
   */
  _logSheetDiagnostics(stage, extra = {}) {
    const diagnostics = {
      stage,
      actorId: this.actor?.id,
      actorName: this.actor?.name,
      actorType: this.actor?.type,
      template: this.constructor.PARTS?.sheet?.template,
      hasSystemData: !!this.actor?.system,
      ownerId: this.actor?.system?.ownerId ?? null,
      systemReady: !!game.system?.anarchy,
      sheetId: this.id,
      rendered: this.rendered,
      ...extra
    };
    console.debug(`${LOG_HEAD}ActorSheet`, diagnostics);
  }

  // ==================== LEGACY HELPER METHODS ====================
  // These are kept for backwards compatibility with existing code

  getEventItemType(event) {
    return $(event.currentTarget).closest('.define-item-type').attr('data-item-type');
  }

  getEventItem(event) {
    const itemId = $(event.currentTarget).closest('[data-item-id]').attr('data-item-id')
      ?? $(event.currentTarget).attr('data-item-id');
    return this.actor.items.get(itemId);
  }

  getEventOwnedActor(event) {
    const ownedActorId = $(event.currentTarget).closest('[data-owned-actor-id]').attr('data-owned-actor-id');
    return game.actors.get(ownedActorId);
  }

  getEventMonitorCode(event) {
    return $(event.currentTarget).closest('.checkbar-root').attr('data-monitor-code');
  }

  getEventIndex(event) {
    return Number.parseInt($(event.currentTarget).attr('data-index'));
  }

  isEventChecked(event) {
    return $(event.currentTarget).attr('data-checked') == 'true';
  }

  getEventActionCode(event) {
    return $(event.currentTarget).attr('data-action-code');
  }

  getEventSkillSpecialization(event) {
    return $(event.currentTarget).attr('data-specialization');
  }

  async createNewItem(itemType) {
    const singular = ANARCHY.itemType.singular[itemType];
    const name = singular + ' ' + this.actor.items.filter(it => it.type == itemType).length;
    await this.actor.createEmbeddedDocuments('Item', [{ name: name, type: itemType }]);
  }

  async onClickFavorite(options) {
    const { skillId, specialization, weaponId, attributeAction, isFavorite } = options;
    const favorite = isFavorite != 'true';

    if (skillId) {
      return this.actor.setSkillFavorite(skillId, specialization, favorite);
    }
    if (weaponId) {
      return this.actor.setWeaponFavorite(weaponId, favorite);
    }
    if (attributeAction) {
      return this.actor.setAttributeActionFavorite(attributeAction, favorite);
    }
  }

  async detachFromOwner(owner, owned) {
    if (!owner || !owned) {
      return;
    }
    const ownerId = owned.system.ownerId;
    if (ownerId == owner.id) {
      await owned.update({ 'system.ownerId': '' });
    }
    const ownedActorIds = owner.system.ownedActorIds;
    if (ownedActorIds?.includes(owned.id)) {
      const newOwnedActorIds = ownedActorIds.filter(id => id != owned.id);
      await owner.update({ 'system.ownedActorIds': newOwnedActorIds });
    }
  }

  /**
   * Preload templates for the actor sheet.
   * Note: The system's HandlebarsManager already loads all partial templates globally,
   * so this method is primarily for sheet-specific template parts if needed.
   * @override
   */
  static async _preloadTemplates() {
    // The HandlebarsManager already loads all partials system-wide.
    // Individual sheets can add their own specific templates here if needed.
    const paths = this._getSheetSpecificTemplates();
    
    if (paths.length > 0) {
      console.debug(`${LOG_HEAD}Preloading sheet-specific templates:`, paths);
      return loadTemplates(paths);
    }
  }

  /**
   * Get sheet-specific template paths to preload.
   * Override in subclasses to add templates specific to that sheet.
   * @returns {string[]}
   * @protected
   */
  static _getSheetSpecificTemplates() {
    // Base class has no sheet-specific templates
    // Child classes can override to add their own
    return [];
  }
}
