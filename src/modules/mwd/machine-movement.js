// src/modules/mwd/machine-movement.js
// Purpose: Normalizes machine movement speeds for vehicle-scale actors.
// Workflow: actor movement storage and legacy fields -> normalized movement rows
// with penalties/derived jump -> sheets and movement actions display distances.

import { TEMPLATE } from "../core/constants.js";
import { isMachineActor as isMachineActorType } from "../utils/actor-guards.js";
import { toNonNegativeInteger } from "../utils/coercion.js";

export { isMachineActorType };

const MOVEMENT_LABELS = Object.freeze({
  ground: "Ground",
  flight: "Flight",
  jump: "Jump",
});

export const MACHINE_MOVEMENT_PENALTY_STEP_METERS = 30;
export const MACHINE_MINIMUM_PENALIZED_MOVEMENT_METERS = 10;

export function movementPenaltyStepsToMeters(steps = 0) {
  return toNonNegativeInteger(steps, 0) * MACHINE_MOVEMENT_PENALTY_STEP_METERS;
}

export function applyMachineMovementPenalty(
  speed = 0,
  movementPenalty = 0,
  { immobile = false, minimum = MACHINE_MINIMUM_PENALIZED_MOVEMENT_METERS } = {},
) {
  // Penalties reduce speed in meters but preserve a small movement floor unless
  // the aggregate state marks the machine fully immobile.
  const base = toNonNegativeInteger(speed, 0);
  if (immobile) return 0;
  const penalty = toNonNegativeInteger(movementPenalty, 0);
  if (base <= 0 || penalty <= 0) return base;
  const floor = Math.min(base, toNonNegativeInteger(minimum, MACHINE_MINIMUM_PENALIZED_MOVEMENT_METERS));
  return Math.max(floor, base - penalty);
}

export function getMachineMovementModes(actorType = "") {
  if (actorType === TEMPLATE.actorTypes.battlemech) return ["ground", "flight"];
  if (actorType === TEMPLATE.actorTypes.vehicle) return ["ground", "flight"];
  return [];
}

export function normalizeMachineMovement(movement = {}, { actorType = "", legacyMoves = 0 } = {}) {
  // Accept current ground/flight fields plus legacy move/run/fly names. Jump is
  // retained only for BattleMechs, where module-derived jump can supersede it.
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

function buildBattlemechJumpField(jumpProfile = null, movementEffects = {}) {
  // Jump displays as a derived, non-editable movement row because its source is
  // modules or cached mobility, not the actor's base movement inputs.
  if (!jumpProfile?.enabled) return null;

  const value = toNonNegativeInteger(jumpProfile.movement, 0);
  if (value <= 0) return null;
  const blockedByEffects = Boolean(movementEffects?.immobile || movementEffects?.noJump);

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
    blocked: Boolean(jumpProfile.blocked || blockedByEffects),
    blockedReason: blockedByEffects
      ? (movementEffects?.immobile ? "Machine is immobilized." : "Jump movement is blocked by current damage or status effects.")
      : String(jumpProfile.blockedReason ?? "").trim(),
  };
}

export function buildMachineMovementFields({
  actorType = "",
  movement = {},
  legacyMoves = 0,
  editing = false,
  basePath = "system.movement",
  jumpProfile = null,
  movementEffects = {},
} = {}) {
  const normalized = normalizeMachineMovement(movement, { actorType, legacyMoves });
  const movementPenalty = toNonNegativeInteger(movementEffects?.movementPenalty, 0);
  const movementBonus = toNonNegativeInteger(movementEffects?.movementBonus, 0);
  const immobile = Boolean(movementEffects?.immobile);

  const fields = getMachineMovementModes(actorType)
    .map(key => {
      const rawValue = toNonNegativeInteger(normalized[key], 0);
      const value = rawValue + movementBonus;
      const adjustedValue = applyMachineMovementPenalty(value, movementPenalty, { immobile });
      const isOptionalFlight = key === "flight";
      const details = [];
      if (!editing && movementBonus > 0) details.push(`+${movementBonus} m`);
      if (!editing && immobile && value > 0) details.push("Immobilized");
      else if (!editing && adjustedValue !== value) details.push(`-${movementPenalty} m`);
      return {
        key,
        label: MOVEMENT_LABELS[key] ?? key,
        value: rawValue,
        adjustedValue,
        displayValue: String(editing ? rawValue : adjustedValue),
        path: `${basePath}.${key}`,
        visible: editing || !isOptionalFlight || value > 0,
        editable: true,
        derived: false,
        title: "",
        detail: details.join(" | "),
      };
    })
    .filter(field => field.visible);

  const jumpField = actorType === TEMPLATE.actorTypes.battlemech
    ? buildBattlemechJumpField(jumpProfile, movementEffects)
    : null;
  if (jumpField) fields.push(jumpField);

  return fields;
}

export function buildMachineMovementSummaryParts({ actorType = "", movement = {}, legacyMoves = 0, jumpProfile = null, movementEffects = {} } = {}) {
  const normalized = normalizeMachineMovement(movement, { actorType, legacyMoves });

  return buildMachineMovementFields({
    actorType,
    movement: normalized,
    legacyMoves,
    editing: false,
    jumpProfile,
    movementEffects,
  }).map(field => ({
    label: field.label,
    value: String(field.adjustedValue ?? field.value),
  }));
}
