import { BaseItemSheet } from "./base-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";

export class LifeModuleItemSheet extends BaseItemSheet {
  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/item/lifeModule.hbs`,
      scrollable: [".sheet-body"]
    }
  };
}
