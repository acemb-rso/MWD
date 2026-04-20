// src/modules/mwd/machine-crit-consequences.js
// Purpose: Shared machine-critical consequence metadata and weapon-group scoping.
// How it fits: Keeps crit consequence normalization dependency-free so engine,
// chat, sheets, and crit storage can all share one authority.

import { getMachineHardpointByItemId } from "./machine-hardpoints.js";

function startCase(value = "") {
  return String(value ?? "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function normalizeMachineCritId(value = "") {
  return String(value ?? "").trim();
}

export function normalizeMachineMountLocationFamily(value = "") {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) return "";
  if (["head", "cockpit"].includes(normalized)) return "head";
  if (["arm", "arms", "leftarm", "rightarm", "left-arm", "right-arm"].includes(normalized)) return "arms";
  if (["leg", "legs", "leftleg", "rightleg", "left-leg", "right-leg"].includes(normalized)) return "legs";
  if (["torso", "centertorso", "lefttorso", "righttorso", "center-torso", "left-torso", "right-torso", "core"].includes(normalized)) return "torso";
  if (["turret", "weapon", "weapons"].includes(normalized)) return "turret";
  if (["mobility", "motive", "drive", "wheel", "track", "tracks", "rotor"].includes(normalized)) return "mobility";
  if (["body", "front", "side", "rear"].includes(normalized)) return "body";
  return normalized;
}

export function getConfiguredMachineWeaponGroups(actor = null) {
  const direct = Array.isArray(actor?.system?.weaponGroups) ? actor.system.weaponGroups : [];
  if (direct.length) return direct;
  return Array.isArray(actor?.system?.mwd?.weaponGroupDetails) ? actor.system.mwd.weaponGroupDetails : [];
}

export function getMachineWeaponsForGroup(actor = null, group = null) {
  const weaponIds = asArray(group?.weaponIds).map(normalizeMachineCritId).filter(Boolean);
  if (!weaponIds.length) return asArray(group?.weapons).filter(Boolean);
  return weaponIds
    .map(id => actor?.items?.get?.(id))
    .filter(Boolean);
}

export function isEnergyMachineWeapon(weapon = {}) {
  const system = weapon?.system ?? weapon ?? {};
  const hints = [
    system.damageType,
    system.category,
    system.weaponCategory,
    system.attackType,
  ].map(value => String(value ?? "").trim().toLowerCase()).filter(Boolean);
  const traits = asArray(system.traits).map(value => String(value ?? "").trim().toLowerCase());
  return hints.includes("energy") || traits.includes("energy");
}

export function isBallisticMachineWeapon(weapon = {}) {
  const system = weapon?.system ?? weapon ?? {};
  const hints = [
    system.damageType,
    system.category,
    system.weaponCategory,
    system.attackType,
  ].map(value => String(value ?? "").trim().toLowerCase()).filter(Boolean);
  const traits = asArray(system.traits).map(value => String(value ?? "").trim().toLowerCase());
  return hints.includes("ballistic") || traits.includes("ballistic");
}

function groupMatchesLocationFamily(group = {}, actor = null, locationFamily = "") {
  const family = normalizeMachineMountLocationFamily(locationFamily);
  if (!family) return false;
  return getMachineWeaponsForGroup(actor, group).some(weapon =>
    normalizeMachineMountLocationFamily(getMachineHardpointByItemId(actor, weapon?.id)?.location) === family
  );
}

export function resolveMachineCriticalWeaponScope(actor = null, { statusId = "", locationFamily = "" } = {}) {
  const groups = getConfiguredMachineWeaponGroups(actor);
  if (!groups.length) {
    return {
      weaponGroupId: "",
      weaponGroupName: "",
      weaponIds: [],
      automationMode: "callout",
    };
  }

  const eligible = statusId === "jammedBallistic"
    ? groups.filter(group => getMachineWeaponsForGroup(actor, group).some(isBallisticMachineWeapon))
    : groups;
  if (!eligible.length) {
    return {
      weaponGroupId: "",
      weaponGroupName: "",
      weaponIds: [],
      automationMode: "callout",
    };
  }

  const primary = eligible.find(group => Boolean(group?.isPrimary)) ?? null;
  const scoped = eligible.find(group => groupMatchesLocationFamily(group, actor, locationFamily))
    ?? primary
    ?? eligible[0]
    ?? null;

  return {
    weaponGroupId: normalizeMachineCritId(scoped?.id),
    weaponGroupName: String(scoped?.name ?? "").trim(),
    weaponIds: getMachineWeaponsForGroup(actor, scoped).map(entry => normalizeMachineCritId(entry?.id)).filter(Boolean),
    automationMode: scoped ? "engine" : "callout",
  };
}

export function getMachineCritStatusLabel(crit = {}) {
  const explicit = String(crit?.statusLabel ?? "").trim();
  if (explicit) return explicit;
  const statusId = normalizeMachineCritId(crit?.statusId);
  if (statusId === "staggeredMechanical") return "Staggered";
  if (statusId === "proneMechFall") return "Prone";
  return startCase(statusId || crit?.key || "Critical");
}

export function getMachineCritEffectText(crit = {}) {
  const explicit = String(crit?.effectText ?? "").trim();
  if (explicit) return explicit;

  const key = normalizeMachineCritId(crit?.key);
  const statusId = normalizeMachineCritId(crit?.statusId);
  const groupName = String(crit?.weaponGroupName ?? "").trim();
  const groupSuffix = groupName ? ` (${groupName})` : "";

  if (key === "targetingProcessorLock") return "All fire modes require +1 SA to attack.";
  if (statusId === "staggeredMechanical") return "At the start of activation, immediately spend 1 Simple Action fighting the controls.";
  if (statusId === "stalled") return "-1 Handling and -1 System.";
  if (statusId === "unstable") return "-2 dice to Piloting tests. Each move action is followed by a piloting roll to avoid falling prone.";
  if (statusId === "overheating") return "At the start of the turn, gain 2 Heat.";
  if (statusId === "reactorInstability") return "Energy weapon groups produce +1 Heat and -1 damage.";
  if (statusId === "weaponFailure") return `Weapon group unusable for attacks${groupSuffix}.`;
  if (statusId === "jammedBallistic") return `Ballistic attacks from this weapon group cannot be used${groupSuffix}.`;
  if (statusId === "skidding") return "At the start of the turn, make an immediate full move in the last direction of travel; collision ends the skid and leaves the machine prone.";
  if (statusId === "limping") return "-1 movement and +1 Piloting DN until repaired.";
  if (statusId === "proneMechFall") return "The machine immediately falls prone.";
  if (key === "sensorOverload") return "Contacts are capped at Track until repaired.";
  if (key === "opticsFracture") return "All targets are treated as Obscured until repaired.";
  if (key === "commsSensorSuiteOut") return "No sensor or ECM actions may be taken until repaired.";
  if (key === "balanceTimingFault") return "Movement actions require manual piloting-fall follow-up.";
  if (key === "mobilityOverstress") return "Call out the mobility overstress rider after movement actions.";
  if (key === "legStabilizerDamage") return "Advanced maneuver penalties remain reminder-only for now.";
  return "";
}

export function getMachineCritAutomationMode(crit = {}) {
  const explicit = String(crit?.automationMode ?? "").trim();
  if (explicit === "engine" || explicit === "callout") return explicit;
  const key = normalizeMachineCritId(crit?.key);
  const statusId = normalizeMachineCritId(crit?.statusId);
  if (key === "targetingProcessorLock") return "engine";
  if (["staggeredMechanical", "stalled", "unstable", "overheating", "reactorInstability", "weaponFailure", "jammedBallistic"].includes(statusId)) {
    return "engine";
  }
  return "callout";
}

export function getMachineCritScopeSummary(crit = {}) {
  const groupName = String(crit?.weaponGroupName ?? "").trim();
  if (groupName) return `Weapon Group: ${groupName}`;
  const locationFamily = normalizeMachineMountLocationFamily(crit?.locationFamily);
  if (locationFamily) return `Location: ${startCase(locationFamily)}`;
  return "";
}

export function buildMachineCriticalConsequenceData(actor = null, signal = {}, location = {}) {
  const key = String(signal?.key ?? "").trim();
  const statusId = String(signal?.statusId ?? "").trim();
  const scoped = ["weaponFailure", "jammedBallistic"].includes(statusId)
    ? resolveMachineCriticalWeaponScope(actor, { statusId, locationFamily: location?.locationFamily ?? "" })
    : { weaponGroupId: "", weaponGroupName: "", weaponIds: [], automationMode: "" };

  return {
    statusLabel: String(signal?.statusLabel ?? "").trim() || getMachineCritStatusLabel({ key, statusId }),
    effectText: String(signal?.effectText ?? "").trim() || getMachineCritEffectText({
      key,
      statusId,
      weaponGroupName: scoped.weaponGroupName,
    }),
    automationMode: String(signal?.automationMode ?? "").trim()
      || scoped.automationMode
      || getMachineCritAutomationMode({ key, statusId }),
    weaponGroupId: scoped.weaponGroupId,
    weaponGroupName: scoped.weaponGroupName,
    weaponIds: scoped.weaponIds,
  };
}

export function normalizeMachineCriticalRecord(record = {}, actor = null) {
  const scoped = ["weaponFailure", "jammedBallistic"].includes(String(record?.statusId ?? "").trim())
    && !String(record?.weaponGroupId ?? "").trim()
    ? resolveMachineCriticalWeaponScope(actor, {
      statusId: record?.statusId,
      locationFamily: record?.locationFamily,
    })
    : {
      weaponGroupId: String(record?.weaponGroupId ?? "").trim(),
      weaponGroupName: String(record?.weaponGroupName ?? "").trim(),
      weaponIds: asArray(record?.weaponIds).map(entry => String(entry ?? "").trim()).filter(Boolean),
      automationMode: "",
    };

  return {
    ...record,
    statusLabel: String(record?.statusLabel ?? "").trim() || getMachineCritStatusLabel(record),
    effectText: String(record?.effectText ?? "").trim() || getMachineCritEffectText({
      ...record,
      weaponGroupName: scoped.weaponGroupName,
    }),
    automationMode: String(record?.automationMode ?? "").trim()
      || scoped.automationMode
      || getMachineCritAutomationMode(record),
    weaponGroupId: scoped.weaponGroupId,
    weaponGroupName: scoped.weaponGroupName,
    weaponIds: scoped.weaponIds,
  };
}
