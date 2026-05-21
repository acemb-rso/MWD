// src/modules/mwd/machine-ew-state.js
// Combatant-flag read/write for machine targeting state.
// This is the only module permitted to access combatant.flags.mwd.targeting.

import { DETECTION_STATE_ORDER, getTargetingDataCap } from "./machine-ew.js";
import { ASSET_MODULE_HOOKS, dispatchAssetModuleHook } from "./asset-module-hooks.js";
import {
  adjustTargetingDataValue,
  getMachineDetectionStateCap,
  getMachineTrackingPenaltyAdjustment,
} from "./machine-state-effects.js";
import {
  getApplicableAssetModuleEffects,
  getAssetModuleBypassStatuses,
  getAssetModuleDerivedStatuses,
} from "./asset-module-effects.js";

const FLAG_SCOPE = "mwd";
const FLAG_KEY = "targeting";
const LEGACY_FLAG_KEY = "ewState";

function resolveTargetActorFromUuid(targetTokenUuid = "") {
  const uuid = String(targetTokenUuid ?? "").trim();
  if (!uuid) return null;
  return globalThis.canvas?.tokens?.placeables?.find(token => (token.document?.uuid ?? token.uuid) === uuid)?.actor ?? null;
}

function normalizeTargetUuid(value = "") {
  return String(value ?? "").trim();
}

function asObject(value) {
  return value && typeof value === "object" ? value : {};
}

function getObjectPath(source = {}, path = "") {
  const key = normalizeTargetUuid(path);
  if (!key) return undefined;
  if (Object.prototype.hasOwnProperty.call(source, key)) return source[key];

  if (typeof globalThis.foundry?.utils?.getProperty === "function") {
    const value = globalThis.foundry.utils.getProperty(source, key);
    if (value !== undefined) return value;
  }

  return key.split(".").reduce((current, part) => {
    if (!current || typeof current !== "object") return undefined;
    return current[part];
  }, source);
}

function deleteExpandedObjectPath(target = {}, path = "") {
  const parts = normalizeTargetUuid(path).split(".").filter(Boolean);
  if (!parts.length) return;

  const stack = [];
  let current = target;
  for (const part of parts.slice(0, -1)) {
    if (!current || typeof current !== "object" || !Object.prototype.hasOwnProperty.call(current, part)) return;
    stack.push([current, part]);
    current = current[part];
  }

  if (!current || typeof current !== "object") return;
  delete current[parts.at(-1)];

  for (let index = stack.length - 1; index >= 0; index -= 1) {
    const [parent, part] = stack[index];
    const child = parent[part];
    if (child && typeof child === "object" && !Array.isArray(child) && Object.keys(child).length === 0) {
      delete parent[part];
    } else {
      break;
    }
  }
}

function setObjectPath(target = {}, path = "", value = null) {
  const key = normalizeTargetUuid(path);
  if (!key) return target;
  deleteExpandedObjectPath(target, key);
  target[key] = value;
  return target;
}

// ---------------------------------------------------------------------------
// Combatant lookup
// ---------------------------------------------------------------------------

function combatantsToArray(combatants) {
  if (!combatants) return [];
  if (Array.isArray(combatants)) return combatants;
  if (Array.isArray(combatants.contents)) return combatants.contents;
  if (typeof combatants[Symbol.iterator] === "function") return Array.from(combatants);
  return [];
}

function findCombatantByTokenId(tokenId) {
  const id = String(tokenId ?? "").trim();
  const combatants = globalThis.game?.combat?.combatants;
  if (!id || !combatants) return null;

  const direct = combatants.get?.(id);
  const directTokenId = direct?.tokenId ?? direct?.token?.id ?? direct?.token?.document?.id;
  if (direct && directTokenId === id) return direct;

  return combatantsToArray(combatants).find(entry => {
    const combatant = Array.isArray(entry) ? entry[1] : entry;
    const combatantTokenId = combatant?.tokenId ?? combatant?.token?.id ?? combatant?.token?.document?.id;
    return combatantTokenId === id;
  })
    ?? null;
}

export function getAttackerCombatant(token) {
  if (!token) return null;
  const tokenId = token?.id ?? token?.document?.id ?? token?.tokenId ?? String(token ?? "").trim();
  return findCombatantByTokenId(tokenId);
}

export function getTargetCombatant(targetTokenId) {
  return findCombatantByTokenId(targetTokenId);
}

// ---------------------------------------------------------------------------
// Normalization
// ---------------------------------------------------------------------------

function normalizePacket(raw) {
  if (!raw || typeof raw !== "object") return null;
  const id = String(raw.id ?? "").trim();
  if (!id) return null;
  const round = Number.isFinite(Number(raw.round)) ? Number(raw.round) : null;
  const expiresAfterRound = Number.isFinite(Number(raw.expiresAfterRound))
    ? Number(raw.expiresAfterRound)
    : round;
  return {
    id,
    value: Math.max(0, Number(raw.value ?? 0) || 0),
    sourceTokenUuid: String(raw.sourceTokenUuid ?? "").trim(),
    type: String(raw.type ?? "self").trim() || "self",
    shareable: Boolean(raw.shareable),
    persistent: Boolean(raw.persistent),
    suppressedBy: raw.suppressedBy ?? null,
    round,
    expiresAfterRound,
  };
}

function chooseCanonicalPacket(raw = null) {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return normalizePacket(raw);
  }
  return null;
}

function chooseLegacyPacket(rawPackets = []) {
  const packets = (Array.isArray(rawPackets) ? rawPackets : [])
    .map(normalizePacket)
    .filter(Boolean);
  if (!packets.length) return null;
  return packets.sort((left, right) => {
    const leftRound = Number(left.round ?? -1);
    const rightRound = Number(right.round ?? -1);
    if (leftRound !== rightRound) return rightRound - leftRound;
    return Number(right.value ?? 0) - Number(left.value ?? 0);
  })[0] ?? null;
}

export function normalizeTargetingState(raw) {
  const detectionState = DETECTION_STATE_ORDER.includes(raw?.detectionState) ? raw.detectionState : "blind";
  const packet = chooseCanonicalPacket(raw?.packet) ?? chooseLegacyPacket(raw?.packets);
  return {
    detectionState,
    packet,
    packets: packet ? [packet] : [],
  };
}

export const normalizeEwTargetState = normalizeTargetingState;

// ---------------------------------------------------------------------------
// Reads
// ---------------------------------------------------------------------------

function readRawTargetingState(combatant) {
  if (!combatant) return {};
  const canonical = combatant.getFlag(FLAG_SCOPE, FLAG_KEY);
  if (canonical && typeof canonical === "object" && Object.keys(canonical).length) {
    return canonical;
  }
  return combatant.getFlag(FLAG_SCOPE, LEGACY_FLAG_KEY) ?? {};
}

function writeRawTargetingState(combatant, nextState = {}) {
  if (!combatant) return Promise.resolve();
  return combatant.setFlag(FLAG_SCOPE, FLAG_KEY, nextState);
}

export function listTargetingStates(combatant) {
  const raw = asObject(readRawTargetingState(combatant));
  return Object.entries(raw)
    .map(([targetTokenUuid, state]) => {
      const uuid = normalizeTargetUuid(targetTokenUuid);
      if (!uuid) return null;
      return {
        targetTokenUuid: uuid,
        state: normalizeTargetingState(state),
      };
    })
    .filter(Boolean);
}

export function getTargetingState(combatant, targetTokenUuid) {
  const uuid = normalizeTargetUuid(targetTokenUuid);
  const all = asObject(readRawTargetingState(combatant));
  return normalizeTargetingState(getObjectPath(all, uuid));
}

export const getEwTargetState = getTargetingState;

export function getDetectionState(combatant, targetTokenUuid) {
  return getTargetingState(combatant, targetTokenUuid).detectionState;
}

export function getTrackingPenalty(targetActor, targetCombatant) {
  let penalty = 0;
  const statuses = targetActor?.statuses ?? new Set();
  const derivedStatuses = getAssetModuleDerivedStatuses(targetActor);
  if (statuses.has("ecmJamming")) penalty += 2;
  if (statuses.has("ecmShrouded") || derivedStatuses.has("ecmShrouded")) penalty += 1;
  if (statuses.has("obscuredLight")) penalty += 1;
  if (statuses.has("obscuredHeavy")) penalty += 3;
  if (statuses.has("obscured")) penalty += 1;

  const moduleTrackingPenalty = getApplicableAssetModuleEffects(targetActor, {
    payload: { intent: "attack" },
    resolved: { intent: "attack" },
  }).effects.reduce((sum, effect) => sum + (Number(effect.modifies?.trackingPenalty ?? 0) || 0), 0);
  penalty += moduleTrackingPenalty;

  if (targetCombatant) {
    const actionState = targetCombatant.getFlag(FLAG_SCOPE, "personalCombat")?.actionState ?? {};
    if (actionState.move !== null && actionState.move !== undefined) penalty += 1;
  }

  penalty += getMachineTrackingPenaltyAdjustment(targetActor);
  return Math.max(0, penalty);
}

export function getAcquireDnModifier(targetActor, { attacker = null, payload = {}, resolved = {} } = {}) {
  const statuses = targetActor?.statuses ?? new Set();
  const derivedStatuses = getAssetModuleDerivedStatuses(targetActor);
  const shrouded = statuses.has("ecmShrouded") || derivedStatuses.has("ecmShrouded");
  if (!shrouded) return 0;

  const bypasses = getAssetModuleBypassStatuses(attacker, {
    payload: { ...payload, actionId: "acquireTarget" },
    resolved: { ...resolved, intent: "acquire" },
  });
  return bypasses.has("ecmShrouded") ? 0 : 1;
}

export function getAcquireCeiling(targetActor) {
  const statuses = targetActor?.statuses ?? new Set();
  const baseCap = statuses.has("ecmJamming") ? "track" : "lock";
  const derivedCap = getMachineDetectionStateCap(targetActor);
  const baseIndex = DETECTION_STATE_ORDER.indexOf(baseCap);
  const derivedIndex = DETECTION_STATE_ORDER.indexOf(derivedCap);
  return derivedIndex >= 0 && derivedIndex < baseIndex ? derivedCap : baseCap;
}

export function getUsableTargetingPacket(combatant, targetTokenUuid, systemAttr, detectionState, currentRound) {
  const beforeContext = { combatant, targetTokenUuid, systemAttr, detectionState, currentRound };
  dispatchAssetModuleHook(ASSET_MODULE_HOOKS.ew.beforeAttackTargeting, beforeContext);
  if (detectionState !== "track" && detectionState !== "lock") return null;

  const { packet } = getTargetingState(combatant, targetTokenUuid);
  if (!packet) return null;
  if (packet.suppressedBy) return null;

  const round = Number.isFinite(Number(currentRound)) ? Number(currentRound) : null;
  if (!packet.persistent && packet.expiresAfterRound !== null && round !== null && round > packet.expiresAfterRound) {
    return null;
  }

  const cap = getTargetingDataCap(systemAttr, detectionState);
  const targetActor = resolveTargetActorFromUuid(targetTokenUuid);
  const usable = adjustTargetingDataValue({
    attacker: combatant?.actor ?? null,
    targetActor,
    value: Math.min(packet.value, cap),
  });

  return {
    id: packet.id,
    value: usable,
    sourceTokenUuid: packet.sourceTokenUuid,
    round: packet.round,
    expiresAfterRound: packet.expiresAfterRound,
  };
}

// ---------------------------------------------------------------------------
// Writes
// ---------------------------------------------------------------------------

function cloneAllTargetingStates(combatant) {
  return foundry.utils.deepClone(asObject(readRawTargetingState(combatant)));
}

export async function setDetectionState(combatant, targetTokenUuid, newState) {
  const uuid = normalizeTargetUuid(targetTokenUuid);
  if (!uuid || !combatant) return;
  const detectionState = DETECTION_STATE_ORDER.includes(newState) ? newState : "blind";
  const hookName = detectionState === "track" || detectionState === "lock"
    ? ASSET_MODULE_HOOKS.ew.beforeAcquireSolution
    : ASSET_MODULE_HOOKS.ew.suppressTargetingNetwork;
  dispatchAssetModuleHook(hookName, { combatant, targetTokenUuid: uuid, detectionState });
  const all = cloneAllTargetingStates(combatant);
  const current = getTargetingState(combatant, uuid);
  setObjectPath(all, uuid, {
    detectionState,
    packet: current.packet ? foundry.utils.deepClone(current.packet) : null,
  });
  await writeRawTargetingState(combatant, all);
  dispatchAssetModuleHook(ASSET_MODULE_HOOKS.ew.afterAcquireSolution, { combatant, targetTokenUuid: uuid, detectionState });
}

export async function setTargetingPacket(combatant, targetTokenUuid, packet) {
  const uuid = normalizeTargetUuid(targetTokenUuid);
  const normalizedPacket = normalizePacket(packet);
  if (!uuid || !combatant || !normalizedPacket) return;
  dispatchAssetModuleHook(ASSET_MODULE_HOOKS.ew.beforeGenerateTargetingData, {
    combatant,
    targetTokenUuid: uuid,
    packet: normalizedPacket,
  });
  const all = cloneAllTargetingStates(combatant);
  const current = getTargetingState(combatant, uuid);
  setObjectPath(all, uuid, {
    detectionState: current.detectionState,
    packet: normalizedPacket,
  });
  await writeRawTargetingState(combatant, all);
  dispatchAssetModuleHook(ASSET_MODULE_HOOKS.ew.afterGenerateTargetingData, {
    combatant,
    targetTokenUuid: uuid,
    packet: normalizedPacket,
  });
}

export const addTargetingPacket = setTargetingPacket;

export async function clearTargetingPacket(combatant, targetTokenUuid) {
  const uuid = normalizeTargetUuid(targetTokenUuid);
  if (!uuid || !combatant) return;
  const all = cloneAllTargetingStates(combatant);
  const current = getTargetingState(combatant, uuid);
  setObjectPath(all, uuid, {
    detectionState: current.detectionState,
    packet: null,
  });
  await writeRawTargetingState(combatant, all);
}

export async function consumeTargetingPacket(combatant, targetTokenUuid, packetId = "") {
  const uuid = normalizeTargetUuid(targetTokenUuid);
  const id = String(packetId ?? "").trim();
  if (!uuid || !combatant) return;
  const current = getTargetingState(combatant, uuid);
  if (!current.packet) return;
  if (id && current.packet.id !== id) return;
  dispatchAssetModuleHook(ASSET_MODULE_HOOKS.ew.consumeTargetingData, {
    combatant,
    targetTokenUuid: uuid,
    packet: current.packet,
  });
  await clearTargetingPacket(combatant, uuid);
}

// ---------------------------------------------------------------------------
// Packet factory
// ---------------------------------------------------------------------------

export async function resetAllSensorTargetingStatesToBlind(combatant) {
  if (!combatant) return;
  const all = cloneAllTargetingStates(combatant);
  if (!Object.keys(all).length) return;
  const reset = {};
  for (const [uuid, raw] of Object.entries(all)) {
    const current = normalizeTargetingState(raw);
    reset[uuid] = { detectionState: "blind", packet: current.packet ? foundry.utils.deepClone(current.packet) : null };
  }
  await writeRawTargetingState(combatant, reset);
}

export function buildTargetingPacket({ value, sourceToken, round } = {}) {
  const normalizedRound = Number.isFinite(Number(round)) ? Number(round) : null;
  return {
    id: foundry.utils.randomID(),
    value: Math.max(0, Number(value) || 0),
    sourceTokenUuid: sourceToken?.document?.uuid ?? sourceToken?.uuid ?? "",
    type: "self",
    shareable: false,
    persistent: false,
    suppressedBy: null,
    round: normalizedRound,
    expiresAfterRound: normalizedRound,
  };
}
