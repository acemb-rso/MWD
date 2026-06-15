// src/modules/mwd/machine-summary.js
// Purpose: Small view-model helpers for machine sheet summary stats.
// Workflow: prepared monitor/crit data -> compact integrity and critical summary
// parts -> BattleMech/vehicle sheet headers render consistent status blocks.

import { startCase } from "../core/constants.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}


export function getIntegrityToneForPercent(percent = 0) {
  const normalized = clamp(toNumber(percent, 0), 0, 100);
  if (normalized >= 91) return "green";
  if (normalized >= 71) return "yellow";
  if (normalized >= 51) return "orange";
  if (normalized >= 31) return "red";
  return "dark-red";
}

export function buildIntegrityPart(label, monitor = {}) {
  // Machine monitor values are remaining capacity; the summary converts them
  // into compact label/tone parts for the hero bar.
  const max = Math.max(0, toNumber(monitor?.max, 0));
  const remaining = clamp(toNumber(monitor?.value, 0), 0, max);
  const percent = max > 0 ? (remaining / max) * 100 : 0;

  return {
    label,
    value: String(remaining),
    tone: getIntegrityToneForPercent(percent),
    remaining,
    max,
    percent,
    title: `${remaining}/${max}`,
  };
}

export function buildIntegritySummary({ armor = {}, structure = {} } = {}) {
  const parts = [
    buildIntegrityPart("A", armor),
    buildIntegrityPart("S", structure),
  ];

  return {
    parts,
    title: `Armor ${parts[0].title}; Structure ${parts[1].title}`,
  };
}

export function buildRemainingMonitorTrack({
  id = "",
  label = "",
  kind = "wound",
  monitor = {},
  editable = false,
} = {}) {
  // Track segments are generated from remaining capacity so the sheet can use
  // the same pips for armor, structure, and other depleting machine monitors.
  const max = Math.max(0, toNumber(monitor?.max, 0));
  const remaining = clamp(toNumber(monitor?.value, 0), 0, max);

  return {
    id,
    label,
    kind,
    editable: Boolean(editable),
    value: remaining,
    max,
    segments: Array.from({ length: max }, (_entry, index) => {
      const segmentValue = index + 1;
      return {
        value: segmentValue,
        filled: segmentValue <= remaining,
      };
    }),
  };
}

function formatCriticalTitle(crit = {}) {
  const label = String(crit?.label ?? startCase(crit?.key ?? "Critical")).trim() || "Critical";
  const location = String(crit?.locationLabel ?? startCase(crit?.locationKey ?? "")).trim();
  return location ? `${label} (${location})` : label;
}

export function buildCriticalStatusSummary(crits = []) {
  // Inactive critical records remain in history/storage but are excluded from
  // the visible current-status count.
  const activeCrits = Array.isArray(crits)
    ? crits.filter(crit => crit && crit.active !== false)
    : [];
  const count = activeCrits.length;

  return {
    value: count === 0 ? "CLEAR" : count === 1 ? "1 CRIT" : `${count} CRITS`,
    title: activeCrits.map(formatCriticalTitle).join("; "),
    count,
  };
}
