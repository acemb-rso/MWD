import test from "node:test";
import assert from "node:assert/strict";

import { buildBattlemechMovementActionChoices } from "../src/modules/mwd/battlemech-movement-actions.js";

test("battlemech movement actions always include baseline ground choices", () => {
  const choices = buildBattlemechMovementActionChoices({
    type: "battlemech",
    system: {},
    statuses: new Set(),
  });

  assert.deepEqual(
    choices.slice(0, 4).map(choice => choice.id),
    ["walk", "run", "sprint", "prone"],
  );
  assert.equal(choices.find(choice => choice.id === "walk")?.cost, 1);
  assert.equal(choices.find(choice => choice.id === "run")?.cost, 1);
  assert.equal(choices.find(choice => choice.id === "run")?.heat, 1);
  assert.equal(choices.find(choice => choice.id === "sprint")?.cost, 2);
  assert.equal(choices.find(choice => choice.id === "sprint")?.heat, 2);
});

test("battlemech movement actions add equipment-gated flight and jump choices", () => {
  const choices = buildBattlemechMovementActionChoices({
    type: "battlemech",
    system: {
      movement: { ground: 8, flight: 10 },
      mwd: {
        mobility: {
          jumping: {
            enabled: true,
            available: true,
            movement: 6,
            heat: 2,
            sourceLabel: "Jump Jets",
          },
        },
      },
    },
    statuses: new Set(),
  });

  assert.ok(choices.some(choice => choice.id === "fly"));
  const jump = choices.find(choice => choice.id === "jump");
  assert.equal(jump?.distance, 6);
  assert.equal(jump?.heat, 2);
});

test("battlemech movement actions derive jump choices from installed jump modules", () => {
  const choices = buildBattlemechMovementActionChoices({
    type: "battlemech",
    system: {
      movement: { ground: 8, flight: 0 },
      mwd: { crits: [] },
    },
    items: [{
      id: "jump-jets",
      type: "assetModule",
      name: "Jump Jets",
      system: {
        category: "mobility",
        mobility: {
          jumping: {
            enabled: true,
            movement: 5,
            heat: 1,
          },
        },
      },
    }],
    statuses: new Set(),
  });

  const jump = choices.find(choice => choice.id === "jump");
  assert.equal(jump?.label, "Jump");
  assert.equal(jump?.distance, 5);
  assert.equal(jump?.heat, 1);
  assert.match(jump?.hint ?? "", /Jump Jets/);
});

test("battlemech movement actions apply meter penalties with a 10 m floor", () => {
  const choices = buildBattlemechMovementActionChoices({
    type: "battlemech",
    system: {
      movement: { ground: 60, flight: 90 },
      mwd: {
        crits: [{ active: true, statusId: "limping" }],
        locations: {
          legs: { enabled: true, condition: 1, destroyed: false },
        },
      },
    },
    statuses: new Set(),
  });

  assert.equal(choices.find(choice => choice.id === "walk")?.distance, 10);
  assert.equal(choices.find(choice => choice.id === "fly")?.distance, 30);
  assert.match(choices.find(choice => choice.id === "walk")?.hint ?? "", /10 m/);
});
