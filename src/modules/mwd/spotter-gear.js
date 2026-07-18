// src/modules/mwd/spotter-gear.js
// Purpose: Shared detection for equipment that can support indirect-fire spotting.

import { getAssetModuleState, hasAssetModuleCapability } from "./asset-module-effects.js";

const SPOTTER_GEAR_ALIASES = Object.freeze([
  "indirectSpotter",
  "spotIndirect",
  "indirectFire",
  "spotter",
  "spotting",
  "uav",
  "overwatch",
  "binocular",
  "observation",
  "surveillance",
  "targeting",
]);

function normalizeCapabilityKey(value = "") {
  return String(value ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function toCollectionArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.contents)) return value.contents;
  if (typeof value?.values === "function") return Array.from(value.values());
  if (value && typeof value[Symbol.iterator] === "function") return Array.from(value);
  return [];
}

function itemIsUsable(item = null, type = "") {
  if (!item) return false;
  if (item?.isActive?.() === false) return false;

  const system = item.system ?? {};
  if (system.inactive === true) return false;
  if (system.state?.suppressed || system.state?.offline || system.state?.destroyed) return false;
  if (type === "assetModule") return getAssetModuleState(item, { installed: true }).ready;
  return true;
}

function itemMatchesAliases(item = null, aliases = SPOTTER_GEAR_ALIASES) {
  const wanted = aliases.map(normalizeCapabilityKey).filter(Boolean);
  if (!wanted.length) return false;

  const matchesWanted = value => {
    const key = normalizeCapabilityKey(value);
    return key && wanted.some(wantedKey => key === wantedKey || key.includes(wantedKey));
  };

  const system = item?.system ?? {};
  const values = [
    item?.name,
    system.name,
    system.label,
    system.category,
    system.relatedSkill,
    system.rulesHook,
    system.effectText,
    system.description,
    ...toCollectionArray(system.tags),
    ...toCollectionArray(system.keywords),
    ...toCollectionArray(system.capabilities),
  ];
  return values.some(matchesWanted);
}

export function actorHasSpotterGear(actor = null, aliases = SPOTTER_GEAR_ALIASES) {
  if (hasAssetModuleCapability(actor, "indirectSpotter", aliases)) return true;

  return toCollectionArray(actor?.items).some(item => {
    const type = String(item?.canonicalType ?? item?.type ?? "").trim();
    if (!["gear", "consumable", "assetModule"].includes(type)) return false;
    if (!itemIsUsable(item, type)) return false;
    return itemMatchesAliases(item, aliases);
  });
}
