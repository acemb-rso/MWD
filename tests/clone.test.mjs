import test from "node:test";
import assert from "node:assert/strict";

import { cloneValue } from "../src/modules/utils/clone.js";

test("cloneValue clones plain data without retaining references", () => {
  const source = { nested: { value: 1 }, list: ["a"] };
  const cloned = cloneValue(source);

  assert.deepEqual(cloned, source);
  assert.notEqual(cloned, source);
  assert.notEqual(cloned.nested, source.nested);
  assert.notEqual(cloned.list, source.list);
});

test("cloneValue applies explicit fallback shape for undefined input", () => {
  assert.deepEqual(cloneValue(undefined, {}), {});
  assert.equal(cloneValue(undefined, null), null);
  assert.equal(cloneValue(undefined, undefined), undefined);
});

test("cloneValue uses Foundry deepClone when available", () => {
  const previousFoundry = globalThis.foundry;
  globalThis.foundry = {
    ...(previousFoundry ?? {}),
    utils: {
      ...(previousFoundry?.utils ?? {}),
      deepClone: value => ({ clonedByFoundry: true, value }),
    },
  };

  try {
    assert.deepEqual(cloneValue({ id: "x" }), { clonedByFoundry: true, value: { id: "x" } });
  } finally {
    if (previousFoundry === undefined) delete globalThis.foundry;
    else globalThis.foundry = previousFoundry;
  }
});

test("cloneValue falls back when Foundry deepClone cannot clone a value", () => {
  const previousFoundry = globalThis.foundry;
  globalThis.foundry = {
    ...(previousFoundry ?? {}),
    utils: {
      ...(previousFoundry?.utils ?? {}),
      deepClone() {
        throw new Error("cannot clone");
      },
    },
  };

  try {
    assert.deepEqual(cloneValue({ ok: true }), { ok: true });
  } finally {
    if (previousFoundry === undefined) delete globalThis.foundry;
    else globalThis.foundry = previousFoundry;
  }
});
