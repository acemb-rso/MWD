// src/modules/mwd/token-measurement.js
// Purpose: Shared token-to-token distance helpers for canvas-backed UI/roll flows.
// How it fits: EW panels, combat trackers, and roll intents can all measure with
// the same Foundry v12/v11-compatible fallback chain.

function getTokenCenter(token = null) {
  return token?.center
    ?? token?.object?.center
    ?? null;
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
