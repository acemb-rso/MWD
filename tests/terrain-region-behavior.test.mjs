import test from "node:test";
import assert from "node:assert/strict";

import {
  isTerrainBehaviorType,
  registerTerrainRegionBehavior,
  resolveTerrainBehaviorTypeKey,
} from "../src/modules/terrain/terrain-region-behavior.js";
import { getRegionTerrain } from "../src/modules/terrain/terrain-regions.js";

function stubFoundry({ types = ["adjustDarknessLevel", "mwd.terrain"], throwsOnSchema = false } = {}) {
  class Field { constructor(...args) { this.args = args; } }
  class RegionBehaviorType {
    static _createEventsField(options) { return { eventsField: options }; }
  }
  const previous = { foundry: globalThis.foundry, CONFIG: globalThis.CONFIG };
  globalThis.foundry = {
    ...(previous.foundry ?? {}),
    data: {
      regionBehaviors: { RegionBehaviorType },
      fields: {
        StringField: throwsOnSchema ? class { constructor() { throw new Error("boom"); } } : Field,
        SetField: Field,
      },
    },
    documents: { BaseRegionBehavior: { TYPES: types } },
  };
  globalThis.CONFIG = { RegionBehavior: { dataModels: {} } };
  return () => {
    if (previous.foundry === undefined) delete globalThis.foundry; else globalThis.foundry = previous.foundry;
    if (previous.CONFIG === undefined) delete globalThis.CONFIG; else globalThis.CONFIG = previous.CONFIG;
  };
}

test("the behavior type key is whichever one Foundry generated", () => {
  assert.equal(resolveTerrainBehaviorTypeKey(["base", "mwd.terrain"]), "mwd.terrain");
  assert.equal(resolveTerrainBehaviorTypeKey(["terrain"]), "terrain");
  assert.equal(resolveTerrainBehaviorTypeKey(["base"]), null);
  assert.equal(isTerrainBehaviorType("mwd.terrain"), true);
  assert.equal(isTerrainBehaviorType("terrain"), true);
  assert.equal(isTerrainBehaviorType("adjustDarknessLevel"), false);
});

test("registration installs the data model, label, and icon under the generated key", () => {
  const restore = stubFoundry();
  try {
    assert.equal(registerTerrainRegionBehavior(), "mwd.terrain");
    const model = globalThis.CONFIG.RegionBehavior.dataModels["mwd.terrain"];
    const schema = model.defineSchema();
    assert.deepEqual(Object.keys(schema), ["events", "terrainClass", "conditions"]);
    assert.equal(schema.terrainClass.args[0].choices.woodsHeavy, "Heavy Woods");
    assert.equal(schema.terrainClass.args[0].initial, "open");
    assert.equal(schema.conditions.args[0].args[0].choices.mud, "Mud");
    assert.equal(globalThis.CONFIG.RegionBehavior.typeLabels["mwd.terrain"], "Terrain (MWD)");
  } finally {
    restore();
  }
});

test("registration never throws: missing API or undeclared type return null; schema errors stay out of startup", () => {
  const silence = console.warn;
  const silenceError = console.error;
  console.warn = () => {};
  console.error = () => {};
  try {
    assert.equal(registerTerrainRegionBehavior(), null);

    let restore = stubFoundry({ types: ["base"] });
    try { assert.equal(registerTerrainRegionBehavior(), null); } finally { restore(); }

    restore = stubFoundry({ throwsOnSchema: true });
    try {
      const key = registerTerrainRegionBehavior();
      // The schema is built lazily by Foundry; building it here must surface the error, not startup.
      assert.equal(key, "mwd.terrain");
      assert.throws(() => globalThis.CONFIG.RegionBehavior.dataModels[key].defineSchema(), /boom/);
    } finally { restore(); }
  } finally {
    console.warn = silence;
    console.error = silenceError;
  }
});

test("an enabled Terrain behavior is the terrain source; disabled ones fall back to the flag", () => {
  const behavior = (disabled = false) => ({ type: "mwd.terrain", disabled, system: { terrainClass: "jungle", conditions: new Set(["mud"]) } });
  assert.deepEqual(getRegionTerrain({ behaviors: [behavior()] }), { terrainClass: "jungle", conditions: ["mud"] });
  assert.deepEqual(
    getRegionTerrain({ behaviors: [behavior(true)], flags: { mwd: { terrain: { terrainClass: "rough" } } } }),
    { terrainClass: "rough", conditions: [] },
  );
  assert.equal(getRegionTerrain({ behaviors: [behavior(true)] }), null);
  assert.equal(getRegionTerrain({ behaviors: [{ type: "adjustDarknessLevel", system: {} }] }), null);
});
