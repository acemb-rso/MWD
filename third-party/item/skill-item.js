import { ICONS_PATH } from "../constants.js";
import { AnarchyBaseItem } from "./anarchy-base-item.js";

export class SkillItem extends AnarchyBaseItem {

  static get defaultIcon() {
    return `${ICONS_PATH}/skills/skills.svg`;
  }

  static prepareSkill(skillCode) {
    const skill = game.system.anarchy.skills.get(skillCode);
    if (!skill) {
      return {
        img: this.defaultIcon,
        system: {
          code: skillCode,
          attribute: '',
          hasDrain: false,
          hasConvergence: false
        }
      }
    }

    const updates = {
      img: skill.icon,
      system: {
        code: skill.code,
        attribute: skill.attribute,
        hasDrain: skill.hasDrain ? true : false,
        hasConvergence: skill.hasConvergence ? true : false
      }
    }
    if (skill.code != 'knowledge') {
      updates.name = game.i18n.localize(skill.labelkey)
    }
    return updates
  }

  isKnowledgeSkill() {
    return this.system.code == 'knowledge';
  }

  isGeneralSkill() {
    return this.system.code != 'knowledge';
  }

  prepareShortcut() {
    return {
      img: this.img,
      label: this.system.specialization ? `${this.name}: ${this.system.specialization}` : this.name,
      callback: token => token.actor.rollSkill(this, this.system.specialization),
    };
  }
}