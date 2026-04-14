// src/modules/sheets/battlemech-sheet-v2.js
// Purpose: Layout-driven AppV2 battlemech sheet with V2-safe quick-action and loadout editing hooks.
// How it fits: Replaces the legacy mech sheet listeners while keeping the existing loadout rules and quick-action affordances available.

import { SYSTEM_NAME, TEMPLATES_PATH } from "../constants.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import { BattlemechLoadout } from "../mwd/battlemech-loadout.js";
import { getSkillDef } from "../mwd/skills.js";
import { RollDialog } from "../roll/roll-dialog.js";
import {
  attributeFields,
  collectActorItemRecords,
  numberField,
  selectField,
  textField,
  textareaField,
} from "./actor-sheet-support.js";
import { BaseActorSheetV2 } from "./base-actor-sheet-v2.js";

const WEIGHT_CLASS_OPTIONS = [
  { value: "light", label: "Light" },
  { value: "medium", label: "Medium" },
  { value: "heavy", label: "Heavy" },
  { value: "assault", label: "Assault" },
];

function createFallbackSkill(code) {
  const skillDef = getSkillDef(code);
  return {
    name: skillDef?.label ?? code,
    system: {
      code,
      attribute: skillDef?.attribute ?? "handling",
      value: 0,
    }
  };
}

export class BattlemechSheetV2 extends BaseActorSheetV2 {
  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/actor/battlemech-sheet.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["battlemech-sheet", SYSTEM_NAME, "actor-sheet-v2"],
      position: { width: 980, height: 900 },
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        rollBattlemechQuickAction: BattlemechSheetV2.prototype._onRollBattlemechQuickAction,
        addHardpoint: BattlemechSheetV2.prototype._onAddHardpoint,
        deleteHardpoint: BattlemechSheetV2.prototype._onDeleteHardpoint,
        addWeaponGroup: BattlemechSheetV2.prototype._onAddWeaponGroup,
        deleteWeaponGroup: BattlemechSheetV2.prototype._onDeleteWeaponGroup,
        togglePrimaryWeaponGroup: BattlemechSheetV2.prototype._onTogglePrimaryWeaponGroup,
      }
    });
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const actor = this.actor;
    const loadout = new BattlemechLoadout(actor).compute();
    const snapshot = this.#getPilotSnapshot();

    context.layout = await LayoutRegistry.get("battlemech");
    context.actorSheet = {
      profileFields: [
        selectField(actor, "system.mwd.weightClass", "Weight Class", WEIGHT_CLASS_OPTIONS),
        numberField(actor, "system.mwd.tonnage", "Tonnage"),
        textField(actor, "system.mwd.chassis", "Chassis"),
      ],
      attributeFields: attributeFields(actor, [
        { key: "handling", label: "Handling" },
        { key: "system", label: "System" },
        { key: "condition", label: "Condition" },
        { key: "chassis", label: "Chassis" },
      ]),
      monitorFields: [
        numberField(actor, "system.monitors.structure.value", "Structure"),
        numberField(actor, "system.monitors.structure.max", "Structure Max"),
        numberField(actor, "system.monitors.heat.value", "Heat"),
        numberField(actor, "system.monitors.heat.max", "Heat Max"),
        numberField(actor, "system.mwd.heat.thresholds.runningHot", "Running Hot"),
        numberField(actor, "system.mwd.heat.thresholds.shutdown", "Shutdown"),
      ],
      mountFields: [
        textField(actor, "system.mwd.primarySlot.mode", "Primary Slot Mode"),
        numberField(actor, "system.mwd.melee.maxWeapons", "Melee Limit"),
        textField(actor, "system.mwd.primarySlot.typeRestriction", "Primary Type Restriction"),
        numberField(actor, "system.mwd.loadout.mountPoints.total", "Mount Points", { value: loadout.mountPoints.total, readOnly: true, displayValue: loadout.mountPoints.total }),
        numberField(actor, "system.mwd.loadout.mountPoints.used", "Used", { value: loadout.mountPoints.used, readOnly: true, displayValue: loadout.mountPoints.used }),
        numberField(actor, "system.mwd.loadout.mountPoints.remaining", "Remaining", { value: loadout.mountPoints.remaining, readOnly: true, displayValue: loadout.mountPoints.remaining }),
      ],
      snapshotFields: [
        textField(actor, "system.mwd.pilotSnapshot.name", "Operator Name", { value: snapshot.name }),
        numberField(actor, "system.mwd.pilotSnapshot.gunnery", "Gunnery", { value: snapshot.gunnery }),
        numberField(actor, "system.mwd.pilotSnapshot.piloting", "Piloting", { value: snapshot.piloting }),
        numberField(actor, "system.mwd.pilotSnapshot.perception", "Perception", { value: snapshot.perception }),
        numberField(actor, "system.mwd.pilotSnapshot.stealth", "Stealth", { value: snapshot.stealth }),
        numberField(actor, "system.mwd.pilotSnapshot.reflexes", "Reflexes", { value: snapshot.reflexes }),
        numberField(actor, "system.mwd.pilotSnapshot.intelligence", "Intelligence", { value: snapshot.intelligence }),
      ],
      quickActions: [
        { label: "Ranged Attack", dataAction: "rollBattlemechQuickAction", mode: "ranged" },
        { label: "Melee Attack", dataAction: "rollBattlemechQuickAction", mode: "melee" },
        { label: "Dodge", dataAction: "rollBattlemechQuickAction", mode: "dodge" },
        { label: "Piloting", dataAction: "rollBattlemechQuickAction", mode: "piloting" },
        { label: "Sensors", dataAction: "rollBattlemechQuickAction", mode: "sensors" },
        { label: "Repair", dataAction: "rollBattlemechQuickAction", mode: "repair" },
      ],
      itemCollections: {
        weapons: collectActorItemRecords(actor, {
          types: ["mechWeapon"],
          describe: item => `${item.system?.hardpointType ?? "energy"} ${item.system?.hardpointSize ?? "small"} | DV ${Number(item.system?.damage ?? 0)}`,
        }),
      },
      notesField: textareaField(actor, "system.description", "Description", { rows: 12 }),
    };

    context.battlemechSheet = {
      loadout,
      hardpoints: (loadout.hardpoints ?? []).map((hardpoint, index) => ({
        ...hardpoint,
        index,
        occupiedByName: hardpoint.occupiedByName ?? "Free",
      })),
      weaponGroups: (loadout.weaponGroups ?? []).map((group, index) => ({
        ...group,
        index,
        weaponIdsText: Array.isArray(group.weaponIds) ? group.weaponIds.join(", ") : "",
      })),
    };

    return context;
  }

  _onRender(context, options) {
    super._onRender?.(context, options);

    const root = this._getRootElement?.();
    if (!root || !this.editing) return;

    // Array-backed weapon group ids need manual parsing because the staged form
    // collector only understands scalar fields.
    root.querySelectorAll("[data-weapon-group-input='weaponIds']").forEach(input => {
      input.addEventListener("change", event => {
        const field = event.currentTarget;
        const index = Number(field?.dataset?.groupIndex ?? -1);
        if (!Number.isInteger(index) || index < 0) return;
        const values = String(field.value ?? "")
          .split(",")
          .map(value => value.trim())
          .filter(Boolean);

        void this.actor.update({
          [`system.mwd.weaponGroups.${index}.weaponIds`]: values
        });
      });
    });
  }

  async _onRollBattlemechQuickAction(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const mode = String(target?.dataset?.mode ?? "").trim();
    switch (mode) {
      case "ranged":
        return this.#rollSkill("gunnery");
      case "melee":
        return this.#rollSkill("meleeCombat");
      case "dodge":
      case "piloting":
        return this.#rollSkill("piloting");
      case "sensors":
        return this.#rollSkill("perception");
      case "repair":
        return this.#rollSkill("technician");
      default:
        return null;
    }
  }

  async _onAddHardpoint(event) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.isEditable || !this.editing) return;

    const hardpoints = foundry.utils.deepClone(this.actor.system?.mwd?.hardpoints ?? []);
    hardpoints.push({
      id: foundry.utils.randomID(),
      type: "energy",
      size: "small",
      location: "arm",
    });

    await this.actor.update({ "system.mwd.hardpoints": hardpoints });
    this.render({ force: true });
  }

  async _onDeleteHardpoint(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.isEditable || !this.editing) return;

    const index = Number(target?.dataset?.hardpointIndex ?? -1);
    if (!Number.isInteger(index) || index < 0) return;

    const hardpoints = foundry.utils.deepClone(this.actor.system?.mwd?.hardpoints ?? []);
    hardpoints.splice(index, 1);
    await this.actor.update({ "system.mwd.hardpoints": hardpoints });
    this.render({ force: true });
  }

  async _onAddWeaponGroup(event) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.isEditable || !this.editing) return;

    const weaponGroups = foundry.utils.deepClone(this.actor.system?.mwd?.weaponGroups ?? []);
    weaponGroups.push({
      id: foundry.utils.randomID(),
      name: `Weapon Group ${weaponGroups.length + 1}`,
      weaponIds: [],
      isPrimary: weaponGroups.length === 0,
    });

    await this.actor.update({ "system.mwd.weaponGroups": weaponGroups });
    this.render({ force: true });
  }

  async _onDeleteWeaponGroup(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.isEditable || !this.editing) return;

    const index = Number(target?.dataset?.groupIndex ?? -1);
    if (!Number.isInteger(index) || index < 0) return;

    const weaponGroups = foundry.utils.deepClone(this.actor.system?.mwd?.weaponGroups ?? []);
    weaponGroups.splice(index, 1);
    await this.actor.update({ "system.mwd.weaponGroups": weaponGroups });
    this.render({ force: true });
  }

  async _onTogglePrimaryWeaponGroup(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.isEditable || !this.editing) return;

    const index = Number(target?.dataset?.groupIndex ?? -1);
    if (!Number.isInteger(index) || index < 0) return;

    const weaponGroups = foundry.utils.deepClone(this.actor.system?.mwd?.weaponGroups ?? []);
    weaponGroups.forEach((group, groupIndex) => {
      group.isPrimary = groupIndex === index;
    });

    await this.actor.update({ "system.mwd.weaponGroups": weaponGroups });
    this.render({ force: true });
  }

  #getPilotSnapshot() {
    const snapshot = this.actor.system?.mwd?.pilotSnapshot ?? {};
    return {
      name: String(snapshot.name ?? "").trim(),
      gunnery: Number(snapshot.gunnery ?? 0) || 0,
      piloting: Number(snapshot.piloting ?? 0) || 0,
      perception: Number(snapshot.perception ?? 0) || 0,
      stealth: Number(snapshot.stealth ?? 0) || 0,
      reflexes: Number(snapshot.reflexes ?? 0) || 0,
      intelligence: Number(snapshot.intelligence ?? 0) || 0,
    };
  }

  #resolveSkill(code) {
    return this.actor.items.find(item => (item.canonicalType ?? item.type) === "skill" && item.system?.code === code)
      ?? createFallbackSkill(code);
  }

  async #rollSkill(code) {
    await RollDialog.rollSkill(this.actor, this.#resolveSkill(code));
  }
}
