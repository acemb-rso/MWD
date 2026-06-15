// src/modules/roll/intent/resolve-defensive-jink.js
// Resolves Defensive Jink as Handling + Piloting to spoil targetingData.

import { TEMPLATE } from "../../core/constants.js";
import { getSkillDef } from "../../mwd/skills.js";
import { resolveMachineOperator } from "../../mwd/machine-operator.js";
import { createUserFacingRollError } from "../roll-errors.js";

const DN = 2;

function isMachineActor(actor) {
  return actor?.type === TEMPLATE.actorTypes.vehicle || actor?.type === TEMPLATE.actorTypes.battlemech;
}

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function resolveTokenById(id = "") {
  const tokenId = String(id ?? "").trim();
  if (!tokenId) return null;
  return globalThis.canvas?.tokens?.get?.(tokenId)
    ?? globalThis.canvas?.tokens?.placeables?.find(token => token.id === tokenId || token.document?.id === tokenId)
    ?? null;
}

function resolveTokenByUuid(uuid = "") {
  const tokenUuid = String(uuid ?? "").trim();
  if (!tokenUuid) return null;
  return globalThis.canvas?.tokens?.placeables?.find(token => (token.document?.uuid ?? token.uuid) === tokenUuid) ?? null;
}

function resolveSourceToken(actor, payload = {}) {
  return resolveTokenByUuid(payload?.sourceTokenUuid)
    ?? resolveTokenById(payload?.sourceTokenId)
    ?? actor?.getActiveTokens?.(true, true)?.[0]
    ?? actor?.token?.object
    ?? actor?.token
    ?? null;
}

function resolveObserverToken(payload = {}) {
  return resolveTokenById(payload?.targetTokenId)
    ?? resolveTokenByUuid(payload?.targetTokenUuid)
    ?? null;
}

function withOwner(label = "", actor = null) {
  const base = String(label ?? "").trim();
  const owner = String(actor?.name ?? "").trim();
  return owner ? `${base} (${owner})` : base;
}

export async function resolveDefensiveJink({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveDefensiveJink requires actor");
  if (!isMachineActor(actor)) {
    throw createUserFacingRollError("Defensive Jink is a machine action.", { severity: "warn" });
  }

  const sourceToken = resolveSourceToken(actor, payload);
  const observerToken = resolveObserverToken(payload);
  const operator = await resolveMachineOperator({
    machineActor: actor,
    operatorActorUuid: String(payload?.operatorActorUuid ?? "").trim(),
  });
  const roller = operator.actor ?? actor;

  const attrKey = TEMPLATE.actorAttributes.handling;
  const skillKey = "piloting";
  const skillDef = getSkillDef(skillKey);
  const handling = Math.max(0, toNumber(actor?.getAttributeValue?.(attrKey) ?? actor?.system?.attributes?.[attrKey]?.value, 0));
  const pilotingRating = Math.max(0, toNumber(roller?.system?.skills?.[skillKey]?.rating, 0));
  const pilotingBonus = Math.max(0, toNumber(roller?.system?.skills?.[skillKey]?.bonus, 0));

  return {
    intent: "defensiveJink",
    rollType: "simple",
    title: "Defensive Jink",
    subtitle: observerToken?.name ?? observerToken?.actor?.name ?? "Observer",
    domains: ["physical", "skill.piloting", "sensor", "ew"],
    domainTags: ["sensor", "sensor.jink", "skill.piloting"],
    diceTarget: 5,
    difficulty: { dn: DN },
    dn: {
      parts: [{ id: "jink.base", label: "Defensive Jink", value: DN, tags: ["base", "jink"] }],
      total: DN,
    },
    edge: { allowed: ["pre", "post"], earn: { enabled: true, rate: 4, maxPerRoll: 1 } },
    pool: {
      attribute: handling,
      skill: pilotingRating,
      bonus: pilotingBonus,
      specialization: 0,
    },
    breakdown: [
      { id: "attribute", label: withOwner("Handling", actor), value: handling },
      { id: "skill", label: withOwner(skillDef?.label ?? "Piloting", operator.actor), value: pilotingRating },
      ...(pilotingBonus ? [{ id: "bonus", label: "Piloting Bonus", value: pilotingBonus }] : []),
    ],
    specialization: null,
    data: {
      skillKey,
      attrKey,
      machineActorUuid: actor.uuid ?? "",
      operatorActorUuid: operator.actor?.uuid ?? "",
      label: `${attrKey}+${skillDef?.label ?? "Piloting"}`,
    },
    defensiveJink: {
      machineActorUuid: actor.uuid ?? "",
      operatorActorUuid: operator.actor?.uuid ?? "",
      sourceTokenId: sourceToken?.id ?? sourceToken?.document?.id ?? "",
      sourceTokenUuid: sourceToken?.document?.uuid ?? sourceToken?.uuid ?? "",
      observerTokenId: observerToken?.id ?? observerToken?.document?.id ?? "",
      observerTokenUuid: observerToken?.document?.uuid ?? observerToken?.uuid ?? "",
    },
    rollActor: roller,
    machineActor: actor,
  };
}
