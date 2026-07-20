// src/modules/roll/intent/resolve-acquire.js
// Resolve roll context for an EW acquire action (System + Perception).

import { getSkillDef } from "../../mwd/skills.js";
import { resolveMachineOperator } from "../../mwd/machine-operator.js";
import {
  getAcquireBaseDn,
  getDetectionStateLabel,
} from "../../mwd/machine-ew.js";
import {
  getAttackerCombatant,
  getDetectionState,
  getAcquireDnModifier,
  getAcquireCeiling,
} from "../../mwd/machine-ew-state.js";
import {
  isMachineSensorActionBlocked,
  isMachineSensorBlind,
} from "../../mwd/machine-state-effects.js";
import { getStealthDnParts } from "../../mwd/machine-stealth.js";
<<<<<<< HEAD
import { getMechRangeBand } from "../../mwd/personal-range-bands.js";
import { measureTokenDistance } from "../../mwd/token-measurement.js";
import { createUserFacingRollError } from "../roll-errors.js";

const CLOSE_RANGE_MAX = Number(getMechRangeBand("close")?.max ?? 59);

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
=======
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
>>>>>>> 457c5ebbe97303449a29b7bcbb65c8ec5b14f618

export async function resolveAcquire({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveAcquire requires actor");
  if (!isMachineActor(actor)) {
    throw createUserFacingRollError("Acquire is a machine action.", { severity: "warn" });
  }
  if (isMachineSensorActionBlocked(actor)) {
    throw createUserFacingRollError("Sensor actions are blocked by the machine's current state.", { severity: "warn" });
  }

  const targetToken = resolveRollTargetToken(payload);
  if (!targetToken?.actor) {
    throw createUserFacingRollError("Target a token to acquire.", { severity: "warn" });
  }
  const targetActor = targetToken.actor;
<<<<<<< HEAD
  const targetTokenUuid = targetToken.document?.uuid ?? targetToken.uuid ?? "";
=======
  const targetTokenUuid = getTokenUuid(targetToken);
  const targetName = getTokenDisplayName(targetToken);
>>>>>>> 457c5ebbe97303449a29b7bcbb65c8ec5b14f618

  const attackerToken = resolveRollSourceToken(actor, payload);
  const combatant = getAttackerCombatant(attackerToken);

  const currentState = getDetectionState(combatant, targetTokenUuid);

  // Chat and dialog output must not reveal an unacquired contact's identity.
  const targetName = currentState === "blind" ? "Unknown Contact" : getTokenDisplayName(targetToken);

  if (isMachineSensorBlind(actor)) {
    // Mirrors the canvas detection rule: Sensor Blind limits sensor work to
    // Close range, and an unmeasurable distance counts as beyond Close.
    const distance = measureTokenDistance(attackerToken, targetToken);
    if (!Number.isFinite(distance) || distance > CLOSE_RANGE_MAX) {
      throw createUserFacingRollError("Sensor Blind: cannot acquire targets beyond Close range.", { severity: "warn" });
    }
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

  const attrKey     = "system";
  const skillKey    = "perception";
  const systemAttr  = Math.max(0, Number(actor?.system?.attributes?.[attrKey]?.value ?? 0) || 0);
  const skillDef    = getSkillDef("perception");
  const perceptionRating = Number(roller?.system?.skills?.[skillKey]?.rating ?? 0) || 0;
  const perceptionBonus  = Number(roller?.system?.skills?.[skillKey]?.bonus  ?? 0) || 0;

  const dnBase     = getAcquireBaseDn(currentState);
  const dnModifier = getAcquireDnModifier(targetActor, {
    attacker: actor,
    payload,
    resolved: {
      intent: "acquire",
      acquire: { currentState },
    },
  });
  const stealthDnParts = getStealthDnParts(actor, targetActor, {
    intent: "acquire",
    currentState,
    payload,
    attackerToken,
    targetToken,
    rangeBand: payload?.rangeBand,
  });
  const stealthDnModifier = stealthDnParts.reduce((sum, part) => sum + (Number(part.value ?? 0) || 0), 0);
  const dn         = dnBase + dnModifier + stealthDnModifier;

  return {
    intent:    "acquire",
    rollType:  "simple",
    title:     "Acquire Target",
    subtitle:  targetName,
    domains:   ["mental"],
    domainTags: ["sensor", "sensor.acquire", "skill.perception"],
    diceTarget: 5,
    difficulty: { dn },
    dn: {
      parts: [
        { id: "difficulty.base",     label: "Base DN",      value: dnBase,     tags: ["base"] },
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
    acquire: {
      machineActorUuid:   actor.uuid ?? "",
      operatorActorUuid:  operator.actor?.uuid ?? "",
      operatorName:       operator.actor?.name ?? "",
      attackerTokenId:    getTokenId(attackerToken),
      attackerTokenUuid:  getTokenUuid(attackerToken),
      attackerCombatantId: combatant?.id ?? "",
      targetTokenUuid,
      targetTokenId:      getTokenId(targetToken),
      targetName,
      currentState,
      currentStateLabel:  getDetectionStateLabel(currentState),
      ceiling,
    },
    rollActor: roller,
    machineActor: actor,
  };
}
