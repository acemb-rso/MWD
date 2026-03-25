// src/modules/styles.js
// Purpose: System module or client script for styles. Integrates with the system's JavaScript modules.

import { MWD } from "./config.js";
import { LOG_HEAD, SYSTEM_NAME } from "./constants.js";
import { ANARCHY_HOOKS, HooksManager } from "./hooks-manager.js";

const DEFAULT_CSS_CLASS = "sheetTheme";
const THEME_DEFAULT = "mwd-theme-default";
const THEME_SRA = "mwd-theme-sra";

const DEFAULT_STYLES = [
  { name: "Default (CSB)", cssClass: THEME_DEFAULT },
  { name: "SRA", cssClass: THEME_SRA }
];


/**
 * The Styles class manages the addition of different styles
 */
export class Styles {
  constructor() {
    this.availableStyles = {};
    HooksManager.register(ANARCHY_HOOKS.REGISTER_STYLES);

    Hooks.once(ANARCHY_HOOKS.REGISTER_STYLES, register => DEFAULT_STYLES.forEach(it => register(it.cssClass, it.name)));
    Hooks.once('ready', () => this.onReady());
  }

  async onReady() {
    Hooks.callAll(ANARCHY_HOOKS.REGISTER_STYLES, (style, name) => this.availableStyles[style] = name);
    console.log(LOG_HEAD + 'Loaded styles', this.availableStyles);

    game.settings.register(SYSTEM_NAME, DEFAULT_CSS_CLASS, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: true,
      default: THEME_DEFAULT,
      choices: this.availableStyles,
      type: String,
      onChange: () => {
        setTimeout(() => {
          for (const app of Object.values(ui.windows ?? {})) {
            if (typeof app?.render !== "function") continue;

            const el = app.element instanceof HTMLElement ? app.element : app.element?.[0];
            if (el?.classList?.contains("actor-sheet-v2")) app.render(false);
          }
        }, 0);
      }
    });

  }

  selectCssClass() {
    const style = game.settings.get(SYSTEM_NAME, DEFAULT_CSS_CLASS);
    return this.availableStyles[style] ? style : THEME_DEFAULT;
  }

}