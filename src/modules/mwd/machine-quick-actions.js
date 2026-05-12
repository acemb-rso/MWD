// src/modules/mwd/machine-quick-actions.js
// Purpose: Executes shared machine quick checks for piloting, EW, and critical repair.
// How it fits: Sheets choose the requested action or issue; this layer emits the
// canonical roll intent payloads into the shared roll engine.

import { MWD } from "../config.js";
import { TEMPLATE } from "../constants.js";
import { buildMachineEwPanel, resolveMachineEwActionTarget } from "./machine-ew-panel.js";
import { prepareMachineRemedyRoll } from "./machine-intents.js";
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

export function buildMachineEwActionChoices(actor, { token = null } = {}) {
  const sourceToken = token ?? resolveMachineSceneToken(actor);
  const panel = buildMachineEwPanel({ actor, token: sourceToken });
  return [
    {
      id: "acquire",
      intent: "acquire",
      label: "Acquire Target",
      hint: "Advance detection state on the first eligible targeted token.",
      disabled: !panel.canAcquireAny,
    },
    {
      id: "targeting",
      intent: "targeting",
      label: "Generate Fire Solution",
      hint: "Create targeting data for the first eligible targeted token.",
      disabled: !panel.canTargetAny,
    },
  ].filter(action => !action.disabled);
}

export async function performMachineElectronicWarfare(actor, {
  action = null,
  actionId = "",
  token = null,
  operatorActorUuid = "",
} = {}) {
  const sourceToken = token ?? resolveMachineSceneToken(actor);
  const panel = buildMachineEwPanel({ actor, token: sourceToken });
  const actions = buildMachineEwActionChoices(actor, { token: sourceToken });
  const selectedAction = action
    ?? actions.find(entry => String(entry.id ?? "").trim() === String(actionId ?? "").trim())
    ?? (actions.length === 1 ? actions[0] : null);

  if (!selectedAction) {
    const reason = MWD.actor.vehicle.quickActions.errors.noSensorSweep;
    ui.notifications?.warn(reason);
    return { ok: false, reason };
  }

  const targetRow = resolveMachineEwActionTarget(panel, selectedAction.intent);
  if (!targetRow) {
    const reason = "No targeted token is ready for that EW action.";
    ui.notifications?.warn(reason);
    return { ok: false, reason };
  }

  const rollApi = getMachineRollApi();
  if (!rollApi?.execute) return getRollUnavailableResult();

  await rollApi.execute({
    actor,
    payload: {
      intent: selectedAction.intent,
      sourceTokenId: sourceToken?.id ?? null,
      targetTokenId: targetRow.targetTokenId,
      targetTokenUuid: targetRow.targetTokenUuid,
      operatorActorUuid: String(operatorActorUuid ?? "").trim(),
    }
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
