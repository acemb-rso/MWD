import fs from 'fs';
import path from 'path';

const root = process.cwd();
const backupRoot = path.join(root, 'backups', `headers-backup-${new Date().toISOString().replace(/[:.]/g,'-')}`);
fs.mkdirSync(backupRoot, { recursive: true });

function walk(dir) {
  const results = [];
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === 'backups') continue;
    const filePath = path.join(dir, name);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results.push(...walk(filePath));
    } else {
      if (filePath.endsWith('.js') || filePath.endsWith('.hbs')) results.push(filePath);
    }
  }
  return results;
}

function readStart(filePath, n=16){
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.split(/\r?\n/);
  return lines.slice(0,n).join('\n');
}

function alreadyHasHeader(start, relPath){
  if (!start) return false;
  if (start.includes(relPath)) return true;
  // also accept a generic comment at top for hbs/js
  const lines = start.split(/\r?\n/).map(l=>l.trim()).filter(l=>l.length>0);
  if (lines.length===0) return false;
  const first = lines[0];
  if (first.startsWith('//') || first.startsWith('/*') || first.startsWith('{{!--') || first.startsWith('<!--')) {
    // if it already looks like a header that mentions a path-like string, consider it present
    if (/\/(?:src|templates|modules|tools|styles)\//.test(first)) return true;
  }
  return false;
}

function inferPurpose(relPath){
  const parts = relPath.split('/');
  if (relPath.includes('/templates/') || relPath.startsWith('templates/')) return `Handlebars template for ${parts.slice(-1)[0].replace(/\.hbs$/,'')}. Used to render UI in the system.`;
  if (relPath.includes('/modules/') || relPath.includes('/src/modules/') ) return `System module or client script for ${parts.slice(-1)[0].replace(/\.js$/,'')}. Integrates with the system's JavaScript modules.`;
  if (relPath.includes('/styles/')) return `Stylesheet or related asset (note: file extension suggests this is not a stylesheet).`;
  if (relPath.includes('/tools/')) return `Utility or tooling script used for dev/build tasks.`;
  if (relPath.includes('/packs/') || relPath.includes('/packs')) return `Compendium pack helper or related script.`;
  return `Project source file ${parts.slice(-1)[0]}. Purpose: provides functionality for the system; update this description with details.`;
}

function findReferences(allFiles, targetPath, selfPath){
  const name = path.basename(targetPath).replace(/\.(js|hbs)$/,'');
  let count = 0;
  for (const f of allFiles){
    if (f === selfPath) continue;
    try {
      const txt = fs.readFileSync(f, 'utf8');
      if (txt.includes(name) || txt.includes(targetPath)) count++;
    } catch(e){ }
  }
  return count;
}

const files = walk(root);
const allFiles = [];
(function gather(dir){
  for (const name of fs.readdirSync(dir)){
    if (name === 'node_modules' || name === '.git' || name === 'backups') continue;
    const p = path.join(dir, name);
    const s = fs.statSync(p);
    if (s.isDirectory()) gather(p); else allFiles.push(p);
  }
})(root);

let modified = 0;
let skipped = 0;
let legacyMarked = 0;

for (const filePath of files){
  const relPath = path.relative(root, filePath).replace(/\\/g,'/');
  const start = readStart(filePath, 16);
  if (alreadyHasHeader(start, relPath)){
    skipped++;
    continue;
  }

  const refs = findReferences(allFiles, relPath, filePath);
  const isLegacy = refs === 0;

  const purpose = inferPurpose(relPath);
  const headerLines = [];

  if (filePath.endsWith('.js')){
    headerLines.push(`// ${relPath}`);
    headerLines.push(`// Purpose: ${purpose}`);
    if (isLegacy) headerLines.push(`// NOTE: Marked LEGACY — no references found across the codebase. May support an older system.`);
  } else if (filePath.endsWith('.hbs')){
    headerLines.push(`{{!--`);
    headerLines.push(`${relPath}`);
    headerLines.push(`Purpose: ${purpose}`);
    if (isLegacy) headerLines.push(`NOTE: Marked LEGACY — no references found across the codebase. May support an older system.`);
    headerLines.push(`--}}`);
  }

  const header = headerLines.join('\n') + '\n\n';

  // backup
  const backupPath = path.join(backupRoot, relPath);
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.copyFileSync(filePath, backupPath);

  // write
  const original = fs.readFileSync(filePath, 'utf8');
  fs.writeFileSync(filePath, header + original, 'utf8');

  modified++;
  if (isLegacy) legacyMarked++;
  console.log(`Updated: ${relPath} ${isLegacy ? '[LEGACY]' : ''}`);
}

console.log('\nSummary:');
console.log(`Files scanned: ${files.length}`);
console.log(`Modified: ${modified}`);
console.log(`Skipped (already had header): ${skipped}`);
console.log(`Marked legacy: ${legacyMarked}`);
console.log(`Backups saved to: ${backupRoot}`);
