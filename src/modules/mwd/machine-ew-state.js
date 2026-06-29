// src/modules/mwd/machine-ew-state.js
// Purpose: Combatant-flag read/write for machine targeting state.
// Workflow: EW roll outcomes -> this module mutates combatant targeting flags ->
// attack prep and EW panels read normalized contact/track/lock packet state.
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
import {
  getBattleArmorMachineTargetProfile,
  lowerDetectionCap,
} from "./battle-armor.js";
import { getActiveArmorTraitEffects } from "./personal-damage.js";
import { getApplicableStealthProfileSourceIds } from "./machine-stealth.js";
import { normalizeStatusConditionId } from "../status/status-condition-catalog.js";

const FLAG_SCOPE = "mwd";
const FLAG_KEY = "targeting";
const LEGACY_FLAG_KEY = "ewState";

function resolveTargetActorFromUuid(targetTokenUuid = "") {
  const uuid = String(targetTokenUuid ?? "").trim();
  if (!uuid) return null;
  return globalThis.canvas?.tokens?.placeables?.find(token => (token.document?.uuid ?? token.uuid) === uuid)?.actor ?? null;
}

function hasStatus(actor = null, statusId = "") {
  const id = normalizeStatusConditionId(statusId);
  if (!actor || !id) return false;
  return Array.from(actor.statuses ?? []).some(activeId => normalizeStatusConditionId(activeId) === id);
}

function normalizeTargetUuid(value = "") {
  return String(value ?? "").trim();
}

function asObject(value) {
  return value && typeof value === "object" ? value : {};
}

function collectionEntries(collection = null) {
  if (!collection) return [];
  if (Array.isArray(collection)) return collection;
  if (Array.isArray(collection.contents)) return collection.contents;
  if (typeof collection.values === "function") return Array.from(collection.values());
  if (typeof collection[Symbol.iterator] === "function") {
    return Array.from(collection).map(entry => Array.isArray(entry) ? entry[1] : entry);
  }
  return [];
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
  // Token UUIDs contain dots, so writes use the full UUID as an object key after
  // clearing any older expanded-path shape from legacy saves.
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
  // Canonical state stores one packet, but legacy saves may have an array. Keep
  // the newest/highest packet as the single active targetingData source.
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

export function getEffectiveDetectionState(combatant, targetTokenUuid, targetActor = null) {
  // TAG/NARC are hard lock bypasses: the attacker may not own a normal lock
  // packet, but targeting should still behave as locked.
  const statuses = targetActor?.statuses ?? new Set();
  if (statuses.has("tagged") || statuses.has("narced")) return "lock";
  return getDetectionState(combatant, targetTokenUuid);
}

export function getTrackingPenalty(targetActor, targetCombatant, options = {}) {
  // Tracking penalty is an aggregate of target statuses, stealth modules,
  // movement state, and Battle Armor context. Attack code consumes only the sum.
  let penalty = 0;
  const statuses = targetActor?.statuses ?? new Set();
  const derivedStatuses = getAssetModuleDerivedStatuses(targetActor);
  if (statuses.has("ecmJamming")) penalty += 2;
  if (statuses.has("ecmShrouded") || derivedStatuses.has("ecmShrouded")) penalty += 1;
  if (statuses.has("obscuredLight")) penalty += 1;
  if (statuses.has("obscuredHeavy")) penalty += 3;
  if (statuses.has("obscured")) penalty += 1;

  const narced = statuses.has("narced");
  if (!narced) {
    const stealthProfileSources = getApplicableStealthProfileSourceIds(targetActor);
    const moduleTrackingPenalty = getApplicableAssetModuleEffects(targetActor, {
      payload: { intent: "attack" },
      resolved: { intent: "attack" },
    }).effects.reduce((sum, effect) => {
      if (stealthProfileSources.has(effect.sourceId) || stealthProfileSources.has(effect.sourceName)) return sum;
      return sum + (Number(effect.modifies?.trackingPenalty ?? 0) || 0);
    }, 0);
    penalty += moduleTrackingPenalty;
    penalty += Number(getActiveArmorTraitEffects(targetActor).sensorTrackingPenalty ?? 0) || 0;
  }

  if (targetCombatant) {
    const actionState = targetCombatant.getFlag(FLAG_SCOPE, "personalCombat")?.actionState ?? {};
    if (actionState.move !== null && actionState.move !== undefined) penalty += 1;
  }

  penalty += getMachineTrackingPenaltyAdjustment(targetActor);
  penalty += getBattleArmorMachineTargetProfile(targetActor, options)?.trackingPenalty ?? 0;
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

export function getAcquireCeiling(targetActor, options = {}) {
  const ecmJammed = hasStatus(targetActor, "ecmJamming");
  const epmBoosted = hasStatus(targetActor, "epmBoosted");
  const baseCap = ecmJammed && !epmBoosted ? "track" : "lock";
  const derivedCap = getMachineDetectionStateCap(targetActor);
  const battleArmorCap = getBattleArmorMachineTargetProfile(targetActor, options)?.detectionStateCap ?? "lock";
  const baseIndex = DETECTION_STATE_ORDER.indexOf(baseCap);
  const derivedIndex = DETECTION_STATE_ORDER.indexOf(derivedCap);
  const capped = derivedIndex >= 0 && derivedIndex < baseIndex ? derivedCap : baseCap;
  return lowerDetectionCap(capped, battleArmorCap);
}

export function getUsableTargetingPacket(combatant, targetTokenUuid, systemAttr, detectionState, currentRound) {
  // A packet is usable only at Track/Lock, before expiry, under the current cap,
  // and after any module/state adjustments have had a chance to clamp it.
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

export async function reduceTargetingPacket(combatant, targetTokenUuid, amount = 1, { packetId = "", source = "defensiveJink" } = {}) {
  const uuid = normalizeTargetUuid(targetTokenUuid);
  if (!uuid || !combatant) return { ok: false, reason: "Missing targeting state target." };

  const reduction = Math.max(0, Math.trunc(Number(amount) || 0));
  if (reduction <= 0) return { ok: false, reason: "No targetingData reduction requested." };

  const current = getTargetingState(combatant, uuid);
  const packet = current.packet ? foundry.utils.deepClone(current.packet) : null;
  if (!packet) return { ok: false, reason: "No targetingData packet is available." };
  const expectedPacketId = String(packetId ?? "").trim();
  if (expectedPacketId && packet.id !== expectedPacketId) {
    return { ok: false, reason: "TargetingData packet no longer matches." };
  }

  const previousValue = Math.max(0, Number(packet.value ?? 0) || 0);
  const newValue = Math.max(0, previousValue - reduction);
  const all = cloneAllTargetingStates(combatant);
  setObjectPath(all, uuid, {
    detectionState: current.detectionState,
    packet: newValue > 0
      ? {
        ...packet,
        value: newValue,
        reducedBy: source,
      }
      : null,
  });
  await writeRawTargetingState(combatant, all);

  return {
    ok: true,
    previousValue,
    newValue,
    reduction: previousValue - newValue,
    removed: newValue <= 0,
    packetId: packet.id,
    targetTokenUuid: uuid,
  };
}

export async function suppressTargetingPacket(combatant, targetTokenUuid, { packetId = "", suppressedBy = {} } = {}) {
  const uuid = normalizeTargetUuid(targetTokenUuid);
  if (!uuid || !combatant) return { ok: false, reason: "Missing targeting state target." };

  const current = getTargetingState(combatant, uuid);
  const packet = current.packet ? foundry.utils.deepClone(current.packet) : null;
  if (!packet) return { ok: false, reason: "No eligible beacon/network packet is available." };

  const expectedPacketId = String(packetId ?? "").trim();
  if (expectedPacketId && packet.id !== expectedPacketId) {
    return { ok: false, reason: "Beacon/network packet no longer matches." };
  }

  const all = cloneAllTargetingStates(combatant);
  const suppression = suppressedBy && typeof suppressedBy === "object"
    ? foundry.utils.deepClone(suppressedBy)
    : {};
  suppression.source = String(suppression.source ?? "suppressBeacon").trim() || "suppressBeacon";
  suppression.duration = String(suppression.duration ?? "untilNextActivation").trim() || "untilNextActivation";
  suppression.round = Number.isFinite(Number(suppression.round)) ? Number(suppression.round) : (globalThis.game?.combat?.round ?? null);
  suppression.turn = Number.isFinite(Number(suppression.turn)) ? Number(suppression.turn) : (globalThis.game?.combat?.turn ?? null);

  setObjectPath(all, uuid, {
    detectionState: current.detectionState,
    packet: {
      ...packet,
      suppressedBy: suppression,
    },
  });
  await writeRawTargetingState(combatant, all);

  return {
    ok: true,
    packetId: packet.id,
    previousSuppressedBy: packet.suppressedBy ?? null,
    suppressedBy: suppression,
    targetTokenUuid: uuid,
  };
}

export async function clearSuppressedTargetingPackets(combatant, { targetTokenUuid = "" } = {}) {
  if (!combatant) return { ok: false, reason: "Missing combatant.", cleared: 0 };
  const filterUuid = normalizeTargetUuid(targetTokenUuid);
  const all = cloneAllTargetingStates(combatant);
  let cleared = 0;

  for (const [uuid, raw] of Object.entries(all)) {
    const normalizedUuid = normalizeTargetUuid(uuid);
    if (!normalizedUuid || (filterUuid && normalizedUuid !== filterUuid)) continue;
    const current = normalizeTargetingState(raw);
    const packet = current.packet ? foundry.utils.deepClone(current.packet) : null;
    if (!packet?.suppressedBy) continue;

    packet.suppressedBy = null;
    setObjectPath(all, normalizedUuid, {
      detectionState: current.detectionState,
      packet,
    });
    cleared += 1;
  }

  if (cleared > 0) await writeRawTargetingState(combatant, all);
  return { ok: true, cleared };
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

// ---------------------------------------------------------------------------
// Indirect-fire spotting (token-scoped, multi-spotter; LoS-bypass only)
// ---------------------------------------------------------------------------
// A "spot" is a short-lived indirect-fire *permission* marker stored on the
// TARGET TOKEN document (per-token, naturally scene-scoped). It is deliberately
// NOT part of detection state / targetingData / Lock: getEffectiveDetectionState
// must never read it, or spotting would leak the Lock-gated bonuses that TAG/NARC
// pay for. The `spotted` ActiveEffect is a visual marker only; this token-flag
// metadata is authoritative for the attack-side gate.

const SPOTTING_FLAG_KEY = "spotting";
const SPOTTED_STATUS_ID = "spotted";
const VALID_SPOT_ALLEGIANCES = new Set(["ally", "enemy", "any"]);

function getTokenDocument(token) {
  if (!token) return null;
  return token.document ?? token ?? null;
}

// Token shape varies (placeable vs document). Real Foundry exposes actor /
// disposition / uuid on both; some call sites and tests carry them on only one.
// Read with a fallback so either shape works.
function getTokenActor(token) {
  return token?.actor ?? token?.document?.actor ?? null;
}

function getTokenDisposition(token) {
  return Number(token?.document?.disposition ?? token?.disposition ?? 0) || 0;
}

function getTokenUuid(token) {
  return String(token?.document?.uuid ?? token?.uuid ?? "").trim();
}

function readSpotEntries(targetDoc) {
  const raw = targetDoc?.getFlag?.(FLAG_SCOPE, SPOTTING_FLAG_KEY);
  return asObject(asObject(raw).spots);
}

async function writeSpots(targetDoc, spots) {
  if (!targetDoc?.setFlag) return;
  if (!spots || !Object.keys(spots).length) {
    await targetDoc.unsetFlag?.(FLAG_SCOPE, SPOTTING_FLAG_KEY);
    notifySpotsChanged(targetDoc, {});
    return;
  }
  await targetDoc.setFlag(FLAG_SCOPE, SPOTTING_FLAG_KEY, { spots });
  notifySpotsChanged(targetDoc, spots);
}

function notifySpotsChanged(targetDoc, spots = {}) {
  globalThis.Hooks?.callAll?.("mwd.spotsChanged", {
    targetToken: targetDoc,
    targetTokenUuid: String(targetDoc?.uuid ?? "").trim(),
    spots,
  });
}

function findTokenDocumentInCombatScene(combat = null, tokenId = "") {
  const id = String(tokenId ?? "").trim();
  if (!combat || !id) return null;
  const scene = combat.scene ?? combat.parent ?? null;
  return collectionEntries(scene?.tokens).find(tokenDoc => String(tokenDoc?.id ?? "").trim() === id) ?? null;
}

function getCombatantTokenUuid(combat = null, combatant = null) {
  const direct = String(
    combatant?.token?.document?.uuid
      ?? combatant?.token?.uuid
      ?? combatant?.tokenUuid
      ?? ""
  ).trim();
  if (direct) return direct;

  const tokenDoc = findTokenDocumentInCombatScene(combat, combatant?.tokenId);
  return String(tokenDoc?.uuid ?? "").trim();
}

function findCombatantIdForToken(combat, tokenId, tokenUuid = "") {
  const id = String(tokenId ?? "").trim();
  const uuid = String(tokenUuid ?? "").trim();
  if (!combat || (!id && !uuid)) return "";
  const direct = combat.getCombatantByToken?.(id);
  if (direct?.id) return String(direct.id);
  const match = collectionEntries(combat.combatants).find(entry => {
    const entryTokenId = String(entry?.tokenId ?? entry?.token?.id ?? entry?.token?.document?.id ?? "").trim();
    const entryTokenUuid = getCombatantTokenUuid(combat, entry);
    return (id && entryTokenId === id) || (uuid && entryTokenUuid === uuid);
  });
  return match?.id ? String(match.id) : "";
}

function spotAllegianceMatches(spot, { uuid = "", disposition = 0 } = {}) {
  if (spot.allegiance === "any") return true;
  if (!uuid && !disposition) return false;
  const sameToken = String(spot.spotterTokenUuid ?? "").trim() === String(uuid ?? "").trim();
  const sameDisposition = Number(spot.spotterDisposition ?? 0) === Number(disposition ?? 0);
  if (spot.allegiance === "enemy") return !sameToken && !sameDisposition;
  return sameDisposition; // "ally": attacker shares the spotter's side
}

export async function setSpot(targetToken, { spotterToken = null, combat = null, allegiance = "ally", source = "spotIndirect" } = {}) {
  const targetDoc = getTokenDocument(targetToken);
  if (!targetDoc?.setFlag || !spotterToken) return { ok: false, reason: "missing-token" };
  const spotterTokenUuid = getTokenUuid(spotterToken);
  if (!spotterTokenUuid) return { ok: false, reason: "missing-spotter" };

  const requested = String(allegiance ?? "").trim().toLowerCase();
  const normalizedAllegiance = VALID_SPOT_ALLEGIANCES.has(requested) ? requested : "ally";

  const entry = {
    spotKey: spotterTokenUuid,
    sceneUuid: String(targetDoc.parent?.uuid ?? "").trim(),
    targetTokenUuid: getTokenUuid(targetToken),
    targetActorUuid: String(getTokenActor(targetToken)?.uuid ?? "").trim(),
    spotterTokenUuid,
    spotterTokenId: String(spotterToken?.id ?? spotterToken?.document?.id ?? "").trim(),
    spotterActorUuid: String(getTokenActor(spotterToken)?.uuid ?? "").trim(),
    spotterCombatantId: findCombatantIdForToken(combat, spotterToken.id ?? spotterToken.document?.id, spotterTokenUuid),
    spotterDisposition: getTokenDisposition(spotterToken),
    allegiance: normalizedAllegiance,
    source: String(source ?? "spotIndirect").trim() || "spotIndirect",
    round: Number.isFinite(Number(combat?.round)) ? Number(combat.round) : null,
    turn: Number.isFinite(Number(combat?.turn)) ? Number(combat.turn) : null,
    createdAt: Date.now(),
  };

  const spots = { ...readSpotEntries(targetDoc), [spotterTokenUuid]: entry };
  await writeSpots(targetDoc, spots);
  await reconcileSpottedStatus(targetToken);
  return { ok: true, spot: entry };
}

export function getValidSpots(targetToken, { attackerToken = null, combat = null, includeTagNarcs = false } = {}) {
  const targetDoc = getTokenDocument(targetToken);
  if (!targetDoc) return [];
  const attacker = { uuid: getTokenUuid(attackerToken), disposition: getTokenDisposition(attackerToken) };
  const sceneUuid = String(targetDoc.parent?.uuid ?? "").trim();
  const currentRound = Number.isFinite(Number(combat?.round)) ? Number(combat.round) : null;

  const valid = Object.values(readSpotEntries(targetDoc)).filter(spot => {
    if (!spot || typeof spot !== "object") return false;
    if (sceneUuid && spot.sceneUuid && spot.sceneUuid !== sceneUuid) return false;
    // Spotter combatant must still exist while a combat is running.
    if (combat && spot.spotterCombatantId && !(combat.combatants?.get?.(spot.spotterCombatantId))) return false;
    // Coarse expiry fallback (authoritative clear runs in the updateCombat hook):
    // a spot expires once combat advances past the spotter's next activation.
    if (currentRound !== null && Number.isFinite(Number(spot.round)) && currentRound > Number(spot.round) + 1) return false;
    return spotAllegianceMatches(spot, attacker);
  });

  if (includeTagNarcs) {
    const statuses = getTokenActor(targetToken)?.statuses ?? new Set();
    if (statuses.has?.("tagged")) valid.push({ spotKey: "tag", source: "tag", allegiance: "any" });
    if (statuses.has?.("narced")) valid.push({ spotKey: "narc", source: "narc", allegiance: "any" });
  }
  return valid;
}

export function hasValidIndirectDesignation(targetToken, { attackerToken = null, combat = null } = {}) {
  if (!getTokenDocument(targetToken)) return false;
  // TAG/NARC are globally-readable hard designations (their existing role).
  const statuses = getTokenActor(targetToken)?.statuses ?? new Set();
  if (statuses.has?.("tagged") || statuses.has?.("narced")) return true;
  // Ordinary spots: token/scene/allegiance/expiry validated.
  return getValidSpots(targetToken, { attackerToken, combat, includeTagNarcs: false }).length > 0;
}

export async function reconcileSpottedStatus(targetToken) {
  const targetDoc = getTokenDocument(targetToken);
  const actor = getTokenActor(targetToken);
  if (!targetDoc || !actor?.toggleStatusEffect) return;
  const hasSpots = Object.keys(readSpotEntries(targetDoc)).length > 0;
  const hasStatus = actor.statuses?.has?.(SPOTTED_STATUS_ID) ?? false;
  if (hasSpots && !hasStatus) {
    await actor.toggleStatusEffect(SPOTTED_STATUS_ID, { active: true, overlay: false });
  } else if (!hasSpots && hasStatus) {
    await actor.toggleStatusEffect(SPOTTED_STATUS_ID, { active: false, overlay: false });
  }
}

export async function clearSpot(targetToken, spotKey = "") {
  const targetDoc = getTokenDocument(targetToken);
  if (!targetDoc) return { ok: false, cleared: 0 };
  const key = String(spotKey ?? "").trim();
  const spots = readSpotEntries(targetDoc);
  if (key && !spots[key]) return { ok: true, cleared: 0 };
  const next = key ? { ...spots } : {};
  if (key) delete next[key];
  await writeSpots(targetDoc, next);
  await reconcileSpottedStatus(targetDoc);
  return { ok: true, cleared: key ? 1 : Object.keys(spots).length };
}

export async function clearExpiredSpotsForCombatant(combat, combatantId) {
  const id = String(combatantId ?? "").trim();
  if (!combat || !id) return { ok: true, cleared: 0 };
  const round = Number.isFinite(Number(combat.round)) ? Number(combat.round) : null;
  const scene = combat.scene ?? combat.parent ?? null;
  const combatant = combat.combatants?.get?.(id) ?? collectionEntries(combat.combatants).find(entry => String(entry?.id ?? "").trim() === id) ?? null;
  const combatantTokenId = String(combatant?.tokenId ?? combatant?.token?.id ?? combatant?.token?.document?.id ?? "").trim();
  const combatantTokenUuid = getCombatantTokenUuid(combat, combatant);
  let cleared = 0;
  for (const tokenDoc of collectionEntries(scene?.tokens)) {
    const spots = readSpotEntries(tokenDoc);
    let mutated = false;
    const next = { ...spots };
    for (const [key, spot] of Object.entries(spots)) {
      const spotterCombatantId = String(spot?.spotterCombatantId ?? "").trim();
      const spotterTokenUuid = String(spot?.spotterTokenUuid ?? key ?? "").trim();
      const spotterTokenId = String(spot?.spotterTokenId ?? "").trim();
      const sameCombatant = spotterCombatantId === id;
      const sameToken = Boolean(
        (combatantTokenUuid && spotterTokenUuid === combatantTokenUuid)
          || (combatantTokenId && spotterTokenId === combatantTokenId)
      );
      if (!sameCombatant && !sameToken) continue;
      // Only expire on a LATER activation than the one that created the spot.
      if (round !== null && Number.isFinite(Number(spot?.round)) && Number(spot.round) >= round) continue;
      delete next[key];
      mutated = true;
      cleared += 1;
    }
    if (mutated) {
      await writeSpots(tokenDoc, next);
      await reconcileSpottedStatus(tokenDoc);
    }
  }
  return { ok: true, cleared };
}

export async function clearAllSpotsForCombat(combat) {
  const scene = combat?.scene ?? combat?.parent ?? null;
  if (!scene) return { ok: true, cleared: 0 };
  let cleared = 0;
  for (const tokenDoc of collectionEntries(scene.tokens)) {
    if (!Object.keys(readSpotEntries(tokenDoc)).length) continue;
    await writeSpots(tokenDoc, {});
    await reconcileSpottedStatus(tokenDoc);
    cleared += 1;
  }
  return { ok: true, cleared };
}

export async function clearSpotsForToken(tokenDoc, { skipSelf = false } = {}) {
  const doc = getTokenDocument(tokenDoc);
  if (!doc) return { ok: true, cleared: 0 };
  const uuid = String(doc.uuid ?? "").trim();
  let cleared = 0;
  // Spots applied directly ON this token (skipped when the token is being deleted).
  if (!skipSelf && Object.keys(readSpotEntries(doc)).length) {
    await writeSpots(doc, {});
    await reconcileSpottedStatus(doc);
    cleared += 1;
  }
  // Spots authored BY this token (its uuid is the spotKey) on other scene tokens.
  for (const other of collectionEntries(doc.parent?.tokens)) {
    if (other === doc || !uuid) continue;
    const spots = readSpotEntries(other);
    if (!spots[uuid]) continue;
    const next = { ...spots };
    delete next[uuid];
    await writeSpots(other, next);
    await reconcileSpottedStatus(other);
    cleared += 1;
  }
  return { ok: true, cleared };
}
