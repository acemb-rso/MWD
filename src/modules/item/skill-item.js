// src/modules/item/skill-item.js
// Purpose: References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { MWDItem } from "./anarchy-base-item.js";

export class SkillItem extends MWDItem {

  static get defaultIcon() {
    return "systems/mwd/img/default/Default_Skill.svg";
  }

static prepareSkill(skillCode) {
  const skill = game.system.mwd.skills.get(skillCode);

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
      label: this.name,
      callback: token => token.actor.rollSkill(this),
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
