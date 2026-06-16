// src/modules/mwd/personal-fire-modes.js
// Purpose: Centralizes personal automatic-fire mode rules for attack resolution and UI.

export const PERSONAL_FIRE_MODE_KEYS = Object.freeze(["single", "burst", "spray"]);

export const PERSONAL_FIRE_MODES = Object.freeze({
  single: Object.freeze({
    key: "single",
    label: "Single",
    requirement: "loaded",
    diceModifier: 0,
    attackRatingModifier: 0,
    maxTargets: 1,
    unloadAfterAction: false,
    secondaryGrazeOnly: false,
  }),
  burst: Object.freeze({
    key: "burst",
    label: "Burst",
    requirement: "automatic",
    diceModifier: 1,
    attackRatingModifier: 3,
    maxTargets: 1,
    unloadAfterAction: true,
    secondaryGrazeOnly: false,
  }),
  spray: Object.freeze({
    key: "spray",
    label: "Spray",
    requirement: "automaticOrSpread",
    diceModifier: 1,
    attackRatingModifier: -2,
    maxTargets: 3,
    unloadAfterAction: true,
    secondaryGrazeOnly: true,
  }),
});

const UNLOADED_PAYLOAD_ID = "unloaded";

function normalizeString(value) {
  return String(value ?? "").trim();
}

function normalizeFlag(value) {
  return normalizeString(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function normalizePersonalFireModeKey(value, fallback = "single") {
  const normalized = normalizeString(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
  if (normalized === "fullauto" || normalized === "fullautomatic" || normalized === "auto") return "spray";
  if (normalized === "single" || normalized === "burst" || normalized === "spray") return normalized;
  return PERSONAL_FIRE_MODE_KEYS.includes(fallback) ? fallback : "single";
}

function getWeaponFlags(weapon = {}) {
  return new Set([
    ...(Array.isArray(weapon?.effects?.flags) ? weapon.effects.flags : []),
    ...(Array.isArray(weapon?.traits) ? weapon.traits : []),
    ...(Array.isArray(weapon?.keywords) ? weapon.keywords : []),
  ].map(normalizeFlag).filter(Boolean));
}

export function getPersonalFireModeCapabilities(weapon = {}) {
  const flags = getWeaponFlags(weapon);
  return {
    automatic: flags.has("automatic"),
    spread: flags.has("spread"),
  };
}

export function personalWeaponUsesPayloads(weapon = {}) {
  return String(weapon?.category ?? "").trim().toLowerCase() !== "melee"
    && Array.isArray(weapon?.payloadState?.payloads)
    && weapon.payloadState.payloads.length > 0;
}

export function isPersonalWeaponLoaded(weapon = {}) {
  if (!personalWeaponUsesPayloads(weapon)) return true;
  const activePayloadId = normalizeString(weapon?.payloadState?.activePayloadId);
  return Boolean(activePayloadId) && activePayloadId !== UNLOADED_PAYLOAD_ID;
}

export function canUsePersonalFireMode(weapon = {}, modeKey = "single") {
  const key = normalizePersonalFireModeKey(modeKey);
  const mode = PERSONAL_FIRE_MODES[key] ?? PERSONAL_FIRE_MODES.single;
  const loaded = isPersonalWeaponLoaded(weapon);
  const capabilities = getPersonalFireModeCapabilities(weapon);

  if (!loaded) return { ok: false, reason: "Weapon is unloaded." };
  if (mode.key === "burst" && !capabilities.automatic) {
    return { ok: false, reason: "Burst requires Automatic." };
  }
  if (mode.key === "spray" && !capabilities.automatic && !capabilities.spread) {
    return { ok: false, reason: "Spray requires Automatic or Spread." };
  }
  return { ok: true, reason: "" };
}

export function buildPersonalFireModeState(weapon = {}, requestedMode = "single") {
  const requestedKey = normalizePersonalFireModeKey(requestedMode);
  const requested = PERSONAL_FIRE_MODES[requestedKey] ?? PERSONAL_FIRE_MODES.single;
  const requestedGate = canUsePersonalFireMode(weapon, requested.key);
  const selected = requestedGate.ok ? requested : PERSONAL_FIRE_MODES.single;
  const selectedGate = canUsePersonalFireMode(weapon, selected.key);

  return {
    selected: {
      ...selected,
      enabled: selectedGate.ok,
      reason: selectedGate.reason,
    },
    requested: {
      ...requested,
      enabled: requestedGate.ok,
      reason: requestedGate.reason,
    },
    requestedKey,
    options: PERSONAL_FIRE_MODE_KEYS.map(key => {
      const mode = PERSONAL_FIRE_MODES[key];
      const gate = canUsePersonalFireMode(weapon, key);
      return {
        ...mode,
        enabled: gate.ok,
        reason: gate.reason,
        selected: mode.key === selected.key,
      };
    }),
  };
}

export function addPersonalFireModeAttackRating(attackRatingBand = {}, mode = null) {
  const modifier = Number(mode?.attackRatingModifier ?? 0) || 0;
  return {
    close: Number(attackRatingBand?.close ?? 0) + modifier,
    near: Number(attackRatingBand?.near ?? 0) + modifier,
    far: Number(attackRatingBand?.far ?? 0) + modifier,
    extreme: Number(attackRatingBand?.extreme ?? 0) + modifier,
  };
}

export function isPersonalFireModeUnloadAfterAction(value) {
  const key = normalizePersonalFireModeKey(value);
  return Boolean(PERSONAL_FIRE_MODES[key]?.unloadAfterAction);
}
