// src/modules/roll/outcome/interpret-net.js

import {
  getDN,
  toInt,
  remainderAfterDN,
  normalizeConvert,
  computeEdgeEarned,
  getEdgeEarnConfig,
  getEdgePoolKey,
  isCriticalFailureOnes
} from "./_outcome-helpers.js";



/**
 * Net roll:
 * - DN is a gate
 * - remainder = max(0, successes - DN)
 * - allocation:
 *    convert = multiples of 4 from remainder (ctx.net.convert)
 *    net = remainder - convert
 * - passed if successes >= DN (i.e., remainder > 0 OR successes == DN is a "meet DN" success)
 *   You can tune passed semantics later; this keeps it simple.
 *
 * Edge earn:
 * - If edge earning enabled, Edge is earned from convert: convert/rate.
 */
export function interpretNetOutcome(ctx, primary) {
  const successes = toInt(primary?.successes, 0);
  const dn = getDN(ctx, 1);

  // Gate model: meet DN or fail.
  const passed = successes >= dn;
  const criticalFailure = isCriticalFailureOnes(successes, primary?.raw);

  const remainder = remainderAfterDN(successes, dn);

  // Conversion choice comes from ctx.net.convert (preferred) or ctx.allocation.convert (fallback)
  const requestedConvert = ctx?.net?.convert ?? ctx?.allocation?.convert ?? 0;

  const earnCfg = getEdgeEarnConfig(ctx);
  const rate = earnCfg.rate; // default 4
  const convert = normalizeConvert({ convert: requestedConvert, remainder, rate });

  const net = remainder - convert;

  const edge = (earnCfg.enabled && convert >= rate)
    ? (() => {
        const { amount } = computeEdgeEarned(convert, { rate, maxPerRoll: earnCfg.maxPerRoll });
        const pool = getEdgePoolKey(ctx);
        return amount > 0 ? { amount, pool, reason: "convert4", details: { converted: convert, rate } } : null;
      })()
    : null;

    // Critical Failure bonus Edge (net rolls only, per your rule)
    // Keep this separate from conversion so conversion logic stays intact.
    const critFailEdge = criticalFailure
      ? (() => {
          const pool = getEdgePoolKey(ctx);
          return { amount: 1, pool, reason: "critFail", details: { onesRule: "halfOrMoreOnes" } };
        })()
      : null;

    // Preserve existing edgeEarned shape while allowing multiple awards.
    // - edgeEarned remains a single object with the total amount (backward compatible)
    // - edgeAwards lists the components (future-proof for UI)
    const edgeAwards = [];
    if (edge) edgeAwards.push(edge);
    if (critFailEdge) edgeAwards.push(critFailEdge);

    const edgeEarned =
      edgeAwards.length === 0 ? null :
      edgeAwards.length === 1 ? edgeAwards[0] :
      {
        amount: edgeAwards.reduce((s, a) => s + (Number(a?.amount) || 0), 0),
        pool: edgeAwards[0]?.pool ?? null,
        reason: "multiple",
        details: { awards: edgeAwards }
      };

  return {
    rollType: "net",
    passed,
    successes,
    difficulty: { dn },
    criticalFailure,
    tier: criticalFailure ? "criticalFailure" : (passed ? "success" : "failure"),
    net: {
      remainder,
      convertRequested: toInt(requestedConvert, 0),
      converted: convert,
      value: net, // the actual net effect magnitude you apply (+net dice, etc.)
      rate,
      canConvert: remainder >= rate
    },
    edgeEarned: edge,
  };
}
