// Integration with the Automated Animations (autoanimations) module.
// Registered conditionally in AnarchySystem.onInit — no-ops if AA is not installed/active.
//
// AA's public entry point is the "aa.workflow" hook, which accepts:
//   (sourceToken, item, { targets, hitTargets, playOnMiss })
//
// MWD attack rolls store everything needed in msg.flags.mwd.resolved, so this
// handler bypasses AA's generic chatmessage scraper entirely and feeds it clean data.

import { SETTING_AA_PLAY_ON_MISS, SYSTEM_NAME } from "../constants.js";

export function registerAutoAnimations() {
  if (!game.modules.get("autoanimations")?.active) return;

  game.settings.register(SYSTEM_NAME, SETTING_AA_PLAY_ON_MISS, {
    name: "Automated Animations: Play on Miss",
    hint: "When enabled, Automated Animations will also play an animation for attacks that miss.",
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });

  Hooks.on("createChatMessage", async (msg) => {
    const authorId = msg.author?.id ?? msg.user?.id;
    if (authorId !== game.user.id) return;

    const resolved = msg.flags?.mwd?.resolved;
    if (!resolved || resolved.intent !== "attack") return;

    const weapon = resolved.attack?.weapon;
    if (!weapon) return;

    const sourceToken = _resolveSourceToken(msg, resolved);
    if (!sourceToken) return;

    const item = _resolveAnimationItem(sourceToken, weapon);
    if (!item) return;

    const { targets, hitTargets } = _resolveTargets(resolved.attackResult?.results ?? []);
    const persistentRegion = _resolvePersistentRegion(resolved.attackResult?.persistentRegionUuid);

    Hooks.callAll("aa.workflow", sourceToken, item, {
      targets,
      hitTargets,
      playOnMiss: game.settings.get(SYSTEM_NAME, SETTING_AA_PLAY_ON_MISS),
      ...(persistentRegion ? { templateData: persistentRegion, isTemplate: true } : {}),
    });
  });
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function _resolveSourceToken(msg, resolved) {
  const speakerTokenId = msg.speaker?.token;
  if (speakerTokenId) {
    const token = canvas.scene?.tokens?.get(speakerTokenId)?.object;
    if (token) return token;
  }

  if (resolved.actorUuid) {
    const actor = fromUuidSync(resolved.actorUuid);
    const token = actor?.getActiveTokens?.(true, true)?.[0] ?? null;
    if (token) return token;
  }

  return null;
}

function _resolveAnimationItem(sourceToken, weapon) {
  // Weapon groups: prefer the first real member item so AA can match by weapon
  // name rather than the group name, which users are unlikely to have configured.
  const group = weapon.machineWeaponGroup;
  if (group) {
    const firstMemberId = group.memberWeapons?.[0]?.id;
    if (firstMemberId) {
      const item = sourceToken.actor?.items?.get(firstMemberId);
      if (item) return item;
    }
  }

  // Real item: try UUID first (most reliable across compendiums/linked actors),
  // then fall back to a direct actor-item lookup by ID.
  if (weapon.uuid) {
    const item = fromUuidSync(weapon.uuid);
    if (item) return item;
  }

  if (weapon.id && !weapon.isSynthetic) {
    const item = sourceToken.actor?.items?.get(weapon.id);
    if (item) return item;
  }

  // Synthetic weapons (Unarmed, Standard Melee, Charge) have no real item.
  // Pass a name-only stub so AA can still match a configured animation entry.
  if (weapon.name) {
    return { name: weapon.name };
  }

  return null;
}

function _resolvePersistentRegion(uuid) {
  if (!uuid) return null;
  return fromUuidSync(uuid) ?? null;
}

function _resolveTargets(results) {
  const targets = [];
  const hitTargets = [];

  for (const result of results) {
    const tokenUuid = result.target?.tokenUuid;
    if (!tokenUuid) continue;

    const token = fromUuidSync(tokenUuid)?.object ?? null;
    if (!token) continue;

    targets.push(token);
    // Grazes still connect — treat them as hits for animation purposes.
    if (result.outcome === "hit" || result.outcome === "graze") {
      hitTargets.push(token);
    }
  }

  return { targets, hitTargets };
}
