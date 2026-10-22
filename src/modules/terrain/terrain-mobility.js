// src/modules/terrain/terrain-mobility.js
// Purpose: Resolves how occupied terrain affects a machine through its mobility
// type (Environment-Catalog §5 mobility matrix).
// How it fits: Terrain Regions project terrain statuses onto occupants; this
// module turns those statuses into function-tagged environment dice
// contributions (combined by environment-dice.js in the machine rule state)
// and decides which machines ground terrain ignores (flight).

import { TEMPLATE } from "../core/constants.js";
import { getVehicleProfileDefinition } from "../mwd/vehicle-profiles.js";
import {
  getTerrainEntryById,
  getTerrainEntryByStatusId,
  TERRAIN_AFFINITY_DICE,
  TERRAIN_MOBILITY_MATRIX,
} from "./terrain-catalog.js";
import { withoutReplaced } from "./environment-dice.js";

export const FLIGHT_TERRAIN_MOBILITY = "flight";

/**
 * @returns {string|null} a TERRAIN_MOBILITY_MATRIX key, "flight", or null for
 *   actors terrain mobility does not cover (personal scale, for now).
 */
export function getActorTerrainMobility(actor = null) {
  if (actor?.type === TEMPLATE.actorTypes.battlemech) return "walker";
  if (actor?.type !== TEMPLATE.actorTypes.vehicle) return null;
  const profile = getVehicleProfileDefinition(actor.system?.mwd?.movementProfile);
  if (profile.family === "flight") return FLIGHT_TERRAIN_MOBILITY;
  return Object.hasOwn(TERRAIN_MOBILITY_MATRIX, profile.key) ? profile.key : null;
}

// Flight mobility (VTOL, drone, aerospace) is unaffected by ground terrain.
export function isGroundTerrainExempt(actor = null) {
  return getActorTerrainMobility(actor) === FLIGHT_TERRAIN_MOBILITY;
}

export function getTerrainMobilityRelation(mobility = "", terrainId = "") {
  return TERRAIN_MOBILITY_MATRIX[mobility]?.[terrainId] ?? "normal";
}

// Terrain ids the matrix lists under a relation, as catalog entries (for
// display).
export function getTerrainForMobilityRelation(mobility = "", relation = "") {
  return Object.entries(TERRAIN_MOBILITY_MATRIX[mobility] ?? {})
    .filter(([, value]) => value === relation)
    .map(([terrainId]) => getTerrainEntryById(terrainId))
    .filter(Boolean);
}

/**
 * Traction contribution of one terrain entry for a mobility type. The mobility
 * profile replaces the terrain's general penalty rather than stacking on it.
 * @returns {{function:string, value:number, label:string, relation:string}|null}
 */
export function getTerrainDiceContribution(mobility = "", terrain = null) {
  if (!terrain) return null;
  const relation = getTerrainMobilityRelation(mobility, terrain.id);
  const applies = !terrain.pilotingDiceMobility || terrain.pilotingDiceMobility.includes(mobility);
  const base = applies ? terrain.pilotingDice : 0;
  let value = base;
  if (relation === "favored") value = TERRAIN_AFFINITY_DICE.favored;
  else if (relation === "adverse" || relation === "restricted") value = Math.min(base, TERRAIN_AFFINITY_DICE.adverse);
  if (!value) return null;
  return { function: terrain.diceFunction, value, label: terrain.label, relation, source: "Terrain" };
}

export function getActorTerrainDiceContributions(actor = null) {
  const mobility = getActorTerrainMobility(actor);
  if (!mobility || mobility === FLIGHT_TERRAIN_MOBILITY) return [];
  const occupied = withoutReplaced(Array.from(actor.statuses ?? []).map(getTerrainEntryByStatusId));
  return occupied
    .map(terrain => getTerrainDiceContribution(mobility, terrain))
    .filter(Boolean);
}
