import { ANARCHY } from "../config.js";
import { SYSTEM_SCOPE } from "../constants.js";
import { RemoteCall } from "../remotecall.js";

export const PARENT_MESSAGE_ID = 'parent-message-id';
export const MESSAGE_DATA = 'message-data';
export const CAN_USE_EDGE = 'can-use-edge';
export const OWNING_ACTOR = 'owning-actor';

const REMOVE_CHAT_MESSAGE = 'ChatManager.removeChatMessage';
const CHAT_MANAGER_REMOVE_FAMILY = 'ChatManager.removeChatMessageFamily';

const CHAT_MESSAGE_BUTTON_HANDLERS = [
  { selector: '.anarchy-button.click-edge-reroll', controlVisibility: true, handler: async (chatMsg, event) => await ChatManager.edgeReroll(chatMsg) },
  { selector: '.anarchy-button.click-defend-attack', controlVisibility: true, handler: async (chatMsg, event) => await ChatManager.defendAttack(chatMsg) },
  { selector: '.anarchy-button.click-defend-pilot-attack', controlVisibility: true, handler: async (chatMsg, event) => await ChatManager.defendPilotAttack(chatMsg) },
  { selector: '.anarchy-button.click-apply-attack-damage', controlVisibility: true, handler: async (chatMsg, event) => await ChatManager.applyAttack(chatMsg) },
  { selector: 'img.open-actor-sheet', controlVisibility: false, handler: async (chatMsg, event) => await ChatManager.openActorSheet(chatMsg, event) },
]

export class ChatManager {

  static async init() {
    Hooks.on('renderChatMessage', async (app, html, msg) => await ChatManager.onRenderChatMessage(app, html, msg));

    RemoteCall.register(CHAT_MANAGER_REMOVE_FAMILY, {
      callback: data => this.removeFamily(data),
      condition: user => user.isGM
    });

    RemoteCall.register(REMOVE_CHAT_MESSAGE, {
      callback: data => ChatManager.removeChatMessage(data),
      condition: user => user.isGM
    });
  }

  static async onRenderChatMessage(app, html, msg) {
    const chatMessage = ChatManager.getChatMessageFromHtml(html);
    const showButtons = ChatManager.hasRight(chatMessage);
    CHAT_MESSAGE_BUTTON_HANDLERS.forEach(it => {
      const jQueryButtonSelector = html.find(it.selector);
      if (!it.controlVisibility || showButtons) {
        jQueryButtonSelector.show();
        jQueryButtonSelector.click(async event => await it.handler(ChatManager.getChatMessage(event), event))
      }
      else {
        jQueryButtonSelector.hide();
        jQueryButtonSelector.click(async event => { })
      }
    });
  }

  static async openActorSheet(chatMsg, event) {
    const img = $(event.currentTarget).closest('img.open-actor-sheet');
    const tokenId = img.attr('data-token-id')
    if (tokenId) {
      const token = canvas.tokens.get(tokenId);
      if (token?.actor) {
        token.actor.sheet.render(true)
        return
      }
    }
    const actorId = img.attr('data-actor-id')
    return game.actors.get(actorId)?.sheet.render(true)
  }

  static async edgeReroll(chatMsg) {
    if (chatMsg.getFlag(SYSTEM_SCOPE, CAN_USE_EDGE)) {
      const rollData = chatMsg.getFlag(SYSTEM_SCOPE, MESSAGE_DATA)
      await game.system.anarchy.rollManager.edgeReroll(rollData);
      ChatManager.removeFamily(chatMsg.id);
    }
    else {
      ui.notifications.info(game.i18n.localize(ANARCHY.common.errors.cannotUseEdgeAnymore));
    }
  }

  static defendAttack(chatMsg) {
    return game.system.anarchy.combatManager.onClickDefendAttack(chatMsg.getFlag(SYSTEM_SCOPE, MESSAGE_DATA))
  }

  static defendPilotAttack(chatMsg) {
    return game.system.anarchy.combatManager.onClickPilotDefendAttack(chatMsg.getFlag(SYSTEM_SCOPE, MESSAGE_DATA))
  }

  static applyAttack(chatMsg) {
    return game.system.anarchy.combatManager.onClickApplyAttackDamage(chatMsg.getFlag(SYSTEM_SCOPE, MESSAGE_DATA))
  }

  static getChatMessage(event) {
    const chatMessageId = $(event.currentTarget).closest('.chat-message').attr('data-message-id');
    return game.messages.get(chatMessageId);
  }

  static getChatMessageFromHtml(html) {
    const chatMessageId = $(html).closest('.chat-message').attr('data-message-id');
    return game.messages.get(chatMessageId);
  }

  /**
   * Method in charge of preparing ANARCHY flags to be set on Document, for ChatMessage
   */
  static prepareFlag(flags, key, data) {
    if (flags[SYSTEM_SCOPE] == undefined) {
      flags[SYSTEM_SCOPE] = { [key]: data }
    }
    else {
      flags[SYSTEM_SCOPE][key] = data
    }
  }

  static removeFamily(chatMessageId) {
    if (!RemoteCall.call(CHAT_MANAGER_REMOVE_FAMILY, chatMessageId)) {
      game.messages.filter(m => m.getFlag(SYSTEM_SCOPE, PARENT_MESSAGE_ID) == chatMessageId)
        .forEach(m => m.delete());
      game.messages.get(chatMessageId)?.delete()
    }
  }

  static removeChatMessage(chatMessageId) {
    if (!RemoteCall.call(REMOVE_CHAT_MESSAGE, chatMessageId)) {
      game.messages.get(chatMessageId)?.delete();
    }
  }

  static messageActorRights(actor, right = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER) {
    return {
      actorId: actor?.id,
      tokenId: actor?.token?.id,
      right: right ?? CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER
    }
  }

  static readActorRights(flag) {
    const token = flag.tokenId ? ChatManager.getToken(flag.tokenId) : undefined;
    return {
      actor: token?.actor ?? game.actors.get(flag.actorId),
      token: token,
      right: flag.right
    }
  }

  static hasRight(chatMsg, right = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER) {
    const flagOwner = chatMsg.getFlag(SYSTEM_SCOPE, OWNING_ACTOR);
    if (flagOwner) {
      const neededRights = ChatManager.readActorRights(flagOwner)
      if (neededRights) {
        if (neededRights.actor) {
          return neededRights.actor.testUserPermission(game.user, Math.min(neededRights.right, right))
        }
        return true
      }
    }
    return false
  }

  static getToken(tokenId) {
    return tokenId ? game.scenes.map(s => s.tokens.find(it => it.id == tokenId)).find(it => it != undefined) : undefined;
  }
}