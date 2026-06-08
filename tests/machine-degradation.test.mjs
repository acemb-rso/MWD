import test from "node:test";
import assert from "node:assert/strict";

import {
  getMachineReliabilityThreshold,
  normalizeMachineDegradationState,
  resolveMachineDegradation,
} from "../src/modules/mwd/machine-degradation.js";

function buildActorSnapshot(overrides = {}) {
  return {
    type: overrides.type ?? "vehicle",
    system: {
      attributes: {
        reliability: { value: overrides.reliability ?? 3 },
      },
      mwd: {
        shock: { value: overrides.shock ?? 0 },
        reliabilitySpendable: { value: overrides.spendable ?? overrides.reliability ?? 3 },
        locations: {
          body: { enabled: true, stress: 0, condition: 0, destroyed: false, tags: [] },
          turret: { enabled: true, stress: 0, condition: 0, destroyed: false, tags: [] },
          mobility: { enabled: true, stress: 0, condition: 0, destroyed: false, tags: [] },
        },
      },
    },
  };
}

test("reliability threshold mapping matches the locked curve", () => {
  assert.equal(getMachineReliabilityThreshold(0), 1);
  assert.equal(getMachineReliabilityThreshold(1), 2);
  assert.equal(getMachineReliabilityThreshold(2), 3);
  assert.equal(getMachineReliabilityThreshold(3), 4);
  assert.equal(getMachineReliabilityThreshold(4), 6);
  assert.equal(getMachineReliabilityThreshold(5), 8);
});

test("zero-structure hit does not add shock or stress by default", () => {
  const result = resolveMachineDegradation({
    actorSnapshot: buildActorSnapshot({ reliability: 3 }),
    locationKey: "body",
    machineDamageDealt: 0,
    attackQuality: "highMargin",
  });

  assert.equal(result.stressDelta.body ?? 0, 0);
  assert.equal(result.shockDelta, 0);
  assert.equal(result.summary.shockAfter, 0);
});

test("structure damage adds stress and shock", () => {
  const result = resolveMachineDegradation({
    actorSnapshot: buildActorSnapshot({ reliability: 3 }),
    locationKey: "body",
    machineDamageDealt: 2,
    attackQuality: "highMargin",
  });

  assert.equal(result.stressDelta.body, 2);
  assert.equal(result.shockDelta, 3);
  assert.equal(result.summary.shockAfter, 3);
});

test("explicit critical shock can add pressure without structure damage", () => {
  const result = resolveMachineDegradation({
    actorSnapshot: buildActorSnapshot({ reliability: 3 }),
    locationKey: "body",
    machineDamageDealt: 0,
    attackQuality: "",
    extraShockGain: 2,
  });

  assert.equal(result.stressDelta.body ?? 0, 0);
  assert.equal(result.shockDelta, 2);
  assert.equal(result.summary.shockAfter, 2);
});

test("shock overflow advances the highest-stress location and reduces shock/stress", () => {
  const actor = buildActorSnapshot({ reliability: 2, shock: 1 });
  actor.system.mwd.locations.body.stress = 4;
  actor.system.mwd.locations.mobility.stress = 1;

  const result = resolveMachineDegradation({
    actorSnapshot: actor,
    locationKey: "mobility",
    machineDamageDealt: 2,
    attackQuality: "hit",
  });

  assert.equal(result.conditionAdvancements.length, 1);
  assert.equal(result.conditionAdvancements[0].location, "body");
  assert.equal(result.stressDelta.mobility, 2);
  assert.equal(result.stressDelta.body, -2);
  assert.equal(result.summary.shockAfter, 0);
});

test("reliability spend cancels one advancement but still consumes reduction steps", () => {
  const actor = buildActorSnapshot({ reliability: 1, spendable: 1, shock: 2 });
  actor.system.mwd.locations.body.stress = 2;
  actor.system.mwd.locations.mobility.stress = 2;

  const result = resolveMachineDegradation({
    actorSnapshot: actor,
    locationKey: "body",
    machineDamageDealt: 0,
    attackQuality: "",
    extraShockGain: 2,
    allowReliabilitySpend: true,
    reliabilitySpendSelections: [0],
  });

  assert.equal(result.reliabilitySpends.length, 1);
  assert.equal(result.conditionAdvancements.length, 1);
  assert.equal(result.reliabilitySpends[0].location, "body");
  assert.equal(result.conditionAdvancements[0].location, "mobility");
  assert.equal(result.summary.reliabilitySpendableAfter, 0);
  assert.equal(result.summary.shockAfter, 0);
});

test("disabled locations remain eligible and route to fallback", () => {
  const actor = buildActorSnapshot({ reliability: 1 });
  actor.system.mwd.locations.body.stress = 3;
  actor.system.mwd.locations.body.condition = 4;
  actor.system.mwd.locations.mobility.stress = 1;

  const result = resolveMachineDegradation({
    actorSnapshot: actor,
    locationKey: "mobility",
    machineDamageDealt: 0,
    attackQuality: "",
    extraShockGain: 2,
  });

  assert.equal(result.fallbackEvents[0].location, "body");
  assert.equal(result.summary.shockAfter, 0);
});

test("shock tie-breaks prefer the current hit location after stress and condition", () => {
  const actor = buildActorSnapshot({ reliability: 1, shock: 1 });
  actor.system.mwd.locations.body.stress = 1;
  actor.system.mwd.locations.mobility.stress = 1;

  const result = resolveMachineDegradation({
    actorSnapshot: actor,
    locationKey: "mobility",
    machineDamageDealt: 0,
    attackQuality: "",
    extraShockGain: 1,
  });

  assert.equal(result.conditionAdvancements.length, 1);
  assert.equal(result.conditionAdvancements[0].location, "mobility");
  assert.equal(result.stressDelta.mobility, -1);
  assert.equal(result.summary.shockAfter, 0);
});

test("legacy battlemech location keys normalize into grouped degradation buckets", () => {
  const system = normalizeMachineDegradationState({
    attributes: {
      condition: { value: 3 },
    },
    mwd: {
      locations: {
        head: { enabled: true, stress: 1, condition: 1, destroyed: false, tags: ["cockpit"] },
        torsoFront: { enabled: true, stress: 2, condition: 1, destroyed: false, tags: ["engine"] },
        torsoRear: { enabled: true, stress: 1, condition: 2, destroyed: false, tags: ["ammoStore"] },
        core: { enabled: true, stress: 1, condition: 0, destroyed: false, tags: ["gyro"] },
        leftArm: { enabled: true, stress: 2, condition: 1, destroyed: false, tags: ["weaponGroup"] },
        rightArm: { enabled: true, stress: 1, condition: 0, destroyed: false, tags: ["weaponGroup"] },
        leftLeg: { enabled: true, stress: 3, condition: 2, destroyed: false, tags: ["motiveSystem"] },
        rightLeg: { enabled: true, stress: 1, condition: 1, destroyed: false, tags: ["motiveSystem"] },
      },
    },
  }, "battlemech");

  assert.equal(system.attributes.reliability.value, 3);
  assert.deepEqual(Object.keys(system.mwd.locations), ["head", "torso", "arms", "legs"]);
  assert.equal(system.mwd.locations.torso.stress, 4);
  assert.equal(system.mwd.locations.torso.condition, 2);
  assert.deepEqual(system.mwd.locations.torso.tags.sort(), ["ammoStore", "engine", "gyro"]);
  assert.equal(system.mwd.locations.arms.stress, 3);
  assert.equal(system.mwd.locations.legs.stress, 4);
  assert.equal(system.mwd.locations.legs.condition, 2);
});

test("legacy vehicle location keys normalize into grouped degradation buckets", () => {
  const system = normalizeMachineDegradationState({
    attributes: {
      reliability: { value: 2 },
    },
    mwd: {
      locations: {
        front: { enabled: true, stress: 1, condition: 1, destroyed: false, tags: ["frontArmor"] },
        side: { enabled: true, stress: 2, condition: 2, destroyed: false, tags: ["sideArmor"] },
        rear: { enabled: true, stress: 1, condition: 1, destroyed: false, tags: ["rearArmor"] },
        rotor: { enabled: false, stress: 1, condition: 3, destroyed: false, tags: ["rotor"] },
        core: { enabled: true, stress: 2, condition: 2, destroyed: false, tags: ["engine"] },
        turret: { enabled: true, stress: 1, condition: 1, destroyed: false, tags: ["turret"] },
      },
    },
  }, "vehicle");

  assert.deepEqual(Object.keys(system.mwd.locations), ["body", "turret", "mobility"]);
  assert.equal(system.mwd.locations.body.stress, 3);
  assert.equal(system.mwd.locations.body.condition, 2);
  assert.deepEqual(system.mwd.locations.body.tags.sort(), ["engine", "frontArmor"]);
  assert.equal(system.mwd.locations.mobility.stress, 4);
  assert.equal(system.mwd.locations.mobility.condition, 3);
  assert.deepEqual(system.mwd.locations.mobility.tags.sort(), ["rearArmor", "rotor", "sideArmor"]);
});

test("vehicle zero structure normalizes enabled locations to disabled", () => {
  const system = normalizeMachineDegradationState({
    monitors: {
      structure: { value: 0, max: 10 },
    },
    attributes: {
      reliability: { value: 2 },
    },
    mwd: {
      locations: {
        front: { enabled: true, stress: 0, condition: 1, destroyed: false, tags: [] },
        rotor: { enabled: false, stress: 0, condition: 1, destroyed: false, tags: [] },
      },
    },
  }, "vehicle");

  assert.equal(system.mwd.locations.body.condition, 4);
  assert.equal(system.mwd.locations.turret.condition, 4);
  assert.equal(system.mwd.locations.mobility.condition, 1);
});
