// src/modules/roll/intent/resolve-attack.js
// Purpose: Defines function `getTargets`.
// How it fits: Describes role within src/modules or template rendering pipeline.


import {
  getOwnedSkillSpecializationKeys,
  getSkillDef,
  getSkillSpecializationDef,
  SKILL_SPECIALIZATION_BONUS,
} from "../../mwd/skills.js";
import {
  getPersonalRangeBandBaseDn,
  getPersonalRangeBandName,
  selectPersonalRangeBand,
} from "../../mwd/personal-range-bands.js";
import { WeaponItem } from "../../item/weapon-item.js";
import { createUserFacingRollError } from "../roll-errors.js";
import { buildTargetSnapshot } from "../template-placement.js";

function getTargets(payload = {}) {
  if (Array.isArray(payload?.targetSnapshots)) {
    return payload.targetSnapshots;
  }

  return Array.from(game.user?.targets ?? []).map(buildTargetSnapshot).filter(Boolean);
}

function getSourceToken(actor, payload = {}) {
  const sourceTokenId = String(payload?.sourceTokenId ?? "").trim();
  if (sourceTokenId) {
    const direct = canvas?.tokens?.get?.(sourceTokenId)
      ?? canvas?.tokens?.placeables?.find?.(token => token?.id === sourceTokenId)
      ?? null;
    if (direct) return direct;
  }

  const controlled = canvas?.tokens?.controlled?.find(token => token.actor?.id === actor?.id) ?? null;
  return controlled ?? actor?.getActiveTokens?.(true, true)?.[0] ?? null;
}

function getTargetToken(target = {}) {
  const tokenId = String(target?.tokenId ?? "").trim();
  if (!tokenId) return null;
  return canvas?.tokens?.get?.(tokenId)
    ?? canvas?.tokens?.placeables?.find?.(token => token?.id === tokenId)
    ?? null;
}

function measureTokenDistance(sourceToken, targetToken) {
  const grid = canvas?.grid;
  const sourceCenter = sourceToken?.center ?? sourceToken?.object?.center ?? null;
  const targetCenter = targetToken?.center ?? targetToken?.object?.center ?? null;
  if (!grid || !sourceCenter || !targetCenter) return null;

  if (typeof grid.measurePath === "function") {
    try {
      const measurement = grid.measurePath([sourceCenter, targetCenter], { gridSpaces: true });
      const distance = Number(
        measurement?.distance
        ?? measurement?.cost
        ?? measurement?.totalDistance
        ?? measurement?.totalCost
        ?? NaN
      );
      if (Number.isFinite(distance)) return distance;
    } catch (_error) {
      // Fall through to legacy API.
    }
  }

  const RayCtor = foundry?.canvas?.geometry?.Ray ?? globalThis.Ray;
  if (typeof grid.measureDistances === "function" && typeof RayCtor === "function") {
    try {
      const distances = grid.measureDistances([{ ray: new RayCtor(sourceCenter, targetCenter) }], { gridSpaces: true });
      const distance = Number(Array.isArray(distances) ? distances[0] : NaN);
      if (Number.isFinite(distance)) return distance;
    } catch (_error) {
      return null;
    }
  }

  return null;
}

function resolveRangeBand({ actor, payload, weapon, targets = [] } = {}) {
  const explicit = String(payload?.rangeBand ?? "").trim().toLowerCase();
  const canMeasurePersonalRange = (weapon?.type === "personalWeapon" || weapon?.isSynthetic) && targets.length === 1;
  if (!canMeasurePersonalRange) {
    return explicit || String(weapon?.defaultRangeBand ?? "close").trim() || "close";
  }

  const sourceToken = getSourceToken(actor, payload);
  const targetToken = getTargetToken(targets[0]);
  const distance = measureTokenDistance(sourceToken, targetToken);
  const measuredBand = selectPersonalRangeBand(distance, weapon?.range ?? {}, weapon?.defaultRangeBand ?? "close");
  if (measuredBand === "outOfRange") {
    return measuredBand;
  }

  if (explicit) return explicit;

  if ((weapon?.type !== "personalWeapon" && !weapon?.isSynthetic) || targets.length !== 1) {
    return String(weapon?.defaultRangeBand ?? "close").trim() || "close";
  }
  return measuredBand;
}

function getWeaponProfile(actor, payload) {
  if (payload?.syntheticWeapon?.id === "unarmed") {
    const unarmed = WeaponItem.buildDefaultUnarmedProfile(actor);
    return {
      ...unarmed,
      ...payload.syntheticWeapon,
      damage: unarmed.damage,
      attackRatingBand: {
        ...(payload.syntheticWeapon?.attackRatingBand ?? unarmed.attackRatingBand),
        close: unarmed.attackRatingBand.close
      },
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
  if (Array.isArray(weapon?.capabilityReport?.errors) && weapon.capabilityReport.errors.length > 0) {
    throw createUserFacingRollError(
      weapon.capabilityReport.errors[0]?.message ?? "Weapon capability data is invalid for this attack.",
      { severity: "warn" }
    );
  }

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
  const targets = getTargets(payload);
  const rangeBand = resolveRangeBand({ actor, payload, weapon, targets });
  const rangeBandLabel = (weapon?.type === "personalWeapon" || weapon?.isSynthetic)
    ? getPersonalRangeBandName(rangeBand)
    : rangeBand;
  const attackRating = Number(weapon?.attackRatingBand?.[rangeBand] ?? 0) || 0;
  const requiresTemplatedWorkflow = Boolean(weapon?.capabilityReport?.isTemplated);
  const aim = payload?.aim?.active
    ? {
      active: true,
      eligible: !requiresTemplatedWorkflow && targets.length === 1,
      ineligibleReason: requiresTemplatedWorkflow
        ? "Aim cannot apply to template attacks."
        : (targets.length !== 1 ? "Aim cannot apply to multi-target attacks." : ""),
      skillCode: weapon.skill,
      skillLabel: skillDef.label ?? weapon.skill ?? "Attack Skill"
    }
    : null;
  if (!requiresTemplatedWorkflow && targets.length === 0) {
    throw createUserFacingRollError("Target at least one token to attack.", { severity: "warn" });
  }
  const totalAp = Number(weapon.ap ?? 0) + Number(weapon?.effects?.ap ?? 0);
  const dn = Number.isFinite(Number(payload?.dn))
    ? Number(payload.dn)
    : ((weapon?.type === "personalWeapon" || weapon?.isSynthetic)
      ? getPersonalRangeBandBaseDn(rangeBand, 1)
      : 1);

  return {
    intent: "attack",
    rollType: "simple",
    title: `${weapon.name} Attack`,
    subtitle: actor.name ?? "Actor",
    domains: Array.isArray(skillDef.domains) && skillDef.domains.length ? skillDef.domains : ["physical"],
    domainTags: ["combat", "attack"],
    diceTarget: Number.isFinite(Number(payload?.diceTarget)) ? Number(payload.diceTarget) : 5,
    difficulty: { dn },
    dn: {
      parts: [{
        id: "difficulty.current",
        label: (weapon?.type === "personalWeapon" || weapon?.isSynthetic)
          ? `Base DN (${rangeBandLabel})`
          : "DN",
        value: dn,
        tags: ["manual"]
      }],
      total: dn
    },
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
      { id: "attackRating", label: `Attack Rating (${rangeBandLabel})`, value: attackRating }
    ],
    attack: {
      rangeBand,
      weapon,
      payload: weapon?.payload ?? null,
      payloadState: weapon?.payloadState ?? null,
      source: weapon?.source ?? null,
      sourceState: weapon?.sourceState ?? null,
      template: weapon?.template ?? null,
      areaEffect: weapon?.areaEffect ?? null,
      templateGeometry: payload?.templateGeometry ?? null,
      templatePlacement: payload?.templatePlacement ?? null,
      resolution: weapon?.resolution ?? null,
      resolverKey: weapon?.resolverKey ?? "standard",
      fireModes: weapon?.fireModes ?? null,
      keywords: weapon?.keywords ?? [],
      capabilityReport: weapon?.capabilityReport ?? null,
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
      aim,
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
