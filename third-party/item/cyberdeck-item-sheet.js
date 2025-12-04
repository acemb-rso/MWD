import { BaseItemSheet } from "./base-item-sheet.js";

export class CyberdeckItemSheet extends BaseItemSheet {

  getData(options) {
    let hbsData = super.getData(options);
    return hbsData;
  }


  activateListeners(html) {
    html.find('a.click-matrix-connectionMode').click(async event => {
      await this.item.nextConnectionMode()
    })
    super.activateListeners(html);
  }
}
