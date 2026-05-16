import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function listJsFiles(relativeDir) {
  const dir = path.join(ROOT, relativeDir);
  return fs.readdirSync(dir, { withFileTypes: true })
    .flatMap(entry => {
      const relativePath = path.join(relativeDir, entry.name);
      if (entry.isDirectory()) return listJsFiles(relativePath);
      return entry.isFile() && entry.name.endsWith(".js") ? [relativePath] : [];
    });
}

test("sheets and chat do not import or call execution-only mechanics internals", () => {
  const scannedFiles = [
    ...listJsFiles("src/modules/sheets"),
    ...listJsFiles("src/modules/chat"),
  ];
  const forbidden = [
    /\bnew\s+Roll\b/,
    /\bHarmEngine\b/,
    /\binterpretOutcome\b/,
    /\bresolveAttackExecution\b/,
    /\bperformMachinePilotingCheck\b/,
    /\bperformMachineElectronicWarfare\b/,
    /\bperformMachineCriticalRepair\b/,
    /\bresolveBattlemechPendingHeat\b/,
    /\bresolveVehiclePendingStrain\b/,
  ];

  const violations = [];
  for (const file of scannedFiles) {
    const source = read(file);
    for (const pattern of forbidden) {
      if (pattern.test(source)) violations.push(`${file}: ${pattern}`);
    }
  }

  assert.deepEqual(violations, []);
});

test("mechanics facade files do not blanket-suppress caught exceptions", () => {
  const facadeFiles = [
    "src/modules/mwd/machine-quick-actions.js",
    "src/modules/harm/queued-attack-damage.js",
    "src/modules/roll/mwd-roll.js",
  ];
  const blanketSuppression = /catch\s*\([^)]*\)\s*{[^}]*return\s*{\s*ok:\s*false\s*}/s;

  const violations = facadeFiles
    .filter(file => blanketSuppression.test(read(file)));

  assert.deepEqual(violations, []);
});
