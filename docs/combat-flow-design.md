# 0) Design Doctrine (Locked)

These are the rules the engine enforces:

1. **DN = Range + Motion only**
2. **Dice pool mods = execution friction** (environment, heat, system damage, sensors, tracking penalty)
3. **CQ = AR – DR** from tactical packages and state
4. **NetHits saturates via** `min(CQ, Margin)`
5. **Graze floor:** if `Margin >= 1` but `NetHitsRaw <= 0` ⇒ **Graze**
6. **Speed is tiered state**; motion difficulty saturates and then becomes tracking pool penalty
7. **Handling affects piloting** and **offsets eligible AR/DR penalties only**, via tags (no name-based logic)

---

# 1) Core Resolver Contract

## `AttackIntentResolver.resolve(ctx) -> AttackResolution`

**Input (`ctx`) must already contain:**

* attacker, target
* weapon / attack mode
* range band (or distance) + LOS info
* movement state (speed tiers, movement mode)
* chosen tactical actions for this attack (“packages”)

**Output must include:**

* computed dice pool breakdown
* computed DN breakdown
* computed CQ breakdown (AR/DR with tags)
* roll results (hits, margin)
* outcome (miss/graze/hit)
* nethits
* damage breakdown + applied damage
* state changes to apply (heat, unstable, etc.)

This keeps UI, chat cards, and automation consistent.

---

# 2) Data Structures to Lock

## 2.1 Dice Pool Parts

```js
dice: {
  base: number,            // attribute+skill+weapon base
  parts: DicePart[],       // detailed breakdown list
  total: number            // clamped >= 0
}
```

```js
DicePart = {
  id: string,
  label: string,
  value: number,           // can be negative
  tags?: string[]          // e.g. ["heat"], ["terrain.visibility"], ["tracking"]
}
```

**Contract:** Dice parts are additive and explainable.

---

## 2.2 DN Parts (Range + Motion ONLY)

```js
dn: {
  base: number,            // usually 0
  parts: DNPart[],
  total: number            // typically 0..5 normal
}
```

```js
DNPart = {
  id: string,
  label: string,
  value: number,           // non-negative
  tags?: string[]          // e.g. ["range"], ["motion"]
}
```

**Contract:** only tags `["range"]` and `["motion"]` should appear here.

---

## 2.3 CQ Breakdown (AR/DR contributions with eligibility tags)

```js
cq: {
  ar: Breakdown,
  dr: Breakdown,
  value: number            // ar.total - dr.total
}
```

```js
Breakdown = { parts: CQPart[], total: number }
```

```js
CQPart = {
  id: string,
  label: string,
  ar?: number,             // can be + or -
  dr?: number,             // can be + or -
  tags?: string[]          // critical for Handling eligibility
}
```

### Handling eligibility tagging (lock this)

We need a standard tag scheme.

**Recommended minimal tags:**

* `"selfInduced"` — penalties caused by your own maneuver/posture choice
* `"stability"` — penalties caused by instability state (optional for offset)
* `"environment"` — terrain/visibility/etc (not eligible)
* `"tracking"` — not eligible
* `"heat"` — not eligible
* `"systemDamage"` — not eligible

So a Circle Strafe penalty would include:

* `tags: ["selfInduced"]`

A woods penalty would be a dice mod with:

* `tags: ["terrain.visibility","environment"]`

**Contract:** Handling offset only applies to CQPart negative terms where `tags` contains `"selfInduced"` (and optionally `"stability"` if you want that too).

---

## 2.4 Speed Tier and TrackingPenalty

These should be computed by a mobility provider and emitted as:

* DN motion parts (until saturation)
* then a dice pool part (tracking penalty) once saturated

```js
mobility: {
  targetSpeedTier: number,
  attackerSpeedTier: number,
  dnMotion: number,                // already in DN parts
  trackingPenalty: number          // already in dice parts (negative)
}
```

**Contract:** TrackingPenalty is a dice pool part tagged `"tracking"`.

---

## 2.5 Handling Offset

Handling is not a modifier; it’s a processing step:

```js
handling: {
  rating: number,
  offsetBudget: number,
  applied: HandlingApplication[]
}
```

```js
HandlingApplication = {
  cqPartId: string,
  field: "ar" | "dr",
  reducedBy: number
}
```

**Contract:** Handling offset is applied *after* CQ parts are collected but *before* CQ totals are finalized.

---

# 3) Processing Order (Critical Contract)

Lock this order so you don’t get double-application bugs:

1. Collect dice parts (base + passive mods + tracking penalty)
2. Collect DN parts (range + motion)
3. Collect CQ parts (packages, states, posture)
4. Apply Handling offset to eligible CQ penalties
5. Finalize AR/DR totals → CQ
6. Roll dice → Hits
7. Compute Margin = Hits − DN
8. Compute outcome with graze floor
9. Compute NetHits (Hit only)
10. Compute damage + resistance
11. Emit mutations (damage, heat, states) as a list of “updates”

---

# 4) Providers (Extensibility Contract)

To avoid hard-coded rules, define provider interfaces:

### `DiceModProvider`

* adds DicePart entries

### `DNProvider`

* adds DNPart entries (range/motion only)

### `CQProvider`

* adds CQPart entries (packages, states)

### `HandlingProvider`

* supplies handling rating + offset budget

### `DamageModel`

* applies damage rules and returns mutations

This aligns with your existing roll pipeline architecture (providers + resolver).

---

# 5) Minimal “Action Package” Contract

An action like Circle Strafe should be a data object that a CQProvider emits:

```js
ActionPackage = {
  id: "circleStrafe",
  label: "Circle Strafe",
  cqParts: [
    { id:"circleStrafe.ar", label:"Circle Strafe", ar:+2, tags:["selfInduced"] },
    { id:"circleStrafe.dr", label:"Circle Strafe", dr:-2, tags:["selfInduced"] }
  ],
  costs: [
    { type:"action", value:1 },
    { type:"heat", value:1 } // optional
  ]
}
```

The engine doesn’t need to “know” Circle Strafe exists. It just processes parts and costs.

---

# 6) Ready-to-build MVP Scope

To start wiring combat, you only need:

1. The `AttackIntentResolver` skeleton
2. The breakdown structures
3. One DN range provider
4. One DN motion provider (speed tier → DN + tracking penalty)
5. One CQ provider for “Aim” and “Evasive Weave”
6. Handling offset step (selfInduced penalties only)
7. The personal damage model already locked

Everything else can be plugged in later.
---

1. System damage expresses as:
    * Dice pool penalties and/or
    * Handling rating or other attribute reductions   
2. Handling offset applies only to selfInduced CQ penalties.
    * Not environment
    * Not tracking
    * Not heat
    * Not system damage (because it already reduced Handling upstream)
3. Stability failure states are discrete (Unstable/Prone/Stalled/etc.)
    * Handling helps avoid them via piloting tests
    * Not “offset” once they happen