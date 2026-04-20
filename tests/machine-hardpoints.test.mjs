import test from "node:test";
import assert from "node:assert/strict";

import { doesHardpointAcceptItem, getHardpointCompatibilityError } from "../src/modules/mwd/machine-hardpoints.js";

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
