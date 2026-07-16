// src/modules/mwd/asset-module-effects.js
// Purpose: Runtime matching and summaries for data-driven AssetModule effects.
// How it fits: Gives providers and action builders one stable way to consume
// schema-first module rules without hardcoding individual upgrade names.

import { TEMPLATE } from "../core/constants.js";
import {
  AssetModuleValidationError,
  getAssetModuleState,
  normalizeAssetModuleSystem,
  validateAssetModuleEffects,
} from "./asset-module-rules.js";
import {
  evaluatePhase,
  normalizeCarrier,
  normalizeRulePacket,
} from "./rules.js";
import { getActorType, isMachineActor } from "../utils/actor-guards.js";
import { toNumber } from "../utils/coercion.js";

function toCollectionArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.contents)) return value.contents;
  if (value && typeof value[Symbol.iterator] === "function") return Array.from(value);
  return [];
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
  return raw.map(entry => String(entry ?? "").trim()).filter(Boolean);
}

function isAssetModule(item = null) {
  return (item?.canonicalType ?? item?.type) === TEMPLATE.itemType.assetModule;
}

export function getAssetModules(source = {}) {
  const explicit = source?.assetModules ?? source?.items ?? source?.actor?.items ?? [];
  return toCollectionArray(explicit).filter(isAssetModule);
}

export { getAssetModuleState };

function addSetEntries(target, values) {
  for (const value of normalizeStringArray(values)) target.add(value);
}

function setToArray(value) {
  return value instanceof Set ? Array.from(value) : normalizeStringArray(value);
}

function getActionId({ payload = {}, resolved = {} } = {}) {
  const direct = toTrimmedString(
    payload.machineActionKey
    ?? payload.actionId
    ?? resolved?.quickAction?.ewAction?.id
    ?? payload?.quickAction?.ewAction?.id,
    "",
  );
  if (direct) return direct;

  const intent = toTrimmedString(resolved?.intent ?? payload?.intent, "");
  if (intent === "acquire") return "acquireTarget";
  if (intent === "targeting") return "generateFireSolution";
  return intent;
}

function addAttackFacts(facts, { payload = {}, resolved = {} } = {}) {
  if (String(resolved?.intent ?? payload?.intent ?? "").trim() !== "attack") return;

  const weapon = resolved?.attack?.weapon ?? {};
  const category = toTrimmedString(weapon.category ?? weapon.attackKind ?? payload.attackKind, "").toLowerCase();
  const skill = toTrimmedString(resolved?.attack?.skill?.code ?? weapon.skill ?? payload.key, "").toLowerCase();
  const isMelee = category === "melee" || skill === "meleecombat" || skill === "melee";

  facts.tags.add(isMelee ? "attack.melee" : "attack.ranged");
  facts.tags.add("intent.attack");
  facts.weaponTags.add(isMelee ? "weapon.melee" : "weapon.ranged");

  const candidates = [
    weapon.weaponType,
    weapon.weaponCategory,
    weapon.category,
    weapon.damageType,
    weapon.baseDamageType,
    weapon.baseWeaponType,
    weapon.source?.type,
    weapon.sourceState?.type,
    weapon.payloadState?.payload?.type,
  ];
  for (const candidate of candidates) {
    const value = toTrimmedString(candidate, "").toLowerCase();
    if (!value) continue;
    facts.weaponTags.add(`weapon.${value}`);
    facts.tags.add(`weapon.${value}`);
  }

  for (const keyword of normalizeStringArray(weapon.keywords)) {
    facts.weaponTags.add(keyword);
    facts.tags.add(keyword);
  }

  const damageType = toTrimmedString(weapon.damageType ?? weapon.baseDamageType, "").toLowerCase();
  if (damageType) facts.tags.add(`damage.${damageType}`);
  if (Number(weapon.clusteringDice ?? 0) > 0) {
    facts.tags.add("attack.cluster");
    facts.weaponTags.add("weapon.cluster");
  }
}

export function buildAssetModuleEffectFacts({ actor = null, payload = {}, resolved = {}, context = {} } = {}) {
  const intent = toTrimmedString(resolved?.intent ?? payload?.intent, "");
  const actionId = getActionId({ payload, resolved });
  const skillId = toTrimmedString(payload?.key ?? resolved?.data?.skillKey, "");
  const tags = new Set();
  const weaponTags = new Set();
  const statuses = new Set();

  if (intent) tags.add(`intent.${intent}`);
  if (actionId) {
    tags.add(`action.${actionId}`);
    tags.add(actionId);
  }
  if (skillId) {
    tags.add(`skill.${skillId}`);
    tags.add(skillId);
  }
  addSetEntries(tags, payload?.tags);
  addSetEntries(tags, resolved?.domainTags);
  addSetEntries(tags, resolved?.domains);
  addSetEntries(tags, context?.tags);
  addSetEntries(statuses, Array.from(actor?.statuses ?? []));
  addSetEntries(statuses, context?.statuses);

  addAttackFacts({ tags, weaponTags, statuses }, { payload, resolved });

  const detectionState = toTrimmedString(
    context?.detectionState
    ?? resolved?.attack?.ewContext?.detectionState
    ?? resolved?.targeting?.detectionState
    ?? resolved?.acquire?.currentState,
    "",
  );
  const targetState = toTrimmedString(context?.targetState ?? resolved?.acquire?.currentState, "");
  const heatBand = toTrimmedString(context?.heatBand ?? payload?.heatBand, "");

  return {
    actor,
    actorType: getActorType(actor),
    intent,
    actionId,
    action: { id: actionId },
    skillId,
    skill: { key: skillId },
    tags,
    weaponTags,
    statuses,
    selectors: Array.from(tags),
    detectionState,
    targetState,
    heatBand,
    event: { trigger: toTrimmedString(context?.trigger, "") },
    trigger: toTrimmedString(context?.trigger, ""),
  };
}

function getNormalizedEffects(item) {
  validateAssetModuleEffects(item?.system ?? {}, {
    itemName: item?.name ?? "Asset Module",
    itemId: item?.id ?? "",
  });
  const normalized = normalizeAssetModuleSystem(item?.system ?? {}).effects;
  return normalized;
}

function selectorFromEffect(effect = {}) {
  const requires = effect.requires ?? {};
  return {
    tags: requires.tags ?? [],
    forbidsTags: requires.forbidsTags ?? [],
    actionIds: requires.actionIds ?? [],
    skillIds: requires.skillIds ?? [],
    weaponTags: requires.weaponTags ?? [],
    statuses: requires.statuses ?? [],
    forbidsStatuses: requires.forbidsStatuses ?? [],
    detectionState: requires.detectionState ?? "",
    targetState: requires.targetState ?? "",
    heatBand: requires.heatBand ?? "",
    modes: requires.modes ?? [],
  };
}

function timingRequirements(effect = {}) {
  if (effect.timing === "active") return [{ fact: "module.active", op: "eq", value: true }];
  if (effect.timing === "triggered") return [
    { fact: "module.ready", op: "eq", value: true },
    { fact: "event.trigger", op: "truthy" },
  ];
  return [{ fact: "module.ready", op: "eq", value: true }];
}

function outputsFromEffect(effect = {}) {
  const outputs = [];
  const modifies = effect.modifies ?? {};
  const grants = effect.grants ?? {};
  if (toNumber(modifies.dice, 0)) {
    outputs.push({ type: "dicePart", id: `${effect.id}.dice`, label: effect.label, value: toNumber(modifies.dice, 0) });
  }
  if (toNumber(modifies.ar, 0) || toNumber(modifies.dr, 0)) {
    outputs.push({ type: "cqPart", id: `${effect.id}.cq`, label: effect.label, ar: toNumber(modifies.ar, 0), dr: toNumber(modifies.dr, 0) });
  }
  if (toNumber(modifies.trackingPenalty, 0)) {
    outputs.push({ type: "targetingConstraint", id: `${effect.id}.trackingPenalty`, label: effect.label, constraint: "trackingPenalty", value: toNumber(modifies.trackingPenalty, 0) });
  }
  if (toNumber(modifies.targetingData, 0)) {
    outputs.push({ type: "targetingDataModifier", id: `${effect.id}.targetingData`, label: effect.label, value: toNumber(modifies.targetingData, 0) });
  }
  for (const status of modifies.bypassStatuses ?? []) {
    outputs.push({
      type: "targetingConstraint",
      id: `${effect.id}.bypass.${status}`,
      label: effect.label,
      constraint: "bypassStatus",
      value: status,
    });
  }
  if (toNumber(modifies.movementMeters, 0)) {
    outputs.push({ type: "queuedDomainRequest", id: `${effect.id}.movement`, label: effect.label, domain: "movement", request: { movementMeters: toNumber(modifies.movementMeters, 0) } });
  }
  if (toNumber(modifies.clusteringDice, 0) || toNumber(modifies.clusteringTarget, 0)) {
    outputs.push({
      type: "queuedDomainRequest",
      id: `${effect.id}.clustering`,
      label: effect.label,
      domain: "clustering",
      request: {
        diceModifier: toNumber(modifies.clusteringDice, 0),
        targetNumberModifier: toNumber(modifies.clusteringTarget, 0),
      },
    });
  }
  for (const status of grants.statuses ?? []) {
    outputs.push({ type: "derivedStatus", id: `${effect.id}.status.${status}`, label: effect.label, key: status, value: true });
  }
  for (const override of grants.actionOverrides ?? []) {
    for (const actionId of normalizeStringArray(override.actionIds ?? override.actions ?? override.actionId)) {
      outputs.push({
        type: "actionAvailability",
        id: `${effect.id}.action.${actionId}`,
        label: effect.label,
        actionId,
        enabled: true,
        reason: "",
      });
    }
    outputs.push({
      type: "queuedDomainRequest",
      id: `${effect.id}.actionOverride`,
      label: effect.label,
      domain: "actionOverride",
      request: {
        actionIds: normalizeStringArray(override.actionIds ?? override.actions ?? override.actionId),
        resource: toTrimmedString(override.resource, "fa"),
        cost: toNumber(override.cost, 0),
        category: toTrimmedString(override.category, "free"),
      },
    });
  }
  for (const reactionId of grants.reactions ?? []) {
    outputs.push({
      type: "queuedDomainRequest",
      id: `${effect.id}.reaction.${reactionId}`,
      label: effect.label,
      domain: "reactionGrant",
      request: { reactionId },
    });
  }
  const costs = effect.costs ?? {};
  if (toNumber(costs.heat, 0)) {
    outputs.push({ type: "resourceSpendPreview", id: `${effect.id}.heat`, label: effect.label, resource: "heat", value: toNumber(costs.heat, 0) });
  }
  if (toNumber(costs.charges, 0)) {
    outputs.push({ type: "resourceSpendPreview", id: `${effect.id}.charges`, label: effect.label, resource: "charges", value: toNumber(costs.charges, 0) });
  }
  if (costs.stress?.location && toNumber(costs.stress.value, 0)) {
    outputs.push({
      type: "queuedDomainRequest",
      id: `${effect.id}.stress`,
      label: effect.label,
      domain: "stressCost",
      request: {
        location: costs.stress.location,
        value: toNumber(costs.stress.value, 0),
      },
    });
  }
  return outputs;
}

function ruleFromEffect(effect = {}) {
  return normalizeRulePacket({
    id: effect.id,
    label: effect.label,
    scope: effect.scope,
    phase: "assetModuleEffect",
    mode: effect.timing === "triggered" ? "triggered" : "automatic",
    selector: selectorFromEffect(effect),
    requires: timingRequirements(effect),
    outputs: outputsFromEffect(effect),
    limits: effect.limits?.oncePerActivation ? { perActivation: 1 } : {},
    usage: effect.costs?.charges ? { charges: effect.costs.charges } : null,
    summary: effect.label,
  });
}

function legacyEffectFromRuleEntry(entry = {}) {
  const modifies = {};
  const grants = { statuses: [], actionOverrides: [], actions: [], reactions: [] };
  const costs = {};
  const limits = {
    oncePerActivation: entry.rule?.limits?.perActivation === 1,
    cooldownTurns: toNumber(entry.rule?.usage?.cooldownTurns, 0),
  };
  for (const output of entry.outputs ?? []) {
    if (output.type === "dicePart") modifies.dice = toNumber(modifies.dice, 0) + toNumber(output.value, 0);
    if (output.type === "cqPart") {
      modifies.ar = toNumber(modifies.ar, 0) + toNumber(output.ar, 0);
      modifies.dr = toNumber(modifies.dr, 0) + toNumber(output.dr, 0);
    }
    if (output.type === "targetingConstraint" && output.constraint === "trackingPenalty") {
      modifies.trackingPenalty = toNumber(modifies.trackingPenalty, 0) + toNumber(output.value, 0);
    }
    if (output.type === "targetingConstraint" && output.constraint === "bypassStatus" && output.value) {
      modifies.bypassStatuses ??= [];
      modifies.bypassStatuses.push(output.value);
    }
    if (output.type === "targetingDataModifier") {
      modifies.targetingData = toNumber(modifies.targetingData, 0) + toNumber(output.value, 0);
    }
    if (output.type === "derivedStatus" && output.key) grants.statuses.push(output.key);
    if (output.type === "queuedDomainRequest" && output.domain === "movement") {
      modifies.movementMeters = toNumber(modifies.movementMeters, 0) + toNumber(output.request?.movementMeters, 0);
    }
    if (output.type === "queuedDomainRequest" && output.domain === "clustering") {
      modifies.clusteringDice = toNumber(modifies.clusteringDice, 0) + toNumber(output.request?.diceModifier, 0);
      modifies.clusteringTarget = toNumber(modifies.clusteringTarget, 0) + toNumber(output.request?.targetNumberModifier, 0);
    }
    if (output.type === "queuedDomainRequest" && output.domain === "actionOverride") {
      grants.actionOverrides.push({
        actionIds: normalizeStringArray(output.request?.actionIds ?? output.request?.actionId),
        resource: toTrimmedString(output.request?.resource, "fa"),
        cost: toNumber(output.request?.cost, 0),
        category: toTrimmedString(output.request?.category, "free"),
      });
    }
    if (output.type === "queuedDomainRequest" && output.domain === "reactionGrant" && output.request?.reactionId) {
      grants.reactions.push(output.request.reactionId);
    }
    if (output.type === "queuedDomainRequest" && output.domain === "stressCost" && output.request?.location) {
      costs.stress = {
        location: output.request.location,
        value: toNumber(output.request.value, 0),
      };
    }
    if (output.type === "resourceSpendPreview" && output.resource === "heat") {
      costs.heat = toNumber(costs.heat, 0) + toNumber(output.value, 0);
    }
    if (output.type === "resourceSpendPreview" && output.resource === "charges") {
      costs.charges = toNumber(costs.charges, 0) + toNumber(output.value, 0);
    }
    if (output.type === "actionAvailability" && output.actionId) {
      const hasExplicitOverride = grants.actionOverrides.some(override => normalizeStringArray(override.actionIds).includes(output.actionId));
      if (!hasExplicitOverride) grants.actionOverrides.push({
        actionIds: [output.actionId],
        cost: 0,
        resource: "fa",
        category: "free",
      });
    }
  }
  return {
    id: entry.ruleId,
    label: entry.label,
    timing: entry.mode === "triggered" ? "triggered" : "ready",
    scope: toTrimmedString(entry.rule?.scope, "self"),
    requires: {},
    grants,
    modifies,
    costs,
    limits,
    sourceId: entry.sourceId,
    sourceName: entry.sourceName,
    moduleActive: true,
    moduleReady: true,
    ruleOutputs: entry.outputs ?? [],
  };
}

export function getApplicableAssetModuleEffects(actor = null, context = {}) {
  if (!isMachineActor(actor)) return { effects: [] };

  const facts = buildAssetModuleEffectFacts({ actor, ...context });
  const effects = [];

  for (const item of getAssetModules(actor)) {
    const moduleState = getAssetModuleState(item, { installed: true });
    const moduleFacts = {
      ...facts,
      tags: setToArray(facts.tags),
      weaponTags: setToArray(facts.weaponTags),
      statuses: setToArray(facts.statuses),
      module: {
        ready: moduleState.ready,
        active: moduleState.active,
        enabled: moduleState.enabled,
        destroyed: moduleState.destroyed,
        suppressed: moduleState.suppressed,
        offline: moduleState.offline,
        selectedMode: moduleState.activation?.selectedMode ?? "",
        activation: moduleState.activation ?? {},
      },
    };
    const nativeRules = normalizeCarrier(item.system ?? {}).rules;
    if (nativeRules.length) {
      const ruleResult = evaluatePhase({
        actor,
        carrierItems: [{ item, rules: nativeRules }],
        phase: "assetModuleEffect",
        facts: moduleFacts,
        runtime: context.runtime ?? {},
      });
      effects.push(...ruleResult.entries.map(legacyEffectFromRuleEntry));
      continue;
    }

    for (const effect of getNormalizedEffects(item)) {
      const result = evaluatePhase({
        actor,
        carrierItems: [{ item, rules: [ruleFromEffect(effect)] }],
        phase: "assetModuleEffect",
        facts: moduleFacts,
        runtime: context.runtime ?? {},
      });
      if (!result.entries.length) continue;
      const entry = result.entries[0];
      effects.push({
        ...effect,
        sourceId: item.id ?? "",
        sourceName: item.name ?? "Asset Module",
        moduleActive: moduleState.active,
        moduleReady: moduleState.ready,
        ruleOutputs: entry.outputs ?? [],
      });
    }
  }

  return { effects, facts };
}

export function sumAssetModuleDice(actor = null, context = {}) {
  return getApplicableAssetModuleEffects(actor, context).effects
    .reduce((sum, effect) => sum + toNumber(effect.modifies?.dice, 0), 0);
}

export function getAssetModuleCqEffects(actor = null, context = {}) {
  return getApplicableAssetModuleEffects(actor, context).effects
    .filter(effect => toNumber(effect.modifies?.ar, 0) || toNumber(effect.modifies?.dr, 0));
}

export function getAssetModuleBypassStatuses(actor = null, context = {}) {
  const statuses = new Set();
  for (const effect of getApplicableAssetModuleEffects(actor, context).effects) {
    for (const status of effect.modifies?.bypassStatuses ?? []) statuses.add(status);
  }
  return statuses;
}

export function getAssetModuleDerivedStatuses(actor = null, context = {}) {
  const statuses = new Set();
  for (const effect of getApplicableAssetModuleEffects(actor, context).effects) {
    if (effect.scope !== "self") continue;
    for (const status of effect.grants?.statuses ?? []) statuses.add(status);
  }
  return statuses;
}

export function getAssetModuleMovementBonus(actor = null, context = {}) {
  return getApplicableAssetModuleEffects(actor, context).effects
    .reduce((sum, effect) => sum + toNumber(effect.modifies?.movementMeters, 0), 0);
}

export function getAssetModuleClusteringProfile(actor = null, context = {}) {
  const effects = getApplicableAssetModuleEffects(actor, {
    ...context,
    payload: { ...(context.payload ?? {}), intent: "attack" },
    resolved: {
      ...(context.resolved ?? {}),
      intent: "attack",
    },
  }).effects;
  return effects.reduce((state, effect) => ({
    diceModifier: state.diceModifier + toNumber(effect.modifies?.clusteringDice, 0),
    targetNumberModifier: state.targetNumberModifier + toNumber(effect.modifies?.clusteringTarget, 0),
    sourceIds: effect.sourceId ? state.sourceIds.concat([effect.sourceId]) : state.sourceIds,
    sourceNames: effect.sourceName ? state.sourceNames.concat([effect.sourceName]) : state.sourceNames,
  }), {
    diceModifier: 0,
    targetNumberModifier: 0,
    sourceIds: [],
    sourceNames: [],
  });
}

export function findAssetModuleActionOverride(actor = null, actionId = "", context = {}) {
  const actionKey = toTrimmedString(actionId, "");
  if (!actionKey) return null;
  const { effects } = getApplicableAssetModuleEffects(actor, {
    ...context,
    payload: {
      ...(context.payload ?? {}),
      actionId: actionKey,
    },
  });

  for (const effect of effects) {
    for (const override of effect.grants?.actionOverrides ?? []) {
      const keys = normalizeStringArray(override?.actionIds ?? override?.actions ?? override?.actionId);
      if (keys.length && !keys.includes(actionKey)) continue;
      return {
        ...override,
        sourceId: effect.sourceId,
        sourceName: effect.sourceName,
      };
    }
  }
  return null;
}

function normalizeCapabilityKey(value = "") {
  return String(value ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function collectModuleCapabilityKeys(item = null, system = {}) {
  const keys = new Set();
  const add = value => {
    const normalized = normalizeCapabilityKey(value);
    if (normalized) keys.add(normalized);
  };
  const addMany = values => normalizeStringArray(values).forEach(add);

  add(item?.name);
  add(system?.name);
  add(system?.label);
  add(system?.category);
  addMany(system?.tags);
  addMany(system?.keywords);

  for (const effect of normalizeAssetModuleSystem(system).effects) {
    add(effect.id);
    add(effect.label);
    addMany(effect.requires?.tags);
    addMany(effect.grants?.actions);
    for (const override of effect.grants?.actionOverrides ?? []) {
      addMany(override?.actionIds ?? override?.actions ?? override?.actionId);
    }
  }

  return keys;
}

export function hasAssetModuleCapability(actor = null, capability = "", aliases = []) {
  const wanted = [capability, ...aliases].map(normalizeCapabilityKey).filter(Boolean);
  if (!wanted.length) return false;

  for (const item of getAssetModules(actor)) {
    const moduleState = getAssetModuleState(item, { installed: true });
    if (!moduleState.ready) continue;
    const keys = Array.from(collectModuleCapabilityKeys(item, moduleState.system ?? item?.system ?? {}));
    if (wanted.some(wantedKey => keys.some(key => key === wantedKey || key.includes(wantedKey)))) return true;
  }

  return false;
}

export function getAssetModuleActionCosts(actor = null, actionId = "", context = {}) {
  const actionKey = toTrimmedString(actionId, "");
  if (!actionKey) return { heat: 0, stress: [], charges: 0, effects: [] };
  const { effects } = getApplicableAssetModuleEffects(actor, {
    ...context,
    payload: {
      ...(context.payload ?? {}),
      actionId: actionKey,
    },
    context: {
      ...(context.context ?? {}),
      trigger: "onActionUse",
    },
  });
  return effects.reduce((state, effect) => {
    const heat = toNumber(effect.costs?.heat, 0);
    const charges = toNumber(effect.costs?.charges, 0);
    const stress = effect.costs?.stress;
    return {
      heat: state.heat + heat,
      charges: state.charges + charges,
      stress: stress?.location && stress.value
        ? state.stress.concat([{ ...stress, sourceName: effect.sourceName, effectId: effect.id }])
        : state.stress,
      effects: heat || charges || (stress?.location && stress.value) ? state.effects.concat([effect]) : state.effects,
    };
  }, { heat: 0, stress: [], charges: 0, effects: [] });
}

function formatSigned(value = 0) {
  const number = toNumber(value, 0);
  return `${number >= 0 ? "+" : ""}${number}`;
}

function summarizeEffect(effect = {}) {
  const parts = [];
  const timing = effect.timing === "active" ? "Active" : effect.timing === "triggered" ? "Triggered" : "Ready";
  const statuses = effect.grants?.statuses ?? [];
  if (statuses.length) parts.push(`applies ${statuses.join(", ")}`);
  if (effect.modifies?.dice) parts.push(`${formatSigned(effect.modifies.dice)} dice`);
  if (effect.modifies?.ar) parts.push(`${formatSigned(effect.modifies.ar)} AR`);
  if (effect.modifies?.dr) parts.push(`${formatSigned(effect.modifies.dr)} DR`);
  if (effect.modifies?.trackingPenalty) parts.push(`${formatSigned(effect.modifies.trackingPenalty)} trackingPenalty`);
  if (effect.modifies?.targetingData) parts.push(`${formatSigned(effect.modifies.targetingData)} targetingData`);
  if (effect.modifies?.clusteringDice) parts.push(`${formatSigned(effect.modifies.clusteringDice)} cluster dice`);
  if (effect.modifies?.clusteringTarget) parts.push(`${formatSigned(effect.modifies.clusteringTarget)} cluster target`);
  if (effect.modifies?.movementMeters) parts.push(`${formatSigned(effect.modifies.movementMeters)} m movement`);
  if (effect.modifies?.bypassStatuses?.length) parts.push(`bypasses ${effect.modifies.bypassStatuses.join(", ")}`);
  if (effect.costs?.heat) parts.push(`Heat ${formatSigned(effect.costs.heat)}`);
  if (effect.costs?.stress?.location && effect.costs.stress.value) {
    parts.push(`${effect.costs.stress.location} stress ${formatSigned(effect.costs.stress.value)}`);
  }
  if (!parts.length) return `${timing}: ${effect.label}`;

  const actionIds = effect.requires?.actionIds ?? [];
  const suffix = actionIds.length ? ` to ${actionIds.join(" / ")}` : "";
  return `${timing}: ${parts.join("; ")}${suffix}.`;
}

export function buildAssetModuleSummary(item = null) {
  try {
    const effects = getNormalizedEffects(item);
    return {
      summary: effects.map(summarizeEffect).filter(Boolean).join(" "),
      errors: [],
    };
  } catch (err) {
    if (!(err instanceof AssetModuleValidationError)) throw err;
    return {
      summary: "",
      errors: [err.userMessage ?? err.message],
    };
  }
}
