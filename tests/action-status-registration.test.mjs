import test from "node:test";
import assert from "node:assert/strict";

import { getDefaultStatusConditionCatalog } from "../src/modules/status/status-condition-catalog.js";
import { BATTLEMECH_MOVEMENT_ACTIONS } from "../src/modules/mwd/battlemech-movement-actions.js";
import { VEHICLE_MOVEMENT_ACTIONS } from "../src/modules/mwd/vehicle-movement-actions.js";
import { listMachineActionDefinitions } from "../src/modules/mwd/machine-action-catalog.js";

// Foundry's toggleStatusEffect rejects ids missing from CONFIG.statusEffects,
// which is built from this catalog; an unregistered id breaks the action.
test("every status a machine action writes is registered in the status condition catalog", () => {
  const registered = new Set(getDefaultStatusConditionCatalog().map(entry => entry.id));
  const written = [
    ...Object.values(BATTLEMECH_MOVEMENT_ACTIONS).map(action => action.statusId),
    ...Object.values(VEHICLE_MOVEMENT_ACTIONS).map(action => action.statusId),
    ...listMachineActionDefinitions().flatMap(action => [...action.appliesToTarget, ...action.clearsOnSuccess]),
  ].filter(Boolean);

  const missing = [...new Set(written)].filter(statusId => !registered.has(statusId));
  assert.deepEqual(missing, []);
});
