// src/modules/item/gear-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { BaseItemSheet } from "./base-item-sheet.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import { TEMPLATES_PATH } from "../constants.js";

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
    const categoryOptions = getInventoryCategoryOptions(canonicalType);

    context.system = {
      ...system,
      quantity: Math.max(0, Math.trunc(Number(system.quantity ?? 1) || 0)),
      rating: Math.max(0, Math.trunc(Number(system.rating ?? 0) || 0)),
      category: String(system.category ?? "").trim(),
      relatedSkill: String(system.relatedSkill ?? "").trim(),
      availability: String(system.availability ?? "").trim(),
      rulesHook: String(system.rulesHook ?? "").trim(),
      tags: Array.isArray(system.tags)
        ? system.tags.map(tag => String(tag ?? "").trim()).filter(Boolean)
        : []
    };
    context.gearEditor = {
      categories: categoryOptions.map(option => ({ ...option }))
    };
    context.tagsText = context.system.tags.join(", ");
    context.itemSheet = {
      ...(context.itemSheet ?? {}),
      summaryChips: [
        { label: "Qty", value: String(context.system.quantity) },
        { label: "Rating", value: String(context.system.rating) },
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
}
