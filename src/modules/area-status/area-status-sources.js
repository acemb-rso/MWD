// Purpose: Collects canonical area-status sources from scene tokens and producers.
// How it fits: Source data is authoritative; Regions and ActiveEffects are projections.

import { collectAssetModuleRuntimePackets } from "../mwd/asset-module-runtime.js";
import {
  getTokenActor,
  getTokenCenter,
  getTokenDocument,
} from "../utils/token.js";
import { normalizeAuraPacket } from "./normalize-aura-packet.js";

export { getTokenActor, getTokenDocument };

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.contents)) return value.contents;
  if (value && typeof value.values === "function") return Array.from(value.values());
  if (value && typeof value[Symbol.iterator] === "function") return Array.from(value);
  return [];
}

export function getSceneTokens(scene = null) {
  if (!scene) return [];
  const canvasTokens = scene === globalThis.canvas?.scene
    ? toArray(globalThis.canvas?.tokens?.placeables)
    : [];
  return canvasTokens.length ? canvasTokens : toArray(scene.tokens);
}

export function buildAreaStatusSourceKey({
  sceneUuid = "",
  sourceTokenUuid = "",
  sourceActorUuid = "",
  sourceItemUuid = "",
  auraId = "",
} = {}) {
  return [sceneUuid, sourceTokenUuid, sourceActorUuid, sourceItemUuid, auraId]
    .map(value => String(value ?? "").trim())
    .join("::");
}

export function normalizeAreaStatusSource(source = {}) {
  const normalized = {
    sourceKey: String(source.sourceKey ?? "").trim(),
    sceneUuid: String(source.sceneUuid ?? "").trim(),
    sourceTokenUuid: String(source.sourceTokenUuid ?? "").trim(),
    sourceActorUuid: String(source.sourceActorUuid ?? "").trim(),
    sourceItemUuid: String(source.sourceItemUuid ?? "").trim(),
    auraId: String(source.auraId ?? "").trim(),
    label: String(source.label ?? "Area Status").trim() || "Area Status",
    radius: Math.max(0, Number(source.radius ?? 0) || 0),
    allegiance: ["ally", "enemy", "any"].includes(String(source.allegiance ?? "").trim())
      ? String(source.allegiance).trim()
      : "ally",
    statusIds: Array.from(new Set((Array.isArray(source.statusIds) ? source.statusIds : [])
      .map(value => String(value ?? "").trim())
      .filter(Boolean))),
    active: source.active !== false,
  };

  normalized.sourceKey ||= buildAreaStatusSourceKey(normalized);
  return normalized;
}

export function collectAssetModuleAreaStatusSources(scene = null) {
  const sceneUuid = String(scene?.uuid ?? "").trim();
  const sources = [];

  for (const sourceToken of getSceneTokens(scene)) {
    const tokenDoc = getTokenDocument(sourceToken);
    const actor = getTokenActor(sourceToken);
    if (!tokenDoc || !actor) continue;

    let packets = [];
    try {
      packets = collectAssetModuleRuntimePackets(actor, { kind: "aura" });
    } catch (error) {
      console.warn("MWD | Area status skipped invalid Asset Module runtime packets", {
        actor: actor.uuid ?? actor.id,
        error,
      });
      continue;
    }
    for (const packet of packets) {
      const aura = normalizeAuraPacket(packet, { strict: false });
      if (!aura?.grants?.statuses?.length || aura.radius <= 0) continue;
      const source = normalizeAreaStatusSource({
        sceneUuid,
        sourceTokenUuid: tokenDoc.uuid ?? "",
        sourceActorUuid: actor.uuid ?? "",
        sourceItemUuid: packet.sourceUuid ?? "",
        auraId: aura.id,
        label: aura.label,
        radius: aura.radius,
        allegiance: aura.allegiance,
        statusIds: aura.grants.statuses,
        active: packet.moduleActive !== false,
      });
      if (source.sourceKey) sources.push(source);
    }
  }

  return sources;
}

export function findSourceToken(scene = null, source = {}) {
  return getSceneTokens(scene).find(token => {
    const doc = getTokenDocument(token);
    return String(doc?.uuid ?? "").trim() === String(source?.sourceTokenUuid ?? "").trim();
  }) ?? null;
}

export function isTokenAffectedBySource(source = {}, sourceToken = null, targetToken = null) {
  if (!sourceToken || !targetToken || source.active === false) return false;
  const sourceDoc = getTokenDocument(sourceToken);
  const targetDoc = getTokenDocument(targetToken);
  if (!sourceDoc || !targetDoc) return false;

  const sameToken = String(sourceDoc.uuid ?? "").trim() === String(targetDoc.uuid ?? "").trim();
  if (source.allegiance === "enemy" && sameToken) return false;
  if (source.allegiance === "any") return true;

  const sameDisposition = Number(sourceDoc.disposition ?? 0) === Number(targetDoc.disposition ?? 0);
  return source.allegiance === "enemy" ? !sameDisposition : sameDisposition;
}

export function getTokenDistance(sourceToken = null, targetToken = null, scene = null) {
  if (!sourceToken || !targetToken) return Number.POSITIVE_INFINITY;
  const left = getTokenCenter(sourceToken, { scene });
  const right = getTokenCenter(targetToken, { scene });
  const gridSize = Math.max(1, Number(scene?.grid?.size ?? globalThis.canvas?.grid?.size ?? 100) || 100);
  const gridDistance = Math.max(0.0001, Number(scene?.grid?.distance ?? globalThis.canvas?.scene?.grid?.distance ?? 1) || 1);
  return (Math.hypot(left.x - right.x, left.y - right.y) / gridSize) * gridDistance;
}

export function getAffectedTokensForSource(scene = null, source = {}) {
  const sourceToken = findSourceToken(scene, source);
  if (!sourceToken) return [];
  return getSceneTokens(scene).filter(targetToken =>
    isTokenAffectedBySource(source, sourceToken, targetToken)
    && getTokenDistance(sourceToken, targetToken, scene) <= source.radius
  );
}
