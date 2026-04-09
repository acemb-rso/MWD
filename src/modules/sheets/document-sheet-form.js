// src/modules/sheets/document-sheet-form.js
// Purpose: Shared helpers for collecting document updates from AppV2 form fields.
// How it fits: Keeps item and actor sheets aligned on field coercion and change detection.

const SKIP_FIELD = Symbol("SKIP_FIELD");

function isNamedField(field) {
  return field instanceof HTMLInputElement
    || field instanceof HTMLSelectElement
    || field instanceof HTMLTextAreaElement;
}

export function coerceDocumentFieldValue(field) {
  if (!isNamedField(field)) return SKIP_FIELD;

  if (field instanceof HTMLInputElement) {
    if (field.type === "radio") {
      if (!field.checked) return SKIP_FIELD;
      return field.value;
    }

    if (field.type === "checkbox") {
      return field.checked;
    }
  }

  const dtype = String(field.dataset?.dtype ?? "").trim().toLowerCase();
  const rawValue = field.value;

  if (dtype === "number" || (field instanceof HTMLInputElement && field.type === "number")) {
    const numeric = Number(rawValue);
    return Number.isFinite(numeric) ? numeric : 0;
  }

  if (dtype === "boolean") {
    return rawValue === true || rawValue === "true";
  }

  return rawValue;
}

export function collectDocumentFormUpdates({
  root,
  document,
  selector = "input[name], select[name], textarea[name]",
  clampByPath = null,
  skipNames = [],
} = {}) {
  if (!(root instanceof HTMLElement)) return {};

  const skip = new Set(Array.isArray(skipNames) ? skipNames : [skipNames]);
  const updates = {};

  for (const field of root.querySelectorAll(selector)) {
    if (!isNamedField(field)) continue;
    if (field.closest("prose-mirror")) continue;
    if (field.disabled) continue;

    const name = String(field.getAttribute("name") ?? field.name ?? "").trim();
    if (!name || skip.has(name)) continue;

    let value = coerceDocumentFieldValue(field);
    if (value === SKIP_FIELD) continue;

    if (typeof clampByPath === "function") {
      value = clampByPath(name, value);
    }

    const current = document ? foundry.utils.getProperty(document, name) : undefined;
    if (current === value) continue;
    updates[name] = value;
  }

  return updates;
}
