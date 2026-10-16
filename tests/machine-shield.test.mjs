import test from "node:test";
import assert from "node:assert/strict";

import { resolveMachineHitLocation } from "../src/modules/mwd/machine-hit-locations.js";
import {
  SHIELDED_STATUS_ID,
  applyMachineAttackDamage,
  previewMachineAttackDamage,
} from "../src/modules/mwd/critical-hits.js";

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

function shieldedMachine({ shielded = true } = {}) {
  return {
    type: "battlemech",
    name: "Guarded Mech",
    uuid: "Actor.guarded",
    items: new Map(),
    statuses: new Set(shielded ? [SHIELDED_STATUS_ID] : []),
    system: {
      monitors: { armor: { value: 6, max: 6 }, structure: { value: 10, max: 10 } },
      attributes: { reliability: { value: 3 } },
      mwd: {
        shock: { value: 0 },
        reliabilitySpendable: { value: 3 },
        hardpoints: [],
        locations: {
          head: { enabled: true, stress: 0, condition: 0, tags: ["cockpit"], destroyed: false },
          torso: { enabled: true, stress: 0, condition: 0, tags: ["engine"], destroyed: false },
          arms: { enabled: true, stress: 0, condition: 0, tags: ["weaponGroup"], destroyed: false },
          legs: { enabled: true, stress: 0, condition: 0, tags: ["motiveSystem"], destroyed: false },
        },
        crits: [],
      },
      weaponGroups: [],
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

const hit = (actor, damage) => ({
  damage,
  hitLocation: resolveMachineHitLocation({ actor, rollTotal: 10, armorBefore: actor.system.monitors.armor.value }),
  outcome: "hit",
  netHits: 1,
  preparedCriticalRecords: [],
});

test("the first hit on a Shielded machine loses 2 damage and ends Shielded", async () => {
  const actor = shieldedMachine();
  const result = await applyMachineAttackDamage({ actor, payload: hit(actor, 5) });

  assert.equal(result.ok, true);
  assert.deepEqual(result.shield, { consumed: true, reduction: 2 });
  assert.equal(result.adjustedIncoming, 3);
  assert.equal(actor.system.monitors.armor.value, 3);
  assert.equal(actor.statuses.has(SHIELDED_STATUS_ID), false);
  assert.deepEqual(result.damagePreview.shield, { consumed: true, reduction: 2 });

  const second = await applyMachineAttackDamage({ actor, payload: hit(actor, 5) });
  assert.deepEqual(second.shield, { consumed: false, reduction: 0 });
  assert.equal(actor.system.monitors.armor.value, 0);
  assert.equal(actor.system.monitors.structure.value, 8);
});

test("a hit smaller than the reduction is fully absorbed and still consumes Shield", async () => {
  const actor = shieldedMachine();
  const result = await applyMachineAttackDamage({ actor, payload: hit(actor, 1) });
  assert.deepEqual(result.shield, { consumed: true, reduction: 1 });
  assert.equal(actor.system.monitors.armor.value, 6);
  assert.equal(actor.statuses.has(SHIELDED_STATUS_ID), false);
});

test("previews and dry runs show the reduction without consuming Shield", async () => {
  const actor = shieldedMachine();
  const preview = previewMachineAttackDamage({ actor, payload: hit(actor, 4) });
  assert.equal(preview.adjustedIncoming, 2);
  assert.deepEqual(preview.shield, { consumed: true, reduction: 2 });

  const dryRun = await applyMachineAttackDamage({ actor, payload: hit(actor, 4), options: { dryRun: true } });
  assert.equal(dryRun.adjustedIncoming, 2);
  assert.equal(actor.statuses.has(SHIELDED_STATUS_ID), true);
  assert.equal(actor.system.monitors.armor.value, 6);
});

test("an unshielded machine takes full damage", async () => {
  const actor = shieldedMachine({ shielded: false });
  const result = await applyMachineAttackDamage({ actor, payload: hit(actor, 5) });
  assert.deepEqual(result.shield, { consumed: false, reduction: 0 });
  assert.equal(actor.system.monitors.armor.value, 1);
});

test("re-applying an already-applied payload does not touch Shield", async () => {
  const actor = shieldedMachine();
  const payload = { ...hit(actor, 5), applied: true, appliedResult: { ok: true } };
  const result = await applyMachineAttackDamage({ actor, payload });
  assert.equal(result.skipped, true);
  assert.equal(actor.statuses.has(SHIELDED_STATUS_ID), true);
});
