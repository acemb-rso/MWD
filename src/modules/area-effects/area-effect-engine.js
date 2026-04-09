// src/modules/area-effects/area-effect-engine.js
// Purpose: Shared area effect helpers for exposure math, preview state, and Region payloads.
// How it fits: Keeps template attack and persistent hazard logic on one data contract.

const EXPOSURE_ORDER = Object.freeze(["none", "minor", "major", "full"]);
const TEMPLATE_SHAPES = Object.freeze(["blast", "cone", "line", "rect"]);
const MEASURED_TEMPLATE_TYPES = Object.freeze({
  blast: "circle",
  cone: "cone",
  line: "ray",
  rect: "rect",
});
const SHAPE_BY_MEASURED_TEMPLATE_TYPE = Object.freeze({
  circle: "blast",
  cone: "cone",
  ray: "line",
  rect: "rect",
  rectangle: "rect",
});

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

function deepClone(value) {
  return foundry.utils.deepClone(value);
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

export function normalizeTemplateShape(value, fallback = "") {
  const normalized = String(value ?? "").trim().toLowerCase();
  return TEMPLATE_SHAPES.includes(normalized) ? normalized : fallback;
}

export function getMeasuredTemplateTypeForShape(shape, fallback = "circle") {
  return MEASURED_TEMPLATE_TYPES[normalizeTemplateShape(shape)] ?? fallback;
}

export function getTemplateShapeForMeasuredType(value, fallback = "") {
  const normalized = String(value ?? "").trim().toLowerCase();
  return SHAPE_BY_MEASURED_TEMPLATE_TYPE[normalized] ?? fallback;
}

function normalizeDegrees(value) {
  let degrees = asNumber(value, 0);
  while (degrees < 0) degrees += 360;
  while (degrees >= 360) degrees -= 360;
  return degrees;
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

function pixelsToSceneDistance(pixels = 0) {
  return asNumber(pixels, 0) * (getSceneDistanceUnit() / getGridSizePixels());
}

function distanceBetweenPoints(a = {}, b = {}) {
  return Math.hypot(asNumber(a.x, 0) - asNumber(b.x, 0), asNumber(a.y, 0) - asNumber(b.y, 0));
}

function normalizeDirectionRadians(value) {
  return (asNumber(value, 0) * Math.PI) / 180;
}

function projectionDistanceOnTemplate({ geometry = {}, tokenCenter = {} } = {}) {
  const dx = asNumber(tokenCenter.x, 0) - asNumber(geometry.x, 0);
  const dy = asNumber(tokenCenter.y, 0) - asNumber(geometry.y, 0);
  const radians = normalizeDirectionRadians(geometry.direction ?? 0);
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

function normalizeLegacyPlacement({ template = {}, placement = {} } = {}) {
  const shape = normalizeTemplateShape(placement?.shape ?? template?.shape, "");
  if (!shape) return null;

  const size = asNumber(
    placement?.distance
      ?? template?.distance
      ?? template?.size,
    0
  );
  if (!(size > 0)) return null;

  const angle = shape === "cone"
    ? asNumber(placement?.angle ?? 90, 90)
    : null;
  const width = shape === "line"
    ? asNumber(placement?.width ?? getSceneDistanceUnit(), getSceneDistanceUnit())
    : null;
  const rectWidth = shape === "rect"
    ? asNumber(placement?.width ?? template?.width ?? placement?.distance ?? template?.distance ?? template?.size, 0)
    : null;
  const rectHeight = shape === "rect"
    ? asNumber(placement?.height ?? template?.height ?? placement?.distance ?? template?.distance ?? template?.size, 0)
    : null;

  if (shape === "rect" && (!(rectWidth > 0) || !(rectHeight > 0))) return null;

  return {
    shape,
    measuredTemplateType: getMeasuredTemplateTypeForShape(shape),
    x: asNumber(placement?.anchor?.x, 0),
    y: asNumber(placement?.anchor?.y, 0),
    direction: normalizeDegrees(placement?.direction ?? 0),
    distance: shape === "rect" ? Math.max(rectWidth, rectHeight) : size,
    angle,
    width,
    height: shape === "rect" ? rectHeight : null,
    anchorX: shape === "rect" ? asNumber(placement?.anchorX ?? template?.anchorX ?? 0, 0) : null,
    anchorY: shape === "rect" ? asNumber(placement?.anchorY ?? template?.anchorY ?? 0, 0) : null,
    placementMode: String(template?.placement ?? placement?.placementMode ?? "").trim() || null,
  };
}

export function normalizeTemplateGeometry(value = null, { template = null, placement = null } = {}) {
  const source = value && typeof value === "object" ? value : {};
  if ((!source || !Object.keys(source).length) && (template || placement)) {
    return normalizeLegacyPlacement({ template, placement });
  }

  const measuredTemplateType = String(
    source.measuredTemplateType
      ?? source.t
      ?? source.type
      ?? ""
  ).trim().toLowerCase();
  const shape = normalizeTemplateShape(
    source.shape
      ?? getTemplateShapeForMeasuredType(measuredTemplateType)
      ?? "",
    ""
  );
  if (!shape) {
    if (template || placement) return normalizeLegacyPlacement({ template, placement });
    return null;
  }

  const rectWidth = shape === "rect"
    ? asNumber(source.width ?? placement?.width ?? template?.width ?? source.distance ?? source.size, 0)
    : 0;
  const rectHeight = shape === "rect"
    ? asNumber(source.height ?? placement?.height ?? template?.height ?? source.distance ?? source.size, 0)
    : 0;

  const distance = asNumber(
    source.distance
      ?? source.size
      ?? source.templateDistance
      ?? placement?.distance
      ?? template?.distance
      ?? template?.size,
    0
  );
  if (shape === "rect") {
    if (!(rectWidth > 0) || !(rectHeight > 0)) return null;
  } else if (!(distance > 0)) return null;

  const geometry = {
    shape,
    measuredTemplateType: measuredTemplateType || getMeasuredTemplateTypeForShape(shape),
    x: asNumber(source.x ?? source.anchor?.x ?? placement?.anchor?.x, 0),
    y: asNumber(source.y ?? source.anchor?.y ?? placement?.anchor?.y, 0),
    direction: normalizeDegrees(source.direction ?? source.rotation ?? placement?.direction ?? 0),
    distance: shape === "rect" ? Math.max(rectWidth, rectHeight) : distance,
    angle: shape === "cone"
      ? asNumber(source.angle ?? placement?.angle ?? 90, 90)
      : null,
    width: shape === "line"
      ? asNumber(source.width ?? placement?.width ?? getSceneDistanceUnit(), getSceneDistanceUnit())
      : shape === "rect"
        ? rectWidth
        : null,
    height: shape === "rect"
      ? rectHeight
      : null,
    anchorX: shape === "rect"
      ? asNumber(source.anchorX ?? placement?.anchorX ?? template?.anchorX ?? 0, 0)
      : null,
    anchorY: shape === "rect"
      ? asNumber(source.anchorY ?? placement?.anchorY ?? template?.anchorY ?? 0, 0)
      : null,
    placementMode: String(source.placementMode ?? template?.placement ?? "").trim() || null,
  };

  return geometry;
}

export function createTemplateGeometryFromMeasuredTemplate(templateDoc = null, { placementMode = null, shapeHint = "" } = {}) {
  const doc = templateDoc?.document ?? templateDoc ?? null;
  if (!doc) return null;

  const rawType = String(doc.t ?? doc.type ?? "").trim().toLowerCase();
  const shape = normalizeTemplateShape(shapeHint || getTemplateShapeForMeasuredType(rawType), "");
  if (!shape) return null;

  return normalizeTemplateGeometry({
    shape,
    measuredTemplateType: rawType || getMeasuredTemplateTypeForShape(shape),
    x: doc.x,
    y: doc.y,
    direction: doc.direction,
    distance: doc.distance,
    angle: doc.angle,
    width: doc.width,
    placementMode,
  });
}

function getRegionShapeSource(shape = null) {
  if (!shape) return null;
  if (typeof shape?.toObject === "function") return shape.toObject();
  if (typeof shape?.toJSON === "function") return shape.toJSON();
  return shape && typeof shape === "object" ? deepClone(shape) : null;
}

function getUniquePositiveNumbers(values = []) {
  const out = [];
  for (const value of values) {
    const numeric = Number(value);
    if (!(numeric > 0)) continue;
    if (out.some(existing => Math.abs(existing - numeric) < 0.001)) continue;
    out.push(numeric);
  }
  return out;
}

function createTemplateGeometryFromRegionShape(shape = null, { placementMode = "region", shapeHint = "" } = {}) {
  const source = getRegionShapeSource(shape);
  if (!source || typeof source !== "object") return null;

  const rawType = String(source.type ?? "").trim().toLowerCase();
  const normalizedHint = normalizeTemplateShape(shapeHint, "");

  if (rawType === "circle") {
    return normalizeTemplateGeometry({
      shape: normalizedHint || "blast",
      measuredTemplateType: "circle",
      x: source.x,
      y: source.y,
      distance: pixelsToSceneDistance(source.radius),
      placementMode,
    });
  }

  if (rawType === "ellipse") {
    const radiusX = asNumber(source.radiusX, 0);
    const radiusY = asNumber(source.radiusY, 0);
    if (!(radiusX > 0) || Math.abs(radiusX - radiusY) > 0.001) return null;
    return normalizeTemplateGeometry({
      shape: normalizedHint || "blast",
      measuredTemplateType: "circle",
      x: asNumber(source.x, 0) + radiusX,
      y: asNumber(source.y, 0) + radiusY,
      distance: pixelsToSceneDistance(radiusX),
      placementMode,
    });
  }

  if (rawType === "cone") {
    return normalizeTemplateGeometry({
      shape: normalizedHint || "cone",
      measuredTemplateType: "cone",
      x: source.x,
      y: source.y,
      direction: source.rotation ?? source.direction,
      distance: pixelsToSceneDistance(source.radius),
      angle: source.angle,
      placementMode,
    });
  }

  if (rawType === "line") {
    const measuredSegments = Array.from(shape?.measuredSegments ?? []);
    const segmentDistances = getUniquePositiveNumbers(measuredSegments.map(segment => segment?.distance));
    const length = Math.max(
      asNumber(source.distance, 0),
      asNumber(source.length, 0),
      asNumber(source.radius, 0),
      ...segmentDistances,
      0
    );
    const secondaryDistances = segmentDistances.filter(distance => Math.abs(distance - length) >= 0.001);
    const width = Math.max(
      0,
      asNumber(source.width, 0),
      asNumber(source.thickness, 0),
      secondaryDistances.length ? Math.min(...secondaryDistances) : 0
    ) || getSceneDistanceUnit();
    const origin = shape?.origin ?? source.origin ?? {};
    const primarySegment = measuredSegments.reduce((best, segment) => {
      const current = Number(segment?.distance ?? 0);
      const previous = Number(best?.distance ?? 0);
      return current > previous ? segment : best;
    }, null);

    return normalizeTemplateGeometry({
      shape: normalizedHint || "line",
      measuredTemplateType: "ray",
      x: origin.x ?? source.x,
      y: origin.y ?? source.y,
      direction: primarySegment?.angle ?? source.rotation ?? source.direction,
      distance: length,
      width,
      placementMode,
    });
  }

  if (rawType === "rectangle" || rawType === "rect") {
    return normalizeTemplateGeometry({
      shape: normalizedHint || "rect",
      measuredTemplateType: "rect",
      x: source.x,
      y: source.y,
      direction: source.rotation ?? source.direction,
      width: pixelsToSceneDistance(source.width),
      height: pixelsToSceneDistance(source.height),
      anchorX: source.anchorX,
      anchorY: source.anchorY,
      placementMode,
    });
  }

  return null;
}

export function createTemplateGeometryFromRegion(regionDoc = null, { placementMode = "region", shapeHint = "" } = {}) {
  const doc = regionDoc?.document ?? regionDoc ?? null;
  const shapes = Array.from(doc?.shapes ?? []);
  if (shapes.length !== 1) return null;
  return createTemplateGeometryFromRegionShape(shapes[0], { placementMode, shapeHint });
}

export function getMeasuredTemplateDocumentData(templateGeometry = null, { user = game.user } = {}) {
  const geometry = normalizeTemplateGeometry(templateGeometry);
  if (!geometry) return null;

  const data = {
    user: user?.id ?? null,
    t: geometry.measuredTemplateType,
    x: geometry.x,
    y: geometry.y,
    direction: geometry.direction,
    distance: geometry.distance,
    fillColor: user?.color ?? "#ff6400",
  };

  if (geometry.shape === "cone") data.angle = geometry.angle ?? 90;
  if (geometry.shape === "line") data.width = geometry.width ?? getSceneDistanceUnit();
  return data;
}

export function createLegacyTemplatePlacementFromGeometry(templateGeometry = null, template = null) {
  const geometry = normalizeTemplateGeometry(templateGeometry);
  if (!geometry) return null;

  return {
    template: {
      shape: geometry.shape,
      placement: geometry.placementMode ?? template?.placement ?? null,
      distance: geometry.distance,
      size: geometry.distance,
    },
    placement: {
      shape: geometry.shape,
      anchor: {
        x: geometry.x,
        y: geometry.y,
      },
      distance: geometry.distance,
      direction: geometry.direction,
      angle: geometry.angle ?? undefined,
      width: geometry.width ?? undefined,
      placementMode: geometry.placementMode ?? null,
    },
  };
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

function getTokenRadius(token) {
  const width = asNumber(token?.w ?? token?.object?.w ?? token?.document?.width, 1) * getGridSizePixels();
  const height = asNumber(token?.h ?? token?.object?.h ?? token?.document?.height, 1) * getGridSizePixels();
  return Math.max(width, height) / 2;
}

function pointInBlast({ geometry, tokenCenter, tokenRadius }) {
  const radiusPx = sceneDistanceToPixels(geometry.distance);
  return distanceBetweenPoints({ x: geometry.x, y: geometry.y }, tokenCenter) <= radiusPx + tokenRadius;
}

function pointInLine({ geometry, tokenCenter, tokenRadius }) {
  const distancePx = sceneDistanceToPixels(geometry.distance);
  const widthPx = sceneDistanceToPixels(geometry.width ?? getSceneDistanceUnit());
  const radians = normalizeDirectionRadians(geometry.direction);
  const dx = tokenCenter.x - geometry.x;
  const dy = tokenCenter.y - geometry.y;
  const dirX = Math.cos(radians);
  const dirY = Math.sin(radians);
  const projection = (dx * dirX) + (dy * dirY);
  if (projection < -tokenRadius || projection > distancePx + tokenRadius) return false;

  const closestDistance = Math.max(0, Math.min(distancePx, projection));
  const closestX = geometry.x + (closestDistance * dirX);
  const closestY = geometry.y + (closestDistance * dirY);
  return Math.hypot(tokenCenter.x - closestX, tokenCenter.y - closestY) <= tokenRadius + (widthPx / 2);
}

function pointInCone({ geometry, tokenCenter, tokenRadius }) {
  const distancePx = sceneDistanceToPixels(geometry.distance);
  const dx = tokenCenter.x - geometry.x;
  const dy = tokenCenter.y - geometry.y;
  const distance = Math.hypot(dx, dy);
  if (distance > distancePx + tokenRadius) return false;
  if (distance === 0) return true;

  const pointDirection = (Math.atan2(dy, dx) * 180) / Math.PI;
  let delta = pointDirection - geometry.direction;
  while (delta <= -180) delta += 360;
  while (delta > 180) delta -= 360;
  const halfAngle = asNumber(geometry.angle, 90) / 2;
  const tokenAllowance = (Math.asin(Math.min(1, tokenRadius / Math.max(distance, 1))) * 180) / Math.PI;
  return Math.abs(delta) <= halfAngle + tokenAllowance;
}

function pointInRect({ geometry, tokenCenter, tokenRadius }) {
  const widthPx = sceneDistanceToPixels(asNumber(geometry.width, 0));
  const heightPx = sceneDistanceToPixels(asNumber(geometry.height, 0));
  if (!(widthPx > 0) || !(heightPx > 0)) return false;

  const anchorX = asNumber(geometry.anchorX, 0);
  const anchorY = asNumber(geometry.anchorY, 0);
  const originX = asNumber(geometry.x, 0);
  const originY = asNumber(geometry.y, 0);
  const centerX = originX + (widthPx * (0.5 - anchorX));
  const centerY = originY + (heightPx * (0.5 - anchorY));
  const radians = -normalizeDirectionRadians(geometry.direction ?? 0);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const dx = tokenCenter.x - centerX;
  const dy = tokenCenter.y - centerY;
  const localX = (dx * cos) - (dy * sin);
  const localY = (dx * sin) + (dy * cos);
  return Math.abs(localX) <= (widthPx / 2) + tokenRadius && Math.abs(localY) <= (heightPx / 2) + tokenRadius;
}

export function templateGeometryHitsToken(templateGeometry = null, token = null) {
  const geometry = normalizeTemplateGeometry(templateGeometry);
  if (!geometry || !token) return false;

  const tokenCenter = getTokenCenterPoint(token);
  const tokenRadius = getTokenRadius(token);

  if (geometry.shape === "blast") return pointInBlast({ geometry, tokenCenter, tokenRadius });
  if (geometry.shape === "line") return pointInLine({ geometry, tokenCenter, tokenRadius });
  if (geometry.shape === "cone") return pointInCone({ geometry, tokenCenter, tokenRadius });
  if (geometry.shape === "rect") return pointInRect({ geometry, tokenCenter, tokenRadius });
  return false;
}

export function classifyTemplateExposure({ template = {}, placement = {}, geometry = null, token = null } = {}) {
  if (!token) return EXPOSURE_TIERS.none;

  const resolvedGeometry = normalizeTemplateGeometry(geometry, { template, placement });
  if (!resolvedGeometry || !templateGeometryHitsToken(resolvedGeometry, token)) {
    return EXPOSURE_TIERS.none;
  }

  const tokenCenter = getTokenCenterPoint(token);
  const maxDistancePx = sceneDistanceToPixels(resolvedGeometry.distance);
  if (!(maxDistancePx > 0)) return EXPOSURE_TIERS.none;

  if (resolvedGeometry.shape === "line" || resolvedGeometry.shape === "cone") {
    const projectionPx = projectionDistanceOnTemplate({ geometry: resolvedGeometry, tokenCenter });
    return classifyDistanceBand(projectionPx, maxDistancePx);
  }

  if (resolvedGeometry.shape === "rect") {
    const center = {
      x: asNumber(resolvedGeometry.x, 0) + (sceneDistanceToPixels(asNumber(resolvedGeometry.width, 0)) * (0.5 - asNumber(resolvedGeometry.anchorX, 0))),
      y: asNumber(resolvedGeometry.y, 0) + (sceneDistanceToPixels(asNumber(resolvedGeometry.height, 0)) * (0.5 - asNumber(resolvedGeometry.anchorY, 0))),
    };
    const radialDistancePx = distanceBetweenPoints(center, tokenCenter);
    return classifyDistanceBand(radialDistancePx, maxDistancePx);
  }

  const radialDistancePx = distanceBetweenPoints({ x: resolvedGeometry.x, y: resolvedGeometry.y }, tokenCenter);
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

function buildLineRegionShape(geometry = {}) {
  const distancePx = sceneDistanceToPixels(asNumber(geometry.distance, 0));
  const halfWidthPx = sceneDistanceToPixels(asNumber(geometry.width, getSceneDistanceUnit())) / 2;
  const radians = normalizeDirectionRadians(geometry.direction ?? 0);
  const dirX = Math.cos(radians);
  const dirY = Math.sin(radians);
  const perpX = -dirY;
  const perpY = dirX;
  const tip = {
    x: asNumber(geometry.x, 0) + (distancePx * dirX),
    y: asNumber(geometry.y, 0) + (distancePx * dirY),
  };

  return {
    type: "polygon",
    points: buildPolygonPoints([
      { x: geometry.x + (perpX * halfWidthPx), y: geometry.y + (perpY * halfWidthPx) },
      { x: tip.x + (perpX * halfWidthPx), y: tip.y + (perpY * halfWidthPx) },
      { x: tip.x - (perpX * halfWidthPx), y: tip.y - (perpY * halfWidthPx) },
      { x: geometry.x - (perpX * halfWidthPx), y: geometry.y - (perpY * halfWidthPx) },
    ]),
  };
}

function buildConeRegionShape(geometry = {}) {
  const angleDegrees = asNumber(geometry.angle, 90);
  const distancePx = sceneDistanceToPixels(asNumber(geometry.distance, 0));
  const direction = asNumber(geometry.direction, 0);
  const halfAngle = angleDegrees / 2;
  const points = [{ x: geometry.x, y: geometry.y }];

  for (let step = 0; step <= 8; step += 1) {
    const delta = -halfAngle + ((angleDegrees / 8) * step);
    const radians = normalizeDirectionRadians(direction + delta);
    points.push({
      x: asNumber(geometry.x, 0) + (Math.cos(radians) * distancePx),
      y: asNumber(geometry.y, 0) + (Math.sin(radians) * distancePx),
    });
  }

  return {
    type: "polygon",
    points: buildPolygonPoints(points),
  };
}

function buildRectRegionShape(geometry = {}) {
  return {
    type: "rectangle",
    x: Math.round(asNumber(geometry.x, 0)),
    y: Math.round(asNumber(geometry.y, 0)),
    width: Math.round(sceneDistanceToPixels(asNumber(geometry.width, 0))),
    height: Math.round(sceneDistanceToPixels(asNumber(geometry.height, 0))),
    rotation: normalizeDegrees(geometry.direction ?? 0),
    anchorX: asNumber(geometry.anchorX, 0),
    anchorY: asNumber(geometry.anchorY, 0),
  };
}

export function createRegionShapesFromTemplateGeometry(templateGeometry = null) {
  const geometry = normalizeTemplateGeometry(templateGeometry);
  if (!geometry) return [];

  if (geometry.shape === "blast") {
    const radius = sceneDistanceToPixels(asNumber(geometry.distance, 0));
    return [{
      type: "ellipse",
      x: Math.round(asNumber(geometry.x, 0) - radius),
      y: Math.round(asNumber(geometry.y, 0) - radius),
      radiusX: Math.round(radius),
      radiusY: Math.round(radius),
      rotation: 0,
    }];
  }

  if (geometry.shape === "line") return [buildLineRegionShape(geometry)];
  if (geometry.shape === "cone") return [buildConeRegionShape(geometry)];
  if (geometry.shape === "rect") return [buildRectRegionShape(geometry)];
  return [];
}

export function createRegionShapesFromTemplatePlacement({ template = {}, placement = {}, geometry = null } = {}) {
  return createRegionShapesFromTemplateGeometry(
    geometry ?? normalizeTemplateGeometry(null, { template, placement })
  );
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

export function cloneTemplateGeometry(templateGeometry = null) {
  const geometry = normalizeTemplateGeometry(templateGeometry);
  return geometry ? deepClone(geometry) : null;
}
