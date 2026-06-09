# MWD Actions, Reactions, and Remediations

This document tracks the action catalogs used by the system. Personal combat
actions are declarative catalog records. Machine actions remain in the machine
action catalog and quick-action services.

## Personal Combat Action Contract

Every first-class personal combat action should answer these questions:

```js
{
  id: "systemReset",
  label: "System Reset",
  cost: { resource: "sa", value: 1 },
  scale: ["personal"],
  resolver: "remediation",
  roll: {
    intent: "skill",
    attribute: "reliability",
    skill: "systemOps"
  },
  prompt: { type: "status", required: true },
  tags: ["remediation", "systems"],
  resolves: ["stalled", "sensorDegraded", "fireControlFault"],
  payload: { intent: "combatAction", actionId: "systemReset" },
  implementation: { state: "ready", reason: "" }
}
```

If an action cannot be described this way, it probably belongs as a GM ruling
or narrative note rather than a first-class button.

## Personal Resolver Owners

Each personal action has exactly one resolver owner:

| Resolver | Owns |
| --- | --- |
| `action` | Generic action cost, logging, simple action state |
| `attack` | Personal attacks, opportunity attacks, attack variants |
| `movement` | Move, careful move, crawl, stand, posture |
| `targeting` | Targeting actions when personal targeting support exists |
| `remediation` | Repair/reset style actions |
| `recovery` | First Aid, Burn recovery, status recovery, Evade |
| `interaction` | Ready, reload, activate, select payload, select fire mode |

Tags can overlap. Resolver ownership should not.

## Personal Cost Resources

| Resource | Meaning |
| --- | --- |
| `fa` | Free Action resource. Normal Free Actions cost `1 FA`. |
| `sa` | Standard Action resource. Complex Actions usually cost `2 SA`. |
| `ra` | Reaction resource. Normal reactions cost `1 RA`. |
| `none` | True no-cost action, disabled stub, preview, or informational entry. |

## Personal Implementation State

| State | Meaning |
| --- | --- |
| `ready` | Executable through `executeCombatActionIntent`. |
| `stub` | Visible but blocked with the catalog reason. |
| `disabled` | Intentionally unavailable with the catalog reason. |
| `legacy` | Compatibility row normalized into the new shape. |

## Current Personal Action List

| Action | Category | Cost | Resolver | State |
| --- | --- | --- | --- | --- |
| Move | Standard | 1 SA | movement | ready |
| Careful Move / Crawl | Standard | 1 SA | movement | ready |
| Aim | Standard | 1 SA | action | ready |
| Interact / Use Object | Standard | 1 SA | interaction | ready |
| Ready Weapon | Standard | 1 SA | interaction | ready |
| Reload / Load Weapon | Standard | 1 SA | interaction | ready |
| Observe in Detail | Standard | 1 SA | action | ready |
| Simple Skill Use | Standard | 1 SA | action | ready |
| Recover from Stun | Standard | 1 SA | recovery | ready |
| Stand Up from Prone | Standard | 1 SA | movement | ready |
| Assist / Lead Team | Standard | 1 SA | action | ready |
| Reduce Burn | Standard | 1 SA | recovery | ready |
| Attack | Complex | 2 SA | attack | ready |
| Suppression Fire | Complex | 2 SA | attack | stub |
| First Aid | Complex | 2 SA | recovery | ready |
| Use Complex Skill | Complex | 2 SA | action | ready |
| Use Untrained Complex Skill | Complex | 2 SA | action | ready, tag-only |
| Ready Heavy Weapon | Complex | 2 SA | interaction | ready |
| Extinguish Fire | Complex | 2 SA | recovery | ready |
| Communicate | Free | 1 FA | action | ready |
| Drop Object | Free | 1 FA | interaction | ready |
| Observe Quickly | Free | 1 FA | action | ready |
| Select Fire Mode | Free | 1 FA | interaction | ready |
| Select Ammunition / Payload | Free | 1 FA | interaction | ready |
| Minor Posture | Free | 1 FA | movement | ready |
| Ready Small Item | Free | 1 FA | interaction | ready |
| Prepare | Free | 1 FA | action | ready |
| Activate Item | Free | 1 FA | interaction | ready |
| Dodge | Free | 1 FA | recovery | stub |
| Evade | Reaction | 1 RA | recovery | ready |
| Opportunity Attack | Reaction | 1 RA | attack | ready |
| Assist Ally | Reaction | 1 RA | action | ready |
| Interrupt from Prepare | Reaction | 1 RA | action | ready |
| Break Grapple / Melee Defense | Reaction | 1 RA | recovery | stub |

## Personal Execution Boundary

The sheet emits:

```js
{ intent: "combatAction", actionId: "reload" }
```

`executeCombatActionIntent` handles:

* action lookup and normalization
* implementation-state rejection
* prompts
* cancellation behavior
* cost spend and activation logging
* resolver dispatch
* roll handoff when needed
* structured result output

The roll system is called only for rolled actions. Non-roll actions remain
action-executor state changes or logs.

## Machine Actions and Remediations

Machine action definitions live in `src/modules/mwd/machine-action-catalog.js`.
They now use the same declarative shape as personal combat actions while keeping
legacy compatibility fields (`resource`, numeric `cost`, `category`) for the
existing remedy, EW, and roll-commit paths.

Each catalog entry owns:

```js
{
  key: "generateFireSolution",
  actionCost: { resource: "sa", value: 1 },
  resolver: "targeting",
  prompt: { type: "target", required: true },
  payload: { intent: "machineAction", actionId: "generateFireSolution" },
  implementation: { state: "ready", reason: "" }
}
```

Machine action payloads can route through `game.mwd.machineActions.execute`
with `kind: "action"`, or by using `intent: "machineAction"` with an
`actionId`. The executor rejects `stub` and `disabled` actions before cost is
spent, maps ready catalog actions onto the existing movement, attack, EW,
remediation, recovery, and interaction services, and relies on the roll engine
to commit costs for rolled machine skill actions that carry `machineActionKey`.
Non-roll narrative actions are paid/logged directly by the machine action
service.

| Name | Cost | Resolver | Implementation | Use |
| --- | --- | --- | --- | --- |
| communicate | 1 FA | action | ready | Communicate |
| activateElectronics | 1 FA | interaction | ready | Simple electronics toggle |
| toggleHeatSinks | 1 FA | interaction | ready | Heat-sink state toggle |
| activateMasc | 1 FA | movement | ready | MASC state toggle; risk hooks belong in movement |
| selectFireMode | 1 FA | interaction | ready | Change active machine fire mode |
| selectAmmoType | 1 FA | interaction | ready | Select preloaded ammo/payload type |
| torsoTwist | 1 FA | movement | ready | Arc/facing adjustment |
| dropProne | 1 SA | movement | ready | Deliberate BattleMech prone posture |
| avoidShutdown | 1 RA | recovery | ready | Danger heat shutdown check |
| walk / safeThrust | 1 SA | movement | ready | Safe machine movement |
| run | 1 SA | movement | ready | Fast move; BattleMechs add 1 Heat |
| jumpMove | 1 SA | movement | ready | Jump movement when available |
| rangedAttack | 1 SA | attack | ready | Machine ranged attack resolver |
| physicalAttack | 1 SA | attack | ready | Machine melee/physical attack resolver |
| sensorSweep / assess | 1 SA | targeting | ready | Battlefield scan / detailed observation |
| acquireTarget | 1 SA | targeting | ready | Improve detection state |
| generateFireSolution | 1 SA | targeting | ready | Create targeting data |
| sensorLock | 1 SA | targeting | ready | Acquire-target upgrade toward lock |
| breakLock | 1 SA | targeting | ready | Handling + Stealth; reduce an observer's detection state one step |
| defensiveJink | 1 RA | targeting | ready | Handling + Piloting reaction; reduce a targetingData packet by 1 |
| brace | 1 SA | movement | ready | Defensive posture |
| hullDown | 1 SA | movement | ready | Vehicle prepared position |
| sprint | 2 SA | movement | ready | Complex move; BattleMechs add 2 Heat, vehicles Redline for Strain |
| powerCycle | 2 SA | remediation | ready | Recover from Shutdown |
| coolantDump | 2 SA | remediation | ready | Restore heat-management system |
| epmFilter | 2 SA | targeting | ready | Remove or reduce ECM Jamming |
| swat | 2 SA | remediation | ready | Remove BattleArmor or NARC |
| chargeAttack | 2 SA | attack | ready | Impact / Control / DFA collision attack; piloting+handling vs target; knockdown check auto-fires |
| evasiveManeuver | 2 SA | movement | ready | Withdraw without provoking parting attacks; gain Evasive (+3 DR / −2 AR) until next activation |
| shield | 2 SA | movement | ready | Guarded stance; gain Shielded (+4 DR / −1 AR) until next activation; first hit absorbed −2 damage then ends |
| spotIndirect | 2 SA | targeting | stub | Indirect-fire network effect |
| eject | 1 SA | interaction | stub | Manual ejection state changes |
