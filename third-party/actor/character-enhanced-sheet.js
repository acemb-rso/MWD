import { TEMPLATES_PATH } from "../constants.js";
import { CharacterBaseSheet } from "./character-base-sheet.js";
import "../../styles/character-enhanced-sheet.scss";

export class CharacterEnhancedSheet extends CharacterBaseSheet {

  get template() {
    return `${TEMPLATES_PATH}/actor/character-enhanced.hbs`;
  }

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 800,
      height: 700,
    });
  }
  activateListeners(html) {
    super.activateListeners(html);

    const actorId = this.actor._id;
    html.find('.click-section').on("click", function () {
      const sectionClass = ($(this).data('class'));
      html.find(`.${sectionClass}`).toggleClass('closed');
      localStorage.setItem(`${actorId}-${sectionClass}`, html.find(`.${sectionClass}`).hasClass('closed') ? 'closed' : null);
    });
  }

  static ifTabClosed(id, sectionName, option) {
    const isTabClosed = localStorage.getItem(`${id}-section-${sectionName}`) === "closed";
    if (isTabClosed) {
      return option.fn(this);
    }
    return option.inverse(this);
  }

  static actorTabClosed(id, sectionName, option) {
    const isTabClosed = localStorage.getItem(`${id}-section-${sectionName}`) === "closed";
    if (isTabClosed) {
      return 'closed'
    }
    return ''
  }
}