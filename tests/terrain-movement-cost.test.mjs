import test from "node:test";
import assert from "node:assert/strict";

import { TERRAIN_CLASSES, TERRAIN_CONDITIONS } from "../src/modules/terrain/terrain-catalog.js";
import {
  getTerrainMovementContributions,
  getTerrainSegmentCost,
  resolveTerrainMovementCost,
} from "../src/modules/terrain/terrain-mobility.js";
import { getTerrainBehaviorEffects } from "../src/modules/terrain/terrain-region-behavior.js";
import { getMovementCostBand } from "../src/modules/terrain/terrain-movement-cost.js";

const T = TERRAIN_CLASSES;
const C = TERRAIN_CONDITIONS;
const vehicle = movementProfile => ({ type: "vehicle", system: { mwd: { movementProfile } } });
// An actor with no terrain mobility finds every terrain normal.
const normal = { type: "character" };
const cost = (actor, entries, options) => resolveTerrainMovementCost(getTerrainMovementContributions(actor, entries, options)).multiplier;

test("terrain costs x1 clear, x2 difficult, x3 severe", () => {
  assert.equal(cost(normal, [T.open]), 1);
  assert.equal(cost(normal, [T.rough]), 2);
  assert.equal(cost(normal, [T.woodsLight]), 2);
  assert.equal(cost(normal, [T.woodsHeavy]), 3);
  assert.equal(cost(normal, [T.jungle]), 3);
  assert.equal(cost(normal, [C.deepMud]), 3);
});

test("a terrain class and conditions add excess costs (M = 1 + sum of excess), never multiply", () => {
  assert.equal(cost(normal, [T.rough, C.mud]), 3);
  assert.equal(cost(normal, [T.woodsHeavy, C.mud]), 4);
  assert.equal(cost(normal, [T.woodsHeavy, C.deepMud]), 5);
  assert.equal(cost(normal, [T.woodsLight, C.rubble]), 3);
});

test("overlapping equivalent Regions count once; one base terrain per location; Deep Mud replaces Mud", () => {
  const heavy = getTerrainMovementContributions(normal, [T.woodsHeavy]);
  assert.equal(resolveTerrainMovementCost([...heavy, ...heavy]).multiplier, 3);
  // Two different base terrains overlapping: the more costly applies.
  assert.equal(cost(normal, [T.rough, T.woodsHeavy]), 3);
  assert.equal(cost(normal, [T.open, C.mud, C.deepMud]), 3);
});

test("mobility: favored ignores that terrain's excess, adverse adds 1, restricted is impassable", () => {
  // Wheeled favors open, finds rough adverse, cannot enter heavy woods.
  assert.equal(cost(vehicle("wheeled"), [T.open]), 1);
  assert.equal(cost(vehicle("wheeled"), [T.rough]), 3);
  assert.equal(cost(vehicle("wheeled"), [T.woodsHeavy]), Infinity);
  // Favored applies per contribution: hover favors swamp, but mud still costs.
  assert.equal(cost(vehicle("hover"), [C.swamp]), 1);
  assert.equal(cost(vehicle("hover"), [T.open, C.mud]), 2);
  // BattleMechs (walker) find heavy woods adverse.
  assert.equal(cost({ type: "battlemech" }, [T.woodsHeavy]), 4);
  assert.equal(cost({ type: "battlemech" }, [T.woodsHeavy, C.mud]), 5);
});

test("flight and non-ground movement actions pay no ground terrain cost", () => {
  assert.deepEqual(getTerrainMovementContributions(vehicle("vtol"), [T.woodsHeavy]), []);
  assert.deepEqual(getTerrainMovementContributions({ type: "battlemech" }, [T.woodsHeavy], { action: "jump" }), []);
  assert.deepEqual(getTerrainMovementContributions({ type: "battlemech" }, [T.woodsHeavy], { action: "fly" }), []);
  assert.equal(cost({ type: "battlemech" }, [T.woodsHeavy], { action: "walk" }), 4);
});

test("Careful doubles the cost of hazardous stretches after composition; Reckless pays the normal cost", () => {
  const heavyMud = resolveTerrainMovementCost(getTerrainMovementContributions(normal, [T.woodsHeavy, C.mud]));
  assert.deepEqual(heavyMud, { multiplier: 4, hazardous: true });
  assert.equal(getTerrainSegmentCost(10, heavyMud), 40);
  assert.equal(getTerrainSegmentCost(10, heavyMud, { careful: true }), 80);
  // Non-hazardous terrain is not slowed by Careful.
  const woods = resolveTerrainMovementCost(getTerrainMovementContributions(normal, [T.woodsHeavy]));
  assert.equal(getTerrainSegmentCost(10, woods, { careful: true }), 30);
  assert.equal(getTerrainSegmentCost(10, null, { careful: true }), 10);
});

test("Foundry difficulty from other behaviors composes additively; null difficulty is impassable", () => {
  const rough = getTerrainMovementContributions(normal, [T.rough]);
  assert.equal(resolveTerrainMovementCost(rough, { extraExcess: [1] }).multiplier, 3);
  assert.equal(resolveTerrainMovementCost([], { extraExcess: [Infinity] }).multiplier, Infinity);
});

test("the Terrain behavior emits mwdTerrain effects for the moving token", () => {
  const effects = getTerrainBehaviorEffects({ terrainClass: "woodsHeavy", conditions: new Set(["mud"]) }, { actor: normal }, { action: "walk" });
  assert.deepEqual(effects.map(effect => [effect.name, effect.terrainId, effect.excess]), [
    ["mwdTerrain", "woodsHeavy", 2],
    ["mwdTerrain", "mud", 1],
  ]);
  assert.deepEqual(getTerrainBehaviorEffects({ terrainClass: "woodsHeavy", conditions: [] }, { actor: vehicle("vtol") }, { action: "fly" }), []);
});

test("ruler bands: within the first allowance, within the largest, over, impassable", () => {
  const bands = [60, 120, 180];
  assert.equal(getMovementCostBand(50, bands), "withinFirst");
  assert.equal(getMovementCostBand(150, bands), "withinMax");
  assert.equal(getMovementCostBand(200, bands), "over");
  assert.equal(getMovementCostBand(Infinity, bands), "impassable");
  assert.equal(getMovementCostBand(50, []), null);
});
