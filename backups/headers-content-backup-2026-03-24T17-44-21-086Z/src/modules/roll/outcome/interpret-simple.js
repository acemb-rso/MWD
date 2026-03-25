// src/modules/roll/outcome/interpret-simple.js

import { getDN, toInt, computeEdgeEarned, getEdgeEarnConfig, getEdgePoolKey,
  isCriticalSuccessMargin, isCriticalFailureOnes } from "./_outcome-helpers.js";

/**
 * Simple roll:
 * - pass if successes >= DN
 * - margin = successes - DN
 * - Edge earn rule: if margin >= 4, earn 1 (default) (configurable via ctx.edge.earn)
 */
export function interpretSimpleOutcome(ctx, primary) {
  const successes = toInt(primary?.successes, 0);
  const dn = getDN(ctx, 1);

  const passed = successes >= dn;
  const margin = successes - dn;

  // ✅ Critical Success: passed with margin >= 4
  // ✅ Critical Failure: 0 hits AND half-or-more dice are 1s
  const criticalSuccess = isCriticalSuccessMargin(passed, margin, 4);
  const criticalFailure = isCriticalFailureOnes(successes, primary?.raw);

  const earnCfg = getEdgeEarnConfig(ctx);
  const maxPerRoll = earnCfg.maxPerRoll ?? 1;

  const edge = (earnCfg.enabled && margin >= earnCfg.rate)
    ? (() => {
        const { amount, rate } = computeEdgeEarned(margin, { rate: earnCfg.rate, maxPerRoll });
        const pool = getEdgePoolKey(ctx);
        return amount > 0 ? { amount, pool, reason: "net4", details: { margin, rate } } : null;
      })()
    : null;

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
    edgeEarned: edge,
  };
}


