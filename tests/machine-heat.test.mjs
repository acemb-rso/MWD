import test from "node:test";
import assert from "node:assert/strict";

import {
  buildBattlemechHeatModel,
  computeBattlemechAttackHeat,
  getBattlemechHeatActivationKey,
  recordBattlemechAttackHeat,
  resolveBattlemechHeatActivation,
} from "../src/modules/mwd/machine-heat.js";
import { applyHeatDangerCheckOutcome } from "../src/modules/mwd/heat-danger-outcomes.js";
import { resolveHeatDangerCheck } from "../src/modules/roll/intent/resolve-heat-danger-check.js";

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

function createBattlemechActor(overrides = {}) {
  return {
    type: "battlemech",
    name: "Hot Machine",
    statuses: new Set(overrides.statuses ?? []),
    effects: [],
    system: createSystemData(overrides.system ?? {}),
    async toggleStatusEffect(statusId, { active } = {}) {
      if (active) this.statuses.add(statusId);
      else this.statuses.delete(statusId);
      return true;
    },
    ...overrides.actor,
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

test("payload-specialized energy attacks count as energy for heat surcharges", () => {
  const result = computeBattlemechAttackHeat({
    weapons: [
      { system: { heat: 2, damageType: "thermal" } },
    ],
    crits: [
      { active: true, resourceEffects: { heatPerEnergyAttack: 2 } },
    ],
  });

  assert.equal(result.extraEnergyHeat, 2);
  assert.equal(result.total, 4);
});

test("recording BattleMech attack heat accumulates pending heat from weapon ids and resolved profiles", async () => {
  const actor = {
    type: "battlemech",
    system: createSystemData({
      mwd: {
        heat: {
          pendingGenerated: 1,
          thresholds: { runningHot: 3, overheated: 5, shutdown: 7 },
        },
        crits: [{ active: true, resourceEffects: { heatPerAttack: 1 } }],
        locations: {},
      },
    }),
    items: new Map([
      ["laser", { id: "laser", system: { heat: 2, damageType: "energy" } }],
    ]),
    async update(update) {
      for (const [path, value] of Object.entries(update)) {
        const keys = path.replace(/^system\./, "").split(".");
        let cursor = this.system;
        while (keys.length > 1) {
          const key = keys.shift();
          cursor[key] ??= {};
          cursor = cursor[key];
        }
        cursor[keys[0]] = value;
      }
    },
  };

  const first = await recordBattlemechAttackHeat(actor, {
    weaponIds: ["laser"],
    attackProfile: { heat: 2, damageType: "energy" },
  });
  assert.equal(first.pendingGenerated, 4);

  const second = await recordBattlemechAttackHeat(actor, {
    attackProfile: { heat: 3, damageType: "thermal" },
  });
  assert.equal(second.pendingGenerated, 8);
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

test("heat danger roll resolver prepares shutdown and explosion checks", async () => {
  const actor = createBattlemechActor({
    system: {
      monitors: {
        heat: { value: 8, max: 10 },
      },
      mwd: {
        heat: {
          pendingGenerated: 0,
          thresholds: { runningHot: 3, overheated: 5, shutdown: 7 },
        },
        crits: [],
        locations: {
          torso: { enabled: true, destroyed: false, tags: ["ammoStore"] },
        },
      },
    },
  });

  const shutdown = await resolveHeatDangerCheck({
    actor,
    payload: { checkKind: "shutdown", dn: 2 },
  });
  assert.equal(shutdown.title, "Shutdown Check");
  assert.equal(shutdown.pool.attribute, 4);
  assert.equal(shutdown.pool.skill, 3);
  assert.equal(shutdown.pool.bonus, 0);
  assert.equal(shutdown.dn.total, 2);
  assert.equal(shutdown.heatDangerCheck.dangerLevel, 2);

  const explosion = await resolveHeatDangerCheck({
    actor,
    payload: { checkKind: "explosion", dn: 1 },
  });
  assert.equal(explosion.title, "Explosion Check");
  assert.equal(explosion.pool.attribute, 4);
  assert.equal(explosion.pool.skill, 3);
  assert.equal(explosion.pool.bonus, -2);
  assert.equal(explosion.heatDangerCheck.pool, 5);
  assert.equal(explosion.heatDangerCheck.volatile, true);
});

test("failed shutdown danger check applies Shutdown when no override is available", async () => {
  const actor = createBattlemechActor();
  const result = await applyHeatDangerCheckOutcome({
    actor,
    ctx: {
      heatDangerCheck: {
        kind: "shutdown",
        dn: 3,
        operatorName: "Pilot",
        systemOpsRating: 2,
      },
    },
    outcomeModel: {
      passed: false,
      successes: 1,
      difficulty: { dn: 3 },
      margin: -2,
    },
  });

  assert.equal(result.outcome, "shutdownApplied");
  assert.equal(result.statusApplied, true);
  assert.equal(result.overrideAvailable, false);
  assert.equal(actor.statuses.has("shutdown"), true);
});

test("failed shutdown danger check offers pilot override when margin is below System Operations", async () => {
  const actor = createBattlemechActor();
  const result = await applyHeatDangerCheckOutcome({
    actor,
    ctx: {
      heatDangerCheck: {
        kind: "shutdown",
        dn: 3,
        operatorName: "Pilot",
        systemOpsRating: 3,
      },
    },
    outcomeModel: {
      passed: false,
      successes: 1,
      difficulty: { dn: 3 },
      margin: -2,
    },
  });

  assert.equal(result.outcome, "overrideAvailable");
  assert.equal(result.statusApplied, false);
  assert.equal(result.overrideAvailable, true);
  assert.equal(actor.statuses.has("shutdown"), false);
});

test("failed explosion danger check reports detonation only when volatile components exist", async () => {
  const volatileResult = await applyHeatDangerCheckOutcome({
    actor: createBattlemechActor(),
    ctx: {
      heatDangerCheck: {
        kind: "explosion",
        dn: 1,
        volatile: true,
      },
    },
    outcomeModel: {
      passed: false,
      successes: 0,
      difficulty: { dn: 1 },
      margin: -1,
    },
  });

  assert.equal(volatileResult.outcome, "explosionTriggered");
  assert.equal(volatileResult.explosionTriggered, true);

  const inertResult = await applyHeatDangerCheckOutcome({
    actor: createBattlemechActor(),
    ctx: {
      heatDangerCheck: {
        kind: "explosion",
        dn: 1,
        volatile: false,
      },
    },
    outcomeModel: {
      passed: false,
      successes: 0,
      difficulty: { dn: 1 },
      margin: -1,
    },
  });

  assert.equal(inertResult.outcome, "noVolatileComponents");
  assert.equal(inertResult.explosionTriggered, false);
});
