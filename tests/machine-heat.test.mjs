import test from "node:test";
import assert from "node:assert/strict";

import {
  buildBattlemechHeatModel,
  computeBattlemechAttackHeat,
  getBattlemechHeatActivationKey,
  resolveBattlemechHeatActivation,
} from "../src/modules/mwd/machine-heat.js";

function createSystemData(overrides = {}) {
  return {
    monitors: {
      heat: { value: 4, max: 10 },
    },
    hybrid: {
      heat: { dissipation: 4 },
    },
    attributes: {
      chassis: { value: 4 },
      reliability: { value: 3 },
    },
    mwd: {
      heat: {
        pendingGenerated: 2,
        thresholds: { runningHot: 3, overheated: 5, shutdown: 7 },
      },
      heatStatus: {},
      crits: [],
      locations: {
        torso: { enabled: true, destroyed: false, tags: ["ammoStore"] },
      },
    },
    ...overrides,
  };
}

test("activation key encodes combat id, combatant id, round, and turn", () => {
  assert.equal(
    getBattlemechHeatActivationKey({ combatId: "c1", combatantId: "cb1", round: 2, turn: 5 }),
    "c1:cb1:2:5"
  );
  assert.equal(getBattlemechHeatActivationKey(null), "");
});

test("battlemech heat model derives impaired cooling from active heat crits", () => {
  const model = buildBattlemechHeatModel(createSystemData({
    mwd: {
      heat: {
        pendingGenerated: 1,
        thresholds: { runningHot: 3, overheated: 5, shutdown: 7 },
      },
      crits: [{ active: true, escalationKey: "heat" }],
      locations: {},
    },
  }));

  assert.equal(model.coolingImpaired, true);
  assert.equal(model.dissipation, 4);
  assert.equal(model.effectiveDissipation, 2);
  assert.equal(model.pendingGenerated, 1);
});

test("battlemech heat model keeps a configured track length but expands display when heat exceeds it", () => {
  const model = buildBattlemechHeatModel(createSystemData({
    monitors: {
      heat: { value: 12, max: 8 },
    },
    mwd: {
      heat: {
        pendingGenerated: 0,
        thresholds: { runningHot: 3, overheated: 5, shutdown: 7 },
      },
      crits: [],
      locations: {},
    },
  }));

  assert.equal(model.trackLength, 8);
  assert.equal(model.displayMax, 12);
  assert.equal(model.current, 12);
});

test("battlemech attack heat sums weapon heat and crit-based attack surcharges", () => {
  const result = computeBattlemechAttackHeat({
    weapons: [
      { system: { heat: 2, damageType: "energy" } },
      { system: { heat: 1, damageType: "kinetic" } },
    ],
    crits: [
      { active: true, resourceEffects: { heatPerAttack: 1 } },
      { active: true, resourceEffects: { heatPerEnergyAttack: 2 } },
    ],
  });

  assert.equal(result.baseHeat, 3);
  assert.equal(result.extraAttackHeat, 1);
  assert.equal(result.extraEnergyHeat, 2);
  assert.equal(result.total, 6);
});

test("activation resolution applies pending heat, dissipation, and danger checks", () => {
  const result = resolveBattlemechHeatActivation(createSystemData({
    monitors: {
      heat: { value: 6, max: 10 },
    },
    hybrid: {
      heat: { dissipation: 2 },
    },
    mwd: {
      heat: {
        pendingGenerated: 3,
        thresholds: { runningHot: 3, overheated: 5, shutdown: 7 },
      },
      crits: [],
      locations: {
        torso: { enabled: true, destroyed: false, tags: ["ammoStore"] },
      },
    },
  }));

  assert.equal(result.previousHeat, 6);
  assert.equal(result.generated, 3);
  assert.equal(result.newHeat, 7);
  assert.equal(result.penalties.movementPenalty, 2);
  assert.equal(result.penalties.rangedDicePenalty, 2);
  assert.equal(result.penalties.dangerLevel, 1);
  assert.equal(result.dangerChecks.shutdownPool, 7);
  assert.equal(result.dangerChecks.shutdownDN, 1);
  assert.equal(result.volatile, true);
});

test("activation resolution does not clamp heat to the configured track length", () => {
  const result = resolveBattlemechHeatActivation(createSystemData({
    monitors: {
      heat: { value: 8, max: 10 },
    },
    hybrid: {
      heat: { dissipation: 1 },
    },
    mwd: {
      heat: {
        pendingGenerated: 5,
        thresholds: { runningHot: 3, overheated: 5, shutdown: 7 },
      },
      crits: [],
      locations: {},
    },
  }));

  assert.equal(result.newHeat, 12);
  assert.equal(result.penalties.dangerLevel, 6);
});
