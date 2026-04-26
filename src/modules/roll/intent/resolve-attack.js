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
  getMechRangeBandBaseDn,
  getMechRangeBandName,
  getPersonalRangeBandBaseDn,
  getPersonalRangeBandName,
  selectMechRangeBand,
  selectPersonalRangeBand,
} from "../../mwd/personal-range-bands.js";
import { TEMPLATE } from "../../constants.js";
import { WeaponItem } from "../../item/weapon-item.js";
import { createUserFacingRollError } from "../roll-errors.js";
import { buildTargetSnapshot } from "../template-placement.js";
import { getMachineAttackRestriction } from "../../mwd/machine-crit-effects.js";
import { getDetectionStateLabel } from "../../mwd/machine-ew.js";
import {
  getAttackerCombatant,
  getDetectionState,
  getUsableTargetingPacket,
} from "../../mwd/machine-ew-state.js";
import { PersonalCombatTracker } from "../../combat/personal-combat-tracker.js";
import {
  getMachineAttackRestriction as getMachineStateAttackRestriction,
  isMachineRangeCappedToClose,
} from "../../mwd/machine-state-effects.js";
import { buildBattlemechWeaponGroupAttackProfile } from "../../mwd/battlemech-weapon-groups.js";
import { getMachineFireControlProfile } from "../../mwd/machine-fire-control.js";
import { buildClusteringProfile } from "../../mwd/machine-clustering.js";
import {
  buildMachineAttackMotionContext,
  isMachineActor,
} from "../../mwd/machine-attack-motion.js";

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

function getTargetActor(target = {}) {
  return getTargetToken(target)?.actor ?? null;
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
  const canMeasureMachineRange = isMachineActor(actor) && targets.length === 1;
  if (!canMeasurePersonalRange && !canMeasureMachineRange) {
    return explicit || String(weapon?.defaultRangeBand ?? "close").trim() || "close";
  }

  const sourceToken = getSourceToken(actor, payload);
  const targetToken = getTargetToken(targets[0]);
  const distance = measureTokenDistance(sourceToken, targetToken);
  if (canMeasureMachineRange) {
    const measuredBand = selectMechRangeBand(distance, weapon?.defaultRangeBand ?? "close");
    if (measuredBand === "outOfRange") {
      return measuredBand;
    }
    if (explicit) return explicit;
    return measuredBand;
  }

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
  const groupId = String(payload?.sourceId ?? payload?.weaponGroupId ?? payload?.machineWeaponGroup?.id ?? "").trim();
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
  const clusteringDice = profiles.reduce((sum, profile) => sum + (Math.max(0, Number(profile.clusteringDice ?? 0) || 0)), 0);
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
    clusteringDice,
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
  const sourceType = String(payload?.sourceType ?? "").trim();
  const sourceId = String(payload?.sourceId ?? "").trim();

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
    if (actor?.type === TEMPLATE.actorTypes.battlemech && (sourceType === "weaponGroup" || payload?.weaponGroupId)) {
      const sourceToken = getSourceToken(actor, payload);
      const snapshot = PersonalCombatTracker.getSnapshot?.(actor, { token: sourceToken }) ?? null;
      const usedWeaponGroupIds = snapshot?.isCurrentTurn
        ? PersonalCombatTracker.getUsedWeaponGroupIds?.(actor, { token: sourceToken, snapshot }) ?? []
        : [];
      const battlemechGroup = buildBattlemechWeaponGroupAttackProfile(actor, sourceId || payload.weaponGroupId, {
        usedWeaponGroupIds,
      });
      if (!battlemechGroup?.ok) {
        throw createUserFacingRollError(battlemechGroup?.reason || "That weapon group cannot attack right now.", {
          severity: "warn",
        });
      }
      return battlemechGroup.profile;
    }

    const groupProfile = getMachineWeaponGroupProfile(actor, payload);
    if (groupProfile) return groupProfile;

    const itemId = sourceType === "mechWeapon" ? sourceId : String(payload?.weaponId ?? "").trim();
    const item = actor.items?.get?.(itemId ?? "") ?? null;
    if (!item || !isMachineWeapon(item)) {
      throw new Error("Machine attack requires an owned vehicle or BattleMech weapon.");
    }
    return item.getCombatProfile?.() ?? null;
  }

  const itemId = sourceType === "personalWeapon" ? sourceId : String(payload?.weaponId ?? "").trim();
  const item = actor.items?.get?.(itemId ?? "") ?? null;
  if (!item || !(item.isPersonalWeapon?.() ?? item.type === "personalWeapon") || !item.system?.equipped) {
    throw new Error("Attack requires an equipped personal weapon.");
  }

  return item.getCombatProfile?.({ payloadId: payload?.payloadId }) ?? null;
}

export async function resolveAttack({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveAttack requires actor");

  const weapon = getWeaponProfile(actor, payload);
  if (!weapon) throw new Error("Unable to resolve weapon profile.");
  const machineFireControl = isMachineActor(actor) ? getMachineFireControlProfile(actor) : null;
  const clusteringProfile = buildClusteringProfile({
    clusteringDice: Number(weapon?.clusteringDice ?? 0) || 0,
    clusteringTargetNumber: Number(weapon?.clusteringTargetNumber ?? 5) || 5,
    diceModifier: Number(machineFireControl?.diceModifier ?? 0) || 0,
    targetNumberModifier: Number(machineFireControl?.targetNumberModifier ?? 0) || 0,
  });
  const effectiveWeapon = {
    ...weapon,
    clusteringDice: clusteringProfile.dice,
    clusteringTargetNumber: clusteringProfile.targetNumber,
    clusteringBaseDice: clusteringProfile.baseDice,
    clusteringBaseTargetNumber: clusteringProfile.baseTargetNumber,
    clusteringModifiers: {
      diceModifier: clusteringProfile.diceModifier,
      targetNumberModifier: clusteringProfile.targetNumberModifier,
      sourceIds: Array.isArray(machineFireControl?.sourceIds) ? [...machineFireControl.sourceIds] : [],
      sourceNames: Array.isArray(machineFireControl?.sourceNames) ? [...machineFireControl.sourceNames] : [],
      sourceLabel: String(machineFireControl?.sourceLabel ?? "").trim(),
    },
  };
  if (isMachineActor(actor)) {
    const restriction = getMachineAttackRestriction(actor, {
      weaponGroupId: payload?.weaponGroupId,
      weaponId: payload?.weaponId,
      weapon: effectiveWeapon,
    });
    if (restriction.blocked) {
      throw createUserFacingRollError(restriction.reason || "That weapon group cannot attack right now.", {
        severity: "warn",
      });
    }
    const stateRestriction = getMachineStateAttackRestriction(actor, {
      weaponGroupId: payload?.weaponGroupId,
      weaponId: payload?.weaponId,
      weapon: effectiveWeapon,
    });
    if (stateRestriction.blocked) {
      throw createUserFacingRollError(stateRestriction.reason || "The machine's current state prevents this attack.", {
        severity: "warn",
      });
    }
  }
  if (Array.isArray(effectiveWeapon?.capabilityReport?.errors) && effectiveWeapon.capabilityReport.errors.length > 0) {
    throw createUserFacingRollError(
      effectiveWeapon.capabilityReport.errors[0]?.message ?? "Weapon capability data is invalid for this attack.",
      { severity: "warn" }
    );
  }

  const skillDef = getSkillDef(effectiveWeapon.skill) ?? {
    code: effectiveWeapon.skill,
    label: effectiveWeapon.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  };

  const attrKey = String(skillDef.attribute ?? "reflexes").trim() || "reflexes";
  const attribute = actor.getAttributeValue?.(attrKey) ?? Number(actor.system?.attributes?.[attrKey]?.value ?? 0);
  const skill = actor.getSkillRating?.(effectiveWeapon.skill) ?? Number(actor.system?.skills?.[effectiveWeapon.skill]?.rating ?? 0);
  const skillBonus = Number(actor.system?.skills?.[effectiveWeapon.skill]?.bonus ?? 0);
  const ownedSpecializations = new Set(getOwnedSkillSpecializationKeys(actor.system ?? {}, effectiveWeapon.skill));
  const requestedSpecialization = getSkillSpecializationDef(effectiveWeapon.skill, payload?.specializationKey);
  const selectedSpecialization = requestedSpecialization && ownedSpecializations.has(requestedSpecialization.key)
    ? requestedSpecialization
    : null;
  const specializationBonus = selectedSpecialization ? SKILL_SPECIALIZATION_BONUS : 0;
  const accuracyBonus = Number(effectiveWeapon?.effects?.accuracyMod ?? 0) || 0;
  const bonus = skillBonus + accuracyBonus;
  const targets = getTargets(payload);
  const rangeBand = resolveRangeBand({ actor, payload, weapon: effectiveWeapon, targets });
  const rangeBandLabel = (effectiveWeapon?.type === "personalWeapon" || effectiveWeapon?.isSynthetic)
    ? getPersonalRangeBandName(rangeBand)
    : getMechRangeBandName(rangeBand);
  const attackRating = Number(effectiveWeapon?.attackRatingBand?.[rangeBand] ?? 0) || 0;
  const requiresTemplatedWorkflow = Boolean(effectiveWeapon?.capabilityReport?.isTemplated);
  const aim = payload?.aim?.active
    ? {
      active: true,
      eligible: !requiresTemplatedWorkflow && targets.length === 1,
      ineligibleReason: requiresTemplatedWorkflow
        ? "Aim cannot apply to template attacks."
        : (targets.length !== 1 ? "Aim cannot apply to multi-target attacks." : ""),
      skillCode: effectiveWeapon.skill,
      skillLabel: skillDef.label ?? effectiveWeapon.skill ?? "Attack Skill"
    }
    : null;
  if (!requiresTemplatedWorkflow && targets.length === 0) {
    throw createUserFacingRollError("Target at least one token to attack.", { severity: "warn" });
  }
  const totalAp = Number(effectiveWeapon.ap ?? 0) + Number(effectiveWeapon?.effects?.ap ?? 0);
  const attackOptions = payload?.attackOptions && typeof payload.attackOptions === "object" ? payload.attackOptions : {};
  if (isMachineActor(actor) && attackOptions.losBlocked && !attackOptions.indirectAttack) {
    throw createUserFacingRollError("Line of sight is fully blocked. Use Indirect Attack or sensor-enabled fire.", { severity: "warn" });
  }

  const machineMotion = isMachineActor(actor) && targets.length === 1
    ? buildMachineAttackMotionContext({
      targetActor: getTargetActor(targets[0]),
      payload,
    })
    : null;
  const baseDn = (effectiveWeapon?.type === "personalWeapon" || effectiveWeapon?.isSynthetic)
    ? getPersonalRangeBandBaseDn(rangeBand, 1)
    : getMechRangeBandBaseDn(rangeBand, 1);
  const hasDnOverride = Number.isFinite(Number(payload?.dn));
  const dnParts = [{
    id: "difficulty.current",
    label: (effectiveWeapon?.type === "personalWeapon" || effectiveWeapon?.isSynthetic)
      ? `Base DN (${rangeBandLabel})`
      : `Base DN (${rangeBandLabel})`,
    value: baseDn,
    tags: ["base", "range"]
  }];
  if (machineMotion?.motionDn) {
    dnParts.push({
      id: "machineMotion.actions",
      label: `Target Motion (${machineMotion.targetMotionLabel})`,
      value: machineMotion.motionDn,
      tags: ["motion"],
    });
  }
  if (machineMotion?.jumpDn) {
    dnParts.push({
      id: "machineMotion.jump",
      label: "Target Jumped",
      value: machineMotion.jumpDn,
      tags: ["motion", "jump"],
    });
  }
  const computedDn = dnParts.reduce((sum, part) => sum + Number(part.value ?? 0), 0);
  const dn = hasDnOverride ? Number(payload.dn) : computedDn;

  if (isMachineActor(actor) && isMachineRangeCappedToClose(actor) && rangeBand !== "close") {
    throw createUserFacingRollError("Sensor Blind limits attacks to Close range.", { severity: "warn" });
  }

  let ewContext = null;
  if (isMachineActor(actor) && targets.length > 0) {
    const firstTarget = targets[0];
    const targetTokenUuid = String(firstTarget?.tokenUuid ?? "").trim();
    const attackerToken = getSourceToken(actor, payload);
    const combatant = getAttackerCombatant(attackerToken);

    const targetTokenObj = canvas?.tokens?.get?.(targetTokenUuid);
    const isVisible = targetTokenObj?.visible ?? true;
    const effectiveState = isVisible ? getDetectionState(combatant, targetTokenUuid) : "blind";

    if (combatant && effectiveState === "blind") {
      throw createUserFacingRollError("No targeting solution. Acquire contact first.", { severity: "warn" });
    }

    const systemAttr = Number(actor?.system?.attributes?.system?.value ?? 0) || 0;
    const usablePacket = getUsableTargetingPacket(combatant, targetTokenUuid, systemAttr, effectiveState, game.combat?.round);

    ewContext = {
      detectionState: effectiveState,
      detectionStateLabel: getDetectionStateLabel(effectiveState),
      targetTokenUuid,
      attackerCombatantId: combatant?.id ?? null,
      activePacketId: usablePacket?.id ?? null,
      targetingDataValue: usablePacket?.value ?? 0,
    };
  }

  return {
    intent: "attack",
    rollType: "simple",
    title: `${effectiveWeapon.name} Attack`,
    subtitle: actor.name ?? "Actor",
    domains: Array.isArray(skillDef.domains) && skillDef.domains.length ? skillDef.domains : ["physical"],
    domainTags: ["combat", "attack"],
    diceTarget: Number.isFinite(Number(payload?.diceTarget)) ? Number(payload.diceTarget) : 5,
    difficulty: { dn },
    dn: {
      parts: hasDnOverride
        ? [{
          id: "difficulty.override",
          label: "DN Override",
          value: dn,
          tags: ["override"],
        }]
        : dnParts,
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
      { id: "damage", label: "Damage", value: Number(effectiveWeapon.damage ?? 0) || 0 },
      ...(clusteringProfile.active ? [
        { id: "clusterDice", label: "Cluster Dice", value: clusteringProfile.dice },
        { id: "clusterTarget", label: "Cluster TN", value: clusteringProfile.targetNumber },
      ] : []),
      { id: "ap", label: "AP", value: totalAp },
      { id: "attackRating", label: `Attack Rating (${rangeBandLabel})`, value: attackRating }
    ],
    attack: {
      rangeBand,
      weapon: effectiveWeapon,
      payload: effectiveWeapon?.payload ?? null,
      payloadState: effectiveWeapon?.payloadState ?? null,
      source: effectiveWeapon?.source ?? null,
      sourceState: effectiveWeapon?.sourceState ?? null,
      template: effectiveWeapon?.template ?? null,
      areaEffect: effectiveWeapon?.areaEffect ?? null,
      templateGeometry: payload?.templateGeometry ?? null,
      templatePlacement: payload?.templatePlacement ?? null,
      resolution: effectiveWeapon?.resolution ?? null,
      resolverKey: effectiveWeapon?.resolverKey ?? "standard",
      fireModes: effectiveWeapon?.fireModes ?? null,
      keywords: effectiveWeapon?.keywords ?? [],
      capabilityReport: effectiveWeapon?.capabilityReport ?? null,
      skill: {
        code: skillDef.code ?? effectiveWeapon.skill,
        label: skillDef.label ?? effectiveWeapon.skill,
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
      machineMotion,
      attackOptions: {
        indirectAttack: Boolean(attackOptions.indirectAttack),
        losBlocked: Boolean(attackOptions.losBlocked),
      },
    },
    specialization: selectedSpecialization ? {
      key: selectedSpecialization.key,
      label: selectedSpecialization.label,
      value: specializationBonus,
      skillKey: skillDef.code ?? effectiveWeapon.skill
    } : null
  };
}
