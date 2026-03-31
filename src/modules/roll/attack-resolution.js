// src/modules/roll/attack-resolution.js
// Purpose: Resolves personal attacks into per-target CQ/outcome/damage data.
// How it fits: Extends the main roll execution pipeline without creating a parallel combat path.

import { HarmEngine } from "../harm/harm-engine.js";
import { TEMPLATE } from "../constants.js";
import { getPersonalDamageTypeLabel, normalizePersonalDamageType } from "../mwd/personal-damage.js";

function getTargetSnapshots(ctx = {}) {
  const targets = Array.isArray(ctx?.attack?.targets) ? ctx.attack.targets : [];
  if (!targets.length) throw new Error("Attack requires at least one target.");
  return targets;
}

function buildCQBreakdown(ctx = {}, target = {}) {
  const attackRating = Math.max(0, Number(ctx?.attack?.weapon?.attackRatingBand?.[ctx?.attack?.rangeBand] ?? 0) || 0);
  const defenseRating = Math.max(0, Number(target?.activeArmor?.defenseBonus ?? 0) || 0);

  return {
    ar: {
      parts: [{
        id: "weapon.attackRating",
        label: `Weapon AR (${String(ctx?.attack?.rangeBand ?? "").trim() || "range"})`,
        value: attackRating
      }],
      total: attackRating
    },
    dr: {
      parts: [{
        id: "target.armorDefense",
        label: "Armor Defense",
        value: defenseRating
      }],
      total: defenseRating
    },
    value: attackRating - defenseRating
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

async function applyAttackDamage({ attacker, ctx, target, outcome, damage } = {}) {
  if (outcome?.outcome === "miss") {
    return {
      ok: true,
      skipped: true,
      reason: "Missed target."
    };
  }

  const token = target?.tokenUuid ? await fromUuid(target.tokenUuid) : null;
  const actor = target?.actorUuid ? await fromUuid(target.actorUuid) : null;
  const result = await HarmEngine.apply({
    actor,
    token,
    payload: {
      mode: "attackDamage",
      track: TEMPLATE.monitors.physical,
      damage: damage?.effectiveWeaponDamage ?? 0,
      netHits: damage?.netHits ?? 0,
      damageType: damage?.damageType,
      ap: damage?.ap ?? 0,
      effects: ctx?.attack?.weapon?.effects ?? {},
      source: `${attacker?.name ?? "Attacker"}: ${ctx?.attack?.weapon?.name ?? "Attack"}`
    },
    options: {
      actorId: actor?.id ?? "",
      logToChat: false
    }
  });

  if (result?.ok) {
    return {
      ok: true,
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

  return { ok: false, reason: result?.reason ?? "Unable to apply attack damage." };
}

async function resolveTargetAttack({ attacker, ctx, outcomeModel, target } = {}) {
  const cq = buildCQBreakdown(ctx, target);
  const margin = Number(outcomeModel?.margin ?? 0);
  const rawNetHits = margin + Math.min(cq.value, margin);
  const outcome = margin >= 1
    ? (rawNetHits > 0 ? "hit" : "graze")
    : "miss";
  const netHits = outcome === "hit" ? Math.max(0, rawNetHits) : 0;
  const damage = buildDamageSnapshot(ctx, { outcome, netHits });
  const damageResult = await applyAttackDamage({
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
    damageResult
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
