// src/modules/roll/intent/resolve-skill.js
// Purpose: Defines function `resolveSkill`.
// How it fits: Describes role within src/modules or template rendering pipeline.


// modules/roll/intent/resolve-skill.js
import {
  getOwnedSkillSpecializationKeys,
  getSkillDef,
  getSkillSpecializationDef,
  SKILL_SPECIALIZATION_BONUS,
} from "../../mwd/skills.js";
import {
  getMachinePilotingDnModifier,
} from "../../mwd/machine-state-effects.js";
import { TEMPLATE } from "../../core/constants.js";
import { resolveMachineOperator } from "../../mwd/machine-operator.js";
import { getFirstAidRollConfig } from "../../mwd/first-aid.js";

function isMachineActor(actor = null) {
  return actor?.type === TEMPLATE.actorTypes.vehicle || actor?.type === TEMPLATE.actorTypes.battlemech;
}

function startCase(value = "") {
  return String(value ?? "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
}

export async function resolveSkill({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveSkill requires actor");

  const rawCode = String(payload?.key ?? "").trim();
  const noSkill = Boolean(payload?.noSkill) || rawCode === "none";
  const code = noSkill ? "none" : rawCode;
  const def = noSkill
    ? { code: "none", label: "No Skill", attribute: "" }
    : getSkillDef(code);
  if (!def) throw new Error(`Unknown skill: ${code}`);

  const machineRoll = isMachineActor(actor);
  const operator = machineRoll
    ? await resolveMachineOperator({
      machineActor: actor,
      operatorActorUuid: String(payload?.operatorActorUuid ?? "").trim(),
    })
    : null;
  const rollActor = operator?.actor ?? actor;
  const skillSys = rollActor.system ?? {};

  // Allow an on-the-fly attribute override (dialog can set payload.attrKey).
  const machineAttributeKey = String(payload?.machineAttributeKey ?? "").trim();
  const attrKey = String(
    machineAttributeKey
    || payload?.attrKey
    || (machineRoll && code === "piloting" ? TEMPLATE.actorAttributes.handling : def.attribute)
    || ""
  ).trim();
  if (!attrKey) throw new Error(`Skill ${code} missing attribute key`);
  const attrActor = machineAttributeKey || (machineRoll && code === "piloting")
    ? actor
    : rollActor;
  const attrSys = attrActor.system ?? {};

  const attribute = Number(attrActor.getAttributeValue?.(attrKey) ?? attrSys?.attributes?.[attrKey]?.value ?? 0);
  const skill = noSkill ? 0 : Number(skillSys?.skills?.[code]?.rating ?? 0);
  const bonus = noSkill ? 0 : Number(skillSys?.skills?.[code]?.bonus ?? 0);
  const ownedSpecializations = noSkill ? new Set() : new Set(getOwnedSkillSpecializationKeys(skillSys, code));
  const requestedSpecialization = noSkill ? null : getSkillSpecializationDef(code, payload?.specializationKey);
  const selectedSpecialization = requestedSpecialization && ownedSpecializations.has(requestedSpecialization.key)
    ? requestedSpecialization
    : null;
  const specializationBonus = selectedSpecialization ? SKILL_SPECIALIZATION_BONUS : 0;

  const domains = Array.from(new Set([
    ...(Array.isArray(payload?.domains) ? payload.domains : (def.domains ?? [])),
    `skill.${code}`,
  ]));

  // --- NEW: semantic roll typing + thresholds ---
  // diceTarget = per-die success threshold (cs>=X). Default 5.
  // dnHits = hits needed to succeed (your DN). Default 1 for a basic skill check.
  const diceTarget = Number.isFinite(Number(payload?.diceTarget))
    ? Number(payload.diceTarget)
    : (Number.isFinite(Number(payload?.target)) ? Number(payload.target) : 5);

  const firstAidRoll = getFirstAidRollConfig(payload);
  const baseDnHits = firstAidRoll
    ? firstAidRoll.dn
    : Number.isFinite(Number(payload?.dn))
    ? Number(payload.dn)
    : 1;
  const pilotingDnMod = machineRoll && code === "piloting" ? getMachinePilotingDnModifier(actor) : 0;
  const dnHits = baseDnHits + pilotingDnMod;
  const attrLabel = startCase(attrKey);
  const attrOwner = attrActor !== rollActor && attrActor?.name ? ` (${attrActor.name})` : "";
  const skillOwner = machineRoll && rollActor?.name ? ` (${rollActor.name})` : "";

  return {
    intent: "skill",
    rollType: "simple",

    title: firstAidRoll?.title ?? `${def.label} (${attrLabel})`,
    subtitle: actor.name ?? "Actor",
    domains,

    // Per-die threshold (cs>=X). Kept separate from dnHits.
    diceTarget,

    // DN = hits needed for success
    difficulty: { dn: dnHits },
    dn: {
      parts: [
        firstAidRoll?.dnPart ?? { id: "difficulty.base", label: "Base DN", value: baseDnHits, tags: ["base"] },
        ...(pilotingDnMod ? [{ id: "machineCrit.unstable", label: "Unstable", value: pilotingDnMod, tags: ["machineCrit"] }] : []),
      ],
      total: dnHits
    },
    edge: {
        earn: { enabled: true, rate: 4, maxPerRoll: 1 }
      },
    pool: { attribute, skill, bonus, specialization: specializationBonus },

    breakdown: [
      { id: "attribute", label: `${attrLabel}${attrOwner}`, value: attribute },
      { id: "skill", label: `${def.label}${skillOwner}`, value: skill },
      { id: "bonus", label: "Bonus", value: bonus },
      ...(selectedSpecialization ? [{
        id: "specialization",
        label: `Specialization (${selectedSpecialization.label})`,
        value: specializationBonus
      }] : [])
    ],
    specialization: selectedSpecialization ? {
      key: selectedSpecialization.key,
      label: selectedSpecialization.label,
      value: specializationBonus,
      skillKey: code
    } : null,

    // optional extra metadata (safe to stash)
    data: {
      skillKey: code,
      attrKey,
      machineActorUuid: machineRoll ? actor.uuid ?? "" : "",
      operatorActorUuid: operator?.actor?.uuid ?? "",
      label: `${attrKey}+${def.label}`,
      specializationKey: selectedSpecialization?.key ?? "",
      specializationLabel: selectedSpecialization?.label ?? ""
    },
    rollActor,
    machineActor: machineRoll ? actor : null,
    operator: operator ? {
      actorUuid: operator.actor?.uuid ?? "",
      name: operator.actor?.name ?? "",
      source: operator.source ?? "",
      reason: operator.reason ?? "",
    } : null,
  };
}
