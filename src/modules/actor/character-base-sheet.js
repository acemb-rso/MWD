import { ANARCHY } from "../config.js";
import { AnarchyActorSheet } from "./anarchy-actor-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";

export class CharacterBaseSheet extends AnarchyActorSheet {

  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/actor/character.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: [...(super.DEFAULT_OPTIONS.classes ?? []), "character-sheet", "sra-enhanced"],
      position: {
        width: 720,
        height: 700
      }
    });
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    return foundry.utils.mergeObject(context, {
      options: {
        ...context.options,
        viewMode: this.viewMode ?? false
      }
    });
  }

  toggleViewMode() {
    this.viewMode = !this.viewMode;
    this.render();
  }

  activateListeners(html) {
    const jqHtml = html instanceof HTMLElement ? $(html) : html;
    super.activateListeners(jqHtml);

    // View mode toggle
    jqHtml.find('.click-toggle-view-mode').click(async event => {
      event.stopPropagation();
      this.toggleViewMode();
    });

    // cues, dispositions, keywords
    jqHtml.find('.click-word-add').click(async event => {
      event.stopPropagation();
      this.createNewWord(this.getEventWordType(event));
    });

    jqHtml.find('.click-word-say').click(async event => {
      event.stopPropagation();
      this.actor.sayWord(
        this.getEventWordType(event),
        this.getEventWordId(event));
    });

    jqHtml.find('.change-word-value').click(async event => {
      event.stopPropagation();
    });

    jqHtml.find('.change-word-value').change(async event => {
      event.stopPropagation();
      const newWordValue = event.currentTarget.value;
      await this.actor.updateWord(
        this.getEventWordType(event),
        this.getEventWordId(event),
        newWordValue);
    });

    jqHtml.find('.click-word-delete').click(async event => {
      event.stopPropagation();
      this.actor.deleteWord(
        this.getEventWordType(event),
        this.getEventWordId(event));
    });

    jqHtml.find(".click-celebrity-roll").click(async event => {
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
