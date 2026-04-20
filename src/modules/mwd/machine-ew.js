// src/modules/mwd/machine-ew.js
// Pure, stateless EW derivation helpers — no actor/combatant lookups, no side effects.

export const CONTACT_STATE_ORDER = Object.freeze(["blind", "contact", "track", "lock"]);

const CONTACT_STATE_LABELS = Object.freeze({
  blind:   "Blind",
  contact: "Contact",
  track:   "Track",
  lock:    "Lock",
});

/**
 * Advance contact state exactly one tier. The caller is responsible for
 * verifying the roll passed before calling this.
 * Returns the same state if already at "lock" or state is unrecognized.
 */
export function upgradeContactState(current) {
  const idx = CONTACT_STATE_ORDER.indexOf(current);
  if (idx < 0 || idx >= CONTACT_STATE_ORDER.length - 1) return CONTACT_STATE_ORDER.includes(current) ? current : "blind";
  return CONTACT_STATE_ORDER[idx + 1];
}

/**
 * Maximum targeting data dice an attacker may carry into an attack roll.
 * Below "track" the cap is always 0 (no targeting data usable).
 */
export function getTargetingDataCap(systemAttr, state) {
  const attr = Math.max(0, Number(systemAttr) || 0);
  if (state === "lock")  return attr + 1;
  if (state === "track") return attr;
  return 0;
}

/**
 * Whether lock-gated systems (Artemis, fire-control CQ bonus, advanced
 * indirect fire) may be used for this shot.
 */
export function allowLockGatedSystems(state) {
  return state === "lock";
}

export function getContactStateLabel(state) {
  return CONTACT_STATE_LABELS[state] ?? String(state ?? "Unknown");
}

/** Ordered list of all states for UI rendering. */
export function listContactStates() {
  return CONTACT_STATE_ORDER.map(s => ({ key: s, label: CONTACT_STATE_LABELS[s] }));
}

/**
 * Base DN for an acquire roll given the current contact state.
 * contact → track: DN 2
 * track → lock:    DN 3
 * Any other: DN 1 (fallback — should not normally occur)
 */
export function getAcquireBaseDn(currentState) {
  if (currentState === "contact") return 2;
  if (currentState === "track")   return 3;
  return 1;
}
