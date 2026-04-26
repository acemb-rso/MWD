// src/modules/mwd/token-measurement.js
// Purpose: Shared token-to-token distance helpers for canvas-backed UI/roll flows.
// How it fits: EW panels, combat trackers, and roll intents can all measure with
// the same Foundry v12/v11-compatible fallback chain.

const pendingTokenPositions = new Map();

function getTokenCenter(token = null) {
  const tokenDocument = token?.document ?? token ?? null;
  const tokenObject = token?.object ?? tokenDocument?.object ?? token ?? null;
  const tokenId = String(tokenDocument?.id ?? token?.id ?? "").trim();
  const pendingPosition = pendingTokenPositions.get(tokenId) ?? null;
  const x = Number(pendingPosition?.x ?? tokenDocument?.x ?? token?.x);
  const y = Number(pendingPosition?.y ?? tokenDocument?.y ?? token?.y);

  if (tokenObject && Number.isFinite(x) && Number.isFinite(y)) {
    if (typeof tokenObject.getCenterPoint === "function") {
      return tokenObject.getCenterPoint({ x, y });
    }
    if (typeof tokenObject.getCenter === "function") {
      return tokenObject.getCenter(x, y);
    }
  }

  return tokenObject?.center
    ?? tokenDocument?.object?.center
    ?? null;
}

export function cachePendingTokenPosition(tokenDocument = null, changed = {}) {
  const tokenId = String(tokenDocument?.id ?? tokenDocument?.document?.id ?? "").trim();
  if (!tokenId) return false;

  const nextX = Object.prototype.hasOwnProperty.call(changed ?? {}, "x")
    ? Number(changed.x)
    : Number(tokenDocument?.x ?? tokenDocument?.document?.x);
  const nextY = Object.prototype.hasOwnProperty.call(changed ?? {}, "y")
    ? Number(changed.y)
    : Number(tokenDocument?.y ?? tokenDocument?.document?.y);

  if (!Number.isFinite(nextX) || !Number.isFinite(nextY)) return false;
  pendingTokenPositions.set(tokenId, { x: nextX, y: nextY });
  return true;
}

export function measureTokenDistance(sourceToken = null, targetToken = null) {
  const grid = globalThis.canvas?.grid;
  const sourceCenter = getTokenCenter(sourceToken);
  const targetCenter = getTokenCenter(targetToken);
  if (!grid || !sourceCenter || !targetCenter) return null;

  if (typeof grid.measurePath === "function") {
    try {
      const measurement = grid.measurePath([sourceCenter, targetCenter], { gridSpaces: true });
      const distance = Number(
        measurement?.distance
        ?? measurement?.cost
        ?? measurement?.totalDistance
        ?? measurement?.totalCost
        ?? NaN
      );
      if (Number.isFinite(distance)) return distance;
    } catch (_error) {
      // Fall through to legacy API.
    }
  }

  const RayCtor = globalThis.foundry?.canvas?.geometry?.Ray ?? globalThis.Ray;
  if (typeof grid.measureDistances === "function" && typeof RayCtor === "function") {
    try {
      const distances = grid.measureDistances([{ ray: new RayCtor(sourceCenter, targetCenter) }], { gridSpaces: true });
      const distance = Number(Array.isArray(distances) ? distances[0] : NaN);
      if (Number.isFinite(distance)) return distance;
    } catch (_error) {
      return null;
    }
  }

  return null;
}

export function formatDistanceLabel(distance, units = "") {
  if (!Number.isFinite(distance)) return "";

  const rounded = Math.round(Number(distance) * 10) / 10;
  const value = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return units ? `${value} ${units}` : value;
}
