import { ANARCHY } from "../config.js";
import { AnarchyActorSheet } from "./anarchy-actor-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";

export class CharacterBaseSheet extends AnarchyActorSheet {

  get template() {
    return `${TEMPLATES_PATH}/actor/character.hbs`;
  }

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 720,
      height: 700,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main" }],
    });
  }

  getData(options) {
    if (this.viewMode == undefined) {
      this.viewMode = true
    }
    const essence = this.actor.computeEssence();
    const hbsData = foundry.utils.mergeObject(
      super.getData(options),
      {
        essence: {
          value: essence,
          adjust: this.actor.computeMalusEssence(essence)
        },
        options: {
          viewMode: this.viewMode
        }
      });
    return hbsData;
  }

  toggleViewMode() {
    this.viewMode = !this.viewMode
    this.render()
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find('.click-toggle-view-mode').click(async event => this.toggleViewMode())

    // cues, dispositions, keywords
    html.find('.click-word-add').click(async event => {
      event.stopPropagation();
      this.createNewWord(this.getEventWordType(event));
    });

    html.find('.click-word-say').click(async event => {
      event.stopPropagation();
      this.actor.sayWord(
        this.getEventWordType(event),
        this.getEventWordId(event));
    });

    html.find('.change-word-value').click(async event => {
      event.stopPropagation();
    });


    html.find('.change-word-value').change(async event => {
      event.stopPropagation();
      const newWordValue = event.currentTarget.value;
      await this.actor.updateWord(
        this.getEventWordType(event),
        this.getEventWordId(event),
        newWordValue);
    });

    html.find('.click-word-delete').click(async event => {
      event.stopPropagation();
      this.actor.deleteWord(
        this.getEventWordType(event),
        this.getEventWordId(event));
    });

    html.find(".click-celebrity-roll").click(async event => {
      event.stopPropagation();
      this.actor.rollCelebrity();
    });
  }

  createNewWord(wordType) {
    const word = game.i18n.localize(ANARCHY.common.newEntry);
    this.actor.createWord(wordType, word);
  }

  getEventWordType(event) {
    return $(event.currentTarget).closest('.define-wordType').attr('data-word-type');
  }

  getEventWordId(event) {
    return $(event.currentTarget).closest('.define-wordType').attr('data-word-id');
  }

}