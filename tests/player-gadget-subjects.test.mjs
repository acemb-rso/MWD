import test from "node:test";
import assert from "node:assert/strict";

function makeActor({ id, type = "character", owner = true } = {}) {
  return {
    id,
    uuid: `Actor.${id}`,
    type,
    name: id,
    img: "actor.webp",
    testUserPermission: () => owner,
  };
}

function makeToken(actor, { id, name = actor?.name } = {}) {
  return {
    id,
    uuid: `Scene.scene-1.Token.${id}`,
    name,
    actor,
    parent: { id: "scene-1" },
    texture: { src: "token.webp" },
  };
}

function setupScene(tokens = [], controlled = []) {
  globalThis.game = {
    user: {
      id: "user-1",
      isGM: false,
      character: null,
    },
    settings: {
      get: () => "",
      set: async () => null,
    },
    actors: new Map(),
  };
  globalThis.canvas = {
    scene: {
      id: "scene-1",
      tokens,
    },
    tokens: {
      controlled: controlled.map(token => ({ document: token })),
      placeables: tokens.map(token => ({ document: token })),
    },
  };
}

test("player gadget subject selection prefers controlled owned personal tokens", async () => {
  const owned = makeToken(makeActor({ id: "owned" }), { id: "owned-token" });
  const other = makeToken(makeActor({ id: "other" }), { id: "other-token" });
  setupScene([owned, other], [other]);

  const { resolvePlayerGadgetSubject } = await import("../src/modules/player/player-gadget-subjects.js");
  const result = resolvePlayerGadgetSubject();

  assert.equal(result.subject.tokenUuid, other.uuid);
  assert.equal(result.eligible.length, 2);
});

test("player gadget subject selection ignores non-owned and unsupported tokens", async () => {
  const nonOwned = makeToken(makeActor({ id: "guest", owner: false }), { id: "guest-token" });
  const machine = makeToken(makeActor({ id: "mech", type: "battlemech" }), { id: "mech-token" });
  const npc = makeToken(makeActor({ id: "ally", type: "npc" }), { id: "npc-token" });
  setupScene([nonOwned, machine, npc], [nonOwned]);

  const { resolvePlayerGadgetSubject } = await import("../src/modules/player/player-gadget-subjects.js");
  const result = resolvePlayerGadgetSubject();

  assert.equal(result.subject.tokenUuid, npc.uuid);
  assert.deepEqual(result.eligible.map(entry => entry.tokenUuid), [npc.uuid]);
});

test("player gadget subject selection reuses remembered token when valid", async () => {
  const first = makeToken(makeActor({ id: "first" }), { id: "first-token" });
  const remembered = makeToken(makeActor({ id: "remembered" }), { id: "remembered-token" });
  setupScene([first, remembered], []);

  const { resolvePlayerGadgetSubject } = await import("../src/modules/player/player-gadget-subjects.js");
  const result = resolvePlayerGadgetSubject({ rememberedTokenUuid: remembered.uuid });

  assert.equal(result.subject.tokenUuid, remembered.uuid);
});

test("player gadget subject selection falls back to assigned character token", async () => {
  const assignedActor = makeActor({ id: "assigned" });
  const assigned = makeToken(assignedActor, { id: "assigned-token" });
  const other = makeToken(makeActor({ id: "other" }), { id: "other-token" });
  setupScene([other, assigned], []);
  game.user.character = assignedActor;

  const { resolvePlayerGadgetSubject } = await import("../src/modules/player/player-gadget-subjects.js");
  const result = resolvePlayerGadgetSubject();

  assert.equal(result.subject.tokenUuid, assigned.uuid);
});

test("player gadget subject selection returns empty state with no eligible subject", async () => {
  setupScene([makeToken(makeActor({ id: "mech", type: "battlemech" }), { id: "mech-token" })], []);

  const { resolvePlayerGadgetSubject } = await import("../src/modules/player/player-gadget-subjects.js");
  const result = resolvePlayerGadgetSubject();

  assert.equal(result.subject, null);
  assert.match(result.emptyReason, /No owned character or NPC tokens/);
});
