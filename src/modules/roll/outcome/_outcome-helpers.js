// src/modules/roll/outcome/_outcome-helpers.js

export function toInt(n, fallback = 0) {
  const x = Number(n);
  return Number.isFinite(x) ? Math.trunc(x) : fallback;
}

export function clampInt(n, min = 0, max = Number.POSITIVE_INFINITY) {
  const x = toInt(n, min);
  return Math.max(min, Math.min(max, x));
}

/**
 * DN is a gate (not a cost). DN must be >= 0.
 */
export function getDN(ctx, fallback = 1) {
  const dn = toInt(ctx?.difficulty?.dn, toInt(fallback, 1));
  return Math.max(0, dn);
}

/**
 * Remainder after meeting DN (gate model):
 * remainder = max(0, successes - dn)
 */
export function remainderAfterDN(successes, dn) {
  return Math.max(0, toInt(successes, 0) - toInt(dn, 0));
}

/**
 * Normalize a "convert" request to a legal value:
 * - integer
 * - multiple of `rate` (default 4)
 * - 0..remainder
 */
export function normalizeConvert({ convert, remainder, rate = 4 } = {}) {
  const r = Math.max(0, toInt(remainder, 0));
  const step = Math.max(1, toInt(rate, 4));

  const requested = Math.max(0, toInt(convert, 0));
  const floored = Math.floor(requested / step) * step;
  return Math.min(r, floored);
}

/**
 * Compute Edge earned, with optional per-roll cap.
 *
 * @param {number} convert - legal convert amount (multiple of rate)
 * @param {Object} opts
 * @param {number} opts.rate - successes per Edge (default 4)
 * @param {number} opts.maxPerRoll - cap earned Edge for this roll (default Infinity)
 * @returns {{amount:number, rate:number}}
 */
export function computeEdgeEarned(convert, { rate = 4, maxPerRoll = Number.POSITIVE_INFINITY } = {}) {
  const step = Math.max(1, toInt(rate, 4));
  const raw = Math.floor(Math.max(0, toInt(convert, 0)) / step);
  const cap = Number.isFinite(maxPerRoll) ? Math.max(0, toInt(maxPerRoll, 0)) : Number.POSITIVE_INFINITY;
  return { amount: Math.min(raw, cap), rate: step };
}

/**
 * Pull edge-earn config from ctx.edge.earn.
 * This is intentionally permissive: if earn.enabled isn't true, it returns disabled.
 */
export function getEdgeEarnConfig(ctx) {
  const earn = ctx?.edge?.earn ?? {};
  const enabled = Boolean(earn?.enabled);
  return {
    enabled,
    rate: Math.max(1, toInt(earn?.rate, 4)),
    maxPerRoll: earn?.maxPerRoll ?? Number.POSITIVE_INFINITY,
  };
}

export function getEdgePoolKey(ctx) {
  const pool = ctx?.edge?.pool;
  return pool ? String(pool) : null;
}

/**
 * Attempt to count total dice and number of 1s from a Foundry Roll#toJSON() payload.
 * Defensive walker: different Foundry versions / dice terms can shape results differently.
 *
 * Returns { dice, ones } where:
 * - dice = number of active die results found
 * - ones = count of results equal to 1
 */
export function countDiceAndOnesFromRaw(raw) {
  let dice = 0;
  let ones = 0;

  const walk = (node) => {
    if (!node) return;

    // Dice-term-ish node: { results: [{ result, active }, ...] }
    const results = node?.results;
    if (Array.isArray(results)) {
      for (const r of results) {
        if (r?.active === false) continue;
        const v = Number(r?.result);
        if (!Number.isFinite(v)) continue;
        dice += 1;
        if (v === 1) ones += 1;
      }
    }

    // Common structure: { terms: [...] }
    const terms = node?.terms;
    if (Array.isArray(terms)) {
      for (const t of terms) walk(t);
    }

    // Sometimes nested arrays show up
    if (Array.isArray(node)) {
      for (const x of node) walk(x);
    }
  };

  walk(raw);
  return { dice, ones };
}

/**
 * Critical failure rule helper:
 * - successes must be 0
 * - half-or-more of dice are 1s
 *
 * @param {number} successes
 * @param {any} raw - Roll#toJSON payload
 * @returns {boolean}
 */
export function isCriticalFailureOnes(successes, raw) {
  if (toInt(successes, 0) !== 0) return false;

  const { dice, ones } = countDiceAndOnesFromRaw(raw);
  if (dice <= 0) return false;

  return ones >= Math.ceil(dice / 2);
}

/**
 * Critical Success (margin-based)
 * passed AND margin >= 4
 */
export function isCriticalSuccessMargin(passed, margin, rate = 4) {
  return Boolean(passed && toInt(margin, 0) >= toInt(rate, 4));
}