# Data Migrations

How MWD upgrades persisted world data, and what every release must do when it
changes that data.

Code: [schema-migrations.js](../src/modules/system/migration/schema-migrations.js)
(pure transforms, unit-tested) and
[migration-runner.js](../src/modules/system/migration/migration-runner.js)
(Foundry executor).

---

## Two version numbers

| Number | Where | Purpose |
| --- | --- | --- |
| Package version | `system.json` `version` | What Foundry installs. Bump it on **every** release — live worlds only receive an update when this increases. The manifest points at `main`, so a bump merged to `main` is offered to live games immediately. |
| Data schema version | world setting `mwd.schemaVersion` (integer) | The shape of stored documents. Advances only when a schema step completes. Independent of the package version. |

The pre-framework setting `mwd.systemMigrationVersion` is read only to tell a
legacy world from a fresh one.

## Lifecycle

Runs first on `ready`, before any automation that writes documents.

1. Schema current → nothing happens.
2. Player or non-active GM → permanent warning; the active GM must migrate.
3. Active GM, `schemaVersion` unset, no actors/items and no legacy setting →
   fresh world; stamped at the current schema.
4. Otherwise the GM is asked to confirm, with a reminder to back up first.
   Declining leaves the world behind and shows a permanent error.
5. Each pending step: snapshot → plan → sequential awaited writes → **re-plan**.
   A step counts as complete only when no write failed and the re-plan has no
   operations left. Only then is `schemaVersion` set to that step.
6. A whispered GM chat report lists applied changes, failures, and review items.
   `mwd.schemaMigrationStatus` records `running` / `complete` / `failed` /
   `declined`.

While the world is behind, the GM-side ready-time writes (catalog backfills,
pilot-vision and detection sync) are skipped. Sheets still open; the world is
not locked, so do not play until the migration completes.

A world whose schema is **newer** than the installed system is refused with an
error — update the system instead.

## Failure and recovery

- **Recovery is from backup.** There is no automatic rollback.
- Every transform is gated on a legacy marker, so re-running after a partial or
  interrupted run is safe: reload and accept the migration again.
- A `running` status at startup means a previous run was interrupted; the
  confirmation dialog says so.
- **Review items** are documents the migration refused to guess about. They are
  left untouched and reported. Fix them on the sheet; the next run picks them up.

## Schema 1 — baseline (2026-10)

Consolidates the Anarchy-era migrations that never ran after the runner was
disabled on 2026-02-17. Each historical migration was checked against the `dev`
world; only transforms still needed, and not handled at runtime, were kept.

| Transform | Legacy marker | Change | Not guessed |
| --- | --- | --- | --- |
| Machine monitor storage | Vehicle/BattleMech without `flags.mwd.machineMonitorStorage = "remaining-v1"` (created before 2026-05-17) | Armor/Structure all 0 (no damage taken) → set to max. All at max → flag only. Applies to unlinked-token deltas too. | Partially damaged values: damage-taken or remaining cannot be told apart → review. |
| Willpower → Guts | `system.attributes.willpower` on character/NPC (actor or token delta); skills with `attribute: "willpower"` | Copy into Guts when Guts is absent or the template default (1), or equal; remove Willpower. Skills → `guts`. | Both non-default and different → both kept, review. |
| Hardpoint link | Mech weapon `system.hardpointId` / `hardpointType` / `hardpointSize` / `mountLocation` | Link `hardpointId` to an empty hardpoint, then remove the fields. | Hardpoint id no longer exists → review. |
| Typed armor | Armor `system.mitigation` | Convert to `mitigationByType` unless typed values already exist; remove `mitigation`. | — |

Dropped as unnecessary: legacy personal-weapon `ammo` and machine energy
payloads (normalized at runtime by `MWDItem`), vehicle profile/strain/crew and
`criticals[]` (supplied by `template.json` defaults), Reliability/Shock fields
(present in all inspected data).

Regression fixture: `tests/fixtures/world-dev-pre-schema1.json`, a sanitized
snapshot of the `dev` world before migration.

## Adding a schema step

1. Classify the change: does it alter persisted document shape or meaning?
   If not, no migration is needed — still bump `system.json`.
2. Append a step to `SCHEMA_MIGRATIONS` with the next integer `version`.
   Never edit a released step.
3. Gate every transform on a legacy marker and return review items instead of
   guessing. The plan must be empty when run against its own output.
4. Add tests: unit cases plus an apply-and-re-plan idempotency check.
5. Upgrade a copy of the campaign world before releasing.
