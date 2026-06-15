// src/modules/item/lifemodule-item-sheet.js
// Purpose: Provides the catalog-driven UI for life module items.
// How it fits: Lets owned actor life modules reference canonical catalog definitions and chosen skill bonuses.

import { BaseItemSheet } from "./base-item-sheet.js";
import { TEMPLATES_PATH } from "../core/constants.js";
import {
  describeLifeModuleChoice,
  evaluateActorLifeModules,
  getLifeModuleCatalogEntry,
  getLifeModuleGrantSelectionFields,
  getLifeModuleResolvedGrantChoices,
  getLifeModuleTypeLabel,
  listLifeModuleCatalogEntriesByType,
  listLifeModuleTypes,
  normalizeLifeModuleItemSystem,
} from "../mwd/life-modules.js";

export class LifeModuleItemSheet extends BaseItemSheet {
  static LAYOUT_ID = "life-module";

  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/lifeModule.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      position: {
        width: 640,
        height: 620
      },
      window: {
        ...super.DEFAULT_OPTIONS.window,
        minWidth: 560,
        minHeight: 480
      }
    }, { inplace: false });
  }

  _getTabs() {
    return {
      main: { id: "main", group: "primary", label: "Details" }
    };
  }

  _getSummaryChips() {
    const system = normalizeLifeModuleItemSystem(this.item.system ?? {});
    const entry = getLifeModuleCatalogEntry(system.catalogId);
    const resolvedChoices = getLifeModuleResolvedGrantChoices(entry, system.selectedGrants, { legacySelectedSkill: system.selectedSkill })
      .map(grant => grant.choice)
      .filter(Boolean);
    const selectedBonusLabel = resolvedChoices
      .map(choice => describeLifeModuleChoice(choice, { includeBonusText: true }))
      .join(", ");
    const actorState = this.item.actor
      ? evaluateActorLifeModules(this.item.actor).stateByItemId.get(this.item.id) ?? null
      : null;

    return [
      { label: "Slot", value: getLifeModuleTypeLabel(system.moduleType) },
      { label: "Module", value: entry?.label ?? "Unlinked" },
      { label: "Bonuses", value: selectedBonusLabel || "Pending choice" },
      actorState
        ? { label: "Status", value: actorState.isActive ? "Active" : "Inactive" }
        : null
    ].filter(Boolean);
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const system = normalizeLifeModuleItemSystem(this.item.system ?? {});
    const moduleType = system.moduleType;
    const catalogEntry = getLifeModuleCatalogEntry(system.catalogId);
    const availableEntries = moduleType ? listLifeModuleCatalogEntriesByType(moduleType) : [];
    const grantFields = getLifeModuleGrantSelectionFields(catalogEntry, system.selectedGrants, { legacySelectedSkill: system.selectedSkill });
    const actorState = this.item.actor
      ? evaluateActorLifeModules(this.item.actor).stateByItemId.get(this.item.id) ?? null
      : null;

    context.lifeModuleEditor = {
      moduleType,
      moduleTypeLabel: getLifeModuleTypeLabel(moduleType),
      moduleTypes: listLifeModuleTypes().map(option => ({
        ...option,
        selected: option.value === moduleType
      })),
      availableEntries: availableEntries.map(entry => ({
        id: entry.id,
        label: entry.label,
        selected: entry.id === system.catalogId
      })),
      hasAvailableEntries: availableEntries.length > 0,
      selectedEntry: catalogEntry,
      selectedGrants: system.selectedGrants,
      grantFields,
      requiresAnyLabels: (catalogEntry?.requiresAny ?? []).map(id => getLifeModuleCatalogEntry(id)?.label ?? id),
      excludesAnyLabels: (catalogEntry?.excludesAny ?? []).map(id => getLifeModuleCatalogEntry(id)?.label ?? id),
      actorState,
      warningLabels: [...(actorState?.warningLabels ?? [])],
      isOwned: Boolean(this.item.actor),
      statusLabel: actorState ? (actorState.isActive ? "Active" : "Inactive") : (catalogEntry ? "Configured" : "Unlinked"),
      statusReason: actorState?.inactiveReason ?? ""
    };

    return context;
  }
}
