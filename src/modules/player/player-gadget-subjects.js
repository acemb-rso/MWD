// src/modules/player/player-gadget-subjects.js
// Purpose: Resolves the active personal-scale subject for the Player Gadget.
// How it fits: Keeps ownership, token, and fallback selection out of the gadget AppV2 class.

import { SYSTEM_NAME, TEMPLATE } from "../core/constants.js";

export const SETTING_PLAYER_GADGET_SUBJECT = "playerGadgetRememberedSubject";

const ELIGIBLE_ACTOR_TYPES = new Set([
  TEMPLATE.actorTypes.character,
  TEMPLATE.actorTypes.npc,
  "character",
  "npc",
]);

function asTokenDocument(token = null) {
  return token?.document ?? token ?? null;
}

function collectionValues(collection = null) {
  if (!collection) return [];
  if (typeof collection.values === "function") return Array.from(collection.values());
  if (Array.isArray(collection)) return collection;
  return Array.from(collection ?? []);
}

function getSceneTokens(scene = canvas?.scene ?? null) {
  const sceneTokens = collectionValues(scene?.tokens);
  const placeables = collectionValues(canvas?.tokens?.placeables).map(asTokenDocument);
  const controlled = collectionValues(canvas?.tokens?.controlled).map(asTokenDocument);
  const byUuid = new Map();
  for (const token of [...controlled, ...placeables, ...sceneTokens].map(asTokenDocument)) {
    const key = String(token?.uuid ?? token?.id ?? "").trim();
    if (key && !byUuid.has(key)) byUuid.set(key, token);
  }
  return Array.from(byUuid.values());
}

function actorOwnsForUser(actor = null, user = game?.user ?? null) {
  if (!actor || !user) return false;
  if (typeof actor.testUserPermission === "function") return actor.testUserPermission(user, "OWNER");
  return Boolean(actor.isOwner);
}

export function isEligiblePlayerGadgetToken(token = null, { user = game?.user ?? null } = {}) {
  const tokenDoc = asTokenDocument(token);
  const actor = tokenDoc?.actor ?? token?.actor ?? null;
  if (!tokenDoc || !actor) return false;
  if (!ELIGIBLE_ACTOR_TYPES.has(String(actor.type ?? "").trim())) return false;
  return actorOwnsForUser(actor, user);
}

export function buildPlayerGadgetSubject(token = null) {
  const tokenDoc = asTokenDocument(token);
  const actor = tokenDoc?.actor ?? token?.actor ?? null;
  if (!tokenDoc || !actor) return null;
  return {
    actor,
    token: tokenDoc,
    actorId: actor.id ?? "",
    actorUuid: actor.uuid ?? "",
    tokenId: tokenDoc.id ?? "",
    tokenUuid: tokenDoc.uuid ?? "",
    sceneId: tokenDoc.parent?.id ?? canvas?.scene?.id ?? "",
    name: String(tokenDoc.name ?? actor.name ?? "Combatant").trim() || "Combatant",
    img: tokenDoc.texture?.src ?? actor.img ?? "icons/svg/mystery-man.svg",
  };
}

export function getPlayerGadgetStorageKey(subject = null, { user = game?.user ?? null } = {}) {
  const actor = subject?.actor ?? subject ?? null;
  const token = subject?.token ?? null;
  const userId = String(user?.id ?? "").trim() || "user";
  const sceneId = String(subject?.sceneId ?? token?.parent?.id ?? canvas?.scene?.id ?? "").trim() || "actor";
  const tokenId = String(subject?.tokenId ?? token?.id ?? "").trim() || "actor";
  const actorId = String(subject?.actorId ?? actor?.id ?? "").trim() || "unknown";
  return `${userId}:${sceneId}:${tokenId}:${actorId}`;
}

function getRememberedTokenUuid(systemId = SYSTEM_NAME) {
  try {
    return String(game.settings?.get?.(systemId, SETTING_PLAYER_GADGET_SUBJECT) ?? "").trim();
  } catch (_error) {
    return "";
  }
}

export async function rememberPlayerGadgetSubject(subject = null, { systemId = SYSTEM_NAME } = {}) {
  const tokenUuid = String(subject?.tokenUuid ?? subject?.token?.uuid ?? "").trim();
  if (!tokenUuid || !game.settings?.set) return;
  await game.settings.set(systemId, SETTING_PLAYER_GADGET_SUBJECT, tokenUuid);
}

function findTokenByUuid(tokenUuid = "", tokens = getSceneTokens()) {
  const uuid = String(tokenUuid ?? "").trim();
  if (!uuid) return null;
  return tokens.find(token => String(token?.uuid ?? "").trim() === uuid) ?? null;
}

function getAssignedCharacterActor(user = game?.user ?? null) {
  const character = user?.character ?? null;
  if (character) return character;
  const characterId = String(user?.character?.id ?? user?.data?.character ?? "").trim();
  return characterId ? game.actors?.get?.(characterId) ?? null : null;
}

function findTokenForActor(actor = null, tokens = getSceneTokens()) {
  const actorUuid = String(actor?.uuid ?? "").trim();
  const actorId = String(actor?.id ?? "").trim();
  if (!actorUuid && !actorId) return null;
  return tokens.find(token => {
    const tokenActor = token?.actor ?? null;
    return String(tokenActor?.uuid ?? "").trim() === actorUuid
      || String(tokenActor?.id ?? "").trim() === actorId;
  }) ?? null;
}

export function getEligiblePlayerGadgetTokens({ user = game?.user ?? null, scene = canvas?.scene ?? null } = {}) {
  return getSceneTokens(scene).filter(token => isEligiblePlayerGadgetToken(token, { user }));
}

export function resolvePlayerGadgetSubject({
  user = game?.user ?? null,
  scene = canvas?.scene ?? null,
  rememberedTokenUuid = getRememberedTokenUuid(),
  preferredTokenUuid = "",
} = {}) {
  const tokens = getSceneTokens(scene);
  const eligible = tokens.filter(token => isEligiblePlayerGadgetToken(token, { user }));
  const controlled = collectionValues(canvas?.tokens?.controlled)
    .map(asTokenDocument)
    .find(token => eligible.includes(token) || eligible.some(entry => entry.uuid && entry.uuid === token?.uuid));
  const preferred = findTokenByUuid(preferredTokenUuid, eligible);
  const remembered = findTokenByUuid(rememberedTokenUuid, eligible);
  const assigned = findTokenForActor(getAssignedCharacterActor(user), eligible);
  const token = controlled ?? preferred ?? remembered ?? assigned ?? eligible[0] ?? null;
  const subject = buildPlayerGadgetSubject(token);
  return {
    subject,
    eligible: eligible.map(buildPlayerGadgetSubject).filter(Boolean),
    emptyReason: subject ? "" : "No owned character or NPC tokens are available on the current scene.",
  };
}
