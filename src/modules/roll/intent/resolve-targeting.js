// src/modules/roll/intent/resolve-targeting.js
// Resolve roll context for an EW targeting-data action (System + Gunnery, DN 2).

import { getSkillDef } from "../../mwd/skills.js";
import { resolveMachineOperator } from "../../mwd/machine-operator.js";
import { getTargetingDataCap, getDetectionStateLabel } from "../../mwd/machine-ew.js";
import { getAttackerCombatant, getEffectiveDetectionState } from "../../mwd/machine-ew-state.js";
import { isMachineTargetingGenerationBlocked } from "../../mwd/machine-state-effects.js";
import { isMachineActor } from "../../utils/actor-guards.js";
import { createUserFacingRollError } from "../roll-errors.js";
import {
  getTokenDisplayName,
  getTokenId,
  getTokenUuid,
  resolveRollSourceToken,
  resolveRollTargetToken,
  withOwner,
} from "./token-context.js";

const DN = 2;

export async function resolveTargeting({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveTargeting requires actor");
  if (!isMachineActor(actor)) {
    throw createUserFacingRollError("Targeting is a machine action.", { severity: "warn" });
  }
  if (isMachineTargetingGenerationBlocked(actor)) {
    throw createUserFacingRollError("Targeting Data cannot be generated in the machine's current state.", { severity: "warn" });
  }

  const targetToken = resolveRollTargetToken(payload);
  if (!targetToken?.actor) {
    throw createUserFacingRollError("Target a token to generate targeting data.", { severity: "warn" });
  }
  const targetTokenUuid = getTokenUuid(targetToken);
  const targetName = getTokenDisplayName(targetToken);

  const attackerToken = resolveRollSourceToken(actor, payload);
  const combatant     = getAttackerCombatant(attackerToken);
  const detectionState  = getEffectiveDetectionState(combatant, targetTokenUuid, targetToken.actor);

  if (detectionState !== "track" && detectionState !== "lock") {
    throw createUserFacingRollError("Track or Lock is required to generate targeting data.", { severity: "warn" });
  }

  const operator = await resolveMachineOperator({
    machineActor: actor,
    operatorActorUuid: String(payload?.operatorActorUuid ?? "").trim(),
  });
  const roller = operator.actor ?? actor;

  const attrKey       = "system";
  const skillKey      = "gunnery";
  const systemAttr    = Math.max(0, Number(actor?.system?.attributes?.[attrKey]?.value ?? 0) || 0);
  const skillDef      = getSkillDef(skillKey);
  const gunneryRating = Number(roller?.system?.skills?.[skillKey]?.rating ?? 0) || 0;
  const gunneryBonus  = Number(roller?.system?.skills?.[skillKey]?.bonus  ?? 0) || 0;
  const cap           = getTargetingDataCap(systemAttr, detectionState);

  return {
    intent:    "targeting",
    rollType:  "simple",
    title:     "Generate Targeting Data",
    subtitle:  targetName,
    domains:   ["mental"],
    domainTags: ["sensor", "sensor.targeting", "skill.gunnery"],
    diceTarget: 5,
    difficulty: { dn: DN },
    dn: {
      parts: [{ id: "difficulty.base", label: "DN (Targeting)", value: DN, tags: ["base"] }],
      total: DN
    },
    edge: { allowed: ["pre", "post"], earn: { enabled: true, rate: 4, maxPerRoll: 1 } },
    pool: {
      attribute:    systemAttr,
      skill:        gunneryRating,
      bonus:        gunneryBonus,
      specialization: 0,
    },
    breakdown: [
      { id: "attribute", label: withOwner("System", actor), value: systemAttr },
      { id: "skill", label: withOwner(skillDef?.label ?? "Gunnery", operator.actor), value: gunneryRating },
      ...(gunneryBonus ? [{ id: "bonus", label: "Gunnery Bonus", value: gunneryBonus }] : []),
    ],
    specialization: null,
    data: {
      skillKey,
      attrKey,
      machineActorUuid: actor.uuid ?? "",
      operatorActorUuid: operator.actor?.uuid ?? "",
      label: `${attrKey}+${skillDef?.label ?? "Gunnery"}`,
    },
    targeting: {
      machineActorUuid:  actor.uuid ?? "",
      operatorActorUuid: operator.actor?.uuid ?? "",
      operatorName:      operator.actor?.name ?? "",
      attackerTokenId:   getTokenId(attackerToken),
      attackerTokenUuid: getTokenUuid(attackerToken),
      attackerCombatantId: combatant?.id ?? "",
      targetTokenUuid,
      targetTokenId:     getTokenId(targetToken),
      targetName,
      detectionState,
      detectionStateLabel: getDetectionStateLabel(detectionState),
      cap,
    },
    rollActor: roller,
    machineActor: actor,
  };
}
