import test from "node:test";
import assert from "node:assert/strict";

function getProperty(root, path) {
  return String(path ?? "")
    .split(".")
    .filter(Boolean)
    .reduce((value, key) => value?.[key], root);
}

class MockColorMatrixFilter {
  constructor() {
    this.matrix = [];
    this.enabled = true;
    this.alpha = 1;
    this.resetCount = 0;
  }

  reset() {
    this.resetCount += 1;
  }
}

class MockBlurFilter {
  constructor() {
    this.enabled = false;
    this.blur = 0;
    this.strength = 0;
  }
}

function createMockTicker() {
  return {
    added: [],
    removed: [],
    add(fn) {
      this.added.push(fn);
    },
    remove(fn) {
      this.removed.push(fn);
    },
  };
}

function createToken() {
  return {
    id: "token-1",
    document: {
      uuid: "Scene.scene.Token.token-1",
      baseActor: { id: "actor-1" },
    },
    actor: {
      id: "actor-1",
      type: "battlemech",
      system: {
        monitors: {
          heat: { value: 5, max: 10 },
        },
        mwd: {
          heat: {
            current: 5,
            pendingGenerated: 4,
            thresholds: { runningHot: 3, overheated: 5, shutdown: 7 },
          },
        },
      },
    },
    mesh: {
      filters: [],
      destroyed: false,
    },
  };
}

test("controller creates filters once, updates them in place, and tears down ticker when cleared", async () => {
  const ticker = createMockTicker();

  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.hasProperty ??= (root, path) => getProperty(root, path) !== undefined;
  globalThis.PIXI = {
    ColorMatrixFilter: MockColorMatrixFilter,
    BlurFilter: MockBlurFilter,
  };
  globalThis.Hooks = { on() {} };
  globalThis.game = {
    settings: { get: () => true },
  };
  globalThis.canvas = {
    ready: true,
    photosensitiveMode: false,
    blurFilters: new Set(),
    createBlurFilter: () => new MockBlurFilter(),
    app: { ticker },
    tokens: { placeables: [] },
  };

  const { HeatFxController } = await import("../src/modules/token/heat-fx-controller.js");

  const controller = new HeatFxController();
  const token = createToken();
  canvas.tokens.placeables = [token];

  const firstState = controller.syncToken(token);
  const firstFilters = [...token.mesh.filters];
  const firstRecordShimmer = firstFilters.find(filter => typeof filter?.setVisualState === "function");

  assert.equal(firstState.band, "overheat");
  assert.equal(token.mesh.filters.length, 3);
  assert.equal(ticker.added.length, 1);

  const secondState = controller.syncToken(token);
  const secondFilters = [...token.mesh.filters];
  const secondRecordShimmer = secondFilters.find(filter => typeof filter?.setVisualState === "function");

  assert.equal(secondState.band, "overheat");
  assert.deepEqual(secondFilters, firstFilters);
  assert.equal(secondRecordShimmer, firstRecordShimmer);
  assert.equal(ticker.added.length, 1);

  token.actor.system.monitors.heat.value = 2;
  token.actor.system.mwd.heat.current = 2;
  controller.syncToken(token);

  assert.equal(token.mesh.filters, null);
  assert.equal(ticker.removed.length, 1);
});

test("controller reacts to heat change paths and ignores unrelated actor updates", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.hasProperty ??= (root, path) => getProperty(root, path) !== undefined;

  const { hasBattlemechHeatVisualChange } = await import("../src/modules/token/heat-fx-controller.js");

  assert.equal(hasBattlemechHeatVisualChange({ system: { monitors: { heat: { value: 4 } } } }), true);
  assert.equal(hasBattlemechHeatVisualChange({ system: { mwd: { heat: { current: 4 } } } }), true);
  assert.equal(hasBattlemechHeatVisualChange({ system: { mwd: { heat: { thresholds: { shutdown: 8 } } } } }), true);
  assert.equal(hasBattlemechHeatVisualChange({ system: { attributes: { reliability: { value: 4 } } } }), false);
});
