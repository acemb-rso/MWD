// src/modules/mwd/machine-monitors.js
// Purpose: Shared machine monitor normalization helpers.
// How it fits: Keeps vehicle/BattleMech monitor semantics independent from personal armor rules.

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
  return {
    default: 0,
    byType: normalizeByType(resistance?.byType),
  };
}
