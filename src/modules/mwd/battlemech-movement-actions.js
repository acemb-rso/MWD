// src/modules/mwd/battlemech-movement-actions.js
// Purpose: Builds the BattleMech movement quick-action menu.
// How it fits: Sheets and actors both use this so token/synthetic actors still
//              get the baseline ground movement choices.

import { TEMPLATE } from "../constants.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { applyManagedStatusUpdate } from "../dialog/token-status-dialog.js";
import { adjustBattlemechPendingHeat } from "./machine-heat.js";
import { resolveMachineOperator } from "./machine-operator.js";
import { resolveMachineSceneToken } from "./machine-token-resolution.js";
import { applyMachineMovementPenalty, normalizeMachineMovement } from "./machine-movement.js";
import { getMachineMovementEffects } from "./machine-state-effects.js";

export const BATTLEMECH_MOVEMENT_ACTIONS = Object.freeze({
  walk: Object.freeze({ id: "walk", label: "Walk", cost: 1, heat: 0, mode: "ground" }),
  run: Object.freeze({ id: "run", label: "Run", cost: 2, heat: 1, mode: "ground" }),
  sprint: Object.freeze({ id: "sprint", label: "Sprint", cost: 3, heat: 2, mode: "ground" }),
  prone: Object.freeze({ id: "prone", label: "Prone", cost: 1, heat: 0, mode: "posture", statusId: "proneMechFall" }),
  fly: Object.freeze({ id: "fly", label: "Fly", cost: 1, heat: 0, mode: "flight" }),
  jump: Object.freeze({ id: "jump", label: "Jump", cost: 1, heat: 0, mode: "jump" }),
});

function movementNumber(value, fallback = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(0, Math.trunc(numeric));
}

export function buildBattlemechMovementActionChoices(actor = null) {
  const movement = normalizeMachineMovement(actor?.system?.movement ?? {}, {
    actorType: actor?.type ?? TEMPLATE.actorTypes.battlemech,
    legacyMoves: actor?.system?.moves,
  });
  const movementEffects = getMachineMovementEffects(actor);
  const jumping = actor?.system?.mwd?.mobility?.jumping ?? null;
  const movementBonus = movementNumber(movementEffects.movementBonus, 0);
  const flightSpeed = applyMachineMovementPenalty(movementNumber(movement.flight, 0) + movementBonus, movementEffects.movementPenalty, {
    immobile: movementEffects.immobile,
  });
  const groundSpeed = applyMachineMovementPenalty(movementNumber(movement.ground, 0) + movementBonus, movementEffects.movementPenalty, {
    immobile: movementEffects.immobile,
  });
  const isProne = actor?.statuses?.has?.("proneMechFall") ?? false;

  const disabledForImmobile = movementEffects.immobile ? "Machine is immobilized." : "";
  const choices = [
    {
      ...BATTLEMECH_MOVEMENT_ACTIONS.walk,
      heat: 0,
      distance: groundSpeed,
      hint: groundSpeed > 0 ? `${groundSpeed} m movement` : "Ground movement",
      disabled: Boolean(disabledForImmobile),
      reason: disabledForImmobile,
    },
    {
      ...BATTLEMECH_MOVEMENT_ACTIONS.run,
      heat: 1,
      distance: groundSpeed,
      hint: groundSpeed > 0 ? `${groundSpeed} m movement | +1 Heat` : "+1 Heat",
      disabled: Boolean(disabledForImmobile),
      reason: disabledForImmobile,
    },
    {
      ...BATTLEMECH_MOVEMENT_ACTIONS.sprint,
      heat: 2,
      distance: groundSpeed,
      hint: groundSpeed > 0 ? `${groundSpeed} m movement | +2 Heat` : "+2 Heat",
      disabled: Boolean(disabledForImmobile || movementEffects.noSprint),
      reason: disabledForImmobile || (movementEffects.noSprint ? "Sprint is blocked by current damage or status effects." : ""),
    },
    {
      ...BATTLEMECH_MOVEMENT_ACTIONS.prone,
      hint: isProne ? "Already prone" : "Apply Prone status",
      disabled: isProne,
      reason: isProne ? "Already prone." : "",
    },
  ];

  if (flightSpeed > 0) {
    choices.push({
      ...BATTLEMECH_MOVEMENT_ACTIONS.fly,
      distance: flightSpeed,
      hint: `${flightSpeed} m flight movement`,
      disabled: Boolean(disabledForImmobile),
      reason: disabledForImmobile,
    });
  }

  if (jumping?.enabled && movementNumber(jumping.movement, 0) > 0) {
    const jumpHeat = movementNumber(jumping.heat, 0);
    choices.push({
      ...BATTLEMECH_MOVEMENT_ACTIONS.jump,
      heat: jumpHeat,
      distance: movementNumber(jumping.movement, 0),
      hint: [
        `${movementNumber(jumping.movement, 0)} m jump movement`,
        jumpHeat > 0 ? `+${jumpHeat} Heat` : "",
        jumping.sourceLabel ?? "",
      ].filter(Boolean).join(" | "),
      disabled: Boolean(disabledForImmobile || movementEffects.noJump || jumping.blocked || jumping.available === false),
      reason: disabledForImmobile
        || (movementEffects.noJump ? "Jump movement is blocked by current damage or status effects." : "")
        || (jumping.blockedReason ?? ""),
    });
  }

  return choices;
}

export async function performBattlemechMovementAction(actor, { movementKind = "", operatorActorUuid = "" } = {}) {
  const actionId = String(movementKind ?? "").trim();
  const action = buildBattlemechMovementActionChoices(actor).find(entry => entry.id === actionId) ?? null;
  if (!action) {
    ui.notifications?.warn("Unknown movement action.");
    return { ok: false, reason: "Unknown movement action." };
  }
  if (action.disabled) {
    ui.notifications?.warn(action.reason || "That movement action is unavailable.");
    return { ok: false, reason: action.reason || "That movement action is unavailable." };
  }

  const token = resolveMachineSceneToken(actor);
  const operator = await resolveMachineOperator({
    machineActor: actor,
    operatorActorUuid,
  });
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
        moved: action.id !== "prone",
        round: Number(snapshot?.combat?.round ?? 0),
        turn: Number(snapshot?.combat?.turn ?? 0),
        combatantId: snapshot?.combatant?.id ?? null,
      };
      return state;
    }
  });

  if (action.heat > 0) {
    await adjustBattlemechPendingHeat(actor, action.heat, { reason: `${action.label} movement` });
  }

  if (action.statusId) {
    await applyManagedStatusUpdate({
      actor,
      statusId: action.statusId,
      active: true,
      metadata: { notes: "Applied from the Movement quick action." },
    });
  }

  ui.notifications?.info(`${actor?.name ?? "BattleMech"}: ${action.label} recorded (${action.cost} SA${action.heat > 0 ? `, +${action.heat} Heat` : ""}).`);
  return { ok: true, action, spend };
}
