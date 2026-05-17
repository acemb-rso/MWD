// src/modules/mwd/machine-quick-actions.js
// Purpose: Executes shared machine quick checks for piloting, EW, and critical repair.
// How it fits: Sheets choose the requested action or issue; this layer emits the
// canonical roll intent payloads into the shared roll engine.

import { MWD } from "../config.js";
import { TEMPLATE } from "../constants.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { performBattlemechMeleeAttack } from "./battlemech-melee-actions.js";
import { performBattlemechMovementAction } from "./battlemech-movement-actions.js";
import { performBattlemechRangedAttack } from "./battlemech-ranged-actions.js";
import { buildMachineEwPanel, resolveMachineEwActionTarget } from "./machine-ew-panel.js";
import { getMachineActionDefinition } from "./machine-action-catalog.js";
import { findAssetModuleActionOverride } from "./asset-module-effects.js";
import { buildBattlemechHeatModel, resolveBattlemechPendingHeat } from "./machine-heat.js";
import { prepareMachineRemedyRoll } from "./machine-intents.js";
import { resolveMachineOperator } from "./machine-operator.js";
import { resolveMachineSceneToken } from "./machine-token-resolution.js";
import { getMachineRepairIssues } from "./machine-repair-issues.js";
import { performVehicleMovementAction } from "./vehicle-movement-actions.js";
import { resolveVehiclePendingStrain } from "./vehicle-strain.js";

function getMachineRollApi() {
  return game.mwd?.roll ?? game.system?.mwd?.roll ?? null;
}

function getRollUnavailableResult() {
  const reason = "MWD roll system not initialized.";
  ui.notifications?.error(reason);
  return { ok: false, reason };
}

function assertMachineActionActor(actor) {
  if (!actor) throw new Error("MWD machine action requires actor.");
}

function normalizeMachineActionRequest(request = {}) {
  if (!request || typeof request !== "object") {
    throw new Error("MWD machine action request must be an object.");
  }
  const kind = String(request.kind ?? "").trim();
  if (!kind) throw new Error("MWD machine action request requires kind.");
  return { ...request, kind };
}

function assertMachineActionResult(result, kind) {
  if (!result || typeof result !== "object" || typeof result.ok !== "boolean") {
    throw new Error(`MWD machine action "${kind}" returned an invalid result.`);
  }
  if (result.ok === false && !String(result.reason ?? "").trim()) {
    throw new Error(`MWD machine action "${kind}" returned a failure without reason.`);
  }
  return result;
}

async function executeRollPayload(actor, payload, event = null) {
  const rollApi = getMachineRollApi();
  if (!rollApi?.execute) return getRollUnavailableResult();
  const value = await rollApi.execute({ actor, payload, event });
  return { ok: true, value };
}

async function executeMachineAttack(actor, request) {
  const attackKind = String(request.attackKind ?? request.actionId ?? "").trim();
  const operatorActorUuid = String(request.operatorActorUuid ?? "").trim();
  const token = request.token ?? resolveMachineSceneToken(actor);
  const sourceType = String(request.sourceType ?? "").trim();
  const sourceId = String(request.sourceId ?? request.itemId ?? request.weaponId ?? "").trim();

  if (sourceType === "mechWeapon" || sourceId) {
    if (!sourceId) throw new Error("Machine mechWeapon attack requires sourceId.");
    return executeRollPayload(actor, {
      intent: "attack",
      sourceType: "mechWeapon",
      sourceId,
      weaponId: sourceId,
      edge: { pool: "physical.grit", allowed: ["pre", "post"] },
      tags: ["combat", "attack", "machine"],
      sourceTokenId: token?.id ?? null,
      operatorActorUuid,
    }, request.event);
  }

  if (attackKind === "melee") {
    if (typeof actor.rollMeleeAttack === "function" && !request.profile && !request.profileId) {
      const value = await actor.rollMeleeAttack({ operatorActorUuid });
      return { ok: true, value };
    }
    return performBattlemechMeleeAttack(actor, {
      profile: request.profile ?? null,
      profileId: request.profileId ?? "",
      operatorActorUuid,
    });
  }

  const groupId = String(request.groupId ?? "").trim();
  if (attackKind === "ranged" || attackKind === "group" || groupId) {
    if (typeof actor.rollRangedAttack === "function" && !request.group && !request.token) {
      const value = await actor.rollRangedAttack({ groupId, operatorActorUuid });
      return { ok: true, value };
    }
    return performBattlemechRangedAttack(actor, {
      group: request.group ?? null,
      groupId,
      token,
      operatorActorUuid,
    });
  }

  throw new Error(`Unknown machine attack kind: ${attackKind || "(empty)"}`);
}

async function executeMachineMovement(actor, request) {
  const movementKind = String(request.movementKind ?? request.actionId ?? "").trim();
  if (!movementKind) throw new Error("Machine movement action requires movementKind or actionId.");
  const options = {
    movementKind,
    operatorActorUuid: String(request.operatorActorUuid ?? "").trim(),
  };
  if (actor?.type === TEMPLATE.actorTypes.vehicle) return performVehicleMovementAction(actor, options);
  if (actor?.type === TEMPLATE.actorTypes.battlemech) return performBattlemechMovementAction(actor, options);
  return { ok: false, reason: "actor-not-machine", userMessage: "That actor is not a machine." };
}

async function executeMachineEwIntent(actor, request) {
  const intent = String(request.intent ?? "").trim();
  if (intent !== "acquire" && intent !== "targeting") return null;

  const token = request.token ?? resolveMachineSceneToken(actor);
  const panel = buildMachineEwPanel({ actor, token });
  const explicitTargetTokenUuid = String(request.targetTokenUuid ?? "").trim();
  const explicitTargetTokenId = String(request.targetTokenId ?? "").trim();
  const targetRow = explicitTargetTokenUuid || explicitTargetTokenId
    ? (panel.rows ?? []).find(row =>
      (explicitTargetTokenUuid && row?.targetTokenUuid === explicitTargetTokenUuid)
      || (explicitTargetTokenId && row?.targetTokenId === explicitTargetTokenId)
    ) ?? null
    : resolveMachineEwActionTarget(panel, intent);
  if (!targetRow) {
    const verb = intent === "targeting" ? "generate targeting data" : "acquire";
    return { ok: false, reason: "missing-target", userMessage: `No targeted token is ready to ${verb}.` };
  }

  const isEligible = intent === "targeting" ? targetRow.canTarget : targetRow.canAcquire;
  if (!isEligible) {
    return {
      ok: false,
      reason: "target-not-eligible",
      userMessage: intent === "targeting"
        ? "That target is not ready for targeting data yet."
        : "That target cannot advance its detection state right now.",
    };
  }

  return executeRollPayload(actor, {
    intent,
    sourceTokenId: token?.id ?? null,
    targetTokenId: targetRow.targetTokenId,
    targetTokenUuid: targetRow.targetTokenUuid,
    operatorActorUuid: String(request.operatorActorUuid ?? "").trim(),
  }, request.event);
}

async function executeMachineHeatDangerCheck(actor, request) {
  const checkKind = String(request.checkKind ?? request.actionId ?? "").trim();
  if (!["shutdown", "explosion"].includes(checkKind)) {
    return { ok: false, reason: "unknown-heat-danger-check", userMessage: "Unknown heat danger check." };
  }

  const heat = buildBattlemechHeatModel(actor);
  if (!heat.inDanger || !heat.dangerChecks) {
    return {
      ok: false,
      reason: "heat-not-in-danger",
      userMessage: "Heat danger checks are only available while the BattleMech is in Danger heat.",
    };
  }

  const dn = checkKind === "shutdown"
    ? Math.max(1, Number(heat.dangerChecks.shutdownDN ?? 1) || 1)
    : Math.max(1, Number(heat.dangerChecks.explosionDN ?? 1) || 1);

  const token = request.token ?? resolveMachineSceneToken(actor);
  return executeRollPayload(actor, {
    intent: "heatDangerCheck",
    checkKind,
    dn,
    tags: ["machine", "heat", "danger", checkKind],
    edge: { allowed: [] },
    sourceTokenId: token?.id ?? null,
  }, request.event);
}

export async function executeMachineQuickAction(actor, request = {}) {
  assertMachineActionActor(actor);
  const normalized = normalizeMachineActionRequest(request);
  let result;

  switch (normalized.kind) {
    case "attack":
      result = await executeMachineAttack(actor, normalized);
      break;
    case "movement":
      result = await executeMachineMovement(actor, normalized);
      break;
    case "piloting":
      result = await performMachinePilotingCheck(actor, {
        operatorActorUuid: normalized.operatorActorUuid,
      });
      break;
    case "ew":
      result = await executeMachineEwIntent(actor, normalized)
        ?? await performMachineElectronicWarfare(actor, {
          action: normalized.action ?? null,
          actionId: normalized.actionId ?? "",
          token: normalized.token ?? null,
          operatorActorUuid: normalized.operatorActorUuid,
        });
      break;
    case "repair":
      result = await performMachineCriticalRepair(actor, {
        issue: normalized.issue ?? null,
        issueKind: normalized.issueKind ?? "",
        issueId: normalized.issueId ?? "",
        remedyKey: normalized.remedyKey ?? "",
        operatorActorUuid: normalized.operatorActorUuid,
      });
      break;
    case "heatDangerCheck":
      result = await executeMachineHeatDangerCheck(actor, normalized);
      break;
    case "resolvePendingHeat":
      result = await resolveBattlemechPendingHeat(actor, {
        token: normalized.token ?? null,
        source: normalized.source ?? normalized.reason ?? "sheet control",
        activation: normalized.activation ?? null,
        postDangerCard: normalized.postDangerCard ?? true,
      });
      break;
    case "resolvePendingStrain":
      result = await resolveVehiclePendingStrain(actor, {
        reason: normalized.reason ?? "sheet control",
      });
      break;
    default:
      throw new Error(`Unknown machine action kind: ${normalized.kind}`);
  }

  return assertMachineActionResult(result, normalized.kind);
}

export const MachineActions = Object.freeze({
  execute: executeMachineQuickAction,
});

function getActionCostLabel(action = {}) {
  if (action.category === "reaction") return "Reaction";
  if (!action.cost) return action.category === "narrative" ? "Narrative" : "Free";
  return `${action.cost} ${String(action.resource ?? "sa").toUpperCase()}`;
}

function getEwActionTypeLabel(action = {}) {
  if (action.category === "complex") return "Complex";
  if (action.category === "reaction") return "Reaction";
  if (action.resource === "fa") return "FA";
  return getActionCostLabel(action);
}

function buildEwAction({
  id,
  purpose = "",
  targetMode = "none",
  execution = "skill",
  enabled = true,
  reason = "",
  mechanics = "",
} = {}) {
  const action = getMachineActionDefinition(id);
  return {
    id,
    actionKey: action.key,
    intent: action.intent || id,
    label: action.label,
    actionType: getEwActionTypeLabel(action),
    attributeKey: action.attributeKey,
    skillKey: action.skillKey,
    targetMode,
    execution,
    purpose: purpose || action.notes,
    hint: [
      getEwActionTypeLabel(action),
      action.attributeKey && action.skillKey ? `${action.attributeKey} + ${action.skillKey}` : "",
      purpose || action.notes,
      mechanics,
    ].filter(Boolean).join(" | "),
    disabled: !enabled,
    reason: reason || (!enabled ? "This EW action is not available right now." : ""),
    mechanics,
  };
}

function getAnyEwTarget(panel = {}) {
  return Array.isArray(panel?.rows) ? panel.rows.find(row => row?.targetTokenUuid || row?.targetTokenId) ?? null : null;
}

async function recordMachineActionCost(actor, action, { token = null, operatorActorUuid = "" } = {}) {
  const override = findAssetModuleActionOverride(actor, action?.key, {
    payload: { actionId: action?.key },
  });
  const effectiveAction = override
    ? {
      ...action,
      cost: Number.isFinite(Number(override.cost)) ? Math.max(0, Number(override.cost)) : action.cost,
      resource: String(override.resource ?? action.resource ?? "sa").trim() || "sa",
      category: String(override.category ?? action.category ?? "simple").trim() || "simple",
    }
    : action;
  if (!effectiveAction?.cost) return { ok: true, skipped: true };

  const operator = await resolveMachineOperator({
    machineActor: actor,
    operatorActorUuid,
  });
  const spendActor = operator?.actor ?? actor;
  const snapshot = PersonalCombatTracker.getSnapshot?.(spendActor, { token }) ?? null;
  if (!snapshot?.hasCombatant) return { ok: true, skipped: true };

  const spend = await PersonalCombatTracker.spendResource(spendActor, {
    token,
    resource: effectiveAction.resource,
    cost: effectiveAction.cost,
    actionId: effectiveAction.key,
    actionLabel: effectiveAction.label,
    actionCostLabel: getActionCostLabel(effectiveAction),
    actionCategory: effectiveAction.category,
  });
  if (!spend?.ok) ui.notifications?.warn(spend?.reason ?? `Unable to record ${effectiveAction.label}.`);
  return spend;
}

export async function performMachinePilotingCheck(actor, { operatorActorUuid = "" } = {}) {
  const rollApi = getMachineRollApi();
  if (!rollApi?.execute) return getRollUnavailableResult();

  await rollApi.execute({
    actor,
    payload: {
      intent: "skill",
      key: "piloting",
      attrKey: "reflexes",
      machineAttributeKey: TEMPLATE.actorAttributes.handling,
      operatorActorUuid: String(operatorActorUuid ?? "").trim(),
      quickAction: { title: MWD.actor.vehicle.quickActions.pilotingCheck },
      edge: { allowed: ["pre", "post"] },
      tags: ["machine", "skill"],
    }
  });

  return { ok: true };
}

export function buildMachineEwActionChoices(actor, { token = null, includeDisabled = false } = {}) {
  const sourceToken = token ?? resolveMachineSceneToken(actor);
  const panel = buildMachineEwPanel({ actor, token: sourceToken });
  const hasTargets = Boolean(panel.hasTargets);
  const actions = [
    buildEwAction({
      id: "sensorSweep",
      purpose: "General scan: reveal hidden units, detect signatures, identify contacts, and read the battlefield.",
      targetMode: "none",
      execution: "skill",
    }),
    buildEwAction({
      id: "acquireTarget",
      purpose: "Improve detection state on the first eligible targeted token.",
      targetMode: "acquire",
      execution: "intent",
      enabled: panel.canAcquireAny,
      reason: "No targeted token can currently advance detection state.",
      mechanics: "Automated detection-state update on success.",
    }),
    buildEwAction({
      id: "generateFireSolution",
      purpose: "Create short-lived targeting data from an existing Track or Lock.",
      targetMode: "targeting",
      execution: "intent",
      enabled: panel.canTargetAny,
      reason: "Track or Lock is required before generating targeting data.",
      mechanics: "Automated targeting-data packet on success.",
    }),
    buildEwAction({
      id: "ecmSpike",
      purpose: "Offensive EW: jam or disrupt a specific target.",
      targetMode: "any",
      execution: "skill",
      enabled: hasTargets,
      reason: "Target a token before launching an ECM Spike.",
      mechanics: "Roll only; ECM state effects are not automated yet.",
    }),
    buildEwAction({
      id: "epmFilter",
      purpose: "Defensive remediation: remove or reduce ECM Jamming.",
      targetMode: "none",
      execution: "skill",
      mechanics: "Roll only unless launched as a critical/status remedy.",
    }),
    buildEwAction({
      id: "breakLock",
      purpose: "Defensive reaction: degrade an attacker's detection state.",
      targetMode: "anyOptional",
      execution: "skill",
      mechanics: "Roll only; detection-state degradation is not automated yet.",
    }),
    buildEwAction({
      id: "suppressBeacon",
      purpose: "Suppress beacon-based targeting support such as NARC or TAG.",
      targetMode: "any",
      execution: "skill",
      enabled: hasTargets,
      reason: "Target a token before suppressing a beacon.",
      mechanics: "Roll only; beacon suppression is not automated yet.",
    }),
    buildEwAction({
      id: "swat",
      purpose: "Physical removal action for BattleArmor, NARC, or similar attachments.",
      targetMode: "anyOptional",
      execution: "skill",
      mechanics: "Roll only; removal is handled narratively or by status changes.",
    }),
    buildEwAction({
      id: "tagTarget",
      purpose: "Apply a TAG enabler flag for guided systems.",
      targetMode: "any",
      execution: "skill",
      enabled: hasTargets,
      reason: "Target a token before using TAG.",
      mechanics: "Roll only; TAG flags are not automated yet.",
    }),
    buildEwAction({
      id: "shareTargetingData",
      purpose: "Share best detection state and best eligible packet through C3 or a similar network.",
      targetMode: "none",
      execution: "narrative",
      mechanics: "Provider-driven; no roll required.",
    }),
  ];

  return includeDisabled ? actions : actions.filter(action => !action.disabled);
}

export async function performMachineElectronicWarfare(actor, {
  action = null,
  actionId = "",
  token = null,
  operatorActorUuid = "",
} = {}) {
  const sourceToken = token ?? resolveMachineSceneToken(actor);
  const panel = buildMachineEwPanel({ actor, token: sourceToken });
  const actions = buildMachineEwActionChoices(actor, { token: sourceToken, includeDisabled: true });
  const selectedAction = action
    ?? actions.find(entry => String(entry.id ?? "").trim() === String(actionId ?? "").trim())
    ?? (actions.length === 1 ? actions[0] : null);

  if (!selectedAction || selectedAction.disabled) {
    const reason = MWD.actor.vehicle.quickActions.errors.noSensorSweep;
    ui.notifications?.warn(selectedAction?.reason || reason);
    return { ok: false, reason };
  }

  let targetRow = null;
  if (selectedAction.targetMode === "acquire" || selectedAction.targetMode === "targeting") {
    targetRow = resolveMachineEwActionTarget(panel, selectedAction.intent);
  } else if (selectedAction.targetMode === "any" || selectedAction.targetMode === "anyOptional") {
    targetRow = getAnyEwTarget(panel);
  }

  if ((selectedAction.targetMode === "acquire" || selectedAction.targetMode === "targeting" || selectedAction.targetMode === "any") && !targetRow) {
    const reason = "No targeted token is ready for that EW action.";
    ui.notifications?.warn(reason);
    return { ok: false, reason };
  }

  if (selectedAction.execution === "narrative") {
    const actionDef = getMachineActionDefinition(selectedAction.actionKey);
    const spend = await recordMachineActionCost(actor, actionDef, { token: sourceToken, operatorActorUuid });
    if (spend && spend.ok === false) return spend;
    ui.notifications?.info(`${selectedAction.label}: ${selectedAction.mechanics || "No roll required."}`);
    return { ok: true, action: selectedAction, target: targetRow, narrative: true };
  }

  const rollApi = getMachineRollApi();
  if (!rollApi?.execute) return getRollUnavailableResult();

  const payload = selectedAction.execution === "intent"
    ? {
      intent: selectedAction.intent,
      sourceTokenId: sourceToken?.id ?? null,
      targetTokenId: targetRow?.targetTokenId ?? null,
      targetTokenUuid: targetRow?.targetTokenUuid ?? null,
      operatorActorUuid: String(operatorActorUuid ?? "").trim(),
    }
    : {
      intent: "skill",
      key: selectedAction.skillKey,
      attrKey: selectedAction.attributeKey,
      machineAttributeKey: selectedAction.attributeKey,
      operatorActorUuid: String(operatorActorUuid ?? "").trim(),
      sourceTokenId: sourceToken?.id ?? null,
      targetTokenId: targetRow?.targetTokenId ?? null,
      targetTokenUuid: targetRow?.targetTokenUuid ?? null,
      machineActionKey: selectedAction.actionKey,
      quickAction: {
        title: selectedAction.label,
        ewAction: {
          id: selectedAction.id,
          actionType: selectedAction.actionType,
          purpose: selectedAction.purpose,
          mechanics: selectedAction.mechanics,
        },
      },
      edge: { allowed: ["pre", "post"] },
      tags: ["machine", "ew", selectedAction.id],
    };

  await rollApi.execute({
    actor,
    payload,
  });

  return { ok: true, action: selectedAction, target: targetRow };
}

export function buildMachineCriticalRepairIssues(actor) {
  return getMachineRepairIssues(actor);
}

export async function performMachineCriticalRepair(actor, {
  issue = null,
  issueKind = "",
  issueId = "",
  remedyKey = "",
  operatorActorUuid = "",
} = {}) {
  const issues = buildMachineCriticalRepairIssues(actor);
  const selectedIssue = issue
    ?? issues.find(entry =>
      String(entry.issueKind ?? "").trim() === String(issueKind ?? "").trim()
      && String(entry.issueId ?? "").trim() === String(issueId ?? "").trim()
    )
    ?? (issues.length === 1 ? issues[0] : null);

  if (!selectedIssue) {
    const reason = "No active criticals or repairable statuses are available.";
    ui.notifications?.warn(reason);
    return { ok: false, reason };
  }

  const request = await prepareMachineRemedyRoll({
    machineActorUuid: actor?.uuid ?? "",
    issueKind: selectedIssue.issueKind,
    issueId: selectedIssue.issueId,
    critId: selectedIssue.issueKind === "crit" ? selectedIssue.issueId : "",
    statusId: selectedIssue.issueKind === "status" ? selectedIssue.issueId : "",
    remedyKey: String(remedyKey ?? "").trim() || selectedIssue.remedyKey,
    operatorActorUuid: String(operatorActorUuid ?? "").trim(),
  }, {
    gmOverride: Boolean(game.user?.isGM),
  });

  if (!request.ok) {
    ui.notifications?.warn(request.reason ?? "Unable to launch the critical repair action.");
    return request;
  }

  const rollApi = getMachineRollApi();
  if (!rollApi?.execute) return getRollUnavailableResult();

  await rollApi.execute({
    actor: request.actor,
    payload: request.payload,
  });

  return { ok: true, issue: selectedIssue, request };
}
