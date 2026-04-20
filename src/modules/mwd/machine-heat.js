// src/modules/mwd/machine-heat.js
// Purpose: Centralizes BattleMech heat state prep, pending-heat tracking, and
//          end-of-activation resolution outside sheet code.

import { computeDangerCheckParams, computeHeatPenalties, hasVolatileComponents, resolveEndOfActivationHeat } from "./heat-effects.js";
import { getMachineHeatStatusLabel, normalizeMachineHeatThresholds, resolveMachineHeatStatus } from "./heat-state.js";
import { getMachineHeatAdjustments } from "./machine-state-effects.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function clampMin(value, min = 0) {
  return Math.max(min, toNumber(value, min));
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function getSystemData(source = {}) {
  return source?.system ?? source ?? {};
}

function getActorName(actor) {
  return String(actor?.name ?? "BattleMech").trim() || "BattleMech";
}

function getActiveHeatCrits(systemData = {}) {
  return asArray(systemData?.mwd?.crits).filter(crit => crit?.active !== false);
}

export function getBattlemechPendingHeat(systemData = {}) {
  return clampMin(systemData?.mwd?.heat?.pendingGenerated, 0);
}

export function getBattlemechHeatActivationKey(activation = null) {
  if (!activation) return "";

  const combatId = String(activation?.combatId ?? "").trim();
  const combatantId = String(activation?.combatantId ?? "").trim();
  const round = Number(activation?.round ?? NaN);
  const turn = Number(activation?.turn ?? NaN);
  if (!combatId || !combatantId || !Number.isFinite(round) || !Number.isFinite(turn)) return "";
  return `${combatId}:${combatantId}:${round}:${turn}`;
}

export function isEnergyMachineWeapon(weapon = {}) {
  const system = weapon?.system ?? weapon ?? {};
  const typeHints = [
    system.damageType,
    system.category,
    system.weaponCategory,
    system.attackType,
  ].map(value => String(value ?? "").trim().toLowerCase()).filter(Boolean);
  const traits = asArray(system.traits).map(value => String(value ?? "").trim().toLowerCase());

  return typeHints.includes("energy") || traits.includes("energy");
}

export function computeBattlemechAttackHeat({ weapons = [], crits = [] } = {}) {
  const attackWeapons = asArray(weapons).filter(Boolean);
  const activeCrits = asArray(crits).filter(crit => crit?.active !== false);
  const baseHeat = attackWeapons.reduce((sum, weapon) => sum + clampMin(weapon?.system?.heat ?? weapon?.heat, 0), 0);
  const anyEnergyWeapon = attackWeapons.some(isEnergyMachineWeapon);
  const critEffects = activeCrits
    .map(crit => crit?.resourceEffects ?? {})
    .filter(effect => effect && typeof effect === "object");

  const extraAttackHeat = critEffects.reduce((sum, effect) => sum + clampMin(effect.heatPerAttack, 0), 0);
  const extraEnergyHeat = anyEnergyWeapon
    ? critEffects.reduce((sum, effect) => sum + clampMin(effect.heatPerEnergyAttack, 0), 0)
    : 0;

  return {
    weaponCount: attackWeapons.length,
    baseHeat,
    extraAttackHeat,
    extraEnergyHeat,
    total: baseHeat + extraAttackHeat + extraEnergyHeat,
  };
}

export function buildBattlemechHeatModel(source = {}) {
  const systemData = getSystemData(source);
  const heatMonitor = systemData?.monitors?.heat ?? {};
  const heatConfig = systemData?.mwd?.heat ?? {};
  const hybridHeat = systemData?.hybrid?.heat ?? {};
  const activeCrits = getActiveHeatCrits(systemData);
  const stateHeat = getMachineHeatAdjustments(source);
  const current = clampMin(heatMonitor.value ?? heatConfig.current, 0);
  const trackLength = clampMin(heatMonitor.max ?? heatConfig.max ?? heatConfig.hardMax, 0);
  const thresholds = normalizeMachineHeatThresholds(heatConfig.thresholds ?? {}, trackLength);
  const displayMax = Math.max(
    trackLength,
    current,
    clampMin(thresholds.shutdown ?? thresholds.danger, 0)
  );
  const dissipation = clampMin(hybridHeat.dissipation ?? heatConfig.ventPerTurn, 1);
  const critImpaired = activeCrits.some(crit => crit?.escalationKey === "heat");
  const coolingImpaired = Boolean(heatConfig.coolingImpaired || critImpaired || stateHeat.coolingImpaired);
  const effectiveDissipation = coolingImpaired ? Math.max(1, dissipation - 2) : dissipation;
  const pendingGenerated = getBattlemechPendingHeat(systemData);
  const lastResolvedActivationKey = String(heatConfig.lastResolvedActivationKey ?? "").trim();
  const statusCode = resolveMachineHeatStatus(current, thresholds, trackLength);
  const penalties = computeHeatPenalties(current, thresholds);
  const inDanger = penalties.dangerLevel > 0;
  const chassis = clampMin(systemData?.attributes?.chassis?.value, 0);
  const reliability = clampMin(systemData?.attributes?.reliability?.value, 0);
  const dangerChecks = inDanger
    ? computeDangerCheckParams(penalties.dangerLevel, chassis, reliability)
    : null;
  const volatile = hasVolatileComponents(systemData?.mwd?.locations ?? {});

  return {
    current,
    max: trackLength,
    trackLength,
    displayMax,
    dissipation,
    effectiveDissipation,
    coolingImpaired,
    pendingGenerated,
    lastResolvedActivationKey,
    thresholds,
    statusCode,
    status: getMachineHeatStatusLabel(statusCode),
    penalties,
    inDanger,
    dangerChecks,
    volatile,
  };
}

export function resolveBattlemechHeatActivation(source = {}, { pendingGenerated = null } = {}) {
  const systemData = getSystemData(source);
  const heat = buildBattlemechHeatModel(systemData);
  const generated = pendingGenerated === null ? heat.pendingGenerated : clampMin(pendingGenerated, 0);
  const newHeat = resolveEndOfActivationHeat(heat.current, generated, heat.effectiveDissipation, heat.trackLength);
  const statusCode = resolveMachineHeatStatus(newHeat, heat.thresholds, heat.trackLength);
  const penalties = computeHeatPenalties(newHeat, heat.thresholds);
  const inDanger = penalties.dangerLevel > 0;
  const chassis = clampMin(systemData?.attributes?.chassis?.value, 0);
  const reliability = clampMin(systemData?.attributes?.reliability?.value, 0);

  return {
    ...heat,
    previousHeat: heat.current,
    generated,
    newHeat,
    statusCode,
    status: getMachineHeatStatusLabel(statusCode),
    penalties,
    inDanger,
    dangerChecks: inDanger ? computeDangerCheckParams(penalties.dangerLevel, chassis, reliability) : null,
    pendingGeneratedAfter: 0,
  };
}

export async function setBattlemechPendingHeat(actor, value, { reason = "" } = {}) {
  if (!actor || actor.type !== "battlemech") return { ok: false, reason: "BattleMech actor required." };

  const nextValue = clampMin(value, 0);
  await actor.update({
    "system.mwd.heat.pendingGenerated": nextValue,
    "system.mwd.heat.lastResolvedActivationKey": "",
  });

  return {
    ok: true,
    actor,
    pendingGenerated: nextValue,
    reason,
  };
}

export async function adjustBattlemechPendingHeat(actor, delta, { reason = "" } = {}) {
  if (!actor || actor.type !== "battlemech") return { ok: false, reason: "BattleMech actor required." };

  const current = getBattlemechPendingHeat(actor);
  return setBattlemechPendingHeat(actor, current + toNumber(delta, 0), { reason });
}

export async function recordBattlemechAttackHeat(actor, { weaponIds = [], reason = "" } = {}) {
  if (!actor || actor.type !== "battlemech") return { ok: false, reason: "BattleMech actor required." };

  const resolvedWeaponIds = Array.from(new Set(asArray(weaponIds).map(id => String(id ?? "").trim()).filter(Boolean)));
  if (!resolvedWeaponIds.length) {
    return { ok: true, actor, pendingGenerated: getBattlemechPendingHeat(actor), contribution: { total: 0 } };
  }

  const weapons = resolvedWeaponIds
    .map(id => actor.items?.get?.(id))
    .filter(Boolean);
  const contribution = computeBattlemechAttackHeat({
    weapons,
    crits: getActiveHeatCrits(actor.system),
  });
  const stateHeat = getMachineHeatAdjustments(actor);
  contribution.extraAttackHeat += Math.max(0, Number(stateHeat.attackHeat ?? 0));
  contribution.extraEnergyHeat += weapons.some(isEnergyMachineWeapon)
    ? Math.max(0, Number(stateHeat.energyAttackHeat ?? 0))
    : 0;
  contribution.total = contribution.baseHeat + contribution.extraAttackHeat + contribution.extraEnergyHeat;
  if (contribution.total <= 0) {
    return { ok: true, actor, pendingGenerated: getBattlemechPendingHeat(actor), contribution };
  }

  const currentPending = getBattlemechPendingHeat(actor);
  const nextPending = currentPending + contribution.total;
  await actor.update({
    "system.mwd.heat.pendingGenerated": nextPending,
    "system.mwd.heat.lastResolvedActivationKey": "",
  });

  return {
    ok: true,
    actor,
    reason,
    pendingGenerated: nextPending,
    contribution,
  };
}

export async function postBattlemechDangerChecksToChat(actor, resolution, { source = "" } = {}) {
  if (!actor || !resolution?.inDanger || !resolution?.dangerChecks) return;

  const mechName = getActorName(actor);
  const sourceLabel = String(source ?? "").trim();
  const lines = [
    `<h3>${mechName} - Danger Zone (${resolution.penalties.dangerLevel} level${resolution.penalties.dangerLevel > 1 ? "s" : ""})</h3>`,
    sourceLabel ? `<p><em>Heat resolved via ${sourceLabel}.</em></p>` : "",
    `<p><strong>Shutdown Check:</strong> Roll <strong>${resolution.dangerChecks.shutdownPool}d6</strong> vs DN <strong>${resolution.dangerChecks.shutdownDN}</strong> (Chassis + Reliability). On failure, compare margin to pilot's System Operations: if margin &lt; System Operations the pilot may override; otherwise the mech shuts down.</p>`,
    resolution.volatile
      ? `<p><strong>Explosion Check:</strong> Roll <strong>${resolution.dangerChecks.explosionPool}d6</strong> vs DN <strong>${resolution.dangerChecks.explosionDN}</strong> (Chassis + Reliability - ${resolution.penalties.dangerLevel}). Failure detonates volatile components.</p>`
      : `<p><em>No volatile components detected - Explosion check skipped.</em></p>`,
  ].filter(Boolean);

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: lines.join(""),
  });
}

export async function resolveBattlemechPendingHeat(actor, { source = "", postDangerCard = true, activation = null, force = false } = {}) {
  if (!actor || actor.type !== "battlemech") return { ok: false, reason: "BattleMech actor required." };

  const resolution = resolveBattlemechHeatActivation(actor);
  const activationKey = getBattlemechHeatActivationKey(activation);
  if (!force && activationKey && resolution.lastResolvedActivationKey === activationKey) {
    return {
      ok: true,
      actor,
      source,
      skipped: true,
      resolution,
    };
  }

  await actor.update({
    "system.monitors.heat.value": resolution.newHeat,
    "system.mwd.heat.current": resolution.newHeat,
    "system.mwd.heat.pendingGenerated": resolution.pendingGeneratedAfter,
    "system.mwd.heat.lastResolvedActivationKey": activationKey,
  });

  if (postDangerCard && resolution.inDanger) {
    await postBattlemechDangerChecksToChat(actor, resolution, { source });
  }

  return {
    ok: true,
    actor,
    source,
    resolution,
  };
}
