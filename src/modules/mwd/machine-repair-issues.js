// src/modules/mwd/machine-repair-issues.js
// Purpose: Merge active crits and curated status-backed repair issues into one
//          chooser-friendly model.
// Workflow: active crits and repairable statuses -> read-only issue rows with
// remedy metadata -> quick-action menus hand selected issues to machine-intents.

import { getStatusConditionDefinition } from "../status/status-condition-catalog.js";
import { startCase } from "../core/constants.js";
import { getSkillDef } from "./skills.js";
import { getActiveMachineCrits } from "./critical-hits.js";
import { describeMachineCriticalEffect } from "./machine-crit-effects.js";
import { getMachineCritRemedy, getMachineRemedyBaseDn, getMachineRemedySkillKey } from "./machine-crit-remedies.js";
import {
  getMachineConditionLabel,
  getMachineConditionModifier,
  normalizeMachineDegradationState,
} from "./machine-degradation.js";

const REPAIRABLE_MACHINE_STATUS_DEFINITIONS = Object.freeze({
  sensorDegraded: Object.freeze({
    remedyKey: "systemReset",
    skillKey: "computers",
    locationKey: "head",
    effectSummary: "Sensor sweeps and targeting suffer degraded optics and processing until reset.",
  }),
  sensorBlind: Object.freeze({
    remedyKey: "systemReset",
    skillKey: "computers",
    locationKey: "head",
    effectSummary: "Sensor and targeting actions are severely impaired until reset.",
  }),
  stalled: Object.freeze({
    remedyKey: "emergencyRepair",
    effectSummary: "The machine cannot move normally until the fault is repaired.",
  }),
  unstable: Object.freeze({
    remedyKey: "emergencyRepair",
    effectSummary: "Piloting and movement remain unstable until the machine is repaired.",
  }),
  limping: Object.freeze({
    remedyKey: "emergencyRepair",
    locationKey: "legs",
    effectSummary: "Mobility remains impaired until the damaged leg assembly is repaired.",
  }),
  jumpJetFailure: Object.freeze({
    remedyKey: "emergencyRepair",
    locationKey: "legs",
    effectSummary: "Jump movement is unavailable until the jump system is repaired.",
  }),
  overheating: Object.freeze({
    remedyKey: "coolantDump",
    locationKey: "torso",
    effectSummary: "Heat continues to spike until the cooling issue is cleared.",
  }),
  reactorInstability: Object.freeze({
    remedyKey: "coolantDump",
    locationKey: "torso",
    effectSummary: "The reactor remains unstable until coolant routing is restored.",
  }),
  proneMechFall: Object.freeze({
    remedyKey: "stand",
    effectSummary: "The machine must recover from a prone fall before normal movement resumes.",
  }),
});

function compactList(values = []) {
  return values.map(value => String(value ?? "").trim()).filter(Boolean);
}

function getLocationContext(actor, locationKey = "") {
  // Repair DN can rise with local degradation, so status-backed issues need the
  // same location condition lookup as critical-backed issues.
  const normalizedKey = String(locationKey ?? "").trim();
  if (!normalizedKey) {
    return {
      locationKey: "",
      conditionLabel: "",
      conditionModifier: 0,
    };
  }

  const normalizedState = normalizeMachineDegradationState(
    foundry.utils.deepClone(actor?.system ?? {}),
    actor?.type,
  );
  const location = normalizedState?.mwd?.locations?.[normalizedKey] ?? {};
  const condition = Number(location?.condition ?? 0) || 0;

  return {
    locationKey: normalizedKey,
    conditionLabel: getMachineConditionLabel(condition),
    conditionModifier: getMachineConditionModifier(condition),
  };
}

function buildIssueSummary({ remedySkillKey = "", totalDn = 0, conditionLabel = "" } = {}) {
  const remedySkillLabel = getSkillDef(remedySkillKey)?.label ?? startCase(remedySkillKey);
  if (!remedySkillLabel) return "";
  return `Reliability + ${remedySkillLabel} vs DN ${totalDn}${conditionLabel ? ` (${conditionLabel})` : ""}`;
}

function buildCriticalIssue(actor, crit = {}) {
  // Convert a stored critical into the same issue shape as a status repair so
  // the sheet can render one chooser for both sources.
  const remedy = getMachineCritRemedy(crit.remedyKey);
  const effect = describeMachineCriticalEffect(crit);
  const location = getLocationContext(actor, crit.locationKey);
  const remedySkillKey = String(crit.remedySkillKey ?? getMachineRemedySkillKey(crit, remedy) ?? "").trim();
  const remedyBaseDn = getMachineRemedyBaseDn(crit, remedy);
  const totalDn = Math.max(0, remedyBaseDn + Number(location.conditionModifier ?? 0));

  return {
    issueKind: "crit",
    issueId: String(crit.id ?? "").trim(),
    label: String(crit.label ?? startCase(crit.key)).trim(),
    sortLabel: String(crit.label ?? startCase(crit.key)).trim().toLowerCase(),
    locationLabel: String(crit.locationLabel ?? startCase(crit.locationKey)).trim(),
    detail: compactList([
      effect.statusLabel ? `Status: ${effect.statusLabel}` : "",
      effect.scopeSummary,
      effect.automationMode === "engine" ? "Automated" : "Reminder Only",
      crit.escalationKey ? `Escalates: ${crit.escalationKey}` : "",
    ]).join(" | "),
    effectSummary: effect.effectText,
    remedyKey: remedy.key,
    remedyLabel: remedy.label,
    remedySkillKey,
    remedyBaseDn,
    totalDn,
    remedySummary: buildIssueSummary({
      remedySkillKey,
      totalDn,
      conditionLabel: location.conditionLabel,
    }),
    remediable: remedy.remediable !== false,
    statusId: String(crit.statusId ?? "").trim(),
  };
}

export function getRepairableMachineStatusIssue(actor, statusId = "") {
  // Only curated statuses become repair issues. Other statuses may affect rules
  // but should not clutter the field-remedy chooser.
  const normalizedStatusId = String(statusId ?? "").trim();
  const definition = REPAIRABLE_MACHINE_STATUS_DEFINITIONS[normalizedStatusId] ?? null;
  if (!definition) return null;
  if (!(actor?.statuses?.has?.(normalizedStatusId) ?? false)) return null;

  const catalogEntry = getStatusConditionDefinition(normalizedStatusId);
  const remedy = getMachineCritRemedy(definition.remedyKey);
  const location = getLocationContext(actor, definition.locationKey);
  const remedySkillKey = String(definition.skillKey ?? "").trim()
    || getMachineRemedySkillKey({ remedyKey: definition.remedyKey }, remedy);
  const remedyBaseDn = getMachineRemedyBaseDn({ remedyKey: definition.remedyKey }, remedy);
  const totalDn = Math.max(0, remedyBaseDn + Number(location.conditionModifier ?? 0));

  return {
    issueKind: "status",
    issueId: normalizedStatusId,
    label: String(catalogEntry?.label ?? startCase(normalizedStatusId)).trim() || startCase(normalizedStatusId),
    sortLabel: String(catalogEntry?.label ?? startCase(normalizedStatusId)).trim().toLowerCase(),
    locationLabel: location.locationKey ? startCase(location.locationKey) : "",
    detail: "Status-backed repair issue",
    effectSummary: String(definition.effectSummary ?? "").trim(),
    remedyKey: remedy.key,
    remedyLabel: remedy.label,
    remedySkillKey,
    remedyBaseDn,
    totalDn,
    remedySummary: buildIssueSummary({
      remedySkillKey,
      totalDn,
      conditionLabel: location.conditionLabel,
    }),
    remediable: remedy.remediable !== false,
    statusId: normalizedStatusId,
  };
}

export function getMachineRepairIssues(actor) {
  const activeCrits = getActiveMachineCrits(actor).map(crit => buildCriticalIssue(actor, crit));
  const critBackedStatusIds = new Set(
    activeCrits
      .map(issue => String(issue.statusId ?? "").trim())
      .filter(Boolean)
  );

  const statusIssues = Array.from(actor?.statuses ?? [])
    .map(statusId => String(statusId ?? "").trim())
    .filter(Boolean)
    .filter(statusId => !critBackedStatusIds.has(statusId))
    .map(statusId => getRepairableMachineStatusIssue(actor, statusId))
    .filter(issue => issue !== null && issue.remediable !== false)
    .sort((left, right) => left.sortLabel.localeCompare(right.sortLabel));

  return [...activeCrits, ...statusIssues];
}
