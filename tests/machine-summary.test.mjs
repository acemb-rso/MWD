import test from "node:test";
import assert from "node:assert/strict";

import {
  buildCriticalStatusSummary,
  buildIntegrityPart,
  buildIntegritySummary,
  getIntegrityToneForPercent,
} from "../src/modules/mwd/machine-summary.js";

test("integrity tones follow remaining percentage thresholds", () => {
  assert.equal(getIntegrityToneForPercent(100), "green");
  assert.equal(getIntegrityToneForPercent(91), "green");
  assert.equal(getIntegrityToneForPercent(90), "yellow");
  assert.equal(getIntegrityToneForPercent(71), "yellow");
  assert.equal(getIntegrityToneForPercent(70), "orange");
  assert.equal(getIntegrityToneForPercent(51), "orange");
  assert.equal(getIntegrityToneForPercent(50), "red");
  assert.equal(getIntegrityToneForPercent(31), "red");
  assert.equal(getIntegrityToneForPercent(30), "dark-red");
  assert.equal(getIntegrityToneForPercent(0), "dark-red");
});

test("integrity parts display remaining monitor values directly", () => {
  const armor = buildIntegrityPart("A", { value: 8, max: 10 });
  assert.equal(armor.value, "8");
  assert.equal(armor.title, "8/10");
  assert.equal(armor.remaining, 8);
  assert.equal(armor.tone, "yellow");

  const summary = buildIntegritySummary({
    armor: { value: 15, max: 15 },
    structure: { value: 9, max: 18 },
  });
  assert.deepEqual(summary.parts.map(part => part.value), ["15", "9"]);
  assert.deepEqual(summary.parts.map(part => part.tone), ["green", "red"]);
  assert.equal(summary.title, "Armor 15/15; Structure 9/18");
});

test("critical status summary counts active criticals and builds tooltip text", () => {
  assert.deepEqual(buildCriticalStatusSummary([]), { value: "CLEAR", title: "", count: 0 });
  assert.equal(buildCriticalStatusSummary([{ label: "Resolved", active: false }]).value, "CLEAR");

  const one = buildCriticalStatusSummary([
    { label: "Targeting Fault", locationLabel: "Head", active: true },
  ]);
  assert.equal(one.value, "1 CRIT");
  assert.equal(one.title, "Targeting Fault (Head)");

  const many = buildCriticalStatusSummary([
    { label: "Targeting Fault", locationLabel: "Head", active: true },
    { label: "Cooling Leak", locationLabel: "Core", active: true },
  ]);
  assert.equal(many.value, "2 CRITS");
  assert.equal(many.title, "Targeting Fault (Head); Cooling Leak (Core)");
});
