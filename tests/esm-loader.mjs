import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const testsDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testsDir, "..");
const repoRootUrl = pathToFileURL(`${repoRoot}${path.sep}`).href;

export async function load(url, context, defaultLoad) {
  // Keep the package itself CommonJS-friendly for tooling, but treat repo .js
  // source files as ESM during the test run so we can import the AppV2 modules
  // directly without a repo-wide package.json type switch.
  if (url.startsWith(repoRootUrl) && url.endsWith(".js")) {
    const source = await readFile(fileURLToPath(url), "utf8");
    return {
      format: "module",
      source,
      shortCircuit: true,
    };
  }

  return defaultLoad(url, context, defaultLoad);
}
