// src/modules/mwd/machine-crit-remedies.js
// Purpose: Code-owned remedy catalog for machine critical hits.
// How it fits: Roll Tables choose remedy keys, while action cost and meaning stay stable.

export const MACHINE_CRIT_REMEDY_KEYS = Object.freeze([
  "emergencyRepair",
  "systemReset",
  "coolantDump",
  "feedReset",
  "pilotRecovery",
]);

export const MACHINE_CRIT_REMEDIES = Object.freeze({
  emergencyRepair: Object.freeze({
    key: "emergencyRepair",
    label: "Emergency Repair",
    actionId: "machineCritEmergencyRepair",
    actionLabel: "Emergency Repair",
    resource: "sa",
    cost: 2,
    category: "complex",
  }),
  systemReset: Object.freeze({
    key: "systemReset",
    label: "System Reset",
    actionId: "machineCritSystemReset",
    actionLabel: "System Reset",
    resource: "sa",
    cost: 2,
    category: "complex",
  }),
  coolantDump: Object.freeze({
    key: "coolantDump",
    label: "Coolant Dump",
    actionId: "machineCritCoolantDump",
    actionLabel: "Coolant Dump",
    resource: "sa",
    cost: 2,
    category: "complex",
  }),
  feedReset: Object.freeze({
    key: "feedReset",
    label: "Feed Reset",
    actionId: "machineCritFeedReset",
    actionLabel: "Feed Reset",
    resource: "sa",
    cost: 2,
    category: "complex",
  }),
  pilotRecovery: Object.freeze({
    key: "pilotRecovery",
    label: "Pilot Recovery",
    actionId: "machineCritPilotRecovery",
    actionLabel: "Pilot Recovery",
    resource: "sa",
    cost: 2,
    category: "complex",
  }),
});

export function getMachineCritRemedy(remedyKey = "") {
  const key = String(remedyKey ?? "").trim();
  return MACHINE_CRIT_REMEDIES[key] ?? MACHINE_CRIT_REMEDIES.emergencyRepair;
}

export function isValidMachineCritRemedy(remedyKey = "") {
  return Object.prototype.hasOwnProperty.call(MACHINE_CRIT_REMEDIES, String(remedyKey ?? "").trim());
}
