import test from "node:test";
import assert from "node:assert/strict";

import { resolveMachineInitiativeComponents } from "../src/modules/mwd/machine-initiative.js";

function actor(type, attributes = {}) {
  return {
    type,
    system: {
      attributes: Object.fromEntries(
        Object.entries(attributes).map(([key, value]) => [key, { value }])
      )
    }
  };
}

test("machine initiative uses the better of Handling/System plus pilot Reflexes", () => {
  const components = resolveMachineInitiativeComponents({
    machineActor: actor("vehicle", { handling: 3, system: 5 }),
    pilotActor: actor("character", { reflexes: 4 }),
  });

  assert.equal(components.machineAttributeKey, "system");
  assert.equal(components.machineAttributeValue, 5);
  assert.equal(components.pilotReflexes, 4);
  assert.equal(components.totalBonus, 9);
});

test("machine initiative falls back to Handling on ties and tolerates missing pilots", () => {
  const components = resolveMachineInitiativeComponents({
    machineActor: actor("battlemech", { handling: 4, system: 4 }),
    pilotActor: null,
  });

  assert.equal(components.machineAttributeKey, "handling");
  assert.equal(components.machineAttributeValue, 4);
  assert.equal(components.pilotReflexes, 0);
  assert.equal(components.totalBonus, 4);
});
