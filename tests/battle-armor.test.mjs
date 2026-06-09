import test from "node:test";
import assert from "node:assert/strict";

function makeArmorItem(profile = {}, overrides = {}) {
  const item = {
    id: overrides.id ?? "armor-1",
    uuid: overrides.uuid ?? "Actor.ba.Item.armor-1",
    name: overrides.name ?? "Scout BA",
    img: overrides.img ?? "",
    canonicalType: "armor",
    type: "armor",
    system: { battleArmor: profile },
  };
  item.getArmorProfile = () => ({
    id: item.id,
    uuid: item.uuid,
    name: item.name,
    img: item.img,
    item,
    equipped: true,
    isPrimary: true,
    battleArmor: profile,
  });
  return item;
}

function makeActor(items = [], overrides = {}) {
  return {
    id: overrides.id ?? "actor-1",
    uuid: overrides.uuid ?? "Actor.actor-1",
    type: overrides.type ?? "character",
    statuses: overrides.statuses ?? new Set(),
    items,
    getPersonalCombatLoadout() {
      const armor = items.find(item => item.type === "armor")?.getArmorProfile?.() ?? null;
      return { activeArmor: armor };
    },
  };
}

test("battle armor normalization derives cached state and accepts draft cap aliases", async () => {
  const {
    normalizeBattleArmorProfile,
    deriveBattleArmorState,
  } = await import("../src/modules/mwd/battle-armor.js");

  const profile = normalizeBattleArmorProfile({
    enabled: true,
    armorPool: { value: 0, max: 5 },
    structure: { value: 3, max: 4 },
    systems: {
      stealth: {
        enabled: true,
        bonusTrackingPenalty: 4,
        passiveAcquireCeiling: "acquire",
      },
      medicalSuppression: true,
      attachedEligible: true,
    },
  });

  assert.equal(profile.state, "breached");
  assert.equal(deriveBattleArmorState(profile), "breached");
  assert.equal(profile.systems.stealth.trackingPenalty, 4);
  assert.equal(profile.systems.stealth.detectionStateCap, "lock");
  assert.equal(profile.systems.medicalSuppression, true);
  assert.equal(profile.systems.attachedEligible, true);
});

test("battle armor structure behaves like rating when authored max changes", async () => {
  const {
    normalizeBattleArmorProfile,
    normalizeBattleArmorStructureForRating,
    getBattleArmorStructureResistance,
  } = await import("../src/modules/mwd/battle-armor.js");

  const authored = normalizeBattleArmorProfile({
    enabled: true,
    armorPool: { value: 30, max: 30 },
    structure: { max: 10 },
  });
  assert.equal(authored.structure.value, 10);
  assert.equal(authored.structure.max, 10);
  assert.equal(getBattleArmorStructureResistance(authored), 3);

  const raisedFromEmpty = normalizeBattleArmorStructureForRating(
    10,
    { value: 0, max: 10 },
    {
      previousStructure: { value: 0, max: 0 },
      maxChanged: true,
      valueChanged: false,
    }
  );
  assert.deepEqual(raisedFromEmpty, { value: 10, max: 10 });

  const damagedThenRaised = normalizeBattleArmorStructureForRating(
    12,
    { value: 4, max: 12 },
    {
      previousStructure: { value: 4, max: 10 },
      maxChanged: true,
      valueChanged: false,
    }
  );
  assert.deepEqual(damagedThenRaised, { value: 4, max: 12 });
});

test("battle armor preview applies armor pool, machine scale, structure resistance, and degradation", async () => {
  const { previewBattleArmorDamage } = await import("../src/modules/mwd/battle-armor.js");

  const preview = previewBattleArmorDamage({
    enabled: true,
    armorPool: { value: 2, max: 2 },
    structure: { value: 5, max: 5 },
  }, {
    damage: 1,
    sourceScale: "machine",
  });

  assert.equal(preview.incomingScaled, 10);
  assert.equal(preview.hadArmorShellAtStart, true);
  assert.equal(preview.armorAbsorbed, 2);
  assert.equal(preview.armorPoolMax, 2);
  assert.equal(preview.structureResistance, 2);
  assert.equal(preview.structureReduced, 2);
  assert.equal(preview.structureDegraded, true);
  assert.equal(preview.structureDamage, 1);
  assert.equal(preview.structureAfter, 4);
  assert.equal(preview.structureMax, 5);
  assert.equal(preview.wearerDamage, 6);
  assert.equal(preview.stateAfter, "breached");
});

test("battle armor mounted item lookup keys off mountedOnItemId", async () => {
  const { getMountedBattleArmorItems } = await import("../src/modules/mwd/battle-armor.js");

  const weapon = {
    id: "weapon-1",
    uuid: "Actor.ba.Item.weapon-1",
    name: "BA Claw",
    type: "personalWeapon",
    canonicalType: "personalWeapon",
    system: { mount: { mountedOnItemId: "armor-1", mountType: "antiMachine" }, scale: "machine" },
    getCombatProfile: () => ({ id: "weapon-1", scale: "machine" }),
  };
  const actor = makeActor([makeArmorItem({ enabled: true }), weapon]);

  const mounted = getMountedBattleArmorItems(actor, "armor-1");
  assert.equal(mounted.length, 1);
  assert.equal(mounted[0].id, "weapon-1");
  assert.equal(mounted[0].mount.mountType, "antiMachine");
});

test("battle armor machine target profile applies stealth, counters, and friendly attachment penalty", async () => {
  const { getBattleArmorMachineTargetProfile } = await import("../src/modules/mwd/battle-armor.js");

  const profile = {
    enabled: true,
    armorPool: { value: 4, max: 4 },
    structure: { value: 4, max: 4 },
    attachedToTokenUuid: "Scene.scene.Token.machine-1",
    systems: {
      stealth: { enabled: true, trackingPenalty: 2, detectionStateCap: "track" },
    },
    machineTargetProfile: { sizePenalty: 9 },
  };
  const actor = makeActor([makeArmorItem(profile)], { statuses: new Set() });

  const stealthy = getBattleArmorMachineTargetProfile(actor, {
    friendlyMachineTokenUuid: "Scene.scene.Token.machine-1",
  });
  assert.equal(stealthy.trackingPenalty, 5);
  assert.equal(stealthy.normalPenalty, 1);
  assert.equal(stealthy.detectionStateCap, "track");
  assert.equal(stealthy.friendlyFireRisk, true);

  actor.statuses.add("tagged");
  const countered = getBattleArmorMachineTargetProfile(actor, {
    friendlyMachineTokenUuid: "Scene.scene.Token.machine-1",
  });
  assert.equal(countered.trackingPenalty, 3);
  assert.equal(countered.detectionStateCap, null);
});

test("battle armor attached target discovery checks targeted, selected, scene, and actor sources", async () => {
  const { findAttachedBattleArmorTargets } = await import("../src/modules/mwd/battle-armor.js");

  const machineActor = { id: "machine-actor", uuid: "Actor.machine", type: "battlemech" };
  const machineToken = { id: "machine-1", uuid: "Scene.scene.Token.machine-1", actor: machineActor };
  const profile = {
    enabled: true,
    armorPool: { value: 1, max: 1 },
    structure: { value: 1, max: 1 },
    attachedToTokenUuid: "Scene.scene.Token.machine-1",
  };
  const baActor = makeActor([makeArmorItem(profile)]);
  const baToken = { id: "ba-1", uuid: "Scene.scene.Token.ba-1", actor: baActor };

  globalThis.game = {
    user: { targets: new Set([baToken]) },
    actors: { contents: [] },
  };
  globalThis.canvas = {
    tokens: { controlled: [], placeables: [] },
  };

  const targets = findAttachedBattleArmorTargets(machineActor, { machineToken });
  assert.equal(targets.length, 1);
  assert.equal(targets[0].actor, baActor);
  assert.equal(targets[0].source, "targeted");
});
