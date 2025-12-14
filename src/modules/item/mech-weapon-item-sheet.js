import { WeaponItemSheet } from "./weapon-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";

/**
 * Mech-scale weapon item sheet (AppV2).
 * Same logic as WeaponItemSheet, but with a hardcoded template.
 */
export class MechWeaponItemSheet extends WeaponItemSheet {
  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/item/mech-weapon.hbs`,
      scrollable: [".sheet-body"]
    }
  };
}
