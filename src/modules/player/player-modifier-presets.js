// src/modules/player/player-modifier-presets.js
// Purpose: Stores Player Gadget manual modifier presets and applies them only to opted-in gadget rolls.
// How it fits: Preserves the roll dialog as the final review point without creating a new modifier engine.

import { SYSTEM_NAME } from "../constants.js";
import { getPlayerGadgetStorageKey } from "./player-gadget-subjects.js";

export const SETTING_PLAYER_GADGET_PRESETS = "playerManualModifierPresets";
export const PLAYER_GADGET_ROLL_SOURCE = "playerGadget";

export const SITUATIONAL_PRESET_GROUPS = Object.freeze([
  Object.freeze({
    id: "cover",
    label: "Cover / Visibility",
    presets: Object.freeze([
      Object.freeze({ id: "cover.light", label: "Light Cover", value: -1 }),
      Object.freeze({ id: "cover.moderate", label: "Moderate Cover", value: -2 }),
      Object.freeze({ id: "cover.heavy", label: "Heavy Cover", value: -3 }),
      Object.freeze({ id: "cover.full", label: "Full Cover", value: -4 }),
      Object.freeze({ id: "visibility.obscured", label: "Obscured", value: -2 }),
    ]),
  }),
  Object.freeze({
    id: "target",
    label: "Target State",
    presets: Object.freeze([
      Object.freeze({ id: "target.surprised", label: "Target Stunned / Surprised", value: 2 }),
      Object.freeze({ id: "target.immobile", label: "Target Immobile", value: 4 }),
      Object.freeze({ id: "target.proneMelee", label: "Prone Target in Melee", value: 2 }),
      Object.freeze({ id: "target.proneRanged", label: "Prone Target at Range", value: -1 }),
      Object.freeze({ id: "target.overloaded", label: "Target Overloaded", value: 1 }),
    ]),
  }),
  Object.freeze({
    id: "attacker",
    label: "Attacker State",
    presets: Object.freeze([
      Object.freeze({ id: "attacker.encumbered", label: "Attacker Encumbered", value: -1 }),
    ]),
  }),
  Object.freeze({
    id: "attack",
    label: "Attack Behavior",
    presets: Object.freeze([
      Object.freeze({ id: "attack.areaSplash", label: "Area / Splash Attack", value: 2 }),
    ]),
  }),
]);

function clone(value) {
  return globalThis.foundry?.utils?.deepClone?.(value) ?? JSON.parse(JSON.stringify(value ?? null));
}

function randomId() {
  return globalThis.foundry?.utils?.randomID?.() ?? Math.random().toString(36).slice(2, 10);
}

function signed(value) {
  const numeric = Number(value ?? 0) || 0;
  return numeric > 0 ? `+${numeric}` : String(numeric);
}

export function normalizePlayerModifierPreset(row = {}, { fallbackSource = "playerPreset" } = {}) {
  const value = Number(row?.value ?? 0);
  const label = String(row?.label ?? "").trim();
  if (!label || !Number.isFinite(value) || value === 0) return null;
  return {
    id: String(row?.id ?? randomId()).trim() || randomId(),
    label,
    value,
    enabled: row?.enabled !== false,
    consumeOnce: row?.consumeOnce !== false,
    source: String(row?.source ?? fallbackSource).trim() || fallbackSource,
  };
}

export function buildSituationalPresetRow(preset = {}) {
  const id = String(preset?.id ?? "").trim();
  const row = normalizePlayerModifierPreset({
    id: id ? `situational:${id}` : "",
    label: preset?.label,
    value: preset?.value,
    enabled: true,
    consumeOnce: true,
    source: "systemPreset",
  }, { fallbackSource: "systemPreset" });
  return row;
}

export function getSituationalPresetGroups() {
  return SITUATIONAL_PRESET_GROUPS.map(group => ({
    ...group,
    presets: group.presets.map(preset => ({
      ...preset,
      row: buildSituationalPresetRow(preset),
      valueLabel: signed(preset.value),
    })),
  }));
}

function readStore(systemId = SYSTEM_NAME) {
  try {
    const value = game.settings?.get?.(systemId, SETTING_PLAYER_GADGET_PRESETS);
    return value && typeof value === "object" && !Array.isArray(value) ? clone(value) : {};
  } catch (_error) {
    return {};
  }
}

async function writeStore(store = {}, systemId = SYSTEM_NAME) {
  if (!game.settings?.set) return;
  await game.settings.set(systemId, SETTING_PLAYER_GADGET_PRESETS, store);
}

export function getPlayerModifierPresets(subject, { systemId = SYSTEM_NAME } = {}) {
  const key = getPlayerGadgetStorageKey(subject);
  const store = readStore(systemId);
  return (Array.isArray(store[key]) ? store[key] : [])
    .map(row => normalizePlayerModifierPreset(row))
    .filter(Boolean);
}

export async function setPlayerModifierPresets(subject, rows = [], { systemId = SYSTEM_NAME } = {}) {
  const key = getPlayerGadgetStorageKey(subject);
  const store = readStore(systemId);
  store[key] = rows.map(row => normalizePlayerModifierPreset(row)).filter(Boolean);
  await writeStore(store, systemId);
  return store[key];
}

export async function upsertPlayerModifierPreset(subject, row = {}, { systemId = SYSTEM_NAME } = {}) {
  const next = normalizePlayerModifierPreset(row);
  if (!next) return getPlayerModifierPresets(subject, { systemId });
  const rows = getPlayerModifierPresets(subject, { systemId });
  const index = rows.findIndex(existing => existing.id === next.id);
  if (index >= 0) rows[index] = next;
  else rows.push(next);
  return setPlayerModifierPresets(subject, rows, { systemId });
}

export async function removePlayerModifierPreset(subject, presetId = "", { systemId = SYSTEM_NAME } = {}) {
  const id = String(presetId ?? "").trim();
  const rows = getPlayerModifierPresets(subject, { systemId }).filter(row => row.id !== id);
  return setPlayerModifierPresets(subject, rows, { systemId });
}

export function shouldApplyPlayerModifierPresets(uiState = {}) {
  return String(uiState?.source ?? "").trim() === PLAYER_GADGET_ROLL_SOURCE
    && uiState?.applyManualModifierPresets === true;
}

export function applyPlayerModifierPresetsToPayload(payload = {}, { subject = null, rows = null, systemId = SYSTEM_NAME } = {}) {
  const presets = (Array.isArray(rows) ? rows : getPlayerModifierPresets(subject, { systemId }))
    .map(row => normalizePlayerModifierPreset(row))
    .filter(row => row?.enabled);
  if (!presets.length) return payload;

  const existing = Array.isArray(payload.manualModifiers) ? payload.manualModifiers : [];
  const existingIds = new Set(existing.map(row => String(row?.id ?? "").trim()).filter(Boolean));
  const injected = presets
    .filter(row => !existingIds.has(row.id))
    .map(row => ({
      id: row.id,
      label: row.label,
      value: row.value,
    }));

  return {
    ...payload,
    manualModifiers: [...existing, ...injected],
  };
}

export async function consumeOncePlayerModifierPresets(subject, { rows = null, systemId = SYSTEM_NAME } = {}) {
  const current = Array.isArray(rows) ? rows : getPlayerModifierPresets(subject, { systemId });
  const next = current.filter(row => !row.enabled || !row.consumeOnce);
  if (next.length === current.length) return current;
  return setPlayerModifierPresets(subject, next, { systemId });
}
