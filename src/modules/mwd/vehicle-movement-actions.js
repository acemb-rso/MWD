// src/modules/mwd/vehicle-movement-actions.js
// Purpose: Vehicle movement quick actions, including Redline strain.
// How it fits: Mirrors the BattleMech movement action service while preserving
// vehicle doctrine: normal movement is stable, Redline is the Sprint equivalent.

import { TEMPLATE } from "../constants.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { applyManagedStatusUpdate } from "../dialog/token-status-dialog.js";
import { getVehicleStrainStateEffects, adjustVehiclePendingStrain } from "./vehicle-strain.js";
import { resolveMachineOperator } from "./machine-operator.js";
import { resolveMachineSceneToken } from "./machine-token-resolution.js";
import { applyMachineMovementPenalty, normalizeMachineMovement } from "./machine-movement.js";
import { getMachineMovementEffects } from "./machine-state-effects.js";
import { buildVehicleProfileSummary } from "./vehicle-profiles.js";

export const VEHICLE_MOVEMENT_ACTIONS = Object.freeze({
  move: Object.freeze({ id: "move", label: "Move", cost: 1, strain: 0, mode: "ground" }),
  reposition: Object.freeze({ id: "reposition", label: "Tactical Reposition", cost: 1, strain: 0, mode: "ground" }),
  redline: Object.freeze({ id: "redline", label: "Redline", cost: 2, strain: 1, mode: "ground" }),
  fly: Object.freeze({ id: "fly", label: "Flight Move", cost: 1, strain: 0, mode: "flight" }),
  hullDown: Object.freeze({ id: "hullDown", label: "Hull Down", cost: 1, strain: 0, mode: "posture", statusId: "entrenchedHullDown" }),
  brace: Object.freeze({ id: "brace", label: "Brace", cost: 1, strain: 0, mode: "posture", statusId: "braced" }),
});

function movementNumber(value, fallback = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(0, Math.trunc(numeric));
}

export function buildVehicleMovementActionChoices(actor = null) {
  const movement = normalizeMachineMovement(actor?.system?.movement ?? {}, {
    actorType: TEMPLATE.actorTypes.vehicle,
    legacyMoves: actor?.system?.moves,
  });
  const movementEffects = getMachineMovementEffects(actor);
  const strainEffects = getVehicleStrainStateEffects(actor);
  const profile = buildVehicleProfileSummary(actor?.system ?? {});
  const movementBonus = movementNumber(movementEffects.movementBonus, 0);
  const flightSpeed = applyMachineMovementPenalty(movementNumber(movement.flight, 0) + movementBonus, movementEffects.movementPenalty, {
    immobile: movementEffects.immobile,
  });
  const groundSpeed = applyMachineMovementPenalty(movementNumber(movement.ground, 0) + movementBonus, movementEffects.movementPenalty, {
    immobile: movementEffects.immobile,
  });

  const disabledForImmobile = movementEffects.immobile ? "Vehicle is immobilized." : "";
  const redlineBlocked = disabledForImmobile
    || (movementEffects.noSprint ? "Redline is blocked by current damage or status effects." : "")
    || (strainEffects.redlineBlocked ? "Vehicle strain is critical; Redline is blocked until reset or recovery." : "");

  const choices = [
    {
      ...VEHICLE_MOVEMENT_ACTIONS.move,
      distance: groundSpeed,
      hint: groundSpeed > 0 ? `${groundSpeed} m movement | stable operation` : "Stable movement",
      disabled: Boolean(disabledForImmobile),
      reason: disabledForImmobile,
    },
    {
      ...VEHICLE_MOVEMENT_ACTIONS.reposition,
      distance: groundSpeed,
      hint: `${profile.label} positioning | no strain`,
      disabled: Boolean(disabledForImmobile),
      reason: disabledForImmobile,
    },
    {
      ...VEHICLE_MOVEMENT_ACTIONS.redline,
      distance: groundSpeed,
      hint: groundSpeed > 0 ? `${groundSpeed} m movement | +1 Strain` : "+1 Strain",
      disabled: Boolean(redlineBlocked),
      reason: redlineBlocked,
    },
    {
      ...VEHICLE_MOVEMENT_ACTIONS.hullDown,
      hint: "Prepared position for vehicle survivability and support fire.",
      disabled: false,
      reason: "",
    },
    {
      ...VEHICLE_MOVEMENT_ACTIONS.brace,
      hint: "Stabilize the platform for controlled fire.",
      disabled: false,
      reason: "",
    },
  ];

  if (flightSpeed > 0 || profile.family === "flight") {
    choices.splice(1, 0, {
      ...VEHICLE_MOVEMENT_ACTIONS.fly,
      distance: flightSpeed,
      hint: flightSpeed > 0 ? `${flightSpeed} m flight movement | ${profile.label}` : `${profile.label} flight movement`,
      disabled: Boolean(disabledForImmobile),
      reason: disabledForImmobile,
    });
  }

  return choices;
}

export async function performVehicleMovementAction(actor, { movementKind = "", operatorActorUuid = "" } = {}) {
  const actionId = String(movementKind ?? "").trim();
  const action = buildVehicleMovementActionChoices(actor).find(entry => entry.id === actionId) ?? null;
  if (!action) {
    ui.notifications?.warn("Unknown vehicle movement action.");
    return { ok: false, reason: "Unknown vehicle movement action." };
  }
  if (action.disabled) {
    ui.notifications?.warn(action.reason || "That vehicle movement action is unavailable.");
    return { ok: false, reason: action.reason || "That vehicle movement action is unavailable." };
  }

  const token = resolveMachineSceneToken(actor);
  const operator = await resolveMachineOperator({ machineActor: actor, operatorActorUuid });
  const spendActor = operator?.actor ?? actor;
  const spend = await PersonalCombatTracker.spendResource(spendActor, {
    token,
    resource: "sa",
    cost: action.cost,
    actionId: "move",
    actionLabel: action.label,
    actionCostLabel: `${action.cost} SA`,
    actionCategory: action.cost > 1 ? "complex" : "simple",
  });
  if (!spend?.ok) {
    ui.notifications?.warn(spend?.reason ?? `Unable to record ${action.label}.`);
    return spend;
  }

  await PersonalCombatTracker.updateCombatantState(spendActor, {
    token,
    mutate: (state, snapshot) => {
      state.actionState ??= {};
      state.actionState.move = {
        actionId: "move",
        movementKind: action.id,
        label: action.label,
        moved: !["hullDown", "brace"].includes(action.id),
        round: Number(snapshot?.combat?.round ?? 0),
        turn: Number(snapshot?.combat?.turn ?? 0),
        combatantId: snapshot?.combatant?.id ?? null,
      };
      return state;
    },
  });

  if (action.strain > 0) {
    await adjustVehiclePendingStrain(actor, action.strain, { reason: `${action.label} movement` });
  }

  if (action.statusId) {
    await applyManagedStatusUpdate({
      actor,
      statusId: action.statusId,
      active: true,
      metadata: { notes: `Applied from the ${action.label} vehicle action.` },
    });
  }

  ui.notifications?.info(`${actor?.name ?? "Vehicle"}: ${action.label} recorded (${action.cost} SA${action.strain > 0 ? `, +${action.strain} Strain` : ""}).`);
  return { ok: true, action, spend };
}
