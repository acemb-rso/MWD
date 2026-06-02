import test from "node:test";
import assert from "node:assert/strict";

import {
  MACHINE_ACTION_COST_RESOURCES,
  MACHINE_ACTION_IMPLEMENTATION_STATES,
  MACHINE_ACTION_RESOLVERS,
  getMachineActionDefinition,
  listMachineActionDefinitions,
} from "../src/modules/mwd/machine-action-catalog.js";

const VALID_RESOLVERS = new Set(MACHINE_ACTION_RESOLVERS);
const VALID_STATES = new Set(MACHINE_ACTION_IMPLEMENTATION_STATES);
const VALID_COST_RESOURCES = new Set(MACHINE_ACTION_COST_RESOURCES);

test("machine action catalog entries use exactly one valid resolver and canonical cost", () => {
  for (const action of listMachineActionDefinitions()) {
    assert.equal(typeof action.key, "string", `${action.key} has key`);
    assert.equal(VALID_RESOLVERS.has(action.resolver), true, `${action.key} resolver`);
    assert.equal(VALID_COST_RESOURCES.has(action.resource), true, `${action.key} resource`);
    assert.equal(action.actionCost?.resource, action.resource, `${action.key} actionCost resource mirrors legacy resource`);
    assert.equal(action.actionCost?.value, action.cost, `${action.key} actionCost value mirrors legacy cost`);
    assert.equal(Number.isInteger(action.cost), true, `${action.key} cost is integer`);
    assert.equal(action.cost >= 0, true, `${action.key} cost is non-negative`);
    assert.equal(VALID_STATES.has(action.implementation?.state), true, `${action.key} implementation state`);
    assert.equal(action.payload?.intent, "machineAction", `${action.key} payload intent`);
    assert.equal(action.payload?.actionId, action.key, `${action.key} payload actionId`);
  }
});

test("machine action catalog includes vehicle and battlemech action anchors", () => {
  const expected = {
    activateElectronics: ["interaction", "fa", 1],
    toggleHeatSinks: ["interaction", "fa", 1],
    activateMasc: ["movement", "fa", 1],
    selectFireMode: ["interaction", "fa", 1],
    selectAmmoType: ["interaction", "fa", 1],
    torsoTwist: ["movement", "fa", 1],
    communicate: ["action", "fa", 1],
    dropProne: ["movement", "sa", 1],
    avoidShutdown: ["recovery", "ra", 1],
    walk: ["movement", "sa", 1],
    run: ["movement", "sa", 1],
    jumpMove: ["movement", "sa", 1],
    rangedAttack: ["attack", "sa", 1],
    physicalAttack: ["attack", "sa", 1],
    acquireTarget: ["targeting", "sa", 1],
    generateFireSolution: ["targeting", "sa", 1],
    sensorLock: ["targeting", "sa", 1],
    brace: ["movement", "sa", 1],
    hullDown: ["movement", "sa", 1],
    sprint: ["movement", "sa", 2],
    powerCycle: ["remediation", "sa", 2],
    coolantDump: ["remediation", "sa", 2],
    epmFilter: ["targeting", "sa", 2],
    swat: ["remediation", "sa", 2],
  };

  for (const [id, [resolver, resource, cost]] of Object.entries(expected)) {
    const action = getMachineActionDefinition(id);
    assert.equal(action.key, id);
    assert.equal(action.resolver, resolver, `${id} resolver`);
    assert.equal(action.resource, resource, `${id} resource`);
    assert.equal(action.cost, cost, `${id} cost`);
  }
});

test("machine action aliases resolve legacy and table vocabulary to canonical anchors", () => {
  assert.equal(getMachineActionDefinition("changeFireMode").key, "selectFireMode");
  assert.equal(getMachineActionDefinition("selectAmmunitionType").key, "selectAmmoType");
  assert.equal(getMachineActionDefinition("physicalDefense").key, "shield");
  assert.equal(getMachineActionDefinition("maxThrust").key, "run");
  assert.equal(getMachineActionDefinition("prone").key, "dropProne");
});

test("machine catalog exposes unsupported complex actions as explicit stubs", () => {
  for (const id of ["chargeAttack", "evasiveManeuver", "shield", "spotIndirect", "eject"]) {
    const action = getMachineActionDefinition(id);
    assert.equal(action.implementation.state, "stub", `${id} is a stub`);
    assert.match(action.implementation.reason, /not automated|not implemented/i);
  }
});
