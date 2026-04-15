// src/modules/mwd/machine-crit-remedies.js
// Purpose: Code-owned remedy catalog for machine critical hits.
// How it fits: Roll Tables choose remedy keys, while action cost and meaning stay stable.

export const MACHINE_CRIT_REMEDY_KEYS = Object.freeze([
  "none",
  "emergencyRepair",
  "systemReset",
  "coolantDump",
  "feedReset",
  "pilotRecovery",
]);

export const MACHINE_CRIT_REMEDIES = Object.freeze({
  none: Object.freeze({
    key: "none",
    label: "No Field Remedy",
    actionId: "machineCritNoFieldRemedy",
    actionLabel: "No Field Remedy",
    resource: "sa",
    cost: 0,
    category: "none",
    remediable: false,
  }),
  emergencyRepair: Object.freeze({
    key: "emergencyRepair",
    label: "Emergency Repair",
    actionId: "machineCritEmergencyRepair",
    actionLabel: "Emergency Repair",
    resource: "sa",
    cost: 2,
    category: "complex",
    remediable: true,
  }),
  systemReset: Object.freeze({
    key: "systemReset",
    label: "System Reset",
    actionId: "machineCritSystemReset",
    actionLabel: "System Reset",
    resource: "sa",
    cost: 1,
    category: "simple",
    remediable: true,
  }),
  coolantDump: Object.freeze({
    key: "coolantDump",
    label: "Coolant Dump",
    actionId: "machineCritCoolantDump",
    actionLabel: "Coolant Dump",
    resource: "sa",
    cost: 1,
    category: "simple",
    remediable: true,
  }),
  feedReset: Object.freeze({
    key: "feedReset",
    label: "Reload / Feed Reset",
    actionId: "machineCritFeedReset",
    actionLabel: "Reload / Feed Reset",
    resource: "sa",
    cost: 1,
    category: "simple",
    remediable: true,
  }),
  pilotRecovery: Object.freeze({
    key: "pilotRecovery",
    label: "Pilot Recovery",
    actionId: "machineCritPilotRecovery",
    actionLabel: "Pilot Recovery",
    resource: "sa",
    cost: 2,
    category: "complex",
    remediable: true,
  }),
});

export function getMachineCritRemedy(remedyKey = "") {
  const key = String(remedyKey ?? "").trim();
  return MACHINE_CRIT_REMEDIES[key] ?? MACHINE_CRIT_REMEDIES.emergencyRepair;
}

export function isValidMachineCritRemedy(remedyKey = "") {
  return Object.prototype.hasOwnProperty.call(MACHINE_CRIT_REMEDIES, String(remedyKey ?? "").trim());
}
