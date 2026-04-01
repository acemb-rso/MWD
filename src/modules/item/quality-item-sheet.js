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
  traitEffectUsesSkillSelector,
} from "../mwd/traits.js";

export class QualityItemSheet extends BaseItemSheet {
  static LAYOUT_ID = "quality";

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
    const skillOptions = Array.isArray(context.ENUMS?.skills)
      ? context.ENUMS.skills.map(skill => ({
          value: String(skill?.value ?? "").trim(),
          label: String(skill?.label ?? skill?.value ?? "").trim(),
        })).filter(skill => skill.value)
      : [];

    context.system = {
      ...system,
      effects: (Array.isArray(system.effects) ? system.effects : []).map(effect => ({
        ...effect,
        showSkillPicker: traitEffectUsesSkillSelector(effect) || (Array.isArray(effect.skillKeys) && effect.skillKeys.length > 0),
        isEdgeEvent: effect.type === 'edgeEvent',
      })),
    };
    context.traitEditor = {
      ...traitEditor,
      skills: skillOptions,
    };
    context.itemSheet = foundry.utils.mergeObject(context.itemSheet ?? {}, {
      sheetClass: "mwd-item-sheet--quality",
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
          field instanceof HTMLSelectElement && field.multiple
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
