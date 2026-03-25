// src/modules/damage.js
// Purpose: Provides module-level utilities or helpers.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { Enums } from "./enums.js";

export class Damage {
  static monitor(code) {
    return Enums.getFromList(Enums.getMonitors(), code) ?? "";
  }

  static letter(code) {
    return Enums.getFromList(Enums.getMonitorLetters(), code) ?? "";
  }
}