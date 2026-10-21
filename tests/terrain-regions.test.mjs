import test from "node:test";
import assert from "node:assert/strict";

import {
  getTerrainStatusIds,
  normalizeRegionTerrain,
  TERRAIN_CLASSES,
} from "../src/modules/terrain/terrain-catalog.js";
import {
  collectTerrainRegionAreaStatusSources,
  getRegionTerrain,
  isTerrainRegion,
} from "../src/modules/terrain/terrain-regions.js";
import { getAffectedTokensForSource, normalizeAreaStatusSource, isAreaStatusSourceUsable } from "../src/modules/area-status/area-status-sources.js";
import { isTokenInRegion } from "../src/modules/utils/region.js";
import { getMachineMovementEffects, getMachinePilotingDnModifier, getMachinePilotingDiceModifier } from "../src/modules/mwd/machine-state-effects.js";
import { STATUS_MAP } from "../src/modules/roll/config/status-modifiers.js";
import { getDefaultStatusConditionCatalog } from "../src/modules/status/status-condition-catalog.js";

// Rectangle regions: testPoint is a simple bounds check.
function rectRegion({ id, name = "Region", x = 0, y = 0, w = 200, h = 200, terrain = null } = {}) {
  return {
    id,
    uuid: `Scene.s.Region.${id}`,
    name,
    flags: terrain ? { mwd: { terrain } } : {},
    testPoint: point => point.x >= x && point.x <= x + w && point.y >= y && point.y <= y + h,
  };
}

function token({ id, x, y, disposition = 1, type = "battlemech", statuses = [] } = {}) {
  const document = { id, uuid: `Scene.s.Token.${id}`, x, y, width: 1, height: 1, elevation: 0, disposition };
  return { id, document, center: { x, y }, actor: { uuid: `Actor.${id}`, type, statuses: new Set(statuses) } };
}

function machine({ type = "battlemech", statuses = [], mwd = {} } = {}) {
  return { type, statuses: new Set(statuses), system: { mwd: { crits: [], locations: {}, ...mwd } } };
}

test("authored terrain normalizes to a known class and known conditions", () => {
  assert.equal(normalizeRegionTerrain(null), null);
  assert.deepEqual(normalizeRegionTerrain({ terrainClass: "woodsHeavy", conditions: ["mud", "mud", "lava"] }), {
    terrainClass: "woodsHeavy",
    conditions: ["mud"],
  });
  assert.equal(normalizeRegionTerrain({ terrainClass: "moon-cheese" }).terrainClass, "open");
  assert.deepEqual(getTerrainStatusIds({ terrainClass: "woodsHeavy", conditions: ["mud"] }), ["terrainWoodsHeavy", "terrainMud"]);
});

test("every terrain status is registered and generated from the terrain catalog", () => {
  const registered = new Set(getDefaultStatusConditionCatalog().map(entry => entry.id));
  for (const statusId of getTerrainStatusIds({ terrainClass: "woodsHeavy", conditions: ["mud", "ice"] })) {
    assert.ok(registered.has(statusId), statusId);
    assert.ok(STATUS_MAP[statusId], statusId);
  }
  assert.deepEqual(STATUS_MAP.terrainWoodsHeavy.machineState.movement, [{
    id: "terrainWoodsHeavy.movement",
    movementPenaltySteps: TERRAIN_CLASSES.woodsHeavy.movementPenaltySteps,
  }]);
  assert.equal(STATUS_MAP.terrainWoodsHeavy.machineState.dice[0].selector, "pilotingDice");
  assert.equal(STATUS_MAP.terrainWoodsHeavy.machineState.dice[0].value, TERRAIN_CLASSES.woodsHeavy.pilotingDice);
  assert.deepEqual(STATUS_MAP.terrainRoad.roles, ["visualMarker"]);
});

test("occupied terrain slows machines and costs piloting dice (never DN), stacking base and conditions", () => {
  const inHeavyMud = machine({ statuses: ["terrainWoodsHeavy", "terrainMud"] });
  assert.equal(getMachineMovementEffects(inHeavyMud).movementPenalty, 90);
  assert.equal(getMachinePilotingDiceModifier(inHeavyMud), -2);
  // Environment modifies the dice pool; the task keeps its DN.
  assert.equal(getMachinePilotingDnModifier(inHeavyMud), 0);
  assert.equal(getMachineMovementEffects(machine({ statuses: ["terrainRoad"] })).movementPenalty, 0);
});

test("terrain Regions become region-kind area-status sources affecting every occupant", () => {
  const woods = rectRegion({ id: "woods", name: "Copse", terrain: { terrainClass: "woodsLight", conditions: ["mud"] } });
  const plain = rectRegion({ id: "plain" });
  const scene = { uuid: "Scene.s", regions: [woods, plain], tokens: [] };
  const inside = token({ id: "a", x: 50, y: 50, disposition: 1 });
  const insideEnemy = token({ id: "b", x: 150, y: 150, disposition: -1 });
  const outside = token({ id: "c", x: 500, y: 500 });
  scene.tokens = [inside.document, insideEnemy.document, outside.document];
  globalThis.canvas = { scene, tokens: { placeables: [inside, insideEnemy, outside] } };
  try {
    assert.equal(isTerrainRegion(woods), true);
    assert.equal(isTerrainRegion(plain), false);
    assert.equal(getRegionTerrain(plain), null);

    const sources = collectTerrainRegionAreaStatusSources(scene);
    assert.equal(sources.length, 1);
    const source = normalizeAreaStatusSource(sources[0]);
    assert.equal(source.kind, "region");
    assert.equal(source.allegiance, "any");
    assert.deepEqual(source.statusIds, ["terrainWoodsLight", "terrainMud"]);
    assert.equal(isAreaStatusSourceUsable(source), true);

    const affected = getAffectedTokensForSource(scene, source).map(entry => entry.id).sort();
    assert.deepEqual(affected, ["a", "b"]);
  } finally {
    delete globalThis.canvas;
  }
});

test("aura sources still need a radius; region sources need a Region", () => {
  assert.equal(isAreaStatusSourceUsable(normalizeAreaStatusSource({ radius: 0, statusIds: ["x"] })), false);
  assert.equal(isAreaStatusSourceUsable(normalizeAreaStatusSource({ kind: "region", statusIds: ["x"] })), false);
});

test("region membership prefers Foundry's tracked tokens and falls back to the centre point", () => {
  const tracked = token({ id: "t", x: 999, y: 999 });
  const region = rectRegion({ id: "r" });
  region.tokens = new Set([tracked.document]);
  assert.equal(isTokenInRegion(region, tracked), true);
  assert.equal(isTokenInRegion(region, token({ id: "in", x: 10, y: 10 })), true);
  assert.equal(isTokenInRegion(region, token({ id: "out", x: 900, y: 10 })), false);
  assert.equal(isTokenInRegion(null, tracked), false);
});

test("vehicles gain dice in favored terrain and lose them in adverse terrain; mechs are unaffected", () => {
  const wheeled = statuses => machine({ type: "vehicle", statuses, mwd: { movementProfile: "wheeled", favoredTerrain: ["road", "urban"], adverseTerrain: ["rough", "forest", "water"] } });
  assert.equal(getMachinePilotingDiceModifier(wheeled(["terrainRoad"])), 1);
  assert.equal(getMachinePilotingDiceModifier(wheeled(["terrainWoodsLight"])), -1);
  assert.equal(getMachinePilotingDiceModifier(wheeled(["terrainOpen"])), 0);
  // Profile defaults apply when the vehicle has no authored preference lists:
  // hover favors water (+1), which offsets water's own piloting penalty (-1).
  assert.equal(getMachinePilotingDiceModifier(machine({ type: "vehicle", statuses: ["terrainWater"], mwd: { movementProfile: "hover" } })), 0);
  assert.equal(getMachinePilotingDiceModifier(machine({ type: "vehicle", statuses: ["terrainWater"], mwd: { movementProfile: "tracked" } })), -2);
  assert.equal(getMachinePilotingDiceModifier(machine({ type: "battlemech", statuses: ["terrainRoad"] })), 0);
});
