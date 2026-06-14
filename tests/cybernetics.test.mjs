import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  buildRollTraitFacts,
  evaluateTraitPhase,
  isCyberneticOnline,
  normalizeCyberneticGearSystem,
  parseCyberneticTagMetadata,
} from "../src/modules/mwd/traits.js";
import { resolveOverload } from "../src/modules/roll/intent/resolve-overload.js";
import {
  buildCyberneticBodySlotWarnings,
  buildPersonalInventoryContext,
} from "../src/modules/sheets/actor-sheet-support.js";

function setupFoundry() {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.deepClone ??= value => JSON.parse(JSON.stringify(value ?? null));
  globalThis.foundry.utils.randomID ??= () => "test-id";
  globalThis.foundry.utils.getProperty ??= (source, path) => String(path ?? "")
    .split(".")
    .filter(Boolean)
    .reduce((current, segment) => current?.[segment], source);
  globalThis.game ??= { mwd: { personalCombat: { getSnapshot: () => null } } };
  globalThis.ui ??= { notifications: { warn: () => {} } };
}

function cyberneticItem(system = {}, extra = {}) {
  return {
    id: extra.id ?? "cyber-1",
    uuid: extra.uuid ?? `Item.${extra.id ?? "cyber-1"}`,
    name: extra.name ?? "Cybernetic",
    type: "gear",
    canonicalType: "gear",
    system: {
      subtype: "cybernetic",
      equipped: true,
      tags: ["cybernetic", "load1"],
      ...system,
    },
  };
}

test("cybernetic tags normalize load, body slot, and activation defaults", () => {
  setupFoundry();

  assert.deepEqual(
    parseCyberneticTagMetadata(["cybernetic", "load9", "bodySlot:neural", "activate"]),
    {
      load: 2,
      bodySlot: "neural",
      hasActivateTag: true,
      tags: ["cybernetic", "load9", "bodySlot:neural", "activate"],
    },
  );

  const passive = normalizeCyberneticGearSystem({
    subtype: "cybernetic",
    equipped: true,
    active: false,
    tags: ["cybernetic", "load1", "bodySlot:skin"],
  });
  assert.equal(passive.activation, "passive");
  assert.equal(passive.active, true);
  assert.equal(passive.load, 1);
  assert.equal(passive.bodySlot, "skin");
  assert.equal(isCyberneticOnline({ system: passive }), true);

  const toggle = normalizeCyberneticGearSystem({
    subtype: "cybernetic",
    equipped: true,
    tags: ["cybernetic", "activate", "load2"],
  });
  assert.equal(toggle.activation, "toggle");
  assert.equal(toggle.active, false);
  assert.equal(isCyberneticOnline({ system: toggle }), false);
});

test("trait engine includes quality traits and only online cybernetics", () => {
  setupFoundry();

  const actor = {
    system: { burn: { value: 0, overloaded: false } },
    items: [
      {
        id: "quality-1",
        name: "Quality",
        type: "quality",
        canonicalType: "quality",
        system: {
          inactive: false,
          category: "positive",
          tier: "minor",
          activation: "passive",
          tags: [],
          effects: [{ id: "quality-roll", type: "rollMod", phase: "onBuildRoll", selector: "intent.skill", value: 1 }],
          prerequisites: [],
          limits: {},
        },
      },
      cyberneticItem({
        equipped: true,
        active: false,
        activation: "passive",
        tags: ["cybernetic", "load1"],
        effects: [{ id: "cyber-roll", type: "rollMod", phase: "onBuildRoll", selector: "intent.skill", value: 2 }],
      }, { id: "cyber-online", name: "Online Cyber" }),
      cyberneticItem({
        equipped: true,
        active: false,
        activation: "toggle",
        tags: ["cybernetic", "activate", "load1"],
        effects: [{ id: "cyber-off", type: "rollMod", phase: "onBuildRoll", selector: "intent.skill", value: 4 }],
      }, { id: "cyber-off", name: "Offline Cyber" }),
      cyberneticItem({
        equipped: false,
        activation: "passive",
        tags: ["cybernetic", "load1"],
        effects: [{ id: "cyber-unequipped", type: "rollMod", phase: "onBuildRoll", selector: "intent.skill", value: 8 }],
      }, { id: "cyber-unequipped", name: "Unequipped Cyber" }),
    ],
  };

  const result = evaluateTraitPhase({
    actor,
    phase: "onBuildRoll",
    facts: buildRollTraitFacts({ actor, payload: { intent: "skill", key: "perception" } }),
    packet: {},
  });

  assert.deepEqual(
    result.modifiers.map(modifier => [modifier.source, modifier.value]),
    [["Quality", 1], ["Online Cyber", 2]],
  );
});

test("cybernetic load adds to overload DN while rating remains metadata", async () => {
  setupFoundry();

  const actor = {
    system: {
      burn: { value: 6, overloaded: false },
      attributes: { guts: { value: 3 } },
      traitMods: { overloadDNMod: 0 },
    },
    get overloadThreshold() { return 6; },
    items: [
      cyberneticItem({
        rating: 6,
        equipped: true,
        active: true,
        activation: "toggle",
        tags: ["cybernetic", "activate", "load2"],
      }, { id: "load-bearing", name: "Load Bearing Cyber" }),
    ],
  };

  const resolved = await resolveOverload({ actor });
  assert.equal(resolved.difficulty.dn, 3);
});

test("inventory context exposes cybernetic state and body slot warnings", () => {
  setupFoundry();

  const gear = [
    cyberneticItem({ bodySlot: "neural", tags: ["cybernetic", "load1", "bodySlot:neural"] }, { id: "a", name: "A" }),
    cyberneticItem({ bodySlot: "neural", tags: ["cybernetic", "load1", "bodySlot:neural"] }, { id: "b", name: "B" }),
    cyberneticItem({ bodySlot: "neural", tags: ["cybernetic", "load1", "bodySlot:neural"] }, { id: "c", name: "C" }),
    { id: "standard", name: "Toolkit", type: "gear", canonicalType: "gear", system: { quantity: 1, rating: 2, tags: [] } },
  ];
  const actor = { getPersonalCombatLoadout: () => ({ warnings: [], weapons: [], armor: [] }) };

  const warnings = buildCyberneticBodySlotWarnings(gear);
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].slot, "neural");
  assert.equal(warnings[0].count, 3);

  const context = buildPersonalInventoryContext(actor, { items: { gear }, isEditable: true });
  const cyberRecord = context.gear.find(record => record.id === "a");
  const standardRecord = context.gear.find(record => record.id === "standard");
  assert.equal(cyberRecord.supportsEquip, true);
  assert.equal(cyberRecord.canAdjustQuantity, false);
  assert.equal(standardRecord.suppressEquip, true);
  assert.equal(standardRecord.canAdjustQuantity, true);
  assert.equal(context.cybernetics.bodySlotWarnings[0].message, "More than two active cybernetics occupy neural.");
});

test("cybernetic gear pack entries are complete and use stable catalog ids", () => {
  const packDir = path.resolve("src/packs/gear");
  const cybernetics = readdirSync(packDir)
    .filter(file => file.endsWith(".yml"))
    .map(file => JSON.parse(readFileSync(path.join(packDir, file), "utf8")))
    .filter(item => item.type === "gear" && item.system?.subtype === "cybernetic");

  assert.equal(cybernetics.length, 29);
  const stableIds = new Set(cybernetics.map(item => item.flags?.mwd?.stableId));
  assert.equal(stableIds.size, 29);
  assert.equal(stableIds.has("cybernetic-tactical-coprocessor"), true);

  const tactical = cybernetics.find(item => item.name === "Tactical Coprocessor");
  assert.equal(tactical._id, "8a11e44a3730a780");
  assert.equal(tactical.system.activation, "toggle");
  assert.equal(tactical.system.active, false);
  assert.equal(tactical.system.load, 2);
  assert.equal(tactical.system.bodySlot, "neural");

  const bionicEye = cybernetics.find(item => item.name === "Bionic Eye Replacement");
  assert.equal(bionicEye.system.activation, "passive");
  assert.equal(bionicEye.system.active, true);
  assert.equal(bionicEye.system.load, 0);
});
