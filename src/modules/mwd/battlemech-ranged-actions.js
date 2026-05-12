// src/modules/mwd/battlemech-ranged-actions.js
// Purpose: Builds and executes BattleMech ranged weapon-group quick actions.
// How it fits: Keeps sheets as input emitters while group-fire legality and
// attack intent emission live in the machine action layer.

import { MWD } from "../config.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { prepareBattlemechWeaponGroups } from "./battlemech-weapon-groups.js";
import { resolveMachineSceneToken } from "./machine-token-resolution.js";

function getMachineRollApi() {
  return game.mwd?.roll ?? game.system?.mwd?.roll ?? null;
}

export function buildBattlemechRangedAttackGroups(actor = null, { token = null } = {}) {
  const sourceToken = token ?? resolveMachineSceneToken(actor);
  const snapshot = PersonalCombatTracker.getSnapshot?.(actor, { token: sourceToken }) ?? null;
  const usedWeaponGroupIds = snapshot?.isCurrentTurn
    ? PersonalCombatTracker.getUsedWeaponGroupIds?.(actor, { token: sourceToken, snapshot }) ?? []
    : [];

  return prepareBattlemechWeaponGroups(actor, { usedWeaponGroupIds });
}

export async function performBattlemechRangedAttack(actor, {
  group = null,
  groupId = "",
  token = null,
  operatorActorUuid = "",
} = {}) {
  const groups = buildBattlemechRangedAttackGroups(actor, { token });
  const normalizedGroupId = String(groupId ?? group?.id ?? "").trim();
  const selectedGroup = group
    ?? groups.find(entry => String(entry?.id ?? "").trim() === normalizedGroupId)
    ?? null;

  if (!selectedGroup) {
    const reason = normalizedGroupId
      ? "That weapon group is no longer available."
      : MWD.actor.vehicle.quickActions.errors.noRanged;
    ui.notifications?.warn(reason);
    return { ok: false, reason };
  }

  if (!selectedGroup.isAttackLegal || !selectedGroup.isAvailableThisActivation) {
    const reason = selectedGroup.disableReason || "That weapon group cannot attack right now.";
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
  await rollApi.execute({
    actor,
    payload: {
      intent: "attack",
      sourceType: "weaponGroup",
      sourceId: selectedGroup.id,
      weaponGroupId: selectedGroup.id,
      edge: { pool: "physical.grit", allowed: ["pre", "post"] },
      tags: ["combat", "attack", "machine", "groupFire"],
      sourceTokenId: sourceToken?.id ?? null,
      operatorActorUuid: String(operatorActorUuid ?? "").trim(),
    }
  });

  return { ok: true, group: selectedGroup };
}
