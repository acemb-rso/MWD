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
        attribute: ""     // keep only what Destiny uses
      }
    };
  }

  const updates = {
    img: skill.icon,
    system: {
      code: skill.code,
      attribute: skill.attribute
    }
  };

  if (skill.code !== "knowledge") updates.name = skill.label;
  return updates;
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
  /** @override */
  async _preUpdate(changed, options, userId) {
    await super._preUpdate?.(changed, options, userId);

    // Only run when the submitted update includes system.code
    const newCode = changed?.system?.code;
    if (newCode === undefined) return;

    // Only run when code actually changes
    const oldCode = this.system.code;
    if (newCode === oldCode) return;

    // Compute defaults for the selected code
    const defaults = SkillItem.prepareSkill(newCode);
    if (!defaults) return;

    // IMPORTANT:
    // 1) Don't re-set system.code (Foundry is already applying it from the form)
    // 2) Don't stomp fields the user may already be editing unless you intend to
    delete defaults?.system?.code;

    // Merge defaults into the same update payload
    foundry.utils.mergeObject(changed, defaults, { inplace: true });
  }
}