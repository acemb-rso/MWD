import { BaseItemSheet } from "./base-item-sheet.js";
import { SkillItem } from "./skill-item.js";

export class SkillItemSheet extends BaseItemSheet {

  activateListeners(html) {
    super.activateListeners(html);

    html.find('.select-skill-code').change(async event => {
      const skillCode = event.currentTarget.value
      const updates = SkillItem.prepareSkill(skillCode)
      if (updates) {
        await this.object.update(updates)
      }
    })
  }
}
