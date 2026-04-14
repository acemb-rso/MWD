// src/modules/item/item-type-utils.js
// Purpose: Pure helpers for item-type normalization and create-time defaults.
// How it fits: Keeps legacy type shims in one place so runtime code can branch on canonical keys only.

import { TEMPLATE } from "../constants.js";

// Legacy worlds may still contain Anarchy-era item types. We accept them as
// migration inputs, but the rest of the runtime should normalize immediately.
export const LEGACY_ITEM_TYPE_MAP = Object.freeze({
  weapon: TEMPLATE.itemType.personalWeapon,
  shadowamp: TEMPLATE.itemType.assetModule,
});

// Default icons are tied to canonical item types so legacy items inherit the
// same presentation once they are normalized during document creation.
export const DEFAULT_ITEM_ICONS = Object.freeze({
  contact: "systems/mwd/img/default/mystery-man.svg",
  gear: "systems/mwd/img/default/Default_Gear.svg",
  consumable: "systems/mwd/img/default/Default_Gear.svg",
  quality: "systems/mwd/img/default/card-joker.svg",
  assetModule: "systems/mwd/img/default/upgrade.svg",
  skill: "systems/mwd/img/default/Default_Skill.svg",
  lifeModule: "systems/mwd/img/default/book.svg",
  mechWeapon: "systems/mwd/img/default/Default_Weapon.svg",
  personalWeapon: "systems/mwd/img/colt-m1911.svg",
  armor: "systems/mwd/img/default/Default_Armor.svg",
});

export function canonicalizeItemType(type) {
  return LEGACY_ITEM_TYPE_MAP[type] ?? type;
}

export function getDefaultItemIcon(type) {
  return DEFAULT_ITEM_ICONS[canonicalizeItemType(type)];
}

export function isLegacyItemType(type) {
  return Object.prototype.hasOwnProperty.call(LEGACY_ITEM_TYPE_MAP, type);
}
