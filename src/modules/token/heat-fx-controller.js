// src/modules/token/heat-fx-controller.js
// Purpose: Applies BattleMech heat visuals to token meshes using PIXI filters.
// How it fits: Isolates canvas/filter lifecycle from heat rules and actor state prep.

import { SETTING_BATTLEMECH_TOKEN_HEAT_FX, SYSTEM_NAME } from "../constants.js";
import { buildBattlemechHeatVisualState } from "../mwd/heat-visual-state.js";
import { createHeatShimmerFilter } from "./filters/heat-shimmer-filter.js";

function hasProperty(root, path) {
  if (globalThis.foundry?.utils?.hasProperty) return foundry.utils.hasProperty(root, path);
  return String(path ?? "")
    .split(".")
    .filter(Boolean)
    .reduce((value, key) => value?.[key], root) !== undefined;
}

function getColorMatrixFilterClass() {
  return globalThis.PIXI?.ColorMatrixFilter ?? globalThis.PIXI?.filters?.ColorMatrixFilter ?? null;
}

function getBlurFilterClass() {
  return globalThis.PIXI?.BlurFilter ?? globalThis.PIXI?.filters?.BlurFilter ?? null;
}

function getTokenKey(token) {
  return String(token?.document?.uuid ?? token?.id ?? "").trim();
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function clampMin(value, min = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.max(min, numeric) : min;
}

function matchesActor(token, actor) {
  if (!token || !actor) return false;
  if (token.actor?.id === actor.id) return true;
  return String(token?.document?.baseActor?.id ?? "").trim() === String(actor.id ?? "").trim();
}

function filterNotOwned(current = [], owned = []) {
  return asArray(current).filter(entry => entry && !owned.includes(entry));
}

function buildWarmMatrix(warmth = 0) {
  const amount = clampMin(warmth, 0);
  return [
    1 + (amount * 0.34), amount * 0.05, 0, 0, 0,
    amount * 0.01, 1 + (amount * 0.07), 0, 0, 0,
    0, amount * 0.03, Math.max(0.62, 1 - (amount * 0.24)), 0, 0,
    0, 0, 0, 1, 0,
  ];
}

function defaultTickerAdd(ticker, fn) {
  ticker?.add?.(fn);
}

function defaultTickerRemove(ticker, fn) {
  ticker?.remove?.(fn);
}

export function hasBattlemechHeatVisualChange(changed = {}) {
  return hasProperty(changed, "system.monitors.heat.value")
    || hasProperty(changed, "system.mwd.heat.current")
    || hasProperty(changed, "system.mwd.heat.thresholds")
    || hasProperty(changed, "system.mwd.heat.thresholds.runningHot")
    || hasProperty(changed, "system.mwd.heat.thresholds.overheated")
    || hasProperty(changed, "system.mwd.heat.thresholds.shutdown");
}

export class HeatFxController {
  constructor({
    settingKey = SETTING_BATTLEMECH_TOKEN_HEAT_FX,
    tickerAdd = defaultTickerAdd,
    tickerRemove = defaultTickerRemove,
  } = {}) {
    this.settingKey = settingKey;
    this._records = new Map();
    this._animatedKeys = new Set();
    this._tickerAdd = tickerAdd;
    this._tickerRemove = tickerRemove;
    this._tickerFn = null;
  }

  init() {
    Hooks.on("canvasReady", () => this.refreshAll());
    Hooks.on("refreshToken", token => this._onRefreshToken(token));
    Hooks.on("updateActor", (actor, changed) => this._onUpdateActor(actor, changed));
    Hooks.on("canvasTearDown", () => this.onCanvasTearDown());
    Hooks.on("updateSetting", setting => this._onUpdateSetting(setting));
  }

  isEnabled() {
    try {
      return game.settings.get(SYSTEM_NAME, this.settingKey) !== false;
    } catch (_error) {
      return true;
    }
  }

  syncActor(actor) {
    if (!actor || actor.type !== "battlemech" || !canvas?.ready) return;

    for (const token of canvas.tokens?.placeables ?? []) {
      if (matchesActor(token, actor)) this.syncToken(token);
    }
  }

  refreshAll() {
    if (!canvas?.ready) return;
    for (const token of canvas.tokens?.placeables ?? []) {
      if (token?.actor?.type === "battlemech") this.syncToken(token);
      else this.clearToken(token);
    }
  }

  syncToken(token) {
    if (!token) return null;
    if (!this.isEnabled()) {
      this.clearToken(token);
      return null;
    }

    const actor = token.actor ?? null;
    const state = buildBattlemechHeatVisualState(actor);
    if (!state?.active) {
      this.clearToken(token);
      return state;
    }

    const record = this.ensure(token);
    if (!record) return state;

    this._applyState(record, state, {
      photosensitive: Boolean(canvas?.photosensitiveMode),
    });
    return state;
  }

  ensure(token) {
    const display = this._getDisplayObject(token);
    if (!display) return null;

    const key = getTokenKey(token);
    if (!key) return null;

    let record = this._records.get(key) ?? null;
    if (record && record.display !== display) {
      this._detachRecord(record);
      this._records.delete(key);
      this._animatedKeys.delete(key);
      record = null;
    }

    if (!record) {
      const color = this._createColorFilter();
      const blur = this._createBlurFilter();
      const shimmer = createHeatShimmerFilter();
      record = {
        key,
        token,
        display,
        color,
        blur,
        shimmer,
        time: 0,
        animated: false,
      };
      this._records.set(key, record);
    } else {
      record.token = token;
      record.display = display;
    }

    this._attachRecord(record);
    return record;
  }

  clearToken(token) {
    const key = getTokenKey(token);
    if (!key) return;

    const record = this._records.get(key) ?? null;
    if (!record) return;

    this._detachRecord(record);
    this._records.delete(key);
    this._animatedKeys.delete(key);
    this._teardownTickerIfIdle();
  }

  onCanvasTearDown() {
    for (const key of Array.from(this._records.keys())) {
      const record = this._records.get(key);
      if (record) this._detachRecord(record);
    }
    this._records.clear();
    this._animatedKeys.clear();
    this._teardownTicker(true);
  }

  _onRefreshToken(token) {
    if (token?.actor?.type !== "battlemech") {
      this.clearToken(token);
      return;
    }
    this.syncToken(token);
  }

  _onUpdateActor(actor, changed) {
    if (actor?.type !== "battlemech") return;
    if (!hasBattlemechHeatVisualChange(changed)) return;
    this.syncActor(actor);
  }

  _onUpdateSetting(setting) {
    if (String(setting?.key ?? "") !== `${SYSTEM_NAME}.${this.settingKey}`) return;

    if (!this.isEnabled()) {
      this.onCanvasTearDown();
      return;
    }

    this.refreshAll();
  }

  _getDisplayObject(token) {
    return token?.mesh ?? null;
  }

  _createColorFilter() {
    const FilterClass = getColorMatrixFilterClass();
    return FilterClass ? new FilterClass() : null;
  }

  _createBlurFilter() {
    if (typeof canvas?.createBlurFilter === "function") {
      return canvas.createBlurFilter(0.0001, 2);
    }

    const FilterClass = getBlurFilterClass();
    return FilterClass ? new FilterClass() : null;
  }

  _ownedFilters(record) {
    return [record.shimmer, record.color, record.blur].filter(Boolean);
  }

  _attachRecord(record) {
    const current = asArray(record.display?.filters);
    const owned = this._ownedFilters(record);
    const next = filterNotOwned(current, owned).concat(owned);
    record.display.filters = next.length ? next : null;
  }

  _detachRecord(record) {
    const display = record.display;
    if (display) {
      const next = filterNotOwned(display.filters, this._ownedFilters(record));
      display.filters = next.length ? next : null;
    }

    if (record.blur) canvas?.blurFilters?.delete?.(record.blur);
  }

  _applyState(record, state, { photosensitive = false } = {}) {
    if (record.color) {
      if (typeof record.color.reset === "function") record.color.reset();
      record.color.matrix = buildWarmMatrix(state.warmth);
      record.color.alpha = 1;
      record.color.enabled = true;
    }

    if (record.blur) {
      const blurAmount = clampMin(state.blur, 0);
      record.blur.enabled = blurAmount > 0.001;
      if ("blur" in record.blur) record.blur.blur = blurAmount;
      if ("strength" in record.blur) record.blur.strength = blurAmount;
      if ("blurX" in record.blur) record.blur.blurX = blurAmount;
      if ("blurY" in record.blur) record.blur.blurY = blurAmount;
    }

    if (record.shimmer) {
      record.shimmer.enabled = true;
      record.shimmer.setVisualState(state, { photosensitive });
      if (!photosensitive) record.shimmer.setTime(record.time);
      else record.shimmer.setTime(0);
    }

    const shouldAnimate = Boolean(state.animated) && !photosensitive;
    if (shouldAnimate) {
      this._animatedKeys.add(record.key);
      record.animated = true;
      this._ensureTicker();
    } else {
      record.animated = false;
      record.time = 0;
      this._animatedKeys.delete(record.key);
      this._teardownTickerIfIdle();
    }
  }

  _ensureTicker() {
    if (this._tickerFn || !canvas?.app?.ticker) return;

    this._tickerFn = ticker => this._onTick(ticker);
    this._tickerAdd(canvas.app.ticker, this._tickerFn);
  }

  _teardownTicker(force = false) {
    if (!this._tickerFn || !canvas?.app?.ticker) return;
    if (!force && this._animatedKeys.size > 0) return;

    this._tickerRemove(canvas.app.ticker, this._tickerFn);
    this._tickerFn = null;
  }

  _teardownTickerIfIdle() {
    this._teardownTicker(false);
  }

  _onTick(ticker) {
    if (canvas?.photosensitiveMode) return;

    const deltaSeconds = clampMin((ticker?.deltaMS ?? 16.6667) / 1000, 0);
    for (const key of Array.from(this._animatedKeys)) {
      const record = this._records.get(key);
      if (!record?.display || record.display.destroyed) {
        this._animatedKeys.delete(key);
        this._records.delete(key);
        continue;
      }

      record.time += deltaSeconds;
      record.shimmer?.setTime?.(record.time);
    }

    this._teardownTickerIfIdle();
  }
}
