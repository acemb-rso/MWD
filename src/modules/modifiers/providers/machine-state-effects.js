// src/modules/modifiers/providers/machine-state-effects.js
// Purpose: Emits canonical machine status/degradation dice modifiers.
// How it fits: Keeps canonical state penalties on the modifier-provider rail
// instead of scattering dice math across individual resolvers.

import { TEMPLATE } from "../../constants.js";
import { computeHeatPenalties } from "../../mwd/heat-effects.js";
import { normalizeMachineHeatThresholds } from "../../mwd/heat-state.js";
import {
  getMachineAcquireDiceModifier,
  getMachineAttackDiceModifier,
  getMachinePilotingDiceModifier,
  getMachineTargetingDiceModifier,
} from "../../mwd/machine-state-effects.js";

function isMachineActor(actor = null) {
  return actor?.type === TEMPLATE.actorTypes.vehicle || actor?.type === TEMPLATE.actorTypes.battlemech;
}

function isRangedAttack(resolved = {}, payload = {}) {
  const weapon = resolved?.attack?.weapon ?? {};
  const category = String(weapon?.category ?? weapon?.attackKind ?? payload?.attackKind ?? "").trim().toLowerCase();
  const skill = String(resolved?.attack?.skill?.code ?? weapon?.skill ?? payload?.key ?? "").trim().toLowerCase();
  return category !== "melee" && skill !== "meleecombat" && skill !== "melee";
}

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function getBattlemechRangedHeatPenalty(actor = null) {
  const heatMonitor = actor?.system?.monitors?.heat ?? {};
  const heatConfig = actor?.system?.mwd?.heat ?? {};
  const current = Math.max(0, toNumber(heatMonitor.value ?? heatConfig.current, 0));
  const trackLength = Math.max(0, toNumber(heatMonitor.max ?? heatConfig.max ?? heatConfig.hardMax, 0));
  const thresholds = normalizeMachineHeatThresholds(heatConfig.thresholds ?? {}, trackLength);
  return Math.max(0, toNumber(computeHeatPenalties(current, thresholds).rangedDicePenalty, 0));
}

export class MachineStateEffectsProvider {
  id = "mwd.machineStateEffects";
  label = "Machine State Effects";

  collect({ actor, resolved, payload } = {}) {
    if (!isMachineActor(actor)) return [];

    const intent = String(resolved?.intent ?? payload?.intent ?? "").trim();
    const mods = [];

    if (intent === "attack") {
      const value = getMachineAttackDiceModifier(actor, {
        weaponGroupId: resolved?.attack?.weapon?.machineWeaponGroup?.id ?? payload?.weaponGroupId,
        weaponId: payload?.weaponId,
        weapon: resolved?.attack?.weapon,
        rangeBand: resolved?.attack?.rangeBand ?? payload?.rangeBand,
      });
      if (value) {
        mods.push({
          id: "machineState.attackDice",
          label: "Machine State",
          value,
          source: "Machine State",
        });
      }

      if (actor.type === TEMPLATE.actorTypes.battlemech && isRangedAttack(resolved, payload)) {
        const heatPenalty = getBattlemechRangedHeatPenalty(actor);
        if (heatPenalty) {
          mods.push({
            id: "battlemechHeat.rangedDice",
            label: "Overheat",
            value: -heatPenalty,
            source: "Heat",
          });
        }
      }
    }

    if (intent === "acquire") {
      const value = getMachineAcquireDiceModifier(actor);
      if (value) {
        mods.push({
          id: "machineState.acquireDice",
          label: "Sensors",
          value,
          source: "Machine State",
        });
      }
    }

    if (intent === "targeting") {
      const value = getMachineTargetingDiceModifier(actor);
      if (value) {
        mods.push({
          id: "machineState.targetingDice",
          label: "Fire Solution",
          value,
          source: "Machine State",
        });
      }
    }

    if (intent === "skill" && String(payload?.key ?? "").trim() === "piloting") {
      const value = getMachinePilotingDiceModifier(actor);
      if (value) {
        mods.push({
          id: "machineState.pilotingDice",
          label: "Piloting State",
          value,
          source: "Machine State",
        });
      }
    }

    return mods;
  }
}
