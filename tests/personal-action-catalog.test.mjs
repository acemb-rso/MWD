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

test("suppression fire is a ready complex attack action", async () => {
  const {
    getPersonalAction,
  } = await import("../src/modules/combat/personal-action-catalog.js");

  const action = getPersonalAction("suppressionFire");
  assert.equal(action?.implementation?.state, "ready");
  assert.equal(action?.category, "complex");
  assert.deepEqual(action?.cost, { resource: "sa", value: 2 });
  assert.equal(action?.resolver, "attack");
  assert.deepEqual(action?.prompt, { type: "weapon", required: true });
});

test("grapple actions are ready combat actions", async () => {
  const {
    getPersonalAction,
  } = await import("../src/modules/combat/personal-action-catalog.js");

  const grapple = getPersonalAction("grapple");
  assert.equal(grapple?.implementation?.state, "ready");
  assert.equal(grapple?.category, "complex");
  assert.deepEqual(grapple?.cost, { resource: "sa", value: 2 });
  assert.equal(grapple?.resolver, "attack");
  assert.ok(grapple?.tags?.includes("grapple"));

  const defense = getPersonalAction("grappleDefense");
  assert.equal(defense?.implementation?.state, "ready");
  assert.equal(defense?.category, "reaction");
  assert.deepEqual(defense?.cost, { resource: "ra", value: 1 });
  assert.equal(defense?.resolver, "recovery");
  assert.deepEqual(defense?.roll, { intent: "skill", key: "meleeCombat", attrKey: "reflexes" });
});

test("personal action catalog retires removed defaults and migrates renamed actions", async () => {
  const {
    mergePersonalActionCatalogDefaults,
    normalizePersonalActionCatalog,
  } = await import("../src/modules/combat/personal-action-catalog.js");

  const legacy = [
    {
      id: "recoverBurn",
      label: "Recover Burn",
      category: "complex",
      cost: { resource: "sa", value: 2 },
      resolver: "recovery",
    },
    {
      id: "gesture",
      label: "Gesture / Signal",
      category: "free",
      cost: { resource: "fa", value: 1 },
      resolver: "action",
    },
    {
      id: "breakGrappleDefense",
      label: "Break Grapple Defense",
      category: "reaction",
      cost: { resource: "ra", value: 1 },
      resolver: "recovery",
    },
    {
      id: "communicate",
      label: "Speak / Signal",
      category: "free",
      cost: { resource: "fa", value: 1 },
      resolver: "action",
    },
    {
      id: "defend",
      label: "Dodge / Defensive Response",
      category: "reaction",
      cost: { resource: "ra", value: 1 },
      resolver: "recovery",
      implementation: { state: "stub", reason: "Old reason" },
    },
  ];

  const normalized = normalizePersonalActionCatalog(legacy, { strict: false, includeDefaults: true });
  assert.equal(normalized.some(action => action.id === "recoverBurn"), false);
  assert.equal(normalized.some(action => action.id === "gesture"), false);
  assert.equal(normalized.some(action => action.id === "breakGrappleDefense"), false);
  assert.equal(normalized.some(action => action.id === "grappleDefense"), true);

  const communicate = normalized.find(action => action.id === "communicate");
  assert.equal(communicate?.label, "Communicate");
  assert.deepEqual(communicate?.cost, { resource: "fa", value: 1 });

  const dodge = normalized.find(action => action.id === "defend");
  assert.equal(dodge?.label, "Dodge");
  assert.equal(dodge?.category, "free");
  assert.deepEqual(dodge?.cost, { resource: "fa", value: 1 });

  const merged = mergePersonalActionCatalogDefaults(legacy);
  assert.equal(merged.some(action => action.id === "recoverBurn"), false);
  assert.equal(merged.some(action => action.id === "gesture"), false);
  assert.equal(merged.some(action => action.id === "breakGrappleDefense"), false);
  assert.equal(merged.filter(action => action.id === "communicate").length, 1);
});
