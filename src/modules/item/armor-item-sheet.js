import { BaseItemSheet } from "./base-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";

export class ArmorItemSheet extends BaseItemSheet {
  static LAYOUT_ID = "armor";

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
    const armorState = loadout?.activeArmor?.id === item.id ? loadout.activeArmor : null;

    context.armorState = armorState;
    context.isActiveArmor = activeArmorId === item.id;
    context.effectiveDurabilityCurrent = Number(
      armorState?.durability?.current
      ?? item.system?.durability?.current
      ?? item.system?.durability?.max
      ?? item.system?.rating
      ?? 0
    );
    context.itemSheet = foundry.utils.mergeObject(context.itemSheet ?? {}, {});
    context.itemSheet.summaryChips = this._getSummaryChips(armorState);

    return context;
  }

  _getSummaryChips(activeArmorState = null) {
    const system = this.item.system ?? {};
    return [
      { label: "Rating", value: String(Number(activeArmorState?.ratingCurrent ?? system.rating ?? 0)) },
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
  }
}
