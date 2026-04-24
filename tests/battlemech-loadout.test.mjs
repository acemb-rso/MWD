import test from "node:test";
import assert from "node:assert/strict";

import { BattlemechLoadout } from "../src/modules/mwd/battlemech-loadout.js";

function duplicate(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeObject(target, source, { inplace = true } = {}) {
  const output = inplace ? target : duplicate(target);
  const sourceObject = source && typeof source === "object" ? source : {};

  for (const [key, value] of Object.entries(sourceObject)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const base = output[key] && typeof output[key] === "object" && !Array.isArray(output[key])
        ? output[key]
        : {};
      output[key] = mergeObject(base, value, { inplace: false });
      continue;
    }
    output[key] = value;
  }

  return output;
}

function createWeapon({
  id,
  name,
  size = "large",
  damageType = "energy",
  category = "ranged",
} = {}) {
  return {
    id,
    name,
    type: "mechWeapon",
    system: {
      size,
      damageType,
      weaponCategory: category,
      references: {},
    },
    isActive() {
      return true;
    },
    getDamageCode() {
      return "4";
    },
  };
}

test("BattlemechLoadout normalizes object-backed persisted hardpoints and weapon groups", () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.duplicate ??= duplicate;
  globalThis.foundry.utils.mergeObject ??= mergeObject;

  const laser = createWeapon({
    id: "laser-1",
    name: "Medium Laser",
  });

  const actor = {
    system: {
      mwd: {
        weightClass: "medium",
        hardpoints: {
          0: {
            id: "hp-1",
            type: "energy",
            size: "large",
            location: "arms",
            itemId: "laser-1",
          },
        },
        weaponGroups: {
          0: {
            id: "group-1",
            name: "Alpha",
            weaponIds: {
              0: "laser-1",
            },
            isPrimary: true,
          },
        },
      },
    },
    items: [laser],
  };

  const loadout = new BattlemechLoadout(actor).compute();

  assert.equal(loadout.hardpoints.length, 1);
  assert.equal(loadout.hardpoints[0].id, "hp-1");
  assert.equal(loadout.hardpoints[0].occupiedBy, "group-1");
  assert.equal(loadout.weaponGroups.length, 1);
  assert.deepEqual(loadout.weaponGroups[0].weaponIds, ["laser-1"]);
  assert.equal(loadout.primaryGroupId, "group-1");
  assert.deepEqual(loadout.errors, []);
});

test("BattlemechLoadout ignores unattached mech weapons when validating mounted loadouts", () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.duplicate ??= duplicate;
  globalThis.foundry.utils.mergeObject ??= mergeObject;

  const mountedLaser = createWeapon({
    id: "laser-1",
    name: "Mounted Laser",
    category: "ranged",
  });
  const unattachedHatchet = createWeapon({
    id: "hatchet-1",
    name: "Loose Hatchet",
    category: "melee",
  });

  const actor = {
    system: {
      mwd: {
        weightClass: "medium",
        hardpoints: [{
          id: "hp-1",
          type: "energy",
          size: "large",
          location: "arms",
          itemId: "laser-1",
        }],
        weaponGroups: [{
          id: "group-1",
          name: "Alpha",
          weaponIds: ["laser-1"],
          isPrimary: true,
        }],
        melee: {
          maxWeapons: 0,
          allowedLocations: ["arms"],
          baseProfile: { name: "Punch", damage: "1", notes: "" },
        },
      },
    },
    items: [mountedLaser, unattachedHatchet],
  };

  const loadout = new BattlemechLoadout(actor).compute();

  assert.deepEqual(loadout.errors, []);
  assert.equal(loadout.hardpoints[0].occupiedBy, "group-1");
  assert.deepEqual(loadout.meleeProfiles.map(profile => profile.name), ["Punch"]);
});
