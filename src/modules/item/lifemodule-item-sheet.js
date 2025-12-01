import { BaseItemSheet } from "./base-item-sheet.js";

export class LifeModuleItemSheet extends BaseItemSheet {

  getData(options) {
    const hbsData = super.getData(options);
    return hbsData;
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}
