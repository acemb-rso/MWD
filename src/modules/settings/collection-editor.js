// src/modules/settings/collection-editor.js
// Purpose: Defines reusable FormApplication-based editors for settings collections.
// How it fits: Used by system settings registration to provide structured submenu editors.

import { SYSTEM_NAME } from "../core/constants.js";

const TEMPLATE_PATH = `systems/${SYSTEM_NAME}/templates/settings/collection-editor.hbs`;
const SETTINGS_COLLECTION_DEFINITIONS = new Map();
const SETTINGS_COLLECTION_MENU_CLASSES = new Map();

export function createSettingsCollectionValidationError(messages = []) {
  const list = Array.isArray(messages) ? messages.filter(Boolean) : [String(messages ?? "").trim()].filter(Boolean);
  const error = new Error(list[0] ?? "Invalid settings data.");
  error.validationErrors = list;
  return error;
}

export function registerSettingsCollectionEditor(definition) {
  validateDefinition(definition);

  SETTINGS_COLLECTION_DEFINITIONS.set(definition.id, definition);

  game.settings.register(SYSTEM_NAME, definition.settingKey, {
    scope: "world",
    config: false,
    type: definition.settingType ?? Object,
    default: definition.defaultData()
  });

  game.settings.registerMenu(SYSTEM_NAME, definition.menuKey, {
    name: definition.menu.name,
    label: definition.menu.label,
    hint: definition.menu.hint,
    icon: definition.menu.icon,
    type: getSettingsCollectionMenuClass(definition.id),
    restricted: definition.menu.restricted ?? true
  });
}

export function getSettingsCollectionDefinition(definitionId) {
  return SETTINGS_COLLECTION_DEFINITIONS.get(definitionId) ?? null;
}

function validateDefinition(definition) {
  if (!definition?.id) throw new Error("Settings collection definition requires an id.");
  if (!definition?.settingKey) throw new Error(`Settings collection definition "${definition.id}" requires a settingKey.`);
  if (!definition?.menuKey) throw new Error(`Settings collection definition "${definition.id}" requires a menuKey.`);
  if (!definition?.menu?.name || !definition?.menu?.label) {
    throw new Error(`Settings collection definition "${definition.id}" requires menu metadata.`);
  }
  if (typeof definition.defaultData !== "function") {
    throw new Error(`Settings collection definition "${definition.id}" requires defaultData().`);
  }
  if (typeof definition.toRows !== "function") {
    throw new Error(`Settings collection definition "${definition.id}" requires toRows(value).`);
  }
  if (typeof definition.rowsToValue !== "function") {
    throw new Error(`Settings collection definition "${definition.id}" requires rowsToValue(rows).`);
  }
  if (typeof definition.serializeBulk !== "function" || typeof definition.parseBulk !== "function") {
    throw new Error(`Settings collection definition "${definition.id}" requires bulk serialization helpers.`);
  }
  if (!Array.isArray(definition.rowSchema) || !definition.rowSchema.length) {
    throw new Error(`Settings collection definition "${definition.id}" requires a non-empty rowSchema.`);
  }
}

function getSettingsCollectionMenuClass(definitionId) {
  if (SETTINGS_COLLECTION_MENU_CLASSES.has(definitionId)) {
    return SETTINGS_COLLECTION_MENU_CLASSES.get(definitionId);
  }

  class SettingsCollectionMenu extends SettingsCollectionEditor {
    static definitionId = definitionId;
  }

  SETTINGS_COLLECTION_MENU_CLASSES.set(definitionId, SettingsCollectionMenu);
  return SettingsCollectionMenu;
}

export class SettingsCollectionEditor extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  static definitionId = "";

  static DEFAULT_OPTIONS = {
    classes: ["mwd", "mwd-settings-editor"],
    window: { resizable: true },
    position: { width: 880, height: 760 },
  };

  static PARTS = {
    main: { template: TEMPLATE_PATH }
  };

  constructor(options = {}) {
    super(options);

    const savedValue = this.#readSavedValue();
    this.editorState = {
      tab: "rows",
      rows: this.definition.toRows(savedValue),
      bulkText: this.definition.serializeBulk(savedValue),
      errors: []
    };
  }

  get id() {
    return `${SYSTEM_NAME}-${this.constructor.definitionId}-editor`;
  }

  get definition() {
    const definition = getSettingsCollectionDefinition(this.constructor.definitionId);
    if (!definition) {
      throw new Error(`Missing settings collection definition: ${this.constructor.definitionId}`);
    }
    return definition;
  }

  get title() {
    return this.definition.title ?? this.definition.menu?.name ?? "Settings Editor";
  }

  async _prepareContext(_options = {}) {
    const schema = this.#resolveRowSchema();
    const rows = this.editorState.rows.map((row, index, allRows) => ({
      index,
      fields: schema.map(field => this.#buildFieldView(field, row, index)),
      canMoveUp: index > 0,
      canMoveDown: index < (allRows.length - 1)
    }));

    return {
      definitionId: this.definition.id,
      title: this.title,
      description: this.definition.description ?? "",
      helpText: this.definition.helpText ?? "",
      bulkHelpText: this.definition.bulkHelpText ?? "",
      currentTab: this.editorState.tab,
      isRowsTab: this.editorState.tab === "rows",
      isBulkTab: this.editorState.tab === "bulk",
      errors: [...(this.editorState.errors ?? [])],
      columns: schema.map(field => ({ key: field.key, label: field.label })),
      rows,
      hasRows: rows.length > 0,
      bulkText: this.editorState.bulkText ?? "",
      addRowLabel: this.definition.addRowLabel ?? "Add Row",
      saveLabel: this.definition.saveLabel ?? "Save",
      cancelLabel: this.definition.cancelLabel ?? "Cancel",
      resetLabel: this.definition.resetLabel ?? "Reset to Saved",
      defaultsLabel: this.definition.defaultsLabel ?? "Restore Defaults",
      emptyStateText: this.definition.emptyStateText ?? "No rows yet. Add one to start this collection."
    };
  }

  _onRender(_context, _options) {
    this.element.querySelectorAll("[data-action]").forEach(element => {
      element.addEventListener("click", event => {
        const target = event.currentTarget;
        const action = String(target?.dataset?.action ?? "").trim();
        if (!action) return;
        void this.#handleAction(action, event, target);
      });
    });

    const form = this.element.querySelector("form");
    if (form) {
      form.addEventListener("submit", event => {
        event.preventDefault();
        void this.#onFormSubmit();
      });
    }
  }

  async #onFormSubmit() {
    this.#setErrors([]);

    try {
      const value = this.editorState.tab === "bulk"
        ? this.definition.parseBulk(this.#readBulkTextFromDom())
        : this.definition.rowsToValue(this.#readRowsFromDom());

      await game.settings.set(SYSTEM_NAME, this.definition.settingKey, value);

      const savedValue = this.#readSavedValue();
      this.#loadValue(savedValue);
      await this.close();
    } catch (error) {
      this.#setErrors(getValidationMessages(error));
      if (this.editorState.errors.length) {
        ui.notifications?.error(this.editorState.errors[0]);
      }
      this.render();
    }
  }

  async #handleAction(action, event, target) {
    event.preventDefault();
    event.stopPropagation();

    switch (action) {
      case "switchRows":
        this.#readBulkTextFromDom();
        this.editorState.tab = "rows";
        this.#setErrors([]);
        this.render();
        return;

      case "switchBulk":
        this.#captureRowsFromDom();
        try {
          const value = this.definition.rowsToValue(this.editorState.rows);
          this.editorState.bulkText = this.definition.serializeBulk(value);
          this.editorState.tab = "bulk";
          this.#setErrors([]);
        } catch (error) {
          this.#setErrors(getValidationMessages(error));
          if (this.editorState.errors.length) {
            ui.notifications?.warn(this.editorState.errors[0]);
          }
        }
        this.render();
        return;

      case "addRow":
        this.#captureRowsFromDom();
        this.editorState.rows.push(this.definition.createEmptyRow?.() ?? {});
        this.#setErrors([]);
        this.render();
        return;

      case "removeRow":
        this.#captureRowsFromDom();
        this.editorState.rows.splice(Number(target?.dataset?.index ?? -1), 1);
        this.#setErrors([]);
        this.render();
        return;

      case "moveRowUp":
        this.#captureRowsFromDom();
        this.#moveRow(Number(target?.dataset?.index ?? -1), -1);
        this.#setErrors([]);
        this.render();
        return;

      case "moveRowDown":
        this.#captureRowsFromDom();
        this.#moveRow(Number(target?.dataset?.index ?? -1), 1);
        this.#setErrors([]);
        this.render();
        return;

      case "loadBulk":
        try {
          const value = this.definition.parseBulk(this.#readBulkTextFromDom());
          this.editorState.rows = this.definition.toRows(value);
          this.editorState.bulkText = this.definition.serializeBulk(value);
          this.editorState.tab = "rows";
          this.#setErrors([]);
        } catch (error) {
          this.#setErrors(getValidationMessages(error));
          if (this.editorState.errors.length) {
            ui.notifications?.warn(this.editorState.errors[0]);
          }
        }
        this.render();
        return;

      case "formatBulk":
        try {
          const value = this.definition.parseBulk(this.#readBulkTextFromDom());
          this.editorState.bulkText = this.definition.serializeBulk(value);
          this.#setErrors([]);
        } catch (error) {
          this.#setErrors(getValidationMessages(error));
          if (this.editorState.errors.length) {
            ui.notifications?.warn(this.editorState.errors[0]);
          }
        }
        this.render();
        return;

      case "resetSetting":
        this.#loadValue(this.#readSavedValue());
        this.render();
        return;

      case "restoreDefaults":
        this.#loadValue(this.definition.defaultData());
        this.render();
        return;

      case "cancel":
        await this.close();
        return;

      default:
        return;
    }
  }

  #moveRow(index, delta) {
    if (!Number.isInteger(index)) return;
    const nextIndex = index + delta;
    if (index < 0 || nextIndex < 0 || nextIndex >= this.editorState.rows.length) return;

    const rows = [...this.editorState.rows];
    const [row] = rows.splice(index, 1);
    rows.splice(nextIndex, 0, row);
    this.editorState.rows = rows;
  }

  #loadValue(value) {
    this.editorState.rows = this.definition.toRows(value);
    this.editorState.bulkText = this.definition.serializeBulk(value);
    this.editorState.tab = "rows";
    this.#setErrors([]);
  }

  #readSavedValue() {
    const current = game.settings.get(SYSTEM_NAME, this.definition.settingKey);
    return foundry.utils.deepClone(current ?? this.definition.defaultData());
  }

  #captureRowsFromDom() {
    this.editorState.rows = this.#readRowsFromDom();
  }

  #readRowsFromDom() {
    const form = this.element?.querySelector("form");
    const formData = form ? new FormDataExtended(form) : { object: {} };
    const expanded = foundry.utils.expandObject(formData.object);
    const source = expanded?.rows ?? {};

    return Object.keys(source)
      .sort((left, right) => Number(left) - Number(right))
      .map(index => {
        const row = source[index] ?? {};
        return Object.fromEntries(
          this.definition.rowSchema.map(field => [
            field.key,
            String(row?.[field.key] ?? "")
          ])
        );
      });
  }

  #readBulkTextFromDom() {
    const form = this.element?.querySelector("form");
    const textarea = form?.querySelector('textarea[name="bulkText"]');
    if (textarea instanceof HTMLTextAreaElement) {
      this.editorState.bulkText = textarea.value;
    }
    return this.editorState.bulkText ?? "";
  }

  #buildFieldView(field, row, index) {
    const type = field.type ?? "text";
    const value = String(row?.[field.key] ?? field.default ?? "");
    const options = type === "select"
      ? resolveFieldOptions(field).map(option => ({
          value: String(option.value ?? ""),
          label: String(option.label ?? option.value ?? ""),
          selected: String(option.value ?? "") === value
        }))
      : [];

    return {
      key: field.key,
      label: field.label,
      type,
      inputType: type === "select" ? "text" : type,
      name: `rows.${index}.${field.key}`,
      value,
      placeholder: field.placeholder ?? "",
      min: field.min ?? "",
      max: field.max ?? "",
      step: field.step ?? "",
      options
    };
  }

  #resolveRowSchema() {
    return this.definition.rowSchema.map(field => ({
      ...field,
      type: field.type ?? "text"
    }));
  }

  #setErrors(errors = []) {
    this.editorState.errors = Array.isArray(errors) ? errors.filter(Boolean) : [];
  }
}

function resolveFieldOptions(field) {
  const options = typeof field.options === "function" ? field.options() : field.options;
  return Array.isArray(options) ? options : [];
}

function getValidationMessages(error) {
  const messages = Array.isArray(error?.validationErrors)
    ? error.validationErrors.filter(Boolean)
    : [String(error?.message ?? "Unable to save settings.").trim()].filter(Boolean);
  return messages.length ? messages : ["Unable to save settings."];
}
