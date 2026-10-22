// src/modules/terrain/terrain-mobility.js
// Purpose: Resolves how occupied terrain affects a machine through its mobility
// type (Environment-Catalog §5 mobility matrix).
// How it fits: Two outputs. Dice: terrain statuses projected onto occupants
// become function-tagged Handling dice contributions (combined by
// environment-dice.js in the machine rule state). Movement: terrain along a
// path becomes a cost multiplier through the canonical resolver below, used by
// Foundry's movement cost system (terrain-movement-cost.js) and by later
// movement enforcement. Flight ignores ground terrain in both.

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

// ---------------------------------------------------------------------------
// Movement cost: the single canonical resolver for the ruler preview and for
// later enforcement at movement commit.

// Foundry movement actions that do not travel over ground terrain. Jump landing
// and launch hazards belong to the movement-risk procedure, not path cost.
export const NON_GROUND_MOVEMENT_ACTIONS = Object.freeze(["fly", "jump", "blink", "displace"]);

/**
 * How one terrain entry costs movement for a mobility type, as excess over ×1.
 * @returns {{terrainId:string, category:string, excess:number, hazardous:boolean}}
 */
export function getTerrainMovementContribution(mobility = "", terrain = null) {
  if (!terrain) return null;
  const relation = getTerrainMobilityRelation(mobility, terrain.id);
  let excess = Math.max(0, (Number(terrain.movementCost) || 1) - 1);
  if (relation === "favored") excess = 0;
  else if (relation === "adverse") excess += 1;
  else if (relation === "restricted") excess = Infinity;
  return { terrainId: terrain.id, category: terrain.category, excess, hazardous: Boolean(terrain.hazardous) };
}

/**
 * Terrain movement contributions for a moving actor over a set of terrain
 * entries (e.g. one Region's class and conditions). Flight, and movement
 * actions that do not touch the ground, pay no ground terrain cost.
 */
export function getTerrainMovementContributions(actor = null, terrainEntries = [], { action = "walk" } = {}) {
  const mobility = getActorTerrainMobility(actor);
  if (mobility === FLIGHT_TERRAIN_MOBILITY || NON_GROUND_MOVEMENT_ACTIONS.includes(action)) return [];
  // Actors without a terrain mobility (personal scale, for now) pay the
  // terrain's own cost.
  return terrainEntries.map(terrain => getTerrainMovementContribution(mobility ?? "", terrain)).filter(Boolean);
}

/**
 * Compose contributions that apply to one stretch of path:
 * M = 1 + Σ excess, where the same terrain counts once (overlapping Regions
 * describing the same ground), base terrain is one per location (the most
 * costly applies), superseded conditions drop out (Deep Mud replaces Mud), and
 * conditions add. `extraExcess` carries non-MWD cost (e.g. Foundry's Modify
 * Movement Cost difficulty − 1).
 * @returns {{multiplier:number, hazardous:boolean}}
 */
export function resolveTerrainMovementCost(contributions = [], { extraExcess = [] } = {}) {
  const byTerrain = new Map();
  for (const entry of contributions) {
    if (!entry?.terrainId) continue;
    const known = byTerrain.get(entry.terrainId);
    if (!known || entry.excess > known.excess) byTerrain.set(entry.terrainId, entry);
  }
  const unique = [...byTerrain.values()];
  const conditionIds = withoutReplaced(unique
    .filter(entry => entry.category !== "base")
    .map(entry => getTerrainEntryById(entry.terrainId) ?? { id: entry.terrainId, replaces: [] }))
    .map(item => item.id);
  const conditions = unique.filter(entry => entry.category !== "base" && conditionIds.includes(entry.terrainId));
  const baseExcess = Math.max(0, ...unique.filter(entry => entry.category === "base").map(entry => entry.excess));
  const excess = baseExcess
    + conditions.reduce((sum, entry) => sum + entry.excess, 0)
    + extraExcess.reduce((sum, value) => sum + (Number.isNaN(Number(value)) ? 0 : Number(value)), 0);
  return {
    multiplier: 1 + excess,
    hazardous: [...conditions, ...unique.filter(entry => entry.category === "base")].some(entry => entry.hazardous),
  };
}

/**
 * Cost of moving `distance` through resolved terrain. Careful movement doubles
 * the cost of hazardous stretches, after terrain is composed; Reckless pays
 * the normal cost (and the hazard-triggered DN 1 check elsewhere).
 */
export function getTerrainSegmentCost(distance = 0, terrain = null, { careful = false } = {}) {
  const multiplier = terrain?.multiplier ?? 1;
  const carefulFactor = careful && terrain?.hazardous ? 2 : 1;
  return distance * multiplier * carefulFactor;
}
