import test from "node:test";
import assert from "node:assert/strict";

import {
  getDefaultStatusConditionCatalog,
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
  const armDestroyed = getStatusConditionDefinition("armDestroyed", catalog);
  const sensorLocked = getStatusConditionDefinition("sensorLocked", catalog);

  assert.equal(unstable.actorGroup, "machine");
  assert.equal(unstable.category, "stability");
  assert.deepEqual(unstable.tags, ["movement", "piloting", "knockdown"]);
  assert.equal(machineCritical.actorGroup, "machine");
  assert.equal(machineCritical.managed, true);
  assert.equal(armDestroyed.actorGroup, "battlemech");
  assert.equal(sensorLocked.category, "sensor");
  assert.ok(sensorLocked.tags.includes("targeted"));
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
  assert.ok(vehicleStatuses.includes("unstable"));
  assert.ok(!vehicleStatuses.includes("armDestroyed"));
  assert.ok(battlemechStatuses.includes("armDestroyed"));
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
    getActiveStatusSummaries(actor("battlemech", ["machineCritical", "sensorBlind", "oldWorldStatus"])),
    [
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
