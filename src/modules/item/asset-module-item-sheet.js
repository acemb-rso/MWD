import { BaseItemSheet } from "./base-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";

export class AssetModuleItemSheet extends BaseItemSheet {
  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/assetModule.hbs`,
      scrollable: [".sheet-body"]
    }
  };
}
