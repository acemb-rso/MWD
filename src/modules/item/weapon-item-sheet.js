// src/modules/item/weapon-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { AttributeActions } from "../attribute-actions.js";
import { BaseItemSheet } from "./base-item-sheet.js";
import { WeaponItem } from "./weapon-item.js";
import {
  PERSONAL_DAMAGE_TYPES,
  getPersonalDamageTypeLabel,
} from "../mwd/personal-damage.js";
import {
  PERSONAL_WEAPON_PAYLOAD_CAPABILITY_OPTIONS,
  PERSONAL_WEAPON_TEMPLATE_PLACEMENTS,
  PERSONAL_WEAPON_TEMPLATE_SHAPES,
  PERSONAL_WEAPON_WEAPON_CAPABILITY_OPTIONS,
} from "../mwd/personal-weapon-capabilities.js";

const PERSONAL_WEAPON_SKILL_CODES = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]);

const MECH_WEAPON_DAMAGE_TYPES = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]);

function appendSelectedOption(entries, selected, getLabel) {
  const value = String(selected ?? "").trim();
  if (!value) return entries;
  if (entries.some(entry => entry.value === value)) return entries;
  return entries.concat({ value, label: getLabel(value) });
}

/**
 * Weapon item sheet (AppV2).
 * Handles weapon skill selection and defense attribute assignment.
 * Used for both personal and mech weapons.
 */
export class WeaponItemSheet extends BaseItemSheet {

  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: WeaponItemSheet._onWeaponSkillChange
      }
    }, { inplace: false });
  }

  _getTabs() {
    return {
      ...super._getTabs(),
      modifiers: { id: "modifiers", group: "primary", label: "Roll Modifiers" },
      effects: { id: "effects", group: "primary", label: "Active Effects" }
    };
  }

  /**
   * Prepare context data, adding weapon-specific enums.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The prepared context
   * @override
   */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const canonicalType = this._getCanonicalItemType();

    context.ENUMS = {
      ...(context.ENUMS ?? {}),
      defenses: AttributeActions.getDefenses()
    };

    const allSkills = Array.isArray(context.ENUMS?.skills) ? context.ENUMS.skills : [];
    const selectedSkill = this.item.system?.skill;
    const selectedDamageType = this.item.system?.damageType;
    const skillOptions = canonicalType === "personalWeapon"
      ? appendSelectedOption(
          allSkills.filter(entry => PERSONAL_WEAPON_SKILL_CODES.includes(entry.value)),
          selectedSkill,
          value => allSkills.find(entry => entry.value === value)?.label ?? value
        )
      : allSkills;

    context.weaponProfile = this.item.getCombatProfile?.() ?? null;
    context.weaponEditor = {
      skills: skillOptions,
      categories: [
        { value: "melee", label: "Melee" },
        { value: "ranged", label: "Ranged" },
        { value: "thrown", label: "Thrown" },
        { value: "other", label: "Other" }
      ],
      damageTypes: appendSelectedOption(
        canonicalType === "personalWeapon" ? [...PERSONAL_DAMAGE_TYPES] : [...MECH_WEAPON_DAMAGE_TYPES],
        selectedDamageType,
        value => canonicalType === "personalWeapon" ? getPersonalDamageTypeLabel(value) : value
      ),
      ranges: WeaponItem.RANGE_ORDER.map(value => ({
        value,
        label: value.charAt(0).toUpperCase() + value.slice(1)
      })),
      weaponCapabilityOptions: PERSONAL_WEAPON_WEAPON_CAPABILITY_OPTIONS,
      payloadCapabilityOptions: PERSONAL_WEAPON_PAYLOAD_CAPABILITY_OPTIONS,
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...PERSONAL_DAMAGE_TYPES],
      payloadTemplateShapes: PERSONAL_WEAPON_TEMPLATE_SHAPES,
      payloadTemplatePlacements: PERSONAL_WEAPON_TEMPLATE_PLACEMENTS,
      resolverKeys: [
        { value: "standard", label: "Standard" },
        { value: "template", label: "Template" },
      ],
      payloadSourceKinds: [
        { value: "untracked", label: "Untracked" },
        { value: "internal", label: "Internal" },
        { value: "actorResource", label: "Actor Resource" },
        { value: "itemRef", label: "Linked Item" }
      ]
    };

    context.itemSheet = {
      ...(context.itemSheet ?? {}),
      isCompactWeaponSheet: true,
      weaponSheetVariant: canonicalType === "mechWeapon" ? "mech" : "personal"
    };
    context.itemSheet.stateChips = (context.itemSheet.stateChips ?? []).filter(
      chip => !["ownership", "equipment", "role"].includes(chip.kind)
    );
    context.itemSheet.currentPayloadLabel = context.weaponProfile?.payloadLabel ?? "";
    
    return context;
  }

  /**
   * Handle changing the weapon skill, which updates the defense attribute.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The changed select element
   * @static
   * @async
   */
  static async _onWeaponSkillChange(event, target) {
    const skillCode = target.value;
    const skill = game.system.mwd.skills?.get?.(skillCode);
    
    if (!skill?.defense) return;
    await this.item.update({ 'system.defense': skill.defense }, { render: false });
  }
}
