import test from "node:test";
import assert from "node:assert/strict";

import {
  DAMAGE_SCALE_FACTOR,
  buildDamageScaleConversion,
  scaleDamageForTarget,
} from "../src/modules/mwd/damage-scale.js";

test("damage scale conversion uses ten personal damage per one machine damage", () => {
  assert.equal(DAMAGE_SCALE_FACTOR, 10);

  const machineToPersonal = buildDamageScaleConversion({
    damage: 2,
    sourceScale: "machine",
    targetScale: "personal",
  });
  assert.equal(machineToPersonal.converted, 20);
  assert.equal(machineToPersonal.factor, 10);

  const personalToMachine = buildDamageScaleConversion({
    damage: 12,
    sourceScale: "personal",
    targetScale: "machine",
  });
  assert.equal(personalToMachine.converted, 1);
  assert.equal(personalToMachine.factor, 0.1);

  assert.equal(scaleDamageForTarget(9, { sourceScale: "personal", targetScale: "machine" }), 0);
  assert.equal(scaleDamageForTarget(20, { sourceScale: "personal", targetScale: "machine" }), 2);
});
