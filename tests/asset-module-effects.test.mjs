import test from "node:test";
import assert from "node:assert/strict";

import {
  buildAssetModuleSummary,
  findAssetModuleActionOverride,
  getApplicableAssetModuleEffects,
  getAssetModuleBypassStatuses,
  getAssetModuleClusteringProfile,
  getAssetModuleDerivedStatuses,
  getAssetModuleMovementBonus,
  sumAssetModuleDice,
} from "../src/modules/mwd/asset-module-effects.js";
import { AssetModuleValidationError, normalizeAssetModuleSystem } from "../src/modules/mwd/asset-module-rules.js";

function actorWithModule(system) {
  return {
    type: "battlemech",
    statuses: new Set(),
    items: [{
      id: "module-1",
      name: "Test Suite",
      type: "assetModule",
      canonicalType: "assetModule",
      system,
    }],
  };
}

test("asset module effects normalize activation and effect shape", () => {
  const normalized = normalizeAssetModuleSystem({
    installClass: "equipment",
    activation: { mode: "toggle", active: true, selectedMode: "defense" },
    effects: [{
      id: "guard",
      timing: "active",
      scope: "self",
      grants: { statuses: ["ecmShrouded", "epmBoosted"] },
      modifies: { dice: 2, bypassStatuses: ["ecmShrouded"] },
    }],
  });

  assert.equal(normalized.installClass, "equipment");
  assert.equal(normalized.activation.mode, "toggle");
  assert.equal(normalized.effects[0].grants.statuses.includes("epmBoosted"), true);
  assert.equal(normalized.effects[0].grants.statuses.includes("ecmBoosted"), false);
  assert.deepEqual(normalized.effects[0].modifies.bypassStatuses, ["ecmShrouded"]);
});

test("asset module effects fail loud for invalid mechanical data", () => {
  assert.throws(
    () => normalizeAssetModuleSystem({ effects: ["bad-data"] }),
    error => error instanceof AssetModuleValidationError
      && /effects\[0\] must be an object/.test(error.message),
  );
  assert.throws(
    () => normalizeAssetModuleSystem({ effects: [{ id: "bad-status", grants: { statuses: ["ecmBoosted"] } }] }),
    error => error instanceof AssetModuleValidationError
      && /epmBoosted, not ecmBoosted/.test(error.message),
  );
  assert.throws(
    () => normalizeAssetModuleSystem({ effects: [{ id: "bad-bypass", modifies: { bypassStatuses: ["ecmJamming"] } }] }),
    error => error instanceof AssetModuleValidationError
      && /may only include: ecmShrouded/.test(error.message),
  );
});

test("runtime module lookup throws instead of dropping invalid effects", () => {
  const actor = actorWithModule({
    effects: [{ modifies: { dice: 1 } }],
  });

  assert.throws(
    () => sumAssetModuleDice(actor, { payload: { intent: "skill", key: "piloting" } }),
    error => error instanceof AssetModuleValidationError
      && /effects\[0\]\.id is required/.test(error.message),
  );
});

test("ready, active, and cooldown filtering choose the right module effects", () => {
  const actor = actorWithModule({
    activation: { mode: "toggle", active: true },
    effects: [
      { id: "ready-dice", timing: "ready", modifies: { dice: 1 } },
      { id: "active-dice", timing: "active", modifies: { dice: 2 } },
      { id: "triggered-dice", timing: "triggered", modifies: { dice: 4 } },
    ],
  });

  assert.equal(sumAssetModuleDice(actor, { payload: { intent: "skill", key: "piloting" } }), 3);
  assert.equal(sumAssetModuleDice(actor, {
    payload: { intent: "skill", key: "piloting" },
    context: { trigger: "onActionUse" },
  }), 7);

  globalThis.game = { combat: { round: 3 } };
  try {
    actor.items[0].system.activation.cooldownUntilRound = 3;
    assert.equal(sumAssetModuleDice(actor, { payload: { intent: "skill", key: "piloting" } }), 0);
  } finally {
    delete globalThis.game;
  }
});

test("effect requirements match action, skill, tags, weapon tags, and target state", () => {
  const actor = actorWithModule({
    effects: [
      {
        id: "sensor",
        requires: { actionIds: ["sensorSweep"], skillIds: ["perception"] },
        modifies: { dice: 2 },
      },
      {
        id: "mine-pilot",
        requires: { tags: ["hazard.mine"], skillIds: ["piloting"] },
        modifies: { dice: 2 },
      },
      {
        id: "lock-missile-ar",
        requires: { weaponTags: ["weapon.missile"], detectionState: "lock" },
        modifies: { ar: 5 },
      },
      {
        id: "blind-contact",
        requires: { actionIds: ["acquireTarget"], targetState: "blind" },
        grants: { actionOverrides: [{ actionIds: ["acquireTarget"], cost: 0, resource: "fa", category: "free" }] },
      },
    ],
  });

  assert.equal(sumAssetModuleDice(actor, {
    payload: { intent: "skill", key: "perception", machineActionKey: "sensorSweep" },
  }), 2);
  assert.equal(sumAssetModuleDice(actor, {
    payload: { intent: "skill", key: "piloting", tags: ["hazard.mine"] },
  }), 2);

  const attackEffects = getApplicableAssetModuleEffects(actor, {
    payload: { intent: "attack" },
    resolved: {
      intent: "attack",
      attack: {
        ewContext: { detectionState: "lock" },
        weapon: { weaponType: "missile", category: "ranged" },
      },
    },
  }).effects;
  assert.equal(attackEffects.find(effect => effect.id === "lock-missile-ar").modifies.ar, 5);

  const override = findAssetModuleActionOverride(actor, "acquireTarget", {
    payload: { actionId: "acquireTarget" },
    resolved: { intent: "acquire", acquire: { currentState: "blind" } },
    context: { targetState: "blind" },
  });
  assert.equal(override.cost, 0);
  assert.equal(override.resource, "fa");
});

test("active effects grant derived statuses, movement, shroud bypass, and clustering", () => {
  const actor = actorWithModule({
    activation: { mode: "toggle", active: true },
    effects: [
      {
        id: "guardian",
        timing: "active",
        scope: "self",
        grants: { statuses: ["ecmShrouded", "epmBoosted"] },
        modifies: { movementMeters: 30 },
      },
      {
        id: "probe",
        timing: "active",
        requires: { actionIds: ["acquireTarget"] },
        modifies: { bypassStatuses: ["ecmShrouded"] },
      },
      {
        id: "cluster",
        timing: "active",
        requires: { weaponTags: ["weapon.cluster"] },
        modifies: { clusteringDice: 1, clusteringTarget: -1 },
      },
    ],
  });

  assert.equal(getAssetModuleDerivedStatuses(actor).has("ecmShrouded"), true);
  assert.equal(getAssetModuleDerivedStatuses(actor).has("epmBoosted"), true);
  assert.equal(getAssetModuleMovementBonus(actor), 30);
  assert.equal(getAssetModuleBypassStatuses(actor, {
    payload: { intent: "acquire" },
    resolved: { intent: "acquire", acquire: { currentState: "blind" } },
  }).has("ecmShrouded"), true);

  const cluster = getAssetModuleClusteringProfile(actor, {
    resolved: {
      intent: "attack",
      attack: { weapon: { clusteringDice: 4, category: "ranged" } },
    },
  });
  assert.equal(cluster.diceModifier, 1);
  assert.equal(cluster.targetNumberModifier, -1);
});

test("asset module summaries are generated from normalized effects", () => {
  const item = {
    id: "module-1",
    name: "Guardian ECM",
    type: "assetModule",
    system: {
      activation: { mode: "toggle", active: true },
      effects: [{
        id: "guardian",
        label: "Guardian ECM",
        timing: "active",
        grants: { statuses: ["ecmShrouded"] },
        modifies: { dice: 3 },
        requires: { actionIds: ["ecmSpike", "breakLock"] },
      }],
    },
  };

  assert.match(buildAssetModuleSummary(item).summary, /Active: applies ecmShrouded; \+3 dice to ecmSpike \/ breakLock\./);
});

test("asset module summaries expose invalid effect errors", () => {
  const summary = buildAssetModuleSummary({
    id: "bad-module",
    name: "Bad Module",
    type: "assetModule",
    system: { effects: [{ modifies: { dice: 1 } }] },
  });

  assert.equal(summary.summary, "");
  assert.equal(summary.errors.length, 1);
  assert.match(summary.errors[0], /Bad Module: effects\[0\]\.id is required/);
});
