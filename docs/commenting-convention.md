# MWD Source Commenting Convention

Derived from [Design Principles.md](./Design%20Principles.md). This is the standard
for **file-level documentation of high-importance source files** — the ones that
carry the system's architectural invariants.

Its purpose follows Design Principle **§9 (Explicit Data Flow > Implicit Magic)**:
a reader (or a future edit) should be able to see, from the top of a file, *where
it sits in the intent → context → execution pipeline* and *which invariants must
not be violated*. It is **not** a mandate for line-by-line narration.

---

## 0. Scope — which files get this

Apply the full header to **high-importance files**: pipeline-core files
(resolvers, execution, context, providers), the canonical data leaves, and the
shared state hubs. As a rule of thumb, a file qualifies if it has high **fan-in**
(imported widely) or high **fan-out** (orchestrates many modules), or it owns a
doctrine invariant.

Small leaf helpers and one-off UI glue do **not** need the full block — a single
`// role:` line is enough. Don't add ceremony where there's no invariant to protect.

> To find candidates, rank files by fan-in / fan-out (count resolved relative
> `import ... from` edges per file). The current documented set is listed in §5.

---

## 1. The header block

Every high-importance file opens with a JSDoc block using these tags:

```js
// src/modules/roll/intent/resolve-attack.js
/**
 * @pipeline resolver
 * @role One or two sentences: what this file is responsible for, in pipeline terms.
 * @invariants
 *   - INVARIANT(boundary): produces context parts only; never rolls or applies damage (§1.2, §10).
 *   - INVARIANT(normalize): derives range/DN at resolve time from live state (§6.1).
 * @upstream   who calls into this file
 * @downstream what this file calls / hands off to
 */
```

### Tags

| Tag | Required | Meaning |
| --- | --- | --- |
| `@pipeline` | ✅ | Which stage of the pipeline this file lives on. One of the values in §2. This is the key line — it forces the file to declare which side of the hard boundary (§1) it's on. |
| `@role` | ✅ | 1–2 sentences describing the file's responsibility, phrased in pipeline/doctrine terms — not a restatement of its function names. |
| `@invariants` | ✅ | The load-bearing rules this file must uphold, each citing the Design Principle section it comes from. Use the `INVARIANT(...)` tags from §3. |
| `@upstream` | optional | Files/callers that feed into this one. Include when it aids traceability (§9). |
| `@downstream` | optional | Files this one calls or hands off to. |
| `@consumers` | optional | For shared services / state hubs: who reads state from this file (use instead of `@downstream` when the relationship is "read", not "call"). |

---

## 2. `@pipeline` stages

The canonical flow (Design Principles §2):

```
[ Click ] → [ Intent ] → [ Resolver ] → [ RollContext ] → [ Execution ] → [ Chat ]
```

| Value | Stage | Examples |
| --- | --- | --- |
| `ui-emitter` | Dumb emitter — emits intent, renders resolved data. Never computes mechanics (§1.1, §5, §1.3). | sheets, chat renderers |
| `resolver` | Turns a declarative intent into a RollContext; assembles parts (§2.1, §2.2). | `resolve-intent`, `resolve-attack` |
| `context` | Owns a canonical resolved shape — the one representation of a concept (§6.2). | `attack-resolution` |
| `execution` | The centralized execution path: collect → roll → interpret → build → apply (§2.3, §10). | `mwd-roll`, `collect-modifiers`, `interpret-outcome`, `build-resolved`, `harm-engine` |
| `provider` | A composable modifier primitive or the registry that runs them (§4.1). | `provider-registry`, `modifiers/providers/*` |
| `data` | Declarative, immutable data leaf — describes, never executes (§3.1). Depends on nothing. | `constants`, `config`, `skills` |
| `shared` | Cross-cutting state service or system wiring consumed by multiple stages. | `personal-combat-tracker`, `anarchy-system` |

---

## 3. `INVARIANT(...)` anchor tags

Where code implements a doctrine rule that is dangerous to change, tag it — in the
header's `@invariants` list, and/or inline at the exact spot the rule lives. Tags
are greppable, so `grep -rn "INVARIANT(order)" src/` audits every place an
invariant is asserted.

| Tag | Guards | Principle |
| --- | --- | --- |
| `INVARIANT(order)` | The fixed processing order (collect dice → DN → CQ → offsets → finalize → roll → resolve → apply). Reordering introduces bugs. | §10 |
| `INVARIANT(boundary)` | The UI/engine separation — UI emits, engine resolves, chat is a stateless view. No mechanics on the wrong side. | §1, §5 |
| `INVARIANT(canonical)` | One representation per concept; one execution path. No parallel/duplicate shapes or pipelines. | §2.2, §2.3, §6.2, §11 |
| `INVARIANT(normalize)` | Derive at resolve time from live state; don't persist/read pre-computed results. | §6.1 |

Inline anchor example (from `mwd-roll.execute()`):

```js
// INVARIANT(order): the numbered steps below are the fixed processing order
// (Design Principles §10): resolve intent → collect modifiers → dialog →
// finalize totals → roll (once) → interpret outcome → build resolved → chat.
// Reordering these — or rolling before modifiers are final — introduces bugs.
```

---

## 4. Rules

1. **Comment the *why* and the *contract*, never restate the code.** No `// increment i`.
2. **Cite the principle.** Every invariant references a Design Principles section, so a
   future editor knows *why* the rule exists before touching it.
3. **Headers are documentation, not behavior.** Adding/updating a header must be a
   comments-only change — zero logic edits in the same pass.
4. **Match surrounding style.** JSDoc `/** */` for the header block; `//` for inline anchors.
5. **Keep `@pipeline` honest.** If a file's stage is ambiguous, that's usually a design
   smell (Design Principles §"Design Smell" checklist) — fix the placement, don't fudge the tag.

---

## 5. Documented files

The convention currently covers the roll pipeline core plus its data leaves and
state hubs:

| File | `@pipeline` |
| --- | --- |
| `system/anarchy-system.js` | `shared` (wiring) |
| `roll/intent/resolve-intent.js` | `resolver` |
| `roll/intent/resolve-attack.js` | `resolver` |
| `roll/attack-resolution.js` | `context` |
| `roll/mwd-roll.js` | `execution` |
| `roll/collect-modifiers.js` | `execution` |
| `roll/outcome/interpret-outcome.js` | `execution` |
| `roll/build-resolved.js` | `execution` |
| `roll/renderers/render-chat.js` | `ui-emitter` |
| `harm/harm-engine.js` | `execution` |
| `modifiers/provider-registry.js` | `provider` |
| `core/constants.js` | `data` |
| `core/config.js` | `data` |
| `mwd/skills.js` | `data` |
| `combat/personal-combat-tracker.js` | `shared` |

When you add a header to a new high-importance file, add a row here so this table
stays the index of what's covered.
