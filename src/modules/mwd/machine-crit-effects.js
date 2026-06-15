// src/modules/mwd/machine-crit-effects.js
// Purpose: Centralizes runtime machine-critical consequence rules.
// Workflow: active system.mwd.crits -> attack restrictions, activation reports,
// and summary text -> action services and sheets react to current damage.

import { TEMPLATE } from "../core/constants.js";
import { getActiveMachineCrits } from "./critical-hits.js";
import {
  getConfiguredMachineWeaponGroups,
  getMachineCritAutomationMode,
  getMachineCritEffectText,
  getMachineCritScopeSummary,
  getMachineCritStatusLabel,
  getMachineWeaponsForGroup,
  isBallisticMachineWeapon,
  isEnergyMachineWeapon,
  normalizeMachineCritId,
  normalizeMachineMountLocationFamily,
  resolveMachineCriticalWeaponScope,
} from "./machine-crit-consequences.js";

export function getMachineWeaponGroup(actor = null, groupId = "") {
  const normalizedId = normalizeMachineCritId(groupId);
  if (!normalizedId) return null;
  return getConfiguredMachineWeaponGroups(actor)
    .find(group => normalizeMachineCritId(group?.id) === normalizedId) ?? null;
}

function scopeMatchesAttack(crit = {}, scope = {}) {
  const critGroupId = normalizeMachineCritId(crit?.weaponGroupId);
  if (critGroupId && critGroupId === normalizeMachineCritId(scope.weaponGroupId)) return true;
  const scopedIds = new Set((Array.isArray(scope.weaponIds) ? scope.weaponIds : []).map(normalizeMachineCritId).filter(Boolean));
  return scopedIds.size > 0
    && (Array.isArray(crit?.weaponIds) ? crit.weaponIds : []).some(id => scopedIds.has(normalizeMachineCritId(id)));
}

export function getMachineAttackScope(actor = null, { weaponGroupId = "", weaponId = "", weapon = null } = {}) {
  // Accept either a group id or a single weapon id. Runtime critical rules care
  // about the resolved group membership and weapon damage families, not which
  // UI control launched the attack.
  const normalizedGroupId = normalizeMachineCritId(weaponGroupId);
  const normalizedWeaponId = normalizeMachineCritId(weaponId);
  const directGroup = getMachineWeaponGroup(actor, normalizedGroupId);
  const directWeapon = weapon ?? (normalizedWeaponId ? actor?.items?.get?.(normalizedWeaponId) ?? null : null);
  const groups = getConfiguredMachineWeaponGroups(actor);

  let derivedGroup = directGroup;
  if (!derivedGroup && normalizedWeaponId) {
    derivedGroup = groups.find(group => (Array.isArray(group?.weaponIds) ? group.weaponIds : []).map(normalizeMachineCritId).includes(normalizedWeaponId)) ?? null;
  }

  const weapons = derivedGroup
    ? getMachineWeaponsForGroup(actor, derivedGroup)
    : (directWeapon ? [directWeapon] : []);

  return {
    weaponGroupId: normalizeMachineCritId(derivedGroup?.id),
    weaponGroupName: String(derivedGroup?.name ?? "").trim(),
    weaponIds: weapons.map(entry => normalizeMachineCritId(entry?.id)).filter(Boolean),
    weapons,
    hasEnergy: weapons.some(isEnergyMachineWeapon),
    hasBallistic: weapons.some(isBallisticMachineWeapon),
  };
}

export function getMachineAttackActionCost(actor = null) {
  // Attack cost remains a runtime query because criticals can add action cost
  // after the sheet has already rendered its normal attack buttons.
  const activeCrits = getActiveMachineCrits(actor);
  const extraCost = activeCrits.reduce((sum, crit) => (
    normalizeMachineCritId(crit?.key) === "targetingProcessorLock" ? sum + 1 : sum
  ), 0);

  return {
    baseCost: 2,
    extraCost,
    totalCost: 2 + extraCost,
  };
}

export function getMachineAttackRestriction(actor = null, { weaponGroupId = "", weaponId = "", weapon = null } = {}) {
  // Blocking criticals are evaluated immediately before roll emission so stale
  // sheet context cannot fire a weapon group that was damaged mid-round.
  const scope = getMachineAttackScope(actor, { weaponGroupId, weaponId, weapon });
  const crits = getActiveMachineCrits(actor);

  for (const crit of crits) {
    if (!scopeMatchesAttack(crit, scope)) continue;
    const statusId = normalizeMachineCritId(crit?.statusId);
    if (statusId === "weaponFailure") {
      return {
        blocked: true,
        crit,
        reason: crit?.weaponGroupName
          ? `${crit.weaponGroupName} is unusable because of ${crit.label}.`
          : `${crit.label} prevents this weapon group from attacking.`,
      };
    }
    if (statusId === "jammedBallistic" && scope.hasBallistic) {
      return {
        blocked: true,
        crit,
        reason: crit?.weaponGroupName
          ? `${crit.weaponGroupName} is jammed and cannot make ballistic attacks.`
          : `${crit.label} prevents this ballistic attack.`,
      };
    }
  }

  return { blocked: false, crit: null, reason: "" };
}

export function getMachinePilotingDnModifier(actor = null) {
  return 0;
}

export function getMachineRuntimeAttributeAdjustments(actor = null) {
  const stalledCount = getActiveMachineCrits(actor)
    .filter(crit => normalizeMachineCritId(crit?.statusId) === "stalled")
    .length;

  return {
    handling: stalledCount > 0 ? -stalledCount : 0,
    system: stalledCount > 0 ? -stalledCount : 0,
  };
}

export function getMachineAttackDamageModifier(actor = null, { weaponGroupId = "", weaponId = "", weapon = null } = {}) {
  const scope = getMachineAttackScope(actor, { weaponGroupId, weaponId, weapon });
  if (!scope.hasEnergy) return 0;

  return getActiveMachineCrits(actor).reduce((sum, crit) => (
    normalizeMachineCritId(crit?.statusId) === "reactorInstability" ? sum - 1 : sum
  ), 0);
}

export function buildMachineActivationStartReport(actor = null) {
  // Start-of-activation criticals split into automated resource/heat deltas and
  // reminder-only entries for rules that still require table adjudication.
  const crits = getActiveMachineCrits(actor);
  const report = {
    saCost: 0,
    heatDelta: 0,
    automated: [],
    reminders: [],
  };

  for (const crit of crits) {
    const statusId = normalizeMachineCritId(crit?.statusId);
    if (statusId === "staggeredMechanical") {
      report.saCost += 1;
      report.automated.push({
        crit,
        label: "Staggered",
        text: "Spent 1 SA at the start of activation.",
      });
      continue;
    }
    if (statusId === "overheating") {
      report.heatDelta += 2;
      report.automated.push({
        crit,
        label: "Overheating",
        text: "Gained 2 Heat at the start of activation.",
      });
      continue;
    }
    if (statusId === "skidding") {
      report.reminders.push({
        crit,
        label: "Skidding",
        text: getMachineCritEffectText(crit),
      });
    }
  }

  return report;
}

export function describeMachineCriticalEffect(crit = {}) {
  return {
    statusLabel: getMachineCritStatusLabel(crit),
    effectText: getMachineCritEffectText(crit),
    automationMode: getMachineCritAutomationMode(crit),
    scopeSummary: getMachineCritScopeSummary(crit),
  };
}

export function buildMachineCriticalChatSummary(crit = {}) {
  const effect = describeMachineCriticalEffect(crit);
  const modeText = effect.automationMode === "engine" ? "Automated" : "Reminder";
  const parts = [
    effect.statusLabel ? `${effect.statusLabel}: ${effect.effectText}` : effect.effectText,
    effect.scopeSummary,
    modeText,
  ].filter(Boolean);
  return parts.join(" | ");
}

export function isMachineActor(actor = null) {
  return actor?.type === TEMPLATE.actorTypes.vehicle || actor?.type === TEMPLATE.actorTypes.battlemech;
}
