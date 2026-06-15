// src/modules/mwd/machine-attack-motion.js
// Purpose: Machine attack motion and tracking rules.
// Workflow: combatant movement flags or attack payload overrides -> motion DN
// and tracking dice packet -> machine attack resolver applies final modifiers.

import { TEMPLATE } from "../core/constants.js";
import { applyMachineMovementPenalty, normalizeMachineMovement } from "./machine-movement.js";
import { getMachineMovementEffects } from "./machine-state-effects.js";

export const METERS_PER_HEX = 30;

// Target movement has two independent attack impacts:
// action count raises the attack DN, while actual speed produces tracking dice.
export const TARGET_MOTION_DN_BY_ACTIONS = Object.freeze({
  stationary: 0,
  moved1: 1,
  moved2: 2,
  moved3Plus: 3,
});

export const TARGET_TRACKING_PENALTY_BY_HEXES = Object.freeze([
  Object.freeze({ min: 0, max: 0, penalty: 0 }),
  Object.freeze({ min: 1, max: 2, penalty: -1 }),
  Object.freeze({ min: 3, max: 4, penalty: -2 }),
  Object.freeze({ min: 5, max: 6, penalty: -3 }),
  Object.freeze({ min: 7, max: 8, penalty: -4 }),
  Object.freeze({ min: 9, max: Infinity, penalty: -5 }),
]);

export const TARGET_MOTION_LABELS = Object.freeze({
  stationary: "Stationary",
  moved1: "Moved 1",
  moved2: "Moved 2",
  moved3Plus: "Moved 3+",
});

// Combat action-state stores the movement action id; attack resolution needs
// the coarser motion bucket used by the tabletop targeting table.
const TARGET_MOTION_BY_MOVEMENT_KIND = Object.freeze({
  walk: "moved1",
  fly: "moved1",
  jump: "moved1",
  run: "moved2",
  sprint: "moved3Plus",
});

const MACHINE_TYPES = new Set([TEMPLATE.actorTypes.vehicle, TEMPLATE.actorTypes.battlemech]);

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function toNonNegativeInteger(value, fallback = 0) {
  return Math.max(0, Math.trunc(toNumber(value, fallback)));
}

export function isMachineActor(actor = null) {
  return MACHINE_TYPES.has(actor?.type);
}

export function metersToHexes(meters = 0) {
  return Math.max(0, Math.round(toNumber(meters, 0) / METERS_PER_HEX));
}

export function getTrackingPenaltyByHexes(hexes = 0) {
  const normalized = toNonNegativeInteger(hexes, 0);
  return TARGET_TRACKING_PENALTY_BY_HEXES.find(row => normalized >= row.min && normalized <= row.max)?.penalty ?? 0;
}

export function normalizeTargetMotion(value = "stationary") {
  const key = String(value ?? "").trim();
  return Object.prototype.hasOwnProperty.call(TARGET_MOTION_DN_BY_ACTIONS, key) ? key : "stationary";
}

export function getTargetMotionDn(value = "stationary") {
  return TARGET_MOTION_DN_BY_ACTIONS[normalizeTargetMotion(value)] ?? 0;
}

function hasOwnValue(source = {}, key = "") {
  return source && typeof source === "object" && Object.prototype.hasOwnProperty.call(source, key);
}

function getCombatantPersonalCombatState(combatant = null) {
  if (!combatant) return {};
  return combatant.getFlag?.("mwd", "personalCombat")
    ?? combatant.flags?.mwd?.personalCombat
    ?? {};
}

export function getKnownTargetMotionFromCombatant(combatant = null, { combat = globalThis.game?.combat } = {}) {
  // Only trust tracker motion from the active round so a stale combatant flag
  // cannot keep taxing future attacks after the tracker advances.
  const move = getCombatantPersonalCombatState(combatant)?.actionState?.move ?? null;
  if (!move || typeof move !== "object" || move.moved === false) return null;

  const currentRound = Number(combat?.round ?? 0);
  const moveRound = Number(move.round ?? 0);
  if (currentRound > 0 && moveRound > 0 && currentRound !== moveRound) return null;

  const movementKind = String(move.movementKind ?? "").trim();
  return {
    targetMotion: TARGET_MOTION_BY_MOVEMENT_KIND[movementKind] ?? "moved1",
    jumped: movementKind === "jump",
    movementKind,
  };
}

export function getHighestNonJumpMovementSpeed(actor = null) {
  if (!isMachineActor(actor)) return 0;
  const movement = normalizeMachineMovement(actor.system?.movement ?? {}, {
    actorType: actor.type,
    legacyMoves: actor.system?.moves,
  });
  const effects = getMachineMovementEffects(actor);
  return Math.max(
    applyMachineMovementPenalty(toNonNegativeInteger(movement.ground, 0), effects.movementPenalty, { immobile: effects.immobile }),
    applyMachineMovementPenalty(toNonNegativeInteger(movement.flight, 0), effects.movementPenalty, { immobile: effects.immobile })
  );
}

export function normalizeMachineMotionPayload(payload = {}, { targetCombatant = null } = {}) {
  // Explicit payload values win over tracker-derived state. Chat cards and
  // rerolls can therefore replay the same declared motion even if combat moved on.
  const source = payload?.machineMotion && typeof payload.machineMotion === "object"
    ? payload.machineMotion
    : {};
  const knownMotion = getKnownTargetMotionFromCombatant(targetCombatant);
  const hasExplicitMotion = hasOwnValue(source, "targetMotion") || hasOwnValue(payload, "targetMotion");
  const hasExplicitJump = hasOwnValue(source, "jumped") || hasOwnValue(payload, "targetJumped");

  return {
    targetMotion: normalizeTargetMotion(hasExplicitMotion
      ? (source.targetMotion ?? payload?.targetMotion)
      : knownMotion?.targetMotion),
    jumped: Boolean(hasExplicitJump
      ? (source.jumped ?? payload?.targetJumped)
      : knownMotion?.jumped),
  };
}

export function buildMachineAttackMotionContext({
  attackerCombatant = null,
  targetActor = null,
  targetCombatant = null,
  payload = {},
  suppressAttackerMotion = false,
} = {}) {
  // This is the complete motion packet consumed by attack resolvers and sheet
  // previews: DN modifiers, speed-derived tracking dice, and the display labels.
  const declaration = normalizeMachineMotionPayload(payload, { targetCombatant });
  const source = payload?.machineMotion && typeof payload.machineMotion === "object"
    ? payload.machineMotion
    : {};
  const knownAttackerMotion = suppressAttackerMotion
    ? null
    : getKnownTargetMotionFromCombatant(attackerCombatant);
  const hasExplicitAttackerMotion = !suppressAttackerMotion
    && (hasOwnValue(source, "attackerMotion") || hasOwnValue(payload, "attackerMotion"));
  const attackerMotion = suppressAttackerMotion
    ? "stationary"
    : normalizeTargetMotion(hasExplicitAttackerMotion
      ? (source.attackerMotion ?? payload?.attackerMotion)
      : knownAttackerMotion?.targetMotion);
  const targetMotion = declaration.targetMotion;
  const moved = targetMotion !== "stationary";
  const speedMeters = getHighestNonJumpMovementSpeed(targetActor);
  const trackingHexes = moved ? metersToHexes(speedMeters) : 0;
  const movementTrackingPenalty = moved ? getTrackingPenaltyByHexes(trackingHexes) : 0;
  const jumpDn = declaration.jumped ? 1 : 0;
  const jumpTrackingPenalty = declaration.jumped ? -1 : 0;
  const motionDn = getTargetMotionDn(targetMotion);
  const attackerMotionDn = !suppressAttackerMotion && attackerMotion !== "stationary" ? 1 : 0;

  return {
    attackerMotion,
    attackerMotionLabel: TARGET_MOTION_LABELS[attackerMotion] ?? TARGET_MOTION_LABELS.stationary,
    attackerMotionDn,
    attackerMotionSuppressed: Boolean(suppressAttackerMotion),
    targetMotion,
    targetMotionLabel: TARGET_MOTION_LABELS[targetMotion] ?? TARGET_MOTION_LABELS.stationary,
    jumped: declaration.jumped,
    speedMeters,
    trackingHexes,
    motionDn,
    jumpDn,
    dnModifier: attackerMotionDn + motionDn + jumpDn,
    movementTrackingPenalty,
    jumpTrackingPenalty,
    trackingPenalty: movementTrackingPenalty + jumpTrackingPenalty,
  };
}

export function getIndirectAttackPenalty(rangeBand = "close") {
  const key = String(rangeBand ?? "").trim().toLowerCase();
  if (key === "near") return -2;
  if (key === "far") return -3;
  if (key === "extreme") return -4;
  return -1;
}
