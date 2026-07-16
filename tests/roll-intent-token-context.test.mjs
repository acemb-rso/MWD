import test from "node:test";
import assert from "node:assert/strict";

import {
  getTokenDisplayName,
  getTokenId,
  getTokenUuid,
  resolveRollObserverToken,
  resolveRollSourceToken,
  resolveRollTargetToken,
  resolveTokenById,
  resolveTokenByUuid,
  withOwner,
} from "../src/modules/roll/intent/token-context.js";

function token({ id, uuid, actor = null, name = "" } = {}) {
  return {
    id,
    uuid,
    name,
    actor,
    document: { id, uuid },
  };
}

function withScene(tokens = [], { controlled = [], targets = [] } = {}) {
  const byId = new Map(tokens.map(entry => [entry.id, entry]));
  globalThis.canvas = {
    tokens: {
      get: id => byId.get(id) ?? null,
      placeables: tokens,
      controlled,
    },
  };
  globalThis.game = {
    user: { targets: new Set(targets) },
  };
}

function clearScene() {
  delete globalThis.canvas;
  delete globalThis.game;
}

test("roll intent token helpers resolve ids, uuids, and display metadata", () => {
  const actor = { id: "actor-a", name: "Pilot" };
  const alpha = token({ id: "alpha", uuid: "Scene.s.Token.alpha", actor, name: "Alpha" });
  const beta = token({ id: "beta", uuid: "Scene.s.Token.beta", actor: { id: "actor-b", name: "Beta Actor" } });
  withScene([alpha, beta]);

  try {
    assert.equal(resolveTokenById("alpha"), alpha);
    assert.equal(resolveTokenByUuid("Scene.s.Token.beta"), beta);
    assert.equal(getTokenId(alpha), "alpha");
    assert.equal(getTokenUuid(alpha), "Scene.s.Token.alpha");
    assert.equal(getTokenDisplayName(beta), "Target");
    assert.equal(withOwner("System", actor), "System (Pilot)");
  } finally {
    clearScene();
  }
});

test("roll target resolution prefers explicit target uuid then id before user targets", () => {
  const actor = { id: "actor-a" };
  const byUuid = token({ id: "uuid-token", uuid: "Scene.s.Token.uuid", actor });
  const byId = token({ id: "id-token", uuid: "Scene.s.Token.id", actor });
  const userTarget = token({ id: "user-token", uuid: "Scene.s.Token.user", actor });
  withScene([byUuid, byId, userTarget], { targets: [userTarget] });

  try {
    assert.equal(resolveRollTargetToken({ targetTokenUuid: byUuid.uuid, targetTokenId: byId.id }), byUuid);
    assert.equal(resolveRollTargetToken({ targetTokenId: byId.id }), byId);
    assert.equal(resolveRollTargetToken({}), userTarget);
  } finally {
    clearScene();
  }
});

test("roll source resolution falls back through controlled and active actor tokens", () => {
  const actor = { id: "actor-a" };
  const explicit = token({ id: "explicit-token", uuid: "Scene.s.Token.explicit", actor });
  const controlled = token({ id: "controlled-token", uuid: "Scene.s.Token.controlled", actor });
  const active = token({ id: "active-token", uuid: "Scene.s.Token.active", actor });
  const actorWithActive = {
    ...actor,
    getActiveTokens: () => [active],
  };
  withScene([explicit, controlled, active], { controlled: [controlled] });

  try {
    assert.equal(resolveRollSourceToken(actorWithActive, { sourceTokenId: explicit.id }), explicit);
    assert.equal(resolveRollSourceToken(actorWithActive, {}), controlled);
    globalThis.canvas.tokens.controlled = [];
    assert.equal(resolveRollSourceToken(actorWithActive, {}), active);
  } finally {
    clearScene();
  }
});

test("observer resolution preserves target id before target uuid priority", () => {
  const actor = { id: "actor-a" };
  const byId = token({ id: "observer-id", uuid: "Scene.s.Token.observer-id", actor });
  const byUuid = token({ id: "observer-uuid", uuid: "Scene.s.Token.observer-uuid", actor });
  withScene([byId, byUuid]);

  try {
    assert.equal(resolveRollObserverToken({ targetTokenId: byId.id, targetTokenUuid: byUuid.uuid }), byId);
    assert.equal(resolveRollObserverToken({ targetTokenUuid: byUuid.uuid }), byUuid);
  } finally {
    clearScene();
  }
});
