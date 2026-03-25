import { WeaponItemSheet } from "./weapon-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";
import { getPersonalDamageTypeLabel } from "../mwd/personal-damage.js";

/**
 * Personal-scale weapon item sheet (AppV2).
 * Same logic as WeaponItemSheet, but with a hardcoded template.
 */
export class PersonalWeaponItemSheet extends WeaponItemSheet {
  static LAYOUT_ID = "personal-weapon";

  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      position: {
        width: 680,
        height: 720
      },
      window: {
        ...super.DEFAULT_OPTIONS.window,
        minWidth: 480,
        minHeight: 480,
        maxWidth: 960
      },
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        attackWeapon: PersonalWeaponItemSheet._onAttackWeapon
      }
    }, { inplace: false });
  }

  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/personal-weapon-root.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const actor = this.item.actor ?? null;
    const canAttack = Boolean(
      actor
      && typeof actor.isCharacterLike === "function"
      && actor.isCharacterLike()
      && this.item.isPersonalWeapon?.()
    );

    context.itemSheet = foundry.utils.mergeObject(context.itemSheet ?? {}, {
      canAttack,
      attackDisabled: !canAttack || !Boolean(this.item.system?.equipped)
    });
    context.itemSheet.summaryChips = this._getSummaryChips(context.weaponProfile ?? null);

    return context;
  }

  _getSummaryChips(profile = this.item.getCombatProfile?.() ?? null) {
    if (!profile) return [];

    return [
      { label: "Category", value: String(profile.category ?? "").trim() || "Ranged" },
      { label: "Skill", value: profile.skillDef?.label ?? profile.skill ?? "Firearms" },
      { label: "DV", value: String(Number(profile.damage ?? 0)) },
      { label: "AP", value: String(Number(profile.ap ?? 0)) },
      { label: "Type", value: getPersonalDamageTypeLabel(profile.damageType) || "Penetrating" },
      { label: "Range", value: String(profile.range?.max ?? "near").trim() || "Near" }
    ];
  }

  static async _onAttackWeapon(event) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const actor = this.item.actor ?? null;
    if (!actor || !this.item.isPersonalWeapon?.()) return;

    await game.mwd.roll.execute({
      actor,
      payload: {
        intent: "attack",
        weaponId: this.item.id,
        edge: { pool: "physical.grit", allowed: ["pre", "post"] },
        tags: ["combat", "attack"]
      },
      event
    });
  }
}
