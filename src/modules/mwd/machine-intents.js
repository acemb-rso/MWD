// src/modules/mwd/machine-intents.js
// Purpose: Resolves chat-emitted machine critical intents.
// How it fits: UI buttons emit intent payloads; this module performs authority,
// action-cost, and actor mutation checks in one place.

import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { applyManagedStatusUpdate } from "../dialog/token-status-dialog.js";
import { MACHINE_CRITICAL_STATUS_ID } from "./critical-hits.js";
import { getMachineCritRemedy } from "./machine-crit-remedies.js";
import { resolveMachineOperator } from "./machine-operator.js";

async function resolveUuid(uuid = "") {
  const value = String(uuid ?? "").trim();
  if (!value || typeof fromUuid !== "function") return null;
  try {
    return await fromUuid(value);
  } catch (_error) {
    return null;
  }
}

function activeCrits(actor) {
  return Array.isArray(actor?.system?.mwd?.crits)
    ? actor.system.mwd.crits.filter(crit => crit?.active !== false)
    : [];
}

async function clearCriticalStatusIfEmpty(actor) {
  if (activeCrits(actor).length || !actor?.toggleStatusEffect) return;
  try {
    await applyManagedStatusUpdate({
      actor,
      statusId: MACHINE_CRITICAL_STATUS_ID,
      active: false,
    });
  } catch (error) {
    console.warn("MWD | Unable to clear machine critical status", error);
  }
}

export async function resolveMachineCritRemedyIntent(intent = {}, options = {}) {
  if (String(intent?.intent ?? "") !== "machine_crit_remedy") {
    return { ok: false, reason: "Unsupported machine intent." };
  }

  const machineActor = await resolveUuid(intent.machineActorUuid);
  if (!machineActor) return { ok: false, reason: "Machine actor could not be resolved." };

  const critId = String(intent.critId ?? "").trim();
  const crits = Array.isArray(machineActor.system?.mwd?.crits)
    ? machineActor.system.mwd.crits.slice()
    : [];
  const index = crits.findIndex(crit => String(crit?.id ?? "") === critId && crit?.active !== false);
  if (index < 0) return { ok: false, reason: "That critical effect is no longer active." };

  const crit = crits[index];
  const remedy = getMachineCritRemedy(intent.remedyKey || crit.remedyKey);
  const gmOverride = Boolean(options.gmOverride ?? globalThis.game?.user?.isGM);
  const operator = await resolveMachineOperator({
    machineActor,
    operatorActorUuid: intent.operatorActorUuid,
  });

  // Players need a concrete operator actor so the complex action cost has an owner.
  // GMs can override for crew abstractions and out-of-combat cleanup.
  if (!operator.actor && !gmOverride) {
    return { ok: false, reason: operator.reason || "No linked operator or pilot actor." };
  }

  let spend = { ok: true, skipped: true };
  if (operator.actor && !gmOverride) {
    const spender = options.spendResource ?? PersonalCombatTracker.spendResource.bind(PersonalCombatTracker);
    spend = await spender(operator.actor, {
      resource: remedy.resource,
      cost: remedy.cost,
      actionId: remedy.actionId,
      actionLabel: remedy.actionLabel,
      actionCostLabel: `${remedy.cost} SA`,
      actionCategory: remedy.category,
    });
    if (!spend?.ok) return { ok: false, reason: spend?.reason ?? "Unable to spend the remedy action." };
  }

  crits[index] = {
    ...crit,
    active: false,
    resolvedAt: new Date().toISOString(),
    resolvedBy: operator.actor?.uuid ?? "",
    resolvedByOverride: gmOverride && !operator.actor,
    remedyKey: remedy.key,
  };
  await machineActor.update({ "system.mwd.crits": crits });
  await clearCriticalStatusIfEmpty(machineActor);

  return {
    ok: true,
    machineActor,
    operatorActor: operator.actor,
    crit: crits[index],
    remedy,
    spend,
  };
}
