// src/modules/mwd/machine-movement.js
// Purpose: Normalizes machine movement speeds for vehicle-scale actors.
// How it fits: Keeps vehicle and BattleMech sheets aligned on Ground and Flight
// fields while allowing BattleMech jump movement to be derived from modules.

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
  if (actorType === TEMPLATE.actorTypes.battlemech) return ["ground", "flight"];
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

  if (actorType === TEMPLATE.actorTypes.battlemech && source.jump !== undefined) {
    normalized.jump = toNonNegativeInteger(source.jump, 0);
  }

  return normalized;
}

function buildBattlemechJumpField(jumpProfile = null) {
  if (!jumpProfile?.enabled) return null;

  const value = toNonNegativeInteger(jumpProfile.movement, 0);
  if (value <= 0) return null;

  const detailParts = [
    jumpProfile.heat > 0 ? `Heat +${toNonNegativeInteger(jumpProfile.heat, 0)}` : "",
    Number(jumpProfile.attackRatingBonus ?? 0) ? `AR ${Number(jumpProfile.attackRatingBonus ?? 0) >= 0 ? "+" : ""}${Number(jumpProfile.attackRatingBonus ?? 0)}` : "",
    Number(jumpProfile.defenseRatingBonus ?? 0) ? `DR ${Number(jumpProfile.defenseRatingBonus ?? 0) >= 0 ? "+" : ""}${Number(jumpProfile.defenseRatingBonus ?? 0)}` : "",
    jumpProfile.dfaEnabled ? "DFA" : "",
  ].filter(Boolean);

  return {
    key: "jump",
    label: MOVEMENT_LABELS.jump ?? "Jump",
    value,
    displayValue: String(value),
    path: "",
    visible: true,
    editable: false,
    derived: true,
    title: String(jumpProfile.sourceLabel ?? "").trim(),
    detail: detailParts.join(" | "),
    blocked: Boolean(jumpProfile.blocked),
    blockedReason: String(jumpProfile.blockedReason ?? "").trim(),
  };
}

export function buildMachineMovementFields({
  actorType = "",
  movement = {},
  legacyMoves = 0,
  editing = false,
  basePath = "system.movement",
  jumpProfile = null,
} = {}) {
  const normalized = normalizeMachineMovement(movement, { actorType, legacyMoves });

  const fields = getMachineMovementModes(actorType)
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
        editable: true,
        derived: false,
        title: "",
        detail: "",
      };
    })
    .filter(field => field.visible);

  const jumpField = actorType === TEMPLATE.actorTypes.battlemech
    ? buildBattlemechJumpField(jumpProfile)
    : null;
  if (jumpField) fields.push(jumpField);

  return fields;
}

export function buildMachineMovementSummaryParts({ actorType = "", movement = {}, legacyMoves = 0, jumpProfile = null } = {}) {
  const normalized = normalizeMachineMovement(movement, { actorType, legacyMoves });

  return buildMachineMovementFields({
    actorType,
    movement: normalized,
    legacyMoves,
    editing: false,
    jumpProfile,
  }).map(field => ({
    label: field.label,
    value: String(field.value),
  }));
}
