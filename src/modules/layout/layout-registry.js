import { SYSTEM_NAME, LOG_HEAD } from "../constants.js";

/**
 * Loads JSON layout definitions from system package paths.
 * Caches results so we only fetch once per layout id.
 */
export class LayoutRegistry {
  static #cache = new Map();

  static async get(layoutId) {
    if (this.#cache.has(layoutId)) return this.#cache.get(layoutId);

    const p = this.#load(layoutId);
    this.#cache.set(layoutId, p);
    return p;
  }

  static async #load(layoutId) {
    const url = `systems/${SYSTEM_NAME}/templates/v2/layouts/${layoutId}.layout.json`;

    let json;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      json = await res.json();
    } catch (e) {
      console.error(`${LOG_HEAD}LayoutRegistry.get FAILED`, { layoutId, url, e });
      json = { id: layoutId, version: 0, root: { type: "stack", children: [] } };
    }

    // Resolve node templates once so handlebars can just render `node.template`.
    return this.#resolve(json);
  }

  static #resolve(layout) {
    const walk = (node) => {
      if (!node || typeof node !== "object") return node;

      node.template ??= LayoutRegistry.#templateFor(node);

      node.children = Array.isArray(node.children) ? node.children : [];

      if (Array.isArray(node.classes)) {
        // ok
      } else if (typeof node.classes === "string") {
        node.classes = node.classes.split(/\s+/).filter(Boolean);
      } else {
        node.classes = [];
      }

    // Recurse children
    node.children = node.children.map(walk);

    // Normalize tabs once
    if (node.type === "tabs" && Array.isArray(node.tabs)) {
      node.tabs = node.tabs.map(t => ({
        ...t,
        children: (Array.isArray(t.children) ? t.children : []).map(walk)
      }));
    }

    return node;
  };


    return {
      ...layout,
      root: walk(layout.root ?? { type: "stack", children: [] })
    };
  }

  static #templateFor(node) {
    switch (node.type) {
      case "stack": return "mwd.v2.ui.nodes.stack";
      case "hexabox": return "mwd.v2.ui.nodes.hexabox";
      case "panel": return "mwd.v2.ui.nodes.panel";
      case "include": return "mwd.v2.ui.nodes.include";
      case "tabs": return "mwd.v2.ui.nodes.tabs";
      default: return "mwd.v2.ui.nodes.unknown";
    }
  }
}
