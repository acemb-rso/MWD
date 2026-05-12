import test from "node:test";
import assert from "node:assert/strict";

import {
  buildVehicleProfileSummary,
  normalizeVehicleMovementProfile,
} from "../src/modules/mwd/vehicle-profiles.js";
import {
  buildVehicleStrainModel,
  getVehicleStrainStateEffects,
  normalizeVehicleStrainState,
} from "../src/modules/mwd/vehicle-strain.js";
import { buildVehicleMovementActionChoices } from "../src/modules/mwd/vehicle-movement-actions.js";
import {
  getMachineAttackCqAdjustments,
  getMachineMovementEffects,
  getMachineRuleState,
} from "../src/modules/mwd/machine-state-effects.js";
import { getMountedMachineItems } from "../src/modules/mwd/machine-hardpoints.js";

function vehicle({
  strain = {},
  profile = {},
  statuses = [],
  locations = {},
  movement = { ground: 8, flight: 0 },
} = {}) {
  return {
    type: "vehicle",
    statuses: new Set(statuses),
    system: {
      movement,
      mwd: {
        strain,
        locations: {
          front: { enabled: true, stress: 0, condition: 0, destroyed: false, ...(locations.front ?? {}) },
          side: { enabled: true, stress: 0, condition: 0, destroyed: false, ...(locations.side ?? {}) },
          rear: { enabled: true, stress: 0, condition: 0, destroyed: false, ...(locations.rear ?? {}) },
          core: { enabled: true, stress: 0, condition: 0, destroyed: false, ...(locations.core ?? {}) },
          turret: { enabled: true, stress: 0, condition: 0, destroyed: false, ...(locations.turret ?? {}) },
          rotor: { enabled: false, stress: 0, condition: 0, destroyed: false, ...(locations.rotor ?? {}) },
        },
        crits: [],
        ...profile,
      },
    },
  };
}

test("vehicle movement profile normalizes doctrine and broad terrain hooks", () => {
  const system = {
    mwd: {
      movementProfile: "hover",
      favoredTerrain: ["water", "open", "bog"],
      adverseTerrain: "forest, urban, lava",
    },
  };

  normalizeVehicleMovementProfile(system);
  const summary = buildVehicleProfileSummary(system);

  assert.equal(summary.key, "hover");
  assert.equal(summary.family, "ground");
  assert.deepEqual(summary.favoredTerrain, ["water", "open"]);
  assert.deepEqual(summary.adverseTerrain, ["forest", "urban"]);
  assert.ok(summary.affordances.includes("redline"));
});

test("VTOL profile carries rotor/vector subtype without becoming a separate pipeline", () => {
  const system = { mwd: { movementProfile: "vtol", flightSubtype: "vector" } };
  normalizeVehicleMovementProfile(system);
  const summary = buildVehicleProfileSummary(system);

  assert.equal(summary.label, "VTOL (Vector)");
  assert.equal(summary.family, "flight");
  assert.ok(summary.affordances.includes("spotting"));
  assert.ok(summary.affordances.includes("ew"));
});

test("vehicle strain is vehicle-only operational stress with provider-facing effects", () => {
  const system = { mwd: { strain: { value: 4, pendingGenerated: 1 } } };
  normalizeVehicleStrainState(system, "vehicle");

  const model = buildVehicleStrainModel({ type: "vehicle", system });
  const effects = getVehicleStrainStateEffects({ type: "vehicle", system });

  assert.equal(model.status, "overstressed");
  assert.equal(model.pendingGenerated, 1);
  assert.equal(effects.handling, -1);
  assert.equal(effects.system, -1);
  assert.equal(effects.redlineBlocked, false);
});

test("vehicle movement choices only generate strain on Redline", () => {
  const choices = buildVehicleMovementActionChoices(vehicle());
  const byId = new Map(choices.map(choice => [choice.id, choice]));

  assert.equal(byId.get("move")?.cost, 1);
  assert.equal(byId.get("move")?.strain, 0);
  assert.equal(byId.get("reposition")?.cost, 2);
  assert.equal(byId.get("reposition")?.strain, 0);
  assert.equal(byId.get("redline")?.cost, 3);
  assert.equal(byId.get("redline")?.strain, 1);
});

test("vehicle mounted fire discovers occupied hardpoint machine weapons directly", () => {
  const weapon = { id: "ac-5", type: "mechWeapon", canonicalType: "mechWeapon", name: "AC/5" };
  const loose = { id: "loose", type: "mechWeapon", canonicalType: "mechWeapon", name: "Loose Laser" };
  const actor = vehicle({
    profile: {
      hardpoints: [
        { id: "hp-front", type: "penetrating", size: "medium", location: "front", itemId: "ac-5" },
      ],
    },
  });
  actor.items = [weapon, loose];

  const mounted = getMountedMachineItems(actor, { canonicalType: "mechWeapon" });
  assert.deepEqual(mounted.map(item => item.id), ["ac-5"]);
});

test("critical vehicle strain blocks Redline but not normal movement", () => {
  const choices = buildVehicleMovementActionChoices(vehicle({ strain: { value: 6 } }));
  const byId = new Map(choices.map(choice => [choice.id, choice]));

  assert.equal(byId.get("move")?.disabled, false);
  assert.equal(byId.get("redline")?.disabled, true);
  assert.match(byId.get("redline")?.reason, /critical/i);
});

test("hull-down provides a stronger prepared-position CQ identity for vehicles", () => {
  const vehicleCq = getMachineAttackCqAdjustments(vehicle({ statuses: ["entrenchedHullDown"] }), { role: "defender" });
  const mechCq = getMachineAttackCqAdjustments({
    type: "battlemech",
    statuses: new Set(["entrenchedHullDown"]),
    system: { mwd: { crits: [], locations: {} } },
  }, { role: "defender" });

  assert.ok(vehicleCq.dr > mechCq.dr);
});

test("vehicle degradation distinguishes turret and mobility consequences", () => {
  const actor = vehicle({
    locations: {
      turret: { condition: 4 },
      rotor: { enabled: true, condition: 4 },
    },
  });

  const state = getMachineRuleState(actor);
  const movement = getMachineMovementEffects(actor);

  assert.equal(state.turretOffline, true);
  assert.equal(movement.immobile, true);
});
