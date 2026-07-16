// src/modules/mwd/machine-melee-weapons.js
// Purpose: Resolves BattleMech melee weapon formulas into concrete attack stats.
// Workflow: selected melee profile plus machine/pilot context -> numeric damage
// and AR bands -> standard machine attack resolution consumes an ordinary profile.

import { TEMPLATE } from "../core/constants.js";
import { isMachineActor } from "../utils/actor-guards.js";
import { toNumber } from "../utils/coercion.js";
import { getMachineWeaponDamageTypeLabel, normalizeMachineWeaponDamageType } from "./machine-weapon-types.js";

export const MACHINE_STANDARD_MELEE_ID = "machineStandardMelee";

const RANGE_ORDER = Object.freeze(["close", "near", "far", "extreme"]);

function normalizeRangeKey(value = "close", fallback = "close") {
  const normalized = String(value ?? "").trim().toLowerCase();
  return RANGE_ORDER.includes(normalized) ? normalized : fallback;
}

function rangeIndex(value = "close") {
  const index = RANGE_ORDER.indexOf(normalizeRangeKey(value));
  return index >= 0 ? index : 0;
}

function isMachineMeleeProfile(profile = null) {
  const category = String(profile?.category ?? profile?.weaponCategory ?? "").trim().toLowerCase();
  const type = String(profile?.type ?? "").trim();
  return category === "melee" && (
    type === TEMPLATE.itemType.mechWeapon
    || type === "vehicleWeapon"
    || profile?.isSynthetic
  );
}

export function getMachineMeleeBaseDamage(machineActor = null) {
  // Baseline physical damage scales from tonnage so unarmed attacks and simple
  // melee weapons can share the same machine-size foundation.
  const tonnage = Math.max(0, toNumber(
    machineActor?.system?.mwd?.tonnage
      ?? machineActor?.system?.tonnage
      ?? machineActor?.system?.mwd?.chassis?.tonnage,
    0
  ));
  return Math.floor(tonnage / 10);
}

export function getPilotReflexes(pilotActor = null) {
  return Math.max(0, toNumber(
    pilotActor?.getAttributeValue?.(TEMPLATE.actorAttributes.reflexes)
      ?? pilotActor?.system?.attributes?.reflexes?.value,
    0
  ));
}

function getMeleeConfig(profile = {}) {
  const system = profile?.item?.system ?? {};
  const config = system.machineMelee && typeof system.machineMelee === "object"
    ? system.machineMelee
    : {};
  return { system, config };
}

function getDamageBonus(profile = {}) {
  const { system, config } = getMeleeConfig(profile);
  return toNumber(config.damageBonus ?? system.damage ?? profile.damage, 0);
}

function getArModifier(profile = {}, band = "close") {
  const { system, config } = getMeleeConfig(profile);
  return toNumber(
    config.attackRatingBand?.[band]
      ?? config.arModifier?.[band]
      ?? system.attackRatingBand?.[band]
      ?? profile.attackRatingBand?.[band],
    0
  );
}

function getRangeCap(profile = {}) {
  const { system, config } = getMeleeConfig(profile);
  return normalizeRangeKey(
    config.rangeMax
      ?? config.reach
      ?? system.range?.max
      ?? profile.range?.max
      ?? profile.defaultRangeBand
      ?? "close",
    "close"
  );
}

export function buildStandardMachineMeleeProfile(machineActor = null) {
  // Synthetic unarmed profile: it looks like a normal mech weapon to the attack
  // engine but has no backing item document.
  const baseDamageType = "concussive";
  return {
    id: MACHINE_STANDARD_MELEE_ID,
    uuid: machineActor?.uuid ?? null,
    name: "Standard Melee",
    img: null,
    item: null,
    type: TEMPLATE.itemType.mechWeapon,
    equipped: true,
    isPrimary: false,
    isSynthetic: true,
    category: "melee",
    weaponCategory: "melee",
    skill: "meleeCombat",
    skillDef: null,
    damage: 0,
    ap: 0,
    heat: 0,
    baseDamageType,
    baseDamageTypeLabel: getMachineWeaponDamageTypeLabel(baseDamageType),
    damageType: baseDamageType,
    damageTypeLabel: getMachineWeaponDamageTypeLabel(baseDamageType),
    attackRatingBand: { close: 0, near: 0, far: 0, extreme: 0 },
    range: { max: "close", close: 0, near: 0, far: 0, extreme: 0 },
    defaultRangeBand: "close",
    traits: [],
    effects: {},
    notes: "Baseline unarmed strike / kick / punch",
    resolverKey: "standard",
    capabilityReport: { isTemplated: false, errors: [] },
  };
}

export function resolveMachineMeleeCombatProfile({
  machineActor = null,
  pilotActor = null,
  profile = null,
} = {}) {
  // Resolve authored formulas into concrete attack values at roll time, when
  // both the machine tonnage and current pilot reflexes are known.
  if (!isMachineActor(machineActor) || !isMachineMeleeProfile(profile)) return profile;

  const rangeCap = getRangeCap(profile);
  const capIndex = rangeIndex(rangeCap);
  const pilotReflexes = getPilotReflexes(pilotActor);
  const baseDamage = getMachineMeleeBaseDamage(machineActor);
  const damageBonus = getDamageBonus(profile);
  const baseDamageType = normalizeMachineWeaponDamageType(profile?.baseDamageType ?? profile?.damageType, "concussive");
  const damageType = normalizeMachineWeaponDamageType(profile?.damageType ?? baseDamageType, baseDamageType);

  const attackRatingBand = RANGE_ORDER.reduce((bands, band, index) => {
    bands[band] = index <= capIndex ? Math.max(0, pilotReflexes + getArModifier(profile, band)) : 0;
    return bands;
  }, {});

  return {
    ...profile,
    category: "melee",
    weaponCategory: "melee",
    skill: "meleeCombat",
    damage: Math.max(0, baseDamage + damageBonus),
    heat: Math.max(0, toNumber(profile?.heat ?? profile?.item?.system?.heat, 0)),
    baseDamageType,
    baseDamageTypeLabel: getMachineWeaponDamageTypeLabel(baseDamageType),
    damageType,
    damageTypeLabel: getMachineWeaponDamageTypeLabel(damageType),
    attackRatingBand,
    range: {
      ...(profile?.range ?? {}),
      max: rangeCap,
    },
    defaultRangeBand: "close",
    machineMelee: {
      baseDamage,
      damageBonus,
      pilotReflexes,
      rangeCap,
      attackRatingModifiers: RANGE_ORDER.reduce((mods, band) => {
        mods[band] = getArModifier(profile, band);
        return mods;
      }, {}),
    },
  };
}

export function isMachineMeleeRangeAllowed(profile = null, rangeBand = "close") {
  if (!isMachineMeleeProfile(profile)) return true;
  const cap = getRangeCap(profile);
  const requested = normalizeRangeKey(rangeBand, "close");
  return rangeIndex(requested) <= rangeIndex(cap);
}
