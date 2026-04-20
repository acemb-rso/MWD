import test from "node:test";
import assert from "node:assert/strict";

import {
  canonicalizeItemType,
  getDefaultItemIcon,
  isLegacyItemType,
} from "../src/modules/item/item-type-utils.js";

test("legacy item types normalize to canonical runtime types", () => {
  assert.equal(canonicalizeItemType("weapon"), "personalWeapon");
  assert.equal(canonicalizeItemType("vehicleWeapon"), "mechWeapon");
  assert.equal(canonicalizeItemType("shadowamp"), "assetModule");
  assert.equal(canonicalizeItemType("gear"), "gear");
  assert.equal(canonicalizeItemType("consumable"), "consumable");
});

test("default icons are keyed by canonical types", () => {
  assert.equal(getDefaultItemIcon("weapon"), "systems/mwd/img/colt-m1911.svg");
  assert.equal(getDefaultItemIcon("mechWeapon"), "systems/mwd/img/icons/systems/upgrades/grenade_launcher_underbarrel.svg");
  assert.equal(getDefaultItemIcon("armor"), "systems/mwd/img/default/Default_Armor.svg");
  assert.equal(getDefaultItemIcon("consumable"), "systems/mwd/img/default/Default_Gear.svg");
});

test("legacy type checks stay narrow", () => {
  assert.equal(isLegacyItemType("weapon"), true);
  assert.equal(isLegacyItemType("vehicleWeapon"), true);
  assert.equal(isLegacyItemType("gear"), false);
});
