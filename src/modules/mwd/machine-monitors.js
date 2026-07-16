// src/modules/mwd/machine-monitors.js
// Purpose: Shared machine monitor normalization helpers.
// Workflow: actor monitor storage -> remaining-capacity monitor state and
// migration updates -> sheets, token bars, and damage apply agree on values.

import { isMachineActor as isMachineActorType } from "../utils/actor-guards.js";

export { isMachineActorType };

function toFiniteNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function normalizeByType(byType = {}) {
  if (!byType || typeof byType !== "object" || Array.isArray(byType)) return {};
  return Object.fromEntries(
    Object.entries(byType)
      .map(([key, value]) => [String(key ?? "").trim(), toFiniteNumber(value, 0)])
      .filter(([key, value]) => key && value !== 0)
  );
}

export function normalizeMachineMonitorResistance(resistance = {}) {
  // Machine monitors do not inherit the personal-scale default resistance.
  // Only explicitly typed resistance should affect vehicle/BattleMech damage.
  return {
    default: 0,
    byType: normalizeByType(resistance?.byType),
  };
}

export const MACHINE_MONITOR_STORAGE_FLAG = "machineMonitorStorage";
export const MACHINE_MONITOR_STORAGE_REMAINING_V1 = "remaining-v1";

export const MACHINE_DEPLETING_MONITORS = Object.freeze([
  "armor",
  "structure",
]);

export function clampMonitorValue(value, max = 0) {
  const limit = Math.max(0, toFiniteNumber(max, 0));
  return Math.min(limit, Math.max(0, toFiniteNumber(value, 0)));
}

export function getMachineMonitorState(actor = null, monitorKey = "") {
  // Public monitor state uses value as remaining capacity. damageTaken is
  // derived for older UI pieces that still talk in damage-pip terms.
  const monitor = actor?.system?.monitors?.[monitorKey] ?? {};
  const max = Math.max(0, toFiniteNumber(monitor.max, 0));
  const remaining = clampMonitorValue(monitor.value, max);

  return {
    max,
    value: remaining,
    remaining,
    damageTaken: Math.max(0, max - remaining),
  };
}

export function getDepletingMachineMonitorClickValue(currentValue = 0, pipValue = 0) {
  // Clicking a filled pip clears it and every higher pip; clicking the current
  // edge pip steps down by one so depleting tracks feel natural on the sheet.
  const current = Math.max(0, toFiniteNumber(currentValue, 0));
  const pip = Math.max(0, toFiniteNumber(pipValue, 0));
  return current === pip ? Math.max(0, pip - 1) : pip;
}

export function collectMachineMonitorRemainingStorageUpdates(actor = null) {
  // Build a single migration update object and let the caller decide when to
  // write. This keeps actor prep and sheet rendering side-effect free.
  if (!isMachineActorType(actor)) return null;

  const currentFlag = actor?.getFlag?.("mwd", MACHINE_MONITOR_STORAGE_FLAG)
    ?? actor?.flags?.mwd?.[MACHINE_MONITOR_STORAGE_FLAG]
    ?? "";
  if (currentFlag === MACHINE_MONITOR_STORAGE_REMAINING_V1) return null;

  const updates = {
    [`flags.mwd.${MACHINE_MONITOR_STORAGE_FLAG}`]: MACHINE_MONITOR_STORAGE_REMAINING_V1,
  };

  for (const monitorId of MACHINE_DEPLETING_MONITORS) {
    const monitor = actor?.system?.monitors?.[monitorId] ?? {};
    const max = Math.max(0, toFiniteNumber(monitor.max, 0));
    const damageTaken = clampMonitorValue(monitor.value, max);
    updates[`system.monitors.${monitorId}.value`] = Math.max(0, max - damageTaken);
  }

  return updates;
}

export async function migrateMachineMonitorStorageOnce({
  actors = [],
  currentMigration = "",
  setMigration = null,
} = {}) {
  if (currentMigration === MACHINE_MONITOR_STORAGE_REMAINING_V1) {
    return { migrated: 0, skipped: true };
  }

  let migrated = 0;
  for (const actor of Array.from(actors ?? [])) {
    const updates = collectMachineMonitorRemainingStorageUpdates(actor);
    if (updates && Object.keys(updates).length) {
      await actor.update(updates);
      migrated += 1;
    }
  }

  if (typeof setMigration === "function") {
    await setMigration(MACHINE_MONITOR_STORAGE_REMAINING_V1);
  }

  return { migrated, skipped: false };
}
