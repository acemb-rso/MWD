// src/modules/item/armor-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { BaseItemSheet } from "./base-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";
import {
  ARMOR_STANDARD_TRAITS,
  normalizeArmorMitigationByType,
} from "../mwd/personal-damage.js";

const ARMOR_MODIFIER_LABELS = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical",
};

function formatSignedValue(value) {
  const numeric = Number(value ?? 0) || 0;
  return numeric > 0 ? `+${numeric}` : `${numeric}`;
}

function buildArmorModifierSummary({ defenseBonus = 0, mitigationByType = {} } = {}) {
  const summary = [];
  const defense = Number(defenseBonus ?? 0) || 0;
  if (defense !== 0) summary.push(`Defense ${formatSignedValue(defense)}`);

  const normalizedMitigation = normalizeArmorMitigationByType(mitigationByType);
  for (const [key, label] of Object.entries(ARMOR_MODIFIER_LABELS)) {
    const value = Number(normalizedMitigation?.[key] ?? 0) || 0;
    if (value !== 0) summary.push(`${label} ${formatSignedValue(value)}`);
  }

  return summary.join(" | ");
}

export class ArmorItemSheet extends BaseItemSheet {
  static LAYOUT_ID = "armor";

  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      position: {
        width: 960,
        height: 860
      },
      window: {
        ...super.DEFAULT_OPTIONS.window,
        minWidth: 920,
        minHeight: 760
      }
    }, { inplace: false });
  }

  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/armor-root.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const item = this.item;
    const actor = item.actor ?? null;
    const loadout = actor?.getPersonalCombatLoadout?.() ?? null;
    const activeArmorId = loadout?.activeArmor?.id ?? null;
    const armorState = loadout?.activeArmor?.id === item.id
      ? loadout.activeArmor
      : item.getArmorProfile?.({ actor });

    context.armorState = armorState;
    context.isActiveArmor = activeArmorId === item.id;
    context.effectiveDurabilityCurrent = Number(
      armorState?.durability?.current
      ?? item.system?.durability?.current
      ?? item.system?.durability?.max
      ?? item.system?.rating
      ?? 0
    );
    context.effectiveArmorRating = Number(
      armorState?.currentArmorRating
      ?? armorState?.ratingCurrent
      ?? Math.min(
        Number(item.system?.rating ?? 0),
        Number(item.system?.durability?.current ?? item.system?.durability?.max ?? item.system?.rating ?? 0)
      )
    );
    context.effectiveArmorResist = Number(
      armorState?.baseMitigation
      ?? armorState?.baseResistance
      ?? 0
    );
    context.armorModifierSummary = this._getArmorModifierSummary(armorState);
    context.itemSheet = foundry.utils.mergeObject(context.itemSheet ?? {}, {});
    context.itemSheet.summaryChips = this._getSummaryChips(armorState);
    context.armorEditor = {
      standardTraits: [...ARMOR_STANDARD_TRAITS]
    };

    return context;
  }

  _getSummaryChips(activeArmorState = null) {
    const system = this.item.system ?? {};
    const chips = [
      {
        label: "Rating",
        value: String(Number(
          activeArmorState?.ratingCurrent
          ?? activeArmorState?.currentArmorRating
          ?? Math.min(
            Number(system.rating ?? 0),
            Number(system.durability?.current ?? system.durability?.max ?? system.rating ?? 0)
          )
        ))
      },
      { label: "Defense", value: String(Number(system.defenseBonus ?? 0)) },
      {
        label: "Durability",
        value: `${Number(activeArmorState?.durability?.current ?? system.durability?.current ?? system.durability?.max ?? 0)}/${Number(activeArmorState?.durability?.max ?? system.durability?.max ?? system.rating ?? 0)}`
      },
      {
        label: "Resist",
        value: String(Number(activeArmorState?.baseMitigation ?? activeArmorState?.baseResistance ?? 0))
      }
    ];

    const reinforcedMax = Number(activeArmorState?.traitState?.reinforced?.max ?? system?.traitState?.reinforced?.max ?? 0);
    if (reinforcedMax > 0) {
      chips.push({
        label: "Reinforced",
        value: `${Number(activeArmorState?.traitState?.reinforced?.current ?? system?.traitState?.reinforced?.current ?? 0)}/${reinforcedMax}`
      });
    }

    return chips;
  }

  _getArmorModifierSummary(activeArmorState = null) {
    const system = this.item.system ?? {};
    return buildArmorModifierSummary({
      defenseBonus: activeArmorState?.defenseBonus ?? system.defenseBonus ?? 0,
      mitigationByType:
        activeArmorState?.mitigationByType
        ?? activeArmorState?.typedMitigation
        ?? system.mitigationByType
        ?? {},
    });
  }

  _onRender(context, options) {
    super._onRender?.(context, options);

    const root = this._getRootElement?.();
    if (!root) return;

    root.querySelectorAll(".mwd-armor-standard-trait-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void this.item.createArmorStandardTrait?.();
      });
    });

    root.querySelectorAll(".mwd-armor-standard-trait-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void this.item.deleteArmorStandardTrait?.(button.dataset.traitId);
      });
    });

    root.querySelectorAll(".mwd-armor-standard-trait-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        void this.item.updateArmorStandardTrait?.(
          field.dataset.traitId,
          field.dataset.field,
          field.value
        );
      });
    });
  }
}
