// src/modules/mwd/machine-summary.js
// Purpose: Small view-model helpers for machine sheet summary stats.
// How it fits: Keeps BattleMech hero-bar math testable without instantiating Foundry sheets.

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function startCase(value = "") {
  return String(value ?? "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
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
  const max = Math.max(0, toNumber(monitor?.max, 0));
  const damageTaken = clamp(toNumber(monitor?.value, 0), 0, max);
  // Machine monitor values store damage taken; the hero bar reports remaining integrity.
  const remaining = Math.max(0, max - damageTaken);
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
  const max = Math.max(0, toNumber(monitor?.max, 0));
  const damageTaken = clamp(toNumber(monitor?.value, 0), 0, max);
  const remaining = Math.max(0, max - damageTaken);

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
        value: Math.max(0, max - segmentValue),
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
