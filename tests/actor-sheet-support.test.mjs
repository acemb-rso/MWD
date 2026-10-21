import test from "node:test";
import assert from "node:assert/strict";

import {
  buildDetailRows,
  buildDetailTags,
  buildSummaryStats,
  compactList,
  toNumber,
  toSnippet,
} from "../src/modules/sheets/actor-sheet-support.js";

test("actor sheet helpers coerce finite numbers with fallback", () => {
  assert.equal(toNumber("4"), 4);
  assert.equal(toNumber(0, 9), 0);
  assert.equal(toNumber(Number.NaN, 7), 7);
  assert.equal(toNumber(Infinity, 7), 7);
});

test("actor sheet helpers build trimmed snippets from html text", () => {
  assert.equal(toSnippet("<p> Alpha   beta </p>", 20), "Alpha beta");
  assert.equal(toSnippet("abcdef", 5), "ab...");
  assert.equal(toSnippet("   "), "");
});

test("actor sheet helpers compact lists into non-empty strings", () => {
  assert.deepEqual(compactList([" Alpha ", "", null, "Beta"]), ["Alpha", "Beta"]);
  assert.deepEqual(buildDetailTags([" Alpha ", "", "Beta"]), [
    { label: "Alpha" },
    { label: "Beta" },
  ]);
});

test("actor sheet helpers build detail rows from populated values", () => {
  assert.deepEqual(buildDetailRows([
    { label: " Damage ", value: " 4 " },
    { label: "Empty", value: "" },
    { label: "Null", value: null },
  ]), [
    { label: "Damage", value: "4" },
  ]);
});

test("actor sheet helpers build plain and multipart summary stats", () => {
  assert.deepEqual(buildSummaryStats([
    { label: " Damage ", value: " 4 ", emphasis: "strong" },
    { label: "Empty", value: "" },
    {
      label: "Movement",
      value: "",
      tone: "warning",
      parts: [
        { label: "Walk", value: " 6 ", tone: "ok" },
        { label: "Run", value: "" },
      ],
    },
  ]), [
    {
      label: "Damage",
      value: "4",
      emphasis: "strong",
      title: "",
      tone: "",
      parts: [],
      hasParts: false,
    },
    {
      label: "Movement",
      value: "",
      emphasis: "",
      title: "",
      tone: "warning",
      parts: [
        { label: "Walk", value: "6", tone: "ok", title: "" },
      ],
      hasParts: true,
    },
  ]);
});
