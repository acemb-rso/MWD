import test from "node:test";
import assert from "node:assert/strict";

globalThis.foundry = {
  ...(globalThis.foundry ?? {}),
  applications: {
    ...(globalThis.foundry?.applications ?? {}),
    api: {
      ...(globalThis.foundry?.applications?.api ?? {}),
      ApplicationV2: globalThis.foundry?.applications?.api?.ApplicationV2 ?? class {},
      HandlebarsApplicationMixin: globalThis.foundry?.applications?.api?.HandlebarsApplicationMixin ?? (Base => Base),
    },
  },
};

const {
  parseBulkJson,
  serializeBulkJson,
} = await import("../src/modules/settings/bulk-json.js");

test("bulk JSON parses valid array and object shapes", () => {
  assert.deepEqual(parseBulkJson('[{"id":"a"}]'), [{ id: "a" }]);
  assert.deepEqual(parseBulkJson('{"athletics":["Running"]}', { expect: "object" }), {
    athletics: ["Running"],
  });
});

test("bulk JSON returns shape-appropriate empty values for blank input", () => {
  assert.deepEqual(parseBulkJson(""), []);
  assert.deepEqual(parseBulkJson("   ", { expect: "object" }), {});
  assert.deepEqual(parseBulkJson("", { emptyValue: ["default"] }), ["default"]);
});

test("bulk JSON reports malformed JSON and wrong top-level shapes", () => {
  assert.throws(
    () => parseBulkJson("{bad"),
    error => Array.isArray(error.validationErrors)
      && /Bulk JSON must be valid JSON/.test(error.validationErrors[0])
  );

  assert.throws(
    () => parseBulkJson('{"not":"array"}', { expect: "array" }),
    error => error.validationErrors?.[0] === "Bulk JSON must be an array."
  );

  assert.throws(
    () => parseBulkJson("[1]", { expect: "object" }),
    error => error.validationErrors?.[0] === "Bulk JSON must be an object."
  );
});

test("bulk JSON wraps domain normalization failures as collection validation errors", () => {
  assert.throws(
    () => parseBulkJson("[1]", {
      normalize() {
        const error = new Error("Invalid row.");
        error.validationErrors = ["Row 1: invalid."];
        throw error;
      },
    }),
    error => error.validationErrors?.[0] === "Row 1: invalid."
  );
});

test("bulk JSON serializes normalized values with stable pretty formatting", () => {
  assert.equal(
    serializeBulkJson([{ id: "a", value: 1 }]),
    '[\n  {\n    "id": "a",\n    "value": 1\n  }\n]'
  );

  assert.equal(
    serializeBulkJson([{ value: "1" }], {
      normalize: rows => rows.map(row => ({ value: Number(row.value) })),
    }),
    '[\n  {\n    "value": 1\n  }\n]'
  );
});
