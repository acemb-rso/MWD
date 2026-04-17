import test from "node:test";
import assert from "node:assert/strict";

import {
  buildMachineMovementFields,
  buildMachineMovementSummaryParts,
  normalizeMachineMovement,
} from "../src/modules/mwd/machine-movement.js";

test("machine movement normalizes legacy moves into ground speed", () => {
  assert.deepEqual(
    normalizeMachineMovement({}, { actorType: "vehicle", legacyMoves: 7 }),
    { ground: 7, flight: 0 }
  );
});

test("vehicles expose ground and flight but no jump movement", () => {
  const fields = buildMachineMovementFields({
    actorType: "vehicle",
    movement: { ground: 8, flight: 0, jump: 4 },
    editing: true,
  });

  assert.deepEqual(fields.map(field => field.key), ["ground", "flight"]);
});

test("BattleMechs expose jump movement and hide zero flight outside edit mode", () => {
  const viewFields = buildMachineMovementFields({
    actorType: "battlemech",
    movement: { ground: 5, flight: 0 },
    jumpProfile: { enabled: true, movement: 3, heat: 1, attackRatingBonus: 1, defenseRatingBonus: 1, dfaEnabled: true },
    editing: false,
  });
  assert.deepEqual(viewFields.map(field => field.key), ["ground", "jump"]);

  const editFields = buildMachineMovementFields({
    actorType: "battlemech",
    movement: { ground: 5, flight: 0 },
    jumpProfile: { enabled: true, movement: 3, heat: 1, attackRatingBonus: 1, defenseRatingBonus: 1, dfaEnabled: true },
    editing: true,
  });
  assert.deepEqual(editFields.map(field => field.key), ["ground", "flight", "jump"]);
  assert.equal(editFields.find(field => field.key === "jump")?.editable, false);
});

test("BattleMechs do not expose jump movement without a jump capability", () => {
  const fields = buildMachineMovementFields({
    actorType: "battlemech",
    movement: { ground: 5, flight: 0, jump: 3 },
    editing: true,
  });

  assert.deepEqual(fields.map(field => field.key), ["ground", "flight"]);
});

test("movement summary includes flight only when capable", () => {
  assert.deepEqual(
    buildMachineMovementSummaryParts({
      actorType: "vehicle",
      movement: { ground: 10, flight: 6 },
    }),
    [
      { label: "Ground", value: "10" },
      { label: "Flight", value: "6" },
    ]
  );

  assert.deepEqual(
    buildMachineMovementSummaryParts({
      actorType: "vehicle",
      movement: { ground: 10, flight: 0 },
    }),
    [
      { label: "Ground", value: "10" },
    ]
  );
});
