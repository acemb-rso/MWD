// src/modules/mwd/machine-movement.js
// Purpose: Normalizes machine movement speeds for vehicle-scale actors.
// How it fits: Keeps vehicle and BattleMech sheets aligned on Ground, Flight, and Jump movement fields.

import { TEMPLATE } from "../constants.js";

const MOVEMENT_LABELS = Object.freeze({
  ground: "Ground",
  flight: "Flight",
  jump: "Jump",
});

function toNonNegativeInteger(value, fallback = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(0, Math.trunc(numeric));
}

export function isMachineActorType(actorType = "") {
  return actorType === TEMPLATE.actorTypes.vehicle || actorType === TEMPLATE.actorTypes.battlemech;
}

export function getMachineMovementModes(actorType = "") {
  if (actorType === TEMPLATE.actorTypes.battlemech) return ["ground", "flight", "jump"];
  if (actorType === TEMPLATE.actorTypes.vehicle) return ["ground", "flight"];
  return [];
}

export function normalizeMachineMovement(movement = {}, { actorType = "", legacyMoves = 0 } = {}) {
  if (!isMachineActorType(actorType)) return {};

  const source = movement && typeof movement === "object" ? movement : {};
  const groundFallback = toNonNegativeInteger(legacyMoves, 0);
  const normalized = {
    ground: toNonNegativeInteger(source.ground ?? source.move ?? source.run, groundFallback),
    flight: toNonNegativeInteger(source.flight ?? source.fly, 0),
  };

  if (actorType === TEMPLATE.actorTypes.battlemech) {
    normalized.jump = toNonNegativeInteger(source.jump, 0);
  }

  return normalized;
}

export function buildMachineMovementFields({
  actorType = "",
  movement = {},
  legacyMoves = 0,
  editing = false,
  basePath = "system.movement",
} = {}) {
  const normalized = normalizeMachineMovement(movement, { actorType, legacyMoves });

  return getMachineMovementModes(actorType)
    .map(key => {
      const value = toNonNegativeInteger(normalized[key], 0);
      const isOptionalFlight = key === "flight";
      return {
        key,
        label: MOVEMENT_LABELS[key] ?? key,
        value,
        displayValue: String(value),
        path: `${basePath}.${key}`,
        visible: editing || !isOptionalFlight || value > 0,
      };
    })
    .filter(field => field.visible);
}

export function buildMachineMovementSummaryParts({ actorType = "", movement = {}, legacyMoves = 0 } = {}) {
  const normalized = normalizeMachineMovement(movement, { actorType, legacyMoves });

  return buildMachineMovementFields({
    actorType,
    movement: normalized,
    legacyMoves,
    editing: false,
  }).map(field => ({
    label: field.label,
    value: String(field.value),
  }));
}
