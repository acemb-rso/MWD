// src/modules/mwd/heat-state.js
// Purpose: Normalizes BattleMech heat thresholds and display state labels.
// How it fits: Actor prep and sheets can share the same Safe/Hot/Overheat/Danger rules.

export const MACHINE_HEAT_STATUS_LABELS = Object.freeze({
  safe: "Safe",
  hot: "Hot",
  overheat: "Overheat",
  danger: "Danger",
  runningHot: "Hot",
  overheated: "Overheat",
  shutdown: "Danger",
});

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

export function normalizeMachineHeatThresholds(thresholds = {}, max = 0) {
  const heatMax = Math.max(0, toNumber(max, 0));
  const hot = Math.max(0, toNumber(thresholds.hot ?? thresholds.runningHot, 2));
  const overheat = Math.max(0, toNumber(thresholds.overheat ?? thresholds.overheated, 3));
  const danger = Math.max(0, toNumber(thresholds.danger ?? thresholds.shutdown, heatMax || 4));

  return {
    hot,
    overheat,
    danger,
    runningHot: hot,
    overheated: overheat,
    shutdown: danger,
  };
}

export function resolveMachineHeatStatus(value = 0, thresholds = {}, max = 0) {
  const current = Math.max(0, toNumber(value, 0));
  const normalized = normalizeMachineHeatThresholds(thresholds, max);

  if (current >= normalized.danger) return "danger";
  if (current >= normalized.overheat) return "overheat";
  if (current >= normalized.hot) return "hot";
  return "safe";
}

export function getMachineHeatStatusLabel(code = "safe") {
  return MACHINE_HEAT_STATUS_LABELS[String(code ?? "").trim()] ?? MACHINE_HEAT_STATUS_LABELS.safe;
}
