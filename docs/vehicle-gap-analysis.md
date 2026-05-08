# MWD Vehicle Handling - Current Gap Analysis

This document tracks the remaining mechanical gaps between MechWarrior: Destiny vehicle play and the current implementation. Older drafts described hit location and critical hits as missing or as a separate damage subsystem; those notes are superseded by the queued `machineAttackDamage` workflow.

## Implemented Baseline

Vehicle and BattleMech actors use the BattleTech-appropriate attribute set:

- Handling
- System
- Chassis
- Condition

Dynamic pilot-actor linking has been removed. Pilot and driver combat stats are cached manually as sheet snapshots.

Successful machine attacks now use the current resolver, chat, and HarmEngine pipeline:

- sheets and quick actions emit attack intent
- `resolveAttackExecution` rolls hit location for non-miss machine targets
- each hit queues a canonical `machineAttackDamage` mutation
- chat previews damage, critical state, Reliability options, and prepared critical records
- `HarmEngine.applyMachineAttackDamage` is the only writer for armor, structure, stress, shock/pressure, Reliability, degradation, crit records, and status sync

The current implementation contract is documented in:

- [critical-hit.md](critical-hit.md)
- [Critical-hit-plan.md](Critical-hit-plan.md)
- [combat-flow-design.md](combat-flow-design.md)

## Location Model

BattleMech critical and degradation locations are grouped into:

- `head`
- `torso`
- `arms`
- `legs`

Vehicle critical and degradation locations are grouped into:

- `body`
- `turret`
- `mobility`

Descriptive labels such as `Rear Torso`, `Front`, or `Side` are retained as `impactLabel` for flavor. Rules use `rulesLocation`.

## Current Vehicle Implementation

- Vehicle actors track a shared Structure monitor plus Armor and, for BattleMechs, Heat.
- Hit location is rolled per successful machine hit.
- Critical state is represented by `critical.mode`.
- Automatic and Chaos-selected crits prepare revision-pinned records during preview.
- Reliability spend is a pending preview choice and does not mutate actor state until apply.
- Machine damage apply is idempotent.

## Remaining Gaps

### 1. Sheet Surfacing

The data path exists, but vehicle and BattleMech sheets need richer display and controls for:

- grouped location condition/stress
- active crits
- remedy actions and costs
- current machine status
- heat and crew state

### 2. Location-Based Consequence UI

Damage still uses a shared Structure monitor, while location stress and degradation provide local consequence. The UI should make that relationship visible: shared durability, local failure pressure.

### 3. Critical Effect Hooks

Critical records are created and persisted, but some effects remain reminder-only until providers or actor prep consume them.

Priority hooks:

- weapon group loss
- motive penalties
- turret or rotor restrictions
- engine, gyro, and sensor penalties
- crew compartment harm
- catastrophic outcomes

### 4. Heat Automation

Heat state exists for BattleMechs, but the broader heat lifecycle still needs automation:

- weapon heat gain
- end-of-turn cooling
- running-hot and overheated bands
- shutdown/startup checks
- heat-triggered critical pressure

### 5. Crew And Catastrophic Outcomes

The current machine apply path can record crits and status changes, but full crew and catastrophic automation remains future work:

- crew injury escalation
- bailout state
- ammo explosion consequences
- rotor destruction
- immobilization and total loss rules

### 6. Weapon Mounting Validation

MP budget enforcement and hardpoint availability should be validated at actor update time, especially now that machine weapon attacks have a live damage path.

## Current Queued Mutation Shape

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

`hitLocation` includes:

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

`critical` includes:

```js
{
  eligible: boolean,
  mode: "none" | "automatic" | "chaosOptional" | "chaosSelected",
  source: "hitLocation" | "criticalBreach" | "manual" | null,
  selected: boolean,
  reason: string
}
```

## Verification Targets

- A machine hit queues `type: "machineAttackDamage"`.
- A miss queues no machine damage mutation.
- Hit location includes both `impactLabel` and `rulesLocation`.
- `critical.mode` drives Chaos visibility and prepared crit requirements.
- Prepared crit records include matching `previewRevision`.
- Stale prepared crit records are refused.
- Chaos and Reliability toggles increment `previewRevision` and rebuild derived preview state.
- Reliability preview does not mutate actor state before apply.
- Applying the same mutation twice does not duplicate damage, stress, degradation, Reliability spend, or crits.
