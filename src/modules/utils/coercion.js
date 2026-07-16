// src/modules/utils/coercion.js
// Purpose: Canonical primitive coercion helpers for domain-neutral value shaping.
// How it fits: Keeps fallback and clamping semantics stable across sheets,
// settings, rules, and mechanic preparation without owning any domain behavior.

export function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

export function toInteger(value, fallback = 0) {
  return Math.trunc(toNumber(value, fallback));
}

export function toNonNegativeInteger(value, fallback = 0) {
  return Math.max(0, toInteger(value, fallback));
}

export function toTrimmedString(value, fallback = "") {
  const normalized = String(value ?? "").trim();
  return normalized || fallback;
}

export function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function compactStringList(value) {
  return asArray(value)
    .map(entry => String(entry ?? "").trim())
    .filter(Boolean);
}

export function clamp(value, min, max) {
  const numeric = toNumber(value, min);
  return Math.min(max, Math.max(min, numeric));
}

export function clampMin(value, min = 0) {
  return Math.max(min, toNumber(value, min));
}
