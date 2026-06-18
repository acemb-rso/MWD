import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const PACK_DIR = path.resolve("src/packs/asset-modules");

function readAssetModules() {
  return readdirSync(PACK_DIR)
    .filter(file => file.endsWith(".yml"))
    .map(file => JSON.parse(readFileSync(path.join(PACK_DIR, file), "utf8")));
}

test("generated asset modules carry shared rule packets or explicit narrative markers", () => {
  const modules = readAssetModules();
  assert.equal(modules.length, 47);

  const missing = modules
    .filter(item => !(item.system?.rules?.length) && item.system?.narrativeOnly !== true)
    .map(item => item.name);
  assert.deepEqual(missing, []);
});

test("previously text-only asset modules now have structured rule contributions", () => {
  const byName = new Map(readAssetModules().map(item => [item.name, item]));

  assert.equal(
    byName.get("Hardened Structural Components").system.rules.some(rule =>
      rule.outputs?.some(output => output.type === "queuedDomainRequest" && output.domain === "machineMonitor")
    ),
    true,
  );
  assert.equal(
    byName.get("Thermal Bank").system.rules.some(rule =>
      rule.outputs?.some(output => output.type === "heatAdjustment" && output.timing === "profile")
    ),
    true,
  );
  assert.equal(
    byName.get("Laser Heat Sinks").system.rules.some(rule =>
      rule.outputs?.some(output => output.type === "queuedDomainRequest" && output.domain === "heatEnvironment")
    ),
    true,
  );
  assert.equal(
    byName.get("NARC Beacon Launcher").system.rules.some(rule =>
      rule.outputs?.some(output => output.type === "actionAvailability" && output.actionId === "narcBeaconAttack")
    ),
    true,
  );
});

test("ECM support modules ship canonical area-status aura packets", () => {
  const byName = new Map(readAssetModules().map(item => [item.name, item]));
  const expected = [
    ["Guardian ECM", "guardian-shroud-aura", 180, "ecmShrouded"],
    ["Nova CEWS", "nova-cews-shroud-aura", 90, "ecmShrouded"],
    ["AR14 Sheathed Beacon", "ar14-sheathed-beacon-aura", 180, "epmBoosted"],
  ];

  for (const [name, id, radius, statusId] of expected) {
    const aura = byName.get(name)?.system?.runtime?.packets?.find(packet => packet.id === id);
    assert.equal(aura?.kind, "aura", name);
    assert.equal(aura?.radius, radius, name);
    assert.equal(aura?.allegiance, "ally", name);
    assert.deepEqual(aura?.grants, { statuses: [statusId] }, name);
  }
});
