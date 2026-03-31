// src/modules/roll/intent/resolve-attack.js
// Purpose: Defines function `getTargets`.
// How it fits: Describes role within src/modules or template rendering pipeline.


import {
  getOwnedSkillSpecializationKeys,
  getSkillDef,
  getSkillSpecializationDef,
  SKILL_SPECIALIZATION_BONUS,
} from "../../mwd/skills.js";
import { WeaponItem } from "../../item/weapon-item.js";
import { createUserFacingRollError } from "../roll-errors.js";

function getTargets() {
  return Array.from(game.user?.targets ?? []);
}

function buildTargetSnapshot(targetToken) {
  const targetActor = targetToken?.actor ?? null;
  if (!targetActor) return null;

  const targetLoadout = targetActor?.getPersonalCombatLoadout?.() ?? null;
  const targetArmor = targetLoadout?.activeArmor ?? null;

  return {
    tokenId: targetToken?.id ?? null,
    tokenUuid: targetToken?.document?.uuid ?? null,
    actorId: targetActor.id,
    actorUuid: targetActor.uuid,
    name: targetActor.name ?? targetToken?.name ?? "Target",
    activeArmor: targetArmor ? {
      armorId: targetArmor.id,
      rating: Number(targetArmor.ratingCurrent ?? targetArmor.rating ?? 0),
      currentArmorRating: Number(targetArmor.currentArmorRating ?? targetArmor.durability?.current ?? 0),
      remainingDurability: Number(targetArmor.remainingDurability ?? targetArmor.durability?.current ?? 0),
      baseMitigation: Number(targetArmor.baseMitigation ?? targetArmor.baseResistance ?? 0),
      baseResistance: Number(targetArmor.baseMitigation ?? targetArmor.baseResistance ?? 0),
      mitigationByType: { ...(targetArmor.mitigationByType ?? targetArmor.typedMitigation ?? {}) },
      tags: [...(targetArmor.tags ?? [])],
      isDestroyed: Boolean(targetArmor.isDestroyed),
      defenseBonus: Number(targetArmor.defenseBonus ?? 0)
    } : null
  };
}

function getWeaponProfile(actor, payload) {
  if (payload?.syntheticWeapon?.id === "unarmed") {
    return {
      ...WeaponItem.DEFAULT_UNARMED,
      ...payload.syntheticWeapon,
      isSynthetic: true,
      defaultRangeBand: "close"
    };
  }

  const item = actor.items?.get?.(payload?.weaponId ?? "") ?? null;
  if (!item || !(item.isPersonalWeapon?.() ?? item.type === "personalWeapon") || !item.system?.equipped) {
    throw new Error("Attack requires an equipped personal weapon.");
  }

  return item.getCombatProfile?.({ payloadId: payload?.payloadId }) ?? null;
}

export async function resolveAttack({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveAttack requires actor");

  const weapon = getWeaponProfile(actor, payload);
  if (!weapon) throw new Error("Unable to resolve weapon profile.");

  const skillDef = getSkillDef(weapon.skill) ?? {
    code: weapon.skill,
    label: weapon.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  };

  const attrKey = String(skillDef.attribute ?? "reflexes").trim() || "reflexes";
  const attribute = actor.getAttributeValue?.(attrKey) ?? Number(actor.system?.attributes?.[attrKey]?.value ?? 0);
  const skill = actor.getSkillRating?.(weapon.skill) ?? Number(actor.system?.skills?.[weapon.skill]?.rating ?? 0);
  const skillBonus = Number(actor.system?.skills?.[weapon.skill]?.bonus ?? 0);
  const ownedSpecializations = new Set(getOwnedSkillSpecializationKeys(actor.system ?? {}, weapon.skill));
  const requestedSpecialization = getSkillSpecializationDef(weapon.skill, payload?.specializationKey);
  const selectedSpecialization = requestedSpecialization && ownedSpecializations.has(requestedSpecialization.key)
    ? requestedSpecialization
    : null;
  const specializationBonus = selectedSpecialization ? SKILL_SPECIALIZATION_BONUS : 0;
  const accuracyBonus = Number(weapon?.effects?.accuracyMod ?? 0) || 0;
  const bonus = skillBonus + accuracyBonus;
  const rangeBand = String(payload?.rangeBand ?? weapon.defaultRangeBand ?? "close").trim() || "close";
  const attackRating = Number(weapon?.attackRatingBand?.[rangeBand] ?? 0) || 0;
  const targets = getTargets().map(buildTargetSnapshot).filter(Boolean);
  if (targets.length === 0) {
    throw createUserFacingRollError("Target at least one token to attack.", { severity: "warn" });
  }
  const totalAp = Number(weapon.ap ?? 0) + Number(weapon?.effects?.ap ?? 0);

  return {
    intent: "attack",
    rollType: "simple",
    title: `${weapon.name} Attack`,
    subtitle: actor.name ?? "Actor",
    domains: Array.isArray(skillDef.domains) && skillDef.domains.length ? skillDef.domains : ["physical"],
    domainTags: ["combat", "attack"],
    diceTarget: Number.isFinite(Number(payload?.diceTarget)) ? Number(payload.diceTarget) : 5,
    difficulty: { dn: Number.isFinite(Number(payload?.dn)) ? Number(payload.dn) : 1 },
    edge: {
      earn: { enabled: true, rate: 4, maxPerRoll: 1 }
    },
    pool: { attribute, skill, bonus, specialization: specializationBonus },
    breakdown: [
      { id: "attribute", label: "Attribute", value: attribute },
      { id: "skill", label: skillDef.label, value: skill },
      { id: "bonus", label: "Skill Bonus", value: skillBonus },
      ...(selectedSpecialization ? [{
        id: "specialization",
        label: `Specialization (${selectedSpecialization.label})`,
        value: specializationBonus
      }] : []),
      { id: "weaponAccuracy", label: "Weapon Accuracy", value: accuracyBonus },
      { id: "damage", label: "Damage", value: Number(weapon.damage ?? 0) || 0 },
      { id: "ap", label: "AP", value: totalAp },
      { id: "attackRating", label: `Attack Rating (${rangeBand})`, value: attackRating }
    ],
    attack: {
      rangeBand,
      weapon,
      payload: weapon?.payload ?? null,
      payloadState: weapon?.payloadState ?? null,
      source: weapon?.source ?? null,
      sourceState: weapon?.sourceState ?? null,
      resolverKey: weapon?.resolverKey ?? "standard",
      skill: {
        code: skillDef.code ?? weapon.skill,
        label: skillDef.label ?? weapon.skill,
        attribute: attrKey,
        specialization: selectedSpecialization ? {
          key: selectedSpecialization.key,
          label: selectedSpecialization.label,
          value: specializationBonus
        } : null
      },
      targets,
      totalAp
    },
    specialization: selectedSpecialization ? {
      key: selectedSpecialization.key,
      label: selectedSpecialization.label,
      value: specializationBonus,
      skillKey: skillDef.code ?? weapon.skill
    } : null
  };
}
