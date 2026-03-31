// src/modules/item/quality-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { BaseItemSheet } from "./base-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";
import {
  getQualityCategoryLabel,
  getQualityTierLabel,
  getTraitEditorConfig,
  normalizeQualityTraitSystem,
} from "../mwd/traits.js";

export class QualityItemSheet extends BaseItemSheet {
  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/quality.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const system = normalizeQualityTraitSystem(this.item.system ?? {});
    const traitEditor = getTraitEditorConfig();

    context.system = system;
    context.traitEditor = traitEditor;
    context.itemSheet = foundry.utils.mergeObject(context.itemSheet ?? {}, {
      summaryChips: [
        { label: "Category", value: getQualityCategoryLabel(system.category) },
        { label: "Tier", value: getQualityTierLabel(system.tier) },
        { label: "Activation", value: String(system.activation ?? "passive").trim() || "Passive" },
        { label: "Effects", value: String(system.effects?.length ?? 0) },
      ]
    });
    context.tagsText = Array.isArray(system.tags) ? system.tags.join(", ") : "";

    return context;
  }

  _onRender(context, options) {
    super._onRender?.(context, options);

    const root = this._getRootElement?.();
    if (!root) return;

    root.querySelectorAll(".mwd-quality-prereq-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void this.item.createQualityPrerequisite?.();
      });
    });

    root.querySelectorAll(".mwd-quality-prereq-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void this.item.deleteQualityPrerequisite?.(button.dataset.prereqId);
      });
    });

    root.querySelectorAll(".mwd-quality-prereq-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        void this.item.updateQualityPrerequisite?.(
          field.dataset.prereqId,
          field.dataset.field,
          field.value
        );
      });
    });

    root.querySelectorAll(".mwd-quality-effect-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void this.item.createQualityEffect?.();
      });
    });

    root.querySelectorAll(".mwd-quality-effect-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void this.item.deleteQualityEffect?.(button.dataset.effectId);
      });
    });

    root.querySelectorAll(".mwd-quality-effect-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        void this.item.updateQualityEffect?.(
          field.dataset.effectId,
          field.dataset.field,
          field.value
        );
      });
    });

    root.querySelectorAll(".mwd-quality-effect-condition-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void this.item.createQualityEffectCondition?.(button.dataset.effectId);
      });
    });

    root.querySelectorAll(".mwd-quality-effect-condition-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void this.item.deleteQualityEffectCondition?.(button.dataset.effectId, button.dataset.conditionId);
      });
    });

    root.querySelectorAll(".mwd-quality-effect-condition-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        void this.item.updateQualityEffectCondition?.(
          field.dataset.effectId,
          field.dataset.conditionId,
          field.dataset.field,
          field.value
        );
      });
    });
  }
}
