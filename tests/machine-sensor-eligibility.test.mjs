import test from "node:test";
import assert from "node:assert/strict";

import {
  collectMachineEwEncounterTargets,
  isMachineSensorEligibleTarget,
} from "../src/modules/mwd/machine-sensor-eligibility.js";

function createToken({ id, uuid, name = "Token", disposition = -1, hidden = false, actorType = "vehicle" } = {}) {
  const token = {
    id,
    name,
    actor: { type: actorType, statuses: new Set() },
    document: { id, uuid, disposition, hidden },
  };
  token.document.object = token;
  token.document.actor = token.actor;
  return token;
}

function createCombatantFor(token, { sceneId = "" } = {}) {
  return { tokenId: token?.document?.id ?? "", token: token?.document ?? null, sceneId };
}

const observer = createToken({ id: "observer", uuid: "Scene.s.Token.observer", disposition: 1 });

test("sensor eligibility requires a hostile machine token", () => {
  const hostileMachine = createToken({ id: "t1", uuid: "Scene.s.Token.t1" });
  const neutralMachine = createToken({ id: "t2", uuid: "Scene.s.Token.t2", disposition: 0 });
  const hostilePerson = createToken({ id: "t3", uuid: "Scene.s.Token.t3", actorType: "character" });

  assert.equal(isMachineSensorEligibleTarget({ observerToken: observer, targetToken: hostileMachine }), true);
  assert.equal(isMachineSensorEligibleTarget({ observerToken: observer, targetToken: neutralMachine }), false);
  assert.equal(isMachineSensorEligibleTarget({ observerToken: observer, targetToken: hostilePerson }), false);
  assert.equal(isMachineSensorEligibleTarget({ observerToken: observer, targetToken: null }), false);
});

test("sensor eligibility excludes GM-hidden tokens unless explicitly included", () => {
  const hiddenHostile = createToken({ id: "t4", uuid: "Scene.s.Token.t4", hidden: true });

  assert.equal(isMachineSensorEligibleTarget({ observerToken: observer, targetToken: hiddenHostile }), false);
  assert.equal(isMachineSensorEligibleTarget({ observerToken: observer, targetToken: hiddenHostile, includeHidden: true }), true);
});

test("sensor eligibility excludes the observer's own token", () => {
  const hostileObserver = createToken({ id: "self", uuid: "Scene.s.Token.self" });

  assert.equal(isMachineSensorEligibleTarget({ observerToken: hostileObserver, targetToken: hostileObserver }), false);
  assert.equal(isMachineSensorEligibleTarget({ targetToken: hostileObserver }), true);
});

test("encounter collection returns eligible tokens sorted by token id and deduplicated", () => {
  const alpha = createToken({ id: "alpha", uuid: "Scene.s.Token.alpha" });
  const beta = createToken({ id: "beta", uuid: "Scene.s.Token.beta" });
  const hidden = createToken({ id: "gamma", uuid: "Scene.s.Token.gamma", hidden: true });
  const combat = {
    combatants: [
      createCombatantFor(beta),
      createCombatantFor(alpha),
      createCombatantFor(alpha),
      createCombatantFor(hidden),
      { tokenId: "orphan", token: null },
    ],
  };

  const targets = collectMachineEwEncounterTargets({ observerToken: observer, combat });
  assert.deepEqual(targets.map(token => token.id ?? token.document?.id), ["alpha", "beta"]);
});

test("encounter collection skips combatants from other scenes and handles missing combat", () => {
  globalThis.canvas = { scene: { id: "scene-active" } };
  const here = createToken({ id: "here", uuid: "Scene.s.Token.here" });
  const elsewhere = createToken({ id: "elsewhere", uuid: "Scene.s.Token.elsewhere" });
  const combat = {
    combatants: [
      createCombatantFor(here, { sceneId: "scene-active" }),
      createCombatantFor(elsewhere, { sceneId: "scene-other" }),
    ],
  };

  const targets = collectMachineEwEncounterTargets({ observerToken: observer, combat });
  assert.deepEqual(targets.map(token => token.id ?? token.document?.id), ["here"]);
  assert.deepEqual(collectMachineEwEncounterTargets({ observerToken: observer, combat: null }), []);

  delete globalThis.canvas;
});
