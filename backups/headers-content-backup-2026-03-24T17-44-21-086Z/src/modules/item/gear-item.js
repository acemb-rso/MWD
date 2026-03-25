// src/modules/item/gear-item.js
// Purpose: System module or client script for gear-item. Integrates with the system's JavaScript modules.

import { AnarchyBaseItem } from "./anarchy-base-item.js";

export class GearItem extends AnarchyBaseItem {

  static get defaultIcon() {
    return "systems/mwd/img/default/Default_Gear.svg";
  }

}
