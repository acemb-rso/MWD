import { SYSTEM_NAME } from "./constants.js";


export class SystemSettings {

  static getSystemProperty(property, fallback) {
    let value = game.settings.get(SYSTEM_NAME, property) ?? fallback;
    game.settings.set(SYSTEM_NAME, property, value);
    return value;
  }

}