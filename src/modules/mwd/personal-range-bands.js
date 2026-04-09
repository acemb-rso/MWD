// src/modules/mwd/personal-range-bands.js
// Purpose: Defines shared range-band namespaces and personal-scale thresholds/labels.
// How it fits: Keeps combat range displays consistent across sheets, rolls, and item prep,
// while reserving future scale namespaces for mech and warship combat.

export const RANGE_BAND_KEYS = Object.freeze(["close", "near", "far", "extreme"]);

export const PERSONAL_COMBAT_SCALE = "personal";
export const MECH_COMBAT_SCALE = "mech";
export const WARSHIP_COMBAT_SCALE = "warship";

export const PERSONAL_RANGE_BANDS = Object.freeze([
  Object.freeze({ key: "close", label: "Close", min: 0, max: 5, baseDn: 2 }),
  Object.freeze({ key: "near", label: "Near", min: 6, max: 26, baseDn: 3 }),
  Object.freeze({ key: "far", label: "Far", min: 27, max: 62, baseDn: 4 }),
  Object.freeze({ key: "extreme", label: "Extreme", min: 63, max: 120, baseDn: 5 })
]);

// Reserved namespaces for future combat scales. These are intentionally left
// data-light until their band sizes and rules are defined.
export const MECH_RANGE_BANDS = Object.freeze([]);
export const WARSHIP_RANGE_BANDS = Object.freeze([]);

export const RANGE_BANDS_BY_SCALE = Object.freeze({
  [PERSONAL_COMBAT_SCALE]: PERSONAL_RANGE_BANDS,
  [MECH_COMBAT_SCALE]: MECH_RANGE_BANDS,
  [WARSHIP_COMBAT_SCALE]: WARSHIP_RANGE_BANDS,
});

export function getRangeBandsForScale(scale = PERSONAL_COMBAT_SCALE) {
  return RANGE_BANDS_BY_SCALE[String(scale ?? "").trim().toLowerCase()] ?? [];
}

const PERSONAL_RANGE_BY_KEY = new Map(PERSONAL_RANGE_BANDS.map(band => [band.key, band]));

function normalizeBandNumber(value, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return fallback;
  return Math.max(0, Math.trunc(numeric));
}

export function getPersonalRangeBand(key = "") {
  return PERSONAL_RANGE_BY_KEY.get(String(key ?? "").trim().toLowerCase()) ?? null;
}

export function getPersonalRangeBandLabel(key = "") {
  if (String(key ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const band = getPersonalRangeBand(key);
  if (!band) return String(key ?? "").trim() || "Range";
  return `${band.label} ${band.min}-${band.max} m`;
}

export function getPersonalRangeBandName(key = "") {
  if (String(key ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const band = getPersonalRangeBand(key);
  if (!band) return String(key ?? "").trim() || "Range";
  return band.label;
}

export function getPersonalRangeBandBaseDn(key = "", fallback = 1) {
  if (String(key ?? "").trim().toLowerCase() === "outofrange") return 6;
  const band = getPersonalRangeBand(key);
  return Number.isFinite(Number(band?.baseDn)) ? Number(band.baseDn) : fallback;
}

export function normalizePersonalRangeData(range = {}) {
  const max = String(range?.max ?? "").trim().toLowerCase() || "extreme";
  return {
    max,
    close: normalizeBandNumber(range?.close ?? range?.short, 5),
    near: normalizeBandNumber(range?.near ?? range?.medium, 26),
    far: normalizeBandNumber(range?.far ?? range?.long, 62),
    extreme: normalizeBandNumber(range?.extreme, 120)
  };
}

export function selectPersonalRangeBand(distance, range = {}, fallback = "close") {
  const numericDistance = Number(distance);
  if (!Number.isFinite(numericDistance) || numericDistance < 0) {
    return String(fallback ?? "close").trim().toLowerCase() || "close";
  }

  const normalized = normalizePersonalRangeData(range);
  const maxKey = getPersonalRangeBand(normalized.max)?.key ?? "extreme";
  const maxIndex = PERSONAL_RANGE_BANDS.findIndex(band => band.key === maxKey);
  const maxDistance = Number(normalized?.[maxKey] ?? NaN);
  if (Number.isFinite(maxDistance) && numericDistance > maxDistance) {
    return "outOfRange";
  }

  let bandKey = "extreme";
  if (numericDistance <= normalized.close) bandKey = "close";
  else if (numericDistance <= normalized.near) bandKey = "near";
  else if (numericDistance <= normalized.far) bandKey = "far";

  const resolvedIndex = PERSONAL_RANGE_BANDS.findIndex(band => band.key === bandKey);
  if (maxIndex >= 0 && resolvedIndex > maxIndex) {
    return maxKey;
  }

  return bandKey;
}
