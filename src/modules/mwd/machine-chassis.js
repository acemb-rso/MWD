// src/modules/mwd/machine-chassis.js
// Purpose: Shared chassis-centered physical helper formulas.
// Workflow: collision, knockdown, and forced-movement resolvers -> chassis math
// helpers -> degradation/damage workflows receive already-derived values.

import { toNumber } from "../utils/coercion.js";

export function resolveMachineKnockdownDn({ chassis = 0, forceModifier = 0 } = {}) {
  return Math.max(0, toNumber(chassis, 0) + toNumber(forceModifier, 0));
}

export function resolveMachineKnockdownPool({ handling = 0, piloting = 0 } = {}) {
  return Math.max(0, toNumber(handling, 0) + toNumber(piloting, 0));
}

export function resolveMachineForcedMovementResistance({ chassis = 0 } = {}) {
  return Math.max(0, toNumber(chassis, 0));
}

export function resolveMachineCrashMitigation({ chassis = 0, handling = 0 } = {}) {
  return Math.max(0, toNumber(chassis, 0) + toNumber(handling, 0));
}

export function resolveMachineCollisionValue({ chassis = 0, bonus = 0 } = {}) {
  return Math.max(0, toNumber(chassis, 0) + toNumber(bonus, 0));
}
