// src/modules/roll/outcome/interpret-outcome.js
/**
 * @pipeline execution
 * @role Outcome interpreter. Given the RollContext and the rolled dice result,
 *   dispatches on ctx.rollType (simple / opposed / net / extended) to produce one
 *   normalized Outcome (passed, successes, difficulty/opposed/net/extended,
 *   edgeEarned). Step 6.5 of execute() (§10).
 * @invariants
 *   - INVARIANT(canonical): every roll type converges on the single Outcome
 *     shape here; interpretation branches by rollType, not by bespoke per-feature
 *     code paths (Design Principles §2.2, §11 — one meaning per mechanic).
 *   - INVARIANT(order): runs after the dice are rolled (step 6) and before the
 *     resolved payload is built (step 7). It reads the roll result; it never
 *     rolls or mutates the pool.
 *   - Interpretation only — success thresholds come from constants/context; do
 *     not hardcode difficulty here (§3.3, §11).
 * @upstream   mwd-roll.js execute() (step 6.5)
 * @downstream interpret-simple/opposed/net/extended.js (per-rollType interpreters)
 */

import { interpretSimpleOutcome } from "./interpret-simple.js";
import { interpretOpposedOutcome } from "./interpret-opposed.js";
import { interpretNetOutcome } from "./interpret-net.js";
import { interpretExtendedOutcome } from "./interpret-extended.js";

/**
 * @typedef {Object} DiceResult
 * @property {number} successes - Counted successes for this roll.
 * @property {any}    [raw]     - Optional raw dice data for chat display/debug.
 */

/**
 * @typedef {Object} Outcome
 * @property {string} rollType
 * @property {boolean} passed
 * @property {number} successes
 * @property {Object} [difficulty]
 * @property {Object} [opposed]
 * @property {Object} [net]
 * @property {Object} [extended]
 * @property {Object} [edgeEarned]
 */

/**
 * Interpret a roll result into a normalized Outcome.
 *
 * @param {any} ctx - RollContext (your canonical context shape).
 * @param {DiceResult} primary - Primary roll result (always required).
 * @param {DiceResult|null} [opposition=null] - Opponent roll result (required for opposed).
 * @returns {Outcome}
 */
export function interpretOutcome(ctx, primary, opposition = null) {
  const rollType = String(ctx?.rollType ?? "simple");

  switch (rollType) {
    case "simple":
      return interpretSimpleOutcome(ctx, primary);

    case "opposed":
      return interpretOpposedOutcome(ctx, primary, opposition);

    case "net":
      return interpretNetOutcome(ctx, primary);

    case "extended":
      return interpretExtendedOutcome(ctx, primary);

    default: {
      // Safe fallback: treat as simple DN 1 if misconfigured.
      const fallbackCtx = {
        ...ctx,
        rollType: "simple",
        difficulty: { dn: Number(ctx?.difficulty?.dn ?? 1) || 1 },
      };
      return interpretSimpleOutcome(fallbackCtx, primary);
    }
  }
}
