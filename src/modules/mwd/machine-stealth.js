// src/modules/mwd/machine-stealth.js
// Purpose: Builds the derived machine stealth model and EW-facing stealth parts.
// Workflow: stealth mode/modules/status lifecycle -> acquire DN and tracking
// penalty parts -> EW rolls and attack modifier providers consume the result.

import { SYSTEM_NAME, TEMPLATE } from "../core/constants.js";
import { applyManagedStatusUpdate } from "../dialog/token-status-dialog.js";
import { getApplicableAssetModuleEffects } from "./asset-module-effects.js";
import { getReadyAssetModules } from "./asset-module-runtime.js";
import { measureTokenDistance } from "./token-measurement.js";
import { selectMechRangeBand } from "./personal-range-bands.js";
import { isMachineActor } from "../utils/actor-guards.js";
import { toNumber } from "../utils/coercion.js";
import { cloneValue } from "../utils/clone.js";

const STEALTH_MODES = new Set(["passive", "active", "suppressed"]);
const STEALTH_DURATIONS = new Set(["untilNextActivation", "endOfRound", "manual"]);
const FULL_BYPASS_STATUSES = Object.freeze(["tagged", "narced"]);
const STATUS_SIGNATURE_REVEALED = "signatureRevealed";
const STATUS_STEALTH_ACTIVE = "stealthActive";
const STATUS_HIGH_EMISSION = "highEmission";

function clamp(value, min = 0, max = 3) {
  return Math.min(max, Math.max(min, Number(value) || 0));
}

function nonNegativeInteger(value, fallback = 0) {
  return Math.max(0, Math.trunc(toNumber(value, fallback)));
}

function normalizeMode(value = "") {
  const mode = String(value ?? "").trim().toLowerCase();
  return STEALTH_MODES.has(mode) ? mode : "passive";
}

function normalizeDuration(value = "", fallback = "untilNextActivation") {
  const duration = String(value ?? "").trim();
  return STEALTH_DURATIONS.has(duration) ? duration : fallback;
}

function normalizeSignature(value = "") {
  const signature = String(value ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
  if (signature === "low" || signature === "medium" || signature === "high") return signature;
  if (signature === "verylow" || signature === "minimal") return "low";
  return "";
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

function getCombatRoundTurn(ctx = {}) {
  const combat = ctx?.combat ?? globalThis.game?.combat ?? null;
  return {
    round: nonNegativeInteger(ctx?.round ?? combat?.round, 0),
    turn: nonNegativeInteger(ctx?.turn ?? combat?.turn, 0),
  };
}

function getStealthLifecycleState(actor = null) {
  const flag = actor?.getFlag?.(SYSTEM_NAME, "stealth") ?? actor?.flags?.[SYSTEM_NAME]?.stealth ?? actor?.flags?.mwd?.stealth ?? {};
  return flag && typeof flag === "object" && !Array.isArray(flag) ? cloneValue(flag, {}) : {};
}

async function setStealthLifecycleState(actor = null, state = {}) {
  if (!actor) return false;
  const next = state && typeof state === "object" && !Array.isArray(state) ? state : {};
  if (typeof actor.setFlag === "function") {
    await actor.setFlag(SYSTEM_NAME, "stealth", next);
    return true;
  }
  if (typeof actor.update === "function") {
    await actor.update({ [`flags.${SYSTEM_NAME}.stealth`]: next });
    return true;
  }
  actor.flags ??= {};
  actor.flags[SYSTEM_NAME] ??= {};
  actor.flags[SYSTEM_NAME].stealth = next;
  return true;
}

function getStatusEffects(actor = null, statusId = "") {
  const id = String(statusId ?? "").trim();
  if (!id) return [];
  return Array.from(actor?.effects ?? []).filter(effect => {
    const statuses = effect?.statuses;
    if (statuses?.has?.(id)) return true;
    if (Array.isArray(statuses) && statuses.includes(id)) return true;
    return String(effect?.flags?.[SYSTEM_NAME]?.status?.id ?? effect?.flags?.mwd?.status?.id ?? "").trim() === id;
  });
}

function isOwnedStatusEffect(effect = null) {
  return Boolean(effect?.flags?.[SYSTEM_NAME]?.stealthLifecycleOwned ?? effect?.flags?.mwd?.stealthLifecycleOwned);
}

async function markStatusOwnership(actor = null, statusId = "", { reason = "", source = "" } = {}) {
  const update = {
    [`flags.${SYSTEM_NAME}.stealthLifecycleOwned`]: true,
    [`flags.${SYSTEM_NAME}.stealthReason`]: String(reason ?? "").trim(),
    [`flags.${SYSTEM_NAME}.stealthSource`]: String(source ?? "").trim(),
  };
  for (const effect of getStatusEffects(actor, statusId)) {
    if (typeof effect.update === "function") {
      await effect.update(update);
    } else if (effect.id && typeof actor?.updateEmbeddedDocuments === "function") {
      await actor.updateEmbeddedDocuments("ActiveEffect", [{ _id: effect.id, ...update }]);
    } else {
      effect.flags ??= {};
      effect.flags[SYSTEM_NAME] ??= {};
      effect.flags[SYSTEM_NAME].stealthLifecycleOwned = true;
      effect.flags[SYSTEM_NAME].stealthReason = String(reason ?? "").trim();
      effect.flags[SYSTEM_NAME].stealthSource = String(source ?? "").trim();
    }
  }
}

async function applyOwnedStatus(actor = null, statusId = "", active = true, { reason = "", source = "" } = {}) {
  // Only clear statuses this module owns. Player- or GM-applied copies of the
  // same status should survive stealth lifecycle cleanup.
  if (!actor || !statusId) return false;
  const state = getStealthLifecycleState(actor);
  state.ownedStatuses ??= {};

  if (active) {
    await applyManagedStatusUpdate({
      actor,
      statusId,
      active: true,
      metadata: {
        scope: "stealthLifecycle",
        notes: String(reason ?? "").trim(),
      },
    });
    state.ownedStatuses[statusId] = {
      active: true,
      reason: String(reason ?? "").trim(),
      source: String(source ?? "system").trim() || "system",
    };
    await setStealthLifecycleState(actor, state);
    await markStatusOwnership(actor, statusId, { reason, source });
    return true;
  }

  const ownedByFlag = Boolean(state.ownedStatuses?.[statusId]?.active);
  const ownedByEffect = getStatusEffects(actor, statusId).some(isOwnedStatusEffect);
  if (!ownedByFlag && !ownedByEffect) return false;

  await applyManagedStatusUpdate({ actor, statusId, active: false });
  if (state.ownedStatuses) delete state.ownedStatuses[statusId];
  await setStealthLifecycleState(actor, state);
  return true;
}

function buildLifecycleEntry({ active = true, reason = "", penalty = 1, rating = 1, source = "system", duration = "untilNextActivation", ctx = {} } = {}) {
  // Lifecycle entries remember the combat position where they were created so
  // round/activation cleanup can expire transient reveals deterministically.
  const { round, turn } = getCombatRoundTurn(ctx);
  return {
    active: Boolean(active),
    reason: String(reason ?? "").trim(),
    penalty: nonNegativeInteger(penalty, 1),
    rating: nonNegativeInteger(rating, 1),
    source: String(source ?? "system").trim() || "system",
    round,
    turn,
    duration: normalizeDuration(duration),
  };
}

function toItemArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.contents)) return value.contents;
  if (value instanceof Map) return Array.from(value.values());
  if (value && typeof value[Symbol.iterator] === "function") return Array.from(value);
  return [];
}

function collectAssetModuleKeys(actor = null) {
  // Stealth overrides can reference modules by id, name, category, or authored
  // keyword. Normalize all of those aliases into one lookup set.
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
  // Stealth profiles contribute only when the owning module is ready and, for
  // active-only profiles, when the machine is actually in active stealth mode.
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

function collectTraitItems(actor = null) {
  return Array.from(actor?.items ?? [])
    .filter(item => ["quality", "trait"].includes(String(item?.canonicalType ?? item?.type ?? "").trim()));
}

function getMachineSignature(actor = null) {
  const base = actor?.system?.mwd?.stealth ?? {};
  return normalizeSignature(base.signature ?? actor?.system?.mwd?.signature ?? actor?.system?.signature);
}

function collectSignatureStealthContributions(actor = null) {
  const parts = [];
  const actorSignature = getMachineSignature(actor);
  if (actorSignature === "low") {
    parts.push({
      id: "stealth.signature.low",
      label: "Low Signature",
      value: 1,
      tags: ["stealth", "signature"],
      sourceId: "system.mwd.stealth.signature",
      sourceName: "Signature",
    });
  }

  for (const item of collectTraitItems(actor)) {
    const signature = normalizeSignature(item?.system?.targeting?.signature ?? item?.system?.signature ?? item?.system?.mwd?.signature);
    if (signature !== "low") continue;
    parts.push({
      id: `stealth.signature.${item?.id ?? normalizeKey(item?.name)}`,
      label: item?.name ?? "Low Signature",
      value: 1,
      tags: ["stealth", "signature", "trait"],
      sourceId: item?.id ?? "",
      sourceName: item?.name ?? "",
    });
  }

  return {
    rating: parts.reduce((sum, part) => sum + toNumber(part.value, 0), 0),
    parts,
  };
}

function addEmissionSource(bySource, part = {}) {
  const sourceId = String(part.sourceId ?? part.id ?? part.label ?? "").trim();
  const sourceName = String(part.sourceName ?? part.label ?? "").trim();
  const key = normalizeKey(sourceId || sourceName || part.id);
  if (!key) return;
  const value = nonNegativeInteger(part.value, 1);
  if (value <= 0) return;
  const existing = bySource.get(key);
  if (!existing || value > toNumber(existing.value, 0)) {
    bySource.set(key, {
      id: part.id,
      label: part.label,
      value,
      tags: Array.from(new Set(["stealth", "emission", ...(part.tags ?? [])])),
      sourceId,
      sourceName,
      kind: part.kind ?? "authored",
    });
  }
}

function collectAuthoredEmissionParts(actor = null, ctx = {}) {
  const bySource = new Map();
  const actorSignature = getMachineSignature(actor);
  if (actorSignature === "high") {
    addEmissionSource(bySource, {
      id: "emission.signature.high",
      label: "High Signature",
      value: 1,
      sourceId: "system.mwd.stealth.signature",
      sourceName: "Signature",
      tags: ["signature"],
    });
  }

  for (const item of collectTraitItems(actor)) {
    const signature = normalizeSignature(item?.system?.targeting?.signature ?? item?.system?.signature ?? item?.system?.mwd?.signature);
    if (signature === "high") {
      addEmissionSource(bySource, {
        id: `emission.signature.${item?.id ?? normalizeKey(item?.name)}`,
        label: item?.name ?? "High Signature",
        value: 1,
        sourceId: item?.id ?? "",
        sourceName: item?.name ?? "",
        tags: ["signature", "trait"],
      });
    }

    for (const rule of Array.isArray(item?.system?.rules) ? item.system.rules : []) {
      for (const output of Array.isArray(rule?.outputs) ? rule.outputs : []) {
        if (String(output?.type ?? "").trim() !== "derivedStatus") continue;
        if (String(output?.key ?? output?.status ?? "").trim() !== STATUS_HIGH_EMISSION) continue;
        addEmissionSource(bySource, {
          id: output.id ?? `${rule.id ?? item.id}.highEmission`,
          label: output.label ?? rule.label ?? item.name ?? "High Emission",
          value: output.value === true || output.value === undefined ? 1 : output.value,
          sourceId: item?.id ?? "",
          sourceName: item?.name ?? "",
          tags: ["trait"],
        });
      }
    }
  }

  const moduleEffects = getApplicableAssetModuleEffects(actor, {
    ...ctx,
    payload: {
      ...(ctx?.payload ?? {}),
      intent: ctx?.intent ?? ctx?.payload?.intent ?? "attack",
    },
    resolved: {
      ...(ctx?.resolved ?? {}),
      intent: ctx?.intent ?? ctx?.resolved?.intent ?? "attack",
    },
  }).effects;

  for (const effect of moduleEffects) {
    let contributed = false;
    for (const output of effect.ruleOutputs ?? []) {
      if (String(output?.type ?? "").trim() !== "derivedStatus") continue;
      if (String(output?.key ?? output?.status ?? "").trim() !== STATUS_HIGH_EMISSION) continue;
      addEmissionSource(bySource, {
        id: output.id ?? `${effect.id}.highEmission`,
        label: output.label ?? effect.label ?? "High Emission",
        value: output.value === true || output.value === undefined ? 1 : output.value,
        sourceId: effect.sourceId,
        sourceName: effect.sourceName,
        tags: ["module"],
      });
      contributed = true;
    }

    const grantsHighEmission = (effect.grants?.statuses ?? []).includes(STATUS_HIGH_EMISSION);
    const tagsHighEmission = normalizeList(effect.tags ?? effect.system?.tags).some(tag => normalizeKey(tag) === normalizeKey(STATUS_HIGH_EMISSION));
    if (!contributed && (grantsHighEmission || tagsHighEmission)) {
      addEmissionSource(bySource, {
        id: `${effect.id ?? effect.sourceId}.highEmission`,
        label: effect.label ?? effect.sourceName ?? "High Emission",
        value: 1,
        sourceId: effect.sourceId,
        sourceName: effect.sourceName,
        tags: ["module", "legacy"],
      });
    }
  }

  return Array.from(bySource.values());
}

function getTransientEmissionPart(actor = null) {
  const state = getStealthLifecycleState(actor);
  const entry = state.transientEmission ?? {};
  if (!entry?.active) return null;
  const value = nonNegativeInteger(entry.rating, 1);
  if (value <= 0) return null;
  return {
    id: "emission.transient",
    label: "Transient High Emission",
    value,
    tags: ["stealth", "emission", "transient"],
    sourceId: "flags.mwd.stealth.transientEmission",
    sourceName: entry.reason || "Transient High Emission",
    kind: "transient",
  };
}

function getStatusEmissionPart(actor = null, authoredParts = [], transientPart = null) {
  if (!(actor?.statuses?.has?.(STATUS_HIGH_EMISSION) ?? false)) return null;
  if (transientPart) return null;
  const hasAuthored = authoredParts.some(part => part.value > 0);
  if (hasAuthored) return null;
  const owned = Boolean(getStealthLifecycleState(actor).ownedStatuses?.[STATUS_HIGH_EMISSION]?.active)
    || getStatusEffects(actor, STATUS_HIGH_EMISSION).some(isOwnedStatusEffect);
  if (owned) return null;
  return {
    id: "emission.status.highEmission",
    label: "High Emission Status",
    value: 1,
    tags: ["stealth", "emission", "status", "fallback"],
    sourceId: "status.highEmission",
    sourceName: "High Emission",
    kind: "status",
  };
}

function getRevealState(actor = null) {
  const lifecycle = getStealthLifecycleState(actor);
  const revealed = lifecycle.revealed ?? {};
  if (revealed?.active) {
    return {
      active: true,
      reason: String(revealed.reason ?? "").trim(),
      penalty: nonNegativeInteger(revealed.penalty, 1),
      source: String(revealed.source ?? "").trim(),
      duration: normalizeDuration(revealed.duration),
      round: nonNegativeInteger(revealed.round, 0),
      turn: nonNegativeInteger(revealed.turn, 0),
    };
  }

  const base = actor?.system?.mwd?.stealth ?? {};
  const legacyFlag = actor?.getFlag?.(SYSTEM_NAME, "stealthReveal") ?? actor?.flags?.[SYSTEM_NAME]?.stealthReveal ?? actor?.flags?.mwd?.stealthReveal ?? null;
  const manual = Boolean(base.revealed || base.revealedUntil || legacyFlag?.active);
  return {
    active: manual,
    reason: manual ? "manual" : "",
    penalty: manual ? nonNegativeInteger(legacyFlag?.penalty, 1) : 0,
    source: "manual",
    duration: "manual",
    round: 0,
    turn: 0,
  };
}

function getRevealPart(reveal = {}) {
  if (!reveal.active || !reveal.penalty) return null;
  return {
    id: "stealth.lifecycle.revealed",
    label: "Signature Revealed",
    value: -reveal.penalty,
    tags: ["stealth", "lifecycle", "reveal"],
  };
}

export function getMachineSignatureEmissionModel(actor = null, ctx = {}) {
  if (!isMachineActor(actor)) {
    return {
      authoredEmissionRating: 0,
      transientEmissionRating: 0,
      statusEmissionRating: 0,
      effectiveEmissionRating: 0,
      parts: [],
    };
  }

  const authoredParts = collectAuthoredEmissionParts(actor, ctx);
  const transientPart = getTransientEmissionPart(actor);
  const statusPart = getStatusEmissionPart(actor, authoredParts, transientPart);
  const transientParts = transientPart ? [transientPart] : [];
  const statusParts = statusPart ? [statusPart] : [];
  const authoredEmissionRating = authoredParts.reduce((sum, part) => sum + toNumber(part.value, 0), 0);
  const transientEmissionRating = transientParts.reduce((sum, part) => sum + toNumber(part.value, 0), 0);
  const statusEmissionRating = statusParts.reduce((sum, part) => sum + toNumber(part.value, 0), 0);

  return {
    authoredEmissionRating,
    transientEmissionRating,
    statusEmissionRating,
    effectiveEmissionRating: authoredEmissionRating + transientEmissionRating + statusEmissionRating,
    parts: [...authoredParts, ...transientParts, ...statusParts],
  };
}

export function buildMachineStealthModel(actor = null, ctx = {}) {
  if (!isMachineActor(actor)) {
    return {
      enabled: false,
      baseRating: 0,
      contributionRating: 0,
      rawRating: 0,
      counterableRating: 0,
      effectiveRating: 0,
      mode: "passive",
      revealed: false,
      revealPenalty: 0,
      emissionPenalty: 0,
      emission: {
        authoredEmissionRating: 0,
        transientEmissionRating: 0,
        statusEmissionRating: 0,
        effectiveEmissionRating: 0,
        parts: [],
      },
      detectionCap: null,
      counteredBy: [],
      parts: [],
    };
  }

  const base = getProperty(actor, "system.mwd.stealth") ?? {};
  const mode = normalizeMode(base.mode);
  const baseRating = Math.max(0, toNumber(base.enabled ? base.rating : 0, 0));
  const itemContributions = collectStealthContributions(actor, { mode, ctx });
  const signatureContributions = collectSignatureStealthContributions(actor);
  const rawRating = baseRating + itemContributions.rating + signatureContributions.rating;
  const clampedRawRating = clamp(rawRating, 0, 3);
  const reveal = getRevealState(actor);
  const revealPart = getRevealPart(reveal);
  const emission = getMachineSignatureEmissionModel(actor, ctx);
  const revealPenalty = reveal.active ? nonNegativeInteger(reveal.penalty, 1) : 0;
  const emissionPenalty = nonNegativeInteger(emission.effectiveEmissionRating, 0);
  const postModeRating = mode === "suppressed" ? 0 : clampedRawRating;
  const counterableRating = clamp(postModeRating - revealPenalty, 0, 3);
  const effectiveRating = clamp(counterableRating - emissionPenalty, 0, 3);
  const parts = [
    ...(baseRating ? [{
      id: "stealth.base",
      label: "Base Stealth Rating",
      value: baseRating,
      tags: ["stealth", "base"],
    }] : []),
    ...itemContributions.parts,
    ...signatureContributions.parts,
    ...(revealPart ? [revealPart] : []),
    ...emission.parts.map(part => ({
      id: `stealth.penalty.${part.id}`,
      label: part.label,
      value: -toNumber(part.value, 0),
      tags: Array.from(new Set(["stealth", "emission", "penalty", ...(part.tags ?? [])])),
      sourceId: part.sourceId,
      sourceName: part.sourceName,
    })),
  ];

  return {
    enabled: clampedRawRating > 0,
    baseRating,
    contributionRating: itemContributions.rating + signatureContributions.rating,
    rawRating,
    clampedRawRating,
    counterableRating,
    effectiveRating,
    mode,
    revealed: reveal.active,
    revealPenalty,
    reveal,
    emissionPenalty,
    emission,
    detectionCap: base.detectionCap || null,
    counteredBy: normalizeList(base.counteredBy),
    parts,
  };
}

export async function revealMachineSignature(actor = null, ctx = {}) {
  if (!isMachineActor(actor)) return false;
  const state = getStealthLifecycleState(actor);
  state.revealed = {
    ...buildLifecycleEntry({
      ...ctx,
      reason: ctx?.reason ?? "weaponAttack",
      penalty: ctx?.penalty ?? 1,
      source: ctx?.source ?? "system",
      duration: ctx?.duration ?? "untilNextActivation",
      ctx,
    }),
  };
  delete state.revealed.rating;
  await setStealthLifecycleState(actor, state);
  await applyOwnedStatus(actor, STATUS_SIGNATURE_REVEALED, true, {
    reason: state.revealed.reason,
    source: state.revealed.source,
  });
  return true;
}

export async function clearMachineSignatureReveal(actor = null, ctx = {}) {
  if (!isMachineActor(actor)) return false;
  const state = getStealthLifecycleState(actor);
  if (state.revealed?.active) {
    state.revealed = { ...state.revealed, active: false };
    await setStealthLifecycleState(actor, state);
  }
  await applyOwnedStatus(actor, STATUS_SIGNATURE_REVEALED, false, {
    reason: ctx?.reason ?? "clearReveal",
    source: ctx?.source ?? "system",
  });
  return true;
}

export async function setMachineTransientEmission(actor = null, ctx = {}) {
  if (!isMachineActor(actor)) return false;
  const rating = nonNegativeInteger(ctx?.rating, 1);
  if (rating <= 0) return false;
  const state = getStealthLifecycleState(actor);
  state.transientEmission = {
    ...buildLifecycleEntry({
      ...ctx,
      reason: ctx?.reason ?? "highEmission",
      rating,
      source: ctx?.source ?? "system",
      duration: ctx?.duration ?? "untilNextActivation",
      ctx,
    }),
  };
  delete state.transientEmission.penalty;
  await setStealthLifecycleState(actor, state);
  await applyOwnedStatus(actor, STATUS_HIGH_EMISSION, true, {
    reason: state.transientEmission.reason,
    source: state.transientEmission.source,
  });
  return true;
}

export async function clearMachineTransientEmission(actor = null, ctx = {}) {
  if (!isMachineActor(actor)) return false;
  const state = getStealthLifecycleState(actor);
  if (state.transientEmission?.active) {
    state.transientEmission = { ...state.transientEmission, active: false };
    await setStealthLifecycleState(actor, state);
  }
  await applyOwnedStatus(actor, STATUS_HIGH_EMISSION, false, {
    reason: ctx?.reason ?? "clearEmission",
    source: ctx?.source ?? "system",
  });
  return true;
}

export async function setMachineStealthMode(actor = null, mode = "passive", ctx = {}) {
  if (!isMachineActor(actor)) return false;
  const normalized = normalizeMode(mode);
  if (typeof actor.update === "function") {
    await actor.update({ "system.mwd.stealth.mode": normalized });
  } else {
    actor.system ??= {};
    actor.system.mwd ??= {};
    actor.system.mwd.stealth ??= {};
    actor.system.mwd.stealth.mode = normalized;
  }
  await applyOwnedStatus(actor, STATUS_STEALTH_ACTIVE, normalized === "active", {
    reason: ctx?.reason ?? "stealthMode",
    source: ctx?.source ?? "system",
  });
  return true;
}

function lifecycleEntryExpires(entry = {}, { timing = "", currentRound = 0 } = {}) {
  if (!entry?.active) return false;
  const duration = normalizeDuration(entry.duration, "manual");
  if (duration === "manual") return false;
  if (duration === "untilNextActivation") return timing === "startActivation";
  if (duration === "endOfRound") return timing === "endRound" && currentRound > nonNegativeInteger(entry.round, 0);
  return false;
}

export async function expireMachineStealthLifecycle(actor = null, { timing = "", round = null, turn = null, combat = null } = {}) {
  if (!isMachineActor(actor)) return false;
  const current = getCombatRoundTurn({ round, turn, combat });
  const state = getStealthLifecycleState(actor);
  let changed = false;

  if (lifecycleEntryExpires(state.revealed, { timing, currentRound: current.round })) {
    state.revealed = { ...state.revealed, active: false };
    changed = true;
  }
  if (lifecycleEntryExpires(state.transientEmission, { timing, currentRound: current.round })) {
    state.transientEmission = { ...state.transientEmission, active: false };
    changed = true;
  }

  if (changed) await setStealthLifecycleState(actor, state);
  if (!state.revealed?.active) await applyOwnedStatus(actor, STATUS_SIGNATURE_REVEALED, false, { reason: "expired", source: "system" });
  if (!state.transientEmission?.active) await applyOwnedStatus(actor, STATUS_HIGH_EMISSION, false, { reason: "expired", source: "system" });
  return changed;
}

export async function goDarkMachineSignature(actor = null, ctx = {}) {
  if (!isMachineActor(actor)) return { ok: false, reason: "Go Dark is a machine action." };
  const currentMode = normalizeMode(actor?.system?.mwd?.stealth?.mode);
  await clearMachineSignatureReveal(actor, { ...ctx, reason: ctx?.reason ?? "goDark" });
  await clearMachineTransientEmission(actor, { ...ctx, reason: ctx?.reason ?? "goDark" });
  if (currentMode !== "suppressed") {
    await setMachineStealthMode(actor, "passive", { ...ctx, reason: ctx?.reason ?? "goDark" });
  }
  const stealth = buildMachineStealthModel(actor, ctx);
  return {
    ok: true,
    actionId: "goDark",
    mode: stealth.mode,
    effectiveRating: stealth.effectiveRating,
    suppressed: stealth.mode === "suppressed",
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
  const emission = getMachineSignatureEmissionModel(target, ctx);
  if (emission.effectiveEmissionRating > 0) {
    parts.push({
      id: "stealth.counter.highEmission",
      label: "Target High Emission",
      value: -emission.effectiveEmissionRating,
      tags: ["stealth", "counter", "emission"],
      emission,
    });
  }

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

  const counterableRating = nonNegativeInteger(stealth.counterableRating ?? stealth.effectiveRating, 0);
  if (counterableRating <= 0) return [];

  const reducedPenalty = Math.max(0, counterableRating - counter.value);
  const reductionToApply = counterableRating - reducedPenalty;
  const parts = [{
    id: "target.stealth",
    label: "Target Signature Suppression",
    value: counterableRating,
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

  const counterableRating = nonNegativeInteger(stealth.counterableRating ?? stealth.effectiveRating, 0);
  const value = Math.max(0, counterableRating - counter.value);
  if (value <= 0) return null;

  return {
    id: "tracking.stealth",
    label: "Target Stealth Signature",
    value: -value,
    source: "Stealth",
    tags: ["tracking", "stealth", "sensors"],
  };
}

export function getHighEmissionAcquireDicePart(attacker = null, target = null, ctx = {}) {
  if (!isMachineActor(attacker) || !isMachineActor(target)) return null;
  const emission = getMachineSignatureEmissionModel(target, ctx);
  const value = nonNegativeInteger(emission.effectiveEmissionRating, 0);
  if (value <= 0) return null;
  return {
    id: "acquire.highEmission",
    label: "Target High Emission",
    value,
    source: "Signature",
    tags: ["acquire", "stealth", "emission", "sensors"],
    emission,
  };
}
