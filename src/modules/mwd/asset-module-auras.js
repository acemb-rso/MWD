// src/modules/mwd/asset-module-auras.js
// Purpose: Dynamic proximity resolution for asset-module aura packets.
// How it fits: Auras stay canvas/token facts instead of being persisted onto
// every affected actor as duplicated state.

import { collectAssetModuleRuntimePackets, getReadyAssetModules } from "./asset-module-runtime.js";
import {
  getTokenDistance,
  isTokenAffectedBySource,
} from "../area-status/area-status-sources.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function getTokenActor(token = null) {
  return token?.actor ?? token?.document?.actor ?? null;
}

function isActorToken(token = null, actor = null) {
  if (!token || !actor) return false;
  const tokenActor = getTokenActor(token);
  return tokenActor === actor || tokenActor?.id === actor?.id || tokenActor?.uuid === actor?.uuid;
}

export function getTokenDistanceMeters(sourceToken = null, targetToken = null) {
  return getTokenDistance(sourceToken, targetToken, globalThis.canvas?.scene);
}

export function auraAppliesToToken(aura = {}, sourceToken = null, targetToken = null) {
  if (!sourceToken || !targetToken) return false;
  const radius = Math.max(0, toNumber(aura.radius, 0));
  if (getTokenDistanceMeters(sourceToken, targetToken) > radius) return false;
  return isTokenAffectedBySource(aura, sourceToken, targetToken);
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
