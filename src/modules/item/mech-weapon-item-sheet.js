// src/modules/item/mech-weapon-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { WeaponItemSheet } from "./weapon-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";

/**
 * Mech-scale weapon item sheet (AppV2).
 * Same logic as WeaponItemSheet, but rendered through the shared compact layout.
 */
export class MechWeaponItemSheet extends WeaponItemSheet {
  static LAYOUT_ID = "mech-weapon";

  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/mech-weapon-root.hbs`,
      scrollable: [".sheet-body"]
    }
  };
}
