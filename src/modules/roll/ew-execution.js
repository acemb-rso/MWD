// src/modules/roll/ew-execution.js
// Post-roll EW state mutations. Called by mwd-roll.js immediately after
// the roll resolves; there is no deferred Apply button.

import { DETECTION_STATE_ORDER, upgradeDetectionState } from "../mwd/machine-ew.js";
import {
  getAttackerCombatant,
  getDetectionState,
  getTargetCombatant,
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

function getTokenUuid(token = null) {
  return String(token?.document?.uuid ?? token?.uuid ?? "").trim();
}

function downgradeDetectionState(state = "blind") {
  const index = DETECTION_STATE_ORDER.indexOf(state);
  if (index <= 0) return "blind";
  return DETECTION_STATE_ORDER[index - 1] ?? "blind";
}

function resolveBreakLockObserverCombatant(payload = {}) {
  const combatantId = String(payload?.targetCombatantId ?? "").trim();
  if (combatantId) return getCombatantById(combatantId);

  const targetTokenId = String(payload?.targetTokenId ?? "").trim();
  if (targetTokenId) {
    return getTargetCombatant(targetTokenId)
      ?? getAttackerCombatant(getAttackerTokenFromId(targetTokenId));
  }

  const targetTokenUuid = String(payload?.targetTokenUuid ?? "").trim();
  if (targetTokenUuid) {
    return getAttackerCombatant(getAttackerTokenFromUuid(targetTokenUuid));
  }

  return null;
}

function resolveBreakLockSourceToken(actor = null, payload = {}) {
  return getAttackerTokenFromUuid(payload?.sourceTokenUuid)
    ?? getAttackerTokenFromId(payload?.sourceTokenId)
    ?? actor?.getActiveTokens?.(true, true)?.[0]
    ?? actor?.token?.object
    ?? actor?.token
    ?? null;
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

/**
 * Apply Break Lock: a successful defensive EW roll downgrades the selected
 * observer/attacker combatant's detection state for the machine taking action.
 */
export async function resolveBreakLockExecution({ attacker, payload = {}, ctx = {}, outcomeModel } = {}) {
  const actionKey = String(payload?.machineActionKey ?? "").trim();
  if (actionKey !== "breakLock") return null;

  const hits = Number(outcomeModel?.successes ?? outcomeModel?.hits ?? 0);
  const dn = Number(ctx?.difficulty?.dn ?? 1);
  const passed = hits >= dn;

  const sourceToken = resolveBreakLockSourceToken(attacker, payload);
  const targetTokenUuid = String(payload?.breakLockTargetTokenUuid ?? "").trim() || getTokenUuid(sourceToken);
  const observerCombatant = resolveBreakLockObserverCombatant(payload);

  if (!passed) {
    return {
      ok: false,
      reason: "Break Lock roll failed.",
      hits,
      dn,
      targetTokenUuid,
    };
  }

  if (!targetTokenUuid) {
    return {
      ok: false,
      reason: "Break Lock succeeded, but no acting machine token was found.",
      persistenceFailed: true,
      hits,
      dn,
    };
  }

  if (!observerCombatant) {
    return {
      ok: false,
      reason: "Break Lock succeeded, but no observing combatant was found; detection state was not persisted.",
      persistenceFailed: true,
      hits,
      dn,
      targetTokenUuid,
    };
  }

  const previousState = getDetectionState(observerCombatant, targetTokenUuid);
  const newState = downgradeDetectionState(previousState);
  if (newState === previousState) {
    return {
      ok: false,
      reason: "Observer has no detection state to reduce.",
      previousState,
      newState,
      hits,
      dn,
      targetTokenUuid,
      observerCombatantId: observerCombatant.id ?? "",
    };
  }

  Hooks.callAll("mwd.beforeBreakLockStateChange", {
    attacker,
    observerCombatant,
    targetTokenUuid,
    previousState,
    newState,
    ctx,
  });

  await setDetectionState(observerCombatant, targetTokenUuid, newState);

  return {
    ok: true,
    previousState,
    newState,
    hits,
    dn,
    targetTokenUuid,
    observerCombatantId: observerCombatant.id ?? "",
  };
}
