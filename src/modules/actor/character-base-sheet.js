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
    console.log('MWD | _prepareContext - savedViewMode from flag:', savedViewMode);
    console.log('MWD | _prepareContext - this.viewMode before:', this.viewMode);
    
    if (savedViewMode !== undefined) {
      this.viewMode = savedViewMode;
    } else if (this.viewMode === undefined) {
      this.viewMode = true;  // DEFAULT TO VIEW MODE
    }
    
    console.log('MWD | _prepareContext - this.viewMode after:', this.viewMode);

    const result = foundry.utils.mergeObject(context, {
      options: {
        ...context.options,
        viewMode: this.viewMode ?? true
      },
      viewMode: this.viewMode ?? true
    });
    
    console.log('MWD | _prepareContext - context.options.viewMode:', result.options.viewMode);
    return result;
  }

  async toggleViewMode() {
    console.log('MWD | toggleViewMode CALLED');
    console.log('MWD | toggleViewMode - viewMode before:', this.viewMode);
    
    this.viewMode = !this.viewMode;
    
    console.log('MWD | toggleViewMode - viewMode after:', this.viewMode);
    
    // Save view mode preference to actor flags for persistence
    try {
      await this.actor.setFlag('mwd', 'viewMode', this.viewMode);
      console.log('MWD | toggleViewMode - Flag saved successfully');
    } catch (error) {
      console.error('MWD | toggleViewMode - Failed to save flag:', error);
    }
    
    // ApplicationV2 render pattern
    console.log('MWD | toggleViewMode - Calling render...');
    await this.render(false, { parts: ['sheet'] });
    console.log('MWD | toggleViewMode - Render complete');
  }

  activateListeners(html) {
    const jqHtml = html instanceof HTMLElement ? $(html) : html;
    console.log('MWD | activateListeners CALLED');
    console.log('MWD | activateListeners - html type:', html instanceof HTMLElement ? 'HTMLElement' : 'jQuery');
    
    super.activateListeners(jqHtml);

    // Count how many elements match the selector
    const toggleButtons = jqHtml.find('.click-toggle-view-mode');
    console.log('MWD | activateListeners - Found .click-toggle-view-mode elements:', toggleButtons.length);
    
    toggleButtons.each((index, element) => {
      console.log(`MWD | activateListeners - Element ${index}:`, {
        tagName: element.tagName,
        className: element.className,
        hasClickHandler: !!$(element).data('events')?.click
      });
    });

    // View mode toggle with extensive logging
    toggleButtons.click(async (event) => {
      console.log('MWD | CLICK HANDLER FIRED!');
      console.log('MWD | Click event:', event);
      console.log('MWD | Click target:', event.target);
      console.log('MWD | Click currentTarget:', event.currentTarget);
      
      event.preventDefault();
      event.stopPropagation();
      
      console.log('MWD | About to call toggleViewMode...');
      await this.toggleViewMode();
      console.log('MWD | toggleViewMode returned');
    });
    
    console.log('MWD | activateListeners - Click handler attached');

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
    
    console.log('MWD | activateListeners - All handlers attached');
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
