import test from "node:test";
import assert from "node:assert/strict";

import { forcedDeletion } from "../src/modules/utils/document-update.js";

test("forcedDeletion returns a deletion operator instance, never the class", () => {
  const previousDel = globalThis._del;
  const previousFoundry = globalThis.foundry;
  class ForcedDeletion { static create() { return SINGLETON; } }
  const SINGLETON = new ForcedDeletion();
  try {
    delete globalThis._del;
    globalThis.foundry = { data: { operators: { ForcedDeletion } } };
    assert.equal(forcedDeletion(), SINGLETON);
    assert.notEqual(forcedDeletion(), ForcedDeletion);

    const globalDel = new ForcedDeletion();
    globalThis._del = globalDel;
    assert.equal(forcedDeletion(), globalDel);

    delete globalThis._del;
    globalThis.foundry = {};
    assert.throws(() => forcedDeletion(), /unavailable/);
  } finally {
    if (previousDel === undefined) delete globalThis._del; else globalThis._del = previousDel;
    if (previousFoundry === undefined) delete globalThis.foundry; else globalThis.foundry = previousFoundry;
  }
});
