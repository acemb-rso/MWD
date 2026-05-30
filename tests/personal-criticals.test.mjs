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
  previewPersonalCritical,
  removePersonalCrit,
  rollPersonalCriticalBand,
  severityFromMargin,
} = await import("../src/modules/mwd/personal-criticals.js");
const { getPersonalCriticalGateState } = await import("../src/modules/mwd/personal-critical-gates.js");

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
  assert.equal(preview.records[0].familyId, "dizzy");
  assert.equal(preview.records[0].statusId, "dizzyMinor");
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
  const dizzy = buildPersonalCritRecord({ actor: target, familyId: "dizzy", band: "severe" });
  const winded = buildPersonalCritRecord({ actor: target, familyId: "winded", band: "moderate" });

  const result = await applyPersonalCriticalToActor({ actor: target, records: [dizzy, winded] });
  assert.equal(result.ok, true);
  assert.equal(target.system.criticals.length, 2);
  assert.equal(target.statuses.has("personalCritical"), true);
  assert.equal(target.statuses.has("dizzySevere"), true);
  assert.equal(target.statuses.has("windedModerate"), true);
  assert.equal(target.system.burn.value, 2);

  const gates = getPersonalCriticalGateState(target);
  assert.equal(gates.cannotAim, true);
  assert.equal(gates.cannotReact, true);
  assert.equal(gates.cannotComplex, true);

  const removed = await removePersonalCrit({ actor: target, critId: dizzy.id });
  assert.equal(removed.ok, true);
  assert.equal(target.statuses.has("dizzySevere"), false);
  assert.equal(getActivePersonalCrits(target).length, 1);
});
