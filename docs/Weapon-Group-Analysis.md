Here’s a **developer-ready spec** of everything you’ve locked. No fluff, no ambiguity, no “table interpretation required.”

---

# 🎯 BLUF

Fire Modes define **how weapons are used**, cost **SA**, and each resolution counts as **one attack**.
**Burn is NOT calculated per weapon/group**—it comes entirely from:

* number of attacks in an activation
* SA spent beyond 3

---

# 🧱 1. Core Concepts

## 1.1 Fire Mode (stateful)

```ts
type FireMode =
  | "chain fire"
  | "alpha strike"
  | "rapid fire";
```

* Stored on actor:

```ts
actor.system.combat.fireMode: FireMode
```

---

## 1.2 Persistence Rules

* Fire Mode persists between activations
* No automatic reset

```text
Default on combat start: "alpha"
```

---

## 1.3 Changing Fire Mode

```text
Cost: 1 Free Action (FA)
```

Implementation:

```ts
if (actor.flags.turn.fireModeChanged === true) rejectChange();
else {
  actor.system.combat.fireMode = newMode;
  actor.flags.turn.fireModeChanged = true;
}
```

Reset flag at start of activation.

---

# ⚙️ 2. Fire Mode Definitions

All Fire Modes resolve as **exactly one attack**.

---

## 2.1 Standard Fire

```ts
{
  mode: "chain fire",
  saCost: 1,
  groups: 1,
  targets: 1,
  repeats: 1
}
```

**Effect:**

* Select 1 weapon group
* Select 1 target
* Resolve 1 attack

---

## 2.2 Alpha Fire

```ts
{
  mode: "alpha strike",
  saCost: 2,
  groups: "multiple",
  targets: "any",
  repeats: 1
}
```

**Effect:**

* Select 1+ weapon groups
* Each group resolves once
* Targets may be:

  * all same (alpha strike)
  * distributed (split fire)

---

## 2.3 Rapid Fire

```ts
{
  mode: "rapid fire",
  saCost: 2,
  groups: 1,
  targets: 1,
  repeats: "multiple"
}
```

**Effect:**

* Select 1 weapon group
* Resolve multiple attacks against same target

---

# 🔥 3. Attack & Burn Model

## 3.1 Attack Definition (CRITICAL)

```text
Each Fire Mode resolution = 1 attack
```

* Internal weapon group resolutions DO NOT create additional attacks for Burn

---

## 3.2 Burn Sources (ONLY THESE)

From system rules :

### A. Multiple Attacks

```ts
burn += max(0, attacksThisActivation - 1);
```

---

### B. SA Beyond Threshold

```ts
const BASELINE_SA = 3;

if (totalSA > BASELINE_SA) {
  burn += (totalSA - BASELINE_SA);
}
```

---

## 3.3 Explicit Non-Sources

Burn is NOT affected by:

* number of weapon groups
* number of targets
* number of repeats
* fire mode choice directly

---

# 🧮 4. Attack Resolution Behavior

## 4.1 Weapon Group Resolution

Inside a single attack:

* Each selected weapon group resolves independently
* Each repeat creates additional resolution instances

Example:

```ts
for (group of selectedGroups) {
  for (i = 0; i < repeats[group]; i++) {
    resolveAttack(group, target[group]);
  }
}
```

---

## 4.2 Target Assignment

* Standard: 1 target
* Alpha: targets per group
* Rapid: 1 target

---

## 4.3 Range Profile Rule (REQUIRED)

For each weapon group:

```text
Group uses worst range modifier of any weapon in that group
```

---

# 🎮 5. Action Economy Integration

## 5.1 Activation Start

```ts
actor.turn = {
  saAvailable: 3,
  faAvailable: 1,
  attacksThisActivation: 0,
};
```
Each weapon group will need to track if they have already been used in the activation, and disable themselves (become unavailable for selection) if not in rapid fire mode.
Weapon groups need weapons with a number of used per activation greater than 1 to be usable in rapid fire mode.
---

## 5.2 Executing an Attack

```ts
function executeFireMode(actor) {
  const mode = actor.system.combat.fireMode;

  // Spend SA
  actor.turn.saSpent += mode.saCost;

  // Increment attack count
  actor.turn.attacksThisActivation += 1;

  // Resolve internal weapon group attacks
  resolveFireMode(mode);
}
```

---

## 5.3 Burn Calculation

Burn calculation should proceed as normal accounting for the number of SA and Attacks the actor has taken.
---

# 🧠 6. UX / Interaction Rules

## 6.1 Player Flow

1. (Optional) Change Fire Mode (FA)
2. Spend SA to execute Fire Mode
3. System resolves:

   * all group attacks
   * all repeats
4. Burn applied 
---

## 6.2 No Player-Facing Math

Player should not have to evaluate:

* number of groups
* number of attacks for Burn
* thresholds

They only choose:

* Fire Mode
* Weapon Groups
* Targets

---

# 🔒 7. Final Constraints

## Required

* Fire Mode persists across turns
* Default firemode = Alpha
* Each Fire Mode execution = 1 attack
* Burn ONLY from:

  * attack count
  * SA overflow

---

## Forbidden

* Burn per weapon
* Burn per group
* Burn per target
* Burn per repeat
* conditional Burn logic inside fire modes

---

# 🎯 One-Line Summary

Fire Modes define **how weapons are executed at an SA cost**, each execution counts as **one attack**, and **Burn is calculated solely from attack count and SA overflow**, never from internal weapon complexity.
