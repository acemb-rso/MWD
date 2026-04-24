// src/modules/mwd/machine-hardpoints.js
// Purpose: Shared machine hardpoint normalization and slot-occupancy helpers.
// How it fits: Keeps slot ownership actor-side so sheets, crit logic, and
// loadout validation can all resolve the same mounted-item state.

import { TEMPLATE, startCase } from "../constants.js";

const MACHINE_HARDPOINT_SIZES = Object.freeze(["small", "medium", "large"]);
const ENERGY_HARDPOINT_FAMILY = Object.freeze(new Set(["energy", "thermal", "electrical", "electric"]));


export function normalizeMachineWeaponSize(value, fallback = "small") {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (MACHINE_HARDPOINT_SIZES.includes(normalized)) return normalized;
  return fallback;
}

export function rawHardpointsArray(actor = null) {
  const raw = actor?.system?.mwd?.hardpoints;
  if (!raw) return [];
  return Array.isArray(raw) ? [...raw] : Object.values(raw);
}

export function getConfiguredMachineHardpoints(actor = null) {
  return rawHardpointsArray(actor).map((hardpoint, index) => ({
    id: String(hardpoint?.id ?? `hardpoint-${index + 1}`).trim(),
    type: String(hardpoint?.type ?? "energy").trim() || "energy",
    size: normalizeMachineWeaponSize(hardpoint?.size ?? "small"),
    location: String(hardpoint?.location ?? "").trim(),
    itemId: String(hardpoint?.itemId ?? "").trim(),
  }));
}

export function getMachineHardpointById(actor = null, hardpointId = "") {
  const normalizedId = String(hardpointId ?? "").trim();
  if (!normalizedId) return null;
  return getConfiguredMachineHardpoints(actor).find(hardpoint => hardpoint.id === normalizedId) ?? null;
}

export function getMachineHardpointByItemId(actor = null, itemId = "") {
  const normalizedId = String(itemId ?? "").trim();
  if (!normalizedId) return null;
  return getConfiguredMachineHardpoints(actor).find(hardpoint => hardpoint.itemId === normalizedId) ?? null;
}

export function getAssignedMachineItemIds(actor = null) {
  return new Set(
    getConfiguredMachineHardpoints(actor)
      .map(hardpoint => hardpoint.itemId)
      .filter(Boolean)
  );
}

export function getMountedMachineItems(actor = null, { canonicalType = "" } = {}) {
  const normalizedType = String(canonicalType ?? "").trim();
  const itemMap = new Map(
    Array.from(actor?.items ?? [])
      .map(item => [String(item?.id ?? "").trim(), item])
      .filter(([id, item]) => id && item)
  );
  const seenIds = new Set();

  return getConfiguredMachineHardpoints(actor)
    .map(hardpoint => {
      const itemId = String(hardpoint?.itemId ?? "").trim();
      if (!itemId || seenIds.has(itemId)) return null;
      seenIds.add(itemId);
      return itemMap.get(itemId) ?? null;
    })
    .filter(item => {
      if (!item) return false;
      if (!normalizedType) return true;
      return String(item?.canonicalType ?? item?.type ?? "").trim() === normalizedType;
    });
}

export function getMachineWeaponRequiredType(item = null) {
  return String(item?.system?.damageType ?? "").trim() || "energy";
}

function getMachineHardpointTypeFamily(value = "") {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (ENERGY_HARDPOINT_FAMILY.has(normalized)) return "energy";
  return normalized || "energy";
}

export function getMachineWeaponRequiredSize(item = null) {
  return normalizeMachineWeaponSize(item?.system?.size ?? "small");
}

export function doesHardpointAcceptItem(hardpoint = {}, item = null) {
  const canonicalType = String(item?.canonicalType ?? item?.type ?? "").trim();
  if (canonicalType !== TEMPLATE.itemType.mechWeapon) return false;

  const hardpointType = String(hardpoint?.type ?? "").trim() || "energy";
  const hardpointSize = normalizeMachineWeaponSize(hardpoint?.size ?? "small");
  const requiredType = getMachineWeaponRequiredType(item);
  const requiredSize = getMachineWeaponRequiredSize(item);
  const typeMatches = hardpointType === "omni"
    || getMachineHardpointTypeFamily(hardpointType) === getMachineHardpointTypeFamily(requiredType);

  return typeMatches && hardpointSize === requiredSize;
}

export function getHardpointCompatibilityError(hardpoint = {}, item = null) {
  const canonicalType = String(item?.canonicalType ?? item?.type ?? "").trim();
  if (canonicalType !== TEMPLATE.itemType.mechWeapon) {
    return "Only mech weapons can be mounted in hardpoint slots.";
  }

  const hardpointType = String(hardpoint?.type ?? "").trim() || "energy";
  const hardpointSize = normalizeMachineWeaponSize(hardpoint?.size ?? "small");
  const requiredType = getMachineWeaponRequiredType(item);
  const requiredSize = getMachineWeaponRequiredSize(item);
  const typeMatches = hardpointType === "omni"
    || getMachineHardpointTypeFamily(hardpointType) === getMachineHardpointTypeFamily(requiredType);

  if (!typeMatches) {
    return `${item?.name ?? "That weapon"} is ${startCase(requiredType)} and cannot fit a ${startCase(hardpointType)} slot.`;
  }

  if (hardpointSize !== requiredSize) {
    return `${item?.name ?? "That weapon"} is ${startCase(requiredSize)} and cannot fit a ${startCase(hardpointSize)} slot.`;
  }

  return "";
}
