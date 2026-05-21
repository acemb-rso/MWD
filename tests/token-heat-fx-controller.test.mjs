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

class MockSprite {
  constructor(texture) {
    this.texture = texture;
    this.name = "";
    this.visible = true;
    this.alpha = 1;
    this.eventMode = "";
    this.interactive = true;
    this.zIndex = 0;
    this.parent = null;
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.filters = null;
    this.width = texture?.width ?? 100;
    this.height = texture?.height ?? 100;
    this.anchor = {
      x: 0,
      y: 0,
      set: (x, y) => {
        this.anchor.x = x;
        this.anchor.y = y;
      },
    };
    this.scale = {
      x: 1,
      y: 1,
      set: (x, y) => {
        this.scale.x = x;
        this.scale.y = y;
      },
    };
    this.destroyedWith = null;
  }

  destroy(options) {
    this.destroyedWith = options;
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
  const token = {
    id: "token-1",
    w: 140,
    h: 120,
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
      statuses: new Set(),
    },
    mesh: {
      filters: [],
      destroyed: false,
      x: 0,
      y: 0,
      width: 140,
      height: 120,
    },
    children: [],
    addChild(child) {
      this.children.push(child);
      child.parent = this;
      return child;
    },
    removeChild(child) {
      this.children = this.children.filter(entry => entry !== child);
      child.parent = null;
      return child;
    },
  };
  return token;
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

test("controller shows a ruined decal when machine destroyed state is set", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.hasProperty ??= (root, path) => getProperty(root, path) !== undefined;
  globalThis.PIXI = {
    ColorMatrixFilter: MockColorMatrixFilter,
    BlurFilter: MockBlurFilter,
    Sprite: MockSprite,
    Texture: {
      from: path => ({ path, width: 100, height: 100 }),
    },
  };
  globalThis.Hooks = { on() {} };
  globalThis.game = {
    settings: { get: () => true },
  };
  const ticker = createMockTicker();
  globalThis.canvas = {
    ready: true,
    photosensitiveMode: false,
    blurFilters: new Set(),
    createBlurFilter: () => new MockBlurFilter(),
    app: { ticker },
    tokens: { placeables: [] },
  };

  const { HeatFxController, MACHINE_RUINED_DECAL_PATH, isMachineRuined } = await import("../src/modules/token/heat-fx-controller.js");

  const controller = new HeatFxController();
  const token = createToken();
  token.actor.type = "vehicle";
  token.actor.system.monitors.heat.value = 0;
  token.actor.system.mwd.heat.current = 0;
  token.actor.system.mwd.status = { state: "destroyed" };
  canvas.tokens.placeables = [token];

  assert.equal(isMachineRuined(token.actor), true);

  controller.syncToken(token);

  const decal = token.children.find(child => child?.name === "mwd-machine-ruined-decal");
  assert.ok(decal);
  assert.equal(decal.texture.path, MACHINE_RUINED_DECAL_PATH);
  assert.equal(decal.visible, true);
  assert.equal(decal.anchor.x, 0.5);
  assert.equal(decal.anchor.y, 0.5);
  assert.equal(decal.blendMode, "screen");
  assert.equal(decal.filters.length, 3);
  assert.equal(ticker.added.length, 1);

  const initialAlpha = decal.alpha;
  const initialScale = decal.scale.x;
  ticker.added[0]({ deltaMS: 500 });
  assert.notEqual(decal.alpha, initialAlpha);
  assert.notEqual(decal.scale.x, initialScale);

  token.actor.system.mwd.status.state = "";
  controller.syncToken(token);

  assert.equal(decal.parent, null);
  assert.equal(token.children.includes(decal), false);
});

test("controller recognizes persisted destroyed statuses from effects and token icons", async () => {
  globalThis.CONFIG = {
    statusEffects: [{ id: "destroyed", img: "systems/mwd/img/icons/status/destroyed.svg" }],
  };

  const { isMachineRuined } = await import("../src/modules/token/heat-fx-controller.js");

  const effectBacked = createToken();
  effectBacked.actor.statuses = new Set();
  effectBacked.actor.effects = [{ statuses: new Set(["destroyed"]) }];

  assert.equal(isMachineRuined(effectBacked.actor, effectBacked), true);

  const tokenBacked = createToken();
  tokenBacked.actor.statuses = new Set();
  tokenBacked.actor.effects = [];
  tokenBacked.document.effects = ["systems/mwd/img/icons/status/destroyed.svg"];

  assert.equal(isMachineRuined(tokenBacked.actor, tokenBacked), true);
});

test("destroyed status effect changes trigger ruined visual sync", async () => {
  const { HeatFxController, hasMachineRuinedVisualChange } = await import("../src/modules/token/heat-fx-controller.js");
  const controller = new HeatFxController();
  const actor = { id: "actor-1", type: "battlemech", statuses: new Set() };
  const syncedStates = [];
  controller.syncActor = nextActor => {
    syncedStates.push({
      actor: nextActor,
      ruined: nextActor.statuses.has("destroyed"),
    });
  };

  controller._onActiveEffectChange({ parent: actor, statuses: new Set(["destroyed"]) });
  actor.statuses.add("destroyed");
  await Promise.resolve();

  assert.deepEqual(syncedStates.at(-1), { actor, ruined: true });

  controller._onActiveEffectChange({ parent: actor, flags: { mwd: { status: { id: "destroyed" } } } });
  actor.statuses.delete("destroyed");
  await Promise.resolve();

  assert.deepEqual(syncedStates.at(-1), { actor, ruined: false });
  assert.equal(hasMachineRuinedVisualChange({ system: { mwd: { status: { state: "destroyed" } } } }), true);
  assert.equal(hasMachineRuinedVisualChange({ system: { attributes: { reliability: { value: 4 } } } }), false);
});
