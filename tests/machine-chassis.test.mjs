import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveMachineCollisionValue,
  resolveMachineCrashMitigation,
  resolveMachineForcedMovementResistance,
  resolveMachineKnockdownDn,
  resolveMachineKnockdownPool,
} from "../src/modules/mwd/machine-chassis.js";

test("machine chassis helpers return the expected shared physical formulas", () => {
  assert.equal(resolveMachineKnockdownDn({ chassis: 3, forceModifier: 2 }), 5);
  assert.equal(resolveMachineKnockdownPool({ handling: 2, piloting: 3 }), 5);
  assert.equal(resolveMachineForcedMovementResistance({ chassis: 4 }), 4);
  assert.equal(resolveMachineCrashMitigation({ chassis: 3, handling: 2 }), 5);
  assert.equal(resolveMachineCollisionValue({ chassis: 3, bonus: 2 }), 5);
});
