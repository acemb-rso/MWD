import test from "node:test";
import assert from "node:assert/strict";

test("new round initiative starts on the first sorted combatant", async () => {
  globalThis.Number.isNumeric ??= value => Number.isFinite(Number(value));
  const originalCombat = globalThis.Combat;
  const calls = [];

  try {
    globalThis.Combat = class {
      constructor() {
        this.turn = 2;
      }

      async resetAll() {
        calls.push("resetAll");
      }

      async nextRound() {
        calls.push("super.nextRound");
        this.round = Number(this.round ?? 1) + 1;
        return this;
      }

      async rollAll() {
        calls.push("rollAll");
        this.combatants = [
          { id: "fast", initiative: 12 },
          { id: "middle", initiative: 8 },
          { id: "slow", initiative: 3 },
        ];
      }

      async update(data) {
        calls.push(["update", data]);
        if (Object.prototype.hasOwnProperty.call(data, "turn")) this.turn = data.turn;
        return this;
      }
    };

    const { MWDCombat } = await import("../src/modules/combat/mwd-combat.js");
    const combat = new MWDCombat();

    await combat.nextRound();

    assert.deepEqual(calls, [
      "resetAll",
      "super.nextRound",
      "rollAll",
      ["update", { turn: 0 }],
    ]);
    assert.equal(combat.turn, 0);
    assert.equal(combat.combatants[0].id, "fast");
  } finally {
    if (originalCombat === undefined) delete globalThis.Combat;
    else globalThis.Combat = originalCombat;
  }
});
