import { ANARCHY } from "../config.js";
import { SYSTEM_DESCRIPTION, SYSTEM_NAME, SYSTEM_PATH } from "../constants.js";

export const GLITCH_COLORSET = 'glitch';
export const RISK_COLORSET = 'risk';
export const REROLL_COLORSET = 'reroll';
export const REROLL_REMOVED_COLORSET = 'rerollRemoved';
export const REMOVED_COLORSET = 'removed';

const DICE_GLITCH = `${SYSTEM_PATH}/style/danger-point.webp`;
const DICE_PROWESS = `${SYSTEM_PATH}/style/anarchy-point.webp`;

export class AnarchyDice {
  static dice3d = undefined;

  static init() {
    CONFIG.Dice.terms[AnarchyGlitchDie.DENOMINATION] = AnarchyGlitchDie;
    CONFIG.Dice.terms[AnarchyRiskDie.DENOMINATION] = AnarchyRiskDie;
    Hooks.once('diceSoNiceReady', (dice3d) => AnarchyDice.diceSoNiceReady(dice3d));
    Hooks.once('ready', () => AnarchyDice.onReady());
  }

  static onReady() {
    AnarchyDice.COLORSETS = AnarchyDice.loadColorsets();

    if (game.modules.get("dice-so-nice")?.active) {
      if (game.settings.get("core", "noCanvas")) {
        ui.notifications.warn("Dice So Nice! will not display dice due to Foundry option 'Disable Game Canvas' ");
      }
    }
  }

  static loadColorsets() {
    return {
      [REROLL_COLORSET]: {
        name: REROLL_COLORSET,
        description: game.i18n.localize(ANARCHY.common.roll.rollTheme.reroll),
        category: SYSTEM_DESCRIPTION,
      },
      [REMOVED_COLORSET]: {
        name: RISK_COLORSET,
        description: game.i18n.localize(ANARCHY.common.roll.rollTheme.removed),
        category: SYSTEM_DESCRIPTION,
      },
      [REROLL_REMOVED_COLORSET]: {
        name: REROLL_REMOVED_COLORSET,
        description: game.i18n.localize(ANARCHY.common.roll.rollTheme.rerollRemoved),
        category: SYSTEM_DESCRIPTION,
      },
      [GLITCH_COLORSET]: {
        name: GLITCH_COLORSET,
        description: game.i18n.localize(ANARCHY.common.roll.rollTheme.glitch),
        category: SYSTEM_DESCRIPTION,
        foreground: "white",
        background: "#5c0a5c",
        outline: "none",
        edge: "none",
        texture: "poison",
        material: 'metal',
      },
      [RISK_COLORSET]: {
        name: RISK_COLORSET,
        description: game.i18n.localize(ANARCHY.common.roll.rollTheme.anarchyRisk),
        category: SYSTEM_DESCRIPTION,
        foreground: "#faecd1",
        background: "#040101",
        outline: "none",
        edge: "none",
        texture: "fire",
        material: 'metal',
      }
    }
  }


  static diceSoNiceReady(dice3d) {

    AnarchyDice.dice3d = dice3d;
    game.settings.set("dice-so-nice", "enabledSimultaneousRollForMessage", false);
    dice3d.addSystem({ id: SYSTEM_NAME, name: SYSTEM_DESCRIPTION });
    /*
     * See guides:
     * https://gitlab.com/riccisi/foundryvtt-dice-so-nice/-/wikis/API/Hooks
     * https://gitlab.com/riccisi/foundryvtt-dice-so-nice/-/wikis/API/Customization
     */
    Object.values(AnarchyDice.COLORSETS).forEach(colorset => dice3d.addColorset(colorset));
    dice3d.addDicePreset(AnarchyGlitchDie.diceSoNiceData());
    dice3d.addDicePreset(AnarchyRiskDie.diceSoNiceData());
  }

  static img(path) {
    return `<img src="${path}" />`
  }
}


export class AnarchyGlitchDie extends Die {
  constructor(term) {
    term.faces = 6;
    super(term);
  }

  /** @override */
  getResultLabel(result) {
    switch (result.result) {
      case "1": return AnarchyDice.img(DICE_GLITCH);
    }
    return result.result.toString();
  }

  /** @override */
  static DENOMINATION = "g";

  static diceSoNiceData() {
    return {
      type: "dg",
      labels:
        [DICE_GLITCH, "2", "3", "4", "5", "6"],
      colorset: GLITCH_COLORSET,
      system: SYSTEM_NAME
    }
  }

}

export class AnarchyRiskDie extends Die {
  constructor(term) {
    term.faces = 6;
    super(term);
  }

  static DENOMINATION = "r";

  /** @override */
  getResultLabel(result) {
    switch (result.result) {
      case "1": return AnarchyDice.img(DICE_GLITCH);
      case "5": return AnarchyDice.img(DICE_PROWESS);
      case "6": return AnarchyDice.img(DICE_PROWESS);
    }
    return result.result.toString();
  }

  static diceSoNiceData() {
    return {
      type: "dr",
      labels:
        [DICE_GLITCH, "2", "3", "4", DICE_PROWESS, DICE_PROWESS],
      colorset: RISK_COLORSET,
      system: SYSTEM_NAME
    }
  }
}

