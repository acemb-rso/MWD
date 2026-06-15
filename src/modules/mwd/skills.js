// src/modules/mwd/skills.js
// Purpose: Canonical MWD skill catalog and specialization metadata.
// Workflow: system config and actor prep read skill definitions -> sheets and
// roll builders use normalized labels, attributes, icons, and domains.


import { ICONS_SKILLS_PATH, SYSTEM_NAME, SYSTEM_PATH } from "../core/constants.js";
import { Enums } from "../core/enums.js"; // if you want pretty attribute labels (optional)


/**
 * @typedef {Object} MWDSkillDef
 * @property {string} code              Unique key used in system.skills.<code>.rating
 * @property {string} label             Human-readable label
 * @property {string} attribute         Attribute key (e.g. "strength", "reflexes")
 * @property {string} [icon]            Optional icon path
 * @property {string} [defense]         Optional roll hint (e.g. "physicalDefense")
 * @property {string[]} [domains]       Optional list of domains (e.g. ["physical", "mental"])
 * @property {{key: string, label: string}[]} [specializations]
 */

export const SKILL_SPECIALIZATION_BONUS = 2;
export const SETTING_SKILL_SPECIALIZATION_CATALOG = "skillSpecializationCatalog";

const ATHLETICS_SPECIALIZATIONS = [
  { key: "running", label: "Running" },
  { key: "jumping", label: "Jumping" },
  { key: "swimming", label: "Swimming" },
  { key: "climbing", label: "Climbing" },
  { key: "acrobatics", label: "Acrobatics" }
];

const KNOWN_SKILL_CODES = new Set();

/** @type {MWDSkillDef[]} */
export const MWD_SKILLS = [
  // Strength
  { code: "athletics",       label: "Athletics",       attribute: "strength",  icon: `${ICONS_SKILLS_PATH}/athletics.svg`, domains: ["physical"], specializations: ATHLETICS_SPECIALIZATIONS },
  { code: "heavyWeapons",    label: "Heavy Weapons",   attribute: "strength",  icon: `${ICONS_SKILLS_PATH}/heavy-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },

  // Reflexes
  { code: "escapeArtist",     label: "Escape Artist",     attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/escape-artist.svg`, domains: ["physical"] },
  { code: "gunnery",          label: "Gunnery",           attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/vehicle-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "meleeCombat",      label: "Melee Combat",      attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/close-combat.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "piloting",         label: "Piloting",          attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/piloting-ground-steering-wheel.svg`, domains: ["physical"] },
  { code: "projectileWeapons",label: "Projectile Weapons",attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/projectile-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "firearms",         label: "Firearms",          attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/firearms.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "stealth",          label: "Stealth",           attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/stealth.svg`, domains: ["physical"] },
  { code: "zeroGOps",         label: "Zero-G Operations", attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/fly.svg`, domains: ["physical"] },

  // Intelligence
  { code: "art",            label: "Art",               attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/art.svg`, domains: ["mental"] },
  { code: "artillery",      label: "Artillery",         attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/artillery.svg`, domains: ["mental"] },
  { code: "systemOps",      label: "System Operations", attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/electronics.svg`, domains: ["mental"] },
  { code: "computers",      label: "Computers",         attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/hacking.svg`, domains: ["mental"] },
  { code: "demolitions",    label: "Demolitions",       attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/demolition.svg`, domains: ["mental"] },
  { code: "medTech",        label: "Medtech",           attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/biotech.svg`, domains: ["mental"] },
  { code: "science",        label: "Science",           attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/skills.svg`, domains: ["mental"] },
  { code: "perception",     label: "Perception",        attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/skills.svg`, domains: ["mental"] },
  { code: "tactics",        label: "Tactics",           attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/skills.svg`, domains: ["mental"] },
  { code: "technician",     label: "Technician",        attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/engineering.svg`, domains: ["mental"] },
  { code: "tracking",       label: "Tracking",          attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/tracking.svg`, domains: ["physical", "mental"] },
  { code: "navigation",     label: "Navigation",        attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/piloting-other.svg`, domains: ["mental"] },

  // Guts
  { code: "administration", label: "Administration",  attribute: "guts", icon: `${ICONS_SKILLS_PATH}/knowledge.svg`, domains: ["social", "mental"] },
  { code: "animalHandling", label: "Animal Handling", attribute: "guts", icon: `${ICONS_SKILLS_PATH}/animals.svg`, domains: ["physical", "mental"] },
  { code: "survival",       label: "Survival",        attribute: "guts", icon: `${ICONS_SKILLS_PATH}/survival.svg`, domains: ["physical", "mental"] },

  // Charisma
  { code: "acting",       label: "Acting",       attribute: "charisma", icon: `${ICONS_SKILLS_PATH}/con-art.svg`, domains: ["social"] },
  { code: "deception",    label: "Deception",    attribute: "charisma", icon: `${ICONS_SKILLS_PATH}/disguise.svg`, domains: ["social", "mental"] },
  { code: "leadership",   label: "Leadership",   attribute: "charisma", icon: `${ICONS_SKILLS_PATH}/psychology.svg`, domains: ["social"] },
  { code: "negotiation",  label: "Negotiation",  attribute: "charisma", icon: `${ICONS_SKILLS_PATH}/negotiation.svg`, domains: ["social"] },
  { code: "etiquette",    label: "Etiquette",    attribute: "charisma", icon: `${ICONS_SKILLS_PATH}/etiquette.svg`, domains: ["social"] },
  { code: "streetwise",   label: "Streetwise",   attribute: "charisma", icon: `${ICONS_SKILLS_PATH}/etiquette2.svg`, domains: ["social"] },
  { code: "intimidation", label: "Intimidation", attribute: "charisma", icon: `${ICONS_SKILLS_PATH}/intimidation.svg`, domains: ["social", "mental"] }
].map(normalizeSkillDef);

for (const skill of MWD_SKILLS) {
  KNOWN_SKILL_CODES.add(skill.code);
}

/**
 * Normalize skill entries so callers can assume label/icon exist.
 * @param {MWDSkillDef} s
 * @returns {MWDSkillDef}
 */
function normalizeSkillDef(s) {
  return {
    ...s,
    label: s.label ?? s.code,
    icon: s.icon ?? `${SYSTEM_PATH}/icons/skills/skills.svg`,
    specializations: normalizeSpecializationDefs(s.specializations)
  };
}

function normalizeSpecializationKey(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeSpecializationDefs(values = []) {
  const seen = new Set();
  return (Array.isArray(values) ? values : [])
    .map(value => {
      const key = normalizeSpecializationKey(value?.key ?? value?.label ?? value);
      if (!key || seen.has(key)) return null;
      seen.add(key);
      return {
        key,
        label: String(value?.label ?? value?.key ?? value ?? key).trim() || key
      };
    })
    .filter(Boolean);
}

function createValidationError(messages = []) {
  const error = new Error(messages[0] ?? "Invalid skill specialization data.");
  error.validationErrors = messages;
  return error;
}

function buildDefaultSpecializationCatalog() {
  const catalog = {};
  for (const skill of MWD_SKILLS) {
    const labels = (Array.isArray(skill.specializations) ? skill.specializations : [])
      .map(entry => String(entry?.label ?? "").trim())
      .filter(Boolean);
    if (labels.length) catalog[skill.code] = labels;
  }
  return catalog;
}

const DEFAULT_SKILL_SPECIALIZATION_CATALOG = Object.freeze(buildDefaultSpecializationCatalog());

function normalizeCatalogLabels(skillCode, values = [], { strict = false, errors = [] } = {}) {
  if (!Array.isArray(values)) {
    if (strict) {
      const skillLabel = getBaseSkillDef(skillCode)?.label ?? skillCode;
      errors.push(`${skillLabel}: expected an array of specialization labels.`);
    }
    return [];
  }

  const entries = [];
  for (const value of values) {
    const label = String(value ?? "").trim();
    if (!label) {
      if (strict) {
        const skillLabel = getBaseSkillDef(skillCode)?.label ?? skillCode;
        errors.push(`${skillLabel}: specialization labels cannot be blank.`);
      }
      continue;
    }
    entries.push(label);
  }

  return normalizeSpecializationDefs(entries).map(entry => entry.label);
}

function getBaseSkillDef(code) {
  return MWD_SKILLS.find((s) => s.code === code);
}

function getResolvedSpecializationCatalog(rawCatalog, { strict = false } = {}) {
  const source = rawCatalog && typeof rawCatalog === "object" && !Array.isArray(rawCatalog) ? rawCatalog : {};
  const errors = [];
  const normalized = {};

  for (const [skillCode, labels] of Object.entries(source)) {
    if (!KNOWN_SKILL_CODES.has(skillCode)) {
      if (strict) errors.push(`Unknown skill code "${skillCode}".`);
      continue;
    }

    const nextLabels = normalizeCatalogLabels(skillCode, labels, { strict, errors });
    if (nextLabels.length) normalized[skillCode] = nextLabels;
  }

  if (strict && errors.length) throw createValidationError(errors);

  return Object.fromEntries(
    MWD_SKILLS
      .map(skill => [skill.code, normalized[skill.code]])
      .filter(([, labels]) => Array.isArray(labels) && labels.length)
  );
}

function readSpecializationCatalogSetting() {
  try {
    const gameApi = globalThis.game;
    if (gameApi?.settings?.settings?.has?.(`${SYSTEM_NAME}.${SETTING_SKILL_SPECIALIZATION_CATALOG}`)) {
      return gameApi.settings.get(SYSTEM_NAME, SETTING_SKILL_SPECIALIZATION_CATALOG);
    }
  } catch (_) {
    // Fall through to shipped defaults during early boot or if settings are unavailable.
  }

  return getDefaultSkillSpecializationCatalog();
}

function getRuntimeSpecializationCatalog() {
  const normalized = getResolvedSpecializationCatalog(readSpecializationCatalogSetting(), { strict: false });
  return Object.fromEntries(
    Object.entries(normalized).map(([skillCode, labels]) => [
      skillCode,
      normalizeSpecializationDefs(labels)
    ])
  );
}

function normalizeSpecializationKeys(values = [], { allowedKeys = null } = {}) {
  const seen = new Set();
  return (Array.isArray(values) ? values : [])
    .map(value => normalizeSpecializationKey(value))
    .filter(key => {
      if (!key || seen.has(key)) return false;
      if (allowedKeys && !allowedKeys.has(key)) return false;
      seen.add(key);
      return true;
    });
}

/**
 * Get a canonical skill definition by code.
 * @param {string} code
 * @returns {MWDSkillDef | undefined}
 */
export function getSkillDef(code) {
  const base = getBaseSkillDef(code);
  if (!base) return undefined;
  return {
    ...base,
    specializations: getSkillSpecializationDefs(base.code)
  };
}

/**
 * Return a stable, sorted list for display.
 * @returns {MWDSkillDef[]}
 */
export function listSkillDefs() {
  const catalog = getRuntimeSpecializationCatalog();
  return [...MWD_SKILLS]
    .map(skill => ({
      ...skill,
      specializations: [...(catalog[skill.code] ?? [])]
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function getSkillSpecializationDefs(skillCode) {
  return [...(getRuntimeSpecializationCatalog()[skillCode] ?? [])];
}

export function getSkillSpecializationDef(skillCode, specializationKey) {
  const normalizedKey = normalizeSpecializationKey(specializationKey);
  if (!normalizedKey) return undefined;
  return getSkillSpecializationDefs(skillCode).find(entry => entry.key === normalizedKey);
}

export function getSkillSpecializationLabel(skillCode, specializationKey) {
  return getSkillSpecializationDef(skillCode, specializationKey)?.label ?? "";
}

export function getDefaultSkillSpecializationCatalog() {
  const clone = globalThis.foundry?.utils?.deepClone
    ?? (value => JSON.parse(JSON.stringify(value ?? null)));
  return clone(DEFAULT_SKILL_SPECIALIZATION_CATALOG);
}

export function normalizeSkillSpecializationCatalog(value, { strict = false } = {}) {
  return getResolvedSpecializationCatalog(value, { strict });
}

export function normalizeStoredSkillSpecializationKeys(values = []) {
  return normalizeSpecializationKeys(values);
}

export function normalizeOwnedSkillSpecializations(skillCode, values = []) {
  const allowedKeys = new Set(getSkillSpecializationDefs(skillCode).map(entry => entry.key));
  const selectedKeys = new Set(normalizeSpecializationKeys(values, { allowedKeys }));

  return getSkillSpecializationDefs(skillCode)
    .filter(entry => selectedKeys.has(entry.key))
    .map(entry => entry.key);
}

export function getStoredSkillSpecializationKeys(systemData, skillCode) {
  return normalizeStoredSkillSpecializationKeys(
    systemData?.skills?.[skillCode]?.specializations ?? []
  );
}

export function getOwnedSkillSpecializationKeys(systemData, skillCode) {
  return normalizeOwnedSkillSpecializations(
    skillCode,
    getStoredSkillSpecializationKeys(systemData, skillCode)
  );
}

export function getOwnedSkillSpecializations(systemData, skillCode) {
  const ownedKeys = new Set(getOwnedSkillSpecializationKeys(systemData, skillCode));
  return getSkillSpecializationDefs(skillCode)
    .filter(entry => ownedKeys.has(entry.key));
}

/**
 * Split skill definitions into two columns for UI rendering.
 * @param {MWDSkillDef[]} skills
 * @returns {{left: MWDSkillDef[], right: MWDSkillDef[]}}
 */
export function splitSkillsTwoColumns(skills) {
  const mid = Math.ceil(skills.length / 2);
  return { left: skills.slice(0, mid), right: skills.slice(mid) };
}

/**
 * Ensure core skill ratings exist on an actor system data object.
 * This is used by the Actor document class (Option B).
 *
 * @param {object} systemData  Actor.system
 */
export function ensureCoreSkillRatings(systemData) {
  systemData.skills ??= {};
  if (systemData.skills.disguise && !systemData.skills.deception) {
    systemData.skills.deception = { ...systemData.skills.disguise };
  }
  for (const s of MWD_SKILLS) {
    const entry = (systemData.skills[s.code] ??= {});
    if (entry.rating == null) entry.rating = 0;
    if (entry.bonus == null) entry.bonus = 0;
    entry.specializations = normalizeStoredSkillSpecializationKeys(entry.specializations);
  }
}
export function buildSkillDisplay(systemData, { bonusBySkill = null } = {}) {
  const defs = listSkillDefs();
  const { left, right } = splitSkillsTwoColumns(defs);

  const mkRow = (def) => {
    const code = def.code;
    const attr = def.attribute;

    const rating = Number(systemData?.skills?.[code]?.rating ?? 0);

    // Base: linked attribute value
    const base = Number(systemData?.attributes?.[attr]?.value ?? 0);

    // Bonus/modifiers: placeholder field (you can later feed Active Effects into this)
    const baseBonus = Number(systemData?.skills?.[code]?.bonus ?? 0);
    const derivedBonus = Number(bonusBySkill?.[code] ?? 0);
    const bonus = baseBonus + derivedBonus;
    const ownedSpecializations = getOwnedSkillSpecializations(systemData, code);
    const remainingSpecializations = ownedSpecializations.length > 0
      ? []
      : getSkillSpecializationDefs(code);

    const total = base + rating + bonus;

    return {
      code,
      label: def.label,
      icon: def.icon,
      attribute: attr,
      attributeLabel: (Enums?.localizeAttribute ? Enums.localizeAttribute(attr) : attr),
      rating,
      base,
      bonus,
      total,
      rollPayload: JSON.stringify({ intent: "skill", key: code }),
      canAddSpecialization: rating >= 2 && remainingSpecializations.length > 0,
      specializations: ownedSpecializations.map(entry => ({
        ...entry,
        bonus: SKILL_SPECIALIZATION_BONUS,
        rollPayload: JSON.stringify({
          intent: "skill",
          key: code,
          specializationKey: entry.key,
          specializationLabel: entry.label
        })
      })),

      // Input wiring paths (so templates don’t concat strings themselves)
      pathRating: `system.skills.${code}.rating`,
      pathBonus: `system.skills.${code}.bonus`
    };
  };

  return {
    left: left.map(mkRow),
    right: right.map(mkRow)
  };
}
