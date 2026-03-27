// src/modules/mwd/personal-damage.js
// Purpose: Defines function `normalizeStringList`.
// How it fits: Describes role within src/modules or template rendering pipeline.


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
  armorPiercing: Object.freeze({
    key: "armorPiercing",
    label: "Armor Piercing",
    rated: false,
    aliases: ["armor piercing", "armorpiercing"],
    resolve: () => ({ ap: 2 }),
  }),
  antiFerro: Object.freeze({
    key: "antiFerro",
    label: "Anti-Ferro",
    rated: false,
    aliases: ["anti-ferro", "antiferro"],
    resolve: () => ({ bonusVsArmorTag: { ferroFibrous: 0.33 } }),
  }),
  blast: Object.freeze({
    key: "blast",
    label: "Blast",
    rated: false,
    aliases: ["blast"],
    resolve: () => ({ flags: ["blast", "area"] }),
  }),
  corrosive: Object.freeze({
    key: "corrosive",
    label: "Corrosive",
    rated: false,
    aliases: ["corrosive"],
    resolve: () => ({ flags: ["corrosive"] }),
  }),
  emp: Object.freeze({
    key: "emp",
    label: "EMP",
    rated: false,
    aliases: ["emp"],
    resolve: () => ({ flags: ["emp"] }),
  }),
  inaccurate: Object.freeze({
    key: "inaccurate",
    label: "Inaccurate",
    rated: false,
    aliases: ["inaccurate"],
    resolve: () => ({ accuracyMod: -1 }),
  }),
});

const ARMOR_STANDARD_TRAIT_DEFS = Object.freeze({
  ablative: Object.freeze({
    key: "ablative",
    label: "Ablative",
    rated: false,
    aliases: ["ablative"],
    resolve: () => ({ mitigationByType: { energy: 2 } }),
  }),
  flak: Object.freeze({
    key: "flak",
    label: "Flak",
    rated: false,
    aliases: ["flak"],
    resolve: () => ({ mitigationByType: { penetrating: 1 } }),
  }),
  reinforced: Object.freeze({
    key: "reinforced",
    label: "Reinforced",
    rated: true,
    aliases: ["reinforced"],
    resolve: (entry) => ({ reinforced: Math.max(0, Number(entry?.rating ?? 0) || 0) }),
  }),
  padded: Object.freeze({
    key: "padded",
    label: "Padded",
    rated: false,
    aliases: ["padded"],
    resolve: () => ({ mitigationByType: { concussive: 1 } }),
  }),
  insulated: Object.freeze({
    key: "insulated",
    label: "Insulated",
    rated: false,
    aliases: ["insulated"],
    resolve: () => ({ mitigationByType: { thermal: 2 } }),
  }),
});

export const WEAPON_STANDARD_TRAITS = Object.freeze(
  Object.values(WEAPON_STANDARD_TRAIT_DEFS).map(entry => ({
    value: entry.key,
    label: entry.label,
    rated: entry.rated,
  }))
);

export const ARMOR_STANDARD_TRAITS = Object.freeze(
  Object.values(ARMOR_STANDARD_TRAIT_DEFS).map(entry => ({
    value: entry.key,
    label: entry.label,
    rated: entry.rated,
  }))
);

const WEAPON_STANDARD_TRAIT_ALIAS_MAP = buildAliasMap(WEAPON_STANDARD_TRAIT_DEFS);
const ARMOR_STANDARD_TRAIT_ALIAS_MAP = buildAliasMap(ARMOR_STANDARD_TRAIT_DEFS);

export const TRAIT_REGISTRY = Object.freeze(
  Object.fromEntries(
    Object.values(WEAPON_STANDARD_TRAIT_DEFS).flatMap(def => {
      const aliases = [def.key, ...(def.aliases ?? [])];
      return aliases.map(alias => [String(alias).trim().toLowerCase(), def.resolve]);
    })
  )
);

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
  return {
    id: String(source.id ?? "").trim() || randomId("ammo"),
    name: String(source.name ?? "").trim() || "Ammo",
    damageType: normalizeOptionalPersonalDamageType(source.damageType),
    apMod: Number(source.apMod ?? source.ap ?? 0) || 0,
    attackRatingBandMod: normalizeAttackRatingBandValue(source.attackRatingBandMod ?? source.attackRatingBand),
    standardTraits: normalizeWeaponStandardTraits(source.standardTraits),
    traits: normalizeWeaponTraits(source.traits),
  };
}

export function normalizeWeaponAmmo(value) {
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

export function resolveWeaponAmmo(ammo = {}, ammoTypeId = "") {
  const normalizedAmmo = normalizeWeaponAmmo(ammo);
  const explicitId = String(ammoTypeId ?? "").trim();
  const selectedId = explicitId || normalizedAmmo.activeTypeId;
  const activeType = normalizedAmmo.types.find(type => type.id === selectedId) ?? null;

  return {
    ammo: normalizedAmmo,
    activeType,
    activeTypeId: activeType?.id ?? "",
    ammoLabel: activeType?.name ?? "",
    isTracked: normalizedAmmo.max > 0,
  };
}

export function resolveEffectiveWeaponProfile({
  damageType = "penetrating",
  ap = 0,
  attackRatingBand = {},
  traits = [],
  standardTraits = [],
  ammo = {},
  ammoTypeId = "",
} = {}) {
  const ammoResolution = resolveWeaponAmmo(ammo, ammoTypeId);
  const ammoType = ammoResolution.activeType;
  const combinedStandardTraits = [
    ...normalizeWeaponStandardTraits(standardTraits),
    ...normalizeWeaponStandardTraits(ammoType?.standardTraits),
  ];
  const combinedLegacyTraits = [
    ...normalizeWeaponTraits(traits),
    ...normalizeWeaponTraits(ammoType?.traits),
  ];
  const combinedEffects = deriveWeaponEffectsFromTraits({
    traits: combinedLegacyTraits,
    standardTraits: combinedStandardTraits,
  });

  return {
    damageType: ammoType?.damageType || normalizePersonalDamageType(damageType),
    ap: (Number(ap ?? 0) || 0) + (Number(ammoType?.apMod ?? 0) || 0),
    attackRatingBand: mergeAttackRatingBands(
      attackRatingBand,
      ammoType?.attackRatingBandMod ?? {}
    ),
    effects: combinedEffects,
    traits: getWeaponTraitLabels({
      traits: combinedLegacyTraits,
      standardTraits: combinedStandardTraits,
    }),
    standardTraits: combinedStandardTraits,
    ammoLabel: ammoResolution.ammoLabel,
    ammoType: ammoType ? foundry.utils.deepClone(ammoType) : null,
    ammoState: {
      ...ammoResolution.ammo,
      activeTypeId: ammoResolution.activeTypeId,
      ammoLabel: ammoResolution.ammoLabel,
      isTracked: ammoResolution.isTracked,
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

export function resolveArmorTraitEffects({ standardTraits = [], traits = [], traitState = {} } = {}) {
  const structuredTraits = normalizeArmorStandardTraits(standardTraits);
  const legacyTraits = normalizeWeaponTraits(traits);
  const legacyEntries = legacyTraits
    .map(trait => {
      const key = ARMOR_STANDARD_TRAIT_ALIAS_MAP[normalizeTraitAlias(trait)];
      if (!key) return null;
      return { id: randomId("trait"), key, rating: key === "reinforced" ? 1 : 0 };
    })
    .filter(Boolean);

  const resolvedEntries = resolveStandardTraitEffects(
    [...structuredTraits, ...legacyEntries],
    ARMOR_STANDARD_TRAIT_DEFS
  );

  const mitigationByType = resolvedEntries.reduce((acc, entry) => {
    return mergeArmorMitigationByType(acc, entry.effect?.mitigationByType ?? {});
  }, normalizeArmorMitigationByType({}));

  const reinforcedMax = resolvedEntries.reduce(
    (total, entry) => total + Math.max(0, Number(entry.effect?.reinforced ?? 0) || 0),
    0
  );

  const existingCurrent = Number(traitState?.reinforced?.current);
  const existingMax = Number(traitState?.reinforced?.max);
  const initializedCurrent = Number.isFinite(existingCurrent)
    ? existingCurrent
    : (Number.isFinite(existingMax) ? existingMax : reinforcedMax);

  return {
    mitigationByType,
    reinforcedMax,
    traitState: {
      reinforced: {
        current: Math.min(reinforcedMax, Math.max(0, initializedCurrent || 0)),
        max: reinforcedMax,
      },
    },
    labels: resolvedEntries.map(entry => entry.label),
    standardTraits: structuredTraits,
  };
}

export function getArmorTraitLabels({ traits = [], standardTraits = [] } = {}) {
  const labels = [
    ...normalizeWeaponTraits(traits),
    ...normalizeArmorStandardTraits(standardTraits).map(entry => entryLabel(entry, ARMOR_STANDARD_TRAIT_DEFS)),
  ];
  return labels.filter(Boolean);
}

export function computeArmorBaseMitigation(currentArmorRating) {
  const rating = Math.max(0, Number(currentArmorRating ?? 0) || 0);
  return rating <= 0 ? 0 : Math.ceil(rating / 4);
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
