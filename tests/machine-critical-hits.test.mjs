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
import {
  getMachineHeatStatusLabel,
  resolveMachineHeatStatus,
} from "../src/modules/mwd/heat-state.js";
import { normalizeMachineMonitorResistance } from "../src/modules/mwd/machine-monitors.js";
import { buildRemainingMonitorTrack } from "../src/modules/mwd/machine-summary.js";
import { commitMachineRemedyCost, resolveMachineCritRemedyIntent } from "../src/modules/mwd/machine-intents.js";
import { prepareMachineRemedyRoll } from "../src/modules/mwd/machine-intents.js";
import { resolveMachineRemedy } from "../src/modules/roll/intent/resolve-machine-remedy.js";
import { MachineCriticalsProvider } from "../src/modules/modifiers/providers/machine-criticals.js";
import {
  buildMachineActivationStartReport,
  getMachineAttackActionCost,
  getMachineAttackRestriction,
  getMachinePilotingDnModifier,
} from "../src/modules/mwd/machine-crit-effects.js";
import { isMachineRangeCappedToClose } from "../src/modules/mwd/machine-state-effects.js";

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
  const items = overrides.items ?? new Map();
  const actor = {
    type: overrides.type ?? "battlemech",
    name: overrides.name ?? "Test Machine",
    uuid: overrides.uuid ?? "Actor.machine",
    items,
    statuses: new Set(overrides.statuses ?? []),
    system: {
      monitors: {
        armor: { value: 6, max: 6 },
        structure: { value: 10, max: 10 },
      },
      attributes: {
        reliability: { value: 3 },
      },
      mwd: {
        shock: { value: 0 },
        reliabilitySpendable: { value: 3 },
        hardpoints: overrides.hardpoints ?? [],
        locations: {
          head: { enabled: true, stress: 0, condition: 0, tags: ["cockpit"], destroyed: false },
          torso: { enabled: true, stress: 0, condition: 0, tags: ["engine"], destroyed: false },
          arms: { enabled: true, stress: 0, condition: 0, tags: ["weaponGroup"], destroyed: false },
          legs: { enabled: true, stress: 0, condition: 0, tags: ["motiveSystem"], destroyed: false },
        },
        crits: [],
      },
      weaponGroups: overrides.weaponGroups ?? [],
    },
    async update(update) {
      for (const [path, value] of Object.entries(update)) setPath(this, path, value);
    },
    async toggleStatusEffect(statusId, { active } = {}) {
      if (active) this.statuses.add(statusId);
      else this.statuses.delete(statusId);
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
  assert.equal(headArmor.chaosTargetLocationKey, "torso");
  assert.equal(forced.isForcedCritical, true);
  assert.equal(forced.isAutomaticCritical, true);
  assert.equal(armArmor.impactLabel, "Arms");
  assert.equal(armArmor.rulesLocation, "arms");
});

test("vehicle hit locations separate descriptive impact from grouped rules location", () => {
  const actor = machineActor({ type: "vehicle" });
  const side = resolveMachineHitLocation({ actor, rollTotal: 7, armorBefore: 4 });
  const turret = resolveMachineHitLocation({ actor, rollTotal: 11, armorBefore: 4 });

  assert.equal(side.impactLabel, "Side");
  assert.equal(side.rulesLocation, "mobility");
  assert.equal(turret.impactLabel, "Turret");
  assert.equal(turret.rulesLocation, "turret");
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
  assert.equal(preview.critical.mode, "none");
  assert.equal(preview.critical.selected, false);
  assert.equal(preview.damagePreview.finalDamage, 2);
  assert.equal(preview.previewRevision, 0);
});

test("machine damage preview converts personal-scale damage to machine-scale chunks", () => {
  const actor = machineActor();
  const hitLocation = resolveMachineHitLocation({ actor, rollTotal: 10, armorBefore: 6 });
  const preview = previewMachineAttackDamage({
    actor,
    payload: { damage: 12, sourceScale: "personal", hitLocation },
  });

  assert.equal(preview.ok, true);
  assert.equal(preview.sourceScale, "personal");
  assert.equal(preview.targetScale, "machine");
  assert.equal(preview.damageIncoming, 1);
  assert.equal(preview.adjustedIncoming, 1);
  assert.equal(preview.scaleConversion.original, 12);
  assert.equal(preview.scaleConversion.converted, 1);
  assert.equal(preview.machine.armorBefore, 6);
  assert.equal(preview.machine.armorAfter, 5);
});

test("armor-only machine hits strip armor without shock, stress, or degradation", async () => {
  const actor = machineActor();
  const hitLocation = resolveMachineHitLocation({ actor, rollTotal: 10, armorBefore: 6 });

  const result = await applyMachineAttackDamage({
    actor,
    payload: {
      damage: 2,
      hitLocation,
      outcome: "hit",
      netHits: 1,
      preparedCriticalRecords: [],
    },
  });

  assert.equal(result.ok, true);
  assert.equal(actor.system.monitors.armor.value, 4);
  assert.equal(actor.system.monitors.structure.value, 10);
  assert.equal(actor.system.mwd.shock.value, 0);
  assert.equal(actor.system.mwd.locations.torso.stress, 0);
  assert.equal(actor.system.mwd.locations.torso.condition, 0);
  assert.equal(actor.system.mwd.locations.head.condition, 0);
  assert.equal(result.degradation.shockDelta, 0);
  assert.equal(result.degradation.conditionAdvancements.length, 0);
});

test("armor-only shock critical can create pressure and prefers the current hit location on ties", async () => {
  const actor = machineActor({
    paths: {
      "system.attributes.reliability.value": 1,
      "system.mwd.reliabilitySpendable.value": 1,
    },
  });
  const hitLocation = resolveMachineHitLocation({ actor, rollTotal: 10, armorBefore: 6 });

  const result = await applyMachineAttackDamage({
    actor,
    payload: {
      damage: 2,
      hitLocation,
      outcome: "hit",
      netHits: 1,
      preparedCriticalRecords: [{
        id: "crit-shock",
        key: "internalShock",
        label: "Internal Shock",
        generalKey: "structuralShock",
        remedyKey: "emergencyRepair",
        remedySkillKey: "technician",
        remedyBaseDn: 1,
        locationKey: "torso",
        locationLabel: "Torso",
        locationFamily: "torso",
        gates: [],
        mods: [],
        resourceEffects: {},
        pilotDamage: {},
        escalationKey: "shock",
        remedyEffect: { onSuccess: "clear", onFailure: "noChange" },
        active: true,
      }],
    },
  });

  assert.equal(result.ok, true);
  assert.equal(actor.system.monitors.armor.value, 4);
  assert.equal(actor.system.monitors.structure.value, 10);
  assert.equal(actor.system.mwd.locations.torso.stress, 0);
  assert.equal(actor.system.mwd.locations.torso.condition, 1);
  assert.equal(actor.system.mwd.locations.head.condition, 0);
  assert.equal(result.degradation.conditionAdvancements[0].location, "torso");
  assert.equal(result.degradation.summary.shockGain, 2);
});

test("critical preview state distinguishes automatic, optional, and selected Chaos criticals", () => {
  const actor = machineActor();
  const automaticLocation = resolveMachineHitLocation({ actor, rollTotal: 4, armorBefore: 6 });
  const optionalLocation = resolveMachineHitLocation({ actor, rollTotal: 16, armorBefore: 4 });

  const automatic = previewMachineAttackDamage({ actor, payload: { damage: 1, hitLocation: automaticLocation } });
  const optional = previewMachineAttackDamage({ actor, payload: { damage: 1, hitLocation: optionalLocation } });
  const selected = previewMachineAttackDamage({
    actor,
    payload: { damage: 1, hitLocation: optionalLocation },
    chaosCriticalSelected: true,
  });

  assert.equal(automatic.critical.mode, "automatic");
  assert.equal(automatic.critical.selected, true);
  assert.equal(optional.critical.mode, "chaosOptional");
  assert.equal(optional.critical.selected, false);
  assert.equal(selected.critical.mode, "chaosSelected");
  assert.equal(selected.critical.selected, true);
});

test("machine system monitor pips display remaining armor and structure", () => {
  const structure = buildRemainingMonitorTrack({
    id: "structure",
    label: "Structure",
    kind: "structure",
    monitor: { value: 3, max: 6 },
    editable: true,
  });
  const armor = buildRemainingMonitorTrack({
    id: "armor",
    label: "Armor",
    kind: "armor",
    monitor: { value: 3, max: 5 },
    editable: true,
  });

  assert.equal(structure.value, 3);
  assert.equal(structure.kind, "structure");
  assert.equal(structure.segments.filter(segment => segment.filled).length, 3);
  assert.deepEqual(structure.segments.map(segment => segment.value), [1, 2, 3, 4, 5, 6]);
  assert.equal(armor.value, 3);
  assert.equal(armor.segments.filter(segment => segment.filled).length, 3);
  assert.deepEqual(armor.segments.map(segment => segment.value), [1, 2, 3, 4, 5]);
});

test("vehicle structure pips display remaining structure", () => {
  const structure = buildRemainingMonitorTrack({
    id: "structure",
    label: "Structure",
    kind: "structure",
    monitor: { value: 3, max: 7 },
    editable: false,
  });

  assert.equal(structure.value, 3);
  assert.equal(structure.kind, "structure");
  assert.equal(structure.segments.filter(segment => segment.filled).length, 3);
  assert.deepEqual(structure.segments.map(segment => segment.value), [1, 2, 3, 4, 5, 6, 7]);
});

test("machine heat status resolves safe, hot, overheat, and danger bands", () => {
  const thresholds = { runningHot: 2, overheated: 3, shutdown: 4 };

  assert.equal(resolveMachineHeatStatus(0, thresholds, 4), "safe");
  assert.equal(resolveMachineHeatStatus(2, thresholds, 4), "hot");
  assert.equal(resolveMachineHeatStatus(3, thresholds, 4), "overheat");
  assert.equal(resolveMachineHeatStatus(4, thresholds, 4), "danger");
  assert.equal(getMachineHeatStatusLabel("hot"), "Hot");
  assert.equal(getMachineHeatStatusLabel("overheated"), "Overheat");
});

test("machine monitor resistance removes innate default while preserving explicit typed resistance", () => {
  assert.deepEqual(normalizeMachineMonitorResistance(3), { default: 0, byType: {} });
  assert.deepEqual(normalizeMachineMonitorResistance({
    default: 3,
    byType: { energy: 2, ballistic: 0, thermal: "1" },
  }), {
    default: 0,
    byType: { energy: 2, thermal: 1 },
  });
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
      "system.monitors.armor.value": 0,
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
  assert.equal(actor.system.monitors.structure.value, 7);
  assert.equal(actor.system.mwd.locations.arms.stress, 3);
  assert.equal(actor.system.mwd.locations.arms.condition, 1);
  assert.equal(actor.system.mwd.shock.value, 0);
  assert.equal(actor.system.mwd.crits.length, 1);
  assert.equal(actor.system.mwd.crits[0].key, "actuatorLockArm");
  assert.equal(actor.system.mwd.crits[0].generalKey, "hardLock");
  assert.equal(actor.system.mwd.crits[0].remedySkillKey, "technician");
  assert.equal(getActiveMachineCrits(actor).length, 1);
});

test("pure structure hit auto-degrades the struck location in addition to crit-driven degradation", async () => {
  const actor = machineActor({
    paths: {
      "system.monitors.armor.value": 0,
    },
  });
  const hitLocation = resolveMachineHitLocation({ actor, rollTotal: 16, armorBefore: 0 });
  const result = await applyMachineAttackDamage({
    actor,
    payload: {
      damage: 2,
      hitLocation,
      preparedCriticalRecords: [{
        id: "crit-test",
        key: "armsCriticalBreach",
        label: "Arms condition +1",
        generalKey: "criticalBreach",
        remedyKey: "none",
        remedySkillKey: "",
        remedyBaseDn: 0,
        locationKey: "arms",
        locationLabel: "Arms",
        locationFamily: "arms",
        gates: [],
        mods: [],
        resourceEffects: {},
        pilotDamage: {},
        escalationKey: "conditionAdvance",
        remedyEffect: { onSuccess: "clear", onFailure: "noChange" },
        active: true,
      }],
    },
  });

  assert.equal(result.ok, true);
  assert.equal(actor.system.mwd.locations.arms.stress, 0);
  assert.equal(actor.system.mwd.locations.arms.condition, 2);
  assert.equal(result.degradation.conditionAdvancements.length, 2);
  assert.deepEqual(result.degradation.conditionAdvancements.map(entry => entry.location), ["arms", "arms"]);
  assert.equal(result.degradation.shockDelta, 0);
});

test("degradation-derived statuses are surfaced when a location crosses a canonical threshold", async () => {
  const actor = machineActor({
    paths: {
      "system.monitors.armor.value": 0,
      "system.mwd.locations.torso.condition": 3,
    },
  });
  const hitLocation = resolveMachineHitLocation({ actor, rollTotal: 10, armorBefore: 0 });

  const result = await applyMachineAttackDamage({
    actor,
    payload: {
      damage: 1,
      hitLocation,
      preparedCriticalRecords: [],
    },
  });

  assert.equal(result.ok, true);
  assert.equal(actor.system.mwd.locations.torso.condition, 4);
  assert.equal(actor.statuses.has("gyroDamage"), true);
  assert.equal(actor.statuses.has("reactorBreach"), true);
});

test("catastrophic destroyed state applies the toggleable destroyed status", async () => {
  const actor = machineActor({
    paths: {
      "system.monitors.armor.value": 0,
      "system.mwd.locations.torso.condition": 4,
    },
  });
  const hitLocation = resolveMachineHitLocation({ actor, rollTotal: 10, armorBefore: 0 });

  const result = await applyMachineAttackDamage({
    actor,
    payload: {
      damage: 1,
      hitLocation,
      preparedCriticalRecords: [],
    },
  });

  assert.equal(result.ok, true);
  assert.equal(actor.system.mwd.status.state, "destroyed");
  assert.equal(actor.system.mwd.locations.torso.destroyed, true);
  assert.equal(actor.statuses.has("destroyed"), true);
});

test("optics coolant fog caps attack range without applying sensor degraded", async () => {
  const actor = machineActor({
    paths: {
      "system.monitors.armor.value": 0,
      "system.monitors.structure.value": 0,
    },
  });
  const hitLocation = resolveMachineHitLocation({ actor, rollTotal: 18, armorBefore: 0 });

  const result = await applyMachineAttackDamage({
    actor,
    payload: {
      damage: 1,
      hitLocation,
    },
    options: {
      drawCritical: () => ({
        label: "Feed / Flow Disruption",
        rollTotal: 5,
        signal: { key: "feedFlowDisruption", remedyKey: "feedReset", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "feed" },
      }),
    },
  });

  assert.equal(result.ok, true);
  assert.equal(actor.system.mwd.crits[0].key, "opticsCoolantFog");
  assert.equal(actor.system.mwd.crits[0].statusId, "");
  assert.equal(actor.statuses.has("sensorDegraded"), false);
  assert.equal(isMachineRangeCappedToClose(actor), true);
});

test("chaos critical routing uses the selected critical location for table and display", async () => {
  const actor = machineActor({
    paths: {
      "system.monitors.armor.value": 6,
      "system.monitors.structure.value": 10,
    },
  });
  const hitLocation = resolveMachineHitLocation({ actor, rollTotal: 18, armorBefore: 6 });

  const result = await applyMachineAttackDamage({
    actor,
    payload: {
      damage: 1,
      hitLocation,
      chaosCriticalSelected: true,
    },
    options: {
      drawCritical: () => ({
        label: "Feed / Flow Disruption",
        rollTotal: 5,
        signal: { key: "feedFlowDisruption", remedyKey: "feedReset", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "feed" },
      }),
    },
  });

  assert.equal(result.ok, true);
  assert.equal(actor.system.mwd.crits[0].key, "powerRoutingFault");
  assert.equal(actor.system.mwd.crits[0].locationKey, "torso");
  assert.equal(actor.system.mwd.crits[0].locationFamily, "torso");
  assert.equal(actor.system.mwd.crits[0].locationLabel, "Torso");
});

test("vehicle reduced to zero structure disables all enabled locations immediately", async () => {
  const actor = machineActor({
    type: "vehicle",
    paths: {
      "system.monitors.armor.value": 0,
      "system.monitors.structure.value": 2,
      "system.monitors.structure.max": 10,
    },
  });
  const hitLocation = resolveMachineHitLocation({ actor, rollTotal: 10, armorBefore: 0 });

  const result = await applyMachineAttackDamage({
    actor,
    payload: {
      damage: 2,
      hitLocation,
      preparedCriticalRecords: [],
    },
  });

  assert.equal(result.ok, true);
  assert.equal(result.machine.structureAfter, 0);
  assert.equal(actor.system.mwd.locations.front.condition, 4);
  assert.equal(actor.system.mwd.locations.side.condition, 4);
  assert.equal(actor.system.mwd.locations.rear.condition, 4);
  assert.equal(actor.system.mwd.locations.core.condition, 4);
  assert.equal(actor.system.mwd.locations.turret.condition, 4);
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

test("prepared critical records carry preview revision and stale records are refused", async () => {
  const actor = machineActor();
  const hitLocation = resolveMachineHitLocation({ actor, rollTotal: 4, armorBefore: 6 });
  const draw = await drawMachineCriticalRecords({
    actor,
    hitLocation,
    previewRevision: 2,
    drawFn: () => ({
      label: "Hard Lock",
      rollTotal: 3,
      signal: { key: "hardLock", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "lockout" },
    }),
  });

  assert.equal(draw.ok, true);
  assert.equal(draw.crits[0].previewRevision, 2);
  assert.equal(draw.crits[0].rulesLocation, "torso");
  assert.equal(draw.crits[0].resultKey, "gyroLock");

  const stale = await applyMachineAttackDamage({
    actor,
    payload: {
      damage: 1,
      hitLocation,
      previewRevision: 3,
      preparedCriticalRecords: draw.crits,
    },
  });

  assert.equal(stale.ok, false);
  assert.match(stale.reason, /stale/i);
});

test("machine damage dry-run previews reliability options without mutating reliability", async () => {
  const actor = machineActor({
    paths: {
      "system.monitors.armor.value": 0,
      "system.mwd.shock.value": 3,
      "system.mwd.reliabilitySpendable.value": 2,
    },
  });
  const hitLocation = resolveMachineHitLocation({ actor, rollTotal: 10, armorBefore: 0 });

  const result = await applyMachineAttackDamage({
    actor,
    payload: {
      damage: 1,
      hitLocation,
      outcome: "hit",
      netHits: 1,
      reliabilitySpendSelections: [0],
    },
    options: { dryRun: true },
  });

  assert.equal(result.ok, true);
  assert.equal(result.reliabilityOptions.canSpend, true);
  assert.equal(result.reliabilityOptions.selected, true);
  assert.equal(actor.system.mwd.reliabilitySpendable.value, 2);
  assert.equal(actor.system.mwd.locations.torso.condition, 0);
});

test("machine damage apply is idempotent when payload is already applied", async () => {
  const actor = machineActor({
    paths: {
      "system.monitors.armor.value": 0,
    },
  });
  const hitLocation = resolveMachineHitLocation({ actor, rollTotal: 16, armorBefore: 0 });
  const first = await applyMachineAttackDamage({
    actor,
    payload: {
      damage: 2,
      hitLocation,
      preparedCriticalRecords: [],
    },
  });
  const second = await applyMachineAttackDamage({
    actor,
    payload: {
      damage: 2,
      hitLocation,
      applied: true,
      appliedResult: first,
    },
  });

  assert.equal(first.ok, true);
  assert.equal(second.skipped, true);
  assert.equal(actor.system.monitors.structure.value, 8);
  assert.equal(actor.system.mwd.locations.arms.condition, 1);
  assert.equal(actor.system.mwd.crits.length, 0);
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

test("machine critical remedy cost still spends a resolved operator when launched by a GM", async () => {
  const operator = { uuid: "Actor.operator", name: "Pilot" };
  let spent = null;

  const result = await commitMachineRemedyCost({
    ok: true,
    operatorActor: operator,
    gmOverride: true,
    remedy: {
      resource: "sa",
      cost: 1,
      actionId: "machineCritSystemReset",
      actionLabel: "System Reset",
      category: "simple",
    },
  }, {
    spendResource: async (actor, packet) => {
      spent = { actor, packet };
      return { ok: true };
    },
  });

  assert.equal(result.ok, true);
  assert.equal(spent.actor, operator);
  assert.equal(spent.packet.cost, 1);
  assert.equal(spent.packet.actionCostLabel, "1 SA");
});

test("machine critical remedy cost only skips GM override when no operator is resolved", async () => {
  let spent = false;

  const result = await commitMachineRemedyCost({
    ok: true,
    operatorActor: null,
    gmOverride: true,
    remedy: {
      resource: "sa",
      cost: 1,
      actionId: "machineCritSystemReset",
      actionLabel: "System Reset",
      category: "simple",
    },
  }, {
    spendResource: async () => {
      spent = true;
      return { ok: true };
    },
  });

  assert.deepEqual(result, { ok: true, skipped: true });
  assert.equal(spent, false);
});

test("machine remedy roll preparation resolves operator, pool source, and DN from condition", async () => {
  const machine = machineActor({
    paths: {
      "system.mwd.locations.head.condition": 2,
      "system.mwd.crits": [{
        id: "crit-2",
        key: "sensorFault",
        label: "Sensor Fault",
        locationKey: "head",
        locationLabel: "Head",
        remedyKey: "systemReset",
        remedySkillKey: "computers",
        remedyBaseDn: 1,
        remedyEffect: { onSuccess: "clear", onFailure: "noChange" },
        active: true,
      }],
    },
  });
  const operator = {
    uuid: "Actor.operator",
    name: "Pilot Tech",
    system: {
      skills: {
        computers: { rating: 3, bonus: 1 },
      },
    },
  };
  const byUuid = new Map([[machine.uuid, machine], [operator.uuid, operator]]);
  const previousFoundry = globalThis.foundry;
  globalThis.fromUuid = async uuid => byUuid.get(uuid) ?? null;
  globalThis.foundry = {
    ...(globalThis.foundry ?? {}),
    utils: {
      ...(globalThis.foundry?.utils ?? {}),
      deepClone: value => structuredClone(value),
    },
  };

  try {
    const prepared = await prepareMachineRemedyRoll({
      machineActorUuid: machine.uuid,
      critId: "crit-2",
      operatorActorUuid: operator.uuid,
    });

    assert.equal(prepared.ok, true);
    assert.equal(prepared.actor, operator);
    assert.equal(prepared.payload.intent, "machineRemedy");
    assert.deepEqual(prepared.payload.edge.allowed, ["pre", "post"]);
    assert.equal(prepared.context.totalDn, 3);
    assert.equal(prepared.context.skillKey, "computers");

    const resolved = await resolveMachineRemedy({
      actor: operator,
      payload: prepared.payload,
    });

    assert.equal(resolved.rollActor, operator);
    assert.deepEqual(resolved.breakdown.slice(0, 3), [
      { id: "attribute", label: "Reliability (Test Machine)", value: 3 },
      { id: "skill", label: "Computers (Pilot Tech)", value: 3 },
      { id: "bonus", label: "Skill Bonus", value: 1 },
    ]);
  } finally {
    delete globalThis.fromUuid;
    if (previousFoundry === undefined) delete globalThis.foundry;
    else globalThis.foundry = previousFoundry;
  }
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

test("location crit records normalize updated status and remedy mappings", async () => {
  const actor = machineActor();
  const headLocation = resolveMachineHitLocation({ actor, rollTotal: 18, armorBefore: 0 });
  const headDraw = await drawMachineCriticalRecords({
    actor,
    hitLocation: headLocation,
    drawFn: () => ({
      label: "Hard Lock",
      rollTotal: 3,
      signal: { key: "hardLock", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "lockout" },
    }),
  });

  assert.equal(headDraw.ok, true);
  assert.equal(headDraw.crits[0].key, "targetingProcessorLock");
  assert.equal(headDraw.crits[0].remedyKey, "reboot");
  assert.equal(headDraw.crits[0].automationMode, "engine");
  assert.match(headDraw.crits[0].effectText, /\+1 SA/i);

  const torsoLocation = resolveMachineHitLocation({ actor, rollTotal: 10, armorBefore: 0 });
  const torsoDraw = await drawMachineCriticalRecords({
    actor,
    hitLocation: torsoLocation,
    drawFn: () => ({
      label: "Overload",
      rollTotal: 9,
      signal: { key: "overload", remedyKey: "coolantDump", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "overload" },
    }),
  });

  assert.equal(torsoDraw.ok, true);
  assert.equal(torsoDraw.crits[0].key, "heatSinkSaturation");
  assert.equal(torsoDraw.crits[0].statusId, "overheating");
  assert.notEqual(torsoDraw.crits[0].statusId, "reactorInstability");
});

test("weapon failure scopes to a matching weapon group and blocks only that group", () => {
  const armLaser = { id: "w-arm", system: { damageType: "energy", size: "small" } };
  const torsoLaser = { id: "w-torso", system: { damageType: "energy", size: "small" } };
  const actor = machineActor({
    items: new Map([
      [armLaser.id, armLaser],
      [torsoLaser.id, torsoLaser],
    ]),
    hardpoints: [
      { id: "hp-arm", type: "energy", size: "small", location: "arms", itemId: "w-arm" },
      { id: "hp-torso", type: "energy", size: "small", location: "torso", itemId: "w-torso" },
    ],
    weaponGroups: [
      { id: "alpha", name: "Alpha", weaponIds: ["w-arm"], isPrimary: false },
      { id: "beta", name: "Beta", weaponIds: ["w-torso"], isPrimary: true },
    ],
    paths: {
      "system.mwd.crits": [{
        id: "crit-alpha",
        key: "actuatorLockArm",
        label: "Actuator Lock",
        locationKey: "arms",
        locationFamily: "arms",
        locationLabel: "Arms",
        statusId: "weaponFailure",
        active: true,
      }],
    },
  });

  const crit = getActiveMachineCrits(actor)[0];
  assert.equal(crit.weaponGroupId, "alpha");
  assert.equal(crit.weaponGroupName, "Alpha");

  const blocked = getMachineAttackRestriction(actor, { weaponGroupId: "alpha", weaponId: "w-arm" });
  const allowed = getMachineAttackRestriction(actor, { weaponGroupId: "beta", weaponId: "w-torso" });
  assert.equal(blocked.blocked, true);
  assert.equal(allowed.blocked, false);
});

test("machine crit effect helper reports attack cost, piloting DN, and activation start effects", () => {
  const actor = machineActor({
    paths: {
      "system.mwd.crits": [
        { id: "crit-lock", key: "targetingProcessorLock", label: "Targeting Processor Lock", active: true },
        { id: "crit-unstable", key: "internalShock", label: "Internal Shock", statusId: "unstable", active: true },
        { id: "crit-staggered", key: "neuralFeedback", label: "Neural Feedback", statusId: "staggeredMechanical", active: true },
        { id: "crit-overheating", key: "heatSinkSaturation", label: "Heat Sink Saturation", statusId: "overheating", active: true },
      ],
    },
  });

  const attackCost = getMachineAttackActionCost(actor);
  const pilotingDn = getMachinePilotingDnModifier(actor);
  const activation = buildMachineActivationStartReport(actor);

  assert.equal(attackCost.totalCost, 3);
  assert.equal(pilotingDn, 0);
  assert.equal(activation.saCost, 1);
  assert.equal(activation.heatDelta, 2);
});
