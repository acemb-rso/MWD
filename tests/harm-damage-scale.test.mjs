import test from "node:test";
import assert from "node:assert/strict";

function characterActor(overrides = {}) {
  return {
    id: overrides.id ?? "character-1",
    uuid: overrides.uuid ?? "Actor.character-1",
    name: overrides.name ?? "Test Character",
    type: "character",
    statuses: new Set(),
    items: [],
    system: {
      monitors: {
        physical: { value: 0, max: 30 },
        fatigue: { value: 0, max: 10 },
      },
    },
    getPersonalCombatLoadout() {
      return { activeArmor: null };
    },
  };
}

test("personal harm converts machine-scale incoming damage before mitigation", async () => {
  globalThis.foundry = {
    utils: {
      mergeObject: (target = {}, source = {}) => ({ ...target, ...source }),
      deepClone: (value) => JSON.parse(JSON.stringify(value ?? null)),
      randomID: () => "test-id",
      getProperty: (root, path) => String(path ?? "")
        .split(".")
        .filter(Boolean)
        .reduce((value, key) => value?.[key], root),
      setProperty: (root, path, value) => {
        const parts = String(path ?? "").split(".").filter(Boolean);
        let cursor = root;
        while (parts.length > 1) {
          const key = parts.shift();
          cursor[key] ??= {};
          cursor = cursor[key];
        }
        cursor[parts[0]] = value;
        return true;
      },
    },
  };
  globalThis.game = { combat: null };
  globalThis.canvas = { scene: { id: "scene-1" } };
  const { HarmEngine } = await import("../src/modules/harm/harm-engine.js");

  const result = await HarmEngine._applyPersonalArmorAwareDamage(characterActor(), {
    mode: "trackDelta",
    track: "physical",
    damage: 2,
    sourceScale: "machine",
    damageType: "concussive",
  }, { dryRun: true });

  assert.equal(result.sourceScale, "machine");
  assert.equal(result.targetScale, "personal");
  assert.equal(result.scaleConversion.original, 2);
  assert.equal(result.scaleConversion.converted, 20);
  assert.equal(result.damageIncoming, 20);
  assert.equal(result.finalDamage, 20);
  assert.equal(result.appliedDelta, 20);
});
