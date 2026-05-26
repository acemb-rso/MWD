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

test("pilot action economy follows the assigned machine combatant during mech activation", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.getProperty ??= getProperty;
  globalThis.foundry.utils.hasProperty ??= (root, path) => getProperty(root, path) !== undefined;
  globalThis.foundry.utils.deepClone ??= deepClone;
  globalThis.foundry.utils.mergeObject ??= mergeObject;
  globalThis.Hooks ??= { on() {} };
  globalThis.CONFIG ??= { statusEffects: [] };

  let pilotBurnUpdate = null;
  const pilotActor = {
    id: "pilot-1",
    uuid: "Actor.pilot-1",
    type: "character",
    flags: {},
    items: [],
    system: {
      burn: { value: 1, overloaded: false },
      attributes: {
        reflexes: { value: 3 },
        willpower: { value: 3 },
      },
    },
    getActiveTokens: () => [],
    async update(update) {
      pilotBurnUpdate = update;
      if (Object.prototype.hasOwnProperty.call(update, "system.burn.value")) {
        this.system.burn.value = update["system.burn.value"];
      }
    },
  };
  const machineActor = {
    id: "mech-1",
    uuid: "Actor.mech-1",
    type: "battlemech",
    flags: {},
    items: [],
    system: {
      pilot: { uuid: pilotActor.uuid },
      mwd: { heat: {}, heatStatus: {} },
      monitors: { heat: { value: 0, max: 10 } },
    },
    getActiveTokens: () => [],
  };
  const actors = new Map([
    [pilotActor.id, pilotActor],
    [machineActor.id, machineActor],
  ]);
  actors.contents = [pilotActor, machineActor];

  const tokenDoc = {
    id: "mech-token",
    actor: machineActor,
    actorId: machineActor.id,
    parent: { id: "scene-1" },
  };
  let writtenState = null;
  const storedState = {
    activation: { combatId: "combat-1", combatantId: "combatant-mech", round: 1, turn: 0 },
    actionState: {
      aim: null,
      move: null,
      preparedInterrupt: null,
      usedWeaponGroupIds: [],
    },
    saRemaining: 0,
    faRemaining: 1,
    raRemaining: 1,
    saSpentThisActivation: 3,
    burnThisActivation: 0,
    attacksThisActivation: 1,
    reactionBurnSinceLastActivation: 0,
    hazards: {},
    pendingReaction: null,
    machineCritsProcessed: false,
    actionLog: [{ id: "move", label: "Move", costLabel: "1 SA" }],
    traitUsage: { activation: {}, round: {} },
  };
  const combatant = {
    id: "combatant-mech",
    actor: machineActor,
    tokenId: tokenDoc.id,
    token: tokenDoc,
    getFlag: () => writtenState ?? storedState,
    async setFlag(_scope, _key, value) {
      writtenState = value;
    },
  };
  const combatants = new Map([[combatant.id, combatant]]);
  const combat = {
    id: "combat-1",
    round: 1,
    turn: 0,
    scene: { id: "scene-1" },
    combatant,
    combatants,
    getCombatantsByToken: (tokenId) => tokenId === tokenDoc.id ? [combatant] : [],
  };

  globalThis.canvas = {
    scene: {
      id: "scene-1",
      tokens: {
        get: (id) => id === tokenDoc.id ? tokenDoc : null,
        [Symbol.iterator]: function* () { yield tokenDoc; },
      },
    },
    tokens: {
      get: () => null,
      placeables: [],
    },
  };
  globalThis.game = {
    user: { isGM: true, id: "gm-1" },
    combat,
    actors,
    scenes: new Map(),
  };

  const { PersonalCombatTracker } = await import("../src/modules/combat/personal-combat-tracker.js");

  const snapshot = PersonalCombatTracker.getSnapshot(pilotActor);
  assert.equal(snapshot.combatant.id, combatant.id);
  assert.equal(snapshot.isCurrentTurn, true);
  assert.equal(snapshot.burn.value, 1);

  const result = await PersonalCombatTracker.spendResource(pilotActor, {
    resource: "sa",
    cost: 2,
    actionId: "attack",
    actionLabel: "Attack",
    actionCostLabel: "2 SA",
    actionCategory: "complex",
  });

  assert.equal(result.ok, true);
  assert.equal(writtenState.saSpentThisActivation, 5);
  assert.equal(writtenState.attacksThisActivation, 2);
  assert.deepEqual(writtenState.actionLog.map(entry => entry.label), ["Move", "Attack"]);
  assert.deepEqual(pilotBurnUpdate, { "system.burn.value": 4 });
});

test("operated pilot lookups use the machine combatant when a duplicate pilot combatant exists", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.getProperty ??= getProperty;
  globalThis.foundry.utils.hasProperty ??= (root, path) => getProperty(root, path) !== undefined;
  globalThis.foundry.utils.deepClone ??= deepClone;
  globalThis.foundry.utils.mergeObject ??= mergeObject;
  globalThis.Hooks ??= { on() {} };
  globalThis.CONFIG ??= { statusEffects: [] };

  const pilotActor = {
    id: "pilot-dup",
    uuid: "Actor.pilot-dup",
    type: "character",
    flags: {},
    items: [],
    system: {
      burn: { value: 2, overloaded: false },
      attributes: { reflexes: { value: 3 }, willpower: { value: 3 } },
    },
    getActiveTokens: () => [],
    async update() {},
  };
  const machineActor = {
    id: "mech-dup",
    uuid: "Actor.mech-dup",
    type: "battlemech",
    flags: {},
    items: [],
    system: {
      pilot: { uuid: pilotActor.uuid },
      mwd: { heat: {}, heatStatus: {} },
      monitors: { heat: { value: 0, max: 10 } },
    },
    getActiveTokens: () => [],
  };
  const actors = new Map([[pilotActor.id, pilotActor], [machineActor.id, machineActor]]);
  actors.contents = [pilotActor, machineActor];

  const machineToken = { id: "machine-token", actor: machineActor, actorId: machineActor.id, parent: { id: "scene-1" } };
  const pilotToken = { id: "pilot-token", actor: pilotActor, actorId: pilotActor.id, parent: { id: "scene-1" } };
  const machineState = {
    activation: { combatId: "combat-dup", combatantId: "combatant-machine", round: 1, turn: 0 },
    actionState: { aim: null, move: null, preparedInterrupt: null, usedWeaponGroupIds: [] },
    saRemaining: 1,
    faRemaining: 1,
    raRemaining: 1,
    saSpentThisActivation: 2,
    burnThisActivation: 1,
    attacksThisActivation: 1,
    reactionBurnSinceLastActivation: 0,
    hazards: {},
    pendingReaction: null,
    machineCritsProcessed: true,
    actionLog: [],
    traitUsage: { activation: {}, round: {} },
  };
  const pilotState = {
    ...machineState,
    activation: { combatId: "combat-dup", combatantId: "combatant-pilot", round: 1, turn: 1 },
    saSpentThisActivation: 0,
    burnThisActivation: 0,
  };
  const machineCombatant = {
    id: "combatant-machine",
    actor: machineActor,
    tokenId: machineToken.id,
    token: machineToken,
    getFlag: () => machineState,
    async setFlag() {},
  };
  const pilotCombatant = {
    id: "combatant-pilot",
    actor: pilotActor,
    tokenId: pilotToken.id,
    token: pilotToken,
    getFlag: () => pilotState,
    async setFlag() {},
  };
  const combatants = new Map([[machineCombatant.id, machineCombatant], [pilotCombatant.id, pilotCombatant]]);
  const combat = {
    id: "combat-dup",
    round: 1,
    turn: 0,
    scene: { id: "scene-1" },
    combatant: machineCombatant,
    combatants,
    getCombatantsByToken: (tokenId) => tokenId === machineToken.id ? [machineCombatant] : tokenId === pilotToken.id ? [pilotCombatant] : [],
    async deleteEmbeddedDocuments(_type, ids) {
      for (const id of ids) combatants.delete(id);
    },
  };

  globalThis.canvas = {
    scene: {
      id: "scene-1",
      tokens: {
        get: id => id === machineToken.id ? machineToken : id === pilotToken.id ? pilotToken : null,
        [Symbol.iterator]: function* () { yield machineToken; yield pilotToken; },
      },
    },
    tokens: { get: () => null, placeables: [] },
  };
  globalThis.game = {
    user: { isGM: true, id: "gm-1" },
    combat,
    actors,
    scenes: new Map(),
  };

  const { PersonalCombatTracker } = await import("../src/modules/combat/personal-combat-tracker.js");

  const snapshot = PersonalCombatTracker.getSnapshot(pilotActor);
  assert.equal(snapshot.combatant.id, machineCombatant.id);
  assert.equal(snapshot.actionEconomyActor, pilotActor);
  assert.equal(snapshot.platformActor, machineActor);
  assert.equal(snapshot.activation.burnThisActivation, 1);

  const unit = PersonalCombatTracker.resolveActivationUnit({ actor: pilotActor, combat });
  assert.equal(unit.kind, "operatedMachine");
  assert.equal(unit.combatant.id, machineCombatant.id);
  assert.equal(unit.actingActor, pilotActor);
  assert.equal(unit.platformActor, machineActor);
});

test("GM reconciliation removes duplicate pilot combatants for operated machines", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.getProperty ??= getProperty;
  globalThis.foundry.utils.hasProperty ??= (root, path) => getProperty(root, path) !== undefined;
  globalThis.foundry.utils.deepClone ??= deepClone;
  globalThis.foundry.utils.mergeObject ??= mergeObject;
  globalThis.Hooks ??= { on() {} };
  globalThis.CONFIG ??= { statusEffects: [] };
  globalThis.ui ??= { windows: {} };
  globalThis.canvas = { scene: { id: "scene-1" }, tokens: { get: () => null, placeables: [] } };

  const pilotActor = { id: "pilot-clean", uuid: "Actor.pilot-clean", type: "character", system: { burn: { value: 0 }, attributes: {} }, getActiveTokens: () => [] };
  const machineActor = {
    id: "mech-clean",
    uuid: "Actor.mech-clean",
    type: "battlemech",
    system: { pilot: { uuid: pilotActor.uuid }, mwd: {}, monitors: {} },
    getActiveTokens: () => [],
  };
  const actors = new Map([[pilotActor.id, pilotActor], [machineActor.id, machineActor]]);
  actors.contents = [pilotActor, machineActor];
  const machineCombatant = { id: "machine-clean", actor: machineActor, tokenId: "machine-token", getFlag: () => null, async setFlag() {} };
  const pilotCombatant = { id: "pilot-clean-c", actor: pilotActor, tokenId: "pilot-token", getFlag: () => null, async setFlag() {} };
  const combatants = new Map([[machineCombatant.id, machineCombatant], [pilotCombatant.id, pilotCombatant]]);
  const combat = {
    id: "combat-clean",
    scene: { id: "scene-1" },
    combatants,
    async deleteEmbeddedDocuments(_type, ids) {
      for (const id of ids) combatants.delete(id);
    },
  };
  globalThis.game = { user: { isGM: true }, combat, actors, scenes: new Map() };

  const { PersonalCombatTracker } = await import("../src/modules/combat/personal-combat-tracker.js");
  const result = await PersonalCombatTracker.reconcileOperatedCombatants(combat);

  assert.deepEqual(result.removed, [pilotCombatant.id]);
  assert.equal(combatants.has(machineCombatant.id), true);
  assert.equal(combatants.has(pilotCombatant.id), false);
});

test("destroyed machine status marks its combatant defeated", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.getProperty ??= getProperty;
  globalThis.foundry.utils.hasProperty ??= (root, path) => getProperty(root, path) !== undefined;
  globalThis.foundry.utils.deepClone ??= deepClone;
  globalThis.foundry.utils.mergeObject ??= mergeObject;
  globalThis.Hooks ??= { on() {} };
  globalThis.CONFIG ??= { statusEffects: [] };
  globalThis.ui ??= { windows: {} };
  globalThis.canvas = { scene: { id: "scene-1" }, tokens: { get: () => null, placeables: [] } };

  const destroyedMech = {
    id: "mech-destroyed",
    type: "battlemech",
    statuses: new Set(["destroyed"]),
    system: { mwd: {} },
  };
  const activeMech = {
    id: "mech-active",
    type: "battlemech",
    statuses: new Set(),
    system: { mwd: {} },
  };
  const destroyedCombatant = { id: "c-destroyed", actor: destroyedMech, tokenId: "t-destroyed", defeated: false };
  const activeCombatant = { id: "c-active", actor: activeMech, tokenId: "t-active", defeated: true };
  const combatants = new Map([
    [destroyedCombatant.id, destroyedCombatant],
    [activeCombatant.id, activeCombatant],
  ]);
  const updates = [];
  const combat = {
    id: "combat-destroyed",
    scene: { id: "scene-1" },
    combatants,
    async updateEmbeddedDocuments(_type, payload) {
      updates.push(...payload);
      for (const update of payload) {
        const combatant = combatants.get(update._id);
        if (combatant) combatant.defeated = update.defeated;
      }
    },
  };
  globalThis.game = { user: { isGM: true }, combat, actors: new Map(), scenes: new Map() };

  const { PersonalCombatTracker } = await import("../src/modules/combat/personal-combat-tracker.js");
  const result = await PersonalCombatTracker.syncDestroyedMachineDefeatedCombatants(combat);

  assert.deepEqual(result.updated, [
    { _id: "c-destroyed", defeated: true },
    { _id: "c-active", defeated: false },
  ]);
  assert.deepEqual(updates, result.updated);
  assert.equal(destroyedCombatant.defeated, true);
  assert.equal(activeCombatant.defeated, false);
});

test("manual destroyed ActiveEffect changes queue combatant defeat sync", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.getProperty ??= getProperty;
  globalThis.foundry.utils.hasProperty ??= (root, path) => getProperty(root, path) !== undefined;
  globalThis.foundry.utils.deepClone ??= deepClone;
  globalThis.foundry.utils.mergeObject ??= mergeObject;
  globalThis.Hooks ??= { on() {} };
  globalThis.CONFIG ??= { statusEffects: [] };
  globalThis.canvas = { scene: { id: "scene-1" }, tokens: { get: () => null, placeables: [] } };

  const mech = {
    id: "mech-effect-destroyed",
    type: "battlemech",
    statuses: new Set(),
    effects: [{ statuses: new Set(["destroyed"]) }],
    system: { mwd: {} },
  };
  const combatant = { id: "c-effect-destroyed", actor: mech, tokenId: "t-effect-destroyed", defeated: false };
  const combatants = new Map([[combatant.id, combatant]]);
  const combat = {
    id: "combat-effect-destroyed",
    scene: { id: "scene-1" },
    combatants,
    async updateEmbeddedDocuments(_type, payload) {
      for (const update of payload) {
        const target = combatants.get(update._id);
        if (target) target.defeated = update.defeated;
      }
    },
  };
  globalThis.game = { user: { isGM: true }, combat, actors: new Map(), scenes: new Map() };

  const { PersonalCombatTracker } = await import("../src/modules/combat/personal-combat-tracker.js");
  PersonalCombatTracker._onActiveEffectChange({ parent: mech, statuses: new Set(["destroyed"]) });
  await Promise.resolve();

  assert.equal(combatant.defeated, true);
});

test("duplicate pilot finalization and turn fallback do not cool burn", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.getProperty ??= getProperty;
  globalThis.foundry.utils.hasProperty ??= (root, path) => getProperty(root, path) !== undefined;
  globalThis.foundry.utils.deepClone ??= deepClone;
  globalThis.foundry.utils.mergeObject ??= mergeObject;
  globalThis.Hooks ??= { on() {} };
  globalThis.CONFIG ??= { statusEffects: [] };
  globalThis.canvas = { scene: { id: "scene-1" }, tokens: { get: () => null, placeables: [] } };

  let burnUpdate = null;
  const pilotActor = {
    id: "pilot-skip",
    uuid: "Actor.pilot-skip",
    type: "character",
    flags: {},
    items: [],
    system: { burn: { value: 5, overloaded: false }, attributes: { reflexes: { value: 3 }, willpower: { value: 3 } } },
    getActiveTokens: () => [],
    async update(update) { burnUpdate = update; },
  };
  const machineActor = {
    id: "mech-skip",
    uuid: "Actor.mech-skip",
    type: "battlemech",
    flags: {},
    items: [],
    system: { pilot: { uuid: pilotActor.uuid }, mwd: { heat: {}, heatStatus: {} }, monitors: { heat: { value: 0 } } },
    getActiveTokens: () => [],
  };
  const actors = new Map([[pilotActor.id, pilotActor], [machineActor.id, machineActor]]);
  actors.contents = [pilotActor, machineActor];

  const machineCombatant = { id: "machine-skip", actor: machineActor, tokenId: "machine-token", getFlag: () => null, async setFlag() {} };
  const pilotCombatant = {
    id: "pilot-skip-c",
    actor: pilotActor,
    tokenId: "pilot-token",
    getFlag: () => ({
      activation: { combatId: "combat-skip", combatantId: "pilot-skip-c", round: 1, turn: 1 },
      saSpentThisActivation: 0,
      burnThisActivation: 0,
      reactionBurnSinceLastActivation: 0,
      traitUsage: { activation: {}, round: {} },
    }),
    async setFlag() {},
  };
  const combatants = new Map([[machineCombatant.id, machineCombatant], [pilotCombatant.id, pilotCombatant]]);
  let nextTurnCalled = false;
  const combat = {
    id: "combat-skip",
    round: 1,
    turn: 1,
    scene: { id: "scene-1" },
    combatant: pilotCombatant,
    combatants,
    async deleteEmbeddedDocuments(_type, ids) {
      for (const id of ids) combatants.delete(id);
    },
    async nextTurn() {
      nextTurnCalled = true;
    },
  };
  globalThis.game = { user: { isGM: true }, combat, actors, scenes: new Map() };

  const { PersonalCombatTracker } = await import("../src/modules/combat/personal-combat-tracker.js");

  await PersonalCombatTracker.finalizeActivation(combat, pilotCombatant.id);
  assert.equal(burnUpdate, null);

  const skipped = await PersonalCombatTracker._skipDuplicatePilotTurn(combat);
  assert.equal(skipped, true);
  assert.equal(nextTurnCalled, true);
  assert.deepEqual(PersonalCombatTracker._lastActivationByCombat.get(combat.id), {
    combatId: "combat-skip",
    combatantId: pilotCombatant.id,
    round: 1,
    turn: 1,
  });
});

test("removeActivationLogEntry refunds tracked activation costs and burn", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.getProperty ??= getProperty;
  globalThis.foundry.utils.hasProperty ??= (root, path) => getProperty(root, path) !== undefined;
  globalThis.foundry.utils.deepClone ??= deepClone;
  globalThis.foundry.utils.mergeObject ??= mergeObject;
  globalThis.Hooks ??= { on() {} };
  globalThis.CONFIG ??= { statusEffects: [] };
  globalThis.canvas = { scene: { id: "scene-1" }, tokens: { get: () => null, placeables: [] } };
  globalThis.game = {
    user: { isGM: true, id: "gm-1" },
    combat: null,
    actors: new Map(),
    scenes: new Map(),
  };

  const { PersonalCombatTracker } = await import("../src/modules/combat/personal-combat-tracker.js");

  const actor = {
    id: "actor-remove",
    type: "character",
    system: {
      burn: { value: 4, overloaded: false },
      attributes: {
        reflexes: { value: 3 },
        willpower: { value: 3 },
      },
    },
    async update(update) {
      if (Object.prototype.hasOwnProperty.call(update, "system.burn.value")) {
        this.system.burn.value = update["system.burn.value"];
      }
    },
  };
  const combatant = {
    id: "combatant-remove",
    async setFlag(_scope, _key, value) {
      state = value;
    },
  };
  let state = {
    activation: { combatId: "combat-remove", combatantId: combatant.id, round: 1, turn: 0 },
    actionState: {
      aim: null,
      move: { moved: true },
      preparedInterrupt: null,
      usedWeaponGroupIds: [],
    },
    saRemaining: 0,
    faRemaining: 1,
    raRemaining: 1,
    saSpentThisActivation: 5,
    burnThisActivation: 3,
    attacksThisActivation: 2,
    reactionBurnSinceLastActivation: 0,
    hazards: {},
    pendingReaction: null,
    machineCritsProcessed: false,
    traitUsage: { activation: {}, round: {} },
    actionLog: [
      { id: "move", label: "Move", costLabel: "1 SA", resource: "sa", cost: 1, saSpentDelta: 1 },
      {
        id: "attack",
        label: "Attack",
        costLabel: "2 SA",
        resource: "sa",
        cost: 2,
        saSpentDelta: 2,
        attackDelta: 1,
        burnThisActivationDelta: 3,
        actorBurnDelta: 3,
      },
    ],
  };

  const originalGetSnapshot = PersonalCombatTracker.getSnapshot;
  PersonalCombatTracker.getSnapshot = () => ({
    hasCombatant: true,
    isCurrentTurn: true,
    combatant,
    token: null,
    state: deepClone(state),
  });

  try {
    const result = await PersonalCombatTracker.removeActivationLogEntry(actor, { index: 1 });

    assert.equal(result.ok, true);
    assert.equal(state.saSpentThisActivation, 3);
    assert.equal(state.saRemaining, 0);
    assert.equal(state.attacksThisActivation, 1);
    assert.equal(state.burnThisActivation, 0);
    assert.equal(actor.system.burn.value, 1);
    assert.deepEqual(state.actionLog.map(entry => entry.label), ["Move"]);
  } finally {
    PersonalCombatTracker.getSnapshot = originalGetSnapshot;
  }
});

test("removeActivationLogEntry refunds free actions", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.getProperty ??= getProperty;
  globalThis.foundry.utils.hasProperty ??= (root, path) => getProperty(root, path) !== undefined;
  globalThis.foundry.utils.deepClone ??= deepClone;
  globalThis.foundry.utils.mergeObject ??= mergeObject;
  globalThis.Hooks ??= { on() {} };
  globalThis.CONFIG ??= { statusEffects: [] };
  globalThis.canvas = { scene: { id: "scene-1" }, tokens: { get: () => null, placeables: [] } };
  globalThis.game = {
    user: { isGM: true, id: "gm-1" },
    combat: null,
    actors: new Map(),
    scenes: new Map(),
  };

  const { PersonalCombatTracker } = await import("../src/modules/combat/personal-combat-tracker.js");
  const actor = {
    id: "actor-free-remove",
    type: "character",
    system: { burn: { value: 0, overloaded: false }, attributes: {} },
    async update() {},
  };
  const combatant = {
    id: "combatant-free-remove",
    async setFlag(_scope, _key, value) {
      state = value;
    },
  };
  let state = {
    activation: { combatId: "combat-remove", combatantId: combatant.id, round: 1, turn: 0 },
    actionState: {
      aim: null,
      move: null,
      preparedInterrupt: null,
      usedWeaponGroupIds: [],
    },
    saRemaining: 3,
    faRemaining: 0,
    raRemaining: 1,
    saSpentThisActivation: 0,
    burnThisActivation: 0,
    attacksThisActivation: 0,
    reactionBurnSinceLastActivation: 0,
    hazards: {},
    pendingReaction: null,
    machineCritsProcessed: false,
    traitUsage: { activation: {}, round: {} },
    actionLog: [{ id: "readyItem", label: "Ready Item", costLabel: "Free" }],
  };

  const originalGetSnapshot = PersonalCombatTracker.getSnapshot;
  PersonalCombatTracker.getSnapshot = () => ({
    hasCombatant: true,
    isCurrentTurn: true,
    combatant,
    token: null,
    state: deepClone(state),
  });

  try {
    const result = await PersonalCombatTracker.removeActivationLogEntry(actor, { index: 0 });

    assert.equal(result.ok, true);
    assert.equal(state.faRemaining, 1);
    assert.deepEqual(state.actionLog, []);
  } finally {
    PersonalCombatTracker.getSnapshot = originalGetSnapshot;
  }
});

test("ending a tracked mech activation applies pending heat to the mech", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.getProperty ??= getProperty;
  globalThis.foundry.utils.hasProperty ??= (root, path) => getProperty(root, path) !== undefined;
  globalThis.foundry.utils.deepClone ??= deepClone;
  globalThis.foundry.utils.mergeObject ??= mergeObject;
  globalThis.Hooks ??= { on() {} };
  globalThis.CONFIG ??= { statusEffects: [] };
  globalThis.ChatMessage ??= { create: async () => null, getSpeaker: () => ({}) };

  const pilotActor = {
    id: "pilot-heat",
    uuid: "Actor.pilot-heat",
    type: "character",
    flags: {},
    items: [],
    system: {
      burn: { value: 0, overloaded: false },
      attributes: {
        reflexes: { value: 3 },
        willpower: { value: 3 },
      },
    },
    getActiveTokens: () => [],
    async update(update) {
      if (Object.prototype.hasOwnProperty.call(update, "system.burn.value")) {
        this.system.burn.value = update["system.burn.value"];
      }
    },
    async setFlag() {},
  };
  const machineActor = {
    id: "mech-heat",
    uuid: "Actor.mech-heat",
    type: "battlemech",
    name: "Heat Mech",
    flags: {},
    items: [],
    system: {
      pilot: { uuid: pilotActor.uuid },
      attributes: {
        chassis: { value: 4 },
        reliability: { value: 3 },
      },
      hybrid: { heat: { dissipation: 1 } },
      monitors: { heat: { value: 4, max: 10 } },
      mwd: {
        heat: {
          current: 4,
          pendingGenerated: 3,
          thresholds: { runningHot: 3, overheated: 5, shutdown: 7 },
        },
        heatStatus: {},
        crits: [],
        locations: {},
      },
    },
    getActiveTokens: () => [],
    async update(update) {
      for (const [path, value] of Object.entries(update)) {
        const keys = path.replace(/^system\./, "").split(".");
        let cursor = this.system;
        while (keys.length > 1) {
          const key = keys.shift();
          cursor[key] ??= {};
          cursor = cursor[key];
        }
        cursor[keys[0]] = value;
      }
    },
  };
  const actors = new Map([
    [pilotActor.id, pilotActor],
    [machineActor.id, machineActor],
  ]);
  actors.contents = [pilotActor, machineActor];

  const tokenDoc = {
    id: "mech-heat-token",
    actor: machineActor,
    actorId: machineActor.id,
    parent: { id: "scene-1" },
  };
  const storedState = {
    activation: { combatId: "combat-heat", combatantId: "combatant-mech-heat", round: 1, turn: 0 },
    actionState: { aim: null, move: null, preparedInterrupt: null, usedWeaponGroupIds: [] },
    saRemaining: 1,
    faRemaining: 1,
    raRemaining: 1,
    saSpentThisActivation: 2,
    burnThisActivation: 0,
    attacksThisActivation: 1,
    reactionBurnSinceLastActivation: 0,
    hazards: {},
    pendingReaction: null,
    machineCritsProcessed: true,
    actionLog: [],
    traitUsage: { activation: {}, round: {} },
  };
  const combatant = {
    id: "combatant-mech-heat",
    actor: machineActor,
    tokenId: tokenDoc.id,
    token: tokenDoc,
    getFlag: () => storedState,
    async setFlag() {},
  };
  const combatants = new Map([[combatant.id, combatant]]);
  const combat = {
    id: "combat-heat",
    round: 1,
    turn: 0,
    scene: { id: "scene-1" },
    combatant,
    combatants,
    getCombatantsByToken: (tokenId) => tokenId === tokenDoc.id ? [combatant] : [],
  };

  globalThis.canvas = {
    scene: {
      id: "scene-1",
      tokens: {
        get: (id) => id === tokenDoc.id ? tokenDoc : null,
        [Symbol.iterator]: function* () { yield tokenDoc; },
      },
    },
    tokens: { get: () => null, placeables: [] },
  };
  globalThis.game = {
    user: { isGM: true, id: "gm-1" },
    combat,
    actors,
    scenes: new Map(),
  };

  const { PersonalCombatTracker } = await import("../src/modules/combat/personal-combat-tracker.js");

  PersonalCombatTracker.getSnapshot(pilotActor);
  await PersonalCombatTracker.finalizeActivation(combat, combatant.id);

  assert.equal(machineActor.system.monitors.heat.value, 6);
  assert.equal(machineActor.system.mwd.heat.current, 6);
  assert.equal(machineActor.system.mwd.heat.pendingGenerated, 0);
});
