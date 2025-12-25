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
  // ApplicationV2 tabs configuration
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
    // IMPORTANT: Do NOT overwrite classes, append to the base classes so styling works.
    const base = super.DEFAULT_OPTIONS;

    return foundry.utils.mergeObject(
      base,
      {
        classes: [ ...(base.classes ?? []), "character-sheet", "sra-enhanced" ],
        position: {
          width: 720,
          height: 900
        },
        window: {
          resizable: true
        }
      },
      { inplace: false }
    );
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    // Load saved view mode from actor flags, defaulting to TRUE (view mode)
    const savedViewMode = this.actor.getFlag("mwd", "viewMode");
    if (savedViewMode !== undefined) {
      this.viewMode = savedViewMode;
    } else if (this.viewMode === undefined) {
      this.viewMode = true; // DEFAULT TO VIEW MODE
    }

    return foundry.utils.mergeObject(context, {
      options: {
        ...context.options,
        viewMode: this.viewMode ?? true
      },
      viewMode: this.viewMode ?? true
    });
  }

  // AppV2: use render() to re-render parts
  async toggleViewMode() {
    this.viewMode = !this.viewMode;

    try {
      await this.actor.setFlag("mwd", "viewMode", this.viewMode);
      console.log("MWD | View mode toggled to:", this.viewMode);
    } catch (error) {
      console.error("MWD | Failed to save view mode:", error);
    }

    await this.render(false, { parts: ["sheet"] });
  }

  /**
   * AppV2-compliant listener hook for the character sheet.
   */
  _attachPartListeners(partId, htmlElement, options) {
    super._attachPartListeners(partId, htmlElement, options);
    if (partId !== "sheet") return;

    const jqHtml = htmlElement instanceof HTMLElement ? $(htmlElement) : htmlElement;

    // View mode toggle (lock icon)
    jqHtml.find(".click-toggle-view-mode").on("click", async event => {
      event.preventDefault();
      event.stopPropagation();
      await this.toggleViewMode();
    });

    // Add new word
    jqHtml.find(".click-word-add").on("click", async event => {
      event.stopPropagation();
      this.createNewWord(this.getEventWordType(event));
    });

    // “Say” a word
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

    // Celebrity roll
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
    return $(event.currentTarget).closest(".define-wordType").attr("data-word-type");
  }

  getEventWordId(event) {
    return $(event.currentTarget).closest(".define-wordType").attr("data-word-id");
  }
}
