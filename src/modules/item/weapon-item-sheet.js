// src/modules/item/weapon-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { AttributeActions } from "../attribute-actions.js";
import { BaseItemSheet } from "./base-item-sheet.js";
import { WeaponItem } from "./weapon-item.js";
import {
  PERSONAL_DAMAGE_TYPES,
  getPersonalDamageTypeLabel,
  normalizeConsumptionSource,
  resolveConsumptionSourceState,
} from "../mwd/personal-damage.js";
import { getPersonalRangeBandLabel } from "../mwd/personal-range-bands.js";
import {
  PERSONAL_WEAPON_PAYLOAD_CAPABILITY_OPTIONS,
  PERSONAL_WEAPON_TEMPLATE_PLACEMENTS,
  PERSONAL_WEAPON_TEMPLATE_SHAPES,
  PERSONAL_WEAPON_WEAPON_CAPABILITY_OPTIONS,
} from "../mwd/personal-weapon-capabilities.js";
import {
  AREA_EFFECT_KINDS,
  EXPOSURE_TIERS,
} from "../area-effects/area-effect-engine.js";

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

const ITEM_REF_PATH_PRESETS = Object.freeze([
  { value: "quantity", label: "Quantity" },
  { value: "durability.current", label: "Durability" },
  { value: "", label: "Custom Path" },
]);

const CONSUMABLE_SOURCE_TYPE = "consumable";

function formatItemTypeLabel(item) {
  const raw = String(item?.canonicalType ?? item?.type ?? "item").trim();
  return raw.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, char => char.toUpperCase());
}

function isConsumableSourceCandidate(item) {
  return String(item?.canonicalType ?? item?.type ?? "").trim() === CONSUMABLE_SOURCE_TYPE;
}

function buildOwnedItemOptions(item, selectedItemId = "") {
  const selectedId = String(selectedItemId ?? "").trim();

  return Array.from(item?.actor?.items ?? [])
    .filter(candidate => {
      const candidateId = String(candidate?.id ?? "").trim();
      if (!candidateId || candidateId === item?.id) return false;

      // The picker should guide authors toward the new consumable workflow
      // without hiding an older non-consumable link that still needs migration.
      return candidateId === selectedId || isConsumableSourceCandidate(candidate);
    })
    .sort((left, right) => String(left?.name ?? "").localeCompare(String(right?.name ?? "")))
    .map(candidate => ({
      value: candidate.id,
      label: `${candidate.name || "Unnamed Item"} (${formatItemTypeLabel(candidate)})`,
    }));
}

function appendSelectedOption(entries, selected, getLabel) {
  const value = String(selected ?? "").trim();
  if (!value) return entries;
  if (entries.some(entry => entry.value === value)) return entries;
  return entries.concat({ value, label: getLabel(value) });
}

function buildConsumptionSourceEditorEntry(item, source) {
  const normalizedSource = normalizeConsumptionSource(source);
  const ownedItemOptions = buildOwnedItemOptions(item, normalizedSource.link?.itemId);
  const resolvedState = resolveConsumptionSourceState({
    source: normalizedSource,
    actor: item?.actor ?? null,
  });
  const linkedItem = item?.actor?.items?.get?.(normalizedSource.link?.itemId ?? "") ?? null;
  const itemPathOptions = appendSelectedOption(
    [...ITEM_REF_PATH_PRESETS],
    normalizedSource.link?.itemPath,
    value => `Custom (${value})`
  );
  const presetValues = new Set(ITEM_REF_PATH_PRESETS.map(entry => String(entry.value ?? "").trim()));
  const normalizedPath = String(normalizedSource.link?.itemPath ?? "").trim();
  const hasOwnedActor = Boolean(item?.actor);

  let preview = "";
  if (normalizedSource.kind === "itemRef") {
    if (!hasOwnedActor) {
      preview = "Embed this weapon in an actor to link it to owned inventory.";
    } else if (!ownedItemOptions.length) {
      preview = "Add an owned Consumable item to the actor, then link this weapon to it.";
    } else if (!linkedItem) {
      preview = "Pick an owned Consumable item to consume from.";
    } else if (!isConsumableSourceCandidate(linkedItem)) {
      preview = `Linked to ${linkedItem.name} | Legacy non-consumable source. Repoint this to a Consumable item when convenient.`;
    } else if (!normalizedPath) {
      preview = `Linked to ${linkedItem.name}. Pick which field should be consumed.`;
    } else {
      preview = resolvedState.isTracked
        ? `Linked to ${linkedItem.name} | Available ${Number(resolvedState.current ?? 0)}`
        : `Linked to ${linkedItem.name} | Path not resolving to a tracked value yet.`;
    }
  }

  return {
    ...normalizedSource,
    resolvedState,
    ui: {
      ownedItemOptions,
      itemPathOptions,
      hasOwnedActor,
      linkedItemName: linkedItem?.name ?? "",
      showCustomItemPath: normalizedSource.kind === "itemRef" && !presetValues.has(normalizedPath),
      preview,
    },
  };
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
        label: canonicalType === "personalWeapon"
          ? getPersonalRangeBandLabel(value)
          : value.charAt(0).toUpperCase() + value.slice(1)
      })),
      rangeBandLabels: Object.fromEntries(WeaponItem.RANGE_ORDER.map(value => [
        value,
        canonicalType === "personalWeapon"
          ? getPersonalRangeBandLabel(value)
          : value.charAt(0).toUpperCase() + value.slice(1)
      ])),
      weaponCapabilityOptions: PERSONAL_WEAPON_WEAPON_CAPABILITY_OPTIONS,
      payloadCapabilityOptions: PERSONAL_WEAPON_PAYLOAD_CAPABILITY_OPTIONS,
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...PERSONAL_DAMAGE_TYPES],
      payloadTemplateShapes: PERSONAL_WEAPON_TEMPLATE_SHAPES,
      payloadTemplatePlacements: PERSONAL_WEAPON_TEMPLATE_PLACEMENTS,
      areaEffectKinds: [
        { value: AREA_EFFECT_KINDS.discrete, label: "Discrete" },
        { value: AREA_EFFECT_KINDS.persistent, label: "Persistent Hazard" },
      ],
      exposureTiers: [
        { value: EXPOSURE_TIERS.minor, label: "Minor" },
        { value: EXPOSURE_TIERS.major, label: "Major" },
        { value: EXPOSURE_TIERS.full, label: "Full" },
      ],
      resolverKeys: [
        { value: "standard", label: "Standard" },
        { value: "template", label: "Template" },
      ],
      payloadSourceKinds: [
        { value: "untracked", label: "Untracked" },
        { value: "internal", label: "Internal" },
        { value: "actorResource", label: "Actor Resource" },
        { value: "itemRef", label: "Linked Item" }
      ],
      consumptionSources: Array.isArray(this.item.system?.consumptionSources)
        ? this.item.system.consumptionSources.map(source => buildConsumptionSourceEditorEntry(this.item, source))
        : []
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
    await this._syncNamedField(target, {
      ...(skill?.defense ? { "system.defense": skill.defense } : {})
    });
  }
}
