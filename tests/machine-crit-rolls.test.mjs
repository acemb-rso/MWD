import test from "node:test";
import assert from "node:assert/strict";

import { describeMachineCriticalEffect, getMachineAttackRestriction } from "../src/modules/mwd/machine-crit-effects.js";
import { getMachinePilotingDiceModifier } from "../src/modules/mwd/machine-state-effects.js";

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
