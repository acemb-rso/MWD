import test from "node:test";
import assert from "node:assert/strict";

import { resolveSelfStatusActionExecution, resolveTargetStatusActionExecution } from "../src/modules/roll/ew-execution.js";
import { getMachineActionDefinition } from "../src/modules/mwd/machine-action-catalog.js";
import { getAcquireCeiling, getTrackingPenalty } from "../src/modules/mwd/machine-ew-state.js";
import { MachineStateEffectsProvider } from "../src/modules/modifiers/providers/machine-state-effects.js";

function createMachine({ name = "Target Mech", type = "battlemech", statuses = [], throws = false, isOwner = true } = {}) {
  const calls = [];
  const actor = {
    name,
    type,
    isOwner,
    statuses: new Set(statuses),
    items: [],
    system: { mwd: { crits: [], locations: {} } },
    async toggleStatusEffect(statusId, options) {
      calls.push({ statusId, options });
      if (throws) throw new Error("User lacks permission");
      if (options?.active) actor.statuses.add(statusId);
      else actor.statuses.delete(statusId);
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
    assert.match(result.reason, /could not be applied to Target Mech: User lacks permission/);
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

test("a target the roller does not own is jammed through the GM machine-action relay", async () => {
  const target = createMachine({ isOwner: false });
  const spiker = createMachine({ name: "Spiker" }).actor;
  const relayed = [];
  await withTargetToken(target.actor, async () => {
    globalThis.game = { mwd: { machineActions: { execute: async (actor, request) => { relayed.push({ actor, request }); return { ok: true }; } } } };
    try {
      const result = await resolveTargetStatusActionExecution({
        attacker: spiker,
        payload: { ...spike, operatorActorUuid: "Actor.pilot" },
        ctx,
        outcomeModel: passed,
      });
      assert.equal(result.ok, true);
      assert.equal(target.calls.length, 0);
      assert.equal(relayed[0].actor, spiker);
      assert.deepEqual(relayed[0].request, {
        kind: "applyTargetStatus",
        actionId: "ecmSpike",
        targetTokenUuid: "Scene.s.Token.target",
        operatorActorUuid: "Actor.pilot",
      });

      globalThis.game.mwd.machineActions.execute = async () => ({ ok: false, reason: "No active GM responded to the machine action request." });
      const unanswered = await resolveTargetStatusActionExecution({ attacker: spiker, payload: spike, ctx, outcomeModel: passed });
      assert.equal(unanswered.persistenceFailed, true);
      assert.match(unanswered.reason, /No active GM responded/);
    } finally {
      delete globalThis.game;
    }
  });
});

test("a successful EPM Filter clears ECM Jamming from the acting machine", async () => {
  const epm = { machineActionKey: "epmFilter" };
  const jammed = createMachine({ statuses: ["ecmJamming"] });

  const failed = await resolveSelfStatusActionExecution({ actor: jammed.actor, payload: epm, ctx, outcomeModel: { successes: 1 } });
  assert.equal(failed.ok, false);
  assert.equal(jammed.actor.statuses.has("ecmJamming"), true);

  const cleared = await resolveSelfStatusActionExecution({ actor: jammed.actor, payload: epm, ctx, outcomeModel: passed });
  assert.equal(cleared.ok, true);
  assert.deepEqual(cleared.cleared, [{ statusId: "ecmJamming", label: "ECM Jamming" }]);
  assert.equal(jammed.actor.statuses.has("ecmJamming"), false);

  const clean = createMachine();
  const nothing = await resolveSelfStatusActionExecution({ actor: clean.actor, payload: epm, ctx, outcomeModel: passed });
  assert.deepEqual(nothing.cleared, []);

  assert.equal(await resolveSelfStatusActionExecution({ actor: clean.actor, payload: spike, ctx, outcomeModel: passed }), null);
});

test("the GM relay handler applies only the catalog-declared statuses", async () => {
  const { MachineActions } = await import("../src/modules/mwd/machine-quick-actions.js");
  const target = createMachine({ isOwner: false });
  const spiker = createMachine({ name: "Spiker" }).actor;
  globalThis.fromUuid = async uuid => (uuid === "Scene.s.Token.target" ? { actor: target.actor } : null);
  globalThis.game = { user: { isGM: true } };
  try {
    const result = await MachineActions.execute(spiker, { kind: "applyTargetStatus", actionId: "ecmSpike", targetTokenUuid: "Scene.s.Token.target", statusId: "shutdown" });
    assert.equal(result.ok, true);
    assert.deepEqual([...target.actor.statuses], ["ecmJamming"]);

    const refused = await MachineActions.execute(spiker, { kind: "applyTargetStatus", actionId: "breakLock", targetTokenUuid: "Scene.s.Token.target" });
    assert.equal(refused.ok, false);
  } finally {
    delete globalThis.fromUuid;
    delete globalThis.game;
  }
});

test("an Active Probe that sees through an ECM cloud also lifts its tracking penalty", () => {
  const { actor: target } = createMachine({ statuses: ["ecmShrouded"] });
  const { actor: plain } = createMachine({ name: "Plain Mech" });
  const { actor: probing } = createMachine({ name: "Probe Mech" });
  probing.items = [{
    id: "probe",
    name: "Active Probe",
    type: "assetModule",
    canonicalType: "assetModule",
    system: {
      activation: { mode: "toggle", active: true },
      effects: [{ id: "ignore-shroud", timing: "active", requires: { actionIds: ["acquireTarget"] }, modifies: { bypassStatuses: ["ecmShrouded"] } }],
    },
  }];
  assert.equal(getTrackingPenalty(target, null, { attackerActor: plain }), 1);
  assert.equal(getTrackingPenalty(target, null, { attackerActor: probing }), 0);
  assert.equal(getAcquireCeiling(target, { attackerActor: probing }), "lock");
});

test("TAG and NARC apply their designation only on a successful roll", async () => {
  for (const [actionKey, statusId] of [["tagTarget", "tagged"], ["narcTarget", "narced"]]) {
    assert.deepEqual(getMachineActionDefinition(actionKey).appliesToTarget, [statusId]);
    const { actor: attacker } = createMachine({ name: "Spotter" });
    const { actor: target } = createMachine();
    await withTargetToken(target, async () => {
      const payload = { machineActionKey: actionKey, targetTokenId: "target-token" };
      const failed = await resolveTargetStatusActionExecution({ attacker, payload, ctx: { difficulty: { dn: 1 } }, outcomeModel: { successes: 0 } });
      assert.equal(failed.ok, false);
      assert.equal(target.statuses.has(statusId), false);
      await resolveTargetStatusActionExecution({ attacker, payload, ctx: { difficulty: { dn: 1 } }, outcomeModel: { successes: 1 } });
      assert.equal(target.statuses.has(statusId), true);
    });
  }
});
