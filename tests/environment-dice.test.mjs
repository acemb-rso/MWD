import test from "node:test";
import assert from "node:assert/strict";

import { combineEnvironmentDice, ENVIRONMENT_DICE_PENALTY_CAP } from "../src/modules/terrain/environment-dice.js";

test("the strongest penalty per function applies; different functions stack", () => {
  assert.equal(combineEnvironmentDice([]).value, 0);
  assert.equal(combineEnvironmentDice([
    { function: "traction", value: -1 },
    { function: "traction", value: -1 },
  ]).value, -1);
  assert.equal(combineEnvironmentDice([
    { function: "traction", value: -1 },
    { function: "visibility", value: -1 },
  ]).value, -2);
});

test("a bonus applies once per function and offsets that function's penalty", () => {
  const result = combineEnvironmentDice([
    { function: "traction", value: 1 },
    { function: "traction", value: 1 },
    { function: "traction", value: -1 },
  ]);
  assert.equal(result.value, 0);
  assert.deepEqual(result.functions.traction, { penalty: -1, bonus: 1, value: 0 });
});

test("the combined routine penalty is capped", () => {
  assert.equal(ENVIRONMENT_DICE_PENALTY_CAP, -2);
  assert.equal(combineEnvironmentDice([
    { function: "traction", value: -1 },
    { function: "visibility", value: -2 },
    { function: "wind", value: -1 },
  ]).value, -2);
  // Unnamed functions share one "general" slot.
  assert.equal(combineEnvironmentDice([{ value: -1 }, { value: -1 }]).value, -1);
});
