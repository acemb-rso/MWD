// src/modules/harm/queued-attack-damage.js
// Purpose: Owns chat-card queued attack damage mechanics behind the harm façade.
// How it fits: Chat handlers ask for message update data; harm/roll internals
// stay behind service boundaries.

import { TEMPLATE } from "../core/constants.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { resolveMachineOperator } from "../mwd/machine-operator.js";
import { parseOnHitEffect, summarizeAttackDamageResult } from "../roll/attack-resolution.js";
import { renderChat } from "../roll/renderers/render-chat.js";
import { adjustBattlemechPendingHeat } from "../mwd/machine-heat.js";
import { HarmEngine } from "./harm-engine.js";

export function isMachineDamageMutation(mutation = {}) {
  return mutation?.type === "machineAttackDamage" || mutation?.payload?.mode === "machineAttackDamage";
}

function isPersonalDamageMutation(mutation = {}) {
  return !isMachineDamageMutation(mutation)
    && (mutation?.type === "attackDamage" || mutation?.payload?.mode === "attackDamage");
}

export function getMutationTargetActorUuid(mutation = {}) {
  return mutation?.targetActorUuid ?? mutation?.target?.actorUuid ?? null;
}

export function getMutationTargetTokenUuid(mutation = {}) {
  return mutation?.targetTokenUuid ?? mutation?.target?.tokenUuid ?? null;
}

function syncMachineMutationPreview(mutation = {}, summary = {}) {
  if (!isMachineDamageMutation(mutation)) return mutation;
  const previewRevision = Math.max(0, Math.trunc(Number(mutation?.payload?.previewRevision ?? mutation?.previewRevision ?? summary?.previewRevision ?? 0) || 0));
  const preparedCriticalRecords = Array.isArray(summary?.critical?.records)
    ? foundry.utils.deepClone(summary.critical.records).map(record => ({ ...record, previewRevision }))
    : [];
  mutation.type = "machineAttackDamage";
  mutation.targetActorUuid = getMutationTargetActorUuid(mutation);
  mutation.targetTokenUuid = getMutationTargetTokenUuid(mutation);
  mutation.hitLocation = summary?.hitLocation ?? mutation.hitLocation ?? mutation.payload?.hitLocation ?? null;
  mutation.damagePreview = summary?.damagePreview ?? null;
  mutation.critical = summary?.critical ?? null;
  mutation.preparedCriticalRecords = preparedCriticalRecords;
  mutation.reliabilityOptions = summary?.reliabilityOptions ?? null;
  mutation.previewRevision = previewRevision;
  mutation.preview = summary;
  mutation.payload ??= {};
  mutation.payload.previewRevision = previewRevision;
  mutation.payload.hitLocation = mutation.hitLocation;
  mutation.payload.preparedCriticalRecords = preparedCriticalRecords;
  return mutation;
}

function syncPersonalMutationPreview(mutation = {}, summary = {}) {
  if (!isPersonalDamageMutation(mutation)) return mutation;
  const previewRevision = Math.max(0, Math.trunc(Number(mutation?.payload?.previewRevision ?? mutation?.previewRevision ?? summary?.previewRevision ?? 0) || 0));
  const preparedCriticalRecords = Array.isArray(summary?.critical?.records)
    ? foundry.utils.deepClone(summary.critical.records).map(record => ({ ...record, previewRevision }))
    : [];
  mutation.type = "attackDamage";
  mutation.targetActorUuid = getMutationTargetActorUuid(mutation);
  mutation.targetTokenUuid = getMutationTargetTokenUuid(mutation);
  mutation.critical = summary?.critical ?? null;
  mutation.preparedCriticalRecords = preparedCriticalRecords;
  mutation.previewRevision = previewRevision;
  mutation.preview = summary;
  mutation.payload ??= {};
  mutation.payload.previewRevision = previewRevision;
  mutation.payload.criticalPreview = summary?.critical ?? null;
  mutation.payload.preparedCriticalRecords = preparedCriticalRecords;
  return mutation;
}

export async function rebuildQueuedAttackDamagePreview({ mutation = {}, result = {}, targetActor = null, targetToken = null } = {}) {
  if (!isMachineDamageMutation(mutation)) return { ok: false, reason: "not-machine-damage" };
  mutation.previewRevision = Math.max(0, Math.trunc(Number(mutation.previewRevision ?? mutation.payload?.previewRevision ?? 0) || 0)) + 1;
  mutation.payload ??= {};
  mutation.payload.previewRevision = mutation.previewRevision;
  delete mutation.payload.preparedCriticalRecords;
  mutation.preparedCriticalRecords = [];
  mutation.damagePreview = null;
  mutation.critical = null;
  mutation.reliabilityOptions = null;

  const previewResult = await HarmEngine.apply({
    actor: targetActor,
    token: targetToken,
    payload: mutation.payload,
    options: {
      actorId: targetActor?.id ?? "",
      dryRun: true,
      logToChat: false
    }
  });

  const summary = summarizeAttackDamageResult(
    previewResult,
    result?.target ?? mutation.target ?? {},
    result?.damage ?? {},
    { queued: true, applied: false }
  );
  syncMachineMutationPreview(mutation, summary);
  return { ok: true, summary };
}

async function spendMachineChaosCriticalEdge({ machineActor = null, operatorActorUuid = "" } = {}) {
  const operator = await resolveMachineOperator({ machineActor, operatorActorUuid });
  if (!operator.actor) {
    if (game.user?.isGM) return { ok: true, gmOverride: true };
    return { ok: false, reason: operator.reason || "No linked operator or pilot actor for Chaos Edge." };
  }

  const pool = TEMPLATE.counters.edgePools.chaos;
  const remaining = Number(operator.actor.getRemainingEdge?.(pool) ?? operator.actor.getEdgePoolValue?.(pool) ?? 0);
  if (remaining <= 0 && !game.user?.isGM) {
    return { ok: false, reason: `${operator.actor.name ?? "Operator"} has no Chaos Edge remaining.` };
  }

  if (remaining > 0) {
    await operator.actor.spendEdge?.(pool, 1, { source: "machineChaosCritical" });
  }
  return { ok: true, operatorActor: operator.actor };
}

function isPersonalActor(actor) {
  return actor?.type === TEMPLATE.actorTypes.character || actor?.type === TEMPLATE.actorTypes.npc;
}

function isMachineActorType(actor) {
  return actor?.type === TEMPLATE.actorTypes.battlemech || actor?.type === TEMPLATE.actorTypes.vehicle;
}

async function applyOnHitEffect({ targetActor, targetToken, onHitEffect, source = "" } = {}) {
  if (!onHitEffect || !targetActor) return;
  const effect = parseOnHitEffect(onHitEffect);
  if (!effect) return;

  if (effect.kind === "onFire") {
    await HarmEngine.apply({
      actor: targetActor,
      token: targetToken,
      payload: { mode: "status", statusId: "onFire", active: true, source },
      options: { logToChat: false },
    });
    return;
  }

  if (effect.kind === "status" && effect.statusId) {
    await HarmEngine.apply({
      actor: targetActor,
      token: targetToken,
      payload: { mode: "status", statusId: effect.statusId, active: true, source },
      options: { logToChat: false },
    });
    return;
  }

  if (effect.kind === "burn" && isPersonalActor(targetActor)) {
    await HarmEngine.apply({
      actor: targetActor,
      token: targetToken,
      payload: { mode: "burnDelta", delta: effect.amount, source },
      options: { logToChat: false },
    });
  } else if (effect.kind === "heat" && isMachineActorType(targetActor)) {
    await adjustBattlemechPendingHeat(targetActor, effect.amount, { reason: source || "weapon hit effect" });
  }
}

async function applyQueuedAttackDamageAtIndex(resolved, resultIndex) {
  const result = resolved?.attackResult?.results?.[resultIndex] ?? null;
  const mutation = result?.queuedMutation ?? null;
  if (!mutation) {
    return { ok: false, reason: "no-queued-damage", userMessage: "No queued attack damage to apply." };
  }
  if (mutation.applied) {
    return { ok: true, skipped: true, reason: "already-applied", userMessage: "That attack damage has already been applied." };
  }

  let targetActor = null;
  let targetToken = null;
  targetActor = getMutationTargetActorUuid(mutation) ? await fromUuid(getMutationTargetActorUuid(mutation)) : null;
  targetToken = getMutationTargetTokenUuid(mutation) ? await fromUuid(getMutationTargetTokenUuid(mutation)) : null;

  if (result?.evadeActive && targetActor) {
    const spend = await PersonalCombatTracker.commitReactionSpend(targetActor, {
      token: targetToken,
      actionId: "evade",
      actionLabel: "Evade",
      actionCategory: "reaction",
      logLabel: `Evade: ${mutation.target?.name ?? result?.target?.name ?? "Target"}`,
      edgePoolKey: String(result?.evadeEdgePoolKey ?? "").trim(),
    });
    if (!spend?.ok) {
      return { ok: false, reason: "evade-spend-failed", userMessage: spend?.reason ?? "Unable to spend the Evade reaction." };
    }
    await PersonalCombatTracker.clearPendingReaction(targetActor, { token: targetToken });
  }

  if (isMachineDamageMutation(mutation) && mutation.payload?.chaosCriticalSelected) {
    const spend = await spendMachineChaosCriticalEdge({
      machineActor: targetActor,
      operatorActorUuid: mutation.payload?.operatorActorUuid,
    });
    if (!spend.ok) return spend;
  }

  if (isMachineDamageMutation(mutation)) {
    mutation.payload ??= {};
    mutation.payload.applied = Boolean(mutation.applied);
    mutation.payload.previewRevision = Math.max(0, Math.trunc(Number(mutation.previewRevision ?? mutation.payload.previewRevision ?? 0) || 0));
    mutation.payload.preparedCriticalRecords = Array.isArray(mutation.preparedCriticalRecords)
      ? foundry.utils.deepClone(mutation.preparedCriticalRecords)
      : (Array.isArray(mutation.payload.preparedCriticalRecords) ? mutation.payload.preparedCriticalRecords : []);
  }
  if (isPersonalDamageMutation(mutation)) {
    mutation.payload ??= {};
    mutation.payload.applied = Boolean(mutation.applied);
    mutation.payload.previewRevision = Math.max(0, Math.trunc(Number(mutation.previewRevision ?? mutation.payload.previewRevision ?? 0) || 0));
    mutation.payload.preparedCriticalRecords = Array.isArray(mutation.preparedCriticalRecords)
      ? foundry.utils.deepClone(mutation.preparedCriticalRecords)
      : (Array.isArray(mutation.payload.preparedCriticalRecords) ? mutation.payload.preparedCriticalRecords : []);
  }

  const applyResult = await HarmEngine.apply({
    actor: targetActor,
    token: targetToken,
    payload: mutation.payload ?? {},
    options: {
      actorId: targetActor?.id ?? "",
      logToChat: false
    }
  });

  const summary = summarizeAttackDamageResult(
    applyResult,
    result?.target ?? mutation.target ?? {},
    result?.damage ?? {},
    { queued: false, applied: Boolean(applyResult?.ok) }
  );

  if (!applyResult?.ok) {
    return { ok: false, reason: "harm-apply-failed", userMessage: summary.reason ?? "Unable to apply attack damage." };
  }

  const onHitEffect = mutation.payload?.onHitEffect ?? null;
  if (onHitEffect) {
    try {
      await applyOnHitEffect({
        targetActor,
        targetToken,
        onHitEffect,
        source: mutation.payload?.source ?? "",
      });
    } catch (error) {
      console.warn("MWD | Failed to apply on-hit effect", onHitEffect, error);
    }
  }

  mutation.applied = true;
  mutation.appliedResult = summary;
  if (isMachineDamageMutation(mutation)) {
    mutation.payload.applied = true;
    mutation.payload.appliedResult = summary;
    syncMachineMutationPreview(mutation, summary);
    mutation.applied = true;
    mutation.appliedResult = summary;
  }
  if (isPersonalDamageMutation(mutation)) {
    mutation.payload.applied = true;
    mutation.payload.appliedResult = summary;
    syncPersonalMutationPreview(mutation, summary);
    mutation.applied = true;
    mutation.appliedResult = summary;
  }
  result.queuedMutation = mutation;
  result.damageResult = summary;
  result.evadeApplied = Boolean(result.evadeActive);

  resolved.edge ??= {};
  resolved.edge.availableActions = {
    ...(resolved.edge.availableActions ?? {}),
    canSpendPost: false,
    canPostRerollFailures: false
  };

  return {
    ok: true,
    applied: true,
    summary,
    targetActor,
    targetToken
  };
}

export async function applyQueuedAttackDamageFromMessage({ message = null, resultIndex } = {}) {
  if (!message) throw new Error("Queued attack damage requires a chat message.");
  const normalizedIndex = Number(resultIndex);
  if (!Number.isInteger(normalizedIndex) || normalizedIndex < 0) {
    throw new Error(`Invalid queued attack damage result index: ${resultIndex}`);
  }

  const resolved = foundry.utils.deepClone(message?.flags?.mwd?.resolved);
  if (!resolved) return { ok: false, reason: "missing-resolved", userMessage: "Roll data is no longer available." };

  const result = await applyQueuedAttackDamageAtIndex(resolved, normalizedIndex);
  if (!result.ok || result.skipped) return result;

  const content = await renderChat({ resolved });
  return {
    ...result,
    resolved,
    content,
    updateData: {
      content,
      "flags.mwd.resolved": resolved,
    },
  };
}

export async function applyAllQueuedAttackDamageFromMessage({ message = null } = {}) {
  if (!message) throw new Error("Queued attack damage requires a chat message.");
  const resolved = foundry.utils.deepClone(message?.flags?.mwd?.resolved);
  if (!resolved) return { ok: false, reason: "missing-resolved", userMessage: "Roll data is no longer available." };

  const results = Array.isArray(resolved?.attackResult?.results) ? resolved.attackResult.results : [];
  const pendingIndexes = results
    .map((result, index) => ({ result, index }))
    .filter(({ result }) => result?.queuedMutation && !result.queuedMutation.applied)
    .map(({ index }) => index);

  if (!pendingIndexes.length) {
    return { ok: false, reason: "none-pending", userMessage: "No queued attack damage remains to apply." };
  }

  let applied = 0;
  const failures = [];
  const appliedResults = [];
  for (const resultIndex of pendingIndexes) {
    const result = await applyQueuedAttackDamageAtIndex(resolved, resultIndex);
    if (result.ok && result.applied) {
      applied += 1;
      appliedResults.push(result);
    } else if (!result.ok) {
      failures.push(result.userMessage ?? result.reason ?? `Target ${resultIndex + 1} failed.`);
    }
  }

  if (applied <= 0) {
    return { ok: false, reason: "none-applied", userMessage: failures[0] ?? "Unable to apply queued attack damage." };
  }

  const content = await renderChat({ resolved });
  return {
    ok: true,
    applied,
    failures,
    appliedResults,
    resolved,
    content,
    updateData: {
      content,
      "flags.mwd.resolved": resolved,
    },
  };
}

export const QueuedAttackDamageActions = Object.freeze({
  applyQueuedAttackDamageFromMessage,
  applyAllQueuedAttackDamageFromMessage,
  rebuildQueuedAttackDamagePreview,
  isMachineDamageMutation,
  getMutationTargetActorUuid,
  getMutationTargetTokenUuid,
});
