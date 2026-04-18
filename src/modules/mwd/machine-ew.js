// src/modules/mwd/machine-ew.js
// Core EW derivation — pure reads, no side effects.

const CONTACT_STATE_ORDER = ["blind", "contact", "track", "lock"];

const CONTACT_STATE_LABELS = {
  blind:   "Blind",
  contact: "Contact",
  track:   "Track",
  lock:    "Lock",
};

/**
 * Returns the effective contact state an attacker has on a target.
 * Defaults to "blind" when no state is recorded.
 */
export function getContactState(actor, targetActorUuid) {
  const uuid = String(targetActorUuid ?? "").trim();
  if (!uuid) return "blind";
  const stored = actor?.system?.mwd?.contacts?.[uuid];
  return CONTACT_STATE_ORDER.includes(stored) ? stored : "blind";
}

/** Returns false when the contact state is "blind" (cannot attack). */
export function canAttack(actor, targetActorUuid) {
  return getContactState(actor, targetActorUuid) !== "blind";
}

/**
 * Computes the tracking penalty dice from the target's status effects.
 * Returns a non-negative integer (dice to subtract from pool).
 */
export function getTrackingPenalty(targetActor) {
  if (!targetActor) return 0;
  const statuses = targetActor.statuses ?? new Set();
  let penalty = 0;
  if (statuses.has("ecmJamming")) penalty += 2;
  if (statuses.has("ecmShrouded")) penalty += 1;
  return penalty;
}

/**
 * Maximum targeting data dice usable by an attacker against a target.
 * At track: capped at System attribute. At lock: System + 1.
 */
export function getTargetingDataCap(actor, state) {
  const systemAttr = Math.max(0, Number(actor?.system?.attributes?.system?.value ?? 0) || 0);
  if (state === "lock") return systemAttr + 1;
  if (state === "track") return systemAttr;
  return 0;
}

/**
 * Returns the dice bonus from a stored targeting packet for a given target.
 * Returns 0 if no valid packet exists, packet is consumed, or state < track.
 */
export function getUsableTargetingData(actor, targetActorUuid, state) {
  if (state !== "track" && state !== "lock") return 0;
  const uuid = String(targetActorUuid ?? "").trim();
  if (!uuid) return 0;
  const packet = actor?.system?.mwd?.targetingPackets?.[uuid];
  if (!packet || packet.consumed) return 0;
  const rawValue = Math.max(0, Number(packet.value ?? 0) || 0);
  const cap = getTargetingDataCap(actor, state);
  return Math.min(rawValue, cap);
}

/**
 * Resolves the effective contact state for an attacker-target pair.
 * MVP: direct state only. C3/C3i sharing is stubbed for future work.
 */
export function resolveEffectiveState(actor, targetActorUuid) {
  return getContactState(actor, targetActorUuid);
}

/**
 * Returns the new contact state after a successful acquire roll.
 * One tier upgrade per hit; stays at lock.
 */
export function upgradeContactState(current, rollHits) {
  const hits = Math.max(0, Number(rollHits) || 0);
  if (hits <= 0) return CONTACT_STATE_ORDER.includes(current) ? current : "blind";
  const idx = Math.max(0, CONTACT_STATE_ORDER.indexOf(current));
  const newIdx = Math.min(CONTACT_STATE_ORDER.length - 1, idx + hits);
  return CONTACT_STATE_ORDER[newIdx];
}

export function getContactStateLabel(state) {
  return CONTACT_STATE_LABELS[state] ?? String(state ?? "Unknown");
}

/** Returns an ordered list of all contact states for UI rendering. */
export function listContactStates() {
  return CONTACT_STATE_ORDER.map(s => ({ key: s, label: CONTACT_STATE_LABELS[s] }));
}
