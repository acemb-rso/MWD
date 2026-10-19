# Status Mechanics Registry

## Summary

`STATUS_MAP` is the canonical declarative registry for what a status does.
The status condition catalog remains the source for visibility, labels, icons,
actor applicability, manual/managed flags, ordering, and world customization.

The split is intentional:

- Catalog row: "Can this actor see/use this status?"
- `STATUS_MAP` entry: "What mechanics does this active status contribute?"
- Subsystem helper/provider: "How is that contribution enforced?"

`STATUS_MAP` must describe mechanics only. It must not roll dice, spend
resources, move tokens, create EW state, apply heat, advance condition, create
crit records, or mutate damage. Existing subsystem owners consume the
annotations and perform enforcement.

## Entry Shape

Status mechanics are driven by typed field presence, not by `roles`. Roles are
metadata for summaries, settings UI, and validation.

Supported roles:

- `rollModifier`
- `actionGate`
- `cqAdjustment`
- `machineState`
- `repairIssue`
- `resourceEffect`
- `speedEffect`
- `visualMarker`

Common fields:

- `label`
- `mechanicId`: stable dedupe key; defaults to the mechanics key
- `stacking`: `unique`, `replace`, `highest`, or `sum`; defaults to `unique`
- `roles`
- `mods`
- `cq`
- `actionGates`
- `clearsOnActions`
- `machineState`
- `repair`
- `resource`
- `speed`
- `notes`

For `stacking: "unique"`, dedupe is by `mechanicId` only. Manual,
critical-derived, and degradation-derived copies of the same mechanic do not
double apply unless the entry opts into another stacking mode.

## Catalog Compatibility

The effective mechanics key is:

```js
catalogEntry.modifierKey || statusId
```

Custom catalog rows with no matching mechanics entry are treated as visual
markers. Bundled catalog rows must resolve to a `STATUS_MAP` entry, including
explicit visual-marker entries for inert statuses.

An explicit `modifierKey` that points to a missing mechanics entry is a warning,
because it was an authored mechanics reference.

## Roll Modifiers

Roll modifiers live in `mods`. Each entry must include domains and tags so the
status provider can emit traceable modifier rows.

The `StatusEffectsProvider` consumes only `mods`; CQ, gates, repairs, and
machine annotations do not leak into generic roll friction.

## CQ

CQ entries are perspective-aware:

```js
{
  id: "suppressed.attackAr",
  whenBearerIs: "attacker",
  ar: -2,
  tags: ["suppression", "state"]
}
```

Use `whenBearerIs: "attacker"` for AR contributions and
`whenBearerIs: "defender"` for DR contributions. This is why `suppressed` and
`offbalance*` are CQ adjustments instead of generic dice modifiers.

## Action Gates

Action gates are checked by the personal action executor before prompts, cost
spend, logging, or roll execution. Clear-on-action entries are applied only
after the action resolves successfully.

Example: `suppressed` blocks `aim` and `prepare`, but `move` or `carefulMove`
clears it only after the move action succeeds.

Machines use the same field. Vehicle and BattleMech movement records the
`move` action, and a movement that actually moves (anything but a pure
posture) ends the statuses that declare `clearsOnActions` for `move` through
`clearStatusesEndedByAction` in `mwd/machine-action-statuses.js`. Braced and
Entrenched / Hull Down declare it; Shielded does not (it lasts until the next
activation or the first hit).

## Machine State

`machineState` is annotation only. Supported v1 fields are:

```js
machineState: {
  dice: [],
  cq: [],
  gates: [],
  targeting: [],
  damage: [],
  movement: [],
  heat: [],
  speed: [],
  resource: [],
  startTurn: [],
  endTurn: []
}
```

Allowed meanings:

| Field | Allowed to declare | Not allowed to do |
|-------|--------------------|-------------------|
| `dice` | Roll modifier annotations | Roll dice or mutate actors |
| `cq` | AR/DR parts | Resolve attacks |
| `gates` | Blocked machine actions/capabilities | Spend actions |
| `targeting` | Detection caps, targeting-data suppression, tracking penalties | Create/delete EW state directly |
| `damage` | Incoming-damage deltas (`incomingDamageDelta`) and `consumeOnHit` (status ends on the first applied hit) | Write monitors or remove statuses directly |
| `movement` | No sprint/jump/run, forced-prone requirements, piloting DN modifiers | Move tokens |
| `heat` | Heat generation/dissipation annotations | Directly change heat |
| `speed` | Speed/movement deltas | Directly update movement state |
| `resource` | SA/FA/RA loss annotations | Spend resources directly |
| `startTurn` / `endTurn` | Trigger metadata for owner helpers, including `clearStatus` (the status ends at the start of the bearer's activation) | Apply damage or crit records directly |

Machine owner helpers consume these annotations and remain responsible for all
mutation and enforcement.

Side and suppression keys, usable on any `machineState` entry:

- `whenBearerIs: "attacker"` marks a `targeting` entry as acting on the bearer's
  own attacks (e.g. `targetingDataValueDelta`). Attacker-side fields:
  `trackingPenaltyAsAttacker` (tracking penalty on the bearer's attacks) and
  `observerDetectionCap` (highest detection state the bearer can acquire).
  `trackingPenaltyAsTarget` and `detectionStateCap` act on whoever targets the bearer.
- `suppressedByStatuses: [...]` makes the entry contribute nothing while the
  bearer has any listed status, including module-granted ones (e.g. EPM Boosted
  cancels ECM Jamming).

Owners: rule-state accumulation in `mwd/machine-state-effects.js`; incoming
damage in `previewMachineAttackDamage` / `applyMachineAttackDamage`; start-turn
clears in the personal combat tracker's machine activation start.

## Repair Metadata

Repairable status rows declare top-level `repair` metadata. The repair issue UI
uses that metadata to build status-backed rows, but actual repair execution
stays in the existing remedy/action helpers.

Visual or non-repairable statuses must not appear in the repair issue list.

## Validation

`validateBundledStatusMechanics()` checks the bundled catalog and registry on
system init and in tests. It enforces:

- bundled catalog statuses resolve to `STATUS_MAP`
- visual markers have no mechanics fields
- roles match typed fields
- CQ entries include `whenBearerIs`
- roll mods include domains and tags
- action gates reference known action ids or documented wildcard forms
- machine state entries use only supported v1 fields

Custom world statuses without mechanics remain valid visual markers.
