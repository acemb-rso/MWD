// src/modules/mwd/personal-crit-intents.js
// Purpose: Resolves sheet/chat remedy intents for Personal Critical Hit records.

import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { getCommonCheckPayload } from "../roll/config/common-checks.js";
import { getPersonalCritRemedy } from "./personal-crit-remedies.js";
import { getActivePersonalCrits, removePersonalCrit } from "./personal-criticals.js";

function isPassedRoll(result) {
  if (!result) return false;
  if (typeof result?.outcomeModel?.passed === "boolean") return result.outcomeModel.passed;
  if (typeof result?.passed === "boolean") return result.passed;
  if (typeof result?.resolved?.outcomeModel?.passed === "boolean") return result.resolved.outcomeModel.passed;
  return true;
}

async function spendPersonalRemedyCost(actor, token, remedy, crit) {
  if (remedy.key === "reduceBurn") {
    return PersonalCombatTracker.reduceBurn(actor, { token });
  }

  if (remedy.key === "firstAid") {
    return PersonalCombatTracker.spendResource(actor, {
      token,
      resource: "sa",
      cost: 2,
      actionId: "firstAid",
      actionLabel: "First Aid",
      actionCostLabel: "2 SA",
      actionCategory: "complex",
    });
  }

  if (remedy.actionKind === "personalAction") {
    return PersonalCombatTracker.executeAction(actor, {
      token,
      actionId: remedy.actionId,
      metadata: {
        personalCritId: crit.id,
        remedyKey: remedy.key,
      },
    });
  }

  if (remedy.actionKind === "commonCheck") {
    const payload = {
      ...(getCommonCheckPayload(remedy.actionId) ?? { intent: "common", id: remedy.actionId }),
      dn: Math.max(1, Number(crit.remedyBaseDn ?? remedy.baseDn ?? 1) || 1),
      personalCritRemedy: {
        critId: crit.id,
        remedyKey: remedy.key,
      },
    };
    const result = await game.mwd?.roll?.execute?.({ actor, payload });
    if (!result) return { ok: true, cancelled: true, reason: "Remedy roll cancelled." };
    return {
      ok: isPassedRoll(result),
      message: result,
      reason: isPassedRoll(result) ? "" : `${remedy.label} did not clear ${crit.label}.`,
    };
  }

  return { ok: false, reason: "That critical has no remedy." };
}

export async function resolvePersonalCritRemedyIntent({
  actor = null,
  token = null,
  critId = "",
  remedyKey = "",
} = {}) {
  if (!actor) return { ok: false, reason: "Personal critical remedy requires an actor." };

  const crit = getActivePersonalCrits(actor).find(entry => String(entry.id) === String(critId));
  if (!crit) return { ok: false, reason: "That critical effect is no longer active." };

  const remedy = getPersonalCritRemedy(remedyKey || crit.remedyKey);
  if (!remedy.remediable) return { ok: false, reason: "That critical cannot be remedied." };

  const spend = await spendPersonalRemedyCost(actor, token, remedy, crit);
  if (!spend?.ok) return { ok: false, reason: spend?.reason ?? "Unable to perform the remedy action.", spend };
  if (spend.cancelled) return { ok: true, cancelled: true, spend };

  const removed = await removePersonalCrit({ actor, critId: crit.id });
  return {
    ...removed,
    spend,
    remedy,
  };
}
