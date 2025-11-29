import { ANARCHY } from "../config.js";
import { TEMPLATE, TEMPLATES_PATH } from "../constants.js";
import { Enums } from "../enums.js";

export class BaseItemSheet extends ItemSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      isGM: game.user.isGM,
      dragDrop: [{ dragSelector: ".item ", dropSelector: null }],
      classes: [game.system.anarchy.styles.selectCssClass(), "sheet", "item-sheet"],
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main" }],
    });
  }


  get title() {
    return game.i18n.localize(ANARCHY.itemType.singular[this.item.type]) + ': ' + this.item.name;
  }

  get template() {
    return `${TEMPLATES_PATH}/item/${this.object.type}.hbs`;
  }

  getData(options) {
    const actorAttributes = this.item.actor?.getAttributes(this.item);

    const usableAttribute = (this.item.actor
      ? attribute => actorAttributes.includes(attribute)
      : attribute => true)
    const withKnowledge = this.item.type == TEMPLATE.itemType.skill

    let hbsData = foundry.utils.mergeObject(
      super.getData(options),
      {
        options: {
          isGM: game.user.isGM,
          owner: this.document.isOwner,
          isOwned: (this.actor != undefined),
          editable: this.isEditable,
          cssClass: this.isEditable ? "editable" : "locked",
        },
        ENUMS: foundry.utils.mergeObject(Enums.getEnums(usableAttribute, withKnowledge), game.system.anarchy.modifiers.getEnums()),
        ANARCHY: ANARCHY
      });
    hbsData.system = this.item.system;

    return hbsData;
  }


  activateListeners(html) {
    super.activateListeners(html);

    // counters & monitors
    html.find('a.click-checkbar-element').click(async event =>
      await this.onClickMonitor(event)
    );

    html.find('.click-modifier-add').click(async event =>
      await this.item.createModifier()
    );
    html.find('.click-modifier-delete').click(async event =>
      await this.item.deleteModifier(this.getEventModifierId(event))
    );
    html.find('.input-modifier-value').change(async event =>
      await this.item.changeModifierValue(
        this.getEventModifierId(event),
        event.currentTarget.value)
    );
    html.find('.input-modifier-condition').change(async event =>
      await this.item.changeModifierCondition(
        this.getEventModifierId(event),
        event.currentTarget.value)
    );
    html.find('.select-modifier-change').change(async event =>
      await this.item.changeModifierSelection(
        this.getEventModifierId(event),
        this.getEventModifierSelect(event),
        event.currentTarget.value)
    );
  }

  async onClickMonitor(event) {
    if (this.item.parent) {
      const monitor = this.getEventMonitorCode(event);
      const sourceActorId = monitor == 'marks' ?
        $(event.currentTarget).closest('.anarchy-marks').attr('data-actor-id')
        : undefined;
      await this.item.parent.switchMonitorCheck(
        monitor,
        this.getEventMonitorIndex(event),
        this.isEventMonitorChecked(event),
        sourceActorId,
        item
      );
    }
  }

  getEventMonitorCode(event) {
    return $(event.currentTarget).closest('.checkbar-root').attr('data-monitor-code');
  }

  getEventMonitorIndex(event) {
    return Number.parseInt($(event.currentTarget).attr('data-index'));
  }

  isEventMonitorChecked(event) {
    return $(event.currentTarget).attr('data-checked') == 'true';
  }

  getEventModifierId(event) {
    return $(event.currentTarget).closest('.define-modifier').attr('data-modifier-id');
  }
  getEventModifierSelect(event) {
    return $(event.currentTarget).attr('data-modifier-select');
  }
}
