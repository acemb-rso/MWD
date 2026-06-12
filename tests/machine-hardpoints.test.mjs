import test from "node:test";
import assert from "node:assert/strict";

import {
  appendMachineHardpoint,
  assignMachineHardpointOccupant,
  doesHardpointAcceptItem,
  getHardpointCompatibilityError,
  getMountedMachineItems,
  reconcileMachineHardpoints,
  removeMachineHardpointById,
  updateMachineHardpointSettings,
} from "../src/modules/mwd/machine-hardpoints.js";
import { normalizeMachineHardpointType } from "../src/modules/mwd/machine-weapon-types.js";

function createWeapon({ damageType = "energy", size = "small", keywords = [] } = {}) {
  return {
    name: `${damageType} weapon`,
    type: "mechWeapon",
    canonicalType: "mechWeapon",
    system: {
      damageType,
      size,
      keywords,
    },
  };
}

test("legacy thermal and electrical hardpoints normalize into energy compatibility", () => {
  const energySlot = { type: "energy", size: "small" };
  const thermalSlot = { type: "thermal", size: "small" };
  const electricalSlot = { type: "electrical", size: "small" };

  assert.equal(normalizeMachineHardpointType("thermal"), "energy");
  assert.equal(normalizeMachineHardpointType("electrical"), "energy");
  assert.equal(doesHardpointAcceptItem(energySlot, createWeapon({ damageType: "thermal" })), true);
  assert.equal(doesHardpointAcceptItem(energySlot, createWeapon({ damageType: "electrical" })), true);
  assert.equal(doesHardpointAcceptItem(thermalSlot, createWeapon({ damageType: "energy" })), true);
  assert.equal(doesHardpointAcceptItem(electricalSlot, createWeapon({ damageType: "thermal" })), true);
});

test("support hardpoints accept mech weapons with the support keyword", () => {
  const supportSlot = { type: "support", size: "small" };
  const regularWeapon = createWeapon({ damageType: "energy" });
  const supportWeapon = createWeapon({ damageType: "energy", keywords: ["SUPPORT"] });
  const oversizedSupportWeapon = createWeapon({ damageType: "energy", size: "medium", keywords: "support" });

  assert.equal(doesHardpointAcceptItem(supportSlot, regularWeapon), false);
  assert.match(getHardpointCompatibilityError(supportSlot, regularWeapon), /support keyword/i);
  assert.equal(doesHardpointAcceptItem(supportSlot, supportWeapon), true);
  assert.equal(doesHardpointAcceptItem(supportSlot, oversizedSupportWeapon), false);
  assert.match(getHardpointCompatibilityError(supportSlot, oversizedSupportWeapon), /medium/i);
});

test("non-support hardpoint families remain type-gated", () => {
  const penetratingSlot = { type: "penetrating", size: "small" };
  const weapon = createWeapon({ damageType: "energy", keywords: ["support"] });

  assert.equal(doesHardpointAcceptItem(penetratingSlot, weapon), false);
  assert.match(getHardpointCompatibilityError(penetratingSlot, weapon), /cannot fit/i);
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

test("reconcileMachineHardpoints preserves actor-side slot occupants while saving editable settings", () => {
  const current = [
    { id: "hp-1", type: "energy", size: "small", location: "arms", itemId: "weapon-a" },
    { id: "hp-2", type: "ballistic", size: "medium", location: "torso", itemId: "weapon-b" },
  ];
  const staged = [
    { id: "hp-1", type: "thermal", size: "large", location: "head", itemId: "" },
    { id: "hp-2", type: "missile", size: "small", location: "arms", itemId: "stale-dom-value" },
  ];

  const reconciled = reconcileMachineHardpoints(current, staged, { defaultLocation: "arms" });

  assert.deepEqual(reconciled, [
    { id: "hp-1", type: "energy", size: "large", location: "head", itemId: "weapon-a" },
    { id: "hp-2", type: "concussive", size: "small", location: "arms", itemId: "weapon-b" },
  ]);
});

test("appendMachineHardpoint keeps existing filled slots intact", () => {
  const hardpoints = appendMachineHardpoint([
    { id: "hp-1", type: "energy", size: "small", location: "arms", itemId: "weapon-a" },
  ], {
    id: "hp-2",
    type: "ballistic",
    size: "medium",
    location: "torso",
  });

  assert.deepEqual(hardpoints, [
    { id: "hp-1", type: "energy", size: "small", location: "arms", itemId: "weapon-a" },
    { id: "hp-2", type: "penetrating", size: "medium", location: "torso", itemId: "" },
  ]);
});

test("assignMachineHardpointOccupant moves an item to one slot without disturbing others", () => {
  const result = assignMachineHardpointOccupant([
    { id: "hp-1", type: "energy", size: "small", location: "arms", itemId: "weapon-a" },
    { id: "hp-2", type: "energy", size: "small", location: "torso", itemId: "weapon-b" },
    { id: "hp-3", type: "energy", size: "small", location: "head", itemId: "" },
  ], "hp-3", "weapon-a");

  assert.equal(result.changed, true);
  assert.deepEqual(result.hardpoints.map(hardpoint => hardpoint.itemId), ["", "weapon-b", "weapon-a"]);
});

test("removeMachineHardpointById deletes the requested stable slot id", () => {
  const result = removeMachineHardpointById([
    { id: "hp-1", type: "energy", size: "small", location: "arms", itemId: "weapon-a" },
    { id: "hp-2", type: "ballistic", size: "medium", location: "torso", itemId: "weapon-b" },
  ], "hp-1");

  assert.equal(result.removed.itemId, "weapon-a");
  assert.deepEqual(result.hardpoints.map(hardpoint => hardpoint.id), ["hp-2"]);
});

test("updateMachineHardpointSettings patches visible slot settings while preserving occupancy", () => {
  const result = updateMachineHardpointSettings([
    { id: "hp-1", type: "energy", size: "small", location: "arms", itemId: "weapon-a" },
  ], "hp-1", {
    type: "energy",
    size: "large",
    location: "torso",
  });

  assert.equal(result.changed, true);
  assert.deepEqual(result.hardpoints, [
    { id: "hp-1", type: "energy", size: "large", location: "torso", itemId: "weapon-a" },
  ]);
});
