import { TEMPLATES_PATH } from "../constants.js";
import { CharacterBaseSheet } from "./character-base-sheet.js";

export class CharacterNPCSheet extends CharacterBaseSheet {

  get template() {
    return `${TEMPLATES_PATH}/actor/npc-sheet.hbs`;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 450,
      height: 550
    });
  }

  getData(options) {
    let hbsData = super.getData(options);
    hbsData.options.classes.push('npc-sheet');
    return hbsData;
  }
}