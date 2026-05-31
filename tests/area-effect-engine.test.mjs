import test from "node:test";
import assert from "node:assert/strict";

import {
  AREA_EFFECT_KINDS,
  isDiscreteAreaEffect,
  isPersistentAreaEffect,
  normalizeAreaEffect,
} from "../src/modules/area-effects/area-effect-engine.js";

test("area effect normalization keeps no area effect explicit", () => {
  const areaEffect = normalizeAreaEffect({});

  assert.equal(areaEffect.kind, AREA_EFFECT_KINDS.none);
  assert.equal(areaEffect.hazard, null);
  assert.equal(isDiscreteAreaEffect(areaEffect), false);
  assert.equal(isPersistentAreaEffect(areaEffect), false);
});

test("area effect normalization preserves discrete and persistent payloads", () => {
  const discrete = normalizeAreaEffect({ kind: AREA_EFFECT_KINDS.discrete });
  const persistent = normalizeAreaEffect({
    kind: AREA_EFFECT_KINDS.persistent,
    hazard: { startExposure: "major" },
  });

  assert.equal(discrete.kind, AREA_EFFECT_KINDS.discrete);
  assert.equal(discrete.hazard, null);
  assert.equal(isDiscreteAreaEffect(discrete), true);

  assert.equal(persistent.kind, AREA_EFFECT_KINDS.persistent);
  assert.equal(persistent.hazard.startExposure, "major");
  assert.equal(isPersistentAreaEffect(persistent), true);
});
