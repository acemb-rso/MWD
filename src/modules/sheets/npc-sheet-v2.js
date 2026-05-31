// src/modules/sheets/npc-sheet-v2.js
// Purpose: Layout-driven AppV2 NPC sheet.
// How it fits: Brings NPCs onto the same shell, preload, and context-shaping path as the character sheet.

import { SYSTEM_NAME, TEMPLATES_PATH } from "../constants.js";
import { MWD } from "../config.js";
import { buildCombatAwarenessPreview } from "../combat/combat-awareness-preview.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import {
  attributeFields,
  buildPersonalActiveCriticalsContext,
  buildPersonalCombatDashboardContext,
  buildPersonalConditionMonitors,
  buildPersonalInventoryContext,
  textField,
} from "./actor-sheet-support.js";
import { BaseActorSheetV2 } from "./base-actor-sheet-v2.js";

const ARMOR_MODIFIER_LABELS = MWD.mwd.armorMitigationType;
const GEAR_CATEGORY_LABELS = MWD.item.gear.categoryLabels;
const CONSUMABLE_CATEGORY_LABELS = MWD.item.consumable.categoryLabels;

function filterVisibleNpcSkills(skillsDisplay = {}, { editing = false } = {}) {
  if (editing) return skillsDisplay;

  const keepRated = skill => Number(skill?.rating ?? 0) !== 0;
  return {
    ...skillsDisplay,
    left: (skillsDisplay.left ?? []).filter(keepRated),
    right: (skillsDisplay.right ?? []).filter(keepRated),
  };
}

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
    const sheetToken = this.getSheetTokenDocument?.() ?? null;

    context.layout = await LayoutRegistry.get("npc");
    if (Number(context.layout?.version ?? 0) <= 0) {
      throw new Error("MWD NPC sheet layout failed to load.");
    }

    context.conditionMonitors = buildPersonalConditionMonitors(actor, {
      editable: this.isEditable,
    });

    const combatSnapshot = PersonalCombatTracker.getSnapshot(actor, { token: sheetToken });
    context.combatDashboard = buildPersonalCombatDashboardContext(combatSnapshot, { actor });
    context.activePersonalCriticals = buildPersonalActiveCriticalsContext(actor);
    context.combatActions = this._buildCombatActionsContext(
      PersonalCombatTracker.buildActionModel(actor, combatSnapshot)
    );
    context.combatAwarenessPreview = buildCombatAwarenessPreview(actor, {
      sourceToken: sheetToken,
    });
    context.skillsDisplay = filterVisibleNpcSkills(context.skillsDisplay, {
      editing: this.editing,
    });

    context.personalInventory = buildPersonalInventoryContext(actor, {
      items: context.items,
      isEditable: this.isEditable,
      isExpanded: accordionId => this._isInventoryRowExpanded(accordionId),
      inventoryAccordionId: (section, itemId) => this._inventoryAccordionId(section, itemId),
      armorModifierLabels: ARMOR_MODIFIER_LABELS,
      gearCategoryLabels: GEAR_CATEGORY_LABELS,
      consumableCategoryLabels: CONSUMABLE_CATEGORY_LABELS,
    });

    context.actorSheet = {
      profileFields: [
        textField(actor, "system.role", "Role / Archetype")
      ],
      attributeFields: attributeFields(actor, [
        { key: "strength", label: "Strength" },
        { key: "reflexes", label: "Reflexes" },
        { key: "intelligence", label: "Intelligence" },
        { key: "guts", label: "Guts" },
        { key: "charisma", label: "Charisma" },
        { key: "edge", label: "Edge" },
      ]),
    };

    return context;
  }
}
