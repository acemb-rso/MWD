// src/modules/item/gear-item-sheet.js
// Purpose: System module or client script for gear-item-sheet. Integrates with the system's JavaScript modules.

import { BaseItemSheet } from "./base-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";

export class GearItemSheet extends BaseItemSheet {
  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/gear.hbs`,
      scrollable: [".sheet-body"]
    }
  };
}
