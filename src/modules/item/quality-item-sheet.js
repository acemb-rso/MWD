import { BaseItemSheet } from "./base-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";

export class QualityItemSheet extends BaseItemSheet {
  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/quality.hbs`,
      scrollable: [".sheet-body"]
    }
  };
}
