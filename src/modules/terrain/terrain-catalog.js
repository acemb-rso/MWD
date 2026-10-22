// src/modules/terrain/terrain-catalog.js
// Purpose: Canonical terrain classes and terrain conditions for terrain Regions.
// How it fits: The single source of truth for what a terrain means and how
// strongly: the status projected onto occupants (status-modifiers.js generates
// its movement mechanics from these values), the Handling dice it costs and for
// which mobility types, how each mobility type relates to it (the mobility
// matrix), and its obscuring value for line of effect.
// See docs/Terrain-Regions.md and docs/Environment-Catalog.md.
// All magnitudes here are PROVISIONAL, pending playtesting.

// movementPenaltySteps: movement steps lost while occupying (30 m each).
// pilotingDice: Handling dice (piloting rolls) while occupying; a penalty in
//   the "traction" environment function (environment-dice.js). Terrain is a
//   circumstance: it modifies dice, never a task's DN.
// pilotingDiceMobility: mobility types the dice apply to (null = all).
// obscuring: line-of-effect obscuring value (review #1b; not yet consumed).
function entry(id, label, { movementPenaltySteps = 0, pilotingDice = 0, pilotingDiceMobility = null, obscuring = 0 } = {}) {
  return Object.freeze({
    id,
    label,
    statusId: `terrain${id.charAt(0).toUpperCase()}${id.slice(1)}`,
    movementPenaltySteps,
    pilotingDice,
    diceFunction: "traction",
    pilotingDiceMobility: pilotingDiceMobility ? Object.freeze([...pilotingDiceMobility]) : null,
    obscuring,
  });
}

// Base terrain: exactly one per terrain Region.
export const TERRAIN_CLASSES = Object.freeze({
  road: entry("road", "Road"),
  open: entry("open", "Open"),
  rough: entry("rough", "Rough", { movementPenaltySteps: 1, pilotingDice: -1 }),
  woodsLight: entry("woodsLight", "Light Woods", { movementPenaltySteps: 1, obscuring: 1 }),
  woodsHeavy: entry("woodsHeavy", "Heavy Woods", { movementPenaltySteps: 2, pilotingDice: -1, obscuring: 2 }),
  jungleLight: entry("jungleLight", "Light Jungle", { movementPenaltySteps: 1, pilotingDice: -1, obscuring: 1 }),
  jungle: entry("jungle", "Heavy Jungle", { movementPenaltySteps: 2, pilotingDice: -1, obscuring: 2 }),
  urban: entry("urban", "Urban", { movementPenaltySteps: 1 }),
  water: entry("water", "Shallow Water", { movementPenaltySteps: 1 }),
});

// Conditions layered on the base terrain: any number per terrain Region.
export const TERRAIN_CONDITIONS = Object.freeze({
  mud: entry("mud", "Mud", { movementPenaltySteps: 1, pilotingDice: -1 }),
  deepSnow: entry("deepSnow", "Deep Snow", { movementPenaltySteps: 1, pilotingDice: -1 }),
  ice: entry("ice", "Ice", { pilotingDice: -1 }),
  sand: entry("sand", "Sand", { pilotingDice: -1, pilotingDiceMobility: ["wheeled", "tracked"] }),
  swamp: entry("swamp", "Swamp", { movementPenaltySteps: 1, pilotingDice: -1 }),
  rubble: entry("rubble", "Rubble", { movementPenaltySteps: 1, pilotingDice: -1 }),
});

export const DEFAULT_TERRAIN_CLASS = "open";

// Mobility matrix (Environment-Catalog §5). Terrain not listed is normal for
// that mobility. The mobility profile decides how strongly terrain affects a
// unit instead of stacking on the terrain's own penalty:
// favored: the terrain's penalty is ignored and the unit gains the favored
//   bonus; adverse: the stronger of the terrain's penalty and the adverse
//   penalty; restricted: traversal needs a capability (not yet modeled), so it
//   counts as adverse for dice.
// Flight mobility (VTOL, drone, aerospace) is unaffected by ground terrain.
export const TERRAIN_MOBILITY_MATRIX = Object.freeze({
  wheeled: Object.freeze({
    road: "favored", open: "favored", rough: "adverse", mud: "adverse", deepSnow: "adverse", ice: "adverse",
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
 * conditions are dropped.
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
  return { terrainClass, conditions };
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
