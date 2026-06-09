# Actor Preparation Cycle Hazard

## What happened

A code review identified that `getBattleArmorEnhancedStrengthBonus` (a bonus to STR from equipped Battle Armor) was being computed separately from `actor.getAttributeValue()`, while Bulky's reflexes penalty was routed through `getAttributeValue()` via `getActiveArmorTraitEffects`. The inconsistency was real: resolvers that called `getAttributeValue` got the Bulky penalty but not the BA enhanced strength bonus.

The attempted fix added `getEquippedBattleArmor(this)` inside `getAttributeValue()` so that both modifiers flowed through the same method. This produced an infinite loop:

```
getAttributeValue("strength")
  → getEquippedBattleArmor(this)
    → this.getPersonalCombatLoadout()
      → this._computePersonalCombatLoadout()
        → weapon.buildDefaultUnarmedProfile(actor)
          → actor.getAttributeValue("reflexes")   ← re-enters getAttributeValue
            → getEquippedBattleArmor(this)
              → ...
```

Maximum call stack exceeded. NPC sheets could not be opened.

---

## The constraint

`getAttributeValue()` is called **during actor preparation** — including from within `_computePersonalCombatLoadout` via `buildDefaultUnarmedProfile`. This means:

> **Any function called inside `getAttributeValue()` must not transitively call `getPersonalCombatLoadout()`.**

`getEquippedBattleArmor` violates this rule because it calls `getPersonalCombatLoadout`. So does anything else that needs to iterate the actor's combat loadout.

This is not obvious from reading `getAttributeValue` in isolation — the cycle spans four files and three abstraction layers.

---

## The safe pattern

The two-phase model that avoids this cycle:

**Phase 1 — `_prepareMonitors` (runs during `prepareData`)**

Compute heavy bonuses that require item iteration here. Store results in `system.derived` before calling `getAttributeValue`.

```js
// CORRECT: compute first, store, then call getAttributeValue
const activeBattleArmor = getEquippedBattleArmor(this);           // item iteration — safe here
const enhancedStrengthBonus = getBattleArmorEnhancedStrengthBonus(activeBattleArmor?.battleArmor);

this.system.derived ??= {};
this.system.derived.battleArmor = { enhancedStrengthBonus };      // store before getAttributeValue

const str = this.getAttributeValue("strength");                   // safe: reads from derived
```

**Phase 2 — `getAttributeValue()` (called anywhere, including during preparation)**

Read from `system.derived` only. Never call functions that iterate items or invoke `getPersonalCombatLoadout`.

```js
// CORRECT: read from pre-computed derived state
const baStrengthBonus = (this.isCharacterLike() && attributeKey === "strength")
  ? Number(this.system?.derived?.battleArmor?.enhancedStrengthBonus ?? 0) || 0
  : 0;

// WRONG: calls getEquippedBattleArmor → getPersonalCombatLoadout → cycle
const baStrengthBonus = getBattleArmorEnhancedStrengthBonus(getEquippedBattleArmor(this)?.battleArmor);
```

---

## The rule

**`getAttributeValue()` may only call:**
- Direct reads from `this.system`
- Pure functions that take plain data (no actor argument)
- `getActiveArmorTraitEffects(this)` — which reads items directly, does not call `getPersonalCombatLoadout`

**`getAttributeValue()` must never call:**
- `getEquippedBattleArmor()` or any function that calls `getPersonalCombatLoadout()`
- `getPersonalCombatLoadout()` directly
- Any function that iterates `this.items` and builds a loadout or profile

---

## How to check before adding a modifier to `getAttributeValue`

When adding a new modifier that needs to flow through `getAttributeValue`, ask:

1. **Where does the source data come from?**
   - Raw `system` field → safe, read it directly
   - Pre-computed `system.derived` field → safe, read it directly
   - Live item iteration or loadout call → **unsafe**, must be pre-computed in `_prepareMonitors` and stored in `system.derived`

2. **Is the value already available in `system.derived` by the time `getAttributeValue` runs?**
   - Yes → read it
   - No → add the computation to `_prepareMonitors`, store it, then read it

3. **Trace the call chain of any function you want to add.** If it reaches `getPersonalCombatLoadout` or `_computePersonalCombatLoadout` anywhere in the chain, it will cycle.

---

## Functions known to trigger the cycle

These must not be called (directly or transitively) from inside `getAttributeValue`:

| Function | Why |
|---|---|
| `getEquippedBattleArmor(actor)` | calls `actor.getPersonalCombatLoadout()` |
| `actor.getPersonalCombatLoadout()` | calls `_computePersonalCombatLoadout()` |
| `actor._computePersonalCombatLoadout()` | calls `buildDefaultUnarmedProfile(actor)` |
| `buildDefaultUnarmedProfile(actor)` | calls `actor.getAttributeValue()` |

If you add a new function that calls any of the above, add it to this table.
