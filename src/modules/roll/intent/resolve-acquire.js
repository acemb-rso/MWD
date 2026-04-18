// src/modules/roll/intent/resolve-acquire.js
// Resolve roll context for an EW acquire action (System + Perception).

import { TEMPLATE } from "../../constants.js";
import { getSkillDef } from "../../mwd/skills.js";
import { resolveMachineOperator } from "../../mwd/machine-operator.js";
import {
  getAcquireBaseDn,
  getContactStateLabel,
} from "../../mwd/machine-ew.js";
import {
  getAttackerCombatant,
  getContactState,
  getAcquireDnModifier,
  getAcquireCeiling,
} from "../../mwd/machine-ew-state.js";
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
  if (explicitId) {
    return canvas?.tokens?.get?.(explicitId) ?? null;
  }
  return Array.from(game.user?.targets ?? []).find(t => t.actor) ?? null;
}

function resolveAttackerToken(actor, payload) {
  const id = String(payload?.sourceTokenId ?? "").trim();
  if (id) return canvas?.tokens?.get?.(id) ?? canvas?.tokens?.placeables?.find(t => t.id === id) ?? null;
  return canvas?.tokens?.controlled?.find(t => t.actor?.id === actor?.id)
    ?? actor?.getActiveTokens?.(true, true)?.[0]
    ?? null;
}

export async function resolveAcquire({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveAcquire requires actor");
  if (!isMachineActor(actor)) {
    throw createUserFacingRollError("Acquire is a machine action.", { severity: "warn" });
  }

  const targetToken = resolveTargetToken(payload);
  if (!targetToken?.actor) {
    throw createUserFacingRollError("Target a token to acquire.", { severity: "warn" });
  }
  const targetActor = targetToken.actor;
  const targetTokenUuid = targetToken.document?.uuid ?? targetToken.uuid ?? "";

  const attackerToken = resolveAttackerToken(actor, payload);
  const combatant = getAttackerCombatant(attackerToken);

  const currentState = getContactState(combatant, targetTokenUuid);

  if (currentState === "blind") {
    throw createUserFacingRollError("Establish visual contact before acquiring a sensor lock.", { severity: "warn" });
  }
  if (currentState === "lock") {
    throw createUserFacingRollError("Target is already at lock state.", { severity: "info" });
  }

  const ceiling = getAcquireCeiling(targetActor);
  if (currentState === "track" && ceiling === "track") {
    throw createUserFacingRollError("ECM prevents advancing beyond Track on this target.", { severity: "warn" });
  }

  const operator = await resolveMachineOperator({
    machineActor: actor,
    operatorActorUuid: String(payload?.operatorActorUuid ?? "").trim(),
  });
  const roller = operator.actor ?? actor;

  const systemAttr  = Math.max(0, Number(actor?.system?.attributes?.system?.value ?? 0) || 0);
  const skillDef    = getSkillDef("perception");
  const perceptionRating = Number(roller?.system?.skills?.perception?.rating ?? 0) || 0;
  const perceptionBonus  = Number(roller?.system?.skills?.perception?.bonus  ?? 0) || 0;

  const dnBase     = getAcquireBaseDn(currentState);
  const dnModifier = getAcquireDnModifier(targetActor);
  const dn         = dnBase + dnModifier;

  return {
    intent:    "acquire",
    rollType:  "simple",
    title:     "Acquire Target",
    subtitle:  actor.name ?? "Machine",
    domains:   ["mental"],
    diceTarget: 5,
    difficulty: { dn },
    dn: {
      parts: [
        { id: "difficulty.base",     label: "Base DN",      value: dnBase,     tags: ["base"] },
        ...(dnModifier ? [{ id: "ew.ecmDn", label: "ECM Modifier", value: dnModifier, tags: ["ew"] }] : []),
      ],
      total: dn
    },
    edge: { earn: { enabled: true, rate: 4, maxPerRoll: 1 } },
    pool: {
      attribute:    systemAttr,
      skill:        perceptionRating,
      bonus:        perceptionBonus,
      specialization: 0,
    },
    breakdown: [
      { id: "system",     label: "System",                          value: systemAttr },
      { id: "perception", label: skillDef?.label ?? "Perception",   value: perceptionRating },
      ...(perceptionBonus ? [{ id: "perceptionBonus", label: "Perception Bonus", value: perceptionBonus }] : []),
    ],
    acquire: {
      machineActorUuid:   actor.uuid ?? "",
      operatorActorUuid:  operator.actor?.uuid ?? "",
      attackerTokenUuid:  attackerToken?.document?.uuid ?? attackerToken?.uuid ?? "",
      targetTokenUuid,
      targetTokenId:      targetToken?.id ?? "",
      currentState,
      currentStateLabel:  getContactStateLabel(currentState),
      ceiling,
    },
  };
}
