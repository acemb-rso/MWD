// src/modules/utils/region.js
// Purpose: Canonical Foundry Region membership helpers.
// How it fits: Hazard regions and terrain regions both ask "is this token in
// this region?" through one place, so membership rules cannot drift apart.

import { getTokenCenter, getTokenDocument } from "./token.js";

/**
 * Whether a token's centre lies inside a Region. Uses Foundry's tracked
 * region membership when available, otherwise tests the token's centre point
 * (at its elevation) against the region's shapes.
 */
export function isTokenInRegion(region = null, token = null, { scene = null } = {}) {
  const tokenDocument = getTokenDocument(token);
  if (!region || !tokenDocument) return false;
  if (region.tokens?.has?.(tokenDocument)) return true;

  const center = getTokenCenter(token, { scene: scene ?? tokenDocument.parent ?? null });
  if (!center) return false;
  const point = {
    x: Number(center.x) || 0,
    y: Number(center.y) || 0,
    elevation: Number(tokenDocument.elevation ?? token?.elevation ?? 0) || 0,
  };
  try {
    return Boolean(region.testPoint?.(point));
  } catch (_error) {
    return false;
  }
}
