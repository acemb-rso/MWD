// src/modules/canvas/machine-sensor-detection.js
// Purpose: Observer-relative MWD sensor detection for hostile machine tokens.
// Workflow: Foundry asks a detection mode about a target -> this module checks
// EW state and observer context -> canvas overlays/rendering consume the answer.

import {
  getAttackerCombatant,
  getDetectionState as getCombatantDetectionState,
  hasValidIndirectDesignation,
} from "../mwd/machine-ew-state.js";
import { DETECTION_STATE_ORDER } from "../mwd/machine-ew.js";
import { isMachineActorType } from "../mwd/machine-monitors.js";
import { getMechRangeBand } from "../mwd/personal-range-bands.js";
import { measureTokenDistance } from "../mwd/token-measurement.js";

export const MWD_SENSOR_DETECTION_MODE_ID = "mwdSensor";
export const SENSOR_DETECTION_STATES = Object.freeze(["contact", "track", "lock"]);

const CLOSE_RANGE_MAX = Number(getMechRangeBand("close")?.max ?? 59);

function collectionEntries(collection = null) {
  if (!collection) return [];
  if (Array.isArray(collection)) return collection;
  if (Array.isArray(collection.contents)) return collection.contents;
  if (typeof collection.values === "function") return Array.from(collection.values());
  if (typeof collection[Symbol.iterator] === "function") return Array.from(collection);
  return [];
}

function resolveToken(value = null) {
  return value?.object
    ?? value?.token
    ?? value?.document?.object
    ?? value?.target?.object
    ?? value?.target?.token
    ?? value?.target?.document?.object
    ?? value;
}

function getTokenDocument(token = null) {
  return token?.document ?? token ?? null;
}

function getTokenActor(token = null) {
  return token?.actor ?? token?.document?.actor ?? token?.actorLink?.actor ?? null;
}

function getTokenUuid(token = null) {
  return String(token?.document?.uuid ?? token?.uuid ?? "").trim();
}

function getTokenDisposition(token = null) {
  return Number(
    token?.document?.disposition
      ?? token?.disposition
      ?? token?.data?.disposition
      ?? 0
  );
}

function getHostileDisposition() {
  return Number(globalThis.CONST?.TOKEN_DISPOSITIONS?.HOSTILE ?? -1);
}

function hasStatus(source = null, statusId = "") {
  const id = String(statusId ?? "").trim();
  if (!source || !id) return false;

  const statuses = source.statuses ?? source.document?.statuses;
  if (statuses?.has?.(id)) return true;
  if (Array.isArray(statuses) && statuses.includes(id)) return true;

  for (const effect of collectionEntries(source.effects ?? source.appliedEffects)) {
    const effectStatuses = effect?.statuses;
    if (effectStatuses?.has?.(id)) return true;
    if (Array.isArray(effectStatuses) && effectStatuses.includes(id)) return true;
    if (String(effect?.statusId ?? "").trim() === id) return true;
  }

  return collectionEntries(source.document?.effects ?? [])
    .map(effect => String(effect ?? "").trim())
    .includes(id);
}

function observerSensorBlindBeyondClose(observerToken = null, targetToken = null) {
  const observerActor = getTokenActor(observerToken);
  if (!hasStatus(observerActor, "sensorBlind") && !hasStatus(observerToken, "sensorBlind")) return false;

  const distance = measureTokenDistance(observerToken, targetToken);
  if (!Number.isFinite(distance)) return true;
  return distance > CLOSE_RANGE_MAX;
}

function getDetectionModeClass() {
  return globalThis.foundry?.canvas?.perception?.DetectionMode
    ?? globalThis.DetectionMode
    ?? class {};
}

function getDetectionTypes() {
  return getDetectionModeClass().DETECTION_TYPES ?? { OTHER: 3, SIGHT: 1 };
}

function getVisionSourceToken(visionSource = null) {
  return resolveToken(
    visionSource?.object
      ?? visionSource?.token
      ?? visionSource?.document?.object
      ?? visionSource?.source
      ?? visionSource
  );
}

function getTargetToken(target = null) {
  return resolveToken(target);
}

function modeRangeAllows(visionSource = null, mode = null, target = null) {
  const range = Number(mode?.range ?? mode?.data?.range ?? 0);
  if (!Number.isFinite(range) || range <= 0) return true;

  const observerToken = getVisionSourceToken(visionSource);
  const targetToken = getTargetToken(target);
  const distance = measureTokenDistance(observerToken, targetToken);
  return Number.isFinite(distance) && distance <= range;
}

function getTokenDetectionModes(tokenOrDocument = null) {
  const document = getTokenDocument(tokenOrDocument);
  const modes = document?.detectionModes ?? tokenOrDocument?.detectionModes ?? [];
  return Array.isArray(modes) ? modes : collectionEntries(modes);
}

function cloneDetectionMode(mode = {}) {
  if (typeof mode?.toObject === "function") return mode.toObject();
  if (typeof mode?.toJSON === "function") return mode.toJSON();
  if (globalThis.foundry?.utils?.deepClone) return foundry.utils.deepClone(mode);
  return JSON.parse(JSON.stringify(mode ?? {}));
}

export function getDetectionState(observerToken = null, targetToken = null) {
  const observer = resolveToken(observerToken);
  const target = resolveToken(targetToken);
  const targetTokenUuid = getTokenUuid(target);
  if (!observer || !targetTokenUuid) return "blind";

  const combatant = getAttackerCombatant(observer);
  if (!combatant) return "blind";
  return getCombatantDetectionState(combatant, targetTokenUuid);
}

export function hasSensorDesignation(observerToken = null, targetToken = null) {
  const observer = resolveToken(observerToken);
  const target = resolveToken(targetToken);
  if (!observer || !target) return false;
  return hasValidIndirectDesignation(target, { attackerToken: observer, combat: globalThis.game?.combat ?? null });
}

function getDesignationAwarenessState(observerToken = null, targetToken = null) {
  const target = resolveToken(targetToken);
  const targetActor = getTokenActor(target);
  if (hasStatus(targetActor, "tagged") || hasStatus(targetActor, "narced")) return "lock";
  return hasSensorDesignation(observerToken, target) ? "contact" : "blind";
}

export function getSensorAwarenessState(observerToken = null, targetToken = null) {
  const detectionState = getDetectionState(observerToken, targetToken);
  if (SENSOR_DETECTION_STATES.includes(detectionState)) return detectionState;
  return getDesignationAwarenessState(observerToken, targetToken);
}

export function canDetect(observerToken = null, targetToken = null) {
  const observer = resolveToken(observerToken);
  const target = resolveToken(targetToken);
  if (!observer || !target) return false;

  const targetActor = getTokenActor(target);
  if (!isMachineActorType(targetActor)) return false;
  if (getTokenDisposition(target) !== getHostileDisposition()) return false;
  if (observerSensorBlindBeyondClose(observer, target)) return false;

  return getSensorAwarenessState(observer, target) !== "blind";
}

export class MwdSensorDetectionMode extends getDetectionModeClass() {
  _canDetect(visionSource, target) {
    return canDetect(getVisionSourceToken(visionSource), getTargetToken(target));
  }

  _testLOS() {
    return true;
  }

  _testRange(visionSource, mode, target) {
    return modeRangeAllows(visionSource, mode, target);
  }

  _testPoint(visionSource, mode, target) {
    return this._canDetect(visionSource, target) && this._testRange(visionSource, mode, target);
  }
}

function ensureSensorMode(modes = []) {
  const normalized = getTokenDetectionModes({ detectionModes: modes }).map(cloneDetectionMode);
  const index = normalized.findIndex(mode => String(mode?.id ?? "").trim() === MWD_SENSOR_DETECTION_MODE_ID);

  if (index >= 0) {
    const current = normalized[index] ?? {};
    const next = { ...current, id: MWD_SENSOR_DETECTION_MODE_ID, enabled: true };
    const changed = JSON.stringify(current) !== JSON.stringify(next);
    normalized[index] = next;
    return { changed, modes: normalized };
  }

  return {
    changed: true,
    modes: normalized.concat([{ id: MWD_SENSOR_DETECTION_MODE_ID, enabled: true, range: 0 }]),
  };
}

async function syncTokenDocument(tokenDocument = null) {
  const actor = getTokenActor(tokenDocument);
  if (!isMachineActorType(actor)) return false;

  const { changed, modes } = ensureSensorMode(getTokenDetectionModes(tokenDocument));
  if (!changed) return false;

  if (typeof tokenDocument?.update === "function") {
    await tokenDocument.update({ detectionModes: modes });
    return true;
  }

  tokenDocument.detectionModes = modes;
  return true;
}

async function syncActorPrototype(actor = null) {
  if (!isMachineActorType(actor)) return false;
  const prototypeToken = actor.prototypeToken ?? actor.token ?? null;
  const { changed, modes } = ensureSensorMode(getTokenDetectionModes(prototypeToken));
  if (!changed) return false;

  if (typeof actor.update === "function") {
    await actor.update({ "prototypeToken.detectionModes": modes });
    return true;
  }

  if (prototypeToken) prototypeToken.detectionModes = modes;
  return true;
}

async function syncScene(scene = null) {
  const tokenDocuments = collectionEntries(scene?.tokens);
  const updates = [];
  let changed = 0;

  for (const tokenDocument of tokenDocuments) {
    const actor = getTokenActor(tokenDocument);
    if (!isMachineActorType(actor)) continue;

    const { changed: needsUpdate, modes } = ensureSensorMode(getTokenDetectionModes(tokenDocument));
    if (!needsUpdate) continue;

    if (typeof tokenDocument?.update === "function") {
      await tokenDocument.update({ detectionModes: modes });
    } else {
      updates.push({ _id: tokenDocument.id, detectionModes: modes });
    }
    changed += 1;
  }

  if (updates.length && typeof scene?.updateEmbeddedDocuments === "function") {
    await scene.updateEmbeddedDocuments("Token", updates);
  }

  return changed;
}

export async function syncTokenDetectionModes({
  actors = globalThis.game?.actors,
  scenes = globalThis.game?.scenes,
  canvasTokens = globalThis.canvas?.tokens?.placeables,
  requireGM = true,
} = {}) {
  if (requireGM && !globalThis.game?.user?.isGM) return { changed: 0, skipped: true };

  let changed = 0;
  for (const actor of collectionEntries(actors)) {
    if (await syncActorPrototype(actor)) changed += 1;
  }
  for (const scene of collectionEntries(scenes)) {
    changed += await syncScene(scene);
  }
  for (const token of collectionEntries(canvasTokens)) {
    if (await syncTokenDocument(token?.document ?? token)) changed += 1;
  }

  return { changed, skipped: false };
}

export function requestSensorPerceptionRefresh() {
  const perception = globalThis.canvas?.perception;
  if (typeof perception?.update !== "function") return false;

  const attempts = [
    { sight: { refresh: true }, visibility: { refresh: true } },
    { sight: true, visibility: true },
    { initializeVision: true, refreshVision: true },
  ];

  for (const flags of attempts) {
    try {
      perception.update(flags, true);
      return true;
    } catch (_error) {
      // Try the next Foundry version shape.
    }
  }

  return false;
}

export function registerMwdSensorDetectionMode() {
  const canvasConfig = globalThis.CONFIG?.Canvas;
  if (!canvasConfig) return false;

  canvasConfig.detectionModes ??= {};
  if (canvasConfig.detectionModes[MWD_SENSOR_DETECTION_MODE_ID]) return true;

  const detectionTypes = getDetectionTypes();
  canvasConfig.detectionModes[MWD_SENSOR_DETECTION_MODE_ID] = new MwdSensorDetectionMode({
    id: MWD_SENSOR_DETECTION_MODE_ID,
    label: "MWD Sensor",
    type: detectionTypes.OTHER ?? detectionTypes.SIGHT ?? 3,
    walls: false,
  });

  return true;
}

export function compareDetectionState(left = "blind", right = "blind") {
  const leftIndex = DETECTION_STATE_ORDER.indexOf(left);
  const rightIndex = DETECTION_STATE_ORDER.indexOf(right);
  return (leftIndex < 0 ? 0 : leftIndex) - (rightIndex < 0 ? 0 : rightIndex);
}
