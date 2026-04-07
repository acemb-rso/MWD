// src/modules/roll/attack-resolution.js
// Purpose: Resolves personal attacks into per-target CQ/outcome/damage data.
// How it fits: Extends the main roll execution pipeline without creating a parallel combat path.

import { HarmEngine } from "../harm/harm-engine.js";
import { TEMPLATE } from "../constants.js";
import { getPersonalDamageTypeLabel, normalizePersonalDamageType } from "../mwd/personal-damage.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function getTargetSnapshots(ctx = {}) {
  const targets = Array.isArray(ctx?.attack?.targets) ? ctx.attack.targets : [];
  if (!targets.length) throw new Error("Attack requires at least one target.");
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
  const targetReflexes = getTargetAttributeValue(target, targetActor, "reflexes");
  const targetReflexDefense = targetReflexes + targetReflexes;
  const attackSkillCode = String(ctx?.attack?.skill?.code ?? ctx?.attack?.weapon?.skill ?? "").trim();
  const attackSkillLabel = String(ctx?.attack?.skill?.label ?? attackSkillCode ?? "Attack Skill").trim() || "Attack Skill";
  const attackerSkill = attackSkillCode
    ? Math.max(0, toNumber(attacker?.getSkillRating?.(attackSkillCode) ?? attacker?.system?.skills?.[attackSkillCode]?.rating, 0))
    : 0;
  const defenderTactics = getTargetSkillRating(target, targetActor, "tactics");
  const skillDelta = attackerSkill - defenderTactics;
  const skillAdvantage = Math.abs(skillDelta);
  const armorDefense = Math.max(0, Number(target?.activeArmor?.defenseBonus ?? 0) || 0);
  const rangeLabel = String(ctx?.attack?.rangeBand ?? "").trim() || "range";
  const arParts = [{
    id: "weapon.attackRating",
    label: `Weapon AR (${rangeLabel})`,
    value: attackRating
  }];
  const drParts = [{
    id: "target.reflexesDefense",
    label: "Target REF + REF",
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
      label: `Tactics over ${attackSkillLabel}`,
      value: skillAdvantage
    });
  }

  drParts.push({
    id: "target.armorDefense",
    label: "Armor Defense",
    value: armorDefense
  });

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
      defenderSkillCode: "tactics",
      defenderSkillLabel: "Tactics",
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
  const baseDamage = Math.max(0, Number(attack?.weapon?.damage ?? 0) || 0);
  const damageType = normalizePersonalDamageType(payloadDamageType || attack?.weapon?.damageType, "concussive");
  const ap = Math.max(0, Number(attack?.totalAp ?? attack?.weapon?.ap ?? 0) || 0);
  const effectiveWeaponDamage = outcome.outcome === "graze" ? (baseDamage / 2) : (outcome.outcome === "hit" ? baseDamage : 0);
  const incoming = effectiveWeaponDamage + Number(outcome.netHits ?? 0);

  return {
    baseDamage,
    effectiveWeaponDamage,
    netHits: Number(outcome.netHits ?? 0),
    incoming,
    ap,
    damageType,
    damageTypeLabel: getPersonalDamageTypeLabel(damageType)
  };
}

function buildQueuedDamagePayload({ attacker, ctx, damage } = {}) {
  return {
    mode: "attackDamage",
    track: TEMPLATE.monitors.physical,
    damage: damage?.effectiveWeaponDamage ?? 0,
    netHits: damage?.netHits ?? 0,
    damageType: damage?.damageType,
    ap: damage?.ap ?? 0,
    effects: ctx?.attack?.weapon?.effects ?? {},
    source: `${attacker?.name ?? "Attacker"}: ${ctx?.attack?.weapon?.name ?? "Attack"}`
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

  let token = null;
  let actor = null;
  try {
    token = target?.tokenUuid ? await fromUuid(target.tokenUuid) : null;
    actor = target?.actorUuid ? await fromUuid(target.actorUuid) : null;
  } catch (error) {
    console.warn("MWD | Unable to resolve target for queued attack damage", target, error);
    return summarizeAttackDamageResult(null, target, damage, { reason: "Unable to resolve attack target." });
  }

  const payload = buildQueuedDamagePayload({ attacker, ctx, damage });
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
        payload,
        preview
      }
    };
  }

  return summarizeAttackDamageResult(result, target, damage, { reason: "Unable to preview attack damage." });
}

async function resolveTargetAttack({ attacker, ctx, outcomeModel, target } = {}) {
  const cq = await buildCQBreakdown({ attacker, ctx, target });
  const margin = Number(outcomeModel?.margin ?? 0);
  const rawNetHits = margin + Math.min(cq.value, margin);
  const outcome = margin >= 1
    ? (rawNetHits > 0 ? "hit" : "graze")
    : "miss";
  const netHits = outcome === "hit" ? Math.max(0, rawNetHits) : 0;
  const damage = buildDamageSnapshot(ctx, { outcome, netHits });
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

export async function resolveAttackExecution({ attacker, ctx, outcomeModel } = {}) {
  const targets = getTargetSnapshots(ctx);
  const results = [];
  for (const target of targets) {
    results.push(await resolveTargetAttack({ attacker, ctx, outcomeModel, target }));
  }

  return {
    targetCount: targets.length,
    results,
    summary: summarizeTargetResults(results)
  };
}
