// src/modules/mwd/heat-effects.js
// Purpose: Heat band level computation and penalty derivation for BattleMechs.
// How it fits: Called by the sheet context builder and by the end-of-activation
//              heat resolution handler to compute active penalties and danger checks.

import { movementPenaltyStepsToMeters } from "./machine-movement.js";

/**
 * Computes how many discrete levels deep into each heat band the mech currently is.
 *
 * Example thresholds: { runningHot: 3, overheated: 5, shutdown: 7 }
 *   heat=0 → { levelsInHot: 0, levelsInOverheat: 0, levelsInDanger: 0 }
 *   heat=3 → { levelsInHot: 1, levelsInOverheat: 0, levelsInDanger: 0 }
 *   heat=4 → { levelsInHot: 2, levelsInOverheat: 0, levelsInDanger: 0 }
 *   heat=5 → { levelsInHot: 2, levelsInOverheat: 1, levelsInDanger: 0 }
 *   heat=7 → { levelsInHot: 2, levelsInOverheat: 2, levelsInDanger: 1 }
 */
export function computeHeatBandLevels(current, thresholds) {
  const hot = Math.max(0, thresholds.runningHot ?? thresholds.hot ?? 0);
  const overheat = Math.max(0, thresholds.overheated ?? thresholds.overheat ?? 0);
  const danger = Math.max(0, thresholds.shutdown ?? thresholds.danger ?? 0);
  const value = Math.max(0, current);

  if (hot === 0 || overheat === 0 || danger === 0) {
    return { levelsInHot: 0, levelsInOverheat: 0, levelsInDanger: 0 };
  }

  // Levels within the Hot band — capped at the top of the band.
  const levelsInHot = Math.max(0, Math.min(value, overheat - 1) - (hot - 1));

  // Levels within the Overheat band — capped at the top of the band.
  const levelsInOverheat = Math.max(0, Math.min(value, danger - 1) - (overheat - 1));

  // Levels into the Danger band — unbounded.
  const levelsInDanger = Math.max(0, value - (danger - 1));

  return { levelsInHot, levelsInOverheat, levelsInDanger };
}

/**
 * Derives the active mechanical penalties from the current heat level.
 *
 * - movementPenalty:   reduction to movement speed in meters (30 per level in Hot)
 * - rangedDicePenalty: reduction to ranged attack dice pool (1 per level in Overheat)
 * - dangerLevel:       how many levels deep into Danger (drives check parameters)
 */
export function computeHeatPenalties(current, thresholds) {
  const { levelsInHot, levelsInOverheat, levelsInDanger } = computeHeatBandLevels(current, thresholds);
  return {
    movementPenalty: movementPenaltyStepsToMeters(levelsInHot),
    rangedDicePenalty: levelsInOverheat,
    dangerLevel: levelsInDanger,
  };
}

/**
 * Applies FILO heat resolution at end of activation.
 *
 * Heat is a stack: newly generated heat is consumed first by dissipation.
 * Any remaining dissipation capacity bleeds into and reduces the accumulated total.
 *
 *   new_heat = max(0, current + generated - dissipation)
 */
export function resolveEndOfActivationHeat(current, generated, dissipation, _max = Infinity) {
  return Math.max(0, current + generated - dissipation);
}

/**
 * Computes the dice pool and DN parameters for Danger zone checks.
 *
 * Shutdown check: DN = dangerLevel, pool = chassis + reliability
 *   - If margin of failure < pilot.systemOps: pilot may override
 *   - Otherwise: immediate shutdown
 *
 * Explosion check (volatile components only): DN = 1, pool = max(1, chassis + reliability - dangerLevel)
 */
export function computeDangerCheckParams(dangerLevel, chassis, reliability) {
  return {
    shutdownDN: dangerLevel,
    shutdownPool: Math.max(0, chassis + reliability),
    explosionDN: 1,
    explosionPool: Math.max(1, chassis + reliability - dangerLevel),
  };
}

/**
 * Returns true if any enabled, non-destroyed location carries the ammoStore tag.
 * Used to determine whether an Explosion check is required at Danger.
 */
export function hasVolatileComponents(locations = {}) {
  return Object.values(locations).some(
    loc => loc?.enabled && !loc?.destroyed && Array.isArray(loc?.tags) && loc.tags.includes("ammoStore")
  );
}
