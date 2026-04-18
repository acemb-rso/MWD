// src/modules/mwd/critical-hits.js
// Purpose: Machine critical-hit engine and active-crit data normalization.
// How it fits: Keeps vehicle/BattleMech critical effects in actor data while
// token statuses remain visual indicators only.

import { SYSTEM_NAME, TEMPLATE } from "../constants.js";
import { applyManagedStatusUpdate } from "../dialog/token-status-dialog.js";
import {
  getMachineLocationLabel,
  resolveMachineHitLocation,
} from "./machine-hit-locations.js";
import {
  getMachineCritRemedy,
  getMachineRemedyBaseDn,
  getMachineRemedyEffect,
  getMachineRemedySkillKey,
  isValidMachineCritRemedy,
} from "./machine-crit-remedies.js";
import {
  buildMachineDegradationUpdates,
  resolveMachineDegradation,
} from "./machine-degradation.js";
import {
  buildMachineCriticalConsequenceData,
  normalizeMachineCriticalRecord,
} from "./machine-crit-consequences.js";

export const MACHINE_CRITICAL_STATUS_ID = "machineCritical";
export const SETTING_MACHINE_CRIT_TABLE_GENERAL = "machineCriticalTableGeneralUuid";
export const SETTING_MACHINE_CRIT_TABLE_BATTLEMECH = "machineCriticalTableBattlemechUuid";
export const SETTING_MACHINE_CRIT_TABLE_VEHICLE = "machineCriticalTableVehicleUuid";
export const SETTING_MACHINE_CRIT_TABLE_MECH_HEAD = "machineCriticalTableBattlemechHeadUuid";
export const SETTING_MACHINE_CRIT_TABLE_MECH_TORSO = "machineCriticalTableBattlemechTorsoUuid";
export const SETTING_MACHINE_CRIT_TABLE_MECH_ARMS = "machineCriticalTableBattlemechArmsUuid";
export const SETTING_MACHINE_CRIT_TABLE_MECH_LEGS = "machineCriticalTableBattlemechLegsUuid";
export const SETTING_MACHINE_CRIT_TABLE_VEHICLE_BODY = "machineCriticalTableVehicleBodyUuid";
export const SETTING_MACHINE_CRIT_TABLE_VEHICLE_TURRET = "machineCriticalTableVehicleTurretUuid";
export const SETTING_MACHINE_CRIT_TABLE_VEHICLE_MOBILITY = "machineCriticalTableVehicleMobilityUuid";

export const DEFAULT_MACHINE_CRIT_TABLE_UUIDS = Object.freeze({
  general: "Compendium.mwd.critical-hit-tables.RollTable.MWDGeneralCrit01",
  battlemech: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechTorsoCrit01",
  vehicle: "Compendium.mwd.critical-hit-tables.RollTable.MWDVehicleBodyCrit1",
  mechHead: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechHeadCrit01",
  mechTorso: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechTorsoCrit01",
  mechArms: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechArmsCrit01",
  mechLegs: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechLegsCrit01",
  vehicleBody: "Compendium.mwd.critical-hit-tables.RollTable.MWDVehicleBodyCrit1",
  vehicleTurret: "Compendium.mwd.critical-hit-tables.RollTable.MWDVehicleTurretCrit",
  vehicleMobility: "Compendium.mwd.critical-hit-tables.RollTable.MWDVehicleMobility",
});

const VALID_PILOT_TRACKS = new Set(["physical", "fatigue", ""]);

export const DEFAULT_GENERAL_CRITICAL_SIGNALS = Object.freeze({
  2: Object.freeze({ key: "catastrophicCascade", remedyKey: "none", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "cascade" }),
  3: Object.freeze({ key: "hardLock", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "lockout" }),
  4: Object.freeze({ key: "powerSurge", remedyKey: "coolantDump", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "surge" }),
  5: Object.freeze({ key: "feedFlowDisruption", remedyKey: "feedReset", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "feed" }),
  6: Object.freeze({ key: "controlFault", remedyKey: "systemReset", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "control" }),
  7: Object.freeze({ key: "systemDesync", remedyKey: "systemReset", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "desync" }),
  8: Object.freeze({ key: "structuralShock", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "shock" }),
  9: Object.freeze({ key: "overload", remedyKey: "coolantDump", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "overload" }),
  10: Object.freeze({ key: "degradationSpike", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "degradation" }),
  11: Object.freeze({ key: "partialOutage", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "outage" }),
  12: Object.freeze({ key: "criticalBreach", remedyKey: "none", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "conditionAdvance" }),
});

export const LOCATION_CRITICAL_RESULTS = Object.freeze({
  battlemech: Object.freeze({
    head: Object.freeze({
      2: critRow("cockpitShock", "Cockpit Shock", "none", ["sensor"], ["sensorBlind"], {}, { track: "physical", amount: 3 }, "cascade", "sensorBlind"),
      3: critRow("targetingProcessorLock", "Targeting Processor Lock", "reboot", ["attack"], [], { extraAttackCost: 1 }, { track: "physical", amount: 2 }, "lockout", "", "All fire modes require +1 SA to attack.", "engine"),
      4: critRow("neuralFeedback", "Neural Feedback", "systemReset", [], [], {}, { track: "fatigue", amount: 1 }, "surge", "staggeredMechanical"),
      5: critRow("opticsCoolantFog", "Optics Coolant Fog / View Obstruction", "systemReset", ["attack"], ["rangeLimitClose"], {}, {}, "feed", "sensorDegraded"),
      6: critRow("commandInputDelay", "Command Input Delay", "reboot", [], [], {}, { track: "fatigue", amount: 2 }, "control", "stalled"),
      7: critRow("fireControlDesyncHead", "Fire-Control Desync", "systemReset", ["attack"], ["noCqBonus"], {}, {}, "desync", "sensorDegraded"),
      8: critRow("cockpitImpact", "Cockpit Impact", "pilotRecovery", ["piloting"], ["stabilityCheck"], {}, { track: "physical", amount: 2 }, "shock", "unstable"),
      9: critRow("sensorOverload", "Sensor Overload", "systemReset", ["sensor"], [], {}, { track: "fatigue", amount: 2 }, "overload", "", "Contacts are capped at Track until repaired.", "callout"),
      10: critRow("opticsFracture", "Optics Fracture", "emergencyRepair", ["attack"], [], {}, {}, "degradation", "", "All targets are treated as Obscured until repaired.", "callout"),
      11: critRow("commsSensorSuiteOut", "Communications / Sensor Suite Out", "systemReset", ["sensor"], [], {}, {}, "outage", "", "No sensor or ECM actions may be taken until repaired.", "callout"),
      12: critRow("headCriticalBreach", "Head condition +1", "none", [], [], {}, { track: "physical", amount: 2 }, "conditionAdvance", ""),
    }),
    torso: Object.freeze({
      2: critRow("reactorGyroCascade", "Reactor / Gyro Cascade", "none", ["piloting"], ["stabilityCheck"], {}, { track: "fatigue", amount: 3 }, "cascade", "unstable"),
      3: critRow("gyroLock", "Gyro Lock", "emergencyRepair", ["move", "jump"], ["pilotingPenalty"], {}, {}, "lockout", "stalled"),
      4: critRow("reactorUnstable", "Reactor Unstable", "coolantDump", ["energyWeapon"], [], { heatPerEnergyAttack: 1 }, { track: "fatigue", amount: 2 }, "heat", "reactorInstability"),
      5: critRow("powerRoutingFault", "Power Routing Fault", "emergencyRepair", ["weaponGroup"], [], {}, {}, "feed", "weaponFailure"),
      6: critRow("coreResponseDelay", "Core Response Delay", "reboot", [], [], {}, { track: "fatigue", amount: 2 }, "control", "staggeredMechanical"),
      7: critRow("targetingMovementSyncFault", "Targeting / Movement Sync Fault", "systemReset", ["attack", "move"], ["noMovementFireAdvantage"], {}, {}, "desync", ""),
      8: critRow("internalShock", "Internal Shock", "emergencyRepair", ["piloting"], ["stabilityCheck"], {}, { track: "physical", amount: 2, condition: "failedFallImpact" }, "shock", "unstable"),
      9: critRow("heatSinkSaturation", "Heat Sink Saturation", "coolantDump", ["attack"], [], {}, {}, "heat", "overheating"),
      10: critRow("gyroDrift", "Gyro Drift", "emergencyRepair", ["move"], ["highMobilityBlocked"], {}, {}, "degradation", "limping"),
      11: critRow("powerBusOutage", "Power Bus Outage", "emergencyRepair", ["subsystem"], [], {}, {}, "outage", ""),
      12: critRow("torsoCriticalBreach", "Torso condition +1", "none", [], [], {}, {}, "conditionAdvance", ""),
    }),
    arms: Object.freeze({
      2: critRow("weaponMountCascade", "Weapon Mount Cascade", "emergencyRepair", ["attack"], [], {}, {}, "cascade", "weaponFailure"),
      3: critRow("actuatorLockArm", "Actuator Lock", "emergencyRepair", ["attack"], [], {}, {}, "lockout", "weaponFailure"),
      4: critRow("weaponFeedback", "Weapon Feedback", "emergencyRepair", ["attack"], [], {}, {}, "surge", "", "Arm-specific recoil and feedback effects remain reminder-only.", "callout"),
      5: critRow("ammoFeedFaultArm", "Ammo / Feed Fault", "feedReset", ["attack"], [], {}, {}, "feed", "jammedBallistic"),
      6: critRow("fineActuationError", "Fine Actuation Error", "emergencyRepair", ["attack"], [], {}, {}, "control", "", "Fine-control arm effects remain reminder-only.", "callout"),
      7: critRow("targetingMisalignmentArm", "Targeting Misalignment", "systemReset", ["attack"], [], {}, {}, "desync", "", "Arm-mounted targeting issues remain reminder-only.", "callout"),
      8: critRow("recoilShock", "Recoil Shock", "emergencyRepair", ["attack"], [], {}, {}, "shock", "", "Recoil shock remains reminder-only for the affected arm.", "callout"),
      9: critRow("servoStrainArm", "Servo Strain", "emergencyRepair", ["attack"], [], {}, {}, "overload", "", "Servo strain remains reminder-only for the affected arm.", "callout"),
      10: critRow("stabilizerDamageArm", "Stabilizer Damage", "emergencyRepair", ["attack"], [], {}, {}, "degradation", "", "Stabilizer damage remains reminder-only for the affected arm.", "callout"),
      11: critRow("localPowerLossArm", "Local Power Loss", "emergencyRepair", ["subsystem"], [], {}, {}, "outage", "", "Local arm power-loss effects remain reminder-only.", "callout"),
      12: critRow("armsCriticalBreach", "Arms condition +1", "none", [], [], {}, {}, "conditionAdvance", ""),
    }),
    legs: Object.freeze({
      2: critRow("mobilityCascadeLegs", "Mobility Cascade", "emergencyRepair", ["move"], [], {}, { track: "physical", amount: 2, condition: "resultingFallImpact" }, "cascade", "proneMechFall"),
      3: critRow("legActuatorLock", "Leg Actuator Lock", "emergencyRepair", ["move", "jump"], [], {}, {}, "lockout", "limping"),
      4: critRow("myomerSurge", "Myomer Surge", "coolantDump", ["move"], [], { heatOrStrainOnMove: 1 }, {}, "surge", ""),
      5: critRow("jumpJetMobilityFeedFault", "Jump Jet / Mobility Feed Fault", "emergencyRepair", ["move", "jump"], [], {}, {}, "feed", "jumpJetFailure"),
      6: critRow("gaitFault", "Gait Fault", "emergencyRepair", ["move"], [], {}, {}, "control", "unstable"),
      7: critRow("balanceTimingFault", "Balance Timing Fault", "systemReset", ["move"], [], {}, {}, "desync", "", "Movement actions require manual piloting-fall follow-up.", "callout"),
      8: critRow("forcedStabilityTest", "Forced Stability Test", "emergencyRepair", ["move", "piloting"], ["stabilityCheck"], {}, { track: "physical", amount: 2, condition: "resultingFallImpact" }, "shock", "unstable"),
      9: critRow("mobilityOverstress", "Mobility Overstress", "emergencyRepair", ["move"], [], {}, {}, "overload", "", "Call out the mobility overstress rider after movement actions.", "callout"),
      10: critRow("legStabilizerDamage", "Leg Stabilizer Damage", "emergencyRepair", ["move"], [], {}, {}, "degradation", "", "Advanced maneuver penalties remain reminder-only for now.", "callout"),
      11: critRow("partialMobilityOutageLegs", "Partial Mobility Outage", "emergencyRepair", ["move"], [], {}, {}, "outage", "limping"),
      12: critRow("legsCriticalBreach", "Legs condition +1", "none", [], [], {}, {}, "conditionAdvance", ""),
    }),
  }),
  vehicle: Object.freeze({
    body: Object.freeze({
      2: critRow("internalSystemsCascade", "Internal Systems Cascade", "none", [], [], {}, { track: "physical", amount: 2, condition: "openToppedOrCatastrophic" }, "cascade", ""),
      3: critRow("coreSystemsLock", "Core Systems Lock", "systemReset", ["subsystem"], [], {}, {}, "lockout", ""),
      4: critRow("enginePowerSurge", "Engine / Power Surge", "coolantDump", [], [], {}, { track: "fatigue", amount: 2, condition: "crewApplicable" }, "surge", ""),
      5: critRow("fuelFeedDisruption", "Fuel / Feed Disruption", "emergencyRepair", ["subsystem"], [], {}, {}, "feed", ""),
      6: critRow("controlFaultBody", "Control Fault", "systemReset", ["move"], [], {}, {}, "control", "stalled"),
      7: critRow("systemsDesyncBody", "Systems Desync", "systemReset", ["attack", "move"], [], {}, {}, "desync", "stalled"),
      8: critRow("structuralShockBody", "Structural Shock", "emergencyRepair", ["piloting"], ["controlTest"], {}, { track: "physical", amount: 2, condition: "crashImpact" }, "shock", "unstable"),
      9: critRow("overloadBody", "Overload", "coolantDump", [], [], {}, {}, "overload", ""),
      10: critRow("hullStressSpike", "Hull Stress Spike", "emergencyRepair", [], [], {}, {}, "degradation", ""),
      11: critRow("partialOutageBody", "Partial Outage", "emergencyRepair", ["subsystem"], [], {}, {}, "outage", ""),
      12: critRow("bodyCriticalBreach", "Body condition +1", "none", [], [], {}, {}, "conditionAdvance", ""),
    }),
    turret: Object.freeze({
      2: critRow("turretWeaponCascade", "Turret Weapon Cascade", "emergencyRepair", ["attack"], [], {}, {}, "cascade", "weaponFailure"),
      3: critRow("traverseLock", "Traverse Lock", "emergencyRepair", ["attack"], [], {}, {}, "lockout", "weaponFailure"),
      4: critRow("fireControlSurgeTurret", "Fire-Control Surge", "systemReset", ["attack"], [], { heatOrStrainOnTurretAttack: 1 }, {}, "surge", "weaponFailure"),
      5: critRow("ammoFeedFaultTurret", "Ammo / Feed Fault", "feedReset", ["attack"], [], {}, {}, "feed", "jammedBallistic"),
      6: critRow("controlFaultTurret", "Control Fault", "systemReset", ["attack"], [], { extraAttackCost: 1 }, {}, "control", "weaponFailure"),
      7: critRow("trackingDesyncTurret", "Tracking Desync", "systemReset", ["attack"], ["noCqBonus"], {}, {}, "desync", "sensorDegraded"),
      8: critRow("mountShockTurret", "Mount Shock", "emergencyRepair", ["attack"], ["nextTurretAttackBlocked"], {}, {}, "shock", "weaponFailure"),
      9: critRow("overloadTurret", "Overload", "emergencyRepair", ["attack"], [], { turretAttackStress: 1 }, {}, "overload", "weaponFailure"),
      10: critRow("stabilizerDamageTurret", "Stabilizer Damage", "emergencyRepair", ["attack"], ["limitedArcFire"], {}, {}, "degradation", "weaponFailure"),
      11: critRow("turretSubsystemOutage", "Turret Subsystem Outage", "emergencyRepair", ["subsystem"], [], {}, {}, "outage", ""),
      12: critRow("turretCriticalBreach", "Turret condition +1", "none", [], [], {}, {}, "conditionAdvance", ""),
    }),
    mobility: Object.freeze({
      2: critRow("mobilityCascadeVehicle", "Mobility Cascade", "emergencyRepair", ["move"], ["skidStallCrashRisk"], {}, {}, "cascade", "stalled"),
      3: critRow("driveLock", "Drive / Track / Wheel Lock", "emergencyRepair", ["move"], [], {}, {}, "lockout", "stalled"),
      4: critRow("powertrainSurge", "Powertrain Surge", "coolantDump", ["move"], [], { heatOrStrainOnMove: 1 }, {}, "surge", ""),
      5: critRow("transmissionRotorFeedFault", "Transmission / Rotor Feed Fault", "emergencyRepair", ["move"], [], {}, {}, "feed", "stalled"),
      6: critRow("steeringFault", "Steering Fault", "emergencyRepair", ["move"], [], {}, {}, "control", "stalled"),
      7: critRow("handlingDesync", "Handling Desync", "systemReset", ["move"], ["noMobilityCqBonus"], {}, {}, "desync", "unstable"),
      8: critRow("chassisShock", "Chassis Shock", "emergencyRepair", ["move", "piloting"], ["controlTest"], {}, {}, "shock", "unstable"),
      9: critRow("overloadMobility", "Overload", "emergencyRepair", ["move"], [], { repeatedMoveCost: 1 }, {}, "overload", "limping"),
      10: critRow("suspensionLiftDamage", "Suspension / Lift Damage", "emergencyRepair", ["move"], ["majorHandlingImpairment"], {}, {}, "degradation", "stalled"),
      11: critRow("partialMobilityOutageVehicle", "Partial Mobility Outage", "emergencyRepair", ["move"], [], {}, {}, "outage", "stalled"),
      12: critRow("mobilityCriticalBreach", "Mobility condition +1", "none", [], [], {}, {}, "conditionAdvance", ""),
    }),
  }),
});

function hasFoundry() {
  return typeof foundry !== "undefined" && foundry?.utils;
}

function clone(value) {
  if (hasFoundry() && typeof foundry.utils.deepClone === "function") return foundry.utils.deepClone(value);
  return JSON.parse(JSON.stringify(value ?? null));
}

function critRow(
  key,
  label,
  remedyKey,
  gates = [],
  mods = [],
  resourceEffects = {},
  pilotDamage = {},
  escalationKey = "",
  statusId = "",
  effectText = "",
  automationMode = "",
  statusLabel = ""
) {
  return Object.freeze({
    label,
    signal: Object.freeze({
      key,
      remedyKey,
      gates,
      mods,
      resourceEffects,
      pilotDamage,
      escalationKey,
      statusId,
      effectText,
      automationMode,
      statusLabel,
    }),
  });
}

function randomId() {
  return hasFoundry() && typeof foundry.utils.randomID === "function"
    ? foundry.utils.randomID()
    : Math.random().toString(36).slice(2, 18).padEnd(16, "0").slice(0, 16);
}

function nowIso() {
  try {
    return new Date().toISOString();
  } catch (_error) {
    return "";
  }
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value.split(",").map(entry => entry.trim()).filter(Boolean);
  }
  return [];
}

function toPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function getCritFlagData(value = {}) {
  return value?.flags?.mwd?.crit
    ?? value?.document?.flags?.mwd?.crit
    ?? value?.data?.flags?.mwd?.crit
    ?? value;
}

function strictError(message, errors, strict) {
  if (!strict) return null;
  const error = new Error(message);
  error.validationErrors = errors.length ? errors : [message];
  throw error;
}

export function getDefaultCriticalSignalForRoll(rollTotal = 7) {
  const total = Math.min(12, Math.max(2, Math.trunc(Number(rollTotal ?? 7)) || 7));
  return clone(DEFAULT_GENERAL_CRITICAL_SIGNALS[total] ?? DEFAULT_GENERAL_CRITICAL_SIGNALS[7]);
}

export function normalizeCriticalSignal(resultOrData = {}, { strict = false } = {}) {
  const data = getCritFlagData(resultOrData);
  const errors = [];
  const key = String(data?.key ?? "").trim();
  const remedyKey = String(data?.remedyKey ?? "emergencyRepair").trim() || "emergencyRepair";
  const gates = asArray(data?.gates).map(entry => String(entry ?? "").trim()).filter(Boolean);
  const mods = asArray(data?.mods).map(entry => String(entry ?? "").trim()).filter(Boolean);
  const resourceEffects = toPlainObject(data?.resourceEffects);
  const pilotDamage = toPlainObject(data?.pilotDamage);
  const escalationKey = String(data?.escalationKey ?? "").trim();
  const statusId = String(data?.statusId ?? "").trim();
  const statusLabel = String(data?.statusLabel ?? "").trim();
  const effectText = String(data?.effectText ?? "").trim();
  const automationMode = String(data?.automationMode ?? "").trim();

  if (!key) errors.push("Critical signal key cannot be blank.");
  if (!isValidMachineCritRemedy(remedyKey)) errors.push(`Unknown machine critical remedy "${remedyKey}".`);
  for (const [name, value] of Object.entries(resourceEffects)) {
    if (!Number.isFinite(Number(value))) errors.push(`Resource effect "${name}" must be numeric.`);
  }
  const pilotTrack = String(pilotDamage?.track ?? "").trim();
  const pilotAmount = Number(pilotDamage?.amount ?? 0);
  const pilotCondition = String(pilotDamage?.condition ?? "").trim();
  if (!VALID_PILOT_TRACKS.has(pilotTrack)) errors.push(`Pilot damage track "${pilotTrack}" is invalid.`);
  if (!Number.isFinite(pilotAmount) || pilotAmount < 0) errors.push("Pilot damage amount must be non-negative.");

  if (errors.length) {
    strictError(errors[0], errors, strict);
    return null;
  }

  return {
    key,
    remedyKey,
    gates,
    mods,
    resourceEffects: Object.fromEntries(
      Object.entries(resourceEffects).map(([name, value]) => [String(name), Number(value)])
    ),
    pilotDamage: pilotTrack || pilotAmount || pilotCondition
      ? {
        track: pilotTrack || "fatigue",
        amount: Math.trunc(pilotAmount),
        ...(pilotCondition ? { condition: pilotCondition } : {}),
      }
      : {},
    escalationKey,
    statusId,
    statusLabel,
    effectText,
    automationMode,
  };
}

export function getActiveMachineCrits(actor, filters = {}) {
  const crits = Array.isArray(actor?.system?.mwd?.crits) ? actor.system.mwd.crits : [];
  return crits
    .map(crit => normalizeMachineCriticalRecord(crit, actor))
    .filter(crit => crit && crit.active !== false)
    .filter(crit => !filters.key || crit.key === filters.key)
    .filter(crit => !filters.locationKey || crit.locationKey === filters.locationKey)
    .filter(crit => !filters.locationFamily || crit.locationFamily === filters.locationFamily)
    .filter(crit => !filters.gate || (Array.isArray(crit.gates) && crit.gates.includes(filters.gate)))
    .filter(crit => !filters.mod || (Array.isArray(crit.mods) && crit.mods.includes(filters.mod)));
}

function getMonitorDamageState(actor, monitorKey) {
  const monitor = actor?.system?.monitors?.[monitorKey] ?? {};
  const max = Math.max(0, Number(monitor.max ?? 0) || 0);
  const value = Math.min(max, Math.max(0, Number(monitor.value ?? 0) || 0));
  return {
    max,
    value,
    remaining: Math.max(0, max - value),
  };
}

function isMachineActor(actor) {
  return actor?.type === TEMPLATE.actorTypes.vehicle || actor?.type === TEMPLATE.actorTypes.battlemech;
}

function normalizeHitLocationForDamage(actor, payload, armorRemainingBefore, structureRemainingBefore) {
  const hitLocation = payload?.hitLocation && typeof payload.hitLocation === "object"
    ? payload.hitLocation
    : resolveMachineHitLocation({
      actor,
      rollTotal: payload?.hitLocationRollTotal,
      armorBefore: armorRemainingBefore,
      structureBefore: structureRemainingBefore,
    });

  return {
    ...hitLocation,
    armorBefore: armorRemainingBefore,
    structureBefore: structureRemainingBefore,
    pureStructureHit: armorRemainingBefore <= 0,
  };
}

function getCriticalLocation(hitLocation = {}, chaosCriticalSelected = false) {
  if (chaosCriticalSelected && hitLocation.chaosTargetLocationKey) {
    return {
      locationKey: hitLocation.chaosTargetLocationKey,
      locationFamily: hitLocation.locationFamily === "head" ? "torso" : hitLocation.locationFamily,
      locationLabel: hitLocation.chaosTargetLocationLabel ?? getMachineLocationLabel(hitLocation.chaosTargetLocationKey),
    };
  }
  return {
    locationKey: hitLocation.locationKey,
    locationFamily: hitLocation.locationFamily,
    locationLabel: hitLocation.locationLabel ?? getMachineLocationLabel(hitLocation.locationKey),
  };
}

function shouldCreateCritical(hitLocation = {}, chaosCriticalSelected = false) {
  return Boolean(hitLocation.isAutomaticCritical || (hitLocation.chaosCriticalOption && chaosCriticalSelected));
}

function resolveAttackQuality(payload = {}) {
  const explicit = String(payload?.attackQuality ?? "").trim();
  if (["graze", "hit", "highMargin"].includes(explicit)) return explicit;

  const outcome = String(payload?.outcome ?? "").trim();
  const netHits = Math.max(0, Number(payload?.netHits ?? 0) || 0);
  if (outcome === "graze") return "graze";
  if (outcome === "hit" && netHits >= 4) return "highMargin";
  if (outcome === "hit") return "hit";
  return "";
}

export function previewMachineAttackDamage({
  actor = null,
  payload = {},
  hitLocation = null,
  chaosCriticalSelected = false,
} = {}) {
  if (!isMachineActor(actor)) return { ok: false, reason: "Machine damage requires a vehicle or BattleMech actor." };

  const incoming = Math.max(0, Math.ceil(Number(payload?.damage ?? payload?.amount ?? 0) || 0));
  const armor = getMonitorDamageState(actor, TEMPLATE.monitors.armor);
  const structure = getMonitorDamageState(actor, TEMPLATE.monitors.structure);
  const resolvedHitLocation = hitLocation
    ? { ...hitLocation, armorBefore: armor.remaining, structureBefore: structure.remaining, pureStructureHit: armor.remaining <= 0 }
    : normalizeHitLocationForDamage(actor, payload, armor.remaining, structure.remaining);

  // Monitor values are damage-taken counters; armor remaining must be computed
  // before this hit mutates armor or the pure-structure trigger becomes wrong.
  const armorAbsorbed = Math.min(incoming, actor.type === TEMPLATE.actorTypes.vehicle && armor.max <= 0 ? 0 : armor.remaining);
  const structureDamage = Math.min(structure.remaining, Math.max(0, incoming - armorAbsorbed));
  const armorAfterValue = Math.min(armor.max, armor.value + armorAbsorbed);
  const structureAfterValue = Math.min(structure.max, structure.value + structureDamage);
  const criticalSelected = shouldCreateCritical(resolvedHitLocation, chaosCriticalSelected);
  const criticalLocation = getCriticalLocation(resolvedHitLocation, chaosCriticalSelected);
  const attackQuality = resolveAttackQuality(payload);
  const locationStressGain = structureDamage;

  return {
    ok: true,
    mode: "machineAttackDamage",
    actorName: actor.name ?? "Machine",
    damageIncoming: incoming,
    adjustedIncoming: incoming,
    finalDamage: structureDamage,
    requestedDelta: incoming,
    appliedDelta: structureDamage,
    usedArmor: armorAbsorbed > 0,
    damageType: String(payload?.damageType ?? "kinetic").trim() || "kinetic",
    effectiveAp: Math.max(0, Number(payload?.ap ?? 0) || 0),
    hitLocation: resolvedHitLocation,
    critical: {
      automatic: Boolean(resolvedHitLocation.isAutomaticCritical),
      optional: Boolean(resolvedHitLocation.chaosCriticalOption),
      selected: criticalSelected,
      chaosCriticalSelected: Boolean(chaosCriticalSelected),
      locationKey: criticalLocation.locationKey,
      locationFamily: criticalLocation.locationFamily,
      locationLabel: criticalLocation.locationLabel,
    },
    machine: {
      armorBefore: armor.remaining,
      armorAfter: Math.max(0, armor.max - armorAfterValue),
      armorDamageBefore: armor.value,
      armorDamageAfter: armorAfterValue,
      armorMax: armor.max,
      armorAbsorbed,
      structureBefore: structure.remaining,
      structureAfter: Math.max(0, structure.max - structureAfterValue),
      structureDamageBefore: structure.value,
      structureDamageAfter: structureAfterValue,
      structureMax: structure.max,
      structureDamage,
      pureStructureHit: armor.remaining <= 0,
      locationStressGain,
      locationTakesStress: locationStressGain > 0,
    },
    degradation: {
      attackQuality,
      locationStressGain,
    },
    beforeLabel: `Armor ${armor.remaining}/${armor.max}, Structure ${structure.remaining}/${structure.max}`,
    afterLabel: `Armor ${Math.max(0, armor.max - armorAfterValue)}/${armor.max}, Structure ${Math.max(0, structure.max - structureAfterValue)}/${structure.max}`,
    source: String(payload?.source ?? "").trim(),
    notes: String(payload?.notes ?? "").trim(),
  };
}

function getSetting(name, fallback = "") {
  try {
    return game?.settings?.get?.(SYSTEM_NAME, name) || fallback;
  } catch (_error) {
    return fallback;
  }
}

export function getMachineCriticalTableUuid(actor = null) {
  return getSetting(SETTING_MACHINE_CRIT_TABLE_GENERAL, DEFAULT_MACHINE_CRIT_TABLE_UUIDS.general);
}

async function resolveCriticalTable(actor = null, tableUuid = "") {
  const uuid = String(tableUuid || getMachineCriticalTableUuid(actor)).trim();
  if (!uuid || typeof fromUuid !== "function") return null;
  try {
    return await fromUuid(uuid);
  } catch (error) {
    console.warn("MWD | Unable to resolve machine critical table", uuid, error);
    return null;
  }
}

function normalizeCriticalLocationFamily(actor = null, hitLocation = {}) {
  const family = String(hitLocation?.locationFamily ?? hitLocation?.locationKey ?? "").trim();
  if (actor?.type === TEMPLATE.actorTypes.battlemech) {
    if (family === "head") return "head";
    if (family === "arms" || family === "arm" || /arm/i.test(String(hitLocation?.locationKey ?? ""))) return "arms";
    if (family === "legs" || family === "leg" || /leg/i.test(String(hitLocation?.locationKey ?? ""))) return "legs";
    return "torso";
  }
  if (family === "turret" || family === "weapon" || /turret|weapon/i.test(String(hitLocation?.locationKey ?? ""))) return "turret";
  if (family === "mobility" || family === "motive" || /mobility|motive|drive|wheel|track/i.test(String(hitLocation?.locationKey ?? ""))) return "mobility";
  return "body";
}

export function getMachineLocationCriticalTableUuid(actor = null, hitLocation = {}) {
  const family = normalizeCriticalLocationFamily(actor, hitLocation);
  if (actor?.type === TEMPLATE.actorTypes.battlemech) {
    if (family === "head") return getSetting(SETTING_MACHINE_CRIT_TABLE_MECH_HEAD, DEFAULT_MACHINE_CRIT_TABLE_UUIDS.mechHead);
    if (family === "arms") return getSetting(SETTING_MACHINE_CRIT_TABLE_MECH_ARMS, DEFAULT_MACHINE_CRIT_TABLE_UUIDS.mechArms);
    if (family === "legs") return getSetting(SETTING_MACHINE_CRIT_TABLE_MECH_LEGS, DEFAULT_MACHINE_CRIT_TABLE_UUIDS.mechLegs);
    return getSetting(SETTING_MACHINE_CRIT_TABLE_MECH_TORSO, DEFAULT_MACHINE_CRIT_TABLE_UUIDS.mechTorso)
      || getSetting(SETTING_MACHINE_CRIT_TABLE_BATTLEMECH, DEFAULT_MACHINE_CRIT_TABLE_UUIDS.battlemech);
  }
  if (family === "turret") return getSetting(SETTING_MACHINE_CRIT_TABLE_VEHICLE_TURRET, DEFAULT_MACHINE_CRIT_TABLE_UUIDS.vehicleTurret);
  if (family === "mobility") return getSetting(SETTING_MACHINE_CRIT_TABLE_VEHICLE_MOBILITY, DEFAULT_MACHINE_CRIT_TABLE_UUIDS.vehicleMobility);
  return getSetting(SETTING_MACHINE_CRIT_TABLE_VEHICLE_BODY, DEFAULT_MACHINE_CRIT_TABLE_UUIDS.vehicleBody)
    || getSetting(SETTING_MACHINE_CRIT_TABLE_VEHICLE, DEFAULT_MACHINE_CRIT_TABLE_UUIDS.vehicle);
}

function getDefaultLocationCriticalResult(actor = null, hitLocation = {}, rollTotal = 7) {
  const actorGroup = actor?.type === TEMPLATE.actorTypes.vehicle ? "vehicle" : "battlemech";
  const family = normalizeCriticalLocationFamily(actor, hitLocation);
  const total = Math.min(12, Math.max(2, Math.trunc(Number(rollTotal ?? 7)) || 7));
  return clone(LOCATION_CRITICAL_RESULTS[actorGroup]?.[family]?.[total] ?? LOCATION_CRITICAL_RESULTS[actorGroup]?.[family]?.[7]);
}

function getGeneralRollTotal(drawn = {}, signal = {}) {
  const explicit = Number(drawn?.rollTotal ?? 0);
  if (Number.isFinite(explicit) && explicit >= 2 && explicit <= 12) return Math.trunc(explicit);
  const key = String(signal?.key ?? "").trim();
  for (const [roll, row] of Object.entries(DEFAULT_GENERAL_CRITICAL_SIGNALS)) {
    if (row.key === key) return Number(roll);
  }
  if (key === "cascade" || signal?.escalationKey === "cascade") return 2;
  if (signal?.escalationKey === "conditionAdvance") return 12;
  return 7;
}

function isCascadeGeneralResult(signal = {}, rollTotal = 0) {
  return rollTotal === 2
    || signal?.key === "catastrophicCascade"
    || signal?.key === "cascade"
    || signal?.escalationKey === "cascade";
}

function findResultForRoll(table, rollTotal) {
  const results = Array.from(table?.results ?? table?.results?.contents ?? []);
  return results.find(result => {
    const range = Array.isArray(result?.range) ? result.range : [];
    const min = Number(range[0] ?? 0);
    const max = Number(range[1] ?? range[0] ?? 0);
    return rollTotal >= min && rollTotal <= max;
  }) ?? null;
}

async function resolveLocationCriticalSignal({ actor = null, hitLocation = {}, rollTotal = 7, tableUuid = "" } = {}) {
  const fallback = getDefaultLocationCriticalResult(actor, hitLocation, rollTotal);
  const uuid = String(tableUuid || getMachineLocationCriticalTableUuid(actor, hitLocation)).trim();
  if (!fallback) return { error: "No location critical table is defined for this hit location." };

  if (!uuid || typeof fromUuid !== "function") {
    return {
      signal: normalizeCriticalSignal(fallback.signal, { strict: true }),
      label: fallback.label,
      tableUuid: uuid,
      resultId: "",
      rollTotal,
    };
  }

  const table = await resolveCriticalTable(actor, uuid);
  if (!table) return { error: `Machine location critical table could not be resolved: ${uuid}` };

  const result = findResultForRoll(table, rollTotal);
  if (!result) return { error: `Machine location critical table has no result for ${rollTotal}: ${uuid}` };

  const signal = normalizeCriticalSignal(result, { strict: true });
  return {
    signal,
    label: String(result?.text ?? result?.name ?? signal.key).trim() || signal.key,
    tableUuid: table.uuid ?? uuid,
    resultId: result.id ?? result._id ?? "",
    rollTotal,
  };
}

async function drawCriticalSignal({ actor = null, drawFn = null, tableUuid = "", recursiveCascade = false } = {}) {
  if (typeof drawFn === "function") {
    const drawn = await drawFn({ actor, recursiveCascade });
    const signal = normalizeCriticalSignal(drawn?.signal ?? drawn, { strict: true });
    return {
      signal,
      label: String(drawn?.label ?? signal.key).trim() || signal.key,
      tableUuid: String(drawn?.tableUuid ?? tableUuid ?? "").trim(),
      resultId: String(drawn?.resultId ?? "").trim(),
      rollTotal: Number(drawn?.rollTotal ?? 0) || null,
    };
  }

  const table = await resolveCriticalTable(actor, tableUuid);
  if (!table?.draw) return { error: "Machine critical table is not configured." };

  const draw = await table.draw({ displayChat: false });
  const result = Array.from(draw?.results ?? [])[0] ?? null;
  if (!result) return { error: "Machine critical table returned no result." };

  const signal = normalizeCriticalSignal(result, { strict: true });
  return {
    signal,
    label: String(result?.text ?? result?.name ?? signal.key).trim() || signal.key,
    tableUuid: table.uuid ?? tableUuid,
    resultId: result.id ?? result._id ?? "",
    rollTotal: Number(draw?.roll?.total ?? 0) || null,
  };
}

function buildCritRecord({ actor, drawn, hitLocation, source = {}, cascade = false } = {}) {
  const signal = normalizeCriticalSignal(drawn?.signal ?? drawn, { strict: true });
  const remedy = getMachineCritRemedy(signal.remedyKey);
  const location = getCriticalLocation(hitLocation, false);
  const label = String(drawn?.label ?? signal.key).trim() || signal.key;
  const consequence = buildMachineCriticalConsequenceData(actor, signal, location);
  const remedySkillKey = getMachineRemedySkillKey({
    key: signal.key,
    label,
    locationLabel: location.locationLabel,
    gates: signal.gates,
    mods: signal.mods,
    remedyKey: signal.remedyKey,
  }, remedy);
  return {
    id: randomId(),
    key: signal.key,
    label,
    tableUuid: String(drawn?.tableUuid ?? "").trim(),
    resultId: String(drawn?.resultId ?? "").trim(),
    generalKey: String(drawn?.general?.key ?? "").trim(),
    generalLabel: String(drawn?.general?.label ?? "").trim(),
    generalRollTotal: Number(drawn?.general?.rollTotal ?? drawn?.rollTotal ?? 0) || null,
    generalTableUuid: String(drawn?.general?.tableUuid ?? "").trim(),
    generalResultId: String(drawn?.general?.resultId ?? "").trim(),
    locationKey: location.locationKey,
    locationFamily: location.locationFamily,
    locationLabel: location.locationLabel,
    gates: signal.gates,
    mods: signal.mods,
    resourceEffects: signal.resourceEffects,
    pilotDamage: signal.pilotDamage,
    remedyKey: signal.remedyKey,
    remedyLabel: remedy.label,
    remedySkillKey,
    remedyBaseDn: getMachineRemedyBaseDn({ remedyKey: signal.remedyKey }, remedy),
    remedyEffect: getMachineRemedyEffect({}),
    escalationKey: signal.escalationKey,
    statusId: signal.statusId,
    statusLabel: consequence.statusLabel,
    effectText: consequence.effectText,
    automationMode: consequence.automationMode,
    weaponGroupId: consequence.weaponGroupId,
    weaponGroupName: consequence.weaponGroupName,
    weaponIds: consequence.weaponIds,
    active: true,
    cascade: Boolean(cascade),
    createdRound: Number(globalThis.game?.combat?.round ?? 0) || 0,
    createdAt: nowIso(),
    source: clone(source ?? {}),
    actorType: actor?.type ?? "",
  };
}

export async function drawMachineCriticalRecords({
  actor = null,
  hitLocation = {},
  source = {},
  drawFn = null,
  tableUuid = "",
} = {}) {
  try {
    const first = await drawCriticalSignal({ actor, drawFn, tableUuid, recursiveCascade: false });
    if (first?.error) return { ok: false, reason: first.error, crits: [] };

    const firstSignal = normalizeCriticalSignal(first.signal, { strict: true });
    const firstRollTotal = getGeneralRollTotal(first, firstSignal);
    const firstLocation = await resolveLocationCriticalSignal({ actor, hitLocation, rollTotal: firstRollTotal });
    if (firstLocation?.error) return { ok: false, reason: firstLocation.error, crits: [] };

    const firstDrawn = {
      ...firstLocation,
      general: {
        key: firstSignal.key,
        label: String(first?.label ?? firstSignal.key).trim() || firstSignal.key,
        rollTotal: firstRollTotal,
        tableUuid: String(first?.tableUuid ?? "").trim(),
        resultId: String(first?.resultId ?? "").trim(),
      },
    };

    if (!isCascadeGeneralResult(firstSignal, firstRollTotal)) {
      return { ok: true, crits: [buildCritRecord({ actor, drawn: firstDrawn, hitLocation, source })], cascade: false };
    }

    // Cascade is deliberately protected in code: a second cascade result becomes
    // the location table's 12-style breach instead of recursing forever.
    const second = await drawCriticalSignal({ actor, drawFn, tableUuid, recursiveCascade: true });
    const secondSignal = second?.error
      ? getDefaultCriticalSignalForRoll(12)
      : normalizeCriticalSignal(second.signal, { strict: true });
    const secondRollTotal = isCascadeGeneralResult(secondSignal, getGeneralRollTotal(second, secondSignal))
      ? 12
      : getGeneralRollTotal(second, secondSignal);
    const safeSecondSignal = secondRollTotal === 12 && isCascadeGeneralResult(secondSignal, getGeneralRollTotal(second, secondSignal))
      ? getDefaultCriticalSignalForRoll(12)
      : secondSignal;
    const secondLocation = await resolveLocationCriticalSignal({ actor, hitLocation, rollTotal: secondRollTotal });
    if (secondLocation?.error) return { ok: false, reason: secondLocation.error, crits: [] };
    const secondDrawn = {
      ...secondLocation,
      general: {
        key: safeSecondSignal.key,
        label: String(second?.label ?? safeSecondSignal.key).trim() || safeSecondSignal.key,
        rollTotal: secondRollTotal,
        tableUuid: String(second?.tableUuid ?? "").trim(),
        resultId: String(second?.resultId ?? "").trim(),
      },
    };

    return {
      ok: true,
      cascade: true,
      crits: [
        buildCritRecord({ actor, drawn: firstDrawn, hitLocation, source, cascade: true }),
        buildCritRecord({ actor, drawn: secondDrawn, hitLocation, source }),
      ],
    };
  } catch (error) {
    return { ok: false, reason: error?.message ?? "Unable to draw machine critical.", crits: [] };
  }
}

function getPreparedCriticalRecords(payload = {}, actor = null) {
  return Array.isArray(payload?.preparedCriticalRecords)
    ? payload.preparedCriticalRecords.map(record => normalizeMachineCriticalRecord(clone(record), actor))
    : [];
}

function getDirectConditionLocations(crits = []) {
  return Array.from(crits ?? [])
    .filter(crit => String(crit?.escalationKey ?? "").trim() === "conditionAdvance")
    .map(crit => String(crit?.locationKey ?? "").trim())
    .filter(Boolean);
}

function getAutomaticDegradationLocations(preview = {}) {
  if (!preview?.machine?.pureStructureHit) return [];
  if (Math.max(0, Number(preview?.machine?.structureDamage ?? 0) || 0) <= 0) return [];
  const locationKey = String(preview?.hitLocation?.locationKey ?? "").trim();
  return locationKey
    ? [{ locationKey, source: "pureStructure", applyReductions: false, allowSpend: false }]
    : [];
}


async function syncMachineCriticalStatus(actor, hasCrits) {
  if (!actor?.toggleStatusEffect || !hasCrits) return;
  try {
    await applyManagedStatusUpdate({
      actor,
      statusId: MACHINE_CRITICAL_STATUS_ID,
      active: true,
      metadata: {
        scope: "Machine critical effects",
        notes: "Visual marker for active system.mwd.crits entries.",
      },
    });
  } catch (error) {
    console.warn("MWD | Unable to sync machine critical status", error);
  }
}

async function applyMachineCritStatusConditions(actor, newCritRecords) {
  for (const crit of newCritRecords) {
    const statusId = String(crit?.statusId ?? "").trim();
    if (!statusId || (actor.statuses?.has?.(statusId) ?? false)) continue;
    try {
      await applyManagedStatusUpdate({ actor, statusId, active: true });
    } catch (error) {
      console.warn(`MWD | Unable to apply crit status "${statusId}"`, error);
    }
  }
}

async function applyDegradationStatusConditions(actor, degradation) {
  for (const event of Array.from(degradation?.fallbackEvents ?? [])) {
    if (!event?.destroyed) continue;
    const location = String(event.location ?? "").trim();
    const statusId = location === "legs" ? "legDestroyed"
      : location === "arms" ? "armDestroyed"
      : "";
    if (!statusId || (actor.statuses?.has?.(statusId) ?? false)) continue;
    try {
      await applyManagedStatusUpdate({ actor, statusId, active: true });
    } catch (error) {
      console.warn(`MWD | Unable to apply degradation status "${statusId}"`, error);
    }
  }
}

export async function applyMachineAttackDamage({
  actor = null,
  token = null,
  payload = {},
  options = {},
} = {}) {
  const preview = previewMachineAttackDamage({
    actor,
    payload,
    chaosCriticalSelected: Boolean(payload?.chaosCriticalSelected),
  });
  if (!preview.ok) return preview;

  const dryRun = Boolean(options.dryRun);
  const preparedCrits = getPreparedCriticalRecords(payload, actor);
  let critDraw = preparedCrits.length
    ? { ok: true, crits: preparedCrits, cascade: preparedCrits.length > 1 }
    : { ok: true, crits: [] };
  if (!preparedCrits.length && preview.critical.selected) {
    critDraw = await drawMachineCriticalRecords({
      actor,
      hitLocation: {
        ...preview.hitLocation,
        locationKey: preview.critical.locationKey,
        locationFamily: preview.critical.locationFamily,
        locationLabel: preview.critical.locationLabel,
      },
      source: {
        ...(payload?.sourceData ?? {}),
        source: payload?.source ?? "",
        tokenUuid: token?.uuid ?? payload?.targetTokenUuid ?? "",
      },
      drawFn: options.drawCritical,
      tableUuid: payload?.criticalTableUuid ?? "",
    });
  }

  const degradation = resolveMachineDegradation({
    actorSnapshot: actor,
    locationKey: preview.critical.locationKey || preview.hitLocation.locationKey,
    machineDamageDealt: preview.machine.structureDamage,
    attackQuality: preview.degradation?.attackQuality ?? resolveAttackQuality(payload),
    allowReliabilitySpend: true,
    reliabilitySpendSelections: Array.isArray(payload?.reliabilitySpendSelections) ? payload.reliabilitySpendSelections : [],
    directConditionLocations: [
      ...getAutomaticDegradationLocations(preview),
      ...(critDraw.ok ? getDirectConditionLocations(critDraw.crits) : []),
    ],
  });
  if (degradation.loopGuardTriggered) {
    console.warn("MWD | Machine degradation loop guard triggered", {
      actor: actor?.name ?? actor?.id ?? "Machine",
      payload,
      degradation,
    });
  }

  const existingCrits = Array.isArray(actor?.system?.mwd?.crits) ? clone(actor.system.mwd.crits) : [];
  const nextCrits = critDraw.ok && critDraw.crits.length
    ? existingCrits.concat(critDraw.crits)
    : existingCrits;

  if (!dryRun) {
    const update = {
      "system.monitors.armor.value": preview.machine.armorDamageAfter,
      "system.monitors.structure.value": preview.machine.structureDamageAfter,
      ...buildMachineDegradationUpdates(actor, degradation),
    };
    if (critDraw.ok && critDraw.crits.length) {
      update["system.mwd.crits"] = nextCrits;
    }
    await actor.update(update);
    const allCrits = nextCrits.some(crit => crit?.active !== false);
    await syncMachineCriticalStatus(actor, allCrits);
    if (critDraw.ok && critDraw.crits.length) {
      await applyMachineCritStatusConditions(actor, critDraw.crits);
    }
    await applyDegradationStatusConditions(actor, degradation);
  }

  return {
    ...preview,
    dryRun,
    appliedDelta: preview.machine.structureDamage,
    critical: {
      ...preview.critical,
      drawOk: Boolean(critDraw.ok),
      reason: critDraw.ok ? "" : critDraw.reason,
      records: critDraw.ok ? critDraw.crits : [],
      cascade: Boolean(critDraw.cascade),
    },
    degradation,
  };
}
