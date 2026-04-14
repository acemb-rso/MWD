import test from "node:test";
import assert from "node:assert/strict";

function getProperty(root, path) {
  return String(path ?? "")
    .split(".")
    .filter(Boolean)
    .reduce((value, key) => value?.[key], root);
}

test("itemRef sources can resolve an owned item quantity path", async () => {
  globalThis.foundry ??= { utils: {} };
  globalThis.foundry.utils.getProperty ??= getProperty;

  const {
    normalizeConsumptionSource,
    resolveConsumptionSourceState,
  } = await import("../src/modules/mwd/personal-damage.js");

  const actor = {
    items: new Map([
      ["gear-1", {
        id: "gear-1",
        name: "Frag Grenades",
        system: { quantity: 3 },
      }]
    ])
  };

  const source = normalizeConsumptionSource({
    id: "source-1",
    label: "Frag Grenades",
    kind: "itemRef",
    link: {
      itemId: "gear-1",
      itemPath: "quantity",
    },
  });

  const state = resolveConsumptionSourceState({ source, actor });

  assert.equal(state.kind, "itemRef");
  assert.equal(state.current, 3);
  assert.equal(state.max, 3);
  assert.equal(state.currentPath, "quantity");
  assert.equal(state.sourceItem?.name, "Frag Grenades");
});
