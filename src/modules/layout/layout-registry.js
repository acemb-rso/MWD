// src/modules/layout/layout-registry.js
// Purpose: Load and normalize JSON layout definitions for AppV2 sheets.
// How it fits: Converts declarative layout JSON into a stable render contract before Handlebars sees it.

import { SYSTEM_NAME, LOG_HEAD } from "../constants.js";

export function templateForLayoutNode(node = {}) {
  switch (node.type) {
    case "stack": return "mwd.v2.ui.nodes.stack";
    case "hexabox": return "mwd.v2.ui.nodes.hexabox";
    case "panel": return "mwd.v2.ui.nodes.panel";
    case "include": return "mwd.v2.ui.nodes.include";
    case "tabs": return "mwd.v2.ui.nodes.tabs";
    case "accordion": return "mwd.v2.ui.nodes.accordion";
    default: return "mwd.v2.ui.nodes.unknown";
  }
}

function normalizeClasses(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return value.split(/\s+/).filter(Boolean);
  return [];
}

function normalizeLayoutNode(node) {
  if (!node || typeof node !== "object") return node;

  const normalized = {
    ...node,
    template: node.template ?? templateForLayoutNode(node),
    classes: normalizeClasses(node.classes),
    children: Array.isArray(node.children) ? node.children.map(normalizeLayoutNode) : [],
  };

  if (node.type === "tabs") {
    normalized.tabs = Array.isArray(node.tabs)
      ? node.tabs.map(tab => ({
          ...tab,
          children: Array.isArray(tab.children) ? tab.children.map(normalizeLayoutNode) : [],
        }))
      : [];
  }

  if (node.type === "accordion") {
    normalized.sections = Array.isArray(node.sections)
      ? node.sections.map(section => ({
          ...section,
          children: Array.isArray(section.children) ? section.children.map(normalizeLayoutNode) : [],
        }))
      : [];
  }

  return normalized;
}

export function normalizeLayoutDefinition(layout = {}) {
  return {
    ...layout,
    root: normalizeLayoutNode(layout.root ?? { type: "stack", children: [] }),
  };
}

/**
 * Loads JSON layout definitions from system package paths.
 * Caches results so each sheet pays the fetch/parse cost only once.
 */
export class LayoutRegistry {
  static #cache = new Map();

  static async get(layoutId) {
    if (this.#cache.has(layoutId)) {
      const cached = await this.#cache.get(layoutId);
      if (Number(cached?.version ?? 0) > 0) return cached;
      this.#cache.delete(layoutId);
    }

    const pending = this.#load(layoutId);
    this.#cache.set(layoutId, pending);

    const layout = await pending;
    if (Number(layout?.version ?? 0) <= 0) {
      this.#cache.delete(layoutId);
    }

    return layout;
  }

  static async #load(layoutId) {
    const url = `systems/${SYSTEM_NAME}/templates/v2/layouts/${layoutId}.layout.json`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
      return normalizeLayoutDefinition(await response.json());
    } catch (error) {
      console.error(`${LOG_HEAD}LayoutRegistry.get FAILED`, { layoutId, url, error });
      return normalizeLayoutDefinition({
        id: layoutId,
        version: 0,
        root: { type: "stack", children: [] },
      });
    }
  }
}
