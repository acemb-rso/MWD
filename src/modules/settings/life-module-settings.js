// src/modules/settings/life-module-settings.js
// Purpose: Defines the reusable collection-editor configuration for the life module catalog.
// How it fits: Registered by system settings to expose a Configure Game Settings submenu.

import {
  getDefaultLifeModuleCatalog,
  listLifeModuleTypes,
  normalizeLifeModuleCatalog,
  serializeLifeModuleGrants,
  SETTING_LIFE_MODULE_CATALOG,
} from "../mwd/life-modules.js";
import { parseBulkJson, serializeBulkJson } from "./bulk-json.js";
import { registerSettingsCollectionEditor } from "./collection-editor.js";

const MENU_KEY = "lifeModuleCatalogEditor";

function rowsToCatalog(rows = []) {
  return normalizeLifeModuleCatalog((Array.isArray(rows) ? rows : []).map(row => ({
    id: String(row?.id ?? ""),
    moduleType: String(row?.moduleType ?? ""),
    label: String(row?.label ?? ""),
    grants: String(row?.grants ?? ""),
    requiresAny: String(row?.requiresAny ?? ""),
    excludesAny: String(row?.excludesAny ?? "")
  })), { strict: true });
}

function catalogToRows(value = []) {
  return normalizeLifeModuleCatalog(value, { strict: false }).map(entry => ({
    id: entry.id,
    moduleType: entry.moduleType,
    label: entry.label,
    grants: serializeLifeModuleGrants(entry.grants),
    requiresAny: entry.requiresAny.join(", "),
    excludesAny: entry.excludesAny.join(", ")
  }));
}

function parseBulk(text = "") {
  return parseBulkJson(text, {
    expect: "array",
    normalize: value => normalizeLifeModuleCatalog(value, { strict: true }),
  });
}

function serializeBulk(value = []) {
  return serializeBulkJson(value, {
    normalize: source => normalizeLifeModuleCatalog(source, { strict: false }),
  });
}

const LIFE_MODULE_CATALOG_EDITOR_DEFINITION = {
  id: "life-module-catalog",
  menuKey: MENU_KEY,
  settingKey: SETTING_LIFE_MODULE_CATALOG,
  settingType: Array,
  title: "Life Module Catalog",
  description: "Define the canonical life modules available for Faction, Childhood, Higher Education, and Real Life character development.",
  helpText: 'Grants use ";" to separate separate bonuses and "|" to separate choices inside one bonus. Each choice is prefixed with "skill:" or "edgePool:". Example: "skill:deception; edgePool:rumor" or "skill:tracking|skill:projectileWeapons".',
  bulkHelpText: 'JSON shape: [{ "id": "faction-capellan-confederation", "moduleType": "faction", "label": "Capellan Confederation", "grants": [{ "id": "skill", "choices": [{ "type": "skill", "value": "deception" }] }, { "id": "edge-pool", "choices": [{ "type": "edgePool", "value": "rumor" }] }], "requiresAny": [], "excludesAny": [] }]',
  emptyStateText: "No life modules yet. Add one to start the catalog.",
  addRowLabel: "Add Life Module",
  rowSchema: [
    {
      key: "id",
      label: "Id",
      type: "text",
      placeholder: "childhood-backwoods"
    },
    {
      key: "moduleType",
      label: "Slot",
      type: "select",
      options: listLifeModuleTypes
    },
    {
      key: "label",
      label: "Label",
      type: "text",
      placeholder: "Backwoods"
    },
    {
      key: "grants",
      label: "Grants",
      type: "text",
      placeholder: "skill:tracking|skill:projectileWeapons"
    },
    {
      key: "requiresAny",
      label: "Requires Any",
      type: "text",
      placeholder: "childhood-nobility"
    },
    {
      key: "excludesAny",
      label: "Excludes Any",
      type: "text",
      placeholder: "higher-education-military-academy"
    }
  ],
  menu: {
    name: "Life Module Catalog",
    label: "Configure",
    hint: "Edit the canonical life modules and their skill roll modifiers.",
    icon: "fas fa-book-open",
    restricted: true
  },
  defaultData: getDefaultLifeModuleCatalog,
  createEmptyRow: () => ({
    id: "",
    moduleType: "childhood",
    label: "",
    grants: "",
    requiresAny: "",
    excludesAny: ""
  }),
  toRows: catalogToRows,
  rowsToValue: rowsToCatalog,
  parseBulk,
  serializeBulk
};

export function registerLifeModuleSettingsEditor() {
  registerSettingsCollectionEditor(LIFE_MODULE_CATALOG_EDITOR_DEFINITION);
}
