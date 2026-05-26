// src/modules/roll/ew-execution.js
// Post-roll EW state mutations. Called by mwd-roll.js immediately after
// the roll resolves; there is no deferred Apply button.

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

function combatantsToArray(combatants) {
  if (!combatants) return [];
  if (Array.isArray(combatants)) return combatants;
  if (Array.isArray(combatants.contents)) return combatants.contents;
  if (typeof combatants[Symbol.iterator] === "function") return Array.from(combatants);
  return [];
}

function getCombatantById(id) {
  const combatantId = String(id ?? "").trim();
  if (!combatantId) return null;
  const combatants = globalThis.game?.combat?.combatants;
  return combatants?.get?.(combatantId)
    ?? combatantsToArray(combatants).find(entry => {
      const combatant = Array.isArray(entry) ? entry[1] : entry;
      return combatant?.id === combatantId;
    })
    ?? null;
}

function resolveAttackerCombatant(context = {}) {
  return getCombatantById(context?.attackerCombatantId)
    ?? getAttackerCombatant(getAttackerTokenFromUuid(context?.attackerTokenUuid))
    ?? getAttackerCombatant(getAttackerTokenFromId(context?.attackerTokenId));
}

/**
 * Apply the result of an acquire roll: advance the detection state by one tier
 * capped by the ceiling declared in ctx.acquire.
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
  if (!combatant) {
    const reason = "Acquire succeeded, but no attacker combatant was found; detection state was not persisted.";
    console.warn(`MWD | EW acquire: ${reason}`);
    return {
      ok: false,
      reason,
      persistenceFailed: true,
      previousState: acquire.currentState,
      newState: acquire.currentState,
      attemptedState: newState,
      ceiling,
      hits,
      dn,
      hitCeiling: newState !== rawNewState,
    };
  }

  await setDetectionState(combatant, acquire.targetTokenUuid, newState);

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
 * Apply the result of a targeting roll by storing a targeting data packet.
 * Packet value equals roll hits, capped by ctx.targeting.cap.
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
  if (!combatant) {
    const reason = "Targeting roll succeeded, but no attacker combatant was found; targeting data was not persisted.";
    console.warn(`MWD | EW targeting: ${reason}`);
    return {
      ok: false,
      reason,
      persistenceFailed: true,
      rawHits: rawValue,
      dn,
    };
  }

  await setTargetingPacket(combatant, targeting.targetTokenUuid, packet);

  return {
    ok:          true,
    packetValue: capped,
    rawHits:     rawValue,
    dn,
    packetId:    packet.id,
    hitCap:      capped < rawValue,
  };
}
