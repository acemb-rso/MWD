import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { normalizeCarrier } from "../src/modules/mwd/rules.js";

const PACK_DIR = path.resolve("src/packs/qualities");

function readQualities() {
  return readdirSync(PACK_DIR)
    .filter(file => file.endsWith(".yml"))
    .map(file => JSON.parse(readFileSync(path.join(PACK_DIR, file), "utf8")))
    .filter(item => item.type === "quality");
}

test("quality compendium items carry shared rule packets or explicit narrative markers", () => {
  const qualities = readQualities();
  assert.equal(qualities.length, 42);

  const missing = qualities
    .filter(item => !(item.system?.rules?.length) && item.system?.narrativeOnly !== true)
    .map(item => item.name);
  assert.deepEqual(missing, []);

  const zeroRuleLimits = [];
  for (const item of qualities) {
    for (const rule of item.system?.rules ?? []) {
      for (const [scope, value] of Object.entries(rule.limits ?? {})) {
        if (value === 0) zeroRuleLimits.push(`${item.name}:${rule.id}:${scope}`);
      }
    }
  }
  assert.deepEqual(zeroRuleLimits, []);
});

test("previously descriptive qualities now expose structured contribution packets", () => {
  const byName = new Map(readQualities().map(item => [item.name, item]));

  assert.equal(
    byName.get("Brittle").system.rules.some(rule =>
      rule.outputs?.some(output =>
        output.type === "edgeEventHook"
        && output.trigger === "edgeSpentRollFailed"
        && output.effect?.operation === "burnDelta"
      )
    ),
    true,
  );
  assert.equal(
    byName.get("Equipped").system.rules.some(rule =>
      rule.outputs?.some(output =>
        output.type === "creationBudgetAdjustment"
        && output.budget === "inventoryPoints"
        && output.value === 2
      )
    ),
    true,
  );
});

test("quality shared rules normalize to character-specific output schemas", () => {
  const byName = new Map(readQualities().map(item => [item.name, item]));

  const fragile = normalizeCarrier(byName.get("Fragile"));
  assert.equal(fragile.rules[0].outputs[0].type, "damageAdjustment");
  assert.equal(fragile.rules[0].outputs[0].track, "physical");

  const hardTarget = normalizeCarrier(byName.get("Hard Target"));
  assert.deepEqual(
    hardTarget.rules[0].outputs.map(output => ({ type: output.type, ar: output.ar, dr: output.dr })),
    [{ type: "cqPart", ar: 0, dr: 2 }],
  );

  const spirited = normalizeCarrier(byName.get("Spirited"));
  assert.deepEqual(
    spirited.rules[0].outputs.map(output => ({ type: output.type, resource: output.resource, value: output.value })),
    [{ type: "activationBudgetAdjustment", resource: "sa", value: 1 }],
  );
});
