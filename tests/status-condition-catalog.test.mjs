import test from "node:test";
import assert from "node:assert/strict";

import {
  ensureStatusConditionCatalogDefaults,
  getDefaultStatusConditionCatalog,
  getStatusConditionCatalog,
  getStatusConditionDefinition,
  normalizeStatusConditionCatalog,
  normalizeStatusTags,
} from "../src/modules/status/status-condition-catalog.js";
import { StatusEffectsProvider } from "../src/modules/modifiers/providers/status-effects.js";
import {
  applyManagedStatusUpdate,
  getActiveStatusSummaries,
  getToggleableStatusEffects,
  getStatusInstanceMetadata,
} from "../src/modules/dialog/token-status-dialog.js";

function actor(type, statuses = []) {
  const effects = statuses.map(statusId => ({
    id: `effect-${statusId}`,
    statuses: new Set([statusId]),
    flags: {},
    async update(update) {
      const value = update["flags.mwd.status"];
      if (value) this.flags.mwd = { status: value };
    },
  }));

  return {
    type,
    statuses: new Set(statuses),
    effects,
    system: {},
    async toggleStatusEffect(statusId, { active } = {}) {
      if (active) {
        this.statuses.add(statusId);
        if (!this.effects.find(effect => effect.statuses?.has?.(statusId))) {
          this.effects.push({
            id: `effect-${statusId}`,
            statuses: new Set([statusId]),
            flags: {},
            async update(update) {
              const value = update["flags.mwd.status"];
              if (value) this.flags.mwd = { status: value };
            },
          });
        }
      } else {
        this.statuses.delete(statusId);
        this.effects = this.effects.filter(effect => !effect.statuses?.has?.(statusId));
      }
    },
  };
}

test("default machine catalog includes mechanic-ready BattleMech statuses", () => {
  const catalog = getDefaultStatusConditionCatalog();
  const unstable = getStatusConditionDefinition("unstable", catalog);
  const machineCritical = getStatusConditionDefinition("machineCritical", catalog);
  const destroyed = getStatusConditionDefinition("destroyed", catalog);
  const armDestroyed = getStatusConditionDefinition("armDestroyed", catalog);
  const sensorLocked = getStatusConditionDefinition("sensorLocked", catalog);

  assert.equal(unstable.actorGroup, "machine");
  assert.equal(unstable.category, "stability");
  assert.deepEqual(unstable.tags, ["movement", "piloting", "knockdown"]);
  assert.equal(machineCritical.actorGroup, "machine");
  assert.equal(machineCritical.managed, true);
  assert.equal(destroyed.actorGroup, "machine");
  assert.equal(destroyed.manual, true);
  assert.equal(destroyed.category, "damage");
  assert.ok(destroyed.tags.includes("ruined"));
  assert.equal(armDestroyed.actorGroup, "battlemech");
  assert.equal(sensorLocked.category, "sensor");
  assert.ok(sensorLocked.tags.includes("targeted"));
});

test("default person catalog includes personal critical marker and band statuses", () => {
  const catalog = getDefaultStatusConditionCatalog();
  const marker = getStatusConditionDefinition("personalCritical", catalog);
  assert.equal(marker.actorGroup, "person");
  assert.equal(marker.managed, true);
  assert.equal(marker.manual, false);

  for (const statusId of [
    "windedMinor", "windedModerate", "windedSevere",
    "concussionMinor", "concussionModerate", "concussionSevere",
    "crippledMinor", "crippledModerate", "crippledSevere",
    "hamperedMinor", "hamperedModerate", "hamperedSevere",
    "offbalanceMinor", "offbalanceModerate", "offbalanceSevere",
    "dizzyMinor", "dizzyModerate", "dizzySevere",
  ]) {
    const entry = getStatusConditionDefinition(statusId, catalog);
    assert.equal(entry.actorGroup, "person", statusId);
    assert.equal(entry.managed, true, statusId);
    assert.ok(entry.tags.includes("personalCritical"), statusId);
  }
});

test("default person hazard and tactical statuses link to mechanics-backed modifier keys", () => {
  const catalog = getDefaultStatusConditionCatalog();
  const expected = new Map([
    ["deafened", "deafened"],
    ["hidden", "hidden"],
    ["suppressed", "suppressed"],
    ["grappled", "grappled"],
    ["stunned", "stunned"],
    ["onFire", "onFire"],
    ["drugged", "drugged"],
    ["radiation", "radiation"],
  ]);

  for (const [statusId, modifierKey] of expected.entries()) {
    assert.equal(getStatusConditionDefinition(statusId, catalog)?.modifierKey, modifierKey);
  }
});

test("catalog validation catches invalid actor groups, duplicates, blanks, and unknown modifier keys", () => {
  assert.throws(() => normalizeStatusConditionCatalog([
    { id: "", label: "No Id", actorGroup: "machine" },
  ], { strict: true }), /id cannot be blank/);

  assert.throws(() => normalizeStatusConditionCatalog([
    { id: "bad", label: "Bad", actorGroup: "hovercraft" },
  ], { strict: true }), /actorGroup/);

  assert.throws(() => normalizeStatusConditionCatalog([
    { id: "one", label: "One", actorGroup: "machine" },
    { id: "one", label: "Duplicate", actorGroup: "machine" },
  ], { strict: true }), /duplicate id/);

  assert.throws(() => normalizeStatusConditionCatalog([
    { id: "badMod", label: "Bad Mod", actorGroup: "person", modifierKey: "notARealStatus" },
  ], { strict: true }), /modifierKey/);
});

test("status tags normalize consistently from strings and arrays", () => {
  assert.deepEqual(
    normalizeStatusTags("movement, selfInduced, mount scoped, movement"),
    ["movement", "selfInduced", "mountScoped"]
  );
  assert.deepEqual(
    normalizeStatusTags(["Sensor", "range-limit", "sensor"]),
    ["sensor", "rangeLimit"]
  );
});

test("actor-aware status filtering separates person, machine, and BattleMech-only entries", () => {
  globalThis.CONFIG = { statusEffects: [] };

  const characterStatuses = getToggleableStatusEffects(actor("character")).map(status => status.id);
  const vehicleStatuses = getToggleableStatusEffects(actor("vehicle")).map(status => status.id);
  const battlemechStatuses = getToggleableStatusEffects(actor("battlemech")).map(status => status.id);

  assert.ok(characterStatuses.includes("prone"));
  assert.ok(!characterStatuses.includes("unstable"));
  assert.ok(!characterStatuses.includes("destroyed"));
  assert.ok(vehicleStatuses.includes("destroyed"));
  assert.ok(vehicleStatuses.includes("unstable"));
  assert.ok(!vehicleStatuses.includes("armDestroyed"));
  assert.ok(battlemechStatuses.includes("destroyed"));
  assert.ok(battlemechStatuses.includes("armDestroyed"));
});

test("saved world status catalogs merge newly shipped defaults like destroyed", async () => {
  globalThis.CONFIG = { statusEffects: [] };

  const previousGame = globalThis.game;
  let storedCatalog = getDefaultStatusConditionCatalog()
    .filter(entry => entry.id !== "destroyed");

  globalThis.game = {
    settings: {
      settings: new Set(["mwd.statusConditionCatalog"]),
      get(system, key) {
        assert.equal(system, "mwd");
        assert.equal(key, "statusConditionCatalog");
        return storedCatalog;
      },
      async set(system, key, value) {
        assert.equal(system, "mwd");
        assert.equal(key, "statusConditionCatalog");
        storedCatalog = value;
        return value;
      },
    },
  };

  try {
    assert.ok(getStatusConditionCatalog().some(entry => entry.id === "destroyed"));
    assert.ok(getToggleableStatusEffects(actor("battlemech")).some(status => status.id === "destroyed"));

    await ensureStatusConditionCatalogDefaults();
    assert.ok(storedCatalog.some(entry => entry.id === "destroyed"));
  } finally {
    globalThis.game = previousGame;
  }
});

test("active uncataloged statuses remain visible and removable", () => {
  globalThis.CONFIG = { statusEffects: [] };

  const statuses = getToggleableStatusEffects(actor("vehicle", ["oldWorldStatus"]));
  const legacy = statuses.find(status => status.id === "oldWorldStatus");

  assert.equal(legacy.active, true);
  assert.equal(legacy.legacy, true);
});

test("active status summaries expose labels only for active statuses", () => {
  globalThis.CONFIG = { statusEffects: [] };

  assert.deepEqual(
    getActiveStatusSummaries(actor("battlemech", ["machineCritical", "destroyed", "sensorBlind", "oldWorldStatus"])),
    [
      { id: "destroyed", label: "Destroyed" },
      { id: "machineCritical", label: "Machine Critical" },
      { id: "sensorBlind", label: "Sensor Blind" },
      { id: "oldWorldStatus", label: "Old World Status" },
    ],
  );
});

test("visual-only statuses emit no modifiers while existing mechanical statuses still do", () => {
  const provider = new StatusEffectsProvider();

  const visualMods = provider.collect({ actor: actor("battlemech", ["unstable"]) });
  const criticalMods = provider.collect({ actor: actor("battlemech", ["machineCritical"]) });
  const proneMods = provider.collect({ actor: actor("character", ["prone"]) });

  assert.deepEqual(visualMods, []);
  assert.deepEqual(criticalMods, []);
  assert.ok(proneMods.some(mod => mod.label === "Prone" && mod.value === -2));
});

test("status modifiers use granular domains without double-counting broad aliases", () => {
  const provider = new StatusEffectsProvider();

  const proneMods = provider.collect({ actor: actor("character", ["prone"]), domains: ["physical", "combat", "attack.melee"] });
  assert.equal(proneMods.length, 1);
  assert.equal(proneMods[0].value, -2);
  assert.equal(proneMods[0].domain, "physical");

  const hiddenStealth = provider.collect({ actor: actor("character", ["hidden"]), domains: ["physical", "skill.stealth"] });
  assert.deepEqual(hiddenStealth.map(mod => [mod.label, mod.value, mod.domain]), [["Hidden", 2, "skill.stealth"]]);

  const hiddenAttack = provider.collect({ actor: actor("character", ["hidden"]), domains: ["physical", "attack.ranged"] });
  assert.deepEqual(hiddenAttack, []);

  const suppressedRanged = provider.collect({ actor: actor("character", ["suppressed"]), domains: ["physical", "attack.ranged"] });
  assert.equal(suppressedRanged.length, 1);
  assert.equal(suppressedRanged[0].value, -2);
  assert.equal(suppressedRanged[0].domain, "attack.ranged");

  const blindedAcquire = provider.collect({ actor: actor("character", ["blinded"]), domains: ["mental", "sensor.acquire"] });
  assert.equal(blindedAcquire.length, 1);
  assert.equal(blindedAcquire[0].value, -3);
  assert.equal(blindedAcquire[0].domain, "sensor.acquire");

  const dizzy = provider.collect({ actor: actor("character", ["dizzySevere"]), domains: ["physical"] });
  assert.deepEqual(dizzy, []);

  const offBalance = provider.collect({ actor: actor("character", ["offbalanceModerate"]), domains: ["physical", "attack"] });
  assert.equal(offBalance.length, 1);
  assert.equal(offBalance[0].label, "Off Balance II");
  assert.equal(offBalance[0].value, -4);
});

test("applying catalog statuses stores future mechanics metadata", async () => {
  const target = actor("battlemech");

  await applyManagedStatusUpdate({
    actor: target,
    statusId: "weaponFailure",
    active: true,
    metadata: {
      scope: "Right arm PPC",
      notes: "Cleared with a repair action.",
    },
  });

  const metadata = getStatusInstanceMetadata(target, "weaponFailure");
  assert.equal(target.statuses.has("weaponFailure"), true);
  assert.equal(metadata.id, "weaponFailure");
  assert.equal(metadata.category, "weapon");
  assert.ok(metadata.tags.includes("weapon"));
  assert.equal(metadata.scope, "Right arm PPC");
  assert.equal(metadata.notes, "Cleared with a repair action.");
});
