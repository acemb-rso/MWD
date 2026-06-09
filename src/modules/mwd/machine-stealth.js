// src/modules/mwd/machine-stealth.js
// Purpose: Builds the derived machine stealth model and EW-facing stealth parts.
// How it fits: Keeps stealth as targeting friction consumed by acquire DN and
// attack tracking providers instead of creating a separate combat subsystem.

import { TEMPLATE } from "../constants.js";
import { getReadyAssetModules } from "./asset-module-runtime.js";
import { measureTokenDistance } from "./token-measurement.js";
import { selectMechRangeBand } from "./personal-range-bands.js";

const MACHINE_ACTOR_TYPES = new Set([TEMPLATE.actorTypes.battlemech, TEMPLATE.actorTypes.vehicle]);
const STEALTH_MODES = new Set(["passive", "active", "suppressed"]);
const FULL_BYPASS_STATUSES = Object.freeze(["tagged", "narced"]);

function isMachineActor(actor = null) {
  return MACHINE_ACTOR_TYPES.has(actor?.type);
}

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function clamp(value, min = 0, max = 3) {
  return Math.min(max, Math.max(min, Number(value) || 0));
}

function normalizeMode(value = "") {
  const mode = String(value ?? "").trim().toLowerCase();
  return STEALTH_MODES.has(mode) ? mode : "passive";
}

function normalizeList(value) {
  const raw = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  return raw.map(entry => String(entry ?? "").trim()).filter(Boolean);
}

function normalizeKey(value = "") {
  return String(value ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function getProperty(source = {}, path = "") {
  if (typeof globalThis.foundry?.utils?.getProperty === "function") return globalThis.foundry.utils.getProperty(source, path);
  return String(path ?? "").split(".").filter(Boolean).reduce((current, part) => {
    if (!current || typeof current !== "object") return undefined;
    return current[part];
  }, source);
}

function toItemArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.contents)) return value.contents;
  if (value instanceof Map) return Array.from(value.values());
  if (value && typeof value[Symbol.iterator] === "function") return Array.from(value);
  return [];
}

function collectAssetModuleKeys(actor = null) {
  const keys = new Set();
  const add = value => {
    const normalized = normalizeKey(value);
    if (normalized) keys.add(normalized);
  };

  for (const { item } of getReadyAssetModules(actor)) {
    add(item?.id);
    add(item?.name);
    const system = item?.system ?? {};
    add(system.category);
    normalizeList(system.tags).forEach(add);
    normalizeList(system.capabilities).forEach(add);
    normalizeList(system.keywords).forEach(add);
  }

  return keys;
}

function getStealthProfile(item = null) {
  const profile = item?.system?.targeting?.stealthProfile ?? item?.system?.stealthProfile ?? null;
  if (!profile || typeof profile !== "object" || Array.isArray(profile)) return null;
  return {
    ratingBonus: Math.max(0, toNumber(profile.ratingBonus ?? profile.rating, 0)),
    tags: normalizeList(profile.tags),
    requiresActiveMode: Boolean(profile.requiresActiveMode),
  };
}

function getApplicableStealthProfileContribution(actor = null, item = null, { mode = null } = {}) {
  const profile = getStealthProfile(item);
  if (!profile || profile.ratingBonus <= 0) return null;
  const stealthMode = normalizeMode(mode ?? actor?.system?.mwd?.stealth?.mode);
  if (profile.requiresActiveMode && stealthMode !== "active") return null;
  return {
    id: `stealth.module.${item?.id ?? normalizeKey(item?.name)}`,
    label: item?.name ?? "Stealth Module",
    value: profile.ratingBonus,
    tags: Array.from(new Set(["stealth", "module", ...profile.tags])),
    sourceId: item?.id ?? "",
    sourceName: item?.name ?? "",
  };
}

export function getApplicableStealthProfileSourceIds(actor = null, ctx = {}) {
  const sourceIds = new Set();
  if (!isMachineActor(actor)) return sourceIds;
  const mode = normalizeMode(ctx?.mode ?? actor?.system?.mwd?.stealth?.mode);
  for (const { item } of getReadyAssetModules(actor)) {
    const contribution = getApplicableStealthProfileContribution(actor, item, { mode });
    if (!contribution) continue;
    if (contribution.sourceId) sourceIds.add(contribution.sourceId);
    if (contribution.sourceName) sourceIds.add(contribution.sourceName);
  }
  return sourceIds;
}

function collectStealthContributions(actor = null, { mode = null } = {}) {
  const parts = [];
  for (const { item } of getReadyAssetModules(actor)) {
    const contribution = getApplicableStealthProfileContribution(actor, item, { mode });
    if (contribution) parts.push(contribution);
  }
  return {
    rating: parts.reduce((sum, part) => sum + toNumber(part.value, 0), 0),
    parts,
  };
}

function isManuallyRevealed(actor = null) {
  const base = actor?.system?.mwd?.stealth ?? {};
  const flag = actor?.getFlag?.("mwd", "stealthReveal") ?? actor?.flags?.mwd?.stealthReveal ?? null;
  return Boolean(base.revealed || base.revealedUntil || flag?.active);
}

export function buildMachineStealthModel(actor = null, ctx = {}) {
  if (!isMachineActor(actor)) {
    return {
      enabled: false,
      baseRating: 0,
      contributionRating: 0,
      rawRating: 0,
      effectiveRating: 0,
      mode: "passive",
      revealed: false,
      detectionCap: null,
      counteredBy: [],
      parts: [],
    };
  }

  const base = getProperty(actor, "system.mwd.stealth") ?? {};
  const mode = normalizeMode(base.mode);
  const baseRating = Math.max(0, toNumber(base.enabled ? base.rating : 0, 0));
  const itemContributions = collectStealthContributions(actor, { mode, ctx });
  const rawRating = baseRating + itemContributions.rating;
  const effectiveRating = mode === "suppressed" ? 0 : clamp(rawRating, 0, 3);
  const parts = [
    ...(baseRating ? [{
      id: "stealth.base",
      label: "Base Stealth Rating",
      value: baseRating,
      tags: ["stealth", "base"],
    }] : []),
    ...itemContributions.parts,
  ];

  return {
    enabled: effectiveRating > 0,
    baseRating,
    contributionRating: itemContributions.rating,
    rawRating,
    effectiveRating,
    mode,
    revealed: isManuallyRevealed(actor),
    detectionCap: base.detectionCap || null,
    counteredBy: normalizeList(base.counteredBy),
    parts,
  };
}

function hasAnyKey(keys, candidates = []) {
  return candidates.some(candidate => keys.has(normalizeKey(candidate)));
}

function resolveRangeBand(ctx = {}) {
  const explicit = String(ctx?.rangeBand ?? ctx?.attack?.rangeBand ?? ctx?.payload?.rangeBand ?? "").trim().toLowerCase();
  if (explicit) return explicit;

  const attackerToken = ctx?.attackerToken ?? ctx?.sourceToken ?? null;
  const targetToken = ctx?.targetToken ?? null;
  const distance = measureTokenDistance(attackerToken, targetToken);
  if (!Number.isFinite(distance)) return "";
  return selectMechRangeBand(distance, "close");
}

function hasVisualContact(ctx = {}) {
  const targetToken = ctx?.targetToken ?? null;
  return targetToken ? targetToken.visible !== false : Boolean(ctx?.visualContact);
}

export function getStealthCounterModel(attacker = null, target = null, ctx = {}) {
  const parts = [];
  const statuses = target?.statuses ?? new Set();

  const bypassStatus = FULL_BYPASS_STATUSES.find(status => statuses.has?.(status));
  if (bypassStatus) {
    return {
      value: 0,
      bypass: true,
      parts: [{
        id: `stealth.counter.${bypassStatus}`,
        label: bypassStatus === "narced" ? "NARC Beacon" : "TAG Designation",
        value: "bypass",
        tags: ["stealth", "counter", "beacon"],
      }],
    };
  }

  const keys = collectAssetModuleKeys(attacker);

  if (hasAnyKey(keys, ["activeProbe", "probe", "probeking", "advancedSensors"])) {
    parts.push({
      id: "stealth.counter.activeProbe",
      label: "Active Probe",
      value: -1,
      tags: ["stealth", "counter", "activeProbe"],
    });
  }

  if (Boolean(ctx?.c3SharedLock) || hasAnyKey(keys, ["c3", "c3network", "network", "sharedLock"])) {
    parts.push({
      id: "stealth.counter.c3",
      label: "C3 / Shared Lock",
      value: -1,
      tags: ["stealth", "counter", "c3"],
    });
  }

  if (resolveRangeBand(ctx) === "close" && hasVisualContact(ctx)) {
    parts.push({
      id: "stealth.counter.visualClose",
      label: "Close Visual Contact",
      value: -1,
      tags: ["stealth", "counter", "visual"],
    });
  }

  return {
    value: parts.reduce((sum, part) => sum + Math.abs(toNumber(part.value, 0)), 0),
    bypass: false,
    parts,
  };
}

export function getStealthDnParts(attacker = null, target = null, ctx = {}) {
  const stealth = buildMachineStealthModel(target, ctx);
  if (!stealth.enabled) return [];

  const counter = getStealthCounterModel(attacker, target, ctx);
  if (counter.bypass) {
    return counter.parts.map(part => ({
      ...part,
      value: 0,
      displayValue: "bypass",
    }));
  }

  const reducedPenalty = Math.max(0, stealth.effectiveRating - counter.value);
  const reductionToApply = stealth.effectiveRating - reducedPenalty;
  const parts = [{
    id: "target.stealth",
    label: "Target Signature Suppression",
    value: stealth.effectiveRating,
    tags: ["stealth", "sensors", "targeting"],
  }];

  let remainingReduction = reductionToApply;
  for (const part of counter.parts) {
    if (remainingReduction <= 0) break;
    const applied = Math.min(remainingReduction, Math.abs(toNumber(part.value, 0)));
    if (applied <= 0) continue;
    parts.push({
      ...part,
      value: -applied,
    });
    remainingReduction -= applied;
  }

  return parts;
}

export function getStealthTrackingPenalty(attacker = null, target = null, ctx = {}) {
  const stealth = buildMachineStealthModel(target, ctx);
  if (!stealth.enabled) return null;

  const counter = getStealthCounterModel(attacker, target, ctx);
  if (counter.bypass) return null;

  const value = Math.max(0, stealth.effectiveRating - counter.value);
  if (value <= 0) return null;

  return {
    id: "tracking.stealth",
    label: "Target Stealth Signature",
    value: -value,
    source: "Stealth",
    tags: ["tracking", "stealth", "sensors"],
  };
}
