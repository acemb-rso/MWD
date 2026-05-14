// src/modules/mwd/machine-weapon-types.js
// Purpose: Canonical machine weapon base-type helpers.
// How it fits: Keeps BattleMech/vehicle hardpoint compatibility separate from
// personal-scale and payload damage effects.

import {
  getPersonalDamageTypeLabel,
  normalizeOptionalPersonalDamageType,
  normalizePayloadProfile,
  normalizeSelectedPayloadId,
  normalizeWeaponPayloads,
} from "./personal-damage.js";

const MACHINE_WEAPON_DAMAGE_TYPE_LABELS = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
});

export const MACHINE_WEAPON_DAMAGE_TYPES = Object.freeze(
  Object.entries(MACHINE_WEAPON_DAMAGE_TYPE_LABELS).map(([value, label]) => ({ value, label }))
);

export const MACHINE_WEAPON_DAMAGE_TYPE_MAP = Object.freeze({
  penetrating: "penetrating",
  ballistic: "penetrating",
  melee: "penetrating",
  kinetic: "concussive",
  concussive: "concussive",
  explosive: "concussive",
  missile: "concussive",
  energy: "energy",
  thermal: "energy",
  electrical: "energy",
  electric: "energy",
  plasma: "energy",
  laser: "energy",
});

const MACHINE_ENERGY_ALIASES = Object.freeze(new Set([
  "energy",
  "thermal",
  "electrical",
  "electric",
  "plasma",
  "laser",
]));

const MACHINE_PENETRATING_ALIASES = Object.freeze(new Set([
  "penetrating",
  "ballistic",
  "melee",
]));

function normalizeString(value = "") {
  return String(value ?? "").trim().toLowerCase();
}

function normalizeMachineEnergyPayloadDamageType(value = "") {
  const normalized = normalizeString(value);
  if (normalized === "thermal") return "thermal";
  if (normalized === "electrical" || normalized === "electric") return "electrical";
  return "";
}

function uniquePayloadId(payloads = [], preferredId = "payload", idFactory = null) {
  const usedIds = new Set(payloads.map(payload => String(payload?.id ?? "").trim()).filter(Boolean));
  const baseId = String(preferredId ?? "payload").trim() || "payload";
  if (!usedIds.has(baseId)) return baseId;
  if (typeof idFactory === "function") {
    const generated = String(idFactory(baseId) ?? "").trim();
    if (generated && !usedIds.has(generated)) return generated;
  }

  let index = 2;
  while (usedIds.has(`${baseId}-${index}`)) index += 1;
  return `${baseId}-${index}`;
}

export function normalizeMachineWeaponDamageType(value, fallback = "energy") {
  const normalized = normalizeString(value);
  return MACHINE_WEAPON_DAMAGE_TYPE_MAP[normalized] ?? fallback;
}

export function normalizeMachinePayloadDamageType(value) {
  return normalizeOptionalPersonalDamageType(value);
}

export function getMachineWeaponDamageTypeLabel(value) {
  const normalized = normalizeMachineWeaponDamageType(value, "");
  return MACHINE_WEAPON_DAMAGE_TYPE_LABELS[normalized] ?? String(value ?? "").trim();
}

export function isMachineEnergyDamageFamily(value) {
  const normalized = normalizeString(value);
  if (MACHINE_ENERGY_ALIASES.has(normalized)) return true;
  return normalizeMachineWeaponDamageType(normalized, "") === "energy";
}

export function isMachinePenetratingDamageFamily(value) {
  const normalized = normalizeString(value);
  if (MACHINE_PENETRATING_ALIASES.has(normalized)) return true;
  return normalizeMachineWeaponDamageType(normalized, "") === "penetrating";
}

export function normalizeMachineHardpointType(value, fallback = "energy") {
  const normalized = normalizeString(value);
  if (normalized === "support" || normalized === "omni") return normalized;
  return normalizeMachineWeaponDamageType(normalized, fallback);
}

export function buildMachineEnergyPayloadModel(system = {}, { idFactory = null } = {}) {
  const category = String(system?.weaponCategory ?? system?.category ?? "ranged").trim() || "ranged";
  const legacyAmmo = system?.ammo;
  const payloads = normalizeWeaponPayloads(system?.payloads, { legacyAmmo, category });
  const payloadDamageType = normalizeMachineEnergyPayloadDamageType(system?.damageType);
  const damageType = normalizeMachineWeaponDamageType(system?.damageType, "energy");
  let nextPayloads = payloads;
  let selectedPayloadId = normalizeSelectedPayloadId(system?.selectedPayloadId, nextPayloads, { legacyAmmo, category });

  if (payloadDamageType) {
    let payload = nextPayloads.find(entry =>
      entry?.id !== "unloaded" && entry?.modifies?.damageType === payloadDamageType
    );

    if (!payload) {
      payload = normalizePayloadProfile({
        id: uniquePayloadId(nextPayloads, payloadDamageType, idFactory),
        label: getPersonalDamageTypeLabel(payloadDamageType),
        modifies: { damageType: payloadDamageType },
        resolution: { resolverKey: "standard" },
        consumption: { amount: 1, sourceId: "" },
      });
      nextPayloads = [...nextPayloads, payload];
    }

    selectedPayloadId = payload.id;
  }

  return {
    damageType,
    payloads: nextPayloads,
    selectedPayloadId,
    payloadDamageType,
  };
}
