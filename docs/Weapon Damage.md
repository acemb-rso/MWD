Here is the updated **1-page implementation brief** with your finalized damage model.

---

# 🚀 MWD Damage System — Implementation Brief (v2)

## BLUF

Use a **small, fixed set of damage types** that represent how damage is applied to a target (penetration vs force vs energy), and express all weapon-specific behavior through **traits → normalized effects**. The engine operates only on structured data—never trait text.

---

# 1. Core Concepts

## 1.1 Damage Types (Closed Set)

```ts
type DamageType =
  | "penetrating"   // pierce, cut, tear (focused force)
  | "concussive"    // blunt force, impact, overpressure
  | "energy"        // directed non-thermal energy
  | "thermal"       // heat, burn, plasma
  | "electrical";   // shock, EM, system disruption
```

### Definitions (authoritative)

* **penetrating** → concentrated force defeating armor via puncture/cutting
* **concussive** → distributed force, shockwave, blunt trauma
* **energy** → beam/particle effects not primarily heat
* **thermal** → heat transfer, burning, plasma
* **electrical** → electrical/EM disruption

**Rule:**

* This set is **closed** (do not expand casually)
* Types represent **armor interaction**, not delivery method

---

## 1.2 Traits (Content Layer)

Traits are:

* human-readable
* authored on items
* shown in UI

```ts
traits: string[]; // ["Blast", "Corrosive", "Armor Piercing"]
```

Traits contain **no executable logic**.

---

## 1.3 Effects (Engine Layer)

Traits resolve into normalized effects used by the engine.

```ts
effects: {
  accuracyMod?: number;
  ap?: number;

  bonusVsArmorTag?: Record<string, number>; // e.g. { ferroFibrous: 0.33 }

  addHeat?: number;

  flags?: string[]; // ["corrosive", "emp", "blast"]
}
```

**All mechanics operate on `effects`, not `traits`.**

---

# 2. Weapon Data Model

```ts
weapon = {
  damageType: DamageType,
  damage: number,
  ap?: number,

  traits: string[],        // UI / authored
  effects: EffectPayload   // normalized (derived or stored)
}
```

---

# 3. Armor Data Model

```ts
armor = {
  value: number,
  tags: string[], // ["ferroFibrous"]

  resistances: {
    [DamageType]?: number
  }
}
```

---

# 4. Damage Resolution (Authoritative)

```ts
DamageApplied = max(0, DamageIncoming - NetResistance)

DamageIncoming = WeaponDamageEff        // flat — net hits do NOT add damage

NetResistance =
  BaseArmorResistance
  + DamageTypeMitigation
  + ArmorTagModifiers
  - WeaponAP
```

> **Net hits no longer add to damage.** Personal weapons — and synthetic /
> unarmed attacks — now deal **flat** damage, matching machine weapons. The
> margin of success (net hits) instead drives the **Personal Critical Hit**
> system: a high-margin hit inflicts a persistent combat *problem* rather than
> extra damage, because the Physical / Fatigue tracks already represent injury.
> See `personal-critical-hit.md`.
>
> `WeaponDamageEff` still reflects graze (half) vs. hit (full) and any
> clustering dice; only the former `+ NetHits` term is removed. Machine damage
> was already flat and is unchanged.

---

## 4.1 Processing Order (LOCK)

1. Compute `DamageIncoming`
2. Apply `DamageTypeMitigation`
3. Apply **effect-based modifiers**
4. Apply AP
5. Clamp ≥ 0

---

## 4.2 Damage Type Mitigation

```ts
DamageTypeMitigation =
  armor.resistances[weapon.damageType] ?? 0;
```

---

## 4.3 Trait / Effect Interaction

```ts
// Example: anti-ferro interaction
if (effects.bonusVsArmorTag?.ferroFibrous &&
    armor.tags.includes("ferroFibrous")) {
  DamageIncoming *= (1 + effects.bonusVsArmorTag.ferroFibrous);
}
```

---

## 4.4 Dice / Accuracy Effects

Applied earlier in roll pipeline:

```ts
diceParts.push({
  id: "weapon.accuracy",
  value: effects.accuracyMod,
  tags: ["weapon"]
});
```

---

# 5. Trait → Effect Resolution

Central registry:

```ts
const TraitRegistry = {
  "Armor Piercing": () => ({ ap: +2 }),

  "Corrosive": () => ({
    flags: ["corrosive"]
  }),

  "Anti-Ferro": () => ({
    bonusVsArmorTag: { ferroFibrous: 0.33 }
  }),

  "Inaccurate": () => ({ accuracyMod: -1 }),

  "Blast": () => ({
    flags: ["blast", "area"]
  })
};
```

### Resolution

```ts
weapon.effects = mergeEffects(
  weapon.traits.map(t => TraitRegistry[t]?.())
);
```

---

# 6. Design Rules (CRITICAL)

## Rule 1 — Damage Types = Resistance Lanes

* Represent how armor responds
* NOT delivery method (no “ballistic”, “missile”, etc.)

---

## Rule 2 — Traits Define Behavior

* All weapon special rules live here
* Traits are composable and modular

---

## Rule 3 — Engine Uses Effects ONLY

* Never parse trait strings during resolution
* Always use normalized `effects`

---

## Rule 4 — Tags Drive Conditional Logic

* Armor uses `tags`
* Effects use `flags` and `bonusVsArmorTag`

---

## Rule 5 — Separation of Concerns

| Layer       | Responsibility        |
| ----------- | --------------------- |
| UI          | emits intent payloads |
| Traits      | content definition    |
| Effects     | mechanical hooks      |
| Resolver    | builds RollContext    |
| DamageModel | computes final damage |

Architecture:

> UI emits → resolver normalizes → engine executes → chat reflects
>

---

# 7. Example (AX Missile)

```ts
weapon = {
  damageType: "penetrating",
  damage: 6,

  traits: ["Corrosive", "Anti-Ferro", "Inaccurate"],

  effects: {
    accuracyMod: -1,
    bonusVsArmorTag: { ferroFibrous: 0.33 },
    flags: ["corrosive"]
  }
}
```

---

# 8. Example Mappings

| Attack             | Damage Type |
| ------------------ | ----------- |
| Rifle shot         | penetrating |
| Sword slash/thrust | penetrating |
| Hammer / punch     | concussive  |
| Blast wave         | concussive  |
| Laser              | energy      |
| Plasma             | thermal     |
| EMP / taser        | electrical  |

---

# 9. Extensibility

To add new mechanics:

* Add a **trait**
* Map it in `TraitRegistry`

No changes required to:

* damage types
* core resolver
* UI

---

# ✅ Final Takeaway

* **Damage Types = baseline physics of harm**
* **Traits = authored special behavior**
* **Effects = executable rules**

Keep types small, push complexity into traits, and let the engine operate on normalized effects.
