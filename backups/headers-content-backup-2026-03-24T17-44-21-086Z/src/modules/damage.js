// src/modules/damage.js
// Purpose: System module or client script for damage. Integrates with the system's JavaScript modules.

import { Enums } from "./enums.js";

export class Damage {
  static monitor(code) {
    return Enums.getFromList(Enums.getMonitors(), code) ?? "";
  }

  static letter(code) {
    return Enums.getFromList(Enums.getMonitorLetters(), code) ?? "";
  }
}