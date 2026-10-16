import test from "node:test";
import assert from "node:assert/strict";

import { normalizeRulePrerequisites } from "../src/modules/mwd/rules.js";
import { normalizeTraitPrerequisites } from "../src/modules/mwd/traits.js";
import {
  compareTypedValues,
  parseTypedValue,
  stringifyTypedValue,
} from "../src/modules/mwd/typed-rule-values.js";

test("typed rule values parse strings into authored primitive values", () => {
  assert.equal(parseTypedValue("Alpha"), "Alpha");
  assert.equal(parseTypedValue("  Alpha  "), "Alpha");
  assert.equal(parseTypedValue(""), "");
  assert.equal(parseTypedValue("   "), "");
  assert.equal(parseTypedValue("true"), true);
  assert.equal(parseTypedValue("false"), false);
  assert.equal(parseTypedValue("4"), 4);
  assert.equal(parseTypedValue("-4.5"), -4.5);
  assert.equal(parseTypedValue("4x"), "4x");
  assert.deepEqual(parseTypedValue("[1,\"two\"]"), [1, "two"]);
  assert.deepEqual(parseTypedValue("{\"enabled\":true}"), { enabled: true });
  assert.equal(parseTypedValue("{bad json}"), "{bad json}");
  assert.equal(parseTypedValue(null), null);
  assert.equal(parseTypedValue(undefined), undefined);
});

test("typed rule values stringify using the existing rule/trait contract", () => {
  assert.equal(stringifyTypedValue(undefined), "");
  assert.equal(stringifyTypedValue(null), "");
  assert.equal(stringifyTypedValue("Alpha"), "Alpha");
  assert.equal(stringifyTypedValue(4), "4");
  assert.equal(stringifyTypedValue(false), "false");
  assert.equal(stringifyTypedValue({ enabled: true }), "{\"enabled\":true}");
});

test("typed rule value comparisons preserve existing comparator semantics", () => {
  assert.equal(compareTypedValues("a", "a", "eq"), true);
  assert.equal(compareTypedValues("1", 1, "eq"), false);
  assert.equal(compareTypedValues("1", 1, "neq"), true);
  assert.equal(compareTypedValues("5", 4, "gt"), true);
  assert.equal(compareTypedValues("5", 5, "gte"), true);
  assert.equal(compareTypedValues("3", 4, "lt"), true);
  assert.equal(compareTypedValues("4", 4, "lte"), true);
  assert.equal(compareTypedValues(["a", "b"], "b", "includes"), true);
  assert.equal(compareTypedValues("alpha", "ph", "includes"), true);
  assert.equal(compareTypedValues(["a"], "b", "notIncludes"), true);
  assert.equal(compareTypedValues("alpha", "zz", "notIncludes"), true);
  assert.equal(compareTypedValues(1, null, "truthy"), true);
  assert.equal(compareTypedValues(0, null, "falsy"), true);
  assert.equal(compareTypedValues("a", "a", "unsupported"), true);
});

test("rules and traits normalize comparator values through the same typed parser", () => {
  assert.deepEqual(normalizeRulePrerequisites([
    { fact: "module.active", op: "eq", value: "true" },
    { fact: "rating", gt: "2" },
  ]).map(entry => ({ op: entry.op, value: entry.value })), [
    { op: "eq", value: true },
    { op: "gt", value: 2 },
  ]);

  assert.deepEqual(normalizeTraitPrerequisites([
    { fact: "module.active", comparator: "eq", value: "true" },
    { fact: "rating", gt: "2" },
  ]).map(entry => ({ comparator: entry.comparator, value: entry.value })), [
    { comparator: "eq", value: true },
    { comparator: "gt", value: 2 },
  ]);
});
