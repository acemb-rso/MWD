// src/modules/item/gear-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { BaseItemSheet } from "./base-item-sheet.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import { TEMPLATES_PATH } from "../constants.js";
import {
  getTraitEditorConfig,
  isCyberneticGearSystem,
  normalizeCyberneticGearSystem,
  traitEffectUsesSkillSelector,
} from "../mwd/traits.js";

const GEAR_CATEGORY_OPTIONS = Object.freeze([
  { value: "audiovisual", label: "Audiovisual Gear" },
  { value: "communication", label: "Communication Gear" },
  { value: "computing", label: "Computing Gear" },
  { value: "espionage", label: "Espionage Gear" },
  { value: "hostileEnvironment", label: "Hostile Environment Gear" },
  { value: "medical", label: "Medical Gear" },
  { value: "optical", label: "Optical Gear" },
  { value: "power", label: "Power Gear" },
  { value: "repairSalvage", label: "Repair/Salvage Gear" },
  { value: "survival", label: "Survival Gear" },
  { value: "surveillance", label: "Surveillance Gear" }
]);

const CYBERNETIC_CATEGORY_OPTIONS = Object.freeze([
  { value: "cognitive", label: "Cognitive" },
  { value: "communication", label: "Communication" },
  { value: "interface", label: "Interface" },
  { value: "physiological", label: "Physiological" },
  { value: "replacement", label: "Replacement" },
  { value: "sensory", label: "Sensory" },
  { value: "structural", label: "Structural" },
]);

const CONSUMABLE_CATEGORY_OPTIONS = Object.freeze([
  { value: "ammo", label: "Ammunition" },
  { value: "explosive", label: "Explosive" },
  { value: "medical", label: "Medical" },
  { value: "repair", label: "Repair" },
  { value: "fuel", label: "Fuel / Power Cell" },
  { value: "utility", label: "Utility" },
]);

function getInventoryCategoryOptions(canonicalType) {
  return canonicalType === "consumable"
    ? CONSUMABLE_CATEGORY_OPTIONS
    : GEAR_CATEGORY_OPTIONS;
}

function getGearSubtypeOptions() {
  return [
    { value: "", label: "Standard Gear" },
    { value: "cybernetic", label: "Cybernetic" },
  ];
}

export class GearItemSheet extends BaseItemSheet {
  // One sheet class intentionally backs both gear and consumables so quantity,
  // rating, and reference editing never drift into parallel implementations.
  static LAYOUT_ID = null;

  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/gear.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const canonicalType = this._getCanonicalItemType();
    const system = this.item.system ?? {};
    const isCybernetic = canonicalType === "gear" && isCyberneticGearSystem(system);
    const cyberneticSystem = isCybernetic ? normalizeCyberneticGearSystem(system) : null;
    const categoryOptions = isCybernetic
      ? CYBERNETIC_CATEGORY_OPTIONS
      : getInventoryCategoryOptions(canonicalType);
    const traitEditor = getTraitEditorConfig();
    const skillOptions = Array.isArray(context.ENUMS?.skills)
      ? context.ENUMS.skills.map(skill => ({
          value: String(skill?.value ?? "").trim(),
          label: String(skill?.label ?? skill?.value ?? "").trim(),
        })).filter(skill => skill.value)
      : [];

    context.system = {
      ...system,
      ...(cyberneticSystem ?? {}),
      quantity: Math.max(0, Math.trunc(Number(system.quantity ?? 1) || 0)),
      rating: Math.max(0, Math.trunc(Number((cyberneticSystem ?? system).rating ?? 0) || 0)),
      subtype: String((cyberneticSystem ?? system).subtype ?? "").trim(),
      category: String((cyberneticSystem ?? system).category ?? "").trim(),
      relatedSkill: String((cyberneticSystem ?? system).relatedSkill ?? "").trim(),
      availability: String((cyberneticSystem ?? system).availability ?? "").trim(),
      rulesHook: String((cyberneticSystem ?? system).rulesHook ?? "").trim(),
      tags: Array.isArray((cyberneticSystem ?? system).tags)
        ? (cyberneticSystem ?? system).tags.map(tag => String(tag ?? "").trim()).filter(Boolean)
        : [],
      effects: (Array.isArray(cyberneticSystem?.effects) ? cyberneticSystem.effects : []).map(effect => ({
        ...effect,
        showSkillPicker: traitEffectUsesSkillSelector(effect) || (Array.isArray(effect.skillKeys) && effect.skillKeys.length > 0),
        isEdgeEvent: effect.type === "edgeEvent",
      })),
      prerequisites: cyberneticSystem?.prerequisites ?? [],
      limits: cyberneticSystem?.limits ?? { perActivation: 0, perRound: 0, perScene: 0 },
      isCybernetic,
      activation: cyberneticSystem?.activation ?? "passive",
      active: cyberneticSystem?.active === true,
      equipped: cyberneticSystem?.equipped === true,
      load: cyberneticSystem?.load ?? 0,
      bodySlot: cyberneticSystem?.bodySlot ?? "",
    };
    if (!isCybernetic) {
      context.system.tags = Array.isArray(system.tags)
        ? system.tags.map(tag => String(tag ?? "").trim()).filter(Boolean)
        : [];
    }
    context.gearEditor = {
      categories: categoryOptions.map(option => ({ ...option })),
      subtypes: getGearSubtypeOptions(),
      activations: [
        { value: "passive", label: "Passive" },
        { value: "toggle", label: "Toggle" },
      ],
    };
    context.traitEditor = {
      ...traitEditor,
      skills: skillOptions,
    };
    context.tagsText = context.system.tags.join(", ");
    context.itemSheet = {
      ...(context.itemSheet ?? {}),
      summaryChips: [
        { label: "Qty", value: String(context.system.quantity) },
        { label: "Rating", value: String(context.system.rating) },
        ...(isCybernetic ? [
          { label: "Load", value: String(context.system.load) },
          { label: "State", value: context.system.equipped ? (context.system.activation === "toggle" && !context.system.active ? "Off" : "Online") : "Unequipped" },
        ] : []),
        {
          label: "Category",
          value: categoryOptions.find(option => option.value === context.system.category)?.label ?? "Uncategorized"
        },
        { label: "Skill", value: context.system.relatedSkill || "None" },
        { label: "Avail", value: context.system.availability || "Unlisted" }
      ]
    };
    context.layout = await LayoutRegistry.get(canonicalType === "consumable" ? "consumable" : "gear");

    return context;
  }

  _onRender(context, options) {
    super._onRender?.(context, options);

    const root = this._getRootElement?.();
    if (!root) return;
    const preserveScroll = (work) => {
      this._captureScrollPositions?.();
      return work();
    };

    root.querySelectorAll(".mwd-quality-prereq-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        void preserveScroll(() => this.item.createQualityPrerequisite?.());
      });
    });

    root.querySelectorAll(".mwd-quality-prereq-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        void preserveScroll(() => this.item.deleteQualityPrerequisite?.(button.dataset.prereqId));
      });
    });

    root.querySelectorAll(".mwd-quality-prereq-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        event.stopPropagation();
        void preserveScroll(() => this.item.updateQualityPrerequisite?.(
          field.dataset.prereqId,
          field.dataset.field,
          field.value
        ));
      });
    });

    root.querySelectorAll(".mwd-quality-effect-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        void preserveScroll(() => this.item.createQualityEffect?.());
      });
    });

    root.querySelectorAll(".mwd-quality-effect-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        void preserveScroll(() => this.item.deleteQualityEffect?.(button.dataset.effectId));
      });
    });

    root.querySelectorAll(".mwd-quality-effect-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        event.stopPropagation();
        void preserveScroll(() => this.item.updateQualityEffect?.(
          field.dataset.effectId,
          field.dataset.field,
          field instanceof HTMLInputElement && field.type === "checkbox"
            ? field.checked
            : field instanceof HTMLSelectElement && field.multiple
            ? Array.from(field.selectedOptions).map(option => option.value)
            : field.value
        ));
      });
    });

    root.querySelectorAll(".mwd-quality-effect-skill-toggle").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        event.stopPropagation();
        const effectId = field.dataset.effectId;
        const values = Array.from(root.querySelectorAll(`.mwd-quality-effect-skill-toggle[data-effect-id="${effectId}"]`))
          .filter(input => input instanceof HTMLInputElement && input.checked)
          .map(input => input.value);
        void preserveScroll(() => this.item.updateQualityEffect?.(
          effectId,
          field.dataset.field,
          values
        ));
      });
    });

    root.querySelectorAll(".mwd-quality-effect-condition-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        void preserveScroll(() => this.item.createQualityEffectCondition?.(button.dataset.effectId));
      });
    });

    root.querySelectorAll(".mwd-quality-effect-condition-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        void preserveScroll(() => this.item.deleteQualityEffectCondition?.(button.dataset.effectId, button.dataset.conditionId));
      });
    });

    root.querySelectorAll(".mwd-quality-effect-condition-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        event.stopPropagation();
        void preserveScroll(() => this.item.updateQualityEffectCondition?.(
          field.dataset.effectId,
          field.dataset.conditionId,
          field.dataset.field,
          field.value
        ));
      });
    });
  }
}
