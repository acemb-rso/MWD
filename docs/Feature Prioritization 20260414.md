# Feature Prioritization: MWD Next Steps

## Context

The system architecture is mature enough that the highest-value work is now targeted mechanics and sheet polish. The `system.mwd` block is present in `template.json`, and vehicle/BattleMech actors have the Handling/System/Chassis/Condition attribute set.

The machine hit-location and critical-hit handoff is implemented through the current resolver, chat, and HarmEngine pipeline. Older notes that described this as a sidecar combat subsystem are superseded by the queued `machineAttackDamage` mutation contract.

## Current Core Gameplay State

Vehicle and BattleMech attacks now resolve successful machine hits into queued chat-card consequences:

- the resolver attaches `type: "machineAttackDamage"` mutations to non-miss machine targets
- hit location keeps both `impactLabel` and grouped `rulesLocation`
- critical state is represented by `critical.mode`
- automatic and Chaos-selected crits prepare revision-pinned crit records during preview
- Reliability spend is previewed as a pending choice
- `HarmEngine.applyMachineAttackDamage` is the only writer for armor, structure, stress, shock/pressure, Reliability, degradation, crit records, and status
- repeat apply is idempotent

The current implementation contract is documented in:

- [critical-hit.md](critical-hit.md)
- [Critical-hit-plan.md](Critical-hit-plan.md)
- [combat-flow-design.md](combat-flow-design.md)

## Recommended Feature Order

## Tier 1 - Core Gameplay Blockers

These are the next features most likely to improve vehicle and BattleMech play at the table.

### 1. Vehicle And BattleMech Sheet Surfacing

The sheet classes exist and are registered, but more of the prepared machine state should be visible and actionable from AppV2 sheets.

Recommended work:

- Continue porting `VehicleSheetV2` and `BattlemechSheetV2` toward the `CharacterSheetV2` layout-driven pattern.
- Surface `system.mwd` monitors, location condition/stress, active crits, current status, heat, crew, quick actions, and weapon groups.
- Keep quick-action buttons as intent emitters that route through the existing roll payloads.

Likely files:

- `src/modules/sheets/vehicle-sheet-v2.js`
- `src/modules/sheets/battlemech-sheet-v2.js`
- `src/modules/item/layouts/`
- `templates/v2/`

### 2. Machine Crit And Degradation UX Polish

The queued apply path exists. The next layer is better visibility and management.

Recommended work:

- Add sheet panels for active remediable crits.
- Expose remedy actions with clear action costs.
- Show grouped location condition/stress and destroyed/disabled state.
- Add status callouts for reminder-only crit effects that do not yet have provider hooks.
- Improve chat affordances for prepared crit details and post-apply state.

### 3. Weapon Trait Automation

Weapon and payload traits remain a broad automation area. Payload/profile modifiers are active for damage type, AP, attack-rating band changes, and templated payload capabilities, but standard trait behavior still needs concrete rule-backed implementation.

Recommended work:

- Prioritize traits that affect the existing resolver contract: dice parts, DN parts, CQ parts, damage preview, and queued mutation metadata.
- Avoid enabling registry entries until each trait has an observable behavior and tests.

## Tier 2 - High Value, Standalone

### 4. Item Sheet Layouts

Only a subset of item types has full JSON layout coverage. Remaining item types should move toward the modern layout-driven sheet system.

Important item types:

- `skill`
- `quality`
- `gear`
- `contact`
- `assetModule`
- `lifeModule`
- `mechWeapon`

`mechWeapon` is especially important because the machine combat flow now has a live apply path.

### 5. Area Effects - Exposure UI And Hazard Tools

Backend exposure logic exists, but hazard visualization and GM authoring tools still need work.

Recommended work:

- Four-tier exposure display: Full, Major, Minor, None.
- Persistent hazard state tracking.
- Token overlay or combat-panel affordance for exposure tier.
- GM creation/edit flow for hazard zones.

### 6. Character Data Completions

Still useful but less blocking than machine combat:

- XP tracker field and sheet display.
- Structured cues and dispositions.
- Structured keywords/words.

## Tier 3 - Polish And Completeness

### 7. First Aid Combat Action Handler

The personal combat tracker still has a first-aid action slot that needs a concrete resolver.

### 8. Weapon Mounting Validation

MP budget enforcement and hardpoint availability are designed but should be enforced at actor update time.

Likely files:

- `src/modules/actor/battlemech-actor.js`
- `docs/weapon-mounting-system.md`

### 9. Legacy Cleanup

Older `.hbs` templates and Anarchy terminology can be trimmed once their modern replacements are fully wired. This reduces confusion but should follow behavior-complete replacements, not precede them.

## Verification Targets

For machine hit and critical work:

- A hit against a vehicle or BattleMech queues `machineAttackDamage`.
- A miss queues no machine damage mutation.
- Hit location includes both `impactLabel` and `rulesLocation`.
- `critical.mode` drives Chaos visibility and prepared crit requirements.
- Prepared crit records are pinned to `previewRevision`.
- Stale prepared crit records are refused.
- Chaos and Reliability toggles rebuild derived preview state.
- Reliability preview does not mutate actor state.
- Applying the same queued mutation twice does not duplicate damage, stress, degradation, Reliability spend, or crits.

For sheet and UX work:

- Vehicle and BattleMech actors render their machine monitors and state without console errors.
- Active crits and remedies are visible after apply.
- Character and personal combat flows remain unchanged.
