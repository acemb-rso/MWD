// src/modules/mwd/typed-rule-values.js
// Purpose: Shared typed-value parsing, stringification, and comparison for
// declarative rule and trait conditions.
// How it fits: Keeps authored rule-value semantics consistent without moving
// rule evaluation, trait effects, or mechanics into a generic utility module.

export function parseTypedValue(value, _type = "", _options = {}) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if ((trimmed.startsWith("[") && trimmed.endsWith("]")) || (trimmed.startsWith("{") && trimmed.endsWith("}"))) {
    try {
      return JSON.parse(trimmed);
    } catch (_error) {
      return trimmed;
    }
  }
  return trimmed;
}

export function stringifyTypedValue(value, _type = "", _options = {}) {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    return JSON.stringify(value);
  } catch (_error) {
    return String(value);
  }
}

export function compareTypedValues(actual, expected, operator = "eq", _type = "") {
  switch (operator) {
    case "truthy": return !!actual;
    case "falsy": return !actual;
    case "neq": return actual !== expected;
    case "gt": return Number(actual) > Number(expected);
    case "gte": return Number(actual) >= Number(expected);
    case "lt": return Number(actual) < Number(expected);
    case "lte": return Number(actual) <= Number(expected);
    case "includes":
      return Array.isArray(actual)
        ? actual.includes(expected)
        : String(actual ?? "").includes(String(expected ?? ""));
    case "notIncludes":
      return Array.isArray(actual)
        ? !actual.includes(expected)
        : !String(actual ?? "").includes(String(expected ?? ""));
    case "eq":
    default:
      return actual === expected;
  }
}
