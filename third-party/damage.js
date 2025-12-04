import { Enums } from "./enums.js";

export class Damage {
  static monitor(code) {
    return game.i18n.localize(Enums.getFromList(Enums.getMonitors(), code) ?? "");
  }

  static letter(code) {
    return game.i18n.localize(Enums.getFromList(Enums.getMonitorLetters(), code) ?? "");
  }
}