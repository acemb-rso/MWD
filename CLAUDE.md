# MWD — MechWarrior: Destiny system for Foundry VTT

Foundry VTT game system. Source in `src/`, unit tests in `tests/`, design docs
in `docs/`, compendium LevelDB data in `packs/` (binary churn there is normal
Foundry compaction — commit it separately from code).

## Commands

- `npm test` — full unit test suite (Node test runner; fast, run it before
  committing). Its `pretest` step runs the helper-duplication ratchet
  (`tools/check-entropy.mjs` vs `tools/entropy-baseline.json`) and fails the
  build if a helper name gains a definition site — fix by importing the shared
  helper, not by updating the baseline (only shrink the baseline via
  `npm run update:entropy-baseline` after consolidation).
- `npm run build` — Vite build
- `npm run validate:json` — JSON validation for data files

## Read the docs first

Before planning or implementing any feature or non-trivial change, read the
relevant docs in `docs/` — start with `docs/codebase-map.md` (architecture) and
`docs/Design Principles.md`, then the feature-specific doc (e.g.
`docs/heat-rules.md`, `docs/EW-Systems.md`, `docs/Indirect-Fire-Spotting.md`).
Design intent lives there, not in the code.

## Shared helpers — do not duplicate (important)

This codebase previously accumulated 341 copy-pasted helper definitions; they
have been consolidated and must not come back.

- **Never define a local coercion, clone, id, token, or actor-type helper.**
  Import from the shared modules instead — the full directory is in
  `docs/shared-utils.md`. Quick map:
  - number/string/array coercion, clamp → `src/modules/utils/coercion.js`
  - actor-type checks (`isMachineActor` etc.) → `src/modules/utils/actor-guards.js`
  - token document/actor/uuid/center access → `src/modules/utils/token.js`
  - deep clone → `src/modules/utils/clone.js`; random ids → `src/modules/utils/id.js`
  - settings bulk JSON parse/serialize → `src/modules/settings/bulk-json.js`
  - roll-resolver target/token context → `src/modules/roll/intent/token-context.js`
- **Check `foundry.utils` before writing any generic helper** (`randomID`,
  `deepClone`, `getProperty`, `mergeObject`, `escapeHTML`, `debounce`, ...).
- If a needed helper doesn't exist, add it to the matching shared module (with
  a test in `tests/`), not as a file-local copy.
- Sheet code imports from `src/modules/sheets/actor-sheet-support.js` rather
  than shadowing its helpers locally.

## Architecture invariants

- All actors are `MWDActor` (`src/modules/actor/mwd-actor.js`); all items are
  `MWDItem` (`src/modules/item/anarchy-base-item.js`). There is no per-type
  document class routing — type-specific behavior branches on `actor.type`.
- AppV2 sheets are the only supported authoring path.

## Conventions

- High-importance files carry `Purpose:` / pipeline comment headers — spec in
  `docs/commenting-convention.md`. Keep headers accurate when editing those
  files; give new shared modules a `Purpose:` header.
