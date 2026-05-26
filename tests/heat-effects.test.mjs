import test from "node:test";
import assert from "node:assert/strict";

import {
  computeHeatBandLevels,
  computeHeatPenalties,
  computeDangerCheckParams,
  hasVolatileComponents,
  resolveEndOfActivationHeat,
} from "../src/modules/mwd/heat-effects.js";

// Shared thresholds used across tests: Safe 0-2, Hot 3-4, Overheat 5-6, Danger 7+
const T = { runningHot: 3, overheated: 5, shutdown: 7 };

// ─── computeHeatBandLevels ────────────────────────────────────────────────────

test("band levels: heat 0 is fully safe", () => {
  const r = computeHeatBandLevels(0, T);
  assert.equal(r.levelsInHot, 0);
  assert.equal(r.levelsInOverheat, 0);
  assert.equal(r.levelsInDanger, 0);
});

test("band levels: heat 2 is still safe", () => {
  const r = computeHeatBandLevels(2, T);
  assert.equal(r.levelsInHot, 0);
  assert.equal(r.levelsInOverheat, 0);
  assert.equal(r.levelsInDanger, 0);
});

test("band levels: heat 3 is 1 level into Hot", () => {
  const r = computeHeatBandLevels(3, T);
  assert.equal(r.levelsInHot, 1);
  assert.equal(r.levelsInOverheat, 0);
  assert.equal(r.levelsInDanger, 0);
});

test("band levels: heat 4 is 2 levels into Hot", () => {
  const r = computeHeatBandLevels(4, T);
  assert.equal(r.levelsInHot, 2);
  assert.equal(r.levelsInOverheat, 0);
  assert.equal(r.levelsInDanger, 0);
});

test("band levels: heat 5 is 2 levels into Hot (capped), 1 into Overheat", () => {
  const r = computeHeatBandLevels(5, T);
  assert.equal(r.levelsInHot, 2);
  assert.equal(r.levelsInOverheat, 1);
  assert.equal(r.levelsInDanger, 0);
});

test("band levels: heat 6 is 2 levels into both Hot and Overheat", () => {
  const r = computeHeatBandLevels(6, T);
  assert.equal(r.levelsInHot, 2);
  assert.equal(r.levelsInOverheat, 2);
  assert.equal(r.levelsInDanger, 0);
});

test("band levels: heat 7 is 1 level into Danger", () => {
  const r = computeHeatBandLevels(7, T);
  assert.equal(r.levelsInHot, 2);
  assert.equal(r.levelsInOverheat, 2);
  assert.equal(r.levelsInDanger, 1);
});

test("band levels: heat 10 is 4 levels into Danger", () => {
  const r = computeHeatBandLevels(10, T);
  assert.equal(r.levelsInDanger, 4);
});

// ─── computeHeatPenalties ────────────────────────────────────────────────────

test("penalties: safe heat has no penalties", () => {
  const p = computeHeatPenalties(2, T);
  assert.equal(p.movementPenalty, 0);
  assert.equal(p.rangedDicePenalty, 0);
  assert.equal(p.dangerLevel, 0);
});

test("penalties: heat 4 imposes movement penalty only", () => {
  const p = computeHeatPenalties(4, T);
  assert.equal(p.movementPenalty, 60);
  assert.equal(p.rangedDicePenalty, 0);
  assert.equal(p.dangerLevel, 0);
});

test("penalties: heat 6 imposes both movement and ranged penalties", () => {
  const p = computeHeatPenalties(6, T);
  assert.equal(p.movementPenalty, 60);
  assert.equal(p.rangedDicePenalty, 2);
  assert.equal(p.dangerLevel, 0);
});

test("penalties: heat 8 is 2 levels of danger", () => {
  const p = computeHeatPenalties(8, T);
  assert.equal(p.movementPenalty, 60);
  assert.equal(p.rangedDicePenalty, 2);
  assert.equal(p.dangerLevel, 2);
});

// ─── resolveEndOfActivationHeat (FILO) ───────────────────────────────────────

test("FILO: generated heat below dissipation reduces existing heat", () => {
  // current=4, generated=1, dissipation=3 → 4+1-3=2
  assert.equal(resolveEndOfActivationHeat(4, 1, 3, 10), 2);
});

test("FILO: dissipation exceeding total stack floors at 0", () => {
  // current=2, generated=1, dissipation=5 → clamp(2+1-5, 0, 10)=0
  assert.equal(resolveEndOfActivationHeat(2, 1, 5, 10), 0);
});

test("FILO: heat result is open-ended above the display track", () => {
  assert.equal(resolveEndOfActivationHeat(8, 5, 1, 10), 12);
});

test("FILO: net zero generation with matching dissipation", () => {
  // current=3, generated=2, dissipation=2 → stays at 3
  assert.equal(resolveEndOfActivationHeat(3, 2, 2, 10), 3);
});

test("FILO: pure cool-down turn (no generation)", () => {
  // current=5, generated=0, dissipation=2 → 5+0-2=3
  assert.equal(resolveEndOfActivationHeat(5, 0, 2, 10), 3);
});

// ─── computeDangerCheckParams ─────────────────────────────────────────────────

test("danger checks: 1 level uses correct pools and DNs", () => {
  const p = computeDangerCheckParams(1, 4, 3);
  assert.equal(p.shutdownDN, 1);
  assert.equal(p.shutdownPool, 7);      // chassis + reliability
  assert.equal(p.explosionDN, 1);
  assert.equal(p.explosionPool, 6);     // 7 - 1 level
});

test("danger checks: 3 levels reduces explosion pool by 3", () => {
  const p = computeDangerCheckParams(3, 4, 3);
  assert.equal(p.shutdownDN, 3);
  assert.equal(p.shutdownPool, 7);
  assert.equal(p.explosionPool, 4);     // 7 - 3 levels
});

test("danger checks: explosion pool floors at 1 when dangerLevel exceeds pool", () => {
  const p = computeDangerCheckParams(10, 2, 2);
  assert.equal(p.explosionPool, 1);
});

// ─── hasVolatileComponents ────────────────────────────────────────────────────

test("volatile: torso with ammoStore tag is volatile", () => {
  const locations = {
    torso: { enabled: true, destroyed: false, tags: ["weaponGroup", "engine", "ammoStore"] },
    legs: { enabled: true, destroyed: false, tags: ["motiveSystem"] },
  };
  assert.equal(hasVolatileComponents(locations), true);
});

test("volatile: destroyed ammoStore location is not volatile", () => {
  const locations = {
    torso: { enabled: true, destroyed: true, tags: ["weaponGroup", "engine", "ammoStore"] },
  };
  assert.equal(hasVolatileComponents(locations), false);
});

test("volatile: disabled ammoStore location is not volatile", () => {
  const locations = {
    torso: { enabled: false, destroyed: false, tags: ["ammoStore"] },
  };
  assert.equal(hasVolatileComponents(locations), false);
});

test("volatile: no ammoStore tags means no volatile components", () => {
  const locations = {
    head: { enabled: true, destroyed: false, tags: ["cockpit", "sensor"] },
    legs: { enabled: true, destroyed: false, tags: ["motiveSystem"] },
  };
  assert.equal(hasVolatileComponents(locations), false);
});
