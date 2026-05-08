# Combat Flow Design

## Design Doctrine

These are the rules the resolver and application flow enforce:

1. DN = Range + Motion only.
2. Dice pool mods = execution friction: environment, heat, system damage, sensors, and tracking penalty.
3. CQ = AR - DR from tactical packages and state.
4. NetHits saturates via `min(CQ, Margin)`.
5. Graze floor: if `Margin >= 1` but `NetHitsRaw <= 0`, the outcome is Graze.
6. Speed is tiered state; motion difficulty saturates and then becomes tracking pool penalty.
7. Handling affects piloting and offsets eligible AR/DR penalties only, via tags.
8. Actor writes happen through queued apply actions, not during attack resolution.

## Core Resolver Contract

`AttackIntentResolver.resolve(ctx) -> AttackResolution`

Input `ctx` must already contain:

- attacker and target
- weapon or attack mode
- range band or distance plus LOS information
- movement state, including speed tiers and movement mode
- chosen tactical actions for this attack

Output must include:

- computed dice pool breakdown
- computed DN breakdown
- computed CQ breakdown, including AR/DR with tags
- roll results: hits and margin
- outcome: miss, graze, or hit
- NetHits
- damage and resistance preview
- queued mutations for consequences that require deliberate chat-card apply

The resolver creates canonical results. It does not directly mutate target damage state.

## Dice Pool Parts

```js
dice: {
  base: number,
  parts: DicePart[],
  total: number
}
```

```js
DicePart = {
  id: string,
  label: string,
  value: number,
  tags?: string[]
}
```

Dice parts are additive and explainable.

## DN Parts

```js
dn: {
  base: number,
  parts: DNPart[],
  total: number
}
```

```js
DNPart = {
  id: string,
  label: string,
  value: number,
  tags?: string[]
}
```

Only `range` and `motion` tags belong in DN parts.

## CQ Breakdown

```js
cq: {
  ar: Breakdown,
  dr: Breakdown,
  value: number
}
```

```js
Breakdown = { parts: CQPart[], total: number }
```

```js
CQPart = {
  id: string,
  label: string,
  ar?: number,
  dr?: number,
  tags?: string[]
}
```

Recommended tags:

- `selfInduced`: penalties caused by the actor's own maneuver or posture choice.
- `stability`: penalties caused by instability state.
- `environment`: terrain, visibility, or other external state.
- `tracking`: tracking friction.
- `heat`: heat friction.
- `systemDamage`: system damage friction.

Handling offset applies only to eligible CQPart negative terms tagged `selfInduced`, and optionally `stability` where a rule explicitly allows it.

## Speed Tier And Tracking Penalty

Mobility providers emit speed and tracking state:

```js
mobility: {
  targetSpeedTier: number,
  attackerSpeedTier: number,
  dnMotion: number,
  trackingPenalty: number
}
```

`dnMotion` is represented in DN parts. `trackingPenalty` is represented in dice parts and tagged `tracking`.

## Handling Offset

Handling is a processing step, not a raw modifier:

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

Apply Handling after CQ parts are collected and before CQ totals are finalized.

## Processing Order

1. Collect dice parts: base, passive mods, and tracking penalty.
2. Collect DN parts: range and motion.
3. Collect CQ parts: packages, states, posture, and tactical modifiers.
4. Apply Handling offset to eligible CQ penalties.
5. Finalize AR/DR totals and CQ.
6. Roll dice and count hits.
7. Compute Margin = Hits - DN.
8. Compute outcome with the graze floor.
9. Compute NetHits for hits.
10. Compute damage and resistance preview.
11. Emit queued mutations for damage, heat, states, or other consequences that require deliberate apply.

## Provider Contracts

Use providers to keep rules out of UI code:

- `DiceModProvider`: adds DicePart entries.
- `DNProvider`: adds DNPart entries for range and motion.
- `CQProvider`: adds CQPart entries for packages and states.
- `HandlingProvider`: supplies handling rating and offset budget.
- `DamageModel`: computes damage preview and queued mutation data.

## Action Package Contract

An action such as Circle Strafe is data consumed by a CQ provider:

```js
ActionPackage = {
  id: "circleStrafe",
  label: "Circle Strafe",
  cqParts: [
    { id: "circleStrafe.ar", label: "Circle Strafe", ar: 2, tags: ["selfInduced"] },
    { id: "circleStrafe.dr", label: "Circle Strafe", dr: -2, tags: ["selfInduced"] }
  ],
  costs: [
    { type: "action", value: 1 },
    { type: "heat", value: 1 }
  ]
}
```

The engine processes parts and costs. It does not need special-case knowledge of individual action names.

## Machine Damage Handoff

Successful vehicle and BattleMech hits queue a `machineAttackDamage` mutation:

```js
{
  id,
  type: "machineAttackDamage",
  targetActorUuid,
  targetTokenUuid,
  hitLocation,
  damagePreview,
  critical,
  preparedCriticalRecords,
  reliabilityOptions,
  previewRevision,
  applied: false
}
```

Misses do not create machine damage mutations.

`hitLocation.impactLabel` is descriptive. `hitLocation.rulesLocation` is the grouped rules key used for degradation and critical tables.

`critical.mode` drives chat behavior:

- `none`: no critical record preview.
- `chaosOptional`: show the Chaos conversion control.
- `chaosSelected`: require prepared critical records.
- `automatic`: require prepared critical records.

Reliability options are pending choices only. Preview may show the expected effect, but actor state changes happen only when `HarmEngine.applyMachineAttackDamage` applies the queued mutation.

Chaos toggle, Reliability toggle, or damage recalculation increments `previewRevision`, clears derived preview fields, recalculates damage, critical, and Reliability previews, and rebuilds prepared critical records when required.

Apply refuses stale prepared critical records and is idempotent. Reapplying an already-applied mutation must not apply additional damage, stress, degradation, Reliability spend, or critical records.

## System Damage Boundaries

System damage expresses as dice pool penalties, Handling reductions, or other attribute reductions through providers and actor preparation. Handling offset applies only to self-induced CQ penalties. It does not offset environment, tracking, heat, or system damage penalties unless a future rule explicitly tags them as eligible.

Stability failure states are discrete states such as Unstable, Prone, or Stalled. Handling helps avoid them through piloting tests; it does not erase them after they happen.
