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
    skillKey: "",
    baseDn: 0,
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
    skillKey: "technician",
    baseDn: 2,
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
    skillKey: "systemOps",
    baseDn: 1,
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
    skillKey: "systemOps",
    baseDn: 1,
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
    skillKey: "gunnery",
    baseDn: 1,
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
    skillKey: "piloting",
    baseDn: 2,
  }),
});

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
