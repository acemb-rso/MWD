import test from "node:test";
import assert from "node:assert/strict";

import {
  getSceneConditions,
  getTokenSceneConditions,
  getTokenShelter,
  SCENE_CONDITIONS,
} from "../src/modules/terrain/scene-conditions.js";
import { getMachinePilotingDiceModifier } from "../src/modules/mwd/machine-state-effects.js";

const inside = point => point.x >= 0 && point.x <= 200 && point.y >= 0 && point.y <= 200;

function scene({ conditions = {}, regions = [], surfaces = [] } = {}) {
  return { uuid: "Scene.s", grid: { size: 100 }, flags: { mwd: { sceneConditions: conditions } }, regions, getSurfaces: () => surfaces };
}

function tokenAt(parent, { x = 50, y = 50, elevation = 0 } = {}) {
  // Token document: 1x1 at (x - 50, y - 50) so its centre is (x, y).
  return { id: "t", x: x - 50, y: y - 50, width: 1, height: 1, elevation, parent };
}

function shelterRegion(type = "suppressWeather", { disabled = false } = {}) {
  return { behaviors: [{ type, disabled }], testPoint: inside };
}

function roof(elevation = 20) {
  return { elevation, move: true, sight: true, light: true, region: { polygonTree: { testPoint: inside } } };
}

function mech({ type = "battlemech", parent, statuses = [], mwd = {}, at = {} } = {}) {
  return { type, statuses: new Set(statuses), system: { mwd: { crits: [], locations: {}, ...mwd } }, token: tokenAt(parent, at) };
}

test("scene conditions read from flags; more severe or compound conditions replace their constituents", () => {
  const ids = s => getSceneConditions(s).map(item => item.id);
  assert.deepEqual(ids(scene()), []);
  assert.deepEqual(ids(scene({ conditions: { heavyRain: true, rain: true, lava: true, night: false } })), ["heavyRain"]);
  assert.deepEqual(ids(scene({ conditions: { blizzard: true, highWind: true, moderateWind: true, heavySnowfall: true } })), ["blizzard"]);
  assert.deepEqual(ids(scene({ conditions: ["dusk", "night"] })), ["night"]);
  assert.equal(SCENE_CONDITIONS.extremeHeat.kind, "ambient");
});

test("Suppress Weather Regions suppress weather and ambient; roofs suppress weather only; light is never suppressed", () => {
  const conditions = { night: true, heavyRain: true, extremeHeat: true };
  const ids = (s, at) => getTokenSceneConditions(tokenAt(s, at)).map(item => item.id);

  assert.deepEqual(ids(scene({ conditions })), ["night", "heavyRain", "extremeHeat"]);

  const sheltered = scene({ conditions, regions: [shelterRegion()] });
  assert.deepEqual([...getTokenShelter(tokenAt(sheltered))], ["suppressWeather"]);
  assert.deepEqual(ids(sheltered), ["night"]);
  assert.deepEqual(ids(sheltered, { x: 500, y: 500 }), ["night", "heavyRain", "extremeHeat"]);
  assert.deepEqual(ids(scene({ conditions, regions: [shelterRegion("suppressWeather", { disabled: true })] })), ["night", "heavyRain", "extremeHeat"]);

  const roofed = scene({ conditions, surfaces: [roof(20)] });
  assert.deepEqual(ids(roofed), ["night", "extremeHeat"]);
  // Standing on (or above) the roof is exposed.
  assert.deepEqual(ids(roofed, { elevation: 20 }), ["night", "heavyRain", "extremeHeat"]);
});

test("weather traction joins terrain traction (strongest applies); wind Handling hits hover and VTOL only", () => {
  const rain = scene({ conditions: { heavyRain: true } });
  assert.equal(getMachinePilotingDiceModifier(mech({ parent: rain })), -1);
  // Same traction group: rain and mud do not stack.
  assert.equal(getMachinePilotingDiceModifier(mech({ parent: rain, statuses: ["terrainMud"] })), -1);
  // Flight ignores ground traction.
  assert.equal(getMachinePilotingDiceModifier(mech({ type: "vehicle", parent: rain, mwd: { movementProfile: "vtol" } })), 0);
  // Sheltered from the rain.
  assert.equal(getMachinePilotingDiceModifier(mech({ parent: scene({ conditions: { heavyRain: true }, regions: [shelterRegion()] }) })), 0);

  const wind = scene({ conditions: { highWind: true } });
  assert.equal(getMachinePilotingDiceModifier(mech({ parent: wind })), 0);
  assert.equal(getMachinePilotingDiceModifier(mech({ type: "vehicle", parent: wind, mwd: { movementProfile: "vtol" } })), -1);
  // Independent groups combine: hover on ice in high wind.
  assert.equal(getMachinePilotingDiceModifier(mech({ type: "vehicle", parent: wind, statuses: ["terrainIce"], mwd: { movementProfile: "hover" } })), -2);
});

test("the combined environmental Handling penalty is capped at -2", () => {
  const storm = scene({ conditions: { highWind: true, heavyRain: true } });
  const hover = mech({ type: "vehicle", parent: storm, statuses: ["terrainDeepMud"], mwd: { movementProfile: "hover" } });
  // traction -2 (deep mud) + wind -1 = -3, capped.
  assert.equal(getMachinePilotingDiceModifier(hover), -2);
});
