import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const OUT_DIR = path.resolve("src/packs/armor");
const SYSTEM_PREFIX = "systems/mwd/";
const SOURCE = "Personal Armor";

const armor = [
  ["Ablative Armor", 10, 0, 0, 2, 0, "", "Uncommon", "img/icons/systems/gear/armor/kevlar_body.svg"],
  ["Ablative Flak Armor", 10, 0, 0, 1, 1, "", "Uncommon", "img/icons/systems/gear/armor/flak_body.svg"],
  ["Ballistic Plate Armor", 12, 0, 2, 0, 0, "-1 REF", "Uncommon", "img/icons/systems/gear/armor/heavy-armorjack_body.svg"],
  ["Concealed Ablative Armor", 8, 0, 0, 1, 0, "Concealable", "Rare", "img/icons/systems/gear/armor/light-armorjack_body.svg"],
  ["Concealed Flak Armor", 8, 0, 1, 0, 1, "Concealable", "Rare", "img/icons/systems/gear/armor/flak_body.svg"],
  ["Flak Armor", 12, 0, 1, 0, 2, "-1 REF", "Uncommon", "img/icons/systems/gear/armor/flak_body.svg"],
  ["Infiltration Suit", 8, 0, 0, 0, 0, "Stealth", "Very Rare", "img/icons/systems/gear/armor/bodyweight_suit.svg"],
  ["Full Combat Armor", 10, 2, 1, 1, 1, "Sealed", "Restricted", "img/icons/systems/gear/armor/metalgear_body.svg"],
  ["Urban Explorer Jumpsuit", 6, 1, 0, 1, 1, "Concealable", "Common", "img/icons/systems/gear/clothing/generic_top.svg"],
  ["Lined Coat", 6, 3, 0, 0, 0, "Concealable", "Common", "img/icons/systems/gear/clothing/generic_jacket.svg"],
];

function idFor(name) {
  return createHash("sha256").update(`mwd-armor:${name}`).digest("hex").slice(0, 16);
}

function fileSafe(name) {
  return name.replace(/[^a-zA-Z0-9]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
}

function listFromNotes(notes) {
  return String(notes ?? "")
    .split(",")
    .map(entry => entry.trim())
    .filter(Boolean);
}

function reflexPenaltyEffect({ itemId, itemName, img, notes }) {
  if (!String(notes ?? "").includes("-1 REF")) return null;
  const effectId = createHash("sha256").update(`${itemId}:reflex-penalty`).digest("hex").slice(0, 16);

  return {
    _id: effectId,
    name: "-1 REF",
    img: `${SYSTEM_PREFIX}${img}`,
    disabled: false,
    transfer: false,
    changes: [{
      key: "system.attributes.reflexes.value",
      type: "subtract",
      value: "1",
      phase: "final",
      priority: null
    }],
    flags: {
      mwd: {
        source: "armor-trait",
        itemName
      }
    },
    _key: `!items.effects!${itemId}.${effectId}`
  };
}

function documentFor(row, index) {
  const [name, rating, defenseBonus, penetrating, energy, concussive, notes, availability, img] = row;
  const id = idFor(name);
  const traits = listFromNotes(notes);
  const tags = [
    "armor",
    availability,
    ...traits
  ].filter(Boolean);
  const effects = [
    reflexPenaltyEffect({ itemId: id, itemName: name, img, notes })
  ].filter(Boolean);

  return {
    _id: id,
    name,
    type: "armor",
    img: `${SYSTEM_PREFIX}${img}`,
    effects,
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
      rating,
      defenseBonus,
      mitigationByType: {
        penetrating,
        concussive,
        energy,
        thermal: 0,
        electrical: 0
      },
      durability: {
        current: rating,
        max: rating
      },
      standardTraits: [],
      traitState: {
        reinforced: {
          current: 0,
          max: 0
        }
      },
      availability,
      tags,
      traits,
      notes
    },
    ownership: {
      default: 0
    },
    _key: `!items!${id}`
  };
}

await fs.mkdir(OUT_DIR, { recursive: true });

await Promise.all(armor.map(async (row, index) => {
  const doc = documentFor(row, index);
  const fileName = `items_${fileSafe(doc.name)}_${doc._id}.yml`;
  await fs.writeFile(
    path.join(OUT_DIR, fileName),
    `${JSON.stringify(doc, null, 2)}\n`,
    "utf8"
  );
}));

console.log(`Generated ${armor.length} armor items in ${path.relative(process.cwd(), OUT_DIR)}`);
