// src/modules/canvas/machine-sensor-overlays.js
// Purpose: Local contact/track/lock visuals for MWD sensor-detected tokens.
// How it fits: DetectionMode decides eligibility; this controller owns only the
// client-side marker, reticle, and label semantics.

import {
  canDetect,
  compareDetectionState,
  getDetectionState,
  requestSensorPerceptionRefresh,
} from "./machine-sensor-detection.js";

export const MWD_SENSOR_OVERLAY_NAME = "mwd-sensor-overlay";

const OVERLAY_MODELS = Object.freeze({
  contact: Object.freeze({
    state: "contact",
    label: "HOSTILE CONTACT",
    color: 0x50f6ff,
    alpha: 0.58,
    weight: 1,
  }),
  track: Object.freeze({
    state: "track",
    label: "HOSTILE TRACK",
    color: 0x5fffb5,
    alpha: 0.78,
    weight: 2,
  }),
  lock: Object.freeze({
    state: "lock",
    label: "HOSTILE LOCK",
    color: 0xffd057,
    alpha: 0.92,
    weight: 3,
  }),
});

let overlayHooksRegistered = false;
let queuedRefresh = false;
const overlayRecords = new Map();

function collectionEntries(collection = null) {
  if (!collection) return [];
  if (Array.isArray(collection)) return collection;
  if (Array.isArray(collection.contents)) return collection.contents;
  if (typeof collection.values === "function") return Array.from(collection.values());
  if (typeof collection[Symbol.iterator] === "function") return Array.from(collection);
  return [];
}

function getTokenKey(token = null) {
  return String(token?.document?.uuid ?? token?.uuid ?? token?.id ?? token?.document?.id ?? "").trim();
}

function getObserverTokens() {
  const controlled = collectionEntries(globalThis.canvas?.tokens?.controlled)
    .filter(token => token?.actor);
  if (controlled.length) return controlled;
  return [];
}

function getTargetTokens() {
  return collectionEntries(globalThis.canvas?.tokens?.placeables)
    .filter(token => token?.actor);
}

function getPixiClasses() {
  return {
    Container: globalThis.PIXI?.Container ?? null,
    Graphics: globalThis.PIXI?.Graphics ?? null,
    Text: globalThis.PIXI?.Text ?? null,
    TextStyle: globalThis.PIXI?.TextStyle ?? null,
  };
}

function getTokenVisualBounds(token = null) {
  const width = Number(token?.w ?? token?.document?.widthPx ?? token?.width ?? 0) || 1;
  const height = Number(token?.h ?? token?.document?.heightPx ?? token?.height ?? width) || width;
  return {
    width,
    height,
    centerX: width / 2,
    centerY: height / 2,
  };
}

function setTextAnchor(text = null, x = 0.5, y = 0.5) {
  if (text?.anchor?.set) text.anchor.set(x, y);
}

function createLabel(TextClass, TextStyleClass, model, y) {
  if (!TextClass) return null;

  const style = TextStyleClass
    ? new TextStyleClass({
      align: "center",
      fill: model.color,
      fontFamily: "MWD Numeric, monospace",
      fontSize: 13,
      fontWeight: "700",
      letterSpacing: 0,
      stroke: 0x02070a,
      strokeThickness: 3,
    })
    : {
      align: "center",
      fill: model.color,
      fontSize: 13,
      fontWeight: "700",
      stroke: 0x02070a,
      strokeThickness: 3,
    };

  const text = new TextClass(model.label, style);
  text.name = `${MWD_SENSOR_OVERLAY_NAME}-label`;
  text.x = 0;
  text.y = y;
  text.alpha = model.alpha;
  setTextAnchor(text, 0.5, 0.5);
  return text;
}

function drawContact(graphics, bounds, model) {
  const radius = Math.max(4, Math.min(bounds.width, bounds.height) * 0.075);
  graphics.lineStyle(1, model.color, model.alpha);
  graphics.beginFill(model.color, 0.32);
  graphics.drawCircle(bounds.centerX, Math.max(radius + 2, bounds.height * 0.12), radius);
  graphics.endFill();
}

function drawTrack(graphics, bounds, model) {
  const pad = Math.max(4, Math.min(bounds.width, bounds.height) * 0.08);
  const len = Math.max(10, Math.min(bounds.width, bounds.height) * 0.22);
  const left = pad;
  const right = bounds.width - pad;
  const top = pad;
  const bottom = bounds.height - pad;

  graphics.lineStyle(2, model.color, model.alpha);
  graphics.moveTo(left + len, top).lineTo(left, top).lineTo(left, top + len);
  graphics.moveTo(right - len, top).lineTo(right, top).lineTo(right, top + len);
  graphics.moveTo(left, bottom - len).lineTo(left, bottom).lineTo(left + len, bottom);
  graphics.moveTo(right, bottom - len).lineTo(right, bottom).lineTo(right - len, bottom);
}

function drawLock(graphics, bounds, model) {
  const radius = Math.max(14, Math.min(bounds.width, bounds.height) * 0.34);
  graphics.lineStyle(2, model.color, model.alpha);
  graphics.drawCircle(bounds.centerX, bounds.centerY, radius);
  graphics.moveTo(bounds.centerX - radius - 8, bounds.centerY).lineTo(bounds.centerX - radius + 6, bounds.centerY);
  graphics.moveTo(bounds.centerX + radius - 6, bounds.centerY).lineTo(bounds.centerX + radius + 8, bounds.centerY);
  graphics.moveTo(bounds.centerX, bounds.centerY - radius - 8).lineTo(bounds.centerX, bounds.centerY - radius + 6);
  graphics.moveTo(bounds.centerX, bounds.centerY + radius - 6).lineTo(bounds.centerX, bounds.centerY + radius + 8);
}

function attachOverlay(token = null, model = null, drawFn = null) {
  if (!token || !model) return null;

  const key = getTokenKey(token);
  if (!key) return null;

  const { Container, Graphics, Text, TextStyle } = getPixiClasses();
  if (!Container || !Graphics) {
    token._mwdSensorOverlayModel = model;
    overlayRecords.set(key, { token, model, overlay: null });
    return model;
  }

  clearTokenOverlay(token);

  const bounds = getTokenVisualBounds(token);
  const container = new Container();
  container.name = MWD_SENSOR_OVERLAY_NAME;
  container.eventMode = "none";
  container.interactive = false;
  container.zIndex = 120;

  const graphics = new Graphics();
  graphics.name = `${MWD_SENSOR_OVERLAY_NAME}-graphics`;
  drawFn(graphics, bounds, model);
  container.addChild(graphics);

  if (model.state !== "contact") {
    const label = createLabel(Text, TextStyle, model, Math.max(12, -8));
    if (label) {
      label.x = bounds.centerX;
      container.addChild(label);
    }
  }

  token.addChild?.(container);
  if (!container.parent && Array.isArray(token.children)) token.children.push(container);
  token._mwdSensorOverlayModel = model;
  overlayRecords.set(key, { token, model, overlay: container });
  return container;
}

function clearTokenOverlay(token = null) {
  const key = getTokenKey(token);
  const record = key ? overlayRecords.get(key) : null;
  const overlays = collectionEntries(token?.children)
    .filter(child => child?.name === MWD_SENSOR_OVERLAY_NAME);

  for (const overlay of [record?.overlay, ...overlays].filter(Boolean)) {
    overlay.parent?.removeChild?.(overlay);
    if (Array.isArray(token?.children)) {
      const index = token.children.indexOf(overlay);
      if (index >= 0) token.children.splice(index, 1);
    }
    overlay.destroy?.({ children: true });
  }

  if (key) overlayRecords.delete(key);
  if (token && Object.prototype.hasOwnProperty.call(token, "_mwdSensorOverlayModel")) {
    delete token._mwdSensorOverlayModel;
  }
}

export function buildSensorOverlayModel(state = "") {
  const key = String(state ?? "").trim();
  const model = OVERLAY_MODELS[key] ?? null;
  return model ? { ...model } : null;
}

export function getSensorOverlayModel(observerTokens = [], targetToken = null) {
  let selectedState = "";

  for (const observerToken of collectionEntries(observerTokens)) {
    if (observerToken === targetToken) continue;
    if (!canDetect(observerToken, targetToken)) continue;

    const state = getDetectionState(observerToken, targetToken);
    if (!selectedState || compareDetectionState(state, selectedState) > 0) {
      selectedState = state;
    }
  }

  return buildSensorOverlayModel(selectedState);
}

export function renderContactOverlay(token, model = buildSensorOverlayModel("contact")) {
  return attachOverlay(token, model, drawContact);
}

export function renderTrackOverlay(token, model = buildSensorOverlayModel("track")) {
  return attachOverlay(token, model, drawTrack);
}

export function renderLockOverlay(token, model = buildSensorOverlayModel("lock")) {
  return attachOverlay(token, model, drawLock);
}

export function clearSensorOverlays(tokens = getTargetTokens()) {
  const explicitTokens = collectionEntries(tokens);
  if (explicitTokens.length) {
    for (const token of explicitTokens) clearTokenOverlay(token);
    return;
  }

  for (const record of Array.from(overlayRecords.values())) {
    clearTokenOverlay(record.token);
  }
}

export function refreshSensorOverlays({
  observerTokens = getObserverTokens(),
  targetTokens = getTargetTokens(),
} = {}) {
  const observers = collectionEntries(observerTokens);
  const targets = collectionEntries(targetTokens);
  const models = new Map();

  for (const target of targets) {
    const model = getSensorOverlayModel(observers, target);
    models.set(getTokenKey(target), model);

    if (!model) {
      clearTokenOverlay(target);
      continue;
    }

    if (model.state === "lock") renderLockOverlay(target, model);
    else if (model.state === "track") renderTrackOverlay(target, model);
    else renderContactOverlay(target, model);
  }

  return models;
}

function queueSensorOverlayRefresh({ requestPerception = true } = {}) {
  if (requestPerception) requestSensorPerceptionRefresh();
  if (queuedRefresh) return;

  queuedRefresh = true;
  const run = () => {
    queuedRefresh = false;
    refreshSensorOverlays();
  };

  if (typeof queueMicrotask === "function") queueMicrotask(run);
  else Promise.resolve().then(run);
}

export function registerMachineSensorOverlayHooks() {
  if (overlayHooksRegistered || !globalThis.Hooks) return false;
  overlayHooksRegistered = true;

  Hooks.on("canvasReady", () => queueSensorOverlayRefresh({ requestPerception: false }));
  Hooks.on("sightRefresh", () => refreshSensorOverlays());
  Hooks.on("refreshToken", () => queueSensorOverlayRefresh({ requestPerception: false }));
  Hooks.on("controlToken", () => queueSensorOverlayRefresh());
  Hooks.on("targetToken", () => queueSensorOverlayRefresh());
  Hooks.on("updateToken", () => queueSensorOverlayRefresh());
  Hooks.on("updateActor", () => queueSensorOverlayRefresh());
  Hooks.on("updateCombatant", () => queueSensorOverlayRefresh());
  Hooks.on("createCombatant", () => queueSensorOverlayRefresh());
  Hooks.on("deleteCombatant", () => queueSensorOverlayRefresh());
  Hooks.on("updateCombat", () => queueSensorOverlayRefresh());
  Hooks.on("deleteCombat", () => queueSensorOverlayRefresh());
  Hooks.on("canvasTearDown", () => clearSensorOverlays());

  return true;
}
