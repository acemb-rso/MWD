// src/modules/utils/document-update.js
// Purpose: Canonical Foundry document-update operators.
// How it fits: update payloads that must remove a stored key (legacy-field
// cleanup in item hooks, schema migrations) take their deletion operator from
// here, so every caller writes the same, working operator.

/**
 * The operator that removes a key in a Document update, e.g.
 * `{ "system.legacyField": forcedDeletion() }`.
 *
 * Foundry needs an operator **instance** (the global `_del`, i.e.
 * `ForcedDeletion.create()`); the `ForcedDeletion` class itself is not treated
 * as a deletion and leaves the key in place.
 */
export function forcedDeletion() {
  const operator = globalThis._del ?? globalThis.foundry?.data?.operators?.ForcedDeletion?.create?.();
  if (!operator) throw new Error("Foundry ForcedDeletion operator is unavailable.");
  return operator;
}
