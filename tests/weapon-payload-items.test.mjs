import test from "node:test";
import assert from "node:assert/strict";

function deepClone(value) {
  return JSON.parse(JSON.stringify(value ?? null));
}

function getProperty(root, path) {
  return String(path ?? "")
    .split(".")
    .filter(Boolean)
    .reduce((value, key) => value?.[key], root);
}

test("weapon payload item systems normalize family tags and profile fields", async () => {
  const {
    normalizeWeaponPayloadItemSystem,
  } = await import("../src/modules/mwd/weapon-payload-items.js");

  const system = normalizeWeaponPayloadItemSystem({
    families: "40mmGrenade, launcherGrenade",
    tags: ["frag", "armorPiercing", ""],
    quantity: "3",
    profile: {
      label: "Frag",
      modifies: {
        damage: 5,
        ap: -1,
      },
    },
  });

  assert.deepEqual(system.families, ["40mmGrenade", "launcherGrenade"]);
  assert.deepEqual(system.tags, ["frag", "armorPiercing"]);
  assert.equal(system.payloadKey, "frag");
  assert.equal(system.quantity, 3);
  assert.equal(system.profile.label, "Frag");
  assert.equal(system.profile.modifies.damage, 5);
  assert.equal(system.profile.modifies.ap, -1);
});

test("payload families and tags canonicalize against configured defaults", async () => {
  const {
    normalizeWeaponPayloadItemSystem,
    normalizePayloadCompatibility,
  } = await import("../src/modules/mwd/weapon-payload-items.js");

  const payload = normalizeWeaponPayloadItemSystem({
    families: "Bullet, bullets",
    tags: "Armor Piercing, smoke",
  });
  const compatibility = normalizePayloadCompatibility({
    families: "bullet",
    tagsAll: "armorPiercing",
  });

  assert.deepEqual(payload.families, ["bullet", "bullets"]);
  assert.deepEqual(payload.tags, ["armorPiercing", "smoke"]);
  assert.deepEqual(compatibility.families, ["bullet"]);
  assert.deepEqual(compatibility.tagsAll, ["armorPiercing"]);
});

test("family and tag compatibility filters payload items", async () => {
  const {
    isPayloadCompatibleWithWeapon,
  } = await import("../src/modules/mwd/weapon-payload-items.js");

  const payload = {
    families: ["40mmGrenade"],
    tags: ["frag", "armorPiercing"],
  };

  assert.equal(isPayloadCompatibleWithWeapon({ families: ["40mmGrenade"] }, payload), true);
  assert.equal(isPayloadCompatibleWithWeapon({ families: ["smallArmsBallistic"] }, payload), false);
  assert.equal(isPayloadCompatibleWithWeapon({ families: ["40mmGrenade"], tagsAll: ["frag"] }, payload), true);
  assert.equal(isPayloadCompatibleWithWeapon({ families: ["40mmGrenade"], tagsAll: ["smoke"] }, payload), false);
});

test("payload damage modifiers add to the effective weapon damage", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.deepClone ??= deepClone;

  const {
    normalizePayloadProfile,
    resolveEffectiveWeaponProfile,
  } = await import("../src/modules/mwd/personal-damage.js");

  const profile = resolveEffectiveWeaponProfile({
    damage: 0,
    damageType: "concussive",
    payloads: [normalizePayloadProfile({
      id: "frag",
      label: "Frag",
      modifies: {
        damage: 5,
        damageType: "penetrating",
      },
    })],
    selectedPayloadId: "frag",
  });

  assert.equal(profile.damage, 5);
  assert.equal(profile.damageType, "penetrating");
});

test("compatible owned payload items compile into selectable payload profiles", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.getProperty ??= getProperty;

  const {
    resolveWeaponPayloadState,
  } = await import("../src/modules/mwd/personal-damage.js");
  const {
    buildWeaponPayloadItemModel,
    normalizePayloadKey,
  } = await import("../src/modules/mwd/weapon-payload-items.js");

  const payloadItem = {
    id: "payload-1",
    uuid: "Actor.a.Item.payload-1",
    name: "Frag Grenades",
    type: "weaponPayload",
    system: {
      payloadKey: "40mm Frag",
      families: ["40mmGrenade"],
      tags: ["frag"],
      quantity: 2,
      profile: {
        label: "Frag",
        modifies: { damage: 5 },
        consumption: { amount: 1 },
      },
    },
  };
  const actor = { items: new Map([[payloadItem.id, payloadItem]]) };
  const model = buildWeaponPayloadItemModel({
    actor,
    weaponCompatibility: { families: ["40mmGrenade"] },
    sourceAssignments: {
      "40mm Frag": { sourceId: "magazine" },
    },
  });

  const state = resolveWeaponPayloadState({
    actor,
    payloads: model.payloads,
    consumptionSources: [{
      id: "magazine",
      label: "Magazine",
      kind: "internal",
      reloadable: true,
      loadedPayloadKey: "40mm Frag",
      tracking: { current: 1, max: 2 },
    }],
    selectedPayloadId: normalizePayloadKey("40mm Frag"),
  });

  assert.equal(state.activePayloadId, "40mm-frag");
  assert.equal(state.payloadLabel, "Frag");
  assert.equal(state.activePayload.sourceType, "weaponPayload");
  assert.equal(state.activePayload.payloadKey, "40mm-frag");
  assert.equal(state.activePayload.itemId, payloadItem.id);
  assert.equal(state.activePayload.itemUuid, payloadItem.uuid);
  assert.equal(state.activePayload.reserveQuantity, 2);
  assert.equal(state.sourceState.kind, "internal");
  assert.equal(state.sourceState.current, 1);
  assert.equal(state.sourceState.loadedPayloadKey, "40mm-frag");
  assert.equal(state.sourceState.consumePerUse, 1);
  assert.equal(model.consumptionSources.length, 0);
});

test("incompatible or absent item payloads fall back to unloaded", async () => {
  const {
    buildWeaponPayloadItemModel,
  } = await import("../src/modules/mwd/weapon-payload-items.js");
  const {
    resolveWeaponPayloadState,
  } = await import("../src/modules/mwd/personal-damage.js");

  const actor = {
    items: new Map([["payload-1", {
      id: "payload-1",
      uuid: "Actor.a.Item.payload-1",
      name: "Smoke Grenades",
      type: "weaponPayload",
      system: {
        families: ["40mmGrenade"],
        tags: ["smoke"],
        quantity: 2,
        profile: { label: "Smoke" },
      },
    }]]),
  };
  const model = buildWeaponPayloadItemModel({
    actor,
    weaponCompatibility: { families: ["smallArmsBallistic"] },
  });
  const state = resolveWeaponPayloadState({
    actor,
    payloads: model.payloads,
    consumptionSources: model.consumptionSources,
    selectedPayloadId: "Actor.a.Item.payload-1",
  });

  assert.equal(model.payloads.length, 0);
  assert.equal(state.activePayloadId, "unloaded");
});

test("payload item quantity is reserve count, not generated source tracking", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.getProperty ??= getProperty;

  const {
    buildWeaponPayloadItemModel,
  } = await import("../src/modules/mwd/weapon-payload-items.js");
  const {
    resolveWeaponPayloadState,
  } = await import("../src/modules/mwd/personal-damage.js");

  const payloadItem = {
    id: "payload-1",
    uuid: "Actor.a.Item.payload-1",
    name: "Shared Grenades",
    type: "weaponPayload",
    system: {
      payloadKey: "shared-frag",
      families: ["40mmGrenade"],
      tags: ["frag"],
      quantity: 2,
      profile: {
        label: "Frag",
        consumption: { amount: 1 },
      },
    },
  };
  const actor = { items: new Map([[payloadItem.id, payloadItem]]) };
  const compatibility = { families: ["40mmGrenade"] };

  const firstModel = buildWeaponPayloadItemModel({
    actor,
    weaponCompatibility: compatibility,
    sourceAssignments: { "shared-frag": { sourceId: "internal" } },
  });
  const firstState = resolveWeaponPayloadState({
    actor,
    payloads: firstModel.payloads,
    consumptionSources: [{
      id: "internal",
      label: "Internal",
      kind: "internal",
      reloadable: true,
      loadedPayloadKey: "shared-frag",
      tracking: { current: 1, max: 1 },
    }],
    selectedPayloadId: "shared-frag",
  });

  payloadItem.system.quantity -= 1;

  const secondModel = buildWeaponPayloadItemModel({
    actor,
    weaponCompatibility: compatibility,
    sourceAssignments: { "shared-frag": { sourceId: "internal" } },
  });
  const secondState = resolveWeaponPayloadState({
    actor,
    payloads: secondModel.payloads,
    consumptionSources: [{
      id: "internal",
      label: "Internal",
      kind: "internal",
      reloadable: true,
      loadedPayloadKey: "shared-frag",
      tracking: { current: 1, max: 1 },
    }],
    selectedPayloadId: "shared-frag",
  });

  assert.equal(firstState.sourceState.current, 1);
  assert.equal(firstState.activePayload.reserveQuantity, 2);
  assert.equal(secondState.sourceState.current, 1);
  assert.equal(secondState.activePayload.reserveQuantity, 1);
  assert.equal(firstModel.consumptionSources.length, 0);
});

test("payload keys normalize and group matching reserve stacks", async () => {
  const {
    buildWeaponPayloadItemModel,
    normalizePayloadKey,
  } = await import("../src/modules/mwd/weapon-payload-items.js");

  const actor = {
    items: new Map([
      ["fmj-1", {
        id: "fmj-1",
        uuid: "Actor.a.Item.fmj-1",
        name: ".45 FMJ",
        type: "weaponPayload",
        system: { payloadKey: ".45 FMJ", families: ["bullet"], quantity: 2, profile: { label: ".45 FMJ" } },
      }],
      ["fmj-2", {
        id: "fmj-2",
        uuid: "Actor.a.Item.fmj-2",
        name: "45_fmj",
        type: "weaponPayload",
        system: { payloadKey: "45_fmj", families: ["bullet"], quantity: 1, profile: { label: "Corrected FMJ", modifies: { ap: 2 } } },
      }],
    ]),
  };

  const model = buildWeaponPayloadItemModel({
    actor,
    weaponCompatibility: { families: ["bullet"] },
  });

  assert.equal(normalizePayloadKey(".45 FMJ"), "45-fmj");
  assert.equal(model.payloads.length, 1);
  assert.equal(model.payloads[0].payloadKey, "45-fmj");
  assert.equal(model.payloads[0].reserveQuantity, 3);
  assert.equal(model.payloads[0].label, ".45 FMJ");
  assert.equal(model.payloads[0].modifies.ap, 0);
});

test("payload source assignments normalize keys and preserve selected sources", async () => {
  const {
    buildWeaponPayloadItemModel,
    normalizePayloadSourceAssignments,
  } = await import("../src/modules/mwd/weapon-payload-items.js");

  const actor = {
    items: new Map([["sabot-1", {
      id: "sabot-1",
      uuid: "Actor.a.Item.sabot-1",
      name: "120mm Sabot",
      type: "weaponPayload",
      system: {
        payloadKey: "120mm-Sabot",
        families: ["120mmAutocannon"],
        quantity: 4,
        profile: { label: "Sabot" },
      },
    }]]),
  };

  const assignments = normalizePayloadSourceAssignments({
    "120mm Sabot": { sourceId: "autoloader" },
    "120mm HE": { sourceId: "" },
    "120mm Smoke": { sourceId: "untracked" },
  });
  const model = buildWeaponPayloadItemModel({
    actor,
    weaponCompatibility: { families: ["120mmAutocannon"] },
    sourceAssignments: assignments,
  });

  assert.deepEqual(assignments, {
    "120mm-sabot": { sourceId: "autoloader" },
    "120mm-he": { sourceId: null },
    "120mm-smoke": { sourceId: null },
  });
  assert.equal(model.payloads.length, 1);
  assert.equal(model.payloads[0].payloadKey, "120mm-sabot");
  assert.equal(model.payloads[0].consumption.sourceId, "autoloader");
});
