import test from "node:test";
import assert from "node:assert/strict";

import {
  doesHardpointAcceptItem,
  getHardpointCompatibilityError,
  getMountedMachineItems,
} from "../src/modules/mwd/machine-hardpoints.js";

function createWeapon({ damageType = "energy", size = "small" } = {}) {
  return {
    name: `${damageType} weapon`,
    type: "mechWeapon",
    canonicalType: "mechWeapon",
    system: {
      damageType,
      size,
    },
  };
}

test("energy-family hardpoints accept energy, thermal, and electrical weapons interchangeably", () => {
  const energySlot = { type: "energy", size: "small" };
  const thermalSlot = { type: "thermal", size: "small" };
  const electricalSlot = { type: "electrical", size: "small" };

  assert.equal(doesHardpointAcceptItem(energySlot, createWeapon({ damageType: "thermal" })), true);
  assert.equal(doesHardpointAcceptItem(energySlot, createWeapon({ damageType: "electrical" })), true);
  assert.equal(doesHardpointAcceptItem(thermalSlot, createWeapon({ damageType: "energy" })), true);
  assert.equal(doesHardpointAcceptItem(electricalSlot, createWeapon({ damageType: "thermal" })), true);
});

test("non-energy hardpoint families remain type-gated", () => {
  const supportSlot = { type: "support", size: "small" };
  const weapon = createWeapon({ damageType: "energy" });

  assert.equal(doesHardpointAcceptItem(supportSlot, weapon), false);
  assert.match(getHardpointCompatibilityError(supportSlot, weapon), /cannot fit/i);
});

test("getMountedMachineItems returns only attached mech weapons in hardpoint order", () => {
  const mountedA = { id: "weapon-a", type: "mechWeapon", canonicalType: "mechWeapon", name: "Weapon A" };
  const loose = { id: "weapon-loose", type: "mechWeapon", canonicalType: "mechWeapon", name: "Loose Weapon" };
  const mountedB = { id: "weapon-b", type: "mechWeapon", canonicalType: "mechWeapon", name: "Weapon B" };
  const gear = { id: "gear-1", type: "gear", canonicalType: "gear", name: "Tool Kit" };

  const actor = {
    system: {
      mwd: {
        hardpoints: [
          { id: "hp-1", type: "energy", size: "medium", location: "arms", itemId: "weapon-a" },
          { id: "hp-2", type: "ballistic", size: "medium", location: "torso", itemId: "weapon-b" },
        ],
      },
    },
    items: [mountedA, loose, mountedB, gear],
  };

  const mountedWeapons = getMountedMachineItems(actor, { canonicalType: "mechWeapon" });

  assert.deepEqual(mountedWeapons.map(item => item.id), ["weapon-a", "weapon-b"]);
});
