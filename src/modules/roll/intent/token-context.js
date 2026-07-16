// src/modules/roll/intent/token-context.js
// Purpose: Shared token and label helpers for roll intent resolvers.

import {
  getTokenId,
  getTokenUuid,
} from "../../utils/token.js";

export { getTokenId, getTokenUuid };

function clean(value = "") {
  return String(value ?? "").trim();
}

function getCanvasTokens() {
  return globalThis.canvas?.tokens ?? null;
}

export function resolveTokenById(id = "") {
  const tokenId = clean(id);
  if (!tokenId) return null;
  const tokens = getCanvasTokens();
  return tokens?.get?.(tokenId)
    ?? tokens?.placeables?.find?.(token => token.id === tokenId || token.document?.id === tokenId)
    ?? null;
}

export function resolveTokenByUuid(uuid = "") {
  const tokenUuid = clean(uuid);
  if (!tokenUuid) return null;
  return getCanvasTokens()?.placeables?.find?.(token => getTokenUuid(token) === tokenUuid) ?? null;
}

export function getTokenDisplayName(token = null, fallback = "Target") {
  return clean(token?.name ?? token?.actor?.name ?? fallback) || fallback;
}

export function withOwner(label = "", actor = null) {
  const base = clean(label);
  const owner = clean(actor?.name);
  return owner ? `${base} (${owner})` : base;
}

export function resolveRollTargetToken(payload = {}) {
  return resolveTokenByUuid(payload?.targetTokenUuid)
    ?? resolveTokenById(payload?.targetTokenId)
    ?? Array.from(globalThis.game?.user?.targets ?? []).find(token => token?.actor)
    ?? null;
}

export function resolveRollSourceToken(actor = null, payload = {}) {
  return resolveTokenByUuid(payload?.sourceTokenUuid)
    ?? resolveTokenById(payload?.sourceTokenId)
    ?? getCanvasTokens()?.controlled?.find?.(token => token?.actor?.id === actor?.id)
    ?? actor?.getActiveTokens?.(true, true)?.[0]
    ?? actor?.token?.object
    ?? actor?.token
    ?? null;
}

export function resolveRollObserverToken(payload = {}) {
  return resolveTokenById(payload?.targetTokenId)
    ?? resolveTokenByUuid(payload?.targetTokenUuid)
    ?? null;
}
