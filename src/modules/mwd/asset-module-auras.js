// src/modules/mwd/asset-module-auras.js
// Purpose: Dynamic proximity resolution for asset-module aura packets.
// How it fits: Auras stay canvas/token facts instead of being persisted onto
// every affected actor as duplicated state.

import { collectAssetModuleRuntimePackets, getReadyAssetModules } from "./asset-module-runtime.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function getTokenActor(token = null) {
  return token?.actor ?? token?.document?.actor ?? null;
}

function getDisposition(token = null) {
  return Number(token?.document?.disposition ?? token?.disposition ?? 0) || 0;
}

function isActorToken(token = null, actor = null) {
  if (!token || !actor) return false;
  const tokenActor = getTokenActor(token);
  return tokenActor === actor || tokenActor?.id === actor?.id || tokenActor?.uuid === actor?.uuid;
}

function getTokenCenter(token = null) {
  const doc = token?.document ?? token ?? {};
  const width = toNumber(token?.w ?? doc.width, 0);
  const height = toNumber(token?.h ?? doc.height, 0);
  return {
    x: toNumber(token?.center?.x ?? doc.x, 0) + (token?.center ? 0 : width / 2),
    y: toNumber(token?.center?.y ?? doc.y, 0) + (token?.center ? 0 : height / 2),
  };
}

export function getTokenDistanceMeters(sourceToken = null, targetToken = null) {
  if (!sourceToken || !targetToken) return Number.POSITIVE_INFINITY;
  if (typeof globalThis.canvas?.grid?.measurePath === "function") {
    const measured = globalThis.canvas.grid.measurePath([getTokenCenter(sourceToken), getTokenCenter(targetToken)]);
    const distance = Array.isArray(measured) ? measured.at(-1)?.distance : measured?.distance;
    if (Number.isFinite(Number(distance))) return Number(distance);
  }
  const left = getTokenCenter(sourceToken);
  const right = getTokenCenter(targetToken);
  const gridDistance = Math.hypot(left.x - right.x, left.y - right.y);
  const sceneDistance = toNumber(globalThis.canvas?.scene?.grid?.distance, 1);
  const gridSize = Math.max(1, toNumber(globalThis.canvas?.grid?.size, 1));
  return (gridDistance / gridSize) * sceneDistance;
}

export function auraAppliesToToken(aura = {}, sourceToken = null, targetToken = null) {
  if (!sourceToken || !targetToken) return false;
  const radius = Math.max(0, toNumber(aura.radius, 0));
  if (getTokenDistanceMeters(sourceToken, targetToken) > radius) return false;
  const allegiance = String(aura.allegiance ?? "ally").trim();
  if (allegiance === "any") return true;
  const sameSide = Math.sign(getDisposition(sourceToken)) === Math.sign(getDisposition(targetToken));
  if (allegiance === "enemy") return !sameSide;
  return sameSide;
}

export function getAurasAffecting(actorOrToken = null, { sourceTokens = null, targetToken = null } = {}) {
  const targetActor = getTokenActor(actorOrToken) ?? actorOrToken;
  const resolvedTargetToken = targetToken
    ?? (actorOrToken?.document || actorOrToken?.actor ? actorOrToken : null)
    ?? globalThis.canvas?.tokens?.placeables?.find(token => isActorToken(token, targetActor))
    ?? null;
  if (!targetActor || !resolvedTargetToken) return [];

  const tokens = sourceTokens
    ? Array.from(sourceTokens)
    : Array.from(globalThis.canvas?.tokens?.placeables ?? []);
  const auras = [];

  for (const sourceToken of tokens) {
    const sourceActor = getTokenActor(sourceToken);
    if (!sourceActor || !getReadyAssetModules(sourceActor).length) continue;
    for (const packet of collectAssetModuleRuntimePackets(sourceActor, { kind: "aura" })) {
      if (!auraAppliesToToken(packet, sourceToken, resolvedTargetToken)) continue;
      auras.push({
        ...packet,
        sourceToken,
        targetToken: resolvedTargetToken,
        targetActor,
      });
    }
  }

  return auras;
}
