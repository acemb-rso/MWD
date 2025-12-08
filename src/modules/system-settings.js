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
  }

  static getSystemProperty(property, fallback) {
    let value = game.settings.get(SYSTEM_NAME, property) ?? fallback;
    game.settings.set(SYSTEM_NAME, property, value);
    return value;
  }

}