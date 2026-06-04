// src/modules/roll/mwd-roll.js
// Purpose: Defines function `pickMostMissingEdgePool`.
// How it fits: Describes role within src/modules or template rendering pipeline.

import { resolveIntent } from "./intent/resolve-intent.js";
import { collectModifiers } from "./collect-modifiers.js";
import { buildResolved } from "./build-resolved.js";
import { renderChat } from "./renderers/render-chat.js";
import { interpretOutcome } from "./outcome/interpret-outcome.js";
import { MWDRollDialog } from "./mwd-roll-dialog.js";
import { WeaponItem } from "../item/weapon-item.js";
import { SelectItem } from "../dialog/select-item.js";
import { TEMPLATE } from "../constants.js";
import { resolveAttackExecution } from "./attack-resolution.js";
import { createAttackTemplateIndicator, placeTemplatedAttack } from "./template-placement.js";
import {
  applyTraitMutations,
  buildOptionalTraitManualModifiers,
  buildInitiativeTraitFacts,
  buildRollTraitFacts,
  evaluateTraitPhase,
} from "../mwd/traits.js";
import { isPersistentAreaEffect } from "../area-effects/area-effect-engine.js";
import {
  applyMachineRemedyOutcome,
  commitMachineRemedyCost,
  resolveMachineCritIntentContext,
} from "../mwd/machine-intents.js";
import { adjustBattlemechPendingHeat, recordBattlemechAttackHeat } from "../mwd/machine-heat.js";
import { applyHeatDangerCheckOutcome } from "../mwd/heat-danger-outcomes.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import {
  applyPlayerModifierPresetsToPayload,
  consumeOncePlayerModifierPresets,
  shouldApplyPlayerModifierPresets,
} from "../player/player-modifier-presets.js";
import { getMachineActionDefinition } from "../mwd/machine-action-catalog.js";
import { findAssetModuleActionOverride, getAssetModuleActionCosts } from "../mwd/asset-module-effects.js";
import { getMachineAttackActionCost, isMachineActor } from "../mwd/machine-crit-effects.js";
import { resolveAcquireExecution, resolveBreakLockExecution, resolveTargetingExecution } from "./ew-execution.js";
import { getAttackerCombatant, consumeTargetingPacket } from "../mwd/machine-ew-state.js";

/**
 * Public roll API.
 * Sheets call: game.mwd.roll.execute({ actor, payload, event })
 */
export const MWDRoll = { execute, recomputeResolvedOutcomeAndAttack, applyPostRerollFailures };

const EDGE_DOMAIN_POOLS = {
  physical: ["grit","chaos"],
  mental: ["insight","rumor"],
  social: ["legend","credibility"],
};

const CRITICAL_EDGE_REASONS = new Set(["criticalSuccess", "criticalFailure", "critFail"]);
const MACHINE_PLATFORM_ROLL_INTENTS = new Set([
  "acquire",
  "acquireTarget",
  "generateFireSolution",
  "heatDangerCheck",
  "machineRemedy",
  "targeting",
]);

function uniqueStrings(values = []) {
  return Array.from(new Set(values.map(value => String(value ?? "").trim()).filter(Boolean)));
}

function getEdgeAwardComponents(earned) {
  if (earned?.reason === "multiple" && Array.isArray(earned?.details?.awards)) {
    return earned.details.awards.filter(award => Number(award?.amount ?? 0) > 0);
  }
  return Number(earned?.amount ?? 0) > 0 ? [earned] : [];
}

function buildOutcomeContext(resolved = {}) {
  const snapshot = resolved?.ctxSnapshot ?? {};
  const dnTotal = Number(resolved?.dn?.total ?? snapshot?.dn?.total ?? snapshot?.difficulty?.dn ?? 1);

  return {
    intent: resolved?.intent ?? "unknown",
    rollType: snapshot?.rollType ?? "simple",
    difficulty: {
      ...((snapshot?.difficulty && typeof snapshot.difficulty === "object") ? snapshot.difficulty : {}),
      dn: Number.isFinite(dnTotal) ? dnTotal : 1
    },
    dn: resolved?.dn ?? snapshot?.dn ?? null,
    opposed: snapshot?.opposed ?? null,
    net: snapshot?.net ?? null,
    edge: snapshot?.edge ?? null,
    domains: Array.isArray(resolved?.domains) ? resolved.domains : [],
    attack: resolved?.attack ?? null,
    machineRemedy: resolved?.machineRemedy ?? null,
    acquire: resolved?.acquire ?? null,
    targeting: resolved?.targeting ?? null,
  };
}

async function recomputeResolvedOutcomeAndAttack(resolved = {}, actor = null) {
  const ctx = buildOutcomeContext(resolved);
  const successes = Number(resolved?.outcome?.hits ?? 0) || 0;
  const edgeEarned = resolved?.outcomeModel?.edgeEarned ?? null;
  resolved.outcomeModel = interpretOutcome(ctx, { successes, raw: resolved?.roll?.json }, null);
  const edgeSpent =
    Number(resolved?.edge?.pre?.spent ?? 0) > 0 ||
    Number(resolved?.edge?.post?.spent ?? 0) > 0;
  resolved.outcomeModel.edgeEarned = edgeSpent ? null : edgeEarned;

  if (ctx.intent === "attack" && actor && ctx.attack) {
    resolved.attackResult = await resolveAttackExecution({
      attacker: actor,
      ctx,
      outcomeModel: resolved.outcomeModel,
      previewState: resolved.areaEffectPreviewState ?? {},
      existingAttackResult: resolved.attackResult ?? null,
    });
  } else if (ctx.intent === "machineRemedy") {
    resolved.machineRemedyResult = {
      ...(await applyMachineRemedyOutcome(resolved.originPayload ?? {}, {
        gmOverride: Boolean(resolved?.originPayload?.gmOverride),
        passed: Boolean(resolved.outcomeModel?.passed),
      })),
      spend: resolved.machineRemedyResult?.spend ?? null,
      context: resolved.machineRemedyResult?.context ?? null,
    };
  } else if (ctx.intent === "acquire" && actor && ctx.acquire) {
    resolved.ewAcquireResult = await resolveAcquireExecution({
      attacker: actor,
      ctx,
      outcomeModel: resolved.outcomeModel,
    });
  } else if (ctx.intent === "targeting" && actor && ctx.targeting) {
    resolved.ewTargetingResult = await resolveTargetingExecution({
      attacker: actor,
      ctx,
      outcomeModel: resolved.outcomeModel,
    });
  } else if (ctx.intent === "skill" && resolved.originPayload?.machineActionKey === "breakLock" && actor) {
    resolved.ewBreakLockResult = await resolveBreakLockExecution({
      attacker: actor,
      payload: resolved.originPayload,
      ctx,
      outcomeModel: resolved.outcomeModel,
    });
  }

  return resolved;
}

function hasAppliedAttackMutation(resolved = {}) {
  const results = Array.isArray(resolved?.attackResult?.results) ? resolved.attackResult.results : [];
  return results.some(result => Boolean(result?.queuedMutation?.applied));
}

function getAppliedEdgeAwards(edgeEarned = null) {
  if (Array.isArray(edgeEarned?.appliedAwards)) {
    return edgeEarned.appliedAwards
      .map(award => ({
        pool: String(award?.pool ?? "").trim(),
        amount: Math.max(0, Number(award?.amount ?? 0)),
      }))
      .filter(award => award.pool && award.amount > 0);
  }

  const pool = String(edgeEarned?.pool ?? "").trim();
  const amount = Math.max(0, Number(edgeEarned?.amount ?? 0));
  return edgeEarned?.applied && pool && amount > 0 ? [{ pool, amount }] : [];
}

function getSpendableEdgeAfterRevokingEarned(actor, resolved = {}, poolKey = "") {
  const current = Number(actor?.getEdgePoolValue?.(poolKey) ?? actor?.getRemainingEdge?.(poolKey) ?? 0);
  const revokedFromPool = getAppliedEdgeAwards(resolved?.outcomeModel?.edgeEarned)
    .filter(award => award.pool === poolKey)
    .reduce((sum, award) => sum + Number(award.amount ?? 0), 0);

  return Math.max(0, current - revokedFromPool);
}

async function revokeAppliedEdgeEarned(actor, resolved = {}) {
  const awards = getAppliedEdgeAwards(resolved?.outcomeModel?.edgeEarned);
  if (!awards.length) return;

  for (const award of awards) {
    await actor.spendEdge?.(award.pool, award.amount, {
      skipTraitHooks: true,
      source: "postEdgeRevokesEarnedEdge",
    });
  }

  if (resolved?.outcomeModel) resolved.outcomeModel.edgeEarned = null;
}

async function applyPostRerollFailures({ message = null, poolKey = "" } = {}) {
  const normalizedPoolKey = String(poolKey ?? "").trim();
  if (!message) throw new Error("Post-reroll requires a chat message.");
  if (!normalizedPoolKey) throw new Error("Post-reroll requires poolKey.");

  const resolved = foundry.utils.deepClone(message?.flags?.mwd?.resolved);
  if (!resolved) return { ok: false, reason: "missing-resolved", userMessage: "Roll data is no longer available." };

  if (hasAppliedAttackMutation(resolved)) {
    return {
      ok: false,
      reason: "attack-damage-applied",
      userMessage: "Post-roll Edge is disabled after attack damage has been applied.",
    };
  }
  if (resolved?.firstAidResult?.applied) {
    return {
      ok: false,
      reason: "first-aid-applied",
      userMessage: "Post-roll Edge is disabled after First Aid has been applied.",
    };
  }

  if (Number(resolved?.edge?.post?.spent ?? 0) === 1) {
    return { ok: false, reason: "already-spent", userMessage: "Post-roll Edge has already been spent." };
  }

  const allowed = Array.isArray(resolved?.edge?.allowed?.postPools)
    ? resolved.edge.allowed.postPools
    : [];

  if (!allowed.includes(normalizedPoolKey)) {
    return {
      ok: false,
      reason: "pool-not-allowed",
      userMessage: `Post-spend pool not allowed: ${normalizedPoolKey}`,
    };
  }

  const failureRefs = Array.isArray(resolved?.roll?.failureDiceRefs)
    ? resolved.roll.failureDiceRefs
    : [];

  if (failureRefs.length <= 0) {
    return { ok: false, reason: "no-failures", userMessage: "No failures to reroll." };
  }

  const rollActor = await fromUuid(resolved.rollActorUuid ?? resolved.actorUuid);
  if (!rollActor) return { ok: false, reason: "actor-not-found", userMessage: "Actor not found for this roll." };
  const contextActor = await fromUuid(resolved.actorUuid) ?? rollActor;

  if (getSpendableEdgeAfterRevokingEarned(rollActor, resolved, normalizedPoolKey) <= 0) {
    return {
      ok: false,
      reason: "edge-unavailable",
      userMessage: `No ${normalizedPoolKey} Edge available for post-spend.`,
    };
  }

  await revokeAppliedEdgeEarned(rollActor, resolved);
  await rollActor.spendEdge?.(normalizedPoolKey, 1);

  const tn = Number(resolved?.roll?.target ?? 5);
  const reroll = await new Roll(`${failureRefs.length}d6cs>=${tn}`).evaluate();
  const term = reroll.dice?.[0];
  const results = Array.isArray(term?.results) ? term.results : [];
  const addHits = results.filter(r => r.success).length;

  resolved.outcome = resolved.outcome ?? {};
  resolved.outcome.hits = Number(resolved.outcome.hits ?? 0) + addHits;

  resolved.edge = resolved.edge ?? {};
  resolved.edge.post = { poolKey: normalizedPoolKey, spent: 1 };

  resolved.edge.availableActions = {
    ...(resolved.edge.availableActions ?? {}),
    canSpendPost: false,
    canPostRerollFailures: false
  };

  resolved.roll = resolved.roll ?? {};
  resolved.roll.diceGroups = Array.isArray(resolved.roll.diceGroups) ? resolved.roll.diceGroups : [];
  resolved.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: results.map((r, i) => {
      const face = Number(r.result);
      const isSuccess = Boolean(r.success);
      return {
        ref: `post:${i}`,
        face,
        isSuccess,
        isFailure: !isSuccess,
        tooltip: isSuccess
          ? `Post die ${i + 1}: ${face} (Success vs TN ${tn})`
          : `Post die ${i + 1}: ${face} (Failure vs TN ${tn})`
      };
    })
  });

  await recomputeResolvedOutcomeAndAttack(resolved, contextActor);
  const content = await renderChat({ resolved });

  return {
    ok: true,
    resolved,
    content,
    updateData: {
      content,
      "flags.mwd.resolved": resolved,
      "flags.mwd.payload.edge.post": { poolKey: normalizedPoolKey, spent: 1 },
    },
  };
}

function isCriticalEdgeAward(award) {
  return CRITICAL_EDGE_REASONS.has(String(award?.reason ?? ""));
}

function pickMostMissingEdgePool(actor, domain) {
  const keys = EDGE_DOMAIN_POOLS[domain] ?? [];
  let best = null;
  let bestMissing = -1;

  for (const key of keys) {
    const pool = actor.getEdgePool?.(key);
    const max = Number(pool?.effectiveMax ?? pool?.rating ?? 0);
    const value = Number(pool?.effectiveValue ?? pool?.value ?? 0);
    const missing = Math.max(0, max - value);
    if (missing > bestMissing) {
      bestMissing = missing;
      best = key;
    }
  }

  return best ?? keys[0] ?? null;
}

function getCriticalEdgeDomain(ctx, edgeInfo) {
  return edgeInfo?.domain ?? pickEdgeDomain(ctx?.domains);
}

function getAwardPoolKeys(actor, award, domain) {
  if (isCriticalEdgeAward(award)) {
    const poolKey = pickMostMissingEdgePool(actor, domain);
    return poolKey ? [poolKey] : [];
  }
  return award?.pool ? [String(award.pool)] : [];
}

async function applyEarnedEdgeAwards({ actor, ctx, edgeInfo, earned } = {}) {
  if (!actor?.gainEdge || !earned?.amount) return null;

  // Critical outcome Edge restores one pool in the roll's domain: whichever
  // domain pool is currently missing the most Edge.
  const domain = getCriticalEdgeDomain(ctx, edgeInfo);
  const components = getEdgeAwardComponents(earned);
  const appliedAwards = [];
  const targetPools = [];

  for (const award of components) {
    const amount = Math.max(0, Number(award?.amount ?? 0));
    if (!amount) continue;

    const poolKeys = getAwardPoolKeys(actor, award, domain);
    for (const poolKey of poolKeys) {
      const beforeState = actor.getEdgePool?.(poolKey) ?? {};
      const before = Number(beforeState.effectiveValue ?? beforeState.value ?? 0);
      const max = Number(beforeState.effectiveMax ?? beforeState.rating ?? 0);
      const expectedApplied = Number.isFinite(max)
        ? Math.max(0, Math.min(amount, max - before))
        : amount;

      if (expectedApplied <= 0) continue;

      await actor.gainEdge(poolKey, amount, {
        source: isCriticalEdgeAward(award) ? "criticalOutcome" : "rollOutcome",
      });

      targetPools.push(poolKey);
      appliedAwards.push({
        pool: poolKey,
        amount: expectedApplied,
        reason: String(award?.reason ?? earned.reason ?? "rollOutcome"),
      });
    }
  }

  if (!appliedAwards.length) return null;

  const pools = uniqueStrings(targetPools);
  return {
    ...earned,
    pool: pools.length === 1 ? pools[0] : null,
    pools,
    targetLabel: pools.join(", "),
    applied: true,
    appliedAwards,
  };
}

function normalizeManualMods(payload) {
  const rows = Array.isArray(payload?.manualModifiers) ? payload.manualModifiers : [];
  const mods = rows
    .filter(r => r?.enabled !== false)
    .map(r => ({
      id: r.id ?? foundry.utils.randomID(),
      label: (r.label ?? "Manual").trim() || "Manual",
      value: Number(r.value ?? 0),
      source: String(r.source ?? "Manual").trim() || "Manual"
    }))
    .filter(m => Number.isFinite(m.value) && m.value !== 0);

  const total = mods.reduce((a, m) => a + m.value, 0);
  return { mods, total };
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

function normalizePayload(payload = {}) {
  const toggles = payload.toggles ?? {};
  const payloadId = String(payload?.payloadId ?? payload?.ammoTypeId ?? "").trim();

  return {
    ...payload,
    ...(payloadId ? { payloadId } : {}),
    toggles: {
      useEdge: !!toggles.useEdge,
      takeRisks: !!toggles.takeRisks,
      opponentRoll: !!toggles.opponentRoll
    },
    manualModifiers: normalizeManualModifierRows(payload.manualModifiers)
  };
}

function shouldRouteToOperatedPlatform(payload = {}) {
  const intent = String(payload?.intent ?? "").trim();
  if (MACHINE_PLATFORM_ROLL_INTENTS.has(intent)) return true;
  if (intent === "initiative") return true;
  if (intent === "skill" && payload?.machineActionKey) return true;
  if (intent !== "attack") return false;

  const sourceType = String(payload?.sourceType ?? "").trim();
  return sourceType === "weaponGroup"
    || sourceType === "mechWeapon"
    || sourceType === "vehicleWeapon"
    || Boolean(payload?.weaponGroupId)
    || Boolean(payload?.machineWeaponGroup?.id);
}

function resolveOperatedPlatformRollActor(actor, payload = {}) {
  if (!actor || isMachineActor(actor) || !shouldRouteToOperatedPlatform(payload)) return actor;
  const unit = PersonalCombatTracker.resolveActivationUnit?.({ actor }) ?? null;
  return unit?.platformActor && unit?.operatorActor ? unit.platformActor : actor;
}

async function normalizeAttackPayload({ actor, payload } = {}) {
  if (payload?.intent !== "attack") return payload;

  const normalized = foundry.utils.deepClone(payload ?? {});
  const loadout = actor.getPersonalCombatLoadout?.({ refresh: true }) ?? null;
  const isMachine = isMachineActor(actor);
  const explicitSourceType = String(normalized?.sourceType ?? "").trim();
  const explicitSourceId = String(normalized?.sourceId ?? "").trim();

  const resolveWeaponProfile = (weaponId) => {
    const item = actor.items?.get?.(weaponId) ?? null;
    if (!item || !(item.isPersonalWeapon?.() ?? item.type === TEMPLATE.itemType.personalWeapon)) return null;
    if (!item.system?.equipped) return null;
    return item.getCombatProfile?.({ payloadId: normalized?.payloadId }) ?? null;
  };

  if (!explicitSourceType || !explicitSourceId) {
    const legacyGroupId = String(normalized?.weaponGroupId ?? normalized?.machineWeaponGroup?.id ?? "").trim();
    const legacyWeaponId = String(normalized?.weaponId ?? "").trim();

    if (legacyGroupId) {
      normalized.sourceType = "weaponGroup";
      normalized.sourceId = legacyGroupId;
    } else if (legacyWeaponId) {
      normalized.sourceType = isMachine ? "mechWeapon" : "personalWeapon";
      normalized.sourceId = legacyWeaponId;
    }
  }

  if (String(normalized?.sourceType ?? "").trim() === "weaponGroup") {
    normalized.weaponGroupId = String(normalized?.sourceId ?? normalized?.weaponGroupId ?? "").trim();
    normalized.sourceId = normalized.weaponGroupId;
    if (!normalized.weaponGroupId) {
      throw new Error("Attack requires a valid weapon group source.");
    }
    return normalized;
  }

  if (String(normalized?.sourceType ?? "").trim() === "mechWeapon") {
    normalized.weaponId = String(normalized?.sourceId ?? normalized?.weaponId ?? "").trim();
    normalized.sourceId = normalized.weaponId;
    if (!normalized.weaponId) {
      throw new Error("Attack requires a valid machine weapon source.");
    }
    return normalized;
  }

  if (String(normalized?.sourceType ?? "").trim() === "personalWeapon" && explicitSourceId) {
    normalized.weaponId = explicitSourceId;
  }

  if (normalized.weaponId) {
    const profile = resolveWeaponProfile(normalized.weaponId);
    if (!profile) {
      throw new Error("Attack requires an owned equipped personal weapon.");
    }

    normalized.sourceType = "personalWeapon";
    normalized.sourceId = normalized.weaponId;
    normalized.payloadId = normalized.payloadId ?? profile?.payloadState?.activePayloadId ?? "";
    return normalized;
  }

  if (normalized.mode === "auto") {
    if (loadout?.weaponChoiceRequired) {
      const selected = await SelectItem.selectItem(
        "Choose Weapon",
        loadout.equippedWeapons ?? []
      );
      if (!selected) return null;

      normalized.weaponId = selected.id;
      normalized.sourceType = "personalWeapon";
      normalized.sourceId = selected.id;
      normalized.payloadId = normalized.payloadId ?? selected?.payloadState?.activePayloadId ?? "";
      delete normalized.mode;
      return normalized;
    }

    if (loadout?.defaultWeapon?.isSynthetic || loadout?.defaultWeapon?.id === "unarmed") {
      normalized.syntheticWeapon = foundry.utils.deepClone(loadout.defaultWeapon ?? WeaponItem.buildDefaultUnarmedProfile(actor));
      normalized.weaponId = normalized.syntheticWeapon.id;
      normalized.sourceType = "personalWeapon";
      normalized.sourceId = normalized.syntheticWeapon.id;
      normalized.payloadId = normalized.payloadId ?? normalized.syntheticWeapon?.payloadState?.activePayloadId ?? "";
      delete normalized.mode;
      return normalized;
    }

    if (loadout?.defaultWeapon?.id) {
      normalized.weaponId = loadout.defaultWeapon.id;
      normalized.sourceType = "personalWeapon";
      normalized.sourceId = loadout.defaultWeapon.id;
      normalized.payloadId = normalized.payloadId ?? loadout.defaultWeapon?.payloadState?.activePayloadId ?? "";
      delete normalized.mode;
      return normalized;
    }
  }

  if (normalized.fallback === "unarmed") {
    normalized.syntheticWeapon = foundry.utils.deepClone(WeaponItem.buildDefaultUnarmedProfile(actor));
    normalized.weaponId = normalized.syntheticWeapon.id;
    normalized.sourceType = "personalWeapon";
    normalized.sourceId = normalized.syntheticWeapon.id;
    normalized.payloadId = normalized.payloadId ?? normalized.syntheticWeapon?.payloadState?.activePayloadId ?? "";
    delete normalized.mode;
    return normalized;
  }

  throw new Error("Attack could not resolve a usable weapon.");
}

function normalizeManualModifierRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map(r => ({
    id: r?.id ?? foundry.utils.randomID(),
    label: typeof r?.label === "string" ? r.label : "Manual",
    value: Number(r?.value ?? 0),
    enabled: r?.enabled !== false,
    source: String(r?.source ?? "Manual").trim() || "Manual",
    optional: r?.optional === true,
    traitItemId: String(r?.traitItemId ?? "").trim(),
    traitEffectId: String(r?.traitEffectId ?? "").trim(),
  }));
}

function mergeOptionalTraitManualModifiers(payload = {}, rows = []) {
  const existing = normalizeManualModifierRows(payload.manualModifiers);
  if (!Array.isArray(rows) || !rows.length) {
    return { ...payload, manualModifiers: existing };
  }

  const existingIds = new Set(existing.map(row => String(row.id ?? "").trim()).filter(Boolean));
  const additions = rows
    .map(row => ({
      id: String(row?.id ?? foundry.utils.randomID()).trim() || foundry.utils.randomID(),
      label: String(row?.label ?? "Trait").trim() || "Trait",
      value: Number(row?.value ?? 0),
      enabled: row?.enabled === true,
      source: String(row?.source ?? "Trait").trim() || "Trait",
      optional: true,
      traitItemId: String(row?.traitItemId ?? "").trim(),
      traitEffectId: String(row?.traitEffectId ?? "").trim(),
    }))
    .filter(row => Number.isFinite(row.value) && row.value !== 0 && !existingIds.has(row.id));

  return {
    ...payload,
    manualModifiers: [...existing, ...additions],
  };
}

async function updateUserTargets(tokenIds = []) {
  const ids = Array.from(new Set(
    (Array.isArray(tokenIds) ? tokenIds : [])
      .map(id => String(id ?? "").trim())
      .filter(Boolean)
  ));

  if (typeof game.user?.updateTokenTargets === "function") {
    await game.user.updateTokenTargets(ids);
    return;
  }

  for (const token of Array.from(game.user?.targets ?? [])) {
    token?.setTarget?.(false, { releaseOthers: false, user: game.user });
  }

  for (const id of ids) {
    const token = canvas?.tokens?.get?.(id)
      ?? canvas?.tokens?.placeables?.find?.(entry => entry?.id === id)
      ?? null;
    token?.setTarget?.(true, { releaseOthers: false, user: game.user });
  }
}

function getMachineAttackToken(actor, payload = {}) {
  const sourceTokenId = String(payload?.sourceTokenId ?? "").trim();
  if (sourceTokenId) {
    const direct = canvas?.tokens?.get?.(sourceTokenId)
      ?? canvas?.tokens?.placeables?.find?.(token => token?.id === sourceTokenId)
      ?? null;
    if (direct) return direct.document ?? direct;
  }

  return actor?.token?.document
    ?? actor?.token
    ?? actor?.getActiveTokens?.(true, true)?.[0]?.document
    ?? actor?.getActiveTokens?.(true, true)?.[0]
    ?? null;
}

async function commitMachineAttackAction(actor, payload = {}, { rollActor = null } = {}) {
  if (!isMachineActor(actor)) return;
  if (Boolean(payload?.machineActionPrecommitted)) return;

  const token = getMachineAttackToken(actor, payload);
  const spendActor = rollActor ?? actor;
  const snapshot = PersonalCombatTracker.getSnapshot?.(spendActor, { token }) ?? null;
  if (!snapshot?.hasCombatant) return;

  const cost = getMachineAttackActionCost(actor);
  const isBattlemechGroupAttack = actor?.type === TEMPLATE.actorTypes.battlemech
    && String(payload?.sourceType ?? "").trim() === "weaponGroup"
    && String(payload?.sourceId ?? payload?.weaponGroupId ?? "").trim();
  const totalCost = isBattlemechGroupAttack
    ? (1 + Number(cost?.extraCost ?? 0))
    : Number(cost?.totalCost ?? 0);
  const spend = await PersonalCombatTracker.spendResource(spendActor, {
    token,
    resource: "sa",
    cost: totalCost,
    actionId: "attack",
    actionLabel: "Attack",
    actionCostLabel: `${totalCost} SA`,
    actionCategory: "complex",
  });
  if (!spend?.ok) {
    ui.notifications?.warn(spend?.reason ?? "Unable to record attack action.");
    return;
  }

  if (isBattlemechGroupAttack) {
    const markUsed = await PersonalCombatTracker.markWeaponGroupUsed?.(actor, {
      token,
      groupId: String(payload?.sourceId ?? payload?.weaponGroupId ?? "").trim(),
    });
    if (!markUsed?.ok) {
      ui.notifications?.warn(markUsed?.reason ?? "Unable to record BattleMech weapon-group usage.");
    }
  }
}

function applyAssetModuleActionOverride(action = {}, override = null) {
  if (!override) return action;
  return {
    ...action,
    cost: Number.isFinite(Number(override.cost)) ? Math.max(0, Number(override.cost)) : action.cost,
    resource: String(override.resource ?? action.resource ?? "sa").trim() || "sa",
    category: String(override.category ?? action.category ?? "simple").trim() || "simple",
  };
}

async function commitMachineAction(actor, actionKey = "", payload = {}, { rollActor = null, resolved = null } = {}) {
  if (!isMachineActor(actor)) return;

  const baseAction = getMachineActionDefinition(actionKey);
  const override = findAssetModuleActionOverride(actor, baseAction.key, {
    payload,
    resolved,
    context: {
      targetState: resolved?.acquire?.currentState ?? "",
      detectionState: resolved?.targeting?.detectionState ?? resolved?.acquire?.currentState ?? "",
    },
  });
  const action = applyAssetModuleActionOverride(baseAction, override);

  const token = getMachineAttackToken(actor, payload);
  const spendActor = rollActor ?? actor;
  const snapshot = PersonalCombatTracker.getSnapshot?.(spendActor, { token }) ?? null;
  if (action?.cost && action?.resource && snapshot?.hasCombatant) {
    const spend = await PersonalCombatTracker.spendResource(spendActor, {
      token,
      resource: action.resource,
      cost: action.cost,
      actionId: action.key,
      actionLabel: action.label,
      actionCostLabel: `${action.cost} ${String(action.resource).toUpperCase()}`,
      actionCategory: action.category,
    });
    if (!spend?.ok) {
      ui.notifications?.warn(spend?.reason ?? `Unable to record ${action.label}.`);
      return;
    }
  }

  const costs = getAssetModuleActionCosts(actor, action.key, {
    payload,
    resolved,
    context: {
      targetState: resolved?.acquire?.currentState ?? "",
      detectionState: resolved?.targeting?.detectionState ?? resolved?.acquire?.currentState ?? "",
    },
  });
  if (costs.heat && actor?.type === TEMPLATE.actorTypes.battlemech) {
    await adjustBattlemechPendingHeat(actor, costs.heat, { reason: `${action.label} module cost` });
  }
  if (costs.stress?.length) {
    const updates = {};
    for (const stress of costs.stress) {
      const location = String(stress.location ?? "").trim();
      if (!location) continue;
      const path = `system.mwd.locations.${location}.stress`;
      const current = Number(foundry.utils.getProperty(actor, path) ?? 0) || 0;
      updates[path] = Math.max(0, current + (Number(stress.value ?? 0) || 0));
    }
    if (Object.keys(updates).length) await actor.update(updates);
  }
}

async function execute({ actor, payload, event, uiState = null } = {}) {
  // Allow token docs/objects to be passed accidentally
  if (actor?.actor) actor = actor.actor;
  if (actor?.document?.actor) actor = actor.document.actor;

  if (!actor) throw new Error("MWD.roll.execute requires actor");
  if (!payload?.intent) throw new Error("MWD.roll.execute requires payload.intent");
  const applyPlayerPresets = shouldApplyPlayerModifierPresets(uiState);
  if (applyPlayerPresets) {
    payload = applyPlayerModifierPresetsToPayload(payload, { subject: uiState?.subject ?? null });
  }
  payload = normalizePayload(payload);
  actor = resolveOperatedPlatformRollActor(actor, payload);
  payload = await normalizeAttackPayload({ actor, payload });
  if (!payload) return null;

  /* -------------------------------- */
  /* 1) Resolve intent (always first) */
  /* -------------------------------- */

  let ctx = await resolveIntent({ actor, payload, event });
  let rollActor = ctx?.rollActor ?? actor;

  if (payload.intent === "attack" && ctx?.attack?.capabilityReport?.isTemplated) {
    const placementResult = await placeTemplatedAttack({
      actor,
      attack: ctx.attack,
    });

    if (!placementResult) return null;

    try {
      await createAttackTemplateIndicator({
        actor,
        attack: ctx.attack,
        templateGeometry: placementResult.templateGeometry ?? null,
      });
    } catch (error) {
      console.warn("MWD | Unable to create visual template indicator", error);
    }

    await updateUserTargets(placementResult.autoTargetTokenIds ?? []);

    if (
      !isPersistentAreaEffect(ctx?.attack?.areaEffect ?? ctx?.attack?.payload?.areaEffect ?? {})
      && (!Array.isArray(placementResult.targetSnapshots) || placementResult.targetSnapshots.length === 0)
    ) {
      ui.notifications?.warn("Template placement did not affect any targets.");
      return null;
    }

    payload.targetSnapshots = Array.isArray(placementResult.targetSnapshots) ? placementResult.targetSnapshots : [];
    payload.templateGeometry = placementResult.templateGeometry ?? null;
    payload.templatePlacement = placementResult.placement;
    ctx = await resolveIntent({ actor, payload, event });
    rollActor = ctx?.rollActor ?? actor;
  } else if (payload.intent === "attack") {
    delete payload.targetSnapshots;
    delete payload.templatePlacement;
    delete payload.templateGeometry;
  }

  payload = mergeOptionalTraitManualModifiers(
    payload,
    buildOptionalTraitManualModifiers({ actor, rollActor, resolved: ctx, payload })
  );

  /* --------------------------------------------------- */
  /* 2) Collect modifiers (items, status, etc — no UI)  */
  /* --------------------------------------------------- */

  let collected = await collectModifiers({
    actor,
    rollActor,
    machineActor: ctx?.machineActor ?? null,
    rollType: payload.intent,
    skillId: payload.key,
    domains: ctx.domains,
    payload,
    resolved: ctx,
    context: { event }
  });

  /* -------------------------------------- */
  /* 3) Dialog (BEFORE rolling)             */
  /* -------------------------------------- */

  let updatedPayload;
  if (payload.intent === "initiative") {
    updatedPayload = payload;
  } else {
    updatedPayload = await MWDRollDialog.prompt({
      actor,
      rollActor,
      basePayload: payload,
      resolved: ctx,
      diceParts: {
        attribute: ctx?.pool?.attribute ?? 0,
        skill: ctx?.pool?.skill ?? 0,
        bonus: ctx?.pool?.bonus ?? 0,
        specialization: ctx?.pool?.specialization ?? 0
      },
      mods: collected.mods,
      modTotal: collected.total,
    });
    if (!updatedPayload) return null;
  }
  if (applyPlayerPresets && uiState?.subject) {
    await consumeOncePlayerModifierPresets(uiState.subject);
  }

  payload = normalizePayload(updatedPayload);
  ctx = await resolveIntent({ actor, payload, event });
  rollActor = ctx?.rollActor ?? actor;

  if (payload.intent === "attack" && !ctx?.attack?.capabilityReport?.isTemplated) {
    delete payload.targetSnapshots;
    delete payload.templatePlacement;
    delete payload.templateGeometry;
  }

  if (payload.intent === "attack" && payload.weaponId) {
    const weaponItem = actor.items?.get?.(payload.weaponId) ?? null;
    if (weaponItem?.isPersonalWeapon?.()) {
      const selectedPayloadId = String(payload.payloadId ?? "").trim();
      const activePayloadId = String(weaponItem.system?.selectedPayloadUuid || weaponItem.system?.selectedPayloadId || "").trim();
      if (selectedPayloadId && selectedPayloadId !== activePayloadId) {
        await weaponItem.setActivePayload?.(selectedPayloadId);
      }

      if (!weaponItem.canConsumePayload?.({ payloadId: selectedPayloadId })) {
        const payloadState = weaponItem.getPayloadState?.({ payloadId: selectedPayloadId });
        const payloadName = payloadState?.payloadLabel ? ` (${payloadState.payloadLabel})` : "";
        ui.notifications?.warn(`Not enough payload${payloadName} for ${weaponItem.name}.`);
        return null;
      }
    }
  }

  /* -------------------------------------- */
  /* 3.5) Recollect modifiers (final pass) */
  /* -------------------------------------- */

  collected = await collectModifiers({
    actor,
    rollActor,
    machineActor: ctx?.machineActor ?? null,
    rollType: payload.intent,
    skillId: payload.key,
    domains: ctx.domains,
    payload,
    resolved: ctx,
    context: { event }
  });
    
  /* -------------------------------- */
  /* 4) Final modifier collection     */
  /*    (now includes manual mods)    */
  /* -------------------------------- */

  const { mods: providerMods, total: providerTotal } = collected;

  // Manual mods come from the payload editor (dialog)
  const { mods: manualMods, total: manualTotal } = normalizeManualMods(payload);

  // Final mods used for roll + chat
  let mods = [...providerMods, ...manualMods];
  let modTotal = Number(providerTotal ?? 0) + Number(manualTotal ?? 0);

  const basePool =
  Number(ctx?.pool?.attribute ?? 0) +
  Number(ctx?.pool?.skill ?? 0) +
  Number(ctx?.pool?.bonus ?? 0) +
  Number(ctx?.pool?.specialization ?? 0);

  const pool = Math.max(0, basePool + Number(modTotal ?? 0));


 /* --------------------------- */
  /* 5) Edge + target number    */
  /* --------------------------- */

  // Initiative (and other non-skill intents) must not spend Edge.
  // Edge may *later* be used to gain actions, but that's not "roll spend".
  const edgeAllowed = payload.intent !== "initiative";

  const edgeInfo = edgeAllowed ? computeEdgeInfo({ actor: rollActor, ctx, payload }) : null;
  const diceTarget = edgeInfo?.pre?.spent ? 4 : Number(ctx.diceTarget ?? ctx.target ?? 5);

  const runtime = {
    snapshot: game.mwd?.personalCombat?.getSnapshot?.(actor) ?? null,
  };

  let machineRemedySpend = null;
  let machineRemedyContext = null;
  if (ctx.intent === "machineRemedy") {
    machineRemedyContext = await resolveMachineCritIntentContext(payload, {
      gmOverride: Boolean(payload?.gmOverride),
    });
    if (!machineRemedyContext.ok) {
      ui.notifications?.warn(machineRemedyContext.reason ?? "Unable to resolve the machine remedy.");
      return null;
    }

    machineRemedySpend = await commitMachineRemedyCost(machineRemedyContext);
    if (!machineRemedySpend?.ok) {
      ui.notifications?.warn(machineRemedySpend?.reason ?? "Unable to spend the remedy action.");
      return null;
    }
  }

  for (const traitActor of uniqueActors(rollActor, actor)) {
    const traitRuntime = {
      snapshot: game.mwd?.personalCombat?.getSnapshot?.(traitActor) ?? null,
    };
    const traitBuildResult = evaluateTraitPhase({
      actor: traitActor,
      phase: "onBuildRoll",
      facts: buildRollTraitFacts({ actor: traitActor, resolved: ctx, payload, runtime: traitRuntime }),
      packet: {},
      options: { runtime: traitRuntime, consumeUsage: true },
    });
    await applyTraitMutations({ actor: traitActor, mutations: traitBuildResult.mutations, runtime: traitRuntime });
  }

  // Spend pre-edge (once) before rolling
  if (edgeAllowed && edgeInfo?.pre?.spent && edgeInfo?.pre?.poolKey) {
    await rollActor.spendEdge?.(edgeInfo.pre.poolKey, 1);
  }


  /* --------------------------- */
  /* 6) Roll dice (once)        */
  /* --------------------------- */

  let roll;
  let hits = 0;
  let ones = 0;

  if (ctx.rollType === "sum" && ctx.sum?.formula) {

    roll = await new Roll(ctx.sum.formula, ctx.sum.data ?? {}).evaluate();

    const baseTotal = Number(roll.total ?? 0);
    const totalWithMods = baseTotal + Number(modTotal ?? 0);
    hits = totalWithMods; // treat totalWithMods as "hits" for downstream compatibility

  } else {

    roll = await new Roll(`${pool}d6cs>=${diceTarget}`).evaluate();

    const dice = roll.dice?.[0];

    hits = Array.isArray(dice?.results)
      ? dice.results.filter(r => r.success).length
      : 0;

    ones = Array.isArray(dice?.results)
      ? dice.results.filter(r => r.result === 1).length
      : 0;
  }

  if (ctx.intent === "initiative" && roll?.total != null) {
    const initiativePacket = { total: Number(roll.total ?? 0) + Number(modTotal ?? 0) };
    const initiativePhase = evaluateTraitPhase({
      actor,
      phase: "onInitiativeResolved",
      facts: buildInitiativeTraitFacts({ actor, packet: initiativePacket, runtime }),
      packet: initiativePacket,
      options: { runtime, consumeUsage: true },
    });
    await applyTraitMutations({ actor, mutations: initiativePhase.mutations, runtime });

    if (initiativePhase.modifiers.length) {
      const initiativeDelta = initiativePhase.modifiers.reduce((sum, modifier) => sum + Number(modifier.value ?? 0), 0);
      mods = mods.concat(initiativePhase.modifiers);
      modTotal += initiativeDelta;
      hits = Number(initiativePhase.packet.total ?? 0);
      await applyInitiativeToCombat({ actor, total: initiativePhase.packet.total ?? roll.total });
      ctx.breakdown = (ctx.breakdown ?? []).concat(initiativePhase.modifiers.map((modifier, index) => ({
        id: `traitInitiative${index + 1}`,
        label: modifier.label,
        value: Number(modifier.value ?? 0),
      })));
    } else {
      hits = Number(initiativePacket.total ?? 0);
      await applyInitiativeToCombat({ actor, total: initiativePacket.total });
    }
  }

  /* -------------------------------- */
  /* 6.5) Interpret roll outcome      */
  /* -------------------------------- */

  const outcomeModel = interpretOutcome(
    ctx,
    { successes: hits, raw: roll?.toJSON?.() },
    null // opposed rolls can pass defender result later
  );

  const earned = outcomeModel?.edgeEarned;
  // Post-roll Edge can still be chosen from the chat card, so any awarded Edge
  // is recorded with enough detail for the chat action to revoke it first.
  const noEdgeSpent = !edgeInfo?.pre?.spent && !edgeInfo?.post?.spent;
  if (noEdgeSpent && earned?.amount > 0) {
    outcomeModel.edgeEarned = await applyEarnedEdgeAwards({
      actor: rollActor,
      ctx,
      edgeInfo,
      earned,
    });
  } else if (earned?.amount > 0) {
    outcomeModel.edgeEarned = null;
  }

  if (ctx.intent === "overload") {
    await applyOverloadResult({ actor, passed: outcomeModel.passed });
  }

  let heatDangerResult = null;
  if (ctx.intent === "heatDangerCheck") {
    heatDangerResult = await applyHeatDangerCheckOutcome({ actor, ctx, outcomeModel });
  }

  let attackExecution = null;
  let machineRemedyResult = null;
  if (ctx.intent === "attack") {
    attackExecution = await resolveAttackExecution({
      attacker: actor,
      ctx,
      outcomeModel
    });
  } else if (ctx.intent === "machineRemedy") {
    machineRemedyResult = await applyMachineRemedyOutcome(payload, {
      gmOverride: Boolean(payload?.gmOverride),
      passed: Boolean(outcomeModel?.passed),
    });
  }

  let ewAcquireResult = null;
  let ewTargetingResult = null;
  let ewBreakLockResult = null;
  if (ctx.intent === "acquire") {
    ewAcquireResult = await resolveAcquireExecution({ attacker: actor, ctx, outcomeModel });
  }
  if (ctx.intent === "targeting") {
    ewTargetingResult = await resolveTargetingExecution({ attacker: actor, ctx, outcomeModel });
  }
  if (ctx.intent === "skill" && payload.machineActionKey === "breakLock") {
    ewBreakLockResult = await resolveBreakLockExecution({ attacker: actor, payload, ctx, outcomeModel });
  }
  if (ctx.intent === "attack" && ctx.attack?.ewContext?.activePacketId) {
    const attackerToken = getMachineAttackToken(actor, payload);
    const ewCombatant = getAttackerCombatant(attackerToken);
    if (ewCombatant) {
      Hooks.callAll("mwd.beforeTargetingPacketConsume", {
        attacker: actor,
        targetTokenUuid: ctx.attack.ewContext.targetTokenUuid,
        packetId: ctx.attack.ewContext.activePacketId,
        ctx,
      });
      await consumeTargetingPacket(ewCombatant, ctx.attack.ewContext.targetTokenUuid, ctx.attack.ewContext.activePacketId);
    }
  }

  /* --------------------------- */
  /* 7) Build resolved payload  */
  /* --------------------------- */

  const resolved = buildResolved({
    actor,
    payload,
    ctx,
    roll,
    target: diceTarget,
    pool,
    mods,
    modTotal,
    hits,
    ones,
    edge: edgeInfo,
    outcomeModel
  });

  // For mech attacks the roll actor is the pilot, not the machine.
  // Store the pilot's UUID separately so edge operations target the correct actor.
  if (rollActor && rollActor.uuid !== actor.uuid) {
    resolved.rollActorUuid = rollActor.uuid;
  }

  if (attackExecution) {
    resolved.attackResult = attackExecution;
  }
  if (heatDangerResult) {
    resolved.heatDangerResult = heatDangerResult;
  }
  if (ctx.intent === "machineRemedy") {
    resolved.machineRemedy = ctx.machineRemedy ?? null;
    resolved.machineRemedyResult = {
      ...(machineRemedyResult ?? { ok: false, reason: "Machine remedy result missing." }),
      spend: machineRemedySpend,
      context: machineRemedyContext,
    };
  }
  if (ewAcquireResult)   resolved.ewAcquireResult  = ewAcquireResult;
  if (ewTargetingResult) resolved.ewTargetingResult = ewTargetingResult;
  if (ewBreakLockResult) resolved.ewBreakLockResult = ewBreakLockResult;
  if (ctx.acquire)   resolved.acquire   = ctx.acquire;
  if (ctx.targeting) resolved.targeting = ctx.targeting;

  /* --------------------------- */
  /* 8) Render chat             */
  /* --------------------------- */

  const html = await renderChat({ resolved });

  if (payload.intent === "attack" && payload.weaponId) {
    const weaponItem = actor.items?.get?.(payload.weaponId) ?? null;
    if (weaponItem?.isPersonalWeapon?.()) {
      const consumed = await weaponItem.consumePayload?.({ payloadId: payload.payloadId });
      if (!consumed) {
        ui.notifications?.warn(`Payload could not be consumed for ${weaponItem.name}.`);
      }
    }
  }

  if (ctx.intent === "attack" && actor.type === "battlemech") {
    const weaponIds = Array.from(new Set([
      ...((ctx?.attack?.weapon?.machineWeaponGroup?.weaponIds ?? []).map(id => String(id ?? "").trim()).filter(Boolean)),
      ...(payload?.weaponId ? [String(payload.weaponId).trim()] : []),
    ]));
    try {
      await recordBattlemechAttackHeat(actor, {
        weaponIds,
        attackProfile: ctx?.attack?.weapon ?? null,
        reason: "attack resolution",
      });
    } catch (error) {
      console.warn("MWD | Unable to record BattleMech attack heat", error);
    }
  }

  if (ctx.intent === "attack") {
    await commitMachineAttackAction(actor, payload, { rollActor });
  } else if (ctx.intent === "acquire") {
    await commitMachineAction(actor, "acquireTarget", payload, { rollActor, resolved: ctx });
  } else if (ctx.intent === "targeting") {
    await commitMachineAction(actor, "generateFireSolution", payload, { rollActor, resolved: ctx });
  } else if (ctx.intent === "skill" && payload.machineActionKey) {
    await commitMachineAction(actor, payload.machineActionKey, payload, { rollActor, resolved: ctx });
  }

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: html,
    rolls: roll ? [roll] : [],
    flags: {
      mwd: {
        payload,
        resolved
      }
    }
  });
}


/* ----------------------------- */
/* Edge computation              */
/* ----------------------------- */

function computeEdgeInfo({ actor, ctx, payload }) {
  const domain = pickEdgeDomain(ctx?.domains);
  const pair = EDGE_POOLS_BY_DOMAIN[domain] ?? null;

  const a = pair?.a ?? null;
  const b = pair?.b ?? null;

  const allowedPrePools = [a, b].filter(Boolean);

  // ---- PRE ----
  const wantsPre = Boolean(payload?.toggles?.useEdge) || Boolean(payload?.useEdge);
  let prePoolKey = String(payload?.edge?.pre?.poolKey ?? "").trim() || null;

  // validate pre poolKey against domain
  if (prePoolKey && !allowedPrePools.includes(prePoolKey)) prePoolKey = null;

  // pre spent is driven by "wantsPre" AND having a valid poolKey
  const preSpent = wantsPre && prePoolKey ? 1 : 0;

  // ---- POST (Option B) ----
  // if preSpent, post must be the other pool; else user can choose either later.
  let allowedPostPools = [...allowedPrePools];
  if (preSpent && prePoolKey) allowedPostPools = allowedPostPools.filter(k => k !== prePoolKey);

  // keep payload-selected post if present (used by chat post actions)
  let postPoolKey = String(payload?.edge?.post?.poolKey ?? "").trim() || null;
  if (postPoolKey && !allowedPostPools.includes(postPoolKey)) postPoolKey = null;

  const postSpent = Number(payload?.edge?.post?.spent ?? 0) ? 1 : 0;

  return {
    domain,
    pools: pair ? { a, b } : null,
    pre: { poolKey: prePoolKey, spent: preSpent },
    post: { poolKey: postPoolKey, spent: postSpent },
    allowed: { prePools: allowedPrePools, postPools: allowedPostPools }
  };
}


function pickEdgeDomain(domains) {
  if (!Array.isArray(domains)) return null;
  if (domains.includes("physical")) return "physical";
  if (domains.includes("mental")) return "mental";
  if (domains.includes("social")) return "social";
  return null;
}

const EDGE_POOLS_BY_DOMAIN = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};

async function applyInitiativeToCombat({ actor, total }) {
  const unit = PersonalCombatTracker.resolveActivationUnit?.({ actor }) ?? null;
  if (unit?.combatant) {
    await unit.combatant.update({ initiative: Number(total) });
    return;
  }

  // Require token (Option 3A)
  const controlled = canvas?.tokens?.controlled?.find(t => t.actor?.id === actor.id);
  const fallback = actor.getActiveTokens?.(true, true)?.[0] ?? null;
  const token = controlled ?? fallback;

  if (!token) {
    ui.notifications?.warn("Initiative requires a token on the current scene.");
    return;
  }

  let combat = game.combat;

  if (!combat) {
    combat = await Combat.create({
      scene: canvas.scene.id,
      active: true
    });
  }

  let combatant = combat.combatants.find(c => c.tokenId === token.id);

  if (!combatant) {
    const created = await combat.createEmbeddedDocuments("Combatant", [{
      tokenId: token.id,
      actorId: actor.id,
      sceneId: canvas.scene.id
    }]);
    combatant = created?.[0];
  }

  if (!combatant) return;

  await combatant.update({ initiative: Number(total) });
}

async function applyOverloadResult({ actor, passed }) {
  if (!passed) {
    await actor.update({ "system.burn.overloaded": true });
  }
}
