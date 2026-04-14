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
  assert.equal(block.mwd.heat.thresholds.shutdown, 4);
  assert.deepEqual(block.mwd.weaponGroups, []);
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
