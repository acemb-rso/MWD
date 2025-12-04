import { LOG_HEAD, SYSTEM_SOCKET } from "./constants.js";
import { AnarchyUsers } from "./users.js";

export class RemoteCall {

  constructor() {
    this.remoteCalls = {};
    game.socket.on(SYSTEM_SOCKET, async sockMsg => this.onSocketMessage(sockMsg));
  }

  static async register(msg, remoteCall) {
    game.system.anarchy.remoteCall._register(msg, remoteCall);
  }

  async _register(msg, remoteCall) {
    if (this.remoteCalls[msg]) {
      throw `RemoteCall msg ${msg} is already registered`;
    }
    foundry.utils.mergeObject(remoteCall, {
      callback: data => { console.log(LOG_HEAD + 'RemoteCall [', msg, '] (', data, ')'); },
      condition: user => true,
      multiple: false /* true if multiple users should handle the message */
    }, { overwrite: false });
    this.remoteCalls[msg] = remoteCall;
    console.log(LOG_HEAD + 'RemoteCall registered', msg);
  }

  static call(msg, data) {
    return game.system.anarchy.remoteCall._remoteCall(msg, data);
  }

  _remoteCall(msg, data) {
    const remoteCall = this.remoteCalls[msg];
    if (!remoteCall ||
      remoteCall.condition(game.user) ||
      (!remoteCall.multiple && AnarchyUsers.isUniqueConnectedGM())
    ) {
      return false;
    }
    game.socket.emit(SYSTEM_SOCKET, { msg: msg, data: data });
    return true;
  }

  async onSocketMessage(sockMsg) {
    const remoteCall = this.remoteCalls[sockMsg.msg];
    if (remoteCall) {
      const userMatchCondition = remoteCall.condition(game.user);
      const isMultiple = remoteCall.multiple;
      const isSelectedGM = AnarchyUsers.isUniqueConnectedGM();
      if (userMatchCondition && (isMultiple || isSelectedGM)) {
        remoteCall.callback(sockMsg.data);
      }
      else {
        console.log(LOG_HEAD + 'RemoteCall.onSocketMessage(', sockMsg, ') ignored :', userMatchCondition, isMultiple, isSelectedGM);
      }
    }
    else {
      console.log(LOG_HEAD + 'RemoteCall: No callback registered for', sockMsg);
    }
  }

}