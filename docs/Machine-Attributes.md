Here’s a clean, **design-doc ready** specification for **Chassis** and **Reliability**, aligned with everything you’ve locked.

---

# 🧱 Chassis (Machine Attribute)

### Definition

> **Chassis represents the machine’s mass, structural stability, and resistance to physical displacement.**

It models how hard the platform is to:

* knock down
* move
* destabilize
* physically overwhelm

---

## Mechanical Role

Chassis is a **physical resistance stat**.
It operates primarily as a **threshold (DN) or additive factor** in force-based interactions.

---

## Core Uses

### 1. Stability / Knockdown Resistance

Used as the base difficulty for destabilization:

```text
Knockdown DN = Chassis (+ force modifiers)
Roll: Piloting + Handling vs DN
```

---

### 2. Collision / Charge Resolution

Used as a contributor to impact:

```text
Charge Damage ∝ Chassis (+ speed / other factors)
```

or

```text
Resistance to impact = Chassis
```

---

### 3. Forced Movement Resistance

Used to resist displacement effects:

* explosions
* ramming
* environmental hazards

```text
Resistance = Chassis
```

---

### 4. Fall / Crash Mitigation

Combines with Handling:

```text
Mitigation / Test = Chassis + Handling
```

* Handling = control
* Chassis = structural tolerance

---

### 5. Structural Consequence Thresholds (Future-Facing)

Chassis may be used to:

* gate catastrophic collapse
* mitigate severe structural outcomes
* influence how location destruction propagates

---

## What Chassis Does NOT Do

Chassis does **not**:

* affect attack rolls
* affect defense rolls
* modify CQ (AR/DR)
* influence sensors or targeting
* affect degradation pacing directly

---

## Design Notes

* Chassis should remain **small scale (1–5)**
* It is often used as a **DN or resistance value**, not a dice pool stat
* It represents **inertia and structure**, not skill or system quality

---

## One-Line Summary

> **Chassis determines how difficult it is to physically disrupt or overpower the machine.**

---
Here is the **final, stripped-down, design-doc version** of **Reliability**, using only what is actually locked in your system.

---

# 🔧 Reliability (Machine Attribute)

## Definition

> **Reliability represents a machine’s ability to withstand sustained stress and to recover from system faults.**

It governs:

* how often the machine degrades under pressure
* how well it stabilizes after degradation
* how effectively it can resolve critical problems
* how long it can continue functioning before cascading failure

---

# 🎯 Mechanical Responsibilities

Reliability has **four core functions**.

---

## 1. Degradation Frequency (Primary Role)

Reliability determines how often condition advancement occurs via the **global pressure system**.

### Rule

```text
If Pressure ≥ Threshold(Reliability):
    → Advance condition on the highest-stress location
```

### Effect

* Higher Reliability → more hits required before degradation
* Lower Reliability → degradation occurs more frequently

---

## 2. Degradation Recovery

When a location advances its condition:

```text
Stress -= Reliability (minimum 0)
```

### Effect

* Higher Reliability → damage stabilizes after degradation
* Lower Reliability → stress persists and compounds

---

## 3. Remediation Rolls

Reliability contributes to all recovery actions:

```text
Recovery Roll = Reliability + Skill
Recovery DN = Base DN + Condition Modifier
```

Confirmed pairings:

* Reliability + Technician
* Reliability + System Operation
* Reliability + Gunnery
* Reliability + Computers

Recovery difficulty is further modified by the **location’s condition level**.

| Condition | Modifier                 |
| --------- | ------------------------ |
| Intact    | +0                       |
| Impaired  | +1                       |
| Damaged   | +2                       |
| Crippled  | +3                       |
| Disabled  | +4 (or special handling) |


### Effect

* Higher Reliability → problems are easier to resolve
* Lower Reliability → problems persist longer

---

## 4. Reliability Burn (Rare, Player-Initiated)

Players may spend Reliability to prevent degradation.

### Rule

```text
Spend 1 Reliability:
    → Cancel a condition advancement
    → Still reduce stress and pressure as if degradation occurred
```

### Properties

* Permanent loss
* Rare use
* High-impact decision

---

# ⚙️ Threshold Behavior

Reliability maps to a derived degradation threshold.

### Example curve

| Reliability | Threshold |
| ----------- | --------- |
| 0           | 1         |
| 1           | 2         |
| 2           | 3         |
| 3           | 4         |
| 4           | 6         |
| 5           | 8         |

---

## Special Case: Reliability = 0

```text
Threshold = 1
```

### Effect

* Every pressure gain triggers degradation
* Machine enters rapid failure state

---

# 🔁 System Context

Reliability operates within the core damage loop:

```text
Hit →
  +Stress (location)
  +Pressure (global)

If Pressure ≥ Threshold:
  → Advance condition
  → Reduce stress
  → Reduce pressure

Crit →
  Creates a problem
  May add pressure (specific results only)

Player →
  Repair OR ignore OR spend Reliability
```

---

# 🚫 Explicit Non-Roles

Reliability does **not**:

* reduce incoming damage
* modify attack or defense rolls
* affect CQ (AR/DR)
* influence hit probability
* directly apply penalties

---

# 🎯 One-Line Summary

> **Reliability determines how often a machine degrades under sustained pressure and how effectively it can recover once it begins to fail.**

