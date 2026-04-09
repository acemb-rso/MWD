Here’s a **developer-ready design document** in your preferred style (structured, explicit, no fluff).

---

# 📘 Area Effects & Evade – System Design Specification

## 🎯 BLUF

Area effects resolve using **exposure tiers (Full/Major/Minor/None)**.
Evade reduces exposure by one tier, subject to rules that differ between:

* **Discrete events** (explosions, mines) → Evade always available
* **Persistent hazards** (fire, gas) → exposure escalates over time and Evade can become unavailable after saturation

All damage is resolved through the **Harm Engine** using exposure multipliers.

---

# 🧱 1. Core Concepts

## 1.1 Exposure Tiers

| Tier  | Multiplier |
| ----- | ---------- |
| Full  | 100%       |
| Major | 50%        |
| Minor | 25%        |
| None  | 0%         |

---

## 1.2 Exposure Rules

* Exposure is assigned per **target per effect**
* Exposure is determined by:

  * position within area
  * hazard definition (for persistent hazards)
* Exposure is always one of the four tiers (no hidden tiers)

---

## 1.3 Damage Resolution

```ts
finalDamage = baseDamage * exposureMultiplier
```

* resolved through HarmEngine
* no additional math in sheet/UI

---

# 🧩 2. Area Effect Types

## 2.1 Discrete Area Effects

Examples:

* explosions
* grenades
* mines
* artillery strikes

### Properties

* instantaneous
* resolved once
* no state tracking

---

## 2.2 Persistent Hazards

Examples:

* fire
* gas clouds
* radiation
* acid pools

### Properties

* remain on the field
* track exposure over time
* escalate exposure each tick

---

# 🧩 3. Exposure Assignment

## 3.1 Discrete Effects

Exposure determined by template position:

| Position    | Exposure |
| ----------- | -------- |
| center      | Full     |
| near center | Major    |
| edge        | Minor    |
| outside     | None     |

---

## 3.2 Persistent Hazards (On Entry)

Defined by hazard:

```ts
startExposure: Minor | Major | Full
```

Optional positional override allowed.

---

# 🧩 4. Evade

## 4.1 Core Rule

> Evade reduces exposure by one tier.

```ts
Full → Major → Minor → None
```

* cannot reduce below None
* costs Reaction / Burn (handled elsewhere)

---

# 🧩 5. Evade – Discrete Effects

## Behavior

* Evade is evaluated per event
* always available (no lockout)

### Flow

1. Determine exposure
2. Player may Evade
3. Reduce exposure by 1 tier
4. Resolve damage

---

# 🧩 6. Persistent Hazards

## 6.1 Required Definition

```ts
hazard: {
  type: "persistent",

  startExposure: "Minor" | "Major" | "Full",

  escalation: {
    rate: 1,
    interval: "turn",
    max: "Full"
  }
}
```

---

## 6.2 Actor State

Per actor per hazard:

```ts
hazardState: {
  tier: ExposureTier,
  turnsExposed: number,
  evadeLocked: boolean
}
```

---

## 6.3 Entry Flow

1. Assign `startExposure`
2. Player may Evade (if allowed)
3. Apply reduction
4. Initialize state:

```ts
tier = result
turnsExposed = 0
evadeLocked = false
```

---

## 6.4 Tick Flow (Start of Turn – recommended)

### Step 1 – Apply Harm

* use current exposure tier
* resolve via HarmEngine

---

### Step 2 – Escalate Exposure

```ts
if (tier < Full) tier += 1
turnsExposed += 1
```

---

## 6.5 Evade – Persistent Hazards

### Rule

* Evade reduces exposure by 1 tier **unless locked**

---

### Lockout Condition

> If Evade is used to reduce **Full → Major**, Evade becomes unavailable for that hazard.

```ts
if (previousTier === Full && evadeUsed) {
  evadeLocked = true
}
```

---

### Resulting Behavior

| State                    | Evade    |
| ------------------------ | -------- |
| Minor / Major            | allowed  |
| Full (not yet mitigated) | allowed  |
| Full (after mitigation)  | ❌ locked |

---

## 6.6 Exit Behavior

Recommended:

```ts
onExit: "clear"
```

* remove hazardState
* reset Evade availability

---

# 🧩 7. Optional Extensions

## 7.1 Effects at Full

```ts
onFull: {
  apply: ["burn+1"]
}
```

Triggered when:

* exposure is Full
* optionally per turn

---

## 7.2 Alternate Escalation Rates

Examples:

```ts
{ rate: 1, interval: "2 turns" }  // slow gas
{ rate: 1, interval: "turn" }     // fire
```

---

# 🧠 8. Design Principles

## 8.1 Deterministic Resolution

* no rolls for exposure
* no hidden tiers

---

## 8.2 Player Transparency

* always show:

  * initial exposure
  * Evade result
  * final exposure

Example:

```text
Exposure: FULL → MAJOR (Evade)
Damage: 12 → 6
```

---

## 8.3 System Separation

| System     | Role                   |
| ---------- | ---------------------- |
| Exposure   | determines scaling     |
| Evade      | modifies exposure      |
| HarmEngine | calculates damage      |
| Hazard     | controls time behavior |

---

## 8.4 No Overlapping Mechanics

* do not introduce:

  * additional exposure tiers
  * separate stacking damage systems
  * hidden mitigation states

---

# 🧪 9. Example

## Fire Hazard

```ts
{
  type: "persistent",
  startExposure: "Major",
  escalation: { rate: 1, interval: "turn" },
  onFull: { apply: ["burn+1"] }
}
```

---

### Turn Sequence

Turn 1:

* enter → Major
* Evade → Minor

Turn 2:

* escalate → Major
* damage at 50%

Turn 3:

* escalate → Full
* Evade → Major → lock Evade

Turn 4:

* escalate → Full
* Evade unavailable

---

# ✅ Final Summary

* Area effects assign exposure tiers (Full/Major/Minor/None)
* Evade reduces exposure by one tier
* Discrete effects resolve once; Evade always available
* Persistent hazards track and escalate exposure over time
* Evade becomes unavailable for a persistent hazard after mitigating Full exposure
* All damage scaling flows through exposure → HarmEngine

---

# One-line answer

Area effects use a four-tier exposure system scaled into the Harm Engine, with Evade reducing exposure per event for discrete attacks and acting as a limited, eventually locked mitigation tool within escalating persistent hazards.

---

# 🎯 UX/UI BLUF

Players and GMs need:

> **A two-stage interaction:**

1. **Targeting + exposure preview (spatial decision)**
2. **Per-target mitigation + apply (resource decision)**

Everything should make **exposure, Evade impact, and final damage visible before anything is committed**.

---

# 🧱 Core UX Principles

## 1. Always Show Before → After

Players must see:

```
Exposure: FULL → MAJOR (Evade)
Damage: 12 → 6
```

If this is not visible, the system will feel arbitrary.

---

## 2. Separate Spatial vs Mechanical Decisions

Two distinct phases:

### Phase 1 — Where does it land?

* template placement
* target identification
* exposure assignment

### Phase 2 — What do I do about it?

* Evade decisions
* preview damage
* apply mutations

---

## 3. No Hidden Resolution

* no auto-apply
* no silent mitigation
* everything is explicit and reversible until applied

---

# 🧩 Player UX Flow (Discrete AoE Attack)

## Step 1 — Choose Attack

Player clicks:

* weapon
* “Area Attack”

---

## Step 2 — Place Template (Canvas Interaction)

On the canvas:

* template preview appears
* player moves it
* targets highlight dynamically

### Visual Feedback

Each target shows:

* color-coded exposure ring:

  * 🔴 Full
  * 🟠 Major
  * 🟡 Minor

Optional:

* small floating label over token:

  * “FULL”
  * “MAJOR”

---

## Step 3 — Confirm Placement

Player clicks “Confirm”

---

## Step 4 — Chat Card: Exposure + Mitigation

A structured card appears:

```
[ Grenade Impact ]

Targets:
--------------------------------
Alaric
Exposure: FULL
Evade: [Use Reaction]
Damage: 12

Gaius
Exposure: MAJOR
Evade: [Use Reaction]
Damage: 6

Argenta
Exposure: MINOR
Evade: [Use Reaction]
Damage: 3
--------------------------------
[Apply All]   [Apply Individually]
```

---

## Step 5 — Evade Interaction

Each target row:

* button: **“Evade”**
* when clicked:

  * toggles ON
  * updates row live:

```
Exposure: FULL → MAJOR
Damage: 12 → 6
```

* disables if:

  * no reaction available
  * persistent hazard lockout

---

## Step 6 — Apply

Options:

### Per-target

* “Apply Damage” per row

### Bulk

* “Apply All”

---

## Step 7 — Post-Apply State

* row marked “Applied”
* Evade disabled
* reroll disabled (per your existing rules)

---

# 🧪 Persistent Hazard UX

## Entry Event

When entering hazard:

```
[ Fire Zone ]

Alaric enters zone
Exposure: MAJOR
Evade: [Use Reaction]
```

---

## Ongoing Display (Important)

Persistent hazards need **on-token visibility**.

### Token Overlay

Show:

```
🔥 MAJOR (2)
```

Where:

* MAJOR = current tier
* (2) = turns exposed

---

## Turn Tick Card

At start of turn:

```
[ Fire Hazard Tick ]

Alaric
Exposure: MAJOR → FULL
Damage: 6 → 12
Evade: [Unavailable]
```

---

# 🧠 GM UX

## 1. Hazard Creation Tool

GM Gadget panel:

```
Create Hazard:
- Type: Persistent
- Shape: Circle / Cone / Template
- Start Exposure: Minor / Major / Full
- Escalation: +1 per turn
- Effects at Full: [dropdown]
```

---

## 2. Live Hazard Visualization

On canvas:

* hazard zones visible
* color-coded intensity (optional gradient)

---

## 3. GM Override (Important)

GM can:

* adjust exposure tier per target
* override Evade availability
* manually apply harm

But this should be:

> **explicit override, not hidden behavior**

---

# 🎨 Visual Design Recommendations

## Exposure Colors

| Tier  | Color       |
| ----- | ----------- |
| Full  | Red         |
| Major | Orange      |
| Minor | Yellow      |
| None  | Transparent |

---

## Icons

* 💥 explosion
* 🔥 fire
* ☣ gas
* ⚡ energy

---

## Status Indicators

On token:

* exposure tier
* persistent hazard icon
* Evade lock (optional small 🔒)

---

# 🧠 Key UX Decisions That Matter Most

## 1. Evade is a Toggle, Not a Prompt

Do NOT:

* pop modal dialogs per target

DO:

* inline toggle per row

---

## 2. Everything Is Batchable

Players should:

* resolve multiple targets quickly
* not click 10 dialogs

---

## 3. Persistent State Is Visible on Tokens

If players can’t see:

* “I’m in fire”
* “I’m at Full exposure”

They will make bad decisions.

---

## 4. Hazard Identity Must Be Clear

Players should always know:

* what type of hazard
* how dangerous it is
* how it escalates

---

# 🚫 What to Avoid

## ❌ Per-target popups

Too slow

## ❌ Hidden Evade resolution

Breaks trust

## ❌ Auto-apply damage

Removes agency

## ❌ Mixed CQ + Exposure UI

Confusing

---

# 🔥 Best-in-Class Summary

You want:

### Canvas = spatial truth

* who is affected
* how much exposure

### Chat = mechanical truth

* Evade decisions
* damage preview
* apply actions

### Token = persistent truth

* ongoing hazard state

---

# One-line answer

The ideal UX is a two-phase system where players place an AoE template with real-time exposure visualization, then resolve per-target Evade and damage via a transparent chat card preview before explicitly applying results, with persistent hazards tracked directly on tokens.
