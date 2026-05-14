import test from "node:test";
import assert from "node:assert/strict";

import {
  BATTLEMECH_HEAT_PROFILES,
  buildBattlemechHeatProfileUpdates,
  getBattlemechHeatProfile,
} from "../src/modules/mwd/battlemech-heat-profiles.js";

const EXPECTED_PROFILES = [
  ["HT-01", "D", 8, 2, 4, 6],
  ["HT-02", "C", 10, 3, 5, 7],
  ["HT-03", "B", 12, 3, 6, 8],
  ["HT-04", "A", 12, 4, 7, 9],
  ["HT-05", "AA", 13, 5, 8, 10],
  ["HT-06", "AAA", 14, 5, 9, 11],
  ["HT-07", "S", 15, 6, 9, 12],
  ["HT-08", "SS", 16, 6, 10, 13],
  ["HT-09", "SSS", 18, 7, 11, 15],
  ["HT-10", "X", 20, 8, 12, 16],
  ["HT-11", "XX", 20, 9, 13, 17],
  ["HT-12", "XXX", 24, 10, 14, 19],
];

test("BattleMech heat profile table maps every tier to track size and thresholds", () => {
  assert.equal(BATTLEMECH_HEAT_PROFILES.length, EXPECTED_PROFILES.length);

  for (const [code, tier, trackLength, runningHot, overheated, shutdown] of EXPECTED_PROFILES) {
    const profile = getBattlemechHeatProfile(code);
    assert.equal(profile?.tier, tier);
    assert.equal(profile?.trackLength, trackLength);
    assert.deepEqual(profile?.thresholds, { runningHot, overheated, shutdown });

    assert.deepEqual(buildBattlemechHeatProfileUpdates(code), {
      "system.mwd.heat.profileCode": code,
      "system.monitors.heat.max": trackLength,
      "system.mwd.heat.thresholds.runningHot": runningHot,
      "system.mwd.heat.thresholds.overheated": overheated,
      "system.mwd.heat.thresholds.shutdown": shutdown,
    });
  }
});

test("unknown BattleMech heat profile codes produce no profile update", () => {
  assert.equal(getBattlemechHeatProfile(""), null);
  assert.equal(getBattlemechHeatProfile("HT-99"), null);
  assert.equal(buildBattlemechHeatProfileUpdates("HT-99"), null);
});

