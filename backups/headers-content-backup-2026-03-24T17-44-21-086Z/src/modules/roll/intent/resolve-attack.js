// src/modules/roll/intent/resolve-attack.js
// Purpose: System module or client script for resolve-attack. Integrates with the system's JavaScript modules.

import { getSkillDef } from "../../mwd/skills.js";
import { WeaponItem } from "../../item/weapon-item.js";

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

  return item.getCombatProfile?.() ?? null;
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
  const accuracyBonus = Number(weapon?.effects?.accuracyMod ?? 0) || 0;
  const bonus = skillBonus + accuracyBonus;
  const rangeBand = String(payload?.rangeBand ?? weapon.defaultRangeBand ?? "close").trim() || "close";
  const attackRating = Number(weapon?.attackRatingBand?.[rangeBand] ?? 0) || 0;
  const targets = getTargets().map(buildTargetSnapshot).filter(Boolean);

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
    pool: { attribute, skill, bonus },
    breakdown: [
      { id: "attribute", label: "Attribute", value: attribute },
      { id: "skill", label: skillDef.label, value: skill },
      { id: "bonus", label: "Skill Bonus", value: skillBonus },
      { id: "weaponAccuracy", label: "Weapon Accuracy", value: accuracyBonus },
      { id: "damage", label: "Damage", value: Number(weapon.damage ?? 0) || 0 },
      { id: "ap", label: "AP", value: Number(weapon.ap ?? 0) + Number(weapon?.effects?.ap ?? 0) },
      { id: "attackRating", label: `Attack Rating (${rangeBand})`, value: attackRating }
    ],
    attack: {
      rangeBand,
      weapon,
      skill: {
        code: skillDef.code ?? weapon.skill,
        label: skillDef.label ?? weapon.skill,
        attribute: attrKey
      },
      targets
    }
  };
}
