// src/modules/item/asset-module-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { BaseItemSheet } from "./base-item-sheet.js";
import { TEMPLATES_PATH } from "../core/constants.js";
import { buildAssetModuleSummary } from "../mwd/asset-module-effects.js";
import { AssetModuleValidationError, validateAssetModuleEffects } from "../mwd/asset-module-rules.js";

export class AssetModuleItemSheet extends BaseItemSheet {
  static LAYOUT_ID = "asset-module";

  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/assetModule.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const summary = buildAssetModuleSummary(this.item);
    context.itemSheet = {
      ...(context.itemSheet ?? {}),
      assetModuleEffectsJson: JSON.stringify(this.item.system?.effects ?? [], null, 2),
      assetModuleSummary: summary.summary,
      assetModuleErrors: summary.errors ?? [],
    };
    return context;
  }

  _getNamedFieldUpdate(field) {
    const name = String(field?.getAttribute?.("name") ?? "").trim();
    if (name !== "system.effects") return super._getNamedFieldUpdate(field);

    try {
      const parsed = JSON.parse(String(field.value ?? "[]"));
      if (!Array.isArray(parsed)) {
        ui.notifications?.error("AssetModule effects JSON must be an array.");
        return null;
      }
      validateAssetModuleEffects({ effects: parsed }, { itemName: this.item.name, itemId: this.item.id });
      return { "system.effects": parsed };
    } catch (err) {
      const message = err instanceof AssetModuleValidationError
        ? err.userMessage
        : "AssetModule effects JSON is invalid.";
      ui.notifications?.error(message);
      console.error("MWD | Invalid AssetModule effects JSON", err);
      return null;
    }
  }
}
