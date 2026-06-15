// src/modules/mwd/battlemech-melee-actions.js
// Purpose: Builds and executes BattleMech melee quick-action profiles.
// Workflow: mounted melee weapons or unarmed fallback -> selectable profiles ->
// standard machine attack intents emitted through the roll engine.

import { MWD } from "../core/config.js";
import { TEMPLATE } from "../core/constants.js";
import { getMountedMachineItems } from "./machine-hardpoints.js";
import { buildStandardMachineMeleeProfile, resolveMachineMeleeCombatProfile } from "./machine-melee-weapons.js";
import { resolveMachineSceneToken } from "./machine-token-resolution.js";

function getMachineRollApi() {
  return game.mwd?.roll ?? game.system?.mwd?.roll ?? null;
}

function normalizeProfile(profile = {}, index = 0) {
  const weaponId = String(profile?.weaponId ?? "").trim();
  const name = String(profile?.name ?? "").trim() || MWD.actor.vehicle.quickActions.unarmed;
  return {
    ...profile,
    id: String(profile?.id ?? weaponId ?? `melee-${index + 1}`).trim() || `melee-${index + 1}`,
    name,
    weaponId: weaponId || null,
    damage: profile?.damage ?? 1,
    notes: String(profile?.notes ?? "").trim(),
  };
}

function isMeleeWeapon(item = null) {
  return item?.system?.skill === "meleeCombat"
    || item?.system?.weaponCategory === "melee"
    || item?.system?.category === "melee";
}

export function buildBattlemechMeleeProfiles(actor = null) {
  // Prepared actors may already have derived melee profiles. If not, synthesize
  // an unarmed fallback and add mounted melee weapons from hardpoints.
  const prepared = Array.isArray(actor?.system?.meleeProfiles)
    ? actor.system.meleeProfiles.map(normalizeProfile)
    : [];
  if (prepared.length > 0) return prepared;

  const profiles = [normalizeProfile({
    ...resolveMachineMeleeCombatProfile({
      machineActor: actor,
      pilotActor: null,
      profile: buildStandardMachineMeleeProfile(actor),
    }),
    name: MWD.actor.vehicle.quickActions.unarmed,
    weaponId: null,
    notes: MWD.actor.vehicle.quickActions.unarmedNotes,
  })];

  const meleeWeapons = getMountedMachineItems(actor, { canonicalType: TEMPLATE.itemType.mechWeapon })
    .filter(isMeleeWeapon);

  profiles.push(...meleeWeapons.map((weapon, index) => normalizeProfile({
    id: weapon.id,
    name: weapon.name,
    weaponId: weapon.id,
    damage: weapon.getDamage?.()?.value ?? weapon.system?.damage ?? 0,
    notes: weapon.system?.description ?? weapon.system?.references?.description ?? "",
  }, index + 1)));

  return profiles;
}

export async function performBattlemechMeleeAttack(actor, {
  profile = null,
  profileId = "",
  operatorActorUuid = "",
} = {}) {
  // Mounted melee weapons execute as normal item-backed attacks; the unarmed
  // fallback sends a synthetic profile through the same roll pipeline.
  const profiles = buildBattlemechMeleeProfiles(actor);
  const selectedProfile = profile
    ?? profiles.find(entry => String(entry.id ?? "").trim() === String(profileId ?? "").trim())
    ?? profiles[0]
    ?? null;

  if (!selectedProfile) {
    ui.notifications?.warn(MWD.actor.vehicle.quickActions.errors.noMelee);
    return { ok: false, reason: MWD.actor.vehicle.quickActions.errors.noMelee };
  }

  const rollApi = getMachineRollApi();
  if (!rollApi?.execute) {
    ui.notifications?.error("MWD roll system not initialized.");
    return { ok: false, reason: "MWD roll system not initialized." };
  }

  const token = resolveMachineSceneToken(actor);
  const weaponId = String(selectedProfile.weaponId ?? "").trim();
  const normalizedOperatorUuid = String(operatorActorUuid ?? "").trim();
  if (weaponId) {
    await rollApi.execute({
      actor,
      payload: {
        intent: "attack",
        sourceType: "mechWeapon",
        sourceId: weaponId,
        weaponId,
        edge: { pool: "physical.grit", allowed: ["pre", "post"] },
        tags: ["combat", "attack", "machine"],
        sourceTokenId: token?.id ?? null,
        operatorActorUuid: normalizedOperatorUuid,
      }
    });
    return { ok: true, profile: selectedProfile };
  }

  await rollApi.execute({
    actor,
    payload: {
      intent: "attack",
      sourceType: "mechWeapon",
      syntheticWeapon: buildStandardMachineMeleeProfile(actor),
      edge: { allowed: ["pre", "post"] },
      tags: ["machine", "skill", "combat", "attack", "melee"],
      sourceTokenId: token?.id ?? null,
      operatorActorUuid: normalizedOperatorUuid,
    }
  });
  return { ok: true, profile: selectedProfile };
}

export const buildMachineMeleeProfiles = buildBattlemechMeleeProfiles;
export const performMachineMeleeAttack = performBattlemechMeleeAttack;
