// src/modules/mwd/machine-clustering.js
// Purpose: Shared helpers for machine-scale clustering dice profiles and rolls.
// How it fits: Keeps clustering math consistent across weapon prep, upgrade
// aggregation, attack resolution, and tests.

function toInteger(value, fallback = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.trunc(numeric);
}

export function normalizeClusteringTargetNumber(value, fallback = 5) {
  return toInteger(value, fallback);
}

export function buildClusteringProfile({
  clusteringDice = 0,
  clusteringTargetNumber = 5,
  diceModifier = 0,
  targetNumberModifier = 0,
} = {}) {
  const baseDice = Math.max(0, toInteger(clusteringDice, 0));
  const baseTargetNumber = normalizeClusteringTargetNumber(clusteringTargetNumber, 5);
  const activeBaseProfile = baseDice > 0;
  const appliedDiceModifier = activeBaseProfile ? toInteger(diceModifier, 0) : 0;
  const dice = Math.max(0, baseDice + appliedDiceModifier);
  const active = dice > 0;
  const appliedTargetNumberModifier = active ? toInteger(targetNumberModifier, 0) : 0;

  return {
    active,
    baseDice,
    diceModifier: appliedDiceModifier,
    dice,
    baseTargetNumber,
    targetNumberModifier: appliedTargetNumberModifier,
    targetNumber: baseTargetNumber + appliedTargetNumberModifier,
  };
}

export async function rollClusteringDamage({
  clusteringDice = 0,
  clusteringTargetNumber = 5,
  RollClass = globalThis.Roll,
} = {}) {
  const dice = Math.max(0, toInteger(clusteringDice, 0));
  const targetNumber = normalizeClusteringTargetNumber(clusteringTargetNumber, 5);
  const formula = dice > 0 ? `${dice}d6cs>=${targetNumber}` : "";

  if (!dice || typeof RollClass !== "function") {
    return {
      rolled: false,
      dice,
      targetNumber,
      hits: 0,
      formula,
      results: [],
      roll: null,
    };
  }

  const roll = await new RollClass(formula).evaluate();
  const die = Array.isArray(roll?.dice) ? roll.dice[0] ?? null : null;
  const results = Array.isArray(die?.results)
    ? die.results.map((entry, index) => ({
      index,
      result: Number(entry?.result ?? 0) || 0,
      success: Boolean(entry?.success),
    }))
    : [];

  return {
    rolled: true,
    dice,
    targetNumber,
    hits: results.filter(entry => entry.success).length,
    formula,
    results,
    roll: typeof roll?.toJSON === "function" ? roll.toJSON() : null,
  };
}
