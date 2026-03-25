// src/modules/item/lifemodule-item.js
// Purpose: References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


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
