// Purpose: Projects area-status sources into hidden native Foundry Regions.
// How it fits: Regions accelerate inspection and visualization but are never authoritative.

import {
  findSourceToken,
} from "./area-status-sources.js";
import { getTokenCenter } from "../utils/token.js";

export const AREA_STATUS_REGION_FLAG = "areaStatusRegion";
let regionWriteDepth = 0;

export function isAreaStatusRegionWriteInProgress() {
  return regionWriteDepth > 0;
}

async function withRegionWrite(work) {
  regionWriteDepth += 1;
  try {
    return await work();
  } finally {
    regionWriteDepth = Math.max(0, regionWriteDepth - 1);
  }
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.contents)) return value.contents;
  if (value && typeof value[Symbol.iterator] === "function") return Array.from(value);
  return [];
}

function getRegionFlag(region = null) {
  return region?.getFlag?.("mwd", AREA_STATUS_REGION_FLAG)
    ?? region?.flags?.mwd?.[AREA_STATUS_REGION_FLAG]
    ?? null;
}

export function isAreaStatusRegion(region = null) {
  return Boolean(getRegionFlag(region)?.sourceKey);
}

export function getAreaStatusRegionFlag(region = null) {
  return getRegionFlag(region);
}

function sceneDistanceToPixels(scene = null, distance = 0) {
  const gridSize = Math.max(1, Number(scene?.grid?.size ?? globalThis.canvas?.grid?.size ?? 100) || 100);
  const gridDistance = Math.max(0.0001, Number(scene?.grid?.distance ?? 1) || 1);
  return Math.max(0, Number(distance ?? 0) || 0) * (gridSize / gridDistance);
}

function buildRegionData(scene, source) {
  const sourceToken = findSourceToken(scene, source);
  if (!sourceToken) return null;
  const center = getTokenCenter(sourceToken, { scene });
  const radiusPixels = sceneDistanceToPixels(scene, source.radius);
  const flag = {
    sourceKey: source.sourceKey,
    sceneUuid: source.sceneUuid,
    sourceTokenUuid: source.sourceTokenUuid,
    sourceActorUuid: source.sourceActorUuid,
    sourceItemUuid: source.sourceItemUuid,
    auraId: source.auraId,
    label: source.label,
    radius: source.radius,
    allegiance: source.allegiance,
    statusIds: [...source.statusIds],
  };
  const gmVisibility = Number(
    globalThis.CONST?.REGION_VISIBILITY?.GAMEMASTER
    ?? globalThis.CONST?.REGION_VISIBILITY?.GM
    ?? 1
  );

  return {
    name: source.label,
    visibility: Number.isFinite(gmVisibility) ? gmVisibility : 1,
    locked: true,
    shapes: [{
      type: "ellipse",
      x: Math.round(center.x - radiusPixels),
      y: Math.round(center.y - radiusPixels),
      radiusX: Math.round(radiusPixels),
      radiusY: Math.round(radiusPixels),
      rotation: 0,
    }],
    flags: {
      mwd: {
        [AREA_STATUS_REGION_FLAG]: flag,
      },
    },
  };
}

export function getAreaStatusRegions(scene = null) {
  return toArray(scene?.regions).filter(isAreaStatusRegion);
}

export async function reconcileAreaStatusRegions(scene = null, sources = []) {
  if (!scene || !globalThis.game?.user?.isGM) return { created: [], updated: [], deleted: [] };
  const activeByKey = new Map(sources.filter(source => source.active !== false).map(source => [source.sourceKey, source]));
  const existing = getAreaStatusRegions(scene);
  const byKey = new Map(existing.map(region => [getRegionFlag(region)?.sourceKey, region]));
  const createData = [];
  const updateData = [];
  const deleteIds = [];

  for (const source of activeByKey.values()) {
    const data = buildRegionData(scene, source);
    if (!data) continue;
    const region = byKey.get(source.sourceKey);
    if (!region) {
      createData.push(data);
      continue;
    }
    updateData.push({ _id: region.id, ...data });
  }

  for (const region of existing) {
    const sourceKey = getRegionFlag(region)?.sourceKey;
    if (!activeByKey.has(sourceKey)) deleteIds.push(region.id);
  }

  const created = createData.length
    ? await withRegionWrite(() => scene.createEmbeddedDocuments("Region", createData))
    : [];
  const updated = updateData.length
    ? await withRegionWrite(() => scene.updateEmbeddedDocuments("Region", updateData))
    : [];
  const deleted = deleteIds.length
    ? await withRegionWrite(() => scene.deleteEmbeddedDocuments("Region", deleteIds))
    : [];
  return { created, updated, deleted };
}

export async function removeAreaStatusRegions(scene = null) {
  if (!scene || !globalThis.game?.user?.isGM) return [];
  const ids = getAreaStatusRegions(scene).map(region => region.id).filter(Boolean);
  return ids.length ? withRegionWrite(() => scene.deleteEmbeddedDocuments("Region", ids)) : [];
}
