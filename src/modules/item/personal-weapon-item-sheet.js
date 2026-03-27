// src/modules/item/personal-weapon-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


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
        minWidth: 680,
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
      { label: "Range", value: String(profile.range?.max ?? "near").trim() || "Near" },
      profile?.ammoState?.isTracked
        ? { label: "Ammo", value: `${Number(profile.ammoState.current ?? 0)}/${Number(profile.ammoState.max ?? 0)}` }
        : { label: "Ammo", value: profile?.ammoLabel || "Untracked" }
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
        ammoTypeId: this.item.system?.ammo?.activeTypeId ?? "",
        edge: { pool: "physical.grit", allowed: ["pre", "post"] },
        tags: ["combat", "attack"]
      },
      event
    });
  }

  _onRender(context, options) {
    super._onRender?.(context, options);

    const root = this._getRootElement?.();
    if (!root) return;

    root.querySelectorAll(".mwd-standard-trait-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void this.item.createWeaponStandardTrait?.();
      });
    });

    root.querySelectorAll(".mwd-standard-trait-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void this.item.deleteWeaponStandardTrait?.(button.dataset.traitId);
      });
    });

    root.querySelectorAll(".mwd-standard-trait-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        void this.item.updateWeaponStandardTrait?.(
          field.dataset.traitId,
          field.dataset.field,
          field.value
        );
      });
    });

    root.querySelectorAll(".mwd-ammo-type-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void this.item.createAmmoType?.();
      });
    });

    root.querySelectorAll(".mwd-ammo-type-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void this.item.deleteAmmoType?.(button.dataset.ammoTypeId);
      });
    });

    root.querySelectorAll(".mwd-ammo-type-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        void this.item.updateAmmoType?.(
          field.dataset.ammoTypeId,
          field.dataset.field,
          field.value
        );
      });
    });

    root.querySelectorAll(".mwd-ammo-type-standard-trait-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void this.item.createAmmoTypeStandardTrait?.(button.dataset.ammoTypeId);
      });
    });

    root.querySelectorAll(".mwd-ammo-type-standard-trait-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void this.item.deleteAmmoTypeStandardTrait?.(button.dataset.ammoTypeId, button.dataset.traitId);
      });
    });

    root.querySelectorAll(".mwd-ammo-type-standard-trait-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        void this.item.updateAmmoTypeStandardTrait?.(
          field.dataset.ammoTypeId,
          field.dataset.traitId,
          field.dataset.field,
          field.value
        );
      });
    });
  }
}
