import test from "node:test";
import assert from "node:assert/strict";

globalThis.foundry ??= { utils: {} };
globalThis.foundry.utils.deepClone ??= value => JSON.parse(JSON.stringify(value ?? null));
globalThis.foundry.utils.randomID ??= () => "test-id";

const {
  PURCHASE_TYPES,
  commitPurchase,
  evaluateBuild,
  getAdvancementCost,
  normalizeCharacterAdvancementState,
  previewPurchase,
} = await import("../src/modules/advancement/character-advancement.js");

function setProperty(root, path, value) {
  const parts = String(path).split(".");
  let node = root;
  for (const part of parts.slice(0, -1)) {
    node[part] ??= {};
    node = node[part];
  }
  node[parts.at(-1)] = value;
}

function makeActor(overrides = {}) {
  const system = {
    attributes: {
      strength: { value: 2 },
      reflexes: { value: 2 },
      guts: { value: 2 },
      intelligence: { value: 2 },
      charisma: { value: 2 },
      edge: { value: 3 },
    },
    skills: {
      gunnery: { rating: 2, bonus: 0, specializations: [] },
      piloting: { rating: 2, bonus: 0, specializations: [] },
      firearms: { rating: 1, bonus: 0, specializations: [] },
    },
    counters: {
      xp: { total: 40, value: 10 },
      edgePools: {
        grit: { rating: 2, value: 1 },
        chaos: { rating: 1, value: 1 },
        insight: { rating: 1, value: 0 },
        rumor: { rating: 1, value: 0 },
        legend: { rating: 1, value: 0 },
        credibility: { rating: 1, value: 0 },
      },
    },
    biography: { experienceLevel: "regular" },
    knowledgeSkills: ["Mercenary Contracts"],
  };
  Object.assign(system, overrides.system ?? {});
  const actor = {
    system,
    items: overrides.items ?? [],
    updates: [],
    created: [],
    deleted: [],
    async update(update) {
      this.updates.push(update);
      for (const [path, value] of Object.entries(update)) setProperty(this, path, value);
      return this;
    },
    async createEmbeddedDocuments(_type, docs) {
      this.created.push(...docs);
      this.items.push(...docs.map((doc, index) => ({ id: `created-${index}`, ...doc })));
      return docs;
    },
    async deleteEmbeddedDocuments(_type, ids) {
      this.deleted.push(...ids);
      this.items = this.items.filter(item => !ids.includes(item.id));
      return ids;
    },
  };
  return actor;
}

test("advancement costs use documented formulas", () => {
  assert.equal(getAdvancementCost(PURCHASE_TYPES.attribute, 3), 15);
  assert.equal(getAdvancementCost(PURCHASE_TYPES.skill, 3), 9);
  assert.equal(getAdvancementCost(PURCHASE_TYPES.edgePool, 3), 6);
  assert.equal(getAdvancementCost(PURCHASE_TYPES.traitAdd), 6);
  assert.equal(getAdvancementCost(PURCHASE_TYPES.specializationAdd), 4);
  assert.equal(getAdvancementCost(PURCHASE_TYPES.specializationChange), 2);
});

test("character advancement state normalizes xp and knowledge skills", () => {
  const system = { counters: { xp: { total: "12", value: "4" } }, knowledgeSkills: "Contracts, Contracts, Clan Law" };
  normalizeCharacterAdvancementState(system);

  assert.deepEqual(system.counters.xp, { total: 12, value: 4 });
  assert.deepEqual(system.knowledgeSkills, ["Contracts", "Clan Law"]);
});

test("elite build budgets include 14 attributes, 22 skills, and edge + 6", () => {
  const actor = makeActor({
    system: {
      biography: { experienceLevel: "elite" },
      knowledgeSkills: ["Mercenary Contracts", "Clan Law"],
    },
    items: [
      { id: "pos", type: "quality", system: { category: "positive" } },
      { id: "neg", type: "quality", system: { category: "negative" } },
      { id: "lm1", type: "lifeModule", system: {} },
      { id: "lm2", type: "lifeModule", system: {} },
      { id: "lm3", type: "lifeModule", system: {} },
      { id: "lm4", type: "lifeModule", system: {} },
    ],
  });

  const result = evaluateBuild(actor, { tier: "elite" });

  assert.equal(result.tier.attributePoints, 14);
  assert.equal(result.tier.skillPoints, 22);
  assert.equal(result.tier.edgeBonus, 6);
  assert.equal(result.categories.find(c => c.id === "edgePools").budget, 9);
});

test("skill purchase preview blocks insufficient xp and caps at six", () => {
  const actor = makeActor({ system: { counters: { xp: { total: 12, value: 10 } } } });
  const preview = previewPurchase(actor, { type: PURCHASE_TYPES.skill, target: "gunnery", to: 3 });
  assert.equal(preview.legal, false);
  assert.match(preview.errors.join(" "), /Not enough XP/);

  actor.system.counters.xp = { total: 100, value: 0 };
  actor.system.skills.gunnery.rating = 6;
  const capped = previewPurchase(actor, { type: PURCHASE_TYPES.skill, target: "gunnery", to: 7 });
  assert.equal(capped.legal, false);
  assert.match(capped.errors.join(" "), /above 6/);
});

test("edge pool rating purchase does not refill current value", async () => {
  const actor = makeActor();
  const result = await commitPurchase(actor, { type: PURCHASE_TYPES.edgePool, target: "grit", to: 3 });

  assert.equal(result.ok, true);
  assert.equal(actor.system.counters.edgePools.grit.rating, 3);
  assert.equal(actor.system.counters.edgePools.grit.value, 1);
  assert.equal(actor.system.counters.xp.value, 16);
});

test("specialization requires rating 2 and one specialization per skill", () => {
  const actor = makeActor();
  actor.system.skills.firearms.rating = 1;
  let preview = previewPurchase(actor, {
    type: PURCHASE_TYPES.specializationAdd,
    target: "firearms",
    specializationKey: "sidearms",
  });
  assert.equal(preview.legal, false);
  assert.match(preview.errors.join(" "), /rating 2/);

  actor.system.skills.gunnery.specializations = ["direct-fire"];
  preview = previewPurchase(actor, {
    type: PURCHASE_TYPES.specializationAdd,
    target: "gunnery",
    specializationKey: "indirect-fire",
  });
  assert.equal(preview.legal, false);
  assert.match(preview.errors.join(" "), /already has/);
});

test("trait add creates quality before spent xp increments", async () => {
  const actor = makeActor();
  await commitPurchase(actor, { type: PURCHASE_TYPES.traitAdd, target: "Natural Technician", label: "Natural Technician" });

  assert.equal(actor.created[0].type, "quality");
  assert.equal(actor.created[0].name, "Natural Technician");
  assert.equal(actor.system.counters.xp.value, 16);
});

test("negative trait removal deletes item and increments spent xp", async () => {
  const actor = makeActor({
    items: [{ id: "bad-rep", uuid: "Item.bad-rep", type: "quality", name: "Bad Reputation", system: { category: "negative" } }],
  });
  await commitPurchase(actor, { type: PURCHASE_TYPES.traitRemove, target: "Item.bad-rep" });

  assert.deepEqual(actor.deleted, ["bad-rep"]);
  assert.equal(actor.system.counters.xp.value, 16);
});
