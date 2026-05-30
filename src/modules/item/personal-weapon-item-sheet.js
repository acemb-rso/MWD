// src/modules/item/personal-weapon-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { WeaponItemSheet } from "./weapon-item-sheet.js";
import { TEMPLATES_PATH } from "../constants.js";
import { getPersonalDamageTypeLabel } from "../mwd/personal-damage.js";
import { launchOwnedWeaponAttack } from "../roll/weapon-attack-actions.js";

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
        attackWeapon: PersonalWeaponItemSheet._onAttackWeapon,
        reloadWeaponPayload: PersonalWeaponItemSheet._onReloadWeaponPayload,
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
    const profile = context.weaponProfile ?? null;
    const canAttack = Boolean(
      actor
      && typeof actor.isCharacterLike === "function"
      && actor.isCharacterLike()
      && this.item.isPersonalWeapon?.()
    );

    context.itemSheet = {
      ...(context.itemSheet ?? {}),
      canAttack,
      attackDisabled: !canAttack || !Boolean(this.item.system?.equipped)
    };
    context.itemSheet.summaryChips = this._getSummaryChips(profile);
    context.itemSheet.reloadState = this._getReloadDisplayState(profile);

    return context;
  }

  _getReloadDisplayState(profile = this.item.getCombatProfile?.() ?? null) {
    const reloadState = this.item.canReloadActivePayload?.({ detailed: true }) ?? { canReload: false, reason: "" };
    const tracked = Boolean(profile?.sourceState?.isTracked);
    const payloadLabel = String(profile?.payloadLabel ?? reloadState?.payloadLabel ?? "").trim() || "Unloaded";
    const current = Number(profile?.sourceState?.current ?? reloadState?.current ?? 0) || 0;
    const max = Number(profile?.sourceState?.max ?? reloadState?.max ?? 0) || 0;
    const value = tracked ? `${payloadLabel} ${current}/${max}` : payloadLabel;
    const hint = reloadState.canReload
      ? "Click to reload"
      : (String(reloadState.reason ?? "").trim() || "Payload read-only");

    return {
      canReload: Boolean(reloadState.canReload),
      disabled: !reloadState.canReload,
      value,
      hint,
      title: reloadState.canReload
        ? `Reload ${payloadLabel}`
        : hint,
    };
  }

  _getSummaryChips(profile = this.item.getCombatProfile?.() ?? null) {
    if (!profile) return [];

    const chips = [
      { label: "Category", value: String(profile.category ?? "").trim() || "Ranged" },
      { label: "Skill", value: profile.skillDef?.label ?? profile.skill ?? "Firearms" },
      { label: "DV", value: String(Number(profile.damage ?? 0)) },
      { label: "AP", value: String(Number(profile.ap ?? 0)) },
      { label: "Type", value: getPersonalDamageTypeLabel(profile.damageType) || "Penetrating" },
      { label: "Track", value: profile.damageTrack === "fatigue" ? "Fatigue" : "Physical" },
      { label: "Range", value: String(profile.range?.max ?? "near").trim() || "Near" },
    ];

    if (String(profile.category ?? "").trim().toLowerCase() !== "melee") {
      chips.push(profile?.sourceState?.isTracked
        ? { label: "Payload", value: `${profile?.payloadLabel || "Unloaded"} (${Number(profile.sourceState.current ?? 0)}/${Number(profile.sourceState.max ?? 0)})` }
        : { label: "Payload", value: profile?.payloadLabel || "Unloaded" });
    }

    if (String(profile.availability ?? "").trim()) {
      chips.push({ label: "Avail", value: String(profile.availability).trim() });
    }

    return chips;
  }

  static async _onAttackWeapon(event) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const actor = this.item.actor ?? null;
    if (!actor || !this.item.isPersonalWeapon?.()) return;

    await launchOwnedWeaponAttack({ weapon: this.item, event });
  }

  static async _onReloadWeaponPayload(event) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.item?.isPersonalWeapon?.()) return;

    this._captureScrollPositions?.();
    const result = await this.item.reloadActivePayload?.();
    if (!result?.ok) {
      ui.notifications?.warn(result?.reason ?? "Unable to reload that weapon.");
    }
  }

  _onRender(context, options) {
    super._onRender?.(context, options);

    const root = this._getRootElement?.();
    if (!root) return;
  }
}
