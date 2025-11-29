import { ICONS_PATH } from "../constants.js";
import { AnarchyBaseItem } from "./anarchy-base-item.js";

export class QualityItem extends AnarchyBaseItem {

  static get defaultIcon() {
    return `${ICONS_PATH}/quality-positive.svg`;
  }


}