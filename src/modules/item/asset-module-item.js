import { ICONS_PATH } from "../constants.js";
import { AnarchyBaseItem } from "./anarchy-base-item.js";

export class AssetModuleItem extends AnarchyBaseItem {

  static get defaultIcon() {
    return `${ICONS_PATH}/default/upgrade.svg`;
  }

}
