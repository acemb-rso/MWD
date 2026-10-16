import test from "node:test";
import assert from "node:assert/strict";

import { resolveTargetStatusActionExecution } from "../src/modules/roll/ew-execution.js";
import { getMachineActionDefinition } from "../src/modules/mwd/machine-action-catalog.js";
import { getAcquireCeiling, getTrackingPenalty } from "../src/modules/mwd/machine-ew-state.js";
import { MachineStateEffectsProvider } from "../src/modules/modifiers/providers/machine-state-effects.js";

function createMachine({ name = "Target Mech", type = "battlemech", statuses = [], throws = false } = {}) {
  const calls = [];
  const actor = {
    name,
    type,
    statuses: new Set(statuses),
    items: [],
    system: { mwd: { crits: [], locations: {} } },
    async toggleStatusEffect(statusId, options) {
      calls.push({ statusId, options });
      if (throws) throw new Error("User lacks permission");
      if (options?.active) actor.statuses.add(statusId);
    },
  };
  return { actor, calls };
}

async function withTargetToken(actor, fn) {
  const token = { id: "target-token", actor, document: { uuid: "Scene.s.Token.target" } };
  globalThis.canvas = { tokens: { get: id => (id === token.id ? token : null), placeables: [token] } };
  const hookCalls = [];
  globalThis.Hooks = { callAll: (name, data) => hookCalls.push({ name, data }) };
  try {
    return await fn({ hookCalls });
  } finally {
    delete globalThis.canvas;
    delete globalThis.Hooks;
  }
}

const spike = { machineActionKey: "ecmSpike", targetTokenId: "target-token" };
const ctx = { intent: "skill", difficulty: { dn: 2 } };
const passed = { successes: 3 };

test("ECM Spike declares its target status and defense selector in the action catalog", () => {
  const action = getMachineActionDefinition("ecmSpike");
  assert.deepEqual([...action.appliesToTarget], ["ecmJamming"]);
  assert.equal(action.targetDefenseDice, "ecmSpikeDefenseDice");
  assert.deepEqual([...getMachineActionDefinition("breakLock").appliesToTarget], []);
});

test("actions without appliesToTarget are ignored", async () => {
  assert.equal(await resolveTargetStatusActionExecution({ payload: { machineActionKey: "breakLock" }, ctx, outcomeModel: passed }), null);
  assert.equal(await resolveTargetStatusActionExecution({ payload: {}, ctx, outcomeModel: passed }), null);
});

test("a successful ECM Spike jams the target and names its remedy", async () => {
  const target = createMachine();
  await withTargetToken(target.actor, async ({ hookCalls }) => {
    const result = await resolveTargetStatusActionExecution({ attacker: {}, payload: spike, ctx, outcomeModel: passed });
    assert.equal(result.ok, true);
    assert.deepEqual(target.calls, [{ statusId: "ecmJamming", options: { active: true, overlay: false } }]);
    assert.equal(result.statuses[0].label, "ECM Jamming");
    assert.equal(result.statuses[0].alreadyActive, false);
    assert.ok(result.statuses[0].clearedBy.some(label => /EPM/.test(label)));
    assert.equal(hookCalls[0]?.name, "mwd.afterTargetStatusAction");
  });
});

test("failed rolls, repeat spikes, invalid targets, and failed writes apply nothing extra", async () => {
  const fresh = createMachine();
  await withTargetToken(fresh.actor, async () => {
    const result = await resolveTargetStatusActionExecution({ payload: spike, ctx, outcomeModel: { successes: 1 } });
    assert.equal(result.ok, false);
    assert.equal(fresh.calls.length, 0);
  });

  const jammed = createMachine({ statuses: ["ecmJamming"] });
  await withTargetToken(jammed.actor, async () => {
    const result = await resolveTargetStatusActionExecution({ payload: spike, ctx, outcomeModel: passed });
    assert.equal(result.statuses[0].alreadyActive, true);
    assert.equal(jammed.calls.length, 0);
  });

  const pilot = createMachine({ type: "character" });
  await withTargetToken(pilot.actor, async () => {
    const result = await resolveTargetStatusActionExecution({ payload: spike, ctx, outcomeModel: passed });
    assert.match(result.reason, /not a machine/);
  });

  const locked = createMachine({ throws: true });
  await withTargetToken(locked.actor, async () => {
    const result = await resolveTargetStatusActionExecution({ payload: spike, ctx, outcomeModel: passed });
    assert.equal(result.persistenceFailed, true);
    assert.match(result.reason, /GM must apply it/);
  });
});

test("ECM Jamming hampers the jammed machine's own attacks, not attacks against it", () => {
  const clean = createMachine().actor;
  const jammed = createMachine({ statuses: ["ecmJamming"] }).actor;
  const protectedByEpm = createMachine({ statuses: ["ecmJamming", "epmBoosted"] }).actor;

  assert.equal(getTrackingPenalty(clean, null, { attackerActor: jammed }), 2);
  assert.equal(getTrackingPenalty(jammed, null, { attackerActor: clean }), 0);
  assert.equal(getTrackingPenalty(clean, null, { attackerActor: protectedByEpm }), 0);
  assert.equal(getAcquireCeiling(clean, { attackerActor: jammed }), "track");
});

test("a target's EPM Boosted removes 2 dice from an incoming ECM Spike", async () => {
  const provider = new MachineStateEffectsProvider();
  const spiker = createMachine({ name: "Spiker" }).actor;
  const payload = { intent: "skill", key: "systemOps", ...spike };

  const boosted = createMachine({ statuses: ["epmBoosted"] }).actor;
  await withTargetToken(boosted, async () => {
    const mods = provider.collect({ actor: spiker, resolved: { intent: "skill" }, payload });
    const defense = mods.find(mod => mod.id === "machineState.targetDefense.ecmSpike");
    assert.equal(defense?.value, -2);
  });

  const plain = createMachine().actor;
  await withTargetToken(plain, async () => {
    const mods = provider.collect({ actor: spiker, resolved: { intent: "skill" }, payload });
    assert.equal(mods.some(mod => mod.id === "machineState.targetDefense.ecmSpike"), false);
  });
});
