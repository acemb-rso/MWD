import test from "node:test";
import assert from "node:assert/strict";

import {
  MACHINE_ACTOR_TYPES,
  getActorType,
  isBattleMechActor,
  isMachineActor,
  isPersonActor,
  isVehicleActor,
} from "../src/modules/utils/actor-guards.js";

test("actor guards expose the canonical machine actor type list", () => {
  assert.deepEqual(MACHINE_ACTOR_TYPES, ["vehicle", "battlemech"]);
  assert.equal(Object.isFrozen(MACHINE_ACTOR_TYPES), true);
});

test("getActorType handles actor documents and plain fixtures", () => {
  assert.equal(getActorType("vehicle"), "vehicle");
  assert.equal(getActorType({ type: "vehicle" }), "vehicle");
  assert.equal(getActorType({ type: "character" }), "character");
  assert.equal(getActorType({ type: "custom" }), "custom");
  assert.equal(getActorType(null), "");
  assert.equal(getActorType(undefined), "");
});

test("getActorType resolves token-like wrappers through actor data first", () => {
  assert.equal(getActorType({ type: "Token", actor: { type: "battlemech" } }), "battlemech");
  assert.equal(getActorType({ document: { type: "Token", actor: { type: "vehicle" } } }), "vehicle");
  assert.equal(getActorType({ baseActor: { type: "npc" } }), "npc");
  assert.equal(getActorType({ document: { baseActor: { type: "character" } } }), "character");
});

test("actor guards classify machine and personal actors", () => {
  assert.equal(isMachineActor({ type: "vehicle" }), true);
  assert.equal(isMachineActor({ type: "battlemech" }), true);
  assert.equal(isMachineActor({ type: "character" }), false);
  assert.equal(isMachineActor({ actor: { type: "vehicle" } }), true);

  assert.equal(isPersonActor({ type: "character" }), true);
  assert.equal(isPersonActor({ type: "npc" }), true);
  assert.equal(isPersonActor({ type: "battlemech" }), false);
});

test("actor guards expose specific machine predicates", () => {
  assert.equal(isBattleMechActor({ type: "battlemech" }), true);
  assert.equal(isBattleMechActor({ type: "vehicle" }), false);
  assert.equal(isVehicleActor({ type: "vehicle" }), true);
  assert.equal(isVehicleActor({ type: "battlemech" }), false);
});
