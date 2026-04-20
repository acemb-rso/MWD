// src/modules/roll/attack-resolution.js
// Purpose: Resolves personal attacks into per-target CQ/outcome/damage data.
// How it fits: Extends the main roll execution pipeline without creating a parallel combat path.

import { HarmEngine } from "../harm/harm-engine.js";
import { TEMPLATE } from "../constants.js";
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

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
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
    arParts.push({
      id: "state.aim",
      label: `Aim (${attackSkillLabel})`,
      value: attackerSkill
    });
  }

  drParts.push({
    id: "target.armorDefense",
    label: "Armor Defense",
    value: armorDefense
  });

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
  }

  const arTotal = sumParts(arParts);
  const drTotal = sumParts(drParts);

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

function buildDamageSnapshot(ctx = {}, outcome = {}) {
  const attack = ctx?.attack ?? {};
  const payloadDamageType = String(attack?.payload?.modifies?.damageType ?? "").trim();
  const critDamageDelta = getMachineAttackDamageModifier(ctx?.attacker, {
    weaponGroupId: attack?.weapon?.machineWeaponGroup?.id ?? attack?.payload?.weaponGroupId,
    weaponId: attack?.payload?.weaponId,
    weapon: attack?.weapon,
  });
  const stateHeat = getMachineHeatAdjustments(ctx?.attacker);
  const isEnergyAttack = String(attack?.weapon?.damageType ?? "").trim().toLowerCase() === "energy";
  const baseDamage = Math.max(0, (Number(attack?.weapon?.damage ?? 0) || 0) + critDamageDelta + (isEnergyAttack ? Number(stateHeat.energyAttackDamage ?? 0) : 0));
  const targetIsMachine = Boolean(ctx?.targetIsMachine);
  const rawDamageType = payloadDamageType || attack?.weapon?.damageType;
  const damageType = targetIsMachine
    ? (String(rawDamageType ?? "kinetic").trim() || "kinetic")
    : normalizePersonalDamageType(rawDamageType, "concussive");
  const ap = Math.max(0, Number(attack?.totalAp ?? attack?.weapon?.ap ?? 0) || 0);
  const effectiveWeaponDamage = outcome.outcome === "graze" ? (baseDamage / 2) : (outcome.outcome === "hit" ? baseDamage : 0);
  const incoming = effectiveWeaponDamage + Number(outcome.netHits ?? 0);
  const exposure = applyEvadeToExposure(attack?.currentExposure ?? createExposureData({
    tier: attack?.currentExposure?.initialTier ?? attack?.currentExposure?.tier ?? "none",
  }), {
    active: Boolean(attack?.evadeActive),
    locked: Boolean(attack?.evadeLocked),
  });
  const areaEffect = normalizeAreaEffect(attack?.areaEffect ?? attack?.payload?.areaEffect ?? {});
  const scaledIncoming = areaEffect.kind === AREA_EFFECT_KINDS.persistent
    ? incoming
    : scaleDamageByExposure(incoming, exposure.finalTier);

  return {
    baseDamage,
    effectiveWeaponDamage,
    netHits: Number(outcome.netHits ?? 0),
    attackQuality: outcome.outcome === "graze"
      ? "graze"
      : (outcome.outcome === "hit" && Number(outcome.netHits ?? 0) >= 4 ? "highMargin" : outcome.outcome === "hit" ? "hit" : ""),
    incoming,
    scaledIncoming,
    ap,
    damageType,
    damageTypeLabel: targetIsMachine ? damageType : getPersonalDamageTypeLabel(damageType),
    exposure,
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
  return Math.max(0, max - value);
}

function buildQueuedDamagePayload({ attacker, ctx, damage, targetActor = null, hitLocation = null } = {}) {
  if (isMachineActor(targetActor)) {
    return {
      mode: "machineAttackDamage",
      damage: damage?.scaledIncoming ?? 0,
      attackQuality: damage?.attackQuality ?? "",
      outcome: damage?.attackQuality === "highMargin" ? "hit" : (damage?.attackQuality ?? ""),
      netHits: damage?.netHits ?? 0,
      damageType: damage?.damageType,
      ap: damage?.ap ?? 0,
      hitLocation,
      chaosCriticalSelected: false,
      reliabilitySpendSelections: [],
      source: `${attacker?.name ?? "Attacker"}: ${ctx?.attack?.weapon?.name ?? "Attack"}`,
      sourceData: {
        attackerUuid: attacker?.uuid ?? "",
        weaponName: ctx?.attack?.weapon?.name ?? "Attack",
        weaponUuid: ctx?.attack?.weapon?.uuid ?? "",
      },
      notes: "",
    };
  }

  return {
    mode: "attackDamage",
    track: TEMPLATE.monitors.physical,
    damage: damage?.scaledIncoming ?? 0,
    netHits: 0,
    damageType: damage?.damageType,
    ap: damage?.ap ?? 0,
    effects: ctx?.attack?.weapon?.effects ?? {},
    source: `${attacker?.name ?? "Attacker"}: ${ctx?.attack?.weapon?.name ?? "Attack"}`,
    notes: damage?.exposure?.initialTier
      ? `Exposure ${getExposureLabel(damage.exposure.initialTier)}${damage.exposure.evadeUsed ? ` -> ${getExposureLabel(damage.exposure.finalTier)}` : ""}`
      : "",
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
      machine: result.machine ?? null,
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
    if (queuedPayload.mode === "machineAttackDamage" && Array.isArray(preview?.critical?.records) && preview.critical.records.length) {
      queuedPayload.preparedCriticalRecords = foundry.utils.deepClone(preview.critical.records);
    }
    return {
      ...preview,
      queuedMutation: {
        id: foundry.utils.randomID(),
        type: "attackDamage",
        applied: false,
        target: {
          name: target?.name ?? "Target",
          actorUuid: target?.actorUuid ?? null,
          tokenUuid: target?.tokenUuid ?? null
        },
        payload: queuedPayload,
        hitLocation,
        preview
      }
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
    ? (margin >= 1 ? "hit" : (margin === 0 ? "graze" : "miss"))
    : cqValue < 0
      ? (margin >= 2 ? "hit" : (margin === 1 ? "graze" : "miss"))
      : (margin >= 1 ? "hit" : "miss");
  if (String(ctx?.attack?.rangeBand ?? "").trim().toLowerCase() === "outofrange" && outcome === "hit") {
    outcome = "graze";
  }
  const netHits = outcome === "hit" ? Math.max(0, rawNetHits) : 0;
  const attack = ctx?.attack ?? {};
  const previewKey = getTargetPreviewKey(target);
  const targetPreview = previewState?.[previewKey] ?? {};
  const currentExposure = target?.exposure ?? createExposureData({ tier: "none" });
  const damage = buildDamageSnapshot({
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
