import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const OUT_DIR = path.resolve("src/packs/weapons");
const SYSTEM_PREFIX = "systems/mwd/";
const SOURCE = "Personal Weapons";

const weapons = [
  ["Axe", "melee", "meleeCombat", "3 + STR", 1, "Penetrating", 9, "-", "-", "-", "", "Common", "img/icons/systems/weapons/axe.svg"],
  ["Blackjack / Sap", "melee", "meleeCombat", "4 + STR", 0, "Concussive", 2, "-", "-", "-", "Fatigue, Concealable", "Common", "img/icons/systems/weapons/baton.svg"],
  ["Club", "melee", "meleeCombat", "2 + STR", 0, "Concussive", 6, "-", "-", "-", "", "Common", "img/icons/systems/weapons/baseball-bat.svg"],
  ["Carbon-Fiber Reinforced Talons", "melee", "meleeCombat", "2 + STR", 0, "Penetrating", 4, "-", "-", "-", "Concealable", "Rare", "img/icons/systems/weapons/claws.svg"],
  ["Knife / Dagger / Bayonet", "melee", "meleeCombat", "2 + STR", 0, "Penetrating", 6, "-", "-", "-", "", "Common", "img/icons/systems/weapons/CombatKnife.svg"],
  ["Monowire", "melee", "meleeCombat", "7", 2, "Penetrating", 14, "-", "-", "-", "Concealable", "Restricted", "img/icons/systems/weapons/stiletto.svg"],
  ["Neural Whip", "melee", "meleeCombat", "7", 0, "Energy", 5, "-", "-", "-", "Fatigue", "Restricted", "img/icons/systems/weapons/shrieker.svg"],
  ["No-Dachi/Claymore", "melee", "meleeCombat", "4 + STR", 1, "Penetrating", 8, "-", "-", "-", "", "Uncommon", "img/icons/systems/weapons/Sword.svg"],
  ["Nunchaku/Flail", "melee", "meleeCombat", "2 + STR", 0, "Concussive", 8, "-", "-", "-", "", "Uncommon", "img/icons/systems/weapons/nunchaku.svg"],
  ["Polearm", "melee", "meleeCombat", "3 + STR", 1, "Penetrating", 10, "-", "-", "-", "", "Uncommon", "img/icons/systems/weapons/Naginata.svg"],
  ["Staff", "melee", "meleeCombat", "3 + STR", 0, "Concussive", 10, "-", "-", "-", "", "Common", "img/icons/systems/weapons/LeadPipe.svg"],
  ["Stunstick", "melee", "meleeCombat", "6", 0, "Energy", 6, "-", "-", "-", "Fatigue", "Uncommon", "img/icons/systems/weapons/stun_gun.svg"],
  ["Sword/Katana/Dao", "melee", "meleeCombat", "3 + STR", 0, "Penetrating", 8, "-", "-", "-", "", "Uncommon", "img/icons/systems/weapons/katana.svg"],
  ["Vibroaxe", "melee", "meleeCombat", "5 + STR", 1, "Penetrating", 7, "-", "-", "-", "", "Very Rare", "img/icons/systems/weapons/axe.svg"],
  ["Vibrodagger", "melee", "meleeCombat", "3 + STR", 1, "Penetrating", 4, "-", "-", "-", "", "Rare", "img/icons/systems/weapons/dagger.svg"],
  ["Vibromace", "melee", "meleeCombat", "6 + STR", 1, "Penetrating", 4, "-", "-", "-", "", "Very Rare", "img/icons/systems/weapons/hammer.svg"],
  ["Vibrosword", "melee", "meleeCombat", "4 + STR", 1, "Penetrating", 6, "-", "-", "-", "", "Very Rare", "img/icons/systems/weapons/Sword_excellent.svg"],
  ["Wakizashi/Short Sword", "melee", "meleeCombat", "2 + STR", 0, "Penetrating", 10, "-", "-", "-", "", "Common", "img/icons/systems/weapons/switchblade.svg"],
  ["Compound Bow", "projectile", "projectileWeapons", "3 + STR", 0, "Penetrating", 4, 6, 2, "-", "", "Common", "img/icons/systems/weapons/Bow.svg"],
  ["Dart / Shuriken", "thrown", "projectileWeapons", "3", 0, "Penetrating", 9, 11, "-", "-", "Concealable", "Uncommon", "img/icons/systems/weapons/shuriken.svg"],
  ["Heavy Crossbow", "projectile", "projectileWeapons", "6", 1, "Penetrating", 2, 8, 6, "-", "Single Shot", "Uncommon", "img/icons/systems/weapons/crossbow.svg"],
  ["Light Crossbow", "projectile", "projectileWeapons", "5", 0, "Penetrating", 2, 10, 4, "-", "Single Shot", "Common", "img/icons/systems/weapons/crossbow.svg"],
  ["Spear/Javelin", "thrown", "projectileWeapons", "3 + STR", 0, "Penetrating", 8, 4, 0, "-", "Single Shot", "Common", "img/icons/systems/weapons/thrown_weapon.svg"],
  ["Light Pistol", "smallArms", "firearms", "5", 0, "Penetrating", 9, 6, 5, "-", "Concealable", "Uncommon", "img/icons/systems/weapons/mediumPistol.svg"],
  ["Hold-Out Pistol", "smallArms", "firearms", "4", 0, "Penetrating", 12, 8, 2, "-", "Concealable", "Rare", "img/icons/systems/weapons/walther-ppk.svg"],
  ["Auto Pistol", "smallArms", "firearms", "6", 0, "Penetrating", 10, 7, 5, "-", "", "Uncommon", "img/icons/systems/weapons/glock.svg"],
  ["Revolver", "smallArms", "firearms", "6", 0, "Penetrating", 7, 10, 6, "-", "", "Common", "img/icons/systems/weapons/revolver.svg"],
  ["Submachine Gun", "smallArms", "firearms", "5", 0, "Penetrating", 10, 11, 8, "-", "Automatic", "Rare", "img/icons/systems/weapons/SMG.svg"],
  ["Elephant Gun", "smallArms", "firearms", "7", 1, "Penetrating", -3, 8, 14, 11, "Single Shot", "Rare", "img/icons/systems/weapons/veryHeavyPistol.svg"],
  ["Rifle", "smallArms", "firearms", "6", 0, "Penetrating", 2, 7, 12, 10, "", "Common", "img/icons/systems/weapons/lee-enfield.svg"],
  ["Assault Rifle", "smallArms", "firearms", "6", 0, "Penetrating", 4, 8, 10, 4, "Automatic", "Rare", "img/icons/systems/weapons/AssaultRifle.svg"],
  ["Sniper Rifle", "smallArms", "firearms", "7", 0, "Penetrating", 1, 10, 10, 12, "", "Rare", "img/icons/systems/weapons/SniperRifle.svg"],
  ["Laser Pistol", "smallArms", "firearms", "5", 1, "Energy", 10, 12, 9, "-", "Space Capable", "Rare", "img/icons/systems/weapons/air_pistol.svg"],
  ["Hold-Out Laser Pistol", "smallArms", "firearms", "4", 1, "Energy", 12, 8, 5, "-", "Space Capable", "Very Rare", "img/icons/systems/weapons/air_pistol.svg"],
  ["Laser Rifle", "smallArms", "firearms", "6", 1, "Energy", 10, 12, 9, 7, "Space Capable", "Rare", "img/icons/systems/weapons/precision-rifle.svg"],
  ["Needler Pistol", "smallArms", "firearms", "4", 2, "Penetrating", 10, 6, 2, "-", "", "Restricted", "img/icons/systems/weapons/dartgun.svg"],
  ["Needler Rifle", "smallArms", "firearms", "5", 2, "Penetrating", 11, 8, 5, 3, "", "Restricted", "img/icons/systems/weapons/dartgun.svg"],
  ["Hold-Out Needler Pistol", "smallArms", "firearms", "3", 2, "Penetrating", 12, 4, 0, "-", "", "Restricted", "img/icons/systems/weapons/dartgun.svg"],
  ["Combat Shotgun", "smallArms", "firearms", "6", 0, "Penetrating", 4, 11, 8, "-", "Spread, Automatic", "Rare", "img/icons/systems/weapons/shotgun.svg"],
  ["Pump Shotgun", "smallArms", "firearms", "6", 0, "Penetrating", 7, 10, 6, "-", "Spread", "Common", "img/icons/systems/weapons/shotgun.svg"],
  ["Gyrojet Pistol", "smallArms", "firearms", "5", 0, "Penetrating", 2, 8, 10, "-", "Space Capable", "Rare", "img/icons/systems/weapons/heavyPistol.svg"],
  ["Gyrojet Rifle", "smallArms", "firearms", "5", 2, "Penetrating", 0, 8, 11, 3, "Space Capable", "Rare", "img/icons/systems/weapons/bolter-gun.svg"],
  ["Sonic Stunner", "support", "heavyWeapons", "7", 2, "Energy", 8, 12, 9, "-", "Fatigue", "Very Rare", "img/icons/systems/weapons/stun_gun.svg"],
  ["Autocannon, Portable", "support", "heavyWeapons", "9", 3, "Penetrating", 1, 9, 12, 8, "", "Restricted", "img/icons/systems/weapons/cannon.svg"],
  ["Machine Gun", "support", "heavyWeapons", "7", 1, "Penetrating", 2, 11, 12, 3, "Automatic", "Very Rare", "img/icons/systems/weapons/m3-grease-gun.svg"],
  ["Grenade Launcher", "support", "heavyWeapons", "Payload", "Payload", "Concussive", -5, 8, 9, 2, "", "Very Rare", "img/icons/systems/weapons/GrenadeLauncher.svg"],
  ["Mortar", "support", "artillery", "Payload", "Payload", "Concussive", -5, 0, 9, 11, "Single Shot", "Restricted", "img/icons/systems/weapons/cannon.svg"],
  ["LAW / Rocket Launcher", "support", "heavyWeapons", "Payload", "Payload", "Concussive", -10, 4, 10, 9, "Single Shot", "Restricted", "img/icons/systems/weapons/RocketLauncher.svg"],
  ["SRM Launcher", "support", "heavyWeapons", "Payload", "Payload", "Concussive", -10, 5, 10, 12, "Single Shot", "Restricted", "img/icons/systems/weapons/missile-launcher.svg"],
];

const standardTraitKeys = new Map([
  ["fatigue", "fatigue"],
  ["concealable", "concealable"],
  ["single shot", "singleShot"],
  ["automatic", "automatic"],
  ["spread", "spread"],
  ["space capable", "spaceCapable"],
]);

function idFor(name) {
  return createHash("sha256").update(`mwd-weapon:${name}`).digest("hex").slice(0, 16);
}

function traitIdFor(itemId, traitKey) {
  return createHash("sha256").update(`${itemId}:trait:${traitKey}`).digest("hex").slice(0, 16);
}

function fileSafe(name) {
  return name.replace(/[^a-zA-Z0-9]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
}

function normalizeDamageType(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (normalized === "energy") return "energy";
  if (normalized === "concussive") return "concussive";
  return "penetrating";
}

function normalizeNumberOrZero(value) {
  if (String(value ?? "").trim().toLowerCase() === "payload") return 0;
  if (String(value ?? "").trim() === "-") return 0;
  return Number(value ?? 0) || 0;
}

function parseDamage(value) {
  const raw = String(value ?? "").trim();
  if (raw.toLowerCase() === "payload") {
    return { damage: 0, damageAttribute: "", damageAttributeScale: 1, formula: "Payload" };
  }

  const strengthMatch = raw.match(/^(-?\d+)\s*\+\s*STR$/i);
  if (strengthMatch) {
    return {
      damage: Number(strengthMatch[1]) || 0,
      damageAttribute: "strength",
      damageAttributeScale: 1,
      formula: raw
    };
  }

  return { damage: Number(raw) || 0, damageAttribute: "", damageAttributeScale: 1, formula: raw };
}

function parseTraits(value, itemId) {
  return String(value ?? "")
    .split(",")
    .map(entry => entry.trim())
    .filter(Boolean)
    .map(label => {
      const key = standardTraitKeys.get(label.toLowerCase());
      if (!key) return null;
      return {
        id: traitIdFor(itemId, key),
        key,
        rating: 0
      };
    })
    .filter(Boolean);
}

function hasRangeValue(value) {
  return String(value ?? "").trim() !== "-";
}

function maxRangeFromRaw({ near, far, extreme }) {
  if (hasRangeValue(extreme)) return "extreme";
  if (hasRangeValue(far)) return "far";
  if (hasRangeValue(near)) return "near";
  return "close";
}

function defaultPayloads(category) {
  if (category === "melee") return [];
  return [{
    id: "unloaded",
    label: "Unloaded",
    compatibleWith: [],
    modifies: {
      damageType: "",
      ap: 0,
      clusteringDice: 0,
      attackRatingBand: { close: 0, near: 0, far: 0, extreme: 0 }
    },
    traits: [],
    keywords: [],
    template: null,
    areaEffect: { kind: "discrete" },
    resolution: {
      resolverKey: "standard",
      damageModel: "",
      onHitEffect: null
    },
    consumption: { amount: 1, sourceId: "" }
  }];
}

function defaultConsumptionSources(category) {
  if (category === "melee") return [];
  return [{
    id: "untracked",
    label: "Untracked",
    kind: "untracked",
    tracking: { current: 0, max: 0 },
    link: { actorPath: "", itemId: "", itemPath: "" }
  }];
}

function documentFor(row, index) {
  const [name, category, skill, damageRaw, apRaw, damageTypeRaw, close, near, far, extreme, traitsRaw, availability, img] = row;
  const id = idFor(name);
  const damage = parseDamage(damageRaw);
  const attackRatingBand = {
    close: normalizeNumberOrZero(close),
    near: normalizeNumberOrZero(near),
    far: normalizeNumberOrZero(far),
    extreme: normalizeNumberOrZero(extreme),
  };
  const standardTraits = parseTraits(traitsRaw, id);
  const tags = [
    "weapon",
    category,
    skill,
    normalizeDamageType(damageTypeRaw),
    availability,
    ...standardTraits.map(entry => entry.key),
  ].filter(Boolean);
  const notes = [
    damage.formula && damage.formula !== String(damage.damage) ? `Damage: ${damage.formula}` : "",
    String(apRaw).toLowerCase() === "payload" ? "AP: Payload" : "",
  ].filter(Boolean).join("; ");

  return {
    _id: id,
    name,
    type: "personalWeapon",
    img: `${SYSTEM_PREFIX}${img}`,
    effects: [],
    folder: null,
    sort: (index + 1) * 100000,
    flags: {},
    system: {
      sourceReference: SOURCE,
      description: notes ? `<p>${notes}</p>` : "",
      gmnotes: "",
      inactive: false,
      equipped: false,
      isPrimary: false,
      category,
      skill,
      damage: damage.damage,
      damageAttribute: damage.damageAttribute,
      damageAttributeScale: damage.damageAttributeScale,
      ap: normalizeNumberOrZero(apRaw),
      damageType: normalizeDamageType(damageTypeRaw),
      attackRatingBand,
      range: {
        max: maxRangeFromRaw({ near, far, extreme }),
        close: 5,
        near: 26,
        far: 62,
        extreme: 120
      },
      standardTraits,
      availability,
      payloads: defaultPayloads(category),
      selectedPayloadId: category === "melee" ? "" : "unloaded",
      consumptionSources: defaultConsumptionSources(category),
      fireModes: {
        single: { enabled: false },
        burst: { enabled: false, shots: 3, accuracyMod: 0, addHeat: 0 },
        fullAuto: { enabled: false, shots: 10, accuracyMod: 0, addHeat: 0 }
      },
      traits: [],
      keywords: [],
      notes: notes ? `<p>${notes}</p>` : ""
    },
    ownership: {
      default: 0
    },
    _key: `!items!${id}`
  };
}

await fs.mkdir(OUT_DIR, { recursive: true });

await Promise.all(weapons.map(async (row, index) => {
  const doc = documentFor(row, index);
  const fileName = `items_${fileSafe(doc.name)}_${doc._id}.yml`;
  await fs.writeFile(
    path.join(OUT_DIR, fileName),
    `${JSON.stringify(doc, null, 2)}\n`,
    "utf8"
  );
}));

console.log(`Generated ${weapons.length} weapon items in ${path.relative(process.cwd(), OUT_DIR)}`);
