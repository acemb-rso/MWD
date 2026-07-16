// src/modules/mwd/rules.js
// Purpose: Shared declarative contribution evaluator for rule-carrying items.
// How it fits: Qualities, traits, and asset modules can share selector,
// prerequisite, output, and usage-limit plumbing while domain engines remain
// the only writers for rolls, heat, harm, action economy, and targeting state.

import { SYSTEM_NAME } from "../core/constants.js";
import { toInteger, toNumber, toTrimmedString } from "../utils/coercion.js";
import { cloneValue } from "../utils/clone.js";
import { createRandomId } from "../utils/id.js";
import {
  compareTypedValues,
  parseTypedValue,
  stringifyTypedValue,
} from "./typed-rule-values.js";

export const RULE_MODES = Object.freeze(["automatic", "optional", "action", "triggered", "narrative"]);
export const RULE_OUTPUT_TYPES = Object.freeze([
  "dicePart",
  "dnPart",
  "cqPart",
  "damageAdjustment",
  "heatAdjustment",
  "targetingConstraint",
  "targetingDataModifier",
  "actionAvailability",
  "actionCostAdjustment",
  "derivedStatus",
  "resourceSpendPreview",
  "activationBudgetAdjustment",
  "burnRuleAdjustment",
  "conditionPenaltyAdjustment",
  "edgeEventHook",
  "creationBudgetAdjustment",
  "personalSpeedAdjustment",
  "initiativeAdjustment",
  "aimBonusAdjustment",
  "actionEffectAdjustment",
  "queuedDomainRequest",
  "summary",
]);
export const RULE_COMPARATORS = Object.freeze([
  "eq",
  "neq",
  "gt",
  "gte",
  "lt",
  "lte",
  "includes",
  "notIncludes",
  "truthy",
  "falsy",
]);

const LIMIT_SCOPES = Object.freeze(["perActivation", "perRound", "perScene"]);

function getProperty(source, path = "") {
  const normalized = toTrimmedString(path);
  if (!source || !normalized) return undefined;
  if (typeof globalThis.foundry?.utils?.getProperty === "function") {
    return globalThis.foundry.utils.getProperty(source, normalized);
  }
  return normalized.split(".").reduce((current, segment) => current?.[segment], source);
}

function asObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function normalizeStringArray(values = []) {
  const raw = Array.isArray(values)
    ? values
    : typeof values === "string"
      ? values.split(",")
      : values instanceof Set
        ? Array.from(values)
        : [];

  return raw.map(entry => String(entry ?? "").trim()).filter(Boolean);
}

function normalizeMode(value = "") {
  const normalized = toTrimmedString(value, "automatic");
  return RULE_MODES.includes(normalized) ? normalized : "automatic";
}

function normalizeComparatorEntry(entry = {}) {
  const source = asObject(entry);
  const comparator = RULE_COMPARATORS.find(option => source[option] !== undefined && source[option] !== null);
  const op = comparator
    ?? (RULE_COMPARATORS.includes(String(source.op ?? "").trim()) ? String(source.op).trim() : "")
    ?? (RULE_COMPARATORS.includes(String(source.comparator ?? "").trim()) ? String(source.comparator).trim() : "");
  const resolvedOp = op || "eq";

  const normalized = {
    id: toTrimmedString(source.id, createRandomId()),
    fact: toTrimmedString(source.fact),
    op: resolvedOp,
  };
  if (resolvedOp !== "truthy" && resolvedOp !== "falsy") {
    normalized.value = parseTypedValue(source[resolvedOp] ?? source.value ?? "");
  }
  return normalized;
}

export function normalizeRulePrerequisites(entries = []) {
  return (Array.isArray(entries) ? entries : []).map(normalizeComparatorEntry);
}

function normalizeLimit(value) {
  if (value === undefined || value === null || value === "") return null;
  return Math.max(0, toInteger(value, 0));
}

export function normalizeRuleLimits(limits = {}) {
  const source = asObject(limits);
  return LIMIT_SCOPES.reduce((out, scope) => {
    if (Object.prototype.hasOwnProperty.call(source, scope)) {
      out[scope] = normalizeLimit(source[scope]);
    }
    return out;
  }, {});
}

function normalizeRuleUsage(usage = null) {
  if (!usage || typeof usage !== "object" || Array.isArray(usage)) return null;
  const source = usage;
  const out = {};
  if (source.charges !== undefined && source.charges !== null && source.charges !== "") {
    out.charges = Math.max(0, toInteger(source.charges, 0));
  }
  if (source.cooldownTurns !== undefined && source.cooldownTurns !== null && source.cooldownTurns !== "") {
    out.cooldownTurns = Math.max(0, toInteger(source.cooldownTurns, 0));
  }
  if (source.consume !== undefined) out.consume = Boolean(source.consume);
  return Object.keys(out).length ? out : null;
}

function normalizeRuleSelector(selector = {}) {
  if (typeof selector === "string") return toTrimmedString(selector);
  const source = asObject(selector);
  return {
    actorTypes: normalizeStringArray(source.actorTypes),
    tags: normalizeStringArray(source.tags),
    forbidsTags: normalizeStringArray(source.forbidsTags),
    weaponTags: normalizeStringArray(source.weaponTags),
    forbidsWeaponTags: normalizeStringArray(source.forbidsWeaponTags),
    statuses: normalizeStringArray(source.statuses),
    forbidsStatuses: normalizeStringArray(source.forbidsStatuses),
    actionIds: normalizeStringArray(source.actionIds ?? source.actions ?? source.action),
    skillIds: normalizeStringArray(source.skillIds ?? source.skills ?? source.skill),
    modes: normalizeStringArray(source.modes ?? source.mode),
    detectionState: toTrimmedString(source.detectionState),
    targetState: toTrimmedString(source.targetState),
    heatBand: toTrimmedString(source.heatBand),
  };
}

function commonOutput(source = {}, rule = {}, index = 0) {
  return {
    id: toTrimmedString(source.id, `${rule.id}.output-${index + 1}`),
    label: toTrimmedString(source.label, rule.label),
    phase: toTrimmedString(source.phase, rule.phase),
    tags: normalizeStringArray(source.tags),
    exclusiveGroup: toTrimmedString(source.exclusiveGroup ?? rule.exclusiveGroup),
    priority: toNumber(source.priority ?? rule.priority, 0),
  };
}

function normalizeRulePresentation(source = {}) {
  const presentation = asObject(source.presentation);
  if (!Object.keys(presentation).length) return null;
  return {
    label: toTrimmedString(presentation.label),
    defaultEnabled: Boolean(presentation.defaultEnabled),
    showOnSheet: presentation.showOnSheet !== false,
    showInRollDialog: presentation.showInRollDialog !== false,
  };
}

export function normalizeRuleOutput(output = {}, rule = {}, index = 0) {
  const source = asObject(output);
  const type = toTrimmedString(source.type);
  const normalizedType = RULE_OUTPUT_TYPES.includes(type) ? type : "summary";
  const base = commonOutput(source, rule, index);

  switch (normalizedType) {
    case "dicePart":
    case "dnPart":
      return { ...base, type: normalizedType, value: toNumber(source.value, 0) };
    case "cqPart":
      return { ...base, type: normalizedType, ar: toNumber(source.ar, 0), dr: toNumber(source.dr, 0) };
    case "damageAdjustment":
      return {
        ...base,
        type: normalizedType,
        value: toNumber(source.value, 0),
        damageType: toTrimmedString(source.damageType),
        appliesTo: normalizeStringArray(source.appliesTo),
        track: toTrimmedString(source.track),
      };
    case "heatAdjustment":
      return {
        ...base,
        type: normalizedType,
        value: toNumber(source.value, 0),
        timing: toTrimmedString(source.timing),
      };
    case "targetingConstraint":
      return {
        ...base,
        type: normalizedType,
        constraint: toTrimmedString(source.constraint),
        value: source.value,
      };
    case "targetingDataModifier":
      return {
        ...base,
        type: normalizedType,
        value: toNumber(source.value, 0),
        packetMode: toTrimmedString(source.packetMode, "best"),
      };
    case "actionAvailability":
      return {
        ...base,
        type: normalizedType,
        actionId: toTrimmedString(source.actionId),
        enabled: parseTypedValue(source.enabled ?? source.available ?? true) !== false,
        reason: toTrimmedString(source.reason),
      };
    case "actionCostAdjustment":
      return {
        ...base,
        type: normalizedType,
        actionId: toTrimmedString(source.actionId),
        resource: toTrimmedString(source.resource),
        value: toNumber(source.value, 0),
        timing: toTrimmedString(source.timing),
      };
    case "derivedStatus":
      return {
        ...base,
        type: normalizedType,
        key: toTrimmedString(source.key ?? source.status),
        value: source.value === undefined ? true : source.value,
      };
    case "activationBudgetAdjustment":
      return {
        ...base,
        type: normalizedType,
        resource: toTrimmedString(source.resource),
        value: toNumber(source.value, 0),
      };
    case "burnRuleAdjustment":
      return {
        ...base,
        type: normalizedType,
        trigger: toTrimmedString(source.trigger),
        value: toNumber(source.value, 0),
        min: source.min === undefined ? null : toNumber(source.min, 0),
        max: source.max === undefined ? null : toNumber(source.max, 0),
      };
    case "conditionPenaltyAdjustment":
      return {
        ...base,
        type: normalizedType,
        track: toTrimmedString(source.track),
        value: toNumber(source.value, 0),
        minPenalty: source.minPenalty === undefined ? null : toNumber(source.minPenalty, 0),
        maxPenalty: source.maxPenalty === undefined ? null : toNumber(source.maxPenalty, 0),
      };
    case "edgeEventHook":
      return {
        ...base,
        type: normalizedType,
        trigger: toTrimmedString(source.trigger),
        effect: cloneValue(source.effect ?? {}, {}),
      };
    case "creationBudgetAdjustment":
      return {
        ...base,
        type: normalizedType,
        budget: toTrimmedString(source.budget),
        value: toNumber(source.value, 0),
      };
    case "personalSpeedAdjustment":
      return {
        ...base,
        type: normalizedType,
        value: toNumber(source.value, 0),
        unit: toTrimmedString(source.unit, "meters"),
      };
    case "initiativeAdjustment":
      return {
        ...base,
        type: normalizedType,
        value: toNumber(source.value, 0),
        appliesTo: toTrimmedString(source.appliesTo, "total"),
      };
    case "aimBonusAdjustment":
      return {
        ...base,
        type: normalizedType,
        value: toNumber(source.value, 0),
        appliesTo: toTrimmedString(source.appliesTo),
      };
    case "actionEffectAdjustment":
      return {
        ...base,
        type: normalizedType,
        actionId: toTrimmedString(source.actionId),
        key: toTrimmedString(source.key),
        value: source.value,
      };
    case "resourceSpendPreview":
      return {
        ...base,
        type: normalizedType,
        resource: toTrimmedString(source.resource),
        value: toNumber(source.value, 0),
      };
    case "queuedDomainRequest":
      return {
        ...base,
        type: normalizedType,
        domain: toTrimmedString(source.domain),
        request: cloneValue(source.request ?? {}, {}),
      };
    case "summary":
    default:
      return {
        ...base,
        type: "summary",
        text: toTrimmedString(source.text ?? rule.summary),
      };
  }
}

export function normalizeRulePacket(rule = {}, index = 0) {
  const source = asObject(rule);
  const normalized = {
    ...source,
    id: toTrimmedString(source.id, `rule-${index + 1}`),
    label: toTrimmedString(source.label, source.id ? String(source.id) : `Rule ${index + 1}`),
    sourceType: toTrimmedString(source.sourceType),
    enabled: parseTypedValue(source.enabled ?? true) !== false,
    phase: toTrimmedString(source.phase, "passive"),
    mode: normalizeMode(source.mode),
    selector: normalizeRuleSelector(source.selector),
    trigger: cloneValue(source.trigger ?? {}, {}),
    requires: normalizeRulePrerequisites(source.requires ?? source.prerequisites),
    conditions: normalizeRulePrerequisites(source.conditions),
    outputs: [],
    limits: normalizeRuleLimits(source.limits),
    usage: normalizeRuleUsage(source.usage),
    stackingKey: toTrimmedString(source.stackingKey),
    exclusiveGroup: toTrimmedString(source.exclusiveGroup),
    priority: toNumber(source.priority, 0),
    summary: toTrimmedString(source.summary),
  };
  normalized.presentation = normalizeRulePresentation(source);
  normalized.outputs = (Array.isArray(source.outputs) ? source.outputs : [])
    .map((output, outputIndex) => normalizeRuleOutput(output, normalized, outputIndex));
  return normalized;
}

export function normalizeCarrier(itemOrSystem = {}, _config = {}) {
  const system = itemOrSystem?.system ?? itemOrSystem ?? {};
  const source = asObject(system);
  return {
    ...source,
    rules: (Array.isArray(source.rules) ? source.rules : [])
      .map((rule, index) => normalizeRulePacket(rule, index))
      .filter(rule => rule.id && rule.phase),
  };
}

function toSet(values = []) {
  return new Set(normalizeStringArray(values));
}

function factArray(facts = {}, key = "") {
  const direct = facts?.[key];
  if (direct instanceof Set) return Array.from(direct);
  if (Array.isArray(direct)) return direct;
  return [];
}

function factScalar(facts = {}, ...paths) {
  for (const path of paths) {
    const value = getProperty(facts, path);
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return "";
}

function containsAll(sourceValues, requiredValues) {
  const source = toSet(sourceValues);
  return requiredValues.every(value => source.has(value));
}

function containsAny(sourceValues, deniedValues) {
  const source = toSet(sourceValues);
  return deniedValues.some(value => source.has(value));
}

function selectorMatches(selector = {}, facts = {}) {
  if (typeof selector === "string") {
    const normalized = toTrimmedString(selector);
    if (!normalized) return true;
    const selectors = factArray(facts, "selectors");
    return selectors.some(candidate => candidate === normalized || String(candidate ?? "").startsWith(`${normalized}.`));
  }

  const actorType = toTrimmedString(factScalar(facts, "actorType", "actor.type"));
  if (selector.actorTypes?.length && !selector.actorTypes.includes(actorType)) return false;
  if (selector.tags?.length && !containsAll(factArray(facts, "tags"), selector.tags)) return false;
  if (selector.forbidsTags?.length && containsAny(factArray(facts, "tags"), selector.forbidsTags)) return false;
  if (selector.weaponTags?.length && !containsAll(factArray(facts, "weaponTags"), selector.weaponTags)) return false;
  if (selector.forbidsWeaponTags?.length && containsAny(factArray(facts, "weaponTags"), selector.forbidsWeaponTags)) return false;
  if (selector.statuses?.length && !containsAll(factArray(facts, "statuses"), selector.statuses)) return false;
  if (selector.forbidsStatuses?.length && containsAny(factArray(facts, "statuses"), selector.forbidsStatuses)) return false;

  const actionId = toTrimmedString(factScalar(facts, "action.id", "actionId"));
  if (selector.actionIds?.length && !selector.actionIds.includes(actionId)) return false;
  const skillId = toTrimmedString(factScalar(facts, "skill.key", "skillId"));
  if (selector.skillIds?.length && !selector.skillIds.includes(skillId)) return false;
  const mode = toTrimmedString(factScalar(facts, "module.selectedMode", "module.activation.selectedMode"));
  if (selector.modes?.length && !selector.modes.includes(mode)) return false;
  if (selector.detectionState && selector.detectionState !== toTrimmedString(factScalar(facts, "detectionState"))) return false;
  if (selector.targetState && selector.targetState !== toTrimmedString(factScalar(facts, "targetState"))) return false;
  if (selector.heatBand && selector.heatBand !== toTrimmedString(factScalar(facts, "heatBand"))) return false;
  return true;
}

function evaluateComparatorEntry(entry, facts) {
  if (!toTrimmedString(entry?.fact)) return true;
  const actual = getProperty(facts, entry.fact);
  return compareTypedValues(actual, entry.value, entry.op ?? entry.comparator);
}

function describeConditionList(entries = []) {
  return entries.map(entry => entry.fact).filter(Boolean).join(", ");
}

function getRuntimeKeys(runtime = {}) {
  const combatId = toTrimmedString(runtime.combatId ?? runtime.combat?.id);
  const round = Math.max(0, toInteger(runtime.round ?? runtime.combat?.round, 0));
  const sceneId = toTrimmedString(runtime.sceneId ?? runtime.scene?.id ?? globalThis.canvas?.scene?.id);
  const activationId = toTrimmedString(runtime.activationId ?? runtime.activationKey);
  return {
    activationKey: activationId,
    roundKey: combatId ? `${combatId}:${round}` : "",
    sceneKey: sceneId,
  };
}

function readUsageState(actor = null, runtime = {}) {
  const flags = actor?.flags?.[SYSTEM_NAME] ?? {};
  const runtimeState = runtime.ruleUsage ?? {};
  return {
    activation: runtimeState.activation ?? {},
    round: runtimeState.round ?? {},
    scene: flags.ruleUsage?.scene ?? {},
  };
}

function usageCountForScope(usageState, runtimeKeys, scope, key) {
  switch (scope) {
    case "perActivation": return Math.max(0, toInteger(usageState.activation?.[key], 0));
    case "perRound": return Math.max(0, toInteger(usageState.round?.[runtimeKeys.roundKey]?.[key], 0));
    case "perScene": return Math.max(0, toInteger(usageState.scene?.[runtimeKeys.sceneKey]?.[key], 0));
    default: return 0;
  }
}

function usageKeyFor(entry = {}) {
  return `${entry.sourceId}:${entry.ruleId}`;
}

function limitFailures(usageState, runtimeKeys, limits = {}, key = "") {
  const failures = [];
  for (const scope of LIMIT_SCOPES) {
    if (!Object.prototype.hasOwnProperty.call(limits, scope)) continue;
    const limit = limits[scope];
    if (limit === null || limit === undefined) continue;
    if (limit === 0) {
      failures.push(`${scope} unavailable`);
      continue;
    }
    const used = usageCountForScope(usageState, runtimeKeys, scope, key);
    if (used >= limit) failures.push(`${scope} limit reached`);
  }
  return failures;
}

function buildUsageMutations(entry = {}) {
  const key = usageKeyFor(entry);
  const out = [];
  for (const scope of LIMIT_SCOPES) {
    const limit = entry.rule?.limits?.[scope];
    if (limit === null || limit === undefined || limit <= 0) continue;
    out.push({
      kind: "ruleUsage",
      scope,
      key,
      delta: 1,
      sourceId: entry.sourceId,
      ruleId: entry.ruleId,
    });
  }
  return out;
}

function outputWithSource(output = {}, entry = {}) {
  return {
    ...output,
    sourceId: entry.sourceId,
    sourceName: entry.sourceName,
    sourceUuid: entry.sourceUuid,
    ruleId: entry.ruleId,
    ruleLabel: entry.label,
  };
}

function getCarrierItem(entry = {}) {
  return entry?.item ?? entry;
}

function getCarrierRules(entry = {}) {
  if (Array.isArray(entry?.rules)) return entry.rules.map((rule, index) => normalizeRulePacket(rule, index));
  return normalizeCarrier(entry?.system ?? entry?.item?.system ?? entry).rules;
}

export function evaluatePhase({
  actor = null,
  carrierItems = [],
  phase = "",
  facts = {},
  runtime = {},
  packet = {},
  mode = "",
} = {}) {
  const phaseKey = toTrimmedString(phase);
  const usageState = readUsageState(actor, runtime);
  const runtimeKeys = getRuntimeKeys(runtime);
  const desiredMode = toTrimmedString(mode);
  const result = {
    packet: cloneValue(packet, {}),
    entries: [],
    outputs: [],
    disabled: [],
    summaries: [],
    pendingUsageMutations: [],
    mutations: [],
    applied: [],
    skipped: [],
  };
  if (!phaseKey) return result;

  for (const carrier of Array.isArray(carrierItems) ? carrierItems : []) {
    const item = getCarrierItem(carrier);
    const rules = getCarrierRules(carrier);
    for (const rule of rules.filter(entry => entry.phase === phaseKey)) {
      if (desiredMode && desiredMode !== "all" && rule.mode !== desiredMode) continue;
      const sourceId = toTrimmedString(item?.id ?? carrier?.id);
      const sourceName = toTrimmedString(item?.name ?? carrier?.name, "Rule Source");
      const sourceUuid = toTrimmedString(item?.uuid ?? carrier?.uuid);
      const baseEntry = {
        id: `${sourceId || "source"}.${rule.id}`,
        sourceId,
        sourceName,
        sourceUuid,
        ruleId: rule.id,
        label: rule.label || sourceName,
        phase: rule.phase,
        mode: rule.mode,
        rule,
      };

      if (!rule.enabled) {
        const disabled = { ...baseEntry, reason: "Rule is disabled." };
        result.disabled.push(disabled);
        result.skipped.push(disabled);
        continue;
      }

      if (!selectorMatches(rule.selector, facts)) {
        const disabled = { ...baseEntry, reason: "Selector did not match." };
        result.disabled.push(disabled);
        result.skipped.push(disabled);
        continue;
      }

      const unmetRequires = rule.requires.filter(entry => toTrimmedString(entry?.fact)).filter(entry => !evaluateComparatorEntry(entry, facts));
      if (unmetRequires.length) {
        const disabled = { ...baseEntry, reason: `Prerequisites not met: ${describeConditionList(unmetRequires)}` };
        result.disabled.push(disabled);
        result.skipped.push(disabled);
        continue;
      }

      const unmetConditions = rule.conditions.filter(entry => toTrimmedString(entry?.fact)).filter(entry => !evaluateComparatorEntry(entry, facts));
      if (unmetConditions.length) {
        const disabled = { ...baseEntry, reason: `Conditions not met: ${describeConditionList(unmetConditions)}` };
        result.disabled.push(disabled);
        result.skipped.push(disabled);
        continue;
      }

      const failures = limitFailures(usageState, runtimeKeys, rule.limits, usageKeyFor(baseEntry));
      if (failures.length) {
        const disabled = { ...baseEntry, reason: failures.join(", ") };
        result.disabled.push(disabled);
        result.skipped.push(disabled);
        continue;
      }

      const outputs = rule.outputs.map(output => outputWithSource(output, baseEntry));
      const entry = {
        ...baseEntry,
        outputs,
        summary: rule.summary,
        usage: rule.usage,
      };
      entry.usageMutations = buildUsageMutations(entry);
      result.entries.push(entry);
      result.outputs.push(...outputs);
      if (entry.summary) result.summaries.push({ label: entry.label, text: entry.summary, source: entry.sourceName });
      result.pendingUsageMutations.push(...entry.usageMutations);
      result.applied.push({
        label: entry.label,
        value: outputs.map(output => stringifyTypedValue(output.value ?? output.ar ?? output.dr ?? output.key ?? output.text)).filter(Boolean).join(", "),
        source: entry.sourceName,
        phase: entry.phase,
      });
    }
  }
  result.mutations = result.pendingUsageMutations;
  return result;
}

export function prepareUsageCommit({ entries = [] } = {}) {
  const mutations = [];
  for (const entry of Array.isArray(entries) ? entries : []) {
    if (Array.isArray(entry?.usageMutations)) mutations.push(...entry.usageMutations);
  }
  return { usageMutations: mutations };
}

export async function commitUsage({ actor = null, usageMutations = [], runtime = {} } = {}) {
  if (!actor?.setFlag || !Array.isArray(usageMutations) || !usageMutations.length) return false;

  const current = cloneValue(actor.flags?.[SYSTEM_NAME]?.ruleUsage ?? {}, {});
  const nextRuntimeUsage = cloneValue(runtime.ruleUsage ?? {}, {});
  const runtimeKeys = getRuntimeKeys(runtime);
  let changed = false;

  for (const mutation of usageMutations) {
    if (mutation?.kind !== "ruleUsage") continue;
    const key = toTrimmedString(mutation.key);
    const delta = Math.max(0, toInteger(mutation.delta, 0));
    if (!key || !delta) continue;
    changed = true;
    switch (mutation.scope) {
      case "perActivation":
        nextRuntimeUsage.activation ??= {};
        nextRuntimeUsage.activation[key] = Math.max(0, toNumber(nextRuntimeUsage.activation[key], 0) + delta);
        break;
      case "perRound":
        if (!runtimeKeys.roundKey) break;
        nextRuntimeUsage.round ??= {};
        nextRuntimeUsage.round[runtimeKeys.roundKey] ??= {};
        nextRuntimeUsage.round[runtimeKeys.roundKey][key] = Math.max(0, toNumber(nextRuntimeUsage.round[runtimeKeys.roundKey][key], 0) + delta);
        break;
      case "perScene":
        if (!runtimeKeys.sceneKey) break;
        current.scene ??= {};
        current.scene[runtimeKeys.sceneKey] ??= {};
        current.scene[runtimeKeys.sceneKey][key] = Math.max(0, toNumber(current.scene[runtimeKeys.sceneKey][key], 0) + delta);
        break;
      default:
        break;
    }
  }

  if (!changed) return false;
  if (runtime.state && runtime.combatant?.setFlag) {
    const nextState = cloneValue(runtime.state, {});
    nextState.ruleUsage = nextRuntimeUsage;
    await runtime.combatant.setFlag(SYSTEM_NAME, "personalCombat", nextState);
  }
  await actor.setFlag(SYSTEM_NAME, "ruleUsage", current);
  return true;
}

export function buildAppliedSummary(entries = []) {
  return (Array.isArray(entries) ? entries : []).map(entry => ({
    label: entry?.label ?? "Rule",
    value: stringifyTypedValue(entry?.value ?? entry?.summary ?? ""),
    source: entry?.source ?? entry?.sourceName ?? "",
  }));
}
