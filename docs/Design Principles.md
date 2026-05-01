
# 🚧 MWD / Few C-Bills System

## **Design First Principles (Architectural Doctrine)**

---

## 0. BLUF (Non-Negotiable Core)

> **UI emits intent → Engine resolves → Execution is centralized → UI displays results.**

If a feature:

* puts logic in the sheet
* duplicates mechanics outside the engine
* or bypasses the resolver

…it is **architecturally incorrect**.

This is not preference—this is the system.

---

## 1. Separation of Responsibility (Hard Boundary)

### 1.1 The UI is a **dumb emitter**

* Sheets, buttons, chat cards, HUDs:

  * **DO NOT** calculate dice pools
  * **DO NOT** apply modifiers
  * **DO NOT** enforce rules
* They only emit **intent payloads**

✔ Example

```json
{ "intent": "skill", "key": "gunnery" }
```

❌ Anti-pattern

```js
// WRONG: sheet calculating pool
const pool = skill + attribute + mods;
```

This is explicitly enforced by your roll architecture 

---

### 1.2 The Engine is the **single source of truth**

* All rules live in:

  * resolvers
  * providers
  * execution pipeline

There must be **exactly one place** where:

* dice pools are assembled
* modifiers are applied
* outcomes are determined

---

### 1.3 Chat is a **stateless view**

* Chat messages store resolved data
* Buttons in chat:

  * emit new intents
  * never re-run logic locally

---

## 2. Intent → Context → Execution Pipeline (Canonical Flow)

Every system must follow this pipeline:

```
[ Click ]
   ↓
[ Intent Payload ]
   ↓
[ Resolver ]
   ↓
[ RollContext ]
   ↓
[ Execution ]
   ↓
[ Chat Output ]
```

This is the **core invariant of the system** 

---

### 2.1 Intent payloads are **declarative**

* No logic
* No computed values
* Only references + intent

✔ Good:

```json
{ "intent": "attack", "mode": "equipped" }
```

❌ Bad:

```json
{ "intent": "attack", "dicePool": 12 }
```

---

### 2.2 RollContext is the **only executable shape**

* All systems normalize into the same structure
* Every roll type (skill, attack, mech action) must converge here

---

### 2.3 Execution is **centralized and uniform**

* One execution path
* One dice system
* One result format

No feature may introduce:

* a parallel roll system
* a custom dice handler
* special-case execution paths

---

## 3. Data is Declarative, Not Behavioral

### 3.1 Data describes — it does not execute

✔ Good:

```js
{ ar: +2, tags: ["selfInduced"] }
```

❌ Bad:

```js
function applyBonus() { ... }
```

---

### 3.2 Systems operate on **parts, not rules**

From combat doctrine:

* Dice = parts
* DN = parts
* CQ = parts

Everything is:

* additive
* explainable
* inspectable



---

### 3.3 Tags drive behavior (not hardcoding)

✔ Good:

```js
tags: ["selfInduced"]
```

❌ Bad:

```js
if (action === "circleStrafe")
```

---

## 4. Composition Over Specialization

### 4.1 Build systems from reusable primitives

You already established:

* DicePart
* DNPart
* CQPart
* Providers

All mechanics must be composed from these.

---

### 4.2 No feature-specific pipelines

If a new feature requires:

* new execution logic
* new roll type handler
* separate math system

…it is wrong.

Instead:

* extend providers
* extend resolvers
* reuse the pipeline

---

## 5. “Sheet is Paper Puppet” Rule

> The sheet is a projection of state, not a source of logic.

### 5.1 Sheets:

* display data
* emit intent
* reflect results

### 5.2 Sheets never:

* compute derived mechanics
* enforce validation rules
* decide outcomes

This is reinforced by your clickable intent system 

---

## 6. Normalize Everything Early

### 6.1 Normalize at resolve time, not storage

* Raw data stays simple
* Derived data is created at runtime

✔ Good:

* Traits → normalized effects at resolve time

❌ Bad:

* Persisting computed effects into item schema unnecessarily

---

### 6.2 One canonical representation per concept

Examples:

| Concept | Canonical Form     |
| ------- | ------------------ |
| Roll    | RollContext        |
| Attack  | AttackResolution   |
| Damage  | DamageModel output |

No duplicates allowed.

---

## 7. Systems Must Be Extensible Without Refactoring

A new feature must be addable by:

* adding a resolver OR
* adding a provider OR
* adding data

If it requires:

* rewriting existing flows
* editing multiple sheets
* adding branching logic everywhere

…it violates the architecture.

---

### 7.1 Example (correct extensibility)

Adding:

* Catch Object (REF+REF)
* Recall Memory (INT+INT)

Should require:

* one payload definition
* no sheet changes

(You already designed for this) 

---

## 8. Validation Happens at System Boundaries

### 8.1 Validate at resolve time

* payload validity
* data references
* legality (edge, equipment, etc.)

### 8.2 Never validate in UI

✔ Good:

* resolver checks skill exists

❌ Bad:

* button disables based on deep logic

(UI may *hint*, but never enforce)

---

## 9. Explicit Data Flow > Implicit Magic

All transformations must be:

* visible
* traceable
* inspectable

This is why you use:

* breakdown structures
* part lists
* tagged contributions



---

## 10. Processing Order is Fixed (Do Not Violate)

From combat contract:

1. Collect dice parts
2. Collect DN parts
3. Collect CQ parts
4. Apply handling offsets
5. Finalize totals
6. Roll
7. Resolve outcome
8. Apply damage



Changing order = introducing bugs.

---

## 11. One Mechanic, One Meaning

Avoid semantic duplication:

* DN = difficulty only
* Dice mods = execution friction
* CQ = tactical advantage

Never mix meanings.

---

## 12. UI Layout Must Reflect System Structure

### 12.1 Layout is structural, not cosmetic

* Group by system responsibility
* Avoid “everything in one flow” layouts (known issue) 

---

### 12.2 UI elements map to intent

Every clickable element must correspond to:

* one intent
* one payload
* one resolver path

---

## 13. Prefer Late Binding

Use references, not embedded data:

✔ Good:

```json
{ "weaponId": "abc123" }
```

❌ Bad:

```json
{ "weaponDamage": 12 }
```

---

## 14. Fail Loud, Fail Early

* Invalid payload → error immediately
* Missing data → explicit notification
* Never silently fallback unless defined

---

## 15. Modularity Is Mandatory

Every feature must be:

* independently callable
* independently testable
* independently removable

Example pattern (already correct):

```js
rollRangedAttack()
rollMeleeAttack()
rollPilotingCheck()
```



---

# 🧠 Final Mental Model

### The System Is Not:

* a collection of sheets
* a set of roll buttons
* a bundle of mechanics

---

### The System Is:

> **A deterministic transformation pipeline from intent → context → resolution → outcome.**

Everything else is just:

* presentation
* input
* or configuration

---

# 🚫 Quick “Design Smell” Checklist

If you see any of these, stop:

* “The sheet needs to calculate…”
* “This feature needs its own roll logic…”
* “We’ll just hardcode this one case…”
* “We should store the computed result…”
* “This doesn’t fit the pipeline so let’s bypass it…”

---

# ✅ If You Follow This

You get:

* zero duplicated logic
* infinite extensibility
* consistent behavior across all systems (character, vehicle, mech)
* easy debugging (everything is inspectable)
* UI freedom without breaking mechanics

