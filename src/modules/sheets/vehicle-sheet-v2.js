// src/modules/sheets/vehicle-sheet-v2.js
// Purpose: Layout-driven AppV2 vehicle sheet.
// How it fits: Replaces the legacy vehicle template with the same staged-edit/layout pipeline used across the V2 sheets.

import { SYSTEM_NAME, TEMPLATES_PATH } from "../constants.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import { RollDialog } from "../roll/roll-dialog.js";
import {
  attributeFields,
  collectActorItemRecords,
  numberField,
  textField,
  textareaField,
} from "./actor-sheet-support.js";
import { BaseActorSheetV2 } from "./base-actor-sheet-v2.js";

function createSyntheticSkill({ name, attribute, value }) {
  return {
    name,
    system: {
      attribute,
      value: Math.max(0, Number(value ?? 0) || 0),
    }
  };
}

export class VehicleSheetV2 extends BaseActorSheetV2 {
  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/actor/vehicle-sheet.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["vehicle-sheet", SYSTEM_NAME, "actor-sheet-v2"],
      position: { width: 940, height: 880 },
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        rollVehicleQuickAction: VehicleSheetV2.prototype._onRollVehicleQuickAction,
      }
    });
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const actor = this.actor;
    const driverSnapshot = this.#getDriverSnapshot();

    context.layout = await LayoutRegistry.get("vehicle");
    context.actorSheet = {
      profileFields: [
        textField(actor, "system.category", "Category"),
        numberField(actor, "system.moves", "Move"),
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
        numberField(actor, "system.monitors.armor.value", "Armor"),
        numberField(actor, "system.monitors.armor.max", "Armor Max"),
        textField(actor, "system.mwd.status.state", "Status"),
        numberField(actor, "system.attacks", "Attacks"),
      ],
      crewFields: [
        numberField(actor, "system.mwd.crew.count", "Crew"),
        numberField(actor, "system.mwd.crew.effectiveCount", "Effective Crew"),
        numberField(actor, "system.mwd.crew.injuryLevel", "Crew Injury"),
        textField(actor, "system.crew", "Crew Notes"),
      ],
      snapshotFields: [
        textField(actor, "system.mwd.driverSnapshot.name", "Primary Driver", { value: driverSnapshot.name }),
        numberField(actor, "system.mwd.driverSnapshot.gunnery", "Gunnery", { value: driverSnapshot.gunnery }),
        numberField(actor, "system.mwd.driverSnapshot.piloting", "Piloting", { value: driverSnapshot.piloting }),
        numberField(actor, "system.mwd.driverSnapshot.perception", "Perception", { value: driverSnapshot.perception }),
        numberField(actor, "system.mwd.driverSnapshot.stealth", "Stealth", { value: driverSnapshot.stealth }),
        numberField(actor, "system.mwd.driverSnapshot.reflexes", "Reflexes", { value: driverSnapshot.reflexes }),
        numberField(actor, "system.mwd.driverSnapshot.intelligence", "Intelligence", { value: driverSnapshot.intelligence }),
      ],
      quickActions: [
        { label: "Defense", dataAction: "rollVehicleQuickAction", mode: "defense" },
        { label: "Sensors", dataAction: "rollVehicleQuickAction", mode: "sensors" },
        { label: "Stealth", dataAction: "rollVehicleQuickAction", mode: "stealth" },
        { label: "Initiative", dataAction: "rollVehicleQuickAction", mode: "initiative" },
      ],
      itemCollections: {
        skills: collectActorItemRecords(actor, {
          types: ["skill"],
          describe: item => `${item.system?.code ?? "skill"} | ${item.system?.attribute ?? ""} ${Number(item.system?.value ?? 0)}`,
        }),
        weapons: collectActorItemRecords(actor, {
          types: ["mechWeapon", "personalWeapon"],
          describe: item => `DV ${Number(item.system?.damage ?? 0)} | ${item.system?.damageType ?? ""}`,
        }),
        gear: collectActorItemRecords(actor, {
          // Vehicles do not need a separate consumable panel yet, but their
          // shared inventory list should still surface owned expendables.
          types: ["gear", "consumable", "assetModule"],
          describe: item => item.system?.category ?? item.type,
        }),
      },
      notesField: textareaField(actor, "system.description", "Description", { rows: 12 }),
    };

    return context;
  }

  async _onRollVehicleQuickAction(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const mode = String(target?.dataset?.mode ?? "").trim();
    const snapshot = this.#getDriverSnapshot();

    switch (mode) {
      case "defense":
        return this.#rollDriverSnapshotSkill({
          title: "Vehicle Defense",
          attribute: "handling",
          rating: snapshot.piloting,
        });
      case "sensors":
        return this.#rollDriverSnapshotSkill({
          title: "Vehicle Sensors",
          attribute: "system",
          rating: snapshot.perception,
        });
      case "stealth":
        return this.#rollDriverSnapshotSkill({
          title: "Vehicle Stealth",
          attribute: "handling",
          rating: snapshot.stealth,
        });
      case "initiative":
        return this.#rollDriverSnapshotInitiative(snapshot);
      default:
        return null;
    }
  }

  #getDriverSnapshot() {
    const snapshot = this.actor.system?.mwd?.driverSnapshot ?? {};
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

  async #rollDriverSnapshotSkill({ title, attribute, rating }) {
    const skill = createSyntheticSkill({ name: title, attribute, value: rating });
    await RollDialog.rollSkill(this.actor, skill);
  }

  async #rollDriverSnapshotInitiative(snapshot) {
    const roll = await (new Roll("2d6 + @ref + @int", {
      ref: snapshot.reflexes,
      int: snapshot.intelligence,
    })).evaluate({ async: true });

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor, token: this.getSheetTokenDocument()?.object ?? this.getSheetTokenDocument() }),
      flavor: "Vehicle Initiative"
    });
  }
}
