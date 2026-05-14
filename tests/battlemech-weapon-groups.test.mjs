import test from "node:test";
import assert from "node:assert/strict";

import {
  buildBattlemechWeaponGroupAttackProfile,
  markBattlemechWeaponGroupUsed,
  prepareBattlemechWeaponGroups,
} from "../src/modules/mwd/battlemech-weapon-groups.js";
import { enhanceAttack } from "../src/modules/roll/renderers/render-attack.js";

function createWeapon({
  id,
  name,
  damage = 0,
  ap = 0,
  heat = 0,
  size = "small",
  damageType = "energy",
  rangeCap = "near",
  attackRatings = {},
  skill = "gunnery",
  category = "ranged",
  resolverKey = "standard",
  area = "none",
  active = true,
  clusteringDice = 0,
  payloadDamageType = "",
} = {}) {
  const effectiveDamageType = payloadDamageType || damageType;
  const labelFor = (type) => type === "energy"
    ? "Energy"
    : type === "penetrating" || type === "ballistic"
      ? "Penetrating"
      : type === "concussive" || type === "explosive"
        ? "Concussive"
        : type === "thermal"
          ? "Thermal"
          : type === "electrical"
            ? "Electrical"
            : type;
  return {
    id,
    name,
    img: "",
    type: "mechWeapon",
    canonicalType: "mechWeapon",
    system: {
      category,
      weaponCategory: category,
      damage,
      ap,
      heat,
      size,
      damageType,
      range: { max: rangeCap },
      attackRatingBand: attackRatings,
      resolution: { resolverKey },
      area,
    },
    isActive() {
      return active;
    },
    getDamageTypeLabel() {
      return labelFor(effectiveDamageType);
    },
    getCombatProfile() {
      return {
        id,
        name,
        category,
        skill,
        skillDef: { code: skill, label: "Gunnery" },
        damage,
        clusteringDice,
        ap,
        baseDamageType: damageType,
        baseDamageTypeLabel: labelFor(damageType),
        damageType: effectiveDamageType,
        damageTypeLabel: this.getDamageTypeLabel(),
        attackRatingBand: {
          close: Number(attackRatings.close ?? 0) || 0,
          near: Number(attackRatings.near ?? 0) || 0,
          far: Number(attackRatings.far ?? 0) || 0,
          extreme: Number(attackRatings.extreme ?? 0) || 0,
        },
        range: {
          max: rangeCap,
          close: 0,
          near: 0,
          far: 0,
          extreme: 0,
        },
        areaEffect: { kind: "discrete" },
        resolverKey,
        notes: "",
      };
    },
  };
}

function createActor({ groups = [], weapons = [] } = {}) {
  const hardpoints = weapons.map((weapon, index) => ({
    id: `hp-${index + 1}`,
    type: weapon.system?.damageType ?? "energy",
    size: weapon.system?.size ?? "small",
    location: "arms",
    itemId: weapon.id,
  }));

  return {
    type: "battlemech",
    uuid: "Actor.test",
    system: {
      mwd: {
        hardpoints,
        weaponGroups: groups,
      },
    },
    items: new Map(weapons.map(weapon => [weapon.id, weapon])),
  };
}

test("BattleMech ranged groups aggregate homogeneous ranged weapons and use the worst attack ratings at the worst range cap", () => {
  const laserA = createWeapon({
    id: "laser-a",
    name: "Medium Laser A",
    damage: 4,
    ap: 1,
    heat: 2,
    damageType: "energy",
    rangeCap: "far",
    attackRatings: { close: 2, near: 4, far: 3, extreme: 1 },
  });
  const laserB = createWeapon({
    id: "laser-b",
    name: "Medium Laser B",
    damage: 5,
    ap: 2,
    heat: 3,
    damageType: "energy",
    rangeCap: "near",
    attackRatings: { close: 1, near: 2, far: 1, extreme: 0 },
    clusteringDice: 2,
  });
  const actor = createActor({
    groups: [{ id: "alpha", name: "Alpha", weaponIds: ["laser-a", "laser-b"] }],
    weapons: [laserA, laserB],
  });

  const [group] = prepareBattlemechWeaponGroups(actor);

  assert.equal(group.isAttackLegal, true);
  assert.equal(group.attackSummary.damage, 9);
  assert.equal(group.attackSummary.clusteringDice, 2);
  assert.equal(group.attackSummary.ap, 2);
  assert.equal(group.attackSummary.heat, 5);
  assert.equal(group.attackSummary.rangeCap, "near");
  assert.deepEqual(group.attackSummary.attackRatings, {
    close: 1,
    near: 2,
    far: 0,
    extreme: 0,
  });
  assert.deepEqual(group.memberWeapons.map(weapon => weapon.name), ["Medium Laser A", "Medium Laser B"]);
  assert.deepEqual(group.memberHardpoints.map(hardpoint => hardpoint.itemId), ["laser-a", "laser-b"]);
});

test("BattleMech ranged groups block mixed damage types and special-case profiles", () => {
  const laser = createWeapon({
    id: "laser",
    name: "Laser",
    damageType: "energy",
    rangeCap: "far",
    attackRatings: { close: 2, near: 3, far: 2, extreme: 0 },
  });
  const autocannon = createWeapon({
    id: "ac",
    name: "Autocannon",
    damageType: "ballistic",
    rangeCap: "far",
    attackRatings: { close: 1, near: 2, far: 3, extreme: 1 },
  });
  const missile = createWeapon({
    id: "missile",
    name: "Missile Rack",
    damageType: "explosive",
    rangeCap: "far",
    attackRatings: { close: 1, near: 2, far: 2, extreme: 1 },
    area: "cone",
  });

  const mixedActor = createActor({
    groups: [{ id: "mixed", name: "Mixed", weaponIds: ["laser", "ac"] }],
    weapons: [laser, autocannon],
  });
  const specialActor = createActor({
    groups: [{ id: "special", name: "Special", weaponIds: ["missile"] }],
    weapons: [missile],
  });

  const [mixed] = prepareBattlemechWeaponGroups(mixedActor);
  const [special] = prepareBattlemechWeaponGroups(specialActor);

  assert.equal(mixed.isAttackLegal, false);
  assert.match(mixed.disableReason, /same damage type/i);
  assert.equal(special.isAttackLegal, false);
  assert.match(special.disableReason, /special attack mode/i);
});

test("BattleMech energy weapons with thermal and electrical payload effects group as Energy", () => {
  const flamer = createWeapon({
    id: "flamer",
    name: "Flamer",
    damageType: "energy",
    payloadDamageType: "thermal",
    rangeCap: "near",
    attackRatings: { close: 2, near: 2, far: 0, extreme: 0 },
  });
  const taser = createWeapon({
    id: "taser",
    name: "Taser",
    damageType: "energy",
    payloadDamageType: "electrical",
    rangeCap: "near",
    attackRatings: { close: 1, near: 2, far: 0, extreme: 0 },
  });
  const actor = createActor({
    groups: [{ id: "specialized-energy", name: "Specialized Energy", weaponIds: ["flamer", "taser"] }],
    weapons: [flamer, taser],
  });

  const [group] = prepareBattlemechWeaponGroups(actor);

  assert.equal(group.isAttackLegal, true);
  assert.equal(group.attackSummary.baseDamageType, "energy");
  assert.equal(group.attackSummary.damageType, "energy");
  assert.equal(group.attackSummary.damageTypeLabel, "Energy");
});

test("BattleMech standard direct-fire profiles remain groupable when their area effect is discrete", () => {
  const laser = createWeapon({
    id: "laser",
    name: "Laser",
    damage: 4,
    heat: 2,
    damageType: "energy",
    rangeCap: "near",
    attackRatings: { close: 2, near: 3, far: 0, extreme: 0 },
  });
  const actor = createActor({
    groups: [{ id: "alpha", name: "Alpha", weaponIds: ["laser"] }],
    weapons: [laser],
  });

  const [group] = prepareBattlemechWeaponGroups(actor);

  assert.equal(group.isAttackLegal, true);
  assert.equal(group.memberWeapons.length, 1);
  assert.equal(group.attackSummary?.damage, 4);
  assert.equal(group.attackSummary?.heat, 2);
});

test("BattleMech ranged groups become unavailable once marked used this activation", () => {
  const laser = createWeapon({
    id: "laser",
    name: "Laser",
    damage: 4,
    damageType: "energy",
    rangeCap: "near",
    attackRatings: { close: 2, near: 3, far: 0, extreme: 0 },
  });
  const actor = createActor({
    groups: [{ id: "alpha", name: "Alpha", weaponIds: ["laser"] }],
    weapons: [laser],
  });

  const usedState = markBattlemechWeaponGroupUsed({ actionState: {} }, "alpha");
  const [group] = prepareBattlemechWeaponGroups(actor, {
    usedWeaponGroupIds: usedState.actionState.usedWeaponGroupIds,
  });
  const profile = buildBattlemechWeaponGroupAttackProfile(actor, "alpha", {
    usedWeaponGroupIds: usedState.actionState.usedWeaponGroupIds,
  });

  assert.equal(group.isAttackLegal, true);
  assert.equal(group.isAvailableThisActivation, false);
  assert.match(group.disableReason, /already fired this activation/i);
  assert.equal(profile.ok, false);
  assert.match(profile.reason, /already fired this activation/i);
});

test("BattleMech ranged groups require mounted hardpoints to stay actionable", () => {
  const laser = createWeapon({
    id: "laser",
    name: "Laser",
    damage: 4,
    damageType: "energy",
    rangeCap: "near",
    attackRatings: { close: 2, near: 3, far: 0, extreme: 0 },
  });
  const actor = {
    type: "battlemech",
    uuid: "Actor.unmounted",
    system: {
      mwd: {
        hardpoints: [],
        weaponGroups: [{ id: "alpha", name: "Alpha", weaponIds: ["laser"] }],
      },
    },
    items: new Map([[laser.id, laser]]),
  };

  const [group] = prepareBattlemechWeaponGroups(actor);

  assert.equal(group.isAttackLegal, false);
  assert.match(group.disableReason, /not mounted in a loaded hardpoint/i);
});

test("attack card enhancement surfaces BattleMech group members and aggregate profile", () => {
  const vm = {
    metaRows: [],
    footerRows: [],
    actions: [],
    targetRows: [],
  };

  enhanceAttack({
    attack: {
      weapon: {
        name: "Alpha",
        clusteringDice: 2,
        clusteringTargetNumber: 4,
        machineWeaponGroup: {
          id: "alpha",
          weaponNames: ["Medium Laser A", "Medium Laser B"],
        },
        attackSummary: {
          damage: 9,
          clusteringDice: 2,
          ap: 2,
          heat: 5,
          damageType: "energy",
          damageTypeLabel: "Energy",
          rangeCap: "near",
          attackRatings: { close: 1, near: 2, far: 0, extreme: 0 },
        },
      },
      capabilityReport: { isTemplated: false },
    },
    attackResult: {
      results: [{
        target: { name: "Target" },
        outcome: "hit",
        netHits: 2,
        cq: {
          value: 1,
          ar: { total: 4, parts: [] },
          dr: { total: 3, parts: [] },
        },
        damage: {
          damageTypeLabel: "Energy",
          effectiveWeaponDamage: 9,
          clustering: {
            dice: 2,
            targetNumber: 4,
            hits: 1,
            damageBonus: 1,
          },
          netHits: 2,
          netDamageBonus: 0,
        },
        damageResult: {
          ok: false,
          reason: "Preview skipped",
        },
      }],
      summary: { hits: 1, grazes: 0, misses: 0, overallOutcome: "hit" },
    },
  }, vm);

  assert(vm.metaRows.some(row => /Group: Alpha/i.test(row.text)));
  assert(vm.metaRows.some(row => /Members: Medium Laser A, Medium Laser B/i.test(row.text)));
  assert(vm.metaRows.some(row => /Clustering: 2d6 @ 4\+/i.test(row.text)));
  assert(vm.metaRows.some(row => /Profile: 9 damage \| 2d6 cluster @ 4\+ \| AP 2 \| Heat 5/i.test(row.text)));
  assert(vm.footerRows.some(row => /Attack Ratings: Close 1 \| Near 2 \| Far 0 \| Extreme 0/i.test(row.text)));
  assert(vm.footerRows.some(row => /Target: Energy \+9 weapon \+ ?1 cluster$/i.test(row.text)));
  assert(vm.footerRows.some(row => /Target: Cluster 2d6 @ 4\+ -> 1 hit/i.test(row.text)));
});
