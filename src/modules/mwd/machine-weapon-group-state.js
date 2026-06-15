// src/modules/mwd/machine-weapon-group-state.js
// Purpose: Normalize and sanitize machine weapon-group persistence state.
// Workflow: sheet group edits and mount changes -> normalized weapon id arrays
// with stale ids pruned -> ranged group inspection receives clean actor data.

function toObject(value) {
  return value && typeof value === "object" ? value : {};
}

function normalizeId(value = "") {
  return String(value ?? "").trim();
}

function normalizeWeaponIds(value) {
  const raw = Array.isArray(value) ? value : Object.values(toObject(value));
  return raw.map(normalizeId).filter(Boolean);
}

export function normalizeMachineWeaponGroups(rawGroups = []) {
  const groups = Array.isArray(rawGroups) ? rawGroups : Object.values(toObject(rawGroups));
  return groups.map(group => ({
    ...(group ?? {}),
    weaponIds: normalizeWeaponIds(group?.weaponIds),
  }));
}

export function pruneWeaponGroupsToMountedItems(rawGroups = [], mountedItemIds = []) {
  const groups = normalizeMachineWeaponGroups(rawGroups);
  const mountedIds = new Set(Array.from(mountedItemIds ?? []).map(normalizeId).filter(Boolean));
  let changed = false;

  const nextGroups = groups.map(group => {
    const filteredWeaponIds = group.weaponIds.filter(itemId => mountedIds.has(itemId));
    if (filteredWeaponIds.length !== group.weaponIds.length) changed = true;
    return {
      ...group,
      weaponIds: filteredWeaponIds,
    };
  });

  return {
    changed,
    groups: nextGroups,
  };
}
