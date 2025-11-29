import { ChatManager, CAN_USE_EDGE, MESSAGE_DATA, OWNING_ACTOR } from "../chat/chat-manager.js";
import { ANARCHY } from "../config.js";
import { TEMPLATES_PATH } from "../constants.js";
import { Enums } from "../enums.js";
import { Misc } from "../misc.js";
import { Tokens } from "../token/tokens.js";
import { AnarchyRoll } from "./anarchy-roll.js";
import { ROLL_PARAMETER_CATEGORY } from "./roll-parameters.js";

const HBS_TEMPLATE_CHAT_ANARCHY_ROLL = `${TEMPLATES_PATH}/chat/anarchy-roll.hbs`;

const HBS_CHAT_TEMPLATES = [
  `${TEMPLATES_PATH}/chat/risk-outcome.hbs`,
  `${TEMPLATES_PATH}/chat/edge-reroll-button.hbs`,
  `${TEMPLATES_PATH}/chat/anarchy-roll-title.hbs`,
  `${TEMPLATES_PATH}/chat/parts/actor-image.hbs`,
  `${TEMPLATES_PATH}/chat/parts/generic-parameter.hbs`,
  `${TEMPLATES_PATH}/chat/parts/result-mode-weapon.hbs`,
];

export class RollManager {
  constructor() {
    Hooks.once('ready', () => this.onReady());
  }

  async onReady() {
    await loadTemplates(Misc.distinct(HBS_CHAT_TEMPLATES));
  }

  async roll(roll) {
    roll.parameters.forEach(p => {
      if (p.isUsed != undefined) {
        p.used = p.isUsed(p)
      }
    })

    roll.param = game.system.anarchy.rollParameters.compute(roll.parameters);
    roll.param.edge = roll.parameters.find(it => it.category == ROLL_PARAMETER_CATEGORY.edge && it.used) ? 1 : 0;
    roll.param.anarchy = roll.parameters.filter(it => it.flags?.isAnarchy && it.used).length;
    roll.options.canUseEdge = roll.options.canUseEdge && !roll.param.edge;
    roll.param.social = {
      credibility: roll.parameters.find(it => it.code == 'credibility' && it.used)?.value ?? 0,
      rumor: roll.parameters.find(it => it.code == 'rumor' && it.used)?.value ?? 0,
    }
    await roll.actor.spendAnarchy(roll.param.anarchy);
    await roll.actor.spendEdge(roll.param.edge);
    await roll.actor.spendCredibility(roll.param.social.credibility);
    await roll.actor.spendRumor(roll.param.social.rumor);
    await this._roll(roll);
  }

  async edgeReroll(roll) {
    roll = RollManager.inflateAnarchyRoll(roll)
    // TODO: indicate edge was used for reroll
    roll.options.canUseEdge = false;
    await roll.actor.spendEdge(1);
    roll.param[ROLL_PARAMETER_CATEGORY.convergence] = undefined;
    roll.param[ROLL_PARAMETER_CATEGORY.drain] = undefined;
    await this._roll(roll)
  }

  async _roll(roll) {
    roll.roll = new AnarchyRoll(roll.param);
    await roll.roll.evaluate();
    await this._displayRollInChat(roll);

    await roll.actor.rollDrain(roll.param.drain);
    await roll.actor.rollConvergence(roll.param.convergence);

    await game.system.anarchy.combatManager.manageCombat(roll);
  }

  async _displayRollInChat(hbsRoll) {
    hbsRoll.options.classes = [game.system.anarchy.styles.selectCssClass()];

    const flags = {}
    ChatManager.prepareFlag(flags, MESSAGE_DATA, RollManager.deflateAnarchyRoll(hbsRoll))
    ChatManager.prepareFlag(flags, CAN_USE_EDGE, hbsRoll.options.canUseEdge)
    ChatManager.prepareFlag(flags, OWNING_ACTOR, ChatManager.messageActorRights(hbsRoll.actor))

    const flavor = await renderTemplate(HBS_TEMPLATE_CHAT_ANARCHY_ROLL, hbsRoll);
    const rollMessage = await hbsRoll.roll.toMessage({ flavor: flavor, flags: flags });
    hbsRoll.chatMessageId = rollMessage.id;
  }

  static deflateAnarchyRoll(roll) {
    if (roll) {
      roll = deepClone(roll);
      roll.actor = RollManager._reduceToId(roll.actor);
      roll.skill = RollManager._reduceToId(roll.skill);
      roll.skill = RollManager._reduceToId(roll.skill);
      roll.weapon = RollManager._reduceToId(roll.weapon);
      roll.item = RollManager._reduceToId(roll.item);
      roll.parameters = RollManager._reduceParameters(roll.parameters);
      roll.attackData = undefined;
      roll.attributes = undefined
      roll.ANARCHY = undefined;
      roll.ENUMS = undefined;
    }
    return roll;
  }

  static inflateAnarchyRoll(roll) {
    if (roll) {
      roll = deepClone(roll);
      roll.actor = RollManager._reloadActorFromId(roll.actor, roll.tokenId);
      roll.skill = RollManager._reloadItemFromId(roll.actor, roll.skill);
      roll.item = RollManager._reloadItemFromId(roll.actor, roll.item);
      roll.weapon = RollManager._reloadItemFromId(roll.actor, roll.weapon);
      roll.attributes = roll.actor.getUsableAttributes(roll.item);
      roll.parameters = RollManager._reloadParameters(roll, roll.parameters);
      roll.ANARCHY = ANARCHY;
      roll.ENUMS = Enums.getEnums();
    }
    return roll;
  }

  static _reduceToId(document) {
    return document ? { id: document.id } : undefined;
  }

  static _reloadActorFromId(actor, tokenId) {
    const token = Tokens.getToken(tokenId);
    if (token) {
      return token.actor;
    }
    return actor?.id ? game.actors.get(actor.id) : undefined;
  }

  static _reloadItemFromId(actor, item) {
    return actor && item?.id ? actor.items.get(item.id) : undefined;
  }

  static _reduceParameters(parameters) {
    return parameters.filter(it => it.used)
      .map(it => {
        return {
          code: it.code,
          value: it.value,
        }
      });
  }

  static _reloadParameters(rollData, parameters) {
    if (!parameters) {
      return parameters;
    }
    const built = game.system.anarchy.rollParameters.build(rollData);
    return parameters.map(p => {
      const initial = built.find(it => it.code == p.code) ?? {};
      return foundry.utils.mergeObject(p, initial, { overwrite: false });
    });
  }

}