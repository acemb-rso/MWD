import { BaseItemSheet } from "./base-item-sheet.js";
import { SkillItem } from "./skill-item.js";
import { TEMPLATES_PATH } from "../constants.js";

/**
 * Skill item sheet (AppV2).
 * Handles skill code selection and automatic skill data updates.
 */
export class SkillItemSheet extends BaseItemSheet {

  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/item/skill.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        skillCodeChange: SkillItemSheet._onSkillCodeChange
      }
    });
  }

  /**
   * Handle changing the skill code, which updates the skill's data.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The changed select element
   * @static
   * @async
   */
  static async _onSkillCodeChange(event, target) {
    const skillCode = target.value;
    const skill = game.system.anarchy.skills.get(skillCode);
    const updates = skill ? SkillItem.prepareSkill(skillCode) : null;
    
    if (updates) {
      await this.item.update(updates);
    }
  }
}