// src/modules/sheets/npc-sheet-v2.js
// Purpose: System module or client script for npc-sheet-v2. Integrates with the system's JavaScript modules.

import { TEMPLATES_PATH, SYSTEM_NAME } from "../constants.js";
import { BaseActorSheetV2 } from "./base-actor-sheet-v2.js";

export class NpcSheetV2 extends BaseActorSheetV2 {
  static PARTS = {
    sheet: {
      get template() {
        // Use your long-form NPC template
        return `${TEMPLATES_PATH}/actor/npc.hbs`;
      },
      scrollable: [".sheet-body"]
    }
  };

  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", SYSTEM_NAME, "actor-sheet-v2"]
    });
  }
}