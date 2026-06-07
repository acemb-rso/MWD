// src/modules/item/armor-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { BaseItemSheet } from "./base-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";
import {
  ARMOR_STANDARD_TRAITS,
  normalizeArmorMitigationByType,
} from "../mwd/personal-damage.js";
import {
  getBattleArmorStructureResistance,
  isBattleArmorProfileEnabled,
  normalizeBattleArmorProfile,
} from "../mwd/battle-armor.js";

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

function formatPool(value = 0, max = 0) {
  return `${Number(value ?? 0)}/${Number(max ?? 0)}`;
}

function formatBattleArmorState(value = "") {
  const normalized = String(value ?? "").trim();
  if (!normalized) return "";
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
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
    const battleArmor = normalizeBattleArmorProfile(armorState?.battleArmor ?? item.system?.battleArmor);

    context.armorState = armorState;
    context.isActiveArmor = activeArmorId === item.id;
    context.battleArmorEnabled = isBattleArmorProfileEnabled(battleArmor);
    context.effectiveDurabilityCurrent = Number(
      armorState?.durability?.current
      ?? item.system?.durability?.current
      ?? item.system?.durability?.max
      ?? item.system?.rating
      ?? 0
    );
    context.effectiveDurabilityMax = Number(
      armorState?.durability?.max
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
    context.armorHeroStats = this._getHeroStats(armorState, battleArmor);
    context.itemSheet = { ...(context.itemSheet ?? {}) };
    context.itemSheet.summaryChips = this._getSummaryChips(armorState, battleArmor);
    context.armorEditor = {
      standardTraits: [...ARMOR_STANDARD_TRAITS]
    };

    return context;
  }

  _getBattleArmorStats(profile = {}) {
    const battleArmor = normalizeBattleArmorProfile(profile);
    return [
      {
        label: "Structure",
        value: formatPool(battleArmor.structure?.value, battleArmor.structure?.max)
      },
      {
        label: "Resist",
        value: String(getBattleArmorStructureResistance(battleArmor))
      },
      {
        label: "Armor Pool",
        value: formatPool(battleArmor.armorPool?.value, battleArmor.armorPool?.max)
      },
      {
        label: "State",
        value: formatBattleArmorState(battleArmor.state)
      }
    ];
  }

  _getHeroStats(activeArmorState = null, battleArmorProfile = null) {
    const system = this.item.system ?? {};
    const battleArmor = normalizeBattleArmorProfile(battleArmorProfile ?? activeArmorState?.battleArmor ?? system.battleArmor);
    if (isBattleArmorProfileEnabled(battleArmor)) return this._getBattleArmorStats(battleArmor);

    return [
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
      {
        label: "Resist",
        value: String(Number(activeArmorState?.baseMitigation ?? activeArmorState?.baseResistance ?? 0))
      },
      { label: "Defense", value: String(Number(system.defenseBonus ?? 0)) },
      {
        label: "Durability",
        value: formatPool(
          activeArmorState?.durability?.current ?? system.durability?.current ?? system.rating ?? 0,
          activeArmorState?.durability?.max ?? system.rating ?? 0
        )
      }
    ];
  }

  _getSummaryChips(activeArmorState = null, battleArmorProfile = null) {
    const system = this.item.system ?? {};
    const chips = this._getHeroStats(activeArmorState, battleArmorProfile);

    const availability = String(system.availability ?? "").trim();
    if (availability) chips.push({ label: "Avail", value: availability });

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
