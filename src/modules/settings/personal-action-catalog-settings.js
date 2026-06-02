// src/modules/settings/personal-action-catalog-settings.js
// Purpose: Defines the reusable collection-editor configuration for personal combat actions.
// How it fits: Registered by system settings to expose the action economy catalog in Configure Game Settings.

import {
  getDefaultPersonalActionCatalog,
  normalizePersonalActionCatalog,
  PERSONAL_ACTION_CATEGORY_OPTIONS,
  PERSONAL_ACTION_COST_RESOURCE_OPTIONS,
  PERSONAL_ACTION_IMPLEMENTATION_OPTIONS,
  PERSONAL_ACTION_PROMPT_OPTIONS,
  PERSONAL_ACTION_RESOLVER_OPTIONS,
  SETTING_PERSONAL_ACTION_CATALOG,
} from "../combat/personal-action-catalog.js";
import { createSettingsCollectionValidationError, registerSettingsCollectionEditor } from "./collection-editor.js";

const MENU_KEY = "personalActionCatalogEditor";

const BOOLEAN_OPTIONS = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" }
]);

function rowsToCatalog(rows = []) {
  try {
    return normalizePersonalActionCatalog((Array.isArray(rows) ? rows : []).map(row => ({
      id: String(row?.id ?? ""),
      label: String(row?.label ?? ""),
      category: String(row?.category ?? ""),
      cost: {
        resource: String(row?.costResource ?? "sa"),
        value: String(row?.costValue ?? "1"),
      },
      resolver: String(row?.resolver ?? "action"),
      prompt: {
        type: String(row?.promptType ?? "none"),
        required: String(row?.promptRequired ?? "false"),
      },
      implementation: {
        state: String(row?.implementationState ?? "ready"),
        reason: String(row?.implementationReason ?? row?.reason ?? ""),
      },
      rollIntent: String(row?.rollIntent ?? ""),
      tags: String(row?.tags ?? ""),
      resolves: String(row?.resolves ?? ""),
      prominent: String(row?.prominent ?? "false"),
      prominentWhenBurning: String(row?.prominentWhenBurning ?? "false")
    })), { strict: true });
  } catch (error) {
    throw createSettingsCollectionValidationError(
      Array.isArray(error.validationErrors) ? error.validationErrors : [error.message]
    );
  }
}

function catalogToRows(value = []) {
  return normalizePersonalActionCatalog(value, { strict: false }).map(entry => ({
    id: String(entry.id ?? ""),
    label: String(entry.label ?? ""),
    category: String(entry.category ?? ""),
    costResource: String(entry.cost?.resource ?? "sa"),
    costValue: String(entry.cost?.value ?? "0"),
    resolver: String(entry.resolver ?? "action"),
    promptType: String(entry.prompt?.type ?? "none"),
    promptRequired: entry.prompt?.required ? "true" : "false",
    implementationState: String(entry.implementation?.state ?? "ready"),
    implementationReason: String(entry.implementation?.reason ?? ""),
    rollIntent: String(entry.roll?.intent ?? ""),
    tags: Array.isArray(entry.tags) ? entry.tags.join(", ") : String(entry.tags ?? ""),
    resolves: Array.isArray(entry.resolves) ? entry.resolves.join(", ") : String(entry.resolves ?? ""),
    prominent: entry.prominent ? "true" : "false",
    prominentWhenBurning: entry.prominentWhenBurning ? "true" : "false"
  }));
}

function parseBulk(text = "") {
  const raw = String(text ?? "").trim();
  if (!raw) return [];

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw createSettingsCollectionValidationError([
      `Bulk JSON must be valid JSON: ${error.message}`
    ]);
  }

  try {
    return normalizePersonalActionCatalog(parsed, { strict: true });
  } catch (error) {
    throw createSettingsCollectionValidationError(
      Array.isArray(error.validationErrors) ? error.validationErrors : [error.message]
    );
  }
}

function serializeBulk(value = []) {
  return JSON.stringify(
    normalizePersonalActionCatalog(value, { strict: false }),
    null,
    2
  );
}

const PERSONAL_ACTION_CATALOG_EDITOR_DEFINITION = {
  id: "personal-action-catalog",
  menuKey: MENU_KEY,
  settingKey: SETTING_PERSONAL_ACTION_CATALOG,
  settingType: Array,
  title: "Personal Action Catalog",
  description: "Edit the action buttons shown in the personal combat action menu.",
  helpText: "Rows are shown in menu order within their category. Resolver controls which central action executor owns the action.",
  bulkHelpText: 'JSON shape: [{ "id": "move", "label": "Move", "category": "standard", "cost": { "resource": "sa", "value": 1 }, "resolver": "movement" }]',
  emptyStateText: "No actions configured. Restore defaults to rebuild the standard action catalog.",
  addRowLabel: "Add Action",
  rowSchema: [
    {
      key: "id",
      label: "Id",
      type: "text",
      placeholder: "move"
    },
    {
      key: "label",
      label: "Label",
      type: "text",
      placeholder: "Move"
    },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: () => PERSONAL_ACTION_CATEGORY_OPTIONS
    },
    {
      key: "costResource",
      label: "Cost Resource",
      type: "select",
      options: () => PERSONAL_ACTION_COST_RESOURCE_OPTIONS
    },
    {
      key: "costValue",
      label: "Cost",
      type: "number",
      min: 0,
      step: 1,
      placeholder: "1"
    },
    {
      key: "resolver",
      label: "Resolver",
      type: "select",
      options: () => PERSONAL_ACTION_RESOLVER_OPTIONS
    },
    {
      key: "promptType",
      label: "Prompt",
      type: "select",
      options: () => PERSONAL_ACTION_PROMPT_OPTIONS
    },
    {
      key: "promptRequired",
      label: "Prompt Required",
      type: "select",
      options: () => BOOLEAN_OPTIONS
    },
    {
      key: "implementationState",
      label: "State",
      type: "select",
      options: () => PERSONAL_ACTION_IMPLEMENTATION_OPTIONS
    },
    {
      key: "implementationReason",
      label: "State Reason",
      type: "text",
      placeholder: "Not yet implemented."
    },
    {
      key: "rollIntent",
      label: "Roll Intent",
      type: "text",
      placeholder: "overload"
    },
    {
      key: "tags",
      label: "Tags",
      type: "text",
      placeholder: "combat, movement"
    },
    {
      key: "resolves",
      label: "Resolves",
      type: "text",
      placeholder: "prone, stunned"
    },
    {
      key: "prominent",
      label: "Prominent",
      type: "select",
      options: () => BOOLEAN_OPTIONS
    },
    {
      key: "prominentWhenBurning",
      label: "Burn Highlight",
      type: "select",
      options: () => BOOLEAN_OPTIONS
    }
  ],
  menu: {
    name: "Personal Action Catalog",
    label: "Configure",
    hint: "Edit the personal combat action menus and declarative intent routing.",
    icon: "fas fa-list-check",
    restricted: true
  },
  defaultData: getDefaultPersonalActionCatalog,
  createEmptyRow: () => ({
    id: "",
    label: "",
    category: PERSONAL_ACTION_CATEGORY_OPTIONS[0]?.value ?? "standard",
    costResource: "sa",
    costValue: "1",
    resolver: "action",
    promptType: "none",
    promptRequired: "false",
    implementationState: "ready",
    implementationReason: "",
    rollIntent: "",
    tags: "combat",
    resolves: "",
    prominent: "false",
    prominentWhenBurning: "false"
  }),
  toRows: catalogToRows,
  rowsToValue: rowsToCatalog,
  parseBulk,
  serializeBulk
};

export function registerPersonalActionCatalogSettingsEditor() {
  registerSettingsCollectionEditor(PERSONAL_ACTION_CATALOG_EDITOR_DEFINITION);
}
