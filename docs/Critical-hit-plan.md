# Critical Hit Implementation Contract

This document records the implemented machine hit-location and critical-hit handoff. The rule tables and design rationale live in [critical-hit.md](critical-hit.md); this file exists to keep the implementation contract concise and current.

## Doctrine

The machine hit and critical workflow follows the same architecture as the broader roll pipeline:

1. Sheets and quick actions emit attack intent.
2. The resolver builds canonical attack results.
3. Chat previews pending consequences and player choices.
4. HarmEngine applies queued mutations.

Attack resolution must not directly write machine damage. Chat controls must not write actor damage state. `applyMachineAttackDamage` is the single writer for armor, structure, stress, shock/pressure, Reliability, degradation, crit records, and status sync.

## Queued Mutation Shape

Each successful vehicle or BattleMech target result receives one queued mutation:

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

Misses do not create a machine damage mutation.

## Hit Location

Hit location stores display flavor and rules grouping separately:

```js
{
  impactLabel,
  rulesLocation,
  rollTotal,
  automaticCritical,
  chaosCriticalOption,
  sourceArmor,
  sourceStructure
}
```

`impactLabel` can be descriptive, such as `Rear Torso`, `Front`, or `Side`. `rulesLocation` is the grouped location used by degradation and critical resolution:

- BattleMech: `head`, `torso`, `arms`, `legs`
- Vehicle: `body`, `turret`, `mobility`

Consumers that apply rules must use `rulesLocation`, not the descriptive label.

## Critical State

`critical` is state:

```js
{
  eligible: boolean,
  mode: "none" | "automatic" | "chaosOptional" | "chaosSelected",
  source: "hitLocation" | "criticalBreach" | "manual" | null,
  selected: boolean,
  reason: string
}
```

`critical.mode` drives the chat UI and apply requirements:

- `none`: no critical records.
- `chaosOptional`: show the Chaos conversion control, but do not require critical records until selected.
- `chaosSelected`: prepared critical records are required.
- `automatic`: prepared critical records are required.

Compatibility booleans may exist in payloads, but new code should use `critical.mode` as the canonical switch.

## Prepared Critical Records

Automatic crits and Chaos-selected crits prepare their records during preview and reuse those records on apply:

```js
{
  id,
  previewRevision,
  table,
  rollTotal,
  rulesLocation,
  resultKey,
  label,
  remedy,
  effects
}
```

Apply must refuse stale previews. Any prepared record whose `previewRevision` differs from the queued mutation's `previewRevision` is invalid.

## Reliability Options

Reliability is a pending choice until apply:

```js
{
  canSpend: boolean,
  selected: boolean,
  cost: 1,
  prevents: ["conditionAdvance"],
  pressureDeltaPreview,
  stressDeltaPreview
}
```

Preview may show the expected stress and pressure/shock changes. It must not mutate Reliability, stress, pressure, degradation, armor, structure, crits, or status.

## Preview Revisions

Chaos toggle, Reliability toggle, or damage recalculation creates a new preview state by incrementing `previewRevision`, clearing derived preview fields, recalculating `damagePreview`, `critical`, and `reliabilityOptions`, and rebuilding `preparedCriticalRecords` when required.

Derived preview fields include all data that depends on the current hit consequence choices. They must be treated as disposable whenever the preview revision changes.

## Apply Idempotency

`applyMachineAttackDamage` must be idempotent. If `mutation.applied === true`, it returns the already-applied result or refuses without applying additional damage, stress, degradation, Reliability spend, or crits.

After a successful apply, the mutation is marked applied. Remedy actions remain available for active remediable crit records.
