import test from "node:test";
import assert from "node:assert/strict";

import {
  getMachineAttackCqAdjustments,
  getMachineAttackDiceModifier,
  getMachineDerivedStatusIds,
  getMachineMovementEffects,
  getMachineRuleState,
} from "../src/modules/mwd/machine-state-effects.js";

function buildActor({
  type = "battlemech",
  statuses = [],
  locations = {},
} = {}) {
  return {
    type,
    statuses: new Set(statuses),
    system: {
      mwd: {
        crits: [],
        locations: {
          head: { enabled: true, stress: 0, condition: 0, destroyed: false, ...(locations.head ?? {}) },
          torso: { enabled: true, stress: 0, condition: 0, destroyed: false, ...(locations.torso ?? {}) },
          arms: { enabled: true, stress: 0, condition: 0, destroyed: false, ...(locations.arms ?? {}) },
          legs: { enabled: true, stress: 0, condition: 0, destroyed: false, ...(locations.legs ?? {}) },
          front: { enabled: true, stress: 0, condition: 0, destroyed: false, ...(locations.front ?? {}) },
          side: { enabled: true, stress: 0, condition: 0, destroyed: false, ...(locations.side ?? {}) },
          rear: { enabled: true, stress: 0, condition: 0, destroyed: false, ...(locations.rear ?? {}) },
          core: { enabled: true, stress: 0, condition: 0, destroyed: false, ...(locations.core ?? {}) },
          turret: { enabled: true, stress: 0, condition: 0, destroyed: false, ...(locations.turret ?? {}) },
          rotor: { enabled: false, stress: 0, condition: 0, destroyed: false, ...(locations.rotor ?? {}) },
        },
      },
    },
  };
}

test("battlemech degradation effects follow the canonical state thresholds", () => {
  const actor = buildActor({
    locations: {
      head: { condition: 2 },
      torso: { condition: 2 },
      arms: { condition: 4 },
      legs: { destroyed: true },
    },
  });

  const state = getMachineRuleState(actor);

  assert.equal(state.detectionStateCap, "track");
  assert.equal(state.attackHeat, 1);
  assert.equal(state.armMountedOffline, true);
  assert.equal(state.immobile, true);
  assert.equal(state.forcedProne, true);
});

test("derived status ids reflect degradation landmarks that should surface visually", () => {
  const actor = buildActor({
    locations: {
      head: { condition: 3 },
      torso: { condition: 4 },
      arms: { destroyed: true },
      legs: { condition: 4 },
    },
  });

  const derived = new Set(getMachineDerivedStatusIds(actor));

  assert.equal(derived.has("sensorDegraded"), true);
  assert.equal(derived.has("sensorBlind"), true);
  assert.equal(derived.has("gyroDamage"), true);
  assert.equal(derived.has("reactorBreach"), true);
  assert.equal(derived.has("armDestroyed"), true);
  assert.equal(derived.has("legDestroyed"), true);
});

test("prone battlemechs apply close-range penalties through the shared state helper", () => {
  const actor = buildActor({ statuses: ["proneMechFall"] });

  const movement = getMachineMovementEffects(actor);
  const attackDice = getMachineAttackDiceModifier(actor, { rangeBand: "close" });
  const cq = getMachineAttackCqAdjustments(actor, { rangeBand: "close" });

  assert.equal(movement.noSprint, true);
  assert.equal(movement.noJump, true);
  assert.equal(attackDice, -3);
  assert.equal(cq.dr, -5);
});
