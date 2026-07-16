import test from "node:test";
import assert from "node:assert/strict";

import { createRandomId } from "../src/modules/utils/id.js";

function withGlobals({ foundry = undefined, random = null, now = null } = {}, run) {
  const previousFoundry = globalThis.foundry;
  const previousRandom = Math.random;
  const previousNow = Date.now;

  if (foundry === undefined) delete globalThis.foundry;
  else globalThis.foundry = foundry;
  if (random) Math.random = random;
  if (now) Date.now = now;

  try {
    return run();
  } finally {
    if (previousFoundry === undefined) delete globalThis.foundry;
    else globalThis.foundry = previousFoundry;
    Math.random = previousRandom;
    Date.now = previousNow;
  }
}

test("createRandomId returns Foundry randomID when available", () => {
  const id = withGlobals({
    foundry: { utils: { randomID: () => "foundry-id" } },
  }, () => createRandomId());

  assert.equal(id, "foundry-id");
});

test("createRandomId can prefix Foundry ids or preserve them unprefixed", () => {
  const prefixed = withGlobals({
    foundry: { utils: { randomID: () => "foundry-id" } },
  }, () => createRandomId({ prefix: "row" }));
  const unprefixed = withGlobals({
    foundry: { utils: { randomID: () => "foundry-id" } },
  }, () => createRandomId({ prefix: "row", prefixFoundry: false }));

  assert.equal(prefixed, "row-foundry-id");
  assert.equal(unprefixed, "foundry-id");
});

test("createRandomId builds deterministic short and timestamp fallbacks", () => {
  const short = withGlobals({
    random: () => 0.123456789,
  }, () => createRandomId({ prefix: "trait", fallbackLength: 8 }));
  const stamped = withGlobals({
    random: () => 0.123456789,
    now: () => 12345,
  }, () => createRandomId({ includeTimestamp: true, fallbackLength: 8 }));

  assert.equal(short.startsWith("trait-"), true);
  assert.equal(short.length, "trait-".length + 8);
  assert.equal(stamped.startsWith("12345-"), true);
});
