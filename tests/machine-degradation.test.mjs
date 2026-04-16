import test from "node:test";
import assert from "node:assert/strict";

import {
  getMachineReliabilityThreshold,
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
          front: { enabled: true, stress: 0, condition: 0, destroyed: false, tags: [] },
          side: { enabled: true, stress: 0, condition: 0, destroyed: false, tags: [] },
          rear: { enabled: true, stress: 0, condition: 0, destroyed: false, tags: [] },
          turret: { enabled: true, stress: 0, condition: 0, destroyed: false, tags: [] },
          core: { enabled: true, stress: 0, condition: 0, destroyed: false, tags: [] },
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

test("zero-damage hit still adds shock without adding stress", () => {
  const result = resolveMachineDegradation({
    actorSnapshot: buildActorSnapshot({ reliability: 3 }),
    locationKey: "front",
    machineDamageDealt: 0,
    attackQuality: "highMargin",
  });

  assert.equal(result.stressDelta.front ?? 0, 0);
  assert.equal(result.shockDelta, 3);
  assert.equal(result.summary.shockAfter, 3);
});

test("shock overflow advances the highest-stress location and reduces shock/stress", () => {
  const actor = buildActorSnapshot({ reliability: 2, shock: 1 });
  actor.system.mwd.locations.front.stress = 3;
  actor.system.mwd.locations.side.stress = 1;

  const result = resolveMachineDegradation({
    actorSnapshot: actor,
    locationKey: "side",
    machineDamageDealt: 2,
    attackQuality: "hit",
  });

  assert.equal(result.conditionAdvancements.length, 1);
  assert.equal(result.conditionAdvancements[0].location, "front");
  assert.equal(result.stressDelta.side, 2);
  assert.equal(result.stressDelta.front, -2);
  assert.equal(result.summary.shockAfter, 0);
});

test("reliability spend cancels one advancement but still consumes reduction steps", () => {
  const actor = buildActorSnapshot({ reliability: 1, spendable: 1, shock: 2 });
  actor.system.mwd.locations.front.stress = 2;
  actor.system.mwd.locations.side.stress = 2;

  const result = resolveMachineDegradation({
    actorSnapshot: actor,
    locationKey: "front",
    machineDamageDealt: 0,
    attackQuality: "hit",
    allowReliabilitySpend: true,
    reliabilitySpendSelections: [0],
  });

  assert.equal(result.reliabilitySpends.length, 1);
  assert.equal(result.conditionAdvancements.length, 1);
  assert.equal(result.reliabilitySpends[0].location, "front");
  assert.equal(result.conditionAdvancements[0].location, "side");
  assert.equal(result.summary.reliabilitySpendableAfter, 0);
  assert.equal(result.summary.shockAfter, 0);
});

test("disabled locations remain eligible and route to fallback", () => {
  const actor = buildActorSnapshot({ reliability: 1 });
  actor.system.mwd.locations.front.stress = 3;
  actor.system.mwd.locations.front.condition = 4;
  actor.system.mwd.locations.side.stress = 1;

  const result = resolveMachineDegradation({
    actorSnapshot: actor,
    locationKey: "rear",
    machineDamageDealt: 0,
    attackQuality: "hit",
  });

  assert.equal(result.fallbackEvents[0].location, "front");
  assert.equal(result.summary.shockAfter, 0);
});
