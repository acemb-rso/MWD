// src/modules/roll/intent/resolve-spot-indirect.js
// Resolve roll context for Spot for Indirect Fire (System + Perception).
// A spotter with line of sight designates a target so allied units that cannot
// see it may fire indirectly. This is LoS-bypass only: success records a
// short-lived spot marker (see machine-ew-state.js) — it grants no Lock, no
// targeting data, and no cap increase. Spotting is independent of detection
// state by design (a spotter only needs to see the target).

import { getSkillDef } from "../../mwd/skills.js";
import { resolveMachineOperator } from "../../mwd/machine-operator.js";
import { getAcquireDnModifier } from "../../mwd/machine-ew-state.js";
import { isMachineSensorActionBlocked } from "../../mwd/machine-state-effects.js";
import { getStealthDnParts } from "../../mwd/machine-stealth.js";
import { isMachineActor, isPersonActor } from "../../utils/actor-guards.js";
import { createUserFacingRollError } from "../roll-errors.js";
import {
  getTokenDisplayName,
  getTokenId,
  getTokenUuid,
  resolveRollSourceToken,
  resolveRollTargetToken,
  withOwner,
} from "./token-context.js";

const SPOT_BASE_DN = 2;

export async function resolveSpotIndirect({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveSpotIndirect requires actor");
  const machineRoll = isMachineActor(actor);
  const personalRoll = !machineRoll && isPersonActor(actor) && Boolean(payload?.personalSpotter);
  if (!machineRoll && !personalRoll) {
    throw createUserFacingRollError("Spot for Indirect Fire is a machine action.", { severity: "warn" });
  }
  if (machineRoll && isMachineSensorActionBlocked(actor)) {
    throw createUserFacingRollError("Sensor actions are blocked by the machine's current state.", { severity: "warn" });
  }

  const targetToken = resolveRollTargetToken(payload);
  if (!targetToken?.actor) {
    throw createUserFacingRollError("Target a token to spot.", { severity: "warn" });
  }
  // Visibility/targetability proxy for line of sight. This is NOT geometric wall
  // LoS — the system does not compute that — it just guards the obvious case.
  if (targetToken.visible === false) {
    throw createUserFacingRollError("You cannot see this target to spot it.", { severity: "warn" });
  }

  const targetActor = targetToken.actor;
  const targetTokenUuid = getTokenUuid(targetToken);
  const targetName = getTokenDisplayName(targetToken);
  const attackerToken = resolveRollSourceToken(actor, payload);

  const operator = machineRoll
    ? await resolveMachineOperator({
      machineActor: actor,
      operatorActorUuid: String(payload?.operatorActorUuid ?? "").trim(),
    })
    : { actor, source: "self" };
  const roller = operator.actor ?? actor;

  const attrKey    = machineRoll ? "system" : String(payload?.attrKey ?? "intelligence").trim() || "intelligence";
  const skillKey   = "perception";
  const attributeActor = machineRoll ? actor : roller;
  const systemAttr = Math.max(0, Number(attributeActor?.getAttributeValue?.(attrKey) ?? attributeActor?.system?.attributes?.[attrKey]?.value ?? 0) || 0);
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
      { id: "attribute", label: withOwner(machineRoll ? "System" : "Intelligence", attributeActor), value: systemAttr },
      { id: "skill", label: withOwner(skillDef?.label ?? "Perception", operator.actor), value: perceptionRating },
      ...(perceptionBonus ? [{ id: "bonus", label: "Perception Bonus", value: perceptionBonus }] : []),
    ],
    specialization: null,
    data: {
      skillKey,
      attrKey,
      machineActorUuid: machineRoll ? actor.uuid ?? "" : "",
      operatorActorUuid: operator.actor?.uuid ?? "",
      label: `${attrKey}+${skillDef?.label ?? "Perception"}`,
    },
    spotIndirect: {
      machineActorUuid:   machineRoll ? actor.uuid ?? "" : "",
      operatorActorUuid:  operator.actor?.uuid ?? "",
      operatorName:       operator.actor?.name ?? "",
      personalSpotter:    personalRoll,
      attackerTokenId:    getTokenId(attackerToken),
      attackerTokenUuid:  getTokenUuid(attackerToken),
      targetTokenUuid,
      targetTokenId:      getTokenId(targetToken),
      targetName,
    },
    rollActor: roller,
    machineActor: machineRoll ? actor : null,
  };
}
