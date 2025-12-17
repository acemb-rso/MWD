import { ANARCHY } from "../config.js";
import { TEMPLATE, TEMPLATES_PATH } from "../constants.js";
import { Enums } from "../enums.js";
import { Misc } from "../misc.js";

const { HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Base item sheet for all MWD items, converted to ApplicationV2.
 * Provides common functionality for all item types including:
 * - Context preparation with enums and system data
 * - Modifier management (add, delete, update)
 * - Monitor/checkbar interactions
 * - Template selection per item type
 */
export class BaseItemSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ItemSheetV2) {

  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["mwd", "item-sheet"],
    position: {
      width: 600,
      height: "auto"  // CRITICAL: Use "auto" to prevent content truncation
    },
    window: {
      resizable: true
    },
    actions: {
      checkbarElement: BaseItemSheet._onClickCheckbar,
      modifierAdd: BaseItemSheet._onModifierAdd,
      modifierDelete: BaseItemSheet._onModifierDelete,
      modifierValueChange: BaseItemSheet._onModifierValueChange,
      modifierConditionChange: BaseItemSheet._onModifierConditionChange,
      modifierSelectionChange: BaseItemSheet._onModifierSelectionChange
    },
    form: {
      submitOnChange: true,
      closeOnSubmit: false
      // NOTE: No custom handler - AppV2 handles form submission automatically
    }
  };

  /** @override */
  static PARTS = {
    sheet: {
      template: "", // Set dynamically in _getPartTemplate
      scrollable: [".sheet-body"]
    }
  };

  static TABS = {
    primary: {
      id: "primary",
      group: "primary",
      navSelector: ".sheet-tabs",
      contentSelector: ".sheet-body",
      initial: "main",  // This must match your tab name
      tabs: [
        { id: "main" },
        { id: "modifiers" }
      ]
    }
  };

  /** @override */
  tabGroups = {
    primary: "main"  // Default tab
  };

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Dynamically determine the template based on item type.
   * @param {string} partId - The part identifier
   * @returns {string} The template path
   * @override
   */
  _getPartTemplate(partId) {
    if (partId === "sheet") {
      const weaponTemplates = {
        [TEMPLATE.itemType.mechWeapon]: `${TEMPLATES_PATH}/item/mech-weapon.hbs`,
        [TEMPLATE.itemType.personalWeapon]: `${TEMPLATES_PATH}/item/personal-weapon.hbs`,
      };
      
      return weaponTemplates[this.item.type] ?? `${TEMPLATES_PATH}/item/${this.item.type}.hbs`;
    }
    return super._getPartTemplate?.(partId) ?? "";
  }

  /**
   * Override title to show localized item type and name.
   * @override
   */
  get title() {
    const typeLabel = ANARCHY.itemType.singular[this.item.type] ?? this.item.type;
    return `${typeLabel}: ${this.item.name}`;
  }

  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(options) {
    // Get base context from parent
    const context = await super._prepareContext(options);
    
    // Get actor attributes if this item is owned
    const actorAttributes = this.item.actor?.getAttributes?.(this.item) ?? [];
    
    // Determine which attributes are usable based on item ownership
    const usableAttribute = this.item.actor
      ? attribute => actorAttributes.includes(attribute)
      : attribute => true;
    
    // Skills need knowledge attributes
    const withKnowledge = this.item.type === TEMPLATE.itemType.skill;

    // Build CSS classes
    const editableClass = this.isEditable ? "editable" : "locked";
    const baseClasses = ["mwd", "item-sheet", editableClass];
    const cssClass = baseClasses.join(" ");

    // Prepare enriched description (for display in templates)
    const enrichedDescription = await TextEditor.enrichHTML(this.item.system.description ?? "", {
      async: true,
      secrets: this.item.isOwner,
      relativeTo: this.item
    });

    // Prepare enriched GM notes (if applicable)
    const enrichedGMNotes = game.user.isGM && this.item.system.gmnotes
      ? await TextEditor.enrichHTML(this.item.system.gmnotes, {
          async: true,
          secrets: true,
          relativeTo: this.item
        })
      : "";

    // Build complete context
    return foundry.utils.mergeObject(context, {
      // Item data
      item: this.item,
      system: this.item.system,
      
      // Enriched content
      enrichedDescription,
      enrichedGMNotes,
      
      // Options for templates
      options: {
        isGM: game.user.isGM,
        limited: !this.document.isOwner,
        owner: this.document.isOwner,
        isOwned: this.item.actor !== undefined,
        editable: this.isEditable,
        cssClass,
        viewMode: false  // Items don't have view mode like actors do
      },
      
      // Configuration data
      ENUMS: foundry.utils.mergeObject(
        Enums.getEnums(usableAttribute, withKnowledge), 
        game.system.anarchy.modifiers.getEnums()
      ),
      ANARCHY,
      
      // CSS class for form element
      cssClass,
      
      // Tab configuration
      tabs: this._getTabs()
    });
  }

  /**
   * Get tab configuration for this item type.
   * Override in subclasses if needed.
   * @returns {object} Tab configuration
   * @protected
   */
  _getTabs() {
    return {
      details: { id: "details", group: "primary", label: "Details" },
      description: { id: "description", group: "primary", label: "Description" }
    };
  }

  /**
   * Override header buttons to add custom controls.
   * @returns {object[]} Array of header button configurations
   * @override
   */
  _getHeaderControls() {
    const buttons = super._getHeaderControls();
    
    // Add any item-specific controls here
    // Example: Toggle inactive state, etc.
    
    return buttons;
  }

  /* -------------------------------------------- */
  /*  Action Handlers                             */
  /* -------------------------------------------- */

  /**
   * Handle clicking a checkbar element (monitor).
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The clicked element
   * @returns {Promise<void>}
   * @static
   */
  static async _onClickCheckbar(event, target) {
    const item = this.item;
    if (!item.parent) return;

    const monitorRoot = target.closest('.checkbar-root');
    if (!monitorRoot) return;
    
    const monitor = monitorRoot.dataset.monitorCode;
    const index = Number.parseInt(target.dataset.index);
    const checked = target.dataset.checked === 'true';

    await item.parent.switchMonitorCheck(monitor, index, checked);
  }

  /**
   * Handle adding a new modifier.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The clicked element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierAdd(event, target) {
    await this.item.createModifier();
  }

  /**
   * Handle deleting a modifier.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The clicked element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierDelete(event, target) {
    const modifierRow = target.closest('.define-modifier');
    if (!modifierRow) return;
    
    const modifierId = modifierRow.dataset.modifierId;
    if (modifierId) {
      await this.item.deleteModifier(modifierId);
    }
  }

  /**
   * Handle changing a modifier's value.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The input element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierValueChange(event, target) {
    const modifierRow = target.closest('.define-modifier');
    if (!modifierRow) return;
    
    const modifierId = modifierRow.dataset.modifierId;
    if (modifierId) {
      await this.item.changeModifierValue(modifierId, target.value);
    }
  }

  /**
   * Handle changing a modifier's condition.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The input element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierConditionChange(event, target) {
    const modifierRow = target.closest('.define-modifier');
    if (!modifierRow) return;
    
    const modifierId = modifierRow.dataset.modifierId;
    if (modifierId) {
      await this.item.changeModifierCondition(modifierId, target.value);
    }
  }

  /**
   * Handle changing a modifier's selection (dropdown).
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The select element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierSelectionChange(event, target) {
    const modifierRow = target.closest('.define-modifier');
    if (!modifierRow) return;
    
    const modifierId = modifierRow.dataset.modifierId;
    const modifierSelect = target.dataset.modifierSelect;
    
    if (modifierId && modifierSelect) {
      await this.item.changeModifierSelection(modifierId, modifierSelect, target.value);
    }
  }
}