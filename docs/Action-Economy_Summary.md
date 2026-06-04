# Action Economy Summary (Personal Scale)

## Action Categories

### Standard Actions (SA)

Standard Actions represent deliberate effort under time pressure. They form the
core of what a character does during an activation.

Baseline personal-scale activation state:

* 3 SA
* 1 FA
* 1 RA

SA spent beyond the safe baseline can generate Burn, subject to the personal
combat tracker and trait hooks.

The SA, FA, and RA caps are derived values. Character quality trait packets and
actor-side ActiveEffects on `system.traitMods.saCapMod`,
`system.traitMods.faCapMod`, and `system.traitMods.raCapMod` can adjust those
caps. FA/RA cap changes also affect the resources granted at the start of a new
activation.

### Complex Actions

Complex Actions are high-commitment actions that dominate an activation.

They are not a separate resource. A Complex Action normally costs:

```js
{ resource: "sa", value: 2 }
```

Examples include attacks, First Aid, complex skill use, extinguishing fire, and
readying heavy or crew-served weapons.

### Free Actions (FA)

Free Actions represent quick, low-friction activity such as communication,
minor posture changes, payload selection, or fire-mode selection.

A normal Free Action is not a zero-cost action. It spends the FA resource:

```js
{ resource: "fa", value: 1 }
```

True no-cost entries use:

```js
{ resource: "none", value: 0 }
```

This distinction matters for traits, future extra-FA rules, and limiting how
many "free-style" toggles can happen in one activation.

### Reactions (RA)

Reactions occur outside the actor's activation and are triggered by external
events. A normal reaction costs:

```js
{ resource: "ra", value: 1 }
```

If no RA remains, the current tracker may route the reaction through its
existing Burn/Edge reaction fallback rules.

## Current Personal Action List

### Standard Actions

* Move
* Careful Move / Crawl
* Aim
* Interact / Use Object
* Ready Weapon
* Reload / Load Weapon
* Observe in Detail
* Simple Skill Use
* Recover from Stun
* Stand Up from Prone
* Assist / Lead Team
* Reduce Burn

### Complex Actions

* Attack
* Suppression Fire, visible stub until suppression resolver exists
* First Aid
* Use Complex Skill
* Use Untrained Complex Skill, tag-only in V1
* Ready Heavy Weapon
* Extinguish Fire

### Free Actions

* Communicate
* Drop Object
* Observe Quickly
* Select Fire Mode
* Select Ammunition / Payload
* Minor Posture
* Ready Small Item
* Prepare
* Activate Item
* Dodge

### Reactions

* Evade
* Opportunity Attack
* Assist Ally
* Interrupt from Prepare
* Break Grapple / Melee Defense, visible stub until close-defense support exists

## Declarative Action Architecture

Personal combat actions are catalog-defined payloads. The sheet does not own
mechanics for individual actions. It emits one `combatIntent`, and the central
executor resolves prompts, action cost, logging, state changes, resolver
dispatch, and roll handoff.

Canonical action shape:

```js
{
  id: "reload",
  label: "Reload",
  category: "standard",
  cost: { resource: "sa", value: 1 },
  scale: ["personal"],
  resolver: "interaction",
  roll: null,
  prompt: { type: "weapon", required: true },
  tags: ["combat", "weapon", "reload"],
  resolves: ["jammed", "empty"],
  payload: { intent: "combatAction", actionId: "reload" },
  implementation: { state: "ready", reason: "" }
}
```

Valid cost resources:

* `fa`
* `sa`
* `ra`
* `none`

Valid resolver owners:

* `action`
* `attack`
* `movement`
* `targeting`
* `remediation`
* `recovery`
* `interaction`

Each action chooses exactly one resolver owner. Tags can overlap, but resolver
ownership should not.

Implementation states:

* `ready` - shown and executable
* `stub` - visible but blocked until mechanics exist
* `disabled` - intentionally unavailable
* `legacy` - compatibility row normalized into the new shape

## Execution Order

`executeCombatActionIntent` is above the roll system:

1. Normalize and validate the action.
2. Reject `disabled` or unresolved `stub` actions.
3. Resolve required prompts.
4. Cancel with no cost, no log, and no state change if the prompt is cancelled.
5. Spend and log action cost.
6. Dispatch to the action resolver.
7. Call `game.mwd.roll.execute(...)` only if dice are required.
8. Return a structured result.

Action intents own cost, prompts, state, and logging. Roll intents own dice.

## Current Automation Notes

* Attack, First Aid, Evade, Interrupt, Opportunity, and Burn recovery reuse the existing mechanics through the central executor.
* Payload selection changes the weapon's selected payload but does not consume stock.
* Reload spends/logs the action. Payload or ammo stock is not consumed by reload in V1.
* Attack execution remains responsible for payload consumption.
* Shaken and personal critical remedies stay on the personal critical remedy flow.
* Suppression fire and direct-defense reactions are catalog stubs until their resolvers exist.

## Burn Integration

* Each SA beyond the safe baseline can generate Burn.
* Each attack after the first in a single activation can generate Burn.
* Complex Actions count as their SA cost for Burn thresholds.
* Additional reactions can generate Burn through reaction fallback rules.
* Reduce Burn spends 1 SA and reduces Burn by 1.

## One-Line Summary

Personal combat actions are declarative action intents: FA/SA/RA regulate pacing,
Burn punishes overextension, and the central executor keeps sheets thin while
resolvers own the mechanics.
