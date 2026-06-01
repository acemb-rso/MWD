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
  } = await import("../src/modules/mwd/weapon-payload-items.js");

  const payloadItem = {
    id: "payload-1",
    uuid: "Actor.a.Item.payload-1",
    name: "Frag Grenades",
    type: "weaponPayload",
    system: {
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
  });

  const state = resolveWeaponPayloadState({
    actor,
    payloads: model.payloads,
    consumptionSources: model.consumptionSources,
    selectedPayloadId: payloadItem.uuid,
  });

  assert.equal(state.activePayloadId, payloadItem.uuid);
  assert.equal(state.payloadLabel, "Frag");
  assert.equal(state.activePayload.sourceType, "weaponPayload");
  assert.equal(state.activePayload.itemId, payloadItem.id);
  assert.equal(state.activePayload.itemUuid, payloadItem.uuid);
  assert.equal(state.sourceState.kind, "itemRef");
  assert.equal(state.sourceState.current, 2);
  assert.equal(state.sourceState.consumePerUse, 1);
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

test("two weapons can resolve against the same owned payload quantity", async () => {
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

  const firstModel = buildWeaponPayloadItemModel({ actor, weaponCompatibility: compatibility });
  const firstState = resolveWeaponPayloadState({
    actor,
    payloads: firstModel.payloads,
    consumptionSources: firstModel.consumptionSources,
    selectedPayloadId: payloadItem.uuid,
  });

  payloadItem.system.quantity -= firstState.sourceState.consumePerUse;

  const secondModel = buildWeaponPayloadItemModel({ actor, weaponCompatibility: compatibility });
  const secondState = resolveWeaponPayloadState({
    actor,
    payloads: secondModel.payloads,
    consumptionSources: secondModel.consumptionSources,
    selectedPayloadId: payloadItem.uuid,
  });

  assert.equal(firstState.sourceState.current, 2);
  assert.equal(secondState.sourceState.current, 1);
  assert.equal(firstModel.consumptionSources[0].link.itemId, secondModel.consumptionSources[0].link.itemId);
});
