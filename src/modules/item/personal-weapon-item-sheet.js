// src/modules/item/personal-weapon-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { WeaponItemSheet } from "./weapon-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";
import { getPersonalDamageTypeLabel } from "../mwd/personal-damage.js";
import { notifyRollError } from "../roll/roll-errors.js";

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

    const chips = [
      { label: "Category", value: String(profile.category ?? "").trim() || "Ranged" },
      { label: "Skill", value: profile.skillDef?.label ?? profile.skill ?? "Firearms" },
      { label: "DV", value: String(Number(profile.damage ?? 0)) },
      { label: "AP", value: String(Number(profile.ap ?? 0)) },
      { label: "Type", value: getPersonalDamageTypeLabel(profile.damageType) || "Penetrating" },
      { label: "Range", value: String(profile.range?.max ?? "near").trim() || "Near" },
    ];

    if (String(profile.category ?? "").trim().toLowerCase() !== "melee") {
      chips.push(profile?.sourceState?.isTracked
        ? { label: "Payload", value: `${profile?.payloadLabel || "Unloaded"} (${Number(profile.sourceState.current ?? 0)}/${Number(profile.sourceState.max ?? 0)})` }
        : { label: "Payload", value: profile?.payloadLabel || "Unloaded" });
    }

    return chips;
  }

  static async _onAttackWeapon(event) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const actor = this.item.actor ?? null;
    if (!actor || !this.item.isPersonalWeapon?.()) return;

    try {
      await game.mwd.roll.execute({
        actor,
        payload: {
          intent: "attack",
          weaponId: this.item.id,
          payloadId: this.item.system?.selectedPayloadId ?? "",
          edge: { pool: "physical.grit", allowed: ["pre", "post"] },
          tags: ["combat", "attack"]
        },
        event
      });
    } catch (error) {
      console.error("MWD | Failed to launch weapon sheet attack", error);
      notifyRollError(error, "Unable to attack with that weapon.");
    }
  }

  _onRender(context, options) {
    super._onRender?.(context, options);

    const root = this._getRootElement?.();
    if (!root) return;
    const preserveScroll = (work) => {
      this._captureScrollPositions?.();
      return work();
    };

    root.querySelectorAll(".mwd-payload-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void preserveScroll(() => this.item.createPayload?.());
      });
    });

    root.querySelectorAll(".mwd-payload-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void preserveScroll(() => this.item.deletePayload?.(button.dataset.payloadId));
      });
    });

    root.querySelectorAll(".mwd-payload-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        void preserveScroll(() => this.item.updatePayloadField?.(
          field.dataset.payloadId,
          field.dataset.field,
          field.value
        ));
      });
    });

    root.querySelectorAll(".mwd-source-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void preserveScroll(() => this.item.createConsumptionSource?.());
      });
    });

    root.querySelectorAll(".mwd-source-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        void preserveScroll(() => this.item.deleteConsumptionSource?.(button.dataset.sourceId));
      });
    });

    root.querySelectorAll(".mwd-source-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        void preserveScroll(() => this.item.updateConsumptionSourceField?.(
          field.dataset.sourceId,
          field.dataset.field,
          field.value
        ));
      });
    });

    root.querySelectorAll(".mwd-capability-picker").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        const selected = String(field.value ?? "").trim();
        if (!selected) return;

        const current = String(field.dataset.values ?? "")
          .split(",")
          .map(entry => entry.trim())
          .filter(Boolean);
        const next = Array.from(new Set([...current, selected]));
        field.value = "";

        const payloadId = String(field.dataset.payloadId ?? "").trim();
        const targetField = String(field.dataset.field ?? "").trim();
        if (!targetField) return;

        if (payloadId) {
          void preserveScroll(() => this.item.updatePayloadField?.(payloadId, targetField, next.join(", ")));
          return;
        }

        void preserveScroll(() => this.item.update({ [targetField]: next }));
      });
    });
  }
}
