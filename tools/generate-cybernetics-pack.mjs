import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const OUT_DIR = path.resolve("src/packs/gear");
const SYSTEM_PREFIX = "systems/mwd/";
const SOURCE = "Cybernetic Gear";

const cybernetics = [
  ["Tactical Coprocessor", "cognitive", "Calculates optimal attack and defense pathways; +1 skill die, +3 AR and DR when applicable", "tactics", 4, "cybernetic, reflex, activate, load2, bodySlot:neural", "Restricted"],
  ["Reflex Booster", "cognitive", "Enhances reaction timing; may improve reaction/quick action workflows", "athletics", 5, "cybernetic, reflex, activate, load2, bodySlot:neural", "Restricted"],
  ["Paralysis Response Suppressor", "cognitive", "Bonus to recover from Shaken/Stunned", "composure", 4, "cybernetic", "Rare"],
  ["Implanted Communicator", "communication", "Hands-free personal communications; silent use", "systemOps", 3, "cybernetic, communications, comms, enhancement, load1, bodySlot:head", "Restricted"],
  ["Boosted Transmitter Implant", "communication", "Improved signal reach and encryption; field communications aid", "systemOps", 4, "cybernetic, communications, transmitter, encryption, load1, bodySlot:head", "Restricted"],
  ["Subdermal ID / Cred Chip", "communication", "Embedded identification, credential, or payment chip", "computers", 1, "cybernetic, identity, credential, load0, bodySlot:skin", "Common"],
  ["Smartlink Interface", "interface", "Provides ammo count, fire mode, payload, range, and basic aim telemetry. Ignore personal attack motion; +1 die to Aim and targetingData.", "firearms", 3, "cybernetic, implanted, smartlink, sensory, weaponInterface, load1", "Rare"],
  ["Datajack / DNI Port", "interface", "Direct interface port for machines, computers, diagnostics, and neural systems", "computers", 3, "cybernetic, dni, interface, neural, load1, bodySlot:neural", "Restricted"],
  ["Buffered VDNI Implant", "interface", "Combat-grade machine interface; strong piloting/gunnery support, feedback risk", "systemOps", 6, "cybernetic, vdni, neural, machineInterface, enhancement, load2, feedbackRisk", "Restricted"],
  ["Enhanced Imaging Interface", "interface", "Clan-style full neural imaging link; powerful machine interface, requires stabilizers", "systemOps", 6, "cybernetic, enhancedImaging, clan, neural, machineInterface, load2, feedbackRisk, stabilizers", "Rare"],
  ["Medical Regulator Implant", "physiological", "Stabilizes vitals; medTech tests to treat wearer gain support", "medTech", 3, "cybernetic, medical, regulator, restorative, load0, bodySlot:organ", "Uncommon"],
  ["Filtration Organ", "physiological", "Helps resist gas, toxins, smoke, bad atmosphere, drugs", "survival", 4, "cybernetic, organ, filtration, toxin, atmosphere, load1, bodySlot:organ", "Rare"],
  ["Synth-Lung / Gill Implant", "physiological", "Specialized breathing support; choose environment at install", "survival", 4, "cybernetic, hostileEnvironment, breathing, organ, load1, bodySlot:organ", "Rare"],
  ["Trauma Regulator", "physiological", "Suppresses pain response; reduces physical penalties by 2. First Aid treatment DN +1.", "medTech", 5, "cybernetic, painGate, activate, load2, bodySlot:neural", "Restricted"],
  ["Motor Cortex Accelerator", "physiological", "", "", 4, "cybernetic", "Very Rare"],
  ["Reaction Catalyzer", "physiological", "", "", 6, "cybernetic", "Restricted"],
  ["Basic Prosthetic Limb", "replacement", "Restores lost limb function; no enhancement", "medTech", 2, "cybernetic, prosthetic, restorative, load0, bodySlot:limb", "Common"],
  ["Advanced Prosthetic Limb", "replacement", "Better-than-baseline limb; choose two physical skills to gain a +1 dice pool bonus", "medTech", 3, "cybernetic, prosthetic, enhancement, load1, bodySlot:limb", "Uncommon"],
  ["Myomer Prosthetic Limb", "replacement", "Superhuman limb output; +1 die to relevant STR/AGI use", "medTech", 5, "cybernetic, myomer, enhancement, load2, bodySlot:limb", "Rare"],
  ["Cloned Replacement Limb", "replacement", "Biological replacement; removes lost-limb issue; not EMP vulnerable", "medTech", 6, "clonal, restorative, load0, bodySlot:limb", "Rare"],
  ["Cybernetic Tool Hand", "replacement", "Integrated toolset; counts as basic toolkit for repair/technical work", "technician", 3, "cybernetic, tools, repair, enhancement, load1, bodySlot:hand", "Uncommon"],
  ["Bionic Eye Replacement", "sensory", "Restores vision; can host one basic optical feature", "medTech", 3, "cybernetic, sensory, restorative, load0, bodySlot:eye", "Uncommon"],
  ["Enhanced Cybereye Suite", "sensory", "Low-light, magnification, recording, flare compensation; +1 dice pool bonus", "perception", 4, "cybernetic, sensory, optical, enhancement, load1, bodySlot:eye", "Rare"],
  ["Advanced Imaging Array", "sensory", "Ultrasound, Lidar, IR, rangefinder; ignores environment penalties", "perception", 5, "cybernetic, sensory, optical, enhancement, load2, bodySlot:eye", "Very Rare"],
  ["Bionic Ear Replacement", "sensory", "Restores hearing; can host one basic audio feature", "perception", 3, "cybernetic, sensory, restorative, load0, bodySlot:ear", "Uncommon"],
  ["Tactical Audio Suite", "sensory", "Audio filtering, amplification, recording, directional pickup; +1 dice pool bonus to Perception", "perception", 4, "cybernetic, sensory, audio, enhancement, load1, bodySlot:ear", "Rare"],
  ["Grapple Lock System", "structural", "+1 die to climbing, grappling, holding, or disarm attempts", "athletics", 3, "cybernetic", "Uncommon"],
  ["Bone Reinforcement", "structural", "Better impact tolerance; helps resist falls, knockdown, crushing injury", "athletics", 4, "cybernetic, skeletal, reinforcement, enhancement, load1, bodySlot:skeleton", "Rare"],
  ["Dermal Myomer Armor", "structural", "Subdermal reinforcement; +1 resistance, vulnerable to electrical feedback", "athletics", 5, "cybernetic, armor, myomer, enhancement, load2, bodySlot:skin", "Rare"],
];

function slugify(name) {
  return String(name ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function foundryIdFor(stableKey) {
  return createHash("sha256").update(`mwd:${stableKey}`).digest("hex").slice(0, 16);
}

function fileSafe(name) {
  return name.replace(/[^a-zA-Z0-9]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
}

function parseTags(tags) {
  return String(tags ?? "")
    .split(",")
    .map(tag => tag.trim())
    .filter(Boolean);
}

function tagMetadata(tags) {
  const normalized = tags.length ? tags : ["cybernetic"];
  if (!normalized.some(tag => tag.toLowerCase() === "cybernetic")) normalized.unshift("cybernetic");
  const loadTag = normalized.find(tag => /^load\d+$/i.test(tag));
  const bodySlotTag = normalized.find(tag => /^bodySlot:/i.test(tag));
  return {
    tags: normalized,
    activation: normalized.some(tag => tag.toLowerCase() === "activate") ? "toggle" : "passive",
    load: loadTag ? Math.min(2, Math.max(0, Number(loadTag.replace(/^load/i, "")) || 0)) : 0,
    bodySlot: bodySlotTag ? bodySlotTag.split(":").slice(1).join(":").trim() : "",
  };
}

function rollModEffect(id, label, relatedSkill, value = 1) {
  if (!relatedSkill) return null;
  return {
    id,
    type: "rollMod",
    phase: "onBuildRoll",
    selector: "intent.skill",
    skillKeys: [relatedSkill],
    label,
    value,
    application: "automatic",
  };
}

function explicitEffectsFor({ stableKey, name, rulesHook, relatedSkill }) {
  const hook = String(rulesHook ?? "");
  const effects = [];
  if (/\+1 (skill )?die|\+1 dice pool/i.test(hook) && relatedSkill) {
    effects.push(rollModEffect(`${stableKey}.skill`, name, relatedSkill, 1));
  }
  if (/\+3 AR/i.test(hook)) {
    effects.push({
      id: `${stableKey}.ar`,
      type: "attackRatingMod",
      phase: "onAttackRatingResolved",
      selector: "intent.attack",
      label: `${name} AR`,
      value: 3,
      application: "automatic",
    });
  }
  if (/\+3 (and )?DR|\+3 AR and DR/i.test(hook)) {
    effects.push({
      id: `${stableKey}.dr`,
      type: "defenseRatingMod",
      phase: "onDefenseRatingResolved",
      selector: "defenseRating",
      label: `${name} DR`,
      value: 3,
      application: "automatic",
    });
  }
  return effects.filter(Boolean);
}

function documentFor(row, index, stableKey) {
  const [name, category, rulesHook, relatedSkill, rating, rawTags, availability] = row;
  const meta = tagMetadata(parseTags(rawTags));
  const id = foundryIdFor(stableKey);
  const effects = explicitEffectsFor({ stableKey, name, rulesHook, relatedSkill });
  return {
    _id: id,
    name,
    type: "gear",
    img: `${SYSTEM_PREFIX}img/default/Default_Cyberware.svg`,
    effects: [],
    folder: null,
    sort: (index + 1001) * 100000,
    flags: {
      mwd: {
        stableId: stableKey,
      },
    },
    system: {
      sourceReference: SOURCE,
      description: rulesHook ? `<p>${rulesHook}</p>` : "",
      gmnotes: "",
      inactive: false,
      quantity: 1,
      rating,
      subtype: "cybernetic",
      equipped: false,
      active: meta.activation === "passive",
      activation: meta.activation,
      load: meta.load,
      bodySlot: meta.bodySlot,
      category,
      relatedSkill,
      availability,
      rulesHook,
      mount: {
        mountedOnItemId: "",
        mountType: "",
      },
      tags: meta.tags,
      effects,
      prerequisites: [],
      limits: {
        perActivation: 0,
        perRound: 0,
        perScene: 0,
      },
    },
    ownership: {
      default: 0,
    },
    _key: `!items!${id}`,
  };
}

const seen = new Map();
function stableKeyFor(name, index, rating) {
  const base = `cybernetic-${slugify(name)}`;
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${index + 1}-${rating}`;
}

await fs.mkdir(OUT_DIR, { recursive: true });

await Promise.all(cybernetics.map(async (row, index) => {
  const stableKey = stableKeyFor(row[0], index, row[4]);
  const doc = documentFor(row, index, stableKey);
  const fileName = `items_${fileSafe(doc.name)}_${doc._id}.yml`;
  await fs.writeFile(
    path.join(OUT_DIR, fileName),
    `${JSON.stringify(doc, null, 2)}\n`,
    "utf8",
  );
}));

console.log(`Generated ${cybernetics.length} cybernetic gear items in ${path.relative(process.cwd(), OUT_DIR)}`);
