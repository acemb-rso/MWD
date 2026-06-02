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
| Recover Burn | Complex | 2 SA | recovery | ready |
| Speak / Signal | Free | 1 FA | action | ready |
| Drop Object | Free | 1 FA | interaction | ready |
| Gesture / Signal | Free | 1 FA | action | ready |
| Observe Quickly | Free | 1 FA | action | ready |
| Select Fire Mode | Free | 1 FA | interaction | ready |
| Select Ammunition / Payload | Free | 1 FA | interaction | ready |
| Minor Posture | Free | 1 FA | movement | ready |
| Ready Small Item | Free | 1 FA | interaction | ready |
| Prepare | Free | 1 FA | action | ready |
| Activate Item | Free | 1 FA | interaction | ready |
| Evade | Reaction | 1 RA | recovery | ready |
| Opportunity Attack | Reaction | 1 RA | attack | ready |
| Assist Ally | Reaction | 1 RA | action | ready |
| Interrupt from Prepare | Reaction | 1 RA | action | ready |
| Dodge / Defensive Response | Reaction | 1 RA | recovery | stub |
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

| Name | Attribute | Skill | Action | Use |
| --- | --- | --- | --- | --- |
| emergencyRepair | Reliability | Technician | Standard | Critical repair |
| systemReset | Reliability | SystemOps | Standard | Reset a system problem |
| reboot | Reliability | Computer | Standard | Reboot a computer/system issue |
| feedReset | Reliability | Gunnery | Standard | Reset a weapon feed |
| pilotRecovery | Reliability | Piloting | Standard | Pilot recovery |
| coolantDump | Reliability | SystemOps | Complex | Restore heat management system |
| stand | Handling | Piloting | Standard | Machine stand/recovery |
| stabalize | Handling | Piloting | Complex | Legacy spelling for Stabilize |
| stabilize | Handling | Piloting | Complex | Stabilize |
| powerReroute | System | Technician | Standard | Reroute power |
| sensorSweep | System | Perception | Standard | General battlefield scan; reveal hidden units, detect signatures, identify contacts |
| epmFilter | System | Perception | Complex | Remove ECM Jamming |
| powerCycle | System | Computer | Complex | Recover from Shutdown |
| acquireTarget | System | Perception | Standard | Improve Detection State on target |
| emergencyJettison | System | Gunnery | Reaction | Dump volatile equipment before it explodes |
| jettisonCore | System | Technician | Complex | Dump reactor core before it explodes |
| breakLock | Handling | SystemOps | Reaction | Degrade Detection State from attacker |
| sprint | Handling | Piloting | Complex | Fast movement; generates heat |
| ecmSpike | System | SystemOps | Standard | Applies ECM Jamming |
| suppressBeacon | System | SystemOps | Standard | Suppress beacon-based targeting support such as NARC or TAG |
| extinguish | System | Piloting | Complex | Extinguish |
| swat | Handling | Piloting | Complex | Remove BattleArmor or NARC |
| generateFireSolution | System | Gunnery | Standard | Create targeting data |
| tagTarget | Handling | Gunnery | Standard | Apply TAG enabler flag for guided systems |
| shareTargetingData | System | - | Free Action | C3/network provider action; share best state and best eligible packet |
