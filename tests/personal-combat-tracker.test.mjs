import test from "node:test";
import assert from "node:assert/strict";

function getProperty(root, path) {
  return String(path ?? "")
    .split(".")
    .filter(Boolean)
    .reduce((value, key) => value?.[key], root);
}

function deepClone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function mergeObject(target, source, { inplace = true, overwrite = true } = {}) {
  const output = inplace ? target : deepClone(target);
  for (const [key, value] of Object.entries(source ?? {})) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const base = output[key] && typeof output[key] === "object" && !Array.isArray(output[key])
        ? output[key]
        : {};
      output[key] = mergeObject(base, value, { inplace: false, overwrite });
      continue;
    }

    if (overwrite || !(key in output)) {
      output[key] = deepClone(value);
    }
  }
  return output;
}

test("markWeaponGroupUsed starts from the reset snapshot state instead of reviving the stale stored activation", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.getProperty ??= getProperty;
  globalThis.foundry.utils.hasProperty ??= (root, path) => getProperty(root, path) !== undefined;
  globalThis.foundry.utils.deepClone ??= deepClone;
  globalThis.foundry.utils.mergeObject ??= mergeObject;
  globalThis.Hooks ??= { on() {} };
  globalThis.CONFIG ??= { statusEffects: [] };
  globalThis.canvas ??= { scene: { id: "scene-1" } };
  globalThis.game ??= {
    user: { isGM: true, id: "gm-1" },
    combat: null,
    actors: new Map(),
    scenes: new Map(),
  };

  const { PersonalCombatTracker } = await import("../src/modules/combat/personal-combat-tracker.js");

  const staleStoredState = {
    activation: { combatId: "combat-1", combatantId: "combatant-1", round: 1, turn: 0 },
    actionState: {
      aim: null,
      move: { moved: true },
      preparedInterrupt: null,
      usedWeaponGroupIds: ["alpha"],
    },
    saRemaining: 1,
    faRemaining: 0,
    raRemaining: 0,
    saSpentThisActivation: 4,
    burnThisActivation: 2,
    attacksThisActivation: 1,
  };

  const resetSnapshotState = {
    activation: { combatId: "combat-1", combatantId: "combatant-1", round: 2, turn: 0 },
    actionState: {
      aim: null,
      move: null,
      preparedInterrupt: null,
      usedWeaponGroupIds: [],
    },
    saRemaining: 3,
    faRemaining: 1,
    raRemaining: 1,
    saSpentThisActivation: 0,
    burnThisActivation: 0,
    attacksThisActivation: 0,
    reactionBurnSinceLastActivation: 0,
    hazards: {},
    pendingReaction: null,
    machineCritsProcessed: false,
    actionLog: [],
    traitUsage: { activation: {}, round: {} },
  };

  let writtenState = null;
  const combatant = {
    getFlag: () => staleStoredState,
    async setFlag(_scope, _key, value) {
      writtenState = value;
    },
  };

  const originalGetSnapshot = PersonalCombatTracker.getSnapshot;
  PersonalCombatTracker.getSnapshot = () => ({
    combatant,
    state: deepClone(resetSnapshotState),
  });

  try {
    const result = await PersonalCombatTracker.markWeaponGroupUsed({ id: "actor-1" }, { groupId: "beta" });

    assert.equal(result.ok, true);
    assert.ok(writtenState);
    assert.deepEqual(writtenState.activation, resetSnapshotState.activation);
    assert.equal(writtenState.actionState.move, null);
    assert.deepEqual(writtenState.actionState.usedWeaponGroupIds, ["beta"]);
    assert.equal(writtenState.saSpentThisActivation, 0);
    assert.equal(writtenState.burnThisActivation, 0);
  } finally {
    PersonalCombatTracker.getSnapshot = originalGetSnapshot;
  }
});
