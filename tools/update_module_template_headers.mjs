import fs from 'fs';
import path from 'path';

const root = process.cwd();
const backupRoot = path.join(root, 'backups', `headers-content-backup-${new Date().toISOString().replace(/[:.]/g,'-')}`);
fs.mkdirSync(backupRoot, { recursive: true });

function walk(dir, exts){
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const name of fs.readdirSync(dir)){
    if (name === 'node_modules' || name === '.git' || name === 'backups') continue;
    const filePath = path.join(dir, name);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) results.push(...walk(filePath, exts));
    else {
      for (const e of exts) if (filePath.endsWith(e)) { results.push(filePath); break; }
    }
  }
  return results;
}

function stripExistingHeader(content, relPath){
  const lines = content.split(/\r?\n/);
  // JS header: starts with // <path> or /* ... */ containing path
  if (lines.length===0) return content;
  // If first non-empty line contains the relative path, remove until first blank line after header
  const firstNonEmptyIdx = lines.findIndex(l=>l.trim().length>0);
  if (firstNonEmptyIdx===-1) return content;
  const first = lines[firstNonEmptyIdx].trim();
  const relEsc = relPath.replace(/\//g,'\/');
  if (first.startsWith('//') && first.includes(relPath)){
    // remove from firstNonEmptyIdx through next blank line
    let i = firstNonEmptyIdx+1;
    while (i<lines.length && lines[i].trim()!=='') i++;
    return lines.slice(0, firstNonEmptyIdx).concat(lines.slice(i)).join('\n');
  }
  if (first.startsWith('{{!--') && content.includes(relPath)){
    // remove up to --}} closing
    const endIdx = content.indexOf('--}}');
    if (endIdx!==-1){
      return content.slice(endIdx+4).replace(/^\r?\n/,'');
    }
  }
  if ((first.startsWith('/*') || first.startsWith('/**')) && content.includes(relPath)){
    const endIdx = content.indexOf('*/');
    if (endIdx!==-1) return content.slice(endIdx+2).replace(/^\r?\n/,'');
  }
  return content;
}

function summarizeJS(content, relPath){
  const t = content;
  const parts = [];
  if (/class\s+\w+Sheet\s+extends\s+/m.test(t) || /extends\s+ActorSheet|extends\s+ItemSheet|extends\s+Application/.test(t)) parts.push('Provides a Sheet / UI class for entities (actor/item) or an application.');
  if (/Hooks\.(on|once)\s*\(/.test(t)){
    const hooks = Array.from(t.matchAll(/Hooks\.(?:on|once)\(['"]([^'"]+)['"]/g)).slice(0,3).map(m=>m[1]);
    parts.push(`Registers Foundry hooks${hooks.length?`: ${hooks.join(', ')}`:''}.`);
  }
  if (/game\.settings\.register/.test(t)) parts.push('Registers system settings.');
  if (/renderTemplate\(|renderTemplate\s*\(/.test(t)) parts.push('Renders Handlebars templates at runtime.');
  if (/register(Actor|Item)Sheet/.test(t) || /Actors\.registerSheet|Items\.registerSheet/.test(t)) parts.push('Registers custom actor/item sheets.');
  if (/preloadTemplates\(|preload\s*Templates/.test(t) || /Handlebars/.test(t)) parts.push('Preloads or manages Handlebars templates.');
  if (/export\s+default|module\.exports/.test(t)) parts.push('Exports module functionality.');
  if (/anarchy/i.test(t)) parts.push('References legacy Anarchy system behavior.');
  if (parts.length===0){
    const fn = t.match(/function\s+(\w+)/);
    const ex = t.match(/const\s+(\w+)\s*=\s*\(/);
    if (fn) parts.push(`Defines function \`${fn[1]}\`.`);
    else if (ex) parts.push(`Defines helper or exported constant \`${ex[1]}\`.`);
    else parts.push('Provides module-level utilities or helpers.');
  }
  return parts.join(' ');
}

function summarizeHBS(content, relPath){
  const t = content;
  const parts = [];
  if (/{{>\s*([\w\-\/\.]+)/.test(t)) parts.push('Includes partials to compose UI components.');
  if (/{{#each\s+/.test(t)) parts.push('Renders collections with `each` blocks.');
  if (/{{#if\s+/.test(t)) parts.push('Contains conditional display logic.');
  if (/class=\"[\w\- ]+\"/.test(t) || /class='[\w\- ]+'/.test(t)) parts.push('Contains styled HTML nodes for UI layout.');
  if (/name=\"?\w+\"?/.test(t) || /id=\"?\w+\"?/.test(t)) parts.push('Includes form controls or labeled fields.');
  if (parts.length===0) parts.push('Handlebars template for rendering a system UI fragment.');
  return parts.join(' ');
}

function findReferences(allFiles, targetPath, selfPath){
  const name = path.basename(targetPath).replace(/\.(js|hbs)$/,'');
  let count = 0;
  for (const f of allFiles){
    if (f === selfPath) continue;
    try {
      const txt = fs.readFileSync(f, 'utf8');
      if (txt.includes(name) || txt.includes(targetPath) || txt.includes(path.basename(targetPath))) count++;
    } catch(e){ }
  }
  return count;
}

const targets = [];
const moduleDir = path.join(root, 'src', 'modules');
const templatesDir = path.join(root, 'templates');

targets.push(...walk(moduleDir, ['.js']));
targets.push(...walk(templatesDir, ['.hbs']));

// gather all files for reference search
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

for (const filePath of targets){
  const relPath = path.relative(root, filePath).replace(/\\/g,'/');
  const original = fs.readFileSync(filePath, 'utf8');
  const stripped = stripExistingHeader(original, relPath);
  const refs = findReferences(allFiles, relPath, filePath);
  const isLegacy = refs === 0;
  let summary = '';
  if (filePath.endsWith('.js')) summary = summarizeJS(stripped, relPath);
  else if (filePath.endsWith('.hbs')) summary = summarizeHBS(stripped, relPath);

  const headerLines = [];
  if (filePath.endsWith('.js')){
    headerLines.push(`// ${relPath}`);
    headerLines.push(`// Purpose: ${summary}`);
    headerLines.push(`// How it fits: Describes role within src/modules or template rendering pipeline.`);
    if (isLegacy) headerLines.push(`// NOTE: Marked LEGACY — no direct references found across repository.`);
  } else {
    headerLines.push('{{!--');
    headerLines.push(`${relPath}`);
    headerLines.push(`Purpose: ${summary}`);
    headerLines.push(`How it fits: Used by rendering code to produce UI fragments.`);
    if (isLegacy) headerLines.push(`NOTE: Marked LEGACY — no direct references found across repository.`);
    headerLines.push('--}}');
  }

  const header = headerLines.join('\n') + '\n\n';

  // backup
  const backupPath = path.join(backupRoot, relPath);
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.copyFileSync(filePath, backupPath);

  // write
  fs.writeFileSync(filePath, header + stripped, 'utf8');

  modified++;
  if (isLegacy) legacyMarked++;
  console.log(`Updated: ${relPath} ${isLegacy ? '[LEGACY]' : ''}`);
}

console.log('');
console.log(`Targets processed: ${targets.length}`);
console.log(`Modified: ${modified}`);
console.log(`Marked legacy: ${legacyMarked}`);
console.log(`Backups saved to: ${backupRoot}`);
