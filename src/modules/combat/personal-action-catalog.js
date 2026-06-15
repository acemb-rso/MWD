// src/modules/combat/personal-action-catalog.js
// Purpose: Defines declarative personal combat action payloads consumed by the combat tracker.
// How it fits: Keeps action economy, resolver ownership, prompts, and implementation state out of sheet code.

import { SYSTEM_NAME } from "../core/constants.js";

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

export const PERSONAL_ACTION_RESOLVERS = Object.freeze({
  action: "action",
  attack: "attack",
  movement: "movement",
  targeting: "targeting",
  remediation: "remediation",
  recovery: "recovery",
  interaction: "interaction"
});

export const PERSONAL_ACTION_RESOLVER_OPTIONS = Object.freeze([
  { value: PERSONAL_ACTION_RESOLVERS.action, label: "Action" },
  { value: PERSONAL_ACTION_RESOLVERS.attack, label: "Attack" },
  { value: PERSONAL_ACTION_RESOLVERS.movement, label: "Movement" },
  { value: PERSONAL_ACTION_RESOLVERS.targeting, label: "Targeting" },
  { value: PERSONAL_ACTION_RESOLVERS.remediation, label: "Remediation" },
  { value: PERSONAL_ACTION_RESOLVERS.recovery, label: "Recovery" },
  { value: PERSONAL_ACTION_RESOLVERS.interaction, label: "Interaction" }
]);

export const PERSONAL_ACTION_COST_RESOURCES = Object.freeze({
  fa: "fa",
  sa: "sa",
  ra: "ra",
  none: "none"
});

export const PERSONAL_ACTION_COST_RESOURCE_OPTIONS = Object.freeze([
  { value: PERSONAL_ACTION_COST_RESOURCES.fa, label: "FA" },
  { value: PERSONAL_ACTION_COST_RESOURCES.sa, label: "SA" },
  { value: PERSONAL_ACTION_COST_RESOURCES.ra, label: "RA" },
  { value: PERSONAL_ACTION_COST_RESOURCES.none, label: "None" }
]);

export const PERSONAL_ACTION_PROMPT_TYPES = Object.freeze({
  none: "none",
  target: "target",
  item: "item",
  weapon: "weapon",
  payload: "payload",
  skill: "skill",
  status: "status",
  confirm: "confirm"
});

export const PERSONAL_ACTION_PROMPT_OPTIONS = Object.freeze([
  { value: PERSONAL_ACTION_PROMPT_TYPES.none, label: "None" },
  { value: PERSONAL_ACTION_PROMPT_TYPES.target, label: "Target" },
  { value: PERSONAL_ACTION_PROMPT_TYPES.item, label: "Item" },
  { value: PERSONAL_ACTION_PROMPT_TYPES.weapon, label: "Weapon" },
  { value: PERSONAL_ACTION_PROMPT_TYPES.payload, label: "Payload" },
  { value: PERSONAL_ACTION_PROMPT_TYPES.skill, label: "Skill" },
  { value: PERSONAL_ACTION_PROMPT_TYPES.status, label: "Status" },
  { value: PERSONAL_ACTION_PROMPT_TYPES.confirm, label: "Confirm" }
]);

export const PERSONAL_ACTION_IMPLEMENTATION_STATES = Object.freeze({
  ready: "ready",
  stub: "stub",
  disabled: "disabled",
  legacy: "legacy"
});

export const PERSONAL_ACTION_IMPLEMENTATION_OPTIONS = Object.freeze([
  { value: PERSONAL_ACTION_IMPLEMENTATION_STATES.ready, label: "Ready" },
  { value: PERSONAL_ACTION_IMPLEMENTATION_STATES.stub, label: "Stub" },
  { value: PERSONAL_ACTION_IMPLEMENTATION_STATES.disabled, label: "Disabled" },
  { value: PERSONAL_ACTION_IMPLEMENTATION_STATES.legacy, label: "Legacy" }
]);

export const PERSONAL_ACTION_HANDLER_OPTIONS = Object.freeze([
  { value: "combatIntent", label: "Combat Intent" },
  { value: "combatAction", label: "Legacy Generic Action" },
  { value: "combatAttack", label: "Legacy Attack Pipeline" },
  { value: "combatEvade", label: "Legacy Evade" },
  { value: "combatAssist", label: "Legacy Assist" },
  { value: "combatInterrupt", label: "Legacy Interrupt" },
  { value: "combatFirstAid", label: "Legacy First Aid" },
  { value: "combatReduceBurn", label: "Legacy Reduce Burn" },
  { value: "combatOverloadCheck", label: "Legacy Overload Check" },
  { value: "", label: "Not Implemented / Placeholder" }
]);

const VALID_CATEGORIES = new Set(PERSONAL_ACTION_CATEGORY_OPTIONS.map(option => option.value));
const VALID_RESOLVERS = new Set(PERSONAL_ACTION_RESOLVER_OPTIONS.map(option => option.value));
const VALID_COST_RESOURCES = new Set(PERSONAL_ACTION_COST_RESOURCE_OPTIONS.map(option => option.value));
const VALID_PROMPTS = new Set(PERSONAL_ACTION_PROMPT_OPTIONS.map(option => option.value));
const VALID_IMPLEMENTATION_STATES = new Set(PERSONAL_ACTION_IMPLEMENTATION_OPTIONS.map(option => option.value));
const RETIRED_ACTION_IDS = new Set(["recoverBurn", "gesture"]);

const LEGACY_HANDLER_TO_RESOLVER = Object.freeze({
  combatAction: PERSONAL_ACTION_RESOLVERS.action,
  combatAttack: PERSONAL_ACTION_RESOLVERS.attack,
  combatEvade: PERSONAL_ACTION_RESOLVERS.recovery,
  combatAssist: PERSONAL_ACTION_RESOLVERS.action,
  combatInterrupt: PERSONAL_ACTION_RESOLVERS.action,
  combatFirstAid: PERSONAL_ACTION_RESOLVERS.recovery,
  combatReduceBurn: PERSONAL_ACTION_RESOLVERS.recovery,
  combatOverloadCheck: PERSONAL_ACTION_RESOLVERS.recovery
});

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

function stringList(value) {
  if (Array.isArray(value)) return value.map(entry => String(entry ?? "").trim()).filter(Boolean);
  return String(value ?? "")
    .split(",")
    .map(entry => entry.trim())
    .filter(Boolean);
}

function distinctStrings(value) {
  return Array.from(new Set(stringList(value)));
}

function cost(resource, value) {
  return Object.freeze({
    resource,
    value: Math.max(0, Math.trunc(Number(value ?? 0) || 0))
  });
}

function implementation(state = PERSONAL_ACTION_IMPLEMENTATION_STATES.ready, reason = "") {
  return Object.freeze({
    state,
    reason: String(reason ?? "").trim()
  });
}

function prompt(type = PERSONAL_ACTION_PROMPT_TYPES.none, required = false) {
  return Object.freeze({
    type,
    required: Boolean(required)
  });
}

function roll(config = null) {
  if (!config) return null;
  return Object.freeze(cloneJson(config));
}

function action(config) {
  const category = config.category ?? PERSONAL_ACTION_CATEGORIES.standard;
  const defaultCost = category === PERSONAL_ACTION_CATEGORIES.free
    ? cost(PERSONAL_ACTION_COST_RESOURCES.fa, 1)
    : category === PERSONAL_ACTION_CATEGORIES.reaction
      ? cost(PERSONAL_ACTION_COST_RESOURCES.ra, 1)
      : cost(PERSONAL_ACTION_COST_RESOURCES.sa, category === PERSONAL_ACTION_CATEGORIES.complex ? 2 : 1);

  return Object.freeze({
    id: config.id,
    label: config.label,
    category,
    cost: config.cost ?? defaultCost,
    scale: Object.freeze(config.scale ?? ["personal"]),
    resolver: config.resolver ?? PERSONAL_ACTION_RESOLVERS.action,
    roll: roll(config.roll ?? null),
    prompt: config.prompt ?? prompt(),
    tags: Object.freeze(config.tags ?? ["combat"]),
    resolves: Object.freeze(config.resolves ?? []),
    payload: Object.freeze(config.payload ?? { intent: "combatAction", actionId: config.id }),
    implementation: config.implementation ?? implementation(),
    description: String(config.description ?? "").trim(),
    prominent: Boolean(config.prominent),
    prominentWhenBurning: Boolean(config.prominentWhenBurning),
    hideFromMenus: Boolean(config.hideFromMenus)
  });
}

const DEFAULT_ACTIONS = Object.freeze([
  action({ id: "move", label: "Move", category: "standard", resolver: "movement", tags: ["combat", "movement"], description: "Reposition within the scene and establish your location." }),
  action({ id: "carefulMove", label: "Careful Move / Crawl", category: "standard", resolver: "movement", tags: ["combat", "movement", "careful"], description: "Move cautiously, crawl, or reposition without rushing." }),
  action({ id: "aim", label: "Aim", category: "standard", resolver: "action", tags: ["combat", "aim"], description: "Line up your next attack for a stronger single-target shot." }),
  action({ id: "interact", label: "Interact / Use Object", category: "standard", resolver: "interaction", tags: ["combat", "interaction"], description: "Manipulate an object or the environment with intent." }),
  action({ id: "readyWeapon", label: "Ready Weapon", category: "standard", resolver: "interaction", prompt: prompt("weapon", false), tags: ["combat", "interaction", "weapon", "ready"], description: "Ready a weapon or substantial piece of equipment." }),
  action({ id: "reload", label: "Reload / Load Weapon", category: "standard", resolver: "interaction", prompt: prompt("weapon", true), tags: ["combat", "interaction", "weapon", "reload"], resolves: ["jammed", "empty"], description: "Spend the action to reload or reset a weapon feed." }),
  action({ id: "assess", label: "Observe in Detail", category: "standard", resolver: "action", tags: ["combat", "assessment"], description: "Read the situation and gather useful tactical information." }),
  action({ id: "useSkill", label: "Simple Skill Use", category: "standard", resolver: "action", prompt: prompt("skill", true), roll: { intent: "skill" }, tags: ["combat", "skill"], description: "Make a trained, quick, normal-risk skill check." }),
  action({ id: "recover", label: "Recover from Stun", category: "standard", resolver: "recovery", prompt: prompt("status", false), tags: ["combat", "recovery", "status"], resolves: ["stunned"], description: "Recover from simple stun/status effects when eligible." }),
  action({ id: "stand", label: "Stand Up from Prone", category: "standard", resolver: "movement", tags: ["combat", "movement", "recovery", "posture"], resolves: ["prone"], description: "Stand up from Prone." }),
  action({ id: "leadTeam", label: "Assist / Lead Team", category: "standard", resolver: "action", tags: ["combat", "assist", "support"], description: "Provide active support during your activation." }),

  action({ id: "attack", label: "Attack", category: "complex", cost: cost("sa", 2), resolver: "attack", prompt: prompt("weapon", false), tags: ["combat", "attack"], prominent: true, description: "Make an offensive action and resolve it through the attack pipeline." }),
  action({ id: "suppressionFire", label: "Suppression Fire", category: "complex", cost: cost("sa", 2), resolver: "attack", prompt: prompt("weapon", true), tags: ["combat", "attack", "suppression"], description: "Lay down a cone or line of automatic fire. Graze or Hit applies Suppressed instead of damage." }),
  action({ id: "firstAid", label: "First Aid", category: "complex", cost: cost("sa", 2), resolver: "recovery", prompt: prompt("target", true), roll: { intent: "skill", key: "medicine" }, tags: ["combat", "recovery", "medical"], description: "Stabilize or recover harm through focused treatment." }),
  action({ id: "useComplexSkill", label: "Use Complex Skill", category: "complex", cost: cost("sa", 2), resolver: "action", prompt: prompt("skill", true), roll: { intent: "skill" }, tags: ["combat", "skill", "complex"], description: "Make an extended or higher-risk skill check." }),
  action({ id: "readyHeavyItem", label: "Ready Heavy Weapon", category: "complex", cost: cost("sa", 2), resolver: "interaction", prompt: prompt("weapon", false), tags: ["combat", "interaction", "weapon", "ready", "heavy"], description: "Ready a large or crew-served weapon." }),
  action({ id: "extinguish", label: "Extinguish Fire", category: "complex", cost: cost("sa", 2), resolver: "recovery", tags: ["combat", "recovery", "hazard", "fire"], resolves: ["onFire"], description: "Extinguish yourself or an eligible nearby fire status." }),
  action({ id: "communicate", label: "Communicate", category: "free", resolver: "action", tags: ["combat", "communication"], description: "Speak, signal, gesture, or coordinate without changing the mechanics." }),
  action({ id: "drop", label: "Drop Object", category: "free", resolver: "interaction", tags: ["combat", "interaction", "drop"], description: "Release or discard something you are holding." }),
  action({ id: "observeQuickly", label: "Observe Quickly", category: "free", resolver: "action", tags: ["combat", "assessment"], description: "Make a surface-level observation." }),
  action({ id: "changeFireMode", label: "Select Fire Mode", category: "free", resolver: "interaction", prompt: prompt("weapon", false), tags: ["combat", "weapon", "fireMode"], description: "Select a supported fire mode." }),
  action({ id: "selectPayload", label: "Select Ammunition / Payload", category: "free", resolver: "interaction", prompt: prompt("payload", true), tags: ["combat", "weapon", "payload"], description: "Select an owned compatible payload for a weapon." }),
  action({ id: "readyItem", label: "Ready Item", category: "free", resolver: "interaction", prompt: prompt("item", false), tags: ["combat", "interaction", "ready"], hideFromMenus: true, description: "Ready an item as a personal critical remedy." }),
  action({ id: "prepare", label: "Prepare", category: "free", resolver: "action", prompt: prompt("confirm", true), tags: ["combat", "prepare", "interrupt"], description: "Declare a trigger now so you can interrupt later." }),
  action({ id: "activateItem", label: "Activate Item", category: "free", resolver: "interaction", prompt: prompt("item", false), tags: ["combat", "interaction", "activate"], description: "Switch on or initialize an item without resolving its full effect." }),
  action({ id: "defend", label: "Dodge", category: "free", resolver: "recovery", tags: ["combat", "defense", "dodge"], implementation: implementation("stub", "Dodge mechanics are not implemented yet."), description: "Dodge when supported by the direct-defense resolver." }),

  action({ id: "react", label: "React", category: "reaction", resolver: "action", tags: ["combat", "reaction"], implementation: implementation("stub", "Use a specific reaction action when available."), description: "Take a generic response to an outside trigger." }),
  action({ id: "evade", label: "Evade", category: "reaction", resolver: "recovery", tags: ["combat", "reaction", "evade"], description: "Avoid or soften incoming non-direct danger." }),
  action({ id: "opportunity", label: "Opportunity Attack", category: "reaction", resolver: "attack", tags: ["combat", "reaction", "attack", "opportunity"], description: "Exploit an opening and make a reactive attack." }),
  action({ id: "assist", label: "Assist Ally", category: "reaction", resolver: "action", prompt: prompt("target", true), tags: ["combat", "reaction", "assist"], description: "Support another combatant when their moment comes." }),
  action({ id: "interrupt", label: "Interrupt from Prepare", category: "reaction", resolver: "action", tags: ["combat", "reaction", "interrupt"], description: "Resolve a prepared response when its trigger is met." }),
  action({ id: "breakGrappleDefense", label: "Break Grapple / Melee Defense", category: "reaction", resolver: "recovery", tags: ["combat", "reaction", "defense", "grapple"], implementation: implementation("stub", "Close-combat defensive reactions are not implemented yet."), description: "Break a grapple or defend in close combat once supported." }),

  action({ id: "reduceBurn", label: "Reduce Burn", category: "standard", cost: cost("sa", 1), resolver: "recovery", tags: ["combat", "recovery", "burn"], prominentWhenBurning: true, description: "Take a breather and bring your Burn down by one." }),
  action({ id: "overloadCheck", label: "Overload Check", category: "recovery", cost: cost("none", 0), resolver: "recovery", roll: { intent: "overload" }, tags: ["combat", "recovery", "burn", "overload"], prominentWhenBurning: true, description: "Roll to see whether mounting Burn pushes you into overload." }
  )
].map(entry => Object.freeze(cloneJson(entry))));

const DEFAULT_ACTIONS_BY_ID = new Map(DEFAULT_ACTIONS.map(entry => [entry.id, entry]));

function normalizeCost(entry, fallback, { strict = false, prefix = "Action" } = {}) {
  const fallbackCost = fallback?.cost ?? cost("sa", fallback?.category === "complex" ? 2 : 1);
  const raw = entry?.cost;
  const resource = String(
    entry?.costResource
    ?? raw?.resource
    ?? (typeof raw === "string" || typeof raw === "number" ? fallbackCost.resource : undefined)
    ?? fallbackCost.resource
    ?? ""
  ).trim().toLowerCase();
  const value = Number(
    entry?.costValue
    ?? raw?.value
    ?? (typeof raw === "string" || typeof raw === "number" ? raw : undefined)
    ?? fallbackCost.value
    ?? 0
  );
  const errors = [];

  if (!VALID_COST_RESOURCES.has(resource)) {
    errors.push(`${prefix}: cost resource must be one of ${Array.from(VALID_COST_RESOURCES).join(", ")}.`);
  }
  if (!Number.isFinite(value) || value < 0) {
    errors.push(`${prefix}: cost value must be a non-negative number.`);
  }

  if (errors.length) {
    if (strict) {
      const error = new Error(errors[0]);
      error.validationErrors = errors;
      throw error;
    }
    return cloneJson(fallbackCost);
  }

  return { resource, value: Math.trunc(value) };
}

function normalizePrompt(entry, fallback, { strict = false, prefix = "Action" } = {}) {
  const raw = entry?.prompt;
  const type = String(entry?.promptType ?? raw?.type ?? fallback?.prompt?.type ?? "none").trim() || "none";
  const required = toBoolean(entry?.promptRequired ?? raw?.required, Boolean(fallback?.prompt?.required));
  if (!VALID_PROMPTS.has(type)) {
    if (strict) {
      const error = new Error(`${prefix}: prompt type must be one of ${Array.from(VALID_PROMPTS).join(", ")}.`);
      error.validationErrors = [error.message];
      throw error;
    }
    return cloneJson(fallback?.prompt ?? prompt());
  }
  return { type, required };
}

function normalizeImplementation(entry, fallback, { strict = false, prefix = "Action" } = {}) {
  const raw = entry?.implementation;
  const state = String(entry?.implementationState ?? raw?.state ?? fallback?.implementation?.state ?? "ready").trim() || "ready";
  const reason = String(entry?.reason ?? entry?.implementationReason ?? raw?.reason ?? fallback?.implementation?.reason ?? "").trim();
  if (!VALID_IMPLEMENTATION_STATES.has(state)) {
    if (strict) {
      const error = new Error(`${prefix}: implementation state must be one of ${Array.from(VALID_IMPLEMENTATION_STATES).join(", ")}.`);
      error.validationErrors = [error.message];
      throw error;
    }
    return cloneJson(fallback?.implementation ?? implementation("disabled", reason));
  }
  return { state, reason };
}

function normalizeRoll(entry, fallback = null) {
  const raw = entry?.roll;
  if (raw === null) return null;
  if (typeof raw === "object" && raw) return cloneJson(raw);
  const intent = String(entry?.rollIntent ?? fallback?.intent ?? "").trim();
  return intent ? { intent } : cloneJson(fallback ?? null);
}

function normalizePayload(entry, fallback, actionId) {
  const raw = entry?.payload;
  if (raw && typeof raw === "object") return cloneJson(raw);
  return cloneJson(fallback?.payload ?? { intent: "combatAction", actionId });
}

function inferResolver(entry, fallback) {
  const explicit = String(entry?.resolver ?? "").trim();
  if (explicit) return explicit;
  const legacyHandler = String(entry?.handler ?? fallback?.handler ?? "").trim();
  return LEGACY_HANDLER_TO_RESOLVER[legacyHandler] ?? fallback?.resolver ?? PERSONAL_ACTION_RESOLVERS.action;
}

export function normalizeActionEntry(entry, { strict = false, index = 0 } = {}) {
  let working = entry;
  const id = String(working?.id ?? "").trim();
  const fallback = DEFAULT_ACTIONS_BY_ID.get(id) ?? {};
  const prefix = `Row ${index + 1}`;
  const errors = [];

  if (!id) errors.push(`${prefix}: id cannot be blank.`);
  if (RETIRED_ACTION_IDS.has(id)) {
    errors.push(`${prefix}: action id "${id}" has been retired.`);
  }

  if (id === "defend" && String(working?.label ?? "").trim() === "Dodge / Defensive Response") {
    working = {
      ...working,
      label: fallback.label,
      category: fallback.category,
      cost: cloneJson(fallback.cost),
      tags: cloneJson(fallback.tags),
      description: fallback.description,
      implementation: cloneJson(fallback.implementation),
    };
  }
  if (id === "communicate" && String(working?.label ?? "").trim() === "Speak / Signal") {
    working = {
      ...working,
      label: fallback.label,
      tags: cloneJson(fallback.tags),
      description: fallback.description,
    };
  }

  const category = String(working?.category ?? fallback.category ?? "").trim();
  if (!VALID_CATEGORIES.has(category)) {
    errors.push(`${prefix}: category must be one of ${Array.from(VALID_CATEGORIES).join(", ")}.`);
  }

  const label = String(working?.label ?? fallback.label ?? "").trim();
  if (!label) errors.push(`${prefix}: label cannot be blank.`);

  const resolver = inferResolver(working, fallback);
  if (!VALID_RESOLVERS.has(resolver)) {
    errors.push(`${prefix}: resolver must be one of ${Array.from(VALID_RESOLVERS).join(", ")}.`);
  }

  if (errors.length) {
    if (strict) {
      const error = new Error(errors[0]);
      error.validationErrors = errors;
      throw error;
    }
    return null;
  }

  let normalizedCost;
  let normalizedPrompt;
  let normalizedImplementation;
  try {
    normalizedCost = normalizeCost(working, fallback, { strict, prefix });
    normalizedPrompt = normalizePrompt(working, fallback, { strict, prefix });
    normalizedImplementation = normalizeImplementation(working, fallback, { strict, prefix });
  } catch (error) {
    if (strict) throw error;
    return null;
  }

  const normalized = {
    ...cloneJson(fallback),
    id,
    label,
    category,
    cost: normalizedCost,
    scale: distinctStrings(working?.scale ?? fallback.scale ?? ["personal"]),
    resolver,
    roll: normalizeRoll(working, fallback.roll ?? null),
    prompt: normalizedPrompt,
    tags: distinctStrings(working?.tags ?? fallback.tags ?? ["combat"]),
    resolves: distinctStrings(working?.resolves ?? fallback.resolves ?? []),
    payload: normalizePayload(working, fallback, id),
    implementation: normalizedImplementation,
    description: String(working?.description ?? fallback.description ?? "").trim(),
    prominent: toBoolean(working?.prominent, Boolean(fallback.prominent)),
    prominentWhenBurning: toBoolean(working?.prominentWhenBurning, Boolean(fallback.prominentWhenBurning))
  };

  normalized.handler = "combatIntent";
  if (!normalized.payload?.actionId) normalized.payload.actionId = id;
  if (!normalized.payload?.intent) normalized.payload.intent = "combatAction";

  if (!normalized.roll) delete normalized.roll;
  if (!normalized.description) delete normalized.description;
  if (!normalized.prominent) delete normalized.prominent;
  if (!normalized.prominentWhenBurning) delete normalized.prominentWhenBurning;

  return normalized;
}

export function getDefaultPersonalActionCatalog() {
  return cloneJson(DEFAULT_ACTIONS);
}

export function mergePersonalActionCatalogDefaults(value) {
  const normalized = normalizePersonalActionCatalog(value, { strict: false, includeDefaults: false });
  const seenIds = new Set(normalized.map(action => action.id.toLowerCase()));
  const merged = [...normalized];
  for (const action of DEFAULT_ACTIONS) {
    if (seenIds.has(action.id.toLowerCase())) continue;
    merged.push(cloneJson(action));
  }
  return merged;
}

export function normalizePersonalActionCatalog(value, { strict = false, includeDefaults = true } = {}) {
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

  if (!includeDefaults) return normalized;
  const merged = [...normalized];
  for (const action of DEFAULT_ACTIONS) {
    if (!seenIds.has(action.id.toLowerCase())) {
      merged.push(cloneJson(action));
    }
  }
  return merged;
}

export function getConfiguredPersonalActionCatalog() {
  try {
    const value = game?.settings?.get?.(SYSTEM_NAME, SETTING_PERSONAL_ACTION_CATALOG);
    return normalizePersonalActionCatalog(value, { strict: false, includeDefaults: true });
  } catch (_error) {
    return getDefaultPersonalActionCatalog();
  }
}

export async function backfillPersonalActionCatalogSetting() {
  const settings = game?.settings;
  if (!settings?.get || !settings?.set) return { ok: false, reason: "Settings are not available." };

  const current = settings.get(SYSTEM_NAME, SETTING_PERSONAL_ACTION_CATALOG);
  const merged = mergePersonalActionCatalogDefaults(current);
  const currentIds = normalizePersonalActionCatalog(current, { strict: false, includeDefaults: false }).map(action => action.id);
  const mergedIds = merged.map(action => action.id);
  if (currentIds.length === mergedIds.length && currentIds.every((id, index) => id === mergedIds[index])) {
    return { ok: true, changed: false };
  }

  await settings.set(SYSTEM_NAME, SETTING_PERSONAL_ACTION_CATALOG, merged);
  return { ok: true, changed: true };
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
