import test from "node:test";
import assert from "node:assert/strict";

test("machine action dispatcher routes piloting through the roll boundary", async () => {
  const executed = [];
  globalThis.ui = { notifications: { error() {}, warn() {}, info() {} } };
  globalThis.game = {
    mwd: {
      roll: {
        async execute(request) {
          executed.push(request);
          return { id: "roll-1" };
        },
      },
    },
    system: { mwd: {} },
    user: { isGM: true },
  };

  const { MachineActions } = await import("../src/modules/mwd/machine-quick-actions.js");
  const actor = {
    type: "battlemech",
    name: "Boundary Tester",
  };

  const result = await MachineActions.execute(actor, {
    kind: "piloting",
    operatorActorUuid: "Actor.operator",
  });

  assert.equal(result.ok, true);
  assert.equal(executed.length, 1);
  assert.equal(executed[0].actor, actor);
  assert.equal(executed[0].payload.intent, "skill");
  assert.equal(executed[0].payload.key, "piloting");
  assert.equal(executed[0].payload.operatorActorUuid, "Actor.operator");

  delete globalThis.game;
  delete globalThis.ui;
});

test("machine action dispatcher throws for programmer errors", async () => {
  const { MachineActions } = await import("../src/modules/mwd/machine-quick-actions.js");
  await assert.rejects(
    () => MachineActions.execute({ type: "battlemech" }, { kind: "definitely-not-a-kind" }),
    /Unknown machine action kind/
  );
  await assert.rejects(
    () => MachineActions.execute(null, { kind: "piloting" }),
    /requires actor/
  );
});
