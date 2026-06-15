// src/modules/harm/harm-engine-utils.js
// Purpose: Pure helpers shared by the GM harm engine and its tests.
// How it fits: Pulls non-Foundry math and branching out of the UI-facing engine so the damage contract is easier to verify.

import { TEMPLATE } from "../core/constants.js";

export function normalizeHarmDelta(value) {
  const numeric = Number(value ?? 0);
  if (!Number.isFinite(numeric)) return 0;
  return Math.trunc(numeric);
}

export function getHarmTrackLabel(track) {
  if (track === TEMPLATE.monitors.physical) return "Physical";
  if (track === TEMPLATE.monitors.fatigue) return "Fatigue";
  return String(track ?? "").trim() || "Track";
}

// Armor wear is intentionally resolved in one place because the reinforced
// charge takes priority over durability loss. That ordering is easy to break
// when the branching lives inline inside a larger damage routine.
//
// `forceWear` lets a connecting attack degrade armor even when it dealt no net
// damage (e.g. fully mitigated or grazing for 0). Any hit should wear armor.
export function resolveArmorWearStep({
  incomingDamage = 0,
  armorBefore = 0,
  reinforcedBefore = 0,
  reinforcedMax = 0,
  hasArmorItem = false,
  forceWear = false,
} = {}) {
  const resolved = {
    armorBefore: Math.max(0, Number(armorBefore ?? 0) || 0),
    armorAfter: Math.max(0, Number(armorBefore ?? 0) || 0),
    reinforcedBefore: Math.max(0, Number(reinforcedBefore ?? 0) || 0),
    reinforcedAfter: Math.max(0, Number(reinforcedBefore ?? 0) || 0),
    reinforcedMax: Math.max(0, Number(reinforcedMax ?? 0) || 0),
    update: {},
  };

  if (!hasArmorItem || (Math.max(0, Number(incomingDamage ?? 0) || 0) <= 0 && !forceWear)) {
    return resolved;
  }

  if (resolved.reinforcedBefore > 0) {
    resolved.reinforcedAfter = Math.max(0, resolved.reinforcedBefore - 1);
    if (resolved.reinforcedAfter !== resolved.reinforcedBefore) {
      resolved.update["system.traitState.reinforced.current"] = resolved.reinforcedAfter;
    }
    return resolved;
  }

  resolved.armorAfter = Math.max(0, resolved.armorBefore - 1);
  if (resolved.armorAfter !== resolved.armorBefore) {
    resolved.update["system.durability.current"] = resolved.armorAfter;
  }
  return resolved;
}
