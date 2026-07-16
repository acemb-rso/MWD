// src/modules/mwd/machine-degradation.js
// Purpose: Central machine degradation state and resolution helpers.
// Workflow: machine damage preview/apply -> stress, shock, reliability, and
// location state updates -> crit/status systems consume normalized consequences.

import { TEMPLATE } from "../core/constants.js";
import { toNumber } from "../utils/coercion.js";
import { cloneValue } from "../utils/clone.js";

export const MACHINE_CONDITION_STAGES = Object.freeze({
  intact: 0,
  impaired: 1,
  damaged: 2,
  crippled: 3,
  disabled: 4,
});

export const MACHINE_CONDITION_LABELS = Object.freeze({
  [MACHINE_CONDITION_STAGES.intact]: "Intact",
  [MACHINE_CONDITION_STAGES.impaired]: "Impaired",
  [MACHINE_CONDITION_STAGES.damaged]: "Damaged",
  [MACHINE_CONDITION_STAGES.crippled]: "Crippled",
  [MACHINE_CONDITION_STAGES.disabled]: "Disabled",
});

export const MACHINE_CONDITION_MODIFIERS = Object.freeze({
  [MACHINE_CONDITION_STAGES.intact]: 0,
  [MACHINE_CONDITION_STAGES.impaired]: 1,
  [MACHINE_CONDITION_STAGES.damaged]: 2,
  [MACHINE_CONDITION_STAGES.crippled]: 3,
  [MACHINE_CONDITION_STAGES.disabled]: 4,
});

export const MACHINE_RELIABILITY_THRESHOLDS = Object.freeze({
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 6,
  5: 8,
});

const MECH_LOCATION_PRIORITY = Object.freeze([
  "head",
  "torso",
  "arms",
  "legs",
]);

const VEHICLE_LOCATION_PRIORITY = Object.freeze([
  "body",
  "turret",
  "mobility",
]);

const DEFAULT_MECH_LOCATIONS = Object.freeze({
  head: Object.freeze({ enabled: true, stress: 0, condition: 0, tags: ["cockpit", "sensor"], destroyed: false }),
  torso: Object.freeze({ enabled: true, stress: 0, condition: 0, tags: ["weaponGroup", "engine", "gyro", "ammoStore"], destroyed: false }),
  arms: Object.freeze({ enabled: true, stress: 0, condition: 0, tags: ["weaponGroup"], destroyed: false }),
  legs: Object.freeze({ enabled: true, stress: 0, condition: 0, tags: ["motiveSystem"], destroyed: false }),
});

const DEFAULT_VEHICLE_LOCATIONS = Object.freeze({
  body: Object.freeze({ enabled: true, stress: 0, condition: 0, tags: ["crewCompartment", "engine", "ammoStore"], destroyed: false }),
  turret: Object.freeze({ enabled: true, stress: 0, condition: 0, tags: ["turret", "weaponGroup"], destroyed: false }),
  mobility: Object.freeze({ enabled: true, stress: 0, condition: 0, tags: ["motiveSystem", "rotor"], destroyed: false }),
});

const CATASTROPHIC_FALLBACKS = Object.freeze({
  [TEMPLATE.actorTypes.battlemech]: Object.freeze({
    head: Object.freeze({ type: "cockpitCatastrophe", destroyed: true, statusState: "destroyed" }),
    torso: Object.freeze({ type: "torsoCollapse", destroyed: true, statusState: "destroyed" }),
    arms: Object.freeze({ type: "armSystemCollapse", destroyed: true, statusState: "" }),
    legs: Object.freeze({ type: "legCollapse", destroyed: true, statusState: "immobilized" }),
  }),
  [TEMPLATE.actorTypes.vehicle]: Object.freeze({
    body: Object.freeze({ type: "hullCollapse", destroyed: true, statusState: "destroyed" }),
    turret: Object.freeze({ type: "turretDestroyed", destroyed: true, statusState: "" }),
    mobility: Object.freeze({ type: "mobilityCollapse", destroyed: true, statusState: "immobilized" }),
  }),
});

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getActorType(actorOrType = null) {
  const type = String(actorOrType?.type ?? actorOrType ?? "").trim();
  if (type === TEMPLATE.actorTypes.battlemech || type === "mech") return TEMPLATE.actorTypes.battlemech;
  return TEMPLATE.actorTypes.vehicle;
}

function getDefaultLocationConfig(actorType = TEMPLATE.actorTypes.vehicle) {
  return actorType === TEMPLATE.actorTypes.battlemech ? DEFAULT_MECH_LOCATIONS : DEFAULT_VEHICLE_LOCATIONS;
}

function getLocationOrder(actorType = TEMPLATE.actorTypes.vehicle) {
  return actorType === TEMPLATE.actorTypes.battlemech ? MECH_LOCATION_PRIORITY : VEHICLE_LOCATION_PRIORITY;
}

function getConditionStage(value = 0) {
  return clamp(Math.trunc(toNumber(value, 0)), 0, MACHINE_CONDITION_STAGES.disabled);
}

function ensureLocationState(source = {}, defaults = {}) {
  // Degradation locations are persisted as durable machine state, so normalize
  // authored partials and legacy records into the full condition/stress shape.
  return {
    enabled: source?.enabled !== undefined ? Boolean(source.enabled) : Boolean(defaults.enabled),
    stress: Math.max(0, toNumber(source?.stress ?? defaults?.stress, 0)),
    condition: getConditionStage(source?.condition ?? defaults?.condition ?? 0),
    tags: Array.isArray(source?.tags) ? source.tags.slice() : (Array.isArray(defaults?.tags) ? defaults.tags.slice() : []),
    destroyed: Boolean(source?.destroyed ?? defaults?.destroyed),
  };
}

function mergeLegacyMechLocations(locations = {}) {
  // Older BattleMech data used side-specific limbs and torso sections. The MWD
  // machine rules now operate on four broad locations, so fold them together.
  const groups = {
    head: ["head"],
    torso: ["torso", "torsoFront", "torsoRear", "core"],
    arms: ["arms", "leftArm", "rightArm"],
    legs: ["legs", "leftLeg", "rightLeg"],
  };

  const merged = {};
  for (const [targetKey, sourceKeys] of Object.entries(groups)) {
    const sourceEntries = sourceKeys
      .map(key => [key, locations?.[key]])
      .filter(([, value]) => value && typeof value === "object");
    if (!sourceEntries.length) continue;

    const stress = sourceEntries.reduce((total, [, value]) => total + Math.max(0, toNumber(value?.stress, 0)), 0);
    const condition = sourceEntries.reduce((max, [, value]) => Math.max(max, getConditionStage(value?.condition)), 0);
    const enabled = sourceEntries.some(([, value]) => value?.enabled !== false);
    const destroyed = sourceEntries.some(([, value]) => value?.destroyed === true);
    const tags = Array.from(new Set(sourceEntries.flatMap(([, value]) => Array.isArray(value?.tags) ? value.tags : [])));

    merged[targetKey] = {
      enabled,
      stress,
      condition,
      destroyed,
      tags,
    };
  }

  for (const [key, value] of Object.entries(locations ?? {})) {
    if (Object.hasOwn(merged, key)) continue;
    if (["torsoFront", "torsoRear", "core", "leftArm", "rightArm", "leftLeg", "rightLeg"].includes(key)) continue;
    merged[key] = value;
  }

  return merged;
}

function mergeLegacyVehicleLocations(locations = {}) {
  // Vehicle saves may still contain directional armor locations. Collapse those
  // into body/turret/mobility so degradation and critical tables share keys.
  const groups = {
    body: ["body", "core", "front"],
    turret: ["turret"],
    mobility: ["mobility", "side", "rear", "rotor"],
  };

  const merged = {};
  for (const [targetKey, sourceKeys] of Object.entries(groups)) {
    const sourceEntries = sourceKeys
      .map(key => [key, locations?.[key]])
      .filter(([, value]) => value && typeof value === "object");
    if (!sourceEntries.length) continue;

    const stress = sourceEntries.reduce((total, [, value]) => total + Math.max(0, toNumber(value?.stress, 0)), 0);
    const condition = sourceEntries.reduce((max, [, value]) => Math.max(max, getConditionStage(value?.condition)), 0);
    const enabled = sourceEntries.some(([, value]) => value?.enabled !== false);
    const destroyed = sourceEntries.some(([, value]) => value?.destroyed === true);
    const tags = Array.from(new Set(sourceEntries.flatMap(([, value]) => Array.isArray(value?.tags) ? value.tags : [])));

    merged[targetKey] = {
      enabled,
      stress,
      condition,
      destroyed,
      tags,
    };
  }

  for (const [key, value] of Object.entries(locations ?? {})) {
    if (Object.hasOwn(merged, key)) continue;
    if (["core", "front", "side", "rear", "rotor"].includes(key)) continue;
    merged[key] = value;
  }

  return merged;
}

function normalizeLocations(locations = {}, actorType = TEMPLATE.actorTypes.vehicle) {
  // Always include the default locations for the actor type, then preserve any
  // custom locations after they have been put into the same normalized shape.
  const defaults = getDefaultLocationConfig(actorType);
  const sourceLocations = actorType === TEMPLATE.actorTypes.battlemech
    ? mergeLegacyMechLocations(locations ?? {})
    : mergeLegacyVehicleLocations(locations ?? {});
  const normalized = {};

  for (const [key, data] of Object.entries(defaults)) {
    normalized[key] = ensureLocationState(sourceLocations?.[key] ?? {}, data);
  }

  for (const [key, data] of Object.entries(sourceLocations ?? {})) {
    if (normalized[key]) continue;
    normalized[key] = ensureLocationState(data, {});
  }

  return normalized;
}

function initializeMwdBlock(systemData = {}, actorType = TEMPLATE.actorTypes.vehicle) {
  const mwd = systemData.mwd = systemData.mwd ?? {};
  mwd.unitType = String(mwd.unitType ?? (actorType === TEMPLATE.actorTypes.battlemech ? "mech" : "vehicle")).trim()
    || (actorType === TEMPLATE.actorTypes.battlemech ? "mech" : "vehicle");
  mwd.status = mwd.status ?? { state: "operational", reasons: [] };
  mwd.crits = Array.isArray(mwd.crits) ? mwd.crits : [];
  return mwd;
}

function getStructureRemaining(systemData = {}) {
  const structure = systemData?.monitors?.structure ?? {};
  const max = Math.max(0, toNumber(structure?.max, 0));
  if (max <= 0) return null;
  return clamp(toNumber(structure?.value, 0), 0, max);
}

function applyVehicleStructureZeroLocationDisable(systemData = {}, actorType = TEMPLATE.actorTypes.vehicle) {
  if (getActorType(actorType) !== TEMPLATE.actorTypes.vehicle) return systemData;
  if ((getStructureRemaining(systemData) ?? 1) > 0) return systemData;

  const locations = systemData?.mwd?.locations ?? {};
  for (const location of Object.values(locations)) {
    if (!location || location.enabled !== true) continue;
    location.condition = MACHINE_CONDITION_STAGES.disabled;
  }
  return systemData;
}

function resolveReliabilityValue(systemData = {}) {
  const attributes = systemData.attributes = systemData.attributes ?? {};
  const reliability = attributes.reliability?.value;
  const condition = attributes.condition?.value;
  return Math.max(0, toNumber(reliability ?? condition, 0));
}

function shouldSpendForOpportunity(selections = [], opportunityIndex = -1) {
  if (!Array.isArray(selections) || opportunityIndex < 0) return false;
  return selections.some(value => Math.trunc(toNumber(value, -1)) === opportunityIndex);
}

function addStressDelta(result, locationKey, delta) {
  if (!locationKey || !Number.isFinite(delta) || delta === 0) return;
  result.stressDelta[locationKey] = Number(result.stressDelta[locationKey] ?? 0) + delta;
}

export function getMachineAttackQualityShockGain(attackQuality = "") {
  const quality = String(attackQuality ?? "").trim();
  if (quality === "highMargin") return 3;
  if (quality === "hit") return 2;
  if (quality === "graze") return 1;
  return 0;
}

function compareLocationCandidates(left, right, actorType, preferredLocationKey = "") {
  if (right.stress !== left.stress) return right.stress - left.stress;
  if (right.condition !== left.condition) return right.condition - left.condition;
  if (left.condition >= MACHINE_CONDITION_STAGES.disabled && right.condition < MACHINE_CONDITION_STAGES.disabled) return 1;
  if (right.condition >= MACHINE_CONDITION_STAGES.disabled && left.condition < MACHINE_CONDITION_STAGES.disabled) return -1;

  const preferred = String(preferredLocationKey ?? "").trim();
  if (preferred) {
    const leftPreferred = left.key === preferred;
    const rightPreferred = right.key === preferred;
    if (leftPreferred !== rightPreferred) return leftPreferred ? -1 : 1;
  }

  const priority = getLocationOrder(actorType);
  const leftIndex = priority.indexOf(left.key);
  const rightIndex = priority.indexOf(right.key);
  if (leftIndex !== rightIndex) {
    const safeLeft = leftIndex >= 0 ? leftIndex : Number.MAX_SAFE_INTEGER;
    const safeRight = rightIndex >= 0 ? rightIndex : Number.MAX_SAFE_INTEGER;
    return safeLeft - safeRight;
  }

  return String(left.key).localeCompare(String(right.key));
}

function collectLocationCandidates(locations = {}, actorType = TEMPLATE.actorTypes.vehicle, preferredLocationKey = "") {
  return Object.entries(locations)
    .filter(([, location]) => location && location.enabled === true && location.destroyed !== true)
    .map(([key, location]) => ({
      key,
      stress: Math.max(0, toNumber(location?.stress, 0)),
      condition: getConditionStage(location?.condition),
    }))
    .sort((left, right) => compareLocationCandidates(left, right, actorType, preferredLocationKey));
}

function resolveLocationSelection(locations = {}, actorType = TEMPLATE.actorTypes.vehicle, preferredLocationKey = "", { forcePreferred = true } = {}) {
  const preferred = String(preferredLocationKey ?? "").trim();
  if (preferred && forcePreferred) {
    const location = locations?.[preferred];
    if (location && location.enabled === true && location.destroyed !== true) return preferred;
  }
  return collectLocationCandidates(locations, actorType, preferred)[0]?.key ?? "";
}

function registerFallbackMutations(result, event, locationKey, locations) {
  if (!locationKey || !event) return;
  result.fallbackEvents.push({
    location: locationKey,
    type: event.type,
    destroyed: Boolean(event.destroyed),
    statusState: String(event.statusState ?? "").trim(),
  });
  if (event.destroyed) {
    locations[locationKey].destroyed = true;
  }
  if (event.statusState) {
    result.statusState = event.statusState;
  }
}

function applyAdvancementReductions({ result, locations, locationKey, reliability, threshold, currentShock }) {
  const reduction = Math.max(0, reliability);
  const beforeStress = Math.max(0, toNumber(locations?.[locationKey]?.stress, 0));
  const afterStress = Math.max(0, beforeStress - reduction);
  locations[locationKey].stress = afterStress;
  addStressDelta(result, locationKey, afterStress - beforeStress);
  return Math.max(0, currentShock - Math.max(1, threshold));
}

function createResultSkeleton({ locations = {}, shockBefore = 0, shockGain = 0, threshold = 1, reliability = 0, spendableBefore = 0 } = {}) {
  return {
    stressDelta: {},
    shockDelta: 0,
    conditionAdvancements: [],
    reliabilitySpends: [],
    fallbackEvents: [],
    spendOpportunities: [],
    statusState: "",
    summary: {
      shockBefore,
      shockGain,
      shockAfter: shockBefore + shockGain,
      threshold,
      reliability,
      reliabilitySpendableBefore: spendableBefore,
      reliabilitySpendableAfter: spendableBefore,
      selectedLocations: [],
      locationsBefore: cloneValue(locations, null),
      locationsAfter: null,
    },
  };
}

function normalizeDirectConditionEvent(entry, fallbackSource = "critical") {
  if (typeof entry === "string") {
    const locationKey = String(entry ?? "").trim();
    return locationKey
      ? { locationKey, source: fallbackSource, applyReductions: true, allowSpend: true }
      : null;
  }

  if (!entry || typeof entry !== "object") return null;
  const locationKey = String(entry.locationKey ?? entry.location ?? "").trim();
  if (!locationKey) return null;
  return {
    locationKey,
    source: String(entry.source ?? fallbackSource).trim() || fallbackSource,
    applyReductions: entry.applyReductions !== false,
    allowSpend: entry.allowSpend !== false,
  };
}

export function getMachineReliabilityThreshold(value = 0) {
  const rating = clamp(Math.trunc(toNumber(value, 0)), 0, 5);
  return Math.max(1, Number(MACHINE_RELIABILITY_THRESHOLDS[rating] ?? 1));
}

export function getMachineConditionLabel(value = 0) {
  return MACHINE_CONDITION_LABELS[getConditionStage(value)] ?? MACHINE_CONDITION_LABELS[0];
}

export function getMachineConditionModifier(value = 0) {
  return MACHINE_CONDITION_MODIFIERS[getConditionStage(value)] ?? 0;
}

export function getMachineDegradationLocationPriority(actorType = TEMPLATE.actorTypes.vehicle) {
  return getLocationOrder(getActorType(actorType)).slice();
}

export function getMachineDefaultLocations(actorType = TEMPLATE.actorTypes.vehicle) {
  return cloneValue(getDefaultLocationConfig(getActorType(actorType)), null);
}

export function normalizeMachineDegradationState(systemData = {}, actorType = TEMPLATE.actorTypes.vehicle) {
  const resolvedActorType = getActorType(actorType);
  const attributes = systemData.attributes = systemData.attributes ?? {};
  const reliabilityValue = resolveReliabilityValue(systemData);

  attributes.reliability = attributes.reliability ?? {};
  attributes.reliability.value = reliabilityValue;

  // Temporary compatibility alias during migration stabilization.
  attributes.condition = attributes.condition ?? {};
  attributes.condition.value = Math.max(0, toNumber(attributes.condition?.value ?? reliabilityValue, reliabilityValue));

  const mwd = initializeMwdBlock(systemData, resolvedActorType);
  mwd.shock = mwd.shock ?? {};
  mwd.shock.value = Math.max(0, toNumber(mwd.shock?.value, 0));

  mwd.reliabilitySpendable = mwd.reliabilitySpendable ?? {};
  const spendableSource = mwd.reliabilitySpendable?.value;
  mwd.reliabilitySpendable.value = Math.max(0, toNumber(spendableSource ?? reliabilityValue, reliabilityValue));

  mwd.locations = normalizeLocations(mwd.locations ?? {}, resolvedActorType);
  applyVehicleStructureZeroLocationDisable(systemData, resolvedActorType);
  return systemData;
}

export function buildVehicleStructureZeroDisableUpdates(actor = null, structureRemaining = null) {
  const actorType = getActorType(actor);
  if (actorType !== TEMPLATE.actorTypes.vehicle) return {};

  const systemData = normalizeMachineDegradationState(cloneValue(actor?.system ?? {}, null), actorType);
  const remaining = Number.isFinite(Number(structureRemaining))
    ? Math.max(0, Number(structureRemaining))
    : getStructureRemaining(systemData);
  if (remaining === null || remaining > 0) return {};

  const updates = {};
  for (const [locationKey, location] of Object.entries(systemData.mwd?.locations ?? {})) {
    if (!location || location.enabled !== true) continue;
    updates[`system.mwd.locations.${locationKey}.condition`] = MACHINE_CONDITION_STAGES.disabled;
  }
  return updates;
}

export function resolveCatastrophicFallback({ actorSnapshot = null, unitType = "", locationKey = "" } = {}) {
  const actorType = getActorType(unitType || actorSnapshot?.type || actorSnapshot?.actorType);
  const key = String(locationKey ?? "").trim();
  const fallback = CATASTROPHIC_FALLBACKS[actorType]?.[key] ?? {
    type: "catastrophicFailure",
    destroyed: true,
    statusState: "",
  };
  return {
    location: key,
    type: fallback.type,
    destroyed: Boolean(fallback.destroyed),
    statusState: String(fallback.statusState ?? "").trim(),
  };
}

export function resolveMachineDegradation({
  actorSnapshot = null,
  locationKey = "",
  machineDamageDealt = 0,
  attackQuality = "",
  shockGainOverride = null,
  extraShockGain = 0,
  allowReliabilitySpend = false,
  reliabilitySpendSelections = [],
  directConditionLocations = [],
  maxIterations = 10,
} = {}) {
  const snapshot = cloneValue(actorSnapshot ?? {}, null);
  const actorType = getActorType(snapshot?.type ?? snapshot?.actorType);
  const systemData = normalizeMachineDegradationState(snapshot.system ?? {}, actorType);
  const locations = cloneValue(systemData.mwd?.locations ?? {}, null);
  const reliability = Math.max(0, toNumber(systemData.attributes?.reliability?.value, 0));
  let spendable = Math.max(0, toNumber(systemData.mwd?.reliabilitySpendable?.value, reliability));
  const threshold = getMachineReliabilityThreshold(reliability);
  const stressGain = Math.max(0, toNumber(machineDamageDealt, 0));
  const initialShock = Math.max(0, toNumber(systemData.mwd?.shock?.value, 0));
  const baseShockGain = shockGainOverride !== null && shockGainOverride !== undefined && Number.isFinite(Number(shockGainOverride))
    ? Math.max(0, toNumber(shockGainOverride, 0))
    : (stressGain > 0 ? getMachineAttackQualityShockGain(attackQuality) : 0);
  const shockGain = Math.max(0, baseShockGain + Math.max(0, toNumber(extraShockGain, 0)));
  let workingShock = Math.max(0, initialShock + shockGain);
  const result = createResultSkeleton({
    locations,
    shockBefore: initialShock,
    shockGain,
    threshold,
    reliability,
    spendableBefore: spendable,
  });

  const selectedLocationKey = String(locationKey ?? "").trim();
  if (selectedLocationKey && locations[selectedLocationKey] && stressGain > 0) {
    const beforeStress = Math.max(0, toNumber(locations[selectedLocationKey]?.stress, 0));
    const afterStress = beforeStress + stressGain;
    locations[selectedLocationKey].stress = afterStress;
    addStressDelta(result, selectedLocationKey, stressGain);
  }

  let opportunityIndex = 0;
  let iterations = 0;
  const processAdvancement = ({
    forcedLocationKey = "",
    source = "shock",
    applyReductions = true,
    allowSpendForThisAdvancement = true,
  } = {}) => {
    const chosenLocation = resolveLocationSelection(locations, actorType, forcedLocationKey || selectedLocationKey, {
      forcePreferred: Boolean(forcedLocationKey),
    });
    if (!chosenLocation) return false;

    const location = locations[chosenLocation];
    result.summary.selectedLocations.push({ source, location: chosenLocation });

    const canSpend = Boolean(allowReliabilitySpend) && Boolean(allowSpendForThisAdvancement) && spendable > 0;
    const shouldSpend = canSpend && shouldSpendForOpportunity(reliabilitySpendSelections, opportunityIndex);
    result.spendOpportunities.push({
      index: opportunityIndex,
      location: chosenLocation,
      source,
      canSpend,
      selected: shouldSpend,
    });
    opportunityIndex += 1;

    if (shouldSpend) {
      spendable = Math.max(0, spendable - 1);
      result.reliabilitySpends.push({ location: chosenLocation, prevented: true, source });
    } else {
      const from = getConditionStage(location.condition);
      if (from >= MACHINE_CONDITION_STAGES.disabled) {
        registerFallbackMutations(
          result,
          resolveCatastrophicFallback({ actorSnapshot: snapshot, unitType: actorType, locationKey: chosenLocation }),
          chosenLocation,
          locations,
        );
      } else {
        const to = getConditionStage(from + 1);
        locations[chosenLocation].condition = to;
        result.conditionAdvancements.push({ location: chosenLocation, from, to, source });
      }
    }

    if (applyReductions) {
      workingShock = applyAdvancementReductions({
        result,
        locations,
        locationKey: chosenLocation,
        reliability,
        threshold,
        currentShock: workingShock,
      });
      workingShock = Math.max(0, workingShock);
    }
    return true;
  };

  while (workingShock >= threshold && iterations < Math.max(1, Math.trunc(toNumber(maxIterations, 10)))) {
    const processed = processAdvancement({ source: "shock" });
    iterations += 1;
    if (!processed) break;
  }

  if (iterations >= Math.max(1, Math.trunc(toNumber(maxIterations, 10))) && workingShock >= threshold) {
    result.loopGuardTriggered = true;
  }

  for (const entry of Array.isArray(directConditionLocations) ? directConditionLocations : []) {
    const event = normalizeDirectConditionEvent(entry, "critical");
    if (!event) continue;
    processAdvancement({
      forcedLocationKey: event.locationKey,
      source: event.source,
      applyReductions: event.applyReductions,
      allowSpendForThisAdvancement: event.allowSpend,
    });
  }

  result.shockDelta = Math.max(0, workingShock) - initialShock;
  result.summary.shockAfter = Math.max(0, workingShock);
  result.summary.reliabilitySpendableAfter = spendable;
  result.summary.locationsAfter = cloneValue(locations, null);
  return result;
}

export function buildMachineDegradationUpdates(actor = null, degradation = null) {
  if (!actor || !degradation) return {};

  const actorType = getActorType(actor);
  const systemData = normalizeMachineDegradationState(cloneValue(actor.system ?? {}, null), actorType);
  const locations = cloneValue(systemData.mwd?.locations ?? {}, null);
  const updates = {};

  for (const [locationKey, delta] of Object.entries(degradation.stressDelta ?? {})) {
    const location = locations[locationKey];
    if (!location) continue;
    location.stress = Math.max(0, Math.max(0, toNumber(location.stress, 0)) + toNumber(delta, 0));
    updates[`system.mwd.locations.${locationKey}.stress`] = location.stress;
  }

  for (const advancement of Array.from(degradation.conditionAdvancements ?? [])) {
    const locationKey = String(advancement?.location ?? "").trim();
    const location = locations[locationKey];
    if (!location) continue;
    location.condition = getConditionStage(advancement?.to ?? location.condition);
    updates[`system.mwd.locations.${locationKey}.condition`] = location.condition;
  }

  for (const event of Array.from(degradation.fallbackEvents ?? [])) {
    const locationKey = String(event?.location ?? "").trim();
    const location = locations[locationKey];
    if (!location) continue;
    if (event.destroyed) {
      location.destroyed = true;
      updates[`system.mwd.locations.${locationKey}.destroyed`] = true;
    }
  }

  const reliabilitySpendCount = Array.isArray(degradation.reliabilitySpends) ? degradation.reliabilitySpends.length : 0;
  const currentSpendable = Math.max(0, toNumber(systemData.mwd?.reliabilitySpendable?.value, 0));
  updates["system.mwd.reliabilitySpendable.value"] = Math.max(0, currentSpendable - reliabilitySpendCount);
  updates["system.mwd.shock.value"] = Math.max(0, toNumber(systemData.mwd?.shock?.value, 0) + toNumber(degradation.shockDelta, 0));
  Object.assign(updates, buildVehicleStructureZeroDisableUpdates(actor));

  if (degradation.statusState) {
    updates["system.mwd.status.state"] = degradation.statusState;
  }

  return updates;
}
