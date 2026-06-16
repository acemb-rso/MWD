import test from "node:test";
import assert from "node:assert/strict";

function deepClone(value) {
  return JSON.parse(JSON.stringify(value ?? null));
}

test("standard personal weapon traits expose the curated prebuilt list", async () => {
  const {
    WEAPON_STANDARD_TRAITS,
    normalizeWeaponStandardTraits,
  } = await import("../src/modules/mwd/personal-damage.js");

  assert.deepEqual(
    WEAPON_STANDARD_TRAITS.map(entry => entry.label),
    ["Fatigue", "Concealable", "Single Shot", "Automatic", "Spread", "Space Capable", "Armor Bypass"]
  );
  assert.deepEqual(
    normalizeWeaponStandardTraits(["Fatigue", "Space Capable"]).map(entry => entry.key),
    ["fatigue", "spaceCapable"]
  );
});

test("fatigue and automatic weapon traits affect the combat profile", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.deepClone ??= deepClone;

  const {
    resolveEffectiveWeaponProfile,
  } = await import("../src/modules/mwd/personal-damage.js");

  const profile = resolveEffectiveWeaponProfile({
    damageType: "penetrating",
    standardTraits: ["Fatigue", "Automatic"],
    fireModes: {
      single: { enabled: false },
      burst: { enabled: false, shots: 3 },
      fullAuto: { enabled: false, shots: 10 },
    },
  });

  assert.equal(profile.damageTrack, "fatigue");
  assert.equal(profile.fireModes.single.enabled, true);
  assert.equal(profile.fireModes.burst.enabled, true);
  assert.equal(profile.fireModes.burst.shots, 3);
  assert.equal(profile.fireModes.spray.enabled, true);
  assert.equal(profile.fireModes.spray.shots, 10);
  assert.equal(profile.fireModes.fullAuto, undefined);
  assert.deepEqual(profile.effects.flags, ["fatigue", "automatic"]);
});

test("personal fire mode state gates burst and spray from weapon capabilities", async () => {
  const {
    buildPersonalFireModeState,
    addPersonalFireModeAttackRating,
    isPersonalFireModeUnloadAfterAction,
  } = await import("../src/modules/mwd/personal-fire-modes.js");

  const unloadedAutomatic = {
    category: "ranged",
    payloadState: { activePayloadId: "unloaded", payloads: [{ id: "unloaded" }, { id: "ball" }] },
    effects: { flags: ["automatic"] },
  };
  const loadedAutomatic = {
    ...unloadedAutomatic,
    payloadState: { ...unloadedAutomatic.payloadState, activePayloadId: "ball" },
  };
  const spreadOnly = {
    category: "ranged",
    payloadState: { activePayloadId: "shell", payloads: [{ id: "unloaded" }, { id: "shell" }] },
    effects: { flags: ["spread"] },
  };

  assert.equal(buildPersonalFireModeState(unloadedAutomatic, "single").requested.enabled, false);
  assert.equal(buildPersonalFireModeState(loadedAutomatic, "burst").selected.key, "burst");
  assert.equal(buildPersonalFireModeState(spreadOnly, "burst").requested.enabled, false);
  assert.equal(buildPersonalFireModeState(spreadOnly, "spray").selected.key, "spray");
  assert.equal(isPersonalFireModeUnloadAfterAction("single"), false);
  assert.equal(isPersonalFireModeUnloadAfterAction("burst"), true);
  assert.equal(isPersonalFireModeUnloadAfterAction("spray"), true);
  assert.deepEqual(
    addPersonalFireModeAttackRating({ close: 1, near: 2, far: 3, extreme: 4 }, { attackRatingModifier: -2 }),
    { close: -1, near: 0, far: 1, extreme: 2 }
  );
});
