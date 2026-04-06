// src/modules/item/gear-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { BaseItemSheet } from "./base-item-sheet.js";
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

export class GearItemSheet extends BaseItemSheet {
  static LAYOUT_ID = "gear";

  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/gear.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const system = this.item.system ?? {};

    context.system = {
      ...system,
      quantity: Math.max(0, Math.trunc(Number(system.quantity ?? 1) || 0)),
      rating: Math.max(0, Math.trunc(Number(system.rating ?? 0) || 0)),
      category: String(system.category ?? "").trim(),
      tags: Array.isArray(system.tags)
        ? system.tags.map(tag => String(tag ?? "").trim()).filter(Boolean)
        : []
    };
    context.gearEditor = {
      categories: GEAR_CATEGORY_OPTIONS.map(option => ({ ...option }))
    };
    context.tagsText = context.system.tags.join(", ");
    context.itemSheet = foundry.utils.mergeObject(context.itemSheet ?? {}, {
      summaryChips: [
        { label: "Qty", value: String(context.system.quantity) },
        { label: "Rating", value: String(context.system.rating) },
        {
          label: "Category",
          value: GEAR_CATEGORY_OPTIONS.find(option => option.value === context.system.category)?.label ?? "Uncategorized"
        }
      ]
    });

    return context;
  }
}
