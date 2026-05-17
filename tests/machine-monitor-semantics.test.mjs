import test from "node:test";
import assert from "node:assert/strict";

import {
  MACHINE_MONITOR_STORAGE_REMAINING_V1,
  collectMachineMonitorRemainingStorageUpdates,
  getDepletingMachineMonitorClickValue,
  getMachineMonitorState,
  migrateMachineMonitorStorageOnce,
} from "../src/modules/mwd/machine-monitors.js";

test("machine monitor state reads depleting values as remaining capacity", () => {
  const actor = {
    type: "battlemech",
    system: {
      monitors: {
        armor: { value: 8, max: 10 },
        structure: { value: 0, max: 12 },
      },
    },
  };

  assert.deepEqual(getMachineMonitorState(actor, "armor"), {
    max: 10,
    value: 8,
    remaining: 8,
    damageTaken: 2,
  });
  assert.deepEqual(getMachineMonitorState(actor, "structure"), {
    max: 12,
    value: 0,
    remaining: 0,
    damageTaken: 12,
  });
});

test("machine monitor migration converts legacy damage-taken values to remaining values", () => {
  const actor = {
    type: "battlemech",
    flags: {},
    system: {
      monitors: {
        armor: { value: 45, max: 45 },
        structure: { value: 5, max: 31 },
        heat: { value: 4, max: 10 },
      },
    },
  };

  assert.deepEqual(collectMachineMonitorRemainingStorageUpdates(actor), {
    "flags.mwd.machineMonitorStorage": MACHINE_MONITOR_STORAGE_REMAINING_V1,
    "system.monitors.armor.value": 0,
    "system.monitors.structure.value": 26,
  });
});

test("machine monitor migration ignores already migrated and non-machine actors", () => {
  const migrated = {
    type: "vehicle",
    flags: { mwd: { machineMonitorStorage: MACHINE_MONITOR_STORAGE_REMAINING_V1 } },
    system: { monitors: { armor: { value: 3, max: 12 }, structure: { value: 9, max: 15 } } },
  };
  const character = {
    type: "character",
    system: { monitors: { armor: { value: 0, max: 9 } } },
  };
  const npc = {
    type: "npc",
    system: { monitors: { armor: { value: 2, max: 5 } } },
  };

  assert.equal(collectMachineMonitorRemainingStorageUpdates(migrated), null);
  assert.equal(collectMachineMonitorRemainingStorageUpdates(character), null);
  assert.equal(collectMachineMonitorRemainingStorageUpdates(npc), null);
});

function readTokenBar(actor, monitorId) {
  const monitor = actor?.system?.monitors?.[monitorId] ?? {};
  return {
    value: Number(monitor.value ?? 0) || 0,
    max: Number(monitor.max ?? 0) || 0,
  };
}

test("token bars can read natural monitor values directly", () => {
  const machine = {
    type: "battlemech",
    system: {
      monitors: {
        armor: { value: 0, max: 45 },
        structure: { value: 12, max: 31 },
        heat: { value: 4, max: 10 },
      },
    },
  };
  const character = {
    type: "character",
    system: { monitors: { armor: { value: 2, max: 8 } } },
  };
  const npc = {
    type: "npc",
    system: { monitors: { armor: { value: 1, max: 5 } } },
  };

  assert.deepEqual(readTokenBar(machine, "armor"), { value: 0, max: 45 });
  assert.deepEqual(readTokenBar(machine, "structure"), { value: 12, max: 31 });
  assert.deepEqual(readTokenBar(machine, "heat"), { value: 4, max: 10 });
  assert.deepEqual(readTokenBar(character, "armor"), { value: 2, max: 8 });
  assert.deepEqual(readTokenBar(npc, "armor"), { value: 1, max: 5 });
});

test("depleting machine monitor pips can clear the final remaining point", () => {
  assert.equal(getDepletingMachineMonitorClickValue(3, 1), 1);
  assert.equal(getDepletingMachineMonitorClickValue(3, 3), 2);
  assert.equal(getDepletingMachineMonitorClickValue(1, 1), 0);
  assert.equal(getDepletingMachineMonitorClickValue(0, 1), 1);
});

test("dedicated machine monitor migration loop runs once without versioned migrations", async () => {
  let migrationSetting = "";
  let actorUpdates = 0;
  const actor = {
    type: "vehicle",
    flags: {},
    system: {
      monitors: {
        armor: { value: 12, max: 12 },
        structure: { value: 3, max: 15 },
      },
    },
    async update(update) {
      actorUpdates += 1;
      for (const [path, value] of Object.entries(update)) {
        const parts = path.split(".");
        let cursor = this;
        while (parts.length > 1) {
          const key = parts.shift();
          cursor[key] ??= {};
          cursor = cursor[key];
        }
        cursor[parts[0]] = value;
      }
    },
  };

  const first = await migrateMachineMonitorStorageOnce({
    actors: [actor],
    currentMigration: migrationSetting,
    setMigration: value => { migrationSetting = value; },
  });
  const second = await migrateMachineMonitorStorageOnce({
    actors: [actor],
    currentMigration: migrationSetting,
    setMigration: value => { migrationSetting = value; },
  });

  assert.deepEqual(first, { migrated: 1, skipped: false });
  assert.deepEqual(second, { migrated: 0, skipped: true });
  assert.equal(actorUpdates, 1);
  assert.equal(actor.system.monitors.armor.value, 0);
  assert.equal(actor.system.monitors.structure.value, 12);
  assert.equal(actor.flags.mwd.machineMonitorStorage, MACHINE_MONITOR_STORAGE_REMAINING_V1);
  assert.equal(migrationSetting, MACHINE_MONITOR_STORAGE_REMAINING_V1);
});
