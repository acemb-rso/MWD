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

  // ============================================================================
  // CRITICAL FIX: ApplicationV2 requires explicit TABS configuration
  // ============================================================================
  static TABS = {
    primary: {
      id: "primary",
      group: "primary",
      navSelector: ".sheet-tabs",
      contentSelector: ".sheet-body",
      initial: "character"
    }
  };

  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["character-sheet", "sra-enhanced"],
      position: {
        width: 720,
        height: 900  // Increased from 700 to accommodate tab content
      },
      window: {
        resizable: true
      }
    });
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    // Load saved view mode from actor flags, defaulting to TRUE (view mode)
    const savedViewMode = this.actor.getFlag('mwd', 'viewMode');
    if (savedViewMode !== undefined) {
      this.viewMode = savedViewMode;
    } else if (this.viewMode === undefined) {
      this.viewMode = true;  // ← DEFAULT TO VIEW MODE
    }

    return foundry.utils.mergeObject(context, {
      options: {
        ...context.options,
        viewMode: this.viewMode ?? true  // ← Changed from false to true
      },
      viewMode: this.viewMode ?? true  // ← Changed from false to true
    });
  }

  // CRITICAL FIX: Use render() with force: false and parts to actually re-render in ApplicationV2
  async toggleViewMode() {
    this.viewMode = !this.viewMode;
    
    // Save view mode preference to actor flags for persistence
    try {
      await this.actor.setFlag('mwd', 'viewMode', this.viewMode);
      console.log('MWD | View mode toggled to:', this.viewMode);
    } catch (error) {
      console.error('MWD | Failed to save view mode:', error);
    }
    
    // ApplicationV2 requires specific render options to force a re-render
    // Using render(false, { parts: ['sheet'] }) tells it to re-render the sheet part
    await this.render(false, { parts: ['sheet'] });
  }

  activateListeners(html) {
    const jqHtml = html instanceof HTMLElement ? $(html) : html;
    super.activateListeners(jqHtml);

    // View mode toggle
    jqHtml.find('.click-toggle-view-mode').click(async event => {
      event.preventDefault();
      event.stopPropagation();
      await this.toggleViewMode();  // ← Made async
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
