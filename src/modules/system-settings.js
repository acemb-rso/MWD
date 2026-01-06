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
    game.settings.register(SYSTEM_NAME, "enableGMManager", {
      name: "Enable GM Manager (legacy)",
      hint: "If enabled, renders the legacy GM Manager UI on startup. Keep OFF while migrating to v2.",
      scope: "world",
      config: true,
      type: Boolean,
      default: false
    });
  }

static getSystemProperty(property, fallback) {
  return game.settings.get(SYSTEM_NAME, property) ?? fallback;
}


}