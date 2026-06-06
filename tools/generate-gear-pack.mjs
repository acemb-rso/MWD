import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const OUT_DIR = path.resolve("src/packs/gear");
const SYSTEM_PREFIX = "systems/mwd/";
const SOURCE = "Personal Equipment";

const gear = [
  ["Holomap", "audiovisual", "Mapping / briefing aid", "navigation", 1, "audiovisual, map, briefing, navigation, planning", "Common", "img/icons/_uncategorized/SENSOR.png"],
  ["Micro-Recorder", "audiovisual", "Records audio", "perception", 1, "audiovisual, recording, audio, evidence, portable", "Common", "img/icons/_uncategorized/AUDIO.png"],
  ["Video Camera", "audiovisual", "Records video", "perception", 1, "audiovisual, recording, video, evidence, portable", "Common", "img/icons/_uncategorized/AUDIO.png"],
  ["Communications Kit", "communication", "Field communications support", "systemOps", 4, "communications, comms, fieldSupport, kit, coordination", "Uncommon", "img/icons/systems/upgrades/communications_center.svg"],
  ["Personal Communicator", "communication", "Personal comms", "systemOps", 2, "communications, comms, personal, portable", "Common", "img/icons/_uncategorized/COMMLINK.png"],
  ["Audio / Video Storage Chip", "computing", "Data storage", "computers", 1, "computing, dataStorage, media, portable", "Common", "img/icons/_uncategorized/RFID_Chip.png"],
  ["Computer Diagnostic Equipment", "computing", "Computer / electronics diagnostic aid", "computers", 3, "computing, diagnostics, electronics, computer, kit", "Uncommon", "img/mek/misc/repair/electronics.png"],
  ["Engineering Console", "computing", "Engineering tests / repair support", "technician", 5, "computing, engineering, repair, diagnostics, console", "Rare", "img/icons/_uncategorized/RIGGER_CONSOLE.png"],
  ["Noteputer", "computing", "Portable computer", "computers", 2, "computing, portableComputer, data, electronics", "Common", "img/icons/_uncategorized/Software.png"],
  ["Verigraph Scanner", "computing", "Identity / biometric verification", "computers", 3, "computing, identity, biometric, verification, security", "Rare", "img/icons/_uncategorized/dna1.svg"],
  ["Demolition Kit", "espionage", "Enables demolitions work", "demolitions", 3, "espionage, demolition, explosives, sabotage, kit", "Restricted", "img/icons/skills/demolition.svg"],
  ["Disguise Kit", "espionage", "Disguise support", "deception", 3, "espionage, disguise, deception, infiltration, social, kit", "Uncommon", "img/icons/skills/disguise.svg"],
  ["Forensics Kit", "espionage", "Evidence analysis", "science", 3, "espionage, forensics, evidence, investigation, kit", "Rare", "img/icons/_uncategorized/digital-trace.svg"],
  ["Forgery Kit", "espionage", "Forgery support", "art", 3, "espionage, forgery, documents, deception, kit", "Restricted", "img/icons/skills/art.svg"],
  ["Lock Pick Set", "espionage", "Mechanical lock bypass", "stealth", 3, "espionage, lockBypass, mechanical, infiltration, tools", "Restricted", "img/default/padlock.svg"],
  ["Neurohelmet Codebreaker", "espionage", "Specialized neurohelmet intrusion / decoding", "computers", 3, "espionage, codebreaking, neurohelmet, intrusion, electronics", "Restricted", "img/icons/systems/CodeBuddy.webp"],
  ["Polygraph", "espionage", "Interrogation / lie detection aid", "intimidation", 3, "espionage, interrogation, lieDetection, social, evidence", "Rare", "img/icons/_uncategorized/all-seeing-eye.svg"],
  ["Wiretap Kit", "espionage", "Communications interception", "computers", 3, "espionage, communications, interception, surveillance, kit", "Restricted", "img/icons/_uncategorized/AUDIO.png"],
  ["Environment Suit", "hostileEnvironment", "Environmental protection", "survival", 5, "hostileEnvironment, protection, sealed, hazard, worn", "Uncommon", "img/icons/_uncategorized/Anzug.png"],
  ["Respirator", "hostileEnvironment", "Air filtration / breathing support", "survival", 3, "hostileEnvironment, breathing, airFiltration, hazard, worn", "Common", "img/icons/_uncategorized/biohazard.svg"],
  ["SCUBA Gear", "hostileEnvironment", "Underwater breathing", "athletics", 3, "hostileEnvironment, breathing, underwater, aquatic, worn", "Uncommon", "img/mek/force/Pieces/Adjustments/NATO/Scuba.png"],
  ["Snow Suit", "hostileEnvironment", "Cold-weather protection", "survival", 2, "hostileEnvironment, coldWeather, protection, worn", "Common", "img/icons/_uncategorized/SURVIVAL_GEAR.png"],
  ["Wetsuit", "hostileEnvironment", "Aquatic environment gear", "athletics", 2, "hostileEnvironment, aquatic, underwater, protection, worn", "Common", "img/icons/_uncategorized/Anzug.png"],
  ["Field Surgical Kit", "medical", "Surgery / advanced treatment", "medTech", 6, "medical, surgery, advancedTreatment, kit, fieldCare", "Rare", "img/icons/_uncategorized/caduceus.svg"],
  ["Laser Scalpel", "medical", "Surgical tool", "medTech", 1, "medical, surgery, tool, precision, powered", "Rare", "img/icons/_uncategorized/rod-of-asclepius.svg"],
  ["Medical Kit", "medical", "First aid / treatment support", "medTech", 4, "medical, firstAid, treatment, kit, fieldCare", "Common", "img/mek/misc/medical.png"],
  ["Medipack", "medical", "Portable treatment supply", "medTech", 3, "medical, treatment, portable, consumable", "Uncommon", "img/icons/_uncategorized/Biotech.png"],
  ["Medpatch", "medical", "Quick treatment consumable", "medTech", 2, "medical, treatment, quickUse, consumable", "Common", "img/icons/systems/gear/sticking-plaster.svg"],
  ["Plastiflesh Bandage", "medical", "Wound treatment", "medTech", 1, "medical, woundCare, bandage, consumable", "Uncommon", "img/icons/systems/gear/sticking-plaster.svg"],
  ["Sedative Patch", "medical", "Sedation consumable", "medTech", 1, "medical, sedation, drug, patch, consumable", "Restricted", "img/icons/systems/gear/drugs/rapidetox.svg"],
  ["Stimpatch", "medical", "Stimulant consumable", "medTech", 3, "medical, stimulant, drug, patch, consumable", "Restricted", "img/icons/systems/gear/drugs/stim.svg"],
  ["Binoculars", "optical", "Visual observation", "perception", 2, "optical, observation, visual, magnification, portable", "Common", "img/icons/_uncategorized/OPTICAL.png"],
  ["Night Vision Goggles", "optical", "Low-light vision", "perception", 2, "optical, nightVision, lowLight, visual, worn", "Rare", "img/icons/systems/upgrades/infrared_nightvision_scope.svg"],
  ["Fusion Recharger", "power", "Recharges power systems", "technician", 2, "power, recharge, fusion, equipmentSupport", "Rare", "img/icons/systems/gear/ammo/battery.png"],
  ["Power Pack", "power", "Portable power source", "technician", 2, "power, battery, portablePower, consumable", "Common", "img/icons/systems/gear/ammo/battery.png"],
  ["Solar Recharger", "power", "Solar power recovery", "technician", 2, "power, recharge, solar, fieldSupport", "Uncommon", "img/icons/systems/gear/ammo/battery.png"],
  ["Aerospace Repair Kit", "repairSalvage", "Aerospace repair support", "technician", 4, "repairSalvage, aerospace, repair, kit, technical", "Rare", "img/mek/misc/repair/equipment.png"],
  ["Basic Toolkit", "repairSalvage", "General repair support", "technician", 2, "repairSalvage, tools, repair, general, kit", "Common", "img/icons/_uncategorized/TOOLS.png"],
  ["BattleMech Repair Kit", "repairSalvage", "BattleMech repair support", "technician", 4, "repairSalvage, battlemech, repair, kit, technical", "Rare", "img/mek/misc/repair/equipment.png"],
  ["Electronics Repair Kit", "repairSalvage", "Electronics repair support", "technician", 4, "repairSalvage, electronics, repair, kit, technical", "Uncommon", "img/mek/misc/repair/electronics.png"],
  ["Laser Torch", "repairSalvage", "Cutting / salvage tool", "technician", 1, "repairSalvage, cutting, salvage, tool, powered", "Uncommon", "img/mek/misc/repair/laser.png"],
  ["Vehicle Repair Kit", "repairSalvage", "Vehicle repair support", "technician", 4, "repairSalvage, vehicle, repair, kit, technical", "Uncommon", "img/mek/misc/repair/engine.png"],
  ["Compass", "survival", "Navigation", "navigation", 1, "survival, navigation, direction, manual, portable", "Common", "img/icons/_uncategorized/SURVIVAL_GEAR.png"],
  ["Emergency Flares", "survival", "Signaling / illumination", "survival", 2, "survival, signaling, illumination, emergency, consumable", "Common", "img/mek/misc/flare.png"],
  ["Emergency Rations", "survival", "Sustenance", "survival", 2, "survival, food, sustenance, emergency, consumable", "Common", "img/icons/_uncategorized/SURVIVAL_GEAR.png"],
  ["Field Kit", "survival", "General survival kit", "survival", 4, "survival, fieldSupport, general, kit", "Common", "img/icons/_uncategorized/SURVIVAL_GEAR.png"],
  ["Jump Pack", "survival", "Personal mobility gear; may need special movement rules later", "athletics", 4, "survival, mobility, jump, powered, worn", "Rare", "img/mek/force/Pieces/Types/Alphanumeric/Type/JUMP.png"],
  ["Parachute", "survival", "Controlled descent", "athletics", 2, "survival, descent, fallProtection, emergency, worn", "Uncommon", "img/icons/skills/free-fall.svg"],
  ["Tent", "survival", "Shelter", "survival", 2, "survival, shelter, camping, fieldSupport", "Common", "img/icons/_uncategorized/SURVIVAL_GEAR.png"],
  ["Bug Scanner", "surveillance", "Detects surveillance devices", "perception", 3, "surveillance, counterSurveillance, scanner, detection, electronics", "Rare", "img/icons/_uncategorized/SENSOR.png"],
  ["Laser Microphone", "surveillance", "Remote audio surveillance", "perception", 2, "surveillance, remoteAudio, listening, electronics", "Restricted", "img/icons/_uncategorized/AUDIO.png"],
  ["Microphone Bug", "surveillance", "Hidden listening device", "stealth", 1, "surveillance, audio, hidden, listening, device", "Restricted", "img/icons/_uncategorized/AUDIO.png"],
  ["Sensor, Heat / Motion / Radar / Seismic", "surveillance", "Choose subtype as trait or note", "perception", 4, "surveillance, sensor, detection, chooseSubtype, electronics", "Rare", "img/icons/_uncategorized/SENSOR.png"],
  ["Tracking Bug", "surveillance", "Tracking beacon", "tracking", 1, "surveillance, tracking, beacon, hidden, device", "Restricted", "img/icons/_uncategorized/digital-trace.svg"],
  ["White Noise Generator", "surveillance", "Blocks eavesdropping", "stealth", 2, "surveillance, counterSurveillance, privacy, audioMasking, electronics", "Rare", "img/icons/_uncategorized/psychic-waves.svg"]
];

function idFor(name) {
  return createHash("sha256").update(`mwd-gear:${name}`).digest("hex").slice(0, 16);
}

function fileSafe(name) {
  return name.replace(/[^a-zA-Z0-9]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
}

function documentFor(row, index) {
  const [name, category, rulesHook, relatedSkill, rating, tags, availability, img] = row;
  const id = idFor(name);
  return {
    _id: id,
    name,
    type: "gear",
    img: `${SYSTEM_PREFIX}${img}`,
    effects: [],
    folder: null,
    sort: (index + 1) * 100000,
    flags: {},
    system: {
      sourceReference: SOURCE,
      description: `<p>${rulesHook}</p>`,
      gmnotes: "",
      inactive: false,
      quantity: 1,
      rating,
      category,
      relatedSkill,
      availability,
      rulesHook,
      tags: tags.split(",").map(tag => tag.trim()).filter(Boolean)
    },
    ownership: {
      default: 0
    },
    _key: `!items!${id}`
  };
}

await fs.mkdir(OUT_DIR, { recursive: true });

await Promise.all(gear.map(async (row, index) => {
  const doc = documentFor(row, index);
  const fileName = `items_${fileSafe(doc.name)}_${doc._id}.yml`;
  await fs.writeFile(
    path.join(OUT_DIR, fileName),
    `${JSON.stringify(doc, null, 2)}\n`,
    "utf8"
  );
}));

console.log(`Generated ${gear.length} gear items in ${path.relative(process.cwd(), OUT_DIR)}`);
