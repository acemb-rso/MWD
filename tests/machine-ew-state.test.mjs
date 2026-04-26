import test from "node:test";
import assert from "node:assert/strict";

test("targeting helpers read legacy ewState data and normalize a single active packet", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.deepClone ??= value => JSON.parse(JSON.stringify(value));

  const {
    getTargetingState,
    setTargetingPacket,
    consumeTargetingPacket,
  } = await import("../src/modules/mwd/machine-ew-state.js");

  const flags = {
    ewState: {
      "Scene.scene.Token.target-1": {
        detectionState: "track",
        packets: [
          { id: "older", value: 2, round: 1, expiresAfterRound: 1 },
          { id: "newer", value: 4, round: 2, expiresAfterRound: 2 },
        ],
      },
    },
    targeting: {},
  };

  const combatant = {
    getFlag(scope, key) {
      if (scope !== "mwd") return null;
      return flags[key] ?? null;
    },
    async setFlag(scope, key, value) {
      if (scope !== "mwd") throw new Error("unexpected scope");
      flags[key] = value;
    },
  };

  const legacy = getTargetingState(combatant, "Scene.scene.Token.target-1");
  assert.equal(legacy.detectionState, "track");
  assert.equal(legacy.packet?.id, "newer");
  assert.deepEqual(legacy.packets.map(packet => packet.id), ["newer"]);

  await setTargetingPacket(combatant, "Scene.scene.Token.target-1", {
    id: "replacement",
    value: 5,
    round: 3,
    expiresAfterRound: 3,
  });

  const replaced = getTargetingState(combatant, "Scene.scene.Token.target-1");
  assert.equal(replaced.packet?.id, "replacement");
  assert.equal(replaced.packet?.value, 5);

  await consumeTargetingPacket(combatant, "Scene.scene.Token.target-1", "replacement");

  const consumed = getTargetingState(combatant, "Scene.scene.Token.target-1");
  assert.equal(consumed.packet, null);
});

test("targeting helpers read and advance Foundry-expanded token UUID paths", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.deepClone ??= value => JSON.parse(JSON.stringify(value));

  const {
    getDetectionState,
    setDetectionState,
  } = await import("../src/modules/mwd/machine-ew-state.js");

  const targetUuid = "Scene.RqeJhsMF07uyTM2W.Token.3wtfLjfKXMk34ieX";
  const flags = {
    targeting: {
      Scene: {
        RqeJhsMF07uyTM2W: {
          Token: {
            "3wtfLjfKXMk34ieX": {
              detectionState: "contact",
              packet: null,
            },
          },
        },
      },
    },
  };

  const combatant = {
    getFlag(scope, key) {
      if (scope !== "mwd") return null;
      return flags[key] ?? null;
    },
    async setFlag(scope, key, value) {
      if (scope !== "mwd") throw new Error("unexpected scope");
      flags[key] = value;
    },
  };

  assert.equal(getDetectionState(combatant, targetUuid), "contact");

  await setDetectionState(combatant, targetUuid, "track");

  assert.equal(getDetectionState(combatant, targetUuid), "track");
  assert.equal(flags.targeting.Scene.RqeJhsMF07uyTM2W.Token["3wtfLjfKXMk34ieX"].detectionState, "track");
});
