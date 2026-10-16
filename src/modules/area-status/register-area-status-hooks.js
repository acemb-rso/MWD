// Purpose: Registers debounced lifecycle hooks for the Area Status Controller.
// How it fits: Runtime documents emit changes; the controller performs reconciliation.

import { TEMPLATE } from "../core/constants.js";
import { AreaStatusOwnership, getAreaStatusMetadata } from "./area-status-ownership.js";
import {
  isAreaStatusRegion,
  isAreaStatusRegionWriteInProgress,
} from "./area-status-regions.js";

const timers = new Map();

function isAssetModule(item = null) {
  return (item?.canonicalType ?? item?.type) === TEMPLATE.itemType.assetModule;
}

function getSceneFromDocument(document = null) {
  return document?.parent?.documentName === "Scene"
    ? document.parent
    : document?.parent?.parent?.documentName === "Scene"
      ? document.parent.parent
      : globalThis.canvas?.scene ?? null;
}

export function scheduleAreaStatusReconcile(controller, scene = null, reason = "hook", delay = 75) {
  if (!controller || !scene || !globalThis.game?.user?.isGM || AreaStatusOwnership.isWriting) return;
  const key = String(scene.uuid ?? scene.id ?? "").trim();
  if (!key) return;
  clearTimeout(timers.get(key));
  timers.set(key, setTimeout(() => {
    timers.delete(key);
    void controller.reconcileScene(scene, { reason });
  }, delay));
}

export function registerAreaStatusHooks(controller) {
  Hooks.on("canvasReady", canvasInstance => {
    scheduleAreaStatusReconcile(controller, canvasInstance?.scene ?? globalThis.canvas?.scene, "canvasReady", 0);
  });
  Hooks.on("canvasTearDown", canvasInstance => {
    const scene = canvasInstance?.scene ?? globalThis.canvas?.scene;
    if (scene) controller.forgetScene(scene);
  });

  for (const hookName of ["createToken", "updateToken", "deleteToken"]) {
    Hooks.on(hookName, token => scheduleAreaStatusReconcile(controller, getSceneFromDocument(token), hookName));
  }
  Hooks.on("updateActor", actor => {
    if (AreaStatusOwnership.isWriting) return;
    void controller.reconcileActor(actor, { reason: "updateActor" });
  });
  for (const hookName of ["createItem", "updateItem", "deleteItem"]) {
    Hooks.on(hookName, item => {
      if (!isAssetModule(item)) return;
      const actor = item?.actor ?? item?.parent;
      if (actor) void controller.reconcileActor(actor, { reason: hookName });
    });
  }
  Hooks.on("updateCombat", combat => {
    const scene = combat?.scene ?? globalThis.canvas?.scene;
    scheduleAreaStatusReconcile(controller, scene, "updateCombat");
  });
  Hooks.on("deleteScene", scene => controller.forgetScene(scene));

  for (const hookName of ["createRegion", "updateRegion", "deleteRegion"]) {
    Hooks.on(hookName, region => {
      if (isAreaStatusRegionWriteInProgress()) return;
      if (!isAreaStatusRegion(region)) return;
      scheduleAreaStatusReconcile(controller, getSceneFromDocument(region), hookName);
    });
  }

  Hooks.on("createActiveEffect", effect => {
    if (AreaStatusOwnership.isWriting) return;
    const actor = effect?.parent;
    if (!actor) return;
    const statusIds = effect?.statuses instanceof Set ? Array.from(effect.statuses) : Array.from(effect?.statuses ?? []);
    for (const statusId of statusIds) {
      const existing = Array.from(actor.effects ?? []).find(candidate =>
        candidate !== effect
        && candidate?.statuses?.has?.(statusId)
        && getAreaStatusMetadata(candidate)?.sources
      );
      if (existing) void AreaStatusOwnership.markExternalClaim(existing, true);
    }
    void controller.reconcileActor(actor, { reason: "createActiveEffect" });
  });
  for (const hookName of ["updateActiveEffect", "deleteActiveEffect"]) {
    Hooks.on(hookName, effect => {
      if (AreaStatusOwnership.isWriting) return;
      const actor = effect?.parent;
      if (actor) void controller.reconcileActor(actor, { reason: hookName });
    });
  }
}
