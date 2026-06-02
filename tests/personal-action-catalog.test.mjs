import test from "node:test";
import assert from "node:assert/strict";

test("personal action catalog normalizes declarative cost, resolver, prompt, and implementation state", async () => {
  const {
    normalizePersonalActionCatalog,
  } = await import("../src/modules/combat/personal-action-catalog.js");

  const [action] = normalizePersonalActionCatalog([{
    id: "customReload",
    label: "Custom Reload",
    category: "standard",
    cost: { resource: "sa", value: 1 },
    resolver: "interaction",
    prompt: { type: "weapon", required: true },
    implementation: { state: "ready", reason: "" },
    tags: "combat, weapon, reload",
    resolves: "empty",
  }], { strict: true, includeDefaults: false });

  assert.equal(action.id, "customReload");
  assert.deepEqual(action.cost, { resource: "sa", value: 1 });
  assert.equal(action.resolver, "interaction");
  assert.deepEqual(action.prompt, { type: "weapon", required: true });
  assert.deepEqual(action.implementation, { state: "ready", reason: "" });
  assert.deepEqual(action.tags, ["combat", "weapon", "reload"]);
  assert.deepEqual(action.resolves, ["empty"]);
  assert.equal(action.handler, "combatIntent");
});

test("personal action catalog rejects invalid resolver and cost resources in strict mode", async () => {
  const {
    normalizePersonalActionCatalog,
  } = await import("../src/modules/combat/personal-action-catalog.js");

  assert.throws(
    () => normalizePersonalActionCatalog([{
      id: "badResolver",
      label: "Bad",
      category: "standard",
      cost: { resource: "sa", value: 1 },
      resolver: "sheetMagic",
    }], { strict: true, includeDefaults: false }),
    /resolver must be one of/
  );

  assert.throws(
    () => normalizePersonalActionCatalog([{
      id: "badCost",
      label: "Bad",
      category: "standard",
      cost: { resource: "ap", value: 1 },
      resolver: "action",
    }], { strict: true, includeDefaults: false }),
    /cost resource must be one of/
  );

  assert.throws(
    () => normalizePersonalActionCatalog([{
      id: "badNegative",
      label: "Bad",
      category: "standard",
      cost: { resource: "sa", value: -1 },
      resolver: "action",
    }], { strict: true, includeDefaults: false }),
    /cost value must be a non-negative number/
  );
});

test("personal action catalog backfill appends missing defaults without duplicating existing rows", async () => {
  const {
    mergePersonalActionCatalogDefaults,
  } = await import("../src/modules/combat/personal-action-catalog.js");

  const custom = [{
    id: "move",
    label: "Custom Move",
    category: "standard",
    cost: { resource: "sa", value: 1 },
    resolver: "movement",
  }];

  const once = mergePersonalActionCatalogDefaults(custom);
  const twice = mergePersonalActionCatalogDefaults(once);

  assert.equal(once.filter(action => action.id === "move").length, 1);
  assert.equal(once.find(action => action.id === "move").label, "Custom Move");
  assert.deepEqual(twice.map(action => action.id), once.map(action => action.id));
  assert.ok(once.some(action => action.id === "selectPayload"));
});
