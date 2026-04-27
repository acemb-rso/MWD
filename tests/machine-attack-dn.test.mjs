import test from "node:test";
import assert from "node:assert/strict";

import {
  getMechRangeBandBaseDn,
  getMechRangeBandLabel,
  selectMechRangeBand,
} from "../src/modules/mwd/personal-range-bands.js";
import {
  getTrackingPenaltyByHexes,
  metersToHexes,
} from "../src/modules/mwd/machine-attack-motion.js";
import { EwTrackingPenaltyProvider } from "../src/modules/modifiers/providers/ew-tracking-penalty.js";

let resolveAttackModule = null;
let attackResolutionModule = null;

async function getResolveAttack() {
  globalThis.Item ??= class {};
  globalThis.CONST ??= {
    REGION_VISIBILITY: { ALWAYS: 2 },
    TOKEN_DISPOSITIONS: { NEUTRAL: 0, FRIENDLY: 1, HOSTILE: -1 },
  };
  globalThis.foundry = {
    ...(globalThis.foundry ?? {}),
    utils: {
      ...(globalThis.foundry?.utils ?? {}),
      deepClone: value => structuredClone(value),
      duplicate: value => structuredClone(value),
      mergeObject: (left = {}, right = {}) => ({ ...left, ...right }),
    },
    applications: {
      ...(globalThis.foundry?.applications ?? {}),
      api: {
        ...(globalThis.foundry?.applications?.api ?? {}),
        ApplicationV2: class {
          static DEFAULT_OPTIONS = {};
        },
        HandlebarsApplicationMixin: Base => Base,
      },
      handlebars: {
        ...(globalThis.foundry?.applications?.handlebars ?? {}),
        loadTemplates: async () => [],
        renderTemplate: async () => "",
      },
    },
  };
  resolveAttackModule ??= await import("../src/modules/roll/intent/resolve-attack.js");
  return resolveAttackModule.resolveAttack;
}

async function getAttackResolution() {
  await getResolveAttack();
  attackResolutionModule ??= await import("../src/modules/roll/attack-resolution.js");
  return attackResolutionModule;
}

function createCombatant({ tokenId, targetTokenUuid } = {}) {
  return {
    id: `${tokenId}-combatant`,
    tokenId,
    getFlag(scope, key) {
      if (scope !== "mwd" || key !== "targeting") return {};
      return {
        [targetTokenUuid]: {
          detectionState: "contact",
          packet: null,
        },
      };
    },
  };
}

function createActor() {
  const weapon = {
    id: "w-laser",
    type: "mechWeapon",
    canonicalType: "mechWeapon",
    name: "Medium Laser",
    getCombatProfile() {
      return {
        id: this.id,
        uuid: "Item.w-laser",
        name: this.name,
        type: "mechWeapon",
        category: "ranged",
        skill: "gunnery",
        damage: 4,
        ap: 0,
        damageType: "energy",
        attackRatingBand: { close: 4, near: 3, far: 2, extreme: 1 },
        range: { max: "extreme" },
        defaultRangeBand: "near",
        effects: {},
        capabilityReport: { isTemplated: false, errors: [] },
      };
    },
  };

  return {
    type: "battlemech",
    name: "Attack Mech",
    uuid: "Actor.attack-mech",
    statuses: new Set(),
    items: new Map([[weapon.id, weapon]]),
    system: {
      attributes: {
        reflexes: { value: 4 },
        system: { value: 3 },
      },
      skills: {
        gunnery: { rating: 3, bonus: 0 },
      },
      mwd: {
        crits: [],
        hardpoints: [],
        locations: {},
      },
    },
  };
}

function setScene({ distance = 270, targetMovement = {} } = {}) {
  const targetTokenUuid = "Scene.scene.Token.target-token";
  const attackerToken = {
    id: "attacker-token",
    center: { x: 0, y: 0 },
  };
  const targetToken = {
    id: "target-token",
    visible: true,
    center: { x: distance, y: 0 },
    actor: {
      name: "Target Mech",
      type: "battlemech",
      statuses: new Set(),
      system: {
        movement: {
          ground: Number(targetMovement.ground ?? 0),
          flight: Number(targetMovement.flight ?? 0),
        },
      },
    },
    document: {
      id: "target-token",
      uuid: targetTokenUuid,
    },
  };
  const tokens = new Map([
    [attackerToken.id, attackerToken],
    [targetToken.id, targetToken],
  ]);

  globalThis.game = {
    combat: {
      round: 1,
      combatants: [createCombatant({ tokenId: attackerToken.id, targetTokenUuid })],
    },
    user: {
      targets: new Set(),
    },
  };
  globalThis.canvas = {
    tokens: {
      get: id => tokens.get(id) ?? null,
      placeables: [attackerToken, targetToken],
      controlled: [],
    },
    grid: {
      measurePath: () => ({ distance }),
    },
  };

  return {
    targetSnapshot: {
      tokenId: targetToken.id,
      tokenUuid: targetTokenUuid,
      actorId: "target-actor",
      actorUuid: "Actor.target-mech",
      name: "Target Mech",
      attributes: {},
      skills: {},
    },
  };
}

function clearScene() {
  delete globalThis.game;
  delete globalThis.canvas;
}

test("machine range bands are explicit continuous meter ranges with matching DNs", () => {
  assert.equal(getMechRangeBandLabel("close"), "Close 0-59 m");
  assert.equal(getMechRangeBandLabel("near"), "Near 60-269 m");
  assert.equal(getMechRangeBandLabel("far"), "Far 270-629 m");
  assert.equal(getMechRangeBandLabel("extreme"), "Extreme 630-1200 m");

  assert.equal(getMechRangeBandBaseDn("close"), 2);
  assert.equal(getMechRangeBandBaseDn("near"), 3);
  assert.equal(getMechRangeBandBaseDn("far"), 4);
  assert.equal(getMechRangeBandBaseDn("extreme"), 5);
  assert.equal(getMechRangeBandBaseDn("outOfRange"), 6);

  assert.equal(selectMechRangeBand(59), "close");
  assert.equal(selectMechRangeBand(60), "near");
  assert.equal(selectMechRangeBand(269), "near");
  assert.equal(selectMechRangeBand(270), "far");
  assert.equal(selectMechRangeBand(629), "far");
  assert.equal(selectMechRangeBand(630), "extreme");
  assert.equal(selectMechRangeBand(1200), "extreme");
  assert.equal(selectMechRangeBand(1201), "outOfRange");
});

test("machine motion helpers convert meters to hexes and apply tracking table", () => {
  assert.equal(metersToHexes(0), 0);
  assert.equal(metersToHexes(44), 1);
  assert.equal(metersToHexes(45), 2);
  assert.equal(metersToHexes(180), 6);

  assert.equal(getTrackingPenaltyByHexes(0), 0);
  assert.equal(getTrackingPenaltyByHexes(1), -1);
  assert.equal(getTrackingPenaltyByHexes(2), -1);
  assert.equal(getTrackingPenaltyByHexes(3), -2);
  assert.equal(getTrackingPenaltyByHexes(8), -4);
  assert.equal(getTrackingPenaltyByHexes(9), -5);
});

test("machine weapons do not add net hits to damage", async () => {
  const { doesAttackAddNetHitsToDamage } = await getAttackResolution();
  assert.equal(doesAttackAddNetHitsToDamage({ type: "mechWeapon" }), false);
  assert.equal(doesAttackAddNetHitsToDamage({ type: "mechWeaponGroup" }), false);
  assert.equal(doesAttackAddNetHitsToDamage({ type: "vehicleWeapon" }), false);
  assert.equal(doesAttackAddNetHitsToDamage({ type: "personalWeapon" }), true);
  assert.equal(doesAttackAddNetHitsToDamage({ isSynthetic: true }), true);
});

test("machine attack DN follows explicit machine range band", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createActor();
  const { targetSnapshot } = setScene({ distance: 100 });

  try {
    const resolved = await resolveAttack({
      actor,
      payload: {
        sourceType: "mechWeapon",
        sourceId: "w-laser",
        weaponId: "w-laser",
        sourceTokenId: "attacker-token",
        rangeBand: "far",
        targetSnapshots: [targetSnapshot],
      },
    });

    assert.equal(resolved.attack.rangeBand, "far");
    assert.equal(resolved.difficulty.dn, 4);
    assert.equal(resolved.dn.parts[0].label, "Base DN (Far)");
  } finally {
    clearScene();
  }
});

test("machine attack pool uses the linked pilot's attribute and skill", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createActor();
  actor.system.pilot = { uuid: "Actor.pilot" };
  actor.system.attributes.reflexes.value = 1;
  actor.system.skills.gunnery.rating = 0;
  actor.system.skills.gunnery.bonus = 0;

  const pilot = {
    id: "pilot",
    uuid: "Actor.pilot",
    type: "character",
    name: "Ace Pilot",
    system: {
      attributes: {
        reflexes: { value: 5 },
      },
      skills: {
        gunnery: { rating: 4, bonus: 1 },
      },
    },
  };
  const previousFromUuid = globalThis.fromUuid;
  globalThis.fromUuid = async uuid => uuid === pilot.uuid ? pilot : null;
  const { targetSnapshot } = setScene();

  try {
    const resolved = await resolveAttack({
      actor,
      payload: {
        intent: "attack",
        sourceType: "mechWeapon",
        sourceId: "w-laser",
        weaponId: "w-laser",
        rangeBand: "near",
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshot],
      },
    });

    assert.equal(resolved.pool.attribute, 5);
    assert.equal(resolved.pool.skill, 4);
    assert.equal(resolved.pool.bonus, 1);
    assert.equal(resolved.rollActor, pilot);
    assert.equal(resolved.attack.operator.actorUuid, pilot.uuid);
  } finally {
    globalThis.fromUuid = previousFromUuid;
    clearScene();
  }
});

test("machine attack DN can use measured machine range band", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createActor();
  const { targetSnapshot } = setScene({ distance: 270 });

  try {
    const resolved = await resolveAttack({
      actor,
      payload: {
        sourceType: "mechWeapon",
        sourceId: "w-laser",
        weaponId: "w-laser",
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshot],
      },
    });

    assert.equal(resolved.attack.rangeBand, "far");
    assert.equal(resolved.difficulty.dn, 4);
  } finally {
    clearScene();
  }
});

test("machine target motion uses action count for DN and movement speed for tracking", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createActor();
  const provider = new EwTrackingPenaltyProvider();

  const slowScene = setScene({ distance: 100, targetMovement: { ground: 60 } });
  try {
    const slow = await resolveAttack({
      actor,
      payload: {
        sourceType: "mechWeapon",
        sourceId: "w-laser",
        weaponId: "w-laser",
        sourceTokenId: "attacker-token",
        targetSnapshots: [slowScene.targetSnapshot],
        machineMotion: { targetMotion: "moved1" },
      },
    });
    const slowMods = provider.collect({ actor, resolved: slow, payload: { intent: "attack" } });
    assert.equal(slow.difficulty.dn, 4);
    assert.equal(slow.attack.machineMotion.trackingHexes, 2);
    assert.equal(slowMods.find(mod => mod.id === "machineMotion.tracking")?.value, -1);
  } finally {
    clearScene();
  }

  const fastScene = setScene({ distance: 100, targetMovement: { ground: 180 } });
  try {
    const fast = await resolveAttack({
      actor,
      payload: {
        sourceType: "mechWeapon",
        sourceId: "w-laser",
        weaponId: "w-laser",
        sourceTokenId: "attacker-token",
        targetSnapshots: [fastScene.targetSnapshot],
        machineMotion: { targetMotion: "moved1" },
      },
    });
    const fastMods = provider.collect({ actor, resolved: fast, payload: { intent: "attack" } });
    assert.equal(fast.difficulty.dn, 4);
    assert.equal(fast.attack.machineMotion.trackingHexes, 6);
    assert.equal(fastMods.find(mod => mod.id === "machineMotion.tracking")?.value, -3);
  } finally {
    clearScene();
  }
});

test("machine target motion action count changes DN without multiplying tracking distance", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createActor();
  const provider = new EwTrackingPenaltyProvider();
  const { targetSnapshot } = setScene({ distance: 100, targetMovement: { ground: 180 } });

  try {
    const resolved = await resolveAttack({
      actor,
      payload: {
        sourceType: "mechWeapon",
        sourceId: "w-laser",
        weaponId: "w-laser",
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshot],
        machineMotion: { targetMotion: "moved3Plus" },
      },
    });
    const mods = provider.collect({ actor, resolved, payload: { intent: "attack" } });
    assert.equal(resolved.difficulty.dn, 6);
    assert.equal(resolved.attack.machineMotion.trackingHexes, 6);
    assert.equal(mods.find(mod => mod.id === "machineMotion.tracking")?.value, -3);
  } finally {
    clearScene();
  }
});

test("machine target jump adds flat DN and tracking penalties", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createActor();
  const provider = new EwTrackingPenaltyProvider();
  const { targetSnapshot } = setScene({ distance: 100, targetMovement: { ground: 60 } });

  try {
    const resolved = await resolveAttack({
      actor,
      payload: {
        sourceType: "mechWeapon",
        sourceId: "w-laser",
        weaponId: "w-laser",
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshot],
        machineMotion: { targetMotion: "moved1", jumped: true },
      },
    });
    const mods = provider.collect({ actor, resolved, payload: { intent: "attack" } });
    assert.equal(resolved.difficulty.dn, 5);
    assert.equal(mods.find(mod => mod.id === "machineMotion.tracking")?.value, -1);
    assert.equal(mods.find(mod => mod.id === "machineMotion.jumpTracking")?.value, -1);
  } finally {
    clearScene();
  }
});

test("machine attacks reject fully blocked LOS unless indirect attack is selected", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createActor();
  const { targetSnapshot } = setScene({ distance: 100, targetMovement: { ground: 60 } });

  try {
    await assert.rejects(
      resolveAttack({
        actor,
        payload: {
          sourceType: "mechWeapon",
          sourceId: "w-laser",
          weaponId: "w-laser",
          sourceTokenId: "attacker-token",
          targetSnapshots: [targetSnapshot],
          attackOptions: { losBlocked: true },
        },
      }),
      /Line of sight is fully blocked/
    );

    const indirect = await resolveAttack({
      actor,
      payload: {
        sourceType: "mechWeapon",
        sourceId: "w-laser",
        weaponId: "w-laser",
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshot],
        attackOptions: { losBlocked: true, indirectAttack: true },
      },
    });
    assert.equal(indirect.attack.attackOptions.indirectAttack, true);
  } finally {
    clearScene();
  }
});
