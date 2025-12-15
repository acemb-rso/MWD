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
static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
  classes: ["mwd", "item-sheet"],
  position: {
    width: 600,
    height: 650   // use a number; rely on scrolling instead of "auto"
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

  // keep AppV2 form behavior; super.DEFAULT_OPTIONS should already include tag:"form"
  form: {
    submitOnChange: true
  }
});


  /** @override */
  static PARTS = {
    sheet: {
      template: "", // Set dynamically in _getPartTemplate
      scrollable: [".sheet-body"]
    }
  };

  /** @override */
  tabGroups = {
    sheet: "main"
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
    const typeLabel = ANARCHY.itemType.singular[this.item.type];
    return `${typeLabel}: ${this.item.name}`;
  }

  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The prepared context
   * @override
   */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    
    // Get actor attributes if this item is owned
    const actorAttributes = this.item.actor?.getAttributes?.(this.item);
    
    // Determine which attributes are usable based on item ownership
    const usableAttribute = this.item.actor
      ? attribute => actorAttributes?.includes(attribute)
      : attribute => true;
    
    // Skills need knowledge attributes
    const withKnowledge = this.item.type === TEMPLATE.itemType.skill;

    // Build CSS classes
    const editableClass = context.editable ? "editable" : "locked";
    const baseClasses = String(context.cssClass ?? "").split(/\s+/).filter(Boolean);
    const classes = Misc.distinct([
      game.system.anarchy.styles.selectCssClass(),
      "sheet",
      "item-sheet",
      editableClass,
      ...baseClasses
    ]);

    // Merge additional context data
    return foundry.utils.mergeObject(context, {
      // CSS and styling
      cssClass: classes.join(" "),
      
      // Permissions and state
      isGM: game.user.isGM,
      isOwned: this.item.actor !== undefined,
      
      // Enums for dropdowns and selections
      ENUMS: foundry.utils.mergeObject(
        Enums.getEnums(usableAttribute, withKnowledge),
        game.system.anarchy.modifiers.getEnums()
      ),
      
      // System configuration
      ANARCHY: ANARCHY,
      
      // Item system data
      system: this.item.system
    });
  }

  /**
   * Get header controls, removing duplicates.
   * @returns {Array} Array of header controls
   * @override
   */
  _getHeaderControls() {
    const controls = super._getHeaderControls();
    
    // Deduplicate controls based on icon, label, and class
    const seen = new Set();
    return controls.filter(control => {
      const key = `${control.class ?? ''}|${control.icon ?? ''}|${control.label ?? ''}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  /* -------------------------------------------- */
  /*  Action Handlers                             */
  /* -------------------------------------------- */

  /**
   * Handle clicking a checkbar element (monitor).
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The clicked element
   * @static
   * @async
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
   * @static
   * @async
   */
  static async _onModifierAdd(event, target) {
    await this.item.createModifier();
  }

  /**
   * Handle deleting a modifier.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The clicked element
   * @static
   * @async
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
   * @param {HTMLElement} target - The changed input element
   * @static
   * @async
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
   * @param {HTMLElement} target - The changed input element
   * @static
   * @async
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
   * Handle changing a modifier's selection.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The changed select element
   * @static
   * @async
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