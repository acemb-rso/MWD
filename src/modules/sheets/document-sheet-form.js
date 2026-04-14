// src/modules/sheets/document-sheet-form.js
// Purpose: Shared helpers for collecting document updates from AppV2 form fields.
// How it fits: Keeps item and actor sheets aligned on field coercion and change detection.

const SKIP_FIELD = Symbol("SKIP_FIELD");

function isNamedField(field) {
  return field instanceof HTMLInputElement
    || field instanceof HTMLSelectElement
    || field instanceof HTMLTextAreaElement;
}

// This descriptor form is the test seam for field coercion. The live sheet
// path still passes DOM nodes, but tests can exercise the rules without a DOM.
export function coerceDocumentFieldDescriptor({
  elementKind = "input",
  inputType = "",
  dtype = "",
  value = "",
  checked = false,
} = {}) {
  const normalizedKind = String(elementKind ?? "").trim().toLowerCase();
  const normalizedInputType = String(inputType ?? "").trim().toLowerCase();
  const normalizedDtype = String(dtype ?? "").trim().toLowerCase();

  if (!["input", "select", "textarea"].includes(normalizedKind)) {
    return SKIP_FIELD;
  }

  if (normalizedKind === "input") {
    if (normalizedInputType === "radio") {
      if (!checked) return SKIP_FIELD;
      return value;
    }

    if (normalizedInputType === "checkbox") {
      return Boolean(checked);
    }
  }

  if (normalizedDtype === "number" || (normalizedKind === "input" && normalizedInputType === "number")) {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : 0;
  }

  if (normalizedDtype === "boolean") {
    return value === true || value === "true";
  }

  return value;
}

export function coerceDocumentFieldValue(field) {
  if (!isNamedField(field)) return SKIP_FIELD;
  return coerceDocumentFieldDescriptor({
    elementKind: field instanceof HTMLSelectElement
      ? "select"
      : field instanceof HTMLTextAreaElement
        ? "textarea"
        : "input",
    inputType: field instanceof HTMLInputElement ? field.type : "",
    dtype: String(field.dataset?.dtype ?? ""),
    value: field.value,
    checked: field instanceof HTMLInputElement ? field.checked : false,
  });
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
