import { ICONS_PATH } from "../constants.js";
import { AnarchyBaseItem } from "./anarchy-base-item.js";

export class ContactItem extends AnarchyBaseItem {

  static get defaultIcon() {
    return `${ICONS_PATH}/contacts/contact.svg`;
  }

}