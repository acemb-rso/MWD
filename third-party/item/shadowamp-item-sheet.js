import { BaseItemSheet } from "./base-item-sheet.js";

export class ShadowampItemSheet extends BaseItemSheet {

  getData(options) {
    let hbsData = super.getData(options);
    return hbsData;
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}
