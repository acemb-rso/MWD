import test from "node:test";
import assert from "node:assert/strict";

import { enhanceAcquire } from "../src/modules/roll/renderers/render-acquire.js";
import { enhanceMachineRemedy } from "../src/modules/roll/renderers/render-machine-remedy.js";
import { enhanceTargeting } from "../src/modules/roll/renderers/render-targeting.js";

function baseVm() {
  return {
    metaRows: [],
    footerRows: [],
    actions: [],
    edge: null,
  };
}

function edgeResolved(extra = {}) {
  return {
    edge: {
      domain: "mental",
      pre: { spent: 0 },
      post: { spent: 0 },
      allowed: { postPools: ["insight", "rumor"] },
      availableActions: { canPostRerollFailures: true },
    },
    roll: { failureDiceRefs: ["pool:0", "pool:1"] },
    outcomeModel: { edgeEarned: null },
    ...extra,
  };
}

test("machine remedy cards offer post-roll Edge rerolls on unresolved failures", () => {
  const vm = baseVm();

  enhanceMachineRemedy(edgeResolved({
    machineRemedy: {
      critLabel: "Sensor Fault",
      locationLabel: "Head",
      skillLabel: "Computers",
      baseDn: 1,
      conditionModifier: 1,
      conditionLabel: "Damaged",
    },
    machineRemedyResult: { ok: true, passed: false, applied: false },
  }), vm);

  assert.equal(vm.edge.canPost, true);
  assert.equal(vm.actions.length, 2);
  assert.deepEqual(vm.actions.map(action => action.action), ["edgePostReroll", "edgePostReroll"]);
  assert.match(vm.footerRows.map(row => row.text).join("\n"), /Post-spend: Reroll 2 failures/);
});

test("machine remedy cards do not offer rerolls after the repair has already applied", () => {
  const vm = baseVm();

  enhanceMachineRemedy(edgeResolved({
    machineRemedy: {
      critLabel: "Sensor Fault",
      skillLabel: "Computers",
      baseDn: 1,
      conditionModifier: 0,
      conditionLabel: "Nominal",
    },
    machineRemedyResult: { ok: true, passed: true, applied: true },
  }), vm);

  assert.equal(vm.edge.canPost, false);
  assert.equal(vm.actions.length, 0);
});

test("EW acquire and targeting cards expose post-roll Edge rerolls", () => {
  const acquireVm = baseVm();
  enhanceAcquire(edgeResolved({
    acquire: { currentState: "blind" },
    ewAcquireResult: { ok: false, reason: "No hits." },
  }), acquireVm);

  const targetingVm = baseVm();
  enhanceTargeting(edgeResolved({
    targeting: { detectionStateLabel: "Track", cap: 3 },
    ewTargetingResult: { ok: false, reason: "No targeting data." },
  }), targetingVm);

  assert.equal(acquireVm.edge.canPost, true);
  assert.equal(targetingVm.edge.canPost, true);
  assert.equal(acquireVm.actions[0].dataset["pool-key"], "insight");
  assert.equal(targetingVm.actions[1].dataset["pool-key"], "rumor");
});
