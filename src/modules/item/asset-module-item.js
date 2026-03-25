// src/modules/item/asset-module-item.js
// Purpose: References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { AnarchyBaseItem } from "./anarchy-base-item.js";

export class AssetModuleItem extends AnarchyBaseItem {

  static get defaultIcon() {
    return "systems/mwd/img/default/upgrade.svg";
  }

}
