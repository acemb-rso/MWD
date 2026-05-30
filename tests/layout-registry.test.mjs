import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  normalizeLayoutDefinition,
  templateForLayoutNode,
} from "../src/modules/layout/layout-registry.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function collectIncludes(node, includes = []) {
  if (!node || typeof node !== "object") return includes;
  if (node.type === "include") includes.push(node.partial);
  for (const child of node.children ?? []) collectIncludes(child, includes);
  for (const tab of node.tabs ?? []) {
    for (const child of tab.children ?? []) collectIncludes(child, includes);
  }
  for (const section of node.sections ?? []) {
    for (const child of section.children ?? []) collectIncludes(child, includes);
  }
  return includes;
}

test("layout normalization resolves node templates and class arrays", () => {
  const layout = normalizeLayoutDefinition({
    id: "demo",
    version: 1,
    root: {
      type: "tabs",
      classes: "alpha beta",
      tabs: [
        {
          id: "main",
          label: "Main",
          children: [{ type: "panel", title: "Body" }]
        }
      ]
    }
  });

  assert.deepEqual(layout.root.classes, ["alpha", "beta"]);
  assert.equal(layout.root.template, "mwd.v2.ui.nodes.tabs");
  assert.equal(layout.root.tabs[0].children[0].template, "mwd.v2.ui.nodes.panel");
});

test("unknown node types fall back to the debug template", () => {
  assert.equal(templateForLayoutNode({ type: "mystery" }), "mwd.v2.ui.nodes.unknown");
});

test("npc sheet layout is compact and omits character-only tabs", () => {
  const raw = fs.readFileSync(path.join(ROOT, "templates/v2/layouts/npc.layout.json"), "utf8");
  const layout = normalizeLayoutDefinition(JSON.parse(raw));
  const primaryTabs = layout.root.children
    .flatMap(child => child.children ?? [])
    .find(child => child.type === "tabs" && child.group === "primary");

  assert.equal(layout.id, "npc");
  assert.equal(layout.version, 1);
  assert.deepEqual(primaryTabs.tabs.map(tab => tab.id), ["combat", "skills", "equipment"]);
  assert.ok(!primaryTabs.tabs.some(tab => ["bio", "assigned", "notes"].includes(tab.id)));
});

test("npc layout uses only registered shared partial aliases", () => {
  const raw = fs.readFileSync(path.join(ROOT, "templates/v2/layouts/npc.layout.json"), "utf8");
  const layout = normalizeLayoutDefinition(JSON.parse(raw));
  const partials = new Set(collectIncludes(layout.root));

  assert.deepEqual(
    [...partials].sort(),
    [
      "mwd.v2.ui.actor.field-grid",
      "mwd.v2.ui.character.active-criticals",
      "mwd.v2.ui.character.combat-actions",
      "mwd.v2.ui.character.skills-column",
      "mwd.v2.ui.character.status-dashboard",
      "mwd.v2.ui.combat-awareness-preview",
      "mwd.v2.ui.condition-monitors",
      "mwd.v2.ui.placeholders.inventory-armor",
      "mwd.v2.ui.placeholders.inventory-consumables",
      "mwd.v2.ui.placeholders.inventory-gear",
      "mwd.v2.ui.placeholders.inventory-weapons",
    ].sort()
  );
});
