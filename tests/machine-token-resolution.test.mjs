import test from "node:test";
import assert from "node:assert/strict";

import { resolveMachineSceneToken } from "../src/modules/mwd/machine-token-resolution.js";

test("machine token resolution prefers an explicit sheet token", () => {
  const sheetToken = { id: "sheet-token" };
  const actor = {
    id: "actor-1",
    token: { id: "prototype-token" },
    getActiveTokens() {
      return [{ id: "active-token" }];
    },
  };

  const resolved = resolveMachineSceneToken(actor, { sheetToken });
  assert.equal(resolved.id, "sheet-token");
});

test("machine token resolution prefers active scene tokens over prototype tokens", () => {
  const actor = {
    id: "actor-1",
    token: { id: "prototype-token" },
    getActiveTokens() {
      return [{ id: "active-token" }];
    },
  };

  const resolved = resolveMachineSceneToken(actor);
  assert.equal(resolved.id, "active-token");
});

test("machine token resolution falls back to canvas tokens before prototype tokens", () => {
  globalThis.canvas = {
    tokens: {
      placeables: [
        { id: "canvas-token", actor: { id: "actor-1" } },
      ],
    },
  };

  const actor = {
    id: "actor-1",
    token: { id: "prototype-token" },
    getActiveTokens() {
      return [];
    },
  };

  const resolved = resolveMachineSceneToken(actor);
  assert.equal(resolved.id, "canvas-token");

  delete globalThis.canvas;
});

test("machine token resolution uses the prototype token only as a last resort", () => {
  const actor = {
    id: "actor-1",
    token: { id: "prototype-token" },
    getActiveTokens() {
      return [];
    },
  };

  const resolved = resolveMachineSceneToken(actor);
  assert.equal(resolved.id, "prototype-token");
});
