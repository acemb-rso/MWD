// tools/check-entropy.mjs
// Purpose: Ratchet check against helper duplication in src/. Fails when a
// function name gains a definition site beyond the committed baseline;
// shrinking duplication is always allowed (and should be locked in with
// --update). See docs/shared-utils.md for where shared helpers live.
//
// Usage:
//   node ./tools/check-entropy.mjs            # check against baseline (CI/pretest)
//   node ./tools/check-entropy.mjs --update   # rewrite baseline from current src/
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(ROOT, "src");
const BASELINE_PATH = join(ROOT, "tools", "entropy-baseline.json");
const UPDATE = process.argv.includes("--update");
const MIN_NAME_LENGTH = 3;

const DEF_REGEXES = [
  /(?:^|\s)function\s+([A-Za-z_$][\w$]*)\s*\(/g,
  /(?:^|\s)(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s+)?(?:function\b|\([^)]*\)\s*=>|[A-Za-z_$][\w$]*\s*=>)/g,
];

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (/\.(mjs|js)$/.test(entry)) yield path;
  }
}

function scan() {
  const nameToFiles = new Map();
  for (const file of walk(SRC_DIR)) {
    const text = readFileSync(file, "utf8");
    const rel = relative(ROOT, file).replace(/\\/g, "/");
    for (const regex of DEF_REGEXES) {
      regex.lastIndex = 0;
      let match;
      while ((match = regex.exec(text))) {
        const name = match[1];
        if (name.length < MIN_NAME_LENGTH) continue;
        if (!nameToFiles.has(name)) nameToFiles.set(name, new Set());
        nameToFiles.get(name).add(rel);
      }
    }
  }
  const duplicated = {};
  for (const [name, files] of nameToFiles) {
    if (files.size >= 2) duplicated[name] = [...files].sort();
  }
  return duplicated;
}

function totals(duplicated) {
  const names = Object.keys(duplicated).length;
  const redundant = Object.values(duplicated).reduce((sum, files) => sum + files.length - 1, 0);
  return { names, redundant };
}

const current = scan();
const { names, redundant } = totals(current);

if (UPDATE) {
  const sorted = Object.fromEntries(Object.entries(current).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(BASELINE_PATH, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`entropy baseline updated: ${names} duplicated names, ${redundant} redundant definitions`);
  process.exit(0);
}

let baseline;
try {
  baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
} catch (error) {
  console.error(`entropy check: cannot read baseline ${relative(ROOT, BASELINE_PATH)}: ${error.message}`);
  console.error("Run: node ./tools/check-entropy.mjs --update");
  process.exit(1);
}

const violations = [];
for (const [name, files] of Object.entries(current)) {
  const allowed = new Set(baseline[name] ?? []);
  const added = files.filter(file => !allowed.has(file));
  if (files.length > allowed.size && added.length > 0) {
    violations.push({ name, added, allowed: [...allowed] });
  }
}

if (violations.length > 0) {
  console.error(`entropy check FAILED: ${violations.length} helper name(s) gained definition sites.\n`);
  for (const { name, added, allowed } of violations) {
    console.error(`  ${name}`);
    for (const file of added) console.error(`    + ${file}`);
    if (allowed.length > 0) console.error(`    already defined in: ${allowed.join(", ")}`);
  }
  console.error("\nImport the helper from its shared module instead of redefining it —");
  console.error("see docs/shared-utils.md for the module directory. If the duplication is");
  console.error("intentional (unrelated methods sharing a generic name), lock it in with:");
  console.error("  node ./tools/check-entropy.mjs --update");
  process.exit(1);
}

const base = totals(baseline);
if (redundant < base.redundant || names < base.names) {
  console.log(`entropy check passed: ${names} duplicated names / ${redundant} redundant defs, below baseline (${base.names}/${base.redundant}).`);
  console.log("Lock in the improvement: node ./tools/check-entropy.mjs --update");
} else {
  console.log(`entropy check passed: ${names} duplicated names, ${redundant} redundant definitions (baseline ${base.names}/${base.redundant}).`);
}
