// src/modules/terrain/terrain-regions.js
// Purpose: Reads terrain from GM-authored Regions and turns terrain Regions
// into area-status sources (occupancy, review #1a).
// How it fits: getRegionTerrain is the one adapter for authored terrain data,
// so the rest of the system does not depend on how terrain is authored. The
// area-status controller reconciles the sources produced here like any other,
// projecting terrain statuses onto the machines inside each Region.
// See docs/Terrain-Regions.md.

import { getTerrainStatusIds, normalizeRegionTerrain } from "./terrain-catalog.js";
import { collectionEntries } from "../utils/coercion.js";
import { isTerrainBehaviorType } from "./terrain-region-behavior.js";

export const TERRAIN_REGION_FLAG = "terrain";
export const TERRAIN_REGION_SOURCE_KIND = "region";

/**
 * The terrain a Region declares, or null when it is not a terrain Region.
 * Authored as an enabled Terrain Region Behavior (terrain-region-behavior.js);
 * `flags.mwd.terrain = { terrainClass, conditions }` is the fallback for
 * macros or when the behavior type is unavailable.
 */
export function getRegionTerrain(region = null) {
  const behavior = collectionEntries(region?.behaviors)
    .find(entry => isTerrainBehaviorType(entry?.type) && !entry?.disabled);
  if (behavior) {
    return normalizeRegionTerrain({
      terrainClass: behavior.system?.terrainClass,
      conditions: Array.from(behavior.system?.conditions ?? []),
    });
  }
  const raw = region?.getFlag?.("mwd", TERRAIN_REGION_FLAG) ?? region?.flags?.mwd?.[TERRAIN_REGION_FLAG] ?? null;
  return normalizeRegionTerrain(raw);
}

export function isTerrainRegion(region = null) {
  return getRegionTerrain(region) !== null;
}

export function getTerrainRegions(scene = null) {
  return collectionEntries(scene?.regions).filter(isTerrainRegion);
}

/**
 * Area-status sources for every terrain Region on the scene. Terrain affects
 * every occupant regardless of side (allegiance "any").
 */
export function collectTerrainRegionAreaStatusSources(scene = null) {
  const sceneUuid = String(scene?.uuid ?? "").trim();
  if (!sceneUuid) return [];
  return getTerrainRegions(scene).map(region => {
    const regionUuid = String(region.uuid ?? "").trim();
    return {
      sourceKey: `${sceneUuid}::terrain::${regionUuid}`,
      sceneUuid,
      kind: TERRAIN_REGION_SOURCE_KIND,
      regionUuid,
      label: String(region.name ?? "").trim() || "Terrain",
      allegiance: "any",
      statusIds: getTerrainStatusIds(getRegionTerrain(region)),
      // Flight mobility ignores ground terrain (terrain-mobility.js).
      groundOnly: true,
      active: true,
    };
  }).filter(source => source.regionUuid && source.statusIds.length);
}
