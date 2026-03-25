// src/modules/sheets/battlemech-sheet-v2.js
// Purpose: System module or client script for battlemech-sheet-v2. Integrates with the system's JavaScript modules.

import { TEMPLATES_PATH, SYSTEM_NAME } from "../constants.js";
import { BaseActorSheetV2 } from "./base-actor-sheet-v2.js";

export class BattlemechSheetV2 extends BaseActorSheetV2 {
  static PARTS = {
    sheet: {
      get template() {
        return `${TEMPLATES_PATH}/actor/battlemech.hbs`;
      },
      scrollable: [".sheet-body"]
    }
  };

  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["battlemech-sheet", SYSTEM_NAME, "actor-sheet-v2"],
      position: { width: 900, height: 820 }
    });
  }
}