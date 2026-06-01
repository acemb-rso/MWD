// src/modules/sheets/register-item-sheets-v2.js
// Purpose: Registers custom actor/item sheets.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { SYSTEM_NAME, LOG_HEAD } from "../constants.js";

// Import your EXISTING item sheet classes (whatever they are named)
// If you are pivoting items later, we can replace these with new V2 item sheets.
// For now, this file exists so wiring is complete.
import { ContactItemSheet } from "../item/contact-item-sheet.js";
import { GearItemSheet } from "../item/gear-item-sheet.js";
import { QualityItemSheet } from "../item/quality-item-sheet.js";
import { AssetModuleItemSheet } from "../item/asset-module-item-sheet.js";
import { LifeModuleItemSheet } from "../item/lifemodule-item-sheet.js";
import { SkillItemSheet } from "../item/skill-item-sheet.js";
import { PersonalWeaponItemSheet } from "../item/personal-weapon-item-sheet.js";
import { MechWeaponItemSheet } from "../item/mech-weapon-item-sheet.js";
import { WeaponPayloadItemSheet } from "../item/weapon-payload-item-sheet.js";
import { ArmorItemSheet } from "../item/armor-item-sheet.js";

/**
 * Register Item sheets.
 * NOTE: We intentionally do NOT call foundry.appv1.* here.
 */
export function registerItemSheetsV2() {
  console.log(`${LOG_HEAD}Registering Item sheets (V2)`);

  const { Items } = foundry.documents.collections;
  Items.registerSheet(SYSTEM_NAME, ContactItemSheet, { types: ["contact"], makeDefault: true, label: "Contact (V2)" });
  // Consumables intentionally reuse the gear sheet contract so quantity-based
  // inventory stays uniform while the source picker can target one clear type.
  Items.registerSheet(SYSTEM_NAME, GearItemSheet, { types: ["gear", "consumable"], makeDefault: true, label: "Gear / Consumable (V2)" });
  Items.registerSheet(SYSTEM_NAME, QualityItemSheet, { types: ["quality"], makeDefault: true, label: "Quality (V2)" });
  Items.registerSheet(SYSTEM_NAME, AssetModuleItemSheet, { types: ["assetModule"], makeDefault: true, label: "Asset Module (V2)" });
  Items.registerSheet(SYSTEM_NAME, LifeModuleItemSheet, { types: ["lifeModule"], makeDefault: true, label: "Life Module (V2)" });
  Items.registerSheet(SYSTEM_NAME, SkillItemSheet, { types: ["skill"], makeDefault: true, label: "Skill (V2)" });
  Items.registerSheet(SYSTEM_NAME, PersonalWeaponItemSheet, { types: ["personalWeapon", "weapon"], makeDefault: true, label: "Personal Weapon (V2)" });
  Items.registerSheet(SYSTEM_NAME, MechWeaponItemSheet, { types: ["mechWeapon"], makeDefault: true, label: "Mech Weapon (V2)" });
  Items.registerSheet(SYSTEM_NAME, WeaponPayloadItemSheet, { types: ["weaponPayload"], makeDefault: true, label: "Weapon Payload (V2)" });
  Items.registerSheet(SYSTEM_NAME, ArmorItemSheet, { types: ["armor"], makeDefault: true, label: "Armor (V2)" });
}
