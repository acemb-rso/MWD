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
      classes: ["character-sheet", "sra-enhanced"],
      position: {
        width: 720,
        height: 700
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
      this.viewMode = true;  // DEFAULT TO VIEW MODE
    }

    return foundry.utils.mergeObject(context, {
      options: {
        ...context.options,
        viewMode: this.viewMode ?? true
      },
      viewMode: this.viewMode ?? true
    });
  }

  // ApplicationV2 lifecycle method - attach listeners to a specific part
  _attachPartListeners(partId, htmlElement, options) {
    super._attachPartListeners(partId, htmlElement, options);
    
    // Only attach our listeners to the 'sheet' part
    if (partId === 'sheet') {
      this._attachViewModeListeners(htmlElement);
      this._attachImageEditListeners(htmlElement);
    }
  }

  // Attach image editing listeners
  _attachImageEditListeners(html) {
    const jqHtml = $(html);
    
    // Handle clicking on images with data-edit="img"
    jqHtml.find('img[data-edit="img"]').click(async (event) => {
      // Only allow editing in edit mode
      if (this.viewMode) {
        ui.notifications.info("Switch to edit mode to change the image.");
        return;
      }
      
      event.preventDefault();
      
      const fp = new FilePicker({
        type: "image",
        current: this.actor.img,
        callback: async (path) => {
          await this.actor.update({ img: path });
        }
      });
      
      fp.browse();
    });
  }

  // Separate method to attach view mode specific listeners
  _attachViewModeListeners(html) {
    const jqHtml = $(html);
    
    // View mode toggle
    jqHtml.find('.click-toggle-view-mode').click(async (event) => {
      event.preventDefault();
      event.stopPropagation();
      await this.toggleViewMode();
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

  async toggleViewMode() {
    this.viewMode = !this.viewMode;
    
    // Save view mode preference to actor flags for persistence
    try {
      await this.actor.setFlag('mwd', 'viewMode', this.viewMode);
      console.log('MWD | View mode toggled to:', this.viewMode);
    } catch (error) {
      console.error('MWD | Failed to save view mode:', error);
    }
    
    // ApplicationV2 render pattern
    await this.render(false, { parts: ['sheet'] });
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
