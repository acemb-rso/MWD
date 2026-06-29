import test from "node:test";
import assert from "node:assert/strict";

function combatant({ tokenId, targeting = {} } = {}) {
  return {
    id: `${tokenId}-combatant`,
    tokenId,
    getFlag(scope, key) {
      if (scope !== "mwd") return null;
      if (key === "targeting") return targeting;
      return null;
    },
  };
}

function actor(type = "battlemech", { statuses = [] } = {}) {
  return {
    id: `${type}-actor`,
    type,
    statuses: new Set(statuses),
  };
}

function token({
  id,
  type = "battlemech",
  uuid = `Scene.scene.Token.${id}`,
  disposition = -1,
  statuses = [],
} = {}) {
  const flags = {};
  return {
    id,
    actor: actor(type, { statuses }),
    center: { x: 0, y: 0 },
    document: {
      id,
      uuid,
      disposition,
      parent: { uuid: "Scene.scene" },
      actor: null,
      getFlag(scope, key) {
        return flags[`${scope}.${key}`];
      },
      async setFlag(scope, key, value) {
        flags[`${scope}.${key}`] = value;
        return this;
      },
    },
  };
}

function installCombat(combatants) {
  globalThis.game = {
    user: { isGM: true },
    combat: {
      combatants: {
        contents: combatants,
        get: () => null,
      },
    },
  };
  globalThis.CONST = { TOKEN_DISPOSITIONS: { HOSTILE: -1, NEUTRAL: 0, FRIENDLY: 1 } };
}

function installCanvasDistance(distance) {
  globalThis.canvas = {
    grid: {
      measurePath: () => ({ distance }),
    },
    perception: {
      calls: [],
      update(flags, defer) {
        this.calls.push({ flags, defer });
      },
    },
    tokens: { placeables: [] },
  };
}

function cleanupGlobals() {
  delete globalThis.game;
  delete globalThis.CONST;
  delete globalThis.canvas;
  delete globalThis.Hooks;
}

function setPath(root, path, value) {
  const parts = path.split(".");
  let cursor = root;
  while (parts.length > 1) {
    const part = parts.shift();
    cursor[part] ??= {};
    cursor = cursor[part];
  }
  cursor[parts[0]] = value;
}

test("MWD sensor detection is observer-relative", async () => {
  const {
    canDetect,
    getDetectionState,
  } = await import("../src/modules/canvas/machine-sensor-detection.js");

  const observer = token({ id: "observer", type: "battlemech", disposition: 1 });
  const otherObserver = token({ id: "other", type: "battlemech", disposition: 1 });
  const target = token({ id: "target", type: "battlemech", disposition: -1 });

  installCombat([
    combatant({ tokenId: observer.id, targeting: { [target.document.uuid]: { detectionState: "blind" } } }),
    combatant({ tokenId: otherObserver.id, targeting: { [target.document.uuid]: { detectionState: "lock" } } }),
  ]);
  installCanvasDistance(30);

  try {
    assert.equal(getDetectionState(observer, target), "blind");
    assert.equal(canDetect(observer, target), false);
    assert.equal(canDetect(otherObserver, target), true);
  } finally {
    cleanupGlobals();
  }
});

test("MWD sensor detection only allows hostile machine targets with contact, track, or lock", async () => {
  const { canDetect } = await import("../src/modules/canvas/machine-sensor-detection.js");
  const observer = token({ id: "observer", type: "battlemech", disposition: 1 });
  const hostileMech = token({ id: "hostile-mech", type: "vehicle", disposition: -1 });
  const friendlyMech = token({ id: "friendly-mech", type: "battlemech", disposition: 1 });
  const hostileCharacter = token({ id: "hostile-character", type: "character", disposition: -1 });
  const neutralMech = token({ id: "neutral-mech", type: "battlemech", disposition: 0 });

  installCombat([
    combatant({
      tokenId: observer.id,
      targeting: {
        [hostileMech.document.uuid]: { detectionState: "contact" },
        [friendlyMech.document.uuid]: { detectionState: "track" },
        [hostileCharacter.document.uuid]: { detectionState: "lock" },
        [neutralMech.document.uuid]: { detectionState: "lock" },
      },
    }),
  ]);
  installCanvasDistance(30);

  try {
    assert.equal(canDetect(observer, hostileMech), true);
    assert.equal(canDetect(observer, friendlyMech), false);
    assert.equal(canDetect(observer, hostileCharacter), false);
    assert.equal(canDetect(observer, neutralMech), false);
  } finally {
    cleanupGlobals();
  }
});

test("valid indirect designations create selectable sensor awareness without EW contact", async () => {
  const {
    canDetect,
    getDetectionState,
    getSensorAwarenessState,
  } = await import("../src/modules/canvas/machine-sensor-detection.js");
  const {
    refreshSensorOverlays,
  } = await import("../src/modules/canvas/machine-sensor-overlays.js");
  const observer = token({ id: "observer", type: "battlemech", disposition: 1 });
  const target = token({ id: "target", type: "battlemech", disposition: -1 });

  await target.document.setFlag("mwd", "spotting", {
    spots: {
      "Scene.scene.Token.spotter": {
        spotKey: "Scene.scene.Token.spotter",
        sceneUuid: "Scene.scene",
        targetTokenUuid: target.document.uuid,
        spotterTokenUuid: "Scene.scene.Token.spotter",
        spotterDisposition: 1,
        allegiance: "ally",
        source: "spotIndirect",
        round: 1,
      },
    },
  });

  installCombat([
    combatant({ tokenId: observer.id, targeting: { [target.document.uuid]: { detectionState: "blind" } } }),
  ]);
  installCanvasDistance(30);

  try {
    assert.equal(getDetectionState(observer, target), "blind");
    assert.equal(getSensorAwarenessState(observer, target), "contact");
    assert.equal(canDetect(observer, target), true);

    refreshSensorOverlays({ observerTokens: [observer], targetTokens: [target] });
    assert.equal(target._mwdSensorOverlayModel.state, "contact");
  } finally {
    cleanupGlobals();
  }
});

test("MWD sensor detection mode accepts spotted targets at the point-test stage", async () => {
  const {
    MwdSensorDetectionMode,
  } = await import("../src/modules/canvas/machine-sensor-detection.js");
  const observer = token({ id: "observer", type: "battlemech", disposition: 1 });
  const target = token({ id: "target", type: "battlemech", disposition: -1 });

  await target.document.setFlag("mwd", "spotting", {
    spots: {
      "Scene.scene.Token.spotter": {
        spotKey: "Scene.scene.Token.spotter",
        sceneUuid: "Scene.scene",
        targetTokenUuid: target.document.uuid,
        spotterTokenUuid: "Scene.scene.Token.spotter",
        spotterDisposition: 1,
        allegiance: "ally",
        source: "spotIndirect",
        round: 1,
      },
    },
  });

  installCombat([
    combatant({ tokenId: observer.id, targeting: { [target.document.uuid]: { detectionState: "blind" } } }),
  ]);
  installCanvasDistance(30);

  try {
    const mode = new MwdSensorDetectionMode({ id: "mwdSensor", range: 0 });
    const visionSource = { object: observer };
    const detectionTarget = { target: { object: target } };

    assert.equal(mode._testLOS(), true);
    assert.equal(mode._canDetect(visionSource, detectionTarget), true);
    assert.equal(mode._testPoint(visionSource, { range: 0 }, detectionTarget), true);
  } finally {
    cleanupGlobals();
  }
});

test("TAG/NARC designations create lock-level sensor awareness without rewriting EW state", async () => {
  const {
    canDetect,
    getDetectionState,
    getSensorAwarenessState,
  } = await import("../src/modules/canvas/machine-sensor-detection.js");
  const observer = token({ id: "observer", type: "battlemech", disposition: 1 });
  const target = token({ id: "target", type: "battlemech", disposition: -1, statuses: ["tagged"] });

  installCombat([
    combatant({ tokenId: observer.id, targeting: { [target.document.uuid]: { detectionState: "blind" } } }),
  ]);
  installCanvasDistance(30);

  try {
    assert.equal(getDetectionState(observer, target), "blind");
    assert.equal(getSensorAwarenessState(observer, target), "lock");
    assert.equal(canDetect(observer, target), true);
  } finally {
    cleanupGlobals();
  }
});

test("sensor-blind observers lose sensor detection beyond Close range", async () => {
  const { canDetect } = await import("../src/modules/canvas/machine-sensor-detection.js");
  const observer = token({ id: "observer", type: "battlemech", disposition: 1, statuses: ["sensorBlind"] });
  const target = token({ id: "target", type: "battlemech", disposition: -1 });

  installCombat([
    combatant({ tokenId: observer.id, targeting: { [target.document.uuid]: { detectionState: "track" } } }),
  ]);

  try {
    installCanvasDistance(30);
    assert.equal(canDetect(observer, target), true);

    installCanvasDistance(100);
    assert.equal(canDetect(observer, target), false);
  } finally {
    cleanupGlobals();
  }
});

test("sensor detection mode sync preserves existing settings and skips non-machines", async () => {
  const { syncTokenDetectionModes } = await import("../src/modules/canvas/machine-sensor-detection.js");
  const updates = [];
  const machineActor = {
    type: "battlemech",
    prototypeToken: {
      detectionModes: [{ id: "mwdSensor", enabled: false, range: 300, custom: "kept" }],
    },
    async update(update) {
      updates.push(update);
      for (const [path, value] of Object.entries(update)) setPath(this, path, value);
    },
  };
  const characterActor = {
    type: "character",
    prototypeToken: { detectionModes: [] },
    async update(update) {
      updates.push(update);
    },
  };

  globalThis.game = { user: { isGM: true } };

  try {
    const result = await syncTokenDetectionModes({
      actors: [machineActor, characterActor],
      scenes: [],
      canvasTokens: [],
    });

    assert.equal(result.changed, 1);
    assert.equal(updates.length, 1);
    assert.deepEqual(machineActor.prototypeToken.detectionModes, [
      { id: "mwdSensor", enabled: true, range: 300, custom: "kept" },
    ]);
    assert.deepEqual(characterActor.prototypeToken.detectionModes, []);
  } finally {
    cleanupGlobals();
  }
});

test("sensor overlays update local state without rewriting target token data", async () => {
  const {
    refreshSensorOverlays,
  } = await import("../src/modules/canvas/machine-sensor-overlays.js");

  const observer = token({ id: "observer", type: "battlemech", disposition: 1 });
  const target = token({ id: "target", type: "battlemech", disposition: -1 });
  const targetUpdates = [];
  target.document.update = async update => targetUpdates.push(update);
  let detectionState = "lock";

  installCombat([
    combatant({
      tokenId: observer.id,
      targeting: {
        [target.document.uuid]: {
          get detectionState() {
            return detectionState;
          },
        },
      },
    }),
  ]);
  installCanvasDistance(30);

  try {
    refreshSensorOverlays({ observerTokens: [observer], targetTokens: [target] });
    assert.equal(target._mwdSensorOverlayModel.state, "lock");

    detectionState = "track";
    refreshSensorOverlays({ observerTokens: [observer], targetTokens: [target] });
    assert.equal(target._mwdSensorOverlayModel.state, "track");
    assert.deepEqual(targetUpdates, []);
  } finally {
    cleanupGlobals();
  }
});

test("spot changes request perception and sensor overlay refresh", async () => {
  const {
    registerMachineSensorOverlayHooks,
  } = await import("../src/modules/canvas/machine-sensor-overlays.js");

  const observer = token({ id: "observer", type: "battlemech", disposition: 1 });
  const target = token({ id: "target", type: "battlemech", disposition: -1 });
  const callbacks = new Map();

  globalThis.Hooks = {
    on(name, callback) {
      callbacks.set(name, callback);
      return callback;
    },
  };

  await target.document.setFlag("mwd", "spotting", {
    spots: {
      "Scene.scene.Token.spotter": {
        spotKey: "Scene.scene.Token.spotter",
        sceneUuid: "Scene.scene",
        targetTokenUuid: target.document.uuid,
        spotterTokenUuid: "Scene.scene.Token.spotter",
        spotterDisposition: 1,
        allegiance: "ally",
        source: "spotIndirect",
        round: 1,
      },
    },
  });
  installCombat([
    combatant({ tokenId: observer.id, targeting: { [target.document.uuid]: { detectionState: "blind" } } }),
  ]);
  installCanvasDistance(30);
  globalThis.canvas.tokens = { controlled: [observer], placeables: [observer, target] };

  try {
    assert.equal(registerMachineSensorOverlayHooks(), true);
    callbacks.get("mwd.spotsChanged")?.({ targetToken: target.document });
    await new Promise(resolve => setTimeout(resolve, 0));

    assert.equal(globalThis.canvas.perception.calls.length, 1);
    assert.equal(target._mwdSensorOverlayModel.state, "contact");
  } finally {
    cleanupGlobals();
  }
});

test("sensor perception refresh uses PerceptionManager update batching", async () => {
  const { requestSensorPerceptionRefresh } = await import("../src/modules/canvas/machine-sensor-detection.js");
  installCanvasDistance(30);

  try {
    assert.equal(requestSensorPerceptionRefresh(), true);
    assert.equal(globalThis.canvas.perception.calls.length, 1);
    assert.equal(globalThis.canvas.perception.calls[0].defer, true);
  } finally {
    cleanupGlobals();
  }
});
