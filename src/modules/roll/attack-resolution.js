// src/modules/roll/attack-resolution.js
/**
 * @pipeline context
 * @role Canonical AttackResolution. Given a resolved attack context and the roll
 *   outcome, produces the per-target CQ / outcome / hit-location / damage data
 *   that is the one true representation of an attack's result (Design Principles §6.2).
 *   Handles exposure/area-effect scaling, clustering, machine hit locations,
 *   criticals-severity and trait/status CQ adjustments.
 * @invariants
 *   - INVARIANT(canonical): AttackResolution is the single shape for attack
 *     results. Do not introduce a parallel combat resolution path (§2.3, §6.2).
 *   - INVARIANT(order): consumes an already-rolled outcome and derives damage
 *     from it. It runs at step "resolve outcome → apply damage"; it does not
 *     roll the attack dice itself (§10, steps 7–8).
 *   - Operates on additive, inspectable parts (CQ adjustments, exposure scaling),
 *     never on hardcoded per-weapon special cases (§3.2, §3.3).
 * @upstream   mwd-roll.js execute() → resolveAttackExecution
 * @downstream harm-engine.js (applies the damage this produces)
 */

import { HarmEngine } from "../harm/harm-engine.js";
import { TEMPLATE } from "../core/constants.js";
import { getPersonalDamageTypeLabel, normalizePersonalDamageType } from "../mwd/personal-damage.js";
import { getPersonalRangeBandName } from "../mwd/personal-range-bands.js";
import {
  isMachineActor,
  resolveMachineHitLocation,
  rollMachineHitLocationTotal,
} from "../mwd/machine-hit-locations.js";
import {
  AREA_EFFECT_KINDS,
  applyEvadeToExposure,
  cloneTemplateGeometry,
  createExposureData,
  getExposureLabel,
  normalizeAreaEffect,
  normalizeExposureTier,
  normalizeTemplateGeometry,
  scaleDamageByExposure,
} from "../area-effects/area-effect-engine.js";
import { createHazardRegionFromAttack } from "../area-effects/hazard-regions.js";
import { getMachineAttackDamageModifier } from "../mwd/machine-crit-effects.js";
import { getMachineAttackCqAdjustments, getMachineHeatAdjustments } from "../mwd/machine-state-effects.js";
import { getAssetModuleCqEffects } from "../mwd/asset-module-effects.js";
import { getMachineJumpProfile, getMachineJumpedThisActivation } from "../mwd/battlemech-mobility.js";
import { rollClusteringDamage } from "../mwd/machine-clustering.js";
import { isMachineEnergyDamageFamily } from "../mwd/machine-weapon-types.js";
import { severityFromMargin } from "../mwd/personal-criticals.js";
import {
  buildAttackRatingTraitFacts,
  buildDefenseRatingTraitFacts,
  evaluateTraitPhase,
  getTraitActiveEffectModifier,
} from "../mwd/traits.js";
import { collectStatusCqAdjustments } from "../status/status-mechanics.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function getGrappleStatus(actor = null) {
  if (!actor?.statuses?.has) return "";
  if (actor.statuses.has("pinned")) return "pinned";
  if (actor.statuses.has("restrained")) return "restrained";
  if (actor.statuses.has("grappled")) return "grappled";
  return "";
}

function getGrappleEffectStatus({ outcome = "miss", targetActor = null } = {}) {
  if (outcome === "miss") return "";
  if (outcome === "graze") return "grappled";
  const current = getGrappleStatus(targetActor);
  return current === "restrained" || current === "pinned" ? "pinned" : "restrained";
}

function getGrappleStatusLabel(statusId = "") {
  if (statusId === "pinned") return "Pinned";
  if (statusId === "restrained") return "Restrained";
  if (statusId === "grappled") return "Grappled";
  return "No effect";
}

function getStatusMetadata(actor = null, statusId = "") {
  const id = String(statusId ?? "").trim();
  if (!actor || !id) return null;
  const effects = Array.from(actor.effects?.contents ?? actor.effects ?? []);
  const effect = effects.find(entry => {
    if (entry?.statuses?.has?.(id)) return true;
    if (Array.isArray(entry?.statuses) && entry.statuses.includes(id)) return true;
    if (entry?.flags?.mwd?.status?.id === id) return true;
    if (entry?.getFlag?.("mwd", "status")?.id === id) return true;
    return false;
  }) ?? null;
  return effect?.getFlag?.("mwd", "status") ?? effect?.flags?.mwd?.status ?? null;
}

export function parseOnHitEffect(value) {
  const str = String(value ?? "").trim().toLowerCase();
  if (str === "onfire") return { kind: "onFire" };
  if (str === "tagged" || str === "tag") return { kind: "status", statusId: "tagged" };
  if (str === "narced" || str === "narc") return { kind: "status", statusId: "narced" };
  if (str === "spotted" || str === "spot") return { kind: "status", statusId: "spotted" };
  const match = str.match(/^(burn|heat)\+(\d+(?:\.\d+)?)$/);
  if (!match) return null;
  const amount = Math.max(0, Number(match[2]) || 0);
  return amount > 0 ? { kind: match[1], amount } : null;
}

export function doesAttackAddNetHitsToDamage(weapon = null) {
  // Personal and synthetic attacks now deal flat damage; margin feeds the
  // Personal Critical Hit engine instead of adding damage.
  return false;
}

function usesExposureDamageScaling(attack = {}) {
  return String(attack?.damageScaling ?? "direct").trim().toLowerCase() === "exposure";
}

function getTargetSnapshots(ctx = {}) {
  const targets = Array.isArray(ctx?.attack?.targets) ? ctx.attack.targets : [];
  const areaEffect = normalizeAreaEffect(ctx?.attack?.areaEffect ?? ctx?.attack?.payload?.areaEffect ?? {});
  if (!targets.length && areaEffect.kind !== AREA_EFFECT_KINDS.persistent) {
    throw new Error("Attack requires at least one target.");
  }
  return targets;
}

async function getTargetActor(target = {}) {
  if (!target?.actorUuid) return null;
  try {
    return await fromUuid(target.actorUuid);
  } catch (error) {
    console.warn("MWD | Unable to resolve attack target actor for CQ", target, error);
    return null;
  }
}

function getTargetAttributeValue(target = {}, actor = null, key = "") {
  return Math.max(0, toNumber(
    target?.attributes?.[key]
      ?? actor?.getAttributeValue?.(key)
      ?? actor?.system?.attributes?.[key]?.value,
    0
  ));
}

function getTargetSkillRating(target = {}, actor = null, key = "") {
  return Math.max(0, toNumber(
    target?.skills?.[key]?.rating
      ?? actor?.getSkillRating?.(key)
      ?? actor?.system?.skills?.[key]?.rating,
    0
  ));
}

function sumParts(parts = []) {
  return parts.reduce((sum, part) => sum + toNumber(part?.value, 0), 0);
}

function pushStatusCqParts(parts = [], actor = null, { role = "", target = "ar" } = {}) {
  for (const entry of collectStatusCqAdjustments(actor, { role })) {
    const value = toNumber(entry?.[target], 0);
    if (!value) continue;
    parts.push({
      id: `status.${entry.statusId}.${entry.id ?? target}`,
      label: entry.sourceStatusLabel ?? entry.statusId ?? "Status",
      value,
    });
  }
}

async function buildCQBreakdown({ attacker = null, ctx = {}, target = {} } = {}) {
  const targetActor = await getTargetActor(target);
  const attackRating = Math.max(0, Number(ctx?.attack?.weapon?.attackRatingBand?.[ctx?.attack?.rangeBand] ?? 0) || 0);
  const targetIsMachine = isMachineActor(targetActor);
  const defenseAttributeKey = targetIsMachine ? TEMPLATE.actorAttributes.handling : "reflexes";
  const targetDefenseAttribute = getTargetAttributeValue(target, targetActor, defenseAttributeKey);
  const targetReflexDefense = targetDefenseAttribute + targetDefenseAttribute;
  const attackSkillCode = String(ctx?.attack?.skill?.code ?? ctx?.attack?.weapon?.skill ?? "").trim();
  const attackSkillLabel = String(ctx?.attack?.skill?.label ?? attackSkillCode ?? "Attack Skill").trim() || "Attack Skill";
  const attackerSkill = attackSkillCode
    ? Math.max(0, toNumber(attacker?.getSkillRating?.(attackSkillCode) ?? attacker?.system?.skills?.[attackSkillCode]?.rating, 0))
    : 0;
  const defenderSkillCode = targetIsMachine ? "piloting" : "tactics";
  const defenderSkillLabel = targetIsMachine ? "Piloting" : "Tactics";
  const defenderTactics = getTargetSkillRating(target, targetActor, defenderSkillCode);
  const skillDelta = attackerSkill - defenderTactics;
  const skillAdvantage = Math.abs(skillDelta);
  const armorDefense = Math.max(0, Number(target?.activeArmor?.defenseBonus ?? 0) || 0);
  const rawRangeLabel = String(ctx?.attack?.rangeBand ?? "").trim() || "range";
  const rangeLabel = (ctx?.attack?.weapon?.type === "personalWeapon" || ctx?.attack?.weapon?.isSynthetic)
    ? getPersonalRangeBandName(rawRangeLabel)
    : rawRangeLabel;
  const arParts = [{
    id: "weapon.attackRating",
    label: `Weapon AR (${rangeLabel})`,
    value: attackRating
  }];
  const drParts = [{
    id: targetIsMachine ? "target.handlingDefense" : "target.reflexesDefense",
    label: targetIsMachine ? "Target Handling + Handling" : "Target REF + REF",
    value: targetReflexDefense
  }];

  if (skillDelta > 0) {
    arParts.push({
      id: "skill.attackVsTactics",
      label: `${attackSkillLabel} over Tactics`,
      value: skillAdvantage
    });
  } else if (skillDelta < 0) {
    drParts.push({
      id: "target.tacticsAdvantage",
      label: `${defenderSkillLabel} over ${attackSkillLabel}`,
      value: skillAdvantage
    });
  }

  if (ctx?.attack?.aim?.eligible) {
    const aimSkillCode = String(ctx?.attack?.aim?.bonusSkillCode ?? "perception").trim() || "perception";
    const aimSkillLabel = String(ctx?.attack?.aim?.bonusSkillLabel ?? "Perception").trim() || "Perception";
    const aimBonus = Math.max(0, toNumber(
      attacker?.getSkillRating?.(aimSkillCode) ?? attacker?.system?.skills?.[aimSkillCode]?.rating,
      0
    ));
    arParts.push({
      id: "state.aim",
      label: `Aim (${aimSkillLabel})`,
      value: aimBonus
    });
  }

  pushStatusCqParts(arParts, attacker, { role: "attacker", target: "ar" });

  if (attacker?.statuses?.has?.("restrained")) {
    arParts.push({
      id: "status.restrained.attackRating",
      label: "Restrained",
      value: -2,
    });
  }

  if (attacker?.statuses?.has?.("grappled")) {
    const grapplerUuid = String(getStatusMetadata(attacker, "grappled")?.attackerUuid ?? "").trim();
    const targetActorUuid = String(target?.actorUuid ?? "").trim();
    if (grapplerUuid && targetActorUuid && grapplerUuid !== targetActorUuid) {
      arParts.push({
        id: "status.grappled.attackRating",
        label: "Grappled (not grappler)",
        value: -2,
      });
    }
  }

  drParts.push({
    id: "target.armorDefense",
    label: "Armor Defense",
    value: armorDefense
  });

  pushStatusCqParts(drParts, targetActor, { role: "defender", target: "dr" });

  if (targetActor?.statuses?.has?.("grappled") && String(ctx?.attack?.rangeBand ?? "").trim().toLowerCase() === "close") {
    drParts.push({
      id: "status.grappled.closeDefense",
      label: "Grappled (Close)",
      value: -2,
    });
  }

  if (isMachineActor(attacker)) {
    const attackerAdjustments = getMachineAttackCqAdjustments(attacker, {
      rangeBand: ctx?.attack?.rangeBand,
      role: "attacker",
      target,
    });
    if (attackerAdjustments.ar) {
      arParts.push({
        id: "machineState.attackAr",
        label: "Machine State",
        value: attackerAdjustments.ar,
      });
    }
    for (const effect of getAssetModuleCqEffects(attacker, { resolved: ctx, payload: ctx?.attack?.payload ?? {} })) {
      const ar = toNumber(effect.modifies?.ar, 0);
      if (!ar) continue;
      arParts.push({
        id: `assetModule.${effect.sourceId}.${effect.id}.ar`,
        label: effect.label,
        value: ar,
      });
    }
    if (getMachineJumpedThisActivation(attacker)) {
      const jumpAr = toNumber(getMachineJumpProfile(attacker)?.attackRatingBonus, 0);
      if (jumpAr) {
        arParts.push({ id: "jumping.attackRatingBonus", label: "Jump Maneuver", value: jumpAr });
      }
    }
  }

  if (targetIsMachine) {
    const targetAdjustments = getMachineAttackCqAdjustments(targetActor, {
      rangeBand: ctx?.attack?.rangeBand,
      role: "defender",
      target,
    });
    if (targetAdjustments.dr) {
      drParts.push({
        id: "machineState.defenseDr",
        label: "Machine State",
        value: targetAdjustments.dr,
      });
    }
    for (const effect of getAssetModuleCqEffects(targetActor, { resolved: ctx, payload: ctx?.attack?.payload ?? {} })) {
      const dr = toNumber(effect.modifies?.dr, 0);
      if (!dr) continue;
      drParts.push({
        id: `assetModule.${effect.sourceId}.${effect.id}.dr`,
        label: effect.label,
        value: dr,
      });
    }
    if (getMachineJumpedThisActivation(targetActor)) {
      const jumpDr = toNumber(getMachineJumpProfile(targetActor)?.defenseRatingBonus, 0);
      if (jumpDr) {
        drParts.push({ id: "jumping.defenseRatingBonus", label: "Jump Maneuver", value: jumpDr });
      }
    }
  }

  const activeEffectAr = getTraitActiveEffectModifier(attacker, "attackRatingMod");
  if (activeEffectAr) {
    arParts.push({
      id: "activeEffect.attackRatingMod",
      label: "Active Effect AR",
      value: activeEffectAr,
    });
  }
  const arPacket = { total: sumParts(arParts) };
  const arTraitPhase = evaluateTraitPhase({
    actor: attacker,
    phase: "onAttackRatingResolved",
    facts: buildAttackRatingTraitFacts({ actor: attacker, packet: arPacket, runtime: {} }),
    packet: arPacket,
    options: { consumeUsage: false },
  });
  for (const modifier of arTraitPhase.modifiers) {
    arParts.push({
      id: modifier.id,
      label: modifier.label,
      value: Number(modifier.value ?? 0),
    });
  }
  let arTotal = Number(arTraitPhase.packet.total ?? sumParts(arParts)) || 0;
  if (attacker?.statuses?.has?.("pinned")) {
    arParts.push({
      id: "status.pinned.attackRatingOverride",
      label: "Pinned (AR override)",
      value: -arTotal,
    });
    arTotal = 0;
  }

  const activeEffectDr = getTraitActiveEffectModifier(targetActor, "defenseRatingMod");
  if (activeEffectDr) {
    drParts.push({
      id: "activeEffect.defenseRatingMod",
      label: "Active Effect DR",
      value: activeEffectDr,
    });
  }
  const drPacket = { total: sumParts(drParts) };
  const drTraitPhase = evaluateTraitPhase({
    actor: targetActor,
    phase: "onDefenseRatingResolved",
    facts: buildDefenseRatingTraitFacts({
      actor: targetActor,
      packet: drPacket,
      runtime: {},
    }),
    packet: drPacket,
    options: { consumeUsage: false },
  });
  for (const modifier of drTraitPhase.modifiers) {
    drParts.push({
      id: modifier.id,
      label: modifier.label,
      value: Number(modifier.value ?? 0),
    });
  }
  let drTotal = Number(drTraitPhase.packet.total ?? sumParts(drParts)) || 0;
  const defenderGrappleStatus = getGrappleStatus(targetActor);
  if (defenderGrappleStatus === "restrained" || defenderGrappleStatus === "pinned") {
    drParts.push({
      id: `status.${defenderGrappleStatus}.defenseRatingOverride`,
      label: `${getGrappleStatusLabel(defenderGrappleStatus)} (DR override)`,
      value: -drTotal,
    });
    drTotal = 0;
  }

  return {
    ar: {
      parts: arParts,
      total: arTotal
    },
    dr: {
      parts: drParts,
      total: drTotal
    },
    comparison: {
      attackSkillCode,
      attackSkillLabel,
      attackerSkill,
      defenderSkillCode,
      defenderSkillLabel,
      defenderSkill: defenderTactics,
      delta: skillDelta,
      advantage: skillAdvantage,
      winner: skillDelta > 0 ? "attacker" : (skillDelta < 0 ? "defender" : "none")
    },
    value: arTotal - drTotal
  };
}

async function buildDamageSnapshot(ctx = {}, outcome = {}) {
  const attack = ctx?.attack ?? {};
  const payloadDamageType = String(attack?.payload?.modifies?.damageType ?? "").trim();
  const critDamageDelta = getMachineAttackDamageModifier(ctx?.attacker, {
    weaponGroupId: attack?.weapon?.machineWeaponGroup?.id ?? attack?.payload?.weaponGroupId,
    weaponId: attack?.payload?.weaponId,
    weapon: attack?.weapon,
  });
  const stateHeat = getMachineHeatAdjustments(ctx?.attacker);
  const isEnergyAttack = isMachineEnergyDamageFamily(attack?.weapon?.baseDamageType ?? attack?.weapon?.damageType);
  const baseDamage = Math.max(0, (Number(attack?.weapon?.damage ?? 0) || 0) + critDamageDelta + (isEnergyAttack ? Number(stateHeat.energyAttackDamage ?? 0) : 0));
  const clusterDice = Math.max(0, Number(attack?.weapon?.clusteringDice ?? 0) || 0);
  const clusterTargetNumber = Number(attack?.weapon?.clusteringTargetNumber ?? 5) || 5;
  const clustering = outcome.outcome !== "miss" && clusterDice > 0
    ? await rollClusteringDamage({
      clusteringDice: clusterDice,
      clusteringTargetNumber: clusterTargetNumber,
    })
    : {
      rolled: false,
      dice: clusterDice,
      targetNumber: clusterTargetNumber,
      hits: 0,
      formula: clusterDice > 0 ? `${clusterDice}d6cs>=${clusterTargetNumber}` : "",
      results: [],
      roll: null,
    };
  const rawClusteringDamage = outcome.outcome === "miss" ? 0 : Number(clustering.hits ?? 0);
  const targetIsMachine = Boolean(ctx?.targetIsMachine);
  const rawDamageType = payloadDamageType || attack?.weapon?.damageType;
  const damageType = targetIsMachine
    ? (String(rawDamageType ?? "kinetic").trim() || "kinetic")
    : normalizePersonalDamageType(rawDamageType, "concussive");
  const ap = Math.max(0, Number(attack?.totalAp ?? attack?.weapon?.ap ?? 0) || 0);
  const grazeMultiplier = outcome.outcome === "graze" ? 0.5 : 1;
  const rawWeaponDamage = outcome.outcome === "miss" ? 0 : baseDamage;
  const rawNetDamageBonus = doesAttackAddNetHitsToDamage(attack?.weapon)
    ? Number(outcome.netHits ?? 0)
    : 0;
  const effectiveWeaponDamage = rawWeaponDamage * grazeMultiplier;
  const clusteringDamage = rawClusteringDamage * grazeMultiplier;
  const netDamageBonus = rawNetDamageBonus * grazeMultiplier;
  const incoming = effectiveWeaponDamage + clusteringDamage + netDamageBonus;
  const exposure = applyEvadeToExposure(attack?.currentExposure ?? createExposureData({
    tier: attack?.currentExposure?.initialTier ?? attack?.currentExposure?.tier ?? "none",
  }), {
    active: Boolean(attack?.evadeActive),
    locked: Boolean(attack?.evadeLocked),
  });
  const areaEffect = normalizeAreaEffect(attack?.areaEffect ?? attack?.payload?.areaEffect ?? {});
  const usesExposureScaling = usesExposureDamageScaling(attack);
  const scaledIncoming = usesExposureScaling
    ? scaleDamageByExposure(incoming, exposure.finalTier)
    : incoming;

  return {
    baseDamage,
    effectiveWeaponDamage,
    clustering: {
      ...clustering,
      damageBonus: clusteringDamage,
    },
    netHits: Number(outcome.netHits ?? 0),
    netDamageBonus,
    attackQuality: outcome.outcome === "graze"
      ? "graze"
      : (outcome.outcome === "hit" && Number(outcome.netHits ?? 0) >= 4 ? "highMargin" : outcome.outcome === "hit" ? "hit" : ""),
    incoming,
    scaledIncoming,
    ap,
    damageType,
    damageTypeLabel: targetIsMachine ? damageType : getPersonalDamageTypeLabel(damageType),
    exposure,
    usesExposureScaling,
    areaEffect,
  };
}

function getTargetPreviewKey(target = {}) {
  return String(target?.tokenUuid ?? target?.actorUuid ?? target?.tokenId ?? target?.actorId ?? target?.name ?? foundry.utils.randomID()).trim();
}

function getMonitorRemaining(actor, monitorKey) {
  const monitor = actor?.system?.monitors?.[monitorKey] ?? {};
  const max = Math.max(0, Number(monitor.max ?? 0) || 0);
  const value = Math.min(max, Math.max(0, Number(monitor.value ?? 0) || 0));
  return value;
}

function buildQueuedDamagePayload({ attacker, ctx, damage, targetActor = null, hitLocation = null } = {}) {
  const onHitEffect = ctx?.attack?.weapon?.resolution?.onHitEffect ?? null;
  const sourceScale = isMachineActor(attacker)
    ? "machine"
    : (String(ctx?.attack?.weapon?.scale ?? "").trim() || "personal");
  if (isMachineActor(targetActor)) {
    return {
      mode: "machineAttackDamage",
      damage: damage?.incoming ?? 0,
      attackQuality: damage?.attackQuality ?? "",
      outcome: damage?.attackQuality === "highMargin" ? "hit" : (damage?.attackQuality ?? ""),
      netHits: damage?.netHits ?? 0,
      damageType: damage?.damageType,
      ap: damage?.ap ?? 0,
      hitLocation,
      onHitEffect,
      effects: ctx?.attack?.weapon?.effects ?? {},
      sourceScale,
      chaosCriticalSelected: false,
      reliabilitySpendSelections: [],
      previewRevision: 0,
      requirePreparedCriticalRecords: true,
      source: `${attacker?.name ?? "Attacker"}: ${ctx?.attack?.weapon?.name ?? "Attack"}`,
      sourceData: {
        attackerUuid: attacker?.uuid ?? "",
        weaponName: ctx?.attack?.weapon?.name ?? "Attack",
        weaponUuid: ctx?.attack?.weapon?.uuid ?? "",
      },
      attackDamage: {
        effectiveWeaponDamage: damage?.effectiveWeaponDamage ?? 0,
        clustering: damage?.clustering ?? null,
        netDamageBonus: damage?.netDamageBonus ?? 0,
        incoming: damage?.incoming ?? 0,
      },
      notes: "",
    };
  }

  return {
    mode: "attackDamage",
    track: ctx?.attack?.weapon?.damageTrack === TEMPLATE.monitors.fatigue
      ? TEMPLATE.monitors.fatigue
      : TEMPLATE.monitors.physical,
    damage: damage?.scaledIncoming ?? 0,
    sourceScale,
    netHits: 0,
    critNetHits: damage?.netHits ?? 0,
    critSeverity: severityFromMargin(damage?.netHits ?? 0),
    outcome: ["hit", "highMargin"].includes(String(damage?.attackQuality ?? "")) ? "hit" : (damage?.attackQuality ?? ""),
    previewRevision: 0,
    requirePreparedCriticalRecords: true,
    weaponUuid: ctx?.attack?.weapon?.uuid ?? "",
    weaponId: ctx?.attack?.weapon?.id ?? ctx?.attack?.payload?.weaponId ?? "",
    weaponName: ctx?.attack?.weapon?.name ?? "",
    damageType: damage?.damageType,
    ap: damage?.ap ?? 0,
    effects: ctx?.attack?.weapon?.effects ?? {},
    onHitEffect,
    source: `${attacker?.name ?? "Attacker"}: ${ctx?.attack?.weapon?.name ?? "Attack"}`,
    attackDamage: {
      effectiveWeaponDamage: damage?.effectiveWeaponDamage ?? 0,
      clustering: damage?.clustering ?? null,
      netDamageBonus: damage?.netDamageBonus ?? 0,
      incoming: damage?.incoming ?? 0,
      scaledIncoming: damage?.scaledIncoming ?? damage?.incoming ?? 0,
    },
    notes: damage?.usesExposureScaling && damage?.exposure?.initialTier
      ? `Exposure ${getExposureLabel(damage.exposure.initialTier)}${damage.exposure.evadeUsed ? ` -> ${getExposureLabel(damage.exposure.finalTier)}` : ""}`
      : "",
  };
}

function clone(value) {
  return typeof foundry !== "undefined" && foundry?.utils?.deepClone
    ? foundry.utils.deepClone(value)
    : JSON.parse(JSON.stringify(value ?? null));
}

function buildCanonicalMachineMutation({ target = {}, payload = {}, hitLocation = null, preview = {} } = {}) {
  const preparedCriticalRecords = Array.isArray(preview?.critical?.records)
    ? clone(preview.critical.records)
    : [];
  const previewRevision = Math.max(0, Math.trunc(Number(payload?.previewRevision ?? 0) || 0));
  if (preparedCriticalRecords.length) {
    payload.preparedCriticalRecords = preparedCriticalRecords.map(record => ({
      ...record,
      previewRevision,
    }));
  }

  return {
    id: foundry.utils.randomID(),
    type: "machineAttackDamage",
    targetActorUuid: target?.actorUuid ?? null,
    targetTokenUuid: target?.tokenUuid ?? null,
    target: {
      name: target?.name ?? "Target",
      actorUuid: target?.actorUuid ?? null,
      tokenUuid: target?.tokenUuid ?? null
    },
    hitLocation: preview?.hitLocation ?? hitLocation,
    damagePreview: preview?.damagePreview ?? null,
    critical: preview?.critical ?? null,
    preparedCriticalRecords: payload.preparedCriticalRecords ?? [],
    reliabilityOptions: preview?.reliabilityOptions ?? null,
    previewRevision,
    applied: false,
    payload,
    preview,
  };
}

export function summarizeAttackDamageResult(result, target = {}, damage = {}, { queued = false, applied = false, skipped = false, reason = "" } = {}) {
  if (skipped) {
    return {
      ok: true,
      skipped: true,
      queued: false,
      applied: false,
      reason: reason || "Missed target."
    };
  }

  if (result?.ok) {
    return {
      ok: true,
      queued: Boolean(queued),
      applied: Boolean(applied),
      preview: Boolean(result.dryRun),
      actorName: result.actorName ?? target?.name ?? "Target",
      sourceType: result.sourceType ?? null,
      mode: result.mode ?? "attackDamage",
      track: result.track ?? TEMPLATE.monitors.physical,
      requestedDelta: Number(result.requestedDelta ?? 0),
      appliedDelta: Number(result.appliedDelta ?? 0),
      usedArmor: Boolean(result.usedArmor),
      damageType: result.damageType ?? damage?.damageType ?? "",
      effectiveAp: Number(result.effectiveAp ?? damage?.ap ?? 0),
      hitLocation: result.hitLocation ?? null,
      critical: result.critical ?? null,
      damagePreview: result.damagePreview ?? null,
      reliabilityOptions: result.reliabilityOptions ?? null,
      previewRevision: Number(result.previewRevision ?? 0) || 0,
      machine: result.machine ?? null,
      battleArmor: result.battleArmor ?? null,
      degradation: result.degradation ?? null,
      mitigation: result.mitigation ? {
        baseMitigation: Number(result.mitigation.baseMitigation ?? 0),
        typeMitigationMod: Number(result.mitigation.typeMitigationMod ?? 0),
        netResistance: Number(result.mitigation.netResistance ?? 0),
        armorBefore: Number(result.mitigation.armorBefore ?? 0),
        armorAfter: Number(result.mitigation.armorAfter ?? 0),
        reinforcedBefore: Number(result.mitigation.reinforcedBefore ?? 0),
        reinforcedAfter: Number(result.mitigation.reinforcedAfter ?? 0),
        reinforcedMax: Number(result.mitigation.reinforcedMax ?? 0)
      } : null,
      damageIncoming: Number(result.damageIncoming ?? 0),
      adjustedIncoming: Number(result.adjustedIncoming ?? 0),
      finalDamage: Number(result.finalDamage ?? 0),
      sourceScale: String(result.sourceScale ?? "").trim(),
      targetScale: String(result.targetScale ?? "").trim(),
      scaleConversion: result.scaleConversion ?? null,
      attackDamage: result.attackDamage ?? damage?.attackDamage ?? {
        effectiveWeaponDamage: damage?.effectiveWeaponDamage ?? 0,
        clustering: damage?.clustering ?? null,
        netDamageBonus: damage?.netDamageBonus ?? 0,
        incoming: damage?.incoming ?? result.damageIncoming ?? 0,
        scaledIncoming: damage?.scaledIncoming ?? result.adjustedIncoming ?? result.damageIncoming ?? 0,
      },
      beforeLabel: String(result.beforeLabel ?? "").trim(),
      afterLabel: String(result.afterLabel ?? "").trim(),
      source: String(result.source ?? "").trim(),
      notes: String(result.notes ?? "").trim()
    };
  }

  return {
    ok: false,
    queued: false,
    applied: false,
    reason: result?.reason ?? reason ?? "Unable to preview attack damage."
  };
}

async function queueAttackDamage({ attacker, ctx, target, outcome, damage } = {}) {
  if (outcome?.outcome === "miss") {
    return summarizeAttackDamageResult(null, target, damage, { skipped: true, reason: "Missed target." });
  }

  if (damage?.areaEffect?.kind === AREA_EFFECT_KINDS.persistent) {
    return {
      ok: true,
      queued: true,
      applied: false,
      preview: true,
      actorName: target?.name ?? "Target",
      mode: "hazardEntry",
      reason: "",
    };
  }

  let token = null;
  let actor = null;
  try {
    token = target?.tokenUuid ? await fromUuid(target.tokenUuid) : null;
    actor = target?.actorUuid ? await fromUuid(target.actorUuid) : null;
  } catch (error) {
    console.warn("MWD | Unable to resolve target for queued attack damage", target, error);
    return summarizeAttackDamageResult(null, target, damage, { reason: "Unable to resolve attack target." });
  }

  const targetIsMachine = isMachineActor(actor);
  const hitLocation = targetIsMachine
    ? resolveMachineHitLocation({
      actor,
      rollTotal: rollMachineHitLocationTotal(),
      armorBefore: getMonitorRemaining(actor, TEMPLATE.monitors.armor),
      structureBefore: getMonitorRemaining(actor, TEMPLATE.monitors.structure),
    })
    : null;

  const payload = buildQueuedDamagePayload({ attacker, ctx, damage, targetActor: actor, hitLocation });
  const result = await HarmEngine.apply({
    actor,
    token,
    payload,
    options: {
      actorId: actor?.id ?? "",
      dryRun: true,
      logToChat: false
    }
  });

  if (result?.ok) {
    const preview = summarizeAttackDamageResult(result, target, damage, { queued: true, applied: false });
    const queuedPayload = buildQueuedDamagePayload({ attacker, ctx, damage, targetActor: actor, hitLocation });
    const queuedMutation = queuedPayload.mode === "machineAttackDamage"
      ? buildCanonicalMachineMutation({ target, payload: queuedPayload, hitLocation, preview })
      : {
        id: foundry.utils.randomID(),
        type: "attackDamage",
        targetActorUuid: target?.actorUuid ?? null,
        targetTokenUuid: target?.tokenUuid ?? null,
        applied: false,
        target: {
          name: target?.name ?? "Target",
          actorUuid: target?.actorUuid ?? null,
          tokenUuid: target?.tokenUuid ?? null
        },
        critical: preview?.critical ?? null,
        preparedCriticalRecords: Array.isArray(preview?.critical?.records)
          ? clone(preview.critical.records).map(record => ({
            ...record,
            previewRevision: Math.max(0, Math.trunc(Number(queuedPayload.previewRevision ?? 0) || 0)),
          }))
          : [],
        previewRevision: Math.max(0, Math.trunc(Number(queuedPayload.previewRevision ?? 0) || 0)),
        payload: {
          ...queuedPayload,
          criticalPreview: preview?.critical ?? null,
          preparedCriticalRecords: Array.isArray(preview?.critical?.records)
            ? clone(preview.critical.records).map(record => ({
              ...record,
              previewRevision: Math.max(0, Math.trunc(Number(queuedPayload.previewRevision ?? 0) || 0)),
            }))
            : [],
        },
        hitLocation,
        preview
      };
    return {
      ...preview,
      queuedMutation
    };
  }

  return summarizeAttackDamageResult(result, target, damage, { reason: "Unable to preview attack damage." });
}

async function resolveTargetAttack({ attacker, ctx, outcomeModel, target, previewState = {} } = {}) {
  const cq = await buildCQBreakdown({ attacker, ctx, target });
  const targetActor = await getTargetActor(target);
  const margin = Number(outcomeModel?.margin ?? 0);
  const cqValue = Number(cq.value ?? 0);
  const rawNetHits = margin;
  let outcome = cqValue > 0
    ? (margin >= 0 ? "hit" : "miss")
    : cqValue === 0
      ? (margin >= 1 ? "hit" : (margin === 0 ? "graze" : "miss"))
      : cqValue >= -3
        ? (margin >= 2 ? "hit" : (margin === 1 ? "graze" : "miss"))
        : (margin >= 3 ? "hit" : (margin >= 1 ? "graze" : "miss"));
  if (String(ctx?.attack?.rangeBand ?? "").trim().toLowerCase() === "outofrange" && outcome === "hit") {
    outcome = "graze";
  }
  if (target?.grazeOnly && outcome === "hit") {
    outcome = "graze";
  }
  const netHits = outcome === "hit" ? Math.max(0, rawNetHits) : 0;
  const attack = ctx?.attack ?? {};
  const previewKey = getTargetPreviewKey(target);
  if (attack?.suppressionFire) {
    const suppresses = outcome === "hit" || outcome === "graze";

    return {
      target: {
        name: target?.name ?? "Target",
        actorUuid: target?.actorUuid ?? null,
        tokenUuid: target?.tokenUuid ?? null
      },
      previewKey,
      fireModeTargetRole: target?.fireModeTargetRole ?? null,
      grazeOnly: Boolean(target?.grazeOnly),
      exposure: target?.exposure ?? createExposureData({ tier: "none" }),
      evadeActive: false,
      evadeEdgePoolKey: null,
      cq,
      margin,
      rawNetHits,
      netHits,
      outcome,
      suppression: {
        statusId: "suppressed",
        pending: suppresses,
        applied: false,
        effectLabel: suppresses ? "Suppressed" : "No effect",
        metadata: {
          source: "suppressionFire",
          attackerUuid: attacker?.uuid ?? "",
          weaponName: attack?.weapon?.name ?? "",
        },
      },
      damage: null,
      damageResult: null,
      queuedMutation: null
    };
  }

  if (attack?.resolution?.effect === "grapple") {
    const previousStatusId = getGrappleStatus(targetActor);
    const statusId = getGrappleEffectStatus({ outcome, targetActor });
    const applies = Boolean(statusId);

    return {
      target: {
        name: target?.name ?? "Target",
        actorUuid: target?.actorUuid ?? null,
        tokenUuid: target?.tokenUuid ?? null
      },
      previewKey,
      fireModeTargetRole: target?.fireModeTargetRole ?? null,
      grazeOnly: Boolean(target?.grazeOnly),
      exposure: target?.exposure ?? createExposureData({ tier: "none" }),
      evadeActive: false,
      evadeEdgePoolKey: null,
      cq,
      margin,
      rawNetHits,
      netHits,
      outcome,
      grapple: {
        statusId,
        pending: applies,
        applied: false,
        effectLabel: getGrappleStatusLabel(statusId),
        previousStatusId,
        metadata: {
          source: "grapple",
          attackerUuid: attacker?.uuid ?? "",
          weaponName: attack?.weapon?.name ?? "Grapple",
        },
      },
      damage: null,
      damageResult: null,
      queuedMutation: null
    };
  }

  const targetPreview = previewState?.[previewKey] ?? {};
  const currentExposure = target?.exposure ?? createExposureData({ tier: "none" });
  const damage = await buildDamageSnapshot({
    ...ctx,
    attacker,
    targetIsMachine: isMachineActor(targetActor),
    attack: {
      ...attack,
      currentExposure,
      areaEffect: attack?.areaEffect ?? attack?.payload?.areaEffect ?? null,
      evadeActive: Boolean(targetPreview?.evadeActive),
      evadeLocked: Boolean(currentExposure?.evadeLocked),
    }
  }, { outcome, netHits });
  const damageResult = await queueAttackDamage({
    attacker,
    ctx,
    target,
    outcome: { outcome, netHits },
    damage
  });

  return {
    target: {
      name: target?.name ?? "Target",
      actorUuid: target?.actorUuid ?? null,
      tokenUuid: target?.tokenUuid ?? null
    },
    previewKey,
    fireModeTargetRole: target?.fireModeTargetRole ?? null,
    grazeOnly: Boolean(target?.grazeOnly),
    exposure: currentExposure,
    evadeActive: Boolean(targetPreview?.evadeActive),
    evadeEdgePoolKey: String(targetPreview?.edgePoolKey ?? "").trim() || null,
    cq,
    margin,
    rawNetHits,
    netHits,
    outcome,
    damage,
    damageResult,
    queuedMutation: damageResult?.queuedMutation ?? null
  };
}

function summarizeTargetResults(results = []) {
  const summary = { hits: 0, grazes: 0, misses: 0 };
  for (const result of results) {
    if (result?.outcome === "hit") summary.hits += 1;
    else if (result?.outcome === "graze") summary.grazes += 1;
    else summary.misses += 1;
  }

  return {
    ...summary,
    overallOutcome: summary.hits > 0 ? "hit" : (summary.grazes > 0 ? "graze" : "miss")
  };
}

export async function resolveAttackExecution({ attacker, ctx, outcomeModel, previewState = {}, existingAttackResult = null } = {}) {
  const targets = getTargetSnapshots(ctx);
  const results = [];
  for (const target of targets) {
    results.push(await resolveTargetAttack({ attacker, ctx, outcomeModel, target, previewState }));
  }

  const areaEffect = normalizeAreaEffect(ctx?.attack?.areaEffect ?? ctx?.attack?.payload?.areaEffect ?? {});
  let persistentRegionUuid = String(existingAttackResult?.persistentRegionUuid ?? "").trim() || null;
  if (areaEffect.kind === AREA_EFFECT_KINDS.persistent && !persistentRegionUuid) {
    const region = await createHazardRegionFromAttack({
      attacker,
      attack: ctx?.attack ?? {},
      targetResult: results[0] ?? null,
    });
    persistentRegionUuid = region?.uuid ?? null;
  }

  return {
    targetCount: targets.length,
    results,
    summary: summarizeTargetResults(results),
    areaEffect,
    templateGeometry: cloneTemplateGeometry(normalizeTemplateGeometry(
      ctx?.attack?.templateGeometry,
      {
        template: ctx?.attack?.template,
        placement: ctx?.attack?.templatePlacement,
      }
    )),
    persistentRegionUuid,
  };
}
