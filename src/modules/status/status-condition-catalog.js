// src/modules/status/status-condition-catalog.js
// Purpose: Actor-aware condition catalog for token statuses.
// How it fits: Keeps status availability declarative while Foundry ActiveEffects
// remain the storage and token-indicator layer.

import { SYSTEM_NAME, TEMPLATE } from "../constants.js";
import { STATUS_MAP } from "../roll/config/status-modifiers.js";

export const SETTING_STATUS_CONDITION_CATALOG = "statusConditionCatalog";

export const STATUS_ACTOR_GROUP_OPTIONS = Object.freeze([
  { value: "person", label: "Person" },
  { value: "machine", label: "Machine" },
  { value: "all", label: "All Actors" },
  { value: "character", label: "Character" },
  { value: "npc", label: "NPC" },
  { value: "vehicle", label: "Vehicle" },
  { value: "battlemech", label: "BattleMech" },
]);

export const STATUS_BOOLEAN_OPTIONS = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" },
]);

const PERSON_TYPES = Object.freeze([
  TEMPLATE.actorTypes.character,
  TEMPLATE.actorTypes.npc,
]);

const MACHINE_TYPES = Object.freeze([
  TEMPLATE.actorTypes.vehicle,
  TEMPLATE.actorTypes.battlemech,
]);

const ALL_TYPES = Object.freeze([...PERSON_TYPES, ...MACHINE_TYPES]);

const ACTOR_TYPES_BY_GROUP = Object.freeze({
  person: PERSON_TYPES,
  machine: MACHINE_TYPES,
  all: ALL_TYPES,
  character: [TEMPLATE.actorTypes.character],
  npc: [TEMPLATE.actorTypes.npc],
  vehicle: [TEMPLATE.actorTypes.vehicle],
  battlemech: [TEMPLATE.actorTypes.battlemech],
});

const DEFAULT_ICON_ROOT = "systems/mwd/img/icons/status";
const SYSTEM_ICON_ROOT = "systems/mwd/img/icons/systems";
const TARGETING_ICON = `${SYSTEM_ICON_ROOT}/Targeting.webp`;

const DEFAULT_STATUS_CONDITION_CATALOG = Object.freeze([
  // Person conditions: lightly filtered from the existing status/icon pool.
  status("prone", "Prone", "person", "physical", ["movement", "posture"], "prone.svg", { modifierKey: "prone", order: 10 }),
  status("blinded", "Blinded", "person", "sensory", ["vision"], "blinded.svg", { modifierKey: "blinded", order: 20 }),
  status("frightened", "Frightened", "person", "mental", ["morale"], "brain_injury.svg", { modifierKey: "frightened", order: 30 }),
  status("deafened", "Deafened", "person", "sensory", ["hearing"], "deafened.svg", { modifierKey: "deafened", order: 40 }),
  status("hidden", "Hidden", "person", "tactical", ["stealth"], "hidden.svg", { modifierKey: "hidden", order: 50 }),
  status("suppressed", "Suppressed", "person", "tactical", ["offense"], "suppressed.svg", { modifierKey: "suppressed", order: 60 }),
  status("grappled", "Grappled", "person", "physical", ["movement"], "grappled.svg", { modifierKey: "grappled", order: 70 }),
  status("stunned", "Stunned", "person", "physical", ["action"], "concussion.svg", { modifierKey: "stunned", order: 80 }),
  status("knockedOut", "Knocked Out", "person", "physical", ["unconscious"], "knockout.svg", { order: 90 }),
  status("onFire", "On Fire", "all", "hazard", ["fire", "heat", "escalating"], "on_fire.svg", { modifierKey: "onFire", order: 100 }),
  status("drugged", "Drugged", "person", "chemical", ["impairment"], "drugged.svg", { modifierKey: "drugged", order: 110 }),
  status("radiation", "Radiation", "person", "hazard", ["radiation"], "radiation_low.svg", { modifierKey: "radiation", order: 120 }),
  status("overloaded", "Overloaded", "all", "reactor", ["heat", "actionRestriction"], "surge.svg", { managed: true, modifierKey: "overloaded", order: 130 }),
  status("preparedInterrupt", "Prepared", "person", "tactical", ["reaction", "prepared"], "readied_action.svg", { manual: false, managed: true, order: 140 }),
  status("personalCritical", "Personal Critical", "person", "damage", ["critical", "personal"], "surge.svg", { manual: false, managed: true, order: 145 }),
  status("battleArmorWorn", "Battle Armor Worn", "person", "battleArmor", ["battleArmor", "worn"], "cover.svg", { manual: false, managed: true, order: 146 }),
  status("battleArmorBreached", "Battle Armor Breached", "person", "battleArmor", ["battleArmor", "breached"], "surge.svg", { manual: false, managed: true, order: 147 }),
  status("battleArmorWrecked", "Battle Armor Wrecked", "person", "battleArmor", ["battleArmor", "wrecked"], "broken_weapon.svg", { manual: false, managed: true, order: 148 }),
  status("battleArmorRevealed", "Battle Armor Revealed", "person", "battleArmor", ["battleArmor", "revealed", "targeting"], "Targeting.webp", { icon: TARGETING_ICON, order: 149 }),
  status("machineCritical", "Machine Critical", "machine", "damage", ["critical", "system"], "surge.svg", { manual: false, managed: true, order: 150 }),
  status("destroyed", "Destroyed", "machine", "damage", ["catastrophic", "destroyed", "ruined"], "on_fire.svg", { order: 160 }),

  // Personal critical bands.
  status("windedMinor", "Winded I", "person", "critical", ["personalCritical", "burn"], "surge.svg", { manual: false, managed: true, order: 200 }),
  status("windedModerate", "Winded II", "person", "critical", ["personalCritical", "burn"], "surge.svg", { manual: false, managed: true, order: 201 }),
  status("windedSevere", "Winded III", "person", "critical", ["personalCritical", "burn"], "surge.svg", { manual: false, managed: true, order: 202 }),
  status("concussionMinor", "Concussion I", "person", "critical", ["personalCritical", "action"], "concussion.svg", { manual: false, managed: true, modifierKey: "concussionMinor", order: 210 }),
  status("concussionModerate", "Concussion II", "person", "critical", ["personalCritical", "action"], "concussion.svg", { manual: false, managed: true, modifierKey: "concussionModerate", order: 211 }),
  status("concussionSevere", "Concussion III", "person", "critical", ["personalCritical", "action"], "concussion.svg", { manual: false, managed: true, modifierKey: "concussionSevere", order: 212 }),
  status("crippledMinor", "Crippled I", "person", "critical", ["personalCritical", "movement"], "broken_leg.svg", { manual: false, managed: true, modifierKey: "crippledMinor", order: 220 }),
  status("crippledModerate", "Crippled II", "person", "critical", ["personalCritical", "movement"], "broken_leg.svg", { manual: false, managed: true, modifierKey: "crippledModerate", order: 221 }),
  status("crippledSevere", "Crippled III", "person", "critical", ["personalCritical", "movement"], "broken_leg.svg", { manual: false, managed: true, modifierKey: "crippledSevere", order: 222 }),
  status("hamperedMinor", "Hampered I", "person", "critical", ["personalCritical", "weapon"], "broken_weapon.svg", { manual: false, managed: true, order: 230 }),
  status("hamperedModerate", "Hampered II", "person", "critical", ["personalCritical", "weapon"], "broken_weapon.svg", { manual: false, managed: true, modifierKey: "hamperedModerate", order: 231 }),
  status("hamperedSevere", "Hampered III", "person", "critical", ["personalCritical", "weapon", "posture"], "broken_weapon.svg", { manual: false, managed: true, modifierKey: "hamperedSevere", order: 232 }),
  status("offbalanceMinor", "Off Balance I", "person", "critical", ["personalCritical", "attack", "defense"], "falling.svg", { manual: false, managed: true, modifierKey: "offbalanceMinor", order: 240 }),
  status("offbalanceModerate", "Off Balance II", "person", "critical", ["personalCritical", "attack", "defense"], "falling.svg", { manual: false, managed: true, modifierKey: "offbalanceModerate", order: 241 }),
  status("offbalanceSevere", "Off Balance III", "person", "critical", ["personalCritical", "attack", "defense"], "falling.svg", { manual: false, managed: true, modifierKey: "offbalanceSevere", order: 242 }),
  status("shakenMinor", "Shaken I", "person", "critical", ["personalCritical", "actionRestriction"], "brain_injury.svg", { manual: false, managed: true, order: 250 }),
  status("shakenModerate", "Shaken II", "person", "critical", ["personalCritical", "actionRestriction", "reaction"], "brain_injury.svg", { manual: false, managed: true, order: 251 }),
  status("shakenSevere", "Shaken III", "person", "critical", ["personalCritical", "actionRestriction", "reaction"], "brain_injury.svg", { manual: false, managed: true, order: 252 }),

  // Machine stability and movement.
  status("unstable", "Unstable", "machine", "stability", ["movement", "piloting", "knockdown"], "falling.svg", { order: 1000 }),
  status("staggeredMechanical", "Staggered (Mechanical)", "machine", "stability", ["movement", "actionRestriction"], "falling.svg", { order: 1010 }),
  status("proneMechFall", "Prone", "battlemech", "stability", ["movement", "posture", "standUp"], "prone.svg", { order: 1020 }),
  status("skidding", "Skidding", "machine", "movement", ["forcedMovement", "tracking"], "falling.svg", { order: 1030 }),
  status("stalled", "Stalled", "machine", "movement", ["movement", "actionRestriction"], "emp.svg", { order: 1040 }),
  status("limping", "Limping", "machine", "movement", ["movement", "location"], "broken_leg.svg", { order: 1050 }),
  status("jumpJetFailure", "Jump Jet Failure", "battlemech", "movement", ["jump", "equipment"], "surge.svg", { order: 1060 }),
  status("actuatorFailure", "Actuator Failure", "machine", "movement", ["movement", "handling"], "broken_leg.svg", { order: 1070 }),
  status("gyroDamage", "Gyro Damage", "battlemech", "movement", ["movement", "piloting"], "falling.svg", { order: 1080 }),

  // Machine weapons.
  status("weaponFailure", "Weapon Failure", "machine", "weapon", ["weapon", "mountScoped"], "broken_weapon.svg", { order: 1100 }),
  status("jammedBallistic", "Jammed (Ballistic)", "machine", "weapon", ["weapon", "ballistic", "clearAction"], "broken_weapon.svg", { order: 1110 }),
  status("armDestroyed", "Arm Destroyed", "battlemech", "damage", ["location", "weapon", "arm"], "dismembered_arm.svg", { order: 1120 }),

  // Sensors and electronics.
  status("sensorDegraded", "Sensor Degraded", "machine", "sensor", ["sensor", "perception"], "all-seeing-eye.webp", { order: 1200 }),
  status("sensorBlind", "Sensor Blind", "machine", "sensor", ["sensor", "targeting", "rangeLimit"], "damaged_eye.svg", { order: 1210 }),
  status("ecmJamming", "ECM Jamming", "machine", "electronicWarfare", ["ecm", "tracking"], "emp.svg", { order: 1220 }),
  status("ecmShrouded", "ECM Shrouded", "machine", "electronicWarfare", ["ecm", "defense"], "hidden.svg", { order: 1230 }),
  status("epmBoosted", "EPM Boosted", "machine", "electronicWarfare", ["ecm", "sensor"], "all-seeing-eye.webp", { order: 1240 }),
  status("eccmBoosted", "EPM Boosted (Legacy)", "machine", "electronicWarfare", ["ecm", "sensor", "legacy"], "all-seeing-eye.webp", { order: 1241 }),
  status("sensorLocked", "Sensor Locked", "machine", "sensor", ["sensor", "targeted"], "all-seeing-eye.webp", { order: 1250 }),
  status("trackingLost", "Tracking Lost", "machine", "sensor", ["sensor", "targetingData"], "damaged_eye.svg", { order: 1260 }),
  status("signatureRevealed", "Signature Revealed", "machine", "sensor", ["stealth", "signature", "revealed"], "Targeting.webp", { icon: TARGETING_ICON, order: 1270 }),
  status("stealthActive", "Stealth Active", "machine", "sensor", ["stealth", "signature", "active"], "hidden.svg", { order: 1271 }),
  status("highEmission", "High Emission", "machine", "sensor", ["stealth", "signature", "emission"], "surge.svg", { order: 1272 }),

  // Reactor and heat.
  status("reactorInstability", "Reactor Instability", "machine", "reactor", ["heat", "reactor", "escalating"], "surge.svg", { order: 1300 }),
  status("shutdown", "Shutdown", "machine", "reactor", ["heat", "actionRestriction"], "emp.svg", { order: 1310 }),
  status("overheating", "Thermal Surge", "machine", "reactor", ["heat", "escalating"], "on_fire_mild.svg", { order: 1320 }),
  status("coolingFailure", "Cooling Failure", "machine", "reactor", ["heat", "cooling"], "surge.svg", { order: 1325 }),
  status("reactorBreach", "Reactor Breach", "machine", "reactor", ["reactor", "catastrophic", "countdown"], "radiation_high.svg", { order: 1330 }),

  // Machine damage and battlefield exposure.
  status("legDestroyed", "Leg Destroyed", "battlemech", "damage", ["location", "movement", "leg"], "dismembered_leg.svg", { order: 1400 }),
  status("exposed", "Exposed", "machine", "tactical", ["defense", "vulnerable"], "Targeting.webp", { icon: TARGETING_ICON, order: 1410 }),
  status("entrenchedHullDown", "Entrenched / Hull Down", "machine", "tactical", ["defense", "cover"], "cover.svg", { order: 1420 }),
  status("obscured", "Obscured (Smoke/Dust)", "machine", "visibility", ["visibility", "cover"], "hidden.svg", { order: 1430 }),
  status("obscuredLight", "Obscured (Light)", "machine", "visibility", ["visibility", "cover", "light"], "hidden.svg", { order: 1431 }),
  status("obscuredHeavy", "Obscured (Heavy)", "machine", "visibility", ["visibility", "cover", "heavy"], "hidden.svg", { order: 1432 }),

  // Tactical markers.
  status("evasiveWeave", "Evasive", "machine", "tactical", ["defense", "attackPenalty", "selfInduced"], "falling.svg", { order: 1500 }),
  status("braced", "Braced", "machine", "tactical", ["defense", "mobilityPenalty"], "cover.svg", { order: 1510 }),
  status("overextended", "Overextended", "machine", "tactical", ["attack", "defensePenalty"], "surge.svg", { order: 1520 }),
  status("targetFocused", "Target Focused", "machine", "tactical", ["targeted", "attack"], "all-seeing-eye.webp", { order: 1530 }),
  status("suppressedMechanical", "Suppressed", "machine", "tactical", ["offense", "suppressed"], "suppressed.svg", { order: 1540 }),
  status("attachedToMachine", "Attached to Machine", "person", "battleArmor", ["battleArmor", "attached"], "grappled.svg", { order: 1600 }),
  status("tagged", "TAGed", "all", "targeting", ["tag", "designated", "targeting"], "Targeting.webp", { icon: TARGETING_ICON, order: 1610 }),
  status("narced", "NARCed", "all", "targeting", ["narc", "beacon", "targeting"], "Targeting.webp", { icon: TARGETING_ICON, order: 1620 }),
]);

function status(id, label, actorGroup, category, tags, icon, options = {}) {
  return {
    id,
    label,
    actorGroup,
    category,
    tags,
    icon: options.icon ?? `${DEFAULT_ICON_ROOT}/${icon}`,
    manual: options.manual ?? true,
    managed: options.managed ?? false,
    modifierKey: options.modifierKey ?? "",
    order: options.order ?? 0,
  };
}

function hasFoundry() {
  return typeof foundry !== "undefined" && foundry?.utils;
}

function clone(value) {
  if (hasFoundry() && typeof foundry.utils.deepClone === "function") {
    return foundry.utils.deepClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

function bool(value, fallback = false) {
  if (typeof value === "boolean") return value;
  const raw = String(value ?? "").trim().toLowerCase();
  if (!raw) return fallback;
  return ["true", "1", "yes", "y", "on"].includes(raw);
}

export function getDefaultStatusConditionCatalog() {
  return clone(DEFAULT_STATUS_CONDITION_CATALOG);
}

export function normalizeStatusTagId(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";

  const words = raw
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^A-Za-z0-9]+/)
    .map(word => word.trim())
    .filter(Boolean);

  if (!words.length) return "";

  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      return index === 0 ? lower : `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`;
    })
    .join("");
}

export function normalizeStatusTags(value = []) {
  const source = Array.isArray(value)
    ? value
    : String(value ?? "").split(",");
  const seen = new Set();
  const tags = [];

  for (const entry of source) {
    const tag = normalizeStatusTagId(entry);
    if (!tag || seen.has(tag)) continue;
    seen.add(tag);
    tags.push(tag);
  }

  return tags;
}

export function serializeStatusTags(tags = []) {
  return normalizeStatusTags(tags).join(", ");
}

export function normalizeActorGroup(value, fallback = "person") {
  const raw = String(value ?? "").trim();
  const lower = raw.toLowerCase();
  if (lower === "battlemech") return "battlemech";
  if (Object.prototype.hasOwnProperty.call(ACTOR_TYPES_BY_GROUP, lower)) return lower;
  return fallback;
}

export function getActorTypesForStatusGroup(actorGroup) {
  return [...(ACTOR_TYPES_BY_GROUP[normalizeActorGroup(actorGroup)] ?? [])];
}

export function normalizeStatusConditionEntry(entry = {}, { strict = false, index = 0 } = {}) {
  const errors = [];
  const prefix = `Row ${index + 1}`;
  const id = String(entry?.id ?? "").trim();
  const label = String(entry?.label ?? "").trim();
  const actorGroupRaw = String(entry?.actorGroup ?? "person").trim();
  const actorGroup = normalizeActorGroup(actorGroupRaw, "");
  const category = normalizeStatusTagId(entry?.category ?? "general") || "general";
  const tags = normalizeStatusTags(entry?.tags);
  const icon = String(entry?.icon ?? "").trim();
  const modifierKey = String(entry?.modifierKey ?? "").trim();
  const orderValue = Number(entry?.order ?? 0);

  if (!id) errors.push(`${prefix}: id cannot be blank.`);
  if (!label) errors.push(`${prefix}: label cannot be blank.`);
  if (!actorGroup || actorGroupRaw && !Object.prototype.hasOwnProperty.call(ACTOR_TYPES_BY_GROUP, actorGroup)) {
    errors.push(`${prefix}: actorGroup must be one of ${Object.keys(ACTOR_TYPES_BY_GROUP).join(", ")}.`);
  }
  if (modifierKey && !STATUS_MAP?.[modifierKey]) {
    errors.push(`${prefix}: modifierKey "${modifierKey}" is not a known mechanics-backed status.`);
  }
  if (!Number.isFinite(orderValue)) {
    errors.push(`${prefix}: order must be numeric.`);
  }

  if (strict && errors.length) {
    const error = new Error(errors[0]);
    error.validationErrors = errors;
    throw error;
  }

  return {
    id,
    label: label || id || "Status",
    actorGroup: actorGroup || "person",
    category,
    tags,
    icon,
    manual: bool(entry?.manual, true),
    managed: bool(entry?.managed, false),
    modifierKey,
    order: Number.isFinite(orderValue) ? Math.trunc(orderValue) : 0,
  };
}

export function normalizeStatusConditionCatalog(value = [], { strict = false } = {}) {
  const source = Array.isArray(value) ? value : [];
  const errors = [];
  const seen = new Set();
  const normalized = [];

  source.forEach((entry, index) => {
    try {
      const item = normalizeStatusConditionEntry(entry, { strict, index });
      if (!item.id) return;

      const key = item.id.toLowerCase();
      if (seen.has(key)) {
        if (strict) errors.push(`Row ${index + 1}: duplicate id "${item.id}".`);
        return;
      }

      seen.add(key);
      normalized.push(item);
    } catch (error) {
      if (strict) {
        errors.push(...(Array.isArray(error.validationErrors) ? error.validationErrors : [error.message]));
      }
    }
  });

  if (strict && errors.length) {
    const error = new Error(errors[0]);
    error.validationErrors = errors;
    throw error;
  }

  return normalized.sort((left, right) => {
    if (left.order !== right.order) return left.order - right.order;
    return left.label.localeCompare(right.label);
  });
}

export function getStatusConditionCatalog(value = undefined) {
  if (value !== undefined) return normalizeStatusConditionCatalog(value, { strict: false });

  return readStatusConditionCatalogSetting();
}

function mergeCatalogWithDefaults(value = []) {
  const defaultsById = new Map(getDefaultStatusConditionCatalog().map(entry => [entry.id, entry]));
  const existing = normalizeStatusConditionCatalog(value, { strict: false });
  const merged = [...existing];
  const existingIds = new Set(existing.map(entry => entry.id));

  for (const [id, entry] of defaultsById.entries()) {
    if (existingIds.has(id)) continue;
    merged.push(clone(entry));
  }

  return normalizeStatusConditionCatalog(merged, { strict: false });
}

export async function ensureStatusConditionCatalogDefaults() {
  try {
    if (!globalThis.game?.settings?.settings?.has?.(`${SYSTEM_NAME}.${SETTING_STATUS_CONDITION_CATALOG}`)) return;
    const current = game.settings.get(SYSTEM_NAME, SETTING_STATUS_CONDITION_CATALOG);
    const merged = mergeCatalogWithDefaults(current);
    if (JSON.stringify(current) !== JSON.stringify(merged)) {
      await game.settings.set(SYSTEM_NAME, SETTING_STATUS_CONDITION_CATALOG, merged);
    }
  } catch (_) {
    // Ignore bootstrap-time setting failures.
  }
}

function readStatusConditionCatalogSetting() {
  const settings = globalThis.game?.settings;
  try {
    if (settings?.settings?.has?.(`${SYSTEM_NAME}.${SETTING_STATUS_CONDITION_CATALOG}`)) {
      return mergeCatalogWithDefaults(settings.get(SYSTEM_NAME, SETTING_STATUS_CONDITION_CATALOG));
    }
  } catch (_) {
    // Fall through to shipped defaults during early boot.
  }
  return getDefaultStatusConditionCatalog();
}

export function getStatusConditionDefinition(statusId, catalog = getStatusConditionCatalog()) {
  const id = String(statusId ?? "").trim();
  if (!id) return null;
  return catalog.find(entry => String(entry.id ?? "").trim() === id) ?? null;
}

export function getActorType(actorOrType = null) {
  return String(
    typeof actorOrType === "string"
      ? actorOrType
      : actorOrType?.type ?? ""
  ).trim();
}

export function isStatusConditionApplicableToActor(entry, actorOrType = null) {
  const type = getActorType(actorOrType);
  if (!type || !entry) return false;
  return getActorTypesForStatusGroup(entry.actorGroup).includes(type);
}

export function getStatusConditionModifierKey(statusId, actor = null) {
  const entry = getStatusConditionDefinition(statusId);
  if (!entry || !isStatusConditionApplicableToActor(entry, actor)) return "";
  return entry.modifierKey || "";
}

export function buildStatusInstanceMetadata({ statusId = "", actor = null, metadata = {}, catalogEntry = null } = {}) {
  const entry = catalogEntry ?? getStatusConditionDefinition(statusId);
  const tags = normalizeStatusTags(metadata?.tags ?? entry?.tags ?? []);

  return {
    id: String(statusId || entry?.id || "").trim(),
    category: normalizeStatusTagId(metadata?.category ?? entry?.category ?? "general") || "general",
    tags,
    actorGroup: String(metadata?.actorGroup ?? entry?.actorGroup ?? "").trim(),
    actorType: getActorType(actor),
    scope: String(metadata?.scope ?? "").trim(),
    location: String(metadata?.location ?? "").trim(),
    itemUuid: String(metadata?.itemUuid ?? "").trim(),
    targetUuid: String(metadata?.targetUuid ?? "").trim(),
    severity: String(metadata?.severity ?? "").trim(),
    notes: String(metadata?.notes ?? "").trim(),
  };
}

export function buildFoundryStatusEffects(catalog = getStatusConditionCatalog()) {
  return normalizeStatusConditionCatalog(catalog, { strict: false }).map(entry => ({
    id: entry.id,
    name: entry.label,
    label: entry.label,
    img: entry.icon,
    icon: entry.icon,
  }));
}

export function configureMWDStatusEffects() {
  if (typeof CONFIG === "undefined") return [];

  const effects = buildFoundryStatusEffects();
  CONFIG.statusEffects = effects;
  return effects;
}
