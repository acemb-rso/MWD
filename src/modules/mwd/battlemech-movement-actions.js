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
import { resolveBattlemechJumpProfile } from "./battlemech-mobility.js";

export const BATTLEMECH_MOVEMENT_ACTIONS = Object.freeze({
  walk: Object.freeze({ id: "walk", label: "Walk", cost: 1, heat: 0, mode: "ground" }),
  run: Object.freeze({ id: "run", label: "Run", cost: 2, heat: 1, mode: "ground" }),
  sprint: Object.freeze({ id: "sprint", label: "Sprint", cost: 3, heat: 2, mode: "ground", requiresStabilityRoll: true }),
  prone: Object.freeze({ id: "prone", label: "Prone", cost: 1, heat: 0, mode: "posture", statusId: "proneMechFall" }),
  fly: Object.freeze({ id: "fly", label: "Fly", cost: 1, heat: 0, mode: "flight" }),
  jump: Object.freeze({ id: "jump", label: "Jump", cost: 1, heat: 0, mode: "jump" }),
  evasiveManeuver: Object.freeze({ id: "evasiveManeuver", label: "Evasive Maneuver", cost: 2, heat: 0, mode: "posture", statusId: "evasiveWeave", includesMovement: true }),
  shield: Object.freeze({ id: "shield", label: "Shield", cost: 2, heat: 0, mode: "posture", statusId: "shielded" }),
});

// Posture statuses that are mutually exclusive — applying one clears the others.
const MACHINE_POSTURE_STATUS_IDS = Object.freeze(["braced", "entrenchedHullDown", "evasiveWeave", "shielded"]);
const BATTLEMECH_GROUND_MOVEMENT_MULTIPLIERS = Object.freeze({
  walk: 1,
  run: 2,
  sprint: 3,
});
const AIRBORNE_STATUS_IDS = Object.freeze(["airborne", "flying", "inFlight", "hovering"]);

function movementNumber(value, fallback = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(0, Math.trunc(numeric));
}

function hasStatus(actor = null, statusId = "") {
  return Boolean(actor?.statuses?.has?.(statusId));
}

function isAirborneMachine(actor = null, movement = {}) {
  if (AIRBORNE_STATUS_IDS.some(statusId => hasStatus(actor, statusId))) return true;
  if (actor?.system?.mwd?.airborne === true || actor?.system?.airborne === true) return true;
  const movementMode = String(actor?.system?.mwd?.movementMode ?? actor?.system?.movementMode ?? "").trim().toLowerCase();
  if (["air", "airborne", "flight", "flying"].includes(movementMode)) return true;
  return movementNumber(movement.flight, 0) > 0 && movementNumber(movement.ground, 0) <= 0;
}

export function buildBattlemechMovementActionChoices(actor = null) {
  const movement = normalizeMachineMovement(actor?.system?.movement ?? {}, {
    actorType: actor?.type ?? TEMPLATE.actorTypes.battlemech,
    legacyMoves: actor?.system?.moves,
  });
  const movementEffects = getMachineMovementEffects(actor);
  const jumping = resolveBattlemechJumpProfile(actor);
  const movementBonus = movementNumber(movementEffects.movementBonus, 0);
  const flightSpeed = applyMachineMovementPenalty(movementNumber(movement.flight, 0) + movementBonus, movementEffects.movementPenalty, {
    immobile: movementEffects.immobile,
  });
  const airborne = isAirborneMachine(actor, movement);
  const selectedBaseSpeed = airborne && movementNumber(movement.flight, 0) > 0
    ? movementNumber(movement.flight, 0)
    : movementNumber(movement.ground, 0);
  const movementBaseSpeed = applyMachineMovementPenalty(selectedBaseSpeed + movementBonus, movementEffects.movementPenalty, {
    immobile: movementEffects.immobile,
  });
  const movementDistance = kind => movementBaseSpeed * movementNumber(BATTLEMECH_GROUND_MOVEMENT_MULTIPLIERS[kind], 1);
  const walkDistance = movementDistance("walk");
  const runDistance = movementDistance("run");
  const sprintDistance = movementDistance("sprint");
  const isProne = actor?.statuses?.has?.("proneMechFall") ?? false;

  const disabledForImmobile = movementEffects.immobile ? "Machine is immobilized." : "";
  const choices = [
    {
      ...BATTLEMECH_MOVEMENT_ACTIONS.walk,
      heat: 0,
      distance: walkDistance,
      hint: walkDistance > 0 ? `${walkDistance} m movement` : "Ground movement",
      disabled: Boolean(disabledForImmobile),
      reason: disabledForImmobile,
    },
    {
      ...BATTLEMECH_MOVEMENT_ACTIONS.run,
      heat: 1,
      distance: runDistance,
      hint: runDistance > 0 ? `${runDistance} m movement` : "Ground movement",
      disabled: Boolean(disabledForImmobile),
      reason: disabledForImmobile,
    },
    {
      ...BATTLEMECH_MOVEMENT_ACTIONS.sprint,
      heat: 2,
      distance: sprintDistance,
      hint: sprintDistance > 0 ? `${sprintDistance} m movement | Stability roll` : "Stability roll",
      disabled: Boolean(disabledForImmobile || movementEffects.noSprint),
      reason: disabledForImmobile || (movementEffects.noSprint ? "Sprint is blocked by current damage or status effects." : ""),
    },
    {
      ...BATTLEMECH_MOVEMENT_ACTIONS.prone,
      hint: isProne ? "Already prone" : "Apply Prone status",
      disabled: isProne,
      reason: isProne ? "Already prone." : "",
    },
    {
      ...BATTLEMECH_MOVEMENT_ACTIONS.evasiveManeuver,
      distance: walkDistance,
      hint: walkDistance > 0 ? `Withdraw safely — move up to ${walkDistance} m, gain Evasive (+3 DR / -2 AR)` : "Withdraw and gain Evasive (+3 DR / -2 AR)",
      disabled: Boolean(disabledForImmobile),
      reason: disabledForImmobile,
    },
    {
      ...BATTLEMECH_MOVEMENT_ACTIONS.shield,
      hint: "Guarded stance: +4 DR / −1 AR. First hit absorbed (−2 damage), then Shield ends.",
      disabled: false,
      reason: "",
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
        moved: !["prone", "shield"].includes(action.id),
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
    // Clear all other mutually-exclusive posture statuses first.
    for (const otherId of MACHINE_POSTURE_STATUS_IDS) {
      if (otherId !== action.statusId) {
        await applyManagedStatusUpdate({ actor, statusId: otherId, active: false });
      }
    }
    await applyManagedStatusUpdate({
      actor,
      statusId: action.statusId,
      active: true,
      metadata: { notes: "Applied from the Movement quick action." },
    });
  }

  if (action.id === "evasiveManeuver") {
    await ChatMessage.create({
      content: `<div class="mwd-chat-message"><p><strong>${actor?.name ?? "BattleMech"}</strong> takes an <strong>Evasive Maneuver</strong>. May move up to normal distance — movement does not trigger opportunity or parting attacks from adjacent enemies. Gains <strong>Evasive</strong> (+3 DR / −2 AR) until the start of next activation. Clear the <em>Evasive Weave</em> status at the start of the next turn.</p></div>`,
      speaker: ChatMessage.getSpeaker({ actor }),
      flags: { mwd: { messageType: "postureAction", actionId: "evasiveManeuver" } },
    });
  } else if (action.id === "shield") {
    await ChatMessage.create({
      content: `<div class="mwd-chat-message"><p><strong>${actor?.name ?? "BattleMech"}</strong> takes a <strong>Shield</strong> posture. Gains <strong>Shielded</strong> (+4 DR / −1 AR) until the start of next activation. The first hit or graze reduces incoming damage by 2, then Shield ends — apply this manually and clear the <em>Shielded</em> status. Clear at the start of the next turn if unused.</p></div>`,
      speaker: ChatMessage.getSpeaker({ actor }),
      flags: { mwd: { messageType: "postureAction", actionId: "shield" } },
    });
  } else {
    ui.notifications?.info(`${actor?.name ?? "BattleMech"}: ${action.label} recorded (${action.cost} SA${action.heat > 0 ? `, +${action.heat} Heat` : ""}${action.requiresStabilityRoll ? ", stability roll required" : ""}).`);
  }

  return { ok: true, action, spend };
}
