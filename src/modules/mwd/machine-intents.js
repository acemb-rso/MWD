// src/modules/mwd/machine-intents.js
// Purpose: Resolves machine remedy intent context, spending, and outcome mutation.
// How it fits: Sheets/chat emit tiny remedy payloads while the roll engine keeps
// the machine-side authority and state changes centralized.

import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { SYSTEM_NAME, SYSTEM_SOCKET } from "../constants.js";
import { applyManagedStatusUpdate } from "../dialog/token-status-dialog.js";
import { RemoteCall } from "../remotecall.js";
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

const GM_MACHINE_REMEDY_REQUEST = "MachineIntents.gmMachineRemedyRequest";
const GM_MACHINE_REMEDY_RESPONSE = "MachineIntents.gmMachineRemedyResponse";
const GM_MACHINE_REMEDY_TIMEOUT_MS = 10000;
const pendingGmMachineRemedyRequests = new Map();
let gmMachineRemedySocketRegistered = false;

function getActorIdentityKeys(actor = null) {
  const keys = new Set();
  const add = value => {
    const normalized = String(value ?? "").trim();
    if (normalized) keys.add(normalized);
  };

  add(actor?.id);
  add(actor?._id);
  add(actor?.uuid);
  add(actor?.actor?.id);
  add(actor?.actor?.uuid);
  add(actor?.baseActor?.id);
  add(actor?.baseActor?.uuid);
  return keys;
}

function actorsMatch(left = null, right = null) {
  if (!left || !right) return false;
  const rightKeys = getActorIdentityKeys(right);
  for (const key of getActorIdentityKeys(left)) {
    if (rightKeys.has(key)) return true;
  }
  return false;
}

function getUserById(userId = "") {
  const id = String(userId ?? "").trim();
  if (!id) return null;
  const users = globalThis.game?.users;
  if (typeof users?.get === "function") return users.get(id) ?? null;
  return Array.from(users ?? []).find(user => String(user?.id ?? "") === id) ?? null;
}

function userCanOperateAsActor(user = null, actor = null) {
  if (!user || !actor) return false;
  if (user.isGM) return true;

  if (typeof actor.testUserPermission === "function") {
    const ownerLevel = globalThis.CONST?.DOCUMENT_OWNERSHIP_LEVELS?.OWNER ?? 3;
    try {
      if (actor.testUserPermission(user, ownerLevel)) return true;
    } catch (_error) {
      // Fall through to character identity matching.
    }
  }

  return actorsMatch(actor, user.character);
}

function buildSerializableRemedyIntent(intent = {}) {
  return {
    machineActorUuid: String(intent.machineActorUuid ?? "").trim(),
    issueKind: String(intent.issueKind ?? "").trim(),
    issueId: String(intent.issueId ?? "").trim(),
    critId: String(intent.critId ?? "").trim(),
    statusId: String(intent.statusId ?? "").trim(),
    remedyKey: String(intent.remedyKey ?? "").trim(),
    operatorActorUuid: String(intent.operatorActorUuid ?? "").trim(),
  };
}

function buildRemedyIntentFromContext(context = {}) {
  return buildSerializableRemedyIntent({
    machineActorUuid: context.machineActor?.uuid ?? "",
    issueKind: context.issueKind ?? "crit",
    issueId: context.issueId ?? context.crit?.id ?? context.statusId ?? "",
    critId: context.crit?.id ?? "",
    statusId: context.statusId ?? "",
    remedyKey: context.remedy?.key ?? "",
    operatorActorUuid: context.operatorActor?.uuid ?? "",
  });
}

function serializeSpendResult(result = {}) {
  return {
    ok: Boolean(result?.ok),
    skipped: Boolean(result?.skipped),
    reason: String(result?.reason ?? "").trim(),
    burnDelta: Math.max(0, Number(result?.burnDelta ?? 0) || 0),
    finalCost: Math.max(0, Number(result?.finalCost ?? 0) || 0),
    costLabel: String(result?.costLabel ?? "").trim(),
  };
}

function serializeRemedyOutcome(result = {}) {
  return {
    ok: Boolean(result?.ok),
    reason: String(result?.reason ?? "").trim(),
    passed: Boolean(result?.passed),
    applied: Boolean(result?.applied),
    issueKind: String(result?.context?.issueKind ?? "").trim(),
    issueId: String(result?.context?.issueId ?? result?.critId ?? result?.statusId ?? "").trim(),
    critId: String(result?.critId ?? result?.context?.crit?.id ?? "").trim(),
    statusId: String(result?.statusId ?? result?.context?.statusId ?? "").trim(),
    remedyKey: String(result?.remedy?.key ?? result?.context?.remedy?.key ?? "").trim(),
    remedyLabel: String(result?.remedy?.label ?? result?.context?.remedy?.label ?? "").trim(),
  };
}

function getRequestId() {
  return globalThis.foundry?.utils?.randomID?.()
    ?? globalThis.crypto?.randomUUID?.()
    ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function isNonGmUser() {
  return Boolean(globalThis.game?.user) && !globalThis.game.user.isGM;
}

function resolvePendingGmMachineRemedyRequest(data = {}) {
  const requestId = String(data?.requestId ?? "").trim();
  const userId = String(data?.userId ?? "").trim();
  if (!requestId || userId !== String(game?.user?.id ?? "")) return;

  const pending = pendingGmMachineRemedyRequests.get(requestId);
  if (!pending) return;

  clearTimeout(pending.timeout);
  pendingGmMachineRemedyRequests.delete(requestId);
  pending.resolve(data.result ?? { ok: false, reason: "GM operation returned no result." });
}

async function requestGmMachineRemedyOperation(operation = "", payload = {}) {
  const requestId = getRequestId();
  const userId = String(game?.user?.id ?? "").trim();
  if (!userId) return { ok: false, reason: "No active user for GM operation." };

  const result = await new Promise(resolve => {
    const timeout = setTimeout(() => {
      pendingGmMachineRemedyRequests.delete(requestId);
      resolve({ ok: false, reason: "No active GM responded to the machine remedy request." });
    }, GM_MACHINE_REMEDY_TIMEOUT_MS);

    pendingGmMachineRemedyRequests.set(requestId, { resolve, timeout });
    const sent = RemoteCall.call(GM_MACHINE_REMEDY_REQUEST, {
      requestId,
      userId,
      operation,
      payload,
    });

    if (!sent) {
      clearTimeout(timeout);
      pendingGmMachineRemedyRequests.delete(requestId);
      resolve({ ok: false, reason: "No remote GM is available for that machine remedy request." });
    }
  });

  return result;
}

async function authorizeGmMachineRemedyRequest(data = {}) {
  const requester = getUserById(data.userId);
  if (!requester) return { ok: false, reason: "Requesting user could not be resolved." };

  const intent = buildSerializableRemedyIntent(data.payload?.intent ?? {});
  const context = await resolveMachineCritIntentContext(intent, { gmOverride: false });
  if (!context.ok) return context;

  if (!context.operatorActor) {
    return { ok: false, reason: "Machine remedy requires a linked pilot or operator." };
  }
  if (!userCanOperateAsActor(requester, context.operatorActor)) {
    return { ok: false, reason: "You do not control the assigned pilot or operator for this machine." };
  }

  return { ok: true, intent, context };
}

async function handleGmMachineRemedyRequest(data = {}) {
  if (!game?.user?.isGM) return;

  let result;
  try {
    const authorized = await authorizeGmMachineRemedyRequest(data);
    if (!authorized.ok) {
      result = { ok: false, reason: authorized.reason ?? "Machine remedy request was not authorized." };
    } else if (data.operation === "spendCost") {
      const spend = await commitMachineRemedyCostLocal(authorized.context);
      result = serializeSpendResult(spend);
    } else if (data.operation === "applyOutcome") {
      const outcome = await applyMachineRemedyOutcomeLocal(authorized.intent, {
        passed: Boolean(data.payload?.passed),
        gmOverride: false,
      });
      result = serializeRemedyOutcome(outcome);
    } else {
      result = { ok: false, reason: `Unknown machine remedy GM operation: ${data.operation}` };
    }
  } catch (error) {
    console.error("MWD | GM machine remedy request failed", error);
    result = { ok: false, reason: error?.message ?? "Machine remedy GM operation failed." };
  }

  game.socket?.emit?.(SYSTEM_SOCKET, {
    msg: GM_MACHINE_REMEDY_RESPONSE,
    data: {
      requestId: data.requestId,
      userId: data.userId,
      result,
    },
  });
}

export async function registerMachineIntentGmOperations() {
  if (gmMachineRemedySocketRegistered) return;
  gmMachineRemedySocketRegistered = true;

  await RemoteCall.register(GM_MACHINE_REMEDY_REQUEST, {
    condition: user => user.isGM,
    multiple: false,
    callback: data => { void handleGmMachineRemedyRequest(data); },
  });
  await RemoteCall.register(GM_MACHINE_REMEDY_RESPONSE, {
    condition: () => true,
    multiple: true,
    callback: data => resolvePendingGmMachineRemedyRequest(data),
  });
}

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

async function commitMachineRemedyCostLocal(context = {}, options = {}) {
  if (!context?.ok && !context?.machineActor) {
    return { ok: false, reason: "Machine remedy context is not available." };
  }

  if (!context.operatorActor) {
    return { ok: true, skipped: true };
  }

  const spender = options.spendResource ?? PersonalCombatTracker.spendResource.bind(PersonalCombatTracker);
  const resource = String(context.remedy.resource ?? "sa").trim() || "sa";
  const cost = Math.max(0, Number(context.remedy.cost ?? 0) || 0);
  return await spender(context.operatorActor, {
    resource,
    cost,
    actionId: context.remedy.actionId,
    actionLabel: context.remedy.actionLabel,
    actionCostLabel: `${cost} ${resource.toUpperCase()}`,
    actionCategory: context.remedy.category,
  });
}

export async function commitMachineRemedyCost(context = {}, options = {}) {
  if (isNonGmUser() && !options.spendResource) {
    return requestGmMachineRemedyOperation("spendCost", {
      intent: buildRemedyIntentFromContext(context),
    });
  }

  return commitMachineRemedyCostLocal(context, options);
}

async function applyMachineRemedyOutcomeLocal(intent = {}, options = {}) {
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

export async function applyMachineRemedyOutcome(intent = {}, options = {}) {
  if (isNonGmUser() && !options.forceLocal) {
    return requestGmMachineRemedyOperation("applyOutcome", {
      intent: buildSerializableRemedyIntent(intent),
      passed: Boolean(options.passed),
    });
  }

  return applyMachineRemedyOutcomeLocal(intent, options);
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
