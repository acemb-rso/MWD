// src/modules/settings/status-condition-catalog-settings.js
// Purpose: Settings editor for actor-aware token condition catalogs.
// How it fits: Lets worlds curate person and machine status markers without
// moving status filtering logic into sheets or the GM Gadget.

import {
  getDefaultStatusConditionCatalog,
  normalizeStatusConditionCatalog,
  serializeStatusTags,
  SETTING_STATUS_CONDITION_CATALOG,
  STATUS_ACTOR_GROUP_OPTIONS,
  STATUS_BOOLEAN_OPTIONS,
} from "../status/status-condition-catalog.js";
import { createSettingsCollectionValidationError, registerSettingsCollectionEditor } from "./collection-editor.js";

const MENU_KEY = "statusConditionCatalogEditor";

function rowsToCatalog(rows = []) {
  try {
    return normalizeStatusConditionCatalog((Array.isArray(rows) ? rows : []).map(row => ({
      id: String(row?.id ?? ""),
      label: String(row?.label ?? ""),
      actorGroup: String(row?.actorGroup ?? ""),
      category: String(row?.category ?? ""),
      tags: String(row?.tags ?? ""),
      icon: String(row?.icon ?? ""),
      manual: String(row?.manual ?? "true"),
      managed: String(row?.managed ?? "false"),
      modifierKey: String(row?.modifierKey ?? ""),
      order: String(row?.order ?? "0"),
    })), { strict: true });
  } catch (error) {
    throw createSettingsCollectionValidationError(
      Array.isArray(error.validationErrors) ? error.validationErrors : [error.message]
    );
  }
}

function catalogToRows(value = []) {
  return normalizeStatusConditionCatalog(value, { strict: false }).map(entry => ({
    id: String(entry.id ?? ""),
    label: String(entry.label ?? ""),
    actorGroup: String(entry.actorGroup ?? "person"),
    category: String(entry.category ?? ""),
    tags: serializeStatusTags(entry.tags ?? []),
    icon: String(entry.icon ?? ""),
    manual: entry.manual ? "true" : "false",
    managed: entry.managed ? "true" : "false",
    modifierKey: String(entry.modifierKey ?? ""),
    order: String(entry.order ?? "0"),
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
    return normalizeStatusConditionCatalog(parsed, { strict: true });
  } catch (error) {
    throw createSettingsCollectionValidationError(
      Array.isArray(error.validationErrors) ? error.validationErrors : [error.message]
    );
  }
}

function serializeBulk(value = []) {
  return JSON.stringify(
    normalizeStatusConditionCatalog(value, { strict: false }),
    null,
    2
  );
}

const STATUS_CONDITION_CATALOG_EDITOR_DEFINITION = {
  id: "status-condition-catalog",
  menuKey: MENU_KEY,
  settingKey: SETTING_STATUS_CONDITION_CATALOG,
  settingType: Array,
  title: "Status Condition Catalog",
  description: "Edit the actor-aware statuses available in MWD status pickers and GM Harm.",
  helpText: "Actor group controls where a condition can be applied. Modifier Key is optional; blank uses the condition id as the mechanics key, while a value explicitly points to another STATUS_MAP entry.",
  bulkHelpText: 'JSON shape: [{ "id": "unstable", "label": "Unstable", "actorGroup": "machine", "category": "stability", "tags": ["movement"] }]',
  emptyStateText: "No condition rows configured. Restore defaults to rebuild the standard MWD status catalog.",
  addRowLabel: "Add Condition",
  rowSchema: [
    { key: "id", label: "Id", type: "text", placeholder: "unstable" },
    { key: "label", label: "Label", type: "text", placeholder: "Unstable" },
    { key: "actorGroup", label: "Actor Group", type: "select", options: () => STATUS_ACTOR_GROUP_OPTIONS },
    { key: "category", label: "Category", type: "text", placeholder: "stability" },
    { key: "tags", label: "Tags", type: "text", placeholder: "movement, piloting" },
    { key: "icon", label: "Icon", type: "text", placeholder: "systems/mwd/img/icons/status/falling.svg" },
    { key: "manual", label: "Manual", type: "select", options: () => STATUS_BOOLEAN_OPTIONS },
    { key: "managed", label: "Managed", type: "select", options: () => STATUS_BOOLEAN_OPTIONS },
    { key: "modifierKey", label: "Modifier Key", type: "text", placeholder: "prone" },
    { key: "order", label: "Order", type: "number", step: 1, placeholder: "1000" },
  ],
  menu: {
    name: "Status Condition Catalog",
    label: "Configure",
    hint: "Edit person, vehicle, and BattleMech status condition availability.",
    icon: "fas fa-heart-pulse",
    restricted: true,
  },
  defaultData: getDefaultStatusConditionCatalog,
  createEmptyRow: () => ({
    id: "",
    label: "",
    actorGroup: "machine",
    category: "general",
    tags: "",
    icon: "",
    manual: "true",
    managed: "false",
    modifierKey: "",
    order: "0",
  }),
  toRows: catalogToRows,
  rowsToValue: rowsToCatalog,
  parseBulk,
  serializeBulk,
};

export function registerStatusConditionCatalogSettingsEditor() {
  registerSettingsCollectionEditor(STATUS_CONDITION_CATALOG_EDITOR_DEFINITION);
}
