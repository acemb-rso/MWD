// src/modules/mwd/battlemech-weapon-groups.js
// Purpose: Centralizes BattleMech ranged weapon-group legality, aggregation,
// and activation-local availability so sheets and resolvers share one source.

import { TEMPLATE, startCase } from "../constants.js";
import {
  doesHardpointAcceptItem,
  getMachineHardpointByItemId,
} from "./machine-hardpoints.js";

const RANGE_ORDER = ["close", "near", "far", "extreme"];
// Preferred default engagement band: near is the sweet spot; fall back toward
// closer bands if the weapon can't reach near.
const DEFAULT_BAND_PREFERENCE = ["near", "close", "far", "extreme"];

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeId(value = "") {
  return String(value ?? "").trim();
}


function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function normalizeRangeCap(range = {}) {
  const raw = String(range?.max ?? range?.bandCap ?? "near").trim().toLowerCase();
  return RANGE_ORDER.includes(raw) ? raw : "near";
}

function getRangeCapIndex(rangeCap = "near") {
  const index = RANGE_ORDER.indexOf(String(rangeCap ?? "").trim().toLowerCase());
  return index >= 0 ? index : RANGE_ORDER.indexOf("near");
}

function chooseWorseRangeCap(left = "near", right = "near") {
  return getRangeCapIndex(left) <= getRangeCapIndex(right) ? left : right;
}

function normalizeRangeData(range = {}) {
  const max = normalizeRangeCap(range);
  return {
    max,
    close: toNumber(range?.close ?? range?.short, 0),
    near: toNumber(range?.near ?? range?.medium, 0),
    far: toNumber(range?.far ?? range?.long, 0),
    extreme: toNumber(range?.extreme, 0),
  };
}

function getWeaponCategory(weapon = null, profile = null) {
  return String(
    profile?.category
      ?? weapon?.system?.category
      ?? weapon?.system?.weaponCategory
      ?? "ranged"
  ).trim().toLowerCase() || "ranged";
}

function getWeaponResolverKey(weapon = null, profile = null) {
  return String(
    profile?.resolverKey
      ?? profile?.resolution?.resolverKey
      ?? weapon?.system?.resolution?.resolverKey
      ?? weapon?.system?.resolverKey
      ?? "standard"
  ).trim().toLowerCase() || "standard";
}

function isSpecialCaseRangedProfile(weapon = null, profile = null) {
  const resolverKey = getWeaponResolverKey(weapon, profile);
  if (resolverKey !== "standard") return true;

  const areaKind = String(
    profile?.areaEffect?.kind
      ?? weapon?.system?.areaEffect?.kind
      ?? ""
  ).trim().toLowerCase();
  if (areaKind === "persistent") return true;

  const legacyArea = String(
    profile?.area
      ?? weapon?.system?.area
      ?? "none"
  ).trim().toLowerCase();
  if (legacyArea && legacyArea !== "none") return true;

  return false;
}

function normalizeAttackRatings(bands = {}) {
  return RANGE_ORDER.reduce((result, band) => {
    result[band] = toNumber(bands?.[band], 0);
    return result;
  }, {});
}

function getBaseBattlemechWeaponGroups(actor = null) {
  const raw = actor?.system?.mwd?.weaponGroups;
  if (raw) {
    const configured = Array.isArray(raw) ? raw : Object.values(raw);
    if (configured.length) return configured;
  }
  const prepared = actor?.system?.weaponGroups;
  return Array.isArray(prepared) ? prepared : [];
}

export function getBattlemechConfiguredWeaponGroups(actor = null) {
  return getBaseBattlemechWeaponGroups(actor).map((group, index) => ({
    id: normalizeId(group?.id) || `group-${index + 1}`,
    index: Number.isInteger(Number(group?.index)) ? Number(group.index) : index,
    name: String(group?.name ?? `Weapon Group ${index + 1}`).trim() || `Weapon Group ${index + 1}`,
    weaponIds: asArray(group?.weaponIds).map(normalizeId).filter(Boolean),
    isPrimary: Boolean(group?.isPrimary),
  }));
}

export function getBattlemechUsedWeaponGroupIds(stateOrSnapshot = null) {
  const state = stateOrSnapshot?.state ?? stateOrSnapshot ?? {};
  return asArray(state?.actionState?.usedWeaponGroupIds)
    .map(normalizeId)
    .filter(Boolean);
}

export function markBattlemechWeaponGroupUsed(state = {}, groupId = "") {
  const normalizedId = normalizeId(groupId);
  if (!normalizedId) return state;

  state.actionState ??= {};
  const existingIds = new Set(getBattlemechUsedWeaponGroupIds(state));
  existingIds.add(normalizedId);
  state.actionState.usedWeaponGroupIds = Array.from(existingIds);
  return state;
}

function inspectBattlemechWeaponGroup(actor = null, group = null) {
  const weaponIds = asArray(group?.weaponIds).map(normalizeId).filter(Boolean);
  const presentWeapons = weaponIds
    .map(id => actor?.items?.get?.(id) ?? null)
    .filter(Boolean);
  const missingWeaponIds = weaponIds.filter(id => !presentWeapons.some(weapon => normalizeId(weapon?.id) === id));

  const memberWeapons = [];
  const memberHardpoints = [];
  const compatibilityWarnings = [];
  const blockingReasons = [];

  for (const weapon of presentWeapons) {
    const itemType = weapon?.canonicalType ?? weapon?.type;
    if (itemType !== TEMPLATE.itemType.mechWeapon) {
      blockingReasons.push(`${weapon?.name ?? "Grouped item"} is not a BattleMech weapon.`);
      continue;
    }

    if (weapon?.isActive?.() === false) {
      compatibilityWarnings.push(`${weapon.name ?? "Weapon"} is inactive and does not contribute to ranged fire.`);
      continue;
    }

    const profile = weapon.getCombatProfile?.() ?? null;
    const category = getWeaponCategory(weapon, profile);
    if (category === "melee") {
      compatibilityWarnings.push(`${weapon.name ?? "Weapon"} is melee-only and is ignored for ranged fire.`);
      continue;
    }

    if (isSpecialCaseRangedProfile(weapon, profile)) {
      blockingReasons.push(`${weapon.name ?? "Weapon"} uses a special attack mode and cannot be grouped in v1.`);
      continue;
    }

    const mountedHardpoint = getMachineHardpointByItemId(actor, weapon?.id);
    if (!mountedHardpoint) {
      blockingReasons.push(`${weapon.name ?? "Weapon"} is not mounted in a loaded hardpoint.`);
      continue;
    }

    if (!doesHardpointAcceptItem(mountedHardpoint, weapon)) {
      blockingReasons.push(`${weapon.name ?? "Weapon"} no longer matches its assigned hardpoint.`);
      continue;
    }

    memberWeapons.push({
      id: normalizeId(weapon?.id),
      name: String(weapon?.name ?? "Weapon").trim() || "Weapon",
      img: weapon?.img ?? "",
      skill: String(profile?.skill ?? weapon?.system?.skill ?? "gunnery").trim() || "gunnery",
      damageType: String(profile?.damageType ?? weapon?.system?.damageType ?? "kinetic").trim() || "kinetic",
      damageTypeLabel: String(
        profile?.damageTypeLabel
          ?? weapon?.getDamageTypeLabel?.()
          ?? profile?.damageType
          ?? weapon?.system?.damageType
          ?? "kinetic"
      ).trim() || "kinetic",
      resolverKey: getWeaponResolverKey(weapon, profile),
      range: normalizeRangeData(profile?.range ?? weapon?.system?.range ?? {}),
      rangeCap: normalizeRangeCap(profile?.range ?? weapon?.system?.range ?? {}),
      attackRatingBand: normalizeAttackRatings(profile?.attackRatingBand ?? weapon?.system?.attackRatingBand ?? {}),
      damage: toNumber(profile?.damage ?? weapon?.system?.damage, 0),
      clusteringDice: Math.max(0, toNumber(profile?.clusteringDice, 0)),
      ap: toNumber(profile?.ap ?? weapon?.system?.ap ?? weapon?.system?.armorPiercing, 0),
      heat: toNumber(weapon?.system?.heat ?? profile?.heat, 0),
      notes: String(profile?.notes ?? weapon?.system?.notes ?? weapon?.system?.description ?? "").trim(),
      skillDef: profile?.skillDef ?? null,
      hardpointId: normalizeId(mountedHardpoint?.id),
      hardpointType: String(mountedHardpoint?.type ?? "").trim(),
      hardpointSize: String(mountedHardpoint?.size ?? "").trim(),
      hardpointLocation: String(mountedHardpoint?.location ?? "").trim(),
      sourceWeapon: weapon,
    });
    memberHardpoints.push({
      id: normalizeId(mountedHardpoint?.id),
      type: String(mountedHardpoint?.type ?? "").trim(),
      size: String(mountedHardpoint?.size ?? "").trim(),
      location: String(mountedHardpoint?.location ?? "").trim(),
      itemId: normalizeId(weapon?.id),
      weaponName: String(weapon?.name ?? "Weapon").trim() || "Weapon",
    });
  }

  if (missingWeaponIds.length) {
    blockingReasons.push(`Missing weapon ids: ${missingWeaponIds.join(", ")}.`);
  }

  if (memberWeapons.length === 0 && blockingReasons.length === 0) {
    blockingReasons.push("No active ranged weapons in this group.");
  }

  const uniqueDamageTypes = new Set(memberWeapons.map(weapon => weapon.damageType));
  if (uniqueDamageTypes.size > 1) {
    blockingReasons.push("All grouped ranged weapons must share the same damage type.");
  }

  const uniqueSkills = new Set(memberWeapons.map(weapon => weapon.skill));
  if (uniqueSkills.size > 1) {
    blockingReasons.push("All grouped ranged weapons must use the same attack skill.");
  }

  const uniqueResolvers = new Set(memberWeapons.map(weapon => weapon.resolverKey));
  if (uniqueResolvers.size > 1) {
    blockingReasons.push("All grouped ranged weapons must share the same resolver family.");
  }

  const firstWeapon = memberWeapons[0] ?? null;
  const rangeCap = memberWeapons.reduce(
    (current, weapon) => chooseWorseRangeCap(current, weapon.rangeCap),
    firstWeapon?.rangeCap ?? "near"
  );
  const rangeCapIndex = getRangeCapIndex(rangeCap);
  const attackRatings = RANGE_ORDER.reduce((bands, band, index) => {
    bands[band] = index <= rangeCapIndex
      ? memberWeapons.reduce((sum, weapon) => sum + toNumber(weapon.attackRatingBand?.[band], 0), 0)
      : 0;
    return bands;
  }, {});

    const range = {
    ...(firstWeapon?.range ?? normalizeRangeData({ max: rangeCap })),
      max: rangeCap,
    };
  const defaultRangeBand = DEFAULT_BAND_PREFERENCE
    .find(band => getRangeCapIndex(band) <= rangeCapIndex)
    ?? "close";

  const attackSummary = memberWeapons.length > 0 ? {
    damage: memberWeapons.reduce((sum, weapon) => sum + weapon.damage, 0),
    clusteringDice: memberWeapons.reduce((sum, weapon) => sum + weapon.clusteringDice, 0),
    ap: Math.max(0, ...memberWeapons.map(weapon => weapon.ap)),
    heat: memberWeapons.reduce((sum, weapon) => sum + weapon.heat, 0),
    damageType: firstWeapon?.damageType ?? "kinetic",
    damageTypeLabel: firstWeapon?.damageTypeLabel ?? startCase(firstWeapon?.damageType ?? "kinetic"),
    rangeCap,
    range,
    defaultRangeBand,
    attackRatings,
  } : null;

  return {
    id: normalizeId(group?.id),
    index: Number.isInteger(Number(group?.index)) ? Number(group.index) : 0,
    name: String(group?.name ?? "Weapon Group").trim() || "Weapon Group",
    weaponIds,
    isPrimary: Boolean(group?.isPrimary),
    missingWeaponIds,
    memberWeapons: memberWeapons.map(weapon => ({
      id: weapon.id,
      name: weapon.name,
      img: weapon.img,
      skill: weapon.skill,
      damageType: weapon.damageType,
      damageTypeLabel: weapon.damageTypeLabel,
      clusteringDice: weapon.clusteringDice,
      heat: weapon.heat,
    })),
    memberHardpoints,
    compatibilityWarnings,
    baseDisableReason: blockingReasons[0] ?? "",
    isAttackLegal: blockingReasons.length === 0 && memberWeapons.length > 0,
    attackSummary,
    _memberProfiles: memberWeapons,
  };
}

export function prepareBattlemechWeaponGroups(actor = null, { usedWeaponGroupIds = [] } = {}) {
  const usedIds = new Set(asArray(usedWeaponGroupIds).map(normalizeId).filter(Boolean));

  return getBattlemechConfiguredWeaponGroups(actor).map(group => {
    const inspected = inspectBattlemechWeaponGroup(actor, group);
    const usedThisActivation = usedIds.has(inspected.id);
    const isAvailableThisActivation = !usedThisActivation;
    const disableReason = usedThisActivation
      ? "Already fired this activation."
      : inspected.baseDisableReason;

    return {
      id: inspected.id,
      index: inspected.index,
      name: inspected.name,
      weaponIds: inspected.weaponIds,
      isPrimary: inspected.isPrimary,
      missingWeaponIds: inspected.missingWeaponIds,
      memberWeapons: inspected.memberWeapons,
      memberHardpoints: inspected.memberHardpoints,
      compatibilityWarnings: inspected.compatibilityWarnings,
      isAttackLegal: inspected.isAttackLegal,
      isAvailableThisActivation,
      disableReason,
      attackSummary: inspected.attackSummary,
      _memberProfiles: inspected._memberProfiles,
    };
  });
}

export function getBattlemechPreparedWeaponGroup(actor = null, groupId = "", { usedWeaponGroupIds = [] } = {}) {
  const normalizedId = normalizeId(groupId);
  if (!normalizedId) return null;

  return prepareBattlemechWeaponGroups(actor, { usedWeaponGroupIds })
    .find(group => group.id === normalizedId) ?? null;
}

export function buildBattlemechWeaponGroupAttackProfile(actor = null, groupId = "", { usedWeaponGroupIds = [] } = {}) {
  const group = getBattlemechPreparedWeaponGroup(actor, groupId, { usedWeaponGroupIds });
  if (!group) {
    return { ok: false, reason: "That weapon group no longer exists.", group: null, profile: null };
  }
  if (!group.isAttackLegal) {
    return { ok: false, reason: group.disableReason || "That weapon group cannot be fired.", group, profile: null };
  }
  if (!group.isAvailableThisActivation) {
    return { ok: false, reason: group.disableReason || "That weapon group has already fired this activation.", group, profile: null };
  }

  const firstMember = group._memberProfiles?.[0] ?? null;
  const summary = group.attackSummary ?? {};
  const notes = [
    ...asArray(group.compatibilityWarnings),
    ...asArray(group._memberProfiles).map(weapon => weapon.notes).filter(Boolean),
  ].join("\n");

  return {
    ok: true,
    reason: "",
    group,
    profile: {
      id: group.id,
      uuid: actor?.uuid ?? null,
      name: group.name || "Weapon Group",
      img: firstMember?.img ?? "",
      item: null,
      type: "mechWeaponGroup",
      equipped: true,
      isPrimary: Boolean(group.isPrimary),
      category: "ranged",
      skill: firstMember?.skill ?? "gunnery",
      skillDef: firstMember?.skillDef ?? null,
      damage: toNumber(summary.damage, 0),
      clusteringDice: Math.max(0, toNumber(summary.clusteringDice, 0)),
      ap: toNumber(summary.ap, 0),
      heat: toNumber(summary.heat, 0),
      damageType: String(summary.damageType ?? "kinetic").trim() || "kinetic",
      damageTypeLabel: String(summary.damageTypeLabel ?? summary.damageType ?? "kinetic").trim() || "kinetic",
      attackRatingBand: normalizeAttackRatings(summary.attackRatings ?? {}),
      range: normalizeRangeData(summary.range ?? { max: summary.rangeCap ?? "near" }),
      defaultRangeBand: String(summary.defaultRangeBand ?? "near").trim() || "near",
      traits: [],
      effects: {},
      notes,
      resolverKey: "standard",
      capabilityReport: {
        isTemplated: false,
        errors: [],
      },
      attackSummary: {
        damage: toNumber(summary.damage, 0),
        clusteringDice: Math.max(0, toNumber(summary.clusteringDice, 0)),
        ap: toNumber(summary.ap, 0),
        heat: toNumber(summary.heat, 0),
        damageType: String(summary.damageType ?? "kinetic").trim() || "kinetic",
        damageTypeLabel: String(summary.damageTypeLabel ?? summary.damageType ?? "kinetic").trim() || "kinetic",
        rangeCap: String(summary.rangeCap ?? "near").trim() || "near",
        attackRatings: normalizeAttackRatings(summary.attackRatings ?? {}),
      },
      machineWeaponGroup: {
        id: group.id,
        weaponIds: group.memberWeapons.map(weapon => weapon.id),
        weaponNames: group.memberWeapons.map(weapon => weapon.name),
        memberWeapons: group.memberWeapons.map(weapon => ({ id: weapon.id, name: weapon.name })),
        hardpointIds: group.memberHardpoints.map(hardpoint => hardpoint.id),
        memberHardpoints: group.memberHardpoints.map(hardpoint => ({
          id: hardpoint.id,
          type: hardpoint.type,
          size: hardpoint.size,
          location: hardpoint.location,
          itemId: hardpoint.itemId,
          weaponName: hardpoint.weaponName,
        })),
      },
      compatibilityWarnings: [...group.compatibilityWarnings],
    },
  };
}
