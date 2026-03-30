// src/modules/settings/scene-modifier-template-settings.js
// Registers a settings collection editor for reusable scene modifier preset templates.
// Follows the same pattern as gm-dn-preset-settings.js.

import {
  SCENE_MODIFIER_ATTRIBUTE_OPTIONS,
  SCENE_MODIFIER_INTENT_OPTIONS
} from "../modifiers/providers/scene-modifiers.js";
import { createSettingsCollectionValidationError, registerSettingsCollectionEditor } from "./collection-editor.js";

export const SETTING_SCENE_MODIFIER_TEMPLATES = "sceneModifierTemplates";

const MENU_KEY = "sceneModifierTemplateEditor";

const DEFAULT_TEMPLATES = Object.freeze([]);

function normalizeFilter(v) {
  const s = String(v ?? "").trim();
  return s === "" ? "" : s;
}

function rowsToValue(rows = []) {
  const normalized = [];
  const errors = [];
  const seenLabels = new Set();

  (Array.isArray(rows) ? rows : []).forEach((row, index) => {
    const label = String(row?.label ?? "").trim();
    const rawValue = String(row?.value ?? "").trim();
    const prefix = `Row ${index + 1}`;

    if (!label) {
      errors.push(`${prefix}: label cannot be blank.`);
      return;
    }

    if (seenLabels.has(label.toLowerCase())) {
      errors.push(`${prefix}: duplicate label "${label}".`);
      return;
    }
    seenLabels.add(label.toLowerCase());

    const value = Number(rawValue);
    if (!Number.isFinite(value)) {
      errors.push(`${prefix}: value must be a number.`);
      return;
    }

    normalized.push({
      label,
      value: Math.trunc(value),
      attributeFilter: normalizeFilter(row?.attributeFilter),
      intentFilter: normalizeFilter(row?.intentFilter)
    });
  });

  if (errors.length) throw createSettingsCollectionValidationError(errors);
  return normalized;
}

function valueToRows(value = []) {
  return (Array.isArray(value) ? value : []).map(entry => ({
    label: String(entry?.label ?? ""),
    value: String(entry?.value ?? "0"),
    attributeFilter: normalizeFilter(entry?.attributeFilter),
    intentFilter: normalizeFilter(entry?.intentFilter)
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

  if (!Array.isArray(parsed)) {
    throw createSettingsCollectionValidationError(["Bulk JSON must be an array."]);
  }

  return rowsToValue(parsed.map(entry => ({
    label: String(entry?.label ?? ""),
    value: String(entry?.value ?? "0"),
    attributeFilter: normalizeFilter(entry?.attributeFilter),
    intentFilter: normalizeFilter(entry?.intentFilter)
  })));
}

function serializeBulk(value = []) {
  return JSON.stringify(
    (Array.isArray(value) ? value : []).map(entry => ({
      label: String(entry?.label ?? ""),
      value: Number(entry?.value ?? 0),
      attributeFilter: normalizeFilter(entry?.attributeFilter),
      intentFilter: normalizeFilter(entry?.intentFilter)
    })),
    null,
    2
  );
}

const SCENE_MODIFIER_TEMPLATE_EDITOR_DEFINITION = {
  id: "scene-modifier-templates",
  menuKey: MENU_KEY,
  settingKey: SETTING_SCENE_MODIFIER_TEMPLATES,
  settingType: Array,
  title: "Scene Modifier Templates",
  description: "Define reusable scene modifier presets that can be applied per scene via the GM Gadget.",
  helpText: "Labels must be unique. Value is a signed integer (+/–). Filters are optional — blank means the modifier applies to all matching rolls.",
  bulkHelpText: 'JSON shape: [{ "label": "Darkness", "value": -2, "attributeFilter": "reflexes", "intentFilter": "attack" }]',
  emptyStateText: "No templates yet. Add one to make it available in the GM Gadget Scene tab.",
  addRowLabel: "Add Template",
  rowSchema: [
    {
      key: "label",
      label: "Label",
      type: "text",
      placeholder: "Darkness"
    },
    {
      key: "value",
      label: "Value",
      type: "number",
      step: 1,
      placeholder: "-2"
    },
    {
      key: "attributeFilter",
      label: "Attribute Filter",
      type: "select",
      options: SCENE_MODIFIER_ATTRIBUTE_OPTIONS
    },
    {
      key: "intentFilter",
      label: "Intent Filter",
      type: "select",
      options: SCENE_MODIFIER_INTENT_OPTIONS
    }
  ],
  menu: {
    name: "Scene Modifier Templates",
    label: "Configure",
    hint: "Edit the preset scene modifier templates available in the GM Gadget.",
    icon: "fas fa-cloud",
    restricted: true
  },
  defaultData: () => foundry.utils.deepClone(DEFAULT_TEMPLATES),
  createEmptyRow: () => ({
    label: "",
    value: "0",
    attributeFilter: "",
    intentFilter: ""
  }),
  toRows: valueToRows,
  rowsToValue,
  parseBulk,
  serializeBulk
};

export function registerSceneModifierTemplateSettingsEditor() {
  registerSettingsCollectionEditor(SCENE_MODIFIER_TEMPLATE_EDITOR_DEFINITION);
}
