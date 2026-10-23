import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  CURRENT_SCHEMA_VERSION,
  SCHEMA_MIGRATIONS,
  classifyMachineMonitorStorage,
  getPendingSchemaSteps,
  planGutsRename,
  planSchemaStep,
} from "../src/modules/system/migration/schema-migrations.js";

const FIXTURE_URL = new URL("./fixtures/world-dev-pre-schema1.json", import.meta.url);
const loadFixture = () => JSON.parse(readFileSync(FIXTURE_URL, "utf8"));
const baseline = SCHEMA_MIGRATIONS.find(step => step.version === 1);
const vehicleTerrainLists = SCHEMA_MIGRATIONS.find(step => step.version === 2);

function setPath(target, path, value) {
  const parts = path.split(".");
  let cursor = target;
  while (parts.length > 1) {
    const key = parts.shift();
    cursor[key] ??= {};
    cursor = cursor[key];
  }
  cursor[parts[0]] = value;
}

function unsetPath(target, path) {
  const parts = path.split(".");
  const leaf = parts.pop();
  const parent = parts.reduce((cursor, key) => cursor?.[key], target);
  if (parent) delete parent[leaf];
}

// Minimal in-memory stand-in for the runner's document writes.
function applyOperations(world, operations) {
  for (const op of operations) {
    let doc;
    if (op.kind === "actor") doc = world.actors.find(actor => actor._id === op.actorId);
    if (op.kind === "actorItem") doc = world.actors.find(actor => actor._id === op.actorId)?.items.find(item => item._id === op.itemId);
    if (op.kind === "worldItem") doc = world.items.find(item => item._id === op.itemId);
    if (op.kind === "token") doc = world.scenes.find(scene => scene._id === op.sceneId)?.tokens.find(token => token._id === op.tokenId);
    assert.ok(doc, `operation target exists: ${op.label}`);
    for (const [path, value] of Object.entries(op.set)) setPath(doc, path, structuredClone(value));
    for (const path of op.unset) unsetPath(doc, path);
  }
}

const machine = (overrides = {}) => ({
  _id: "m1",
  name: "Mech",
  type: "battlemech",
  flags: {},
  system: { monitors: { armor: { value: 0, max: 30 }, structure: { value: 0, max: 20 } }, mwd: { hardpoints: [] } },
  items: [],
  ...overrides,
});

test("schema version registry is ordered and gates unsupported versions", () => {
  assert.equal(CURRENT_SCHEMA_VERSION, SCHEMA_MIGRATIONS.at(-1).version);
  assert.deepEqual(getPendingSchemaSteps(0).map(step => step.version), [1, 2]);
  assert.deepEqual(getPendingSchemaSteps(1).map(step => step.version), [2]);
  assert.deepEqual(getPendingSchemaSteps(CURRENT_SCHEMA_VERSION), []);
  assert.throws(() => getPendingSchemaSteps(CURRENT_SCHEMA_VERSION + 1), /newer than this system supports/);
  assert.throws(() => getPendingSchemaSteps(-1), /Unsupported/);
  assert.throws(() => getPendingSchemaSteps("1.2"), /Unsupported/);
});

test("machine monitor storage classification never guesses partial values", () => {
  const monitors = (armor, structure) => ({ armor: { value: armor, max: 30 }, structure: { value: structure, max: 20 } });
  assert.deepEqual(classifyMachineMonitorStorage(monitors(0, 0)), { state: "legacyUndamaged", values: { armor: 30, structure: 20 } });
  assert.equal(classifyMachineMonitorStorage(monitors(30, 20)).state, "remaining");
  assert.equal(classifyMachineMonitorStorage(monitors(12, 20)).state, "ambiguous");
  assert.equal(classifyMachineMonitorStorage({}).state, "empty");
  // Token deltas carry values without max; the base actor supplies it.
  assert.deepEqual(
    classifyMachineMonitorStorage({ armor: { value: 0 } }, monitors(5, 5)),
    { state: "legacyUndamaged", values: { armor: 30 } },
  );
});

test("unflagged machines convert, flagged machines are untouched, partial ones are reviewed", () => {
  const world = {
    actors: [
      machine(),
      machine({ _id: "m2", flags: { mwd: { machineMonitorStorage: "remaining-v1" } } }),
      machine({ _id: "m3", name: "Hurt", system: { monitors: { armor: { value: 12, max: 30 }, structure: { value: 3, max: 20 } } } }),
    ],
  };
  const plan = planSchemaStep(baseline, world);
  assert.deepEqual(plan.operations, [{
    kind: "actor",
    actorId: "m1",
    label: "Mech",
    set: {
      "flags.mwd.machineMonitorStorage": "remaining-v1",
      "system.monitors.armor.value": 30,
      "system.monitors.structure.value": 20,
    },
    unset: [],
  }]);
  assert.equal(plan.reviews.length, 1);
  assert.match(plan.reviews[0].message, /Partially damaged/);
});

test("unlinked token deltas of legacy machines convert with the base actor max", () => {
  const world = {
    actors: [machine()],
    scenes: [{ _id: "s1", name: "Field", tokens: [
      { _id: "t1", name: "Mech", actorId: "m1", actorLink: false, delta: { system: { monitors: { armor: { value: 0 } } } } },
      { _id: "t2", name: "Linked", actorId: "m1", actorLink: true, delta: {} },
    ] }],
  };
  const tokenOps = planSchemaStep(baseline, world).operations.filter(op => op.kind === "token");
  assert.deepEqual(tokenOps.map(op => op.set), [{ "delta.system.monitors.armor.value": 30 }]);
});

test("Guts rename copies Willpower over a default Guts and refuses real conflicts", () => {
  assert.deepEqual(planGutsRename({ willpower: { value: 5 }, guts: { value: 1 } }), {
    set: { guts: { value: 5 } }, unset: ["willpower"], conflict: null,
  });
  assert.deepEqual(planGutsRename({ willpower: { value: 3 } }).set, { guts: { value: 3 } });
  assert.deepEqual(planGutsRename({ willpower: { value: 4 }, guts: { value: 4 } }).unset, ["willpower"]);
  const conflict = planGutsRename({ willpower: { value: 5 }, guts: { value: 3 } });
  assert.deepEqual([conflict.set, conflict.unset], [{}, []]);
  assert.match(conflict.conflict, /both hold non-default values/);
  assert.deepEqual(planGutsRename({ guts: { value: 2 } }), { set: {}, unset: [], conflict: null });
});

test("Willpower skills move to Guts on actors and in the world", () => {
  const world = {
    actors: [{ _id: "c1", name: "Pilot", type: "character", system: { attributes: {} }, items: [
      { _id: "s1", name: "Composure", type: "skill", system: { attribute: "willpower" } },
      { _id: "s2", name: "Gunnery", type: "skill", system: { attribute: "reflexes" } },
    ] }],
    items: [{ _id: "w1", name: "Resolve", type: "skill", system: { attribute: "willpower" } }],
  };
  const ops = planSchemaStep(baseline, world).operations;
  assert.deepEqual(ops.map(op => [op.kind, op.itemId, op.set]), [
    ["actorItem", "s1", { "system.attribute": "guts" }],
    ["worldItem", "w1", { "system.attribute": "guts" }],
  ]);
});

test("legacy mech-weapon hardpoint ids link to their hardpoint before the fields are removed", () => {
  const world = {
    actors: [machine({
      flags: { mwd: { machineMonitorStorage: "remaining-v1" } },
      system: { monitors: {}, mwd: { hardpoints: [{ id: "hp1", itemId: "" }] } },
      items: [
        { _id: "w1", name: "PPC", type: "mechWeapon", system: { hardpointId: "hp1", hardpointSize: "large", size: "large" } },
        { _id: "w2", name: "Lost", type: "mechWeapon", system: { hardpointId: "gone" } },
      ],
    })],
  };
  const plan = planSchemaStep(baseline, world);
  const hardpointOp = plan.operations.find(op => op.kind === "actor");
  assert.deepEqual(hardpointOp.set["system.mwd.hardpoints"], [{ id: "hp1", itemId: "w1" }]);
  assert.deepEqual(
    plan.operations.filter(op => op.kind === "actorItem").map(op => op.unset),
    [["system.hardpointId", "system.hardpointSize"], ["system.hardpointId"]],
  );
  assert.match(plan.reviews[0].message, /no longer exists/);
});

test("legacy armor mitigation converts to typed mitigation without overwriting typed data", () => {
  const world = {
    items: [
      { _id: "a1", name: "Vest", type: "armor", system: { mitigation: { ballistic: 2, explosive: 1 } } },
      { _id: "a2", name: "Plate", type: "armor", system: { mitigation: { ballistic: 9 }, mitigationByType: { penetrating: 3 } } },
    ],
  };
  const [vest, plate] = planSchemaStep(baseline, world).operations;
  assert.equal(vest.set["system.mitigationByType"].penetrating, 2);
  assert.equal(vest.set["system.mitigationByType"].concussive, 1);
  assert.deepEqual(vest.unset, ["system.mitigation"]);
  assert.deepEqual(plate.set, {});
  assert.deepEqual(plate.unset, ["system.mitigation"]);
});

test("dev-world fixture: baseline upgrade applies the expected changes and is idempotent", () => {
  const world = loadFixture();
  const plan = planSchemaStep(baseline, world);

  const monitorOps = plan.operations.filter(op => op.kind === "actor" && "flags.mwd.machineMonitorStorage" in op.set);
  assert.equal(monitorOps.length, 42);
  assert.ok(monitorOps.every(op => "system.monitors.armor.value" in op.set && "system.monitors.structure.value" in op.set));
  const stumbles = plan.operations.find(op => op.label === "Stumbles");
  assert.deepEqual(stumbles.set, { "system.attributes.guts": { value: 5 } });
  assert.deepEqual(stumbles.unset, ["system.attributes.willpower"]);
  assert.equal(plan.operations.filter(op => op.unset.includes("system.mountLocation")).length, 9);
  assert.deepEqual(plan.reviews, []);

  applyOperations(world, plan.operations);
  const converted = world.actors.find(actor => actor._id === monitorOps[0].actorId);
  assert.equal(converted.system.monitors.armor.value, converted.system.monitors.armor.max);
  const pilot = world.actors.find(actor => actor.name === "Stumbles");
  assert.equal(pilot.system.attributes.guts.value, 5);
  assert.equal("willpower" in pilot.system.attributes, false);

  const replan = planSchemaStep(baseline, world);
  assert.deepEqual(replan.operations, []);
  assert.deepEqual(replan.reviews, []);
});

test("schema 2 removes vehicle favored/adverse terrain lists from actors and unlinked token deltas", () => {
  const world = {
    actors: [
      { _id: "v1", name: "Tank", type: "vehicle", system: { mwd: { movementProfile: "tracked", favoredTerrain: ["open"], adverseTerrain: ["water"] } }, items: [] },
      { _id: "v2", name: "Hover", type: "vehicle", system: { mwd: { movementProfile: "hover" } }, items: [] },
      { _id: "m1", name: "Mech", type: "battlemech", system: { mwd: { favoredTerrain: ["road"] } }, items: [] },
    ],
    items: [],
    scenes: [{
      _id: "s1",
      name: "Field",
      tokens: [
        { _id: "t1", name: "Tank token", actorId: "v1", actorLink: false, delta: { system: { mwd: { adverseTerrain: "forest" } } } },
        { _id: "t2", name: "Linked tank", actorId: "v1", actorLink: true, delta: { system: { mwd: { favoredTerrain: ["road"] } } } },
        { _id: "t3", name: "Mech token", actorId: "m1", actorLink: false, delta: { system: { mwd: { favoredTerrain: ["road"] } } } },
      ],
    }],
  };
  const plan = planSchemaStep(vehicleTerrainLists, world);
  assert.deepEqual(plan.reviews, []);
  assert.deepEqual(plan.operations.map(op => [op.label, op.unset]), [
    ["Tank", ["system.mwd.favoredTerrain", "system.mwd.adverseTerrain"]],
    ["Token Tank token (scene Field)", ["delta.system.mwd.adverseTerrain"]],
  ]);

  applyOperations(world, plan.operations);
  assert.deepEqual(world.actors[0].system.mwd, { movementProfile: "tracked" });
  // Only vehicles: the BattleMech field is not this step's marker.
  assert.deepEqual(world.actors[2].system.mwd, { favoredTerrain: ["road"] });
  assert.deepEqual(planSchemaStep(vehicleTerrainLists, world).operations, []);
});

test("dev-world fixture: schema 2 after the baseline is idempotent", () => {
  const world = loadFixture();
  applyOperations(world, planSchemaStep(baseline, world).operations);
  const plan = planSchemaStep(vehicleTerrainLists, world);
  assert.deepEqual(plan.reviews, []);
  assert.ok(plan.operations.every(op => op.unset.every(path => /(^|\.)(favoredTerrain|adverseTerrain)$/.test(path))));
  applyOperations(world, plan.operations);
  assert.deepEqual(planSchemaStep(vehicleTerrainLists, world).operations, []);
  const vehicles = world.actors.filter(actor => actor.type === "vehicle");
  assert.ok(vehicles.every(actor => !("favoredTerrain" in (actor.system?.mwd ?? {})) && !("adverseTerrain" in (actor.system?.mwd ?? {}))));
});
