// src/modules/roll/outcome/interpret-simple.js
// Purpose: Defines function `interpretSimpleOutcome`.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { getDN, toInt, getEdgePoolKey,
  isCriticalSuccessMargin, isCriticalFailureOnes } from "./_outcome-helpers.js";

/**
 * Simple roll:
 * - pass if successes >= DN
 * - margin = successes - DN
 * - Edge earn: margin > 4 net hits (critical success), or 0 hits with half+ dice as 1s (critical failure)
 *   Only applies when no edge was spent on the roll (enforced by caller).
 */
export function interpretSimpleOutcome(ctx, primary) {
  const successes = toInt(primary?.successes, 0);
  const dn = getDN(ctx, 1);

  const passed = successes >= dn;
  const margin = successes - dn;

  const criticalSuccess = isCriticalSuccessMargin(passed, margin, 4);
  const criticalFailure = isCriticalFailureOnes(successes, primary?.raw);

  const pool = getEdgePoolKey(ctx);
  let edgeEarned = null;
  if (margin > 4) {
    edgeEarned = { amount: 1, pool, reason: "criticalSuccess", details: { margin } };
  } else if (criticalFailure) {
    edgeEarned = { amount: 1, pool, reason: "criticalFailure", details: {} };
  }

  const tier =
    criticalSuccess ? "criticalSuccess" :
    criticalFailure ? "criticalFailure" :
    passed ? "success" : "failure";

  return {
    rollType: "simple",
    passed,
    successes,
    difficulty: { dn },
    margin,
    criticalSuccess,
    criticalFailure,
    tier,
    edgeEarned,
  };
}


