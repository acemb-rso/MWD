// src/modules/settings/bulk-json.js
// Purpose: Shared parse/serialize envelope for settings bulk JSON editors.
// How it fits: Keeps JSON syntax and top-level shape handling consistent while
// each settings module retains its domain-specific normalization.

import { createSettingsCollectionValidationError } from "./collection-editor.js";

function normalizeValidationErrors(error) {
  return Array.isArray(error?.validationErrors) ? error.validationErrors : [error?.message ?? String(error)];
}

function expectedShapeMessage(expect) {
  if (expect === "array") return "Bulk JSON must be an array.";
  if (expect === "object") return "Bulk JSON must be an object.";
  return "";
}

function shapeMatches(value, expect) {
  if (expect === "array") return Array.isArray(value);
  if (expect === "object") return Boolean(value && typeof value === "object" && !Array.isArray(value));
  return true;
}

export function serializeBulkJson(value, { normalize = null } = {}) {
  const output = typeof normalize === "function" ? normalize(value) : value;
  return JSON.stringify(output, null, 2);
}

export function parseBulkJson(raw, {
  expect = "array",
  emptyValue = expect === "object" ? {} : [],
  normalize = value => value,
} = {}) {
  const text = String(raw ?? "").trim();
  if (!text) return emptyValue;

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw createSettingsCollectionValidationError([
      `Bulk JSON must be valid JSON: ${error.message}`
    ]);
  }

  if (!shapeMatches(parsed, expect)) {
    throw createSettingsCollectionValidationError([expectedShapeMessage(expect)]);
  }

  try {
    return normalize(parsed);
  } catch (error) {
    throw createSettingsCollectionValidationError(normalizeValidationErrors(error));
  }
}
