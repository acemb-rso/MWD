// src/modules/item/quality-item-sheet.js
// Purpose: System module or client script for quality-item-sheet. Integrates with the system's JavaScript modules.

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
