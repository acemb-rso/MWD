import test from "node:test";
import assert from "node:assert/strict";

function makeEffect({ id, name, statusId = "ecmShrouded", value = true }) {
  return {
    id,
    name,
    uuid: `Item.module.ActiveEffect.${id}`,
    toObject() {
      return {
        _id: id,
        name,
        transfer: true,
        changes: [{ key: `statuses.${statusId}`, mode: 5, value }],
        flags: {},
      };
    },
  };
}

function makeActor() {
  const actor = {
    effects: { contents: [] },
    async createEmbeddedDocuments(_type, entries) {
      const created = entries.map((entry, index) => ({
        id: entry._id ?? `created-${this.effects.contents.length + index + 1}`,
        ...entry,
      }));
      this.effects.contents.push(...created);
      return created;
    },
    async updateEmbeddedDocuments(_type, entries) {
      return entries.map(entry => {
        const current = this.effects.contents.find(effect => effect.id === entry._id);
        Object.assign(current, entry);
        return current;
      });
    },
    async deleteEmbeddedDocuments(_type, ids) {
      const deleted = this.effects.contents.filter(effect => ids.includes(effect.id));
      this.effects.contents = this.effects.contents.filter(effect => !ids.includes(effect.id));
      return deleted;
    },
  };
  return actor;
}

test("asset module embedded ActiveEffects mirror to the actor and preserve manual actor effects", async () => {
  globalThis.Item ??= class {};
  globalThis.foundry = {
    utils: {
      mergeObject(target = {}, source = {}) {
        return {
          ...target,
          ...source,
          mwd: {
            ...(target.mwd ?? {}),
            ...(source.mwd ?? {}),
          },
        };
      },
    },
  };

  const { MWDItem } = await import("../src/modules/item/anarchy-base-item.js");
  const actor = makeActor();
  const item = Object.create(MWDItem.prototype);
  Object.assign(item, {
    id: "module-1",
    uuid: "Actor.actor.Item.module-1",
    name: "Guardian ECM",
    type: "assetModule",
    actor,
    system: {
      enabled: true,
      activation: { mode: "toggle", active: true },
      effects: [],
    },
    effects: { contents: [makeEffect({ id: "ae-1", name: "ECM Shroud" })] },
  });

  const first = await item.syncEquippedActorEffects();
  assert.equal(first.created.length, 1);
  assert.equal(actor.effects.contents[0].name, "Guardian ECM: ECM Shroud");
  assert.equal(actor.effects.contents[0].transfer, false);
  assert.equal(actor.effects.contents[0].flags.mwd.equippedItemSync.sourceItemId, "module-1");
  assert.equal(actor.effects.contents[0].flags.mwd.equippedItemSync.sourceEffectId, "ae-1");

  actor.effects.contents.push({
    id: "manual",
    name: "Manual ECM Shroud",
    flags: {},
  });
  actor.effects.contents.push({
    id: "duplicate",
    name: "Duplicate Mirror",
    flags: actor.effects.contents[0].flags,
  });
  item.effects.contents = [makeEffect({ id: "ae-1", name: "ECM Shroud Updated" })];

  const second = await item.syncEquippedActorEffects();
  assert.equal(second.updated.length, 1);
  assert.equal(second.deleted.map(effect => effect.id).includes("duplicate"), true);
  assert.equal(actor.effects.contents.some(effect => effect.id === "manual"), true);
  assert.equal(actor.effects.contents.find(effect => effect.id === "created-1").name, "Guardian ECM: ECM Shroud Updated");

  item.system.activation.active = false;
  const disabled = await item.syncEquippedActorEffects();
  assert.equal(disabled.deleted.length, 1);
  assert.deepEqual(actor.effects.contents.map(effect => effect.id), ["manual"]);
});
