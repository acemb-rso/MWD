import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveMachineHitLocation,
} from "../src/modules/mwd/machine-hit-locations.js";
import {
  applyMachineAttackDamage,
  drawMachineCriticalRecords,
  getActiveMachineCrits,
  normalizeCriticalSignal,
  previewMachineAttackDamage,
} from "../src/modules/mwd/critical-hits.js";
import { resolveMachineCritRemedyIntent } from "../src/modules/mwd/machine-intents.js";
import { MachineCriticalsProvider } from "../src/modules/modifiers/providers/machine-criticals.js";

function setPath(object, path, value) {
  const parts = path.split(".");
  let cursor = object;
  while (parts.length > 1) {
    const part = parts.shift();
    cursor[part] ??= {};
    cursor = cursor[part];
  }
  cursor[parts[0]] = value;
}

function machineActor(overrides = {}) {
  const actor = {
    type: overrides.type ?? "battlemech",
    name: overrides.name ?? "Test Machine",
    uuid: overrides.uuid ?? "Actor.machine",
    system: {
      monitors: {
        armor: { value: 0, max: 6 },
        structure: { value: 0, max: 10 },
      },
      mwd: {
        locations: {
          head: { enabled: true, stress: 0, tags: ["cockpit"], destroyed: false },
          torsoFront: { enabled: true, stress: 0, tags: ["engine"], destroyed: false },
          leftArm: { enabled: true, stress: 0, tags: ["weaponGroup"], destroyed: false },
          rightArm: { enabled: true, stress: 0, tags: ["weaponGroup"], destroyed: false },
          leftLeg: { enabled: true, stress: 0, tags: ["motiveSystem"], destroyed: false },
          rightLeg: { enabled: true, stress: 0, tags: ["motiveSystem"], destroyed: false },
          core: { enabled: true, stress: 0, tags: ["engine"], destroyed: false },
        },
        crits: [],
        config: { maxLocationStress: 3 },
      },
    },
    async update(update) {
      for (const [path, value] of Object.entries(update)) setPath(this, path, value);
    },
  };
  for (const [path, value] of Object.entries(overrides.paths ?? {})) setPath(actor, path, value);
  return actor;
}

test("machine hit locations distinguish armor hits, pure structure crits, and Chaos options", () => {
  const actor = machineActor();
  const armArmor = resolveMachineHitLocation({ actor, rollTotal: 16, armorBefore: 4 });
  const armStructure = resolveMachineHitLocation({ actor, rollTotal: 16, armorBefore: 0 });
  const headArmor = resolveMachineHitLocation({ actor, rollTotal: 18, armorBefore: 3 });
  const forced = resolveMachineHitLocation({ actor, rollTotal: 4, armorBefore: 6 });

  assert.equal(armArmor.locationFamily, "arms");
  assert.equal(armArmor.isAutomaticCritical, false);
  assert.equal(armArmor.chaosCriticalOption, true);
  assert.equal(armStructure.isAutomaticCritical, true);
  assert.equal(armStructure.isStructureCritical, true);
  assert.equal(headArmor.locationKey, "head");
  assert.equal(headArmor.chaosTargetLocationKey, "torsoFront");
  assert.equal(forced.isForcedCritical, true);
  assert.equal(forced.isAutomaticCritical, true);
});

test("machine damage preview splits armor before structure and preserves pure-structure timing", () => {
  const actor = machineActor();
  const hitLocation = resolveMachineHitLocation({ actor, rollTotal: 10, armorBefore: 6 });
  const preview = previewMachineAttackDamage({
    actor,
    payload: { damage: 8, hitLocation },
  });

  assert.equal(preview.ok, true);
  assert.equal(preview.machine.armorBefore, 6);
  assert.equal(preview.machine.armorAfter, 0);
  assert.equal(preview.machine.structureBefore, 10);
  assert.equal(preview.machine.structureAfter, 8);
  assert.equal(preview.machine.pureStructureHit, false);
  assert.equal(preview.finalDamage, 2);
});

test("critical signal validation accepts valid data and rejects malformed rows", () => {
  assert.deepEqual(normalizeCriticalSignal({
    key: "sensorFault",
    remedyKey: "systemReset",
    gates: "sensor, attack",
    mods: ["sensorPenalty"],
    resourceEffects: { heatImmediate: 1 },
    pilotDamage: { track: "fatigue", amount: 1 },
  }, { strict: true }).gates, ["sensor", "attack"]);

  assert.throws(() => normalizeCriticalSignal({ key: "", remedyKey: "systemReset" }, { strict: true }), /key/);
  assert.throws(() => normalizeCriticalSignal({ key: "bad", remedyKey: "notReal" }, { strict: true }), /remedy/);
  assert.throws(() => normalizeCriticalSignal({ key: "bad", resourceEffects: { heat: "hot" } }, { strict: true }), /numeric/);
});

test("applying machine damage writes monitors, location stress, and crit records", async () => {
  const actor = machineActor({
    paths: {
      "system.monitors.armor.value": 6,
    },
  });
  const hitLocation = resolveMachineHitLocation({ actor, rollTotal: 16, armorBefore: 0 });
  const result = await applyMachineAttackDamage({
    actor,
    payload: {
      damage: 3,
      hitLocation,
      source: "Test Shot",
    },
    options: {
      drawCritical: () => ({
        label: "Hard Lock",
        rollTotal: 3,
        signal: { key: "hardLock", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "lockout" },
      }),
    },
  });

  assert.equal(result.ok, true);
  assert.equal(actor.system.monitors.structure.value, 3);
  assert.equal(actor.system.mwd.locations.leftArm.stress, 1);
  assert.equal(actor.system.mwd.crits.length, 1);
  assert.equal(actor.system.mwd.crits[0].key, "actuatorLockArm");
  assert.equal(actor.system.mwd.crits[0].generalKey, "hardLock");
  assert.equal(getActiveMachineCrits(actor).length, 1);
});

test("cascade result draws one additional crit and recursive cascades become location breach", async () => {
  const actor = machineActor();
  const hitLocation = resolveMachineHitLocation({ actor, rollTotal: 4, armorBefore: 6 });
  const draw = await drawMachineCriticalRecords({
    actor,
    hitLocation,
    drawFn: () => ({
      label: "Catastrophic Cascade",
      rollTotal: 2,
      signal: { key: "catastrophicCascade", remedyKey: "none", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "cascade" },
    }),
  });

  assert.equal(draw.ok, true);
  assert.equal(draw.crits.length, 2);
  assert.equal(draw.crits[0].key, "reactorGyroCascade");
  assert.equal(draw.crits[1].key, "torsoCriticalBreach");
  assert.equal(draw.crits[1].generalKey, "criticalBreach");
});

test("machine critical remedy intent spends operator SA and resolves the crit", async () => {
  const machine = machineActor({
    paths: {
      "system.mwd.crits": [{ id: "crit-1", key: "sensorFault", label: "Sensor Fault", remedyKey: "systemReset", active: true }],
    },
  });
  const operator = { uuid: "Actor.operator", name: "Pilot" };
  const byUuid = new Map([[machine.uuid, machine], [operator.uuid, operator]]);
  globalThis.fromUuid = async uuid => byUuid.get(uuid) ?? null;

  let spent = null;
  const result = await resolveMachineCritRemedyIntent({
    intent: "machine_crit_remedy",
    machineActorUuid: machine.uuid,
    critId: "crit-1",
    remedyKey: "systemReset",
    operatorActorUuid: operator.uuid,
  }, {
    gmOverride: false,
    spendResource: async (actor, packet) => {
      spent = { actor, packet };
      return { ok: true };
    },
  });

  assert.equal(result.ok, true);
  assert.equal(spent.actor, operator);
  assert.equal(spent.packet.cost, 1);
  assert.equal(machine.system.mwd.crits[0].active, false);

  delete globalThis.fromUuid;
});

test("machine critical provider reads active crit records instead of token statuses", () => {
  const actor = machineActor({
    paths: {
      "system.mwd.crits": [{ id: "crit-attack", key: "targetingFault", label: "Targeting Fault", mods: ["attackCQPenalty"], active: true }],
    },
  });
  const provider = new MachineCriticalsProvider();

  const mods = provider.collect({ actor, resolved: { intent: "attack" } });

  assert.equal(mods.length, 1);
  assert.equal(mods[0].value, -1);
  assert.match(mods[0].label, /Targeting Fault/);
});
