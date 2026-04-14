import test from "node:test";
import assert from "node:assert/strict";

import {
  normalizeLayoutDefinition,
  templateForLayoutNode,
} from "../src/modules/layout/layout-registry.js";

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
