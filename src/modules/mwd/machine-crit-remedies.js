// src/modules/mwd/machine-crit-remedies.js
// Purpose: Code-owned remedy catalog for machine critical hits.
// Workflow: crit table stores a remedy key -> this catalog resolves cost/skill/DN
// defaults -> machine-intents prepares or applies the repair workflow.

import { getMachineActionDefinition } from "./machine-action-catalog.js";

export const MACHINE_CRIT_REMEDY_KEYS = Object.freeze([
  "none",
  "emergencyRepair",
  "systemReset",
  "coolantDump",
  "reboot",
  "feedReset",
  "pilotRecovery",
  "stand",
  "stabalize",
  "powerReroute",
  "epmFilter",
  "powerCycle",
  "acquireTarget",
  "jettisonCore",
  "breakLock",
  "extinguish",
  "reposition",
  "toggle",
  "majorRepair",
]);

function remedy(key, overrides = {}) {
  // Remedies inherit action-economy data from the canonical action catalog, then
  // override only the repair-specific DN/label details.
  const definition = getMachineActionDefinition(key);
  return Object.freeze({
    key: definition.key,
    label: overrides.label ?? definition.label,
    actionId: overrides.actionId ?? `machineCrit${definition.key.charAt(0).toUpperCase()}${definition.key.slice(1)}`,
    actionLabel: overrides.actionLabel ?? definition.label,
    resource: definition.resource,
    cost: definition.cost,
    category: definition.category,
    remediable: overrides.remediable ?? definition.remediable,
    skillKey: overrides.skillKey ?? definition.skillKey,
    baseDn: Number(overrides.baseDn ?? definition.cost ?? 0),
  });
}

export const MACHINE_CRIT_REMEDIES = Object.freeze(Object.fromEntries(
  [
    ["none", remedy("none", { baseDn: 0 })],
    ["emergencyRepair", remedy("emergencyRepair", { baseDn: 2 })],
    ["systemReset", remedy("systemReset", { baseDn: 2 })],
    ["coolantDump", remedy("coolantDump", { baseDn: 1 })],
    ["reboot", remedy("reboot", { baseDn: 2 })],
    ["feedReset", remedy("feedReset", { label: "Feed Reset", baseDn: 1 })],
    ["pilotRecovery", remedy("pilotRecovery", { baseDn: 2 })],
    ["stand", remedy("stand", { baseDn: 1 })],
    ["stabalize", remedy("stabalize", { baseDn: 2 })],
    ["powerReroute", remedy("powerReroute", { baseDn: 2 })],
    ["epmFilter", remedy("epmFilter", { baseDn: 2 })],
    ["powerCycle", remedy("powerCycle", { baseDn: 2 })],
    ["acquireTarget", remedy("acquireTarget", { baseDn: 2 })],
    ["jettisonCore", remedy("jettisonCore", { baseDn: 3 })],
    ["breakLock", remedy("breakLock", { baseDn: 2 })],
    ["extinguish", remedy("extinguish", { baseDn: 2 })],
    ["reposition", remedy("reposition", { baseDn: 0 })],
    ["toggle", remedy("toggle", { baseDn: 0, remediable: true })],
    ["majorRepair", remedy("majorRepair", { baseDn: 0, remediable: false })],
  ]
));

export function getMachineCritRemedy(remedyKey = "") {
  const key = String(remedyKey ?? "").trim();
  return MACHINE_CRIT_REMEDIES[key] ?? MACHINE_CRIT_REMEDIES.emergencyRepair;
}

export function isValidMachineCritRemedy(remedyKey = "") {
  return Object.prototype.hasOwnProperty.call(MACHINE_CRIT_REMEDIES, String(remedyKey ?? "").trim());
}

function getCritSearchText(crit = {}) {
  return [
    crit?.key,
    crit?.label,
    crit?.locationLabel,
    ...(Array.isArray(crit?.gates) ? crit.gates : []),
    ...(Array.isArray(crit?.mods) ? crit.mods : []),
  ]
    .map(value => String(value ?? "").trim())
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function getMachineRemedySkillKey(crit = {}, remedy = null) {
  // Some older crit rows only say "system reset"; infer Computers for sensor
  // and targeting faults so imported tables remain playable.
  const remedyData = remedy ?? getMachineCritRemedy(crit?.remedyKey ?? "");
  const explicit = String(crit?.remedySkillKey ?? "").trim();
  if (explicit) return explicit;

  if (remedyData.key === "systemReset") {
    const text = getCritSearchText(crit);
    if (/(sensor|optic|target|tracking|communications|comms|processor|computer|fire-control|fire control)/i.test(text)) {
      return "computers";
    }
  }

  return String(remedyData.skillKey ?? "").trim();
}

export function getMachineRemedyBaseDn(crit = {}, remedy = null) {
  const remedyData = remedy ?? getMachineCritRemedy(crit?.remedyKey ?? "");
  const explicit = Number(crit?.remedyBaseDn);
  if (Number.isFinite(explicit) && explicit >= 0) return explicit;
  const baseDn = Number(remedyData.baseDn ?? remedyData.cost ?? 1);
  return Number.isFinite(baseDn) ? Math.max(0, baseDn) : 1;
}

export function getMachineRemedyEffect(crit = {}) {
  const effect = crit?.remedyEffect ?? {};
  const onSuccess = String(effect?.onSuccess ?? "clear").trim() || "clear";
  const onFailure = String(effect?.onFailure ?? "noChange").trim() || "noChange";
  return { onSuccess, onFailure };
}
