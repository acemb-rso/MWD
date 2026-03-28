// src/modules/settings/skill-specialization-settings.js
// Purpose: Defines the reusable collection-editor configuration for skill specializations.
// How it fits: Registered by system settings to expose a Configure Game Settings submenu.

import {
  getDefaultSkillSpecializationCatalog,
  listSkillDefs,
  normalizeSkillSpecializationCatalog,
  SETTING_SKILL_SPECIALIZATION_CATALOG,
} from "../mwd/skills.js";
import { createSettingsCollectionValidationError, registerSettingsCollectionEditor } from "./collection-editor.js";

const MENU_KEY = "skillSpecializationEditor";

function skillOptions() {
  return listSkillDefs().map(skill => ({
    value: skill.code,
    label: skill.label
  }));
}

function rowsToCatalog(rows = []) {
  const knownSkills = new Set(skillOptions().map(option => option.value));
  const grouped = {};
  const errors = [];

  (Array.isArray(rows) ? rows : []).forEach((row, index) => {
    const skillCode = String(row?.skillCode ?? "").trim();
    const label = String(row?.label ?? "").trim();
    const prefix = `Row ${index + 1}`;

    if (!skillCode) {
      errors.push(`${prefix}: choose a skill.`);
      return;
    }

    if (!knownSkills.has(skillCode)) {
      errors.push(`${prefix}: unknown skill code "${skillCode}".`);
      return;
    }

    if (!label) {
      errors.push(`${prefix}: specialization label cannot be blank.`);
      return;
    }

    (grouped[skillCode] ??= []).push(label);
  });

  if (errors.length) throw createSettingsCollectionValidationError(errors);
  return normalizeSkillSpecializationCatalog(grouped, { strict: true });
}

function catalogToRows(value = {}) {
  const catalog = normalizeSkillSpecializationCatalog(value, { strict: false });
  return Object.entries(catalog).flatMap(([skillCode, labels]) =>
    labels.map(label => ({ skillCode, label }))
  );
}

function parseBulk(text = "") {
  const raw = String(text ?? "").trim();
  if (!raw) return {};

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw createSettingsCollectionValidationError([
      `Bulk JSON must be valid JSON: ${error.message}`
    ]);
  }

  return normalizeSkillSpecializationCatalog(parsed, { strict: true });
}

function serializeBulk(value = {}) {
  return JSON.stringify(
    normalizeSkillSpecializationCatalog(value, { strict: false }),
    null,
    2
  );
}

const SKILL_SPECIALIZATION_EDITOR_DEFINITION = {
  id: "skill-specializations",
  menuKey: MENU_KEY,
  settingKey: SETTING_SKILL_SPECIALIZATION_CATALOG,
  title: "Skill Specializations",
  description: "Edit the world specialization catalog for existing skills. Omitted skills have no available specializations.",
  helpText: "Use rows for normal editing. Use the bulk JSON tab for fast import/export.",
  bulkHelpText: "JSON shape: { \"athletics\": [\"Running\", \"Jumping\"] }",
  emptyStateText: "No specialization rows yet. Add one to start the catalog.",
  addRowLabel: "Add Specialization",
  rowSchema: [
    {
      key: "skillCode",
      label: "Skill",
      type: "select",
      options: skillOptions
    },
    {
      key: "label",
      label: "Specialization",
      type: "text",
      placeholder: "Running"
    }
  ],
  menu: {
    name: "Skill Specializations",
    label: "Configure",
    hint: "Edit the specialization catalog for canonical skills.",
    icon: "fas fa-list",
    restricted: true
  },
  defaultData: getDefaultSkillSpecializationCatalog,
  createEmptyRow: () => ({
    skillCode: skillOptions()[0]?.value ?? "",
    label: ""
  }),
  toRows: catalogToRows,
  rowsToValue: rowsToCatalog,
  parseBulk,
  serializeBulk
};

export function registerSkillSpecializationSettingsEditor() {
  registerSettingsCollectionEditor(SKILL_SPECIALIZATION_EDITOR_DEFINITION);
}
