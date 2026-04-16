// src/modules/mwd/machine-hit-locations.js
// Purpose: Resolves MWD vehicle-scale hit locations from the code-owned 3d6 table.
// How it fits: Attack previews use this before machine damage decides whether a
// hit is descriptive, Chaos-convertible, or an automatic critical.

import { TEMPLATE } from "../constants.js";

const MACHINE_TYPES = new Set([TEMPLATE.actorTypes.vehicle, TEMPLATE.actorTypes.battlemech]);

const LOCATION_LABELS = Object.freeze({
  head: "Head",
  torso: "Torso",
  arms: "Arms",
  legs: "Legs",
  core: "Core",
  front: "Front",
  side: "Side",
  rear: "Rear",
  turret: "Turret",
  rotor: "Rotor",
});

function clampRollTotal(value) {
  const total = Math.trunc(Number(value ?? 0));
  if (!Number.isFinite(total)) return 10;
  return Math.min(18, Math.max(3, total));
}

function actorType(actor = null) {
  return String(actor?.type ?? actor ?? "").trim();
}

function enabledLocationKeys(actor = null) {
  const locations = actor?.system?.mwd?.locations ?? {};
  return Object.entries(locations)
    .filter(([, data]) => data?.enabled !== false)
    .map(([key]) => key);
}

function chooseEnabled(actor, candidates = [], fallback = "core") {
  const enabled = new Set(enabledLocationKeys(actor));
  return candidates.find(key => enabled.has(key)) ?? candidates[0] ?? fallback;
}

function familyForLocation(locationKey = "") {
  if (locationKey === "head") return "head";
  if (locationKey === "arms") return "arms";
  if (locationKey === "legs") return "legs";
  if (["front", "side", "rear", "rotor"].includes(locationKey)) return "motive";
  if (locationKey === "turret") return "weapon";
  if (locationKey === "torso") return "torso";
  return "core";
}

function baseMechLocation(actor, rollTotal) {
  if (rollTotal <= 4) return { locationKey: chooseEnabled(actor, ["torso", "head"]), family: "critical" };
  if (rollTotal === 5) return { locationKey: chooseEnabled(actor, ["legs", "torso"]), family: "legs" };
  if (rollTotal === 6) return { locationKey: chooseEnabled(actor, ["legs", "torso"]), family: "legs" };
  if (rollTotal === 7) return { locationKey: chooseEnabled(actor, ["arms", "torso"]), family: "arms" };
  if (rollTotal === 8) return { locationKey: chooseEnabled(actor, ["arms", "torso"]), family: "arms" };
  if (rollTotal <= 13) return { locationKey: chooseEnabled(actor, ["torso", "head"]), family: "torso" };
  if (rollTotal === 14) return { locationKey: chooseEnabled(actor, ["arms", "torso"]), family: "arms" };
  if (rollTotal === 15) return { locationKey: chooseEnabled(actor, ["arms", "torso"]), family: "arms" };
  if (rollTotal === 16) return { locationKey: chooseEnabled(actor, ["arms", "torso"]), family: "arms" };
  if (rollTotal === 17) return { locationKey: chooseEnabled(actor, ["legs", "torso"]), family: "legs" };
  return { locationKey: chooseEnabled(actor, ["head", "torso"]), family: "head" };
}

function baseVehicleLocation(actor, rollTotal) {
  if (rollTotal <= 4) return { locationKey: chooseEnabled(actor, ["core", "front"]), family: "critical" };
  if (rollTotal === 5) return { locationKey: chooseEnabled(actor, ["front", "core"]), family: "motive" };
  if (rollTotal <= 7) return { locationKey: chooseEnabled(actor, ["side", "front"]), family: "motive" };
  if (rollTotal === 8) return { locationKey: chooseEnabled(actor, ["rear", "side"]), family: "motive" };
  if (rollTotal === 9) return { locationKey: chooseEnabled(actor, ["front", "core"]), family: "motive" };
  if (rollTotal === 10) return { locationKey: chooseEnabled(actor, ["core", "front"]), family: "core" };
  if (rollTotal === 11) return { locationKey: chooseEnabled(actor, ["turret", "core"]), family: "weapon" };
  if (rollTotal === 12) return { locationKey: chooseEnabled(actor, ["side", "front"]), family: "motive" };
  if (rollTotal === 13) return { locationKey: chooseEnabled(actor, ["rear", "side"]), family: "motive" };
  if (rollTotal === 14) return { locationKey: chooseEnabled(actor, ["front", "side"]), family: "motive" };
  if (rollTotal === 15) return { locationKey: chooseEnabled(actor, ["core", "rear"]), family: "core" };
  if (rollTotal === 16) return { locationKey: chooseEnabled(actor, ["turret", "core"]), family: "weapon" };
  if (rollTotal === 17) return { locationKey: chooseEnabled(actor, ["side", "front", "rotor"]), family: "motive" };
  return { locationKey: chooseEnabled(actor, ["core", "front"]), family: "core" };
}

export function getMachineLocationLabel(locationKey = "") {
  return LOCATION_LABELS[locationKey] ?? (String(locationKey ?? "").trim() || "Location");
}

export function isMachineActor(actor = null) {
  return MACHINE_TYPES.has(actorType(actor));
}

export function rollMachineHitLocationTotal() {
  if (typeof Roll === "function") {
    try {
      const roll = new Roll("3d6");
      const evaluated = roll.evaluate({ async: false });
      return Number(evaluated?.total ?? roll.total ?? 10) || 10;
    } catch (_error) {
      // Foundry versions differ on synchronous Roll support; the location helper
      // only needs the total, so a local 3d6 fallback keeps previews reliable.
    }
  }
  return Array.from({ length: 3 }, () => 1 + Math.floor(Math.random() * 6))
    .reduce((sum, value) => sum + value, 0);
}

export function resolveMachineHitLocation({
  actor = null,
  rollTotal = rollMachineHitLocationTotal(),
  armorBefore = 0,
  structureBefore = 0,
} = {}) {
  const type = actorType(actor);
  const total = clampRollTotal(rollTotal);
  const pureStructureHit = Math.max(0, Number(armorBefore ?? 0) || 0) <= 0;
  const base = type === TEMPLATE.actorTypes.battlemech
    ? baseMechLocation(actor, total)
    : baseVehicleLocation(actor, total);

  const forcedCritical = total <= 4;
  const structureCritical = pureStructureHit && total >= 16;
  const automaticCritical = forcedCritical || structureCritical;
  const chaosCriticalOption = !automaticCritical && total >= 16;
  const chaosTargetLocationKey = total === 18 && type === TEMPLATE.actorTypes.battlemech
    ? chooseEnabled(actor, ["torso", "head"])
    : base.locationKey;
  const locationFamily = base.family || familyForLocation(base.locationKey);

  return {
    rollTotal: total,
    actorType: type,
    locationKey: base.locationKey,
    locationLabel: getMachineLocationLabel(base.locationKey),
    locationFamily,
    isForcedCritical: forcedCritical,
    isStructureCritical: structureCritical,
    isAutomaticCritical: automaticCritical,
    chaosCriticalOption,
    chaosTargetLocationKey,
    chaosTargetLocationLabel: getMachineLocationLabel(chaosTargetLocationKey),
    descriptiveOnly: !automaticCritical,
    pureStructureHit,
    armorBefore: Math.max(0, Number(armorBefore ?? 0) || 0),
    structureBefore: Math.max(0, Number(structureBefore ?? 0) || 0),
  };
}
