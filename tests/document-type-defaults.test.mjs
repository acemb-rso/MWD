import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveDocumentTypeCreateDefaults,
  resolveDocumentTypeBlock,
} from "../src/modules/document-type-defaults.js";
import { ensureCoreSkillRatings } from "../src/modules/mwd/skills.js";

test("character defaults keep prototype token at the root", () => {
  const defaults = resolveDocumentTypeCreateDefaults("Actor", "character");

  assert.equal(defaults.prototypeToken.actorLink, true);
  assert.equal(defaults.system.attributes.reflexes.value, 1);
  assert.equal(defaults.system.description, "");
  assert.deepEqual(defaults.system.criticals, []);
});

test("npc defaults are character-like without character edge pools", () => {
  const defaults = resolveDocumentTypeCreateDefaults("Actor", "npc");

  assert.equal(defaults.system.attributes.strength.value, 1);
  assert.equal(defaults.system.attributes.reflexes.value, 1);
  assert.equal(defaults.system.attributes.intelligence.value, 1);
  assert.equal(defaults.system.attributes.guts.value, 1);
  assert.equal(defaults.system.attributes.charisma.value, 1);
  assert.equal(defaults.system.attributes.edge.value, 1);
  assert.equal(defaults.system.counters?.edgePools, undefined);
  assert.equal(defaults.system.counters?.xp, undefined);
  assert.deepEqual(defaults.system.criticals, []);
});

test("npc systems can receive the core character skill scaffold", () => {
  const defaults = resolveDocumentTypeCreateDefaults("Actor", "npc");
  ensureCoreSkillRatings(defaults.system);

  assert.equal(defaults.system.skills.firearms.rating, 0);
  assert.equal(defaults.system.skills.gunnery.rating, 0);
  assert.equal(defaults.system.skills.perception.rating, 0);
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
  assert.equal(block.mwd.locations.body.condition, 0);
  assert.equal(block.mwd.locations.turret.condition, 0);
  assert.equal(block.mwd.locations.mobility.condition, 0);
  assert.deepEqual(block.movement, { ground: 0, flight: 0 });
  assert.equal(block.movement.jump, undefined);
});

test("item defaults compose shared reference templates into system data", () => {
  const defaults = resolveDocumentTypeCreateDefaults("Item", "armor");

  assert.equal(defaults.system.rating, 0);
  assert.equal(defaults.system.description, "");
  assert.equal(defaults.system.gmnotes, "");
  assert.equal(defaults.system.availability, "");
});

test("personal weapon defaults include strength-scaling and availability fields", () => {
  const defaults = resolveDocumentTypeCreateDefaults("Item", "personalWeapon");

  assert.equal(defaults.system.damageAttribute, "");
  assert.equal(defaults.system.damageAttributeScale, 1);
  assert.equal(defaults.system.availability, "");
});

test("consumable defaults resolve through the same create-time graph as gear", () => {
  const defaults = resolveDocumentTypeCreateDefaults("Item", "consumable");

  assert.equal(defaults.system.quantity, 1);
  assert.equal(defaults.system.rating, 0);
  assert.equal(defaults.system.category, "ammo");
  assert.equal(defaults.system.relatedSkill, "");
  assert.equal(defaults.system.availability, "");
  assert.equal(defaults.system.rulesHook, "");
  assert.equal(defaults.system.description, "");
});

test("weapon payload defaults include reusable profile and inventory fields", () => {
  const defaults = resolveDocumentTypeCreateDefaults("Item", "weaponPayload");

  assert.equal(defaults.system.quantity, 1);
  assert.deepEqual(defaults.system.families, []);
  assert.deepEqual(defaults.system.tags, []);
  assert.equal(defaults.system.profile.label, "Payload");
  assert.equal(defaults.system.profile.modifies.damage, 0);
  assert.equal(defaults.system.profile.modifies.ap, 0);
  assert.equal(defaults.system.profile.consumption.amount, 1);
  assert.equal(defaults.system.description, "");
});

test("gear defaults include inventory rule metadata", () => {
  const defaults = resolveDocumentTypeCreateDefaults("Item", "gear");

  assert.equal(defaults.system.quantity, 1);
  assert.equal(defaults.system.rating, 0);
  assert.equal(defaults.system.category, "");
  assert.equal(defaults.system.relatedSkill, "");
  assert.equal(defaults.system.availability, "");
  assert.equal(defaults.system.rulesHook, "");
  assert.deepEqual(defaults.system.tags, []);
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
