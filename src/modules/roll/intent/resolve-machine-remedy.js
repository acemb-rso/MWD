// src/modules/roll/intent/resolve-machine-remedy.js
// Purpose: Resolve roll context for machine critical remedies.
// How it fits: Keeps remedy checks on the standard roll-intent path so sheets
// and chat only emit payloads.

import { getSkillDef } from "../../mwd/skills.js";
import { prepareMachineRemedyRoll, resolveMachineCritIntentContext } from "../../mwd/machine-intents.js";
import { toNumber } from "../../utils/coercion.js";
import { withOwner } from "./token-context.js";

function getSkillRating(actor = null, skillKey = "") {
  return {
    rating: toNumber(actor?.system?.skills?.[skillKey]?.rating, 0),
    bonus: toNumber(actor?.system?.skills?.[skillKey]?.bonus, 0),
  };
}

export async function resolveMachineRemedy({ actor, payload } = {}) {
  const prepared = await prepareMachineRemedyRoll(payload, {
    gmOverride: Boolean(payload?.gmOverride),
  });
  if (!prepared.ok) {
    throw new Error(prepared.reason ?? "Machine remedy could not be prepared.");
  }

  const context = await resolveMachineCritIntentContext(payload, {
    gmOverride: Boolean(payload?.gmOverride),
  });
  if (!context.ok) {
    throw new Error(context.reason ?? "Machine remedy could not be resolved.");
  }

  const skillDef = getSkillDef(context.skillKey);
  if (!skillDef) {
    throw new Error(`Machine remedy is missing a valid skill: ${context.skillKey}`);
  }

  const roller = prepared.actor ?? actor ?? context.operatorActor ?? context.machineActor;
  const reliability = toNumber(context.machineActor?.system?.attributes?.reliability?.value, 0);
  const skill = getSkillRating(roller, context.skillKey);
  const issue = context.crit ?? context.issue ?? {};

  return {
    intent: "machineRemedy",
    rollType: "simple",
    title: `${context.remedy.label}: ${issue.label ?? "Critical Remedy"}`,
    subtitle: `${context.machineActor?.name ?? "Machine"} | ${issue.locationLabel ?? context.locationKey}`,
    domains: ["mental"],
    diceTarget: 5,
    difficulty: { dn: context.totalDn },
    pool: {
      attribute: reliability,
      skill: skill.rating,
      bonus: skill.bonus,
      specialization: 0,
    },
    breakdown: [
      { id: "attribute", label: withOwner("Reliability", context.machineActor), value: reliability },
      { id: "skill", label: withOwner(skillDef.label, context.operatorActor), value: skill.rating },
      ...(skill.bonus ? [{ id: "bonus", label: "Skill Bonus", value: skill.bonus }] : []),
    ],
    specialization: null,
    machineRemedy: {
      machineActorUuid: context.machineActor?.uuid ?? "",
      operatorActorUuid: context.operatorActor?.uuid ?? "",
      critId: context.crit?.id ?? "",
      critLabel: issue.label ?? "",
      locationKey: context.locationKey,
      locationLabel: issue.locationLabel ?? context.locationKey,
      remedyKey: context.remedy.key,
      remedyLabel: context.remedy.label,
      skillKey: context.skillKey,
      skillLabel: skillDef.label,
      baseDn: context.baseDn,
      conditionModifier: context.locationConditionModifier,
      conditionLabel: context.locationConditionLabel,
      conditionValue: context.locationCondition,
      totalDn: context.totalDn,
      gmOverride: context.gmOverride,
      remedyEffect: context.remedyEffect,
      cost: context.remedy.cost,
    },
    data: {
      skillKey: context.skillKey,
      attrKey: "reliability",
      machineActorUuid: context.machineActor?.uuid ?? "",
      operatorActorUuid: context.operatorActor?.uuid ?? "",
      label: `reliability+${skillDef.label}`,
    },
    rollActor: roller,
    machineActor: context.machineActor,
  };
}
