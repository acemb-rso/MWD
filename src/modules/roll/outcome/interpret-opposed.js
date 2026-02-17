// src/modules/roll/outcome/interpret-opposed.js

import { toInt, computeEdgeEarned, getEdgeEarnConfig, getEdgePoolKey } from "./_outcome-helpers.js";

/**
 * Opposed roll:
 * - requires both results
 * - determine winner:
 *   - if ctx.opposed.net === true: netHits = atk - def; passed if netHits > 0 (ties policy optional)
 *   - else: passed is still based on comparison, but we don't expose netHits unless requested
 *
 * Edge earn rule:
 * - if ctx.opposed.net === true and edge earn enabled:
 *   - earn Edge if netHits >= rate (default 4), capped (default 1)
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

  const earnCfg = getEdgeEarnConfig(ctx);
  const maxPerRoll = earnCfg.maxPerRoll ?? 1;

  const edge = (earnCfg.enabled && netEnabled && typeof netHits === "number" && netHits >= earnCfg.rate)
    ? (() => {
        const { amount, rate } = computeEdgeEarned(netHits, { rate: earnCfg.rate, maxPerRoll });
        const pool = getEdgePoolKey(ctx);
        return amount > 0 ? { amount, pool, reason: "net4", details: { netHits, rate } } : null;
      })()
    : null;

  return {
    rollType: "opposed",
    passed,
    successes: atk,
    opposed: {
      attacker: atk,
      defender: def,
      netEnabled,
      netHits: netEnabled ? netHits : undefined,
      tiePolicy: ties,
    },
    edgeEarned: edge,
  };
}
