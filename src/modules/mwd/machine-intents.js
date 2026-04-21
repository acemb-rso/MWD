// src/modules/mwd/machine-intents.js
// Purpose: Resolves machine remedy intent context, spending, and outcome mutation.
// How it fits: Sheets/chat emit tiny remedy payloads while the roll engine keeps
// the machine-side authority and state changes centralized.

import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { SYSTEM_NAME } from "../constants.js";
import { applyManagedStatusUpdate } from "../dialog/token-status-dialog.js";
import { MACHINE_CRITICAL_STATUS_ID } from "./critical-hits.js";
import {
  getMachineCritRemedy,
  getMachineRemedyBaseDn,
  getMachineRemedyEffect,
  getMachineRemedySkillKey,
} from "./machine-crit-remedies.js";
import { getRepairableMachineStatusIssue } from "./machine-repair-issues.js";
import { resolveMachineOperator } from "./machine-operator.js";
import {
  getMachineConditionLabel,
  getMachineConditionModifier,
  normalizeMachineDegradationState,
} from "./machine-degradation.js";

async function syncStatusOnRemedyOutcome(machineActor, clearedCrit, updatedCrits) {
  const remainingActive = updatedCrits.filter(c => c?.active !== false);

  if (!remainingActive.length) {
    try {
      await applyManagedStatusUpdate({ actor: machineActor, statusId: MACHINE_CRITICAL_STATUS_ID, active: false });
    } catch (error) {
      console.warn("MWD | Unable to clear machine critical status", error);
    }
  }

  const clearedStatusId = String(clearedCrit?.statusId ?? "").trim();
  if (!clearedStatusId) return;
  const stillNeeded = remainingActive.some(c => String(c?.statusId ?? "").trim() === clearedStatusId);
  if (stillNeeded) return;
  try {
    await applyManagedStatusUpdate({ actor: machineActor, statusId: clearedStatusId, active: false });
  } catch (error) {
    console.warn(`MWD | Unable to remove crit status "${clearedStatusId}"`, error);
  }
}

async function resolveUuid(uuid = "") {
  const value = String(uuid ?? "").trim();
  if (!value || typeof fromUuid !== "function") return null;
  try {
    return await fromUuid(value);
  } catch (_error) {
    return null;
  }
}



function buildRemedyUpdate(crit, { passed = false, actorUuid = "", gmOverride = false } = {}) {
  if (!passed) {
    return {
      ...crit,
      lastRemedyAttemptAt: new Date().toISOString(),
      lastRemedyPassed: false,
      lastRemedyActorUuid: actorUuid,
      lastRemedyOverride: gmOverride && !actorUuid,
    };
  }

  return {
    ...crit,
    active: false,
    resolvedAt: new Date().toISOString(),
    resolvedBy: actorUuid,
    resolvedByOverride: gmOverride && !actorUuid,
    lastRemedyAttemptAt: new Date().toISOString(),
    lastRemedyPassed: true,
    lastRemedyActorUuid: actorUuid,
    lastRemedyOverride: gmOverride && !actorUuid,
  };
}

async function updateStatusRemedyMetadata(machineActor, statusId, {
  passed = false,
  actorUuid = "",
  gmOverride = false,
} = {}) {
  const normalizedStatusId = String(statusId ?? "").trim();
  if (!machineActor || !normalizedStatusId) return null;

  const current = foundry.utils.deepClone(machineActor.getFlag(SYSTEM_NAME, "statusRemedyMeta") ?? {});
  current[normalizedStatusId] = {
    ...(current[normalizedStatusId] ?? {}),
    lastRemedyAttemptAt: new Date().toISOString(),
    lastRemedyPassed: passed,
    lastRemedyActorUuid: actorUuid,
    lastRemedyOverride: gmOverride && !actorUuid,
    ...(passed ? {
      resolvedAt: new Date().toISOString(),
      resolvedBy: actorUuid,
      resolvedByOverride: gmOverride && !actorUuid,
    } : {}),
  };
  await machineActor.setFlag(SYSTEM_NAME, "statusRemedyMeta", current);
  return current[normalizedStatusId];
}

export async function resolveMachineCritIntentContext(intent = {}, options = {}) {
  const issueKind = String(
    intent.issueKind
    ?? (intent.statusId ? "status" : "crit")
  ).trim() || "crit";
  const issueId = String(
    intent.issueId
    ?? (issueKind === "status" ? intent.statusId : intent.critId)
    ?? ""
  ).trim();
  const gmOverride = Boolean(options.gmOverride ?? globalThis.game?.user?.isGM);

  const machineActor = await resolveUuid(intent.machineActorUuid);
  if (!machineActor) return { ok: false, reason: "Machine actor could not be resolved." };
  const operator = await resolveMachineOperator({
    machineActor,
    operatorActorUuid: intent.operatorActorUuid,
  });

  if (!operator.actor && !gmOverride) {
    return { ok: false, reason: operator.reason || "No linked operator or pilot actor." };
  }

  if (issueKind === "status") {
    const statusIssue = getRepairableMachineStatusIssue(machineActor, issueId);
    if (!statusIssue) return { ok: false, reason: "That status is not currently repairable." };

    const remedy = getMachineCritRemedy(intent.remedyKey || statusIssue.remedyKey);
    if (remedy.remediable === false) {
      return { ok: false, reason: "That status has no field remedy." };
    }

    return {
      ok: true,
      issueKind,
      issueId: statusIssue.issueId,
      machineActor,
      statusId: statusIssue.statusId,
      issue: statusIssue,
      remedy,
      operatorActor: operator.actor ?? null,
      operator,
      gmOverride,
      rollingActor: operator.actor ?? machineActor,
      locationKey: "",
      locationCondition: 0,
      locationConditionLabel: "",
      locationConditionModifier: 0,
      skillKey: statusIssue.remedySkillKey,
      baseDn: statusIssue.remedyBaseDn,
      totalDn: statusIssue.totalDn,
      remedyEffect: { onSuccess: "clear", onFailure: "noChange" },
    };
  }

  const crits = Array.isArray(machineActor.system?.mwd?.crits)
    ? machineActor.system.mwd.crits.slice()
    : [];
  const index = crits.findIndex(crit => String(crit?.id ?? "") === issueId && crit?.active !== false);
  if (index < 0) return { ok: false, reason: "That critical effect is no longer active." };

  const crit = crits[index];
  const remedy = getMachineCritRemedy(intent.remedyKey || crit.remedyKey);
  if (remedy.remediable === false) {
    return { ok: false, reason: "That critical effect has no field remedy." };
  }

  const normalized = normalizeMachineDegradationState(
    globalThis.foundry?.utils?.deepClone?.(machineActor.system ?? {}) ?? structuredClone(machineActor.system ?? {}),
    machineActor.type,
  );
  const locationKey = String(crit.locationKey ?? "").trim();
  const location = normalized.mwd?.locations?.[locationKey] ?? {};
  const condition = Number(location?.condition ?? 0) || 0;
  const conditionModifier = getMachineConditionModifier(condition);
  const skillKey = getMachineRemedySkillKey(crit, remedy);
  const baseDn = getMachineRemedyBaseDn(crit, remedy);
  const effect = getMachineRemedyEffect(crit);

  return {
    ok: true,
    issueKind: "crit",
    issueId: crit.id,
    machineActor,
    crit,
    critIndex: index,
    remedy,
    operatorActor: operator.actor ?? null,
    operator,
    gmOverride,
    rollingActor: operator.actor ?? machineActor,
    locationKey,
    locationCondition: condition,
    locationConditionLabel: getMachineConditionLabel(condition),
    locationConditionModifier: conditionModifier,
    skillKey,
    baseDn,
    totalDn: baseDn + conditionModifier,
    remedyEffect: effect,
  };
}

export async function prepareMachineRemedyRoll(intent = {}, options = {}) {
  const context = await resolveMachineCritIntentContext(intent, options);
  if (!context.ok) return context;

  return {
    ok: true,
    actor: context.rollingActor,
    payload: {
      intent: "machineRemedy",
      machineActorUuid: context.machineActor.uuid ?? intent.machineActorUuid ?? "",
      issueKind: context.issueKind ?? "crit",
      issueId: context.issueId ?? context.crit?.id ?? context.statusId ?? "",
      critId: context.crit?.id ?? "",
      statusId: context.statusId ?? "",
      remedyKey: context.remedy.key,
      operatorActorUuid: context.operatorActor?.uuid ?? "",
      gmOverride: context.gmOverride,
      tags: ["machine", "remedy"],
      edge: { allowed: ["pre", "post"] },
    },
    context,
  };
}

export async function commitMachineRemedyCost(context = {}, options = {}) {
  if (!context?.ok && !context?.machineActor) {
    return { ok: false, reason: "Machine remedy context is not available." };
  }

  if (!context.operatorActor || context.gmOverride) {
    return { ok: true, skipped: true };
  }

  const spender = options.spendResource ?? PersonalCombatTracker.spendResource.bind(PersonalCombatTracker);
  return await spender(context.operatorActor, {
    resource: context.remedy.resource,
    cost: context.remedy.cost,
    actionId: context.remedy.actionId,
    actionLabel: context.remedy.actionLabel,
    actionCostLabel: `${context.remedy.cost} SA`,
    actionCategory: context.remedy.category,
  });
}

export async function applyMachineRemedyOutcome(intent = {}, options = {}) {
  const context = await resolveMachineCritIntentContext(intent, options);
  if (!context.ok) return context;

  const passed = Boolean(options.passed);
  const effect = context.remedyEffect ?? getMachineRemedyEffect(context.crit);

  if (context.issueKind === "status") {
    const applied = passed && effect.onSuccess === "clear";
    const metadata = await updateStatusRemedyMetadata(context.machineActor, context.statusId, {
      passed: applied,
      actorUuid: context.operatorActor?.uuid ?? "",
      gmOverride: context.gmOverride,
    });

    if (applied) {
      await applyManagedStatusUpdate({
        actor: context.machineActor,
        statusId: context.statusId,
        active: false,
      });
    }

    return {
      ok: true,
      passed,
      applied,
      machineActor: context.machineActor,
      operatorActor: context.operatorActor,
      statusId: context.statusId,
      remedy: context.remedy,
      context,
      metadata,
    };
  }

  const crits = Array.isArray(context.machineActor.system?.mwd?.crits)
    ? context.machineActor.system.mwd.crits.slice()
    : [];

  const current = crits[context.critIndex];
  if (!current || current.active === false) {
    return { ok: false, reason: "That critical effect is no longer active." };
  }

  const nextCrit = buildRemedyUpdate(current, {
    passed: passed && effect.onSuccess === "clear",
    actorUuid: context.operatorActor?.uuid ?? "",
    gmOverride: context.gmOverride,
  });
  crits[context.critIndex] = nextCrit;

  await context.machineActor.update({ "system.mwd.crits": crits });
  await syncStatusOnRemedyOutcome(context.machineActor, nextCrit, crits);

  return {
    ok: true,
    passed,
    applied: passed && effect.onSuccess === "clear",
    machineActor: context.machineActor,
    operatorActor: context.operatorActor,
    crit: nextCrit,
    remedy: context.remedy,
    context,
  };
}

export async function resolveMachineCritRemedyIntent(intent = {}, options = {}) {
  if (String(intent?.intent ?? "") !== "machine_crit_remedy") {
    return { ok: false, reason: "Unsupported machine intent." };
  }

  const context = await resolveMachineCritIntentContext(intent, options);
  if (!context.ok) return context;

  const spend = await commitMachineRemedyCost(context, options);
  if (!spend?.ok) return { ok: false, reason: spend?.reason ?? "Unable to spend the remedy action." };

  const result = await applyMachineRemedyOutcome(intent, { ...options, passed: true });
  return {
    ...result,
    spend,
  };
}
