// src/modules/terrain/scene-conditions.js
// Purpose: Typed scene conditions (light, weather, ambient) and how shelter
// suppresses them at a token's position.
// How it fits: The GM picks conditions per scene (Scene Configuration →
// Environment; stored in flags.mwd.sceneConditions). Each condition carries
// typed environmental effect packets: a stacking `group` (environment-dice.js)
// and the `lane` (roll) that consumes it. Shelter comes from Foundry's native
// Region behaviors: an enabled Suppress Weather Region suppresses weather and
// ambient conditions; an overhead Define Surface (a roof) suppresses weather
// only. Light conditions are never suppressed. Conditions are mechanical only
// and independent of Foundry's weather animation.
// See docs/Environment-Catalog.md ("Scene conditions"). Values PROVISIONAL.

import { getActorActiveToken, getTokenCenter, getTokenDocument } from "../utils/token.js";
import { isTokenInRegion } from "../utils/region.js";
import { FLIGHT_TERRAIN_MOBILITY, getActorTerrainMobility } from "./terrain-mobility.js";
import { withoutReplaced } from "./environment-dice.js";

export const SCENE_CONDITION_FLAG = "sceneConditions";

// Lanes: "handling" (Handling dice, consumed by the machine rule state),
// "visual" (visual acquisition and visual/manual attacks), "windSensitiveAttack",
// "energyAttack". Only "handling" is consumed so far; the others await the
// targeting-method and wind-sensitivity work.
const GROUND_MOBILITY = Object.freeze(["walker", "wheeled", "tracked", "hover"]);

function effect(group, lane, value, { mobility = null } = {}) {
  return Object.freeze({ group, lane, value, mobility: mobility ? Object.freeze([...mobility]) : null });
}

const visual = value => effect("visibility", "visual", value);
const traction = value => effect("traction", "handling", value, { mobility: GROUND_MOBILITY });

function condition(id, label, kind, { effects = [], replaces = [] } = {}) {
  return Object.freeze({ id, label, kind, effects: Object.freeze(effects), replaces: Object.freeze([...replaces]) });
}

export const SCENE_CONDITIONS = Object.freeze({
  dusk: condition("dusk", "Dusk / Dawn", "light", { effects: [visual(-1)] }),
  night: condition("night", "Night", "light", { effects: [visual(-2)], replaces: ["dusk"] }),
  rain: condition("rain", "Rain", "weather", { effects: [visual(-1)] }),
  heavyRain: condition("heavyRain", "Heavy Rain", "weather", { effects: [visual(-1), traction(-1)], replaces: ["rain"] }),
  heavySnowfall: condition("heavySnowfall", "Heavy Snowfall", "weather", { effects: [visual(-1), traction(-1)] }),
  denseFog: condition("denseFog", "Dense Fog", "weather", { effects: [visual(-2)] }),
  moderateWind: condition("moderateWind", "Moderate Wind", "weather", {
    effects: [effect("wind", "windSensitiveAttack", -1)],
  }),
  highWind: condition("highWind", "High Wind", "weather", {
    effects: [
      effect("wind", "windSensitiveAttack", -2),
      effect("wind", "handling", -1, { mobility: ["hover", FLIGHT_TERRAIN_MOBILITY] }),
    ],
    replaces: ["moderateWind"],
  }),
  // Compound: replaces its constituents rather than stacking with them.
  blizzard: condition("blizzard", "Blizzard", "weather", {
    effects: [visual(-1), effect("wind", "windSensitiveAttack", -2), traction(-1)],
    replaces: ["heavySnowfall", "highWind", "moderateWind"],
  }),
  blowingSand: condition("blowingSand", "Blowing Sand", "weather", {
    effects: [visual(-1), effect("atmosphere", "energyAttack", -2)],
  }),
  // Heat effect pending (heat-rules lane).
  extremeHeat: condition("extremeHeat", "Extreme Heat", "ambient"),
});

// Which condition kinds each shelter suppresses.
export const SHELTER_SUPPRESSES = Object.freeze({
  suppressWeather: Object.freeze(["weather", "ambient"]),
  overheadSurface: Object.freeze(["weather"]),
});

/**
 * Scene conditions the GM selected. Stored as {id: boolean}; an array of ids is
 * also accepted.
 */
export function getSceneConditions(scene = null) {
  const raw = scene?.flags?.mwd?.[SCENE_CONDITION_FLAG] ?? scene?.getFlag?.("mwd", SCENE_CONDITION_FLAG) ?? null;
  const ids = Array.isArray(raw)
    ? raw
    : Object.entries(raw && typeof raw === "object" ? raw : {}).filter(([, on]) => on === true).map(([id]) => id);
  return withoutReplaced(Array.from(new Set(ids.map(id => String(id ?? "").trim())))
    .filter(id => Object.hasOwn(SCENE_CONDITIONS, id))
    .map(id => SCENE_CONDITIONS[id]));
}

function regionHasEnabledBehavior(region = null, type = "") {
  return Array.from(region?.behaviors ?? []).some(behavior => behavior?.type === type && !behavior?.disabled);
}

function isUnderOverheadSurface(scene = null, token = null) {
  const document = getTokenDocument(token);
  const center = getTokenCenter(token, { scene });
  if (!document || !center) return false;
  const elevation = Number(document.elevation ?? 0) || 0;
  let surfaces = [];
  try {
    surfaces = scene?.getSurfaces?.() ?? [];
  } catch (_error) {
    return false;
  }
  return surfaces.some(surface => {
    if (!(surface.elevation > elevation) || !(surface.move || surface.sight || surface.light)) return false;
    const point = { x: center.x, y: center.y };
    return Boolean(surface.region?.polygonTree?.testPoint?.(point)
      ?? surface.region?.testPoint?.({ ...point, elevation: surface.elevation }));
  });
}

/** Shelter kinds covering a token: "suppressWeather", "overheadSurface". */
export function getTokenShelter(token = null, { scene = null } = {}) {
  const document = getTokenDocument(token);
  const resolvedScene = scene ?? document?.parent ?? null;
  const shelter = new Set();
  for (const region of Array.from(resolvedScene?.regions ?? [])) {
    if (regionHasEnabledBehavior(region, "suppressWeather") && isTokenInRegion(region, token, { scene: resolvedScene })) {
      shelter.add("suppressWeather");
      break;
    }
  }
  if (isUnderOverheadSurface(resolvedScene, token)) shelter.add("overheadSurface");
  return shelter;
}

/** Scene conditions in effect at a token's position, after shelter. */
export function getTokenSceneConditions(token = null, { scene = null } = {}) {
  const document = getTokenDocument(token);
  const resolvedScene = scene ?? document?.parent ?? null;
  const conditions = getSceneConditions(resolvedScene);
  if (!conditions.length) return [];
  const suppressed = new Set([...getTokenShelter(token, { scene: resolvedScene })]
    .flatMap(kind => SHELTER_SUPPRESSES[kind] ?? []));
  return conditions.filter(item => !suppressed.has(item.kind));
}

export function getActorSceneConditions(actor = null) {
  const token = getActorActiveToken(actor) ?? actor?.token ?? null;
  return token ? getTokenSceneConditions(token) : [];
}

/** Handling-lane contributions for the machine rule state (environment-dice.js). */
export function getActorSceneConditionDiceContributions(actor = null) {
  const mobility = getActorTerrainMobility(actor);
  if (!mobility) return [];
  return getActorSceneConditions(actor).flatMap(item => item.effects
    .filter(entry => entry.lane === "handling" && (!entry.mobility || entry.mobility.includes(mobility)))
    .map(entry => ({ function: entry.group, value: entry.value, label: item.label, source: "Scene" })));
}
