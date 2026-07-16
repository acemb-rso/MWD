// src/modules/roll/intent/resolve-attack.js
/**
 * @pipeline resolver
 * @role Attack resolver. Turns an attack intent into a RollContext: selects the
 *   weapon/skill, computes range band + base DN, folds in machine fire-control,
 *   clustering, motion, melee, targeting/EW and area-effect context. Assembles
 *   the *parts* (dice/DN/CQ) declaratively; it does not roll or apply damage.
 * @invariants
 *   - INVARIANT(boundary): produces context parts only. Dice are not rolled and
 *     damage is not applied here — that is execution's job (Design Principles §1.2, §10).
 *   - INVARIANT(normalize): derives range band, restrictions and modifiers at
 *     resolve time from live state; it does not read pre-persisted results (§6.1).
 *   - Legality gates (e.g. detection/indirect designation) must respect the
 *     `preview` flag so pre-dialog resolves don't throw before the player can
 *     satisfy them in the dialog (§8, mirrors resolve-intent preview contract).
 * @upstream   resolve-intent.js (RESOLVERS.attack)
 * @downstream attack-resolution.js (executes the attack this context describes)
 */


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
import { getTokenCenter } from "../../utils/token.js";
import { TEMPLATE } from "../../core/constants.js";
import { WeaponItem } from "../../item/weapon-item.js";
import { createUserFacingRollError } from "../roll-errors.js";
import { buildTargetSnapshot } from "../template-placement.js";
import { getMachineAttackRestriction } from "../../mwd/machine-crit-effects.js";
import { getDetectionStateLabel } from "../../mwd/machine-ew.js";
import {
  getAttackerCombatant,
  getEffectiveDetectionState,
  getTargetCombatant,
  getUsableTargetingPacket,
  hasValidIndirectDesignation,
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
import { resolveMachineOperator } from "../../mwd/machine-operator.js";
import {
  buildStandardMachineMeleeProfile,
  isMachineMeleeRangeAllowed,
  MACHINE_STANDARD_MELEE_ID,
  resolveMachineMeleeCombatProfile,
} from "../../mwd/machine-melee-weapons.js";
import {
  AREA_EFFECT_KINDS,
  normalizeAreaEffect,
} from "../../area-effects/area-effect-engine.js";
import { MACHINE_CHARGE_ATTACK_ID } from "../../mwd/charge-attack-actions.js";
import { getTraitActiveEffectModifier } from "../../mwd/traits.js";
import { weaponProfileHasDangerClose, weaponProfileIsLockOnly } from "../../mwd/personal-damage.js";
import {
  addPersonalFireModeAttackRating,
  buildPersonalFireModeState,
  normalizePersonalFireModeKey,
} from "../../mwd/personal-fire-modes.js";

const DAMAGE_SCALING_MODES = Object.freeze({
  direct: "direct",
  exposure: "exposure",
});

function resolveAttackDamageScaling({ areaEffect = null, requiresTemplatedWorkflow = false } = {}) {
  if (!requiresTemplatedWorkflow) return DAMAGE_SCALING_MODES.direct;
  if (areaEffect?.kind === AREA_EFFECT_KINDS.persistent) return DAMAGE_SCALING_MODES.direct;
  return DAMAGE_SCALING_MODES.exposure;
}

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

function hasActorStatus(actor = null, statusId = "") {
  const id = String(statusId ?? "").trim();
  if (!actor || !id) return false;
  const statuses = actor.statuses ?? new Set();
  if (statuses?.has?.(id)) return true;
  return Array.isArray(statuses) && statuses.includes(id);
}

function getDesignationDetectionState(targetToken = null, { attackerToken = null, combat = null } = {}) {
  const targetActor = targetToken?.actor ?? targetToken?.document?.actor ?? null;
  if (hasActorStatus(targetActor, "tagged") || hasActorStatus(targetActor, "narced")) return "lock";
  return hasValidIndirectDesignation(targetToken, { attackerToken, combat }) ? "contact" : "blind";
}

function measureTokenDistance(sourceToken, targetToken) {
  const grid = canvas?.grid;
  const sourceCenter = getTokenCenter(sourceToken);
  const targetCenter = getTokenCenter(targetToken);
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

function measureTargetsDistance(left = {}, right = {}) {
  const leftToken = getTargetToken(left);
  const rightToken = getTargetToken(right);
  return measureTokenDistance(leftToken, rightToken);
}

function annotatePersonalFireModeTargets(targets = [], fireMode = null) {
  const modeKey = normalizePersonalFireModeKey(fireMode?.key);
  const maxTargets = Math.max(1, Number(fireMode?.maxTargets ?? 1) || 1);
  if (modeKey !== "spray") {
    return targets.slice(0, maxTargets).map((target, index) => ({
      ...target,
      fireModeTargetRole: index === 0 ? "primary" : "target",
      grazeOnly: false,
    }));
  }

  const primary = targets[0] ?? null;
  if (!primary) return [];
  const secondaryCandidates = targets
    .slice(1)
    .map(target => ({
      target,
      distance: measureTargetsDistance(primary, target),
    }))
    .filter(entry => Number.isFinite(entry.distance) && entry.distance <= 6)
    .sort((left, right) => left.distance - right.distance)
    .slice(0, Math.max(0, maxTargets - 1));

  return [
    { ...primary, fireModeTargetRole: "primary", grazeOnly: false },
    ...secondaryCandidates.map(entry => ({
      ...entry.target,
      fireModeTargetRole: "secondary",
      grazeOnly: true,
      primaryTargetTokenUuid: primary.tokenUuid ?? null,
      primaryTargetActorUuid: primary.actorUuid ?? null,
      primaryTargetDistance: entry.distance,
    })),
  ];
}

function resolveRangeBand({ actor, payload, weapon, targets = [] } = {}) {
  const explicit = String(payload?.rangeBand ?? "").trim().toLowerCase();
  const canMeasurePersonalRange = (weapon?.type === "personalWeapon" || weapon?.isSynthetic) && targets.length >= 1;
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
    if (explicit) return isMachineMeleeRangeAllowed(weapon, explicit) ? explicit : "outOfRange";
    if (!isMachineMeleeRangeAllowed(weapon, measuredBand)) return "outOfRange";
    return measuredBand;
  }

  const measuredBand = selectPersonalRangeBand(distance, weapon?.range ?? {}, weapon?.defaultRangeBand ?? "close");
  if (measuredBand === "outOfRange") {
    return measuredBand;
  }

  if (explicit) return explicit;

  if ((weapon?.type !== "personalWeapon" && !weapon?.isSynthetic) || targets.length < 1) {
    return String(weapon?.defaultRangeBand ?? "close").trim() || "close";
  }
  return measuredBand;
}

function isMachineWeapon(item) {
  return ["mechWeapon", "vehicleWeapon"].includes(item?.canonicalType ?? item?.type);
}

function startCase(value = "") {
  return String(value ?? "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
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
    baseDamageType: first.baseDamageType ?? first.damageType ?? "energy",
    baseDamageTypeLabel: first.baseDamageTypeLabel ?? first.damageTypeLabel ?? "Energy",
    damageType: first.damageType ?? first.baseDamageType ?? "energy",
    damageTypeLabel: first.damageTypeLabel ?? first.baseDamageTypeLabel ?? "Energy",
    attackRatingBand,
    range: first.range ?? {},
    defaultRangeBand: first.defaultRangeBand ?? "near",
    // Danger Close is contagious: if any firing member has a minimum arming
    // distance, the whole group is treated as Danger Close at the legality gate.
    effects: profiles.some(profile => weaponProfileHasDangerClose(profile))
      ? { flags: ["dangerClose"] }
      : {},
    // Likewise lock-only: if any member is lock-only, the group requires a sensor lock.
    keywords: profiles.some(profile => weaponProfileIsLockOnly(profile)) ? ["lock-only"] : [],
    notes: profiles.map(profile => profile.notes).filter(Boolean).join("\n"),
  };
}

function getWeaponProfile(actor, payload) {
  const sourceType = String(payload?.sourceType ?? "").trim();
  const sourceId = String(payload?.sourceId ?? "").trim();

  if (isMachineActor(actor) && payload?.syntheticWeapon?.id === MACHINE_STANDARD_MELEE_ID) {
    return {
      ...buildStandardMachineMeleeProfile(actor),
      ...payload.syntheticWeapon,
      id: MACHINE_STANDARD_MELEE_ID,
      damage: 0,
      attackRatingBand: {
        close: 0,
        near: 0,
        far: 0,
        extreme: 0,
        ...(payload.syntheticWeapon?.attackRatingBand ?? {}),
      },
      isSynthetic: true,
      defaultRangeBand: "close",
    };
  }

  if (isMachineActor(actor) && payload?.syntheticWeapon?.id === MACHINE_CHARGE_ATTACK_ID) {
    // Pass the charge synthetic weapon through exactly as built — damage must not be zeroed.
    return { ...payload.syntheticWeapon, isSynthetic: true };
  }

  if (payload?.syntheticWeapon?.id === "grapple") {
    return {
      id: "grapple",
      uuid: "",
      name: payload.syntheticWeapon.name ?? "Grapple",
      type: "personalWeapon",
      category: "melee",
      skill: "meleeCombat",
      attributeKey: "strength",
      damage: 0,
      ap: 0,
      damageType: "concussive",
      damageTypeLabel: "Concussive",
      damageTrack: TEMPLATE.monitors.physical,
      attackRatingBand: { close: 0, near: 0, far: 0, extreme: 0 },
      range: { max: "close", close: 20, near: 0, far: 0, extreme: 0 },
      defaultRangeBand: "close",
      effects: {},
      traits: [],
      keywords: ["grapple"],
      resolution: { effect: "grapple", damageModel: "status" },
      isSynthetic: true,
      capabilityReport: { isTemplated: false, errors: [] },
    };
  }

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

// Personal attacks adjust DN by motion: the attacker moving costs accuracy
// (+1 DN), while a target's own movement shifts how hard it is to hit -
// stationary targets are easier (-1 DN) and heavily moving targets harder
// (+1 DN at 2+ move actions). Only resolvable against a single target.
function buildPersonalAttackMotionContext({ actor, payload, targets = [] } = {}) {
  if (targets.length !== 1) return null;

  const combat = game?.combat ?? null;
  const sourceToken = getSourceToken(actor, payload);
  const attackerCombatant = getAttackerCombatant(sourceToken);
  const targetCombatant = getTargetCombatant(targets[0]?.tokenId);
  const targetActor = getTargetActor(targets[0]);
  const attackerMoves = PersonalCombatTracker.getMoveActionCountForCombatant(attackerCombatant, { combat });
  const targetMoves = targetActor?.statuses?.has?.("pinned")
    ? 0
    : PersonalCombatTracker.getMoveActionCountForCombatant(targetCombatant, { combat });

  const attackerMotionDn = (attackerMoves > 0 && !getTraitActiveEffectModifier(actor, "suppressAttackerMotionDN")) ? 1 : 0;
  const targetMotionDn = targetMoves === 0 ? -1 : (targetMoves >= 2 ? 1 : 0);

  return {
    attackerMoves,
    targetMoves,
    attackerMotionDn,
    targetMotionDn,
    attackerMotionLabel: attackerMoves > 0 ? "Attacker Moved" : "Attacker Stationary",
    targetMotionLabel: targetMoves === 0
      ? "Target Stationary"
      : (targetMoves >= 2 ? "Target Moved 2+" : "Target Moved"),
    dnModifier: attackerMotionDn + targetMotionDn,
  };
}

export async function resolveAttack({ actor, payload, preview = false } = {}) {
  if (!actor) throw new Error("resolveAttack requires actor");

  const rawWeapon = getWeaponProfile(actor, payload);
  if (!rawWeapon) throw new Error("Unable to resolve weapon profile.");
  const operator = isMachineActor(actor)
    ? await resolveMachineOperator({
      machineActor: actor,
      operatorActorUuid: String(payload?.operatorActorUuid ?? "").trim(),
    })
    : null;
  const rollActor = operator?.actor ?? actor;
  const weapon = isMachineActor(actor)
    ? resolveMachineMeleeCombatProfile({ machineActor: actor, pilotActor: rollActor, profile: rawWeapon })
    : rawWeapon;
  const machineFireControl = isMachineActor(actor)
    ? getMachineFireControlProfile(actor, {
      payload,
      resolved: {
        intent: "attack",
        attack: { weapon },
      },
    })
    : null;
  const clusteringProfile = buildClusteringProfile({
    clusteringDice: Number(weapon?.clusteringDice ?? 0) || 0,
    clusteringTargetNumber: Number(weapon?.clusteringTargetNumber ?? 5) || 5,
    diceModifier: Number(machineFireControl?.diceModifier ?? 0) || 0,
    targetNumberModifier: Number(machineFireControl?.targetNumberModifier ?? 0) || 0,
  });
  let effectiveWeapon = {
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
  const isPersonalWeaponAttack = effectiveWeapon?.type === "personalWeapon";
  const requestedFireMode = normalizePersonalFireModeKey(payload?.fireMode ?? payload?.weaponFireMode ?? "single");
  let fireModeState = null;
  if (isPersonalWeaponAttack) {
    fireModeState = buildPersonalFireModeState(effectiveWeapon, requestedFireMode);
    if (!fireModeState.requested.enabled) {
      throw createUserFacingRollError(fireModeState.requested.reason || "That fire mode is not available.", {
        severity: "warn",
      });
    }
    effectiveWeapon = {
      ...effectiveWeapon,
      attackRatingBand: addPersonalFireModeAttackRating(effectiveWeapon.attackRatingBand, fireModeState.selected),
      fireMode: fireModeState.selected,
      fireModeState,
    };
  }
  if (payload?.suppressionFire?.active) {
    const suppressionTemplate = payload.suppressionFire.template ?? {};
    effectiveWeapon = {
      ...effectiveWeapon,
      damage: 0,
      template: {
        shape: String(suppressionTemplate.shape ?? "cone").trim() || "cone",
        size: Math.max(1, Number(suppressionTemplate.size ?? 10) || 10),
        placement: String(suppressionTemplate.placement ?? "origin").trim() || "origin",
      },
      resolution: {
        ...(effectiveWeapon.resolution ?? {}),
        resolverKey: "template",
        damageModel: "suppression",
      },
      resolverKey: "template",
      capabilityReport: {
        ...(effectiveWeapon.capabilityReport ?? {}),
        errors: [],
        liveCapabilities: ["templated"],
        isTemplated: true,
        template: {
          shape: String(suppressionTemplate.shape ?? "cone").trim() || "cone",
          size: Math.max(1, Number(suppressionTemplate.size ?? 10) || 10),
          placement: String(suppressionTemplate.placement ?? "origin").trim() || "origin",
        },
      },
      suppressionFire: true,
    };
  }
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

  const attrKey = String(effectiveWeapon.attributeKey ?? effectiveWeapon.attrKey ?? skillDef.attribute ?? "reflexes").trim() || "reflexes";
  const attrLabel = startCase(attrKey);
  const attribute = rollActor.getAttributeValue?.(attrKey) ?? Number(rollActor.system?.attributes?.[attrKey]?.value ?? 0);
  const skill = rollActor.getSkillRating?.(effectiveWeapon.skill) ?? Number(rollActor.system?.skills?.[effectiveWeapon.skill]?.rating ?? 0);
  const skillBonus = Number(rollActor.system?.skills?.[effectiveWeapon.skill]?.bonus ?? 0);
  const ownedSpecializations = new Set(getOwnedSkillSpecializationKeys(rollActor.system ?? {}, effectiveWeapon.skill));
  const requestedSpecialization = getSkillSpecializationDef(effectiveWeapon.skill, payload?.specializationKey);
  const selectedSpecialization = requestedSpecialization && ownedSpecializations.has(requestedSpecialization.key)
    ? requestedSpecialization
    : null;
  const specializationBonus = selectedSpecialization ? SKILL_SPECIALIZATION_BONUS : 0;
  const accuracyBonus = Number(effectiveWeapon?.effects?.accuracyMod ?? 0) || 0;
  const fireModeDiceBonus = Number(effectiveWeapon?.fireMode?.diceModifier ?? 0) || 0;
  const bonus = skillBonus + accuracyBonus + fireModeDiceBonus;
  const targets = isPersonalWeaponAttack
    ? annotatePersonalFireModeTargets(getTargets(payload), effectiveWeapon.fireMode)
    : getTargets(payload);
  const rangeBand = resolveRangeBand({ actor, payload, weapon: effectiveWeapon, targets });
  const rangeBandLabel = (effectiveWeapon?.type === "personalWeapon" || effectiveWeapon?.isSynthetic)
    ? getPersonalRangeBandName(rangeBand)
    : getMechRangeBandName(rangeBand);
  const attackRating = Number(effectiveWeapon?.attackRatingBand?.[rangeBand] ?? 0) || 0;
  const requiresTemplatedWorkflow = Boolean(effectiveWeapon?.capabilityReport?.isTemplated);
  const areaEffect = normalizeAreaEffect(effectiveWeapon?.areaEffect ?? {});
  const damageScaling = resolveAttackDamageScaling({ areaEffect, requiresTemplatedWorkflow });
  const isPersonalAttack = effectiveWeapon?.type === "personalWeapon" || effectiveWeapon?.isSynthetic;
  const personalMotion = isPersonalAttack
    ? buildPersonalAttackMotionContext({ actor, payload, targets })
    : null;
  const attackerMovedThisActivation = (personalMotion?.attackerMoves ?? 0) > 0;
  const aimEligible = Boolean(payload?.aim?.active) && !requiresTemplatedWorkflow && targets.length === 1 && !attackerMovedThisActivation && effectiveWeapon.category !== "melee";
  const aimPerceptionBonus = aimEligible
    ? Math.max(0, rollActor.getSkillRating?.("perception") ?? Number(rollActor.system?.skills?.perception?.rating ?? 0))
    : 0;
  const aim = payload?.aim?.active
    ? {
      active: true,
      eligible: aimEligible,
      ineligibleReason: requiresTemplatedWorkflow
        ? "Aim cannot apply to template attacks."
        : (targets.length !== 1
          ? "Aim cannot apply to multi-target attacks."
          : (attackerMovedThisActivation
            ? "Aim is spoiled after moving this activation."
            : (effectiveWeapon.category === "melee" ? "Aim does not apply to melee attacks." : ""))),
      skillCode: effectiveWeapon.skill,
      skillLabel: skillDef.label ?? effectiveWeapon.skill ?? "Attack Skill",
      bonusSkillCode: "perception",
      bonusSkillLabel: "Perception",
      bonusValue: aimPerceptionBonus,
    }
    : null;
  if (!requiresTemplatedWorkflow && targets.length === 0) {
    throw createUserFacingRollError("Target at least one token to attack.", { severity: "warn" });
  }
  const totalAp = Number(effectiveWeapon.ap ?? 0) + Number(effectiveWeapon?.effects?.ap ?? 0);
  const attackOptions = payload?.attackOptions && typeof payload.attackOptions === "object" ? payload.attackOptions : {};
  // Danger Close (minimum arming distance): block Close-range attacks unless the
  // player declares a Hot Load override for this attack. Pure legality gate — adds
  // no DN, damage, or other mechanical effect. The resolver is the sole authority.
  // Skip during preview so the roll dialog can open and surface the Hot Load
  // toggle; the final (non-preview) resolve is the authoritative legality gate.
  const hotLoad = attackOptions?.hotLoad === true;
  if (!preview && rangeBand === "close" && weaponProfileHasDangerClose(effectiveWeapon) && !hotLoad) {
    throw createUserFacingRollError(
      `${effectiveWeapon.name} has a minimum arming distance and cannot fire at Close range. Enable Hot Load to override for this attack.`,
      { severity: "warn" }
    );
  }
  let indirectDesignationValid = false;
  let indirectDesignationState = "blind";
  if (isMachineActor(actor) && attackOptions.losBlocked) {
    if (!attackOptions.indirectAttack) {
      throw createUserFacingRollError("Line of sight is fully blocked. Use Indirect Attack or sensor-enabled fire.", { severity: "warn" });
    }
    // Indirect fire at an unseen target requires a spotter: a valid allied spot,
    // or a TAG/NARC designation. LoS-bypass only — no Lock or targeting-data is granted here.
    const indirectTargetUuid = String(targets[0]?.tokenUuid ?? "").trim();
    const indirectTargetToken = canvas?.tokens?.get?.(String(targets[0]?.tokenId ?? "").trim())
      ?? canvas?.tokens?.placeables?.find(t => (t.document?.uuid ?? t.uuid) === indirectTargetUuid)
      ?? null;
    const indirectAttackerToken = getSourceToken(actor, payload);
    indirectDesignationState = getDesignationDetectionState(indirectTargetToken, { attackerToken: indirectAttackerToken, combat: game.combat });
    indirectDesignationValid = indirectDesignationState !== "blind";
    if (!indirectDesignationValid) {
      throw createUserFacingRollError("No spotter has designated this target — you cannot fire indirectly at a unit you cannot see.", { severity: "warn" });
    }
  }
  const attackKindDomain = effectiveWeapon.category === "melee" ? "attack.melee" : "attack.ranged";
  const weaponTypeDomains = [
    effectiveWeapon.damageType,
    effectiveWeapon.baseDamageType,
    effectiveWeapon.weaponType,
    effectiveWeapon.weaponCategory,
  ]
    .map(value => String(value ?? "").trim().toLowerCase())
    .filter(Boolean)
    .map(value => `attack.${value}`);

  const machineMotion = isMachineActor(actor) && targets.length === 1
    ? buildMachineAttackMotionContext({
      attackerCombatant: getAttackerCombatant(getSourceToken(actor, payload)),
      targetActor: getTargetActor(targets[0]),
      targetCombatant: getTargetCombatant(targets[0]?.tokenId),
      payload,
      suppressAttackerMotion: Boolean(payload?.chargeAttack)
        || String(payload?.syntheticWeapon?.id ?? "") === MACHINE_CHARGE_ATTACK_ID,
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
  if (machineMotion?.attackerMotionDn) {
    dnParts.push({
      id: "machineMotion.attacker",
      label: `Attacker Motion (${machineMotion.attackerMotionLabel})`,
      value: machineMotion.attackerMotionDn,
      tags: ["motion"],
    });
  }
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
  if (personalMotion?.attackerMotionDn) {
    dnParts.push({
      id: "personalMotion.attacker",
      label: personalMotion.attackerMotionLabel,
      value: personalMotion.attackerMotionDn,
      tags: ["motion"],
    });
  }
  if (personalMotion?.targetMotionDn) {
    dnParts.push({
      id: "personalMotion.target",
      label: personalMotion.targetMotionLabel,
      value: personalMotion.targetMotionDn,
      tags: ["motion"],
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

    const targetTokenObj = getTargetToken(firstTarget)
      ?? canvas?.tokens?.placeables?.find(t => (t.document?.uuid ?? t.uuid) === targetTokenUuid)
      ?? null;
    const isVisible = targetTokenObj?.visible ?? true;
    const effectiveState = isVisible ? getEffectiveDetectionState(combatant, targetTokenUuid, targetTokenObj?.actor) : "blind";

    if (combatant && effectiveState === "blind" && !indirectDesignationValid) {
      throw createUserFacingRollError("No targeting solution. Acquire contact first.", { severity: "warn" });
    }

    // Lock-only weapons may only fire on a target held at the "lock" detection state.
    // Like the blind gate above, there is no in-dialog override, so this is enforced on
    // every resolve (no preview exemption). BattleMech weapon groups are gated upstream
    // in buildBattlemechWeaponGroupAttackProfile; this covers single weapons and the
    // generic machine-weapon-group path.
    if (combatant && weaponProfileIsLockOnly(effectiveWeapon) && effectiveState !== "lock") {
      throw createUserFacingRollError(
        `${effectiveWeapon.name} can only fire on a target with a sensor lock.`,
        { severity: "warn" }
      );
    }

    const systemAttr = Number(actor?.system?.attributes?.system?.value ?? 0) || 0;
    const usablePacket = getUsableTargetingPacket(combatant, targetTokenUuid, systemAttr, effectiveState, game.combat?.round);
    const displayState = effectiveState === "blind" && indirectDesignationValid ? indirectDesignationState : effectiveState;

    ewContext = {
      detectionState: displayState,
      detectionStateLabel: getDetectionStateLabel(displayState),
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
    domainTags: Array.from(new Set(["combat", "attack", attackKindDomain, ...weaponTypeDomains])),
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
    pool: { attribute, skill, bonus: bonus + aimPerceptionBonus, specialization: specializationBonus },
    breakdown: [
      {
        id: "attribute",
        label: operator?.actor?.name ? `${attrLabel} (${operator.actor.name})` : attrLabel,
        value: attribute
      },
      { id: "skill", label: operator?.actor?.name ? `${skillDef.label} (${operator.actor.name})` : skillDef.label, value: skill },
      { id: "bonus", label: "Skill Bonus", value: skillBonus },
      ...(selectedSpecialization ? [{
        id: "specialization",
        label: `Specialization (${selectedSpecialization.label})`,
        value: specializationBonus
      }] : []),
      { id: "weaponAccuracy", label: "Weapon Accuracy", value: accuracyBonus },
      ...(fireModeDiceBonus ? [{ id: "fireMode", label: `Fire Mode (${effectiveWeapon.fireMode.label})`, value: fireModeDiceBonus }] : []),
      ...(aimPerceptionBonus ? [{ id: "aim.perception", label: "Aim (Perception)", value: aimPerceptionBonus }] : []),
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
      areaEffect,
      damageScaling,
      suppressionFire: Boolean(payload?.suppressionFire?.active),
      templateGeometry: payload?.templateGeometry ?? null,
      templatePlacement: payload?.templatePlacement ?? null,
      resolution: effectiveWeapon?.resolution ?? null,
      resolverKey: effectiveWeapon?.resolverKey ?? "standard",
      fireModes: effectiveWeapon?.fireModes ?? null,
      fireMode: effectiveWeapon?.fireMode ?? null,
      fireModeState: effectiveWeapon?.fireModeState ?? null,
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
      personalMotion,
      operator: operator ? {
        actorUuid: operator.actor?.uuid ?? "",
        name: operator.actor?.name ?? "",
        source: operator.source ?? "",
        reason: operator.reason ?? "",
      } : null,
      attackOptions: {
        indirectAttack: Boolean(attackOptions.indirectAttack),
        losBlocked: Boolean(attackOptions.losBlocked),
        hotLoad: Boolean(attackOptions.hotLoad),
      },
    },
    rollActor,
    specialization: selectedSpecialization ? {
      key: selectedSpecialization.key,
      label: selectedSpecialization.label,
      value: specializationBonus,
      skillKey: skillDef.code ?? effectiveWeapon.skill
    } : null
  };
}
