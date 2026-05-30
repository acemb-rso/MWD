import test from "node:test";
import assert from "node:assert/strict";

import {
  getHarmTrackLabel,
  normalizeHarmDelta,
  resolveArmorWearStep,
} from "../src/modules/harm/harm-engine-utils.js";

test("harm delta normalization truncates invalid or fractional input", () => {
  assert.equal(normalizeHarmDelta("4.9"), 4);
  assert.equal(normalizeHarmDelta("nope"), 0);
});

test("armor wear consumes reinforced charges before durability", () => {
  const reinforced = resolveArmorWearStep({
    incomingDamage: 3,
    armorBefore: 4,
    reinforcedBefore: 2,
    reinforcedMax: 2,
    hasArmorItem: true,
  });
  const plain = resolveArmorWearStep({
    incomingDamage: 3,
    armorBefore: 4,
    reinforcedBefore: 0,
    reinforcedMax: 0,
    hasArmorItem: true,
  });

  assert.equal(reinforced.reinforcedAfter, 1);
  assert.equal(reinforced.armorAfter, 4);
  assert.equal(plain.armorAfter, 3);
});

test("forceWear degrades armor even when an attack deals no net damage", () => {
  const skipped = resolveArmorWearStep({
    incomingDamage: 0,
    armorBefore: 4,
    hasArmorItem: true,
  });
  const forced = resolveArmorWearStep({
    incomingDamage: 0,
    armorBefore: 4,
    hasArmorItem: true,
    forceWear: true,
  });
  const forcedReinforced = resolveArmorWearStep({
    incomingDamage: 0,
    armorBefore: 4,
    reinforcedBefore: 2,
    reinforcedMax: 2,
    hasArmorItem: true,
    forceWear: true,
  });

  assert.equal(skipped.armorAfter, 4);
  assert.deepEqual(skipped.update, {});
  assert.equal(forced.armorAfter, 3);
  assert.equal(forced.update["system.durability.current"], 3);
  assert.equal(forcedReinforced.reinforcedAfter, 1);
  assert.equal(forcedReinforced.armorAfter, 4);
});

test("track labels prefer the canonical monitor names", () => {
  assert.equal(getHarmTrackLabel("physical"), "Physical");
  assert.equal(getHarmTrackLabel("fatigue"), "Fatigue");
  assert.equal(getHarmTrackLabel("custom"), "custom");
});
