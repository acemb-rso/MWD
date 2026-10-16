import test from "node:test";
import assert from "node:assert/strict";

import {
  getMeasuredTokenCenter,
  getTokenActor,
  getTokenCenter,
  getTokenDisposition,
  getTokenDocument,
  getTokenId,
  getTokenObject,
  getTokenUuid,
} from "../src/modules/utils/token.js";

test("token helpers resolve placeable and document-backed token facts", () => {
  const actor = { id: "actor-1" };
  const document = {
    id: "doc-token",
    uuid: "Scene.scene.Token.doc-token",
    actor,
    disposition: -1,
  };
  const token = {
    id: "placeable-token",
    uuid: "Scene.scene.Token.placeable-token",
    document,
  };

  assert.equal(getTokenDocument(token), document);
  assert.equal(getTokenActor(token), actor);
  assert.equal(getTokenId(token), "doc-token");
  assert.equal(getTokenUuid(token), "Scene.scene.Token.doc-token");
  assert.equal(getTokenDisposition(token), -1);
});

test("token helpers fall back across alternate token shapes", () => {
  const linkedActor = { id: "linked" };
  const token = {
    tokenId: "fallback-token",
    uuid: "Scene.scene.Token.fallback-token",
    actorLink: { actor: linkedActor },
    object: { id: "object-token" },
    data: { disposition: 1 },
  };

  assert.equal(getTokenObject(token), token.object);
  assert.equal(getTokenActor(token), linkedActor);
  assert.equal(getTokenId(token), "fallback-token");
  assert.equal(getTokenUuid(token), "Scene.scene.Token.fallback-token");
  assert.equal(getTokenDisposition(token), 1);
});

test("getTokenCenter preserves explicit centers and computes document fallbacks", () => {
  assert.deepEqual(getTokenCenter({ center: { x: 12, y: 34 } }), { x: 12, y: 34 });
  assert.deepEqual(
    getTokenCenter({ document: { x: 100, y: 200, width: 2, height: 1 } }, { gridSize: 50 }),
    { x: 150, y: 225 }
  );
  assert.equal(getTokenCenter(null), null);
});

test("getMeasuredTokenCenter uses pending positions with Foundry center methods", () => {
  const pendingPositions = new Map([["token-1", { x: 40, y: 60 }]]);
  const token = {
    document: { id: "token-1", x: 10, y: 20 },
    object: {
      getCenterPoint: ({ x, y }) => ({ x: x + 5, y: y + 10 }),
    },
  };

  assert.deepEqual(
    getMeasuredTokenCenter(token, { pendingPositions }),
    { x: 45, y: 70 }
  );
});
