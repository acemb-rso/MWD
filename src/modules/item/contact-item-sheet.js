// src/modules/item/contact-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { BaseItemSheet } from "./base-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";

export class ContactItemSheet extends BaseItemSheet {
  static LAYOUT_ID = "contact";

  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/contact.hbs`,
      scrollable: [".sheet-body"]
    }
  };
}
