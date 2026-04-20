// src/modules/mwd/asset-module-rules.js
// Purpose: Normalizes asset-module authored rules payloads.
// How it fits: Keeps module-carried mechanics data out of sheets and actor prep
// while providing one stable source of truth for derived machine abilities.

function toInteger(value, fallback = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.trunc(numeric);
}

function toNonNegativeInteger(value, fallback = 0) {
  return Math.max(0, toInteger(value, fallback));
}

function toTrimmedString(value, fallback = "") {
  const normalized = String(value ?? "").trim();
  return normalized || fallback;
}

export function normalizeAssetModuleJumping(source = {}) {
  const jumping = source && typeof source === "object" ? source : {};
  const enabled = Boolean(jumping.enabled);

  return {
    enabled,
    movement: toNonNegativeInteger(jumping.movement, 0),
    heat: toNonNegativeInteger(jumping.heat, 0),
    attackRatingBonus: toInteger(jumping.attackRatingBonus, 0),
    defenseRatingBonus: toInteger(jumping.defenseRatingBonus, 0),
    dfaEnabled: Boolean(jumping.dfaEnabled ?? enabled),
  };
}

export function normalizeAssetModuleSystem(system = {}) {
  const source = system && typeof system === "object" ? system : {};
  const mobility = source.mobility && typeof source.mobility === "object" ? source.mobility : {};

  return {
    ...source,
    category: toTrimmedString(source.category, "special"),
    level: Math.max(1, toInteger(source.level, 1)),
    mobility: {
      ...mobility,
      jumping: normalizeAssetModuleJumping(mobility.jumping),
    },
  };
}

export function getAssetModuleJumpingProfile(itemOrSystem = {}) {
  const system = itemOrSystem?.system ?? itemOrSystem;
  return normalizeAssetModuleSystem(system).mobility.jumping;
}
