import test from "node:test";
import assert from "node:assert/strict";

import { buildClusteringProfile, rollClusteringDamage } from "../src/modules/mwd/machine-clustering.js";
import { getMachineFireControlProfile } from "../src/modules/mwd/machine-fire-control.js";

test("clustering profiles apply upgrade modifiers only to clustered attacks", () => {
  const clustered = buildClusteringProfile({
    clusteringDice: 4,
    clusteringTargetNumber: 5,
    diceModifier: 1,
    targetNumberModifier: -1,
  });
  const nonClustered = buildClusteringProfile({
    clusteringDice: 0,
    clusteringTargetNumber: 5,
    diceModifier: 3,
    targetNumberModifier: -2,
  });

  assert.deepEqual(clustered, {
    active: true,
    baseDice: 4,
    diceModifier: 1,
    dice: 5,
    baseTargetNumber: 5,
    targetNumberModifier: -1,
    targetNumber: 4,
  });
  assert.deepEqual(nonClustered, {
    active: false,
    baseDice: 0,
    diceModifier: 0,
    dice: 0,
    baseTargetNumber: 5,
    targetNumberModifier: 0,
    targetNumber: 5,
  });
});

test("clustering damage rolls count mutable-target successes", async () => {
  class FakeRoll {
    constructor(formula) {
      this.formula = formula;
      this.dice = [{
        results: [
          { result: 6, success: true },
          { result: 4, success: false },
          { result: 5, success: true },
          { result: 2, success: false },
        ],
      }];
    }

    async evaluate() {
      return this;
    }

    toJSON() {
      return { formula: this.formula };
    }
  }

  const result = await rollClusteringDamage({
    clusteringDice: 4,
    clusteringTargetNumber: 5,
    RollClass: FakeRoll,
  });

  assert.equal(result.rolled, true);
  assert.equal(result.formula, "4d6cs>=5");
  assert.equal(result.hits, 2);
  assert.deepEqual(result.results, [
    { index: 0, result: 6, success: true },
    { index: 1, result: 4, success: false },
    { index: 2, result: 5, success: true },
    { index: 3, result: 2, success: false },
  ]);
});

test("installed asset modules aggregate clustering fire-control modifiers", () => {
  const actor = {
    type: "battlemech",
    items: [
      {
        id: "module-artemis",
        name: "Artemis IV",
        type: "assetModule",
        canonicalType: "assetModule",
        system: {
          targeting: {
            clustering: {
              targetNumberModifier: -1,
              diceModifier: 0,
            },
          },
        },
      },
      {
        id: "module-guidance",
        name: "Guidance Package",
        type: "assetModule",
        canonicalType: "assetModule",
        system: {
          targeting: {
            clustering: {
              targetNumberModifier: 0,
              diceModifier: 1,
            },
          },
        },
      },
    ],
  };

  const profile = getMachineFireControlProfile(actor);

  assert.equal(profile.active, true);
  assert.equal(profile.diceModifier, 1);
  assert.equal(profile.targetNumberModifier, -1);
  assert.deepEqual(profile.sourceIds, ["module-artemis", "module-guidance"]);
  assert.deepEqual(profile.sourceNames, ["Artemis IV", "Guidance Package"]);
});
