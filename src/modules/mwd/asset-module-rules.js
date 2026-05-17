// src/modules/mwd/asset-module-rules.js
// Purpose: Normalizes asset-module authored rules payloads.
// How it fits: Keeps module-carried mechanics data out of sheets and actor prep
// while providing one stable source of truth for derived machine abilities.

function toInteger(value, fallback = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.trunc(numeric);
}

function toNonNegativeInteger(value, fallback = 0) {
  return Math.max(0, toInteger(value, fallback));
}

function toTrimmedString(value, fallback = "") {
  const normalized = String(value ?? "").trim();
  return normalized || fallback;
}

function normalizeStringArray(value) {
  const raw = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  return raw
    .map(entry => String(entry ?? "").trim())
    .filter(Boolean);
}

function normalizeChoice(value, allowed, fallback) {
  const normalized = String(value ?? "").trim();
  return allowed.includes(normalized) ? normalized : fallback;
}

const INSTALL_CLASSES = Object.freeze(["module", "equipment"]);
const ACTIVATION_MODES = Object.freeze(["passive", "toggle", "mode", "triggered"]);
const EFFECT_TIMINGS = Object.freeze(["ready", "active", "triggered"]);
const EFFECT_SCOPES = Object.freeze(["self", "target", "alliesInRange", "enemiesInRange", "sourceTargetPair"]);

export const ASSET_MODULE_BYPASSABLE_STATUSES = Object.freeze(["ecmShrouded"]);

export class AssetModuleValidationError extends Error {
  constructor(message, { itemName = "Asset Module", itemId = "" } = {}) {
    super(`${itemName}: ${message}`);
    this.name = "AssetModuleValidationError";
    this.itemName = itemName;
    this.itemId = itemId;
    this.userMessage = this.message;
  }
}

function fail(message, options = {}) {
  throw new AssetModuleValidationError(message, options);
}

function pathLabel(index, suffix = "") {
  return `effects[${index}]${suffix ? `.${suffix}` : ""}`;
}

function assertObject(value, path, options) {
  if (value === undefined || value === null) return;
  if (typeof value !== "object" || Array.isArray(value)) fail(`${path} must be an object.`, options);
}

function assertStringArrayLike(value, path, options) {
  if (value === undefined || value === null) return;
  if (typeof value === "string") return;
  if (Array.isArray(value) && value.every(entry => typeof entry === "string")) return;
  fail(`${path} must be a string or an array of strings.`, options);
}

function assertNumber(value, path, options) {
  if (value === undefined || value === null) return;
  if (!Number.isFinite(Number(value))) fail(`${path} must be a finite number.`, options);
}

function assertChoice(value, allowed, path, options) {
  if (value === undefined || value === null || value === "") return;
  if (allowed.includes(String(value).trim())) return;
  fail(`${path} must be one of: ${allowed.join(", ")}.`, options);
}

function assertActionOverrides(value, path, options) {
  if (value === undefined || value === null) return;
  if (!Array.isArray(value)) fail(`${path} must be an array.`, options);
  value.forEach((entry, index) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      fail(`${path}[${index}] must be an object.`, options);
    }
    assertStringArrayLike(entry.actionIds ?? entry.actions ?? entry.actionId, `${path}[${index}].actionIds`, options);
    assertNumber(entry.cost, `${path}[${index}].cost`, options);
    if (entry.category !== undefined) assertStringArrayLike(String(entry.category), `${path}[${index}].category`, options);
    if (entry.resource !== undefined) assertStringArrayLike(String(entry.resource), `${path}[${index}].resource`, options);
  });
}

export function validateAssetModuleEffects(source = {}, options = {}) {
  const effects = source?.effects;
  if (effects === undefined || effects === null) return [];
  if (!Array.isArray(effects)) fail("system.effects must be an array.", options);

  effects.forEach((effect, index) => {
    if (!effect || typeof effect !== "object" || Array.isArray(effect)) {
      fail(`${pathLabel(index)} must be an object.`, options);
    }
    if (typeof effect.id !== "string" || !effect.id.trim()) {
      fail(`${pathLabel(index, "id")} is required and must be a non-empty string.`, options);
    }
    if (effect.label !== undefined && typeof effect.label !== "string") {
      fail(`${pathLabel(index, "label")} must be a string.`, options);
    }
    assertChoice(effect.timing, EFFECT_TIMINGS, pathLabel(index, "timing"), options);
    assertChoice(effect.scope, EFFECT_SCOPES, pathLabel(index, "scope"), options);

    assertObject(effect.requires, pathLabel(index, "requires"), options);
    const requires = effect.requires ?? {};
    assertStringArrayLike(requires.tags, pathLabel(index, "requires.tags"), options);
    assertStringArrayLike(requires.actionIds ?? requires.actions ?? requires.action, pathLabel(index, "requires.actionIds"), options);
    assertStringArrayLike(requires.skillIds ?? requires.skills ?? requires.skill, pathLabel(index, "requires.skillIds"), options);
    assertStringArrayLike(requires.weaponTags, pathLabel(index, "requires.weaponTags"), options);
    assertStringArrayLike(requires.statuses, pathLabel(index, "requires.statuses"), options);
    assertStringArrayLike(requires.forbidsStatuses, pathLabel(index, "requires.forbidsStatuses"), options);
    assertStringArrayLike(requires.forbidsTags, pathLabel(index, "requires.forbidsTags"), options);
    assertStringArrayLike(requires.modes ?? requires.mode, pathLabel(index, "requires.modes"), options);

    assertObject(effect.grants, pathLabel(index, "grants"), options);
    const grants = effect.grants ?? {};
    assertStringArrayLike(grants.statuses, pathLabel(index, "grants.statuses"), options);
    if (normalizeStringArray(grants.statuses).includes("ecmBoosted")) {
      fail(`${pathLabel(index, "grants.statuses")} must use epmBoosted, not ecmBoosted.`, options);
    }
    assertActionOverrides(grants.actionOverrides, pathLabel(index, "grants.actionOverrides"), options);
    assertStringArrayLike(grants.actions, pathLabel(index, "grants.actions"), options);
    assertStringArrayLike(grants.reactions, pathLabel(index, "grants.reactions"), options);

    assertObject(effect.modifies, pathLabel(index, "modifies"), options);
    const modifies = effect.modifies ?? {};
    ["dice", "ar", "dr", "trackingPenalty", "targetingData", "clusteringTarget", "clusteringDice", "movementMeters"]
      .forEach(key => assertNumber(modifies[key], pathLabel(index, `modifies.${key}`), options));
    assertStringArrayLike(modifies.bypassStatuses, pathLabel(index, "modifies.bypassStatuses"), options);
    for (const status of normalizeStringArray(modifies.bypassStatuses)) {
      if (!ASSET_MODULE_BYPASSABLE_STATUSES.includes(status)) {
        fail(`${pathLabel(index, "modifies.bypassStatuses")} may only include: ${ASSET_MODULE_BYPASSABLE_STATUSES.join(", ")}.`, options);
      }
    }

    assertObject(effect.costs, pathLabel(index, "costs"), options);
    const costs = effect.costs ?? {};
    assertNumber(costs.heat, pathLabel(index, "costs.heat"), options);
    assertNumber(costs.charges, pathLabel(index, "costs.charges"), options);
    if (costs.stress !== undefined && costs.stress !== null) {
      assertObject(costs.stress, pathLabel(index, "costs.stress"), options);
      if (typeof costs.stress.location !== "string" || !costs.stress.location.trim()) {
        fail(`${pathLabel(index, "costs.stress.location")} is required when stress cost is present.`, options);
      }
      assertNumber(costs.stress.value, pathLabel(index, "costs.stress.value"), options);
    }

    assertObject(effect.limits, pathLabel(index, "limits"), options);
    assertNumber(effect.limits?.cooldownTurns, pathLabel(index, "limits.cooldownTurns"), options);
  });

  return effects;
}

export function normalizeAssetModuleActivation(source = {}) {
  const activation = source && typeof source === "object" ? source : {};
  return {
    mode: normalizeChoice(activation.mode, ACTIVATION_MODES, "passive"),
    active: Boolean(activation.active),
    selectedMode: toTrimmedString(activation.selectedMode, ""),
    cooldownUntilRound: toNonNegativeInteger(activation.cooldownUntilRound, 0),
  };
}

export function normalizeAssetModuleEffectRequires(source = {}) {
  const requires = source && typeof source === "object" ? source : {};
  return {
    tags: normalizeStringArray(requires.tags),
    actionIds: normalizeStringArray(requires.actionIds ?? requires.actions ?? requires.action),
    skillIds: normalizeStringArray(requires.skillIds ?? requires.skills ?? requires.skill),
    weaponTags: normalizeStringArray(requires.weaponTags),
    statuses: normalizeStringArray(requires.statuses),
    forbidsStatuses: normalizeStringArray(requires.forbidsStatuses),
    forbidsTags: normalizeStringArray(requires.forbidsTags),
    detectionState: toTrimmedString(requires.detectionState, ""),
    targetState: toTrimmedString(requires.targetState, ""),
    heatBand: toTrimmedString(requires.heatBand, ""),
    modes: normalizeStringArray(requires.modes ?? requires.mode),
  };
}

export function normalizeAssetModuleEffectGrants(source = {}) {
  const grants = source && typeof source === "object" ? source : {};
  return {
    statuses: normalizeStringArray(grants.statuses),
    actionOverrides: Array.isArray(grants.actionOverrides) ? grants.actionOverrides.filter(Boolean) : [],
    actions: normalizeStringArray(grants.actions),
    reactions: normalizeStringArray(grants.reactions),
  };
}

export function normalizeAssetModuleEffectModifies(source = {}) {
  const modifies = source && typeof source === "object" ? source : {};
  const bypassStatuses = normalizeStringArray(modifies.bypassStatuses)
    .filter(status => ASSET_MODULE_BYPASSABLE_STATUSES.includes(status));
  return {
    dice: toInteger(modifies.dice, 0),
    ar: toInteger(modifies.ar, 0),
    dr: toInteger(modifies.dr, 0),
    trackingPenalty: toInteger(modifies.trackingPenalty, 0),
    targetingData: toInteger(modifies.targetingData, 0),
    clusteringTarget: toInteger(modifies.clusteringTarget, 0),
    clusteringDice: toInteger(modifies.clusteringDice, 0),
    movementMeters: toInteger(modifies.movementMeters, 0),
    bypassStatuses,
  };
}

export function normalizeAssetModuleEffectCosts(source = {}) {
  const costs = source && typeof source === "object" ? source : {};
  const stress = costs.stress && typeof costs.stress === "object"
    ? {
      location: toTrimmedString(costs.stress.location, ""),
      value: toInteger(costs.stress.value, 0),
    }
    : null;
  return {
    heat: toInteger(costs.heat, 0),
    stress,
    charges: toInteger(costs.charges, 0),
  };
}

export function normalizeAssetModuleEffectLimits(source = {}) {
  const limits = source && typeof source === "object" ? source : {};
  return {
    oncePerActivation: Boolean(limits.oncePerActivation),
    cooldownTurns: toNonNegativeInteger(limits.cooldownTurns, 0),
  };
}

export function normalizeAssetModuleEffect(source = {}, index = 0) {
  const effect = source && typeof source === "object" && !Array.isArray(source) ? source : {};
  const id = toTrimmedString(effect.id, `effect-${index + 1}`);
  const label = toTrimmedString(effect.label, id);
  return {
    id,
    label,
    timing: normalizeChoice(effect.timing, EFFECT_TIMINGS, "ready"),
    scope: normalizeChoice(effect.scope, EFFECT_SCOPES, "self"),
    requires: normalizeAssetModuleEffectRequires(effect.requires),
    grants: normalizeAssetModuleEffectGrants(effect.grants),
    modifies: normalizeAssetModuleEffectModifies(effect.modifies),
    costs: normalizeAssetModuleEffectCosts(effect.costs),
    limits: normalizeAssetModuleEffectLimits(effect.limits),
  };
}

export function normalizeAssetModuleEffects(source = []) {
  validateAssetModuleEffects({ effects: source });
  return (Array.isArray(source) ? source : [])
    .map((effect, index) => normalizeAssetModuleEffect(effect, index));
}

export function normalizeAssetModuleJumping(source = {}) {
  const jumping = source && typeof source === "object" ? source : {};
  const enabled = Boolean(jumping.enabled);

  return {
    enabled,
    movement: toNonNegativeInteger(jumping.movement, 0),
    heat: toNonNegativeInteger(jumping.heat, 0),
    attackRatingBonus: toInteger(jumping.attackRatingBonus, 0),
    defenseRatingBonus: toInteger(jumping.defenseRatingBonus, 0),
    dfaEnabled: Boolean(jumping.dfaEnabled ?? enabled),
  };
}

export function normalizeAssetModuleClustering(source = {}) {
  const clustering = source && typeof source === "object" ? source : {};

  return {
    diceModifier: toInteger(clustering.diceModifier, 0),
    targetNumberModifier: toInteger(clustering.targetNumberModifier, 0),
  };
}

export function normalizeAssetModuleSystem(system = {}) {
  const source = system && typeof system === "object" ? system : {};
  const mobility = source.mobility && typeof source.mobility === "object" ? source.mobility : {};
  const targeting = source.targeting && typeof source.targeting === "object" ? source.targeting : {};

  return {
    ...source,
    installClass: normalizeChoice(source.installClass, INSTALL_CLASSES, "module"),
    category: toTrimmedString(source.category, "special"),
    level: Math.max(1, toInteger(source.level, 1)),
    activation: normalizeAssetModuleActivation(source.activation),
    effects: normalizeAssetModuleEffects(source.effects),
    mobility: {
      ...mobility,
      jumping: normalizeAssetModuleJumping(mobility.jumping),
    },
    targeting: {
      ...targeting,
      clustering: normalizeAssetModuleClustering(targeting.clustering),
    },
  };
}

export function getAssetModuleJumpingProfile(itemOrSystem = {}) {
  const system = itemOrSystem?.system ?? itemOrSystem;
  return normalizeAssetModuleSystem(system).mobility.jumping;
}

export function getAssetModuleClusteringProfile(itemOrSystem = {}) {
  const system = itemOrSystem?.system ?? itemOrSystem;
  return normalizeAssetModuleSystem(system).targeting.clustering;
}
