import { WeaponItemSheet } from "./weapon-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";

/**
 * Personal-scale weapon item sheet (AppV2).
 * Same logic as WeaponItemSheet, but with a hardcoded template.
 */
export class PersonalWeaponItemSheet extends WeaponItemSheet {
  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/item/personal-weapon.hbs`,
      scrollable: [".sheet-body"]
    }
  };
}
