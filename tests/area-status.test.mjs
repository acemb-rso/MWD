import assert from "node:assert/strict";
import test from "node:test";

import {
  normalizeAuraPacket,
} from "../src/modules/area-status/normalize-aura-packet.js";
import {
  getAffectedTokensForSource,
  isTokenAffectedBySource,
  normalizeAreaStatusSource,
} from "../src/modules/area-status/area-status-sources.js";
import {
  getAreaStatusRegionFlag,
  reconcileAreaStatusRegions,
} from "../src/modules/area-status/area-status-regions.js";
import {
  AreaStatusOwnership,
  getAreaStatusMetadata,
} from "../src/modules/area-status/area-status-ownership.js";
import { AreaStatusController } from "../src/modules/area-status/area-status-controller.js";

function deepClone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function setByPath(target, path, value) {
  const parts = String(path).split(".");
  let current = target;
  for (const part of parts.slice(0, -1)) current = current[part] ??= {};
  current[parts.at(-1)] = deepClone(value);
}

function makeEffect(actor, data = {}) {
  const effect = {
    id: data.id ?? `effect-${actor.effects.length + 1}`,
    name: data.name ?? "Status",
    img: data.img ?? "",
    statuses: new Set(data.statuses ?? []),
    flags: deepClone(data.flags ?? {}),
    async update(update) {
      for (const [path, value] of Object.entries(update)) setByPath(this, path, value);
      return this;
    },
    async delete() {
      actor.effects = actor.effects.filter(entry => entry !== this);
      return this;
    },
    getFlag(scope, key) {
      return this.flags?.[scope]?.[key];
    },
  };
  return effect;
}

function makeActor({ id = "actor-1", type = "battlemech", effects = [] } = {}) {
  const actor = {
    id,
    uuid: `Actor.${id}`,
    type,
    effects: [],
    async createEmbeddedDocuments(_type, rows) {
      const created = rows.map(row => makeEffect(this, row));
      this.effects.push(...created);
      return created;
    },
    async deleteEmbeddedDocuments(_type, ids) {
      this.effects = this.effects.filter(effect => !ids.includes(effect.id));
      return [];
    },
  };
  actor.effects = effects.map(row => makeEffect(actor, row));
  return actor;
}

function token(id, actor, { x = 0, disposition = 1 } = {}) {
  const document = {
    id,
    uuid: `Scene.scene-1.Token.${id}`,
    x,
    y: 0,
    width: 1,
    height: 1,
    disposition,
    actor,
  };
  return { id, actor, document };
}

test("aura packets canonicalize legacy grants and reject unknown statuses", () => {
  const packet = normalizeAuraPacket({
    id: "legacy",
    kind: "aura",
    radius: 90,
    allegiance: "ally",
    grants: [{ kind: "status", state: "ecmShrouded" }],
  });

  assert.deepEqual(packet, {
    id: "legacy",
    kind: "aura",
    label: "legacy",
    radius: 90,
    allegiance: "ally",
    grants: { statuses: ["ecmShrouded"] },
  });
  assert.throws(() => normalizeAuraPacket({
    id: "bad",
    kind: "aura",
    radius: 90,
    grants: { statuses: ["notAStatus"] },
  }), /unknown status/);
});

test("area-status targeting uses exact disposition and source inclusion rules", () => {
  const sourceActor = makeActor({ id: "source" });
  const source = token("source", sourceActor, { disposition: 0 });
  const neutral = token("neutral", makeActor({ id: "neutral" }), { x: 50, disposition: 0 });
  const friendly = token("friendly", makeActor({ id: "friendly" }), { x: 50, disposition: 1 });
  const scene = {
    uuid: "Scene.scene-1",
    grid: { size: 1, distance: 1 },
    tokens: [source.document, neutral.document, friendly.document],
  };
  const aura = normalizeAreaStatusSource({
    sceneUuid: scene.uuid,
    sourceTokenUuid: source.document.uuid,
    sourceActorUuid: sourceActor.uuid,
    sourceItemUuid: "Actor.source.Item.module",
    auraId: "aura",
    radius: 100,
    allegiance: "ally",
    statusIds: ["ecmShrouded"],
  });

  assert.equal(isTokenAffectedBySource(aura, source, source), true);
  assert.equal(isTokenAffectedBySource(aura, source, neutral), true);
  assert.equal(isTokenAffectedBySource(aura, source, friendly), false);
  assert.deepEqual(
    getAffectedTokensForSource({
      ...scene,
      tokens: [source, neutral, friendly],
    }, aura).map(entry => entry.id),
    ["source", "neutral"],
  );

  assert.equal(isTokenAffectedBySource({ ...aura, allegiance: "enemy" }, source, source), false);
  assert.equal(isTokenAffectedBySource({ ...aura, allegiance: "enemy" }, source, friendly), true);
});

test("area-status Regions are hidden, flagged, updated, and orphaned safely", async () => {
  globalThis.game = { user: { isGM: true } };
  globalThis.CONST = { REGION_VISIBILITY: { GAMEMASTER: 1 } };
  const actor = makeActor({ id: "source" });
  const sourceToken = token("source", actor, { x: 10 });
  const scene = {
    uuid: "Scene.scene-1",
    grid: { size: 100, distance: 10 },
    tokens: [sourceToken],
    regions: [],
    async createEmbeddedDocuments(_type, rows) {
      const created = rows.map((row, index) => ({
        ...deepClone(row),
        id: `region-${index + 1}`,
        getFlag(scope, key) { return this.flags?.[scope]?.[key]; },
      }));
      this.regions.push(...created);
      return created;
    },
    async updateEmbeddedDocuments(_type, rows) {
      for (const row of rows) {
        const region = this.regions.find(entry => entry.id === row._id);
        Object.assign(region, deepClone(row));
      }
      return rows;
    },
    async deleteEmbeddedDocuments(_type, ids) {
      this.regions = this.regions.filter(region => !ids.includes(region.id));
      return ids;
    },
  };
  const source = normalizeAreaStatusSource({
    sceneUuid: scene.uuid,
    sourceTokenUuid: sourceToken.document.uuid,
    sourceActorUuid: actor.uuid,
    sourceItemUuid: "Actor.source.Item.module",
    auraId: "guardian",
    label: "Guardian",
    radius: 180,
    allegiance: "ally",
    statusIds: ["ecmShrouded"],
  });

  await reconcileAreaStatusRegions(scene, [source]);
  assert.equal(scene.regions.length, 1);
  assert.equal(scene.regions[0].visibility, 1);
  assert.equal(getAreaStatusRegionFlag(scene.regions[0]).sourceKey, source.sourceKey);

  sourceToken.document.x = 110;
  await reconcileAreaStatusRegions(scene, [source]);
  assert.equal(scene.regions.length, 1);
  assert.equal(scene.regions[0].shapes[0].x, -1640);

  await reconcileAreaStatusRegions(scene, []);
  assert.equal(scene.regions.length, 0);
});

test("area-status ownership preserves overlapping and manual status claims", async () => {
  globalThis.foundry = { utils: { deepClone } };
  const actor = makeActor();
  const sourceA = {
    sourceKey: "scene::token::actor::guardian::aura",
    sourceTokenUuid: "Scene.scene.Token.source",
    sourceActorUuid: "Actor.source",
    sourceItemUuid: "Actor.source.Item.guardian",
    label: "Guardian",
  };
  const sourceB = {
    ...sourceA,
    sourceKey: "scene::token2::actor2::nova::aura",
    sourceItemUuid: "Actor.source.Item.nova",
    label: "Nova",
  };

  await AreaStatusOwnership.upsertContribution({ actor, statusId: "ecmShrouded", source: sourceA });
  await AreaStatusOwnership.upsertContribution({ actor, statusId: "ecmShrouded", source: sourceB });
  assert.equal(actor.effects.length, 1);
  assert.equal(Object.keys(getAreaStatusMetadata(actor.effects[0]).sources).length, 2);

  await AreaStatusOwnership.removeContribution({ actor, statusId: "ecmShrouded", sourceKey: sourceA.sourceKey });
  assert.equal(actor.effects.length, 1);
  await AreaStatusOwnership.removeContribution({ actor, statusId: "ecmShrouded", sourceKey: sourceB.sourceKey });
  assert.equal(actor.effects.length, 0);

  actor.effects.push(makeEffect(actor, {
    name: "ECM Shrouded",
    statuses: ["ecmShrouded"],
  }));
  await AreaStatusOwnership.upsertContribution({ actor, statusId: "ecmShrouded", source: sourceA });
  assert.equal(getAreaStatusMetadata(actor.effects[0]).createdByAreaStatus, false);
  await AreaStatusOwnership.removeContribution({ actor, statusId: "ecmShrouded", sourceKey: sourceA.sourceKey });
  assert.equal(actor.effects.length, 1);
});

test("controller reconciles desired contributions without disturbing another scene", async () => {
  globalThis.foundry = { utils: { deepClone } };
  globalThis.CONST = { REGION_VISIBILITY: { GAMEMASTER: 1 } };

  const sourceActor = makeActor({ id: "source" });
  const targetActor = makeActor({ id: "target" });
  const sourceToken = token("source", sourceActor, { disposition: 1 });
  const targetToken = token("target", targetActor, { x: 50, disposition: 1 });
  const scene = {
    uuid: "Scene.scene-1",
    grid: { size: 1, distance: 1 },
    tokens: [sourceToken, targetToken],
    regions: [],
    async createEmbeddedDocuments(_type, rows) {
      const created = rows.map((row, index) => ({
        ...deepClone(row),
        id: `region-${index + 1}`,
        getFlag(scope, key) { return this.flags?.[scope]?.[key]; },
      }));
      this.regions.push(...created);
      return created;
    },
    async updateEmbeddedDocuments() {
      return [];
    },
    async deleteEmbeddedDocuments(_type, ids) {
      this.regions = this.regions.filter(region => !ids.includes(region.id));
      return ids;
    },
  };
  sourceToken.document.parent = scene;
  targetToken.document.parent = scene;
  globalThis.game = {
    user: { isGM: true },
    actors: [sourceActor, targetActor],
    scenes: [scene],
  };
  globalThis.canvas = { scene, tokens: { placeables: [sourceToken, targetToken] } };

  const controller = new AreaStatusController();
  const source = controller.upsertSource({
    sceneUuid: scene.uuid,
    sourceTokenUuid: sourceToken.document.uuid,
    sourceActorUuid: sourceActor.uuid,
    sourceItemUuid: "Actor.source.Item.guardian",
    auraId: "guardian",
    label: "Guardian",
    radius: 100,
    allegiance: "ally",
    statusIds: ["ecmShrouded"],
  });
  await controller.reconcileScene(scene);
  assert.equal(targetActor.effects.length, 1);
  assert.ok(getAreaStatusMetadata(targetActor.effects[0]).sources[source.sourceKey]);

  const otherSceneSource = {
    ...source,
    sceneUuid: "Scene.scene-2",
    sourceKey: "Scene.scene-2::token::actor::item::aura",
  };
  await AreaStatusOwnership.upsertContribution({
    actor: targetActor,
    statusId: "ecmShrouded",
    source: otherSceneSource,
  });

  targetActor.effects = [];
  await controller.reconcileScene(scene);
  assert.equal(targetActor.effects.length, 1);
  assert.ok(getAreaStatusMetadata(targetActor.effects[0]).sources[source.sourceKey]);

  await AreaStatusOwnership.upsertContribution({
    actor: targetActor,
    statusId: "ecmShrouded",
    source: otherSceneSource,
  });
  targetToken.document.x = 200;
  await controller.reconcileScene(scene);
  const metadata = getAreaStatusMetadata(targetActor.effects[0]);
  assert.equal(metadata.sources[source.sourceKey], undefined);
  assert.ok(metadata.sources[otherSceneSource.sourceKey]);
});
