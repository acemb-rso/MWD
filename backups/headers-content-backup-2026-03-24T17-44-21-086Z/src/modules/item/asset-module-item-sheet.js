// src/modules/item/asset-module-item-sheet.js
// Purpose: System module or client script for asset-module-item-sheet. Integrates with the system's JavaScript modules.

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
