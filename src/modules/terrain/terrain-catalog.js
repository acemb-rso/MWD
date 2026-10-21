// src/modules/terrain/terrain-catalog.js
// Purpose: Canonical terrain classes and terrain conditions for terrain Regions.
// How it fits: The single source of truth for what a terrain means and how
// strongly. Each entry names the status projected onto occupants (whose
// mechanics status-modifiers.js generates from these values), its
// vehicle-profile terrain class (favored/adverse affinity), and its obscuring
// value for line of effect. See docs/Terrain-Regions.md.
// All magnitudes here are PROVISIONAL, pending playtesting.

// movementPenaltySteps: movement steps lost while occupying (30 m each).
// pilotingDice: dice added to (negative: removed from) piloting rolls while
// occupying. Terrain is a circumstance: it modifies the dice pool, never the
// task's DN (see docs/MaxTech-Review.md, "Environment modifies, task sets DN").
// obscuring: line-of-effect obscuring value (review #1b; not yet consumed).
function entry(id, label, { vehicleTerrainClass = null, movementPenaltySteps = 0, pilotingDice = 0, obscuring = 0 } = {}) {
  return Object.freeze({
    id,
    label,
    statusId: `terrain${id.charAt(0).toUpperCase()}${id.slice(1)}`,
    vehicleTerrainClass,
    movementPenaltySteps,
    pilotingDice,
    obscuring,
  });
}

// Base terrain: exactly one per terrain Region.
export const TERRAIN_CLASSES = Object.freeze({
  road: entry("road", "Road", { vehicleTerrainClass: "road" }),
  open: entry("open", "Open", { vehicleTerrainClass: "open" }),
  rough: entry("rough", "Rough", { vehicleTerrainClass: "rough", movementPenaltySteps: 1 }),
  woodsLight: entry("woodsLight", "Light Woods", { vehicleTerrainClass: "forest", movementPenaltySteps: 1, obscuring: 1 }),
  woodsHeavy: entry("woodsHeavy", "Heavy Woods", { vehicleTerrainClass: "forest", movementPenaltySteps: 2, pilotingDice: -1, obscuring: 2 }),
  jungle: entry("jungle", "Jungle", { vehicleTerrainClass: "forest", movementPenaltySteps: 2, pilotingDice: -1, obscuring: 2 }),
  urban: entry("urban", "Urban", { vehicleTerrainClass: "urban", movementPenaltySteps: 1 }),
  water: entry("water", "Water", { vehicleTerrainClass: "water", movementPenaltySteps: 1, pilotingDice: -1 }),
});

// Conditions layered on the base terrain: any number per terrain Region.
export const TERRAIN_CONDITIONS = Object.freeze({
  mud: entry("mud", "Mud", { movementPenaltySteps: 1, pilotingDice: -1 }),
  deepSnow: entry("deepSnow", "Deep Snow", { movementPenaltySteps: 1, pilotingDice: -1 }),
  ice: entry("ice", "Ice", { pilotingDice: -2 }),
  sand: entry("sand", "Sand", { pilotingDice: -1 }),
  swamp: entry("swamp", "Swamp", { movementPenaltySteps: 1, pilotingDice: -1 }),
  rubble: entry("rubble", "Rubble", { movementPenaltySteps: 1 }),
});

export const DEFAULT_TERRAIN_CLASS = "open";

// Piloting dice a vehicle gains (favored) or loses (adverse) for each occupied
// terrain matching its profile's favoredTerrain / adverseTerrain.
export const VEHICLE_TERRAIN_AFFINITY_DICE = Object.freeze({ favored: 1, adverse: -1 });

const TERRAIN_BY_STATUS_ID = new Map(
  [...Object.values(TERRAIN_CLASSES), ...Object.values(TERRAIN_CONDITIONS)].map(item => [item.statusId, item]),
);

export function getTerrainEntryByStatusId(statusId = "") {
  return TERRAIN_BY_STATUS_ID.get(String(statusId ?? "").trim()) ?? null;
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
