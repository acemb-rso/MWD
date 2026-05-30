// src/modules/item/weapon-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { AttributeActions } from "../attribute-actions.js";
import { MWD } from "../config.js";
import { startCase } from "../constants.js";
import { BaseItemSheet } from "./base-item-sheet.js";
import { WeaponItem } from "./weapon-item.js";
import {
  PERSONAL_DAMAGE_TYPES,
  WEAPON_STANDARD_TRAITS,
  getPersonalDamageTypeLabel,
  normalizeConsumptionSource,
  resolveConsumptionSourceState,
} from "../mwd/personal-damage.js";
import {
  MACHINE_WEAPON_DAMAGE_TYPES,
  getMachineWeaponDamageTypeLabel,
} from "../mwd/machine-weapon-types.js";
import { getPersonalRangeBandLabel } from "../mwd/personal-range-bands.js";
import {
  PERSONAL_WEAPON_PAYLOAD_CAPABILITY_OPTIONS,
  PERSONAL_WEAPON_TEMPLATE_PLACEMENTS,
  PERSONAL_WEAPON_TEMPLATE_SHAPES,
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

const MECH_WEAPON_CATEGORY_OPTIONS = Object.freeze([
  { value: "melee", label: "Melee" },
  { value: "ranged", label: "Ranged" },
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
        weaponSkillChange: WeaponItemSheet._onWeaponSkillChange,
        weaponCategoryChange: WeaponItemSheet._onWeaponCategoryChange,
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
    const mechCategory = String(this.item.system?.weaponCategory ?? this.item.system?.category ?? "ranged").trim().toLowerCase() === "melee"
      ? "melee"
      : "ranged";
    const hardpointSizeLabels = MWD?.mwd?.hardpointSize ?? MWD?.mwd?.hardpoint?.size ?? {};
    const baseDamageTypeOptions = canonicalType === "mechWeapon"
      ? [...MACHINE_WEAPON_DAMAGE_TYPES]
      : [...PERSONAL_DAMAGE_TYPES];
    const getBaseDamageTypeLabel = canonicalType === "mechWeapon"
      ? getMachineWeaponDamageTypeLabel
      : getPersonalDamageTypeLabel;

    context.weaponProfile = this.item.getCombatProfile?.() ?? null;
    context.weaponEditor = {
      skills: skillOptions,
      categories: canonicalType === "mechWeapon"
        ? [...MECH_WEAPON_CATEGORY_OPTIONS]
        : [
            { value: "melee", label: "Melee" },
            { value: "projectile", label: "Projectile" },
            { value: "ranged", label: "Ranged" },
            { value: "smallArms", label: "Small Arms" },
            { value: "support", label: "Support" },
            { value: "thrown", label: "Thrown" },
            { value: "other", label: "Other" }
          ],
      damageTypes: appendSelectedOption(
        baseDamageTypeOptions,
        selectedDamageType,
        value => getBaseDamageTypeLabel(value)
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
      standardTraits: [...WEAPON_STANDARD_TRAITS],
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
      hardpointSizes: Object.entries(hardpointSizeLabels).map(([value, label]) => ({ value, label })),
      consumptionSources: Array.isArray(this.item.system?.consumptionSources)
        ? this.item.system.consumptionSources.map(source => buildConsumptionSourceEditorEntry(this.item, source))
        : []
    };

    context.itemSheet = {
      ...(context.itemSheet ?? {}),
      isCompactWeaponSheet: true,
      weaponSheetVariant: canonicalType === "mechWeapon" ? "mech" : "personal",
      mechDerivedSkillLabel: mechCategory === "melee" ? "Melee Combat" : "Gunnery",
      mechIsMelee: canonicalType === "mechWeapon" && mechCategory === "melee",
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
  _onRender(context, options) {
    super._onRender?.(context, options);
    this._bindPayloadEditorControls();
    this._bindWeaponStandardTraitControls();
  }

  _bindWeaponStandardTraitControls() {
    const root = this._getRootElement?.();
    if (!root) return;

    const preserveScroll = (work) => {
      this._captureScrollPositions?.();
      return work();
    };

    root.querySelectorAll(".mwd-weapon-standard-trait-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void preserveScroll(() => this.item.createWeaponStandardTrait?.());
      });
    });

    root.querySelectorAll(".mwd-weapon-standard-trait-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void preserveScroll(() => this.item.deleteWeaponStandardTrait?.(button.dataset.traitId));
      });
    });

    root.querySelectorAll(".mwd-weapon-standard-trait-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        void preserveScroll(() => this.item.updateWeaponStandardTrait?.(
          field.dataset.traitId,
          field.dataset.field,
          field.value
        ));
      });
    });
  }

  _bindPayloadEditorControls() {
    const root = this._getRootElement?.();
    if (!root) return;

    const preserveScroll = (work) => {
      this._captureScrollPositions?.();
      return work();
    };

    root.querySelectorAll(".mwd-payload-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void preserveScroll(() => this.item.createPayload?.());
      });
    });

    root.querySelectorAll(".mwd-payload-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void preserveScroll(() => this.item.deletePayload?.(button.dataset.payloadId));
      });
    });

    root.querySelectorAll(".mwd-payload-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        void preserveScroll(() => this.item.updatePayloadField?.(
          field.dataset.payloadId,
          field.dataset.field,
          field.value
        ));
      });
    });

    root.querySelectorAll(".mwd-source-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void preserveScroll(() => this.item.createConsumptionSource?.());
      });
    });

    root.querySelectorAll(".mwd-source-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void preserveScroll(() => this.item.deleteConsumptionSource?.(button.dataset.sourceId));
      });
    });

    root.querySelectorAll(".mwd-source-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        void preserveScroll(() => this.item.updateConsumptionSourceField?.(
          field.dataset.sourceId,
          field.dataset.field,
          field.value
        ));
      });
    });

    root.querySelectorAll(".mwd-capability-picker").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        const selected = String(field.value ?? "").trim();
        if (!selected) return;

        const current = String(field.dataset.values ?? "")
          .split(",")
          .map(entry => entry.trim())
          .filter(Boolean);
        const next = Array.from(new Set([...current, selected]));
        field.value = "";

        const payloadId = String(field.dataset.payloadId ?? "").trim();
        const targetField = String(field.dataset.field ?? "").trim();
        if (!targetField) return;

        if (payloadId) {
          void preserveScroll(() => this.item.updatePayloadField?.(payloadId, targetField, next.join(", ")));
          return;
        }

        void preserveScroll(() => this.item.update({ [targetField]: next }));
      });
    });
  }

  static async _onWeaponSkillChange(event, target) {
    const skillCode = target.value;
    const skill = game.system.mwd.skills?.get?.(skillCode);
    await this._syncNamedField(target, {
      ...(skill?.defense ? { "system.defense": skill.defense } : {})
    });
  }

  static async _onWeaponCategoryChange(event, target) {
    const category = String(target?.value ?? "").trim().toLowerCase() === "melee" ? "melee" : "ranged";
    const canonicalType = this._getCanonicalItemType?.() ?? this.item?.canonicalType ?? this.item?.type;

    if (canonicalType === "mechWeapon") {
      const updateData = {
        "system.category": category,
        "system.weaponCategory": category,
        "system.skill": category === "melee" ? "meleeCombat" : "gunnery",
      };

      if (category === "melee") {
        updateData["system.range.max"] = "close";
        updateData["system.range.close"] = 0;
        updateData["system.range.near"] = 0;
        updateData["system.range.far"] = 0;
        updateData["system.range.extreme"] = 0;
      }

      await this._syncNamedField(target, updateData);
      return;
    }

    await this._syncNamedField(target);
  }
}
