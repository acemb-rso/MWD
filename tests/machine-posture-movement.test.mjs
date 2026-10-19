import test from "node:test";
import assert from "node:assert/strict";

import { clearStatusesEndedByAction } from "../src/modules/mwd/machine-action-statuses.js";
import { BATTLEMECH_MOVEMENT_ACTIONS } from "../src/modules/mwd/battlemech-movement-actions.js";
import { VEHICLE_MOVEMENT_ACTIONS } from "../src/modules/mwd/vehicle-movement-actions.js";

function machineWith(statuses) {
  const actor = {
    type: "vehicle",
    name: "Tank",
    statuses: new Set(statuses),
    async toggleStatusEffect(statusId, { active } = {}) {
      if (active) actor.statuses.add(statusId);
      else actor.statuses.delete(statusId);
    },
  };
  return actor;
}

test("moving ends Braced and Hull Down; Shield is unaffected", async () => {
  const actor = machineWith(["braced", "entrenchedHullDown", "shielded"]);
  const cleared = await clearStatusesEndedByAction({ actor, actionId: "move" });

  assert.deepEqual(cleared.map(entry => entry.statusId).sort(), ["braced", "entrenchedHullDown"]);
  assert.ok(cleared.every(entry => entry.message));
  assert.deepEqual([...actor.statuses], ["shielded"]);
});

test("other actions and absent statuses clear nothing", async () => {
  const actor = machineWith(["braced"]);
  assert.deepEqual(await clearStatusesEndedByAction({ actor, actionId: "attack" }), []);
  assert.deepEqual(await clearStatusesEndedByAction({ actor: machineWith([]), actionId: "move" }), []);
  assert.deepEqual([...actor.statuses], ["braced"]);
});

test("only pure postures hold position; every other movement action moves", () => {
  const moves = action => action.mode !== "posture" || Boolean(action.includesMovement);
  const stationary = table => Object.values(table).filter(action => !moves(action)).map(action => action.id).sort();

  assert.deepEqual(stationary(BATTLEMECH_MOVEMENT_ACTIONS), ["prone", "shield"]);
  assert.deepEqual(stationary(VEHICLE_MOVEMENT_ACTIONS), ["brace", "hullDown", "shield"]);
});
