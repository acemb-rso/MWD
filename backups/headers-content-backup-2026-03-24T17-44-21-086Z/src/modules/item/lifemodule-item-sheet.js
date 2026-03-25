// src/modules/item/lifemodule-item-sheet.js
// Purpose: System module or client script for lifemodule-item-sheet. Integrates with the system's JavaScript modules.

import { BaseItemSheet } from "./base-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";

export class LifeModuleItemSheet extends BaseItemSheet {
  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/lifeModule.hbs`,
      scrollable: [".sheet-body"]
    }
  };
}
