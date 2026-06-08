import test from "node:test";
import assert from "node:assert/strict";

import { describeMachineCriticalEffect, getMachineAttackRestriction } from "../src/modules/mwd/machine-crit-effects.js";
import { getMachinePilotingDiceModifier } from "../src/modules/mwd/machine-state-effects.js";
import { burnModifier } from "../src/modules/modifiers/providers/burn-modifier.js";
import { ConditionModifiersProvider } from "../src/modules/modifiers/providers/conditions.js";
import { MachineStateEffectsProvider } from "../src/modules/modifiers/providers/machine-state-effects.js";
import { StatusEffectsProvider } from "../src/modules/modifiers/providers/status-effects.js";

function buildActor(overrides = {}) {
  return {
    type: "battlemech",
    name: "Crit Tester",
    items: overrides.items ?? new Map(),
    system: {
      attributes: {
        reflexes: { value: 4 },
        handling: { value: 3 },
        system: { value: 3 },
      },
      skills: {
        piloting: { rating: 2, bonus: 0 },
      },
      mwd: {
        crits: overrides.crits ?? [],
        hardpoints: overrides.hardpoints ?? [],
      },
      weaponGroups: overrides.weaponGroups ?? [],
    },
  };
}

test("unstable criticals now penalize Piloting dice instead of DN", async () => {
  globalThis.foundry = {
    utils: {
      deepClone: value => structuredClone(value),
      duplicate: value => structuredClone(value),
      mergeObject: (left, right) => ({ ...(left ?? {}), ...(right ?? {}) }),
    },
  };
  globalThis.game = { settings: { get: () => null } };
  const { resolveSkill } = await import("../src/modules/roll/intent/resolve-skill.js");
  const actor = buildActor({
    crits: [{ id: "crit-1", key: "internalShock", label: "Internal Shock", statusId: "unstable", active: true }],
  });

  const resolved = await resolveSkill({
    actor,
    payload: { key: "piloting", dn: 1 },
  });

  assert.equal(resolved.difficulty.dn, 1);
  assert.equal(resolved.dn.total, 1);
  assert.equal(getMachinePilotingDiceModifier(actor), -2);

  delete globalThis.game;
  delete globalThis.foundry;
});

test("machine piloting checks use machine handling plus linked pilot piloting", async () => {
  globalThis.foundry = {
    utils: {
      deepClone: value => structuredClone(value),
      duplicate: value => structuredClone(value),
      mergeObject: (left, right) => ({ ...(left ?? {}), ...(right ?? {}) }),
    },
  };
  const { resolveSkill } = await import("../src/modules/roll/intent/resolve-skill.js");
  const actor = buildActor();
  actor.uuid = "Actor.machine";
  actor.system.pilot = { uuid: "Actor.pilot" };
  actor.system.attributes.handling.value = 4;
  actor.system.skills.piloting.rating = 0;

  const pilot = {
    id: "pilot",
    uuid: "Actor.pilot",
    type: "character",
    name: "Linked Pilot",
    system: {
      attributes: { reflexes: { value: 1 } },
      skills: { piloting: { rating: 5, bonus: 1 } },
    },
  };
  const previousFromUuid = globalThis.fromUuid;
  globalThis.fromUuid = async uuid => uuid === pilot.uuid ? pilot : null;

  try {
    const resolved = await resolveSkill({
      actor,
      payload: { key: "piloting", dn: 1 },
    });

    assert.equal(resolved.pool.attribute, 4);
    assert.equal(resolved.pool.skill, 5);
    assert.equal(resolved.pool.bonus, 1);
    assert.equal(resolved.rollActor, pilot);
    assert.equal(resolved.data.operatorActorUuid, pilot.uuid);
  } finally {
    globalThis.fromUuid = previousFromUuid;
    delete globalThis.foundry;
  }
});

test("machine pilot checks can roll selected machine attribute with no trained skill", async () => {
  globalThis.foundry = {
    utils: {
      deepClone: value => structuredClone(value),
      duplicate: value => structuredClone(value),
      mergeObject: (left, right) => ({ ...(left ?? {}), ...(right ?? {}) }),
    },
  };
  const { resolveSkill } = await import("../src/modules/roll/intent/resolve-skill.js");
  const actor = buildActor();
  actor.uuid = "Actor.machine";
  actor.system.pilot = { uuid: "Actor.pilot" };
  actor.system.attributes.handling.value = 4;
  actor.system.attributes.system.value = 3;

  const pilot = {
    id: "pilot",
    uuid: "Actor.pilot",
    type: "character",
    name: "Linked Pilot",
    system: {
      attributes: { reflexes: { value: 1 } },
      skills: {},
    },
  };
  const previousFromUuid = globalThis.fromUuid;
  globalThis.fromUuid = async uuid => uuid === pilot.uuid ? pilot : null;

  try {
    const resolved = await resolveSkill({
      actor,
      payload: { key: "none", noSkill: true, machineAttributeKey: "system", dn: 1 },
    });

    assert.equal(resolved.pool.attribute, 3);
    assert.equal(resolved.pool.skill, 0);
    assert.equal(resolved.pool.bonus, 0);
    assert.equal(resolved.pool.attribute + resolved.pool.skill + resolved.pool.bonus + resolved.pool.specialization, 3);
    assert.equal(resolved.data.skillKey, "none");
    assert.equal(resolved.rollActor, pilot);
  } finally {
    globalThis.fromUuid = previousFromUuid;
    delete globalThis.foundry;
  }
});

test("machine roll modifiers include operator condition and burn penalties", async () => {
  const machine = buildActor();
  const pilot = {
    id: "pilot",
    uuid: "Actor.pilot",
    name: "Linked Pilot",
    type: "character",
    statuses: new Set(["frightened"]),
    system: {
      burn: { value: 5 },
      derived: {
        condition: { physicalPenalty: -1, fatiguePenalty: -2 },
      },
    },
  };

  const conditionMods = new ConditionModifiersProvider().collect({
    actor: machine,
    rollActor: pilot,
    rollType: "attack",
  });
  assert.deepEqual(conditionMods.map(mod => [mod.id, mod.value]), [
    ["conditionPhysical", -1],
    ["conditionFatigue", -2],
  ]);

  const burnMods = await burnModifier.collect({ actor: machine, rollActor: pilot });
  assert.deepEqual(burnMods.map(mod => [mod.id, mod.value]), [["burn", -2]]);

  const statusMods = new StatusEffectsProvider().collect({ actor: machine, rollActor: pilot });
  assert.equal(statusMods.some(mod => mod.label === "Frightened" && mod.value === -1), true);
});

test("BattleMech overheat applies ranged attack dice penalty only to ranged attacks", () => {
  const actor = buildActor();
  actor.system.monitors = { heat: { value: 6, max: 10 } };
  actor.system.hybrid = { heat: { dissipation: 1 } };
  actor.system.attributes.chassis = { value: 4 };
  actor.system.attributes.reliability = { value: 3 };
  actor.system.mwd = {
    ...actor.system.mwd,
    heat: {
      pendingGenerated: 0,
      thresholds: { runningHot: 3, overheated: 5, shutdown: 7 },
    },
    crits: [],
    locations: {},
  };
  const provider = new MachineStateEffectsProvider();

  const rangedMods = provider.collect({
    actor,
    payload: { intent: "attack" },
    resolved: {
      intent: "attack",
      attack: {
        weapon: { category: "ranged", skill: "gunnery" },
        skill: { code: "gunnery" },
      },
    },
  });
  assert.deepEqual(
    rangedMods.filter(mod => mod.id === "battlemechHeat.rangedDice").map(mod => mod.value),
    [-2],
  );

  const meleeMods = provider.collect({
    actor,
    payload: { intent: "attack" },
    resolved: {
      intent: "attack",
      attack: {
        weapon: { category: "melee", skill: "meleeCombat" },
        skill: { code: "meleeCombat" },
      },
    },
  });
  assert.equal(meleeMods.some(mod => mod.id === "battlemechHeat.rangedDice"), false);
});

test("crit presentation differentiates automated and reminder-only effects", () => {
  const automated = describeMachineCriticalEffect({
    key: "targetingProcessorLock",
    statusId: "",
    effectText: "",
    automationMode: "",
  });
  const reminder = describeMachineCriticalEffect({
    key: "sensorOverload",
    statusId: "",
    effectText: "",
    automationMode: "",
  });

  assert.equal(automated.automationMode, "engine");
  assert.match(automated.effectText, /\+1 SA/i);
  assert.equal(reminder.automationMode, "callout");
  assert.match(reminder.effectText, /Track/i);
});

test("jammed ballistic blocks only ballistic attacks from the scoped group", () => {
  const ballisticWeapon = { id: "w-ac", system: { damageType: "ballistic", size: "small" } };
  const energyWeapon = { id: "w-ppc", system: { damageType: "energy", size: "small" } };
  const actor = buildActor({
    items: new Map([
      [ballisticWeapon.id, ballisticWeapon],
      [energyWeapon.id, energyWeapon],
    ]),
    hardpoints: [
      { id: "hp-ac", type: "penetrating", size: "small", location: "arms", itemId: "w-ac" },
      { id: "hp-ppc", type: "energy", size: "small", location: "torso", itemId: "w-ppc" },
    ],
    weaponGroups: [
      { id: "alpha", name: "Alpha", weaponIds: ["w-ac"], isPrimary: true },
      { id: "beta", name: "Beta", weaponIds: ["w-ppc"], isPrimary: false },
    ],
    crits: [{
      id: "crit-jam",
      key: "ammoFeedFaultArm",
      label: "Ammo / Feed Fault",
      locationFamily: "arms",
      statusId: "jammedBallistic",
      active: true,
    }],
  });

  const blocked = getMachineAttackRestriction(actor, { weaponGroupId: "alpha", weaponId: "w-ac" });
  const allowed = getMachineAttackRestriction(actor, { weaponGroupId: "beta", weaponId: "w-ppc" });

  assert.equal(blocked.blocked, true);
  assert.equal(allowed.blocked, false);
});
