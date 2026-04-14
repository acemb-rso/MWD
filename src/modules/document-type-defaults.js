// src/modules/document-type-defaults.js
// Purpose: Resolve create-time actor and item defaults without runtime fetches.
// How it fits: Keeps document creation deterministic and makes the default graph testable outside Foundry.

import templateData from "../../template.json" with { type: "json" };

const ROOT_CREATE_FIELDS = Object.freeze({
  Actor: new Set(["prototypeToken"]),
  Item: new Set(),
});

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cloneValue(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function mergePlainObjects(base = {}, extra = {}) {
  const merged = cloneValue(base);

  for (const [key, value] of Object.entries(extra ?? {})) {
    if (isPlainObject(value) && isPlainObject(merged[key])) {
      merged[key] = mergePlainObjects(merged[key], value);
      continue;
    }

    merged[key] = cloneValue(value);
  }

  return merged;
}

export function getDocumentTemplateConfig(documentName = "", source = templateData) {
  const config = source?.[documentName];
  return isPlainObject(config) ? config : {};
}

export function resolveTemplateBlock(
  source = templateData,
  documentName = "",
  templateName = "",
  seen = new Set()
) {
  const normalizedName = String(templateName ?? "").trim();
  if (!normalizedName || seen.has(normalizedName)) return {};

  const documentConfig = getDocumentTemplateConfig(documentName, source);
  const templateConfig = documentConfig?.templates?.[normalizedName];
  if (!isPlainObject(templateConfig)) return {};

  seen.add(normalizedName);
  let resolved = {};

  // Template composition is recursive, so we resolve dependencies first and
  // then layer the local block on top.
  for (const nestedTemplateName of Array.from(templateConfig.templates ?? [])) {
    resolved = mergePlainObjects(
      resolved,
      resolveTemplateBlock(source, documentName, nestedTemplateName, seen)
    );
  }

  const localData = cloneValue(templateConfig);
  delete localData.templates;
  return mergePlainObjects(resolved, localData);
}

export function resolveDocumentTypeBlock(
  source = templateData,
  documentName = "",
  documentType = ""
) {
  const normalizedType = String(documentType ?? "").trim();
  if (!normalizedType) return {};

  const documentConfig = getDocumentTemplateConfig(documentName, source);
  const typeConfig = documentConfig?.[normalizedType];
  if (!isPlainObject(typeConfig)) return {};

  let resolved = {};
  for (const templateName of Array.from(typeConfig.templates ?? [])) {
    resolved = mergePlainObjects(
      resolved,
      resolveTemplateBlock(source, documentName, templateName)
    );
  }

  const localData = cloneValue(typeConfig);
  delete localData.templates;
  return mergePlainObjects(resolved, localData);
}

export function resolveDocumentTypeCreateDefaults(
  documentName = "",
  documentType = "",
  source = templateData
) {
  const resolved = resolveDocumentTypeBlock(source, documentName, documentType);
  const rootFields = ROOT_CREATE_FIELDS[documentName] ?? ROOT_CREATE_FIELDS.Item;
  const defaults = { system: {} };

  for (const [key, value] of Object.entries(resolved)) {
    if (rootFields.has(key)) defaults[key] = cloneValue(value);
    else defaults.system[key] = cloneValue(value);
  }

  return defaults;
}

export async function getDocumentTypeCreateDefaults(documentName = "", documentType = "") {
  // The API stays async so the actor/item preCreate hooks do not need a second
  // migration. Internally this is now synchronous and bundle-backed.
  return resolveDocumentTypeCreateDefaults(documentName, documentType);
}
