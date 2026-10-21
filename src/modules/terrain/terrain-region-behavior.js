// src/modules/terrain/terrain-region-behavior.js
// Purpose: Registers the native "Terrain" Region Behavior, so GMs author
// terrain on a Region's Behaviors tab in Foundry's Region config.
// How it fits: The behavior only stores { terrainClass, conditions }; it
// handles no Region events. terrain-regions.js getRegionTerrain reads it, and
// the area-status controller projects the terrain statuses.
// See docs/Terrain-Regions.md.

import { DEFAULT_TERRAIN_CLASS, TERRAIN_CLASSES, TERRAIN_CONDITIONS } from "./terrain-catalog.js";

export const TERRAIN_BEHAVIOR_TYPE = "terrain";
const NAMESPACED_TERRAIN_BEHAVIOR_TYPE = `mwd.${TERRAIN_BEHAVIOR_TYPE}`;

export function isTerrainBehaviorType(type = "") {
  const value = String(type ?? "").trim();
  return value === TERRAIN_BEHAVIOR_TYPE || value === NAMESPACED_TERRAIN_BEHAVIOR_TYPE;
}

/**
 * The type key Foundry generated from system.json documentTypes. Package
 * sub-types may be prefixed with the package id, so use whichever exists
 * rather than assuming.
 */
export function resolveTerrainBehaviorTypeKey(types = []) {
  const available = Array.from(types ?? []).map(value => String(value));
  return available.find(value => value === NAMESPACED_TERRAIN_BEHAVIOR_TYPE)
    ?? available.find(value => value === TERRAIN_BEHAVIOR_TYPE)
    ?? null;
}

const choicesOf = catalog => Object.fromEntries(Object.values(catalog).map(item => [item.id, item.label]));

/**
 * Register the Terrain behavior data model. Called on `init`; returns the
 * registered type key, or null (with a warning) when the API or manifest
 * declaration is unavailable. Never throws, so it cannot break system load.
 */
export function registerTerrainRegionBehavior() {
  try {
    const BaseType = globalThis.foundry?.data?.regionBehaviors?.RegionBehaviorType;
    const fields = globalThis.foundry?.data?.fields;
    const config = globalThis.CONFIG?.RegionBehavior;
    if (!BaseType || !fields || !config) {
      console.warn("MWD | Terrain Region Behavior not registered: Region Behavior API unavailable.");
      return null;
    }
    const key = resolveTerrainBehaviorTypeKey(
      globalThis.foundry?.documents?.BaseRegionBehavior?.TYPES ?? globalThis.game?.documentTypes?.RegionBehavior,
    );
    if (!key) {
      console.warn("MWD | Terrain Region Behavior not registered: no terrain type in system.json documentTypes.");
      return null;
    }

    class TerrainRegionBehaviorType extends BaseType {
      static defineSchema() {
        return {
          events: this._createEventsField({ events: [] }),
          terrainClass: new fields.StringField({
            required: true,
            blank: false,
            initial: DEFAULT_TERRAIN_CLASS,
            choices: choicesOf(TERRAIN_CLASSES),
            label: "Terrain",
            hint: "Base terrain for machines inside this Region.",
          }),
          conditions: new fields.SetField(new fields.StringField({ choices: choicesOf(TERRAIN_CONDITIONS) }), {
            label: "Conditions",
            hint: "Conditions layered on the base terrain.",
          }),
        };
      }
    }

    config.dataModels[key] = TerrainRegionBehaviorType;
    config.typeLabels ??= {};
    config.typeLabels[key] = "Terrain (MWD)";
    config.typeIcons ??= {};
    config.typeIcons[key] = "fa-solid fa-mountain";
    return key;
  } catch (error) {
    console.error("MWD | Terrain Region Behavior registration failed; terrain can still be set through the region flag.", error);
    return null;
  }
}
