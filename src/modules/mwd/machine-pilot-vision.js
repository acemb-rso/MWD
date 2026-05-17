// src/modules/mwd/machine-pilot-vision.js
// Purpose: Grants assigned machine pilots enough actor visibility for token vision
// without making them machine owners.
// How it fits: Pilot assignment is the authority; this syncs Foundry observer
// permissions so players can see through machines they operate.

import { SYSTEM_NAME } from "../constants.js";
import { isMachineActorType } from "./machine-monitors.js";

const PILOT_VISION_OWNERSHIP_FLAG = "pilotVisionOwnership";
let pilotVisionHooksRegistered = false;

function getOwnershipLevels() {
  const levels = globalThis.CONST?.DOCUMENT_OWNERSHIP_LEVELS ?? {};
  return {
    none: Number(levels.NONE ?? 0),
    observer: Number(levels.OBSERVER ?? 2),
    owner: Number(levels.OWNER ?? 3),
  };
}

function getActorIdentityKeys(actor = null) {
  const keys = new Set();
  const add = value => {
    const normalized = String(value ?? "").trim();
    if (normalized) keys.add(normalized);
  };

  add(actor?.id);
  add(actor?._id);
  add(actor?.uuid);
  add(actor?.actor?.id);
  add(actor?.actor?.uuid);
  add(actor?.baseActor?.id);
  add(actor?.baseActor?.uuid);
  return keys;
}

function actorsMatch(left = null, right = null) {
  if (!left || !right) return false;
  const rightKeys = getActorIdentityKeys(right);
  for (const key of getActorIdentityKeys(left)) {
    if (rightKeys.has(key)) return true;
  }
  return false;
}

function userCanObservePilot(user = null, pilotActor = null) {
  if (!user || !pilotActor) return false;
  if (user.isGM) return false;
  if (actorsMatch(pilotActor, user.character)) return true;

  if (typeof pilotActor.testUserPermission !== "function") return false;
  try {
    return pilotActor.testUserPermission(user, getOwnershipLevels().owner);
  } catch (_error) {
    return false;
  }
}

async function resolvePilotActor(machineActor = null) {
  const pilotUuid = String(
    machineActor?.system?.pilot?.uuid
    ?? machineActor?.system?.mwd?.pilot?.uuid
    ?? machineActor?.system?.mwd?.crew?.operatorActorUuid
    ?? machineActor?.system?.mwd?.crew?.pilotActorUuid
    ?? ""
  ).trim();
  if (!pilotUuid || typeof fromUuid !== "function") return null;

  try {
    return await fromUuid(pilotUuid);
  } catch (_error) {
    return null;
  }
}

function getUsers() {
  const users = globalThis.game?.users;
  if (!users) return [];
  if (typeof users.values === "function") return Array.from(users.values());
  return Array.from(users);
}

function getAutoGrantMap(actor = null) {
  const value = actor?.getFlag?.(SYSTEM_NAME, PILOT_VISION_OWNERSHIP_FLAG)
    ?? actor?.flags?.[SYSTEM_NAME]?.[PILOT_VISION_OWNERSHIP_FLAG]
    ?? {};
  return value && typeof value === "object" && !Array.isArray(value) ? { ...value } : {};
}

export async function syncMachinePilotVision(actor = null) {
  if (!globalThis.game?.user?.isGM) return { ok: true, skipped: true };
  if (!isMachineActorType(actor)) return { ok: true, skipped: true };
  if (typeof actor?.update !== "function") return { ok: false, reason: "Machine actor cannot be updated." };

  const { observer, none } = getOwnershipLevels();
  const ownership = { ...(actor.ownership ?? {}) };
  const autoGrants = getAutoGrantMap(actor);
  const nextAutoGrants = { ...autoGrants };
  const updates = {};

  const pilotActor = await resolvePilotActor(actor);
  const desiredUserIds = new Set(
    pilotActor
      ? getUsers()
        .filter(user => userCanObservePilot(user, pilotActor))
        .map(user => String(user.id ?? "").trim())
        .filter(Boolean)
      : []
  );

  for (const userId of desiredUserIds) {
    const current = Number(ownership[userId] ?? none) || none;
    if (current >= observer) continue;

    updates[`ownership.${userId}`] = observer;
    nextAutoGrants[userId] = current;
  }

  for (const [userId, previousLevel] of Object.entries(autoGrants)) {
    if (desiredUserIds.has(userId)) continue;

    const restored = Math.max(none, Number(previousLevel ?? none) || none);
    if (restored > none) updates[`ownership.${userId}`] = restored;
    else updates[`ownership.-=${userId}`] = null;
    delete nextAutoGrants[userId];
  }

  const currentFlagJson = JSON.stringify(autoGrants);
  const nextFlagJson = JSON.stringify(nextAutoGrants);
  if (currentFlagJson !== nextFlagJson) {
    updates[`flags.${SYSTEM_NAME}.${PILOT_VISION_OWNERSHIP_FLAG}`] = nextAutoGrants;
  }

  if (!Object.keys(updates).length) return { ok: true, changed: false };
  await actor.update(updates);
  return { ok: true, changed: true };
}

export async function syncAllMachinePilotVision() {
  if (!globalThis.game?.user?.isGM) return;
  const actors = Array.from(game.actors?.contents ?? game.actors ?? []);
  for (const actor of actors) {
    if (isMachineActorType(actor)) {
      await syncMachinePilotVision(actor);
    }
  }
}

export function registerMachinePilotVisionSync() {
  if (pilotVisionHooksRegistered) return;
  pilotVisionHooksRegistered = true;

  Hooks.on("updateActor", (actor, changed = {}) => {
    if (!globalThis.game?.user?.isGM || !isMachineActorType(actor)) return;
    if (foundry.utils.hasProperty(changed, "system.pilot.uuid")
      || foundry.utils.hasProperty(changed, "system.mwd.pilot.uuid")
      || foundry.utils.hasProperty(changed, "system.mwd.crew.operatorActorUuid")
      || foundry.utils.hasProperty(changed, "system.mwd.crew.pilotActorUuid")) {
      void syncMachinePilotVision(actor);
    }
  });
}
