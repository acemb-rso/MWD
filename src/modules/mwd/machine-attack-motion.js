// src/modules/mwd/machine-attack-motion.js
// Purpose: Machine attack motion and tracking rules.
// How it fits: Resolves target movement declarations into DN and dice modifiers.

import { TEMPLATE } from "../constants.js";
import { normalizeMachineMovement } from "./machine-movement.js";

export const METERS_PER_HEX = 30;

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

export function getHighestNonJumpMovementSpeed(actor = null) {
  if (!isMachineActor(actor)) return 0;
  const movement = normalizeMachineMovement(actor.system?.movement ?? {}, {
    actorType: actor.type,
    legacyMoves: actor.system?.moves,
  });
  return Math.max(
    toNonNegativeInteger(movement.ground, 0),
    toNonNegativeInteger(movement.flight, 0)
  );
}

export function normalizeMachineMotionPayload(payload = {}) {
  const source = payload?.machineMotion && typeof payload.machineMotion === "object"
    ? payload.machineMotion
    : {};
  return {
    targetMotion: normalizeTargetMotion(source.targetMotion ?? payload?.targetMotion),
    jumped: Boolean(source.jumped ?? payload?.targetJumped),
  };
}

export function buildMachineAttackMotionContext({
  targetActor = null,
  payload = {},
} = {}) {
  const declaration = normalizeMachineMotionPayload(payload);
  const targetMotion = declaration.targetMotion;
  const moved = targetMotion !== "stationary";
  const speedMeters = getHighestNonJumpMovementSpeed(targetActor);
  const trackingHexes = moved ? metersToHexes(speedMeters) : 0;
  const movementTrackingPenalty = moved ? getTrackingPenaltyByHexes(trackingHexes) : 0;
  const jumpDn = declaration.jumped ? 1 : 0;
  const jumpTrackingPenalty = declaration.jumped ? -1 : 0;
  const motionDn = getTargetMotionDn(targetMotion);

  return {
    targetMotion,
    targetMotionLabel: TARGET_MOTION_LABELS[targetMotion] ?? TARGET_MOTION_LABELS.stationary,
    jumped: declaration.jumped,
    speedMeters,
    trackingHexes,
    motionDn,
    jumpDn,
    dnModifier: motionDn + jumpDn,
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
