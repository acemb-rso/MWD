// src/modules/utils/actor-guards.js
// Purpose: Canonical actor-type classifiers for actor documents, token-like
// wrappers, and plain test fixtures.
// How it fits: Centralizes stable type predicates without importing mechanics,
// sheets, resolvers, or document services.

import { TEMPLATE } from "../core/constants.js";

export const MACHINE_ACTOR_TYPES = Object.freeze([
  TEMPLATE.actorTypes.vehicle,
  TEMPLATE.actorTypes.battlemech,
]);

export const PERSON_ACTOR_TYPES = Object.freeze([
  TEMPLATE.actorTypes.character,
  TEMPLATE.actorTypes.npc,
]);

const MACHINE_ACTOR_TYPE_SET = new Set(MACHINE_ACTOR_TYPES);
const PERSON_ACTOR_TYPE_SET = new Set(PERSON_ACTOR_TYPES);

function normalizeType(value = "") {
  return String(value ?? "").trim();
}

export function getActorType(source = null) {
  if (!source) return "";
  if (typeof source === "string") return normalizeType(source);
  return [
    source?.actor?.type,
    source?.baseActor?.type,
    source?.document?.actor?.type,
    source?.document?.baseActor?.type,
    source?.type,
    source?.document?.type,
  ]
    .map(normalizeType)
    .find(Boolean) ?? "";
}

export function getDirectActorType(source = null) {
  if (!source) return "";
  if (typeof source === "string") return normalizeType(source);
  return [
    source?.type,
    source?.actor?.type,
  ]
    .map(normalizeType)
    .find(Boolean) ?? "";
}

export function getMachineActorType(source = null, { fallback = TEMPLATE.actorTypes.vehicle, allowMechAlias = false } = {}) {
  const type = normalizeType(typeof source === "string" ? source : source?.type ?? source);
  if (type === TEMPLATE.actorTypes.battlemech || (allowMechAlias && type === "mech")) return TEMPLATE.actorTypes.battlemech;
  if (type === TEMPLATE.actorTypes.vehicle) return TEMPLATE.actorTypes.vehicle;
  return fallback;
}

export function isMachineActor(source = null) {
  return MACHINE_ACTOR_TYPE_SET.has(getActorType(source));
}

export function isPersonActor(source = null) {
  return PERSON_ACTOR_TYPE_SET.has(getActorType(source));
}

export function isBattleMechActor(source = null) {
  return getActorType(source) === TEMPLATE.actorTypes.battlemech;
}

export function isVehicleActor(source = null) {
  return getActorType(source) === TEMPLATE.actorTypes.vehicle;
}
