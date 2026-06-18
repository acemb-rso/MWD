// Purpose: Sole writer for source-owned area-status metadata on actor ActiveEffects.
// How it fits: Prevents overlapping auras from deleting manual or unrelated statuses.

import {
  buildStatusInstanceMetadata,
  getStatusConditionDefinition,
  isStatusConditionApplicableToActor,
} from "../status/status-condition-catalog.js";

export const AREA_STATUS_EFFECT_FLAG = "areaStatus";

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.contents)) return value.contents;
  if (value && typeof value[Symbol.iterator] === "function") return Array.from(value);
  return [];
}

function clone(value) {
  return globalThis.foundry?.utils?.deepClone?.(value)
    ?? JSON.parse(JSON.stringify(value ?? null));
}

function getStatusIds(effect = null) {
  if (effect?.statuses instanceof Set) return Array.from(effect.statuses);
  if (Array.isArray(effect?.statuses)) return effect.statuses;
  const statusId = effect?.getFlag?.("mwd", "status")?.id
    ?? effect?.flags?.mwd?.status?.id
    ?? "";
  return statusId ? [statusId] : [];
}

export function getAreaStatusMetadata(effect = null) {
  return effect?.getFlag?.("mwd", AREA_STATUS_EFFECT_FLAG)
    ?? effect?.flags?.mwd?.[AREA_STATUS_EFFECT_FLAG]
    ?? null;
}

export function findStatusEffects(actor = null, statusId = "") {
  const normalizedId = String(statusId ?? "").trim();
  return toArray(actor?.effects).filter(effect => getStatusIds(effect).includes(normalizedId));
}

export class AreaStatusOwnership {
  static #writeDepth = 0;

  static get isWriting() {
    return this.#writeDepth > 0;
  }

  static async #write(work) {
    this.#writeDepth += 1;
    try {
      return await work();
    } finally {
      this.#writeDepth = Math.max(0, this.#writeDepth - 1);
    }
  }

  static getActualContributions(actors = []) {
    const actual = new Map();
    for (const actor of actors) {
      const actorUuid = String(actor?.uuid ?? "").trim();
      if (!actorUuid) continue;
      for (const effect of toArray(actor?.effects)) {
        const metadata = getAreaStatusMetadata(effect);
        if (!metadata?.sources || typeof metadata.sources !== "object") continue;
        for (const [sourceKey, source] of Object.entries(metadata.sources)) {
          const statusId = String(source?.statusId ?? getStatusIds(effect)[0] ?? "").trim();
          if (!sourceKey || !statusId) continue;
          actual.set(`${actorUuid}::${statusId}::${sourceKey}`, {
            actor,
            actorUuid,
            statusId,
            sourceKey,
            source,
            effect,
          });
        }
      }
    }
    return actual;
  }

  static async upsertContribution({ actor = null, statusId = "", source = {} } = {}) {
    const entry = getStatusConditionDefinition(statusId);
    if (!actor || !entry || !isStatusConditionApplicableToActor(entry, actor)) return false;
    const sourceKey = String(source?.sourceKey ?? "").trim();
    if (!sourceKey) return false;

    let effects = findStatusEffects(actor, statusId);
    let effect = effects.find(candidate => getAreaStatusMetadata(candidate)) ?? effects[0] ?? null;
    let createdByAreaStatus = false;

    if (!effect) {
      createdByAreaStatus = true;
      const [created] = await this.#write(() => actor.createEmbeddedDocuments("ActiveEffect", [{
        name: entry.label,
        img: entry.icon,
        disabled: false,
        statuses: [statusId],
        flags: {
          mwd: {
            status: buildStatusInstanceMetadata({ actor, statusId, catalogEntry: entry }),
          },
        },
      }]));
      effects = findStatusEffects(actor, statusId);
      effect = created ?? effects.find(candidate => getAreaStatusMetadata(candidate)) ?? effects[0] ?? null;
    }
    if (!effect) return false;

    const current = clone(getAreaStatusMetadata(effect) ?? {});
    const existingSources = current.sources && typeof current.sources === "object" ? current.sources : {};
    const metadata = {
      createdByAreaStatus: current.createdByAreaStatus ?? createdByAreaStatus,
      externalClaim: current.externalClaim ?? !createdByAreaStatus,
      sources: {
        ...existingSources,
        [sourceKey]: {
          sourceKey,
          sceneUuid: String(source.sceneUuid ?? "").trim(),
          sourceTokenUuid: String(source.sourceTokenUuid ?? "").trim(),
          sourceActorUuid: String(source.sourceActorUuid ?? "").trim(),
          sourceItemUuid: String(source.sourceItemUuid ?? "").trim(),
          statusId,
          label: String(source.label ?? entry.label ?? statusId).trim(),
        },
      },
    };
    const statusMetadata = buildStatusInstanceMetadata({
      actor,
      statusId,
      catalogEntry: entry,
      metadata: { notes: `Area status: ${source.label ?? entry.label ?? statusId}` },
    });

    await this.#write(() => effect.update({
      "flags.mwd.areaStatus": metadata,
      "flags.mwd.status": statusMetadata,
    }));
    return true;
  }

  static async removeContribution({ actor = null, statusId = "", sourceKey = "" } = {}) {
    if (!actor || !sourceKey) return false;
    const effect = findStatusEffects(actor, statusId)
      .find(candidate => Boolean(getAreaStatusMetadata(candidate)?.sources?.[sourceKey]));
    if (!effect) return false;

    const current = clone(getAreaStatusMetadata(effect) ?? {});
    const sources = { ...(current.sources ?? {}) };
    delete sources[sourceKey];
    const hasSources = Object.keys(sources).length > 0;

    if (!hasSources && current.createdByAreaStatus === true && current.externalClaim !== true) {
      await this.#write(async () => {
        if (typeof effect.delete === "function") await effect.delete();
        else await actor.deleteEmbeddedDocuments("ActiveEffect", [effect.id]);
      });
      return true;
    }

    await this.#write(() => effect.update({
      "flags.mwd.areaStatus": {
        createdByAreaStatus: Boolean(current.createdByAreaStatus),
        externalClaim: Boolean(current.externalClaim),
        sources,
      },
    }));
    return true;
  }

  static async markExternalClaim(effect = null, active = true) {
    const current = clone(getAreaStatusMetadata(effect) ?? {});
    if (!effect || !current.sources || !Object.keys(current.sources).length) return false;
    await this.#write(() => effect.update({
      "flags.mwd.areaStatus": {
        ...current,
        externalClaim: Boolean(active),
      },
    }));
    return true;
  }
}
