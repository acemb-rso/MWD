import { BaseItemSheet } from "./base-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";

export class ContactItemSheet extends BaseItemSheet {
  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/item/contact.hbs`,
      scrollable: [".sheet-body"]
    }
  };
}
