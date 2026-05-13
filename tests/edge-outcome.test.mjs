import test from "node:test";
import assert from "node:assert/strict";

import { interpretSimpleOutcome } from "../src/modules/roll/outcome/interpret-simple.js";

function rawDice(results = []) {
  return {
    terms: [{
      results: results.map(result => ({ result, active: true })),
    }],
  };
}

test("critical success requires margin greater than 4", () => {
  const ctx = {
    rollType: "simple",
    difficulty: { dn: 1 },
    edge: { pool: "physical.grit" },
  };

  const marginFour = interpretSimpleOutcome(ctx, {
    successes: 5,
    raw: rawDice([5, 5, 5, 5, 5]),
  });
  assert.equal(marginFour.criticalSuccess, false);
  assert.equal(marginFour.edgeEarned, null);

  const marginFive = interpretSimpleOutcome(ctx, {
    successes: 6,
    raw: rawDice([5, 5, 5, 5, 5, 5]),
  });
  assert.equal(marginFive.criticalSuccess, true);
  assert.equal(marginFive.edgeEarned?.amount, 1);
  assert.equal(marginFive.edgeEarned?.reason, "criticalSuccess");
});

test("critical failure still awards edge from the outcome model", () => {
  const outcome = interpretSimpleOutcome({
    rollType: "simple",
    difficulty: { dn: 1 },
    edge: { pool: "physical.grit" },
  }, {
    successes: 0,
    raw: rawDice([1, 1, 2, 3]),
  });

  assert.equal(outcome.criticalFailure, true);
  assert.equal(outcome.edgeEarned?.amount, 1);
  assert.equal(outcome.edgeEarned?.reason, "criticalFailure");
});
