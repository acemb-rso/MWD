import test from "node:test";
import assert from "node:assert/strict";

import { syncMachinePilotVision } from "../src/modules/mwd/machine-pilot-vision.js";

function setPath(root, path, value) {
  const parts = path.split(".");
  let cursor = root;
  while (parts.length > 1) {
    const part = parts.shift();
    if (part.startsWith("-=")) {
      delete cursor[part.slice(2)];
      return;
    }
    cursor[part] ??= {};
    cursor = cursor[part];
  }
  const final = parts[0];
  if (final.startsWith("-=")) delete cursor[final.slice(2)];
  else cursor[final] = value;
}

test("machine pilot vision grants and removes only automatic observer ownership", async () => {
  const pilot = { id: "pilot", uuid: "Actor.pilot" };
  const player = { id: "player", isGM: false, character: pilot };
  const otherPlayer = { id: "other", isGM: false, character: { id: "other-pilot", uuid: "Actor.other" } };
  const gm = { id: "gm", isGM: true };
  const updates = [];
  const actor = {
    type: "battlemech",
    ownership: {},
    flags: { mwd: {} },
    system: { pilot: { uuid: pilot.uuid } },
    getFlag(scope, key) {
      return this.flags?.[scope]?.[key];
    },
    async update(update) {
      updates.push(update);
      for (const [path, value] of Object.entries(update)) setPath(this, path, value);
    },
  };

  globalThis.CONST = { DOCUMENT_OWNERSHIP_LEVELS: { NONE: 0, OBSERVER: 2, OWNER: 3 } };
  globalThis.game = {
    user: gm,
    users: new Map([[player.id, player], [otherPlayer.id, otherPlayer], [gm.id, gm]]),
  };
  globalThis.fromUuid = async uuid => uuid === pilot.uuid ? pilot : null;

  const first = await syncMachinePilotVision(actor);
  assert.equal(first.changed, true);
  assert.equal(actor.ownership.player, 2);
  assert.deepEqual(actor.flags.mwd.pilotVisionOwnership, { player: 0 });

  actor.system.pilot.uuid = "";
  const second = await syncMachinePilotVision(actor);
  assert.equal(second.changed, true);
  assert.equal(actor.ownership.player, undefined);
  assert.deepEqual(actor.flags.mwd.pilotVisionOwnership, {});
  assert.equal(updates.length, 2);

  delete globalThis.CONST;
  delete globalThis.game;
  delete globalThis.fromUuid;
});

test("machine pilot vision leaves existing observer ownership alone", async () => {
  const pilot = { id: "pilot", uuid: "Actor.pilot" };
  const player = { id: "player", isGM: false, character: pilot };
  const actor = {
    type: "vehicle",
    ownership: { player: 2 },
    flags: { mwd: {} },
    system: { pilot: { uuid: pilot.uuid } },
    getFlag(scope, key) {
      return this.flags?.[scope]?.[key];
    },
    async update(update) {
      for (const [path, value] of Object.entries(update)) setPath(this, path, value);
    },
  };

  globalThis.CONST = { DOCUMENT_OWNERSHIP_LEVELS: { NONE: 0, OBSERVER: 2, OWNER: 3 } };
  globalThis.game = {
    user: { id: "gm", isGM: true },
    users: new Map([[player.id, player]]),
  };
  globalThis.fromUuid = async uuid => uuid === pilot.uuid ? pilot : null;

  const result = await syncMachinePilotVision(actor);
  assert.equal(result.changed, false);
  assert.equal(actor.ownership.player, 2);
  assert.equal(actor.flags.mwd.pilotVisionOwnership, undefined);

  delete globalThis.CONST;
  delete globalThis.game;
  delete globalThis.fromUuid;
});
