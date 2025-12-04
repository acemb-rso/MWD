import { TEMPLATES_PATH } from "../constants.js";
import { CharacterBaseSheet } from "./character-base-sheet.js";

export class CharacterTabbedSheet extends CharacterBaseSheet {

  get template() {
    return `${TEMPLATES_PATH}/actor/character-tabbed.hbs`;
  }

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 720,
      height: 700,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main" }],
    });
  }

  getData(options) {
    let hbsData = super.getData(options);
    hbsData.options.classes.push('tabbed-sheet');
    return hbsData;
  }
}