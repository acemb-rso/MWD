// src/modules/roll/intent/resolve-defensive-jink.js
// Resolves Defensive Jink as Handling + Piloting to spoil targetingData.

import { TEMPLATE } from "../../core/constants.js";
import { getSkillDef } from "../../mwd/skills.js";
import { resolveMachineOperator } from "../../mwd/machine-operator.js";
import { isMachineActor } from "../../utils/actor-guards.js";
import { toNumber } from "../../utils/coercion.js";
import { createUserFacingRollError } from "../roll-errors.js";
import {
  getTokenDisplayName,
  getTokenId,
  getTokenUuid,
  resolveRollObserverToken,
  resolveRollSourceToken,
  withOwner,
} from "./token-context.js";

const DN = 2;

export async function resolveDefensiveJink({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveDefensiveJink requires actor");
  if (!isMachineActor(actor)) {
    throw createUserFacingRollError("Defensive Jink is a machine action.", { severity: "warn" });
  }

  const sourceToken = resolveRollSourceToken(actor, payload);
  const observerToken = resolveRollObserverToken(payload);
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
    subtitle: getTokenDisplayName(observerToken, "Observer"),
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
      sourceTokenId: getTokenId(sourceToken),
      sourceTokenUuid: getTokenUuid(sourceToken),
      observerTokenId: getTokenId(observerToken),
      observerTokenUuid: getTokenUuid(observerToken),
    },
    rollActor: roller,
    machineActor: actor,
  };
}
