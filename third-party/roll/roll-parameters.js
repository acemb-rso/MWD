import { ANARCHY } from "../config.js";
import { ANARCHY_SYSTEM, LOG_HEAD, TEMPLATE, TEMPLATES_PATH } from "../constants.js";
import { Enums } from "../enums.js";
import { ANARCHY_HOOKS, HooksManager } from "../hooks-manager.js";
import { MATRIX } from "../matrix-helper.js";
import { Misc } from "../misc.js";
import { Modifiers } from "../modifiers/modifiers.js";

export const ROLL_PARAMETER_CATEGORY = {
  title: 'title',
  pool: 'pool',
  reroll: 'reroll',
  rerollForced: 'rerollForced',
  successReroll: 'successReroll',
  glitch: 'glitch',
  drain: 'drain',
  convergence: 'convergence',
  edge: 'edge',
  risk: 'risk',
  opponentPool: 'opponentPool',
  opponentReroll: 'opponentReroll'
}

const DEFAULT_ROLL_PARAMETERS = [
  // attribute1
  {
    code: 'attribute1',
    options: {
      order: 1, category: ROLL_PARAMETER_CATEGORY.pool,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/select-attribute.hbs`,
    },
    condition: context => Object.values(ANARCHY_SYSTEM.rollType).includes(context.mode),
    isUsed: (p) => true,
    factory: context => {
      const attribute = context.attribute1 ?? context.skill?.system.attribute;
      return {
        labelkey: attribute ? ANARCHY.attributes[attribute] : ANARCHY.attributes.noAttributes,
        value: context.actor.getAttributeValue(attribute, context.activeItem),
        flags: { editable: context.skill },
        selected: attribute,
        choices: Enums.getAttributes(it => context.attributes.includes(it))
      }
    }
  },

  // attribute2
  {
    code: 'attribute2',
    options: {
      order: 1, category: ROLL_PARAMETER_CATEGORY.pool,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${TEMPLATES_PATH}/chat/parts/pool-attribute2.hbs`,
    },
    condition: context => [ANARCHY_SYSTEM.rollType.attribute, ANARCHY_SYSTEM.rollType.attributeAction, ANARCHY_SYSTEM.rollType.defense].includes(context.mode),
    isUsed: (p) => p.used,
    onChecked: (p, selected) => p.used = selected ? true : false,
    factory: context => {
      const attribute = context.attribute2
      return {
        labelkey: attribute ? ANARCHY.attributes[attribute] : ANARCHY.attributes.noAttributes,
        value: context.actor.getAttributeValue(attribute, context.activeItem),
        flags: { editable: ANARCHY_SYSTEM.rollType.attribute == context.mode },
        selected: attribute,
        choices: Enums.getAttributes(it => context.attributes.includes(it))
      };
    }
  },

  // skill
  {
    code: 'skill',
    options: {
      flags: {},
      order: 3, category: ROLL_PARAMETER_CATEGORY.pool,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/input-numeric.hbs`,
    },
    condition: context => ['skill', 'weapon'].includes(context.mode),
    factory: context => {
      return {
        label: context.skill?.name,
        value: context.skill?.system.value ?? 0,
      };
    }
  },
  // specialization
  {
    code: 'specialization',
    options: {
      flags: { optional: true, },
      value: 2,
      order: 4, category: ROLL_PARAMETER_CATEGORY.pool,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/check-option.hbs`,
    },
    isUsed: (p) => p.used,
    condition: context => (context.mode == 'skill' && context.specialization)
      || (context.mode == 'weapon' && context.skill?.system.specialization),
    onChecked: (p, checked) => {
      p.used = checked;
      p.value = checked ? 2 : 0;
    },
    factory: context => {
      return {
        label: context.specialization ?? context.skill.system.specialization,
        used: context.specialization != undefined,
        value: 2
      }
    }
  },
  // credibility usage
  {
    code: 'credibility',
    options: {
      flags: { editDice: true, editable: true },
      order: 5, category: ROLL_PARAMETER_CATEGORY.pool,
      value: 0,
      labelkey: ANARCHY.common.roll.modifiers.social.credibility,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/input-numeric.hbs`,
    },
    condition: context => context.skill?.system.isSocial && context.actor.getCredibilityValue() > 0,
    factory: context => {
      return {
        min: 0,
        max: Math.min(context.actor.getCredibilityValue(), 3),
      }
    }
  },
  // modifiers bonus
  {
    code: 'poolModifiers',
    options: {
      flags: { editDice: true, editable: true, },
      labelkey: ANARCHY.common.roll.modifiers.poolModifiers,
      order: 5, category: ROLL_PARAMETER_CATEGORY.pool,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/input-numeric.hbs`,
      min: -4, max: 4
    },
    factory: context => RollParameters.computeRollModifiers(ROLL_PARAMETER_CATEGORY.pool, context)
  },
  // wounds
  {
    code: 'wounds',
    options: {
      flags: { optional: true, },
      order: 10, category: ROLL_PARAMETER_CATEGORY.pool,
      labelkey: ANARCHY.common.roll.modifiers.wounds,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/input-numeric.hbs`,
    },
    isUsed: (p) => p.used,
    condition: context => context.actor.getWounds(),
    onChecked: (p, checked) => {
      p.used = checked
      p.value = checked ? - p.wounds : 0
    },
    factory: context => {
      const wounds = context.actor.getWounds();
      return {
        wounds: wounds,
        min: - wounds, max: 0,
        value: - wounds,
        used: true,
      }
    }
  },
  // modifier for deckers/technomancers connected in virtual reality
  {
    code: 'virtualReality',
    options: {
      flags: { editDice: false, editable: false },
      order: 24, category: ROLL_PARAMETER_CATEGORY.pool,
      value: 1,
      labelkey: ANARCHY.common.roll.modifiers.virtualReality,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/input-numeric.hbs`,
      min: 1, max: 1,
    },
    condition: context => context.actor.isMatrixSkill(context.skill) && context.actor.isMatrixConnected(MATRIX.connectionMode.virtual),
    factory: context => {
      return {
        flags: { used: context.actor.isMatrixSkill(context.skill) && context.actor.isMatrixConnected(MATRIX.connectionMode.virtual) },
      }
    }
  },
  // other modifiers
  {
    code: 'other',
    options: {
      flags: { editDice: true, editable: true },
      order: 25, category: ROLL_PARAMETER_CATEGORY.pool,
      value: 0,
      labelkey: ANARCHY.common.roll.modifiers.other,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/input-numeric.hbs`,
      min: -5, max: 5
    }
  },
  // Drain
  {
    code: 'drain',
    options: {
      flags: { editDice: true, editable: true, forceDisplay: true, },
      order: 40, category: ROLL_PARAMETER_CATEGORY.drain,
      labelkey: ANARCHY.common.roll.modifiers.drain,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/input-numeric.hbs`,
      min: 0, max: 6
    },
    condition: context => (context.mode == 'skill' || context.mode == 'weapon') && context.skill?.system.hasDrain,
    factory: context => {
      return {
        value: context.mode == 'weapon' && context.weapon.hasDrain ? context.weapon.system.drain : 1
      }
    }
  },
  // convergence
  {
    code: 'convergence',
    options: {
      flags: { editDice: false, optional: true, used: true, hideParameter: true },
      order: 40, category: ROLL_PARAMETER_CATEGORY.convergence,
      value: 1,
      labelkey: ANARCHY.common.roll.modifiers.convergence,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/check-option.hbs`
    },
    isUsed: (p) => p.used,
    condition: context => (context.mode == 'skill' || context.mode == 'weapon') && context.skill?.system.hasConvergence,
    onChecked: (p, checked) => {
      p.used = checked;
      p.value = checked ? 1 : 0;
    },
  },
  // glitch
  {
    code: 'glitch',
    options: {
      flags: { editDice: true, editable: true, forceDisplay: true, },
      order: 50, category: ROLL_PARAMETER_CATEGORY.glitch,
      labelkey: ANARCHY.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${TEMPLATES_PATH}/chat/parts/glitch.hbs`,
      min: 0, max: 5
    },
    isUsed: (p) => p.value > 0,
    factory: context => {
      const wounds = context.actor.getWounds();
      const glitchModifiers = RollParameters.computeRollModifiers(ROLL_PARAMETER_CATEGORY.glitch, context);
      return {
        value: (wounds == 0 ? 0 : 1) + (context.glitch ?? 0) + glitchModifiers.value,
      }
    }
  },
  // social rumor
  {
    code: 'rumor',
    options: {
      flags: { editDice: true, editable: true },
      order: 50, category: ROLL_PARAMETER_CATEGORY.glitch,
      value: 0,
      labelkey: ANARCHY.common.roll.modifiers.social.rumor,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${TEMPLATES_PATH}/chat/parts/glitch.hbs`,
      min: 0, max: 1,
    },
    condition: context => context.skill?.system.isSocial && context.actor.getRumorValue() > 0
  },
  // rerolls
  {
    code: 'reroll',
    options: {
      flags: { editDice: true, editable: true, },
      order: 30, category: ROLL_PARAMETER_CATEGORY.reroll,
      labelkey: ANARCHY.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/input-numeric.hbs`,
      min: 0, max: 4
    },
    factory: context => RollParameters.computeRollModifiers(ROLL_PARAMETER_CATEGORY.reroll, context)
  },
  // reduction from opponent
  {
    code: 'reduced',
    options: {
      order: 29, category: ROLL_PARAMETER_CATEGORY.pool,
      labelkey: ANARCHY.common.roll.modifiers.reduced,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/input-numeric.hbs`,
      min: -4, max: 0
    },
    condition: context => (context.attackRoll?.param.opponentPool ?? 0) != 0,
    factory: context => {
      const reduced = -(context.attackRoll?.param.opponentPool ?? 0);
      return {
        flags: { editDice: true, used: true },
        value: reduced,
      }
    }
  },
  // forced success rerolls
  {
    code: 'rerollForced',
    options: {
      order: 31, category: ROLL_PARAMETER_CATEGORY.rerollForced,
      labelkey: ANARCHY.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/input-numeric.hbs`,
      min: -5, max: 0
    },
    factory: context => {
      const rerollForced = RollParameters.computeRollModifiers(ROLL_PARAMETER_CATEGORY.successReroll, context);
      rerollForced.value = -rerollForced.value - (context.attackRoll?.param.opponentReroll ?? 0);
      return foundry.utils.mergeObject(rerollForced, {
        flags: { editDice: true, used: true, editable: true },
      });
    }
  },
  // anarchy dispositions
  {
    code: 'anarchyDisposition',
    options: {
      flags: { optional: true, isAnarchy: true, forceDisplay: true, },
      order: 70, category: ROLL_PARAMETER_CATEGORY.pool,
      value: 0,
      min: 0, max: 3,
      labelkey: ANARCHY.common.roll.modifiers.anarchyDisposition,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/check-option.hbs`,
    },
    isUsed: (p) => p.used,
    condition: context => context.actor.getAnarchyValue() > 0,
    onChecked: (p, checked) => {
      p.used = checked;
      p.value = checked ? 3 : 0;
    },
  },
  // anarchy take risks
  {
    code: 'anarchyRisk',
    options: {
      flags: { optional: true, isAnarchy: true, forceDisplay: true, },
      order: 70, category: ROLL_PARAMETER_CATEGORY.risk,
      value: 0,
      labelkey: ANARCHY.common.roll.modifiers.anarchyRisk,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/check-option.hbs`,
      hbsTemplateChat: `${TEMPLATES_PATH}/chat/parts/anarchy-risk.hbs`,
    },
    isUsed: (p) => p.used,
    condition: context => context.actor.getAnarchyValue() > 0,
    onChecked: (p, checked) => {
      p.used = checked;
      p.value = checked ? 1 : 0;
    },
  },
  // edge
  {
    code: 'edge',
    options: {
      flags: { optional: true, forceDisplay: true, },
      value: 0,
      order: 70, category: ROLL_PARAMETER_CATEGORY.edge,
      labelkey: ANARCHY.common.roll.modifiers.edge,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/check-option.hbs`,
    },
    isUsed: (p) => p.used,
    condition: context => context.options.canUseEdge && context.actor.getRemainingEdge(),
    onChecked: (p, checked) => {
      p.used = checked;
      p.value = checked ? 1 : 0;
    },
  },
  // reduce opponent pool
  {
    code: 'opponentPool',
    options: {
      flags: { editDice: true, editable: true, forceDisplay: true, },
      order: 100, category: ROLL_PARAMETER_CATEGORY.opponentPool,
      labelkey: ANARCHY.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/input-numeric.hbs`,
      min: 0, max: 4
    },
    factory: context => RollParameters.computeRollModifiers(ROLL_PARAMETER_CATEGORY.opponentPool, context),
    condition: context => !context.attributeAction
  },
  // force opponent rerolls
  {
    code: 'opponentReroll',
    options: {
      flags: { editDice: true, editable: true, forceDisplay: true, },
      order: 100, category: ROLL_PARAMETER_CATEGORY.opponentReroll,
      value: 0,
      labelkey: ANARCHY.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/input-numeric.hbs`,
      min: 0, max: 4
    },
    factory: context => RollParameters.computeRollModifiers(ROLL_PARAMETER_CATEGORY.opponentReroll, context),
    condition: context => !context.attributeAction
  },

]

export class RollParameters {
  constructor() {
    this.registeredParameters = {};
    HooksManager.register(ANARCHY_HOOKS.REGISTER_ROLL_PARAMETERS);
    HooksManager.register(ANARCHY_HOOKS.MODIFY_ROLL_PARAMETER);
    Hooks.on(ANARCHY_HOOKS.MODIFY_ROLL_PARAMETER, p => this._validate(p));
    Hooks.once(ANARCHY_HOOKS.REGISTER_ROLL_PARAMETERS, register => DEFAULT_ROLL_PARAMETERS.forEach(
      parameter => register(parameter)
    ));
    Hooks.once('ready', () => this.onReady());
  }

  async onReady() {
    Hooks.callAll(ANARCHY_HOOKS.REGISTER_ROLL_PARAMETERS, async rollParameter => {
      Hooks.callAll(ANARCHY_HOOKS.MODIFY_ROLL_PARAMETER, rollParameter);
      if (!rollParameter.ignore) {
        await this._register(rollParameter);
      }
    });
    const templates = Misc.distinct([]
      .concat(Object.values(this.registeredParameters).map(p => p.options.hbsTemplateRoll))
      .concat(Object.values(this.registeredParameters).map(p => p.options.hbsTemplateChat))
      .filter(it => it != undefined));
    await loadTemplates(Misc.distinct(templates));
    await loadTemplates([`${TEMPLATES_PATH}/roll/parts/parameter-label.hbs`]);
  }

  _validate(parameter) {
    if (!parameter.code) {
      console.error(`${LOG_HEAD} RollParameter does not have a code`, parameter);
      parameter.ignore = true;
    }
  }

  async _register(parameter) {
    if (this.registeredParameters[parameter.code]) {
      console.error(`${LOG_HEAD} RollParameter ${parameter.code} is already registered`, parameter);
      return;
    }

    if (!parameter.onChecked) {
      parameter.onChecked = (p, checked) => p.used = checked;
    }
    parameter.onValue = (p, value) => p.value = value;
    this.registeredParameters[parameter.code] = parameter;
  }

  async _optionalLoadTemplate(hbsTemplate) {
    if (hbsTemplate) {
      await loadTemplates([hbsTemplate]);
    }
  }

  build(context) {
    return Object.values(this.registeredParameters)
      .filter(p => !p.condition || p.condition(context))
      .map(p => this._computeParameter(p, context));
  }

  compute(parameters) {
    const actual = parameters.filter(it => this.isParameterUsed(it));
    const byCategory = Misc.classify(actual, it => it.category);
    const sums = {}
    Object.values(byCategory)
      .forEach(list => sums[list[0].category] = Misc.sumValues(list, it => it.value ?? (it.optional ? 1 : 0)));
    return sums;
  }

  isParameterUsed(it) {
    const registeredParameter = this.findParameter(it.code);
    if (registeredParameter?.isUsed != undefined) {
      return registeredParameter.isUsed(it);
    }
    if (it.value != undefined) {
      return it.value != 0
    }
    console.error(`registered parameter ${registeredParameter.code} does not have isUsed method`, registeredParameter)
    return false
  }

  findParameter(code) {
    return this.registeredParameters[code];
  }

  _computeParameter(param, context) {
    const computed = {
      code: param.code,
      onChecked: param.onChecked,
      onValue: param.onValue,
      isUsed: param.isUsed
    };
    foundry.utils.mergeObject(computed, param.options);
    if (param.factory) {
      foundry.utils.mergeObject(computed, param.factory(context, param.options));
    }
    foundry.utils.mergeObject(computed, {
      used: computed.used || computed.value,
      min: computed.min ?? 0,
      max: computed.max ?? computed.value ?? 0
    })

    return computed;
  }

  static computeRollModifiers(effect, context) {
    const itemsFilter = it => it.type != TEMPLATE.itemType.weapon || (context.weapon && it.id == context.weapon.id)
    const items = context.actor.items.filter(itemsFilter)
    return Modifiers.computeRollModifiers(items, context, effect);
  }

}
