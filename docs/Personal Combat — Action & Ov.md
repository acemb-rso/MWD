# MWD Personal Combat - Action and Burn Rules

## Activations

At the start of a normal personal-scale activation, a character regains:

* 3 Standard Actions
* 1 Free Action
* 1 Reaction

Burn penalties apply to rolls immediately and remain part of the roll modifier
pipeline for the activation.

## Standard Actions

Standard Actions are represented as:

```js
{ resource: "sa", value: 1 }
```

Common Standard Actions include:

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

SA do not exist outside your activation and cannot be reserved for reactions.

## Complex Actions

Complex Actions are still paid in SA. Most cost:

```js
{ resource: "sa", value: 2 }
```

Common Complex Actions include:

* Attack
* First Aid
* Use Complex Skill
* Use Untrained Complex Skill
* Ready Heavy Weapon
* Extinguish Fire
* Recover Burn

Suppression Fire is listed as a visible stub until the suppression resolver is
implemented.

## Free Actions

Free Actions are not zero-cost actions. A normal Free Action spends FA:

```js
{ resource: "fa", value: 1 }
```

Common Free Actions include:

* Speak / Signal
* Drop Object
* Gesture / Signal
* Observe Quickly
* Select Fire Mode
* Select Ammunition / Payload
* Minor Posture
* Ready Small Item
* Prepare
* Activate Item

True no-cost actions use:

```js
{ resource: "none", value: 0 }
```

## Reactions

Reactions occur outside your activation. A normal reaction spends RA:

```js
{ resource: "ra", value: 1 }
```

Current reaction actions:

* Evade
* Opportunity Attack
* Assist Ally
* Interrupt from Prepare

Direct Dodge / Defensive Response and Break Grapple / Melee Defense are visible
stubs until those resolver paths exist.

## Burn

Burn is the personal-scale analog to BattleMech Heat: accumulated strain from
pushing performance past a safe limit.

Burn generation:

* Each SA spent beyond the safe baseline can generate Burn.
* Each attack after the first in a single activation can generate Burn.
* Additional reactions can generate Burn through reaction fallback rules.

Burn penalties apply immediately when Burn changes.

## Recovering From Burn

During your activation:

* Reduce Burn spends 1 SA and reduces Burn by 1.
* Recover Burn is the Complex Action path for stronger Burn recovery where supported.

## Passive Cool-Off

At the end of activation, reduce Burn by 2 if all are true:

1. Total SA spent this activation is 3 or less.
2. No Burn was generated during this activation.
3. No Burn was generated from reactions since the actor's last activation.

If any condition is false, passive cool-off does not occur.

## Overload Check

At the end of activation, if Burn is 6 or higher, make the Overload check.

While Overloaded:

* The actor still gains activation resources.
* Burn penalties still apply.
* Action availability is restricted to recovery behavior.

The Overloaded condition is lost when Burn reaches 0.

## Declarative Action Execution

Personal combat action buttons are declarative catalog entries. Sheets emit one
`combatIntent`; they do not run action-specific mechanics.

Execution flow:

1. Normalize and validate the action.
2. Reject disabled/stub actions.
3. Resolve prompts.
4. Cancel without cost/log/state if the prompt is cancelled.
5. Spend and log cost.
6. Dispatch to the action's resolver.
7. Call the roll engine only when dice are required.

Action intent owns action economy and state. Roll intent owns dice resolution.
