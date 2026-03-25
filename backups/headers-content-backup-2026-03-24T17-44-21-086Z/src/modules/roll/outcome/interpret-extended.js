// src/modules/roll/outcome/interpret-extended.js

import { toInt, clampInt } from "./_outcome-helpers.js";

/**
 * Extended roll:
 * - accumulated carries across rolls via ctx.extended.accumulated
 * - this step adds successes to accumulated
 */
export function interpretExtendedOutcome(ctx, primary) {
  const successes = toInt(primary?.successes, 0);

  const target = clampInt(ctx?.extended?.target, 1, 10_000);
  const accumulated = clampInt(ctx?.extended?.accumulated, 0, 10_000);

  const nextAccumulated = clampInt(accumulated + successes, 0, 10_000);
  const completed = nextAccumulated >= target;

  return {
    rollType: "extended",
    passed: completed,
    successes,
    extended: {
      target,
      accumulated,
      nextAccumulated,
      remaining: Math.max(0, target - nextAccumulated),
      completed,
      interval: ctx?.extended?.interval ?? null,
      failureLimit: ctx?.extended?.failureLimit ?? null,
    },
    // NOTE: Edge earn rules for extended are intentionally omitted per your earlier constraint.
    edgeEarned: null,
  };
}
