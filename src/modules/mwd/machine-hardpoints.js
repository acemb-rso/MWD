// src/modules/mwd/machine-hardpoints.js
// Purpose: Shared machine hardpoint normalization and slot-occupancy helpers.
// How it fits: Keeps slot ownership actor-side so sheets, crit logic, and
// loadout validation can all resolve the same mounted-item state.

import { TEMPLATE, startCase } from "../constants.js";
import {
  normalizeMachineHardpointType,
  normalizeMachineWeaponDamageType,
} from "./machine-weapon-types.js";

const MACHINE_HARDPOINT_SIZES = Object.freeze(["small", "medium", "large"]);
const DEFAULT_MACHINE_HARDPOINT = Object.freeze({
  type: "energy",
  size: "small",
  location: "",
  itemId: "",
});


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

export function normalizeMachineHardpoints(rawHardpoints = [], { defaultLocation = "", idFactory = null } = {}) {
  const raw = Array.isArray(rawHardpoints) ? rawHardpoints : Object.values(rawHardpoints && typeof rawHardpoints === "object" ? rawHardpoints : {});
  return raw.map((hardpoint, index) => ({
    id: String(hardpoint?.id ?? `hardpoint-${index + 1}`).trim(),
    type: normalizeMachineHardpointType(hardpoint?.type ?? DEFAULT_MACHINE_HARDPOINT.type, DEFAULT_MACHINE_HARDPOINT.type),
    size: normalizeMachineWeaponSize(hardpoint?.size ?? DEFAULT_MACHINE_HARDPOINT.size),
    location: String(hardpoint?.location ?? defaultLocation ?? DEFAULT_MACHINE_HARDPOINT.location).trim(),
    itemId: String(hardpoint?.itemId ?? DEFAULT_MACHINE_HARDPOINT.itemId).trim(),
  })).map((hardpoint, index) => ({
    ...hardpoint,
    id: hardpoint.id || (typeof idFactory === "function" ? idFactory(index) : `hardpoint-${index + 1}`),
  }));
}

export function getConfiguredMachineHardpoints(actor = null) {
  return normalizeMachineHardpoints(rawHardpointsArray(actor));
}

export function reconcileMachineHardpoints(currentRaw = [], stagedRaw = [], { defaultLocation = "" } = {}) {
  const current = normalizeMachineHardpoints(currentRaw, { defaultLocation });
  const stagedById = new Map(
    normalizeMachineHardpoints(stagedRaw, { defaultLocation })
      .map(hardpoint => [hardpoint.id, hardpoint])
      .filter(([id]) => id)
  );

  return current.map(hardpoint => {
    const staged = stagedById.get(hardpoint.id);
    if (!staged) return hardpoint;
    return {
      ...hardpoint,
      type: normalizeMachineHardpointType(staged.type, hardpoint.type),
      size: staged.size,
      location: staged.location || defaultLocation,
      itemId: hardpoint.itemId,
    };
  });
}

export function appendMachineHardpoint(currentRaw = [], hardpoint = {}, { defaultLocation = "", idFactory = null } = {}) {
  const current = normalizeMachineHardpoints(currentRaw, { defaultLocation });
  const nextId = String(hardpoint?.id ?? "").trim()
    || (typeof idFactory === "function" ? idFactory(current.length) : `hardpoint-${current.length + 1}`);

  return [
    ...current,
    ...normalizeMachineHardpoints([{
      ...DEFAULT_MACHINE_HARDPOINT,
      location: defaultLocation,
      ...hardpoint,
      id: nextId,
    }], { defaultLocation }),
  ];
}

export function removeMachineHardpointById(currentRaw = [], hardpointId = "", { defaultLocation = "" } = {}) {
  const normalizedId = String(hardpointId ?? "").trim();
  const current = normalizeMachineHardpoints(currentRaw, { defaultLocation });
  let removed = null;
  const hardpoints = current.filter(hardpoint => {
    if (hardpoint.id !== normalizedId) return true;
    removed = hardpoint;
    return false;
  });
  return { hardpoints, removed };
}

export function assignMachineHardpointOccupant(currentRaw = [], hardpointId = "", itemId = "", { defaultLocation = "" } = {}) {
  const normalizedHardpointId = String(hardpointId ?? "").trim();
  const normalizedItemId = String(itemId ?? "").trim();
  const current = normalizeMachineHardpoints(currentRaw, { defaultLocation });
  let changed = false;

  const hardpoints = current.map(hardpoint => {
    let nextItemId = hardpoint.itemId;
    if (normalizedItemId && hardpoint.id !== normalizedHardpointId && hardpoint.itemId === normalizedItemId) {
      nextItemId = "";
    }
    if (hardpoint.id === normalizedHardpointId) {
      nextItemId = normalizedItemId;
    }
    if (nextItemId !== hardpoint.itemId) changed = true;
    return {
      ...hardpoint,
      itemId: nextItemId,
    };
  });

  return { hardpoints, changed };
}

export function updateMachineHardpointSettings(currentRaw = [], hardpointId = "", settings = {}, { defaultLocation = "" } = {}) {
  const normalizedId = String(hardpointId ?? "").trim();
  const current = normalizeMachineHardpoints(currentRaw, { defaultLocation });
  let changed = false;

  const hardpoints = current.map(hardpoint => {
    if (hardpoint.id !== normalizedId) return hardpoint;

    const next = {
      ...hardpoint,
      type: normalizeMachineHardpointType(settings?.type ?? hardpoint.type, hardpoint.type),
      size: normalizeMachineWeaponSize(settings?.size ?? hardpoint.size, hardpoint.size),
      location: String(settings?.location ?? hardpoint.location ?? defaultLocation).trim() || defaultLocation,
      itemId: hardpoint.itemId,
    };
    changed ||= JSON.stringify(next) !== JSON.stringify(hardpoint);
    return next;
  });

  return { hardpoints, changed };
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
  return normalizeMachineWeaponDamageType(item?.system?.damageType ?? "energy", "energy");
}

export function getMachineWeaponRequiredSize(item = null) {
  return normalizeMachineWeaponSize(item?.system?.size ?? "small");
}

export function doesHardpointAcceptItem(hardpoint = {}, item = null) {
  const canonicalType = String(item?.canonicalType ?? item?.type ?? "").trim();
  if (canonicalType !== TEMPLATE.itemType.mechWeapon) return false;

  const hardpointType = normalizeMachineHardpointType(hardpoint?.type ?? "energy", "energy");
  const hardpointSize = normalizeMachineWeaponSize(hardpoint?.size ?? "small");
  const requiredType = getMachineWeaponRequiredType(item);
  const requiredSize = getMachineWeaponRequiredSize(item);
  const typeMatches = hardpointType === "omni"
    || hardpointType === requiredType;

  return typeMatches && hardpointSize === requiredSize;
}

export function getHardpointCompatibilityError(hardpoint = {}, item = null) {
  const canonicalType = String(item?.canonicalType ?? item?.type ?? "").trim();
  if (canonicalType !== TEMPLATE.itemType.mechWeapon) {
    return "Only mech weapons can be mounted in hardpoint slots.";
  }

  const hardpointType = normalizeMachineHardpointType(hardpoint?.type ?? "energy", "energy");
  const hardpointSize = normalizeMachineWeaponSize(hardpoint?.size ?? "small");
  const requiredType = getMachineWeaponRequiredType(item);
  const requiredSize = getMachineWeaponRequiredSize(item);
  const typeMatches = hardpointType === "omni"
    || hardpointType === requiredType;

  if (!typeMatches) {
    return `${item?.name ?? "That weapon"} is ${startCase(requiredType)} and cannot fit a ${startCase(hardpointType)} slot.`;
  }

  if (hardpointSize !== requiredSize) {
    return `${item?.name ?? "That weapon"} is ${startCase(requiredSize)} and cannot fit a ${startCase(hardpointSize)} slot.`;
  }

  return "";
}
