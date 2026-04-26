// src/modules/roll/ew-execution.js
// Post-roll EW state mutations.  Called by mwd-roll.js immediately after
// the roll resolves — no deferred Apply button.

import { DETECTION_STATE_ORDER, upgradeDetectionState } from "../mwd/machine-ew.js";
import {
  getAttackerCombatant,
  setDetectionState,
  setTargetingPacket,
  buildTargetingPacket,
} from "../mwd/machine-ew-state.js";

function getAttackerTokenFromUuid(uuid) {
  const id = String(uuid ?? "").trim();
  if (!id) return null;
  return canvas?.tokens?.placeables?.find(t => (t.document?.uuid ?? t.uuid) === id) ?? null;
}

function getAttackerTokenFromId(id) {
  const tokenId = String(id ?? "").trim();
  if (!tokenId) return null;
  return canvas?.tokens?.get?.(tokenId)
    ?? canvas?.tokens?.placeables?.find(t => (t.id ?? t.document?.id) === tokenId)
    ?? null;
}

function getCombatantById(id) {
  const combatantId = String(id ?? "").trim();
  if (!combatantId) return null;
  const combatants = game.combat?.combatants;
  return combatants?.get?.(combatantId)
    ?? combatants?.find?.(combatant => combatant?.id === combatantId)
    ?? null;
}

function resolveAttackerCombatant(context = {}) {
  return getCombatantById(context?.attackerCombatantId)
    ?? getAttackerCombatant(getAttackerTokenFromUuid(context?.attackerTokenUuid))
    ?? getAttackerCombatant(getAttackerTokenFromId(context?.attackerTokenId));
}

/**
 * Apply the result of an acquire roll: advance the detection state by 1 tier
 * (capped by the ceiling declared in ctx.acquire).
 *
 * State changes are written immediately to combatant flags.
 */
export async function resolveAcquireExecution({ attacker, ctx, outcomeModel } = {}) {
  const acquire = ctx?.acquire;
  if (!acquire) return { ok: false, reason: "Missing acquire context." };

  const hits = Number(outcomeModel?.successes ?? outcomeModel?.hits ?? 0);
  const dn      = Number(ctx?.difficulty?.dn ?? 1);
  const passed  = hits >= dn;

  if (!passed) {
    return {
      ok: false,
      reason:        "Acquire roll failed.",
      previousState: acquire.currentState,
      newState:      acquire.currentState,
      hits,
      dn,
    };
  }

  const ceiling      = acquire.ceiling ?? "lock";
  const rawNewState  = upgradeDetectionState(acquire.currentState);
  const ceilingIndex = DETECTION_STATE_ORDER.indexOf(ceiling);
  const newIndex     = DETECTION_STATE_ORDER.indexOf(rawNewState);
  const newState     = newIndex <= ceilingIndex ? rawNewState : ceiling;

  Hooks.callAll("mwd.beforeAcquireStateChange", {
    attacker,
    targetTokenUuid: acquire.targetTokenUuid,
    currentState: acquire.currentState,
    newState,
    ctx,
  });

  const combatant = resolveAttackerCombatant(acquire);
  if (combatant) {
    await setDetectionState(combatant, acquire.targetTokenUuid, newState);
  } else {
    console.warn("MWD | EW acquire: no combatant found for attacker token — state change not persisted.");
  }

  return {
    ok:            true,
    previousState: acquire.currentState,
    newState,
    ceiling,
    hits,
    dn,
    hitCeiling:    newState !== rawNewState,
  };
}

/**
 * Apply the result of a targeting roll: store a new targeting data packet.
 * Packet value = roll hits, capped by ctx.targeting.cap.
 *
 * The packet is written immediately to combatant flags.
 */
export async function resolveTargetingExecution({ attacker, ctx, outcomeModel } = {}) {
  const targeting = ctx?.targeting;
  if (!targeting) return { ok: false, reason: "Missing targeting context." };

  const hits = Number(outcomeModel?.successes ?? outcomeModel?.hits ?? 0);
  const dn     = Number(ctx?.difficulty?.dn ?? 2);
  const passed = hits >= dn;

  if (!passed) {
    return {
      ok:      false,
      reason:  "Targeting roll failed.",
      rawHits: hits,
      dn,
    };
  }

  const rawValue = hits;
  const capped   = Math.min(rawValue, targeting.cap);

  const attackerToken = getAttackerTokenFromUuid(targeting.attackerTokenUuid)
    ?? getAttackerTokenFromId(targeting.attackerTokenId);
  const packet = buildTargetingPacket({
    value:       capped,
    sourceToken: attackerToken,
    round:       game.combat?.round ?? null,
  });

  const combatant = resolveAttackerCombatant(targeting);
  if (combatant) {
    await setTargetingPacket(combatant, targeting.targetTokenUuid, packet);
  } else {
    console.warn("MWD | EW targeting: no combatant found for attacker token — packet not persisted.");
  }

  return {
    ok:          true,
    packetValue: capped,
    rawHits:     rawValue,
    dn,
    packetId:    packet.id,
    hitCap:      capped < rawValue,
  };
}
