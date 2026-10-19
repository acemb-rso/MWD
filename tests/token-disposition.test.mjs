import test from "node:test";
import assert from "node:assert/strict";

import { isSameDisposition } from "../src/modules/utils/token.js";

test("the side test is binary: same disposition or not", () => {
  const token = disposition => ({ document: { disposition } });
  assert.equal(isSameDisposition(token(1), token(1)), true);
  assert.equal(isSameDisposition(token(-1), token(-1)), true);
  assert.equal(isSameDisposition(token(1), token(-1)), false);
  assert.equal(isSameDisposition(token(1), token(0)), false);
  assert.equal(isSameDisposition(token(-1), token(0)), false);
  assert.equal(isSameDisposition({ disposition: -1 }, token(-1)), true);
});
