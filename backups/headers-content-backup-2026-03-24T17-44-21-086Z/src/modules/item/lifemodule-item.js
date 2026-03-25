// src/modules/item/lifemodule-item.js
// Purpose: System module or client script for lifemodule-item. Integrates with the system's JavaScript modules.

import { AnarchyBaseItem } from "./anarchy-base-item.js";

export class LifeModuleItem extends AnarchyBaseItem {

  constructor(docData, context = {}) {
    const lifeModuleName = 'MWD.itemType.singular.lifeModule';
    if (!docData.name || docData.name === 'DOCUMENT.Item') {
      docData.name = lifeModuleName;
    }

    super(docData, context);
  }

  static get defaultIcon() {
    return "systems/mwd/img/default/book.svg";
  }
}
