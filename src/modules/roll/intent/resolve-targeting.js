// src/modules/roll/intent/resolve-targeting.js
// Resolve roll context for an EW targeting-data action (System + Gunnery, DN 2).

import { TEMPLATE } from "../../constants.js";
import { getSkillDef } from "../../mwd/skills.js";
import { resolveMachineOperator } from "../../mwd/machine-operator.js";
import { getTargetingDataCap, getContactStateLabel } from "../../mwd/machine-ew.js";
import { getAttackerCombatant, getContactState } from "../../mwd/machine-ew-state.js";
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

const DN = 2;

export async function resolveTargeting({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveTargeting requires actor");
  if (!isMachineActor(actor)) {
    throw createUserFacingRollError("Targeting is a machine action.", { severity: "warn" });
  }

  const targetToken = resolveTargetToken(payload);
  if (!targetToken?.actor) {
    throw createUserFacingRollError("Target a token to generate targeting data.", { severity: "warn" });
  }
  const targetTokenUuid = targetToken.document?.uuid ?? targetToken.uuid ?? "";

  const attackerToken = resolveAttackerToken(actor, payload);
  const combatant     = getAttackerCombatant(attackerToken);
  const contactState  = getContactState(combatant, targetTokenUuid);

  if (contactState !== "track" && contactState !== "lock") {
    throw createUserFacingRollError("Track or Lock is required to generate targeting data.", { severity: "warn" });
  }

  const operator = await resolveMachineOperator({
    machineActor: actor,
    operatorActorUuid: String(payload?.operatorActorUuid ?? "").trim(),
  });
  const roller = operator.actor ?? actor;

  const systemAttr    = Math.max(0, Number(actor?.system?.attributes?.system?.value ?? 0) || 0);
  const skillDef      = getSkillDef("gunnery");
  const gunneryRating = Number(roller?.system?.skills?.gunnery?.rating ?? 0) || 0;
  const gunneryBonus  = Number(roller?.system?.skills?.gunnery?.bonus  ?? 0) || 0;
  const cap           = getTargetingDataCap(systemAttr, contactState);

  return {
    intent:    "targeting",
    rollType:  "simple",
    title:     "Generate Targeting Data",
    subtitle:  actor.name ?? "Machine",
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
      { id: "system",  label: "System",                       value: systemAttr },
      { id: "gunnery", label: skillDef?.label ?? "Gunnery",   value: gunneryRating },
      ...(gunneryBonus ? [{ id: "gunneryBonus", label: "Gunnery Bonus", value: gunneryBonus }] : []),
    ],
    targeting: {
      machineActorUuid:  actor.uuid ?? "",
      operatorActorUuid: operator.actor?.uuid ?? "",
      attackerTokenUuid: attackerToken?.document?.uuid ?? attackerToken?.uuid ?? "",
      targetTokenUuid,
      targetTokenId:     targetToken?.id ?? "",
      contactState,
      contactStateLabel: getContactStateLabel(contactState),
      cap,
    },
  };
}
