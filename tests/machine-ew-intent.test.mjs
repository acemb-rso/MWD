import test from "node:test";
import assert from "node:assert/strict";

import { resolveAcquire } from "../src/modules/roll/intent/resolve-acquire.js";
import { resolveTargeting } from "../src/modules/roll/intent/resolve-targeting.js";
import { resolveAcquireExecution } from "../src/modules/roll/ew-execution.js";
import { getDetectionState } from "../src/modules/mwd/machine-ew-state.js";

function createMachineActor(name = "Mauler") {
  return {
    id: "attacker-actor",
    uuid: "Actor.attacker",
    type: "battlemech",
    name,
    statuses: new Set(),
    system: {
      attributes: {
        system: { value: 3 },
      },
      skills: {
        perception: { rating: 2, bonus: 0 },
        gunnery: { rating: 3, bonus: 0 },
      },
    },
  };
}

function createCombatant({ tokenId, targetTokenUuid, detectionState = "blind" } = {}) {
  let targeting = {
    [targetTokenUuid]: {
      detectionState,
      packet: null,
    },
  };
  return {
    id: `${tokenId}-combatant`,
    tokenId,
    getFlag(scope, key) {
      if (scope !== "mwd" || key !== "targeting") return {};
      return targeting;
    },
    async setFlag(scope, key, value) {
      if (scope === "mwd" && key === "targeting") targeting = value;
      return this;
    },
  };
}

function ensureFoundryStub() {
  globalThis.foundry = {
    ...(globalThis.foundry ?? {}),
    utils: {
      ...(globalThis.foundry?.utils ?? {}),
      deepClone: value => structuredClone(value),
    },
  };
  globalThis.Hooks = {
    ...(globalThis.Hooks ?? {}),
    callAll: () => {},
  };
}

function setScene({ detectionState = "blind" } = {}) {
  ensureFoundryStub();

  const targetTokenUuid = "Scene.scene.Token.vindicator";
  const attackerActor = createMachineActor("Mauler");
  const attackerToken = {
    id: "mauler-token",
    actor: attackerActor,
    document: {
      id: "mauler-token",
      uuid: "Scene.scene.Token.mauler",
    },
  };
  const targetToken = {
    id: "vindicator-token",
    name: "Vindicator",
    actor: {
      id: "target-actor",
      uuid: "Actor.vindicator",
      name: "Vindicator Actor",
      statuses: new Set(),
    },
    document: {
      id: "vindicator-token",
      uuid: targetTokenUuid,
    },
  };
  const tokens = new Map([
    [attackerToken.id, attackerToken],
    [targetToken.id, targetToken],
  ]);

  globalThis.game = {
    combat: {
      combatants: [
        createCombatant({
          tokenId: attackerToken.id,
          targetTokenUuid,
          detectionState,
        }),
      ],
    },
    user: {
      targets: new Set([targetToken]),
    },
  };
  globalThis.canvas = {
    tokens: {
      get: id => tokens.get(id) ?? null,
      placeables: [attackerToken, targetToken],
      controlled: [attackerToken],
    },
  };

  return { attackerActor, attackerToken, targetToken, targetTokenUuid };
}

function clearScene() {
  delete globalThis.game;
  delete globalThis.canvas;
  delete globalThis.Hooks;
}

test("acquire roll card subtitle uses the target token name", async () => {
  const { attackerActor, attackerToken, targetTokenUuid } = setScene({ detectionState: "blind" });

  try {
    const resolved = await resolveAcquire({
      actor: attackerActor,
      payload: {
        sourceTokenId: attackerToken.id,
        targetTokenUuid,
      },
    });

    assert.equal(resolved.title, "Acquire Target");
    assert.equal(resolved.subtitle, "Vindicator");
    assert.equal(resolved.acquire.targetName, "Vindicator");
    assert.equal(resolved.acquire.attackerTokenId, attackerToken.id);
    assert.equal(resolved.acquire.attackerCombatantId, `${attackerToken.id}-combatant`);
  } finally {
    clearScene();
  }
});

test("successful acquire execution persists detection state on attacker combatant", async () => {
  const { attackerActor, attackerToken, targetTokenUuid } = setScene({ detectionState: "blind" });
  const [combatant] = globalThis.game.combat.combatants;

  try {
    const resolved = await resolveAcquire({
      actor: attackerActor,
      payload: {
        sourceTokenId: attackerToken.id,
        targetTokenUuid,
      },
    });

    const result = await resolveAcquireExecution({
      attacker: attackerActor,
      ctx: {
        ...resolved,
        acquire: {
          ...resolved.acquire,
          attackerTokenUuid: "",
        },
      },
      outcomeModel: { successes: 1 },
    });

    assert.equal(result.ok, true);
    assert.equal(getDetectionState(combatant, targetTokenUuid), "contact");
  } finally {
    clearScene();
  }
});

test("targeting roll card subtitle uses the target token name", async () => {
  const { attackerActor, attackerToken, targetTokenUuid } = setScene({ detectionState: "track" });

  try {
    const resolved = await resolveTargeting({
      actor: attackerActor,
      payload: {
        sourceTokenId: attackerToken.id,
        targetTokenUuid,
      },
    });

    assert.equal(resolved.title, "Generate Targeting Data");
    assert.equal(resolved.subtitle, "Vindicator");
    assert.equal(resolved.targeting.targetName, "Vindicator");
  } finally {
    clearScene();
  }
});

test("EW rolls use the linked pilot as the roll actor", async () => {
  const { attackerActor, attackerToken, targetTokenUuid } = setScene({ detectionState: "track" });
  attackerActor.system.pilot = { uuid: "Actor.pilot" };
  attackerActor.system.skills.gunnery.rating = 0;
  const pilot = {
    id: "pilot",
    uuid: "Actor.pilot",
    type: "character",
    name: "Sensor Pilot",
    system: {
      skills: {
        perception: { rating: 4, bonus: 1 },
        gunnery: { rating: 5, bonus: 2 },
      },
    },
  };
  const previousFromUuid = globalThis.fromUuid;
  globalThis.fromUuid = async uuid => uuid === pilot.uuid ? pilot : null;

  try {
    const resolved = await resolveTargeting({
      actor: attackerActor,
      payload: {
        sourceTokenId: attackerToken.id,
        targetTokenUuid,
      },
    });

    assert.equal(resolved.pool.attribute, 3);
    assert.equal(resolved.pool.skill, 5);
    assert.equal(resolved.pool.bonus, 2);
    assert.equal(resolved.rollActor, pilot);
    assert.equal(resolved.targeting.operatorActorUuid, pilot.uuid);
    assert.deepEqual(resolved.breakdown.slice(0, 3), [
      { id: "attribute", label: "System (Mauler)", value: 3 },
      { id: "skill", label: "Gunnery (Sensor Pilot)", value: 5 },
      { id: "bonus", label: "Gunnery Bonus", value: 2 },
    ]);
  } finally {
    globalThis.fromUuid = previousFromUuid;
    clearScene();
  }
});

test("acquire roll labels show machine System plus linked pilot Perception", async () => {
  const { attackerActor, attackerToken, targetTokenUuid } = setScene({ detectionState: "blind" });
  attackerActor.system.pilot = { uuid: "Actor.pilot" };
  attackerActor.system.skills.perception.rating = 0;
  const pilot = {
    id: "pilot",
    uuid: "Actor.pilot",
    type: "character",
    name: "Sensor Pilot",
    system: {
      skills: {
        perception: { rating: 4, bonus: 1 },
      },
    },
  };
  const previousFromUuid = globalThis.fromUuid;
  globalThis.fromUuid = async uuid => uuid === pilot.uuid ? pilot : null;

  try {
    const resolved = await resolveAcquire({
      actor: attackerActor,
      payload: {
        sourceTokenId: attackerToken.id,
        targetTokenUuid,
      },
    });

    assert.equal(resolved.pool.attribute, 3);
    assert.equal(resolved.pool.skill, 4);
    assert.equal(resolved.pool.bonus, 1);
    assert.equal(resolved.rollActor, pilot);
    assert.equal(resolved.acquire.operatorActorUuid, pilot.uuid);
    assert.deepEqual(resolved.breakdown.slice(0, 3), [
      { id: "attribute", label: "System (Mauler)", value: 3 },
      { id: "skill", label: "Perception (Sensor Pilot)", value: 4 },
      { id: "bonus", label: "Perception Bonus", value: 1 },
    ]);
  } finally {
    globalThis.fromUuid = previousFromUuid;
    clearScene();
  }
});
