// src/modules/mwd/battlemech-heat-profiles.js
// Purpose: Canonical BattleMech heat tier shortcut table.
// How it fits: Sheets use these presets to fill heat track thresholds while
//              preserving manual adjustment of the resulting fields.

export const BATTLEMECH_HEAT_PROFILES = Object.freeze([
  Object.freeze({ code: "HT-01", tier: "D", trackLength: 8, thresholds: Object.freeze({ runningHot: 2, overheated: 4, shutdown: 6 }) }),
  Object.freeze({ code: "HT-02", tier: "C", trackLength: 10, thresholds: Object.freeze({ runningHot: 3, overheated: 5, shutdown: 7 }) }),
  Object.freeze({ code: "HT-03", tier: "B", trackLength: 12, thresholds: Object.freeze({ runningHot: 3, overheated: 6, shutdown: 8 }) }),
  Object.freeze({ code: "HT-04", tier: "A", trackLength: 12, thresholds: Object.freeze({ runningHot: 4, overheated: 7, shutdown: 9 }) }),
  Object.freeze({ code: "HT-05", tier: "AA", trackLength: 13, thresholds: Object.freeze({ runningHot: 5, overheated: 8, shutdown: 10 }) }),
  Object.freeze({ code: "HT-06", tier: "AAA", trackLength: 14, thresholds: Object.freeze({ runningHot: 5, overheated: 9, shutdown: 11 }) }),
  Object.freeze({ code: "HT-07", tier: "S", trackLength: 15, thresholds: Object.freeze({ runningHot: 6, overheated: 9, shutdown: 12 }) }),
  Object.freeze({ code: "HT-08", tier: "SS", trackLength: 16, thresholds: Object.freeze({ runningHot: 6, overheated: 10, shutdown: 13 }) }),
  Object.freeze({ code: "HT-09", tier: "SSS", trackLength: 18, thresholds: Object.freeze({ runningHot: 7, overheated: 11, shutdown: 15 }) }),
  Object.freeze({ code: "HT-10", tier: "X", trackLength: 20, thresholds: Object.freeze({ runningHot: 8, overheated: 12, shutdown: 16 }) }),
  Object.freeze({ code: "HT-11", tier: "XX", trackLength: 20, thresholds: Object.freeze({ runningHot: 9, overheated: 13, shutdown: 17 }) }),
  Object.freeze({ code: "HT-12", tier: "XXX", trackLength: 24, thresholds: Object.freeze({ runningHot: 10, overheated: 14, shutdown: 19 }) }),
]);

export function getBattlemechHeatProfile(profileCode = "") {
  const code = String(profileCode ?? "").trim();
  if (!code) return null;
  return BATTLEMECH_HEAT_PROFILES.find(profile => profile.code === code) ?? null;
}

export function buildBattlemechHeatProfileUpdates(profileCode = "") {
  const profile = getBattlemechHeatProfile(profileCode);
  if (!profile) return null;

  return {
    "system.mwd.heat.profileCode": profile.code,
    "system.monitors.heat.max": profile.trackLength,
    "system.mwd.heat.thresholds.runningHot": profile.thresholds.runningHot,
    "system.mwd.heat.thresholds.overheated": profile.thresholds.overheated,
    "system.mwd.heat.thresholds.shutdown": profile.thresholds.shutdown,
  };
}

