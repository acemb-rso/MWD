import test from "node:test";
import assert from "node:assert/strict";

import { coerceDocumentFieldDescriptor } from "../src/modules/sheets/document-sheet-form.js";

test("field coercion handles numeric, boolean, and checkbox rules", () => {
  assert.equal(coerceDocumentFieldDescriptor({ elementKind: "input", inputType: "number", value: "7" }), 7);
  assert.equal(coerceDocumentFieldDescriptor({ elementKind: "input", dtype: "number", value: "3,181,082" }), 3181082);
  assert.equal(coerceDocumentFieldDescriptor({ elementKind: "input", dtype: "boolean", value: "true" }), true);
  assert.equal(coerceDocumentFieldDescriptor({ elementKind: "input", inputType: "checkbox", checked: true }), true);
});

test("unchecked radios are skipped while checked radios keep their value", () => {
  const skipped = coerceDocumentFieldDescriptor({ elementKind: "input", inputType: "radio", checked: false, value: "a" });
  const chosen = coerceDocumentFieldDescriptor({ elementKind: "input", inputType: "radio", checked: true, value: "b" });

  assert.equal(typeof skipped, "symbol");
  assert.equal(chosen, "b");
});
