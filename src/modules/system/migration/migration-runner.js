// src/modules/system/migration/migration-runner.js
/**
 * @pipeline shared
 * @role World-data migration gate. Registered on `init`, run first on `ready`:
 *   the active GM confirms a backup, then each schema step is snapshotted,
 *   planned (schema-migrations.js), written sequentially, and re-planned to
 *   verify. Policy and recovery: docs/migrations.md.
 * @invariants
 *   - INVARIANT(canonical): the single path that writes schema upgrades and
 *     advances `mwd.schemaVersion` (§2.3).
 *   - A failed, declined, or interrupted migration never advances the schema
 *     version; the world reports itself as behind and GM ready-time data
 *     writes are skipped (§14).
 * @upstream anarchy-system.js (init: settings; ready: runSchemaMigrationGate)
 * @downstream schema-migrations.js (plans), Foundry document updates
 */

import { SYSTEM_NAME, LOG_HEAD } from "../../core/constants.js";
import { CURRENT_SCHEMA_VERSION, getPendingSchemaSteps, planSchemaStep } from "./schema-migrations.js";

export const SETTING_SCHEMA_VERSION = "schemaVersion";
export const SETTING_SCHEMA_MIGRATION_STATUS = "schemaMigrationStatus";
// Pre-framework key written by the disabled Anarchy-era runner; only read to
// tell a legacy world from a fresh one.
const SETTING_LEGACY_MIGRATION_VERSION = "systemMigrationVersion";
const SCHEMA_VERSION_UNSET = -1;

export function registerSchemaMigrationSettings() {
  game.settings.register(SYSTEM_NAME, SETTING_SCHEMA_VERSION, {
    name: "MWD Data Schema Version",
    scope: "world",
    config: false,
    type: Number,
    default: SCHEMA_VERSION_UNSET,
  });
  game.settings.register(SYSTEM_NAME, SETTING_SCHEMA_MIGRATION_STATUS, {
    name: "MWD Data Schema Migration Status",
    scope: "world",
    config: false,
    type: Object,
    default: {},
  });
  game.settings.register(SYSTEM_NAME, SETTING_LEGACY_MIGRATION_VERSION, {
    name: "Legacy System Migration Version",
    scope: "world",
    config: false,
    type: String,
    default: "",
  });
}

export function getWorldSchemaVersion() {
  return Number(game.settings.get(SYSTEM_NAME, SETTING_SCHEMA_VERSION));
}

function isFreshWorld() {
  const legacyVersion = String(game.settings.get(SYSTEM_NAME, SETTING_LEGACY_MIGRATION_VERSION) ?? "").trim();
  return !legacyVersion && game.actors.size === 0 && game.items.size === 0;
}

function snapshotWorld() {
  return {
    actors: game.actors.map(actor => actor.toObject()),
    items: game.items.map(item => item.toObject()),
    scenes: game.scenes.map(scene => scene.toObject()),
  };
}

function deletionOperator() {
  return globalThis._del
    ?? foundry.data.operators?.ForcedDeletion?.create?.()
    ?? foundry.data.operators?.ForcedDeletion;
}

function buildUpdate(op) {
  const update = { ...op.set };
  const del = deletionOperator();
  for (const path of op.unset) update[path] = del;
  return update;
}

async function executeOperation(op) {
  const update = buildUpdate(op);
  const options = { mwdSchemaMigration: true, render: false };
  switch (op.kind) {
    case "actor": {
      const actor = game.actors.get(op.actorId);
      if (!actor) throw new Error("actor no longer exists");
      await actor.update(update, options);
      return;
    }
    case "actorItem": {
      const actor = game.actors.get(op.actorId);
      if (!actor?.items.get(op.itemId)) throw new Error("embedded item no longer exists");
      await actor.updateEmbeddedDocuments("Item", [{ _id: op.itemId, ...update }], options);
      return;
    }
    case "worldItem": {
      const item = game.items.get(op.itemId);
      if (!item) throw new Error("item no longer exists");
      await item.update(update, options);
      return;
    }
    case "token": {
      const scene = game.scenes.get(op.sceneId);
      if (!scene?.tokens.get(op.tokenId)) throw new Error("token no longer exists");
      await scene.updateEmbeddedDocuments("Token", [{ _id: op.tokenId, ...update }], options);
      return;
    }
    default:
      throw new Error(`unknown operation kind ${op.kind}`);
  }
}

async function runStep(step) {
  const plan = planSchemaStep(step, snapshotWorld());
  const failures = [];
  // Sequential on purpose: one document write at a time keeps failures
  // attributable and avoids overlapping updates to the same actor.
  for (const op of plan.operations) {
    try {
      await executeOperation(op);
    } catch (error) {
      console.error(`${LOG_HEAD}schema step ${step.version} failed on ${op.label}`, error);
      failures.push({ document: op.label, message: String(error?.message ?? error) });
    }
  }

  const verify = planSchemaStep(step, snapshotWorld());
  if (!failures.length && verify.operations.length) {
    for (const op of verify.operations) {
      failures.push({ document: op.label, message: "change did not persist (still pending after write)" });
    }
  }
  return { version: step.version, id: step.id, label: step.label, applied: plan.operations.length, reviews: verify.reviews, failures };
}

async function setStatus(status) {
  await game.settings.set(SYSTEM_NAME, SETTING_SCHEMA_MIGRATION_STATUS, { ...status, at: new Date().toISOString(), userId: game.user.id });
}

function escape(value) {
  return foundry.utils.escapeHTML(String(value ?? ""));
}

async function postReport({ fromVersion, results, ok }) {
  const sections = results.map(result => {
    const reviews = result.reviews.map(entry => `<li><strong>Review</strong> ${escape(entry.document)}: ${escape(entry.message)}</li>`);
    const failures = result.failures.map(entry => `<li><strong>Failed</strong> ${escape(entry.document)}: ${escape(entry.message)}</li>`);
    return `<h3>Schema ${result.version}: ${escape(result.label)}</h3><p>${result.applied} document change(s) applied.</p>${reviews.length || failures.length ? `<ul>${[...failures, ...reviews].join("")}</ul>` : ""}`;
  });
  const headline = ok
    ? `<p>World data upgraded from schema ${fromVersion} to ${getWorldSchemaVersion()}.</p>`
    : `<p><strong>Migration incomplete.</strong> The world remains at schema ${getWorldSchemaVersion()}. Restore your backup or fix the listed documents and reload to retry.</p>`;
  await ChatMessage.create({
    whisper: ChatMessage.getWhisperRecipients("GM"),
    content: `<h2>MWD Data Migration</h2>${headline}${sections.join("")}`,
  });
}

async function confirmMigration(fromVersion, priorStatus) {
  const interrupted = priorStatus?.state === "running"
    ? "<p><strong>A previous migration did not finish.</strong> Steps are safe to re-run, but restore your backup if documents look wrong.</p>"
    : "";
  return foundry.applications.api.DialogV2.confirm({
    window: { title: "MWD Data Migration Required" },
    content: `<p>This world's data is at schema ${fromVersion}; the MWD system requires schema ${CURRENT_SCHEMA_VERSION}.</p>${interrupted}<p><strong>Back up the world before continuing.</strong> Migrate now?</p>`,
    rejectClose: false,
  });
}

/**
 * Bring world data to CURRENT_SCHEMA_VERSION.
 * @returns {Promise<{ok:boolean, version:number}>} ok=false means the world is
 *   behind the system schema and data-writing GM automation should not run.
 */
export async function runSchemaMigrationGate() {
  let version = getWorldSchemaVersion();
  if (version === CURRENT_SCHEMA_VERSION) return { ok: true, version };

  if (!game.user.isActiveGM) {
    ui.notifications.warn("MWD world data needs a migration. Wait for the active GM to complete it before playing.", { permanent: true });
    return { ok: false, version };
  }

  if (version === SCHEMA_VERSION_UNSET) {
    if (isFreshWorld()) {
      await game.settings.set(SYSTEM_NAME, SETTING_SCHEMA_VERSION, CURRENT_SCHEMA_VERSION);
      return { ok: true, version: CURRENT_SCHEMA_VERSION };
    }
    version = 0;
  }

  let steps;
  try {
    steps = getPendingSchemaSteps(version);
  } catch (error) {
    ui.notifications.error(String(error?.message ?? error), { permanent: true });
    return { ok: false, version };
  }

  const priorStatus = game.settings.get(SYSTEM_NAME, SETTING_SCHEMA_MIGRATION_STATUS);
  if (!(await confirmMigration(version, priorStatus))) {
    await setStatus({ state: "declined", fromVersion: version });
    ui.notifications.error(`MWD world data is at schema ${version} (requires ${CURRENT_SCHEMA_VERSION}). Reload and accept the migration before playing.`, { permanent: true });
    return { ok: false, version };
  }

  const fromVersion = version;
  const results = [];
  await setStatus({ state: "running", fromVersion });
  ui.notifications.info(`Migrating MWD world data from schema ${fromVersion} to ${CURRENT_SCHEMA_VERSION}...`);

  for (const step of steps) {
    const result = await runStep(step);
    results.push(result);
    if (result.failures.length) break;
    await game.settings.set(SYSTEM_NAME, SETTING_SCHEMA_VERSION, step.version);
    version = step.version;
  }

  const ok = version === CURRENT_SCHEMA_VERSION;
  await setStatus({
    state: ok ? "complete" : "failed",
    fromVersion,
    toVersion: version,
    failures: results.flatMap(result => result.failures),
    reviews: results.flatMap(result => result.reviews),
  });
  await postReport({ fromVersion, results, ok });

  if (ok) ui.notifications.info(`MWD world data migrated to schema ${version}.`);
  else ui.notifications.error(`MWD data migration failed at schema ${version}. See the GM chat report.`, { permanent: true });
  return { ok, version };
}
