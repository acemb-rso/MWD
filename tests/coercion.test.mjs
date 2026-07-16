import test from "node:test";
import assert from "node:assert/strict";

import {
  asArray,
  clamp,
  clampMin,
  compactStringList,
  toInteger,
  toNonNegativeInteger,
  toNumber,
  toTrimmedString,
} from "../src/modules/utils/coercion.js";

test("toNumber returns finite numbers and explicit fallbacks", () => {
  assert.equal(toNumber(4), 4);
  assert.equal(toNumber("4.5"), 4.5);
  assert.equal(toNumber(""), 0);
  assert.equal(toNumber("   "), 0);
  assert.equal(toNumber(null, 9), 0);
  assert.equal(toNumber(undefined, 9), 9);
  assert.equal(toNumber(true, 9), 1);
  assert.equal(toNumber({ value: 1 }, 9), 9);
  assert.equal(toNumber(Number.NaN, 9), 9);
  assert.equal(toNumber(Infinity, 9), 9);
  assert.equal(toNumber(-Infinity, 9), 9);
});

test("integer helpers truncate and clamp after number coercion", () => {
  assert.equal(toInteger(4.9), 4);
  assert.equal(toInteger(-4.9), -4);
  assert.equal(toInteger("7.8"), 7);
  assert.equal(toInteger("bad", 3.9), 3);
  assert.equal(toNonNegativeInteger(-4.9), 0);
  assert.equal(toNonNegativeInteger("7.8"), 7);
});

test("toTrimmedString trims and falls back for blank values", () => {
  assert.equal(toTrimmedString("  Alpha  "), "Alpha");
  assert.equal(toTrimmedString("   ", "Fallback"), "Fallback");
  assert.equal(toTrimmedString(null, "Fallback"), "Fallback");
  assert.equal(toTrimmedString(0, "Fallback"), "0");
  assert.equal(toTrimmedString(false, "Fallback"), "false");
});

test("asArray keeps arrays and rejects non-array shapes", () => {
  const source = ["a"];
  assert.equal(asArray(source), source);
  assert.deepEqual(asArray(null), []);
  assert.deepEqual(asArray(undefined), []);
  assert.deepEqual(asArray("a"), []);
  assert.deepEqual(asArray(new Set(["a"])), []);
  assert.deepEqual(asArray({ 0: "a", length: 1 }), []);
});

test("compactStringList trims entries, removes blanks, and preserves duplicates", () => {
  assert.deepEqual(compactStringList([" Alpha ", "", null, "Alpha", "Beta"]), [
    "Alpha",
    "Alpha",
    "Beta",
  ]);
  assert.deepEqual(compactStringList("Alpha"), []);
});

test("clamp helpers constrain finite values and use minimum for invalid values", () => {
  assert.equal(clamp(5, 0, 3), 3);
  assert.equal(clamp(-1, 0, 3), 0);
  assert.equal(clamp(2, 0, 3), 2);
  assert.equal(clamp("bad", 0, 3), 0);
  assert.equal(clampMin(-1, 0), 0);
  assert.equal(clampMin(4, 0), 4);
  assert.equal(clampMin("bad", 2), 2);
});
