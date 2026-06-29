// src/modules/mwd/personal-damage.js
// Purpose: Defines personal-scale damage/profile normalization and resolution helpers.
// How it fits: Provides the personal weapon/armor data model used by sheets and attack resolution.

import {
  createCapabilityMigrationReport,
  normalizePayloadCapabilityState,
  normalizePersonalWeaponFireModes,
  normalizePersonalWeaponKeywords,
  normalizePersonalWeaponResolution,
  normalizePersonalWeaponTemplate,
  normalizeWeaponCapabilityState,
  validateTemplatedCapability,
} from "./personal-weapon-capabilities.js";
import {
  AREA_EFFECT_KINDS,
  normalizeAreaEffect,
} from "../area-effects/area-effect-engine.js";


const PERSONAL_DAMAGE_TYPE_LABELS = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical",
});

export const PERSONAL_DAMAGE_TYPES = Object.freeze(
  Object.entries(PERSONAL_DAMAGE_TYPE_LABELS).map(([value, label]) => ({ value, label }))
);

export const PERSONAL_DAMAGE_TYPE_MAP = Object.freeze({
  ballistic: "penetrating",
  kinetic: "concussive",
  explosive: "concussive",
  laser: "energy",
  plasma: "thermal",
  electrical: "electrical",
  melee: "penetrating",
  corrosive: "thermal",
  poison: "concussive",
  none: "concussive",
  penetrating: "penetrating",
  concussive: "concussive",
  energy: "energy",
  thermal: "thermal",
});

export const ARMOR_MITIGATION_TYPE_KEYS = Object.freeze(
  PERSONAL_DAMAGE_TYPES.map(entry => entry.value)
);

const WEAPON_STANDARD_TRAIT_DEFS = Object.freeze({
  fatigue: Object.freeze({
    key: "fatigue",
    label: "Fatigue",
    rated: false,
    aliases: ["fatigue", "stun", "nonlethal", "non-lethal"],
    resolve: () => ({ damageTrack: "fatigue", flags: ["fatigue"] }),
  }),
  concealable: Object.freeze({
    key: "concealable",
    label: "Concealable",
    rated: false,
    aliases: ["concealable", "conceal", "concealed"],
    resolve: () => ({ flags: ["concealable"] }),
  }),
  singleShot: Object.freeze({
    key: "singleShot",
    label: "Single Shot",
    rated: false,
    aliases: ["singleShot", "single-shot", "single shot", "normal"],
    resolve: () => ({
      fireModes: {
        single: { enabled: true },
        burst: { enabled: false },
        spray: { enabled: false },
      },
      flags: ["singleShot"],
    }),
  }),
  automatic: Object.freeze({
    key: "automatic",
    label: "Automatic",
    rated: false,
    aliases: ["automatic", "auto", "burst", "fullAuto", "full-auto", "full auto"],
    resolve: () => ({
      fireModes: {
        single: { enabled: true },
        burst: { enabled: true },
        spray: { enabled: true },
      },
      flags: ["automatic"],
    }),
  }),
  spread: Object.freeze({
    key: "spread",
    label: "Spread",
    rated: false,
    aliases: ["spread", "scatter", "shotgun"],
    resolve: () => ({ flags: ["spread"] }),
  }),
  spaceCapable: Object.freeze({
    key: "spaceCapable",
    label: "Space Capable",
    rated: false,
    aliases: ["spaceCapable", "space-capable", "space capable", "vacuum", "vacuumCapable"],
    resolve: () => ({ flags: ["spaceCapable"] }),
  }),
  armorBypass: Object.freeze({
    key: "armorBypass",
    label: "Armor Bypass",
    rated: false,
    aliases: ["armorBypass", "armor-bypass", "armor bypass", "bypass"],
    resolve: () => ({ flags: ["armorBypass"] }),
  }),
  dangerClose: Object.freeze({
    key: "dangerClose",
    label: "Danger Close",
    rated: false,
    aliases: ["dangerClose", "danger-close", "danger close", "minArm", "minimumArming", "arming"],
    resolve: () => ({ flags: ["dangerClose"] }),
  }),
});

const ARMOR_STANDARD_TRAIT_DEFS = Object.freeze({
  bulky: Object.freeze({
    key: "bulky",
    label: "Bulky",
    rated: false,
    aliases: ["bulky"],
    resolve: () => ({
      attributeModifiers: { reflexes: -1 },
      flags: ["bulky"],
    }),
  }),
  stealth: Object.freeze({
    key: "stealth",
    label: "Stealth",
    rated: false,
    aliases: ["stealth", "sneak"],
    resolve: () => ({
      noticeDn: 1,
      sensorTrackingPenalty: 1,
      flags: ["stealth"],
    }),
  }),
  sealed: Object.freeze({
    key: "sealed",
    label: "Sealed",
    rated: false,
    aliases: ["sealed", "environmental"],
    resolve: () => ({
      resistanceDice: { gas: 1, chemical: 1 },
      flags: ["sealed"],
    }),
  }),
  concealable: Object.freeze({
    key: "concealable",
    label: "Concealable",
    rated: false,
    aliases: ["concealable", "conceal", "concealed"],
    resolve: () => ({
      concealArmorDn: 1,
      flags: ["concealable"],
    }),
  }),
});

export const WEAPON_STANDARD_TRAITS = Object.freeze(
  Object.values(WEAPON_STANDARD_TRAIT_DEFS).map(entry => ({
    value: entry.key,
    label: entry.label,
    rated: entry.rated,
  }))
);

// Payload capability traits that map directly to effects.flags.
// When a payload carries one of these as a capability trait, it is merged into
// the effective weapon's effects at profile-resolution time.
const PAYLOAD_EFFECT_FLAG_TRAITS = Object.freeze(new Set(["armorBypass"]));

export const ARMOR_STANDARD_TRAITS = Object.freeze(
  Object.values(ARMOR_STANDARD_TRAIT_DEFS).map(entry => ({
    value: entry.key,
    label: entry.label,
    rated: entry.rated,
  }))
);

const WEAPON_STANDARD_TRAIT_ALIAS_MAP = buildAliasMap(WEAPON_STANDARD_TRAIT_DEFS);
const ARMOR_STANDARD_TRAIT_ALIAS_MAP = buildAliasMap(ARMOR_STANDARD_TRAIT_DEFS);

export const TRAIT_REGISTRY = Object.freeze({});

function normalizeStringList(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.values(value)
      .flatMap(entry => normalizeStringList(entry));
  }

  if (Array.isArray(value)) {
    return value
      .map(entry => String(entry ?? "").trim())
      .filter(Boolean);
  }

  return String(value ?? "")
    .split(",")
    .map(entry => entry.trim())
    .filter(Boolean);
}

export function normalizePersonalDamageType(value, fallback = "penetrating") {
  const normalized = String(value ?? "").trim().toLowerCase();
  return PERSONAL_DAMAGE_TYPE_MAP[normalized] ?? fallback;
}

export function normalizeOptionalPersonalDamageType(value) {
  const normalized = String(value ?? "").trim();
  if (!normalized) return "";
  return normalizePersonalDamageType(normalized, "");
}

export function isPersonalDamageType(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  return ARMOR_MITIGATION_TYPE_KEYS.includes(normalized);
}

export function getPersonalDamageTypeLabel(value) {
  const normalized = normalizePersonalDamageType(value, "");
  return PERSONAL_DAMAGE_TYPE_LABELS[normalized] ?? String(value ?? "").trim();
}

export function normalizeArmorMitigationByType(value) {
  const source = value ?? {};
  const legacyBallistic = Number(source.ballistic ?? 0) || 0;
  const legacyMelee = Number(source.melee ?? 0) || 0;
  return {
    penetrating: source.penetrating !== undefined
      ? Number(source.penetrating ?? 0) || 0
      : Math.max(legacyBallistic, legacyMelee),
    concussive: source.concussive !== undefined
      ? Number(source.concussive ?? 0) || 0
      : Number(source.explosive ?? 0) || 0,
    energy: Number(source.energy ?? 0) || 0,
    thermal: Number(source.thermal ?? 0) || 0,
    electrical: Number(source.electrical ?? 0) || 0,
  };
}

export function migrateLegacyArmorMitigation(value) {
  const source = value ?? {};
  return {
    penetrating: Math.max(
      0,
      Number(source.penetrating ?? source.ballistic ?? 0) || 0,
      Number(source.melee ?? 0) || 0
    ),
    concussive: Number(source.concussive ?? source.explosive ?? 0) || 0,
    energy: Number(source.energy ?? 0) || 0,
    thermal: Number(source.thermal ?? 0) || 0,
    electrical: Number(source.electrical ?? 0) || 0,
  };
}

export function normalizeArmorTags(value) {
  return normalizeStringList(value);
}

export function normalizeWeaponTraits(value) {
  return normalizeStringList(value);
}

export function normalizeWeaponKeywords(value) {
  return normalizePersonalWeaponKeywords(value);
}

export function normalizeWeaponResolution(value = {}, fallback = "standard") {
  return normalizePersonalWeaponResolution(value, fallback);
}

export function normalizeWeaponFireModes(value = {}) {
  return normalizePersonalWeaponFireModes(value);
}

export function normalizePayloadTemplate(value = null) {
  return normalizePersonalWeaponTemplate(value);
}

function randomId(prefix = "id") {
  const factory = globalThis.foundry?.utils?.randomID;
  return typeof factory === "function"
    ? factory()
    : `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function buildAliasMap(registry) {
  const map = {};
  Object.values(registry).forEach(def => {
    [def.key, ...(def.aliases ?? [])].forEach(alias => {
      map[normalizeTraitAlias(alias)] = def.key;
    });
  });
  return Object.freeze(map);
}

function normalizeTraitAlias(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function normalizeCollection(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return Object.values(value);
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

function normalizeStandardTraitEntries(value, aliasMap) {
  return normalizeCollection(value)
    .map(entry => normalizeStandardTraitEntry(entry, aliasMap))
    .filter(Boolean);
}

function normalizeStandardTraitEntry(entry, aliasMap) {
  if (typeof entry === "string" || typeof entry === "number") {
    const key = aliasMap[normalizeTraitAlias(entry)];
    if (!key) return null;
    return { id: randomId("trait"), key, rating: 1 };
  }

  if (!entry || typeof entry !== "object") return null;

  const key = aliasMap[normalizeTraitAlias(entry.key ?? entry.value ?? entry.name)];
  if (!key) return null;

  return {
    id: String(entry.id ?? "").trim() || randomId("trait"),
    key,
    rating: Math.max(0, Number(entry.rating ?? 0) || 0),
  };
}

export function normalizeWeaponStandardTraits(value) {
  return normalizeStandardTraitEntries(value, WEAPON_STANDARD_TRAIT_ALIAS_MAP);
}

// Attack-legality helper: does a combat/weapon profile carry the Danger Close trait?
// Standard weapon traits are authored differently per scale: personal weapons use the
// Standard Traits picker (`standardTraits` -> resolved `effects.flags`), while machine
// weapons author them through the Keywords field (`keywords`). We check every channel
// (resolved flags, standardTraits, freeform traits, and keywords) through the standard-
// trait alias map so the trait is detected regardless of how it was authored. Keywords
// that are not standard traits (e.g. "lock-only", which has its own dedicated handling
// via weaponProfileIsLockOnly) do not resolve to a standard-trait key and are skipped here.
// TODO(tech-debt): move shared weapon-trait utilities to src/modules/mwd/weapon-traits.js.
export function weaponProfileHasDangerClose(profile = {}) {
  const flags = profile?.effects?.flags;
  if (Array.isArray(flags) && flags.includes("dangerClose")) return true;
  const candidates = [
    ...(Array.isArray(profile?.standardTraits) ? profile.standardTraits : []),
    ...(Array.isArray(profile?.traits) ? profile.traits : []),
    ...(Array.isArray(profile?.keywords) ? profile.keywords : []),
  ];
  return normalizeWeaponStandardTraits(candidates).some(entry => entry.key === "dangerClose");
}

// Attack-legality helper: is this a "lock-only" weapon? Lock-only is a machine-weapon
// keyword: the weapon may only fire on a target the attacker holds at the "lock"
// detection state (the top of the blind -> contact -> track -> lock ladder). Authored
// via the Keywords field, like other machine-weapon keywords.
export function weaponProfileIsLockOnly(profile = {}) {
  const keywords = Array.isArray(profile?.keywords) ? profile.keywords : [];
  return keywords.some(entry => normalizeTraitAlias(entry) === "lockonly");
}

export function normalizeArmorStandardTraits(value) {
  return normalizeStandardTraitEntries(value, ARMOR_STANDARD_TRAIT_ALIAS_MAP);
}

function normalizeAttackRatingBandValue(bands) {
  return {
    close: Number(bands?.close ?? bands?.short ?? 0) || 0,
    near: Number(bands?.near ?? bands?.medium ?? 0) || 0,
    far: Number(bands?.far ?? bands?.long ?? 0) || 0,
    extreme: Number(bands?.extreme ?? 0) || 0,
  };
}

export function mergeAttackRatingBands(base = {}, mod = {}) {
  const normalizedBase = normalizeAttackRatingBandValue(base);
  const normalizedMod = normalizeAttackRatingBandValue(mod);
  return {
    close: normalizedBase.close + normalizedMod.close,
    near: normalizedBase.near + normalizedMod.near,
    far: normalizedBase.far + normalizedMod.far,
    extreme: normalizedBase.extreme + normalizedMod.extreme,
  };
}

function getTraitLabel(key, registry) {
  return registry[key]?.label ?? key;
}

function entryLabel(entry, registry) {
  const base = getTraitLabel(entry?.key, registry);
  const rating = Math.max(0, Number(entry?.rating ?? 0) || 0);
  return registry[entry?.key]?.rated && rating > 0
    ? `${base} ${rating}`
    : base;
}

function resolveStandardTraitEffects(entries, registry) {
  return normalizeCollection(entries)
    .map(entry => {
      const key = entry?.key;
      const definition = registry[key];
      if (!definition?.resolve) return null;
      return {
        entry,
        effect: definition.resolve(entry),
        label: entryLabel(entry, registry),
      };
    })
    .filter(Boolean);
}

function mergeBonusVsArmorTag(base, addition) {
  const merged = { ...(base ?? {}) };
  Object.entries(addition ?? {}).forEach(([tag, value]) => {
    merged[tag] = (Number(merged[tag] ?? 0) || 0) + (Number(value ?? 0) || 0);
  });
  return merged;
}

export function mergeWeaponEffects(effects = []) {
  const merged = {};
  const flags = new Set();

  for (const effect of effects.filter(Boolean)) {
    if (effect.damageTrack !== undefined) {
      const track = String(effect.damageTrack ?? "").trim();
      if (track) merged.damageTrack = track;
    }

    if (effect.accuracyMod !== undefined) {
      merged.accuracyMod = (Number(merged.accuracyMod ?? 0) || 0) + (Number(effect.accuracyMod ?? 0) || 0);
    }

    if (effect.ap !== undefined) {
      merged.ap = (Number(merged.ap ?? 0) || 0) + (Number(effect.ap ?? 0) || 0);
    }

    if (effect.addHeat !== undefined) {
      merged.addHeat = (Number(merged.addHeat ?? 0) || 0) + (Number(effect.addHeat ?? 0) || 0);
    }

    if (effect.bonusVsArmorTag) {
      merged.bonusVsArmorTag = mergeBonusVsArmorTag(merged.bonusVsArmorTag, effect.bonusVsArmorTag);
    }

    if (effect.fireModes) {
      merged.fireModes = mergeWeaponFireModes(merged.fireModes, effect.fireModes);
    }

    for (const flag of effect.flags ?? []) {
      const normalized = String(flag ?? "").trim();
      if (normalized) flags.add(normalized);
    }
  }

  if (flags.size > 0) {
    merged.flags = Array.from(flags);
  }

  return merged;
}

function mergeWeaponFireModes(base = {}, addition = {}) {
  const normalizedBase = normalizeWeaponFireModes(base);
  const normalizedAddition = normalizeWeaponFireModes(addition);

  return {
    single: { ...normalizedBase.single, ...normalizedAddition.single },
    burst: { ...normalizedBase.burst, ...normalizedAddition.burst },
    spray: { ...normalizedBase.spray, ...normalizedAddition.spray },
  };
}

export function deriveWeaponEffectsFromTraits(traitsOrConfig = [], standardTraits = []) {
  const config = Array.isArray(traitsOrConfig) || typeof traitsOrConfig === "string"
    ? { traits: traitsOrConfig, standardTraits }
    : (traitsOrConfig ?? {});

  const legacyTraits = normalizeWeaponTraits(config.traits);
  const structuredTraits = normalizeWeaponStandardTraits(config.standardTraits);
  const structuredEffects = resolveStandardTraitEffects(structuredTraits, WEAPON_STANDARD_TRAIT_DEFS);
  const legacyEffects = legacyTraits.map(trait => {
    const canonicalKey = WEAPON_STANDARD_TRAIT_ALIAS_MAP[normalizeTraitAlias(trait)];
    if (!canonicalKey) return null;
    const resolver = WEAPON_STANDARD_TRAIT_DEFS[canonicalKey]?.resolve;
    return typeof resolver === "function" ? resolver({ key: canonicalKey, rating: 1 }) : null;
  });

  return mergeWeaponEffects([
    ...structuredEffects.map(entry => entry.effect),
    ...legacyEffects,
  ]);
}

export function getWeaponTraitLabels({ traits = [], standardTraits = [] } = {}) {
  const labels = [
    ...normalizeWeaponTraits(traits),
    ...normalizeWeaponStandardTraits(standardTraits).map(entry => entryLabel(entry, WEAPON_STANDARD_TRAIT_DEFS)),
  ];
  return labels.filter(Boolean);
}

function normalizeAmmoType(entry) {
  const source = entry ?? {};
  const capabilityReport = createCapabilityMigrationReport();
  const capabilityState = normalizePayloadCapabilityState({
    traits: source.traits,
    keywords: source.keywords,
    report: capabilityReport,
    path: "ammo.types[].traits",
  });
  return {
    id: String(source.id ?? "").trim() || randomId("ammo"),
    name: String(source.name ?? "").trim() || "Ammo",
    damageType: normalizeOptionalPersonalDamageType(source.damageType),
    apMod: Number(source.apMod ?? source.ap ?? 0) || 0,
    attackRatingBandMod: normalizeAttackRatingBandValue(source.attackRatingBandMod ?? source.attackRatingBand),
    traits: capabilityState.traits,
    keywords: capabilityState.keywords,
    migration: capabilityReport,
  };
}

function normalizeLegacyWeaponAmmo(value) {
  const source = value ?? {};
  const max = Math.max(0, Number(source.max ?? 0) || 0);
  const rawCurrent = Number(source.current);
  const current = Number.isFinite(rawCurrent)
    ? Math.max(0, Math.min(rawCurrent, max > 0 ? max : rawCurrent))
    : Math.max(0, max);
  const types = normalizeCollection(source.types).map(normalizeAmmoType);
  const selectedTypeId = String(source.activeTypeId ?? "").trim();
  const activeTypeId = types.some(type => type.id === selectedTypeId)
    ? selectedTypeId
    : (types[0]?.id ?? "");

  return {
    current,
    max,
    consumePerAttack: Math.max(1, Number(source.consumePerAttack ?? 1) || 1),
    activeTypeId,
    types,
  };
}

function normalizeConsumptionType(value, fallback = "untracked") {
  const normalized = String(value ?? "").trim();
  if (!normalized) return fallback;

  if (normalized === "linked") return "internal";
  if (normalized === "perAttack") return fallback;
  if (["untracked", "internal", "actorResource", "itemRef"].includes(normalized)) {
    return normalized;
  }

  return fallback;
}

function normalizePayloadConsumption(value = {}) {
  const source = value ?? {};

  return {
    amount: Math.max(1, Number(source.amount ?? source.consumePerUse ?? source.consumePerAttack ?? 1) || 1),
    sourceId: String(source.sourceId ?? "").trim(),
  };
}

export function normalizePayloadKey(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizePayloadModifies(value = {}) {
  const source = value ?? {};
  return {
    damage: Number(source.damage ?? source.damageMod ?? source.damageModifier ?? 0) || 0,
    damageType: normalizeOptionalPersonalDamageType(source.damageType),
    ap: Number(source.ap ?? source.apMod ?? 0) || 0,
    clusteringDice: Math.max(0, Number(source.clusteringDice ?? source.clusterDice ?? 0) || 0),
    attackRatingBand: normalizeAttackRatingBandValue(source.attackRatingBand ?? source.attackRatingBandMod),
  };
}

function normalizePayloadResolution(value = {}) {
  return normalizePersonalWeaponResolution(value, "standard");
}

function isUnloadedPayloadId(value) {
  return String(value ?? "").trim().toLowerCase() === "unloaded";
}

export function normalizePayloadProfile(entry, { report = null, path = "system.payloads[]" } = {}) {
  const source = entry ?? {};
  const id = String(source.id ?? "").trim() || randomId("payload");
  const capabilityState = normalizePayloadCapabilityState({
    traits: source.traits ?? source.modifies?.traits,
    keywords: source.keywords,
    report,
    path: `${path}.traits`,
  });
  const compatibleWith = normalizeStringList(source.compatibleWith ?? source.compatible);
  const template = normalizePayloadTemplate(source.template);

  if (isUnloadedPayloadId(id)) {
    return {
      id: "unloaded",
      label: "Unloaded",
      compatibleWith: [],
      modifies: normalizePayloadModifies({}),
      traits: [],
      keywords: [],
      template: null,
      areaEffect: normalizeAreaEffect({ kind: AREA_EFFECT_KINDS.none }),
      resolution: normalizePayloadResolution({ resolverKey: "standard" }),
      consumption: normalizePayloadConsumption({ amount: 1, sourceId: "" }),
    };
  }

  return {
    id,
    label: String(source.label ?? source.name ?? "").trim() || "Payload",
    sourceType: String(source.sourceType ?? "").trim(),
    payloadKey: normalizePayloadKey(source.payloadKey),
    itemId: String(source.itemId ?? "").trim(),
    itemUuid: String(source.itemUuid ?? "").trim(),
    reserveQuantity: Math.max(0, Math.trunc(Number(source.reserveQuantity ?? source.quantity ?? 0) || 0)),
    families: normalizeStringList(source.families),
    tags: normalizeStringList(source.tags),
    compatibleWith,
    modifies: normalizePayloadModifies(source.modifies ?? source),
    traits: capabilityState.traits,
    keywords: capabilityState.keywords,
    template,
    areaEffect: normalizeAreaEffect(source.areaEffect ?? {}),
    resolution: normalizePayloadResolution(source.resolution ?? source),
    consumption: normalizePayloadConsumption(source.consumption ?? source),
  };
}

export function normalizeConsumptionSource(entry) {
  const source = entry ?? {};
  const kind = normalizeConsumptionType(
    source.kind
      || source.type
      || (source.link?.actorPath || source.actorPath ? "actorResource" : "")
      || (source.link?.itemId || source.itemId || source.link?.itemPath || source.itemPath ? "itemRef" : "")
      || (source.tracking || source.current !== undefined || source.max !== undefined ? "internal" : "")
      || "untracked",
    "untracked"
  );

  const trackingSource = source.tracking ?? source;
  const max = Math.max(0, Number(trackingSource.max ?? 0) || 0);
  const rawCurrent = Number(trackingSource.current);
  const current = Number.isFinite(rawCurrent)
    ? Math.max(0, Math.min(rawCurrent, max > 0 ? max : rawCurrent))
    : Math.max(0, max);

  return {
    id: String(source.id ?? "").trim() || randomId("source"),
    label: String(source.label ?? source.name ?? "").trim() || "Source",
    kind,
    reloadable: source.reloadable !== undefined
      ? Boolean(source.reloadable)
      : kind === "internal",
    loadedPayloadKey: kind === "untracked" ? "" : normalizePayloadKey(source.loadedPayloadKey),
    tracking: {
      current,
      max,
    },
    link: {
      actorPath: String(source.link?.actorPath ?? source.actorPath ?? "").trim(),
      itemId: String(source.link?.itemId ?? source.itemId ?? "").trim(),
      itemPath: String(source.link?.itemPath ?? source.itemPath ?? "").trim(),
    },
  };
}

function defaultPayloadModel({ report = null, path = "system.payloads" } = {}) {
  return {
    payloads: [normalizePayloadProfile({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" },
    }, { report, path: `${path}[0]` })],
    selectedPayloadId: "unloaded",
    consumptionSources: [normalizeConsumptionSource({
      id: "untracked",
      label: "Untracked",
      kind: "untracked",
    })],
  };
}

function isMeleeWeaponCategory(category) {
  return String(category ?? "").trim().toLowerCase() === "melee";
}

function ensureUnloadedPayload(payloads = [], { report = null, path = "system.payloads" } = {}) {
  const normalized = normalizeCollection(payloads)
    .map((entry, index) => normalizePayloadProfile(entry, { report, path: `${path}[${index}]` }))
    .filter(Boolean);
  if (normalized.some(payload => payload.id === "unloaded")) return normalized;

  return [
    normalizePayloadProfile({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" },
    }, { report, path: `${path}[0]` }),
    ...normalized,
  ];
}

export function migrateLegacyAmmoToPayloadModel(ammo = {}, { report = null, path = "system.payloads" } = {}) {
  const normalizedAmmo = normalizeLegacyWeaponAmmo(ammo);
  const consumePerAttack = Math.max(1, Number(normalizedAmmo.consumePerAttack ?? 1) || 1);
  const isTracked = normalizedAmmo.max > 0;
  const sourceId = isTracked ? "internal-magazine" : "untracked";
  const consumptionSources = [normalizeConsumptionSource(isTracked
    ? {
        id: sourceId,
        label: "Internal Source",
        kind: "internal",
        tracking: {
          current: normalizedAmmo.current,
          max: normalizedAmmo.max,
        },
      }
    : {
        id: sourceId,
        label: "Untracked",
        kind: "untracked",
        tracking: {},
      })];

  const payloads = normalizedAmmo.types.length
    ? normalizedAmmo.types.map((type, index) => normalizePayloadProfile({
        id: type.id,
        label: type.name,
        modifies: {
          damageType: type.damageType,
          ap: type.apMod,
          attackRatingBand: type.attackRatingBandMod,
          traits: type.traits,
        },
        keywords: type.keywords,
        resolution: { resolverKey: "standard" },
        consumption: {
          amount: consumePerAttack,
          sourceId: isTracked ? sourceId : "",
        },
      }, { report, path: `${path}[${index}]` }))
    : [normalizePayloadProfile({
        id: "unloaded",
        label: "Unloaded",
        resolution: { resolverKey: "standard" },
        consumption: {
          amount: consumePerAttack,
          sourceId: isTracked ? sourceId : "",
        },
      }, { report, path: `${path}[0]` })];

  const normalizedPayloads = ensureUnloadedPayload(payloads, { report, path });
  const selectedPayloadId = normalizedPayloads.some(payload => payload.id === normalizedAmmo.activeTypeId)
    ? normalizedAmmo.activeTypeId
    : (normalizedPayloads[0]?.id ?? "unloaded");

  return {
    payloads: normalizedPayloads,
    selectedPayloadId,
    consumptionSources,
  };
}

export function normalizeWeaponPayloads(value, { legacyAmmo = null, category = "", report = null, path = "system.payloads" } = {}) {
  if (isMeleeWeaponCategory(category)) return [];
  const payloads = normalizeCollection(value)
    .map((entry, index) => normalizePayloadProfile(entry, { report, path: `${path}[${index}]` }))
    .filter(Boolean);
  if (payloads.length > 0) return ensureUnloadedPayload(payloads, { report, path });
  if (legacyAmmo) return ensureUnloadedPayload(migrateLegacyAmmoToPayloadModel(legacyAmmo, { report, path }).payloads, { report, path });
  return defaultPayloadModel({ report, path }).payloads;
}

export function normalizeWeaponConsumptionSources(value, { legacyAmmo = null } = {}) {
  const sources = normalizeCollection(value).map(normalizeConsumptionSource).filter(Boolean);
  if (sources.length > 0) return sources;
  if (legacyAmmo) return migrateLegacyAmmoToPayloadModel(legacyAmmo).consumptionSources;
  return defaultPayloadModel().consumptionSources;
}

export function normalizeSelectedPayloadId(value, payloads = [], { legacyAmmo = null, category = "" } = {}) {
  if (isMeleeWeaponCategory(category)) return "";

  const normalizedPayloads = normalizeWeaponPayloads(payloads, { legacyAmmo, category });
  const explicitId = String(value ?? "").trim();
  if (normalizedPayloads.some(payload => payload.id === explicitId)) return explicitId;
  if (legacyAmmo) {
    const migratedId = migrateLegacyAmmoToPayloadModel(legacyAmmo).selectedPayloadId;
    if (normalizedPayloads.some(payload => payload.id === migratedId)) return migratedId;
  }
  return normalizedPayloads[0]?.id ?? "unloaded";
}

function resolveTrackingValue({ root = null, path = "", fallback = {} } = {}) {
  const normalizedPath = String(path ?? "").trim();
  if (!root || !normalizedPath) {
    return {
      current: Math.max(0, Number(fallback.current ?? 0) || 0),
      max: Math.max(0, Number(fallback.max ?? 0) || 0),
      currentPath: normalizedPath,
    };
  }

  const rawValue = foundry.utils.getProperty(root, normalizedPath);
  if (rawValue && typeof rawValue === "object") {
    const max = Math.max(0, Number(rawValue.max ?? fallback.max ?? 0) || 0);
    const rawCurrent = Number(rawValue.current);
    return {
      current: Number.isFinite(rawCurrent)
        ? Math.max(0, Math.min(rawCurrent, max > 0 ? max : rawCurrent))
        : Math.max(0, max),
      max,
      currentPath: `${normalizedPath}.current`,
    };
  }

  const current = Math.max(0, Number(rawValue ?? fallback.current ?? 0) || 0);
  const max = Math.max(current, Math.max(0, Number(fallback.max ?? 0) || 0));
  return {
    current: max > 0 ? Math.min(current, max) : current,
    max,
    currentPath: normalizedPath,
  };
}

function resolveSourceState({ source = null, actor = null } = {}) {
  if (!source) {
    return {
      id: "",
      label: "",
      kind: "untracked",
      isTracked: false,
      current: 0,
      max: 0,
      consumePerUse: 1,
      actorPath: "",
      itemId: "",
      itemPath: "",
      loadedPayloadKey: "",
      reloadable: false,
    };
  }

  const base = {
    id: source.id,
    label: source.label,
    kind: source.kind,
    actorPath: String(source.link?.actorPath ?? "").trim(),
    itemId: String(source.link?.itemId ?? "").trim(),
    itemPath: String(source.link?.itemPath ?? "").trim(),
    loadedPayloadKey: normalizePayloadKey(source.loadedPayloadKey),
    reloadable: Boolean(source.reloadable),
  };

  if (source.kind === "internal") {
    const current = Math.max(0, Number(source.tracking?.current ?? 0) || 0);
    const max = Math.max(0, Number(source.tracking?.max ?? 0) || 0);
    return {
      ...base,
      isTracked: max > 0 || current > 0,
      current,
      max,
      currentPath: "",
      loadedPayloadKey: base.loadedPayloadKey,
      reloadable: base.reloadable,
    };
  }

  if (source.kind === "actorResource") {
    const tracking = resolveTrackingValue({
      root: actor?.system ?? null,
      path: base.actorPath,
      fallback: source.tracking,
    });
    return {
      ...base,
      isTracked: true,
      current: tracking.current,
      max: tracking.max,
      currentPath: tracking.currentPath,
      loadedPayloadKey: base.loadedPayloadKey,
      reloadable: base.reloadable,
    };
  }

  if (source.kind === "itemRef") {
    const sourceItem = actor?.items?.get?.(base.itemId) ?? null;
    const tracking = resolveTrackingValue({
      root: sourceItem?.system ?? null,
      path: base.itemPath,
      fallback: source.tracking,
    });
    return {
      ...base,
      isTracked: true,
      current: tracking.current,
      max: tracking.max,
      currentPath: tracking.currentPath,
      sourceItem,
      loadedPayloadKey: base.loadedPayloadKey,
      reloadable: base.reloadable,
    };
  }

  return {
    ...base,
    isTracked: false,
    current: 0,
    max: 0,
    currentPath: "",
    loadedPayloadKey: "",
    reloadable: false,
  };
}

// Sheets and tests need the same "what does this source currently resolve to?"
// answer that the attack pipeline uses. Exporting the pure resolver keeps the
// authoring UI aligned with the live consumption behavior.
export function resolveConsumptionSourceState({ source = null, actor = null } = {}) {
  return resolveSourceState({ source, actor });
}

export function resolveWeaponPayloadState({
  payloads = [],
  selectedPayloadId = "",
  consumptionSources = [],
  actor = null,
  payloadId = "",
  category = "",
} = {}) {
  const normalizedPayloads = normalizeWeaponPayloads(payloads, { category });
  const normalizedSources = normalizeWeaponConsumptionSources(consumptionSources);
  const activePayloadId = normalizeSelectedPayloadId(payloadId || selectedPayloadId, normalizedPayloads, { category });
  const activePayload = normalizedPayloads.find(payload => payload.id === activePayloadId) ?? normalizedPayloads[0] ?? null;
  const activeConsumption = activePayload?.consumption ?? normalizePayloadConsumption();
  const source = activeConsumption.sourceId
    ? normalizedSources.find(entry => entry.id === activeConsumption.sourceId) ?? null
    : normalizedSources.find(entry => entry.kind === "untracked") ?? normalizeConsumptionSource({
        id: "untracked",
        label: "Untracked",
        kind: "untracked",
      });

  const sourceState = resolveSourceState({ source, actor });

  return {
    payloads: normalizedPayloads,
    activePayload,
    activePayloadId: activePayload?.id ?? "",
    payloadLabel: activePayload?.label ?? "",
    source,
    sourceState: {
      ...sourceState,
      consumePerUse: Math.max(1, Number(activeConsumption.amount ?? 1) || 1),
      sourceId: source?.id ?? "",
      loadedPayloadKey: sourceState.loadedPayloadKey ?? "",
    },
  };
}

export function normalizeWeaponAmmo(value) {
  return normalizeLegacyWeaponAmmo(value);
}

export function resolveWeaponAmmo(ammo = {}, ammoTypeId = "") {
  const migrated = migrateLegacyAmmoToPayloadModel(ammo);
  const payloadState = resolveWeaponPayloadState({
    payloads: migrated.payloads,
    selectedPayloadId: migrated.selectedPayloadId,
    consumptionSources: migrated.consumptionSources,
    payloadId: ammoTypeId,
  });

  return {
    ammo: normalizeLegacyWeaponAmmo(ammo),
    activeType: payloadState.activePayload
      ? {
          id: payloadState.activePayload.id,
          name: payloadState.activePayload.label,
          damageType: payloadState.activePayload.modifies?.damageType ?? "",
          apMod: Number(payloadState.activePayload.modifies?.ap ?? 0) || 0,
          clusteringDice: Number(payloadState.activePayload.modifies?.clusteringDice ?? 0) || 0,
          attackRatingBandMod: payloadState.activePayload.modifies?.attackRatingBand ?? {},
          traits: payloadState.activePayload.traits ?? [],
          keywords: payloadState.activePayload.keywords ?? [],
        }
      : null,
    activeTypeId: payloadState.activePayloadId,
    ammoLabel: payloadState.payloadLabel,
    isTracked: payloadState.sourceState.isTracked,
  };
}

export function resolveEffectiveWeaponProfile({
  damage = 0,
  damageType = "penetrating",
  ap = 0,
  attackRatingBand = {},
  traits = [],
  keywords = [],
  standardTraits = [],
  resolution = {},
  fireModes = {},
  payloads = [],
  selectedPayloadId = "",
  consumptionSources = [],
  payloadId = "",
  actor = null,
  ammo = null,
  ammoTypeId = "",
  category = "",
} = {}) {
  const payloadState = resolveWeaponPayloadState({
    payloads: payloads?.length ? payloads : undefined,
    selectedPayloadId: selectedPayloadId || ammoTypeId,
    consumptionSources,
    actor,
    payloadId: payloadId || ammoTypeId,
    category,
  });
  const fallbackState = (!payloads || payloads.length === 0) && ammo
    ? resolveWeaponPayloadState({
        ...migrateLegacyAmmoToPayloadModel(ammo),
        actor,
        payloadId: payloadId || ammoTypeId,
        category,
      })
    : null;
  const effectivePayloadState = fallbackState ?? payloadState;
  const activePayload = effectivePayloadState.activePayload;
  const weaponCapabilityState = normalizeWeaponCapabilityState({
    traits,
    keywords,
  });
  const combinedTraits = Array.from(new Set([
    ...weaponCapabilityState.traits,
    ...normalizeWeaponTraits(activePayload?.traits),
  ]));
  const combinedKeywords = normalizePersonalWeaponKeywords([
    ...weaponCapabilityState.keywords,
    ...normalizePersonalWeaponKeywords(activePayload?.keywords),
  ]);
  const normalizedWeaponResolution = normalizeWeaponResolution(resolution, "standard");
  const effectiveResolution = activePayload?.resolution?.resolverKey
    ? normalizePayloadResolution(activePayload.resolution)
    : normalizedWeaponResolution;
  const normalizedFireModes = normalizeWeaponFireModes(fireModes);
  const capabilityReport = createCapabilityMigrationReport();
  const capabilityValidation = validateTemplatedCapability({
    weapon: {
      traits: weaponCapabilityState.traits,
      resolution: normalizedWeaponResolution,
    },
    payload: activePayload,
    effectiveTraits: combinedTraits,
    effectiveResolution,
    report: capabilityReport,
  });
  const combinedStandardTraits = normalizeWeaponStandardTraits(standardTraits);
  const combinedEffects = deriveWeaponEffectsFromTraits({
    traits: [],
    standardTraits: combinedStandardTraits,
  });

  // Payload capability traits (e.g. armorBypass) that map directly to effect
  // flags are not routed through the standard-trait resolver, so merge them
  // manually from the active payload's traits here.
  const payloadFlagTraits = normalizeWeaponTraits(activePayload?.traits ?? [])
    .filter(trait => PAYLOAD_EFFECT_FLAG_TRAITS.has(trait));
  if (payloadFlagTraits.length > 0) {
    combinedEffects.flags = Array.from(new Set([...(combinedEffects.flags ?? []), ...payloadFlagTraits]));
  }
  const publicSourceState = {
    ...effectivePayloadState.sourceState,
  };
  delete publicSourceState.sourceItem;

  return {
    damage: Math.max(0, (Number(damage ?? 0) || 0) + (Number(activePayload?.modifies?.damage ?? 0) || 0)),
    damageType: activePayload?.modifies?.damageType || normalizePersonalDamageType(damageType),
    damageTrack: combinedEffects.damageTrack || "physical",
    ap: (Number(ap ?? 0) || 0) + (Number(activePayload?.modifies?.ap ?? 0) || 0),
    clusteringDice: Number(activePayload?.modifies?.clusteringDice ?? 0) || 0,
    attackRatingBand: mergeAttackRatingBands(
      attackRatingBand,
      activePayload?.modifies?.attackRatingBand ?? {}
    ),
    effects: combinedEffects,
    traits: combinedTraits,
    keywords: combinedKeywords,
    standardTraits: combinedStandardTraits,
    payloadLabel: effectivePayloadState.payloadLabel,
    payload: activePayload ? foundry.utils.deepClone(activePayload) : null,
    payloadState: {
      payloads: effectivePayloadState.payloads.map(payload => foundry.utils.deepClone(payload)),
      activePayloadId: effectivePayloadState.activePayloadId,
      payloadLabel: effectivePayloadState.payloadLabel,
      sourceId: effectivePayloadState.source?.id ?? "",
      sourceLabel: effectivePayloadState.sourceState.label ?? "",
      sourceKind: effectivePayloadState.sourceState.kind ?? "untracked",
      isTracked: effectivePayloadState.sourceState.isTracked,
      current: effectivePayloadState.sourceState.current,
      max: effectivePayloadState.sourceState.max,
      consumePerUse: effectivePayloadState.sourceState.consumePerUse,
    },
    source: effectivePayloadState.source ? foundry.utils.deepClone(effectivePayloadState.source) : null,
    sourceState: foundry.utils.deepClone(publicSourceState),
    template: capabilityValidation.template ? foundry.utils.deepClone(capabilityValidation.template) : null,
    areaEffect: normalizeAreaEffect(activePayload?.areaEffect ?? {}),
    resolution: foundry.utils.deepClone(effectiveResolution),
    resolverKey: String(effectiveResolution?.resolverKey ?? "standard").trim() || "standard",
    fireModes: foundry.utils.deepClone(mergeWeaponFireModes(normalizedFireModes, combinedEffects.fireModes)),
    capabilityReport: {
      ...capabilityReport,
      liveCapabilities: capabilityValidation.liveCapabilities,
      isTemplated: capabilityValidation.isTemplated,
      template: capabilityValidation.template ? foundry.utils.deepClone(capabilityValidation.template) : null,
      resolverKey: String(effectiveResolution?.resolverKey ?? "standard").trim() || "standard",
    },
    ammoLabel: effectivePayloadState.payloadLabel,
    ammoType: activePayload ? foundry.utils.deepClone(activePayload) : null,
    ammoState: {
      current: publicSourceState.current,
      max: publicSourceState.max,
      consumePerAttack: publicSourceState.consumePerUse,
      activeTypeId: effectivePayloadState.activePayloadId,
      types: effectivePayloadState.payloads.map(payload => ({
        id: payload.id,
        name: payload.label,
        damageType: payload.modifies?.damageType ?? "",
        clusteringDice: Number(payload.modifies?.clusteringDice ?? 0) || 0,
        traits: payload.traits ?? [],
        keywords: payload.keywords ?? [],
      })),
      isTracked: publicSourceState.isTracked,
      ammoLabel: effectivePayloadState.payloadLabel,
    },
  };
}

export function mergeArmorMitigationByType(base = {}, addition = {}) {
  const normalizedBase = normalizeArmorMitigationByType(base);
  const normalizedAddition = normalizeArmorMitigationByType(addition);
  return {
    penetrating: normalizedBase.penetrating + normalizedAddition.penetrating,
    concussive: normalizedBase.concussive + normalizedAddition.concussive,
    energy: normalizedBase.energy + normalizedAddition.energy,
    thermal: normalizedBase.thermal + normalizedAddition.thermal,
    electrical: normalizedBase.electrical + normalizedAddition.electrical,
  };
}

export function normalizeArmorTraitEffects(effects = {}) {
  return {
    attributeModifiers: {
      reflexes: Number(effects?.attributeModifiers?.reflexes ?? 0) || 0,
    },
    noticeDn: Number(effects?.noticeDn ?? 0) || 0,
    sensorTrackingPenalty: Number(effects?.sensorTrackingPenalty ?? 0) || 0,
    resistanceDice: {
      gas: Number(effects?.resistanceDice?.gas ?? 0) || 0,
      chemical: Number(effects?.resistanceDice?.chemical ?? 0) || 0,
    },
    concealArmorDn: Number(effects?.concealArmorDn ?? 0) || 0,
    flags: Array.from(new Set(normalizeStringList(effects?.flags))),
  };
}

function mergeArmorTraitEffects(base = {}, addition = {}) {
  const normalizedBase = normalizeArmorTraitEffects(base);
  const normalizedAddition = normalizeArmorTraitEffects(addition);
  return normalizeArmorTraitEffects({
    attributeModifiers: {
      reflexes: normalizedBase.attributeModifiers.reflexes + normalizedAddition.attributeModifiers.reflexes,
    },
    noticeDn: normalizedBase.noticeDn + normalizedAddition.noticeDn,
    sensorTrackingPenalty: normalizedBase.sensorTrackingPenalty + normalizedAddition.sensorTrackingPenalty,
    resistanceDice: {
      gas: normalizedBase.resistanceDice.gas + normalizedAddition.resistanceDice.gas,
      chemical: normalizedBase.resistanceDice.chemical + normalizedAddition.resistanceDice.chemical,
    },
    concealArmorDn: normalizedBase.concealArmorDn + normalizedAddition.concealArmorDn,
    flags: [...normalizedBase.flags, ...normalizedAddition.flags],
  });
}

export function resolveArmorTraitEffects({ standardTraits = [] } = {}) {
  const structuredTraits = normalizeArmorStandardTraits(standardTraits);
  const resolvedEntries = resolveStandardTraitEffects(
    structuredTraits,
    ARMOR_STANDARD_TRAIT_DEFS
  );

  const traitEffects = resolvedEntries.reduce((acc, entry) => {
    return mergeArmorTraitEffects(acc, entry.effect ?? {});
  }, normalizeArmorTraitEffects({}));

  return {
    mitigationByType: normalizeArmorMitigationByType({}),
    reinforcedMax: 0,
    traitState: {
      reinforced: {
        current: 0,
        max: 0,
      },
    },
    effects: traitEffects,
    traitEffects,
    labels: resolvedEntries.map(entry => entry.label),
    standardTraits: structuredTraits,
  };
}

export function getArmorTraitLabels({ standardTraits = [] } = {}) {
  const labels = [
    ...normalizeArmorStandardTraits(standardTraits).map(entry => entryLabel(entry, ARMOR_STANDARD_TRAIT_DEFS)),
  ];
  return labels.filter(Boolean);
}

export function getActiveArmorTraitEffects(actor = null) {
  const cachedArmor = actor?._mwdDerived?.personalCombat?.activeArmor ?? null;
  if (cachedArmor) return normalizeArmorTraitEffects(cachedArmor.traitEffects ?? cachedArmor.effects);

  const itemCollection = actor?.items;
  const items = typeof itemCollection?.filter === "function"
    ? itemCollection.filter(() => true)
    : typeof itemCollection?.values === "function"
      ? Array.from(itemCollection.values())
    : Array.from(itemCollection ?? []);
  const armorItems = items.filter(item => {
    const itemType = item?.canonicalType ?? item?.type;
    return (item?.isArmor?.() ?? itemType === "armor") && item?.system?.equipped;
  });
  const activeItem = armorItems.find(item => item?.system?.isPrimary) ?? armorItems[0] ?? null;
  const profile = activeItem?.getArmorProfile?.({ actor }) ?? null;
  return normalizeArmorTraitEffects(profile?.traitEffects ?? profile?.effects);
}

export function computeArmorBaseMitigation(currentArmorRating) {
  const rating = Math.max(0, Number(currentArmorRating ?? 0) || 0);
  return rating <= 0 ? 0 : Math.ceil(rating / 4);
}

export function normalizeArmorDurabilityForRating(
  ratingValue = 0,
  durability = {},
  {
    previousRating = null,
    previousDurability = null,
    ratingChanged = false,
    currentChanged = false,
  } = {}
) {
  const rating = Math.max(0, Number(ratingValue ?? 0) || 0);
  const rawCurrent = Number(durability?.current);
  const rawMax = Number(durability?.max);
  const previousMax = Math.max(0, Number(previousDurability?.max ?? previousRating ?? 0) || 0);
  const previousCurrent = Number(previousDurability?.current);
  const hasCurrent = Number.isFinite(rawCurrent);
  const hasPreviousCurrent = Number.isFinite(previousCurrent);
  const maxWasUninitialized = !Number.isFinite(rawMax) || rawMax <= 0;
  const currentWasUninitialized = !hasCurrent || rawCurrent <= 0;
  const looksUninitialized = rating > 0 && maxWasUninitialized && currentWasUninitialized;
  const previousWasFull = !hasPreviousCurrent || previousCurrent >= previousMax || previousMax <= 0;

  const nextCurrent = (
    looksUninitialized
    || (ratingChanged && !currentChanged && previousWasFull)
  )
    ? rating
    : (hasCurrent ? rawCurrent : (hasPreviousCurrent ? previousCurrent : rating));

  return {
    current: Math.min(rating, Math.max(0, Number(nextCurrent ?? 0) || 0)),
    max: rating,
  };
}

export function computePersonalArmorMitigation({
  currentArmorRating = 0,
  mitigationByType = {},
  damageType,
} = {}) {
  const currentRating = Math.max(0, Number(currentArmorRating ?? 0) || 0);
  if (currentRating <= 0) {
    return {
      currentArmorRating: 0,
      baseMitigation: 0,
      typeMitigationMod: 0,
      totalMitigation: 0,
      isDestroyed: true,
    };
  }

  const normalizedType = normalizePersonalDamageType(damageType, "penetrating");
  const normalizedMitigation = normalizeArmorMitigationByType(mitigationByType);
  const baseMitigation = computeArmorBaseMitigation(currentRating);
  const typeMitigationMod = Number(normalizedMitigation[normalizedType] ?? 0) || 0;

  return {
    currentArmorRating: currentRating,
    baseMitigation,
    typeMitigationMod,
    totalMitigation: baseMitigation + typeMitigationMod,
    isDestroyed: false,
  };
}

export function applyArmorTagEffects({ damageIncoming = 0, armorTags = [], effects = {} } = {}) {
  const tags = new Set(normalizeArmorTags(armorTags));
  let adjustedDamage = Number(damageIncoming ?? 0) || 0;
  const applied = [];

  Object.entries(effects?.bonusVsArmorTag ?? {}).forEach(([tag, bonus]) => {
    if (!tags.has(tag)) return;
    const numericBonus = Number(bonus ?? 0) || 0;
    if (!numericBonus) return;
    adjustedDamage *= (1 + numericBonus);
    applied.push({ tag, bonus: numericBonus });
  });

  return {
    damageIncoming: adjustedDamage,
    applied,
  };
}
