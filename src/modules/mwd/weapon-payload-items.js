// src/modules/mwd/weapon-payload-items.js
// Purpose: Normalize reusable weapon payload items and compile them into weapon payload profiles.
// How it fits: Lets owned payload items feed the existing personal weapon payload resolver.

import {
  normalizePayloadKey,
  normalizePayloadProfile,
} from "./personal-damage.js";
import {
  canonicalizePayloadFamilyKey,
  canonicalizePayloadTagKey,
} from "./weapon-payload-catalogs.js";

export const UNLOADED_PAYLOAD_ID = "unloaded";
export const WEAPON_PAYLOAD_ITEM_TYPE = "weaponPayload";
export { normalizePayloadKey };

function normalizeStringList(value, { canonicalize = value => value } = {}) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.values(value).flatMap(entry => normalizeStringList(entry, { canonicalize }));
  }

  if (Array.isArray(value)) {
    return value
      .map(entry => canonicalize(String(entry ?? "").trim()))
      .filter(Boolean);
  }

  return String(value ?? "")
    .split(",")
    .map(entry => canonicalize(entry.trim()))
    .filter(Boolean);
}

function distinctStrings(value, options = {}) {
  return Array.from(new Set(normalizeStringList(value, options)));
}

function distinctFamilies(value) {
  return distinctStrings(value, { canonicalize: canonicalizePayloadFamilyKey });
}

function distinctTags(value) {
  return distinctStrings(value, { canonicalize: canonicalizePayloadTagKey });
}

export function normalizePayloadCompatibility(value = {}) {
  const source = value ?? {};
  return {
    families: distinctFamilies(source.families ?? source.family),
    tagsAll: distinctTags(source.tagsAll ?? source.requiredTags),
  };
}

export function normalizeWeaponPayloadItemSystem(system = {}, { name = "Payload" } = {}) {
  const source = system ?? {};
  const label = String(source.profile?.label ?? source.label ?? name ?? "Payload").trim() || "Payload";
  const profile = normalizePayloadProfile({
    id: "profile",
    label,
    ...(source.profile ?? {}),
  });

  profile.consumption = {
    ...profile.consumption,
    amount: Math.max(1, Number(profile.consumption?.amount ?? source.consumption?.amount ?? 1) || 1),
    sourceId: "",
  };

  return {
    payloadKey: normalizePayloadKey(source.payloadKey ?? label ?? name),
    families: distinctFamilies(source.families ?? source.family),
    tags: distinctTags(source.tags),
    quantity: Math.max(0, Math.trunc(Number(source.quantity ?? 1) || 0)),
    profile,
  };
}

export function isWeaponPayloadItem(item) {
  return (item?.canonicalType ?? item?.type) === WEAPON_PAYLOAD_ITEM_TYPE;
}

function toItemArray(items) {
  if (!items) return [];
  if (typeof items.values === "function") return Array.from(items.values());
  if (Array.isArray(items)) return items;
  if (Array.isArray(items.contents)) return items.contents;
  return [];
}

export function isPayloadCompatibleWithWeapon(compatibility = {}, payloadSystem = {}) {
  const normalized = normalizePayloadCompatibility(compatibility);
  const payloadFamilies = new Set(distinctFamilies(payloadSystem.families));
  const payloadTags = new Set(distinctTags(payloadSystem.tags));

  if (!normalized.families.some(family => payloadFamilies.has(family))) return false;
  if (normalized.tagsAll.some(tag => !payloadTags.has(tag))) return false;

  return true;
}

function normalizeAssignmentSourceId(value) {
  const normalized = String(value ?? "").trim();
  if (normalized.toLowerCase() === "untracked") return null;
  return normalized || null;
}

export function normalizePayloadSourceAssignments(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return Object.entries(source).reduce((assignments, [rawKey, rawEntry]) => {
    const key = normalizePayloadKey(rawKey);
    if (!key) return assignments;
    const entry = rawEntry && typeof rawEntry === "object" ? rawEntry : { sourceId: rawEntry };
    assignments[key] = {
      sourceId: normalizeAssignmentSourceId(entry.sourceId),
    };
    return assignments;
  }, {});
}

export function buildWeaponPayloadItemProfile(item, { weaponCompatibility = null, sourceAssignments = {} } = {}) {
  if (!isWeaponPayloadItem(item)) return null;

  const payloadSystem = normalizeWeaponPayloadItemSystem(item.system ?? {}, { name: item.name });
  if (weaponCompatibility && !isPayloadCompatibleWithWeapon(weaponCompatibility, payloadSystem)) return null;

  const payloadKey = normalizePayloadKey(payloadSystem.payloadKey);
  if (!payloadKey) return null;

  const sourceId = normalizeAssignmentSourceId(sourceAssignments[payloadKey]?.sourceId);
  const profile = normalizePayloadProfile({
    ...payloadSystem.profile,
    id: payloadKey,
    payloadKey,
    label: String(payloadSystem.profile?.label ?? item.name ?? "Payload").trim() || "Payload",
    reserveQuantity: payloadSystem.quantity,
    consumption: {
      ...(payloadSystem.profile?.consumption ?? {}),
      sourceId: sourceId ?? "",
    },
  });

  return {
    ...profile,
    sourceType: WEAPON_PAYLOAD_ITEM_TYPE,
    itemId: String(item.id ?? "").trim(),
    itemUuid: String(item.uuid ?? item.id ?? "").trim(),
    payloadKey,
    reserveQuantity: payloadSystem.quantity,
    families: payloadSystem.families,
    tags: payloadSystem.tags,
  };
}

export function buildWeaponPayloadItemModel({ actor = null, weaponCompatibility = {}, sourceAssignments = {} } = {}) {
  const grouped = new Map();
  const normalizedAssignments = normalizePayloadSourceAssignments(sourceAssignments);

  for (const item of toItemArray(actor?.items)) {
    const profile = buildWeaponPayloadItemProfile(item, {
      weaponCompatibility,
      sourceAssignments: normalizedAssignments,
    });
    if (!profile) continue;

    const key = profile.payloadKey;
    const existing = grouped.get(key);
    if (!existing) {
      grouped.set(key, {
        ...profile,
        itemIds: profile.itemId ? [profile.itemId] : [],
        itemUuids: profile.itemUuid ? [profile.itemUuid] : [],
      });
      continue;
    }

    existing.reserveQuantity += profile.reserveQuantity;
    if (profile.itemId) existing.itemIds.push(profile.itemId);
    if (profile.itemUuid) existing.itemUuids.push(profile.itemUuid);
  }

  return { payloads: Array.from(grouped.values()), consumptionSources: [] };
}
