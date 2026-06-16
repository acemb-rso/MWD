import test from "node:test";
import assert from "node:assert/strict";

import { resolveAcquire } from "../src/modules/roll/intent/resolve-acquire.js";
import { resolveTargeting } from "../src/modules/roll/intent/resolve-targeting.js";
import { resolveBreakLock } from "../src/modules/roll/intent/resolve-break-lock.js";
import { resolveDefensiveJink } from "../src/modules/roll/intent/resolve-defensive-jink.js";
import { resolveAcquireExecution, resolveBreakLockExecution, resolveDefensiveJinkRollExecution, resolveSuppressBeaconRollExecution } from "../src/modules/roll/ew-execution.js";
import { getDetectionState, getTargetingState } from "../src/modules/mwd/machine-ew-state.js";

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
        handling: { value: 4 },
      },
      skills: {
        perception: { rating: 2, bonus: 0 },
        gunnery: { rating: 3, bonus: 0 },
        piloting: { rating: 2, bonus: 0 },
        stealth: { rating: 2, bonus: 0 },
      },
    },
  };
}

function createAssetModule({ id = "module", name = "Module", tags = [], capabilities = [] } = {}) {
  return {
    id,
    name,
    type: "assetModule",
    canonicalType: "assetModule",
    system: {
      activation: { mode: "passive", active: false },
      tags,
      capabilities,
    },
  };
}

function createCombatant({ tokenId, targetTokenUuid, detectionState = "blind", packet = null } = {}) {
  let targeting = {
    [targetTokenUuid]: {
      detectionState,
      packet,
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
    assert.deepEqual(resolved.edge.allowed, ["pre", "post"]);
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

test("successful acquire execution fails loud when detection state cannot persist", async () => {
  const { attackerActor, attackerToken, targetTokenUuid } = setScene({ detectionState: "blind" });
  globalThis.game.combat.combatants = [];
  const warn = console.warn;
  console.warn = () => {};

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
      ctx: resolved,
      outcomeModel: { successes: 1 },
    });

    assert.equal(result.ok, false);
    assert.equal(result.persistenceFailed, true);
    assert.equal(result.newState, "blind");
    assert.equal(result.attemptedState, "contact");
    assert.match(result.reason, /not persisted/i);
  } finally {
    console.warn = warn;
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
    assert.deepEqual(resolved.edge.allowed, ["pre", "post"]);
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

test("acquire can bypass ecmShrouded only through matching asset module effect", async () => {
  const { attackerActor, attackerToken, targetToken, targetTokenUuid } = setScene({ detectionState: "blind" });
  targetToken.actor.statuses.add("ecmShrouded");

  try {
    const shrouded = await resolveAcquire({
      actor: attackerActor,
      payload: {
        sourceTokenId: attackerToken.id,
        targetTokenUuid,
      },
    });
    assert.equal(shrouded.difficulty.dn, 2);

    attackerActor.items = [{
      id: "probe",
      name: "Active Probe",
      type: "assetModule",
      canonicalType: "assetModule",
      system: {
        activation: { mode: "toggle", active: true },
        effects: [{
          id: "ignore-shroud",
          timing: "active",
          requires: { actionIds: ["acquireTarget"] },
          modifies: { bypassStatuses: ["ecmShrouded"] },
        }],
      },
    }];

    const bypassed = await resolveAcquire({
      actor: attackerActor,
      payload: {
        sourceTokenId: attackerToken.id,
        targetTokenUuid,
      },
    });
    assert.equal(bypassed.difficulty.dn, 1);
    assert.deepEqual(bypassed.dn.parts, [
      { id: "difficulty.base", label: "Base DN", value: 1, tags: ["base"] },
    ]);
  } finally {
    clearScene();
  }
});

test("machine stealth increases acquire DN and counters reduce only stealth", async () => {
  const { attackerActor, attackerToken, targetToken, targetTokenUuid } = setScene({ detectionState: "contact" });
  targetToken.actor.type = "battlemech";
  targetToken.actor.system = {
    mwd: {
      stealth: {
        enabled: true,
        rating: 2,
        mode: "passive",
        counteredBy: ["activeProbe", "tag", "narc", "c3", "visualClose"],
      },
    },
  };

  try {
    const stealthy = await resolveAcquire({
      actor: attackerActor,
      payload: {
        sourceTokenId: attackerToken.id,
        targetTokenUuid,
      },
    });
    assert.equal(stealthy.difficulty.dn, 4);
    assert.equal(stealthy.dn.parts.find(part => part.id === "target.stealth")?.value, 2);

    attackerActor.items = [
      createAssetModule({ id: "probe", name: "Active Probe", tags: ["activeProbe"] }),
    ];
    const probed = await resolveAcquire({
      actor: attackerActor,
      payload: {
        sourceTokenId: attackerToken.id,
        targetTokenUuid,
      },
    });
    assert.equal(probed.difficulty.dn, 3);
    assert.equal(probed.dn.parts.find(part => part.id === "stealth.counter.activeProbe")?.value, -1);

    targetToken.actor.statuses.add("tagged");
    const tagged = await resolveAcquire({
      actor: attackerActor,
      payload: {
        sourceTokenId: attackerToken.id,
        targetTokenUuid,
      },
    });
    assert.equal(tagged.difficulty.dn, 2);
    assert.equal(tagged.dn.parts.find(part => part.id === "stealth.counter.tagged")?.displayValue, "bypass");
  } finally {
    clearScene();
  }
});

test("Break Lock resolves as Handling plus Stealth with detection-state DN and situation dice", async () => {
  ensureFoundryStub();

  const defender = createMachineActor("Defender");
  defender.statuses.add("tagged");
  defender.system.mwd = {
    stealth: {
      enabled: true,
      rating: 1,
      mode: "passive",
      signature: "high",
      counteredBy: [],
    },
  };
  const observer = createMachineActor("Observer");
  observer.items = [
    createAssetModule({ id: "probe", name: "Active Probe", tags: ["activeProbe"] }),
  ];

  const defenderToken = {
    id: "defender-token",
    actor: defender,
    document: { id: "defender-token", uuid: "Scene.scene.Token.defender" },
  };
  const observerToken = {
    id: "observer-token",
    name: "Observer Token",
    actor: observer,
    document: { id: "observer-token", uuid: "Scene.scene.Token.observer" },
  };

  globalThis.canvas = {
    tokens: {
      get: id => id === defenderToken.id ? defenderToken : id === observerToken.id ? observerToken : null,
      placeables: [defenderToken, observerToken],
    },
  };
  globalThis.game = {
    combat: {
      combatants: [
        createCombatant({
          tokenId: observerToken.id,
          targetTokenUuid: defenderToken.document.uuid,
          detectionState: "lock",
        }),
      ],
    },
  };

  try {
    const resolved = await resolveBreakLock({
      actor: defender,
      payload: {
        sourceTokenId: defenderToken.id,
        targetTokenId: observerToken.id,
        breakLockSituation: "woods",
      },
    });

    assert.equal(resolved.data.attrKey, "handling");
    assert.equal(resolved.data.skillKey, "stealth");
    assert.equal(resolved.pool.attribute, 4);
    assert.equal(resolved.pool.skill, 2);
    assert.equal(resolved.pool.bonus, 1);
    assert.equal(resolved.difficulty.dn, 6);
    assert.equal(resolved.dn.parts.find(part => part.id === "breakLock.detectionState")?.value, 3);
    assert.equal(resolved.dn.parts.find(part => part.id === "breakLock.detectionState")?.label, "Lock -> Track");
    assert.equal(resolved.dn.parts.find(part => part.id === "breakLock.situation"), undefined);
    assert.equal(resolved.breakdown.find(part => part.id === "breakLock.situation")?.value, 1);
    assert.equal(resolved.dn.parts.find(part => part.id === "breakLock.beacon")?.value, 1);
    assert.equal(resolved.dn.parts.find(part => part.id === "breakLock.highEmission")?.value, 1);
    assert.equal(resolved.dn.parts.find(part => part.id === "breakLock.activeProbe")?.value, 1);
  } finally {
    clearScene();
  }
});

test("Break Lock DN follows the detection ladder", async () => {
  ensureFoundryStub();

  const defender = createMachineActor("Defender");
  const defenderToken = {
    id: "defender-token",
    actor: defender,
    document: { id: "defender-token", uuid: "Scene.scene.Token.defender" },
  };
  const observerToken = {
    id: "observer-token",
    actor: createMachineActor("Observer"),
    document: { id: "observer-token", uuid: "Scene.scene.Token.observer" },
  };

  globalThis.canvas = {
    tokens: {
      get: id => id === defenderToken.id ? defenderToken : id === observerToken.id ? observerToken : null,
      placeables: [defenderToken, observerToken],
    },
  };

  try {
    for (const [state, dn, label] of [
      ["contact", 1, "Contact -> Blind"],
      ["track", 2, "Track -> Contact"],
      ["lock", 3, "Lock -> Track"],
    ]) {
      globalThis.game = {
        combat: {
          combatants: [
            createCombatant({
              tokenId: observerToken.id,
              targetTokenUuid: defenderToken.document.uuid,
              detectionState: state,
            }),
          ],
        },
      };

      const resolved = await resolveBreakLock({
        actor: defender,
        payload: {
          sourceTokenId: defenderToken.id,
          targetTokenId: observerToken.id,
        },
      });

      assert.equal(resolved.difficulty.dn, dn);
      assert.equal(resolved.dn.parts.find(part => part.id === "breakLock.detectionState")?.label, label);
    }
  } finally {
    clearScene();
  }
});

test("successful Break Lock degrades the selected observer's state on the acting mech", async () => {
  ensureFoundryStub();

  const actingActor = createMachineActor("Defender");
  const actingTokenUuid = "Scene.scene.Token.defender";
  const actingToken = {
    id: "defender-token",
    actor: actingActor,
    document: {
      id: "defender-token",
      uuid: actingTokenUuid,
    },
  };
  const observerToken = {
    id: "observer-token",
    actor: createMachineActor("Observer"),
    document: {
      id: "observer-token",
      uuid: "Scene.scene.Token.observer",
    },
  };
  const defenderCombatant = createCombatant({
    tokenId: actingToken.id,
    targetTokenUuid: observerToken.document.uuid,
    detectionState: "lock",
  });
  const observerCombatant = createCombatant({
    tokenId: observerToken.id,
    targetTokenUuid: actingTokenUuid,
    detectionState: "lock",
  });

  globalThis.game = {
    combat: {
      combatants: [defenderCombatant, observerCombatant],
    },
  };
  globalThis.canvas = {
    tokens: {
      get: id => id === actingToken.id ? actingToken : id === observerToken.id ? observerToken : null,
      placeables: [actingToken, observerToken],
    },
  };

  try {
    const result = await resolveBreakLockExecution({
      attacker: actingActor,
      payload: {
        intent: "skill",
        machineActionKey: "breakLock",
        sourceTokenId: actingToken.id,
        targetTokenId: observerToken.id,
      },
      ctx: {
        intent: "skill",
        difficulty: { dn: 1 },
      },
      outcomeModel: { successes: 1 },
    });

    assert.equal(result.ok, true);
    assert.equal(result.previousState, "lock");
    assert.equal(result.newState, "track");
    assert.equal(getDetectionState(observerCombatant, actingTokenUuid), "track");
    assert.equal(getDetectionState(defenderCombatant, observerToken.document.uuid), "lock");
  } finally {
    clearScene();
  }
});

test("Defensive Jink resolves as Handling plus Piloting and reduces targetingData by one", async () => {
  ensureFoundryStub();

  const defender = createMachineActor("Defender");
  const observer = createMachineActor("Observer");
  const defenderTokenUuid = "Scene.scene.Token.defender";
  const defenderToken = {
    id: "defender-token",
    actor: defender,
    document: { id: "defender-token", uuid: defenderTokenUuid },
  };
  const observerToken = {
    id: "observer-token",
    name: "Observer Token",
    actor: observer,
    document: { id: "observer-token", uuid: "Scene.scene.Token.observer" },
  };
  const packet = {
    id: "packet-1",
    value: 3,
    sourceTokenUuid: observerToken.document.uuid,
    round: 1,
  };
  const observerCombatant = createCombatant({
    tokenId: observerToken.id,
    targetTokenUuid: defenderTokenUuid,
    detectionState: "lock",
    packet,
  });

  globalThis.game = {
    combat: {
      combatants: [observerCombatant],
    },
  };
  globalThis.canvas = {
    tokens: {
      get: id => id === defenderToken.id ? defenderToken : id === observerToken.id ? observerToken : null,
      placeables: [defenderToken, observerToken],
    },
  };

  try {
    const resolved = await resolveDefensiveJink({
      actor: defender,
      payload: {
        sourceTokenId: defenderToken.id,
        targetTokenId: observerToken.id,
      },
    });
    assert.equal(resolved.data.attrKey, "handling");
    assert.equal(resolved.data.skillKey, "piloting");
    assert.equal(resolved.pool.attribute, 4);
    assert.equal(resolved.pool.skill, 2);
    assert.equal(resolved.difficulty.dn, 2);

    const result = await resolveDefensiveJinkRollExecution({
      defender,
      payload: {
        actionId: "defensiveJink",
        sourceTokenId: defenderToken.id,
        targetTokenId: observerToken.id,
      },
      ctx: resolved,
      outcomeModel: { successes: 2 },
    });

    assert.equal(result.ok, true);
    assert.equal(result.previousValue, 3);
    assert.equal(result.newValue, 2);
    assert.equal(getTargetingState(observerCombatant, defenderTokenUuid).packet.value, 2);
  } finally {
    clearScene();
  }
});

test("failed Defensive Jink leaves targetingData unchanged", async () => {
  ensureFoundryStub();

  const defender = createMachineActor("Defender");
  const defenderTokenUuid = "Scene.scene.Token.defender";
  const defenderToken = {
    id: "defender-token",
    actor: defender,
    document: { id: "defender-token", uuid: defenderTokenUuid },
  };
  const observerToken = {
    id: "observer-token",
    actor: createMachineActor("Observer"),
    document: { id: "observer-token", uuid: "Scene.scene.Token.observer" },
  };
  const observerCombatant = createCombatant({
    tokenId: observerToken.id,
    targetTokenUuid: defenderTokenUuid,
    detectionState: "lock",
    packet: {
      id: "packet-1",
      value: 1,
      sourceTokenUuid: observerToken.document.uuid,
      round: 1,
    },
  });

  globalThis.game = {
    combat: {
      combatants: [observerCombatant],
    },
  };
  globalThis.canvas = {
    tokens: {
      get: id => id === defenderToken.id ? defenderToken : id === observerToken.id ? observerToken : null,
      placeables: [defenderToken, observerToken],
    },
  };

  try {
    const result = await resolveDefensiveJinkRollExecution({
      defender,
      payload: {
        actionId: "defensiveJink",
        sourceTokenId: defenderToken.id,
        targetTokenId: observerToken.id,
      },
      ctx: { intent: "defensiveJink", difficulty: { dn: 2 } },
      outcomeModel: { successes: 1 },
    });

    assert.equal(result.ok, false);
    assert.match(result.reason, /failed/i);
    assert.equal(getTargetingState(observerCombatant, defenderTokenUuid).packet.value, 1);
  } finally {
    clearScene();
  }
});

test("successful Suppress Beacon suppresses the target machine packet against the acting machine", async () => {
  ensureFoundryStub();

  const defender = createMachineActor("Defender");
  const observer = createMachineActor("Observer");
  const defenderTokenUuid = "Scene.scene.Token.defender";
  const defenderToken = {
    id: "defender-token",
    actor: defender,
    document: { id: "defender-token", uuid: defenderTokenUuid },
  };
  const observerToken = {
    id: "observer-token",
    name: "Observer Token",
    actor: observer,
    document: { id: "observer-token", uuid: "Scene.scene.Token.observer" },
  };
  const observerCombatant = createCombatant({
    tokenId: observerToken.id,
    targetTokenUuid: defenderTokenUuid,
    detectionState: "lock",
    packet: {
      id: "packet-1",
      value: 3,
      sourceTokenUuid: observerToken.document.uuid,
      round: 1,
    },
  });

  globalThis.game = {
    combat: {
      round: 1,
      turn: 0,
      combatants: [observerCombatant],
    },
  };
  globalThis.canvas = {
    tokens: {
      get: id => id === defenderToken.id ? defenderToken : id === observerToken.id ? observerToken : null,
      placeables: [defenderToken, observerToken],
    },
  };

  try {
    const result = await resolveSuppressBeaconRollExecution({
      suppressor: defender,
      payload: {
        intent: "skill",
        machineActionKey: "suppressBeacon",
        sourceTokenId: defenderToken.id,
        targetTokenId: observerToken.id,
      },
      ctx: { intent: "skill", difficulty: { dn: 1 } },
      outcomeModel: { successes: 1 },
    });

    assert.equal(result.ok, true);
    assert.equal(result.packetId, "packet-1");
    assert.equal(getTargetingState(observerCombatant, defenderTokenUuid).packet.suppressedBy.source, "suppressBeacon");
  } finally {
    clearScene();
  }
});

test("failed Suppress Beacon leaves beacon packet usable", async () => {
  ensureFoundryStub();

  const defender = createMachineActor("Defender");
  const observer = createMachineActor("Observer");
  const defenderTokenUuid = "Scene.scene.Token.defender";
  const defenderToken = {
    id: "defender-token",
    actor: defender,
    document: { id: "defender-token", uuid: defenderTokenUuid },
  };
  const observerToken = {
    id: "observer-token",
    actor: observer,
    document: { id: "observer-token", uuid: "Scene.scene.Token.observer" },
  };
  const observerCombatant = createCombatant({
    tokenId: observerToken.id,
    targetTokenUuid: defenderTokenUuid,
    detectionState: "lock",
    packet: {
      id: "packet-1",
      value: 3,
      sourceTokenUuid: observerToken.document.uuid,
      round: 1,
    },
  });

  globalThis.game = {
    combat: {
      round: 1,
      turn: 0,
      combatants: [observerCombatant],
    },
  };
  globalThis.canvas = {
    tokens: {
      get: id => id === defenderToken.id ? defenderToken : id === observerToken.id ? observerToken : null,
      placeables: [defenderToken, observerToken],
    },
  };

  try {
    const result = await resolveSuppressBeaconRollExecution({
      suppressor: defender,
      payload: {
        intent: "skill",
        machineActionKey: "suppressBeacon",
        sourceTokenId: defenderToken.id,
        targetTokenId: observerToken.id,
      },
      ctx: { intent: "skill", difficulty: { dn: 2 } },
      outcomeModel: { successes: 1 },
    });

    assert.equal(result.ok, false);
    assert.match(result.reason, /failed/i);
    assert.equal(getTargetingState(observerCombatant, defenderTokenUuid).packet.suppressedBy, null);
  } finally {
    clearScene();
  }
});

test("failed Break Lock leaves observer detection state unchanged", async () => {
  ensureFoundryStub();

  const actingActor = createMachineActor("Defender");
  const actingTokenUuid = "Scene.scene.Token.defender";
  const actingToken = {
    id: "defender-token",
    actor: actingActor,
    document: {
      id: "defender-token",
      uuid: actingTokenUuid,
    },
  };
  const observerToken = {
    id: "observer-token",
    actor: createMachineActor("Observer"),
    document: {
      id: "observer-token",
      uuid: "Scene.scene.Token.observer",
    },
  };
  const observerCombatant = createCombatant({
    tokenId: observerToken.id,
    targetTokenUuid: actingTokenUuid,
    detectionState: "track",
  });

  globalThis.game = {
    combat: {
      combatants: [observerCombatant],
    },
  };
  globalThis.canvas = {
    tokens: {
      get: id => id === actingToken.id ? actingToken : id === observerToken.id ? observerToken : null,
      placeables: [actingToken, observerToken],
    },
  };

  try {
    const result = await resolveBreakLockExecution({
      attacker: actingActor,
      payload: {
        intent: "skill",
        machineActionKey: "breakLock",
        sourceTokenId: actingToken.id,
        targetTokenId: observerToken.id,
      },
      ctx: {
        intent: "skill",
        difficulty: { dn: 2 },
      },
      outcomeModel: { successes: 1 },
    });

    assert.equal(result.ok, false);
    assert.match(result.reason, /failed/i);
    assert.equal(getDetectionState(observerCombatant, actingTokenUuid), "track");
  } finally {
    clearScene();
  }
});
