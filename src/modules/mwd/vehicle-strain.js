// src/modules/mwd/vehicle-strain.js
// Purpose: Vehicle-only operational strain model for Redline and future terrain
// or critical hooks.
// How it fits: Keeps vehicle strain separate from BattleMech heat while exposing
// provider-friendly state and simple actor update helpers.

import { TEMPLATE } from "../constants.js";

export const VEHICLE_STRAIN_THRESHOLDS = Object.freeze({
  strained: 2,
  overstressed: 4,
  critical: 6,
});

export const VEHICLE_STRAIN_MAX = 6;

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function clampNonNegativeInteger(value, fallback = 0) {
  return Math.max(0, Math.trunc(toNumber(value, fallback)));
}

function normalizeThresholds(thresholds = {}) {
  return {
    strained: Math.max(1, clampNonNegativeInteger(thresholds.strained, VEHICLE_STRAIN_THRESHOLDS.strained)),
    overstressed: Math.max(1, clampNonNegativeInteger(thresholds.overstressed, VEHICLE_STRAIN_THRESHOLDS.overstressed)),
    critical: Math.max(1, clampNonNegativeInteger(thresholds.critical, VEHICLE_STRAIN_THRESHOLDS.critical)),
  };
}

export function normalizeVehicleStrainState(systemData = {}, actorType = TEMPLATE.actorTypes.vehicle) {
  if (actorType !== TEMPLATE.actorTypes.vehicle) return systemData;

  const mwd = systemData.mwd = systemData.mwd ?? {};
  const raw = mwd.strain ?? {};
  const thresholds = normalizeThresholds(raw.thresholds ?? {});
  const max = Math.max(thresholds.critical, clampNonNegativeInteger(raw.max, VEHICLE_STRAIN_MAX));

  mwd.strain = {
    value: Math.min(max, clampNonNegativeInteger(raw.value, 0)),
    pendingGenerated: Math.max(0, clampNonNegativeInteger(raw.pendingGenerated, 0)),
    max,
    thresholds,
  };

  return systemData;
}

export function buildVehicleStrainModel(actorOrSystem = {}) {
  const systemData = actorOrSystem?.system ?? actorOrSystem ?? {};
  const normalized = normalizeVehicleStrainState(
    typeof foundry !== "undefined" && foundry.utils?.deepClone
      ? foundry.utils.deepClone(systemData)
      : JSON.parse(JSON.stringify(systemData ?? {})),
    TEMPLATE.actorTypes.vehicle,
  );
  const strain = normalized.mwd?.strain ?? {};
  const value = clampNonNegativeInteger(strain.value, 0);
  const pendingGenerated = clampNonNegativeInteger(strain.pendingGenerated, 0);
  const thresholds = normalizeThresholds(strain.thresholds ?? {});
  const status = value >= thresholds.critical
    ? "critical"
    : value >= thresholds.overstressed
      ? "overstressed"
      : value >= thresholds.strained
        ? "strained"
        : "normal";

  const labels = {
    normal: "Normal",
    strained: "Strained",
    overstressed: "Overstressed",
    critical: "Critical",
  };

  return {
    value,
    pendingGenerated,
    max: Math.max(thresholds.critical, clampNonNegativeInteger(strain.max, VEHICLE_STRAIN_MAX)),
    thresholds,
    status,
    label: labels[status] ?? "Normal",
    redlineBlocked: status === "critical",
    redlineBlockReason: status === "critical" ? "Vehicle strain is critical; Redline is blocked until reset or recovery." : "",
    doctrine: "Temporary operational stress from Redline, not BattleMech heat accumulation.",
  };
}

export function getVehicleStrainStateEffects(actor = null) {
  if (actor?.type !== TEMPLATE.actorTypes.vehicle) {
    return {
      handling: 0,
      system: 0,
      pilotingDice: 0,
      pilotingDn: 0,
      movementPenalty: 0,
      redlineBlocked: false,
      effectTexts: [],
    };
  }

  const strain = buildVehicleStrainModel(actor);
  const effects = {
    handling: 0,
    system: 0,
    pilotingDice: 0,
    pilotingDn: 0,
    movementPenalty: 0,
    redlineBlocked: strain.redlineBlocked,
    effectTexts: [],
  };

  if (strain.status === "strained") {
    effects.pilotingDn += 1;
    effects.effectTexts.push("Strained: Redline stress is making handling checks riskier.");
  } else if (strain.status === "overstressed") {
    effects.handling += -1;
    effects.system += -1;
    effects.pilotingDn += 1;
    effects.effectTexts.push("Overstressed: -1 Handling, -1 System, and harder vehicle control checks.");
  } else if (strain.status === "critical") {
    effects.handling += -2;
    effects.system += -1;
    effects.pilotingDn += 2;
    effects.movementPenalty += 1;
    effects.effectTexts.push("Critical strain: Redline blocked; mobility and control are under severe stress.");
  }

  return effects;
}

export async function adjustVehiclePendingStrain(actor, delta = 0, { reason = "" } = {}) {
  if (!actor || actor.type !== TEMPLATE.actorTypes.vehicle) return { ok: false, reason: "Vehicle actor required." };
  const model = buildVehicleStrainModel(actor);
  const next = Math.max(0, model.pendingGenerated + clampNonNegativeInteger(delta, 0));
  await actor.update({ "system.mwd.strain.pendingGenerated": next });
  return { ok: true, pendingGenerated: next, reason };
}

export async function resolveVehiclePendingStrain(actor, { reason = "" } = {}) {
  if (!actor || actor.type !== TEMPLATE.actorTypes.vehicle) return { ok: false, reason: "Vehicle actor required." };
  const model = buildVehicleStrainModel(actor);
  const nextValue = Math.min(model.max, model.value + model.pendingGenerated);
  await actor.update({
    "system.mwd.strain.value": nextValue,
    "system.mwd.strain.pendingGenerated": 0,
  });
  return { ok: true, value: nextValue, applied: model.pendingGenerated, reason };
}

