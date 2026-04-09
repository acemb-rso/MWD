// src/modules/area-effects/area-effect-engine.js
// Purpose: Shared area effect helpers for exposure math, preview state, and Region payloads.
// How it fits: Keeps template attack and persistent hazard logic on one data contract.

const EXPOSURE_ORDER = Object.freeze(["none", "minor", "major", "full"]);

export const EXPOSURE_TIERS = Object.freeze({
  none: "none",
  minor: "minor",
  major: "major",
  full: "full",
});

export const EXPOSURE_MULTIPLIERS = Object.freeze({
  none: 0,
  minor: 0.25,
  major: 0.5,
  full: 1,
});

export const AREA_EFFECT_KINDS = Object.freeze({
  discrete: "discrete",
  persistent: "persistent",
});

function asNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function asBoolean(value, fallback = false) {
  if (typeof value === "boolean") return value;
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["true", "1", "yes", "y", "on"].includes(normalized)) return true;
  if (["false", "0", "no", "n", "off"].includes(normalized)) return false;
  return fallback;
}

export function normalizeExposureTier(value, fallback = EXPOSURE_TIERS.none) {
  const normalized = String(value ?? "").trim().toLowerCase();
  return EXPOSURE_ORDER.includes(normalized) ? normalized : fallback;
}

export function getExposureMultiplier(tier) {
  return Number(EXPOSURE_MULTIPLIERS[normalizeExposureTier(tier)] ?? 0) || 0;
}

export function getExposureIndex(tier) {
  return EXPOSURE_ORDER.indexOf(normalizeExposureTier(tier));
}

export function getReducedExposureTier(tier, steps = 1) {
  const start = Math.max(0, getExposureIndex(tier));
  const next = Math.max(0, start - Math.max(0, Math.trunc(asNumber(steps, 1))));
  return EXPOSURE_ORDER[next] ?? EXPOSURE_TIERS.none;
}

export function getRaisedExposureTier(tier, steps = 1) {
  const start = Math.max(0, getExposureIndex(tier));
  const next = Math.min(EXPOSURE_ORDER.length - 1, start + Math.max(0, Math.trunc(asNumber(steps, 1))));
  return EXPOSURE_ORDER[next] ?? EXPOSURE_TIERS.full;
}

export function getExposureLabel(tier) {
  return normalizeExposureTier(tier).toUpperCase();
}

export function normalizeHazardDefinition(value = {}) {
  const source = value ?? {};
  const intervalTurns = Math.max(1, Math.trunc(asNumber(
    source?.escalation?.intervalTurns ?? source?.escalation?.interval ?? 1,
    1
  )));
  const rate = Math.max(0, Math.trunc(asNumber(source?.escalation?.rate ?? 1, 1)));

  return {
    startExposure: normalizeExposureTier(source.startExposure, EXPOSURE_TIERS.minor),
    escalation: {
      rate,
      intervalTurns,
      max: normalizeExposureTier(source?.escalation?.max, EXPOSURE_TIERS.full),
    },
    onFull: {
      burnDelta: Math.max(0, Math.trunc(asNumber(source?.onFull?.burnDelta ?? 0, 0))),
    },
    clearOnExit: asBoolean(source.clearOnExit, true),
  };
}

export function normalizeAreaEffect(value = {}) {
  const source = value ?? {};
  const kind = String(source.kind ?? AREA_EFFECT_KINDS.discrete).trim().toLowerCase() === AREA_EFFECT_KINDS.persistent
    ? AREA_EFFECT_KINDS.persistent
    : AREA_EFFECT_KINDS.discrete;

  return {
    kind,
    hazard: kind === AREA_EFFECT_KINDS.persistent
      ? normalizeHazardDefinition(source.hazard ?? source)
      : null,
  };
}

export function isPersistentAreaEffect(value = {}) {
  return normalizeAreaEffect(value).kind === AREA_EFFECT_KINDS.persistent;
}

export function isDiscreteAreaEffect(value = {}) {
  return normalizeAreaEffect(value).kind === AREA_EFFECT_KINDS.discrete;
}

export function scaleDamageByExposure(value, tier) {
  return Math.max(0, Math.ceil(asNumber(value, 0) * getExposureMultiplier(tier)));
}

export function getTokenCenterPoint(token) {
  const center = token?.center ?? token?.object?.center ?? null;
  if (center) {
    return {
      x: asNumber(center.x, 0),
      y: asNumber(center.y, 0),
    };
  }

  const x = asNumber(token?.x ?? token?.document?.x, 0);
  const y = asNumber(token?.y ?? token?.document?.y, 0);
  const width = asNumber(token?.w ?? token?.object?.w ?? token?.document?.width, 1);
  const height = asNumber(token?.h ?? token?.object?.h ?? token?.document?.height, 1);
  const gridSize = asNumber(canvas?.grid?.size ?? canvas?.dimensions?.size, 100);
  return {
    x: x + ((width * gridSize) / 2),
    y: y + ((height * gridSize) / 2),
  };
}

function distanceBetweenPoints(a = {}, b = {}) {
  return Math.hypot(asNumber(a.x, 0) - asNumber(b.x, 0), asNumber(a.y, 0) - asNumber(b.y, 0));
}

function getSceneDistanceUnit() {
  return asNumber(canvas?.scene?.grid?.distance ?? canvas?.dimensions?.distance, 1) || 1;
}

function getGridSizePixels() {
  return asNumber(canvas?.grid?.size ?? canvas?.dimensions?.size, 100) || 100;
}

function sceneDistanceToPixels(distance = 0) {
  return asNumber(distance, 0) * (getGridSizePixels() / getSceneDistanceUnit());
}

function authoredTemplateDistance(template = {}, placement = {}) {
  const distance = asNumber(placement?.distance ?? template?.distance ?? template?.size, 0);
  return distance > 0 ? distance : 0;
}

function normalizeDirectionRadians(value) {
  return (asNumber(value, 0) * Math.PI) / 180;
}

function projectionDistanceOnTemplate({ placement = {}, tokenCenter = {} } = {}) {
  const anchor = placement?.anchor ?? { x: 0, y: 0 };
  const radians = normalizeDirectionRadians(placement?.direction ?? 0);
  const dx = asNumber(tokenCenter.x, 0) - asNumber(anchor.x, 0);
  const dy = asNumber(tokenCenter.y, 0) - asNumber(anchor.y, 0);
  const dirX = Math.cos(radians);
  const dirY = Math.sin(radians);
  return Math.max(0, (dx * dirX) + (dy * dirY));
}

function classifyDistanceBand(distancePx = 0, maxDistancePx = 0) {
  if (!(maxDistancePx > 0)) return EXPOSURE_TIERS.none;
  const ratio = Math.max(0, Math.min(1, distancePx / maxDistancePx));
  if (ratio <= (1 / 3)) return EXPOSURE_TIERS.full;
  if (ratio <= (2 / 3)) return EXPOSURE_TIERS.major;
  if (ratio <= 1) return EXPOSURE_TIERS.minor;
  return EXPOSURE_TIERS.none;
}

export function classifyTemplateExposure({ template = {}, placement = {}, token = null } = {}) {
  if (!token) return EXPOSURE_TIERS.none;

  const tokenCenter = getTokenCenterPoint(token);
  const shape = String(template?.shape ?? placement?.shape ?? "").trim().toLowerCase();
  const maxDistancePx = sceneDistanceToPixels(authoredTemplateDistance(template, placement));
  if (!(maxDistancePx > 0)) return EXPOSURE_TIERS.none;

  if (shape === "line" || shape === "cone") {
    const projectionPx = projectionDistanceOnTemplate({ placement, tokenCenter });
    return classifyDistanceBand(projectionPx, maxDistancePx);
  }

  const anchor = placement?.anchor ?? { x: 0, y: 0 };
  const radialDistancePx = distanceBetweenPoints(anchor, tokenCenter);
  return classifyDistanceBand(radialDistancePx, maxDistancePx);
}

export function createExposureData({ tier = EXPOSURE_TIERS.none, appliedTier = null, evadeUsed = false, evadeLocked = false } = {}) {
  const initialTier = normalizeExposureTier(tier, EXPOSURE_TIERS.none);
  const finalTier = normalizeExposureTier(appliedTier ?? initialTier, initialTier);
  return {
    initialTier,
    initialLabel: getExposureLabel(initialTier),
    initialMultiplier: getExposureMultiplier(initialTier),
    finalTier,
    finalLabel: getExposureLabel(finalTier),
    finalMultiplier: getExposureMultiplier(finalTier),
    evadeUsed: Boolean(evadeUsed),
    evadeLocked: Boolean(evadeLocked),
  };
}

export function applyEvadeToExposure(exposure = {}, { locked = false, active = false } = {}) {
  const initialTier = normalizeExposureTier(exposure?.initialTier ?? exposure?.tier, EXPOSURE_TIERS.none);
  if (!active || locked || initialTier === EXPOSURE_TIERS.none) {
    return createExposureData({
      tier: initialTier,
      appliedTier: initialTier,
      evadeUsed: false,
      evadeLocked: Boolean(locked),
    });
  }

  const finalTier = getReducedExposureTier(initialTier, 1);
  return createExposureData({
    tier: initialTier,
    appliedTier: finalTier,
    evadeUsed: initialTier !== finalTier,
    evadeLocked: Boolean(locked),
  });
}

function buildPolygonPoints(points = []) {
  return points.map(point => ({
    x: Math.round(asNumber(point.x, 0)),
    y: Math.round(asNumber(point.y, 0)),
  }));
}

function buildLineRegionShape({ placement = {} } = {}) {
  const anchor = placement?.anchor ?? { x: 0, y: 0 };
  const distancePx = sceneDistanceToPixels(asNumber(placement.distance, 0));
  const halfWidthPx = sceneDistanceToPixels(getSceneDistanceUnit()) / 2;
  const radians = normalizeDirectionRadians(placement?.direction ?? 0);
  const dirX = Math.cos(radians);
  const dirY = Math.sin(radians);
  const perpX = -dirY;
  const perpY = dirX;
  const tip = {
    x: asNumber(anchor.x, 0) + (distancePx * dirX),
    y: asNumber(anchor.y, 0) + (distancePx * dirY),
  };

  return {
    type: "polygon",
    points: buildPolygonPoints([
      { x: anchor.x + (perpX * halfWidthPx), y: anchor.y + (perpY * halfWidthPx) },
      { x: tip.x + (perpX * halfWidthPx), y: tip.y + (perpY * halfWidthPx) },
      { x: tip.x - (perpX * halfWidthPx), y: tip.y - (perpY * halfWidthPx) },
      { x: anchor.x - (perpX * halfWidthPx), y: anchor.y - (perpY * halfWidthPx) },
    ]),
  };
}

function buildConeRegionShape({ placement = {} } = {}) {
  const anchor = placement?.anchor ?? { x: 0, y: 0 };
  const angleDegrees = asNumber(placement?.angle, 90);
  const distancePx = sceneDistanceToPixels(asNumber(placement.distance, 0));
  const direction = asNumber(placement?.direction, 0);
  const halfAngle = (angleDegrees / 2);
  const points = [{ x: anchor.x, y: anchor.y }];

  for (let step = 0; step <= 8; step += 1) {
    const delta = -halfAngle + ((angleDegrees / 8) * step);
    const radians = normalizeDirectionRadians(direction + delta);
    points.push({
      x: asNumber(anchor.x, 0) + (Math.cos(radians) * distancePx),
      y: asNumber(anchor.y, 0) + (Math.sin(radians) * distancePx),
    });
  }

  return {
    type: "polygon",
    points: buildPolygonPoints(points),
  };
}

export function createRegionShapesFromTemplatePlacement({ template = {}, placement = {} } = {}) {
  const shape = String(template?.shape ?? placement?.shape ?? "").trim().toLowerCase();
  if (!shape) return [];

  if (shape === "blast") {
    const radius = sceneDistanceToPixels(asNumber(placement.distance ?? template.size, 0));
    return [{
      type: "ellipse",
      x: Math.round(asNumber(placement?.anchor?.x, 0) - radius),
      y: Math.round(asNumber(placement?.anchor?.y, 0) - radius),
      radiusX: Math.round(radius),
      radiusY: Math.round(radius),
      rotation: 0,
    }];
  }

  if (shape === "line") {
    return [buildLineRegionShape({ placement })];
  }

  if (shape === "cone") {
    return [buildConeRegionShape({ placement })];
  }

  return [];
}

export function buildAreaEffectTargetState(target = {}, { evadeActive = false, evadeLocked = false } = {}) {
  const exposure = applyEvadeToExposure(target?.exposure ?? createExposureData({
    tier: target?.exposure?.initialTier ?? target?.exposure?.tier ?? EXPOSURE_TIERS.none,
  }), { active: evadeActive, locked: evadeLocked });
  return {
    exposure,
    evadeActive: Boolean(evadeActive && !evadeLocked && exposure.initialTier !== EXPOSURE_TIERS.none),
    evadeLocked: Boolean(evadeLocked),
  };
}
