// /mwd/src/modules/mwd/skills.js
// Canonical core skills catalog for MWD (fixed set).
//
// Design contract:
// - Core skill ratings live on Actor: system.skills.<code>.rating
// - Variable / named skills (Knowledge, Language, Lore, etc.) should be Item documents later
//   and therefore are NOT included in this core list.

import { ICONS_SKILLS_PATH, SYSTEM_PATH } from "../constants.js";
import { Enums } from "../enums.js"; // if you want pretty attribute labels (optional)


/**
 * @typedef {Object} MWDSkillDef
 * @property {string} code              Unique key used in system.skills.<code>.rating
 * @property {string} label             Human-readable label
 * @property {string} attribute         Attribute key (e.g. "strength", "reflexes")
 * @property {string} [icon]            Optional icon path
 * @property {boolean} [isSocial]       Optional UI grouping hint
 * @property {string} [defense]         Optional roll hint (e.g. "physicalDefense")
 */

/** @type {MWDSkillDef[]} */
export const MWD_SKILLS = [
  // Strength
  { code: "athletics",       label: "Athletics",       attribute: "strength",  icon: `${ICONS_SKILLS_PATH}/athletics.svg` },
  { code: "heavyWeapons",    label: "Heavy Weapons",   attribute: "strength",  icon: `${ICONS_SKILLS_PATH}/heavy-weapons.svg`, defense: "physicalDefense" },

  // Reflexes
  { code: "escapeArtist",     label: "Escape Artist",     attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/escape-artist.svg` },
  { code: "gunnery",          label: "Gunnery",           attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/vehicle-weapons.svg`, defense: "physicalDefense" },
  { code: "meleeCombat",      label: "Melee Combat",      attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/close-combat.svg`, defense: "physicalDefense" },
  { code: "piloting",         label: "Piloting",          attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/piloting-ground-steering-wheel.svg` },
  { code: "projectileWeapons",label: "Projectile Weapons",attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/projectile-weapons.svg`, defense: "physicalDefense" },
  { code: "firearms",         label: "Firearms",          attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/firearms.svg`, defense: "physicalDefense" },
  { code: "stealth",          label: "Stealth",           attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/stealth.svg` },
  { code: "zeroGOperations",  label: "Zero-G Operations", attribute: "reflexes", icon: `${ICONS_SKILLS_PATH}/free-fall.svg` },

  // Intelligence
  { code: "art",            label: "Art",            attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/art.svg` },
  { code: "artillery",      label: "Artillery",      attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/artillery.svg` },
  { code: "communications", label: "Communications", attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/networking.svg` },
  { code: "computers",      label: "Computers",      attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/hacking.svg` },
  { code: "demolitions",    label: "Demolitions",    attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/demolition.svg` },
  { code: "medTech",        label: "Medtech",        attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/biotech.svg` },
  { code: "science",        label: "Science",        attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/skills.svg` },
  { code: "perception",     label: "Perception",     attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/skills.svg` },
  { code: "tactics",        label: "Tactics",        attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/skills.svg` },
  { code: "technician",     label: "Technician",     attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/engineering.svg` },
  { code: "tracking",       label: "Tracking",       attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/tracking.svg` },
  { code: "navigation",     label: "Navigation",     attribute: "intelligence", icon: `${ICONS_SKILLS_PATH}/piloting-other.svg` },

  // Willpower
  { code: "animalHandling", label: "Animal Handling", attribute: "willpower", icon: `${ICONS_SKILLS_PATH}/animals.svg` },
  { code: "survival",       label: "Survival",        attribute: "willpower", icon: `${ICONS_SKILLS_PATH}/survival.svg` },

  // Charisma
  { code: "acting",       label: "Acting",       attribute: "charisma", isSocial: true, icon: `${ICONS_SKILLS_PATH}/con-art.svg` },
  { code: "disguise",     label: "Disguise",     attribute: "charisma", icon: `${ICONS_SKILLS_PATH}/disguise.svg` },
  { code: "leadership",   label: "Leadership",   attribute: "charisma", isSocial: true, icon: `${ICONS_SKILLS_PATH}/skills.svg` },
  { code: "negotiation",  label: "Negotiation",  attribute: "charisma", isSocial: true, icon: `${ICONS_SKILLS_PATH}/negotiation.svg` },
  { code: "etiquette",    label: "Etiquette",    attribute: "charisma", isSocial: true, icon: `${ICONS_SKILLS_PATH}/etiquette.svg` },
  { code: "streetwise",   label: "Streetwise",   attribute: "charisma", isSocial: true, icon: `${ICONS_SKILLS_PATH}/etiquette2.svg` },
  { code: "intimidation", label: "Intimidation", attribute: "charisma", isSocial: true, icon: `${ICONS_SKILLS_PATH}/intimidation.svg` }
].map(normalizeSkillDef);

/**
 * Normalize skill entries so callers can assume label/icon exist.
 * @param {MWDSkillDef} s
 * @returns {MWDSkillDef}
 */
function normalizeSkillDef(s) {
  return {
    ...s,
    label: s.label ?? s.code,
    icon: s.icon ?? `${SYSTEM_PATH}/icons/skills/skills.svg`
  };
}

/**
 * Get a canonical skill definition by code.
 * @param {string} code
 * @returns {MWDSkillDef | undefined}
 */
export function getSkillDef(code) {
  return MWD_SKILLS.find((s) => s.code === code);
}

/**
 * Return a stable, sorted list for display.
 * @returns {MWDSkillDef[]}
 */
export function listSkillDefs() {
  return [...MWD_SKILLS].sort((a, b) => a.label.localeCompare(b.label));
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
  for (const s of MWD_SKILLS) {
    const entry = (systemData.skills[s.code] ??= {});
    if (entry.rating == null) entry.rating = 0;
  }
}
export function buildSkillDisplay(systemData) {
  const defs = listSkillDefs();
  const { left, right } = splitSkillsTwoColumns(defs);

  const mkRow = (def) => {
    const code = def.code;
    const attr = def.attribute;

    const rating = Number(systemData?.skills?.[code]?.rating ?? 0);

    // Base: linked attribute value
    const base = Number(systemData?.attributes?.[attr]?.value ?? 0);

    // Bonus/modifiers: placeholder field (you can later feed Active Effects into this)
    const bonus = Number(systemData?.skills?.[code]?.bonus ?? 0);

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