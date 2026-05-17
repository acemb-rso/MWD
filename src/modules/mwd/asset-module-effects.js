// src/modules/mwd/asset-module-effects.js
// Purpose: Runtime matching and summaries for data-driven AssetModule effects.
// How it fits: Gives providers and action builders one stable way to consume
// schema-first module rules without hardcoding individual upgrade names.

import { TEMPLATE } from "../constants.js";
import { AssetModuleValidationError, normalizeAssetModuleSystem, validateAssetModuleEffects } from "./asset-module-rules.js";

const MACHINE_ACTOR_TYPES = new Set([TEMPLATE.actorTypes.battlemech, TEMPLATE.actorTypes.vehicle]);

function toCollectionArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.contents)) return value.contents;
  if (value && typeof value[Symbol.iterator] === "function") return Array.from(value);
  return [];
}

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
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

function getActorType(source = {}) {
  return String(source?.type ?? source?.actor?.type ?? "").trim();
}

function isMachineActor(source = {}) {
  return MACHINE_ACTOR_TYPES.has(getActorType(source));
}

function getModuleState(item = null) {
  const system = normalizeAssetModuleSystem(item?.system ?? {});
  const currentRound = Number(globalThis.game?.combat?.round ?? 0) || 0;
  const cooldownUntilRound = Number(system.activation?.cooldownUntilRound ?? 0) || 0;
  const coolingDown = cooldownUntilRound > 0 && currentRound > 0 && cooldownUntilRound >= currentRound;
  const ready = !system.inactive;
  const mode = system.activation?.mode ?? "passive";
  const available = ready && !coolingDown;
  const active = available && mode !== "passive" && Boolean(system.activation?.active);
  return {
    ready: available,
    installedReady: ready,
    active,
    coolingDown,
    activation: system.activation,
    system,
  };
}

function addSetEntries(target, values) {
  for (const value of normalizeStringArray(values)) target.add(value);
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
    intent,
    actionId,
    skillId,
    tags,
    weaponTags,
    statuses,
    detectionState,
    targetState,
    heatBand,
    trigger: toTrimmedString(context?.trigger, ""),
  };
}

function includesAll(container, required = []) {
  return required.every(value => container.has(value));
}

function matchesEffectRequirements(effect = {}, facts = {}, moduleState = {}) {
  const requires = effect.requires ?? {};
  if (requires.tags?.length && !includesAll(facts.tags, requires.tags)) return false;
  if (requires.forbidsTags?.length && requires.forbidsTags.some(tag => facts.tags.has(tag))) return false;
  if (requires.actionIds?.length && !requires.actionIds.includes(facts.actionId)) return false;
  if (requires.skillIds?.length && !requires.skillIds.includes(facts.skillId)) return false;
  if (requires.weaponTags?.length && !includesAll(facts.weaponTags, requires.weaponTags)) return false;
  if (requires.statuses?.length && !includesAll(facts.statuses, requires.statuses)) return false;
  if (requires.forbidsStatuses?.length && requires.forbidsStatuses.some(status => facts.statuses.has(status))) return false;
  if (requires.detectionState && requires.detectionState !== facts.detectionState) return false;
  if (requires.targetState && requires.targetState !== facts.targetState) return false;
  if (requires.heatBand && requires.heatBand !== facts.heatBand) return false;
  if (requires.modes?.length) {
    const selectedMode = toTrimmedString(moduleState.activation?.selectedMode, "");
    if (!requires.modes.includes(selectedMode)) return false;
  }
  return true;
}

function isEffectTimingAvailable(effect = {}, moduleState = {}, facts = {}) {
  if (!moduleState.ready) return false;
  if (effect.timing === "ready") return true;
  if (effect.timing === "active") return moduleState.active;
  if (effect.timing === "triggered") return Boolean(facts.trigger);
  return false;
}

function getNormalizedEffects(item) {
  validateAssetModuleEffects(item?.system ?? {}, {
    itemName: item?.name ?? "Asset Module",
    itemId: item?.id ?? "",
  });
  const normalized = normalizeAssetModuleSystem(item?.system ?? {}).effects;
  return normalized;
}

export function getApplicableAssetModuleEffects(actor = null, context = {}) {
  if (!isMachineActor(actor)) return { effects: [] };

  const facts = buildAssetModuleEffectFacts({ actor, ...context });
  const effects = [];

  for (const item of getAssetModules(actor)) {
    const moduleState = getModuleState(item);
    const moduleEffects = getNormalizedEffects(item);
    for (const effect of moduleEffects) {
      if (!isEffectTimingAvailable(effect, moduleState, facts)) continue;
      if (!matchesEffectRequirements(effect, facts, moduleState)) continue;
      effects.push({
        ...effect,
        sourceId: item.id ?? "",
        sourceName: item.name ?? "Asset Module",
        moduleActive: moduleState.active,
        moduleReady: moduleState.ready,
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
