// src/modules/mwd/weapon-payload-catalogs.js
// Purpose: Provides configurable canonical payload family and tag catalogs.
// How it fits: Weapon and payload sheets use these catalogs so compatibility
// keys are authored consistently across reusable payload items and weapons.

import { SYSTEM_NAME } from "../constants.js";

export const SETTING_WEAPON_PAYLOAD_FAMILY_CATALOG = "weaponPayloadFamilyCatalog";
export const SETTING_WEAPON_PAYLOAD_TAG_CATALOG = "weaponPayloadTagCatalog";

export const DEFAULT_WEAPON_PAYLOAD_FAMILIES = Object.freeze([
  { key: "bullet", label: "Bullet", description: "General ballistic bullets and similar small ammunition." },
  { key: "smallArmsBallistic", label: "Small Arms Ballistic", description: "Broad family for conventional small arms payloads." },
  { key: "shotgunShell", label: "Shotgun Shell", description: "Shotgun shells and specialty shot payloads." },
  { key: "40mmGrenade", label: "40mm Grenade", description: "Grenade launcher payloads using a 40mm grenade profile." },
  { key: "handGrenade", label: "Hand Grenade", description: "Thrown grenade payloads." },
  { key: "rocket", label: "Rocket", description: "Unguided rocket payloads." },
  { key: "srmMissile", label: "SRM Missile", description: "Short-range missile payloads." },
  { key: "lrmMissile", label: "LRM Missile", description: "Long-range missile payloads." },
  { key: "mortarShell", label: "Mortar Shell", description: "Mortar or indirect shell payloads." },
]);

export const DEFAULT_WEAPON_PAYLOAD_TAGS = Object.freeze([
  { key: "armorPiercing", label: "Armor Piercing", description: "Improves armor penetration or mitigation interaction." },
  { key: "frag", label: "Frag", description: "Fragmentation or anti-personnel effect." },
  { key: "smoke", label: "Smoke", description: "Creates smoke, concealment, or vision interference." },
  { key: "incendiary", label: "Incendiary", description: "Thermal, burning, or fire-starting effect." },
  { key: "emp", label: "EMP", description: "Electromagnetic disruption effect." },
  { key: "nonlethal", label: "Nonlethal", description: "Designed to incapacitate without lethal harm." },
  { key: "stun", label: "Stun", description: "Applies shock, stun, or temporary impairment." },
  { key: "thermal", label: "Thermal", description: "Thermal damage or heat-oriented effect." },
  { key: "electrical", label: "Electrical", description: "Electrical damage or disruption." },
  { key: "chemical", label: "Chemical", description: "Chemical payload or exposure effect." },
  { key: "gas", label: "Gas", description: "Gas cloud or inhaled exposure effect." },
  { key: "cluster", label: "Cluster", description: "Clustered, bomblet, or multi-impact payload." },
  { key: "tracer", label: "Tracer", description: "Tracer or marking payload." },
]);

function toTrimmedString(value) {
  return String(value ?? "").trim();
}

export function normalizePayloadCatalog(value = [], { defaults = [] } = {}) {
  const source = Array.isArray(value) ? value : defaults;
  const entries = [];
  const seen = new Set();

  for (const entry of Array.isArray(source) ? source : []) {
    const key = toTrimmedString(entry?.key ?? entry?.id ?? entry?.value);
    if (!key) continue;

    const lookupKey = key.toLowerCase();
    if (seen.has(lookupKey)) continue;
    seen.add(lookupKey);

    entries.push({
      key,
      label: toTrimmedString(entry?.label) || key,
      description: toTrimmedString(entry?.description),
    });
  }

  return entries;
}

export function getDefaultWeaponPayloadFamilyCatalog() {
  return normalizePayloadCatalog(DEFAULT_WEAPON_PAYLOAD_FAMILIES);
}

export function getDefaultWeaponPayloadTagCatalog() {
  return normalizePayloadCatalog(DEFAULT_WEAPON_PAYLOAD_TAGS);
}

function getSettingsCatalog(settingKey, defaults) {
  const settings = globalThis.game?.settings;
  const registered = settings?.settings?.has?.(`${SYSTEM_NAME}.${settingKey}`);
  if (!registered) return normalizePayloadCatalog(defaults);

  return normalizePayloadCatalog(settings.get(SYSTEM_NAME, settingKey), { defaults });
}

export function getWeaponPayloadFamilyCatalog() {
  return getSettingsCatalog(SETTING_WEAPON_PAYLOAD_FAMILY_CATALOG, DEFAULT_WEAPON_PAYLOAD_FAMILIES);
}

export function getWeaponPayloadTagCatalog() {
  return getSettingsCatalog(SETTING_WEAPON_PAYLOAD_TAG_CATALOG, DEFAULT_WEAPON_PAYLOAD_TAGS);
}

export function payloadCatalogToOptions(catalog = []) {
  return normalizePayloadCatalog(catalog).map(entry => ({
    value: entry.key,
    label: entry.label === entry.key ? entry.key : `${entry.label} (${entry.key})`,
  }));
}

function canonicalizeAgainstCatalog(value, catalog = []) {
  const raw = toTrimmedString(value);
  if (!raw) return "";

  const lookup = raw.toLowerCase();
  const match = normalizePayloadCatalog(catalog).find(entry =>
    entry.key.toLowerCase() === lookup || entry.label.toLowerCase() === lookup
  );

  return match?.key ?? raw;
}

export function canonicalizePayloadFamilyKey(value) {
  return canonicalizeAgainstCatalog(value, getWeaponPayloadFamilyCatalog());
}

export function canonicalizePayloadTagKey(value) {
  return canonicalizeAgainstCatalog(value, getWeaponPayloadTagCatalog());
}
