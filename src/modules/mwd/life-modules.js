// src/modules/mwd/life-modules.js
// Purpose: Defines life module catalog defaults, validation, and roll-facing life module state.
// How it fits: Shared by settings registration, modifier providers, item sheets, and character sheets.

import { SYSTEM_NAME, TEMPLATE } from "../constants.js";
import { MWD_SKILLS, getSkillDef } from "./skills.js";

export const SETTING_LIFE_MODULE_CATALOG = "lifeModuleCatalog";

export const LIFE_MODULE_SLOTS = Object.freeze([
  { moduleType: "faction", label: "Faction" },
  { moduleType: "childhood", label: "Childhood" },
  { moduleType: "higherEducation", label: "Higher Education" },
  { moduleType: "realLife", label: "Real Life" }
]);

const LIFE_MODULE_TYPE_LABELS = Object.freeze(
  Object.fromEntries(LIFE_MODULE_SLOTS.map(slot => [slot.moduleType, slot.label]))
);

const KNOWN_MODULE_TYPES = new Set(LIFE_MODULE_SLOTS.map(slot => slot.moduleType));
const KNOWN_GRANT_TYPES = new Set(["skill", "edgePool"]);
const EDGE_POOL_LABELS = Object.freeze({
  grit: "Grit",
  chaos: "Chaos",
  insight: "Insight",
  rumor: "Rumor",
  legend: "Legend",
  credibility: "Credibility"
});
const EDGE_POOL_CODES = Object.freeze(Object.keys(EDGE_POOL_LABELS));
const GRANT_TYPE_LABELS = Object.freeze({
  skill: "Skill",
  edgePool: "Edge Pool"
});

const LEGACY_SKILL_ALIASES = Object.freeze({
  disguise: "deception"
});
const SKILL_LOOKUP = Object.freeze(buildSkillLookup());
const EDGE_POOL_LOOKUP = Object.freeze(buildEdgePoolLookup());
const VAGABOND_SKILL_EXCLUSIONS = new Set(["artillery", "gunnery", "piloting", "heavyWeapons"]);
const NON_COMBAT_SKILL_EXCLUSIONS = new Set([
  "artillery",
  "gunnery",
  "heavyWeapons",
  "meleeCombat",
  "piloting",
  "projectileWeapons",
  "firearms"
]);
const NON_COMBAT_SKILL_CODES = Object.freeze(
  MWD_SKILLS.map(skill => skill.code).filter(code => !NON_COMBAT_SKILL_EXCLUSIONS.has(code))
);

const DEFAULT_LIFE_MODULE_CATALOG = Object.freeze(normalizeLifeModuleCatalog([
  {
    id: "faction-capellan-confederation",
    label: "Capellan Confederation",
    moduleType: "faction",
    grants: [
      { id: "skill", choices: [{ type: "skill", value: "deception" }] },
      { id: "edge-pool", choices: [{ type: "edgePool", value: "rumor" }] }
    ]
  },
  {
    id: "faction-draconis-combine",
    label: "Draconis Combine",
    moduleType: "faction",
    grants: [
      { id: "edge-pool", choices: [{ type: "edgePool", value: "legend" }] },
      { id: "skill", choices: [{ type: "skill", value: "meleeCombat" }] }
    ]
  },
  {
    id: "faction-federated-suns",
    label: "Federated Suns",
    moduleType: "faction",
    grants: [
      { id: "edge-pool", choices: [{ type: "edgePool", value: "credibility" }] },
      { id: "skill", choices: [{ type: "skill", value: "firearms" }] }
    ]
  },
  {
    id: "faction-free-worlds-league",
    label: "Free Worlds League",
    moduleType: "faction",
    grants: [
      { id: "skill", choices: [{ type: "skill", value: "negotiation" }] },
      { id: "edge-pool", choices: [{ type: "edgePool", value: "rumor" }] }
    ]
  },
  {
    id: "faction-lyran-commonwealth",
    label: "Lyran Commonwealth",
    moduleType: "faction",
    grants: [
      { id: "skill", choices: [{ type: "skill", value: "administration" }] },
      { id: "edge-pool", choices: [{ type: "edgePool", value: "legend" }] }
    ]
  },
  {
    id: "faction-taurian-concordat",
    label: "Taurian Concordat",
    moduleType: "faction",
    grants: [
      { id: "skill", choices: [{ type: "skill", value: "survival" }] },
      { id: "edge-pool", choices: [{ type: "edgePool", value: "grit" }] }
    ]
  },
  {
    id: "faction-magistracy-of-canopus",
    label: "Magistracy of Canopus",
    moduleType: "faction",
    grants: [
      { id: "edge-pool", choices: [{ type: "edgePool", value: "chaos" }] },
      { id: "skill", choices: [{ type: "skill", value: "medTech" }] }
    ]
  },
  {
    id: "faction-outworlds-alliance",
    label: "Outworlds Alliance",
    moduleType: "faction",
    grants: [
      { id: "edge-pool", choices: [{ type: "edgePool", value: "insight" }] },
      { id: "skill", choices: [{ type: "skill", value: "navigation" }] }
    ]
  },
  {
    id: "faction-pirate",
    label: "Pirate",
    moduleType: "faction",
    grants: [
      { id: "skill", choices: [{ type: "skill", value: "streetwise" }] },
      { id: "edge-pool", choices: [{ type: "edgePool", value: "chaos" }] }
    ]
  },
  {
    id: "faction-comstar",
    label: "ComStar",
    moduleType: "faction",
    grants: [
      { id: "skill", choices: [{ type: "skill", value: "systemOps" }] },
      { id: "edge-pool", choices: [{ type: "edgePool", value: "rumor" }] }
    ]
  },
  {
    id: "faction-mercenary",
    label: "Mercenary",
    moduleType: "faction",
    grants: [
      { id: "skill", choices: [{ type: "skill", value: "tactics" }] },
      { id: "edge-pool", choices: [{ type: "edgePool", value: "grit" }] }
    ]
  },
  {
    id: "faction-unaffiliated",
    label: "Unaffiliated",
    moduleType: "faction",
    grants: [{
      id: "choice",
      choices: [
        ...NON_COMBAT_SKILL_CODES.map(value => ({ type: "skill", value })),
        ...EDGE_POOL_CODES.map(value => ({ type: "edgePool", value }))
      ]
    }]
  },

  { id: "childhood-backwoods", label: "Backwoods", moduleType: "childhood", skillChoices: ["tracking", "projectileWeapons"] },
  { id: "childhood-blue-collar", label: "Blue Collar", moduleType: "childhood", skillChoices: ["art", "technician", "zeroGOps"] },
  { id: "childhood-mercenary-brat", label: "Mercenary Brat", moduleType: "childhood", skillChoices: ["firearms"] },
  { id: "childhood-farm", label: "Farm", moduleType: "childhood", skillChoices: ["animalHandling"] },
  { id: "childhood-fugitives", label: "Fugitives", moduleType: "childhood", skillChoices: ["escapeArtist", "deception"] },
  { id: "childhood-nobility", label: "Nobility", moduleType: "childhood", skillChoices: ["etiquette"] },
  { id: "childhood-slave", label: "Slave", moduleType: "childhood", skillChoices: ["athletics"] },
  { id: "childhood-spacer-family", label: "Spacer Family", moduleType: "childhood", skillChoices: ["zeroGOps"] },
  { id: "childhood-street", label: "Street", moduleType: "childhood", skillChoices: ["streetwise"] },
  { id: "childhood-war-orphan", label: "War Orphan", moduleType: "childhood", skillChoices: ["survival"] },
  { id: "childhood-white-collar", label: "White Collar", moduleType: "childhood", skillChoices: ["etiquette"] },

  { id: "higher-education-technical-college", label: "Technical College", moduleType: "higherEducation", skillChoices: ["technician", "systemOps"] },
  { id: "higher-education-trade-school", label: "Trade School", moduleType: "higherEducation", skillChoices: ["computers", "administration"] },
  { id: "higher-education-university", label: "University", moduleType: "higherEducation", skillChoices: ["science", "medTech"] },
  { id: "higher-education-solaris-vii-internship", label: "Solaris VII Internship", moduleType: "higherEducation", skillChoices: ["streetwise"] },
  { id: "higher-education-police-academy", label: "Police Academy", moduleType: "higherEducation", skillChoices: ["negotiation", "perception"] },
  { id: "higher-education-intelligence-operative-training", label: "Intelligence Operative Training", moduleType: "higherEducation", skillChoices: ["intimidation", "tracking"] },
  { id: "higher-education-military-academy", label: "Military Academy", moduleType: "higherEducation", skillChoices: ["perception", "administration"] },
  { id: "higher-education-military-enlistment", label: "Military Enlistment", moduleType: "higherEducation", skillChoices: ["heavyWeapons", "artillery"] },
  { id: "higher-education-family-training", label: "Family Training", moduleType: "higherEducation", skillChoices: ["leadership", "etiquette"], requiresAny: ["childhood-nobility"] },
  { id: "higher-education-officer-candidate-school", label: "Officer Candidate School", moduleType: "higherEducation", skillChoices: ["tactics", "leadership"] },

  { id: "real-life-agitator", label: "Agitator", moduleType: "realLife", skillChoices: ["meleeCombat"] },
  { id: "real-life-civilian-job", label: "Civilian Job", moduleType: "realLife", skillChoices: ["art", "administration"] },
  { id: "real-life-combat-correspondent", label: "Combat Correspondent", moduleType: "realLife", skillChoices: ["perception"] },
  { id: "real-life-comstar-service", label: "ComStar Service", moduleType: "realLife", skillChoices: ["systemOps", "computers"] },
  { id: "real-life-covert-operations", label: "Covert Operations", moduleType: "realLife", skillChoices: ["stealth", "demolitions"] },
  { id: "real-life-explorer", label: "Explorer", moduleType: "realLife", skillChoices: ["navigation"] },
  { id: "real-life-guerrilla-insurgent", label: "Guerrilla Insurgent", moduleType: "realLife", skillChoices: ["stealth", "survival"] },
  { id: "real-life-merchant", label: "Merchant", moduleType: "realLife", skillChoices: ["negotiation"] },
  { id: "real-life-neer-do-well", label: "Ne'er-Do-Well", moduleType: "realLife", skillChoices: ["acting"] },
  { id: "real-life-organized-crime", label: "Organized Crime", moduleType: "realLife", skillChoices: ["intimidation"] },
  { id: "real-life-postgraduate-studies", label: "Postgraduate Studies", moduleType: "realLife", skillChoices: ["science", "technician"] },
  { id: "real-life-solaris-insider", label: "Solaris Insider", moduleType: "realLife", skillChoices: ["negotiation"] },
  { id: "real-life-solaris-vii-games", label: "Solaris VII Games", moduleType: "realLife", skillChoices: ["piloting", "gunnery"] },
  { id: "real-life-think-tank", label: "Think Tank", moduleType: "realLife", skillChoices: ["science", "tactics"] },
  {
    id: "real-life-tour-of-duty",
    label: "Tour of Duty",
    moduleType: "realLife",
    skillChoices: ["artillery", "gunnery", "meleeCombat", "piloting", "projectileWeapons", "firearms", "heavyWeapons"],
    requiresAny: [
      "higher-education-military-enlistment",
      "higher-education-military-academy",
      "higher-education-family-training",
      "higher-education-officer-candidate-school"
    ]
  },
  {
    id: "real-life-to-serve-and-protect",
    label: "To Serve and Protect",
    moduleType: "realLife",
    skillChoices: ["firearms", "intimidation"],
    requiresAny: ["higher-education-police-academy"]
  },
  {
    id: "real-life-vagabond",
    label: "Vagabond",
    moduleType: "realLife",
    skillChoices: MWD_SKILLS.map(skill => skill.code).filter(code => !VAGABOND_SKILL_EXCLUSIONS.has(code)),
    excludesAny: [
      "higher-education-military-enlistment",
      "higher-education-military-academy",
      "higher-education-family-training",
      "higher-education-officer-candidate-school"
    ]
  }
], { strict: false }));

function buildSkillLookup() {
  const lookup = new Map();
  for (const skill of MWD_SKILLS) {
    const code = String(skill.code ?? "").trim();
    const label = String(skill.label ?? "").trim();
    if (!code) continue;
    lookup.set(code.toLowerCase(), code);
    if (label) lookup.set(label.toLowerCase(), code);
  }
  for (const [legacyCode, currentCode] of Object.entries(LEGACY_SKILL_ALIASES)) {
    if (MWD_SKILLS.some(skill => skill.code === currentCode)) {
      lookup.set(legacyCode.toLowerCase(), currentCode);
    }
  }
  return lookup;
}

function buildEdgePoolLookup() {
  const lookup = new Map();
  for (const [code, label] of Object.entries(EDGE_POOL_LABELS)) {
    lookup.set(code.toLowerCase(), code);
    lookup.set(label.toLowerCase(), code);
    lookup.set(`${label.toLowerCase()} pool`, code);
  }
  return lookup;
}

function createValidationError(messages = []) {
  const list = Array.isArray(messages)
    ? messages.filter(Boolean)
    : [String(messages ?? "").trim()].filter(Boolean);
  const error = new Error(list[0] ?? "Invalid life module data.");
  error.validationErrors = list;
  return error;
}

function splitList(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value.split(",").map(entry => entry.trim()).filter(Boolean);
  }
  return [];
}

function normalizeModuleId(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/['\u2019]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeModuleType(value) {
  const moduleType = String(value ?? "").trim();
  return KNOWN_MODULE_TYPES.has(moduleType) ? moduleType : "";
}

function normalizeSkillChoiceValue(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  return SKILL_LOOKUP.get(raw.toLowerCase()) ?? "";
}

function normalizeEdgePoolValue(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  return EDGE_POOL_LOOKUP.get(raw.toLowerCase()) ?? "";
}

function normalizeSkillChoiceList(value, { strict = false, errors = [], prefix = "Entry" } = {}) {
  const seen = new Set();
  const normalized = [];

  for (const entry of splitList(value)) {
    const code = normalizeSkillChoiceValue(entry);
    if (!code) {
      if (strict) errors.push(`${prefix}: unknown skill "${entry}".`);
      continue;
    }
    if (seen.has(code)) continue;
    seen.add(code);
    normalized.push(code);
  }

  return normalized;
}

function normalizeReferenceList(value) {
  const seen = new Set();
  return splitList(value)
    .map(normalizeModuleId)
    .filter(entry => {
      if (!entry || seen.has(entry)) return false;
      seen.add(entry);
      return true;
    });
}

function getReferenceLabels(ids = [], catalogById = new Map()) {
  return ids.map(id => catalogById.get(id)?.label ?? id);
}

function buildChoiceKey(choice = {}) {
  return `${choice.type}:${choice.value}`;
}

function getSkillLabel(code) {
  return getSkillDef(code)?.label ?? code;
}

export function getEdgePoolLabel(code) {
  return EDGE_POOL_LABELS[code] ?? code;
}

function getGrantTypeLabel(type) {
  return GRANT_TYPE_LABELS[type] ?? type;
}

function describeChoiceLabel(choice = {}, { includeTypePrefix = false } = {}) {
  const type = String(choice?.type ?? "").trim();
  const value = String(choice?.value ?? "").trim();
  if (!type || !value) return "";

  const baseLabel = type === "skill"
    ? getSkillLabel(value)
    : `${getEdgePoolLabel(value)} Pool`;

  return includeTypePrefix ? `${getGrantTypeLabel(type)}: ${baseLabel}` : baseLabel;
}

export function describeLifeModuleChoice(choice = {}, { includeBonusText = false, includeTypePrefix = false } = {}) {
  const label = describeChoiceLabel(choice, { includeTypePrefix });
  if (!label) return "";
  if (!includeBonusText) return label;
  return choice.type === "skill" ? `+1 ${label} rolls` : `+1 ${label}`;
}

function parseGrantChoiceText(value) {
  const raw = String(value ?? "").trim();
  const separator = raw.indexOf(":");
  if (separator < 0) return null;
  return {
    type: raw.slice(0, separator).trim(),
    value: raw.slice(separator + 1).trim()
  };
}

function normalizeGrantChoice(choice, { strict = false, errors = [], prefix = "Entry", grantLabel = "Bonus" } = {}) {
  const parsed = typeof choice === "string" ? parseGrantChoiceText(choice) : choice;
  const rawType = String(parsed?.type ?? "").trim();
  const rawValue = String(parsed?.value ?? "").trim();

  if (!KNOWN_GRANT_TYPES.has(rawType)) {
    if (strict) errors.push(`${prefix} ${grantLabel}: unknown bonus type "${rawType || choice}".`);
    return null;
  }

  const normalizedValue = rawType === "skill"
    ? normalizeSkillChoiceValue(rawValue)
    : normalizeEdgePoolValue(rawValue);

  if (!normalizedValue) {
    if (strict) errors.push(`${prefix} ${grantLabel}: unknown ${rawType === "skill" ? "skill" : "edge pool"} "${rawValue}".`);
    return null;
  }

  return {
    type: rawType,
    value: normalizedValue
  };
}

function normalizeGrantChoices(choices, { strict = false, errors = [], prefix = "Entry", grantLabel = "Bonus" } = {}) {
  const seen = new Set();
  const normalized = [];
  const source = Array.isArray(choices) ? choices : [];

  for (const choice of source) {
    const next = normalizeGrantChoice(choice, { strict, errors, prefix, grantLabel });
    if (!next) continue;
    const key = buildChoiceKey(next);
    if (seen.has(key)) continue;
    seen.add(key);
    normalized.push(next);
  }

  return normalized;
}

function normalizeLegacySkillChoicesToGrant(value, { strict = false, errors = [], prefix = "Entry" } = {}) {
  const skillChoices = normalizeSkillChoiceList(value, { strict, errors, prefix });
  if (!skillChoices.length) return [];
  return [{
    id: "skill",
    label: "",
    choices: skillChoices.map(code => ({ type: "skill", value: code }))
  }];
}

function parseGrantsText(value, { strict = false, errors = [], prefix = "Entry" } = {}) {
  const raw = String(value ?? "").trim();
  if (!raw) return [];

  const grantStrings = raw
    .split(";")
    .map(entry => entry.trim())
    .filter(Boolean);

  return grantStrings.map((grantString, index) => {
    const grantLabel = `Bonus ${index + 1}`;
    const choices = normalizeGrantChoices(
      grantString.split("|").map(entry => entry.trim()).filter(Boolean),
      { strict, errors, prefix, grantLabel }
    );
    return {
      id: `grant-${index + 1}`,
      label: "",
      choices
    };
  }).filter(grant => grant.choices.length);
}

function normalizeGrantId(value, fallback = "grant") {
  return normalizeModuleId(value) || fallback;
}

function normalizeGrantEntry(entry, index, { strict = false, errors = [], prefix = "Entry" } = {}) {
  const fallbackId = `grant-${index + 1}`;
  const grantLabel = `Bonus ${index + 1}`;

  if (typeof entry === "string") {
    const choices = normalizeGrantChoices(
      entry.split("|").map(value => value.trim()).filter(Boolean),
      { strict, errors, prefix, grantLabel }
    );
    return choices.length
      ? { id: fallbackId, label: "", choices }
      : null;
  }

  const id = normalizeGrantId(entry?.id, fallbackId);
  const label = String(entry?.label ?? "").trim();
  const choices = normalizeGrantChoices(entry?.choices, { strict, errors, prefix, grantLabel });

  if (!choices.length) {
    if (strict) errors.push(`${prefix} ${grantLabel}: define at least one bonus choice.`);
    return null;
  }

  return { id, label, choices };
}

function normalizeGrantList(value, { strict = false, errors = [], prefix = "Entry" } = {}) {
  if (Array.isArray(value)) {
    if (value.every(entry => typeof entry === "string" && !String(entry).includes(":"))) {
      return normalizeLegacySkillChoicesToGrant(value, { strict, errors, prefix });
    }

    const seenIds = new Set();
    return value
      .map((entry, index) => normalizeGrantEntry(entry, index, { strict, errors, prefix }))
      .filter(entry => {
        if (!entry) return false;
        if (seenIds.has(entry.id)) {
          if (strict) errors.push(`${prefix}: duplicate bonus id "${entry.id}".`);
          return false;
        }
        seenIds.add(entry.id);
        return true;
      });
  }

  if (typeof value === "string") {
    return parseGrantsText(value, { strict, errors, prefix });
  }

  return [];
}

export function serializeLifeModuleGrants(grants = []) {
  return (Array.isArray(grants) ? grants : [])
    .map(grant => {
      const choices = Array.isArray(grant?.choices) ? grant.choices : [];
      return choices.map(choice => `${choice.type}:${choice.value}`).join("|");
    })
    .filter(Boolean)
    .join("; ");
}

export function getDefaultLifeModuleCatalog() {
  return foundry.utils.deepClone(DEFAULT_LIFE_MODULE_CATALOG);
}

export function getLifeModuleTypeLabel(moduleType) {
  return LIFE_MODULE_TYPE_LABELS[moduleType] ?? (String(moduleType ?? "").trim() || "Life Module");
}

export function listLifeModuleTypes() {
  return LIFE_MODULE_SLOTS.map(slot => ({
    value: slot.moduleType,
    label: slot.label
  }));
}

export function normalizeLifeModuleCatalog(value = [], { strict = false } = {}) {
  const rows = Array.isArray(value) ? value : [];
  const errors = [];
  const seenIds = new Set();

  const normalized = rows.map((entry, index) => {
    const prefix = `Entry ${index + 1}`;
    const label = String(entry?.label ?? "").trim();
    const id = normalizeModuleId(entry?.id ?? label);
    const moduleType = normalizeModuleType(entry?.moduleType);
    const grants = entry?.grants != null
      ? normalizeGrantList(entry.grants, { strict, errors, prefix })
      : normalizeLegacySkillChoicesToGrant(entry?.skillChoices, { strict, errors, prefix });
    const requiresAny = normalizeReferenceList(entry?.requiresAny);
    const excludesAny = normalizeReferenceList(entry?.excludesAny);

    if (!id && strict) errors.push(`${prefix}: id cannot be blank.`);
    if (!label && strict) errors.push(`${prefix}: label cannot be blank.`);
    if (!moduleType && strict) errors.push(`${prefix}: choose a valid module type.`);
    if (!grants.length && strict) errors.push(`${prefix}: choose at least one bonus.`);
    if (id && seenIds.has(id) && strict) errors.push(`${prefix}: duplicate id "${id}".`);
    if (id) seenIds.add(id);

    return {
      id,
      label,
      moduleType,
      grants,
      requiresAny,
      excludesAny
    };
  });

  const catalogById = new Map(normalized.map(entry => [entry.id, entry]));
  for (const entry of normalized) {
    for (const ref of entry.requiresAny) {
      if (ref === entry.id && strict) errors.push(`${entry.label || entry.id}: cannot require itself.`);
      if (!catalogById.has(ref) && strict) errors.push(`${entry.label || entry.id}: unknown requirement "${ref}".`);
    }
    for (const ref of entry.excludesAny) {
      if (ref === entry.id && strict) errors.push(`${entry.label || entry.id}: cannot exclude itself.`);
      if (!catalogById.has(ref) && strict) errors.push(`${entry.label || entry.id}: unknown exclusion "${ref}".`);
    }
  }

  if (strict && errors.length) throw createValidationError(errors);

  return normalized
    .filter(entry => entry.id && entry.label && entry.moduleType && entry.grants.length)
    .map(entry => ({
      id: entry.id,
      label: entry.label,
      moduleType: entry.moduleType,
      grants: entry.grants.map(grant => ({
        id: grant.id,
        label: grant.label,
        choices: grant.choices.map(choice => ({
          type: choice.type,
          value: choice.value
        }))
      })),
      requiresAny: [...entry.requiresAny],
      excludesAny: [...entry.excludesAny]
    }));
}

function mergeCatalogWithDefaults(value = []) {
  const defaultsById = new Map(getDefaultLifeModuleCatalog().map(entry => [entry.id, entry]));
  const existing = normalizeLifeModuleCatalog(value, { strict: false });
  const merged = [...existing];
  const existingIds = new Set(existing.map(entry => entry.id));

  for (const [id, entry] of defaultsById.entries()) {
    if (existingIds.has(id)) continue;
    merged.push(foundry.utils.deepClone(entry));
  }

  return merged;
}

export async function ensureLifeModuleCatalogDefaults() {
  try {
    if (!game?.settings?.settings?.has?.(`${SYSTEM_NAME}.${SETTING_LIFE_MODULE_CATALOG}`)) return;
    const current = game.settings.get(SYSTEM_NAME, SETTING_LIFE_MODULE_CATALOG);
    const merged = mergeCatalogWithDefaults(current);
    if (JSON.stringify(current) !== JSON.stringify(merged)) {
      await game.settings.set(SYSTEM_NAME, SETTING_LIFE_MODULE_CATALOG, merged);
    }
  } catch (_) {
    // Ignore bootstrap-time setting failures.
  }
}

function readLifeModuleCatalogSetting() {
  try {
    if (game?.settings?.settings?.has?.(`${SYSTEM_NAME}.${SETTING_LIFE_MODULE_CATALOG}`)) {
      return mergeCatalogWithDefaults(game.settings.get(SYSTEM_NAME, SETTING_LIFE_MODULE_CATALOG));
    }
  } catch (_) {
    // Fall through to shipped defaults during early boot.
  }
  return getDefaultLifeModuleCatalog();
}

export function listLifeModuleCatalogEntries() {
  return normalizeLifeModuleCatalog(readLifeModuleCatalogSetting(), { strict: false });
}

export function getLifeModuleCatalogEntry(catalogId) {
  const normalizedId = normalizeModuleId(catalogId);
  if (!normalizedId) return null;
  return listLifeModuleCatalogEntries().find(entry => entry.id === normalizedId) ?? null;
}

export function listLifeModuleCatalogEntriesByType(moduleType) {
  const normalizedType = normalizeModuleType(moduleType);
  return listLifeModuleCatalogEntries().filter(entry => entry.moduleType === normalizedType);
}

function normalizeSelectedGrantsObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, entry]) => [normalizeGrantId(key, ""), String(entry ?? "").trim()])
      .filter(([key]) => Boolean(key))
  );
}

function normalizeSelectionForGrant(grant, rawSelection = "", { legacySelectedSkill = "" } = {}) {
  const validChoices = new Set((Array.isArray(grant?.choices) ? grant.choices : []).map(buildChoiceKey));
  const normalizedRaw = String(rawSelection ?? "").trim();

  if (validChoices.has(normalizedRaw)) return normalizedRaw;

  if (legacySelectedSkill) {
    const legacySkill = normalizeSkillChoiceValue(legacySelectedSkill);
    const legacyKey = legacySkill ? `skill:${legacySkill}` : "";
    if (legacyKey && validChoices.has(legacyKey)) return legacyKey;
  }

  if (validChoices.size === 1) {
    return Array.from(validChoices)[0];
  }

  return "";
}

export function normalizeLifeModuleSelectedGrants(entry, selectedGrants = {}, { legacySelectedSkill = "" } = {}) {
  const grants = Array.isArray(entry?.grants) ? entry.grants : [];
  const selected = normalizeSelectedGrantsObject(selectedGrants);
  return Object.fromEntries(
    grants.map(grant => [
      grant.id,
      normalizeSelectionForGrant(grant, selected[grant.id], { legacySelectedSkill })
    ])
  );
}

export function getLifeModuleResolvedGrantChoices(entry, selectedGrants = {}, { legacySelectedSkill = "" } = {}) {
  const grants = Array.isArray(entry?.grants) ? entry.grants : [];
  const normalizedSelections = normalizeLifeModuleSelectedGrants(entry, selectedGrants, { legacySelectedSkill });

  return grants.map((grant, index) => {
    const selectedKey = normalizeSelectionForGrant(grant, normalizedSelections[grant.id], { legacySelectedSkill });
    const choice = (Array.isArray(grant.choices) ? grant.choices : []).find(candidate => buildChoiceKey(candidate) === selectedKey) ?? null;
    return {
      id: grant.id,
      index,
      label: String(grant?.label ?? "").trim() || (grants.length > 1 ? `Bonus ${index + 1}` : "Granted Bonus"),
      selectedKey,
      choice,
      isResolved: Boolean(choice),
      requiresSelection: (Array.isArray(grant?.choices) ? grant.choices : []).length > 1
    };
  });
}

function getFirstResolvedSkillCode(entry, selectedGrants = {}, { legacySelectedSkill = "" } = {}) {
  return getLifeModuleResolvedGrantChoices(entry, selectedGrants, { legacySelectedSkill })
    .map(grant => grant.choice)
    .find(choice => choice?.type === "skill")?.value ?? "";
}

export function normalizeLifeModuleItemSystem(system = {}) {
  const next = foundry.utils.deepClone(system ?? {});
  const catalogId = normalizeModuleId(next.catalogId);
  const catalog = catalogId ? getLifeModuleCatalogEntry(catalogId) : null;
  const moduleType = normalizeModuleType(next.moduleType || catalog?.moduleType);
  const selectedGrants = catalog
    ? normalizeLifeModuleSelectedGrants(catalog, next.selectedGrants, { legacySelectedSkill: next.selectedSkill })
    : normalizeSelectedGrantsObject(next.selectedGrants);

  next.moduleType = moduleType;
  next.catalogId = catalogId;
  next.selectedGrants = selectedGrants;
  next.selectedSkill = catalog
    ? getFirstResolvedSkillCode(catalog, selectedGrants, { legacySelectedSkill: next.selectedSkill })
    : normalizeSkillChoiceValue(next.selectedSkill);
  return next;
}

export function normalizeLifeModuleSelectedSkill(entry, selectedSkill) {
  const grants = Array.isArray(entry?.grants) ? entry.grants : [];
  const skillGrant = grants.find(grant =>
    (Array.isArray(grant?.choices) ? grant.choices : []).some(choice => choice?.type === "skill")
  );
  if (!skillGrant) return "";
  const selected = normalizeSelectionForGrant(skillGrant, `skill:${selectedSkill}`, { legacySelectedSkill: selectedSkill });
  return selected.startsWith("skill:") ? selected.slice("skill:".length) : "";
}

export function getLifeModuleGrantSelectionFields(entry, selectedGrants = {}, { legacySelectedSkill = "" } = {}) {
  return getLifeModuleResolvedGrantChoices(entry, selectedGrants, { legacySelectedSkill }).map(grant => {
    const choices = Array.isArray(entry?.grants?.[grant.index]?.choices) ? entry.grants[grant.index].choices : [];
    const mixedTypes = new Set(choices.map(choice => choice.type)).size > 1;
    const options = choices.map(choice => ({
      value: buildChoiceKey(choice),
      label: describeLifeModuleChoice(choice, { includeTypePrefix: mixedTypes }),
      selected: buildChoiceKey(choice) === grant.selectedKey
    }));
    const singleOption = options.length === 1 ? {
      value: options[0].value,
      label: options[0].label,
      displayLabel: describeLifeModuleChoice(choices[0], { includeBonusText: true })
    } : null;

    return {
      id: grant.id,
      label: grant.label,
      selectionPath: `system.selectedGrants.${grant.id}`,
      selectedKey: grant.selectedKey,
      options,
      singleOption,
      hasMultipleChoices: options.length > 1
    };
  });
}

function buildInactiveReason(state, catalogById) {
  if (state.isDuplicate) return `Duplicate ${getLifeModuleTypeLabel(state.moduleType)} slot item.`;
  if (!state.catalog) return "Catalog entry is missing or unlinked.";
  if (state.unresolvedGrantCount > 0) return "Choose valid bonus options.";
  if (state.excludedBy.length) {
    return `Blocked by ${getReferenceLabels(state.excludedBy, catalogById).join(", ")}.`;
  }
  if (state.requiresAny.length && !state.matchedRequirementIds.length) {
    return `Requires ${getReferenceLabels(state.requiresAny, catalogById).join(" or ")}.`;
  }
  return "";
}

function buildEdgePoolCapWarnings(actor, activeChoices = [], totalBonusByEdgePool = {}) {
  if (!actor || !Array.isArray(activeChoices) || !activeChoices.length) return [];
  const cap = Math.max(0, Number(actor.system?.attributes?.edge?.value ?? 0));

  return activeChoices
    .filter(choice => choice?.type === "edgePool")
    .map(choice => {
      const poolKey = String(choice.value ?? "").trim();
      const poolLabel = getEdgePoolLabel(poolKey);
      const rawRating = Math.max(0, Number(actor.system?.counters?.edgePools?.[poolKey]?.rating ?? 0));
      const totalBonus = Math.max(0, Number(totalBonusByEdgePool?.[poolKey] ?? 0));
      const lost = Math.max(0, (rawRating + totalBonus) - cap);
      if (!lost) return "";
      const pointLabel = lost === 1 ? "point" : "points";
      return `${poolLabel} Pool bonus loses ${lost} ${pointLabel} to the Edge cap.`;
    })
    .filter(Boolean);
}

export function evaluateActorLifeModules(actor) {
  const allEntries = listLifeModuleCatalogEntries();
  const catalogById = new Map(allEntries.map(entry => [entry.id, entry]));
  const allItems = Array.from(actor?.items ?? []).filter(item => item.type === TEMPLATE.itemType.lifeModule);
  const slotLeads = new Map();

  for (const item of allItems) {
    const moduleType = normalizeModuleType(item.system?.moduleType);
    if (!moduleType || slotLeads.has(moduleType)) continue;
    slotLeads.set(moduleType, item.id);
  }

  const states = allItems.map(item => {
    const normalizedSystem = normalizeLifeModuleItemSystem(item.system ?? {});
    const catalog = catalogById.get(normalizedSystem.catalogId) ?? null;
    const moduleType = normalizedSystem.moduleType || catalog?.moduleType || "";
    const resolvedGrants = catalog
      ? getLifeModuleResolvedGrantChoices(catalog, normalizedSystem.selectedGrants, { legacySelectedSkill: normalizedSystem.selectedSkill })
      : [];
    const selectedChoices = resolvedGrants.map(grant => grant.choice).filter(Boolean);
    const selectedSkill = selectedChoices.find(choice => choice.type === "skill")?.value ?? "";
    const selectedSkillDef = selectedSkill ? getSkillDef(selectedSkill) : null;

    return {
      item,
      itemId: item.id,
      moduleType,
      catalogId: catalog?.id ?? normalizedSystem.catalogId,
      catalog,
      label: catalog?.label ?? item.name,
      selectedGrants: normalizedSystem.selectedGrants,
      resolvedGrants,
      unresolvedGrantCount: resolvedGrants.filter(grant => !grant.isResolved).length,
      selectedChoices,
      selectedChoiceLabels: selectedChoices.map(choice => describeLifeModuleChoice(choice, { includeBonusText: true })),
      selectedSkill,
      selectedSkillLabel: selectedSkillDef?.label ?? selectedSkill,
      requiresAny: [...(catalog?.requiresAny ?? [])],
      excludesAny: [...(catalog?.excludesAny ?? [])],
      matchedRequirementIds: [],
      excludedBy: [],
      isDuplicate: moduleType ? slotLeads.get(moduleType) !== item.id : false,
      isActive: false,
      inactiveReason: "",
      bonus: 0
    };
  });

  const statesByCatalogId = new Map();
  for (const state of states) {
    if (!state.catalogId) continue;
    const bucket = statesByCatalogId.get(state.catalogId) ?? [];
    bucket.push(state);
    statesByCatalogId.set(state.catalogId, bucket);
  }

  for (const state of states) {
    state.excludedBy = state.excludesAny.filter(id => (statesByCatalogId.get(id) ?? []).length > 0);
  }

  let changed = true;
  while (changed) {
    changed = false;

    for (const state of states) {
      const nextMatched = state.requiresAny.filter(id =>
        (statesByCatalogId.get(id) ?? []).some(candidate => candidate.isActive)
      );

      const nextActive = !state.isDuplicate
        && Boolean(state.catalog)
        && state.unresolvedGrantCount === 0
        && state.excludedBy.length === 0
        && (state.requiresAny.length === 0 || nextMatched.length > 0);

      if (state.isActive !== nextActive) {
        state.isActive = nextActive;
        changed = true;
      }

      if (state.matchedRequirementIds.join("|") !== nextMatched.join("|")) {
        state.matchedRequirementIds = nextMatched;
      }
    }
  }

  const bonusBySkill = Object.fromEntries(MWD_SKILLS.map(skill => [skill.code, 0]));
  const bonusByEdgePool = Object.fromEntries(EDGE_POOL_CODES.map(code => [code, 0]));
  const stateByItemId = new Map();

  for (const state of states) {
    const activeChoices = state.isActive ? state.selectedChoices : [];
    const activeSkillChoices = activeChoices.filter(choice => choice.type === "skill");
    const activePoolChoices = activeChoices.filter(choice => choice.type === "edgePool");

    state.bonus = activeSkillChoices.length;
    for (const choice of activeSkillChoices) {
      bonusBySkill[choice.value] = Number(bonusBySkill[choice.value] ?? 0) + 1;
    }
    for (const choice of activePoolChoices) {
      bonusByEdgePool[choice.value] = Number(bonusByEdgePool[choice.value] ?? 0) + 1;
    }

    state.inactiveReason = state.isActive ? "" : buildInactiveReason(state, catalogById);
    stateByItemId.set(state.itemId, state);
  }

  for (const state of states) {
    state.warningLabels = state.isActive
      ? buildEdgePoolCapWarnings(actor, state.selectedChoices, bonusByEdgePool)
      : [];
  }

  const slotStates = LIFE_MODULE_SLOTS.map(slot => {
    const state = states.find(candidate => candidate.moduleType === slot.moduleType && !candidate.isDuplicate) ?? null;
    return {
      moduleType: slot.moduleType,
      label: slot.label,
      availableEntries: allEntries.filter(entry => entry.moduleType === slot.moduleType),
      state
    };
  });

  return {
    catalog: allEntries,
    states,
    stateByItemId,
    slotStates,
    bonusBySkill,
    bonusByEdgePool
  };
}

function getResolvedSkillCode(resolved = {}) {
  const intent = String(resolved?.intent ?? "").trim();
  if (intent === "skill") {
    return String(resolved?.data?.skillKey ?? "").trim();
  }
  if (intent === "attack") {
    return String(resolved?.attack?.skill?.code ?? "").trim();
  }
  return "";
}

export function collectLifeModuleSkillRollModifiers({ actor, resolved } = {}) {
  const skillCode = getResolvedSkillCode(resolved);
  if (!actor || !skillCode) return [];

  return evaluateActorLifeModules(actor).states
    .flatMap(state => state.isActive
      ? state.selectedChoices
        .filter(choice => choice.type === "skill" && choice.value === skillCode)
        .map(choice => ({
          id: `life-module:${state.itemId}:${buildChoiceKey(choice)}`,
          label: state.label,
          value: 1,
          source: "Life Module",
          tooltip: `${state.label}: +1 to ${describeLifeModuleChoice(choice)} rolls`
        }))
      : []
    );
}
