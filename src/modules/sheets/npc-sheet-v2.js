// src/modules/sheets/npc-sheet-v2.js
// Purpose: Layout-driven AppV2 NPC sheet.
// How it fits: Brings NPCs onto the same shell, preload, and context-shaping path as the character sheet.

import { SYSTEM_NAME, TEMPLATES_PATH } from "../constants.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import {
  attributeFields,
  collectActorItemRecords,
  numberField,
  textField,
  textareaField,
} from "./actor-sheet-support.js";
import { BaseActorSheetV2 } from "./base-actor-sheet-v2.js";

export class NpcSheetV2 extends BaseActorSheetV2 {
  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/actor/npc-sheet.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", SYSTEM_NAME, "actor-sheet-v2"],
      position: { width: 920, height: 860 }
    }, { inplace: false });
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const actor = this.actor;

    context.layout = await LayoutRegistry.get("npc");
    context.actorSheet = {
      profileFields: [
        textField(actor, "system.role", "Role / Archetype")
      ],
      attributeFields: attributeFields(actor, [
        { key: "strength", label: "Strength" },
        { key: "reflexes", label: "Reflexes" },
        { key: "intelligence", label: "Intelligence" },
        { key: "willpower", label: "Willpower" },
        { key: "charisma", label: "Charisma" },
        { key: "edge", label: "Edge" },
      ]),
      monitorFields: [
        numberField(actor, "system.monitors.physical.value", "Physical"),
        numberField(actor, "system.monitors.physical.max", "Physical Max"),
        numberField(actor, "system.monitors.fatigue.value", "Fatigue"),
        numberField(actor, "system.monitors.fatigue.max", "Fatigue Max"),
        numberField(actor, "system.monitors.armor.value", "Armor"),
        textField(actor, "system.monitors.armor.effect", "Armor Effect"),
      ],
      itemCollections: {
        traits: collectActorItemRecords(actor, {
          types: ["quality"],
          describe: item => item.system?.category ?? "",
        }),
        weapons: collectActorItemRecords(actor, {
          types: ["personalWeapon"],
          supportsEquip: true,
          supportsPrimary: true,
          describe: item => `${item.system?.category ?? "ranged"} | DV ${Number(item.system?.damage ?? 0)}`,
        }),
        assetModules: collectActorItemRecords(actor, {
          types: ["assetModule"],
          describe: item => `Level ${Number(item.system?.level ?? 1)}`,
        }),
        inventory: collectActorItemRecords(actor, {
          // Consumables share the same quantity-driven row contract as gear on
          // lightweight actor sheets, so we present them in one inventory list.
          types: ["gear", "consumable"],
          describe: item => `Qty ${Number(item.system?.quantity ?? 1)} | Rating ${Number(item.system?.rating ?? 0)}`,
        }),
      },
      notesField: textareaField(actor, "system.biography", "Notes", { rows: 12 }),
    };

    return context;
  }
}
