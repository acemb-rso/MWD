# Shared Utility Modules

Where common helpers live, and the rules that keep them from being duplicated.

A July 2026 audit found 153 helper names copy-pasted across 2+ files in `src/`
(341 redundant definitions — `toNumber` alone existed in 34 files). The modules
below are the consolidation of that cleanup. **Before writing a helper, check
this page.**

---

## Decision order

When you need a helper:

1. **Check `foundry.utils` first.** Foundry ships `randomID`, `deepClone`,
   `getProperty`, `setProperty`, `mergeObject`, `duplicate`, `escapeHTML`,
   `debounce`, and more. Do not reimplement these.
2. **Check the table below.** If the helper (or a near-synonym) exists, import it.
3. **If it doesn't exist and a second caller is plausible**, add it to the
   matching shared module below — not as a file-local function.
4. Only keep a helper file-local when it is genuinely domain-specific to that
   one file.

Never copy a helper from another file. If you find yourself copying, the helper
belongs in a shared module.

---

## Module directory

### `src/modules/utils/coercion.js` — primitive value shaping

`toNumber`, `toInteger`, `toNonNegativeInteger`, `toTrimmedString`, `asArray`,
`compactStringList`, `clamp`, `clampMin`.

Domain-neutral fallback/clamping semantics. If you need a new coercion
(e.g. `toBoolean`), it goes here.

### `src/modules/utils/actor-guards.js` — actor-type predicates

`isMachineActor`, `isPersonActor`, `isBattleMechActor`, `isVehicleActor`,
`getActorType`, `getDirectActorType`, `getMachineActorType`,
`MACHINE_ACTOR_TYPES`, `PERSON_ACTOR_TYPES`.

Works on actor documents, token-like wrappers, plain type strings, and test
fixtures. Never write a local `actor.type === "vehicle" || actor.type === "battlemech"`
check — use these.

### `src/modules/utils/token.js` — stateless token shape helpers

`getTokenDocument`, `getTokenObject`, `getTokenActor`, `getTokenId`,
`getTokenUuid`, `getTokenDisposition`, `getTokenCenter`,
`getMeasuredTokenCenter`.

Normalizes placeable-vs-document ambiguity. No canvas mutation, no mechanics.

### `src/modules/utils/clone.js` — deep cloning

`cloneValue(value, fallback)` — wraps `foundry.utils.deepClone` with
`structuredClone`/JSON fallbacks so it works in tests and on document-shaped
values.

### `src/modules/utils/id.js` — random ids

`createRandomId({ prefix, ... })` — wraps `foundry.utils.randomID` with a
deterministic-format fallback for test environments.

### `src/modules/sheets/actor-sheet-support.js` — sheet field/record helpers

Shared field and owned-item record helpers for AppV2 actor sheets. Sheet code
(`character-sheet-v2.js`, `battlemech-sheet-v2.js`, `vehicle-sheet-v2.js`,
`npc-sheet-v2.js`) must import from here rather than shadowing helpers locally.

### `src/modules/settings/bulk-json.js` — settings bulk JSON envelope

`serializeBulkJson`, `parseBulkJson`. The shared parse/serialize scaffold for
`settings/*` bulk editors. Each settings module keeps only its domain-specific
row normalization; the JSON syntax/shape handling lives here.

### `src/modules/roll/intent/token-context.js` — roll-resolver token context

`resolveTokenById`, `resolveTokenByUuid`, `resolveRollTargetToken`,
`getTokenDisplayName`, `withOwner` (re-exports `getTokenId`/`getTokenUuid`).

Canvas-aware token resolution for `roll/intent/resolve-*` files. Builds on
`utils/token.js`; resolvers must not hand-roll target lookup.

### `src/modules/mwd/typed-rule-values.js` — declarative rule values

`parseTypedValue`, `stringifyTypedValue`, `compareTypedValues`. Typed-value
semantics for authored rule and trait conditions.

### `src/modules/utils/document-type-defaults.js` — create-time defaults

Resolves actor/item creation defaults from the inlined defaults constant.

---

## Layering rules

- `utils/*` modules are dependency-light: they may import `core/constants.js`
  and each other, but never mechanics, sheets, resolvers, or document classes.
- Domain-adjacent shared helpers (e.g. `roll/intent/token-context.js`,
  `settings/bulk-json.js`) live next to their domain and may build on `utils/*`,
  but stay stateless.
- New shared modules get a `// Purpose:` header per
  [commenting-convention.md](commenting-convention.md) and a unit test in
  `tests/`.

## Keeping entropy down

Duplication is enforced by a ratchet check that runs automatically before the
test suite (`pretest`):

- `npm run check:entropy` — scans `src/` for function names defined in 2+
  files and fails if any name has gained a definition site beyond the
  committed baseline (`tools/entropy-baseline.json`). New duplicate names
  also fail.
- `npm run update:entropy-baseline` — rewrites the baseline from the current
  tree. Run it to lock in an improvement after consolidating helpers, or (rarely)
  to accept an intentional duplicate — unrelated methods that happen to share a
  generic name, not a copy-pasted helper.

The baseline only shrinks over time; a PR must never push it up. Baseline after
the July 2026 cleanup: **126 duplicated names, 205 redundant definitions**.
