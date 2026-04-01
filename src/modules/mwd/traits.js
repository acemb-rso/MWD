// src/modules/mwd/traits.js
// Purpose: Shared quality/trait schema normalization and generic trait rule evaluation.
// How it fits: Keeps quality items declarative while letting engine phases consume generic rule packets.

import { SYSTEM_NAME } from "../constants.js";

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
  { value: "edgeEvent", label: "Edge Event" },
]);

export const TRAIT_PHASES = Object.freeze([
  { value: "onBuildRoll", label: "Build Roll" },
  { value: "onBeforeBurnApplied", label: "Before Burn Applied" },
  { value: "onBeforeActionCostFinalized", label: "Before Action Cost Finalized" },
  { value: "onInitiativeResolved", label: "Initiative Resolved" },
  { value: "onDamageResolved", label: "Damage Resolved" },
  { value: "onEndOfActivation", label: "End of Activation" },
  { value: "onEdgeSpend", label: "Edge Spend" },
  { value: "onEdgeGain", label: "Edge Gain" },
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

function toTrimmedString(value, fallback = "") {
  const normalized = String(value ?? "").trim();
  return normalized || fallback;
}

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function clone(value) {
  return foundry.utils.deepClone(value);
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

function parseTypedValue(value) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if ((trimmed.startsWith("[") && trimmed.endsWith("]")) || (trimmed.startsWith("{") && trimmed.endsWith("}"))) {
    try {
      return JSON.parse(trimmed);
    } catch (_error) {
      return trimmed;
    }
  }
  return trimmed;
}

function stringifyTypedValue(value) {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    return JSON.stringify(value);
  } catch (_error) {
    return String(value);
  }
}

function normalizeLimitValue(value) {
  const numeric = Math.max(0, Math.trunc(toNumber(value, 0)));
  return numeric > 0 ? numeric : 0;
}

export function normalizeTraitLimits(limits = {}) {
  const source = limits && typeof limits === "object" ? limits : {};
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
  const source = Array.isArray(entries) ? entries : [];
  return source.map(normalizeComparatorEntry);
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
  const source = system && typeof system === "object" ? clone(system) : {};
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

export function getTraitEditorConfig() {
  return {
    categories: [...QUALITY_CATEGORIES],
    tiers: [...QUALITY_TIERS],
    activations: [...QUALITY_ACTIVATIONS],
    effectTypes: [...TRAIT_EFFECT_TYPES],
    phases: [...TRAIT_PHASES],
    comparators: [...TRAIT_COMPARATORS],
    edgeOperations: [...TRAIT_EDGE_OPERATIONS],
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
    case "edgeEvent": return "onEdgeGain";
    default: return "onBuildRoll";
  }
}

function getItemTraits(actor) {
  return Array.from(actor?.items ?? [])
    .filter(item => (item?.canonicalType ?? item?.type) === "quality")
    .map(item => ({
      item,
      system: normalizeQualityTraitSystem(item.system ?? {}),
    }));
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
  const sceneId = toTrimmedString(runtime.sceneId ?? canvas?.scene?.id);
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

function compareValues(actual, comparator, expected) {
  switch (comparator) {
    case "truthy": return !!actual;
    case "falsy": return !actual;
    case "neq": return actual !== expected;
    case "gt": return Number(actual) > Number(expected);
    case "gte": return Number(actual) >= Number(expected);
    case "lt": return Number(actual) < Number(expected);
    case "lte": return Number(actual) <= Number(expected);
    case "includes":
      return Array.isArray(actual)
        ? actual.includes(expected)
        : String(actual ?? "").includes(String(expected ?? ""));
    case "notIncludes":
      return Array.isArray(actual)
        ? !actual.includes(expected)
        : !String(actual ?? "").includes(String(expected ?? ""));
    case "eq":
    default:
      return actual === expected;
  }
}

function evaluateComparatorEntry(entry, facts) {
  if (!toTrimmedString(entry?.fact)) return true;
  const actual = foundry.utils.getProperty(facts, entry.fact);
  return compareValues(actual, entry.comparator, entry.value);
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
  return {
    activation: {
      moved: actionIds.includes("move"),
      saSpent: Math.max(0, Math.trunc(toNumber(state?.saSpentThisActivation, 0))),
      attacksThisActivation: Math.max(0, Math.trunc(toNumber(state?.attacksThisActivation, 0))),
      burnThisActivation: Math.max(0, Math.trunc(toNumber(state?.burnThisActivation, 0))),
    },
    burn: {
      current: Math.max(0, Math.trunc(toNumber(actor?.system?.burn?.value, 0))),
      overloaded: Boolean(actor?.system?.burn?.overloaded),
    },
    timing: {
      firstAttackThisActivation: Math.max(0, Math.trunc(toNumber(state?.attacksThisActivation, 0))) === 0,
      firstExtraSAThisActivation: Math.max(0, Math.trunc(toNumber(state?.saSpentThisActivation, 0))) <= 3,
    },
    selectors: [],
  };
}

export function buildRollTraitFacts({ actor, resolved, payload, runtime = {} } = {}) {
  const facts = baseFacts(actor, runtime);
  const intent = toTrimmedString(resolved?.intent ?? payload?.intent, "skill");
  const domains = Array.isArray(resolved?.domains) ? resolved.domains : [];
  const rangeBand = toTrimmedString(resolved?.attack?.rangeBand ?? payload?.rangeBand);
  const prePoolKey = toTrimmedString(payload?.edge?.pre?.poolKey ?? payload?.edge?.poolKey ?? "");
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
  facts.edge = {
    stage: payload?.toggles?.useEdge ? "pre" : "",
    pool: prePoolKey,
    spent: Boolean(payload?.toggles?.useEdge),
  };
  facts.selectors.push(`intent.${intent}`);
  domains.forEach(domain => facts.selectors.push(`domain.${domain}`));
  if (rangeBand) facts.selectors.push(`range.${rangeBand}`);
  if (intent === "skill" && skillKey) facts.selectors.push(`skill.${skillKey}`);
  if (payload?.toggles?.useEdge) facts.selectors.push("edge.pre");
  return facts;
}

export function buildActionCostTraitFacts({ actor, packet = {}, runtime = {} } = {}) {
  const facts = baseFacts(actor, runtime);
  facts.action = {
    id: toTrimmedString(packet.actionId),
    resource: toTrimmedString(packet.resource),
    cost: toNumber(packet.cost, 0),
  };
  facts.selectors.push(...buildSelectorsForAction(packet.actionId));
  return facts;
}

export function buildBurnTraitFacts({ actor, packet = {}, runtime = {} } = {}) {
  const facts = baseFacts(actor, runtime);
  facts.action = {
    id: toTrimmedString(packet.actionId),
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
  return facts;
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
    packet: clone(packet),
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

export async function applyTraitMutations({ actor, mutations = [], runtime = {} } = {}) {
  if (!actor || !Array.isArray(mutations) || !mutations.length) return;

  const usageMutations = mutations.filter(mutation => mutation?.kind === "usage");
  if (!usageMutations.length) return;

  const sceneUsage = clone(actor.flags?.[SYSTEM_NAME]?.traitUsage?.scene ?? {});
  const nextState = runtime.state ? clone(runtime.state) : null;
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
