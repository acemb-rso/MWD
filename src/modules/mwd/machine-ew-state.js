// src/modules/mwd/machine-ew-state.js
// Combatant-flag read/write for EW state.
// This is the only module permitted to access combatant.flags.mwd.ewState.

import { CONTACT_STATE_ORDER, getTargetingDataCap } from "./machine-ew.js";
import {
  adjustTargetingDataValue,
  getMachineContactStateCap,
  getMachineTrackingPenaltyAdjustment,
} from "./machine-state-effects.js";

const FLAG_SCOPE = "mwd";
const FLAG_KEY   = "ewState";

function resolveTargetActorFromUuid(targetTokenUuid = "") {
  const uuid = String(targetTokenUuid ?? "").trim();
  if (!uuid) return null;
  return canvas?.tokens?.placeables?.find(token => (token.document?.uuid ?? token.uuid) === uuid)?.actor ?? null;
}

// ---------------------------------------------------------------------------
// Combatant lookup
// ---------------------------------------------------------------------------

/**
 * Find the combatant for a given canvas token within the active combat.
 * Always token-based — never actor-only.
 * @param {Token|TokenDocument} token
 * @returns {Combatant|null}
 */
export function getAttackerCombatant(token) {
  const combat = game.combat;
  if (!combat || !token) return null;
  const tokenId = token?.id ?? token?.document?.id ?? String(token ?? "").trim();
  if (!tokenId) return null;
  return combat.combatants.find(c => c.tokenId === tokenId) ?? null;
}

/**
 * Find the combatant for a target token (may be different from attacker).
 * @param {string} targetTokenId
 * @returns {Combatant|null}
 */
export function getTargetCombatant(targetTokenId) {
  const id = String(targetTokenId ?? "").trim();
  if (!id) return null;
  return game.combat?.combatants?.find(c => c.tokenId === id) ?? null;
}

// ---------------------------------------------------------------------------
// Normalization
// ---------------------------------------------------------------------------

export function normalizeEwTargetState(raw) {
  const contactState = CONTACT_STATE_ORDER.includes(raw?.contactState) ? raw.contactState : "blind";
  const packets = Array.isArray(raw?.packets)
    ? raw.packets.map(normalizePacket).filter(Boolean)
    : [];
  return { contactState, packets };
}

function normalizePacket(raw) {
  if (!raw || typeof raw !== "object") return null;
  const id = String(raw.id ?? "").trim();
  if (!id) return null;
  return {
    id,
    value:             Math.max(0, Number(raw.value ?? 0) || 0),
    consumed:          Boolean(raw.consumed),
    sourceTokenUuid:   String(raw.sourceTokenUuid ?? "").trim(),
    type:              String(raw.type ?? "self").trim() || "self",
    shareable:         Boolean(raw.shareable),
    persistent:        Boolean(raw.persistent),
    suppressedBy:      raw.suppressedBy ?? null,
    round:             Number.isFinite(Number(raw.round)) ? Number(raw.round) : null,
    expiresAfterRound: Number.isFinite(Number(raw.expiresAfterRound)) ? Number(raw.expiresAfterRound) : null,
  };
}

// ---------------------------------------------------------------------------
// Reads
// ---------------------------------------------------------------------------

function readEwState(combatant) {
  if (!combatant) return {};
  return combatant.getFlag(FLAG_SCOPE, FLAG_KEY) ?? {};
}

/**
 * Returns the normalized EW state for a specific attacker→target pair.
 * Always returns a valid shape (never null).
 */
export function getEwTargetState(combatant, targetTokenUuid) {
  const uuid = String(targetTokenUuid ?? "").trim();
  const all = readEwState(combatant);
  return normalizeEwTargetState(all[uuid]);
}

/**
 * Contact state the attacker has on this target. Defaults to "blind".
 */
export function getContactState(combatant, targetTokenUuid) {
  return getEwTargetState(combatant, targetTokenUuid).contactState;
}

/**
 * Tracking penalty dice imposed by the target's ECM and movement.
 * @param {Actor|null} targetActor
 * @param {Combatant|null} targetCombatant  — needed for movement check
 * @returns {number}  non-negative penalty dice
 */
export function getTrackingPenalty(targetActor, targetCombatant) {
  let penalty = 0;
  const statuses = targetActor?.statuses ?? new Set();
  if (statuses.has("ecmJamming"))  penalty += 2;
  if (statuses.has("ecmShrouded")) penalty += 1;
  if (statuses.has("obscuredLight")) penalty += 1;
  if (statuses.has("obscuredHeavy")) penalty += 3;
  if (statuses.has("obscured")) penalty += 1;

  if (targetCombatant) {
    const actionState = targetCombatant.getFlag(FLAG_SCOPE, "personalCombat")?.actionState ?? {};
    if (actionState.move !== null && actionState.move !== undefined) penalty += 1;
  }

  penalty += getMachineTrackingPenaltyAdjustment(targetActor);
  return penalty;
}

/**
 * Additional DN added to an acquire roll because of the target's ECM.
 */
export function getAcquireDnModifier(targetActor) {
  const statuses = targetActor?.statuses ?? new Set();
  return statuses.has("ecmShrouded") ? 1 : 0;
}

/**
 * Maximum contact state achievable against this target.
 * ecmJamming hard-caps at "track".
 */
export function getAcquireCeiling(targetActor) {
  const statuses = targetActor?.statuses ?? new Set();
  const baseCap = statuses.has("ecmJamming") ? "track" : "lock";
  const derivedCap = getMachineContactStateCap(targetActor);
  const baseIndex = CONTACT_STATE_ORDER.indexOf(baseCap);
  const derivedIndex = CONTACT_STATE_ORDER.indexOf(derivedCap);
  return derivedIndex >= 0 && derivedIndex < baseIndex ? derivedCap : baseCap;
}

/**
 * Returns the best usable targeting packet for an attacker-target pair,
 * or null if none is available.
 *
 * "Best" = highest capped value. Stacking policy: max, not sum.
 * A packet is unusable if: consumed, suppressed, or expired.
 * If contact state < "track", always returns null.
 */
export function getUsableTargetingPacket(combatant, targetTokenUuid, systemAttr, contactState, currentRound) {
  if (contactState !== "track" && contactState !== "lock") return null;

  const { packets } = getEwTargetState(combatant, targetTokenUuid);
  if (!packets.length) return null;

  const cap = getTargetingDataCap(systemAttr, contactState);
  const round = Number.isFinite(Number(currentRound)) ? Number(currentRound) : null;
  const targetActor = resolveTargetActorFromUuid(targetTokenUuid);

  let best = null;
  for (const p of packets) {
    if (p.consumed) continue;
    if (p.suppressedBy) continue;
    if (!p.persistent && p.expiresAfterRound !== null && round !== null && round > p.expiresAfterRound) continue;
    const usable = adjustTargetingDataValue({
      attacker: combatant?.actor ?? null,
      targetActor,
      value: Math.min(p.value, cap),
    });
    if (best === null || usable > best.value) {
      best = { id: p.id, value: usable };
    }
  }

  return best;
}

// ---------------------------------------------------------------------------
// Writes
// ---------------------------------------------------------------------------

export async function setContactState(combatant, targetTokenUuid, newState) {
  const uuid = String(targetTokenUuid ?? "").trim();
  if (!uuid || !combatant) return;
  const state = CONTACT_STATE_ORDER.includes(newState) ? newState : "blind";
  const all = { ...readEwState(combatant) };
  const current = normalizeEwTargetState(all[uuid]);
  all[uuid] = { ...current, contactState: state };
  await combatant.setFlag(FLAG_SCOPE, FLAG_KEY, all);
}

export async function addTargetingPacket(combatant, targetTokenUuid, packet) {
  const uuid = String(targetTokenUuid ?? "").trim();
  if (!uuid || !combatant || !packet?.id) return;
  const all = { ...readEwState(combatant) };
  const current = normalizeEwTargetState(all[uuid]);
  // Replace any existing packet with the same id; otherwise append.
  const existing = current.packets.findIndex(p => p.id === packet.id);
  const packets = existing >= 0
    ? current.packets.map((p, i) => i === existing ? normalizePacket(packet) : p)
    : [...current.packets, normalizePacket(packet)].filter(Boolean);
  all[uuid] = { ...current, packets };
  await combatant.setFlag(FLAG_SCOPE, FLAG_KEY, all);
}

export async function consumeTargetingPacket(combatant, targetTokenUuid, packetId) {
  const uuid = String(targetTokenUuid ?? "").trim();
  const id = String(packetId ?? "").trim();
  if (!uuid || !id || !combatant) return;
  const all = { ...readEwState(combatant) };
  const current = normalizeEwTargetState(all[uuid]);
  const packets = current.packets.map(p => p.id === id ? { ...p, consumed: true } : p);
  all[uuid] = { ...current, packets };
  await combatant.setFlag(FLAG_SCOPE, FLAG_KEY, all);
}

// ---------------------------------------------------------------------------
// Packet factory
// ---------------------------------------------------------------------------

export function buildTargetingPacket({ value, sourceToken, round } = {}) {
  return {
    id:                foundry.utils.randomID(),
    value:             Math.max(0, Number(value) || 0),
    consumed:          false,
    sourceTokenUuid:   sourceToken?.document?.uuid ?? sourceToken?.uuid ?? "",
    type:              "self",
    shareable:         false,
    persistent:        false,
    suppressedBy:      null,
    round:             Number.isFinite(Number(round)) ? Number(round) : null,
    expiresAfterRound: null,
  };
}
