// src/modules/settings/weapon-payload-catalog-settings.js
// Purpose: Registers settings editors for canonical weapon payload families and tags.
// How it fits: Gives GMs one place to define compatibility/filter keys used by
// weapon and payload item sheets.

import {
  getDefaultWeaponPayloadFamilyCatalog,
  getDefaultWeaponPayloadTagCatalog,
  normalizePayloadCatalog,
  SETTING_WEAPON_PAYLOAD_FAMILY_CATALOG,
  SETTING_WEAPON_PAYLOAD_TAG_CATALOG,
} from "../mwd/weapon-payload-catalogs.js";
import { parseBulkJson, serializeBulkJson } from "./bulk-json.js";
import { createSettingsCollectionValidationError, registerSettingsCollectionEditor } from "./collection-editor.js";

const FAMILY_MENU_KEY = "weaponPayloadFamilyCatalogEditor";
const TAG_MENU_KEY = "weaponPayloadTagCatalogEditor";
const KEY_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/u;

function rowsToCatalog(rows = [], { noun = "entry" } = {}) {
  const entries = [];
  const errors = [];
  const seen = new Set();

  (Array.isArray(rows) ? rows : []).forEach((row, index) => {
    const key = String(row?.key ?? "").trim();
    const label = String(row?.label ?? "").trim();
    const description = String(row?.description ?? "").trim();
    const prefix = `Row ${index + 1}`;

    if (!key) {
      errors.push(`${prefix}: ${noun} key cannot be blank.`);
      return;
    }

    if (!KEY_PATTERN.test(key)) {
      errors.push(`${prefix}: "${key}" must start with a letter or number and use only letters, numbers, dot, underscore, or hyphen.`);
      return;
    }

    const lookupKey = key.toLowerCase();
    if (seen.has(lookupKey)) {
      errors.push(`${prefix}: duplicate ${noun} key "${key}".`);
      return;
    }
    seen.add(lookupKey);

    entries.push({
      key,
      label: label || key,
      description,
    });
  });

  if (errors.length) throw createSettingsCollectionValidationError(errors);
  return normalizePayloadCatalog(entries);
}

function catalogToRows(value = []) {
  return normalizePayloadCatalog(value).map(entry => ({
    key: entry.key,
    label: entry.label,
    description: entry.description,
  }));
}

function parseBulk(text = "", { defaults = [] } = {}) {
  return parseBulkJson(text, {
    expect: "array",
    normalize: value => normalizePayloadCatalog(value, { defaults }),
  });
}

function serializeBulk(value = []) {
  return serializeBulkJson(value, {
    normalize: source => normalizePayloadCatalog(source),
  });
}

const ROW_SCHEMA = Object.freeze([
  {
    key: "key",
    label: "Key",
    type: "text",
    placeholder: "40mmGrenade"
  },
  {
    key: "label",
    label: "Label",
    type: "text",
    placeholder: "40mm Grenade"
  },
  {
    key: "description",
    label: "Description",
    type: "text",
    placeholder: "Shown only in this settings editor"
  }
]);

const WEAPON_PAYLOAD_FAMILY_EDITOR_DEFINITION = {
  id: "weapon-payload-families",
  menuKey: FAMILY_MENU_KEY,
  settingKey: SETTING_WEAPON_PAYLOAD_FAMILY_CATALOG,
  settingType: Array,
  title: "Weapon Payload Families",
  description: "Edit the canonical family keys used to match reusable payload items to compatible weapons.",
  helpText: "Families are compatibility keys. A weapon accepts payloads that share at least one family.",
  bulkHelpText: "JSON shape: [{ \"key\": \"40mmGrenade\", \"label\": \"40mm Grenade\", \"description\": \"...\" }]",
  emptyStateText: "No payload families configured. Restore defaults to rebuild the standard catalog.",
  addRowLabel: "Add Family",
  rowSchema: ROW_SCHEMA,
  menu: {
    name: "Weapon Payload Families",
    label: "Configure",
    hint: "Edit canonical payload family keys used by weapon compatibility.",
    icon: "fas fa-crosshairs",
    restricted: true
  },
  defaultData: getDefaultWeaponPayloadFamilyCatalog,
  createEmptyRow: () => ({ key: "", label: "", description: "" }),
  toRows: catalogToRows,
  rowsToValue: rows => rowsToCatalog(rows, { noun: "family" }),
  parseBulk: text => parseBulk(text, { defaults: getDefaultWeaponPayloadFamilyCatalog() }),
  serializeBulk
};

const WEAPON_PAYLOAD_TAG_EDITOR_DEFINITION = {
  id: "weapon-payload-tags",
  menuKey: TAG_MENU_KEY,
  settingKey: SETTING_WEAPON_PAYLOAD_TAG_CATALOG,
  settingType: Array,
  title: "Weapon Payload Tags",
  description: "Edit the canonical tag keys used to refine payload compatibility and describe payload behavior.",
  helpText: "Tags refine an accepted family match through required, optional, or excluded tag filters.",
  bulkHelpText: "JSON shape: [{ \"key\": \"armorPiercing\", \"label\": \"Armor Piercing\", \"description\": \"...\" }]",
  emptyStateText: "No payload tags configured. Restore defaults to rebuild the standard catalog.",
  addRowLabel: "Add Tag",
  rowSchema: ROW_SCHEMA,
  menu: {
    name: "Weapon Payload Tags",
    label: "Configure",
    hint: "Edit canonical payload tag keys used by payloads and weapon filters.",
    icon: "fas fa-tags",
    restricted: true
  },
  defaultData: getDefaultWeaponPayloadTagCatalog,
  createEmptyRow: () => ({ key: "", label: "", description: "" }),
  toRows: catalogToRows,
  rowsToValue: rows => rowsToCatalog(rows, { noun: "tag" }),
  parseBulk: text => parseBulk(text, { defaults: getDefaultWeaponPayloadTagCatalog() }),
  serializeBulk
};

export function registerWeaponPayloadCatalogSettingsEditors() {
  registerSettingsCollectionEditor(WEAPON_PAYLOAD_FAMILY_EDITOR_DEFINITION);
  registerSettingsCollectionEditor(WEAPON_PAYLOAD_TAG_EDITOR_DEFINITION);
}
