import { AttributeActions } from "../attribute-actions.js";
import { BaseItemSheet } from "./base-item-sheet.js";

/**
 * Weapon item sheet (AppV2).
 * Handles weapon skill selection and defense attribute assignment.
 * Used for both personal and mech weapons.
 */
export class WeaponItemSheet extends BaseItemSheet {

  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: WeaponItemSheet._onWeaponSkillChange
      }
    });
  }

  /**
   * Prepare context data, adding weapon-specific enums.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The prepared context
   * @override
   */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    
    // Add defense options for weapon targeting
    context.ENUMS = foundry.utils.mergeObject(
      { defenses: AttributeActions.getDefenses() }, 
      context.ENUMS
    );
    
    // Add weapon-specific flags
    context.hasDrain = this.item.hasDrain;
    context.hasConvergence = this.item.hasConvergence;
    
    return context;
  }

  /**
   * Handle changing the weapon skill, which updates the defense attribute.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The changed select element
   * @static
   * @async
   */
  static async _onWeaponSkillChange(event, target) {
    const skillCode = target.value;
    const skill = game.system.anarchy.skills.get(skillCode);
    
    if (skill) {
      await this.item.update({ 
        'system.defense': skill.defense 
      }, { 
        render: false 
      });
    }
  }
}