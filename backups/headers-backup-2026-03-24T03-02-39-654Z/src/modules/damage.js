import { Enums } from "./enums.js";

export class Damage {
  static monitor(code) {
    return Enums.getFromList(Enums.getMonitors(), code) ?? "";
  }

  static letter(code) {
    return Enums.getFromList(Enums.getMonitorLetters(), code) ?? "";
  }
}