// src/modules/item/contact-item-sheet.js
// Purpose: System module or client script for contact-item-sheet. Integrates with the system's JavaScript modules.

import { BaseItemSheet } from "./base-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";

export class ContactItemSheet extends BaseItemSheet {
  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/contact.hbs`,
      scrollable: [".sheet-body"]
    }
  };
}
