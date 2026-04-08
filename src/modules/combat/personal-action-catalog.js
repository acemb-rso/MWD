// src/modules/combat/personal-action-catalog.js
// Purpose: Defines the first-pass personal action catalog consumed by the combat tracker.
// How it fits: Keeps action menu data and action economy categories out of sheet code.

import { SYSTEM_NAME } from "../constants.js";

export const SETTING_PERSONAL_ACTION_CATALOG = "personalActionCatalog";

export const PERSONAL_ACTION_CATEGORIES = Object.freeze({
  standard: "standard",
  complex: "complex",
  free: "free",
  reaction: "reaction",
  recovery: "recovery"
});

export const PERSONAL_ACTION_CATEGORY_OPTIONS = Object.freeze([
  { value: PERSONAL_ACTION_CATEGORIES.standard, label: "Standard" },
  { value: PERSONAL_ACTION_CATEGORIES.complex, label: "Complex" },
  { value: PERSONAL_ACTION_CATEGORIES.free, label: "Free" },
  { value: PERSONAL_ACTION_CATEGORIES.reaction, label: "Reaction" },
  { value: PERSONAL_ACTION_CATEGORIES.recovery, label: "Burn & Recovery" }
]);

export const PERSONAL_ACTION_HANDLER_OPTIONS = Object.freeze([
  { value: "", label: "Not Implemented / Placeholder" },
  { value: "combatAction", label: "Generic Action" },
  { value: "combatAttack", label: "Attack Pipeline" },
  { value: "combatReduceBurn", label: "Reduce Burn" },
  { value: "combatOverloadCheck", label: "Overload Check" }
]);

const VALID_CATEGORIES = new Set(PERSONAL_ACTION_CATEGORY_OPTIONS.map(option => option.value));
const VALID_HANDLERS = new Set(PERSONAL_ACTION_HANDLER_OPTIONS.map(option => option.value));

const DEFAULT_ACTIONS = Object.freeze([
  { id: "move", label: "Move", category: "standard", cost: 1, handler: "combatAction", state: "move" },
  { id: "aim", label: "Aim", category: "standard", cost: 1, handler: "combatAction", state: "aim" },
  { id: "interact", label: "Interact", category: "standard", cost: 1, handler: "combatAction" },
  { id: "assess", label: "Assess", category: "standard", cost: 1, handler: "combatAction" },

  { id: "attack", label: "Attack", category: "complex", cost: 2, handler: "combatAttack", prominent: true },
  { id: "firstAid", label: "First Aid", category: "complex", cost: 2, handler: "", reason: "Recovery resolver not yet implemented." },

  { id: "readyItem", label: "Ready Item", category: "free", cost: 0, handler: "combatAction" },
  { id: "prepare", label: "Prepare", category: "free", cost: 0, handler: "combatAction", state: "preparedInterrupt" },
  { id: "drop", label: "Drop", category: "free", cost: 0, handler: "combatAction" },
  { id: "communicate", label: "Communicate", category: "free", cost: 0, handler: "combatAction" },
  { id: "adjust", label: "Adjust", category: "free", cost: 0, handler: "combatAction" },
  { id: "activateItem", label: "Activate Item", category: "free", cost: 0, handler: "combatAction" },

  { id: "react", label: "React", category: "reaction", cost: 0, handler: "combatAction" },
  { id: "evade", label: "Evade", category: "reaction", cost: 0, handler: "", reason: "Evade mitigation is not yet implemented." },
  { id: "opportunity", label: "Opportunity", category: "reaction", cost: 0, handler: "", reason: "Opportunity attacks are not yet implemented." },
  { id: "assist", label: "Assist", category: "reaction", cost: 0, handler: "", reason: "Reaction assist effects are not yet implemented." },
  { id: "interrupt", label: "Interrupt", category: "reaction", cost: 0, handler: "", reason: "Prepared interrupt resolution is not yet implemented." },

  { id: "reduceBurn", label: "Reduce Burn", category: "standard", cost: 1, handler: "combatReduceBurn", prominentWhenBurning: true },
  { id: "overloadCheck", label: "Overload Check", category: "recovery", cost: 0, handler: "combatOverloadCheck", roll: { intent: "overload" }, prominentWhenBurning: true }
].map(action => Object.freeze(cloneJson(action))));

const DEFAULT_ACTIONS_BY_ID = new Map(DEFAULT_ACTIONS.map(action => [action.id, action]));

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value ?? null));
}

function toBoolean(value, fallback = false) {
  if (typeof value === "boolean") return value;
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["true", "1", "yes", "y", "on"].includes(normalized)) return true;
  if (["false", "0", "no", "n", "off", ""].includes(normalized)) return false;
  return fallback;
}

function normalizeRoll(entry, fallback = null) {
  const intent = String(entry?.rollIntent ?? entry?.roll?.intent ?? fallback?.intent ?? "").trim();
  return intent ? { intent } : null;
}

function normalizeActionEntry(entry, { strict = false, index = 0 } = {}) {
  const id = String(entry?.id ?? "").trim();
  const fallback = DEFAULT_ACTIONS_BY_ID.get(id) ?? {};
  const prefix = `Row ${index + 1}`;
  const errors = [];

  if (!id) errors.push(`${prefix}: id cannot be blank.`);

  const category = String(entry?.category ?? fallback.category ?? "").trim();
  if (!VALID_CATEGORIES.has(category)) {
    errors.push(`${prefix}: category must be one of ${Array.from(VALID_CATEGORIES).join(", ")}.`);
  }

  const label = String(entry?.label ?? fallback.label ?? "").trim();
  if (!label) errors.push(`${prefix}: label cannot be blank.`);

  const rawCost = entry?.cost ?? fallback.cost ?? 0;
  const cost = Number(rawCost);
  if (!Number.isFinite(cost) || cost < 0) {
    errors.push(`${prefix}: cost must be a non-negative number.`);
  }

  const handler = String(entry?.handler ?? fallback.handler ?? "").trim();
  if (!VALID_HANDLERS.has(handler)) {
    errors.push(`${prefix}: handler must be one of ${Array.from(VALID_HANDLERS).map(value => value || "(blank)").join(", ")}.`);
  }

  if (errors.length) {
    if (strict) {
      const error = new Error(errors[0]);
      error.validationErrors = errors;
      throw error;
    }
    return null;
  }

  const normalized = {
    ...cloneJson(fallback),
    id,
    label,
    category,
    cost: Math.trunc(cost),
    handler,
    reason: String(entry?.reason ?? fallback.reason ?? "").trim(),
    prominent: toBoolean(entry?.prominent, Boolean(fallback.prominent)),
    prominentWhenBurning: toBoolean(entry?.prominentWhenBurning, Boolean(fallback.prominentWhenBurning))
  };

  const roll = normalizeRoll(entry, fallback.roll ?? null);
  if (roll) normalized.roll = roll;
  else delete normalized.roll;

  if (!normalized.reason) delete normalized.reason;
  if (!normalized.prominent) delete normalized.prominent;
  if (!normalized.prominentWhenBurning) delete normalized.prominentWhenBurning;

  return normalized;
}

export function getDefaultPersonalActionCatalog() {
  return cloneJson(DEFAULT_ACTIONS);
}

export function normalizePersonalActionCatalog(value, { strict = false } = {}) {
  if (!Array.isArray(value)) {
    if (strict) {
      const error = new Error("Action catalog must be an array.");
      error.validationErrors = [error.message];
      throw error;
    }
    return getDefaultPersonalActionCatalog();
  }

  const normalized = [];
  const seenIds = new Set();
  const errors = [];

  value.forEach((entry, index) => {
    try {
      const action = normalizeActionEntry(entry, { strict, index });
      if (!action) return;

      const duplicateKey = action.id.toLowerCase();
      if (seenIds.has(duplicateKey)) {
        const message = `Row ${index + 1}: duplicate action id "${action.id}".`;
        if (strict) errors.push(message);
        return;
      }

      seenIds.add(duplicateKey);
      normalized.push(action);
    } catch (error) {
      if (strict) {
        errors.push(...(Array.isArray(error.validationErrors) ? error.validationErrors : [error.message]));
      }
    }
  });

  if (errors.length) {
    const error = new Error(errors[0]);
    error.validationErrors = errors;
    throw error;
  }

  return normalized;
}

export function getConfiguredPersonalActionCatalog() {
  try {
    const value = game?.settings?.get?.(SYSTEM_NAME, SETTING_PERSONAL_ACTION_CATALOG);
    return normalizePersonalActionCatalog(value, { strict: false });
  } catch (_error) {
    return getDefaultPersonalActionCatalog();
  }
}

export function getPersonalAction(actionId) {
  const normalizedId = String(actionId ?? "").trim();
  return getConfiguredPersonalActionCatalog().find(action => action.id === normalizedId) ?? null;
}

export function getPersonalActionsByCategory(category) {
  return getConfiguredPersonalActionCatalog()
    .filter(action => action.category === category)
    .map(action => Object.freeze(cloneJson(action)));
}
