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
      initial: "character",
      tabs: [
        { id: "character" },
        { id: "skills" },
        { id: "traits" },
        { id: "life-modules" },
        { id: "inventory" },
        { id: "biography" }
      ]
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

   /**
   * AppV2-compliant listener hook for the character sheet.
   * We attach all our click handlers here instead of using activateListeners.
   */
  _attachPartListeners(partId, htmlElement, options) {
    // Let the base AnarchyActorSheet wire up its own actions & legacy handlers
    super._attachPartListeners(partId, htmlElement, options);

    // We only care about the main sheet part
    if (partId !== "sheet") return;

    const jqHtml = htmlElement instanceof HTMLElement ? $(htmlElement) : htmlElement;

    // ─────────────────────────────────────────────────────
    // View mode toggle (lock icon in the header)
    // ─────────────────────────────────────────────────────
    jqHtml.find(".click-toggle-view-mode").on("click", async event => {
      event.preventDefault();
      event.stopPropagation();
      await this.toggleViewMode();
    });

    // ─────────────────────────────────────────────────────
    // Words: cues, dispositions, keywords, etc.
    // ─────────────────────────────────────────────────────

    // Add new word
    jqHtml.find(".click-word-add").on("click", async event => {
      event.stopPropagation();
      this.createNewWord(this.getEventWordType(event));
    });

    // “Say” a word (for cues / dispositions)
    jqHtml.find(".click-word-say").on("click", async event => {
      event.stopPropagation();
      this.actor.sayWord(
        this.getEventWordType(event),
        this.getEventWordId(event)
      );
    });

    // Focus on word input
    jqHtml.find(".change-word-value").on("click", async event => {
      event.stopPropagation();
    });

    // Change a word’s text
    jqHtml.find(".change-word-value").on("change", async event => {
      event.stopPropagation();
      const newWordValue = event.currentTarget.value;
      await this.actor.updateWord(
        this.getEventWordType(event),
        this.getEventWordId(event),
        newWordValue
      );
    });

    // Delete word
    jqHtml.find(".click-word-delete").on("click", async event => {
      event.stopPropagation();
      this.actor.deleteWord(
        this.getEventWordType(event),
        this.getEventWordId(event)
      );
    });

    // Celebrity roll (button in the words panel)
    jqHtml.find(".click-celebrity-roll").on("click", async event => {
      event.stopPropagation();
      this.actor.rollCelebrity();
    });
  }

  createNewWord(wordType) {
    const word = ANARCHY.common.newEntry;
    this.actor.createWord(wordType, word);
  }

  getEventWordType(event) {
    return $(event.currentTarget).closest('.define-wordType').attr('data-word-type');
  }

  getEventWordId(event) {
    return $(event.currentTarget).closest('.define-wordType').attr('data-word-id');
  }
}
