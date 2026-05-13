// src/modules/mwd/machine-action-catalog.js
// Purpose: Canonical machine action and remediation definitions aligned to the
//          MWD action docs.
// How it fits: Keeps labels, skill pairing, and action-economy rules in one
//              data-owned seam for sheets, statuses, crit remedies, and intents.

function action(key, config = {}) {
  return Object.freeze({
    key,
    label: config.label ?? key,
    attributeKey: String(config.attributeKey ?? "").trim(),
    skillKey: String(config.skillKey ?? "").trim(),
    resource: String(config.resource ?? "sa").trim() || "sa",
    cost: Math.max(0, Number(config.cost ?? 0) || 0),
    category: String(config.category ?? "simple").trim() || "simple",
    remediable: config.remediable !== false,
    intent: String(config.intent ?? "").trim(),
    use: String(config.use ?? "").trim(),
    notes: String(config.notes ?? "").trim(),
  });
}

export const MACHINE_ACTION_DEFINITIONS = Object.freeze({
  none: action("none", {
    label: "No Field Remedy",
    remediable: false,
    resource: "sa",
    cost: 0,
    category: "none",
  }),
  emergencyRepair: action("emergencyRepair", {
    label: "Critical Repair",
    attributeKey: "reliability",
    skillKey: "technician",
    cost: 2,
    category: "complex",
  }),
  systemReset: action("systemReset", {
    label: "System Reset",
    attributeKey: "reliability",
    skillKey: "systemOps",
    cost: 1,
    category: "simple",
  }),
  reboot: action("reboot", {
    label: "Reboot",
    attributeKey: "reliability",
    skillKey: "computers",
    cost: 1,
    category: "simple",
  }),
  feedReset: action("feedReset", {
    label: "Feed Reset",
    attributeKey: "reliability",
    skillKey: "gunnery",
    cost: 1,
    category: "simple",
  }),
  pilotRecovery: action("pilotRecovery", {
    label: "Pilot Recovery",
    attributeKey: "reliability",
    skillKey: "piloting",
    cost: 1,
    category: "simple",
  }),
  coolantDump: action("coolantDump", {
    label: "Coolant Dump",
    attributeKey: "reliability",
    skillKey: "systemOps",
    cost: 1,
    category: "simple",
    notes: "Restore the heat-management system.",
  }),
  stand: action("stand", {
    label: "Stand",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 1,
    category: "simple",
  }),
  stabalize: action("stabalize", {
    label: "Stabilize",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 2,
    category: "complex",
  }),
  stabilize: action("stabilize", {
    label: "Stabilize",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 2,
    category: "complex",
  }),
  powerReroute: action("powerReroute", {
    label: "Power Reroute",
    attributeKey: "system",
    skillKey: "technician",
    cost: 1,
    category: "simple",
  }),
  sensorSweep: action("sensorSweep", {
    label: "Sensor Sweep / Observe Battlefield",
    attributeKey: "system",
    skillKey: "perception",
    cost: 1,
    category: "simple",
    intent: "sensorSweep",
    notes: "General battlefield scan, hidden-unit detection, and contact identification.",
  }),
  epmFilter: action("epmFilter", {
    label: "EPM Filter",
    attributeKey: "system",
    skillKey: "perception",
    cost: 2,
    category: "complex",
    intent: "epmFilter",
    notes: "Remove or reduce ECM Jamming.",
  }),
  powerCycle: action("powerCycle", {
    label: "Power Cycle",
    attributeKey: "system",
    skillKey: "computers",
    cost: 2,
    category: "complex",
  }),
  acquireTarget: action("acquireTarget", {
    label: "Acquire Target",
    attributeKey: "system",
    skillKey: "perception",
    cost: 1,
    category: "simple",
    intent: "acquireTarget",
  }),
  generateFireSolution: action("generateFireSolution", {
    label: "Generate Fire Solution",
    attributeKey: "system",
    skillKey: "gunnery",
    cost: 1,
    category: "simple",
    intent: "generateFireSolution",
  }),
  breakLock: action("breakLock", {
    label: "Break Lock",
    attributeKey: "handling",
    skillKey: "systemOps",
    cost: 0,
    category: "reaction",
    intent: "breakLock",
    notes: "Degrade detection state from an attacker.",
  }),
  ecmSpike: action("ecmSpike", {
    label: "ECM Spike",
    attributeKey: "system",
    skillKey: "systemOps",
    cost: 1,
    category: "simple",
    intent: "ecmSpike",
    notes: "Apply ECM Jamming.",
  }),
  suppressBeacon: action("suppressBeacon", {
    label: "Suppress Beacon / Suppress NARC/TAG",
    attributeKey: "system",
    skillKey: "systemOps",
    cost: 1,
    category: "simple",
    intent: "suppressBeacon",
    notes: "Temporarily suppress beacon-based targeting support.",
  }),
  sprint: action("sprint", {
    label: "Sprint",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 3,
    category: "complex",
    notes: "Fast movement; generates 2 Heat.",
  }),
  extinguish: action("extinguish", {
    label: "Extinguish",
    attributeKey: "system",
    skillKey: "piloting",
    cost: 2,
    category: "complex",
  }),
  swat: action("swat", {
    label: "Swat",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 2,
    category: "complex",
    intent: "swat",
    notes: "Remove BattleArmor or NARC.",
  }),
  tagTarget: action("tagTarget", {
    label: "TAG Target",
    attributeKey: "handling",
    skillKey: "gunnery",
    cost: 1,
    category: "simple",
    intent: "tagTarget",
    notes: "Apply a TAG enabler flag for guided systems.",
  }),
  shareTargetingData: action("shareTargetingData", {
    label: "Share Sensor Feed / C3 Network Support",
    attributeKey: "system",
    skillKey: "",
    resource: "fa",
    cost: 1,
    category: "free",
    intent: "shareTargetingData",
    notes: "Provider-driven network support; share best detection state and best eligible packet.",
  }),
  emergencyJettison: action("emergencyJettison", {
    label: "Emergency Jettison",
    attributeKey: "system",
    skillKey: "gunnery",
    cost: 0,
    category: "reaction",
  }),
  jettisonCore: action("jettisonCore", {
    label: "Jettison Core",
    attributeKey: "system",
    skillKey: "technician",
    cost: 2,
    category: "complex",
  }),
  reposition: action("reposition", {
    label: "Reposition",
    attributeKey: "handling",
    skillKey: "piloting",
    cost: 1,
    category: "simple",
  }),
  toggle: action("toggle", {
    label: "Toggle",
    attributeKey: "",
    skillKey: "",
    cost: 0,
    category: "free",
  }),
  majorRepair: action("majorRepair", {
    label: "Major Repair",
    attributeKey: "reliability",
    skillKey: "technician",
    cost: 0,
    category: "narrative",
    remediable: false,
  }),
});

const ACTION_ALIASES = Object.freeze({
  stabilize: "stabalize",
});

export function getMachineActionDefinition(actionKey = "") {
  const key = String(actionKey ?? "").trim();
  const resolvedKey = ACTION_ALIASES[key] ?? key;
  return MACHINE_ACTION_DEFINITIONS[resolvedKey] ?? MACHINE_ACTION_DEFINITIONS.none;
}

export function listMachineActionDefinitions() {
  return Object.values(MACHINE_ACTION_DEFINITIONS);
}
