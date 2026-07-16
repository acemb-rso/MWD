// src/modules/mwd/traits.js
// Purpose: Shared quality/trait schema normalization and generic trait rule evaluation.
// How it fits: Keeps quality items declarative while letting engine phases consume generic rule packets.

import { SYSTEM_NAME } from "../core/constants.js";
import { toNumber, toTrimmedString } from "../utils/coercion.js";
import { cloneValue } from "../utils/clone.js";
import {
  normalizeRuleLimits,
  normalizeRulePrerequisites,
} from "./rules.js";
import {
  compareTypedValues,
  parseTypedValue,
  stringifyTypedValue,
} from "./typed-rule-values.js";

export const QUALITY_CATEGORIES = Object.freeze([
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "narrative", label: "Narrative" },
]);

export const QUALITY_TIERS = Object.freeze([
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" },
]);

export const QUALITY_ACTIVATIONS = Object.freeze([
  { value: "passive", label: "Passive" },
  { value: "triggered", label: "Triggered" },
]);

export const TRAIT_EFFECT_TYPES = Object.freeze([
  { value: "rollMod", label: "Roll Modifier" },
  { value: "burnAdjust", label: "Burn Adjust" },
  { value: "actionCostMod", label: "Action Cost Mod" },
  { value: "initiativeMod", label: "Initiative Mod" },
  { value: "damageMod", label: "Damage Intake Mod" },
  { value: "speedMod", label: "Speed Modifier" },
  { value: "attackRatingMod", label: "Attack Rating Mod" },
  { value: "suppressAttackerMotionDN", label: "Suppress Attacker Motion DN" },
  { value: "defenseRatingMod", label: "Defense Rating Mod" },
  { value: "saCapMod", label: "SA Cap Modifier" },
  { value: "faCapMod", label: "FA Cap Modifier" },
  { value: "raCapMod", label: "RA Cap Modifier" },
  { value: "conditionPenaltyMod", label: "Condition Penalty Mod" },
  { value: "overloadDNMod", label: "Overload DN Mod" },
  { value: "overloadThresholdMod", label: "Overload Threshold Mod" },
  { value: "edgeEvent", label: "Edge Event" },
]);

export const TRAIT_PHASES = Object.freeze([
  { value: "onBuildRoll", label: "Build Roll" },
  { value: "onBeforeBurnApplied", label: "Before Burn Applied" },
  { value: "onBeforeActionCostFinalized", label: "Before Action Cost Finalized" },
  { value: "onInitiativeResolved", label: "Initiative Resolved" },
  { value: "onDamageResolved", label: "Damage Resolved" },
  { value: "onDerivedPersonalCombat", label: "Derived Personal Combat" },
  { value: "onAttackRatingResolved", label: "Attack Rating Resolved" },
  { value: "onDefenseRatingResolved", label: "Defense Rating Resolved" },
  { value: "onActivationBudgetResolved", label: "Activation Budget Resolved" },
  { value: "onConditionPenaltyResolved", label: "Condition Penalty Resolved" },
  { value: "onEndOfActivation", label: "End of Activation" },
  { value: "onEdgeSpend", label: "Edge Spend" },
  { value: "onEdgeGain", label: "Edge Gain" },
]);

export const TRAIT_EFFECT_APPLICATIONS = Object.freeze([
  { value: "automatic", label: "Automatic" },
  { value: "optional", label: "Prompted Optional" },
]);

export const TRAIT_COMPARATORS = Object.freeze([
  { value: "eq", label: "=" },
  { value: "neq", label: "!=" },
  { value: "gt", label: ">" },
  { value: "gte", label: ">=" },
  { value: "lt", label: "<" },
  { value: "lte", label: "<=" },
  { value: "includes", label: "Includes" },
  { value: "notIncludes", label: "Excludes" },
  { value: "truthy", label: "Is True" },
  { value: "falsy", label: "Is False" },
]);

export const TRAIT_EDGE_OPERATIONS = Object.freeze([
  { value: "adjustAmount", label: "Adjust Amount" },
  { value: "grantPool", label: "Grant Pool" },
]);

const CATEGORY_VALUES = new Set(QUALITY_CATEGORIES.map(entry => entry.value));
const TIER_VALUES = new Set(QUALITY_TIERS.map(entry => entry.value));
const ACTIVATION_VALUES = new Set(QUALITY_ACTIVATIONS.map(entry => entry.value));
const EFFECT_TYPE_VALUES = new Set(TRAIT_EFFECT_TYPES.map(entry => entry.value));
const PHASE_VALUES = new Set(TRAIT_PHASES.map(entry => entry.value));
const COMPARATOR_VALUES = new Set(TRAIT_COMPARATORS.map(entry => entry.value));
const EDGE_OPERATION_VALUES = new Set(TRAIT_EDGE_OPERATIONS.map(entry => entry.value));
const APPLICATION_VALUES = new Set(TRAIT_EFFECT_APPLICATIONS.map(entry => entry.value));
const CYBERNETIC_SUBTYPE = "cybernetic";
const CYBERNETIC_ACTIVATIONS = new Set(["passive", "toggle"]);
const CYBERNETIC_LOAD_MAX = 2;

export const TRAIT_ACTIVE_EFFECT_PATHS = Object.freeze({
  speedMod: "system.traitMods.speedMod",
  attackRatingMod: "system.traitMods.attackRatingMod",
  suppressAttackerMotionDN: "system.traitMods.suppressAttackerMotionDN",
  defenseRatingMod: "system.traitMods.defenseRatingMod",
  saCapMod: "system.traitMods.saCapMod",
  faCapMod: "system.traitMods.faCapMod",
  raCapMod: "system.traitMods.raCapMod",
  conditionPhysicalValueMod: "system.traitMods.conditionPhysicalValueMod",
  conditionFatigueValueMod: "system.traitMods.conditionFatigueValueMod",
  conditionPhysicalPenaltyMod: "system.traitMods.conditionPhysicalPenaltyMod",
  conditionFatiguePenaltyMod: "system.traitMods.conditionFatiguePenaltyMod",
  overloadDNMod: "system.traitMods.overloadDNMod",
  overloadThresholdMod: "system.traitMods.overloadThresholdMod",
});

function getProperty(source, path = "") {
  const normalized = toTrimmedString(path);
  if (!source || !normalized) return undefined;
  if (typeof globalThis.foundry?.utils?.getProperty === "function") {
    return globalThis.foundry.utils.getProperty(source, normalized);
  }
  return normalized.split(".").reduce((current, segment) => current?.[segment], source);
}

export function getTraitActiveEffectModifier(actor, key = "") {
  const path = TRAIT_ACTIVE_EFFECT_PATHS[key] ?? "";
  if (!actor || !path) return 0;
  const systemPath = path.startsWith("system.") ? path.slice(7) : path;
  return toNumber(getProperty(actor.system ?? {}, systemPath), 0);
}

function normalizeStringArray(values = []) {
  const raw = Array.isArray(values)
    ? values
    : typeof values === "string"
      ? values.split(",")
      : [];

  return raw
    .map(entry => String(entry ?? "").trim())
    .filter(Boolean);
}

export function normalizeCyberneticTags(values = []) {
  return normalizeStringArray(values);
}

export function parseCyberneticTagMetadata(tags = []) {
  const normalizedTags = normalizeCyberneticTags(tags);
  const loadTag = normalizedTags.find(tag => /^load\d+$/i.test(tag));
  const bodySlotTag = normalizedTags.find(tag => /^bodySlot:/i.test(tag));
  return {
    load: loadTag ? Math.min(CYBERNETIC_LOAD_MAX, Math.max(0, Math.trunc(toNumber(loadTag.replace(/^load/i, ""), 0)))) : 0,
    bodySlot: bodySlotTag ? toTrimmedString(bodySlotTag.split(":").slice(1).join(":")) : "",
    hasActivateTag: normalizedTags.some(tag => tag.toLowerCase() === "activate"),
    tags: normalizedTags,
  };
}

function normalizeLimitValue(value) {
  const numeric = Math.max(0, Math.trunc(toNumber(value, 0)));
  return numeric > 0 ? numeric : 0;
}

export function normalizeTraitLimits(limits = {}) {
  const source = normalizeRuleLimits(limits);
  return {
    perActivation: normalizeLimitValue(source.perActivation),
    perRound: normalizeLimitValue(source.perRound),
    perScene: normalizeLimitValue(source.perScene),
  };
}

function normalizeComparatorEntry(entry = {}) {
  const source = entry && typeof entry === "object" ? entry : {};
  const normalized = {
    id: toTrimmedString(source.id, foundry.utils.randomID()),
    fact: toTrimmedString(source.fact),
  };

  const comparator = TRAIT_COMPARATORS.find(option => source[option.value] !== undefined && source[option.value] !== null);
  const key = comparator?.value ?? (COMPARATOR_VALUES.has(String(source.comparator ?? "").trim()) ? String(source.comparator).trim() : "eq");

  normalized.comparator = key;
  if (key !== "truthy" && key !== "falsy") {
    normalized.value = parseTypedValue(source[key] ?? source.value ?? "");
  }

  return normalized;
}

export function normalizeTraitPrerequisites(entries = []) {
  return normalizeRulePrerequisites(entries).map(entry => ({
    ...entry,
    comparator: entry.op,
  }));
}

function normalizeTraitEffect(entry = {}) {
  const source = entry && typeof entry === "object" ? entry : {};
  const type = EFFECT_TYPE_VALUES.has(String(source.type ?? "").trim())
    ? String(source.type).trim()
    : "rollMod";
  const defaultPhase = defaultPhaseForEffect(type);
  const phase = PHASE_VALUES.has(String(source.phase ?? "").trim())
    ? String(source.phase).trim()
    : defaultPhase;
  const operation = EDGE_OPERATION_VALUES.has(String(source.operation ?? "").trim())
    ? String(source.operation).trim()
    : "adjustAmount";

  return {
    id: toTrimmedString(source.id, foundry.utils.randomID()),
    type,
    phase,
    selector: toTrimmedString(source.selector),
    skillKeys: normalizeStringArray(source.skillKeys),
    label: toTrimmedString(source.label),
    value: toNumber(source.value, 0),
    min: source.min === undefined || source.min === null || source.min === ""
      ? null
      : toNumber(source.min, 0),
    max: source.max === undefined || source.max === null || source.max === ""
      ? null
      : toNumber(source.max, 0),
    pool: toTrimmedString(source.pool),
    operation,
    application: APPLICATION_VALUES.has(String(source.application ?? "").trim())
      ? String(source.application).trim()
      : "automatic",
    defaultEnabled: source.defaultEnabled === true,
    conditions: normalizeTraitPrerequisites(source.conditions),
    limit: normalizeTraitLimits(source.limit),
  };
}

export function traitEffectUsesSkillSelector(effect = {}) {
  const selector = toTrimmedString(effect?.selector);
  return selector === "intent.skill" || selector.startsWith("intent.skill.");
}

export function normalizeTraitEffects(entries = []) {
  const source = Array.isArray(entries) ? entries : [];
  return source
    .map(normalizeTraitEffect)
    .filter(entry => entry.phase && entry.type);
}

export function normalizeQualityTraitSystem(system = {}) {
  const source = system && typeof system === "object" ? cloneValue(system, null) : {};
  const categoryFromLegacy = source.positive === false ? "negative" : "positive";
  const category = CATEGORY_VALUES.has(String(source.category ?? "").trim())
    ? String(source.category).trim()
    : categoryFromLegacy;
  const tier = TIER_VALUES.has(String(source.tier ?? "").trim())
    ? String(source.tier).trim()
    : "minor";
  const activation = ACTIVATION_VALUES.has(String(source.activation ?? "").trim())
    ? String(source.activation).trim()
    : "passive";

  return {
    ...source,
    positive: category === "positive",
    category,
    tier,
    activation,
    tags: normalizeStringArray(source.tags),
    effects: normalizeTraitEffects(source.effects),
    prerequisites: normalizeTraitPrerequisites(source.prerequisites),
    limits: normalizeTraitLimits(source.limits),
  };
}

export function isCyberneticGearSystem(system = {}) {
  const tags = normalizeCyberneticTags(system?.tags);
  return toTrimmedString(system?.subtype).toLowerCase() === CYBERNETIC_SUBTYPE
    || tags.some(tag => tag.toLowerCase() === CYBERNETIC_SUBTYPE);
}

export function normalizeCyberneticGearSystem(system = {}) {
  const source = system && typeof system === "object" ? cloneValue(system, null) : {};
  const tagMeta = parseCyberneticTagMetadata(source.tags);
  const activation = tagMeta.hasActivateTag
    ? "toggle"
    : CYBERNETIC_ACTIVATIONS.has(toTrimmedString(source.activation))
      ? toTrimmedString(source.activation)
      : "passive";
  const loadFromSystem = source.load === undefined || source.load === null || source.load === ""
    ? tagMeta.load
    : toNumber(source.load, tagMeta.load);
  return {
    ...source,
    subtype: CYBERNETIC_SUBTYPE,
    equipped: source.equipped === true,
    active: activation === "toggle" ? source.active === true : true,
    activation,
    load: Math.min(CYBERNETIC_LOAD_MAX, Math.max(0, Math.trunc(loadFromSystem))),
    bodySlot: toTrimmedString(source.bodySlot, tagMeta.bodySlot),
    tags: tagMeta.tags.some(tag => tag.toLowerCase() === CYBERNETIC_SUBTYPE)
      ? tagMeta.tags
      : [CYBERNETIC_SUBTYPE, ...tagMeta.tags],
    effects: normalizeTraitEffects(source.effects),
    prerequisites: normalizeTraitPrerequisites(source.prerequisites),
    limits: normalizeTraitLimits(source.limits),
  };
}

export function isCyberneticOnline(item) {
  const system = item?.system ?? item ?? {};
  return !system.inactive
    && isCyberneticGearSystem(system)
    && system.equipped === true
    && (
      toTrimmedString(system.activation) !== "toggle"
      || system.active === true
    );
}

function normalizeCyberneticTraitSystem(item) {
  const system = normalizeCyberneticGearSystem(item?.system ?? {});
  const effects = [...system.effects];
  if (system.load > 0) {
    effects.push({
      id: "cybernetic-load",
      type: "overloadDNMod",
      phase: "onBuildRoll",
      selector: "intent.overload",
      label: `${item?.name ?? "Cybernetic"} Load`,
      value: system.load,
      min: null,
      max: null,
      pool: "",
      operation: "adjustAmount",
      application: "automatic",
      defaultEnabled: false,
      conditions: [],
      limit: normalizeTraitLimits({}),
    });
  }
  return {
    ...system,
    effects,
  };
}

export function getTraitEditorConfig() {
  return {
    categories: [...QUALITY_CATEGORIES],
    tiers: [...QUALITY_TIERS],
    activations: [...QUALITY_ACTIVATIONS],
    effectTypes: [...TRAIT_EFFECT_TYPES],
    phases: [...TRAIT_PHASES],
    comparators: [...TRAIT_COMPARATORS],
    edgeOperations: [...TRAIT_EDGE_OPERATIONS],
    applications: [...TRAIT_EFFECT_APPLICATIONS],
  };
}

export function getQualityCategoryLabel(category = "") {
  return QUALITY_CATEGORIES.find(entry => entry.value === category)?.label ?? "Positive";
}

export function getQualityTierLabel(tier = "") {
  return QUALITY_TIERS.find(entry => entry.value === tier)?.label ?? "Minor";
}

function defaultPhaseForEffect(type = "") {
  switch (type) {
    case "burnAdjust": return "onBeforeBurnApplied";
    case "actionCostMod": return "onBeforeActionCostFinalized";
    case "initiativeMod": return "onInitiativeResolved";
    case "damageMod": return "onDamageResolved";
    case "speedMod": return "onDerivedPersonalCombat";
    case "attackRatingMod": return "onAttackRatingResolved";
    case "defenseRatingMod": return "onDefenseRatingResolved";
    case "saCapMod": return "onActivationBudgetResolved";
    case "faCapMod": return "onActivationBudgetResolved";
    case "raCapMod": return "onActivationBudgetResolved";
    case "conditionPenaltyMod": return "onConditionPenaltyResolved";
    case "overloadDNMod": return "onBuildRoll";
    case "overloadThresholdMod": return "onBuildRoll";
    case "edgeEvent": return "onEdgeGain";
    default: return "onBuildRoll";
  }
}

function getItemTraits(actor) {
  const traits = Array.from(actor?.items ?? [])
    .filter(item => (item?.canonicalType ?? item?.type) === "quality")
    .map(item => ({
      item,
      system: normalizeQualityTraitSystem(item.system ?? {}),
    }));
  const cybernetics = Array.from(actor?.items ?? [])
    .filter(item => (item?.canonicalType ?? item?.type) === "gear")
    .filter(item => isCyberneticGearSystem(item?.system ?? {}))
    .filter(item => isCyberneticOnline(item))
    .map(item => ({
      item,
      system: normalizeCyberneticTraitSystem(item),
    }));
  return traits.concat(cybernetics);
}

function mergeUsageLimits(itemLimits = {}, effectLimits = {}) {
  const base = normalizeTraitLimits(itemLimits);
  const effect = normalizeTraitLimits(effectLimits);
  return {
    perActivation: effect.perActivation || base.perActivation,
    perRound: effect.perRound || base.perRound,
    perScene: effect.perScene || base.perScene,
  };
}

function getRuntimeKeys(runtime = {}) {
  const combatId = toTrimmedString(runtime.combatId ?? runtime.combat?.id);
  const round = Math.max(0, Math.trunc(toNumber(runtime.round ?? runtime.combat?.round, 0)));
  const sceneId = toTrimmedString(runtime.sceneId ?? globalThis.canvas?.scene?.id);
  return {
    activationKey: toTrimmedString(runtime.activationKey),
    roundKey: combatId ? `${combatId}:${round}` : "",
    sceneKey: sceneId,
  };
}

function getTraitUsageState(actor, runtime = {}) {
  const actorFlags = actor?.flags?.[SYSTEM_NAME] ?? {};
  const sceneUsage = actorFlags?.traitUsage?.scene ?? {};
  const combatState = runtime.state ?? {};
  return {
    activation: combatState?.traitUsage?.activation ?? {},
    round: combatState?.traitUsage?.round ?? {},
    scene: sceneUsage,
  };
}

function usageCountForScope(usageState, runtimeKeys, scope, key) {
  switch (scope) {
    case "perActivation":
      return Math.max(0, Math.trunc(toNumber(usageState.activation?.[key], 0)));
    case "perRound":
      return Math.max(0, Math.trunc(toNumber(usageState.round?.[runtimeKeys.roundKey]?.[key], 0)));
    case "perScene":
      return Math.max(0, Math.trunc(toNumber(usageState.scene?.[runtimeKeys.sceneKey]?.[key], 0)));
    default:
      return 0;
  }
}

function canApplyEffectForLimits(usageState, runtimeKeys, limits, key) {
  const failures = [];
  for (const scope of ["perActivation", "perRound", "perScene"]) {
    const limit = Math.max(0, Math.trunc(toNumber(limits?.[scope], 0)));
    if (!limit) continue;
    const used = usageCountForScope(usageState, runtimeKeys, scope, key);
    if (used >= limit) {
      failures.push(`${scope} limit reached`);
    }
  }
  return failures;
}

function evaluateComparatorEntry(entry, facts) {
  if (!toTrimmedString(entry?.fact)) return true;
  const actual = foundry.utils.getProperty(facts, entry.fact);
  return compareTypedValues(actual, entry.value, entry.comparator);
}

function selectorMatches(selector = "", facts = {}) {
  const normalized = toTrimmedString(selector);
  if (!normalized) return true;
  const selectors = Array.isArray(facts?.selectors) ? facts.selectors : [];
  return selectors.some(candidate =>
    candidate === normalized
    || candidate.startsWith(`${normalized}.`)
  );
}

function effectUsageKey(item, effect) {
  return `${item.id}:${effect.id}`;
}

function itemIsSuppressed(item, system) {
  return Boolean(item.system?.inactive) || Boolean(system?.inactive);
}

function describeConditionList(entries = []) {
  return entries
    .map(entry => entry.fact)
    .filter(Boolean)
    .join(", ");
}

function clampPacketNumber(packet, field, effect) {
  const current = toNumber(packet[field], 0);
  let next = current;

  if (typeof effect.value === "number") {
    next += effect.value;
  }
  if (typeof effect.min === "number") {
    next = Math.max(effect.min, next);
  }
  if (typeof effect.max === "number") {
    next = Math.min(effect.max, next);
  }

  packet[field] = next;
  return next - current;
}

function pushModifier(target, item, effect, delta, phase) {
  if (!delta) return;
  target.push({
    id: `trait:${phase}:${item.id}:${effect.id}`,
    label: effect.label || item.name,
    value: delta,
    source: item.name,
    traitItemId: item.id,
    traitEffectId: effect.id,
    application: effect.application,
    defaultEnabled: effect.defaultEnabled === true,
  });
}

function applyTraitEffect({ item, effect, phase, packet, result }) {
  switch (effect.type) {
    case "rollMod": {
      const delta = toNumber(effect.value, 0);
      pushModifier(result.modifiers, item, effect, delta, phase);
      return delta;
    }
    case "burnAdjust": {
      if (phase === "onEndOfActivation") {
        const delta = clampPacketNumber(packet, "burnDelta", effect);
        pushModifier(result.modifiers, item, effect, delta, phase);
        return delta;
      }
      const delta = clampPacketNumber(packet, "amount", effect);
      pushModifier(result.modifiers, item, effect, delta, phase);
      return delta;
    }
    case "actionCostMod": {
      const delta = clampPacketNumber(packet, "cost", effect);
      pushModifier(result.modifiers, item, effect, delta, phase);
      return delta;
    }
    case "initiativeMod": {
      const delta = clampPacketNumber(packet, "total", effect);
      pushModifier(result.modifiers, item, effect, delta, phase);
      return delta;
    }
    case "damageMod": {
      const delta = clampPacketNumber(packet, "amount", effect);
      pushModifier(result.modifiers, item, effect, delta, phase);
      return delta;
    }
    case "speedMod": {
      const delta = clampPacketNumber(packet, "modifier", effect);
      pushModifier(result.modifiers, item, effect, delta, phase);
      return delta;
    }
    case "attackRatingMod": {
      const delta = clampPacketNumber(packet, "total", effect);
      pushModifier(result.modifiers, item, effect, delta, phase);
      return delta;
    }
    case "defenseRatingMod": {
      const delta = clampPacketNumber(packet, "total", effect);
      pushModifier(result.modifiers, item, effect, delta, phase);
      return delta;
    }
    case "saCapMod": {
      if (toTrimmedString(packet.resource) !== "sa") return 0;
      const delta = clampPacketNumber(packet, "max", effect);
      pushModifier(result.modifiers, item, effect, delta, phase);
      return delta;
    }
    case "faCapMod": {
      if (toTrimmedString(packet.resource) !== "fa") return 0;
      const delta = clampPacketNumber(packet, "max", effect);
      pushModifier(result.modifiers, item, effect, delta, phase);
      return delta;
    }
    case "raCapMod": {
      if (toTrimmedString(packet.resource) !== "ra") return 0;
      const delta = clampPacketNumber(packet, "max", effect);
      pushModifier(result.modifiers, item, effect, delta, phase);
      return delta;
    }
    case "conditionPenaltyMod": {
      const track = toTrimmedString(effect.selector).startsWith("condition.fatigue")
        ? (Object.prototype.hasOwnProperty.call(packet, "fatigueValue") ? "fatigueValue" : "fatiguePenalty")
        : toTrimmedString(effect.selector).startsWith("condition.physical")
          ? (Object.prototype.hasOwnProperty.call(packet, "physicalValue") ? "physicalValue" : "physicalPenalty")
          : "totalPenalty";
      const field = track === "totalPenalty" ? "totalPenalty" : track;
      const delta = clampPacketNumber(packet, field, effect);
      pushModifier(result.modifiers, item, effect, delta, phase);
      return delta;
    }
    case "overloadDNMod": {
      if (!Object.prototype.hasOwnProperty.call(packet, "dn")) return 0;
      const delta = clampPacketNumber(packet, "dn", effect);
      pushModifier(result.modifiers, item, effect, delta, phase);
      return delta;
    }
    case "overloadThresholdMod": {
      if (!Object.prototype.hasOwnProperty.call(packet, "threshold")) return 0;
      const delta = clampPacketNumber(packet, "threshold", effect);
      pushModifier(result.modifiers, item, effect, delta, phase);
      return delta;
    }
    case "edgeEvent": {
      if (phase === "onEndOfActivation" && effect.operation === "grantPool" && effect.pool) {
        packet.edgeAdjustments ??= [];
        packet.edgeAdjustments.push({
          poolKey: effect.pool,
          amount: toNumber(effect.value, 0),
          label: effect.label || item.name,
          source: item.name,
        });
        pushModifier(result.modifiers, item, effect, toNumber(effect.value, 0), phase);
        return toNumber(effect.value, 0);
      }
      const delta = clampPacketNumber(packet, "amount", effect);
      pushModifier(result.modifiers, item, effect, delta, phase);
      return delta;
    }
    default:
      return 0;
  }
}

function buildUsageMutations(item, effect, limits) {
  const key = effectUsageKey(item, effect);
  const out = [];
  if (limits.perActivation > 0) out.push({ kind: "usage", scope: "perActivation", key, delta: 1 });
  if (limits.perRound > 0) out.push({ kind: "usage", scope: "perRound", key, delta: 1 });
  if (limits.perScene > 0) out.push({ kind: "usage", scope: "perScene", key, delta: 1 });
  return out;
}

function buildSelectorsForAction(actionId = "") {
  const normalized = toTrimmedString(actionId);
  return normalized ? [`action.${normalized}`] : [];
}

function baseFacts(actor, runtime = {}) {
  const snapshot = runtime.snapshot ?? null;
  const state = runtime.state ?? snapshot?.state ?? {};
  const actionIds = Array.isArray(state?.actionLog)
    ? state.actionLog.map(entry => toTrimmedString(entry?.id)).filter(Boolean)
    : [];
  const actionState = state?.actionState ?? {};
  const selectors = [];
  if (actionState?.aim) selectors.push("state.aim");
  if (actionState?.preparedInterrupt) selectors.push("state.preparedInterrupt");
  return {
    activation: {
      moved: actionIds.includes("move") || Boolean(actionState?.move?.moved),
      saSpent: Math.max(0, Math.trunc(toNumber(state?.saSpentThisActivation, 0))),
      attacksThisActivation: Math.max(0, Math.trunc(toNumber(state?.attacksThisActivation, 0))),
      burnThisActivation: Math.max(0, Math.trunc(toNumber(state?.burnThisActivation, 0))),
      actions: actionIds,
    },
    actionState: {
      aim: actionState?.aim ?? null,
      move: actionState?.move ?? null,
      preparedInterrupt: actionState?.preparedInterrupt ?? null,
    },
    burn: {
      current: Math.max(0, Math.trunc(toNumber(actor?.system?.burn?.value, 0))),
      overloaded: Boolean(actor?.system?.burn?.overloaded),
    },
    timing: {
      firstAttackThisActivation: Math.max(0, Math.trunc(toNumber(state?.attacksThisActivation, 0))) === 0,
      firstExtraSAThisActivation: Math.max(0, Math.trunc(toNumber(state?.saSpentThisActivation, 0))) <= 3,
    },
    selectors,
  };
}

export function buildRollTraitFacts({ actor, resolved, payload, runtime = {} } = {}) {
  const facts = baseFacts(actor, runtime);
  const intent = toTrimmedString(resolved?.intent ?? payload?.intent, "skill");
  const domains = Array.isArray(resolved?.domains) ? resolved.domains : [];
  const rangeBand = toTrimmedString(resolved?.attack?.rangeBand ?? payload?.rangeBand);
  const prePoolKey = toTrimmedString(payload?.edge?.pre?.poolKey ?? payload?.edge?.poolKey ?? "");
  const commonCheckId = toTrimmedString(resolved?.data?.commonCheckId ?? payload?.id);
  const tags = [
    ...(Array.isArray(resolved?.tags) ? resolved.tags : []),
    ...(Array.isArray(resolved?.domainTags) ? resolved.domainTags : []),
  ].map(entry => toTrimmedString(entry)).filter(Boolean);
  const skillKey = toTrimmedString(
    resolved?.data?.skillKey
    ?? resolved?.specialization?.skillKey
    ?? (intent === "skill" ? payload?.key : "")
  );
  const skillLabel = toTrimmedString(
    resolved?.breakdown?.find?.(entry => entry?.id === "skill")?.label
    ?? resolved?.title
  );

  facts.intent = intent;
  facts.domains = domains;
  facts.rangeBand = rangeBand;
  facts.skill = {
    key: skillKey,
    label: skillLabel,
  };
  facts.common = {
    id: intent === "common" ? commonCheckId : "",
  };
  facts.tags = tags;
  facts.edge = {
    stage: payload?.toggles?.useEdge ? "pre" : "",
    pool: prePoolKey,
    spent: Boolean(payload?.toggles?.useEdge),
  };
  facts.selectors.push(`intent.${intent}`);
  domains.forEach(domain => facts.selectors.push(`domain.${domain}`));
  if (rangeBand) facts.selectors.push(`range.${rangeBand}`);
  if (intent === "skill" && skillKey) facts.selectors.push(`skill.${skillKey}`);
  if (intent === "common" && commonCheckId) facts.selectors.push(`common.${commonCheckId}`);
  tags.forEach(tag => facts.selectors.push(`tag.${tag}`));
  if (payload?.toggles?.useEdge) facts.selectors.push("edge.pre");
  return facts;
}

export function buildActionCostTraitFacts({ actor, packet = {}, runtime = {} } = {}) {
  const facts = baseFacts(actor, runtime);
  facts.action = {
    id: toTrimmedString(packet.actionId),
    category: toTrimmedString(packet.category),
    resource: toTrimmedString(packet.resource),
    cost: toNumber(packet.cost, 0),
    effectiveCost: toNumber(packet.effectiveCost ?? packet.cost, 0),
  };
  facts.selectors.push(...buildSelectorsForAction(packet.actionId));
  if (facts.action.category) facts.selectors.push(`actionCategory.${facts.action.category}`);
  if (facts.action.resource) facts.selectors.push(`actionResource.${facts.action.resource}`);
  return facts;
}

export function buildBurnTraitFacts({ actor, packet = {}, runtime = {} } = {}) {
  const facts = baseFacts(actor, runtime);
  facts.action = {
    id: toTrimmedString(packet.actionId),
    category: toTrimmedString(packet.category),
    resource: toTrimmedString(packet.resource),
  };
  facts.burn = {
    ...facts.burn,
    amount: toNumber(packet.amount, 0),
    source: toTrimmedString(packet.source),
  };
  if (packet.source === "extraSA" && packet.extraSaIndex === 1) {
    facts.selectors.push("activation.extraSA:first");
  }
  if (packet.source) facts.selectors.push(`burn.${packet.source}`);
  if (facts.action.id) facts.selectors.push(...buildSelectorsForAction(facts.action.id));
  if (facts.action.category) facts.selectors.push(`actionCategory.${facts.action.category}`);
  if (facts.action.category === "reaction") facts.selectors.push(`reaction.${facts.action.id}`);
  return facts;
}

export function buildInitiativeTraitFacts({ actor, packet = {}, runtime = {} } = {}) {
  const facts = baseFacts(actor, runtime);
  facts.intent = "initiative";
  facts.domains = ["combat"];
  facts.initiative = {
    total: toNumber(packet.total, 0),
  };
  facts.selectors.push("intent.initiative");
  return facts;
}

export function buildDamageTraitFacts({ actor, packet = {}, runtime = {} } = {}) {
  const facts = baseFacts(actor, runtime);
  facts.damage = {
    amount: toNumber(packet.amount, 0),
    track: toTrimmedString(packet.track),
    damageType: toTrimmedString(packet.damageType),
  };
  facts.selectors.push("incoming");
  if (facts.damage.track) facts.selectors.push(`incoming.${facts.damage.track}`);
  if (facts.damage.damageType) facts.selectors.push(`damageType.${facts.damage.damageType}`);
  return facts;
}

export function buildDerivedPersonalCombatTraitFacts({ actor, packet = {}, runtime = {} } = {}) {
  const facts = baseFacts(actor, runtime);
  facts.personalCombat = {
    speed: {
      base: toNumber(packet.base, 0),
      modifier: toNumber(packet.modifier, 0),
    },
  };
  facts.selectors.push("derived.personalCombat", "derived.personalCombat.speed");
  return facts;
}

export function buildAttackRatingTraitFacts({ actor, packet = {}, runtime = {} } = {}) {
  const facts = baseFacts(actor, runtime);
  facts.attackRating = {
    total: toNumber(packet.total, 0),
  };
  facts.intent = "attack";
  facts.domains = ["combat", "attack"];
  facts.selectors.push("attackRating", "intent.attack", "domain.attack");
  return facts;
}

export function buildDefenseRatingTraitFacts({ actor, packet = {}, runtime = {} } = {}) {
  const facts = baseFacts(actor, runtime);
  facts.defenseRating = {
    total: toNumber(packet.total, 0),
  };
  facts.intent = "attack";
  facts.domains = ["combat", "attack", "defense"];
  facts.selectors.push("defenseRating", "intent.attack", "domain.defense");
  return facts;
}

export function buildActivationBudgetTraitFacts({ actor, packet = {}, runtime = {} } = {}) {
  const facts = baseFacts(actor, runtime);
  facts.activationBudget = {
    max: toNumber(packet.max, 0),
    resource: toTrimmedString(packet.resource),
  };
  facts.selectors.push("activationBudget");
  if (facts.activationBudget.resource) facts.selectors.push(`activationBudget.${facts.activationBudget.resource}`);
  return facts;
}

export function buildConditionPenaltyTraitFacts({ actor, packet = {}, runtime = {} } = {}) {
  const facts = baseFacts(actor, runtime);
  facts.condition = {
    physicalValue: toNumber(packet.physicalValue, 0),
    fatigueValue: toNumber(packet.fatigueValue, 0),
    physicalPenalty: toNumber(packet.physicalPenalty, 0),
    fatiguePenalty: toNumber(packet.fatiguePenalty, 0),
    totalPenalty: toNumber(packet.totalPenalty, 0),
  };
  facts.selectors.push("condition");
  if (facts.condition.physicalPenalty !== 0 || facts.condition.physicalValue !== 0) facts.selectors.push("condition.physical");
  if (facts.condition.fatiguePenalty !== 0 || facts.condition.fatigueValue !== 0) facts.selectors.push("condition.fatigue");
  if (facts.condition.totalPenalty !== 0) facts.selectors.push("condition.total");
  return facts;
}

function applicationMatches(effect, application) {
  const desired = String(application ?? "automatic").trim() || "automatic";
  if (desired === "all") return true;
  return String(effect?.application ?? "automatic").trim() === desired;
}

export function buildEdgeTraitFacts({ actor, packet = {}, phase = "onEdgeGain", runtime = {} } = {}) {
  const facts = baseFacts(actor, runtime);
  facts.edge = {
    pool: toTrimmedString(packet.poolKey),
    amount: toNumber(packet.amount, 0),
    eventKey: toTrimmedString(packet.eventKey),
    source: toTrimmedString(packet.source),
  };
  facts.selectors.push(phase === "onEdgeSpend" ? "edge.spend" : "edge.gain");
  if (facts.edge.eventKey) facts.selectors.push(`event.${facts.edge.eventKey}`);
  return facts;
}

export function buildEndOfActivationTraitFacts({ actor, packet = {}, runtime = {} } = {}) {
  const facts = baseFacts(actor, runtime);
  facts.event = {
    phase: "endOfActivation",
  };
  facts.selectors.push("endOfActivation");
  if (toNumber(packet.burnDelta, 0) !== 0) facts.selectors.push("burn.adjust");
  return facts;
}

export function evaluateTraitPhase({ actor, phase, facts = {}, packet = {}, options = {} } = {}) {
  const result = {
    packet: cloneValue(packet, null),
    modifiers: [],
    mutations: [],
    applied: [],
    skipped: [],
  };

  if (!actor || !PHASE_VALUES.has(String(phase ?? "").trim())) {
    return result;
  }

  const runtime = options.runtime ?? {};
  const usageState = getTraitUsageState(actor, runtime);
  const runtimeKeys = getRuntimeKeys(runtime);
  const traits = getItemTraits(actor);

  for (const { item, system } of traits) {
    if (itemIsSuppressed(item, system)) {
      result.skipped.push({
        traitItemId: item.id,
        traitEffectId: "",
        label: item.name,
        reason: "Trait is inactive",
      });
      continue;
    }

    const unmetPrereqs = system.prerequisites
      .filter(entry => toTrimmedString(entry?.fact))
      .filter(entry => !evaluateComparatorEntry(entry, facts));
    if (unmetPrereqs.length) {
      result.skipped.push({
        traitItemId: item.id,
        traitEffectId: "",
        label: item.name,
        reason: `Prerequisites not met: ${describeConditionList(unmetPrereqs)}`,
      });
      continue;
    }

    for (const effect of system.effects.filter(entry => entry.phase === phase)) {
      if (!applicationMatches(effect, options.application)) {
        continue;
      }

      if (!selectorMatches(effect.selector, facts)) {
        result.skipped.push({
          traitItemId: item.id,
          traitEffectId: effect.id,
          label: effect.label || item.name,
          reason: `Selector did not match (${effect.selector || "any"})`,
        });
        continue;
      }

      if (traitEffectUsesSkillSelector(effect) && effect.skillKeys.length) {
        const skillKey = toTrimmedString(facts?.skill?.key);
        if (!skillKey || !effect.skillKeys.includes(skillKey)) {
          result.skipped.push({
            traitItemId: item.id,
            traitEffectId: effect.id,
            label: effect.label || item.name,
            reason: `Skill did not match (${effect.skillKeys.join(", ")})`,
          });
          continue;
        }
      }

      const unmetConditions = effect.conditions
        .filter(entry => toTrimmedString(entry?.fact))
        .filter(entry => !evaluateComparatorEntry(entry, facts));
      if (unmetConditions.length) {
        result.skipped.push({
          traitItemId: item.id,
          traitEffectId: effect.id,
          label: effect.label || item.name,
          reason: `Conditions not met: ${describeConditionList(unmetConditions)}`,
        });
        continue;
      }

      const limits = mergeUsageLimits(system.limits, effect.limit);
      const usageKey = effectUsageKey(item, effect);
      const usageFailures = canApplyEffectForLimits(usageState, runtimeKeys, limits, usageKey);
      if (usageFailures.length) {
        result.skipped.push({
          traitItemId: item.id,
          traitEffectId: effect.id,
          label: effect.label || item.name,
          reason: usageFailures.join(", "),
        });
        continue;
      }

      const delta = applyTraitEffect({
        item,
        effect,
        phase,
        packet: result.packet,
        result,
      });

      result.applied.push({
        traitItemId: item.id,
        traitEffectId: effect.id,
        label: effect.label || item.name,
        value: delta,
        phase,
        source: item.name,
      });

      if (options.consumeUsage) {
        result.mutations.push(...buildUsageMutations(item, effect, limits));
      }
    }
  }

  return result;
}

export function buildOptionalTraitManualModifiers({ actor, rollActor = null, resolved = {}, payload = {} } = {}) {
  return uniqueActors(rollActor, actor).flatMap(sourceActor => {
    const runtime = {
      snapshot: game.mwd?.personalCombat?.getSnapshot?.(sourceActor) ?? null,
    };
    const result = evaluateTraitPhase({
      actor: sourceActor,
      phase: "onBuildRoll",
      facts: buildRollTraitFacts({ actor: sourceActor, resolved, payload, runtime }),
      packet: {},
      options: { runtime, consumeUsage: false, application: "optional" },
    });
    return result.modifiers.map(modifier => ({
      id: modifier.id,
      label: modifier.label,
      value: Number(modifier.value ?? 0),
      enabled: modifier.defaultEnabled === true,
      source: "Trait",
      traitItemId: modifier.traitItemId,
      traitEffectId: modifier.traitEffectId,
      optional: true,
    }));
  });
}

function uniqueActors(...actors) {
  const seen = new Set();
  return actors.filter(actor => {
    if (!actor) return false;
    const key = actor.uuid ?? actor.id ?? actor;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function applyTraitMutations({ actor, mutations = [], runtime = {} } = {}) {
  if (!actor || !Array.isArray(mutations) || !mutations.length) return;

  const usageMutations = mutations.filter(mutation => mutation?.kind === "usage");
  if (!usageMutations.length) return;

  const sceneUsage = cloneValue(actor.flags?.[SYSTEM_NAME]?.traitUsage?.scene ?? {}, null);
  const nextState = runtime.state ? cloneValue(runtime.state, null) : null;
  const runtimeKeys = getRuntimeKeys(runtime);

  for (const mutation of usageMutations) {
    const key = toTrimmedString(mutation.key);
    const delta = Math.max(0, Math.trunc(toNumber(mutation.delta, 0)));
    if (!key || !delta) continue;

    switch (mutation.scope) {
      case "perActivation": {
        if (!nextState) break;
        nextState.traitUsage ??= {};
        nextState.traitUsage.activation ??= {};
        nextState.traitUsage.activation[key] = Math.max(0, toNumber(nextState.traitUsage.activation[key], 0) + delta);
        break;
      }
      case "perRound": {
        if (!nextState || !runtimeKeys.roundKey) break;
        nextState.traitUsage ??= {};
        nextState.traitUsage.round ??= {};
        nextState.traitUsage.round[runtimeKeys.roundKey] ??= {};
        nextState.traitUsage.round[runtimeKeys.roundKey][key] = Math.max(
          0,
          toNumber(nextState.traitUsage.round[runtimeKeys.roundKey][key], 0) + delta
        );
        break;
      }
      case "perScene": {
        if (!runtimeKeys.sceneKey) break;
        sceneUsage[runtimeKeys.sceneKey] ??= {};
        sceneUsage[runtimeKeys.sceneKey][key] = Math.max(0, toNumber(sceneUsage[runtimeKeys.sceneKey][key], 0) + delta);
        break;
      }
      default:
        break;
    }
  }

  if (nextState && runtime.combatant?.id) {
    await runtime.combatant.setFlag(SYSTEM_NAME, "personalCombat", nextState);
  }

  await actor.setFlag(SYSTEM_NAME, "traitUsage", { scene: sceneUsage });
}

export function buildTraitAppliedSummary(entries = []) {
  return (Array.isArray(entries) ? entries : []).map(entry => ({
    label: entry?.label ?? "Trait",
    value: stringifyTypedValue(entry?.value ?? 0),
    source: entry?.source ?? "",
  }));
}
