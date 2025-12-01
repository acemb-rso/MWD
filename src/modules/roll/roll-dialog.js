import { ANARCHY } from "../config.js";
import { ANARCHY_SYSTEM, TEMPLATE, TEMPLATES_PATH } from "../constants.js";
import { Enums } from "../enums.js";
import { Misc } from "../misc.js";
import { DiceCursor } from "./dice-cursor.js";
import { ROLL_PARAMETER_CATEGORY } from "./roll-parameters.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const { loadTemplates, renderTemplate } = foundry.applications.handlebars;

/**
 * Roll dialog implemented with ApplicationV2.
 */
export class RollDialog extends HandlebarsApplicationMixin(ApplicationV2) {

  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      id: "roll-dialog",
      classes: ["anarchy-dialog"],
      position: { width: 500, height: "auto" },
      window: {
        resizable: true,
        minimizable: true
      }
    });
  }

  static PARTS = {
    body: {
      template: `${TEMPLATES_PATH}/roll/roll-dialog.hbs`
    }
  };

  static init() {
    Hooks.once('ready', async () => await this.onReady());
  }

  static async onReady() {
    await loadTemplates([
      'systems/mwd/templates/roll/roll-parameters-category.hbs',
      'systems/mwd/templates/roll/parts/generic.hbs',
      'systems/mwd/templates/roll/parts/image-attribute.hbs',
      'systems/mwd/templates/roll/parts/image-attributeAction.hbs',
      'systems/mwd/templates/roll/parts/image-defense.hbs',
      'systems/mwd/templates/roll/parts/image-skill.hbs',
      'systems/mwd/templates/roll/parts/image-weapon.hbs',
    ]);
  }

  static prepareActorRoll(actor, item = undefined) {
    return {
      actor: actor,
      tokenId: actor.token?.id,
      attributes: actor.getUsableAttributes(item),
      options: {
        canUseEdge: actor.canUseEdge()
      }
    }
  }

  static async rollAttribute(actor, attribute) {
    const rollData = foundry.utils.mergeObject(RollDialog.prepareActorRoll(actor), {
      mode: ANARCHY_SYSTEM.rollType.attribute,
      attribute1: attribute
    });
    await RollDialog.create(rollData);
  }

  static async rollAttributeAction(actor, action) {
    const rollData = foundry.utils.mergeObject(RollDialog.prepareActorRoll(actor), {
      mode: ANARCHY_SYSTEM.rollType.attributeAction,
      attributeAction: action.code,
      attribute1: action.attributeFunction1(actor),
      attribute2: action.attributeFunction2(actor),
    });
    await RollDialog.create(rollData);
  }

  static async rollSkill(actor, skill, specialization) {
    const rollData = foundry.utils.mergeObject(RollDialog.prepareActorRoll(actor), {
      mode: ANARCHY_SYSTEM.rollType.skill,
      skill: skill,
      attribute1: skill?.system.attribute ?? TEMPLATE.attributes.agility,
      specialization: specialization,
    });
    await RollDialog.create(rollData);
  }

  static async rollWeapon(actor, skill, weapon, targeting) {
    const rollData = foundry.utils.mergeObject(RollDialog.prepareActorRoll(actor), {
      mode: ANARCHY_SYSTEM.rollType.weapon,
      weapon: weapon,
      skill: skill,
      attribute1: skill?.system.attribute ?? actor.getPhysicalAgility(),
      specialization: skill?.system.specialization,
      targeting: targeting
    });
    await RollDialog.create(rollData);
  }

  static async rollDefense(actor, action, attack, pilot = undefined) {
    const rollData = foundry.utils.mergeObject(RollDialog.prepareActorRoll(actor), {
      mode: ANARCHY_SYSTEM.rollType.defense,
      attribute1: action.attributeFunction1(actor),
      attribute2: action.attributeFunction2(actor),
      defenseAction: action.code,
      attackRoll: attack.attackRoll,
      tokenId: attack.defenderTokenId,
      choiceChatMessageId: attack.choiceChatMessageId,
    });
    await RollDialog.create(rollData);
  }

  static async itemAttributeRoll(item, attribute) { 
    const rollData = foundry.utils.mergeObject(RollDialog.prepareActorRoll(item.actor), { 
      mode: ANARCHY_SYSTEM.rollType.attribute, 
      item: item, 
      attribute1: attribute, 
      attributes: item.actor.getUsableAttributes(item) 
    }); 
    await RollDialog.create(rollData); 
  } 

  static async create(roll) { 
    const preparedRoll = RollDialog.#prepareRollData(roll);
    const title = await renderTemplate(`${TEMPLATES_PATH}/roll/roll-dialog-title.hbs`, preparedRoll);
    const app = new RollDialog(preparedRoll, title);
    return app.render({ force: true });
  }

  static #prepareRollData(roll) {
    const rollParameters = game.system.anarchy.rollParameters.build(roll).sort(Misc.ascending(p => p.order ?? 200));
    return foundry.utils.mergeObject(roll, {
      ENUMS: Enums.getEnums(attributeName => roll.attributes.includes(attributeName)),
      ANARCHY: ANARCHY,
      parameters: rollParameters
    });
  }


  constructor(roll, title) {
    const options = foundry.utils.mergeObject(RollDialog.DEFAULT_OPTIONS, {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...RollDialog.DEFAULT_OPTIONS.classes],
      window: { title: title }
    }, { inplace: false });

    super(options);
    this.roll = roll;
  }

  async _prepareContext() {
    return this.roll;
  }

  async activateListeners(html) {
    const element = html instanceof HTMLElement ? html : html[0];
    await super.activateListeners(element);
    this.html = $(element);

    this.html.find('.select-attribute-parameter').change(async event => {
      const parameter = this._getRollParameter(event);
      const item = this._getEventItem(event, this.roll.actor);
      const selected = event.currentTarget.value;
      const value = this.roll.actor.getAttributeValue(selected, item);
      this.roll[parameter.code] = selected;
      await this._setParameterSelectedOption(parameter, selected, value);
    });

    this.html.find('.check-optional').click(async event => {
      const parameter = this._getRollParameter(event);
      parameter.onChecked(parameter, event.currentTarget.checked);
      if (parameter.category == ROLL_PARAMETER_CATEGORY.pool) {
        await this._updateParameterValue(parameter, parameter.value)
      }
      if (parameter.code == 'edge') {
        this.html.find(`.parameter[data-parameter-code='${parameter.code}'] .edge-pool-select`)
          .prop('disabled', !parameter.used);
      }
    });

    this.activateDiceParameterClick();

    this.html.find('input.parameter-value:not(:disabled)').on('input', async event => {
      const parameter = this._getRollParameter(event);
      const value = Number.parseInt(event.currentTarget.value) ?? 0;
      await this._updateParameterValue(parameter, value);
    });

    this.html.find('.select-option-parameter').change(async event => {
      const parameter = this._getRollParameter(event);
      const selected = event.currentTarget.value;
      const value = Number.parseInt(selected);
      await this._setParameterSelectedOption(parameter, selected, value);
    });

    this.html.find('.edge-pool-select').change(async event => {
      const parameter = this._getRollParameter(event);
      parameter.pool = event.currentTarget.value;
    });
  }

  activateDiceParameterClick() {
    this.html.find('.input-cursor-parameter a').click(async (event) => {
      const parameter = this._getRollParameter(event);
      if (parameter.flags?.editDice) {
        const clickedValue = Number.parseInt(this.html.find(event.currentTarget).attr('data-dice')) ?? 0;
        const value = (parameter.value != clickedValue || clickedValue == 0)
          ? clickedValue
          : (clickedValue > 0 ? clickedValue - 1 : clickedValue + 1)
        await this._updateParameterValue(parameter, value);
      }
    });
  }

  async _setParameterSelectedOption(parameter, selected, value) {
    parameter.onChecked(parameter, selected);
    parameter.max = value;
    await this._updateParameterValue(parameter, value);
  }

  async _updateParameterValue(parameter, value) {
    parameter.onValue(parameter, value);

    this.html.find(`.parameter[data-parameter-code='${parameter.code}'] .parameter-value`)
      .text(value);

    const diceCursorHtml = await this.renderDiceCursor(parameter);
    const diceCursor = this.html.find(`.parameter[data-parameter-code='${parameter.code}'] .input-cursor-parameter`);
    diceCursor
      .empty()
      .append(diceCursorHtml);
    this.activateDiceParameterClick();

    const inputs = this.html.find(`.parameter[data-parameter-code='${parameter.code}'] input.parameter-value`);
    inputs.val(parameter.value);
  }

  async renderDiceCursor(parameter) {
    return await DiceCursor.diceCursor({
      value: parameter.value,
      min: parameter.min,
      max: parameter.max,
      editable: parameter.flags?.editDice
    });
  }

  _getSelectedOption(parameter) {
    return this.html.find(`.parameter[data-parameter-code='${parameter.code}'] select.select-option-parameter option:selected`)
      .text();
  }

  _getEventItem(event, actor) {
    const itemId = this.html.find(event.currentTarget).closest('.parameter').attr('data-item-id');
    return itemId ? actor.items.get(itemId) : undefined;
  }

  _getRollParameter(event) {
    const code = this.html.find(event.currentTarget).closest('.parameter').attr('data-parameter-code');
    return this.roll.parameters.find(it => it.code == code);
  }
}