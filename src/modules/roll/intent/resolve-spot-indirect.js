// src/modules/roll/intent/resolve-spot-indirect.js
// Resolve roll context for Spot for Indirect Fire (System + Perception).
// A spotter with line of sight designates a target so allied units that cannot
// see it may fire indirectly. This is LoS-bypass only: success records a
// short-lived spot marker (see machine-ew-state.js) — it grants no Lock, no
// targeting data, and no cap increase. Spotting is independent of detection
// state by design (a spotter only needs to see the target).

import { TEMPLATE } from "../../core/constants.js";
import { getSkillDef } from "../../mwd/skills.js";
import { resolveMachineOperator } from "../../mwd/machine-operator.js";
import { getAcquireDnModifier } from "../../mwd/machine-ew-state.js";
import { isMachineSensorActionBlocked } from "../../mwd/machine-state-effects.js";
import { getStealthDnParts } from "../../mwd/machine-stealth.js";
import { createUserFacingRollError } from "../roll-errors.js";

const SPOT_BASE_DN = 2;

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

function getTokenDisplayName(token, fallback = "Target") {
  return String(token?.name ?? token?.actor?.name ?? fallback).trim() || fallback;
}

function withOwner(label = "", actor = null) {
  const base = String(label ?? "").trim();
  const owner = String(actor?.name ?? "").trim();
  return owner ? `${base} (${owner})` : base;
}

export async function resolveSpotIndirect({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveSpotIndirect requires actor");
  if (!isMachineActor(actor)) {
    throw createUserFacingRollError("Spot for Indirect Fire is a machine action.", { severity: "warn" });
  }
  if (isMachineSensorActionBlocked(actor)) {
    throw createUserFacingRollError("Sensor actions are blocked by the machine's current state.", { severity: "warn" });
  }

  const targetToken = resolveTargetToken(payload);
  if (!targetToken?.actor) {
    throw createUserFacingRollError("Target a token to spot.", { severity: "warn" });
  }
  // Visibility/targetability proxy for line of sight. This is NOT geometric wall
  // LoS — the system does not compute that — it just guards the obvious case.
  if (targetToken.visible === false) {
    throw createUserFacingRollError("You cannot see this target to spot it.", { severity: "warn" });
  }

  const targetActor = targetToken.actor;
  const targetTokenUuid = targetToken.document?.uuid ?? targetToken.uuid ?? "";
  const targetName = getTokenDisplayName(targetToken);
  const attackerToken = resolveAttackerToken(actor, payload);

  const operator = await resolveMachineOperator({
    machineActor: actor,
    operatorActorUuid: String(payload?.operatorActorUuid ?? "").trim(),
  });
  const roller = operator.actor ?? actor;

  const attrKey    = "system";
  const skillKey   = "perception";
  const systemAttr = Math.max(0, Number(actor?.system?.attributes?.[attrKey]?.value ?? 0) || 0);
  const skillDef   = getSkillDef("perception");
  const perceptionRating = Number(roller?.system?.skills?.[skillKey]?.rating ?? 0) || 0;
  const perceptionBonus  = Number(roller?.system?.skills?.[skillKey]?.bonus  ?? 0) || 0;

  const dnModifier = getAcquireDnModifier(targetActor, {
    attacker: actor,
    payload,
    resolved: { intent: "spotIndirect" },
  });
  const stealthDnParts = getStealthDnParts(actor, targetActor, {
    intent: "acquire",
    payload,
    attackerToken,
    targetToken,
    rangeBand: payload?.rangeBand,
  });
  const stealthDnModifier = stealthDnParts.reduce((sum, part) => sum + (Number(part.value ?? 0) || 0), 0);
  const dn = SPOT_BASE_DN + dnModifier + stealthDnModifier;

  return {
    intent:    "spotIndirect",
    rollType:  "simple",
    title:     "Spot for Indirect Fire",
    subtitle:  targetName,
    domains:   ["mental"],
    domainTags: ["sensor", "sensor.spot", "skill.perception"],
    diceTarget: 5,
    difficulty: { dn },
    dn: {
      parts: [
        { id: "difficulty.base", label: "Base DN", value: SPOT_BASE_DN, tags: ["base"] },
        ...(dnModifier ? [{ id: "ew.ecmDn", label: "ECM Modifier", value: dnModifier, tags: ["ew"] }] : []),
        ...stealthDnParts,
      ],
      total: dn
    },
    edge: { allowed: ["pre", "post"], earn: { enabled: true, rate: 4, maxPerRoll: 1 } },
    pool: {
      attribute:    systemAttr,
      skill:        perceptionRating,
      bonus:        perceptionBonus,
      specialization: 0,
    },
    breakdown: [
      { id: "attribute", label: withOwner("System", actor), value: systemAttr },
      { id: "skill", label: withOwner(skillDef?.label ?? "Perception", operator.actor), value: perceptionRating },
      ...(perceptionBonus ? [{ id: "bonus", label: "Perception Bonus", value: perceptionBonus }] : []),
    ],
    specialization: null,
    data: {
      skillKey,
      attrKey,
      machineActorUuid: actor.uuid ?? "",
      operatorActorUuid: operator.actor?.uuid ?? "",
      label: `${attrKey}+${skillDef?.label ?? "Perception"}`,
    },
    spotIndirect: {
      machineActorUuid:   actor.uuid ?? "",
      operatorActorUuid:  operator.actor?.uuid ?? "",
      operatorName:       operator.actor?.name ?? "",
      attackerTokenId:    attackerToken?.id ?? attackerToken?.document?.id ?? "",
      attackerTokenUuid:  attackerToken?.document?.uuid ?? attackerToken?.uuid ?? "",
      targetTokenUuid,
      targetTokenId:      targetToken?.id ?? "",
      targetName,
    },
    rollActor: roller,
    machineActor: actor,
  };
}
