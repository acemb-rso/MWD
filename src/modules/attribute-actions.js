import { ANARCHY } from "./config.js";
import { ANARCHY_SYSTEM, TEMPLATE } from "./constants.js";
import { ErrorManager } from "./error-manager.js";
import { Icons } from "./icons.js";

function action(code, attributeFunction1, attributeFunction2, icon, actorTypes, condition = actor => true) {
  return {
    code: code,
    labelkey: ANARCHY.attributeAction[code],
    attributeFunction1: attributeFunction1 ?? (__ => undefined),
    attributeFunction2: attributeFunction2 ?? (__ => undefined),
    icon: icon,
    actorTypes: actorTypes,
    condition: condition
  }
}

function defense(code, actionCode) {
  return {
    code: code,
    labelkey: ANARCHY.defense[code],
    actionCode: actionCode
  }
}

const ATTR = TEMPLATE.attributes;
const ACTOR = TEMPLATE.actorTypes;
const ACTION = ANARCHY_SYSTEM.actions;
const DEFENSE = ANARCHY_SYSTEM.defenses;

const ATTRIBUTE_ACTIONS = [
  action(ACTION.defense, __ => ATTR.agility, __ => ATTR.logic, Icons.fontAwesome('fas fa-shield-alt'), [ACTOR.character]),
  action(ACTION.defense, __ => ATTR.autopilot, __ => ATTR.handling, Icons.fontAwesome('fas fa-tachometer-alt'), [ACTOR.vehicle]),
  // TODO: add a way to pilot a vehicle to fallback defense of controled vehicle
  action(ACTION.resistTorture, __ => ATTR.strength, __ => ATTR.willpower, Icons.fontAwesome('fas fa-angry'), [ACTOR.character]),

  action(ACTION.perception, __ => ATTR.logic, __ => ATTR.willpower, Icons.fontAwesome('fas fa-eye'), [ACTOR.character]),
  action(ACTION.perception, __ => ATTR.autopilot, undefined, Icons.fontAwesome('fas fa-video'), [ACTOR.vehicle]),
  action(ACTION.perception, actor => actor.getMatrixLogic(), actor => actor.getMatrixLogic(), Icons.fontAwesome('fas fa-video'), [ACTOR.device, ACTOR.sprite, ACTOR.ic]),

  action(ACTION.composure, __ => ATTR.charisma, __ => ATTR.willpower, Icons.fontAwesome('fas fa-meh'), [ACTOR.character]),
  action(ACTION.judgeIntentions, __ => ATTR.charisma, __ => ATTR.charisma, Icons.fontAwesome('fas fa-theater-masks'), [ACTOR.character]),
  action(ACTION.memory, __ => ATTR.logic, __ => ATTR.logic, Icons.fontAwesome('fas fa-brain'), [ACTOR.character]),
  action(ACTION.catch, __ => ATTR.agility, __ => ATTR.agility, Icons.fontAwesome('fas fa-baseball-ball'), [ACTOR.character]),
  action(ACTION.lift, __ => ATTR.strength, __ => ATTR.strength, Icons.fontAwesome('fas fa-dumbbell'), [ACTOR.character]),

  action(ACTION.matrixDefense, actor => actor.getMatrixLogic(), actor => actor.getMatrixFirewall(), Icons.fontAwesome('fas fa-shield-virus'), [ACTOR.character, ACTOR.sprite, ACTOR.ic, ACTOR.device, ACTOR.vehicle]),
  action(ACTION.astralDefense, ___ => ATTR.logic, ___ => ATTR.willpower, Icons.fontAwesome('fas fa-shield-virus'), [ACTOR.character]),

]

const DEFENSES = [
  defense(DEFENSE.physicalDefense, ACTION.defense),
  defense(DEFENSE.physicalResistance, ACTION.resistTorture),
  defense(DEFENSE.socialDefense, ACTION.composure),
  defense(DEFENSE.matrixDefense, ACTION.matrixDefense),
  defense(DEFENSE.mentalResistance, ACTION.perception),
]

export class AttributeActions {
  static init() {
    Handlebars.registerHelper('fixedDefenseCode', code => AttributeActions.fixedDefenseCode(code));
  }

  static all(filter = undefined) {
    return filter
      ? ATTRIBUTE_ACTIONS.filter(filter)
      : ATTRIBUTE_ACTIONS;
  }

  static getActorActions(actor) {
    return ATTRIBUTE_ACTIONS.filter(it => it.actorTypes.includes(actor.type) && it.condition(actor));
  }

  static fixedDefenseCode(code) {
    return ANARCHY_SYSTEM.fixedDefenseCode[code] ?? code;
  }
  static getActorDefenses(actor) {
    return DEFENSES
      .map(defense => {
        const actorAction = AttributeActions.getActorAction(actor, defense.actionCode);
        return AttributeActions._convertToDefense(actorAction, defense);
      })
      .filter(it => it?.code);
  }

  static getDefenseAttributeAction(defenseCode) {
    return DEFENSES.find(it => it.code == defenseCode)?.actionCode
  }

  static getActorAction(actor, actionCode) {
    return AttributeActions.getActorActions(actor).find(it => it.code == actionCode);
  }

  static getActorDefense(actor, defenseCode) {
    defenseCode = AttributeActions.fixedDefenseCode(defenseCode);
    const defense = DEFENSES.find(it => it.code == defenseCode);
    const actorAction = AttributeActions.getActorAction(actor, defense.actionCode);
    ErrorManager.checkActorDefenseAction(actorAction, actor, defense);
    return AttributeActions._convertToDefense(actorAction, defense);
  }

  static _convertToDefense(actorAction, defense) {
    return actorAction ? foundry.utils.mergeObject(defense,
      actorAction ?? {},
      { overwrite: false, inplace: false }
    ) : undefined;
  }

  static getDefenses() {
    return DEFENSES;
  }

  static prepareShortcut(actor, actionCode) {
    const action = AttributeActions.getActorActions(actor).find(a => a.code == actionCode);
    if (action) {
      return {
        icon: action.icon,
        label: game.i18n.localize(action.labelkey),
        callback: (token) => token.actor.rollAttributeAction(actionCode),
      };
    }
    return undefined;
  }
}