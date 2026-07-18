// src/modules/mwd/machine-sensor-eligibility.js
// Purpose: Canonical sensor-target eligibility policy for machine EW.
// Workflow: canvas sensor detection and EW panel enumeration both ask this
// module which tokens are sensor-eligible targets -> one predicate keeps the
// reveal layer and the sheet affordances from drifting apart.
// Invariant: this module owns the machine-actor/disposition/hidden policy.
// Neither the detection mode nor the panel may re-implement those checks.

import { isMachineActorType } from "./machine-monitors.js";
import {
  getTokenActor,
  getTokenDisposition,
  getTokenDocument,
  getTokenId,
  getTokenObject,
  getTokenUuid,
} from "../utils/token.js";

function collectionEntries(collection = null) {
  if (!collection) return [];
  if (Array.isArray(collection)) return collection;
  if (Array.isArray(collection.contents)) return collection.contents;
  if (typeof collection.values === "function") return Array.from(collection.values());
  if (typeof collection[Symbol.iterator] === "function") return Array.from(collection);
  return [];
}

function getHostileDisposition() {
  return Number(globalThis.CONST?.TOKEN_DISPOSITIONS?.HOSTILE ?? -1);
}

function isTokenHidden(token = null) {
  return Boolean(getTokenDocument(token)?.hidden);
}

function isSameToken(left = null, right = null) {
  const leftUuid = getTokenUuid(left);
  const rightUuid = getTokenUuid(right);
  if (leftUuid && rightUuid) return leftUuid === rightUuid;
  const leftId = getTokenId(left);
  const rightId = getTokenId(right);
  return Boolean(leftId) && leftId === rightId;
}

/**
 * Decide whether a token is a valid machine-sensor target for an observer.
 * Current policy: machine actor, HOSTILE disposition, not the observer itself,
 * and not GM-hidden unless the caller opts in. Widening the disposition rule
 * is a rules change and must happen here, nowhere else.
 */
export function isMachineSensorEligibleTarget({
  observerToken = null,
  targetToken = null,
  includeHidden = false,
} = {}) {
  const target = getTokenObject(targetToken);
  if (!target) return false;
  if (!isMachineActorType(getTokenActor(target))) return false;
  if (getTokenDisposition(target) !== getHostileDisposition()) return false;
  if (!includeHidden && isTokenHidden(target)) return false;
  const observer = getTokenObject(observerToken);
  if (observer && isSameToken(observer, target)) return false;
  return true;
}

function resolveCombatantToken(combatant = null) {
  const tokenDocument = combatant?.token ?? null;
  const placeable = tokenDocument?.object ?? null;
  if (placeable?.actor) return placeable;

  const tokenId = String(combatant?.tokenId ?? tokenDocument?.id ?? "").trim();
  const canvasToken = tokenId ? globalThis.canvas?.tokens?.get?.(tokenId) : null;
  if (canvasToken?.actor) return canvasToken;

  return getTokenActor(tokenDocument) ? tokenDocument : null;
}

function isCombatantOnCurrentScene(combatant = null) {
  const combatantSceneId = String(combatant?.sceneId ?? "").trim();
  const canvasSceneId = String(globalThis.canvas?.scene?.id ?? "").trim();
  if (!combatantSceneId || !canvasSceneId) return true;
  return combatantSceneId === canvasSceneId;
}

/**
 * Enumerate sensor-eligible target tokens from an encounter. Returns tokens
 * only (not UI rows), deduplicated and sorted by token id so downstream
 * ordering and anonymous contact labels stay stable regardless of initiative.
 */
export function collectMachineEwEncounterTargets({
  observerToken = null,
  combat = globalThis.game?.combat,
} = {}) {
  if (!combat) return [];

  const seen = new Set();
  const targets = [];
  for (const entry of collectionEntries(combat.combatants)) {
    const combatant = Array.isArray(entry) ? entry[1] : entry;
    if (!combatant) continue;
    if (!isCombatantOnCurrentScene(combatant)) continue;

    const targetToken = resolveCombatantToken(combatant);
    if (!targetToken) continue;
    if (!isMachineSensorEligibleTarget({ observerToken, targetToken })) continue;

    const key = getTokenUuid(targetToken) || getTokenId(targetToken);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    targets.push(targetToken);
  }

  return targets.sort((left, right) => getTokenId(left).localeCompare(getTokenId(right)));
}
