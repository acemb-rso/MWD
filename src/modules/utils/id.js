// src/modules/utils/id.js
// Purpose: Canonical random id helper around Foundry randomID with explicit fallback formatting.

function fallbackId({ fallbackLength = 16, includeTimestamp = false } = {}) {
  const randomPart = Math.random().toString(36).slice(2, 2 + Math.max(1, fallbackLength));
  const padded = randomPart.padEnd(Math.max(1, fallbackLength), "0").slice(0, Math.max(1, fallbackLength));
  return includeTimestamp ? `${Date.now()}-${padded}` : padded;
}

export function createRandomId({ prefix = "", fallbackLength = 16, includeTimestamp = false, prefixFoundry = true } = {}) {
  const foundryId = globalThis.foundry?.utils?.randomID?.();
  const normalizedPrefix = String(prefix ?? "").trim();
  if (foundryId && (!normalizedPrefix || !prefixFoundry)) return String(foundryId).trim();
  const id = String(foundryId || fallbackId({ fallbackLength, includeTimestamp })).trim();
  return normalizedPrefix ? `${normalizedPrefix}-${id}` : id;
}
