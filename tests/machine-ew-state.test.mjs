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

test("suppress beacon marks a packet unusable until suppression is cleared", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.deepClone ??= value => JSON.parse(JSON.stringify(value));

  const {
    clearSuppressedTargetingPackets,
    getTargetingState,
    getUsableTargetingPacket,
    suppressTargetingPacket,
  } = await import("../src/modules/mwd/machine-ew-state.js");

  const targetUuid = "Scene.scene.Token.target-1";
  const flags = {
    targeting: {
      [targetUuid]: {
        detectionState: "lock",
        packet: {
          id: "beacon-packet",
          value: 3,
          sourceTokenUuid: "Scene.scene.Token.observer",
          round: 1,
          expiresAfterRound: 1,
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

  assert.equal(getUsableTargetingPacket(combatant, targetUuid, 3, "lock", 1)?.value, 3);

  const suppressed = await suppressTargetingPacket(combatant, targetUuid, {
    suppressedBy: { source: "suppressBeacon", suppressorActorUuid: "Actor.defender" },
  });

  assert.equal(suppressed.ok, true);
  assert.equal(getTargetingState(combatant, targetUuid).packet.suppressedBy.source, "suppressBeacon");
  assert.equal(getUsableTargetingPacket(combatant, targetUuid, 3, "lock", 1), null);

  const cleared = await clearSuppressedTargetingPackets(combatant);

  assert.equal(cleared.cleared, 1);
  assert.equal(getTargetingState(combatant, targetUuid).packet.suppressedBy, null);
  assert.equal(getUsableTargetingPacket(combatant, targetUuid, 3, "lock", 1)?.value, 3);
});

test("targeting helpers read legacy Foundry-expanded token UUID paths and migrate writes to literal keys", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.deepClone ??= value => JSON.parse(JSON.stringify(value));

  const {
    getDetectionState,
    listTargetingStates,
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
  assert.equal(flags.targeting[targetUuid].detectionState, "track");
  assert.equal(flags.targeting.Scene, undefined);
  assert.deepEqual(listTargetingStates(combatant).map(entry => entry.targetTokenUuid), [targetUuid]);
});

test("targeting helpers store brand-new token UUIDs as literal keys", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.deepClone ??= value => JSON.parse(JSON.stringify(value));

  const {
    getDetectionState,
    listTargetingStates,
    setDetectionState,
  } = await import("../src/modules/mwd/machine-ew-state.js");

  const targetUuid = "Scene.scene.Token.target-1";
  const flags = { targeting: {} };
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

  await setDetectionState(combatant, targetUuid, "contact");

  assert.equal(getDetectionState(combatant, targetUuid), "contact");
  assert.equal(flags.targeting[targetUuid].detectionState, "contact");
  assert.equal(flags.targeting.Scene, undefined);
  assert.deepEqual(listTargetingStates(combatant).map(entry => entry.targetTokenUuid), [targetUuid]);
});

test("combatant lookup reads Foundry collection contents", async () => {
  const {
    getAttackerCombatant,
    getTargetCombatant,
  } = await import("../src/modules/mwd/machine-ew-state.js");

  const attackerCombatant = { id: "attacker-combatant", tokenId: "attacker-token" };
  const targetCombatant = { id: "target-combatant", tokenId: "target-token" };
  globalThis.game = {
    combat: {
      combatants: {
        contents: [attackerCombatant, targetCombatant],
        get: () => null,
      },
    },
  };

  try {
    assert.equal(getAttackerCombatant({ id: "attacker-token" }), attackerCombatant);
    assert.equal(getTargetCombatant("target-token"), targetCombatant);
  } finally {
    delete globalThis.game;
  }
});
