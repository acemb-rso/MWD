// src/modules/roll/outcome/interpret-outcome.js

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
