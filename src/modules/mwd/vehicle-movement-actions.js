// src/modules/mwd/vehicle-movement-actions.js
// Purpose: Vehicle movement quick actions, including Redline strain.
// How it fits: Mirrors the BattleMech movement action service while preserving
// vehicle doctrine: normal movement is stable, Redline is the Sprint equivalent.

import { TEMPLATE } from "../core/constants.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { applyManagedStatusUpdate } from "../dialog/token-status-dialog.js";
import { getVehicleStrainStateEffects, adjustVehiclePendingStrain } from "./vehicle-strain.js";
import { resolveMachineOperator } from "./machine-operator.js";
import { resolveMachineSceneToken } from "./machine-token-resolution.js";
import { applyMachineMovementPenalty, normalizeMachineMovement } from "./machine-movement.js";
import { getMachineMovementEffects } from "./machine-state-effects.js";
import { buildVehicleProfileSummary } from "./vehicle-profiles.js";
import { revealMachineSignature } from "./machine-stealth.js";

export const VEHICLE_MOVEMENT_ACTIONS = Object.freeze({
  move: Object.freeze({ id: "move", label: "Move", cost: 1, strain: 0, mode: "ground" }),
  reposition: Object.freeze({ id: "reposition", label: "Tactical Reposition", cost: 1, strain: 0, mode: "ground" }),
  redline: Object.freeze({ id: "redline", label: "Redline", cost: 2, strain: 1, mode: "ground" }),
  fly: Object.freeze({ id: "fly", label: "Flight Move", cost: 1, strain: 0, mode: "flight" }),
  hullDown: Object.freeze({ id: "hullDown", label: "Hull Down", cost: 1, strain: 0, mode: "posture", statusId: "entrenchedHullDown" }),
  brace: Object.freeze({ id: "brace", label: "Brace", cost: 1, strain: 0, mode: "posture", statusId: "braced" }),
  evasiveManeuver: Object.freeze({ id: "evasiveManeuver", label: "Evasive Maneuver", cost: 2, strain: 0, mode: "posture", statusId: "evasiveWeave", includesMovement: true }),
  shield: Object.freeze({ id: "shield", label: "Shield", cost: 2, strain: 0, mode: "posture", statusId: "shielded" }),
});

// Posture statuses that are mutually exclusive — applying one clears the others.
const MACHINE_POSTURE_STATUS_IDS = Object.freeze(["braced", "entrenchedHullDown", "evasiveWeave", "shielded"]);

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
      hint: "Stabilize the platform for controlled fire. +1 AR, no movement.",
      disabled: false,
      reason: "",
    },
    {
      ...VEHICLE_MOVEMENT_ACTIONS.evasiveManeuver,
      distance: groundSpeed,
      hint: groundSpeed > 0 ? `Withdraw safely — move up to ${groundSpeed} m, gain Evasive (+3 DR / −2 AR)` : "Withdraw and gain Evasive (+3 DR / −2 AR)",
      disabled: Boolean(disabledForImmobile),
      reason: disabledForImmobile,
    },
    {
      ...VEHICLE_MOVEMENT_ACTIONS.shield,
      hint: "Guarded stance: +4 DR / −1 AR. First hit absorbed (−2 damage), then Shield ends.",
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
        moved: !["hullDown", "brace", "shield"].includes(action.id),
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

  if (action.id === "redline") {
    await revealMachineSignature(actor, {
      reason: "redlineMovement",
      source: "movement",
      duration: "untilNextActivation",
      token,
    });
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
      metadata: { notes: `Applied from the ${action.label} vehicle action.` },
    });
  }

  if (action.id === "evasiveManeuver") {
    await ChatMessage.create({
      content: `<div class="mwd-chat-message"><p><strong>${actor?.name ?? "Vehicle"}</strong> takes an <strong>Evasive Maneuver</strong>. May move up to normal distance — movement does not trigger opportunity or parting attacks from adjacent enemies. Gains <strong>Evasive</strong> (+3 DR / −2 AR) until the start of next activation. Clear the <em>Evasive Weave</em> status at the start of the next turn.</p></div>`,
      speaker: ChatMessage.getSpeaker({ actor }),
      flags: { mwd: { messageType: "postureAction", actionId: "evasiveManeuver" } },
    });
  } else if (action.id === "shield") {
    await ChatMessage.create({
      content: `<div class="mwd-chat-message"><p><strong>${actor?.name ?? "Vehicle"}</strong> takes a <strong>Shield</strong> posture. Gains <strong>Shielded</strong> (+4 DR / −1 AR) until the start of next activation. The first hit or graze reduces incoming damage by 2, then Shield ends — apply this manually and clear the <em>Shielded</em> status. Clear at the start of the next turn if unused.</p></div>`,
      speaker: ChatMessage.getSpeaker({ actor }),
      flags: { mwd: { messageType: "postureAction", actionId: "shield" } },
    });
  } else {
    ui.notifications?.info(`${actor?.name ?? "Vehicle"}: ${action.label} recorded (${action.cost} SA${action.strain > 0 ? `, +${action.strain} Strain` : ""}).`);
  }

  return { ok: true, action, spend };
}
