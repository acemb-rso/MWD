import test from "node:test";
import assert from "node:assert/strict";

import { findActionRemedyIssue } from "../src/modules/mwd/machine-quick-actions.js";
import { getMachineActionDefinition } from "../src/modules/mwd/machine-action-catalog.js";

const machine = (type, statuses = []) => ({ type, statuses: new Set(statuses), items: [], system: { mwd: { crits: [], locations: {} } } });

test("Stand, Extinguish and Power Cycle are the declared field remedies of the statuses they clear", () => {
  const cases = [
    ["stand", "battlemech", "proneMechFall"],
    ["extinguish", "battlemech", "onFire"],
    ["extinguish", "vehicle", "onFire"],
    ["powerCycle", "battlemech", "shutdown"],
  ];
  for (const [actionKey, type, statusId] of cases) {
    const issue = findActionRemedyIssue(machine(type, [statusId]), getMachineActionDefinition(actionKey));
    assert.ok(issue, `${actionKey} resolves ${statusId}`);
    assert.equal(issue.issueKind, "status");
    assert.equal(issue.issueId, statusId);
    assert.equal(issue.remedyKey, actionKey);
  }
});

test("without the status there is no remedy issue, and other actions never route to a remedy", () => {
  assert.equal(findActionRemedyIssue(machine("battlemech"), getMachineActionDefinition("stand")), null);
  assert.equal(findActionRemedyIssue(machine("battlemech", ["proneMechFall"]), getMachineActionDefinition("walk")), null);
  // Prone from a fall is cleared by Stand, not by Power Cycle.
  assert.equal(findActionRemedyIssue(machine("battlemech", ["proneMechFall"]), getMachineActionDefinition("powerCycle")), null);
});
