// src/modules/mwd/personal-crit-remedies.js
// Purpose: Defines the remedy catalog for Personal Critical Hit records.

export const PERSONAL_CRIT_REMEDIES = Object.freeze({
  reduceBurn: Object.freeze({
    key: "reduceBurn",
    label: "Reduce Burn",
    actionId: "reduceBurn",
    actionKind: "personalAction",
    skillKey: "",
    baseDn: 0,
    remediable: true,
  }),
  endure: Object.freeze({
    key: "endure",
    label: "Endure",
    actionId: "endure",
    actionKind: "commonCheck",
    skillKey: "endure",
    baseDn: 1,
    remediable: true,
  }),
  composure: Object.freeze({
    key: "composure",
    label: "Composure",
    actionId: "composure",
    actionKind: "commonCheck",
    skillKey: "composure",
    baseDn: 2,
    remediable: true,
  }),
  firstAid: Object.freeze({
    key: "firstAid",
    label: "First Aid",
    actionId: "firstAid",
    actionKind: "personalAction",
    skillKey: "medtech",
    baseDn: 1,
    remediable: true,
  }),
  readyItem: Object.freeze({
    key: "readyItem",
    label: "Ready Item",
    actionId: "readyItem",
    actionKind: "personalAction",
    skillKey: "",
    baseDn: 0,
    remediable: true,
  }),
  steady: Object.freeze({
    key: "steady",
    label: "Steady",
    actionId: "steady",
    actionKind: "commonCheck",
    skillKey: "steady",
    baseDn: 2,
    remediable: true,
  }),
  none: Object.freeze({
    key: "none",
    label: "No Remedy",
    actionId: "",
    actionKind: "none",
    skillKey: "",
    baseDn: 0,
    remediable: false,
  }),
});

export function getPersonalCritRemedy(key) {
  const normalized = String(key ?? "").trim();
  return PERSONAL_CRIT_REMEDIES[normalized] ?? PERSONAL_CRIT_REMEDIES.none;
}

export function getPersonalCritRemedyLabel(key) {
  return getPersonalCritRemedy(key).label;
}
