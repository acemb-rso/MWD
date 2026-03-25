// src/modules/item/asset-module-item.js
// Purpose: System module or client script for asset-module-item. Integrates with the system's JavaScript modules.

import { AnarchyBaseItem } from "./anarchy-base-item.js";

export class AssetModuleItem extends AnarchyBaseItem {

  static get defaultIcon() {
    return "systems/mwd/img/default/upgrade.svg";
  }

}
