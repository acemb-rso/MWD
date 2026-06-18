// Purpose: Reconciles area-status sources, hidden Regions, and owned statuses.
// How it fits: Central runtime engine for continuous spatial status membership.

import {
  collectAssetModuleAreaStatusSources,
  getAffectedTokensForSource,
  getSceneTokens,
  getTokenActor,
  normalizeAreaStatusSource,
} from "./area-status-sources.js";
import { AreaStatusOwnership } from "./area-status-ownership.js";
import {
  reconcileAreaStatusRegions,
  removeAreaStatusRegions,
} from "./area-status-regions.js";
import {
  getStatusConditionDefinition,
  isStatusConditionApplicableToActor,
} from "../status/status-condition-catalog.js";

function uniqueActorsFromScene(scene = null) {
  const actors = [];
  const seen = new Set();
  for (const token of getSceneTokens(scene)) {
    const actor = getTokenActor(token);
    const uuid = String(actor?.uuid ?? "").trim();
    if (!actor || !uuid || seen.has(uuid)) continue;
    seen.add(uuid);
    actors.push(actor);
  }
  return actors;
}

function contributionBelongsToScene(contribution = {}, sceneUuid = "") {
  const explicitSceneUuid = String(contribution?.source?.sceneUuid ?? "").trim();
  if (explicitSceneUuid) return explicitSceneUuid === sceneUuid;
  return String(contribution?.sourceKey ?? "").startsWith(`${sceneUuid}::`);
}

function actorsWithSceneContributions(sceneUuid = "") {
  const actors = [];
  for (const actor of globalThis.game?.actors ?? []) {
    const contributions = AreaStatusOwnership.getActualContributions([actor]);
    if (Array.from(contributions.values()).some(entry => contributionBelongsToScene(entry, sceneUuid))) {
      actors.push(actor);
    }
  }
  return actors;
}

export class AreaStatusController {
  #manualSources = new Map();
  #sceneSources = new Map();
  #knownActorsByScene = new Map();
  #reconcilingScenes = new Set();
  #pendingScenes = new Set();

  get ownership() {
    return AreaStatusOwnership;
  }

  upsertSource(source = {}) {
    const normalized = normalizeAreaStatusSource(source);
    if (!normalized.sourceKey) return null;
    this.#manualSources.set(normalized.sourceKey, normalized);
    const scene = this.#resolveScene(normalized.sceneUuid);
    if (scene) queueMicrotask(() => void this.reconcileScene(scene, { reason: "upsertSource" }));
    return normalized;
  }

  async removeSource(sourceKey = "", { reconcile = true } = {}) {
    const key = String(sourceKey ?? "").trim();
    const source = this.#manualSources.get(key) ?? null;
    this.#manualSources.delete(key);
    if (reconcile && source?.sceneUuid) {
      const scene = this.#resolveScene(source.sceneUuid);
      if (scene) await this.reconcileScene(scene, { reason: "removeSource" });
    }
    return Boolean(source);
  }

  getSourcesForToken(token = null) {
    const tokenUuid = String(token?.document?.uuid ?? token?.uuid ?? "").trim();
    const sceneUuid = String(token?.document?.parent?.uuid ?? token?.parent?.uuid ?? "").trim();
    return Array.from(this.#sceneSources.get(sceneUuid)?.values?.() ?? [])
      .filter(source => source.sourceTokenUuid === tokenUuid);
  }

  getAffectedTokens(source = {}) {
    const scene = this.#resolveScene(source.sceneUuid);
    return scene ? getAffectedTokensForSource(scene, source) : [];
  }

  async reconcileToken(token = null, options = {}) {
    const scene = token?.document?.parent ?? token?.parent ?? globalThis.canvas?.scene ?? null;
    return scene ? this.reconcileScene(scene, { ...options, reason: options.reason ?? "token" }) : null;
  }

  async reconcileActor(actor = null, options = {}) {
    const scenes = new Set();
    for (const token of actor?.getActiveTokens?.(true, true) ?? []) {
      const scene = token?.document?.parent ?? token?.parent;
      if (scene) scenes.add(scene);
    }
    if (!scenes.size && globalThis.canvas?.scene) scenes.add(globalThis.canvas.scene);
    const results = [];
    for (const scene of scenes) results.push(await this.reconcileScene(scene, { ...options, reason: options.reason ?? "actor" }));
    return results;
  }

  async reconcileScene(scene = null, { reason = "manual" } = {}) {
    if (!scene || !globalThis.game?.user?.isGM) return null;
    const sceneUuid = String(scene.uuid ?? "").trim();
    if (!sceneUuid) return null;
    if (this.#reconcilingScenes.has(sceneUuid)) {
      this.#pendingScenes.add(sceneUuid);
      return null;
    }

    this.#reconcilingScenes.add(sceneUuid);
    try {
      const collected = collectAssetModuleAreaStatusSources(scene);
      const manual = Array.from(this.#manualSources.values())
        .filter(source => source.sceneUuid === sceneUuid && source.active !== false);
      const sources = [...collected, ...manual]
        .map(normalizeAreaStatusSource)
        .filter(source => source.active && source.radius > 0 && source.statusIds.length);
      const sourceMap = new Map(sources.map(source => [source.sourceKey, source]));
      this.#sceneSources.set(sceneUuid, sourceMap);

      await reconcileAreaStatusRegions(scene, sources);

      const desired = new Map();
      for (const source of sources) {
        for (const token of getAffectedTokensForSource(scene, source)) {
          const actor = getTokenActor(token);
          const actorUuid = String(actor?.uuid ?? "").trim();
          if (!actor || !actorUuid) continue;
          for (const statusId of source.statusIds) {
            const entry = getStatusConditionDefinition(statusId);
            if (!entry || !isStatusConditionApplicableToActor(entry, actor)) {
              console.debug("MWD | Area status skipped inapplicable target", { statusId, actor: actorUuid, sourceKey: source.sourceKey });
              continue;
            }
            desired.set(`${actorUuid}::${statusId}::${source.sourceKey}`, { actor, actorUuid, statusId, source });
          }
        }
      }

      const currentActors = uniqueActorsFromScene(scene);
      const knownActors = this.#knownActorsByScene.get(sceneUuid) ?? new Map();
      for (const actor of currentActors) knownActors.set(actor.uuid, actor);
      for (const actor of actorsWithSceneContributions(sceneUuid)) knownActors.set(actor.uuid, actor);
      for (const contribution of desired.values()) knownActors.set(contribution.actorUuid, contribution.actor);
      this.#knownActorsByScene.set(sceneUuid, knownActors);
      const actors = Array.from(knownActors.values());
      const actual = new Map(
        Array.from(AreaStatusOwnership.getActualContributions(actors).entries())
          .filter(([, contribution]) => contributionBelongsToScene(contribution, sceneUuid)),
      );
      for (const [key, contribution] of desired.entries()) {
        if (actual.has(key)) continue;
        await AreaStatusOwnership.upsertContribution(contribution);
      }
      for (const [key, contribution] of actual.entries()) {
        if (desired.has(key)) continue;
        await AreaStatusOwnership.removeContribution(contribution);
      }
      for (const [actorUuid, actor] of knownActors.entries()) {
        const stillRelevant = Array.from(desired.values()).some(entry => entry.actorUuid === actorUuid)
          || AreaStatusOwnership.getActualContributions([actor]).size > 0
          || currentActors.some(entry => entry.uuid === actorUuid);
        if (!stillRelevant) knownActors.delete(actorUuid);
      }

      return {
        reason,
        sceneUuid,
        sources: sources.length,
        desired: desired.size,
        actual: actual.size,
      };
    } finally {
      this.#reconcilingScenes.delete(sceneUuid);
      if (this.#pendingScenes.delete(sceneUuid)) {
        queueMicrotask(() => void this.reconcileScene(scene, { reason: "pending" }));
      }
    }
  }

  async teardownScene(scene = null) {
    if (!scene) return;
    const sceneUuid = String(scene.uuid ?? "").trim();
    this.#sceneSources.delete(sceneUuid);
    this.#knownActorsByScene.delete(sceneUuid);
    await removeAreaStatusRegions(scene);
  }

  forgetScene(scene = null) {
    const sceneUuid = String(scene?.uuid ?? "").trim();
    if (!sceneUuid) return;
    this.#sceneSources.delete(sceneUuid);
    this.#knownActorsByScene.delete(sceneUuid);
  }

  #resolveScene(sceneUuid = "") {
    const uuid = String(sceneUuid ?? "").trim();
    if (!uuid) return globalThis.canvas?.scene ?? null;
    if (globalThis.canvas?.scene?.uuid === uuid) return globalThis.canvas.scene;
    return Array.from(globalThis.game?.scenes ?? []).find(scene => scene?.uuid === uuid) ?? null;
  }
}
