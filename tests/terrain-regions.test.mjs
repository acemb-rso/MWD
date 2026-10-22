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
import { getActorTerrainMobility, isGroundTerrainExempt } from "../src/modules/terrain/terrain-mobility.js";
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
  // Movement is a path cost and dice are computed from mobility, so terrain
  // statuses are occupancy markers only.
  assert.deepEqual(STATUS_MAP.terrainWoodsHeavy.roles, ["visualMarker"]);
  assert.equal(STATUS_MAP.terrainWoodsHeavy.machineState, undefined);
  assert.deepEqual(STATUS_MAP.terrainRoad.roles, ["visualMarker"]);
  assert.deepEqual(STATUS_MAP.terrainIce.roles, ["visualMarker"]);
});

test("occupied terrain costs piloting dice (never DN) but no longer reduces speed; traction penalties do not stack", () => {
  const inHeavyMud = machine({ statuses: ["terrainWoodsHeavy", "terrainMud"] });
  // Movement is priced along the path (movement cost), not taken off speed.
  assert.equal(getMachineMovementEffects(inHeavyMud).movementPenalty, 0);
  // Heavy woods and mud are both traction: the strongest penalty applies.
  assert.equal(getMachinePilotingDiceModifier(inHeavyMud), -1);
  // Environment modifies the dice pool; the task keeps its DN.
  assert.equal(getMachinePilotingDnModifier(inHeavyMud), 0);
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
    assert.equal(source.groundOnly, true);
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

test("the mobility matrix sets terrain dice: favored replaces the penalty, adverse takes the stronger", () => {
  const vehicle = (movementProfile, statuses) => machine({ type: "vehicle", statuses, mwd: { movementProfile } });
  assert.equal(getMachinePilotingDiceModifier(vehicle("wheeled", ["terrainRoad"])), 1);
  assert.equal(getMachinePilotingDiceModifier(vehicle("wheeled", ["terrainRough"])), -1);
  assert.equal(getMachinePilotingDiceModifier(vehicle("wheeled", ["terrainWoodsLight"])), 0);
  // Restricted counts as adverse for dice until capabilities are modeled.
  assert.equal(getMachinePilotingDiceModifier(vehicle("wheeled", ["terrainWoodsHeavy"])), -1);
  // Favored terrain bonus offsets a condition's traction penalty once.
  assert.equal(getMachinePilotingDiceModifier(vehicle("wheeled", ["terrainOpen", "terrainMud"])), 0);
  assert.equal(getMachinePilotingDiceModifier(vehicle("hover", ["terrainWater"])), 1);
  assert.equal(getMachinePilotingDiceModifier(vehicle("tracked", ["terrainWater"])), -1);
  // Sand slows wheels and tracks only.
  assert.equal(getMachinePilotingDiceModifier(vehicle("tracked", ["terrainSand"])), -1);
  assert.equal(getMachinePilotingDiceModifier(vehicle("hover", ["terrainSand"])), 0);
  assert.equal(getMachinePilotingDiceModifier(machine({ type: "battlemech", statuses: ["terrainRoad"] })), 0);
  assert.equal(getMachinePilotingDiceModifier(machine({ type: "battlemech", statuses: ["terrainSwamp"] })), -1);
});

test("Deep Mud replaces Mud rather than stacking with it", () => {
  assert.deepEqual(normalizeRegionTerrain({ terrainClass: "open", conditions: ["mud", "deepMud"] }).conditions, ["deepMud"]);
  // Overlapping Regions can still project both statuses: Deep Mud's dice apply.
  const both = machine({ statuses: ["terrainMud", "terrainDeepMud"] });
  assert.equal(getMachinePilotingDiceModifier(both), -2);
});

test("flight mobility ignores ground terrain", () => {
  const vtol = machine({ type: "vehicle", statuses: ["terrainWoodsHeavy", "terrainMud"], mwd: { movementProfile: "vtol" } });
  assert.equal(getActorTerrainMobility(vtol), "flight");
  assert.equal(isGroundTerrainExempt(vtol), true);
  assert.equal(getMachinePilotingDiceModifier(vtol), 0);
  assert.equal(getActorTerrainMobility(machine({ type: "battlemech" })), "walker");
  assert.equal(isGroundTerrainExempt(machine({ type: "vehicle", mwd: { movementProfile: "hover" } })), false);
  assert.equal(getActorTerrainMobility({ type: "character" }), null);
});
