// src/modules/mwd/battlemech-mobility.js
// Purpose: Derives BattleMech mobility abilities from installed asset modules.
// Workflow: installed modules and legacy movement -> derived jump profile ->
// movement menus and attack modifiers consume current mobility capability.

import { TEMPLATE } from "../core/constants.js";
import { getAssetModuleJumpingProfile, getAssetModuleState, normalizeAssetModuleJumping } from "./asset-module-rules.js";

function toNonNegativeInteger(value, fallback = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(0, Math.trunc(numeric));
}

function toCollectionArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.contents)) return value.contents;
  if (value && typeof value[Symbol.iterator] === "function") return Array.from(value);
  return [];
}

function getActorType(source = {}) {
  return String(source?.type ?? source?.actor?.type ?? "").trim();
}

function getActorSystem(source = {}) {
  return source?.system ?? source?.actor?.system ?? {};
}

function getAssetModules(source = {}) {
  // Mobility can be prepared from an actor, a sheet context, or a test snapshot;
  // accept all item collection shapes used by Foundry and our fixtures.
  const explicit = source?.assetModules ?? source?.items ?? source?.actor?.items ?? [];
  return toCollectionArray(explicit).filter(item => (item?.canonicalType ?? item?.type) === TEMPLATE.itemType.assetModule);
}

function getLegacyJumpMovement(source = {}) {
  const system = getActorSystem(source);
  return toNonNegativeInteger(system?.movement?.jump, 0);
}

function hasJumpFailureStatus(source = {}) {
  const statusSet = source?.statuses ?? source?.actor?.statuses;
  if (statusSet?.has?.("jumpJetFailure")) return true;

  const statusEffects = Array.isArray(source?.effects)
    ? source.effects
    : Array.isArray(source?.actor?.effects)
      ? source.actor.effects
      : [];

  return statusEffects.some(effect => {
    const id = String(effect?.statusId ?? effect?.id ?? "").trim();
    if (id === "jumpJetFailure") return true;
    const statuses = effect?.statuses;
    return Array.isArray(statuses)
      ? statuses.includes("jumpJetFailure")
      : Boolean(statuses?.has?.("jumpJetFailure"));
  });
}

function hasJumpGateCrit(source = {}) {
  // Some criticals gate a capability without applying a status effect, so jump
  // availability must check active crit records directly.
  const crits = Array.isArray(getActorSystem(source)?.mwd?.crits)
    ? getActorSystem(source).mwd.crits
    : [];

  return crits.some(crit =>
    crit
    && crit.active !== false
    && Array.isArray(crit.gates)
    && crit.gates.includes("jump"));
}

function buildDisabledJumpingState(reason = "") {
  return {
    enabled: false,
    available: false,
    blocked: false,
    blockedReason: "",
    legacy: false,
    movement: 0,
    heat: 0,
    attackRatingBonus: 0,
    defenseRatingBonus: 0,
    dfaEnabled: false,
    sourceIds: [],
    sourceNames: [],
    sourceLabel: reason,
  };
}

export function buildBattlemechMobilityModel(source = {}) {
  // Jump movement is derived from active modules first, with legacy authored
  // movement as a fallback for older actors that predate asset modules.
  const actorType = getActorType(source);
  if (actorType && actorType !== TEMPLATE.actorTypes.battlemech) {
    return { jumping: buildDisabledJumpingState() };
  }

  const jumpModules = getAssetModules(source)
    .map(item => ({
      item,
      state: getAssetModuleState(item, { installed: true }),
      profile: getAssetModuleJumpingProfile(item),
    }))
    .filter(entry => entry.state.active && entry.profile.enabled);

  const legacyMovement = getLegacyJumpMovement(source);
  const legacyEnabled = jumpModules.length === 0 && legacyMovement > 0;
  const enabled = jumpModules.length > 0 || legacyEnabled;
  if (!enabled) {
    return { jumping: buildDisabledJumpingState() };
  }

  const blocked = hasJumpGateCrit(source) || hasJumpFailureStatus(source);
  const blockedReason = blocked ? "Jump capability is blocked by current machine damage or status effects." : "";

  const aggregated = jumpModules.reduce((acc, entry) => ({
    movement: acc.movement + toNonNegativeInteger(entry.profile.movement, 0),
    heat: acc.heat + toNonNegativeInteger(entry.profile.heat, 0),
    attackRatingBonus: acc.attackRatingBonus + Number(entry.profile.attackRatingBonus ?? 0),
    defenseRatingBonus: acc.defenseRatingBonus + Number(entry.profile.defenseRatingBonus ?? 0),
    dfaEnabled: acc.dfaEnabled || Boolean(entry.profile.dfaEnabled),
    sourceIds: acc.sourceIds.concat(entry.item?.id ? [entry.item.id] : []),
    sourceNames: acc.sourceNames.concat(entry.item?.name ? [entry.item.name] : []),
  }), {
    movement: 0,
    heat: 0,
    attackRatingBonus: 0,
    defenseRatingBonus: 0,
    dfaEnabled: false,
    sourceIds: [],
    sourceNames: [],
  });

  const sourceNames = legacyEnabled ? ["Legacy Jump Movement"] : aggregated.sourceNames;
  const sourceIds = legacyEnabled ? [] : aggregated.sourceIds;
  const movement = legacyEnabled ? legacyMovement : aggregated.movement;
  const heat = legacyEnabled ? 0 : aggregated.heat;
  const attackRatingBonus = legacyEnabled ? 0 : aggregated.attackRatingBonus;
  const defenseRatingBonus = legacyEnabled ? 0 : aggregated.defenseRatingBonus;
  const dfaEnabled = legacyEnabled ? true : aggregated.dfaEnabled;

  return {
    jumping: {
      enabled: true,
      available: !blocked,
      blocked,
      blockedReason,
      legacy: legacyEnabled,
      movement,
      heat,
      attackRatingBonus,
      defenseRatingBonus,
      dfaEnabled: !blocked && dfaEnabled,
      sourceIds,
      sourceNames,
      sourceLabel: sourceNames.join(", "),
    },
  };
}

export function getBattlemechJumpProfile(source = {}) {
  return buildBattlemechMobilityModel(source).jumping;
}

export function resolveBattlemechJumpProfile(source = {}) {
  const derived = getBattlemechJumpProfile(source);
  if (derived?.enabled) return derived;

  const cached = getActorSystem(source)?.mwd?.mobility?.jumping ?? null;
  return cached?.enabled ? cached : derived;
}

export function getMachineJumpProfile(actor = null) {
  if (!actor) return null;
  if (getActorType(actor) === TEMPLATE.actorTypes.battlemech) return resolveBattlemechJumpProfile(actor);
  return normalizeAssetModuleJumping(getActorSystem(actor)?.mwd?.mobility?.jumping ?? {});
}

export function getMachineJumpedThisActivation(actor = null) {
  if (!actor) return false;
  const combat = globalThis.game?.combat;
  if (!combat) return false;
  const combatant = Array.from(combat.combatants?.values?.() ?? []).find(c => c.actorId === actor.id);
  if (!combatant) return false;
  const move = combatant.getFlag?.("mwd", "personalCombat")?.actionState?.move ?? null;
  return move?.movementKind === "jump";
}
