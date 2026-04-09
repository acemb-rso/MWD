// src/modules/document-type-defaults.js
// Purpose: Preserves legacy template.json defaults for newly created documents.
// How it fits: Allows the manifest to migrate off template.json while keeping create-time defaults stable.

import { SYSTEM_PATH } from "./constants.js";

const ROOT_CREATE_FIELDS = Object.freeze({
  Actor: new Set(["prototypeToken"]),
  Item: new Set(),
});

let legacyTemplateCache = null;
let legacyTemplatePromise = null;

function deepClone(value) {
  return foundry.utils.deepClone(value);
}

function mergeData(base = {}, extra = {}) {
  return foundry.utils.mergeObject(
    deepClone(base),
    deepClone(extra),
    { inplace: false, recursive: true, overwrite: true }
  );
}

async function loadLegacyTemplate() {
  if (legacyTemplateCache) return legacyTemplateCache;
  if (!legacyTemplatePromise) {
    legacyTemplatePromise = fetch(`${SYSTEM_PATH}/template.json`)
      .then(async response => {
        if (!response.ok) {
          throw new Error(`Failed to load template defaults (${response.status})`);
        }
        const data = await response.json();
        legacyTemplateCache = data && typeof data === "object" ? data : {};
        return legacyTemplateCache;
      })
      .catch(error => {
        console.error("MWD | Failed to load legacy template defaults", error);
        legacyTemplateCache = {};
        return legacyTemplateCache;
      });
  }
  return legacyTemplatePromise;
}

function getDocumentConfig(templateData = {}, documentName = "") {
  const config = templateData?.[documentName];
  return config && typeof config === "object" ? config : {};
}

function resolveTemplateBlock(templateData = {}, documentName = "", templateName = "", seen = new Set()) {
  const normalizedName = String(templateName ?? "").trim();
  if (!normalizedName || seen.has(normalizedName)) return {};

  const documentConfig = getDocumentConfig(templateData, documentName);
  const templateConfig = documentConfig?.templates?.[normalizedName];
  if (!templateConfig || typeof templateConfig !== "object") return {};

  seen.add(normalizedName);
  let resolved = {};

  for (const nestedTemplateName of Array.from(templateConfig.templates ?? [])) {
    resolved = mergeData(resolved, resolveTemplateBlock(templateData, documentName, nestedTemplateName, seen));
  }

  const localData = deepClone(templateConfig);
  delete localData.templates;
  return mergeData(resolved, localData);
}

function resolveTypeBlock(templateData = {}, documentName = "", documentType = "") {
  const typeName = String(documentType ?? "").trim();
  if (!typeName) return {};

  const documentConfig = getDocumentConfig(templateData, documentName);
  const typeConfig = documentConfig?.[typeName];
  if (!typeConfig || typeof typeConfig !== "object") return {};

  let resolved = {};
  for (const templateName of Array.from(typeConfig.templates ?? [])) {
    resolved = mergeData(resolved, resolveTemplateBlock(templateData, documentName, templateName));
  }

  const localData = deepClone(typeConfig);
  delete localData.templates;
  return mergeData(resolved, localData);
}

export async function getDocumentTypeCreateDefaults(documentName = "", documentType = "") {
  const templateData = await loadLegacyTemplate();
  const resolved = resolveTypeBlock(templateData, documentName, documentType);
  const rootFields = ROOT_CREATE_FIELDS[documentName] ?? ROOT_CREATE_FIELDS.Item;
  const defaults = { system: {} };

  for (const [key, value] of Object.entries(resolved)) {
    if (rootFields.has(key)) defaults[key] = deepClone(value);
    else defaults.system[key] = deepClone(value);
  }

  return defaults;
}
