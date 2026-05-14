import test from "node:test";
import assert from "node:assert/strict";

import {
  buildMachineEnergyPayloadModel,
  normalizeMachinePayloadDamageType,
  normalizeMachineWeaponDamageType,
} from "../src/modules/mwd/machine-weapon-types.js";

test("machine weapon base damage normalization maps legacy aliases", () => {
  assert.equal(normalizeMachineWeaponDamageType("thermal"), "energy");
  assert.equal(normalizeMachineWeaponDamageType("electrical"), "energy");
  assert.equal(normalizeMachineWeaponDamageType("electric"), "energy");
  assert.equal(normalizeMachineWeaponDamageType("plasma"), "energy");
  assert.equal(normalizeMachineWeaponDamageType("laser"), "energy");
  assert.equal(normalizeMachineWeaponDamageType("ballistic"), "penetrating");
  assert.equal(normalizeMachineWeaponDamageType("explosive"), "concussive");
  assert.equal(normalizeMachineWeaponDamageType("missile"), "concussive");
});

test("machine payload damage normalization preserves thermal and electrical effects", () => {
  assert.equal(normalizeMachinePayloadDamageType("thermal"), "thermal");
  assert.equal(normalizeMachinePayloadDamageType("electrical"), "electrical");
});

test("thermal machine weapons become energy weapons with a selected thermal payload", () => {
  const model = buildMachineEnergyPayloadModel({
    damageType: "thermal",
    category: "ranged",
    payloads: [],
    selectedPayloadId: "",
  });

  assert.equal(model.damageType, "energy");
  assert.equal(model.payloadDamageType, "thermal");
  assert.equal(model.selectedPayloadId, "thermal");
  assert.equal(model.payloads.find(payload => payload.id === "thermal")?.modifies.damageType, "thermal");
});

test("electrical machine weapons become energy weapons with a selected electrical payload", () => {
  const model = buildMachineEnergyPayloadModel({
    damageType: "electrical",
    category: "ranged",
    payloads: [],
    selectedPayloadId: "",
  });

  assert.equal(model.damageType, "energy");
  assert.equal(model.payloadDamageType, "electrical");
  assert.equal(model.selectedPayloadId, "electrical");
  assert.equal(model.payloads.find(payload => payload.id === "electrical")?.modifies.damageType, "electrical");
});

test("machine energy payload migration reuses an existing matching payload", () => {
  const model = buildMachineEnergyPayloadModel({
    damageType: "thermal",
    category: "ranged",
    payloads: [
      { id: "unloaded", label: "Unloaded" },
      { id: "inferno", label: "Inferno", modifies: { damageType: "thermal" } },
    ],
    selectedPayloadId: "unloaded",
  });

  assert.equal(model.damageType, "energy");
  assert.equal(model.selectedPayloadId, "inferno");
  assert.equal(model.payloads.filter(payload => payload.modifies.damageType === "thermal").length, 1);
});

test("unknown machine weapon base types use fallback without payload updates", () => {
  const model = buildMachineEnergyPayloadModel({
    damageType: "weird",
    category: "ranged",
    payloads: [],
    selectedPayloadId: "",
  });

  assert.equal(model.damageType, "energy");
  assert.equal(model.payloadDamageType, "");
});
