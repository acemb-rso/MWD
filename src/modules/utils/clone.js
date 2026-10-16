// src/modules/utils/clone.js
// Purpose: Canonical deep-clone helper with explicit fallback shape.

export function cloneValue(value, fallback) {
  const effectiveFallback = arguments.length > 1 ? fallback : null;
  const source = value === undefined ? effectiveFallback : value;
  if (source === undefined) return undefined;

  if (typeof globalThis.foundry?.utils?.deepClone === "function") {
    try {
      return globalThis.foundry.utils.deepClone(source);
    } catch (_error) {
      // Some test doubles and document-shaped values cannot be cloned by the
      // active Foundry helper. Fall through to platform/JSON cloning.
    }
  }

  if (typeof globalThis.structuredClone === "function") {
    try {
      return globalThis.structuredClone(source);
    } catch (_error) {
      // JSON is the final fallback for plain data payloads.
    }
  }

  return JSON.parse(JSON.stringify(source));
}
