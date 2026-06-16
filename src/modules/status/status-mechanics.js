// src/modules/status/status-mechanics.js
// Purpose: Resolves active status ids into typed, source-aware mechanics.
// Workflow: status catalog validates applicability -> STATUS_MAP supplies
// declarative contributions -> subsystem helpers consume only their fields.

import { STATUS_MAP, MACHINE_STATE_FIELDS, STATUS_ROLES } from "../roll/config/status-modifiers.js";
import { getPersonalAction } from "../combat/personal-action-catalog.js";
import {
  getDefaultStatusConditionCatalog,
  getStatusConditionDefinition,
  isStatusConditionApplicableToActor,
} from "./status-condition-catalog.js";

const CONTRIBUTION_FIELDS = Object.freeze([
  "mods",
  "cq",
  "actionGates",
  "clearsOnActions",
  "machineState",
  "repair",
  "resource",
  "speed",
]);

const ACTION_GATE_WILDCARDS = Object.freeze(["*", "machineAction:*"]);

function collectionToArray(value = null) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value.values === "function") return Array.from(value.values());
  if (typeof value[Symbol.iterator] === "function") return Array.from(value);
  return [];
}

function normalizeStatusId(value = "") {
  return String(value ?? "").trim();
}

function normalizeStacking(value = "") {
  const raw = String(value ?? "unique").trim();
  return raw || "unique";
}

function clone(value) {
  return globalThis.foundry?.utils?.deepClone?.(value) ?? JSON.parse(JSON.stringify(value ?? null));
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function getMechanicsKey(statusId = "", actor = null) {
  const catalogEntry = getStatusConditionDefinition(statusId);
  if (catalogEntry && !isStatusConditionApplicableToActor(catalogEntry, actor)) {
    return { catalogEntry, mechanicsKey: "", explicitMissing: false };
  }
  const modifierKey = String(catalogEntry?.modifierKey ?? "").trim();
  return {
    catalogEntry,
    mechanicsKey: modifierKey || statusId,
    explicitMissing: Boolean(modifierKey && !STATUS_MAP[modifierKey]),
  };
}

export function getStatusMechanicsDefinition(statusId = "", actor = null) {
  const id = normalizeStatusId(statusId);
  if (!id) return null;

  const { catalogEntry, mechanicsKey, explicitMissing } = getMechanicsKey(id, actor);
  if (!mechanicsKey) return null;
  const definition = STATUS_MAP[mechanicsKey];
  if (!definition) {
    if (explicitMissing) console.warn(`MWD | Status "${id}" references missing mechanics key "${mechanicsKey}".`);
    return null;
  }

  const mechanicId = String(definition.mechanicId ?? mechanicsKey).trim() || mechanicsKey;
  return {
    statusId: id,
    mechanicsKey,
    mechanicId,
    stacking: normalizeStacking(definition.stacking),
    label: String(definition.label ?? catalogEntry?.label ?? id).trim() || id,
    definition,
  };
}

export function getActorStatusMechanics(actor = null, { extraStatusIds = [], sourceChannel = "manual" } = {}) {
  const sources = [
    ...collectionToArray(actor?.statuses).map(statusId => ({
      statusId: normalizeStatusId(statusId),
      sourceChannel: "manual",
    })),
    ...collectionToArray(extraStatusIds).map(entry => {
      if (entry && typeof entry === "object" && !Array.isArray(entry)) {
        return {
          statusId: normalizeStatusId(entry.statusId ?? entry.id),
          sourceChannel: normalizeStatusId(entry.sourceChannel) || sourceChannel,
          sourceLabel: normalizeStatusId(entry.sourceLabel),
        };
      }
      return {
        statusId: normalizeStatusId(entry),
        sourceChannel,
      };
    }),
  ].filter(entry => entry.statusId);
  const seenStatusIds = new Set();
  const seenUniqueMechanics = new Set();
  const mechanics = [];

  for (const source of sources) {
    if (seenStatusIds.has(source.statusId)) continue;
    seenStatusIds.add(source.statusId);

    const resolved = getStatusMechanicsDefinition(source.statusId, actor);
    if (!resolved) continue;
    if (resolved.stacking === "unique") {
      if (seenUniqueMechanics.has(resolved.mechanicId)) continue;
      seenUniqueMechanics.add(resolved.mechanicId);
    }

    mechanics.push({
      ...resolved,
      sourceChannel: source.sourceChannel,
      sourceLabel: source.sourceLabel || resolved.label,
    });
  }

  return mechanics;
}

function tagContribution(base, entry = {}, field = "") {
  return {
    ...clone(entry),
    statusId: base.statusId,
    mechanicsKey: base.mechanicsKey,
    mechanicId: base.mechanicId,
    stacking: base.stacking,
    sourceStatusLabel: base.label,
    sourceLabel: base.sourceLabel,
    sourceChannel: base.sourceChannel,
    field,
  };
}

export function collectStatusRollModifiers(actor = null, { rollActor = null, domains = [] } = {}) {
  const rollDomains = Array.isArray(domains)
    ? domains.map(domain => String(domain ?? "").trim()).filter(Boolean)
    : [];
  const actors = [actor, rollActor].filter((entry, index, source) => {
    if (!entry) return false;
    const key = entry.uuid ?? entry.id ?? entry;
    return source.findIndex(other => (other?.uuid ?? other?.id ?? other) === key) === index;
  });
  const out = [];

  for (const sourceActor of actors) {
    for (const mechanic of getActorStatusMechanics(sourceActor)) {
      for (const entry of asArray(mechanic.definition.mods)) {
        const entryDomains = Array.isArray(entry.domains) ? entry.domains : [];
        const matchedDomain = entryDomains.find(domain => rollDomains.includes(domain)) ?? entryDomains[0] ?? "";
        if (rollDomains.length && entryDomains.length && !entryDomains.some(domain => rollDomains.includes(domain))) continue;
        out.push(tagContribution(mechanic, { ...entry, domain: matchedDomain || entry.domain }, "mods"));
      }
    }
  }

  return out;
}

export function collectStatusCqAdjustments(actor = null, { role = "" } = {}) {
  const normalizedRole = String(role ?? "").trim();
  const out = [];
  for (const mechanic of getActorStatusMechanics(actor)) {
    for (const entry of asArray(mechanic.definition.cq)) {
      if (entry.whenBearerIs && String(entry.whenBearerIs).trim() !== normalizedRole) continue;
      out.push(tagContribution(mechanic, entry, "cq"));
    }
  }
  return out;
}

export function collectStatusActionGates(actor = null, { actionId = "" } = {}) {
  const normalizedAction = String(actionId ?? "").trim();
  const out = [];
  for (const mechanic of getActorStatusMechanics(actor)) {
    for (const entry of asArray(mechanic.definition.actionGates)) {
      const actionIds = asArray(entry.actionIds).map(value => String(value ?? "").trim()).filter(Boolean);
      if (actionIds.length && !actionIds.includes(normalizedAction) && !actionIds.includes("*")) continue;
      out.push(tagContribution(mechanic, entry, "actionGates"));
    }
  }
  return out;
}

export function getStatusActionGateReason(actor = null, { actionId = "" } = {}) {
  const gate = collectStatusActionGates(actor, { actionId })[0] ?? null;
  return gate ? String(gate.reason ?? `${gate.sourceStatusLabel} blocks this action.`).trim() : "";
}

export function collectStatusClearsOnAction(actor = null, { actionId = "" } = {}) {
  const normalizedAction = String(actionId ?? "").trim();
  const out = [];
  for (const mechanic of getActorStatusMechanics(actor)) {
    for (const entry of asArray(mechanic.definition.clearsOnActions)) {
      const actionIds = asArray(entry.actionIds).map(value => String(value ?? "").trim()).filter(Boolean);
      if (actionIds.length && !actionIds.includes(normalizedAction) && !actionIds.includes("*")) continue;
      out.push(tagContribution(mechanic, entry, "clearsOnActions"));
    }
  }
  return out;
}

export function collectMachineStateAnnotations(actor = null, { extraStatusIds = [] } = {}) {
  const state = Object.fromEntries(MACHINE_STATE_FIELDS.map(field => [field, []]));
  for (const mechanic of getActorStatusMechanics(actor, { extraStatusIds })) {
    const machineState = mechanic.definition.machineState;
    if (!machineState || typeof machineState !== "object") continue;
    for (const field of MACHINE_STATE_FIELDS) {
      for (const entry of asArray(machineState[field])) {
        state[field].push(tagContribution(mechanic, entry, `machineState.${field}`));
      }
    }
  }
  return state;
}

export function getStatusRepairDefinition(actor = null, statusId = "") {
  const mechanic = getStatusMechanicsDefinition(statusId, actor);
  if (!mechanic) return null;
  const repair = mechanic.definition.repair ?? null;
  if (!repair?.repairable) return null;
  return tagContribution(mechanic, repair, "repair");
}

export function validateStatusMechanicsMap(statusMap = STATUS_MAP) {
  const errors = [];
  const knownRoles = new Set(Object.values(STATUS_ROLES));
  const roleFields = {
    rollModifier: ["mods"],
    actionGate: ["actionGates", "clearsOnActions"],
    cqAdjustment: ["cq"],
    machineState: ["machineState"],
    repairIssue: ["repair"],
    resourceEffect: ["resource"],
    speedEffect: ["speed"],
  };

  for (const [key, entry] of Object.entries(statusMap)) {
    const roles = asArray(entry.roles);
    if (!roles.length) errors.push(`${key}: roles must not be empty.`);
    for (const role of roles) {
      if (!knownRoles.has(role)) errors.push(`${key}: unknown role "${role}".`);
    }

    if (roles.includes(STATUS_ROLES.visualMarker)) {
      const hasTypedFields = CONTRIBUTION_FIELDS.some(field => entry[field] !== undefined);
      if (hasTypedFields || roles.length > 1) errors.push(`${key}: visualMarker entries must not declare mechanics fields or extra roles.`);
      continue;
    }

    for (const role of roles) {
      const fields = roleFields[role] ?? [];
      if (!fields.length) continue;
      if (!fields.some(field => entry[field] !== undefined)) {
        errors.push(`${key}: role "${role}" has no matching typed field.`);
      }
    }

    for (const cq of asArray(entry.cq)) {
      if (!cq.whenBearerIs) errors.push(`${key}: cq entry "${cq.id ?? "(unnamed)"}" must include whenBearerIs.`);
    }
    for (const gate of asArray(entry.actionGates)) {
      for (const actionId of asArray(gate.actionIds).map(normalizeStatusId).filter(Boolean)) {
        if (!ACTION_GATE_WILDCARDS.includes(actionId) && !getPersonalAction(actionId)) {
          errors.push(`${key}: actionGate entry "${gate.id ?? "(unnamed)"}" references unknown action id "${actionId}".`);
        }
      }
    }
    for (const mod of asArray(entry.mods)) {
      if (!asArray(mod.domains).length || !asArray(mod.tags).length) {
        errors.push(`${key}: mod entry "${mod.id ?? "(unnamed)"}" must include domains and tags.`);
      }
    }
    if (entry.machineState && typeof entry.machineState === "object") {
      for (const field of Object.keys(entry.machineState)) {
        if (!MACHINE_STATE_FIELDS.includes(field)) errors.push(`${key}: unsupported machineState field "${field}".`);
      }
      for (const cq of asArray(entry.machineState.cq)) {
        if (!cq.whenBearerIs) errors.push(`${key}: machineState.cq entry "${cq.id ?? "(unnamed)"}" must include whenBearerIs.`);
      }
    }
  }

  return errors;
}

export function validateBundledStatusMechanics({
  statusMap = STATUS_MAP,
  catalog = getDefaultStatusConditionCatalog(),
} = {}) {
  const errors = [...validateStatusMechanicsMap(statusMap)];

  for (const entry of asArray(catalog)) {
    const statusId = normalizeStatusId(entry?.id);
    if (!statusId) continue;
    const modifierKey = normalizeStatusId(entry?.modifierKey);
    const mechanicsKey = modifierKey || statusId;
    if (!statusMap[mechanicsKey]) {
      const keyLabel = modifierKey
        ? `modifierKey "${modifierKey}"`
        : `status id "${statusId}"`;
      errors.push(`${statusId}: bundled catalog ${keyLabel} has no STATUS_MAP entry.`);
    }
  }

  return errors;
}
