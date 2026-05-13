A **visual, system-level overview** of how the roll workflow operates end-to-end, with emphasis on **where responsibility lives** and **how data flows**. This is meant to be architectural, not UI-tutorial level.

---

## 1. High-Level Roll Workflow (Big Picture)

**Mental model:**

> *Sheets emit intent → Engine resolves intent → Dice roll executes → Result is rendered → Interactions re-enter engine.*

### Pipeline Overview

```
[ User Click ]
     ↓
[ Roll Intent Payload ]
     ↓
[ Intent Resolver ]
     ↓
[ RollContext (canonical) ]
     ↓
[ Optional Roll Dialog ]
     ↓
[ Dice Execution ]
     ↓
[ Chat Card (flags.mwd.resolved) ]
     ↓
[ Post-Roll Actions (reroll / edge / modifiers) ]
```

Key design constraint you’ve enforced:

* **Everything converges into the same RollContext shape**
* **Sheets never execute logic**
* **Chat cards are stateless views over resolved data**

---

## 2. Entry Point: Roll Intent Payloads (UI Is Dumb)


### What the UI Actually Does

A clickable element only emits a **payload**, nothing more:

```json
{
  "intent": "skill",
  "key": "gunnery",
  "edge": { "pool": "physical.grit" },
  "tags": ["combat"]
}
```

**Important properties of payloads:**

| Property                              | Why it exists                         |
| ------------------------------------- | ------------------------------------- |
| `intent`                              | Selects resolver logic                |
| references (skill / attr / weapon id) | Late-bound, actor-agnostic            |
| `edge`                                | Declares *possibility*, not execution |
| `tags`                                | Domain routing & modifier filtering   |
| `source` (optional)                   | Enables macros / chat rerolls         |

The sheet does **not**:

* roll dice
* apply modifiers
* check Edge legality
* calculate pools

---

## 3. Intent Resolution Layer (Where Meaning Appears)

### Intent → Resolver Mapping

```
intent: "skill"       → resolve-skill.js
intent: "attribute"   → resolve-attribute.js
intent: "defense"     → resolve-defense.js
intent: "resistance"  → resolve-resistance.js
intent: "attack"      → resolve-attack.js
intent: "edge"        → resolve-edge.js
intent: "initiative"  → resolve-initiative.js
intent: "overload"    → resolve-overload.js
```

All dispatched from `src/modules/roll/intent/resolve-intent.js`.

Each resolver’s job is **only** to normalize inputs into a **RollContext**.

### Resolver Responsibilities

* Validate payload
* Pull actor data (skills, attributes, gear, statuses)
* Apply **domain tagging** (physical / mental / social / vehicle / mech)
* Collect **potential modifiers** (not applied yet)
* Declare **edge spend windows**
* Produce a **complete RollContext**

No dice are rolled here.

---

## 4. RollContext (The Canonical Shape)

Think of RollContext as the **single source of truth** for a roll.

```ts
RollContext {
  actorUuid
  intent
  domainTags[]
  dicePool {
    base
    skill
    attribute
    modifiers[]
  }
  edge {
    pool
    available
    allowedStages
  }
  opposition? {
    dn
    resistingActor?
  }
}
```

**Design win:**
Every roll type—skill, defense, mech action, vehicle sensor sweep—*looks the same downstream*.

---

## 5. Optional Roll Dialog (Thin UI Wrapper)

### What the Dialog Is (and Is Not)

**Is:**

* A temporary editor for RollContext fields
* Edge spend selector
* Modifier toggler
* Reroll permissions gate

**Is Not:**

* A rules engine
* A second resolver
* A source of truth

When confirmed, it hands **the same RollContext** back to execution.

---

## 6. Dice Execution (Foundry Dice APIs Only)

Execution step:

```
roll.execute(context)
```

Responsibilities:

* Build Foundry Dice terms
* Roll
* Count successes / complications
* Apply Edge spends or rerolls
* Produce a resolved outcome object

### Critical Outcome Edge

Critical outcome Edge is awarded only when the roll spends no Edge in either the pre-roll or post-roll window.

* Simple critical success: success margin must be greater than 4.
* Opposed critical success: net hits must be greater than 4.
* Critical failure: 0 successes and at least half the dice showing 1s.
* The award is +1 Edge to the roll domain's most depleted pool.
* If a chat-card post-roll Edge reroll is used after a critical award was already applied, the awarded Edge is revoked before the post-roll spend is paid.

No UI assumptions are made here.

---

## 7. Chat Cards = Stateless Views

### What Gets Stored

The chat message stores:

```ts
flags.mwd.resolved = {
  contextSnapshot,
  diceResults,
  edgeSpent,
  outcome
}
```

**Critical rule:**
Chat cards never “know” how to roll.

Buttons on chat cards simply emit **new payloads** referencing this resolved data.

Examples:

* “Reroll Failures”
* “Spend Edge (Post-Roll)”
* “Apply Resistance”

All re-enter the engine through the same path.

---

## 8. Why This Architecture Holds Together

### Stability

* UI can change without touching mechanics
* Mechanics can change without touching UI

### Extensibility

* Adding a new roll type = new resolver
* No new execution paths
* Vehicles and BattleMechs reuse everything

### Debuggability

* RollContext is inspectable
* flags.mwd.resolved is replayable
* Chat cards are deterministic views

---

## 9. Key File Locations

| Stage | File |
|-------|------|
| Entry point | `src/modules/roll/mwd-roll.js` |
| Intent dispatch | `src/modules/roll/intent/resolve-intent.js` |
| Modifier collection | `src/modules/roll/collect-modifiers.js` |
| Roll dialog (V2) | `src/modules/roll/mwd-roll-dialog.js` |
| Dice execution | `src/modules/roll/dice.js` |
| Result packaging | `src/modules/roll/build-resolved.js` |
| Chat card template | `templates/v2/roll/_mwd-roll-card.hbs` |
| Modifier providers | `src/modules/modifiers/providers/` |

---

## One-Sentence Summary (BLUF)

> **Clicks emit intent, intents resolve into a single RollContext, execution is centralized, and chat is a stateless reflection—everything else is just UI.**
