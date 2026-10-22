// src/modules/terrain/terrain-catalog.js
// Purpose: Canonical terrain classes and terrain conditions for terrain Regions.
// How it fits: The single source of truth for what a terrain means and how
// strongly: its movement cost multiplier along a path (terrain-mobility.js
// resolves it for Foundry's movement cost system), the Handling dice it costs
// occupants and for which mobility types, how each mobility type relates to it
// (the mobility matrix), and its obscuring value for line of effect.
// See docs/Terrain-Regions.md and docs/Environment-Catalog.md.
// All magnitudes here are PROVISIONAL, pending playtesting.

import { withoutReplaced } from "./environment-dice.js";

// movementCost: path cost multiplier (×1 clear, ×2 difficult, ×3 severe):
//   30 m of ×2 terrain consumes 60 m of allowance.
// category: "base" (one per location) or "condition" (layered on the base).
// hazardous: a control hazard; Careful movement doubles its segment cost.
// pilotingDice: Handling dice (piloting rolls) while occupying; a penalty in
//   the "traction" environment function (environment-dice.js). Terrain is a
//   circumstance: it modifies dice, never a task's DN.
// pilotingDiceMobility: mobility types the dice apply to (null = all).
// obscuring: line-of-effect obscuring value (review #1b; not yet consumed).
// replaces: terrain ids this entry supersedes when both are present (a more
//   severe form; never stacks with it).
function entry(id, label, category, { movementCost = 1, hazardous = false, pilotingDice = 0, pilotingDiceMobility = null, obscuring = 0, replaces = [] } = {}) {
  return Object.freeze({
    id,
    label,
    category,
    statusId: `terrain${id.charAt(0).toUpperCase()}${id.slice(1)}`,
    movementCost,
    hazardous,
    pilotingDice,
    diceFunction: "traction",
    pilotingDiceMobility: pilotingDiceMobility ? Object.freeze([...pilotingDiceMobility]) : null,
    obscuring,
    replaces: Object.freeze([...replaces]),
  });
}

// Base terrain: exactly one per terrain Region.
export const TERRAIN_CLASSES = Object.freeze({
  road: entry("road", "Road", "base"),
  open: entry("open", "Open", "base"),
  rough: entry("rough", "Rough", "base", { movementCost: 2, pilotingDice: -1 }),
  woodsLight: entry("woodsLight", "Light Woods", "base", { movementCost: 2, obscuring: 1 }),
  woodsHeavy: entry("woodsHeavy", "Heavy Woods", "base", { movementCost: 3, pilotingDice: -1, obscuring: 2 }),
  jungleLight: entry("jungleLight", "Light Jungle", "base", { movementCost: 2, pilotingDice: -1, obscuring: 1 }),
  jungle: entry("jungle", "Heavy Jungle", "base", { movementCost: 3, pilotingDice: -1, obscuring: 2 }),
  urban: entry("urban", "Urban", "base", { movementCost: 2 }),
  water: entry("water", "Shallow Water", "base", { movementCost: 2 }),
});

// Conditions layered on the base terrain: any number per terrain Region.
export const TERRAIN_CONDITIONS = Object.freeze({
  mud: entry("mud", "Mud", "condition", { movementCost: 2, hazardous: true, pilotingDice: -1 }),
  deepMud: entry("deepMud", "Deep Mud", "condition", { movementCost: 3, hazardous: true, pilotingDice: -2, replaces: ["mud"] }),
  deepSnow: entry("deepSnow", "Deep Snow", "condition", { movementCost: 2, hazardous: true, pilotingDice: -1 }),
  ice: entry("ice", "Ice", "condition", { hazardous: true, pilotingDice: -1 }),
  sand: entry("sand", "Sand", "condition", { pilotingDice: -1, pilotingDiceMobility: ["wheeled", "tracked"] }),
  swamp: entry("swamp", "Swamp", "condition", { movementCost: 2, hazardous: true, pilotingDice: -1 }),
  rubble: entry("rubble", "Rubble", "condition", { movementCost: 2, pilotingDice: -1 }),
});

export const DEFAULT_TERRAIN_CLASS = "open";

// Mobility matrix (Environment-Catalog §5). Terrain not listed is normal for
// that mobility. The mobility profile decides how strongly terrain affects a
// unit instead of stacking on the terrain's own penalty:
// Dice — favored: the terrain's penalty is ignored and the unit gains the
//   favored bonus; adverse: the stronger of the terrain's penalty and the
//   adverse penalty; restricted: counts as adverse.
// Movement — favored: that terrain's excess cost is ignored; adverse: +1 to its
//   multiplier; restricted: impassable (no traversal capability is modeled).
// Flight mobility (VTOL, drone, aerospace) is unaffected by ground terrain.
export const TERRAIN_MOBILITY_MATRIX = Object.freeze({
  wheeled: Object.freeze({
    road: "favored", open: "favored", rough: "adverse", mud: "adverse", deepMud: "adverse", deepSnow: "adverse", ice: "adverse",
    swamp: "adverse", water: "adverse", woodsHeavy: "restricted", jungle: "restricted", urban: "adverse",
  }),
  tracked: Object.freeze({
    open: "favored", deepSnow: "adverse", ice: "adverse", swamp: "adverse", water: "adverse",
    woodsHeavy: "restricted", jungle: "restricted", urban: "adverse",
  }),
  hover: Object.freeze({
    open: "favored", rough: "adverse", ice: "adverse", swamp: "favored", water: "favored",
    woodsHeavy: "restricted", jungle: "restricted", urban: "adverse",
  }),
  walker: Object.freeze({
    swamp: "adverse", woodsHeavy: "adverse", jungle: "adverse",
  }),
});

export const TERRAIN_AFFINITY_DICE = Object.freeze({ favored: 1, adverse: -1 });

const TERRAIN_BY_STATUS_ID = new Map(
  [...Object.values(TERRAIN_CLASSES), ...Object.values(TERRAIN_CONDITIONS)].map(item => [item.statusId, item]),
);

export function getTerrainEntryByStatusId(statusId = "") {
  return TERRAIN_BY_STATUS_ID.get(String(statusId ?? "").trim()) ?? null;
}

export function getTerrainEntryById(id = "") {
  const key = String(id ?? "").trim();
  return TERRAIN_CLASSES[key] ?? TERRAIN_CONDITIONS[key] ?? null;
}


/**
 * Normalize authored terrain data. Unknown classes fall back to open; unknown
 * conditions, and conditions superseded by another present one, are dropped.
 * @returns {{terrainClass:string, conditions:string[]}|null} null when no terrain is declared.
 */
export function normalizeRegionTerrain(raw = null) {
  if (!raw || typeof raw !== "object") return null;
  const requested = String(raw.terrainClass ?? "").trim();
  const terrainClass = Object.hasOwn(TERRAIN_CLASSES, requested) ? requested : DEFAULT_TERRAIN_CLASS;
  const conditions = Array.from(new Set(
    (Array.isArray(raw.conditions) ? raw.conditions : [])
      .map(value => String(value ?? "").trim())
      .filter(value => Object.hasOwn(TERRAIN_CONDITIONS, value)),
  ));
  return {
    terrainClass,
    conditions: withoutReplaced(conditions.map(id => TERRAIN_CONDITIONS[id])).map(item => item.id),
  };
}

export function getTerrainEntries(terrain = null) {
  const normalized = normalizeRegionTerrain(terrain);
  if (!normalized) return [];
  return [
    TERRAIN_CLASSES[normalized.terrainClass],
    ...normalized.conditions.map(id => TERRAIN_CONDITIONS[id]),
  ];
}

export function getTerrainStatusIds(terrain = null) {
  return getTerrainEntries(terrain).map(item => item.statusId);
}

export function listTerrainStatusEntries() {
  return [...Object.values(TERRAIN_CLASSES), ...Object.values(TERRAIN_CONDITIONS)];
}
