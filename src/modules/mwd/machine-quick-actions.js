// src/modules/mwd/machine-quick-actions.js
// Purpose: Executes shared machine quick checks for piloting, EW, and critical repair.
// How it fits: Sheets choose the requested action or issue; this layer emits the
// canonical roll intent payloads into the shared roll engine.

import { MWD } from "../config.js";
import { TEMPLATE } from "../constants.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { buildMachineEwPanel, resolveMachineEwActionTarget } from "./machine-ew-panel.js";
import { getMachineActionDefinition } from "./machine-action-catalog.js";
import { prepareMachineRemedyRoll } from "./machine-intents.js";
import { resolveMachineOperator } from "./machine-operator.js";
import { resolveMachineSceneToken } from "./machine-token-resolution.js";
import { getMachineRepairIssues } from "./machine-repair-issues.js";

function getMachineRollApi() {
  return game.mwd?.roll ?? game.system?.mwd?.roll ?? null;
}

function getRollUnavailableResult() {
  const reason = "MWD roll system not initialized.";
  ui.notifications?.error(reason);
  return { ok: false, reason };
}

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
  if (!action?.cost) return { ok: true, skipped: true };

  const operator = await resolveMachineOperator({
    machineActor: actor,
    operatorActorUuid,
  });
  const spendActor = operator?.actor ?? actor;
  const snapshot = PersonalCombatTracker.getSnapshot?.(spendActor, { token }) ?? null;
  if (!snapshot?.hasCombatant) return { ok: true, skipped: true };

  const spend = await PersonalCombatTracker.spendResource(spendActor, {
    token,
    resource: action.resource,
    cost: action.cost,
    actionId: action.key,
    actionLabel: action.label,
    actionCostLabel: getActionCostLabel(action),
    actionCategory: action.category,
  });
  if (!spend?.ok) ui.notifications?.warn(spend?.reason ?? `Unable to record ${action.label}.`);
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
    remedyKey: selectedIssue.remedyKey,
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
