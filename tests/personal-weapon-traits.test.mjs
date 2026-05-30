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
    ["Fatigue", "Concealable", "Single Shot", "Automatic", "Spread", "Space Capable"]
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
  assert.equal(profile.fireModes.fullAuto.enabled, true);
  assert.equal(profile.fireModes.fullAuto.shots, 10);
  assert.deepEqual(profile.effects.flags, ["fatigue", "automatic"]);
});
