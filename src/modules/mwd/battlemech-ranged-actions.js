// src/modules/mwd/battlemech-ranged-actions.js
// Purpose: Builds and executes BattleMech ranged weapon-group quick actions.
// Workflow: sheet/group button -> fire-mode execution plan -> roll intent
// emission, resource spend, and combat-tracker weapon-group lockout.

import { MWD } from "../core/config.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { prepareBattlemechWeaponGroups } from "./battlemech-weapon-groups.js";
import { DEFAULT_FIRE_MODE, getFireModeDefinition } from "./battlemech-fire-modes.js";
import { getMachineAttackActionCost } from "./machine-crit-effects.js";
import { resolveMachineOperator } from "./machine-operator.js";
import { resolveMachineSceneToken } from "./machine-token-resolution.js";

function getMachineRollApi() {
  return game.mwd?.roll ?? game.system?.mwd?.roll ?? null;
}

export function buildBattlemechRangedAttackGroups(actor = null, { token = null } = {}) {
  // The same actor can be rendered outside its active combat turn; only current
  // turn snapshots provide weapon-group usage lockouts.
  const sourceToken = token ?? resolveMachineSceneToken(actor);
  const snapshot = PersonalCombatTracker.getSnapshot?.(actor, { token: sourceToken }) ?? null;
  const usedWeaponGroupIds = snapshot?.isCurrentTurn
    ? PersonalCombatTracker.getUsedWeaponGroupIds?.(actor, { token: sourceToken, snapshot }) ?? []
    : [];
  const fireMode = actor?.system?.mwd?.fireMode ?? DEFAULT_FIRE_MODE;

  return prepareBattlemechWeaponGroups(actor, { usedWeaponGroupIds, fireMode, token: sourceToken });
}

function buildGroupAttackPayload(group, {
  sourceToken = null,
  operatorActorUuid = "",
  fireMode = DEFAULT_FIRE_MODE,
} = {}) {
  return {
    intent: "attack",
    sourceType: "weaponGroup",
    sourceId: group.id,
    weaponGroupId: group.id,
    fireMode,
    machineActionPrecommitted: true,
    edge: { pool: "physical.grit", allowed: ["pre", "post"] },
    tags: ["combat", "attack", "machine", "groupFire", fireMode],
    sourceTokenId: sourceToken?.id ?? null,
    operatorActorUuid: String(operatorActorUuid ?? "").trim(),
  };
}

function validateGroupForAttack(group = null) {
  if (!group) return "That weapon group is no longer available.";
  if (!group.isAttackLegal || !group.isAvailableThisActivation) {
    return group.disableReason || "That weapon group cannot attack right now.";
  }
  return "";
}

function buildExecutionPlan({ fireMode = DEFAULT_FIRE_MODE, selectedGroup = null, groups = [] } = {}) {
  // Fire modes expand a button press into one or more roll executions. Resource
  // spend is committed after at least one roll completes, so cancelled dialogs
  // do not consume actions.
  const availableGroups = groups.filter(group => group.isAttackLegal && group.isAvailableThisActivation);
  if (fireMode === "alphaStrike") {
    if (availableGroups.length > 0) {
      return { ok: true, reason: "", steps: availableGroups.map(group => ({ group })) };
    }
    const firstBlockedReason = selectedGroup?.disableReason
      || groups.find(g => g.disableReason)?.disableReason
      || "No available weapon groups to fire.";
    return { ok: false, reason: firstBlockedReason, steps: [] };
  }

  const selectedReason = validateGroupForAttack(selectedGroup);
  if (selectedReason) return { ok: false, reason: selectedReason, steps: [] };

  if (fireMode === "rapidFire") {
    if (!selectedGroup.rapidFire?.eligible) {
      return {
        ok: false,
        reason: selectedGroup.rapidFire?.reason || "Not rapid-fire capable.",
        steps: [],
      };
    }
    const repeatCount = Math.max(1, Number(selectedGroup.rapidFire?.repeatCount ?? 1) || 1);
    return {
      ok: true,
      reason: "",
      steps: Array.from({ length: repeatCount }, () => ({ group: selectedGroup })),
    };
  }

  return {
    ok: true,
    reason: "",
    steps: [{ group: selectedGroup }],
  };
}

export async function performBattlemechRangedAttack(actor, {
  group = null,
  groupId = "",
  token = null,
  operatorActorUuid = "",
} = {}) {
  const groups = buildBattlemechRangedAttackGroups(actor, { token });
  const fireMode = String(actor?.system?.mwd?.fireMode ?? DEFAULT_FIRE_MODE).trim() || DEFAULT_FIRE_MODE;
  const fireModeDef = getFireModeDefinition(fireMode);
  if (fireModeDef.id !== fireMode || !fireModeDef.implemented) {
    const reason = fireModeDef.id !== fireMode
      ? `Unknown BattleMech fire mode: ${fireMode}.`
      : `${fireModeDef.label} is not implemented yet.`;
    ui.notifications?.warn(reason);
    return { ok: false, reason };
  }

  const normalizedGroupId = String(groupId ?? group?.id ?? "").trim();
  const selectedGroup = group
    ?? groups.find(entry => String(entry?.id ?? "").trim() === normalizedGroupId)
    ?? null;

  const plan = buildExecutionPlan({ fireMode: fireModeDef.id, selectedGroup, groups });
  if (!plan.ok) {
    const reason = plan.reason || (normalizedGroupId ? "That weapon group is no longer available." : MWD.actor.vehicle.quickActions.errors.noRanged);
    ui.notifications?.warn(reason);
    return { ok: false, reason };
  }

  const rollApi = getMachineRollApi();
  if (!rollApi?.execute) {
    const reason = "MWD roll system not initialized.";
    ui.notifications?.error(reason);
    return { ok: false, reason };
  }

  const sourceToken = token ?? resolveMachineSceneToken(actor);
  const operator = await resolveMachineOperator({
    machineActor: actor,
    operatorActorUuid,
  });
  const spendActor = operator?.actor ?? actor;
  const actionCost = getMachineAttackActionCost(actor);
  const totalCost = Math.max(0, Number(fireModeDef.saCost ?? 0) + Number(actionCost?.extraCost ?? 0));
  const spendRequest = {
    token: sourceToken,
    resource: "sa",
    cost: totalCost,
    actionId: "attack",
    actionLabel: "Attack",
    actionCostLabel: `${totalCost} SA`,
    actionCategory: "complex",
  };

  const spendPreview = PersonalCombatTracker.previewResourceSpend?.(spendActor, spendRequest)
    ?? { ok: true };
  if (!spendPreview?.ok) {
    ui.notifications?.warn(spendPreview?.reason ?? "Unable to record attack action.");
    return spendPreview;
  }

  const completedGroupIds = new Set();
  try {
    for (const step of plan.steps) {
      const result = await rollApi.execute({
        actor,
        payload: buildGroupAttackPayload(step.group, {
          sourceToken,
          operatorActorUuid: operator?.actor?.uuid ?? operatorActorUuid,
          fireMode: fireModeDef.id,
        }),
      });
      if (!result || result?.aborted) break;
      completedGroupIds.add(step.group.id);
    }
  } catch (error) {
    console.error("MWD | BattleMech fire mode attack failed", {
      actor,
      fireMode: fireModeDef.id,
      completedGroupIds: Array.from(completedGroupIds),
      error,
    });
    ui.notifications?.error(error?.message ?? "BattleMech attack failed.");
    throw error;
  }

  if (completedGroupIds.size <= 0) {
    return { ok: false, cancelled: true, reason: "BattleMech attack was cancelled.", fireMode: fireModeDef.id, completedGroupIds: [] };
  }

  const spend = await PersonalCombatTracker.spendResource(spendActor, spendRequest);
  if (!spend?.ok) {
    ui.notifications?.warn(spend?.reason ?? "Unable to record attack action.");
    return spend;
  }

  const markUsed = await PersonalCombatTracker.markWeaponGroupsUsed?.(actor, {
    token: sourceToken,
    groupIds: Array.from(completedGroupIds),
  });
  if (markUsed && markUsed.ok === false) {
    ui.notifications?.warn(markUsed.reason ?? "Unable to record BattleMech weapon-group usage.");
  }

  return { ok: true, fireMode: fireModeDef.id, completedGroupIds: Array.from(completedGroupIds), spend };
}
