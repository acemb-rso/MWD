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
import { TEMPLATE } from "../../constants.js";
import { WeaponItem } from "../../item/weapon-item.js";
import { createUserFacingRollError } from "../roll-errors.js";
import { buildTargetSnapshot } from "../template-placement.js";
import { getMachineAttackRestriction } from "../../mwd/machine-crit-effects.js";
import { getContactStateLabel } from "../../mwd/machine-ew.js";
import {
  getAttackerCombatant,
  getContactState,
  getUsableTargetingPacket,
} from "../../mwd/machine-ew-state.js";

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

function isMachineActor(actor) {
  return actor?.type === TEMPLATE.actorTypes.vehicle || actor?.type === TEMPLATE.actorTypes.battlemech;
}

function isMachineWeapon(item) {
  return ["mechWeapon", "vehicleWeapon"].includes(item?.canonicalType ?? item?.type);
}

function addBands(left = {}, right = {}) {
  return {
    close: Number(left.close ?? 0) + Number(right.close ?? 0),
    near: Number(left.near ?? 0) + Number(right.near ?? 0),
    far: Number(left.far ?? 0) + Number(right.far ?? 0),
    extreme: Number(left.extreme ?? 0) + Number(right.extreme ?? 0),
  };
}

function getMachineWeaponGroupProfile(actor, payload) {
  const groupId = String(payload?.weaponGroupId ?? payload?.machineWeaponGroup?.id ?? "").trim();
  if (!groupId) return null;

  const group = Array.from(actor.system?.weaponGroups ?? actor.system?.mwd?.weaponGroupDetails ?? [])
    .find(entry => String(entry?.id ?? "").trim() === groupId) ?? null;
  const weaponIds = Array.isArray(group?.weaponIds)
    ? group.weaponIds
    : Array.isArray(group?.weapons)
      ? group.weapons.map(weapon => weapon?.id).filter(Boolean)
      : [];
  const weapons = weaponIds
    .map(id => actor.items?.get?.(id))
    .filter(item => item && isMachineWeapon(item));
  if (!group || !weapons.length) return null;

  const profiles = weapons.map(weapon => weapon.getCombatProfile?.() ?? null).filter(Boolean);
  const first = profiles[0] ?? {};
  const attackRatingBand = profiles.reduce((bands, profile) => addBands(bands, profile.attackRatingBand), {});
  const damage = profiles.reduce((sum, profile) => sum + (Number(profile.damage ?? 0) || 0), 0);
  const ap = Math.max(0, ...profiles.map(profile => Number(profile.ap ?? 0) || 0));
  const skill = String(first.skill ?? "gunnery").trim() || "gunnery";

  return {
    id: group.id,
    uuid: actor.uuid ?? null,
    name: group.name || "Weapon Group",
    img: first.img,
    type: "mechWeaponGroup",
    machineWeaponGroup: {
      id: group.id,
      weaponIds,
      weaponNames: weapons.map(weapon => weapon.name),
    },
    category: first.category ?? "ranged",
    skill,
    skillDef: getSkillDef(skill),
    damage,
    ap,
    damageType: first.damageType ?? "kinetic",
    attackRatingBand,
    range: first.range ?? {},
    defaultRangeBand: first.defaultRangeBand ?? "near",
    effects: {},
    notes: profiles.map(profile => profile.notes).filter(Boolean).join("\n"),
  };
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

  if (isMachineActor(actor)) {
    const groupProfile = getMachineWeaponGroupProfile(actor, payload);
    if (groupProfile) return groupProfile;

    const item = actor.items?.get?.(payload?.weaponId ?? "") ?? null;
    if (!item || !isMachineWeapon(item)) {
      throw new Error("Machine attack requires an owned vehicle or BattleMech weapon.");
    }
    return item.getCombatProfile?.() ?? null;
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
  if (isMachineActor(actor)) {
    const restriction = getMachineAttackRestriction(actor, {
      weaponGroupId: payload?.weaponGroupId,
      weaponId: payload?.weaponId,
      weapon,
    });
    if (restriction.blocked) {
      throw createUserFacingRollError(restriction.reason || "That weapon group cannot attack right now.", {
        severity: "warn",
      });
    }
  }
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

  let ewContext = null;
  if (isMachineActor(actor) && targets.length > 0) {
    const firstTarget = targets[0];
    const targetTokenUuid = String(firstTarget?.tokenUuid ?? "").trim();
    const attackerToken = getSourceToken(actor, payload);
    const combatant = getAttackerCombatant(attackerToken);

    const targetTokenObj = canvas?.tokens?.get?.(targetTokenUuid);
    const isVisible = targetTokenObj?.visible ?? true;
    const effectiveState = isVisible ? getContactState(combatant, targetTokenUuid) : "blind";

    if (effectiveState === "blind") {
      throw createUserFacingRollError("No targeting solution. Acquire contact first.", { severity: "warn" });
    }

    const systemAttr = Number(actor?.system?.attributes?.system?.value ?? 0) || 0;
    const usablePacket = getUsableTargetingPacket(combatant, targetTokenUuid, systemAttr, effectiveState, game.combat?.round);

    ewContext = {
      contactState: effectiveState,
      contactStateLabel: getContactStateLabel(effectiveState),
      targetTokenUuid,
      attackerCombatantId: combatant?.id ?? null,
      activePacketId: usablePacket?.id ?? null,
      targetingDataValue: usablePacket?.value ?? 0,
    };
  }

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
      totalAp,
      ewContext,
    },
    specialization: selectedSpecialization ? {
      key: selectedSpecialization.key,
      label: selectedSpecialization.label,
      value: specializationBonus,
      skillKey: skillDef.code ?? weapon.skill
    } : null
  };
}
