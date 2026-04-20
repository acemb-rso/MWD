import test from "node:test";
import assert from "node:assert/strict";

import { buildBattlemechMobilityModel } from "../src/modules/mwd/battlemech-mobility.js";

test("battlemech mobility derives jumping from installed asset modules", () => {
  const actor = {
    type: "battlemech",
    system: { mwd: { crits: [] } },
    items: [{
      id: "jump-jet-1",
      type: "assetModule",
      name: "Jump Jet",
      system: {
        category: "mobility",
        level: 1,
        mobility: {
          jumping: {
            enabled: true,
            movement: 4,
            heat: 2,
            attackRatingBonus: 1,
            defenseRatingBonus: 2,
            dfaEnabled: true,
          },
        },
      },
    }],
  };

  const mobility = buildBattlemechMobilityModel(actor);

  assert.equal(mobility.jumping.enabled, true);
  assert.equal(mobility.jumping.available, true);
  assert.equal(mobility.jumping.movement, 4);
  assert.equal(mobility.jumping.heat, 2);
  assert.equal(mobility.jumping.attackRatingBonus, 1);
  assert.equal(mobility.jumping.defenseRatingBonus, 2);
  assert.equal(mobility.jumping.dfaEnabled, true);
  assert.deepEqual(mobility.jumping.sourceNames, ["Jump Jet"]);
});

test("battlemech mobility treats legacy jump movement as a compatibility fallback", () => {
  const actor = {
    type: "battlemech",
    system: {
      movement: { jump: 5 },
      mwd: { crits: [] },
    },
    items: [],
  };

  const mobility = buildBattlemechMobilityModel(actor);

  assert.equal(mobility.jumping.enabled, true);
  assert.equal(mobility.jumping.legacy, true);
  assert.equal(mobility.jumping.movement, 5);
  assert.equal(mobility.jumping.heat, 0);
  assert.equal(mobility.jumping.dfaEnabled, true);
});

test("battlemech mobility blocks jumping when an active crit gates jump", () => {
  const actor = {
    type: "battlemech",
    system: {
      mwd: {
        crits: [{
          id: "crit-1",
          active: true,
          gates: ["jump"],
        }],
      },
    },
    items: [{
      id: "jump-jet-1",
      type: "assetModule",
      name: "Jump Jet",
      system: {
        mobility: {
          jumping: {
            enabled: true,
            movement: 4,
            heat: 1,
            attackRatingBonus: 0,
            defenseRatingBonus: 1,
            dfaEnabled: true,
          },
        },
      },
    }],
  };

  const mobility = buildBattlemechMobilityModel(actor);

  assert.equal(mobility.jumping.enabled, true);
  assert.equal(mobility.jumping.available, false);
  assert.equal(mobility.jumping.blocked, true);
  assert.match(mobility.jumping.blockedReason, /blocked/i);
  assert.equal(mobility.jumping.dfaEnabled, false);
});
