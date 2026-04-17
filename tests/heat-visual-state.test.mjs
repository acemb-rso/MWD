import test from "node:test";
import assert from "node:assert/strict";

import { buildBattlemechHeatVisualState } from "../src/modules/mwd/heat-visual-state.js";

function createHeatModel(overrides = {}) {
  return {
    current: 0,
    thresholds: {
      runningHot: 3,
      overheated: 5,
      shutdown: 7,
    },
    penalties: {
      dangerLevel: 0,
    },
    ...overrides,
  };
}

test("safe heat yields no active visual effect", () => {
  const state = buildBattlemechHeatVisualState(createHeatModel({ current: 2 }));

  assert.equal(state.active, false);
  assert.equal(state.band, "safe");
  assert.equal(state.glow, 0);
  assert.equal(state.shimmer, 0);
  assert.equal(state.blur, 0);
});

test("hot, overheat, and danger bands increase intensity monotonically", () => {
  const hot = buildBattlemechHeatVisualState(createHeatModel({ current: 3 }));
  const overheat = buildBattlemechHeatVisualState(createHeatModel({ current: 5 }));
  const danger = buildBattlemechHeatVisualState(createHeatModel({ current: 7, penalties: { dangerLevel: 1 } }));

  assert.equal(hot.band, "hot");
  assert.equal(overheat.band, "overheat");
  assert.equal(danger.band, "danger");
  assert.ok(overheat.warmth > hot.warmth);
  assert.ok(overheat.glow > hot.glow);
  assert.ok(danger.glow > overheat.glow);
  assert.ok(danger.shimmer > overheat.shimmer);
});

test("normalization saturates at the danger threshold", () => {
  const atDanger = buildBattlemechHeatVisualState(createHeatModel({
    current: 7,
    penalties: { dangerLevel: 1 },
  }));
  const aboveDanger = buildBattlemechHeatVisualState(createHeatModel({
    current: 12,
    penalties: { dangerLevel: 6 },
  }));

  assert.equal(atDanger.normalized, 1);
  assert.equal(aboveDanger.normalized, 1);
});

test("extra danger levels raise pulse and shimmer without changing normalized cap", () => {
  const firstDanger = buildBattlemechHeatVisualState(createHeatModel({
    current: 7,
    penalties: { dangerLevel: 1 },
  }));
  const deeperDanger = buildBattlemechHeatVisualState(createHeatModel({
    current: 10,
    penalties: { dangerLevel: 4 },
  }));

  assert.equal(deeperDanger.normalized, 1);
  assert.ok(deeperDanger.pulseAmplitude > firstDanger.pulseAmplitude);
  assert.ok(deeperDanger.shimmer > firstDanger.shimmer);
  assert.ok(deeperDanger.blur >= firstDanger.blur);
});

test("pending heat does not affect the visual mapping", () => {
  const state = buildBattlemechHeatVisualState({
    current: 4,
    pendingGenerated: 99,
    thresholds: {
      runningHot: 3,
      overheated: 5,
      shutdown: 7,
    },
    penalties: {
      dangerLevel: 0,
    },
  });

  assert.equal(state.band, "hot");
  assert.equal(state.heat, 4);
  assert.ok(state.normalized < 1);
});
