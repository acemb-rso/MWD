// src/modules/system-settings.js
// Purpose: Registers system settings. References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { ANARCHY } from "./config.js";
import { SYSTEM_NAME } from "./constants.js";


export class SystemSettings {

  static register() {
    game.settings.register(SYSTEM_NAME, "useDestinyMechanics", {
      name: ANARCHY.settings.useDestinyMechanics.name,
      hint: ANARCHY.settings.useDestinyMechanics.hint,
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
    });

    game.settings.register(SYSTEM_NAME, "enableGMGadget", {
      name: "Enable GM Gadget",
      hint: "If enabled, renders the new AppV2 GM Gadget UI on startup.",
      scope: "world",
      config: true,
      type: Boolean,
      default: true
    });
  }

static getSystemProperty(property, fallback) {
  return game.settings.get(SYSTEM_NAME, property) ?? fallback;
}


}