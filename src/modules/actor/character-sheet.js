import { TEMPLATES_PATH } from "../constants.js";
import { CharacterBaseSheet } from "./character-base-sheet.js";

export class CharacterActorSheet extends CharacterBaseSheet {

  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/actor/character.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      position: {
        width: 1100,
        height: 900
      }
    });
  }

  activateListeners(html) {
    super.activateListeners(html);

    const actorId = this.actor._id;
    const jqHtml = html instanceof HTMLElement ? $(html) : html;
    
    jqHtml.find('.click-section').on("click", function () {
      const sectionClass = ($(this).data('class'));
      jqHtml.find(`.${sectionClass}`).toggleClass('closed');
      localStorage.setItem(`${actorId}-${sectionClass}`, jqHtml.find(`.${sectionClass}`).hasClass('closed') ? 'closed' : null);
    });
  }
}
