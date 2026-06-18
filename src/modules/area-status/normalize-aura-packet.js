// Purpose: Canonical validation and normalization for area-status aura packets.
// How it fits: Asset Modules and future producers share one declarative packet shape.

import {
  getStatusConditionDefinition,
} from "../status/status-condition-catalog.js";

export const AREA_STATUS_ALLEGIANCES = Object.freeze(["ally", "enemy", "any"]);

function normalizeStringList(value) {
  const source = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  return Array.from(new Set(source.map(entry => String(entry ?? "").trim()).filter(Boolean)));
}

function normalizeLegacyGrants(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter(entry => entry && typeof entry === "object")
    .filter(entry => ["status", "ewState"].includes(String(entry.kind ?? "").trim()))
    .map(entry => String(entry.state ?? entry.statusId ?? entry.status ?? "").trim())
    .filter(Boolean);
}

export function normalizeAuraPacket(packet = {}, {
  strict = true,
  index = 0,
  validateStatus = statusId => Boolean(getStatusConditionDefinition(statusId)),
} = {}) {
  if (!packet || typeof packet !== "object" || Array.isArray(packet)) {
    if (strict) throw new Error(`Aura packet ${index + 1} must be an object.`);
    return null;
  }

  const id = String(packet.id ?? `aura-${index + 1}`).trim() || `aura-${index + 1}`;
  const label = String(packet.label ?? id).trim() || id;
  const radius = Number(packet.radius ?? 0);
  const allegianceRaw = String(packet.allegiance ?? "ally").trim();
  const allegiance = AREA_STATUS_ALLEGIANCES.includes(allegianceRaw) ? allegianceRaw : "ally";
  const statusIds = normalizeStringList([
    ...normalizeStringList(packet?.grants?.statuses),
    ...normalizeLegacyGrants(packet.grants),
  ]);
  const errors = [];

  if (!Number.isFinite(radius) || radius <= 0) errors.push(`${label}: radius must be a positive number.`);
  if (!AREA_STATUS_ALLEGIANCES.includes(allegianceRaw)) {
    errors.push(`${label}: allegiance must be one of ${AREA_STATUS_ALLEGIANCES.join(", ")}.`);
  }
  if (!statusIds.length) errors.push(`${label}: grants.statuses must include at least one status.`);
  for (const statusId of statusIds) {
    if (!validateStatus(statusId)) errors.push(`${label}: unknown status "${statusId}".`);
  }

  if (strict && errors.length) {
    const error = new Error(errors[0]);
    error.validationErrors = errors;
    throw error;
  }

  return {
    id,
    kind: "aura",
    label,
    radius: Number.isFinite(radius) ? Math.max(0, radius) : 0,
    allegiance,
    grants: {
      statuses: statusIds.filter(statusId => validateStatus(statusId)),
    },
  };
}

export function normalizeAuraPackets(packets = [], options = {}) {
  return (Array.isArray(packets) ? packets : [])
    .map((packet, index) => normalizeAuraPacket(packet, { ...options, index }))
    .filter(Boolean);
}

export function validateAuraPacket(packet = {}, options = {}) {
  return normalizeAuraPacket(packet, { ...options, strict: true });
}
