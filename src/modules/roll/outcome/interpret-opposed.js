// src/modules/roll/outcome/interpret-opposed.js
// Purpose: Defines function `interpretOpposedOutcome`.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { toInt, getEdgePoolKey, isCriticalFailureOnes } from "./_outcome-helpers.js";

/**
 * Opposed roll:
 * - requires both results
 * - determine winner:
 *   - if ctx.opposed.net === true: netHits = atk - def; passed if netHits > 0 (ties policy optional)
 *   - else: passed is still based on comparison, but we don't expose netHits unless requested
 *
 * Edge earn: netHits > 4 (critical success) or 0 attacker hits with half+ dice as 1s (critical failure).
 * Only applies when no edge was spent on the roll (enforced by caller).
 */
export function interpretOpposedOutcome(ctx, primary, opposition) {
  const atk = toInt(primary?.successes, 0);
  const def = toInt(opposition?.successes, 0);

  const netEnabled = Boolean(ctx?.opposed?.net);
  const ties = String(ctx?.opposed?.dnTies ?? "stalemate"); // "stalemate"|"attackerWins"|"defenderWins"

  let netHits = null;
  let passed = false;

  if (netEnabled) {
    netHits = atk - def;

    if (netHits > 0) passed = true;
    else if (netHits < 0) passed = false;
    else {
      // tie
      if (ties === "attackerWins") passed = true;
      else if (ties === "defenderWins") passed = false;
      else passed = false; // stalemate means attacker did not “pass”
    }
  } else {
    // Pure opposed: winner/loser only
    if (atk > def) passed = true;
    else if (atk < def) passed = false;
    else {
      if (ties === "attackerWins") passed = true;
      else if (ties === "defenderWins") passed = false;
      else passed = false;
    }
  }

  const criticalFailure = isCriticalFailureOnes(atk, primary?.raw);

  const pool = getEdgePoolKey(ctx);
  let edgeEarned = null;
  if (netEnabled && typeof netHits === "number" && netHits > 4) {
    edgeEarned = { amount: 1, pool, reason: "criticalSuccess", details: { netHits } };
  } else if (criticalFailure) {
    edgeEarned = { amount: 1, pool, reason: "criticalFailure", details: {} };
  }

  return {
    rollType: "opposed",
    passed,
    successes: atk,
    criticalFailure,
    opposed: {
      attacker: atk,
      defender: def,
      netEnabled,
      netHits: netEnabled ? netHits : undefined,
      tiePolicy: ties,
    },
    edgeEarned,
  };
}
