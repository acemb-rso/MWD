// src/modules/token/heat-fx-controller.js
// Purpose: Applies machine token visuals such as BattleMech heat filters and ruined decals.
// How it fits: Isolates canvas/filter/decal lifecycle from heat rules and actor state prep.

import { SETTING_BATTLEMECH_TOKEN_HEAT_FX, SYSTEM_NAME } from "../constants.js";
import { buildBattlemechHeatVisualState } from "../mwd/heat-visual-state.js";
import { createHeatShimmerFilter } from "./filters/heat-shimmer-filter.js";

export const MACHINE_RUINED_DECAL_PATH = "systems/mwd/img/mek/units/DamageDecals/FireMulti/SmokeFireMulti.png";

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

function getSpriteClass() {
  return globalThis.PIXI?.Sprite ?? null;
}

function getTextureClass() {
  return globalThis.PIXI?.Texture ?? null;
}

function getBlendMode(name = "SCREEN") {
  return globalThis.PIXI?.BLEND_MODES?.[name] ?? String(name).toLowerCase();
}

function getTokenKey(token) {
  return String(token?.document?.uuid ?? token?.id ?? "").trim();
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function collectionEntries(collection = null) {
  if (!collection) return [];
  if (Array.isArray(collection)) return collection;
  if (collection.contents && Array.isArray(collection.contents)) return collection.contents;
  if (typeof collection.values === "function") return Array.from(collection.values());
  if (typeof collection[Symbol.iterator] === "function") return Array.from(collection);
  return [];
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

function isMachineActor(actor = null) {
  return actor?.type === "battlemech" || actor?.type === "vehicle";
}

function getEffectStatusIds(effect = null) {
  const ids = new Set();
  const add = value => {
    const id = String(value ?? "").trim();
    if (id) ids.add(id);
  };

  const statuses = effect?.statuses;
  if (statuses?.forEach) statuses.forEach(add);
  else if (Array.isArray(statuses)) statuses.forEach(add);

  add(effect?.getFlag?.(SYSTEM_NAME, "status")?.id);
  add(effect?.flags?.[SYSTEM_NAME]?.status?.id);
  add(effect?.statusId);
  return ids;
}

function actorHasStatusId(actor = null, statusId = "") {
  const id = String(statusId ?? "").trim();
  if (!actor || !id) return false;

  const statuses = actor.statuses;
  if (statuses?.has?.(id)) return true;
  if (Array.isArray(statuses) && statuses.includes(id)) return true;

  const effects = [
    ...collectionEntries(actor.effects),
    ...collectionEntries(actor.appliedEffects),
  ];
  return effects.some(effect => getEffectStatusIds(effect).has(id));
}

function tokenHasStatusId(token = null, statusId = "") {
  const id = String(statusId ?? "").trim();
  if (!token || !id) return false;

  const statuses = token.document?.statuses ?? token.statuses;
  if (statuses?.has?.(id)) return true;
  if (Array.isArray(statuses) && statuses.includes(id)) return true;

  const configured = (globalThis.CONFIG?.statusEffects ?? [])
    .find(effect => String(effect?.id ?? "").trim() === id);
  const statusKeys = new Set([
    id,
    String(configured?.img ?? "").trim(),
    String(configured?.icon ?? "").trim(),
  ].filter(Boolean));

  return collectionEntries(token.document?.effects ?? token.effects)
    .map(effect => String(effect ?? "").trim())
    .some(effect => statusKeys.has(effect));
}

export function isMachineRuined(actor = null, token = null) {
  if (!isMachineActor(actor)) return false;
  if (actorHasStatusId(actor, "destroyed")) return true;
  if (tokenHasStatusId(token, "destroyed")) return true;
  return String(actor?.system?.mwd?.status?.state ?? "").trim().toLowerCase() === "destroyed";
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

export function hasMachineRuinedVisualChange(changed = {}) {
  return hasProperty(changed, "system.mwd.status.state");
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
    Hooks.on("canvasReady", () => {
      this.refreshAll();
      this._queueRefreshAll(250);
    });
    Hooks.on("refreshToken", token => this._onRefreshToken(token));
    Hooks.on("updateToken", (tokenDocument, changed) => this._onUpdateTokenDocument(tokenDocument, changed));
    Hooks.on("updateActor", (actor, changed) => this._onUpdateActor(actor, changed));
    Hooks.on("createActiveEffect", effect => this._onActiveEffectChange(effect));
    Hooks.on("updateActiveEffect", effect => this._onActiveEffectChange(effect));
    Hooks.on("deleteActiveEffect", effect => this._onActiveEffectChange(effect));
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
    if (!actor || !isMachineActor(actor) || !canvas?.ready) return;

    for (const token of canvas.tokens?.placeables ?? []) {
      if (matchesActor(token, actor)) this.syncToken(token);
    }
  }

  refreshAll() {
    if (!canvas?.ready) return;
    for (const token of canvas.tokens?.placeables ?? []) {
      if (isMachineActor(token?.actor)) this.syncToken(token);
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
    const heatState = actor?.type === "battlemech" ? buildBattlemechHeatVisualState(actor) : null;
    const ruined = isMachineRuined(actor, token);
    if (!heatState?.active && !ruined) {
      this.clearToken(token);
      return heatState;
    }

    const record = this.ensure(token);
    if (!record) return heatState;

    this._applyHeatState(record, heatState, {
      photosensitive: Boolean(canvas?.photosensitiveMode),
    });
    this._applyRuinedState(record, { ruined });
    return heatState;
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
        ruinedDecal: null,
        ruinedFilters: null,
        ruinedBaseScale: 1,
        time: 0,
        animated: false,
        decalAnimated: false,
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
    if (!isMachineActor(token?.actor)) {
      this.clearToken(token);
      return;
    }
    this.syncToken(token);
  }

  _onUpdateActor(actor, changed) {
    if (!isMachineActor(actor)) return;
    if (!hasBattlemechHeatVisualChange(changed) && !hasMachineRuinedVisualChange(changed)) return;
    this.syncActor(actor);
  }

  _onUpdateTokenDocument(tokenDocument, changed = {}) {
    if (!hasProperty(changed, "effects") && !hasProperty(changed, "overlayEffect")) return;
    const token = canvas?.tokens?.get?.(tokenDocument?.id)
      ?? (canvas?.tokens?.placeables ?? []).find(candidate => candidate?.document === tokenDocument)
      ?? null;
    if (!token || !isMachineActor(token.actor)) return;
    this._queueTokenSync(token);
  }

  _onActiveEffectChange(effect) {
    const actor = effect?.parent ?? null;
    if (!isMachineActor(actor)) return;
    if (getEffectStatusIds(effect).has("destroyed")) this._queueActorSync(actor);
  }

  _queueRefreshAll(delayMs = 0) {
    const refresh = () => this.refreshAll();
    const delay = Math.max(0, Number(delayMs) || 0);
    if (delay && typeof setTimeout === "function") setTimeout(refresh, delay);
    else if (typeof queueMicrotask === "function") queueMicrotask(refresh);
    else Promise.resolve().then(refresh);
  }

  _queueActorSync(actor) {
    const sync = () => this.syncActor(actor);
    if (typeof queueMicrotask === "function") queueMicrotask(sync);
    else Promise.resolve().then(sync);
  }

  _queueTokenSync(token) {
    const sync = () => this.syncToken(token);
    if (typeof queueMicrotask === "function") queueMicrotask(sync);
    else Promise.resolve().then(sync);
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

  _createRuinedDecal() {
    const SpriteClass = getSpriteClass();
    if (!SpriteClass) return null;

    const TextureClass = getTextureClass();
    const texture = TextureClass?.from ? TextureClass.from(MACHINE_RUINED_DECAL_PATH) : MACHINE_RUINED_DECAL_PATH;
    const sprite = new SpriteClass(texture);
    sprite.name = "mwd-machine-ruined-decal";
    sprite.visible = false;
    sprite.alpha = 0.92;
    sprite.eventMode = "none";
    sprite.interactive = false;
    sprite.zIndex = 95;
    return sprite;
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

    this._destroyRuinedDecal(record);

    if (record.blur) canvas?.blurFilters?.delete?.(record.blur);
  }

  _applyHeatState(record, state, { photosensitive = false } = {}) {
    if (!state?.active) {
      this._disableHeatFilters(record);
      return;
    }

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
    record.animated = shouldAnimate;
    if (!shouldAnimate && !record.decalAnimated) record.time = 0;
    this._syncAnimatedKey(record);
  }

  _disableHeatFilters(record) {
    if (record.color) record.color.enabled = false;
    if (record.blur) record.blur.enabled = false;
    if (record.shimmer) record.shimmer.enabled = false;
    record.animated = false;
    if (!record.decalAnimated) record.time = 0;
    this._syncAnimatedKey(record);
  }

  _applyRuinedState(record, { ruined = false, photosensitive = Boolean(canvas?.photosensitiveMode) } = {}) {
    if (!ruined) {
      record.decalAnimated = false;
      this._destroyRuinedDecal(record);
      this._syncAnimatedKey(record);
      return;
    }

    if (!record.ruinedDecal) record.ruinedDecal = this._createRuinedDecal();
    const decal = record.ruinedDecal;
    if (!decal) return;

    const parent = this._getDecalParent(record);
    if (decal.parent !== parent) {
      decal.parent?.removeChild?.(decal);
      parent?.addChild?.(decal);
    }

    decal.visible = true;
    decal.blendMode = getBlendMode("SCREEN");
    this._fitRuinedDecal(record, decal);
    this._applyRuinedDecalFilters(record, { photosensitive });
    record.decalAnimated = !photosensitive;
    this._animateRuinedDecal(record, 0);
    this._syncAnimatedKey(record);
  }

  _getDecalParent(record) {
    return record.token ?? record.display?.parent ?? null;
  }

  _fitRuinedDecal(record, decal) {
    const bounds = this._getTokenVisualBounds(record);
    const width = bounds.width || 1;
    const height = bounds.height || width;

    if (decal.anchor?.set) decal.anchor.set(0.5, 0.5);
    if (decal.scale?.set) {
      const textureWidth = Math.max(1, Number(decal.texture?.width ?? decal.width ?? width) || 1);
      const textureHeight = Math.max(1, Number(decal.texture?.height ?? decal.height ?? height) || 1);
      const scale = Math.max(width / textureWidth, height / textureHeight) * 1.05;
      record.ruinedBaseScale = scale;
      decal.scale.set(scale, scale);
    } else {
      decal.width = width * 1.05;
      decal.height = height * 1.05;
      record.ruinedBaseScale = 1;
    }

    decal.x = bounds.x + (width / 2);
    decal.y = bounds.y + (height / 2);
  }

  _applyRuinedDecalFilters(record, { photosensitive = false } = {}) {
    const decal = record.ruinedDecal;
    if (!decal) return;

    if (!record.ruinedFilters) {
      record.ruinedFilters = {
        color: this._createColorFilter(),
        blur: this._createBlurFilter(),
        shimmer: createHeatShimmerFilter(),
      };
    }

    const { shimmer, color, blur } = record.ruinedFilters;
    if (shimmer?.setVisualState) {
      shimmer.enabled = true;
      shimmer.setVisualState({
        active: true,
        normalized: 0.85,
        glow: 0.45,
        shimmer: 0.55,
        pulseAmplitude: 0.18,
      }, { photosensitive });
      shimmer.setTime?.(record.time);
    }
    if (color) {
      if (typeof color.reset === "function") color.reset();
      color.matrix = buildWarmMatrix(0.78);
      color.alpha = 0.95;
      color.enabled = true;
    }
    if (blur) {
      blur.enabled = !photosensitive;
      if ("blur" in blur) blur.blur = 0.35;
      if ("strength" in blur) blur.strength = 0.35;
      if ("blurX" in blur) blur.blurX = 0.18;
      if ("blurY" in blur) blur.blurY = 0.38;
    }

    const filters = [shimmer, color, blur].filter(Boolean);
    decal.filters = filters.length ? filters : null;
  }

  _destroyRuinedDecal(record) {
    if (!record.ruinedDecal) return;

    record.ruinedDecal.parent?.removeChild?.(record.ruinedDecal);
    record.ruinedDecal.filters = null;
    record.ruinedDecal.destroy?.({ children: true });
    record.ruinedDecal = null;
    for (const filter of Object.values(record.ruinedFilters ?? {})) {
      canvas?.blurFilters?.delete?.(filter);
    }
    record.ruinedFilters = null;
    record.decalAnimated = false;
  }

  _animateRuinedDecal(record, seconds = 0) {
    const decal = record.ruinedDecal;
    if (!decal?.visible) return;

    const time = Number(seconds) || 0;
    const flicker = Math.sin(time * 3.4) * 0.035 + Math.sin(time * 7.1) * 0.018;
    const smokeLift = Math.sin(time * 1.7) * 0.018;
    const scale = record.ruinedBaseScale * (1 + flicker + smokeLift);
    decal.alpha = 0.78 + (Math.sin(time * 4.6) * 0.08) + (Math.sin(time * 9.3) * 0.025);
    decal.rotation = Math.sin(time * 0.8) * 0.018;
    if (decal.scale?.set) decal.scale.set(scale, scale);

    for (const filter of Object.values(record.ruinedFilters ?? {})) {
      filter?.setTime?.(time);
    }
  }

  _syncAnimatedKey(record) {
    if (!record?.key) return;
    if (record.animated || record.decalAnimated) {
      this._animatedKeys.add(record.key);
      this._ensureTicker();
    } else {
      this._animatedKeys.delete(record.key);
      this._teardownTickerIfIdle();
    }
  }

  _getTokenVisualBounds(record) {
    const token = record.token ?? {};
    const display = record.display ?? {};
    const width = Number(token.w ?? token.document?.widthPx ?? display.width ?? token.width ?? 0) || 1;
    const height = Number(token.h ?? token.document?.heightPx ?? display.height ?? token.height ?? width) || width;
    return {
      x: Number(display.x ?? 0) || 0,
      y: Number(display.y ?? 0) || 0,
      width,
      height,
    };
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
      if (record.animated) record.shimmer?.setTime?.(record.time);
      if (record.decalAnimated) this._animateRuinedDecal(record, record.time);
    }

    this._teardownTickerIfIdle();
  }
}
