import test from "node:test";
import assert from "node:assert/strict";

import { ECM_JAMMING_STATUS_ID, resolveEcmSpikeExecution } from "../src/modules/roll/ew-execution.js";
import { getAcquireCeiling, getTrackingPenalty } from "../src/modules/mwd/machine-ew-state.js";

function createTarget({ type = "battlemech", jammed = false, throws = false } = {}) {
  const statuses = new Set(jammed ? [ECM_JAMMING_STATUS_ID] : []);
  const calls = [];
  return {
    actor: {
      name: "Target Mech",
      type,
      statuses,
      items: [],
      system: {},
      async toggleStatusEffect(statusId, options) {
        calls.push({ statusId, options });
        if (throws) throw new Error("User lacks permission");
        if (options?.active) statuses.add(statusId);
      },
    },
    calls,
  };
}

function withCanvas(target, fn) {
  const token = { id: "target-token", actor: target.actor, document: { uuid: "Scene.s.Token.target" } };
  globalThis.canvas = { tokens: { get: id => (id === token.id ? token : null), placeables: [token] } };
  const hookCalls = [];
  globalThis.Hooks = { callAll: (name, data) => hookCalls.push({ name, data }) };
  return Promise.resolve(fn({ hookCalls })).finally(() => {
    delete globalThis.canvas;
    delete globalThis.Hooks;
  });
}

const spikePayload = { machineActionKey: "ecmSpike", targetTokenId: "target-token" };
const passed = { successes: 3 };
const ctx = { intent: "skill", difficulty: { dn: 2 } };

test("ECM Spike ignores other EW actions", async () => {
  assert.equal(await resolveEcmSpikeExecution({ payload: { machineActionKey: "breakLock" }, ctx, outcomeModel: passed }), null);
});

test("successful ECM Spike jams the target and feeds targeting calculations", async () => {
  const target = createTarget();
  await withCanvas(target, async ({ hookCalls }) => {
    const before = getTrackingPenalty(target.actor, null);
    const result = await resolveEcmSpikeExecution({ attacker: {}, payload: spikePayload, ctx, outcomeModel: passed });

    assert.equal(result.ok, true);
    assert.equal(result.alreadyJammed, false);
    assert.deepEqual(target.calls, [{ statusId: "ecmJamming", options: { active: true, overlay: false } }]);
    assert.equal(target.actor.statuses.has("ecmJamming"), true);
    assert.equal(getTrackingPenalty(target.actor, null) - before, 2);
    assert.equal(getAcquireCeiling(target.actor), "track");
    assert.equal(hookCalls[0]?.name, "mwd.afterEcmSpike");
  });
});

test("failed ECM Spike applies nothing", async () => {
  const target = createTarget();
  await withCanvas(target, async () => {
    const result = await resolveEcmSpikeExecution({ payload: spikePayload, ctx, outcomeModel: { successes: 1 } });
    assert.equal(result.ok, false);
    assert.equal(target.calls.length, 0);
  });
});

test("repeat ECM Spike on a jammed target does not re-toggle the status", async () => {
  const target = createTarget({ jammed: true });
  await withCanvas(target, async () => {
    const result = await resolveEcmSpikeExecution({ payload: spikePayload, ctx, outcomeModel: passed });
    assert.equal(result.ok, true);
    assert.equal(result.alreadyJammed, true);
    assert.equal(target.calls.length, 0);
  });
});

test("ECM Spike reports invalid targets and failed writes instead of throwing", async () => {
  const personal = createTarget({ type: "character" });
  await withCanvas(personal, async () => {
    const result = await resolveEcmSpikeExecution({ payload: spikePayload, ctx, outcomeModel: passed });
    assert.match(result.reason, /not a machine/);
    assert.equal(personal.calls.length, 0);
  });

  const locked = createTarget({ throws: true });
  await withCanvas(locked, async () => {
    const result = await resolveEcmSpikeExecution({ payload: spikePayload, ctx, outcomeModel: passed });
    assert.equal(result.ok, false);
    assert.equal(result.persistenceFailed, true);
    assert.match(result.reason, /GM must apply it/);
  });

  await withCanvas(createTarget(), async () => {
    const result = await resolveEcmSpikeExecution({ payload: { machineActionKey: "ecmSpike", targetTokenId: "missing" }, ctx, outcomeModel: passed });
    assert.equal(result.persistenceFailed, true);
  });
});
