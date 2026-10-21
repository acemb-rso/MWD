import test from "node:test";
import assert from "node:assert/strict";

import { isEligibleMachineOperator, resolveMachineOperator } from "../src/modules/mwd/machine-operator.js";

test("characters and NPCs may pilot machines; machines may not", () => {
  assert.equal(isEligibleMachineOperator({ type: "character" }), true);
  assert.equal(isEligibleMachineOperator({ type: "npc" }), true);
  assert.equal(isEligibleMachineOperator({ type: "battlemech" }), false);
  assert.equal(isEligibleMachineOperator({ type: "vehicle" }), false);
  assert.equal(isEligibleMachineOperator(null), false);
});

test("an NPC linked as pilot resolves as the machine's operator", async () => {
  const npc = { uuid: "Actor.enemy-pilot", type: "npc", name: "Enemy MechWarrior" };
  globalThis.fromUuid = async uuid => (uuid === npc.uuid ? npc : null);
  try {
    const mech = { type: "battlemech", system: { pilot: { uuid: npc.uuid } } };
    const operator = await resolveMachineOperator({ machineActor: mech });
    assert.equal(operator.actor, npc);
    assert.equal(operator.source, "pilot");
  } finally {
    delete globalThis.fromUuid;
  }
});
