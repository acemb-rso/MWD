const fs = require("fs");
const path = require("path");

const ignoredDirectories = new Set([
  "node_modules",
  ".git",
  ".vscode",
  "dist"
]);

function collectJsonFiles(directory, results = []) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoredDirectories.has(entry.name)) continue;

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      collectJsonFiles(fullPath, results);
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      results.push(fullPath);
    }
  }

  return results;
}

function validateJsonFiles(filePaths) {
  const errors = [];

  for (const filePath of filePaths) {
    try {
      const contents = fs.readFileSync(filePath, "utf8");
      JSON.parse(contents);
    } catch (error) {
      errors.push({ filePath, message: error.message });
    }
  }

  return errors;
}

const files = collectJsonFiles(process.cwd());
const errors = validateJsonFiles(files);

if (errors.length > 0) {
  console.error("Invalid JSON files detected:");
  for (const error of errors) {
    console.error(`- ${error.filePath}: ${error.message}`);
  }
  process.exit(1);
}

console.log(`Validated ${files.length} JSON files successfully.`);
