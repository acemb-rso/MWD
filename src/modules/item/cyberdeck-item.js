import { ICONS_PATH } from "../constants.js";
import { TEMPLATE } from "../constants.js";
import { AnarchyBaseItem } from "./anarchy-base-item.js";

export class CyberdeckItem extends AnarchyBaseItem {

  static get defaultIcon() {
    return `${ICONS_PATH}/shadowamps/cyberdeck.svg`;
  }

  getAttributes() {
    return [
      TEMPLATE.attributes.firewall
    ];
  }
}