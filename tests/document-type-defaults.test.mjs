import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveDocumentTypeCreateDefaults,
  resolveDocumentTypeBlock,
} from "../src/modules/document-type-defaults.js";

test("character defaults keep prototype token at the root", () => {
  const defaults = resolveDocumentTypeCreateDefaults("Actor", "character");

  assert.equal(defaults.prototypeToken.actorLink, true);
  assert.equal(defaults.system.attributes.reflexes.value, 1);
  assert.equal(defaults.system.description, "");
});

test("battlemech defaults resolve nested templates before local fields", () => {
  const block = resolveDocumentTypeBlock(undefined, "Actor", "battlemech");

  assert.equal(block.mwd.unitType, "mech");
  assert.equal(block.mwd.heat.hardMax, 10);
  assert.equal(block.mwd.heat.max, 10);
  assert.equal(block.monitors.heat.max, 10);
  assert.equal(block.mwd.heat.thresholds.shutdown, 4);
  assert.equal(block.attributes.reliability.value, 3);
  assert.equal(block.mwd.shock.value, 0);
  assert.equal(block.mwd.fireMode, "alphaStrike");
  assert.equal(block.mwd.locations.head.condition, 0);
  assert.equal(block.mwd.locations.torso.condition, 0);
  assert.equal(block.mwd.locations.arms.condition, 0);
  assert.equal(block.mwd.locations.legs.condition, 0);
  assert.deepEqual(block.mwd.weaponGroups, []);
  assert.deepEqual(block.movement, undefined);
});

test("vehicle defaults include ground and flight movement only", () => {
  const block = resolveDocumentTypeBlock(undefined, "Actor", "vehicle");

  assert.equal(block.attributes.reliability.value, 3);
  assert.equal(block.mwd.shock.value, 0);
  assert.deepEqual(block.mwd.hardpoints, []);
  assert.equal(block.mwd.locations.front.condition, 0);
  assert.deepEqual(block.movement, { ground: 0, flight: 0 });
  assert.equal(block.movement.jump, undefined);
});

test("item defaults compose shared reference templates into system data", () => {
  const defaults = resolveDocumentTypeCreateDefaults("Item", "armor");

  assert.equal(defaults.system.rating, 0);
  assert.equal(defaults.system.description, "");
  assert.equal(defaults.system.gmnotes, "");
});

test("consumable defaults resolve through the same create-time graph as gear", () => {
  const defaults = resolveDocumentTypeCreateDefaults("Item", "consumable");

  assert.equal(defaults.system.quantity, 1);
  assert.equal(defaults.system.rating, 0);
  assert.equal(defaults.system.category, "ammo");
  assert.equal(defaults.system.description, "");
});

test("asset module defaults include structured jumping payload fields", () => {
  const defaults = resolveDocumentTypeCreateDefaults("Item", "assetModule");

  assert.equal(defaults.system.category, "special");
  assert.equal(defaults.system.mobility.jumping.enabled, false);
  assert.equal(defaults.system.mobility.jumping.movement, 0);
  assert.equal(defaults.system.mobility.jumping.heat, 0);
  assert.equal(defaults.system.mobility.jumping.attackRatingBonus, 0);
  assert.equal(defaults.system.mobility.jumping.defenseRatingBonus, 0);
  assert.equal(defaults.system.mobility.jumping.dfaEnabled, false);
});

test("mech weapon defaults include hardpoint slot and payload scaffolding", () => {
  const defaults = resolveDocumentTypeCreateDefaults("Item", "mechWeapon");

  assert.equal(defaults.system.weaponCategory, "ranged");
  assert.equal(defaults.system.skill, "gunnery");
  assert.equal(defaults.system.size, "small");
  assert.equal(defaults.system.damageType, "energy");
  assert.equal(defaults.system.clusteringDice, 0);
  assert.equal(defaults.system.clusteringTargetNumber, 5);
  assert.equal(defaults.system.volatile, false);
  assert.deepEqual(defaults.system.payloads, []);
  assert.deepEqual(defaults.system.consumptionSources, []);
  assert.equal(defaults.system.fireControl.usesPerActivation, 1);
});
