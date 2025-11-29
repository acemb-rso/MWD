import { ANARCHY } from "./config.js";
import { ErrorManager } from "./error-manager.js";
import { Misc } from "./misc.js";
import { RemoteCall } from "./remotecall.js";

const BLIND_MESSAGE_TO_GM = 'Users.blindMessageToGM';

export class AnarchyUsers {

  static init() {
    RemoteCall.register(BLIND_MESSAGE_TO_GM, {
      callback: data => AnarchyUsers.blindMessageToGM(data),
      condition: user => user.isGM
    })
  }


  static blindMessageToGM(message) {
    if (!RemoteCall.call(BLIND_MESSAGE_TO_GM, message)) {
      ChatMessage.create({
        user: message.user,
        whisper: ChatMessage.getWhisperRecipients('GM'),
        blind: true,
        content: game.i18n.format(ANARCHY.chat.blindMessageToGM, {
          user: game.user.name,
          message: message.content
        })
      });
    }
  }

  static getUsers(filter = user => true) {
    return (game.version ? game.users : game.users.entities).filter(filter);
  }

  static firstConnectedGM() {
    return AnarchyUsers.getUsers(u => u.isGM && u.active).sort(Misc.ascending(u => u.id)).at(0) ?? {};
  }

  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(user = game.user) {
    return user.id == AnarchyUsers.firstConnectedGM().id;
  }

  static firstResponsible(document) {
    if (!document.testUserPermission) {
      return undefined
    }
    return AnarchyUsers.getUsers(u => u.active && document.testUserPermission(u, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)) == game.user
  }

  static getTargetTokens(user) {
    return Array.from(user.targets);
  }

  static getSelectedTokens(user) {
    return Array.from(canvas.tokens.controlled)
  }

  static getSelectedActors() {
    return Array.from(canvas.tokens.controlled).map(t => t.actor)
  }

  static getPlayerActor() {
    return game.user.character;
  }


}