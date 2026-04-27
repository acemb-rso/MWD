// src/modules/roll/intent/resolve-targeting.js
// Resolve roll context for an EW targeting-data action (System + Gunnery, DN 2).

import { TEMPLATE } from "../../constants.js";
import { getSkillDef } from "../../mwd/skills.js";
import { resolveMachineOperator } from "../../mwd/machine-operator.js";
import { getTargetingDataCap, getDetectionStateLabel } from "../../mwd/machine-ew.js";
import { getAttackerCombatant, getDetectionState } from "../../mwd/machine-ew-state.js";
import { isMachineTargetingGenerationBlocked } from "../../mwd/machine-state-effects.js";
import { createUserFacingRollError } from "../roll-errors.js";

function isMachineActor(actor) {
  return actor?.type === TEMPLATE.actorTypes.vehicle || actor?.type === TEMPLATE.actorTypes.battlemech;
}

function resolveTargetToken(payload) {
  const explicitUuid = String(payload?.targetTokenUuid ?? "").trim();
  if (explicitUuid) {
    return canvas?.tokens?.placeables?.find(t => (t.document?.uuid ?? t.uuid) === explicitUuid) ?? null;
  }
  const explicitId = String(payload?.targetTokenId ?? "").trim();
  if (explicitId) return canvas?.tokens?.get?.(explicitId) ?? null;
  return Array.from(game.user?.targets ?? []).find(t => t.actor) ?? null;
}

function resolveAttackerToken(actor, payload) {
  const id = String(payload?.sourceTokenId ?? "").trim();
  if (id) return canvas?.tokens?.get?.(id) ?? canvas?.tokens?.placeables?.find(t => t.id === id) ?? null;
  return canvas?.tokens?.controlled?.find(t => t.actor?.id === actor?.id)
    ?? actor?.getActiveTokens?.(true, true)?.[0]
    ?? null;
}

function getTokenDisplayName(token, fallback = "Target") {
  return String(token?.name ?? token?.actor?.name ?? fallback).trim() || fallback;
}

function withOwner(label = "", actor = null) {
  const base = String(label ?? "").trim();
  const owner = String(actor?.name ?? "").trim();
  return owner ? `${base} (${owner})` : base;
}

const DN = 2;

export async function resolveTargeting({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveTargeting requires actor");
  if (!isMachineActor(actor)) {
    throw createUserFacingRollError("Targeting is a machine action.", { severity: "warn" });
  }
  if (isMachineTargetingGenerationBlocked(actor)) {
    throw createUserFacingRollError("Targeting Data cannot be generated in the machine's current state.", { severity: "warn" });
  }

  const targetToken = resolveTargetToken(payload);
  if (!targetToken?.actor) {
    throw createUserFacingRollError("Target a token to generate targeting data.", { severity: "warn" });
  }
  const targetTokenUuid = targetToken.document?.uuid ?? targetToken.uuid ?? "";
  const targetName = getTokenDisplayName(targetToken);

  const attackerToken = resolveAttackerToken(actor, payload);
  const combatant     = getAttackerCombatant(attackerToken);
  const detectionState  = getDetectionState(combatant, targetTokenUuid);

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
    diceTarget: 5,
    difficulty: { dn: DN },
    dn: {
      parts: [{ id: "difficulty.base", label: "DN (Targeting)", value: DN, tags: ["base"] }],
      total: DN
    },
    edge: { earn: { enabled: true, rate: 4, maxPerRoll: 1 } },
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
      attackerTokenId:   attackerToken?.id ?? attackerToken?.document?.id ?? "",
      attackerTokenUuid: attackerToken?.document?.uuid ?? attackerToken?.uuid ?? "",
      attackerCombatantId: combatant?.id ?? "",
      targetTokenUuid,
      targetTokenId:     targetToken?.id ?? "",
      targetName,
      detectionState,
      detectionStateLabel: getDetectionStateLabel(detectionState),
      cap,
    },
    rollActor: roller,
    machineActor: actor,
  };
}
