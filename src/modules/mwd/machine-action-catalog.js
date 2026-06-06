// src/modules/mwd/machine-action-catalog.js
// Purpose: Canonical machine action and remediation definitions aligned to the
//          MWD action docs.
// How it fits: Keeps labels, skill pairing, resolver ownership, prompts, and
//              action-economy rules in one data-owned surface for sheets,
//              statuses, crit remedies, and machine action intents.

export const MACHINE_ACTION_RESOLVERS = Object.freeze([
  "action",
  "attack",
  "movement",
  "targeting",
  "remediation",
  "recovery",
  "interaction",
]);

export const MACHINE_ACTION_IMPLEMENTATION_STATES = Object.freeze([
  "ready",
  "stub",
  "disabled",
  "legacy",
]);

export const MACHINE_ACTION_COST_RESOURCES = Object.freeze(["fa", "sa", "ra", "none"]);

const RESOLVERS = new Set(MACHINE_ACTION_RESOLVERS);
const IMPLEMENTATION_STATES = new Set(MACHINE_ACTION_IMPLEMENTATION_STATES);
const COST_RESOURCES = new Set(MACHINE_ACTION_COST_RESOURCES);

function toArray(value) {
  if (Array.isArray(value)) return value.map(entry => String(entry ?? "").trim()).filter(Boolean);
  const normalized = String(value ?? "").trim();
  return normalized ? [normalized] : [];
}

function normalizePrompt(prompt = null) {
  if (!prompt || typeof prompt !== "object") return Object.freeze({ type: "none", required: false });
  return Object.freeze({
    type: String(prompt.type ?? "none").trim() || "none",
    required: Boolean(prompt.required),
  });
}

function normalizeImplementation(implementation = null) {
  const state = String(implementation?.state ?? "ready").trim() || "ready";
  const normalizedState = IMPLEMENTATION_STATES.has(state) ? state : "stub";
  return Object.freeze({
    state: normalizedState,
    reason: String(implementation?.reason ?? "").trim(),
  });
}

function action(key, config = {}) {
  const resource = String(config.resource ?? "sa").trim() || "sa";
  const normalizedResource = COST_RESOURCES.has(resource) ? resource : "sa";
  const cost = Math.max(0, Math.trunc(Number(config.cost ?? 0) || 0));
  const resolver = String(config.resolver ?? "action").trim() || "action";
  const normalizedResolver = RESOLVERS.has(resolver) ? resolver : "action";
  const category = String(
    config.category
      ?? (normalizedResource === "fa" ? "free" : cost >= 2 ? "complex" : cost === 0 ? "none" : "simple")
  ).trim() || "simple";
  const implementation = normalizeImplementation(config.implementation);
  const tags = toArray(config.tags);
  const resolves = toArray(config.resolves);

  return Object.freeze({
    key,
    id: key,
    label: config.label ?? key,
    attributeKey: String(config.attributeKey ?? "").trim(),
    skillKey: String(config.skillKey ?? "").trim(),

    // Compatibility fields used by current machine remedy/EW/action-cost code.
    resource: normalizedResource,
    cost,
    category,
    remediable: config.remediable !== false,
    intent: String(config.intent ?? "").trim(),
    use: String(config.use ?? "").trim(),
    notes: String(config.notes ?? "").trim(),

    // Declarative action fields used by the central machine action executor.
    actionCost: Object.freeze({ resource: normalizedResource, value: cost }),
    scale: Object.freeze(toArray(config.scale).length ? toArray(config.scale) : ["machine"]),
    resolver: normalizedResolver,
    roll: config.roll === undefined ? null : config.roll,
    prompt: normalizePrompt(config.prompt),
    tags: Object.freeze(tags),
    resolves: Object.freeze(resolves),
    payload: Object.freeze({
      intent: String(config.payload?.intent ?? "machineAction").trim() || "machineAction",
      actionId: String(config.payload?.actionId ?? key).trim() || key,
      ...(config.payload && typeof config.payload === "object" ? config.payload : {}),
    }),
    implementation,
  });
}

const readyNarrative = notes => ({ state: "ready", reason: notes ?? "" });
const stub = reason => ({ state: "stub", reason });

export const MACHINE_ACTION_DEFINITIONS = Object.freeze({
  none: action("none", {
    label: "No Field Remedy",
    remediable: false,
    resource: "none",
    cost: 0,
    category: "none",
    implementation: readyNarrative(),
  }),

  // Free actions.
  communicate: action("communicate", {
    label: "Communicate",
    resource: "fa",
    cost: 1,
    category: "free",
    resolver: "action",
    tags: ["communication", "free"],
    notes: "Brief communication, gesture, or signal.",
  }),
  activateElectronics: action("activateElectronics", {
    label: "Activate / Deactivate Electronics",
    resource: "fa",
    cost: 1,
    category: "free",
    resolver: "interaction",
    tags: ["systems", "toggle", "electronics"],
    notes: "Simple electronics toggle; tactically significant toggles may be raised to 1 SA by a future resolver.",
  }),
  toggleHeatSinks: action("toggleHeatSinks", {
    label: "Activate / Deactivate Heat Sinks",
    resource: "fa",
    cost: 1,
    category: "free",
    resolver: "interaction",
    tags: ["heat", "toggle"],
    notes: "Heat-sink state toggle.",
  }),
  activateMasc: action("activateMasc", {
    label: "Activate / Deactivate MASC",
    resource: "fa",
    cost: 1,
    category: "free",
    resolver: "movement",
    tags: ["movement", "toggle", "masc"],
    notes: "MASC state toggle; risk, heat, or strain hooks belong in the movement resolver.",
  }),
  selectFireMode: action("selectFireMode", {
    label: "Select Fire Mode",
    resource: "fa",
    cost: 1,
    category: "free",
    resolver: "interaction",
    prompt: { type: "fireMode", required: true },
    tags: ["weapon", "fireMode"],
    notes: "Change active fire mode when the machine supports modes.",
  }),
  selectAmmoType: action("selectAmmoType", {
    label: "Select Ammunition Type",
    resource: "fa",
    cost: 1,
    category: "free",
    resolver: "interaction",
    prompt: { type: "payload", required: true },
    tags: ["weapon", "payload", "ammunition"],
    notes: "Select a preloaded ammunition or payload type; physical reloads remain separate.",
  }),
  torsoTwist: action("torsoTwist", {
    label: "Torso Twist / Rotate Turret",
    resource: "fa",
    cost: 1,
    category: "free",
    resolver: "movement",
    tags: ["facing", "arc", "posture"],
    notes: "Arc or facing adjustment; CQ-granting variants can be raised to 1 SA later.",
  }),
  avoidShutdown: action("avoidShutdown", {
    label: "Avoid Shutdown",
    resource: "ra",
    cost: 1,
    category: "reaction",
    resolver: "recovery",
    roll: { intent: "heatDangerCheck", checkKind: "shutdown" },
    tags: ["heat", "shutdown", "reaction"],
    resolves: ["shutdown"],
    notes: "Danger heat shutdown check.",
  }),

  // Standard actions / 1 SA.
  walk: action("walk", {
    label: "Walk / Safe Thrust",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 1,
    category: "simple",
    resolver: "movement",
    tags: ["movement", "safe"],
  }),
  safeThrust: action("safeThrust", {
    label: "Safe Thrust",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 1,
    category: "simple",
    resolver: "movement",
    tags: ["movement", "safe", "thrust"],
  }),
  run: action("run", {
    label: "Run / Flank / Max Thrust",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 1,
    category: "simple",
    resolver: "movement",
    tags: ["movement", "fast"],
    notes: "Fast movement mode; may add heat or pending strain by scale.",
  }),
  jumpMove: action("jumpMove", {
    label: "Jump Movement",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 1,
    category: "simple",
    resolver: "movement",
    tags: ["movement", "jump"],
  }),
  aim: action("aim", {
    label: "Careful Aim",
    cost: 1,
    category: "simple",
    resolver: "action",
    tags: ["combat", "aim"],
    notes: "Posture/action-economy anchor for careful aim bonuses.",
  }),
  rangedAttack: action("rangedAttack", {
    label: "Ranged Attack",
    attributeKey: "handling",
    skillKey: "gunnery",
    cost: 1,
    category: "simple",
    resolver: "attack",
    prompt: { type: "weapon", required: true },
    tags: ["combat", "attack", "ranged"],
  }),
  physicalAttack: action("physicalAttack", {
    label: "Physical Attack",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 1,
    category: "simple",
    resolver: "attack",
    prompt: { type: "weapon", required: false },
    tags: ["combat", "attack", "melee", "physical"],
  }),
  sensorSweep: action("sensorSweep", {
    label: "Sensor Sweep / Observe Battlefield",
    attributeKey: "system",
    skillKey: "perception",
    cost: 1,
    category: "simple",
    resolver: "targeting",
    intent: "sensorSweep",
    tags: ["sensors", "assessment"],
    notes: "General battlefield scan, hidden-unit detection, and contact identification.",
  }),
  assess: action("assess", {
    label: "Observe in Detail",
    attributeKey: "system",
    skillKey: "perception",
    cost: 1,
    category: "simple",
    resolver: "targeting",
    intent: "sensorSweep",
    tags: ["sensors", "assessment"],
  }),
  acquireTarget: action("acquireTarget", {
    label: "Acquire Target",
    attributeKey: "system",
    skillKey: "perception",
    cost: 1,
    category: "simple",
    resolver: "targeting",
    intent: "acquireTarget",
    prompt: { type: "target", required: true },
    tags: ["sensors", "targeting", "detection"],
  }),
  generateFireSolution: action("generateFireSolution", {
    label: "Generate Fire Solution",
    attributeKey: "system",
    skillKey: "gunnery",
    cost: 1,
    category: "simple",
    resolver: "targeting",
    intent: "generateFireSolution",
    prompt: { type: "target", required: true },
    tags: ["sensors", "targeting", "fireSolution"],
  }),
  sensorLock: action("sensorLock", {
    label: "Sensor Lock",
    attributeKey: "system",
    skillKey: "perception",
    cost: 1,
    category: "simple",
    resolver: "targeting",
    intent: "acquireTarget",
    prompt: { type: "target", required: true },
    tags: ["sensors", "targeting", "lock"],
    notes: "State upgrade through the acquire-target resolver.",
  }),
  brace: action("brace", {
    label: "Brace",
    cost: 1,
    category: "simple",
    resolver: "movement",
    tags: ["posture", "defense"],
    notes: "CQ posture package or defensive setup.",
  }),
  hullDown: action("hullDown", {
    label: "Hull Down",
    cost: 1,
    category: "simple",
    resolver: "movement",
    tags: ["posture", "cover", "defense"],
    notes: "CQ/DR posture package for vehicles and prepared firing positions.",
  }),
  eject: action("eject", {
    label: "Eject",
    cost: 1,
    category: "simple",
    resolver: "interaction",
    tags: ["crew", "emergency"],
    implementation: stub("Manual ejection state changes are not automated yet."),
  }),
  dropProne: action("dropProne", {
    label: "Drop Prone",
    cost: 1,
    category: "simple",
    resolver: "movement",
    tags: ["posture", "prone"],
    resolves: ["standing"],
  }),

  // Complex actions / 2 SA.
  sprint: action("sprint", {
    label: "Sprint",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 2,
    category: "complex",
    resolver: "movement",
    tags: ["movement", "sprint"],
    notes: "High-commitment movement; BattleMechs generate 2 Heat and vehicles use Redline strain.",
  }),
  chargeAttack: action("chargeAttack", {
    label: "Charge / Ram / DFA",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 2,
    category: "complex",
    resolver: "attack",
    tags: ["movement", "attack", "collision"],
  }),
  evasiveManeuver: action("evasiveManeuver", {
    label: "Evasive Maneuver",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 2,
    category: "complex",
    resolver: "movement",
    tags: ["movement", "defense", "evasion"],
    notes: "Withdraw safely. Move up to normal distance without provoking parting attacks. Gain Evasive (+3 DR / −2 AR) until start of next activation.",
  }),
  shield: action("shield", {
    label: "Shield",
    cost: 2,
    category: "complex",
    resolver: "movement",
    tags: ["defense", "shield", "posture"],
    notes: "Guarded stance. Gain Shielded (+4 DR / −1 AR) until start of next activation. First hit reduces incoming damage by 2, then Shield ends.",
  }),
  powerCycle: action("powerCycle", {
    label: "Power Cycle",
    attributeKey: "system",
    skillKey: "computers",
    cost: 2,
    category: "complex",
    resolver: "remediation",
    tags: ["systems", "shutdown", "remediation"],
    resolves: ["shutdown"],
  }),
  spotIndirect: action("spotIndirect", {
    label: "Spot for Indirect Fire",
    attributeKey: "system",
    skillKey: "perception",
    cost: 2,
    category: "complex",
    resolver: "targeting",
    prompt: { type: "target", required: true },
    tags: ["sensors", "targeting", "indirect"],
    implementation: stub("Indirect-fire network effects are not automated yet."),
  }),
  useComplexSkill: action("useComplexSkill", {
    label: "Use Complex Skill",
    cost: 2,
    category: "complex",
    resolver: "action",
    prompt: { type: "skill", required: true },
    tags: ["skill", "complex"],
    notes: "Generic complex machine-scale skill action.",
  }),
  pilotingCheck: action("pilotingCheck", {
    label: "Climb / Evade Terrain / Difficult Maneuver",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 2,
    category: "complex",
    resolver: "movement",
    tags: ["movement", "piloting", "terrain"],
  }),
  emergencyRepair: action("emergencyRepair", {
    label: "Critical Repair",
    attributeKey: "reliability",
    skillKey: "technician",
    cost: 2,
    category: "complex",
    resolver: "remediation",
    tags: ["repair", "critical", "remediation"],
  }),
  coolantDump: action("coolantDump", {
    label: "Coolant Dump",
    attributeKey: "reliability",
    skillKey: "systemOps",
    cost: 2,
    category: "complex",
    resolver: "remediation",
    tags: ["heat", "remediation"],
    notes: "Restore the heat-management system.",
  }),
  epmFilter: action("epmFilter", {
    label: "EPM Filter",
    attributeKey: "system",
    skillKey: "perception",
    cost: 2,
    category: "complex",
    resolver: "targeting",
    intent: "epmFilter",
    tags: ["sensors", "ew", "ecm"],
    resolves: ["ecmJamming"],
    notes: "Remove or reduce ECM Jamming.",
  }),
  swat: action("swat", {
    label: "Swat Battle Armor / Remove NARC",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 2,
    category: "complex",
    resolver: "remediation",
    intent: "swat",
    tags: ["physical", "remediation", "narc"],
    notes: "Remove BattleArmor or NARC.",
  }),

  // Existing remediation and EW anchors.
  systemReset: action("systemReset", {
    label: "System Reset",
    attributeKey: "reliability",
    skillKey: "systemOps",
    cost: 1,
    category: "simple",
    resolver: "remediation",
    tags: ["systems", "remediation"],
  }),
  reboot: action("reboot", {
    label: "Reboot",
    attributeKey: "reliability",
    skillKey: "computers",
    cost: 1,
    category: "simple",
    resolver: "remediation",
    tags: ["systems", "remediation"],
  }),
  feedReset: action("feedReset", {
    label: "Feed Reset",
    attributeKey: "reliability",
    skillKey: "gunnery",
    cost: 1,
    category: "simple",
    resolver: "remediation",
    tags: ["weapon", "feed", "remediation"],
  }),
  pilotRecovery: action("pilotRecovery", {
    label: "Pilot Recovery",
    attributeKey: "reliability",
    skillKey: "piloting",
    cost: 1,
    category: "simple",
    resolver: "recovery",
    tags: ["pilot", "recovery"],
  }),
  stand: action("stand", {
    label: "Stand",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 1,
    category: "simple",
    resolver: "movement",
    tags: ["posture", "recovery"],
    resolves: ["prone"],
  }),
  stabalize: action("stabalize", {
    label: "Stabilize",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 2,
    category: "complex",
    resolver: "recovery",
    tags: ["stabilize", "recovery"],
  }),
  stabilize: action("stabilize", {
    label: "Stabilize",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 2,
    category: "complex",
    resolver: "recovery",
    tags: ["stabilize", "recovery"],
  }),
  powerReroute: action("powerReroute", {
    label: "Power Reroute",
    attributeKey: "system",
    skillKey: "technician",
    cost: 1,
    category: "simple",
    resolver: "remediation",
    tags: ["systems", "remediation"],
  }),
  breakLock: action("breakLock", {
    label: "Break Lock",
    attributeKey: "handling",
    skillKey: "systemOps",
    resource: "ra",
    cost: 1,
    category: "reaction",
    resolver: "targeting",
    intent: "breakLock",
    tags: ["sensors", "defense", "reaction"],
    notes: "Degrade detection state from an attacker.",
  }),
  ecmSpike: action("ecmSpike", {
    label: "ECM Spike",
    attributeKey: "system",
    skillKey: "systemOps",
    cost: 1,
    category: "simple",
    resolver: "targeting",
    intent: "ecmSpike",
    tags: ["ew", "ecm", "targeting"],
    notes: "Apply ECM Jamming.",
  }),
  suppressBeacon: action("suppressBeacon", {
    label: "Suppress Beacon / Suppress NARC/TAG",
    attributeKey: "system",
    skillKey: "systemOps",
    cost: 1,
    category: "simple",
    resolver: "targeting",
    intent: "suppressBeacon",
    tags: ["ew", "beacon", "narc", "tag"],
    notes: "Temporarily suppress beacon-based targeting support.",
  }),
  extinguish: action("extinguish", {
    label: "Extinguish Fire",
    attributeKey: "system",
    skillKey: "piloting",
    cost: 2,
    category: "complex",
    resolver: "recovery",
    tags: ["hazard", "fire", "recovery"],
    resolves: ["burning"],
  }),
  tagTarget: action("tagTarget", {
    label: "TAG Target",
    attributeKey: "handling",
    skillKey: "gunnery",
    cost: 1,
    category: "simple",
    resolver: "targeting",
    intent: "tagTarget",
    tags: ["targeting", "tag"],
    notes: "Apply a TAG enabler flag for guided systems.",
  }),
  shareTargetingData: action("shareTargetingData", {
    label: "Share Sensor Feed / C3 Network Support",
    attributeKey: "system",
    skillKey: "",
    resource: "fa",
    cost: 1,
    category: "free",
    resolver: "targeting",
    intent: "shareTargetingData",
    tags: ["targeting", "network", "c3"],
    notes: "Provider-driven network support; share best detection state and best eligible packet.",
  }),
  emergencyJettison: action("emergencyJettison", {
    label: "Emergency Jettison",
    attributeKey: "system",
    skillKey: "gunnery",
    resource: "ra",
    cost: 1,
    category: "reaction",
    resolver: "interaction",
    tags: ["emergency", "jettison", "reaction"],
  }),
  jettisonCore: action("jettisonCore", {
    label: "Jettison Core",
    attributeKey: "system",
    skillKey: "technician",
    cost: 2,
    category: "complex",
    resolver: "interaction",
    tags: ["emergency", "jettison"],
  }),
  reposition: action("reposition", {
    label: "Reposition",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 1,
    category: "simple",
    resolver: "movement",
    tags: ["movement", "posture"],
  }),
  toggle: action("toggle", {
    label: "Toggle",
    attributeKey: "",
    skillKey: "",
    resource: "fa",
    cost: 1,
    category: "free",
    resolver: "interaction",
    tags: ["toggle"],
  }),
  majorRepair: action("majorRepair", {
    label: "Major Repair",
    attributeKey: "reliability",
    skillKey: "technician",
    resource: "none",
    cost: 0,
    category: "narrative",
    resolver: "remediation",
    remediable: false,
    tags: ["repair", "downtime"],
  }),
});

const ACTION_ALIASES = Object.freeze({
  stabilize: "stabalize",
  changeFireMode: "selectFireMode",
  selectAmmunition: "selectAmmoType",
  selectAmmunitionType: "selectAmmoType",
  physicalDefense: "shield",
  dodge: "evasiveManeuver",
  evade: "evasiveManeuver",
  move: "walk",
  flank: "run",
  maxThrust: "run",
  prone: "dropProne",
});

export function getMachineActionDefinition(actionKey = "") {
  const key = String(actionKey ?? "").trim();
  const resolvedKey = ACTION_ALIASES[key] ?? key;
  return MACHINE_ACTION_DEFINITIONS[resolvedKey] ?? MACHINE_ACTION_DEFINITIONS.none;
}

export function listMachineActionDefinitions() {
  return Object.values(MACHINE_ACTION_DEFINITIONS);
}
