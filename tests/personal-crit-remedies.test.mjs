import test from "node:test";
import assert from "node:assert/strict";

import { getCommonCheckDefinition } from "../src/modules/roll/config/common-checks.js";
import { getPersonalCritRemedy } from "../src/modules/mwd/personal-crit-remedies.js";
import { PERSONAL_CRITICAL_FAMILIES } from "../src/modules/mwd/personal-crit-families.js";

test("personal critical family remedies resolve to known actions or checks", () => {
  const expected = new Set(["reduceBurn", "endure", "composure", "firstAid", "readyItem", "steady"]);
  for (const family of Object.values(PERSONAL_CRITICAL_FAMILIES)) {
    for (const band of Object.values(family.bands)) {
      assert.ok(expected.has(band.remedyKey), `${family.id} ${band.statusId}`);
      const remedy = getPersonalCritRemedy(band.remedyKey);
      assert.equal(remedy.remediable, true);
      if (remedy.actionKind === "commonCheck") {
        assert.ok(getCommonCheckDefinition(remedy.actionId), `${remedy.actionId} common check exists`);
      }
    }
  }
});

test("composure is GUTS + CHA for Shaken remedies", () => {
  const composure = getCommonCheckDefinition("composure");
  assert.deepEqual(composure.formula, ["GUTS", "CHA"]);
  assert.equal(getPersonalCritRemedy("composure").baseDn, 2);

  const shakenBands = Object.values(PERSONAL_CRITICAL_FAMILIES.shaken.bands);
  for (const band of shakenBands) {
    assert.equal(band.remedyKey, "composure");
    assert.equal(band.remedyLabel, "Composure");
    assert.equal(band.remedyBaseDn, 2);
  }
});

test("steady is REF + GUTS for Off Balance remedies", () => {
  const steady = getCommonCheckDefinition("steady");
  assert.deepEqual(steady.formula, ["REF", "GUTS"]);
  assert.equal(getPersonalCritRemedy("steady").baseDn, 2);
});
