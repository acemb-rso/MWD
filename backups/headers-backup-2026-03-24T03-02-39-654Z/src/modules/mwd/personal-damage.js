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

export const TRAIT_REGISTRY = Object.freeze({
  "armor piercing": () => ({ ap: 2 }),
  "anti-ferro": () => ({ bonusVsArmorTag: { ferroFibrous: 0.33 } }),
  blast: () => ({ flags: ["blast", "area"] }),
  corrosive: () => ({ flags: ["corrosive"] }),
  emp: () => ({ flags: ["emp"] }),
  inaccurate: () => ({ accuracyMod: -1 }),
});

function normalizeStringList(value) {
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

export function deriveWeaponEffectsFromTraits(traits = []) {
  return mergeWeaponEffects(
    normalizeWeaponTraits(traits).map(trait => {
      const resolver = TRAIT_REGISTRY[String(trait).trim().toLowerCase()];
      return typeof resolver === "function" ? resolver() : null;
    })
  );
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
