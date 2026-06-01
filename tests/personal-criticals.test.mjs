import test from "node:test";
import assert from "node:assert/strict";

function setPath(object, path, value) {
  const parts = path.split(".");
  let cursor = object;
  while (parts.length > 1) {
    const part = parts.shift();
    cursor[part] ??= {};
    cursor = cursor[part];
  }
  cursor[parts[0]] = value;
}

function actor(overrides = {}) {
  const items = new Map(overrides.items ?? []);
  return {
    type: "character",
    name: "Test Pilot",
    uuid: "Actor.test",
    items,
    statuses: new Set(overrides.statuses ?? []),
    system: {
      speed: overrides.speed ?? 12,
      burn: { value: 0, overloaded: false },
      criticals: overrides.criticals ?? [],
    },
    async update(update) {
      for (const [path, value] of Object.entries(update)) setPath(this, path, value);
    },
    async toggleStatusEffect(statusId, { active } = {}) {
      if (active) this.statuses.add(statusId);
      else this.statuses.delete(statusId);
    },
  };
}

globalThis.foundry ??= { utils: {} };
globalThis.foundry.utils.deepClone ??= value => JSON.parse(JSON.stringify(value ?? null));
globalThis.foundry.utils.randomID ??= () => "test-id";
globalThis.CONFIG ??= { statusEffects: [] };

const {
  applyPersonalCriticalToActor,
  buildPersonalCritRecord,
  getActivePersonalCrits,
  getPersonalSpeedState,
  previewPersonalCritical,
  removePersonalCrit,
  rollPersonalCriticalBand,
  rollPersonalCriticalFamily,
  severityFromMargin,
} = await import("../src/modules/mwd/personal-criticals.js");
const { buildPersonalActiveCriticalsContext, buildPersonalSpeedContext } = await import("../src/modules/sheets/actor-sheet-support.js");
const { getPersonalCriticalGateState } = await import("../src/modules/mwd/personal-critical-gates.js");
const { resolvePersonalCritRemedyIntent } = await import("../src/modules/mwd/personal-crit-intents.js");

test("personal critical severity follows net-hit margin bands", () => {
  assert.equal(severityFromMargin(0), 0);
  assert.equal(severityFromMargin(2), 0);
  assert.equal(severityFromMargin(3), 1);
  assert.equal(severityFromMargin(5), 2);
  assert.equal(severityFromMargin(7), 3);
});

test("personal critical band thresholds use 2d6 plus severity", async () => {
  assert.equal((await rollPersonalCriticalBand({ severity: 0, rollTotal: 9 })).band, "none");
  assert.equal((await rollPersonalCriticalBand({ severity: 0, rollTotal: 10 })).band, "minor");
  assert.equal((await rollPersonalCriticalBand({ severity: 0, rollTotal: 11 })).band, "moderate");
  assert.equal((await rollPersonalCriticalBand({ severity: 0, rollTotal: 12 })).band, "severe");
  assert.equal((await rollPersonalCriticalBand({ severity: 1, rollTotal: 9 })).band, "minor");
});

test("personal critical roll helpers treat null as no override", async () => {
  const band = await rollPersonalCriticalBand({ severity: 2, rollTotal: null });
  assert.equal(band.roll.total, 2);
  assert.deepEqual(band.roll.results, [1, 1]);
  assert.equal(band.total, 4);

  const family = await rollPersonalCriticalFamily({ rollTotal: null });
  assert.equal(family.roll.total, 1);
  assert.deepEqual(family.roll.results, [1]);
});

test("personal critical preview builds prepared records and reuses them", async () => {
  const target = actor();
  const preview = await previewPersonalCritical({
    actor: target,
    outcome: "hit",
    netHits: 4,
    bandRollTotal: 9,
    familyRollTotal: 6,
    previewRevision: 2,
  });

  assert.equal(preview.selected, true);
  assert.equal(preview.band, "minor");
  assert.equal(preview.records[0].familyId, "shaken");
  assert.equal(preview.records[0].statusId, "shakenMinor");
  assert.equal(preview.records[0].previewRevision, 2);

  const reused = await previewPersonalCritical({
    actor: target,
    payload: { preparedCriticalRecords: preview.records, previewRevision: 2 },
    outcome: "hit",
    netHits: 4,
  });
  assert.equal(reused.prepared, true);
  assert.equal(reused.records[0].id, preview.records[0].id);
});

test("personal critical apply stores records, statuses, burn, and gates", async () => {
  const target = actor();
  const shaken = buildPersonalCritRecord({ actor: target, familyId: "shaken", band: "severe" });
  const winded = buildPersonalCritRecord({ actor: target, familyId: "winded", band: "moderate" });

  const result = await applyPersonalCriticalToActor({ actor: target, records: [shaken, winded] });
  assert.equal(result.ok, true);
  assert.equal(target.system.criticals.length, 2);
  assert.equal(target.statuses.has("personalCritical"), true);
  assert.equal(target.statuses.has("shakenSevere"), true);
  assert.equal(target.statuses.has("windedModerate"), true);
  assert.equal(target.system.burn.value, 2);

  const gates = getPersonalCriticalGateState(target);
  assert.equal(gates.cannotAim, true);
  assert.equal(gates.cannotReact, true);
  assert.equal(gates.cannotComplex, true);

  const removed = await removePersonalCrit({ actor: target, critId: shaken.id });
  assert.equal(removed.ok, true);
  assert.equal(target.statuses.has("shakenSevere"), false);
  assert.equal(getActivePersonalCrits(target).length, 1);
});

test("personal critical speed effects produce effective speed without duplicate summary text", () => {
  const target = actor({ speed: 12 });
  const crippled = buildPersonalCritRecord({ actor: target, familyId: "crippled", band: "minor" });
  target.system.criticals = [crippled];

  assert.deepEqual(getPersonalSpeedState(target), {
    base: 12,
    modifier: -2,
    effective: 10,
    adjusted: true,
  });

  const speedContext = buildPersonalSpeedContext(target);
  assert.equal(speedContext.displayValue, "10 m");
  assert.equal(speedContext.modifierLabel, "-2 m");

  const [criticalContext] = buildPersonalActiveCriticalsContext(target);
  assert.equal(criticalContext.effectText, "-2 m movement.");
  assert.equal(criticalContext.summary, "Remedy: First Aid");
});

test("failed personal critical common-check remedies leave the critical active", async () => {
  const target = actor();
  const shaken = buildPersonalCritRecord({ actor: target, familyId: "shaken", band: "minor" });
  target.system.criticals = [shaken];

  const originalGame = globalThis.game;
  globalThis.game = {
    mwd: {
      roll: {
        execute: async () => ({
          flags: { mwd: { resolved: { outcomeModel: { passed: false } } } },
        }),
      },
    },
  };

  try {
    const result = await resolvePersonalCritRemedyIntent({
      actor: target,
      critId: shaken.id,
      remedyKey: "endure",
    });

    assert.equal(result.ok, false);
    assert.match(result.reason, /did not clear/i);
    assert.equal(target.system.criticals.length, 1);
    assert.equal(target.system.criticals[0].id, shaken.id);
  } finally {
    globalThis.game = originalGame;
  }
});

test("successful personal critical common-check remedies remove the critical", async () => {
  const target = actor();
  const shaken = buildPersonalCritRecord({ actor: target, familyId: "shaken", band: "minor" });
  target.system.criticals = [shaken];

  const originalGame = globalThis.game;
  globalThis.game = {
    mwd: {
      roll: {
        execute: async () => ({
          flags: { mwd: { resolved: { outcomeModel: { passed: true } } } },
        }),
      },
    },
  };

  try {
    const result = await resolvePersonalCritRemedyIntent({
      actor: target,
      critId: shaken.id,
      remedyKey: "endure",
    });

    assert.equal(result.ok, true);
    assert.equal(target.system.criticals.length, 0);
  } finally {
    globalThis.game = originalGame;
  }
});
