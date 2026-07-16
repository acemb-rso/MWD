// src/modules/mwd/asset-module-state.js
// Purpose: Stores per-owned-asset-module runtime counters under actor flags.
// How it fits: Preview phases can inspect charge/use-limit availability while
// apply phases commit spends through one actor-owned state document.

import { cloneValue } from "../utils/clone.js";

const FLAG_SCOPE = "mwd";
const FLAG_KEY = "assetModuleState";

function asObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function toId(value = "") {
  return String(value ?? "").trim();
}

function toNonNegativeInteger(value, fallback = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(0, Math.trunc(numeric));
}

function resolveItemKey(itemOrUuid = "") {
  if (typeof itemOrUuid === "string") return toId(itemOrUuid);
  return toId(itemOrUuid?.uuid ?? itemOrUuid?.id ?? "");
}

export function getAssetModuleRuntimeState(actor = null) {
  return cloneValue(asObject(actor?.getFlag?.(FLAG_SCOPE, FLAG_KEY)), {});
}

export async function setAssetModuleRuntimeState(actor = null, state = {}) {
  if (!actor?.setFlag) return false;
  await actor.setFlag(FLAG_SCOPE, FLAG_KEY, asObject(state));
  return true;
}

export function getAssetModuleItemState(actor = null, itemOrUuid = "") {
  const key = resolveItemKey(itemOrUuid);
  if (!key) return {};
  return asObject(getAssetModuleRuntimeState(actor)?.[key]);
}

export function normalizeAssetModuleCharges(source = {}, { max = 0 } = {}) {
  const normalizedMax = toNonNegativeInteger(source?.max ?? max, max);
  const currentFallback = normalizedMax;
  return {
    current: Math.min(normalizedMax, toNonNegativeInteger(source?.current, currentFallback)),
    max: normalizedMax,
  };
}

export function previewAssetModuleSpend(actor = null, itemOrUuid = "", { charges = 0, useScope = "", useId = "", useMax = 0 } = {}) {
  const key = resolveItemKey(itemOrUuid);
  const itemState = getAssetModuleItemState(actor, key);
  const chargeCost = toNonNegativeInteger(charges, 0);
  const chargeState = normalizeAssetModuleCharges(itemState.charges, { max: itemState.charges?.max ?? 0 });
  const useKey = toId(useId);
  const scope = toId(useScope);
  const maxUses = toNonNegativeInteger(useMax, 0);
  const used = scope && useKey ? toNonNegativeInteger(itemState.uses?.[scope]?.[useKey], 0) : 0;
  const hasCharges = chargeCost <= 0 || chargeState.current >= chargeCost;
  const hasUses = !scope || !useKey || maxUses <= 0 || used < maxUses;

  return {
    ok: Boolean(key && hasCharges && hasUses),
    itemKey: key,
    charges: chargeState,
    chargeCost,
    remainingCharges: Math.max(0, chargeState.current - chargeCost),
    useScope: scope,
    useId: useKey,
    used,
    useMax: maxUses,
    remainingUses: maxUses > 0 ? Math.max(0, maxUses - used - 1) : null,
    reason: !key
      ? "Asset module item id required."
      : !hasCharges
        ? "Insufficient asset module charges."
        : !hasUses
          ? "Asset module use limit reached."
          : "",
  };
}

export async function applyAssetModuleSpend(actor = null, itemOrUuid = "", options = {}) {
  const preview = previewAssetModuleSpend(actor, itemOrUuid, options);
  if (!preview.ok) return preview;

  const state = getAssetModuleRuntimeState(actor);
  const itemState = asObject(state[preview.itemKey]);
  const nextItemState = {
    ...itemState,
    charges: preview.chargeCost > 0
      ? {
        current: preview.remainingCharges,
        max: preview.charges.max,
      }
      : itemState.charges,
    uses: cloneValue(itemState.uses ?? {}, {}),
  };

  if (preview.useScope && preview.useId && preview.useMax > 0) {
    nextItemState.uses[preview.useScope] ??= {};
    nextItemState.uses[preview.useScope][preview.useId] = preview.used + 1;
  }

  state[preview.itemKey] = nextItemState;
  await setAssetModuleRuntimeState(actor, state);
  return {
    ...preview,
    committed: true,
  };
}

export async function resetAssetModuleUses(actor = null, { scope = "", itemOrUuid = "" } = {}) {
  const useScope = toId(scope);
  if (!useScope) return false;
  const state = getAssetModuleRuntimeState(actor);
  const itemKey = resolveItemKey(itemOrUuid);
  const keys = itemKey ? [itemKey] : Object.keys(state);
  let changed = false;

  for (const key of keys) {
    const itemState = asObject(state[key]);
    if (!itemState.uses?.[useScope]) continue;
    const nextUses = cloneValue(itemState.uses, {});
    delete nextUses[useScope];
    state[key] = { ...itemState, uses: nextUses };
    changed = true;
  }

  if (changed) await setAssetModuleRuntimeState(actor, state);
  return changed;
}
