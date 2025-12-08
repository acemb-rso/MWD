import { ICONS_PATH } from "../constants.js";
import { AnarchyBaseItem } from "./anarchy-base-item.js";

export class LifeModuleItem extends AnarchyBaseItem {

  constructor(docData, context = {}) {
    const lifeModuleName = 'ANARCHY.itemType.singular.lifeModule';
    if (!docData.name || docData.name === 'DOCUMENT.Item') {
      docData.name = lifeModuleName;
    }

    super(docData, context);
  }

  static get defaultIcon() {
    return `${ICONS_PATH}/vitruvian-man.svg`;
  }
}
