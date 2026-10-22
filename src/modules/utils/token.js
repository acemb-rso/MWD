// src/modules/utils/token.js
// Purpose: Shared stateless token shape helpers for placeables, documents, and tests.

function clean(value = "") {
  return String(value ?? "").trim();
}

function getGridSize({ scene = null, gridSize = null } = {}) {
  return Math.max(
    1,
    Number(gridSize ?? scene?.grid?.size ?? globalThis.canvas?.grid?.size ?? globalThis.canvas?.dimensions?.size ?? 100) || 100
  );
}

export function getTokenDocument(token = null) {
  return token?.document ?? token ?? null;
}

export function getTokenObject(token = null) {
  const document = getTokenDocument(token);
  return token?.object ?? document?.object ?? token ?? null;
}

export function getTokenActor(token = null) {
  return token?.actor ?? token?.document?.actor ?? token?.actorLink?.actor ?? null;
}

// The token an actor acts through on the viewed scene: a controlled token of
// that actor first, then its first active token (document).
export function getActorActiveToken(actor = null) {
  if (!actor) return null;
  return globalThis.canvas?.tokens?.controlled?.find(token => token?.actor?.id === actor.id)
    ?? actor.getActiveTokens?.(true, true)?.[0]
    ?? null;
}

export function getTokenId(token = null) {
  return clean(token?.document?.id ?? token?.id ?? token?.tokenId);
}

export function getTokenUuid(token = null) {
  return clean(token?.document?.uuid ?? token?.uuid);
}

export function getTokenDisposition(token = null, fallback = 0) {
  return Number(
    token?.document?.disposition
      ?? token?.disposition
      ?? token?.data?.disposition
      ?? fallback
  ) || 0;
}

// The system's side test: tokens sharing a disposition are on the same side;
// any different disposition is the other side.
export function isSameDisposition(sourceToken = null, targetToken = null) {
  return getTokenDisposition(sourceToken) === getTokenDisposition(targetToken);
}

export function getTokenCenter(token = null, { scene = null, gridSize = null } = {}) {
  if (!token) return null;
  const document = getTokenDocument(token) ?? {};
  const center = token?.center ?? token?.object?.center ?? document?.object?.center;
  if (center) {
    return {
      x: Number(center.x ?? 0),
      y: Number(center.y ?? 0),
    };
  }

  const size = getGridSize({ scene, gridSize });
  const widthPixels = token?.w ?? ((Number(token?.width ?? document.width ?? 1) || 1) * size);
  const heightPixels = token?.h ?? ((Number(token?.height ?? document.height ?? 1) || 1) * size);
  return {
    x: Number(token?.x ?? document.x ?? 0) + (widthPixels / 2),
    y: Number(token?.y ?? document.y ?? 0) + (heightPixels / 2),
  };
}

export function getMeasuredTokenCenter(token = null, { pendingPositions = null, useTokenPositionFallback = true } = {}) {
  if (!token) return null;

  const document = getTokenDocument(token);
  const object = getTokenObject(token);
  const tokenId = clean(document?.id ?? token?.id);
  const pendingPosition = pendingPositions?.get?.(tokenId) ?? null;
  const x = Number(pendingPosition?.x ?? document?.x ?? (useTokenPositionFallback ? token?.x : undefined));
  const y = Number(pendingPosition?.y ?? document?.y ?? (useTokenPositionFallback ? token?.y : undefined));

  if (object && Number.isFinite(x) && Number.isFinite(y)) {
    if (typeof object.getCenterPoint === "function") {
      return object.getCenterPoint({ x, y });
    }
    if (typeof object.getCenter === "function") {
      return object.getCenter(x, y);
    }
  }

  return object?.center
    ?? document?.object?.center
    ?? null;
}
