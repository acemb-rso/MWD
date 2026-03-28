// src/modules/settings/gm-dn-preset-settings.js
// Purpose: Defines the reusable collection-editor configuration for GM DN presets.
// How it fits: Registered by system settings so DN presets use the shared submenu editor framework.

import {
  getDefaultDnPresets,
  normalizeDnPresetCollection,
  SETTING_DN_PRESETS,
} from "../gm/mwd-gmgadget.js";
import { createSettingsCollectionValidationError, registerSettingsCollectionEditor } from "./collection-editor.js";

const MENU_KEY = "gmDnPresetEditor";

function rowsToValue(rows = []) {
  const normalizedRows = [];
  const errors = [];
  const seenLabels = new Set();

  (Array.isArray(rows) ? rows : []).forEach((row, index) => {
    const label = String(row?.label ?? "").trim();
    const rawDn = String(row?.dn ?? "").trim();
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

    const dn = Number(rawDn);
    if (!Number.isFinite(dn)) {
      errors.push(`${prefix}: DN must be a number.`);
      return;
    }
    if (dn < 0) {
      errors.push(`${prefix}: DN cannot be negative.`);
      return;
    }

    normalizedRows.push({
      label,
      dn: Math.trunc(dn)
    });
  });

  if (errors.length) throw createSettingsCollectionValidationError(errors);
  return normalizeDnPresetCollection(normalizedRows, { strict: true });
}

function valueToRows(value = []) {
  return normalizeDnPresetCollection(value, { strict: false }).map(entry => ({
    label: entry.label,
    dn: String(entry.dn)
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

  return normalizeDnPresetCollection(parsed, { strict: true });
}

function serializeBulk(value = []) {
  return JSON.stringify(
    normalizeDnPresetCollection(value, { strict: false }),
    null,
    2
  );
}

const GM_DN_PRESET_EDITOR_DEFINITION = {
  id: "gm-dn-presets",
  menuKey: MENU_KEY,
  settingKey: SETTING_DN_PRESETS,
  settingType: Array,
  title: "GM DN Presets",
  description: "Edit the preset DN buttons shown in the GM Gadget difficulty tab.",
  helpText: "Rows are shown in order in the GM Gadget. Labels must be unique.",
  bulkHelpText: "JSON shape: [{ \"label\": \"Standard\", \"dn\": 1 }]",
  emptyStateText: "No DN preset rows yet. Add one to show buttons in the GM Gadget.",
  addRowLabel: "Add Preset",
  rowSchema: [
    {
      key: "label",
      label: "Label",
      type: "text",
      placeholder: "Standard"
    },
    {
      key: "dn",
      label: "DN",
      type: "number",
      min: 0,
      step: 1,
      placeholder: "1"
    }
  ],
  menu: {
    name: "GM DN Presets",
    label: "Configure",
    hint: "Edit the preset DN buttons used by the GM Gadget.",
    icon: "fas fa-sliders-h",
    restricted: true
  },
  defaultData: getDefaultDnPresets,
  createEmptyRow: () => ({
    label: "",
    dn: "1"
  }),
  toRows: valueToRows,
  rowsToValue,
  parseBulk,
  serializeBulk
};

export function registerGMDnPresetSettingsEditor() {
  registerSettingsCollectionEditor(GM_DN_PRESET_EDITOR_DEFINITION);
}
