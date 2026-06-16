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
import { MACHINE_STANDARD_MELEE_ID } from "../src/modules/mwd/machine-melee-weapons.js";
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
      randomID: () => "test-random-id",
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

function createCombatant({ tokenId, targetTokenUuid, personalCombat = null } = {}) {
  return {
    id: `${tokenId}-combatant`,
    tokenId,
    getFlag(scope, key) {
      if (scope !== "mwd") return {};
      if (key === "personalCombat") return personalCombat ?? {};
      if (key !== "targeting") return {};
      return {
        [targetTokenUuid]: {
          detectionState: "contact",
          packet: null,
        },
      };
    },
  };
}

function createActor({ weaponProfile = {} } = {}) {
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
        clusteringDice: Number(weaponProfile.clusteringDice ?? 0) || 0,
        clusteringTargetNumber: Number(weaponProfile.clusteringTargetNumber ?? 5) || 5,
        ap: 0,
        damageType: "energy",
        attackRatingBand: { close: 4, near: 3, far: 2, extreme: 1 },
        range: { max: "extreme" },
        defaultRangeBand: "near",
        effects: {},
        template: weaponProfile.template ?? null,
        areaEffect: weaponProfile.areaEffect ?? undefined,
        capabilityReport: weaponProfile.capabilityReport ?? { isTemplated: false, errors: [] },
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

function createAssetModule({
  id = "module",
  name = "Module",
  tags = [],
  capabilities = [],
  stealthProfile = null,
  trackingPenalty = 0,
} = {}) {
  return {
    id,
    name,
    type: "assetModule",
    canonicalType: "assetModule",
    system: {
      activation: { mode: "passive", active: false },
      tags,
      capabilities,
      targeting: stealthProfile ? { stealthProfile } : {},
      effects: trackingPenalty ? [{
        id: `${id}-tracking`,
        label: name,
        timing: "ready",
        scope: "self",
        modifies: { trackingPenalty },
      }] : [],
    },
  };
}

function createPilot({ reflexes = 5, meleeCombat = 4 } = {}) {
  return {
    type: "character",
    name: "Pilot",
    uuid: "Actor.pilot",
    getAttributeValue(key) {
      return key === "reflexes" ? reflexes : 0;
    },
    getSkillRating(key) {
      return key === "meleeCombat" ? meleeCombat : 0;
    },
    system: {
      attributes: {
        reflexes: { value: reflexes },
      },
      skills: {
        meleeCombat: { rating: meleeCombat, bonus: 0 },
      },
    },
  };
}

function createMeleeWeapon({
  id = "katana",
  name = "Katana",
  damage = 1,
  damageType = "p",
  close = 3,
  near = 0,
  rangeMax = "close",
  size = "medium",
} = {}) {
  return {
    id,
    type: "mechWeapon",
    canonicalType: "mechWeapon",
    name,
    system: {
      category: "melee",
      weaponCategory: "melee",
      skill: "meleeCombat",
      size,
      damage,
      ap: 0,
      heat: 0,
      damageType,
      attackRatingBand: { close, near, far: 0, extreme: 0 },
      range: { max: rangeMax, close: 0, near: 0, far: 0, extreme: 0 },
    },
    getCombatProfile() {
      return {
        id: this.id,
        uuid: `Item.${this.id}`,
        name: this.name,
        item: this,
        type: "mechWeapon",
        category: "melee",
        skill: "meleeCombat",
        damage: this.system.damage,
        ap: this.system.ap,
        heat: this.system.heat,
        damageType: this.system.damageType,
        attackRatingBand: this.system.attackRatingBand,
        range: this.system.range,
        defaultRangeBand: "close",
        effects: {},
        capabilityReport: { isTemplated: false, errors: [] },
      };
    },
  };
}

function createMeleeActor({ weapon = createMeleeWeapon(), tonnage = 90, pilotUuid = "Actor.pilot" } = {}) {
  return {
    type: "battlemech",
    name: "Melee Mech",
    uuid: "Actor.melee-mech",
    statuses: new Set(),
    items: new Map([[weapon.id, weapon]]),
    system: {
      attributes: {
        reflexes: { value: 1 },
        system: { value: 3 },
      },
      skills: {
        meleeCombat: { rating: 1, bonus: 0 },
      },
      pilot: { uuid: pilotUuid },
      mwd: {
        tonnage,
        crits: [],
        hardpoints: [{
          id: "hp-melee",
          type: "penetrating",
          size: weapon.system.size,
          location: "arms",
          itemId: weapon.id,
        }],
        locations: {},
        crew: { count: 1, effectiveCount: 1 },
      },
    },
  };
}

function setScene({
  distance = 270,
  targetMovement = {},
  attackerPersonalCombat = null,
  targetPersonalCombat = null,
} = {}) {
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
      combatants: [
        createCombatant({ tokenId: attackerToken.id, targetTokenUuid, personalCombat: attackerPersonalCombat }),
        createCombatant({ tokenId: targetToken.id, personalCombat: targetPersonalCombat }),
      ],
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
    targetToken,
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

function createPersonalActorWithWeapon({ flags = ["automatic"], payloadId = "standard" } = {}) {
  const weapon = {
    id: "auto-rifle",
    type: "personalWeapon",
    canonicalType: "personalWeapon",
    name: "Auto Rifle",
    system: {
      equipped: true,
      selectedPayloadId: payloadId,
      selectedPayloadKey: "",
      selectedPayloadUuid: "",
    },
    isPersonalWeapon: () => true,
    isWeapon: () => true,
    getCombatProfile() {
      return {
        id: this.id,
        uuid: "Item.auto-rifle",
        name: this.name,
        item: this,
        type: "personalWeapon",
        category: "ranged",
        skill: "firearms",
        damage: 4,
        clusteringDice: 0,
        clusteringTargetNumber: 5,
        ap: 0,
        damageType: "penetrating",
        damageTypeLabel: "Penetrating",
        attackRatingBand: { close: 4, near: 3, far: 2, extreme: 1 },
        range: { max: "near", close: 20, near: 80, far: 0, extreme: 0 },
        defaultRangeBand: "close",
        effects: { flags },
        traits: [],
        keywords: [],
        payload: { id: payloadId, label: "Standard" },
        payloadState: {
          activePayloadId: payloadId,
          payloadLabel: "Standard",
          payloads: [{ id: "unloaded", label: "Unloaded" }, { id: payloadId, label: "Standard" }],
        },
        sourceState: { isTracked: false },
        fireModes: {
          single: { enabled: true },
          burst: { enabled: flags.includes("automatic") },
          spray: { enabled: flags.includes("automatic") || flags.includes("spread") },
        },
        capabilityReport: { isTemplated: false, errors: [] },
      };
    },
  };

  return {
    type: "character",
    name: "Infantry",
    uuid: "Actor.infantry",
    statuses: new Set(),
    items: new Map([[weapon.id, weapon]]),
    getAttributeValue(key) {
      if (key === "reflexes") return 4;
      if (key === "strength") return 5;
      return 0;
    },
    getSkillRating(key) {
      if (key === "firearms") return 3;
      if (key === "meleeCombat") return 2;
      return 0;
    },
    system: {
      attributes: { reflexes: { value: 4 }, strength: { value: 5 } },
      skills: { firearms: { rating: 3, bonus: 0 }, meleeCombat: { rating: 2, bonus: 0 } },
    },
  };
}

function setPersonalSprayScene() {
  const attackerToken = { id: "attacker-token", center: { x: 0, y: 0 } };
  const primary = { id: "primary-token", visible: true, center: { x: 10, y: 0 }, document: { id: "primary-token", uuid: "Scene.scene.Token.primary-token" } };
  const adjacent = { id: "adjacent-token", visible: true, center: { x: 16, y: 0 }, document: { id: "adjacent-token", uuid: "Scene.scene.Token.adjacent-token" } };
  const distant = { id: "distant-token", visible: true, center: { x: 24, y: 0 }, document: { id: "distant-token", uuid: "Scene.scene.Token.distant-token" } };
  const tokens = new Map([
    [attackerToken.id, attackerToken],
    [primary.id, primary],
    [adjacent.id, adjacent],
    [distant.id, distant],
  ]);
  const distanceBetween = (left, right) => Math.hypot(Number((right?.x ?? 0) - (left?.x ?? 0)), Number((right?.y ?? 0) - (left?.y ?? 0)));

  globalThis.game = {
    combat: { round: 1, combatants: [] },
    user: { targets: new Set() },
  };
  globalThis.canvas = {
    tokens: {
      get: id => tokens.get(id) ?? null,
      placeables: Array.from(tokens.values()),
      controlled: [],
    },
    grid: {
      measurePath: points => ({ distance: distanceBetween(points?.[0], points?.[1]) }),
    },
  };

  const snapshotFor = token => ({
    tokenId: token.id,
    tokenUuid: token.document.uuid,
    actorId: `actor-${token.id}`,
    actorUuid: `Actor.${token.id}`,
    name: token.id,
    attributes: {},
    skills: {},
  });

  return {
    targetSnapshots: [primary, adjacent, distant].map(snapshotFor),
  };
}

test("personal Spray uses primary plus adjacent secondaries and applies mode modifiers", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createPersonalActorWithWeapon({ flags: ["automatic"] });
  const { targetSnapshots } = setPersonalSprayScene();

  try {
    const ctx = await resolveAttack({
      actor,
      payload: {
        intent: "attack",
        weaponId: "auto-rifle",
        payloadId: "standard",
        fireMode: "spray",
        sourceTokenId: "attacker-token",
        targetSnapshots,
      },
    });

    assert.equal(ctx.attack.fireMode.key, "spray");
    assert.equal(ctx.pool.bonus, 1);
    assert.equal(ctx.attack.weapon.attackRatingBand.close, 2);
    assert.equal(ctx.attack.targets.length, 2);
    assert.equal(ctx.attack.targets[0].fireModeTargetRole, "primary");
    assert.equal(ctx.attack.targets[0].grazeOnly, false);
    assert.equal(ctx.attack.targets[1].fireModeTargetRole, "secondary");
    assert.equal(ctx.attack.targets[1].grazeOnly, true);
    assert.equal(ctx.attack.targets[1].tokenId, "adjacent-token");
  } finally {
    clearScene();
  }
});

test("personal Suppressed applies -4 AR and -4 DR in CQ", async () => {
  const resolveAttack = await getResolveAttack();
  const { resolveAttackExecution } = await getAttackResolution();
  const actor = createPersonalActorWithWeapon({ flags: ["automatic"] });
  actor.statuses.add("suppressed");
  const { targetSnapshots } = setPersonalSprayScene();
  const targetSnapshot = {
    ...targetSnapshots[0],
    attributes: { reflexes: 3 },
    skills: { tactics: { rating: 0 } },
    activeArmor: { defenseBonus: 0 },
  };
  const targetActor = {
    id: "target-person",
    uuid: targetSnapshot.actorUuid,
    type: "character",
    name: "Suppressed Target",
    statuses: new Set(["suppressed"]),
    getAttributeValue(key) {
      return key === "reflexes" ? 3 : 0;
    },
    getSkillRating(key) {
      return key === "tactics" ? 0 : 0;
    },
    getPersonalCombatLoadout() {
      return {
        activeArmor: {
          currentArmorRating: 0,
          tags: [],
          mitigationByType: {},
          durability: { current: 0 },
          traitState: { reinforced: { current: 0, max: 0 } },
          item: { id: "armor", update: async () => {} },
        },
      };
    },
    system: {
      monitors: {
        physical: { value: 0, max: 10 },
        fatigue: { value: 0, max: 10 },
      },
      attributes: { reflexes: { value: 3 } },
      skills: { tactics: { rating: 0 } },
      criticals: [],
    },
  };
  const targetToken = { uuid: targetSnapshot.tokenUuid, actor: targetActor };
  const previousFromUuid = globalThis.fromUuid;
  const previousConfig = globalThis.CONFIG;
  globalThis.CONFIG = { ...(previousConfig ?? {}), statusEffects: previousConfig?.statusEffects ?? [] };
  globalThis.fromUuid = async uuid => {
    if (uuid === targetActor.uuid) return targetActor;
    if (uuid === targetToken.uuid) return targetToken;
    return null;
  };

  try {
    const ctx = await resolveAttack({
      actor,
      payload: {
        intent: "attack",
        weaponId: "auto-rifle",
        payloadId: "standard",
        fireMode: "single",
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshot],
      },
    });
    const execution = await resolveAttackExecution({
      attacker: actor,
      ctx,
      outcomeModel: { margin: 1 },
    });
    const result = execution.results[0];

    assert.equal(result.cq.ar.parts.find(part => part.id === "status.suppressed.attackRating")?.value, -4);
    assert.equal(result.cq.dr.parts.find(part => part.id === "status.suppressed.defenseRating")?.value, -4);
  } finally {
    globalThis.fromUuid = previousFromUuid;
    globalThis.CONFIG = previousConfig;
    clearScene();
  }
});

test("personal Grapple is a Close STR + Melee Combat status attack", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createPersonalActorWithWeapon({ flags: ["automatic"] });
  const { targetSnapshots } = setPersonalSprayScene();

  try {
    const ctx = await resolveAttack({
      actor,
      payload: {
        intent: "attack",
        syntheticWeapon: { id: "grapple", name: "Grapple" },
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshots[0]],
      },
    });

    assert.equal(ctx.attack.weapon.id, "grapple");
    assert.equal(ctx.attack.weapon.skill, "meleeCombat");
    assert.equal(ctx.attack.rangeBand, "close");
    assert.equal(ctx.attack.resolution.effect, "grapple");
    assert.equal(ctx.attack.skill.attribute, "strength");
    assert.equal(ctx.pool.attribute, 5);
    assert.equal(ctx.pool.skill, 2);
  } finally {
    clearScene();
  }
});

test("Grapple attack results map to grapple states without damage", async () => {
  const resolveAttack = await getResolveAttack();
  const { resolveAttackExecution } = await getAttackResolution();
  const actor = createPersonalActorWithWeapon({ flags: ["automatic"] });
  const { targetSnapshots } = setPersonalSprayScene();
  const targetSnapshot = {
    ...targetSnapshots[0],
    attributes: { reflexes: 3 },
    skills: { tactics: { rating: 0 } },
    activeArmor: { defenseBonus: 0 },
  };
  const targetActor = {
    uuid: targetSnapshot.actorUuid,
    type: "character",
    name: "Grapple Target",
    statuses: new Set(),
    getAttributeValue(key) {
      return key === "reflexes" ? 3 : 0;
    },
    getSkillRating(key) {
      return key === "tactics" ? 0 : 0;
    },
    system: {
      attributes: { reflexes: { value: 3 } },
      skills: { tactics: { rating: 0 } },
    },
  };
  const previousFromUuid = globalThis.fromUuid;
  globalThis.fromUuid = async uuid => uuid === targetActor.uuid ? targetActor : null;

  try {
    const ctx = await resolveAttack({
      actor,
      payload: {
        intent: "attack",
        syntheticWeapon: { id: "grapple", name: "Grapple" },
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshot],
      },
    });

    const miss = await resolveAttackExecution({ attacker: actor, ctx, outcomeModel: { margin: 0 } });
    assert.equal(miss.results[0].outcome, "miss");
    assert.equal(miss.results[0].grapple.pending, false);
    assert.equal(miss.results[0].grapple.effectLabel, "No effect");
    assert.equal(miss.results[0].damageResult, null);
    assert.equal(miss.results[0].queuedMutation, null);

    const graze = await resolveAttackExecution({ attacker: actor, ctx, outcomeModel: { margin: 1 } });
    assert.equal(graze.results[0].outcome, "graze");
    assert.equal(graze.results[0].grapple.statusId, "grappled");
    assert.equal(graze.results[0].grapple.pending, true);

    const hit = await resolveAttackExecution({ attacker: actor, ctx, outcomeModel: { margin: 3 } });
    assert.equal(hit.results[0].outcome, "hit");
    assert.equal(hit.results[0].grapple.statusId, "restrained");
    assert.equal(hit.results[0].grapple.pending, true);
  } finally {
    globalThis.fromUuid = previousFromUuid;
    clearScene();
  }
});

test("Restrained and Pinned modify Grapple CQ and escalation", async () => {
  const resolveAttack = await getResolveAttack();
  const { resolveAttackExecution } = await getAttackResolution();
  const actor = createPersonalActorWithWeapon({ flags: ["automatic"] });
  actor.statuses.add("restrained");
  const { targetSnapshots } = setPersonalSprayScene();
  const targetSnapshot = {
    ...targetSnapshots[0],
    attributes: { reflexes: 3 },
    skills: { tactics: { rating: 0 } },
    activeArmor: { defenseBonus: 0 },
  };
  const targetActor = {
    uuid: targetSnapshot.actorUuid,
    type: "character",
    name: "Restrained Target",
    statuses: new Set(["restrained"]),
    getAttributeValue(key) {
      return key === "reflexes" ? 3 : 0;
    },
    getSkillRating(key) {
      return key === "tactics" ? 0 : 0;
    },
    system: {
      attributes: { reflexes: { value: 3 } },
      skills: { tactics: { rating: 0 } },
    },
  };
  const previousFromUuid = globalThis.fromUuid;
  globalThis.fromUuid = async uuid => uuid === targetActor.uuid ? targetActor : null;

  try {
    const ctx = await resolveAttack({
      actor,
      payload: {
        intent: "attack",
        syntheticWeapon: { id: "grapple", name: "Grapple" },
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshot],
      },
    });
    const execution = await resolveAttackExecution({ attacker: actor, ctx, outcomeModel: { margin: 1 } });
    const result = execution.results[0];

    assert.equal(result.grapple.previousStatusId, "restrained");
    assert.equal(result.grapple.statusId, "pinned");
    assert.equal(result.cq.ar.parts.find(part => part.id === "status.restrained.attackRating")?.value, -2);
    assert.equal(result.cq.dr.parts.find(part => part.id === "status.restrained.defenseRatingOverride")?.value, -6);
    assert.equal(result.cq.dr.total, 0);

    actor.statuses.delete("restrained");
    actor.statuses.add("pinned");
    const pinnedExecution = await resolveAttackExecution({ attacker: actor, ctx, outcomeModel: { margin: 1 } });
    assert.equal(pinnedExecution.results[0].cq.ar.parts.find(part => part.id === "status.pinned.attackRatingOverride")?.value, -2);
    assert.equal(pinnedExecution.results[0].cq.ar.total, 0);
  } finally {
    globalThis.fromUuid = previousFromUuid;
    clearScene();
  }
});

test("Grappled attackers take AR penalty against targets other than their grappler", async () => {
  const resolveAttack = await getResolveAttack();
  const { resolveAttackExecution } = await getAttackResolution();
  const actor = createPersonalActorWithWeapon({ flags: ["automatic"] });
  actor.statuses.add("grappled");
  actor.effects = [{
    statuses: new Set(["grappled"]),
    flags: { mwd: { status: { id: "grappled", attackerUuid: "Actor.grappler" } } },
  }];
  const { targetSnapshots } = setPersonalSprayScene();
  const targetSnapshot = {
    ...targetSnapshots[0],
    attributes: { reflexes: 3 },
    skills: { tactics: { rating: 0 } },
    activeArmor: { defenseBonus: 0 },
  };
  const previousFromUuid = globalThis.fromUuid;
  globalThis.fromUuid = async () => null;

  try {
    const otherCtx = await resolveAttack({
      actor,
      payload: {
        intent: "attack",
        syntheticWeapon: { id: "grapple", name: "Grapple" },
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshot],
      },
    });
    const other = await resolveAttackExecution({ attacker: actor, ctx: otherCtx, outcomeModel: { margin: 1 } });
    assert.equal(other.results[0].cq.ar.parts.find(part => part.id === "status.grappled.attackRating")?.value, -2);

    const grapplerCtx = await resolveAttack({
      actor,
      payload: {
        intent: "attack",
        syntheticWeapon: { id: "grapple", name: "Grapple" },
        sourceTokenId: "attacker-token",
        targetSnapshots: [{ ...targetSnapshot, actorUuid: "Actor.grappler" }],
      },
    });
    const grappler = await resolveAttackExecution({ attacker: actor, ctx: grapplerCtx, outcomeModel: { margin: 1 } });
    assert.equal(grappler.results[0].cq.ar.parts.some(part => part.id === "status.grappled.attackRating"), false);
  } finally {
    globalThis.fromUuid = previousFromUuid;
    clearScene();
  }
});

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

test("machine melee weapons resolve tonnage damage and pilot REF attack ratings", async () => {
  const resolveAttack = await getResolveAttack();
  const pilot = createPilot({ reflexes: 5, meleeCombat: 4 });
  globalThis.fromUuid = async uuid => uuid === pilot.uuid ? pilot : null;

  const actor = createMeleeActor({
    weapon: createMeleeWeapon({
      id: "katana",
      name: "Katana",
      damage: 1,
      damageType: "p",
      close: 3,
      rangeMax: "close",
    }),
    tonnage: 90,
  });
  const { targetSnapshot } = setScene({ distance: 30 });

  try {
    const resolved = await resolveAttack({
      actor,
      payload: {
        sourceType: "mechWeapon",
        sourceId: "katana",
        weaponId: "katana",
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshot],
      },
    });

    assert.equal(resolved.attack.rangeBand, "close");
    assert.equal(resolved.attack.weapon.damage, 10);
    assert.equal(resolved.attack.weapon.damageType, "penetrating");
    assert.equal(resolved.attack.weapon.attackRatingBand.close, 8);
    assert.equal(resolved.pool.attribute, 5);
    assert.equal(resolved.pool.skill, 4);
  } finally {
    delete globalThis.fromUuid;
    clearScene();
  }
});

test("machine melee reach supports Battle Flail near penalties and blocks close-only melee at near", async () => {
  const resolveAttack = await getResolveAttack();
  const pilot = createPilot({ reflexes: 5, meleeCombat: 4 });
  globalThis.fromUuid = async uuid => uuid === pilot.uuid ? pilot : null;

  const flailActor = createMeleeActor({
    weapon: createMeleeWeapon({
      id: "battle-flail",
      name: "Battle Flail",
      damage: 2,
      damageType: "c",
      close: -2,
      near: -4,
      rangeMax: "near",
    }),
    tonnage: 90,
  });
  const { targetSnapshot } = setScene({ distance: 100 });

  try {
    const flail = await resolveAttack({
      actor: flailActor,
      payload: {
        sourceType: "mechWeapon",
        sourceId: "battle-flail",
        weaponId: "battle-flail",
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshot],
      },
    });

    assert.equal(flail.attack.rangeBand, "near");
    assert.equal(flail.attack.weapon.damage, 11);
    assert.equal(flail.attack.weapon.damageType, "concussive");
    assert.equal(flail.attack.weapon.attackRatingBand.close, 3);
    assert.equal(flail.attack.weapon.attackRatingBand.near, 1);

    const swordActor = createMeleeActor({
      weapon: createMeleeWeapon({
        id: "sword",
        name: "Sword",
        damage: 1,
        damageType: "p",
        close: 0,
        rangeMax: "close",
      }),
      tonnage: 90,
    });
    const sword = await resolveAttack({
      actor: swordActor,
      payload: {
        sourceType: "mechWeapon",
        sourceId: "sword",
        weaponId: "sword",
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshot],
      },
    });
    assert.equal(sword.attack.rangeBand, "outOfRange");
  } finally {
    delete globalThis.fromUuid;
    clearScene();
  }
});

test("standard machine melee uses floor tonnage over ten and pilot REF", async () => {
  const resolveAttack = await getResolveAttack();
  const pilot = createPilot({ reflexes: 4, meleeCombat: 3 });
  globalThis.fromUuid = async uuid => uuid === pilot.uuid ? pilot : null;

  const actor = createMeleeActor({ weapon: createMeleeWeapon(), tonnage: 75 });
  const { targetSnapshot } = setScene({ distance: 30 });

  try {
    const resolved = await resolveAttack({
      actor,
      payload: {
        sourceType: "mechWeapon",
        syntheticWeapon: { id: MACHINE_STANDARD_MELEE_ID },
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshot],
      },
    });

    assert.equal(resolved.attack.weapon.name, "Standard Melee");
    assert.equal(resolved.attack.weapon.damage, 7);
    assert.equal(resolved.attack.weapon.attackRatingBand.close, 4);
    assert.equal(resolved.pool.attribute, 4);
    assert.equal(resolved.pool.skill, 3);
  } finally {
    delete globalThis.fromUuid;
    clearScene();
  }
});

test("attacks do not add net hits to damage", async () => {
  const { doesAttackAddNetHitsToDamage } = await getAttackResolution();
  assert.equal(doesAttackAddNetHitsToDamage({ type: "mechWeapon" }), false);
  assert.equal(doesAttackAddNetHitsToDamage({ type: "mechWeaponGroup" }), false);
  assert.equal(doesAttackAddNetHitsToDamage({ type: "vehicleWeapon" }), false);
  assert.equal(doesAttackAddNetHitsToDamage({ type: "personalWeapon" }), false);
  assert.equal(doesAttackAddNetHitsToDamage({ isSynthetic: true }), false);
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

test("machine attack execution queues canonical machine damage mutation", async () => {
  const resolveAttack = await getResolveAttack();
  const { resolveAttackExecution } = await getAttackResolution();
  const actor = createActor();
  const { targetSnapshot } = setScene();
  const targetActor = {
    id: "target-actor",
    uuid: "Actor.target-mech",
    type: "battlemech",
    name: "Target Mech",
    statuses: new Set(),
    system: {
      monitors: {
        armor: { value: 6, max: 6 },
        structure: { value: 10, max: 10 },
      },
      attributes: {
        handling: { value: 1 },
        reliability: { value: 3 },
      },
      skills: {
        piloting: { rating: 1 },
      },
      mwd: {
        shock: { value: 0 },
        reliabilitySpendable: { value: 3 },
        locations: {
          head: { enabled: true, stress: 0, condition: 0, destroyed: false },
          torso: { enabled: true, stress: 0, condition: 0, destroyed: false },
          arms: { enabled: true, stress: 0, condition: 0, destroyed: false },
          legs: { enabled: true, stress: 0, condition: 0, destroyed: false },
        },
        crits: [],
      },
    },
  };
  const targetToken = { uuid: targetSnapshot.tokenUuid, actor: targetActor };
  const previousFromUuid = globalThis.fromUuid;
  globalThis.fromUuid = async uuid => {
    if (uuid === targetActor.uuid) return targetActor;
    if (uuid === targetToken.uuid) return targetToken;
    return null;
  };

  try {
    const ctx = await resolveAttack({
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
    const execution = await resolveAttackExecution({
      attacker: actor,
      ctx,
      outcomeModel: { margin: 4 },
    });
    const mutation = execution.results[0].queuedMutation;

    assert.equal(mutation.type, "machineAttackDamage");
    assert.equal(mutation.targetActorUuid, targetActor.uuid);
    assert.equal(mutation.targetTokenUuid, targetToken.uuid);
    assert.equal(mutation.applied, false);
    assert.equal(mutation.previewRevision, 0);
    assert.equal(typeof mutation.hitLocation.impactLabel, "string");
    assert.ok(["head", "torso", "arms", "legs"].includes(mutation.hitLocation.rulesLocation));
    assert.equal(typeof mutation.critical.mode, "string");
    assert.equal(mutation.payload.requirePreparedCriticalRecords, true);
    assert.deepEqual(mutation.preparedCriticalRecords, mutation.payload.preparedCriticalRecords ?? []);
  } finally {
    globalThis.fromUuid = previousFromUuid;
    clearScene();
  }
});

test("machine clustered attacks roll cluster dice and add hits to queued damage", async () => {
  const resolveAttack = await getResolveAttack();
  const { resolveAttackExecution } = await getAttackResolution();
  const actor = createActor({ weaponProfile: { clusteringDice: 4, clusteringTargetNumber: 5 } });
  const { targetSnapshot } = setScene();
  const targetActor = {
    id: "target-actor",
    uuid: "Actor.target-mech",
    type: "battlemech",
    name: "Target Mech",
    statuses: new Set(),
    system: {
      monitors: {
        armor: { value: 10, max: 10 },
        structure: { value: 10, max: 10 },
      },
      attributes: {
        handling: { value: 1 },
        reliability: { value: 3 },
      },
      skills: {
        piloting: { rating: 1 },
      },
      mwd: {
        shock: { value: 0 },
        reliabilitySpendable: { value: 3 },
        locations: {
          head: { enabled: true, stress: 0, condition: 0, destroyed: false },
          torso: { enabled: true, stress: 0, condition: 0, destroyed: false },
          arms: { enabled: true, stress: 0, condition: 0, destroyed: false },
          legs: { enabled: true, stress: 0, condition: 0, destroyed: false },
        },
        crits: [],
      },
    },
  };
  const targetToken = { uuid: targetSnapshot.tokenUuid, actor: targetActor };
  const previousFromUuid = globalThis.fromUuid;
  const previousRoll = globalThis.Roll;
  globalThis.fromUuid = async uuid => {
    if (uuid === targetActor.uuid) return targetActor;
    if (uuid === targetToken.uuid) return targetToken;
    return null;
  };
  globalThis.Roll = class {
    constructor(formula) {
      this.formula = formula;
      this.total = 10;
      this.dice = [{
        results: formula.includes("cs>=")
          ? [
            { result: 6, success: true },
            { result: 5, success: true },
            { result: 3, success: false },
            { result: 1, success: false },
          ]
          : [],
      }];
    }

    async evaluate() {
      return this;
    }

    evaluateSync() {
      return this;
    }

    toJSON() {
      return { formula: this.formula };
    }
  };

  try {
    const ctx = await resolveAttack({
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
    const execution = await resolveAttackExecution({
      attacker: actor,
      ctx,
      outcomeModel: { margin: 4 },
    });
    const result = execution.results[0];
    const mutation = result.queuedMutation;

    assert.equal(result.damage.clustering.rolled, true);
    assert.equal(result.damage.clustering.hits, 2);
    assert.equal(result.damage.incoming, 6);
    assert.equal(mutation.payload.damage, 6);
    assert.equal(mutation.payload.attackDamage.clustering.hits, 2);
    assert.equal(result.damageResult.attackDamage.clustering.hits, 2);
  } finally {
    globalThis.fromUuid = previousFromUuid;
    globalThis.Roll = previousRoll;
    clearScene();
  }
});

test("direct clustered machine attacks convert damage for personal targets", async () => {
  const resolveAttack = await getResolveAttack();
  const { resolveAttackExecution } = await getAttackResolution();
  const actor = createActor({ weaponProfile: { clusteringDice: 4, clusteringTargetNumber: 5 } });
  const { targetSnapshot } = setScene();
  const targetActor = {
    id: "target-character",
    uuid: "Actor.target-character",
    type: "character",
    name: "Barracuda",
    statuses: new Set(),
    getAttributeValue(key) {
      return key === "reflexes" ? 1 : 0;
    },
    getSkillRating(key) {
      return key === "tactics" ? 0 : 0;
    },
    getPersonalCombatLoadout() {
      return {
        activeArmor: {
          currentArmorRating: 8,
          tags: [],
          mitigationByType: { energy: 2 },
          durability: { current: 8 },
          traitState: { reinforced: { current: 0, max: 0 } },
          item: { id: "armor", update: async () => {} },
        },
      };
    },
    system: {
      monitors: {
        physical: { value: 0, max: 10 },
        fatigue: { value: 0, max: 10 },
      },
      attributes: {
        reflexes: { value: 1 },
      },
      skills: {
        tactics: { rating: 0 },
      },
      criticals: [],
    },
  };
  const personalTargetSnapshot = {
    ...targetSnapshot,
    actorId: targetActor.id,
    actorUuid: targetActor.uuid,
    name: targetActor.name,
    attributes: { reflexes: 1 },
    skills: { tactics: { rating: 0 } },
    activeArmor: { defenseBonus: 0 },
  };
  const targetToken = { uuid: targetSnapshot.tokenUuid, actor: targetActor };
  const previousFromUuid = globalThis.fromUuid;
  const previousRoll = globalThis.Roll;
  globalThis.fromUuid = async uuid => {
    if (uuid === targetActor.uuid) return targetActor;
    if (uuid === targetToken.uuid) return targetToken;
    return null;
  };
  globalThis.Roll = class {
    constructor(formula) {
      this.formula = formula;
      this.total = formula.includes("cs>=") ? 17 : 2;
      this.dice = [{
        results: formula.includes("cs>=")
          ? [
            { result: 3, success: false },
            { result: 6, success: true },
            { result: 5, success: true },
            { result: 6, success: true },
          ]
          : [
            { result: 1, success: false },
            { result: 1, success: false },
          ],
      }];
    }

    async evaluate() {
      return this;
    }

    evaluateSync() {
      return this;
    }

    toJSON() {
      return { formula: this.formula };
    }
  };

  try {
    const ctx = await resolveAttack({
      actor,
      payload: {
        intent: "attack",
        sourceType: "mechWeapon",
        sourceId: "w-laser",
        weaponId: "w-laser",
        rangeBand: "near",
        sourceTokenId: "attacker-token",
        targetSnapshots: [personalTargetSnapshot],
      },
    });
    const execution = await resolveAttackExecution({
      attacker: actor,
      ctx,
      outcomeModel: { margin: 1 },
    });
    const result = execution.results[0];
    const mutation = result.queuedMutation;

    assert.equal(ctx.attack.areaEffect.kind, "none");
    assert.equal(ctx.attack.damageScaling, "direct");
    assert.equal(result.damage.effectiveWeaponDamage, 4);
    assert.equal(result.damage.clustering.hits, 3);
    assert.equal(result.damage.incoming, 7);
    assert.equal(result.damage.scaledIncoming, 7);
    assert.equal(result.damage.usesExposureScaling, false);
    assert.equal(mutation.payload.damage, 7);
    assert.equal(result.damageResult.sourceScale, "machine");
    assert.equal(result.damageResult.targetScale, "personal");
    assert.equal(result.damageResult.damageIncoming, 70);
    assert.equal(result.damageResult.scaleConversion.original, 7);
    assert.equal(result.damageResult.scaleConversion.converted, 70);
    assert.equal(result.damageResult.mitigation.netResistance, 4);
    assert.equal(result.damageResult.finalDamage, 66);
  } finally {
    globalThis.fromUuid = previousFromUuid;
    globalThis.Roll = previousRoll;
    clearScene();
  }
});

test("grazes halve the total clustered incoming damage", async () => {
  const resolveAttack = await getResolveAttack();
  const { resolveAttackExecution } = await getAttackResolution();
  const actor = createActor({ weaponProfile: { clusteringDice: 4, clusteringTargetNumber: 5 } });
  const { targetSnapshot } = setScene();
  const targetActor = {
    id: "target-character",
    uuid: "Actor.target-character",
    type: "character",
    name: "Barracuda",
    statuses: new Set(),
    getAttributeValue(key) {
      return key === "reflexes" ? 3 : 0;
    },
    getSkillRating() {
      return 0;
    },
    getPersonalCombatLoadout() {
      return {
        activeArmor: {
          currentArmorRating: 0,
          tags: [],
          mitigationByType: {},
          durability: { current: 0 },
          traitState: { reinforced: { current: 0, max: 0 } },
          item: { id: "armor", update: async () => {} },
        },
      };
    },
    system: {
      monitors: {
        physical: { value: 0, max: 10 },
        fatigue: { value: 0, max: 10 },
      },
      attributes: {
        reflexes: { value: 3 },
      },
      skills: {
        tactics: { rating: 0 },
      },
      criticals: [],
    },
  };
  const personalTargetSnapshot = {
    ...targetSnapshot,
    actorId: targetActor.id,
    actorUuid: targetActor.uuid,
    name: targetActor.name,
    attributes: { reflexes: 3 },
    skills: { tactics: { rating: 0 } },
    activeArmor: { defenseBonus: 0 },
  };
  const targetToken = { uuid: targetSnapshot.tokenUuid, actor: targetActor };
  const previousFromUuid = globalThis.fromUuid;
  const previousRoll = globalThis.Roll;
  globalThis.fromUuid = async uuid => {
    if (uuid === targetActor.uuid) return targetActor;
    if (uuid === targetToken.uuid) return targetToken;
    return null;
  };
  globalThis.Roll = class {
    constructor(formula) {
      this.formula = formula;
      this.total = formula.includes("cs>=") ? 17 : 2;
      this.dice = [{
        results: formula.includes("cs>=")
          ? [
            { result: 3, success: false },
            { result: 6, success: true },
            { result: 5, success: true },
            { result: 6, success: true },
          ]
          : [
            { result: 1, success: false },
            { result: 1, success: false },
          ],
      }];
    }

    async evaluate() {
      return this;
    }

    evaluateSync() {
      return this;
    }

    toJSON() {
      return { formula: this.formula };
    }
  };

  try {
    const ctx = await resolveAttack({
      actor,
      payload: {
        intent: "attack",
        sourceType: "mechWeapon",
        sourceId: "w-laser",
        weaponId: "w-laser",
        rangeBand: "near",
        sourceTokenId: "attacker-token",
        targetSnapshots: [personalTargetSnapshot],
      },
    });
    const execution = await resolveAttackExecution({
      attacker: actor,
      ctx,
      outcomeModel: { margin: 0 },
    });
    const result = execution.results[0];
    const mutation = result.queuedMutation;

    assert.equal(result.outcome, "graze");
    assert.equal(result.damage.effectiveWeaponDamage, 2);
    assert.equal(result.damage.clustering.hits, 3);
    assert.equal(result.damage.clustering.damageBonus, 1.5);
    assert.equal(result.damage.incoming, 3.5);
    assert.equal(result.damage.scaledIncoming, 3.5);
    assert.equal(mutation.payload.damage, 3.5);
    assert.equal(result.damageResult.sourceScale, "machine");
    assert.equal(result.damageResult.targetScale, "personal");
    assert.equal(result.damageResult.damageIncoming, 35);
    assert.equal(result.damageResult.scaleConversion.original, 3.5);
    assert.equal(result.damageResult.scaleConversion.converted, 35);
  } finally {
    globalThis.fromUuid = previousFromUuid;
    globalThis.Roll = previousRoll;
    clearScene();
  }
});

test("attack resolver declares damage scaling from the resolved workflow", async () => {
  const resolveAttack = await getResolveAttack();
  setScene();

  try {
    const directActor = createActor();
    const directCtx = await resolveAttack({
      actor: directActor,
      payload: {
        intent: "attack",
        sourceType: "mechWeapon",
        sourceId: "w-laser",
        weaponId: "w-laser",
        rangeBand: "near",
        sourceTokenId: "attacker-token",
        targetSnapshots: [{
          actorUuid: "Actor.target",
          tokenId: "target-token",
          tokenUuid: "Scene.scene.Token.target-token",
          name: "Target",
        }],
      },
    });

    const templatedActor = createActor({
      weaponProfile: {
        template: { shape: "blast", placement: "target", size: 6 },
        areaEffect: { kind: "discrete" },
        capabilityReport: { isTemplated: true, errors: [] },
      },
    });
    const templatedCtx = await resolveAttack({
      actor: templatedActor,
      payload: {
        intent: "attack",
        sourceType: "mechWeapon",
        sourceId: "w-laser",
        weaponId: "w-laser",
        rangeBand: "near",
        sourceTokenId: "attacker-token",
      },
    });

    const persistentActor = createActor({
      weaponProfile: {
        template: { shape: "blast", placement: "target", size: 6 },
        areaEffect: { kind: "persistent", hazard: { startExposure: "minor" } },
        capabilityReport: { isTemplated: true, errors: [] },
      },
    });
    const persistentCtx = await resolveAttack({
      actor: persistentActor,
      payload: {
        intent: "attack",
        sourceType: "mechWeapon",
        sourceId: "w-laser",
        weaponId: "w-laser",
        rangeBand: "near",
        sourceTokenId: "attacker-token",
      },
    });

    assert.equal(directCtx.attack.areaEffect.kind, "none");
    assert.equal(directCtx.attack.damageScaling, "direct");
    assert.equal(templatedCtx.attack.areaEffect.kind, "discrete");
    assert.equal(templatedCtx.attack.damageScaling, "exposure");
    assert.equal(persistentCtx.attack.areaEffect.kind, "persistent");
    assert.equal(persistentCtx.attack.damageScaling, "direct");
  } finally {
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

test("machine stealth adds attack tracking dice without changing attack DN", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createActor();
  const provider = new EwTrackingPenaltyProvider();
  const { targetToken, targetSnapshot } = setScene({ distance: 100 });
  targetToken.actor.system.mwd = {
    stealth: {
      enabled: true,
      rating: 2,
      mode: "passive",
      counteredBy: ["activeProbe", "tag", "narc", "c3", "visualClose"],
    },
  };

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
    const mods = provider.collect({ actor, resolved, payload: { intent: "attack" } });

    assert.equal(resolved.difficulty.dn, 3);
    assert.equal(resolved.dn.parts.some(part => part.id === "target.stealth"), false);
    assert.equal(mods.find(mod => mod.id === "tracking.stealth")?.value, -2);

    actor.assetModules = [
      createAssetModule({ id: "probe", name: "Active Probe", tags: ["activeProbe"] }),
    ];
    const probedMods = provider.collect({ actor, resolved, payload: { intent: "attack" } });
    assert.equal(probedMods.find(mod => mod.id === "tracking.stealth")?.value, -1);

    targetToken.actor.statuses.add("narced");
    const narcedMods = provider.collect({ actor, resolved, payload: { intent: "attack" } });
    assert.equal(narcedMods.some(mod => mod.id === "tracking.stealth"), false);
  } finally {
    clearScene();
  }
});

test("stealth counters cannot become positive attack dice", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createActor();
  actor.assetModules = [
    createAssetModule({ id: "probe", name: "Active Probe", tags: ["activeProbe"] }),
    createAssetModule({ id: "c3", name: "C3 Network", tags: ["c3"] }),
  ];
  const provider = new EwTrackingPenaltyProvider();
  const { targetToken, targetSnapshot } = setScene({ distance: 100 });
  targetToken.actor.system.mwd = {
    stealth: {
      enabled: true,
      rating: 1,
      mode: "passive",
      counteredBy: ["activeProbe", "tag", "narc", "c3", "visualClose"],
    },
  };

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
    const mods = provider.collect({ actor, resolved, payload: { intent: "attack" } });
    assert.equal(resolved.difficulty.dn, 3);
    assert.equal(mods.some(mod => mod.id === "tracking.stealth"), false);
  } finally {
    clearScene();
  }
});

test("stealth-profiled legacy tracking modules do not double count", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createActor();
  const provider = new EwTrackingPenaltyProvider();
  const { targetToken, targetSnapshot } = setScene({ distance: 100 });
  targetToken.actor.assetModules = [
    createAssetModule({
      id: "stealth-x",
      name: "Stealth X",
      stealthProfile: { ratingBonus: 2 },
      trackingPenalty: 2,
    }),
  ];

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
    const mods = provider.collect({ actor, resolved, payload: { intent: "attack" } });
    assert.equal(mods.find(mod => mod.id === "tracking.stealth")?.value, -2);
    assert.equal(mods.some(mod => mod.id === "ew.trackingPenalty"), false);
  } finally {
    clearScene();
  }
});

test("machine attacker motion adds DN for non-charge attacks", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createActor();
  const { targetSnapshot } = setScene({
    distance: 100,
    attackerPersonalCombat: {
      actionState: {
        move: {
          movementKind: "run",
          moved: true,
          round: 1,
        },
      },
    },
  });

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

    assert.equal(resolved.attack.machineMotion.attackerMotion, "moved2");
    assert.equal(resolved.attack.machineMotion.attackerMotionDn, 1);
    assert.equal(resolved.dn.parts.find(part => part.id === "machineMotion.attacker")?.value, 1);
    assert.equal(resolved.difficulty.dn, 4);
  } finally {
    clearScene();
  }
});

test("charge attacks suppress machine attacker motion DN", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createActor();
  const { targetSnapshot } = setScene({
    distance: 100,
    attackerPersonalCombat: {
      actionState: {
        move: {
          movementKind: "sprint",
          moved: true,
          round: 1,
        },
      },
    },
  });

  try {
    const resolved = await resolveAttack({
      actor,
      payload: {
        sourceType: "mechWeapon",
        sourceId: "w-laser",
        weaponId: "w-laser",
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshot],
        chargeAttack: { mode: "impact" },
      },
    });

    assert.equal(resolved.attack.machineMotion.attackerMotionSuppressed, true);
    assert.equal(resolved.attack.machineMotion.attackerMotionDn, 0);
    assert.equal(resolved.dn.parts.some(part => part.id === "machineMotion.attacker"), false);
    assert.equal(resolved.difficulty.dn, 3);
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

test("machine target motion defaults from target combatant movement state", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createActor();
  const { targetSnapshot } = setScene({
    distance: 100,
    targetMovement: { ground: 180 },
    targetPersonalCombat: {
      actionState: {
        move: {
          movementKind: "run",
          moved: true,
          round: 1,
        },
      },
    },
  });

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

    assert.equal(resolved.attack.machineMotion.targetMotion, "moved2");
    assert.equal(resolved.attack.machineMotion.jumped, false);
    assert.equal(resolved.difficulty.dn, 5);
  } finally {
    clearScene();
  }
});

test("machine target motion defaults target jumped from jump movement state", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createActor();
  const { targetSnapshot } = setScene({
    distance: 100,
    targetMovement: { ground: 60 },
    targetPersonalCombat: {
      actionState: {
        move: {
          movementKind: "jump",
          moved: true,
          round: 1,
        },
      },
    },
  });

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

    assert.equal(resolved.attack.machineMotion.targetMotion, "moved1");
    assert.equal(resolved.attack.machineMotion.jumped, true);
    assert.equal(resolved.difficulty.dn, 5);
  } finally {
    clearScene();
  }
});

test("explicit machine target motion overrides target combatant movement state", async () => {
  const resolveAttack = await getResolveAttack();
  const actor = createActor();
  const { targetSnapshot } = setScene({
    distance: 100,
    targetMovement: { ground: 180 },
    targetPersonalCombat: {
      actionState: {
        move: {
          movementKind: "sprint",
          moved: true,
          round: 1,
        },
      },
    },
  });

  try {
    const resolved = await resolveAttack({
      actor,
      payload: {
        sourceType: "mechWeapon",
        sourceId: "w-laser",
        weaponId: "w-laser",
        sourceTokenId: "attacker-token",
        targetSnapshots: [targetSnapshot],
        machineMotion: { targetMotion: "stationary", jumped: false },
      },
    });

    assert.equal(resolved.attack.machineMotion.targetMotion, "stationary");
    assert.equal(resolved.attack.machineMotion.jumped, false);
    assert.equal(resolved.difficulty.dn, 3);
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
