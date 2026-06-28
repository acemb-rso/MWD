import test from "node:test";
import assert from "node:assert/strict";

import {
  setSpot,
  clearSpot,
  getValidSpots,
  hasValidIndirectDesignation,
  clearExpiredSpotsForCombatant,
  getEffectiveDetectionState,
} from "../src/modules/mwd/machine-ew-state.js";

globalThis.foundry = {
  ...(globalThis.foundry ?? {}),
  utils: {
    ...(globalThis.foundry?.utils ?? {}),
    deepClone: value => structuredClone(value),
  },
};

const scene = { uuid: "Scene.s1", tokens: [] };

function createActor({ statuses = [] } = {}) {
  const set = new Set(statuses);
  return {
    statuses: set,
    async toggleStatusEffect(id, { active } = {}) {
      if (active) set.add(id);
      else set.delete(id);
      return true;
    },
  };
}

function createTokenDoc({ uuid, disposition = 1, actor = createActor() } = {}) {
  const flags = {};
  const doc = {
    uuid,
    id: uuid.split(".").pop(),
    disposition,
    actor,
    parent: scene,
    getFlag(s, k) { return flags[`${s}.${k}`]; },
    async setFlag(s, k, v) { flags[`${s}.${k}`] = v; return doc; },
    async unsetFlag(s, k) { delete flags[`${s}.${k}`]; return doc; },
  };
  scene.tokens.push(doc);
  return doc;
}

function createCombat({ round = 1, turn = 0, combatants = [], activeId = null } = {}) {
  const map = new Map(combatants.map(c => [c.id, c]));
  return {
    round,
    turn,
    combatant: activeId ? map.get(activeId) : null,
    combatants: { get: id => map.get(id) ?? null, find: fn => combatants.find(fn) },
    getCombatantByToken: tokenId => combatants.find(c => c.tokenId === tokenId) ?? null,
    scene,
  };
}

function reset() {
  scene.tokens = [];
}

test("a successful spot is readable by an allied attacker and applies the visual status", async () => {
  reset();
  const target = createTokenDoc({ uuid: "Scene.s1.Token.t", disposition: -1 });
  const spotter = createTokenDoc({ uuid: "Scene.s1.Token.a", disposition: 1 });
  const ally = createTokenDoc({ uuid: "Scene.s1.Token.b", disposition: 1 });
  const combat = createCombat({ round: 1, combatants: [{ id: "c-a", tokenId: spotter.id }], activeId: "c-a" });

  await setSpot(target, { spotterToken: spotter, combat, allegiance: "ally" });

  assert.equal(target.actor.statuses.has("spotted"), true, "visual status applied");
  assert.equal(hasValidIndirectDesignation(target, { attackerToken: ally, combat }), true, "ally sees the spot");
});

test("allegiance gates the designation: an enemy attacker cannot use an ally spot", async () => {
  reset();
  const target = createTokenDoc({ uuid: "Scene.s1.Token.t", disposition: -1 });
  const spotter = createTokenDoc({ uuid: "Scene.s1.Token.a", disposition: 1 });
  const enemy = createTokenDoc({ uuid: "Scene.s1.Token.e", disposition: -1 });
  const combat = createCombat({ round: 1, combatants: [{ id: "c-a", tokenId: spotter.id }] });

  await setSpot(target, { spotterToken: spotter, combat, allegiance: "ally" });

  assert.equal(hasValidIndirectDesignation(target, { attackerToken: enemy, combat }), false);
});

test("multiple spotters coexist; the same spotter refreshes its own entry", async () => {
  reset();
  const target = createTokenDoc({ uuid: "Scene.s1.Token.t", disposition: -1 });
  const s1 = createTokenDoc({ uuid: "Scene.s1.Token.a", disposition: 1 });
  const s2 = createTokenDoc({ uuid: "Scene.s1.Token.b", disposition: 1 });
  const combat = createCombat({ round: 1, combatants: [{ id: "c-a", tokenId: s1.id }, { id: "c-b", tokenId: s2.id }] });

  await setSpot(target, { spotterToken: s1, combat });
  await setSpot(target, { spotterToken: s2, combat });
  await setSpot(target, { spotterToken: s1, combat });

  assert.equal(getValidSpots(target, { attackerToken: s1, combat }).length, 2);
});

test("a spot expires when the spotter begins its next turn", async () => {
  reset();
  const target = createTokenDoc({ uuid: "Scene.s1.Token.t", disposition: -1 });
  const spotter = createTokenDoc({ uuid: "Scene.s1.Token.a", disposition: 1 });
  const ally = createTokenDoc({ uuid: "Scene.s1.Token.b", disposition: 1 });
  const combatants = [{ id: "c-a", tokenId: spotter.id }];

  const created = createCombat({ round: 1, combatants, activeId: "c-a" });
  await setSpot(target, { spotterToken: spotter, combat: created });

  // Round 2: the spotter activates again -> authoritative clear.
  const next = createCombat({ round: 2, combatants, activeId: "c-a" });
  await clearExpiredSpotsForCombatant(next, "c-a");

  assert.equal(hasValidIndirectDesignation(target, { attackerToken: ally, combat: next }), false);
  assert.equal(target.actor.statuses.has("spotted"), false, "visual status reconciled away");
});

test("clearing the last spot reconciles the visual status off", async () => {
  reset();
  const target = createTokenDoc({ uuid: "Scene.s1.Token.t", disposition: -1 });
  const spotter = createTokenDoc({ uuid: "Scene.s1.Token.a", disposition: 1 });
  const combat = createCombat({ round: 1, combatants: [{ id: "c-a", tokenId: spotter.id }] });

  await setSpot(target, { spotterToken: spotter, combat });
  assert.equal(target.actor.statuses.has("spotted"), true);

  await clearSpot(target, spotter.uuid);
  assert.equal(target.actor.statuses.has("spotted"), false);
});

test("no Lock leakage: a spotted target does not gain effective Lock", () => {
  // getEffectiveDetectionState must ignore `spotted` (only tagged/narced grant Lock).
  const targetActor = createActor({ statuses: ["spotted"] });
  const combatant = {
    getFlag(scope, key) {
      if (scope !== "mwd" || key !== "targeting") return {};
      return { "Scene.s1.Token.t": { detectionState: "contact", packet: null } };
    },
  };
  const state = getEffectiveDetectionState(combatant, "Scene.s1.Token.t", targetActor);
  assert.notEqual(state, "lock", "spotted must not grant Lock");
  assert.equal(state, "contact", "detection state is unchanged by spotting");
});

test("TAG still grants effective Lock (regression guard for the parallel mechanic)", () => {
  const targetActor = createActor({ statuses: ["tagged"] });
  const combatant = { getFlag: () => ({}) };
  assert.equal(getEffectiveDetectionState(combatant, "Scene.s1.Token.t", targetActor), "lock");
});
