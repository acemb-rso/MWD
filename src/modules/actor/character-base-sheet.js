import { ANARCHY } from "../config.js";
import { AnarchyActorSheet } from "./anarchy-actor-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";

export class CharacterBaseSheet extends AnarchyActorSheet {

  get template() {
    return `${TEMPLATES_PATH}/actor/character.hbs`;
  }

  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      resizable: true,
      position: {
        width: 720,
        height: 700
      },
      viewMode: false,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", group: "primary", initial: "character" }],
    });
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const viewMode = this.options.viewMode ?? false;

    return foundry.utils.mergeObject(context, {
      options: {
        viewMode
      }
    });
  }

  toggleViewMode() {
    this.options.viewMode = !this.options.viewMode;
    this.render();
  }

  activateListeners(html) {
    const jqHtml = html instanceof HTMLElement ? $(html) : html;
    const element = jqHtml[0];
    super.activateListeners(jqHtml);

    const defaultTab = "character";

    // Enable tab navigation so sheet content renders
    this._tabs ??= new foundry.applications.api.Tabs({
      navSelector: ".sheet-tabs",
      contentSelector: ".sheet-body",
      group: "primary",
      initial: defaultTab
    });
    this._tabs.bind(element);
    this._ensureActiveTab(element, defaultTab);

    jqHtml.find('.click-toggle-view-mode').click(async event => this.toggleViewMode())

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

  _ensureActiveTab(element, tabName, group = "primary") {
    const navElement = element.querySelector(`.sheet-tabs[data-group="${group}"]`);
    const navLinks = navElement?.querySelectorAll("[data-tab]") ?? [];
    const tabContents = element.querySelectorAll(`.tab[data-group="${group}"]`);

    const navActivated = Array.from(navLinks).some(link => link.classList.contains("active"));
    const tabActivated = Array.from(tabContents).some(tab => tab.classList.contains("active"));

    if (navActivated && tabActivated) return;

    navLinks.forEach(link => link.classList.toggle("active", link.dataset.tab === tabName));
    tabContents.forEach(tab => tab.classList.toggle("active", tab.dataset.tab === tabName));
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