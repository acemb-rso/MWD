Below is a **canonical Asset Module item schema** plus a **controlled tag taxonomy** for quirk-style modules in MWD.

**Design intent:** quirks become **data-driven item records** that feed the existing **intent → resolver → RollContext** pipeline, with effects expressed as **dice parts, CQ parts, action injections, constraints, and rare rule hooks**, rather than sheet-side logic or bespoke one-off systems. That matches your locked resolver doctrine, especially “DN = Range + Motion only,” “CQ = AR – DR,” provider-based collection, and the requirement that the sheet emit intent while the engine does the work.    

# 1) Canonical item type

Use a dedicated item type:

```txt
assetModule
```

This aligns with the existing sheet direction where mechs/NPCs already have an `assetModules` list. 

---

# 2) Item schema

## Top-level shape

```json
{
  "name": "Fire Control Suite",
  "type": "assetModule",
  "img": "systems/mwd/icons/modules/fire-control.webp",
  "system": {
    "moduleType": "system",
    "subtype": "quirk",
    "tier": 1,
    "enabled": true,
    "source": {
      "origin": "design",
      "family": "fire-control",
      "canonicalId": "fireControlSuite"
    },
    "mounting": {
      "scope": "platform",
      "location": null,
      "weaponIds": [],
      "groupIds": []
    },
    "applicability": {
      "actorTypes": ["battlemech", "vehicle", "npc"],
      "weaponCategories": [],
      "requiresTags": [],
      "forbidsTags": [],
      "requiresModules": [],
      "forbidsModules": []
    },
    "tags": [
      "module.scope.platform",
      "module.family.fireControl",
      "effect.cq.ar",
      "targeting.general"
    ],
    "effects": {
      "diceMods": [],
      "cqMods": [],
      "actions": [],
      "constraints": [],
      "triggers": [],
      "passives": []
    },
    "ui": {
      "shortLabel": "Fire Control",
      "summary": "+1 AR on ranged attacks",
      "sort": 100
    },
    "notes": ""
  }
}
```

---

## Field definitions

### `system.moduleType`

High-level mechanical bucket.

Allowed values:

```txt
system
weapon
chassis
sensor
mobility
defense
logistics
command
environmental
melee
negative
```

Use this for organization and filtering, not rules resolution.

---

### `system.subtype`

For now:

```txt
quirk
package
upgrade
flaw
```

Recommended default here is `quirk`.

---

### `system.tier`

Integer. Default `1`.

Use only when the module is intentionally scalable, such as:

* Rugged Construction 1–2
* Cooling System 1–2
* Fire Control Suite 1–3

Do not overload tier with rarity or cost.

---

### `system.enabled`

Soft on/off toggle for debugging, GM overrides, or temporary suppression.

---

### `system.source`

For provenance and future migration.

```json
{
  "origin": "design",
  "family": "fire-control",
  "canonicalId": "fireControlSuite"
}
```

Suggested `origin` values:

```txt
design
canon-adapted
legacy-import
gm-custom
```

---

### `system.mounting`

Defines what this module is attached to.

```json
{
  "scope": "platform",
  "location": null,
  "weaponIds": [],
  "groupIds": []
}
```

Allowed `scope` values:

```txt
platform
weapon
weaponGroup
location
crew
```

Examples:

* Accurate Weapon rewrite on one weapon: `scope = "weapon"`
* Low Profile Frame: `scope = "platform"`
* Exposed Systems on head: `scope = "location"`, `location = "head"`

---

### `system.applicability`

Hard gating.

```json
{
  "actorTypes": ["battlemech"],
  "weaponCategories": ["ranged"],
  "requiresTags": ["platform.mech"],
  "forbidsTags": ["platform.oversized"],
  "requiresModules": [],
  "forbidsModules": ["variableTargetingMode"]
}
```

Use this for validation and UI filtering.
This is where you prevent nonsense combinations.

---

# 3) Effect payload schemas

## A) Dice mods

Use these when the module changes **execution friction**, not tactical advantage. That matches your doctrine.

```json
{
  "id": "precision.short",
  "label": "Precision Targeting",
  "value": 1,
  "when": {
    "intents": ["attack"],
    "domains": ["combat"],
    "requiresTags": ["range.short"],
    "forbidsTags": []
  },
  "tags": ["effect.dice", "targeting.short"],
  "stacking": "stack"
}
```

Schema:

```json
{
  "id": "string",
  "label": "string",
  "value": 0,
  "when": {
    "intents": [],
    "domains": [],
    "requiresTags": [],
    "forbidsTags": []
  },
  "tags": [],
  "stacking": "stack"
}
```

Allowed `stacking`:

```txt
stack
bestOnly
worstOnly
replace
```

---

## B) CQ mods

Use these when the module changes **AR or DR**.

```json
{
  "id": "fireControl.ar",
  "label": "Fire Control Suite",
  "ar": 1,
  "dr": 0,
  "when": {
    "intents": ["attack"],
    "domains": ["combat"],
    "requiresTags": ["attack.ranged"],
    "forbidsTags": []
  },
  "tags": ["effect.cq", "effect.cq.ar", "targeting.general"],
  "stacking": "bestOnly"
}
```

Schema:

```json
{
  "id": "string",
  "label": "string",
  "ar": 0,
  "dr": 0,
  "when": {
    "intents": [],
    "domains": [],
    "requiresTags": [],
    "forbidsTags": []
  },
  "tags": [],
  "stacking": "stack"
}
```

Important:

* `ar` and `dr` may be negative
* handling interaction stays driven by `CQPart.tags`, not by module name, which matches your locked handling-offset design. 

---

## C) Action injections

Use these when the module unlocks a workflow or stance instead of being a passive modifier.

```json
{
  "id": "multiTargeting.splitFire",
  "label": "Split Fire",
  "actionType": "combatOption",
  "intent": "attack",
  "payload": {
    "mode": "splitFire"
  },
  "costs": [
    { "type": "sa", "value": 1 },
    { "type": "burn", "value": 1 }
  ],
  "when": {
    "intents": ["attack"],
    "domains": ["combat"],
    "requiresTags": ["attack.ranged"],
    "forbidsTags": []
  },
  "tags": ["effect.action", "targeting.multitarget"]
}
```

Schema:

```json
{
  "id": "string",
  "label": "string",
  "actionType": "combatOption",
  "intent": "string",
  "payload": {},
  "costs": [],
  "when": {
    "intents": [],
    "domains": [],
    "requiresTags": [],
    "forbidsTags": []
  },
  "tags": []
}
```

Allowed `cost.type` values:

```txt
sa
burn
edge
reaction
heat
```

This fits your action/burn architecture and the principle that sheets emit payloads, not mechanics.

---

## D) Constraints

Use these for hard prohibitions.

```json
{
  "id": "staticAmmo.noSwap",
  "label": "Static Ammo Feed",
  "kind": "prohibit",
  "target": "ammoSwap",
  "when": {
    "intents": ["attack"],
    "domains": ["combat"],
    "requiresTags": ["weapon.usesAmmo"],
    "forbidsTags": []
  },
  "tags": ["effect.constraint", "ammo.static"]
}
```

Schema:

```json
{
  "id": "string",
  "label": "string",
  "kind": "prohibit",
  "target": "string",
  "when": {
    "intents": [],
    "domains": [],
    "requiresTags": [],
    "forbidsTags": []
  },
  "tags": []
}
```

Allowed `kind`:

```txt
prohibit
require
limit
replace
```

---

## E) Trigger hooks

Use sparingly for crits, jams, catastrophic failures, subsystem shutdowns.

```json
{
  "id": "ammoFeed.jamCheck",
  "label": "Ammo Feed Issues",
  "trigger": "afterAttackResolved",
  "effect": "jamCheck",
  "params": {
    "threshold": 1,
    "severity": "weaponJam"
  },
  "when": {
    "intents": ["attack"],
    "domains": ["combat"],
    "requiresTags": ["weapon.usesAmmo"],
    "forbidsTags": []
  },
  "tags": ["effect.trigger", "failure.jam"]
}
```

Schema:

```json
{
  "id": "string",
  "label": "string",
  "trigger": "string",
  "effect": "string",
  "params": {},
  "when": {
    "intents": [],
    "domains": [],
    "requiresTags": [],
    "forbidsTags": []
  },
  "tags": []
}
```

Recommended trigger vocabulary:

```txt
beforeIntentResolve
beforeRoll
afterRoll
afterAttackResolved
afterDamageApplied
onCritRolled
onStatusApplied
onActivationStart
onActivationEnd
onReactionSpent
```

Recommended effect vocabulary:

```txt
addBurn
reduceBurn
jamCheck
applyStatus
downgradeCrit
upgradeCrit
disableSubsystem
grantFollowupAction
overrideArc
suppressPassiveCooldown
```

---

## F) Passives

Use these for non-roll campaign/logistics flags.

```json
{
  "id": "maintenance.easy",
  "label": "Easy Maintenance",
  "kind": "flag",
  "value": 1,
  "tags": ["effect.passive", "campaign.maintenance"]
}
```

Schema:

```json
{
  "id": "string",
  "label": "string",
  "kind": "flag",
  "value": 0,
  "tags": []
}
```

---

# 4) Controlled tag taxonomy

This needs to stay **closed and intentional**.
Do not let arbitrary free-text tags become rules keys.

## Rule for tags

Use **dot-separated controlled tokens**:

```txt
namespace.subnamespace.leaf
```

Examples:

* `effect.cq.ar`
* `range.short`
* `attack.ranged`
* `platform.mech`
* `failure.jam`

---

## A) Scope / ownership tags

```txt
module.scope.platform
module.scope.weapon
module.scope.weaponGroup
module.scope.location
module.scope.crew
```

---

## B) Family tags

These are for UI grouping and migration.

```txt
module.family.fireControl
module.family.targeting
module.family.sensor
module.family.mobility
module.family.defense
module.family.cooling
module.family.command
module.family.melee
module.family.maintenance
module.family.failure
```

---

## C) Effect type tags

These are mechanical and should line up with provider routing.

```txt
effect.dice
effect.cq
effect.cq.ar
effect.cq.dr
effect.action
effect.constraint
effect.trigger
effect.passive
```

---

## D) Intent tags

Used in `when.requiresTags` and resolver filtering.

```txt
intent.attack
intent.defense
intent.resistance
intent.sensor
intent.piloting
intent.initiative
intent.common
```

---

## E) Domain tags

Use `ctx.domains`, not `domainTags`, per your canonical preference.

```txt
domain.combat
domain.physical
domain.mental
domain.social
domain.vehicle
domain.mech
domain.command
domain.support
```

---

## F) Attack classification tags

```txt
attack.ranged
attack.melee
attack.direct
attack.area
attack.split
attack.reaction
attack.primary
attack.secondary
```

---

## G) Range tags

These are useful for targeted modules like Precision Targeting.

```txt
range.engaged
range.close
range.short
range.medium
range.long
range.extreme
```

---

## H) Target tags

```txt
target.flying
target.ground
target.vehicle
target.mech
target.infantry
target.exposed
target.sensorLock
```

---

## I) Platform tags

```txt
platform.mech
platform.vehicle
platform.npc
platform.aerospace
platform.ground
platform.oversized
platform.lowProfile
platform.stable
platform.unstable
```

---

## J) Weapon tags

These should reflect meaningful rule hooks, not fluff.

```txt
weapon.energy
weapon.ballistic
weapon.missile
weapon.support
weapon.melee
weapon.usesAmmo
weapon.primaryEligible
weapon.stabilized
weapon.modular
weapon.jettisonCapable
weapon.accurate
weapon.inaccurate
```

---

## K) Sensor / EW tags

```txt
sensor.advanced
sensor.hardened
sensor.degraded
sensor.ecmResistant
sensor.ghosting
sensor.interference
```

---

## L) Mobility / handling tags

These matter because of your handling-offset logic and the distinction between CQ penalties and dice friction. 

```txt
mobility.agile
mobility.restricted
mobility.jump
mobility.air
handling.assist
handling.penalty
selfInduced
stability
tracking
environment
heat
systemDamage
```

Important:

* `selfInduced`
* `stability`
* `tracking`
* `environment`
* `heat`
* `systemDamage`

These six are the most load-bearing tags because they determine how modifiers interact with handling and where they belong in the pipeline. 

---

## M) Failure / vulnerability tags

```txt
failure.jam
failure.catastrophic
failure.critVulnerable
failure.sensor
failure.cooling
failure.mobility
failure.ejection
```

---

## N) Campaign / logistics tags

```txt
campaign.maintenance
campaign.supply
campaign.commonParts
campaign.obsolete
campaign.prototype
campaign.command
campaign.morale
```

---

# 5) Validation rules

These should be enforced at item prep/validation time.

## Hard rules

1. An effect object may not contain both `value` and `ar/dr`
2. `diceMods` may not use CQ-only tags as their primary effect tags
3. `cqMods` should not be used to emulate DN changes
4. No module may directly add DN except through the normal range/motion providers
5. `when.requiresTags` and `when.forbidsTags` must use controlled tags only
6. `constraints` should prohibit or limit workflows, not silently alter math
7. `triggers` are the only place allowed to cause post-resolution failures like jams, shutdowns, catastrophic checks
8. Any module with `scope = "weapon"` should either identify `weaponIds` or rely on owning-item context
9. Modules with mutually exclusive functions should use `forbidsModules`

These keep the schema aligned with your core doctrine.

---

# 6) Example modules

## Fire Control Suite

```json
{
  "name": "Fire Control Suite",
  "type": "assetModule",
  "system": {
    "moduleType": "system",
    "subtype": "quirk",
    "tier": 1,
    "enabled": true,
    "source": {
      "origin": "canon-adapted",
      "family": "fire-control",
      "canonicalId": "fireControlSuite"
    },
    "mounting": {
      "scope": "platform",
      "location": null,
      "weaponIds": [],
      "groupIds": []
    },
    "applicability": {
      "actorTypes": ["battlemech", "vehicle"],
      "weaponCategories": ["ranged"],
      "requiresTags": ["platform.ground"],
      "forbidsTags": [],
      "requiresModules": [],
      "forbidsModules": []
    },
    "tags": [
      "module.scope.platform",
      "module.family.fireControl",
      "effect.cq",
      "effect.cq.ar",
      "targeting.general"
    ],
    "effects": {
      "diceMods": [],
      "cqMods": [
        {
          "id": "fireControl.ar",
          "label": "Fire Control Suite",
          "ar": 1,
          "dr": 0,
          "when": {
            "intents": ["attack"],
            "domains": ["combat"],
            "requiresTags": ["attack.ranged"],
            "forbidsTags": []
          },
          "tags": ["effect.cq", "effect.cq.ar", "targeting.general"],
          "stacking": "bestOnly"
        }
      ],
      "actions": [],
      "constraints": [],
      "triggers": [],
      "passives": []
    },
    "ui": {
      "shortLabel": "Fire Control",
      "summary": "+1 AR on ranged attacks",
      "sort": 100
    },
    "notes": ""
  }
}
```

---

## Multi-Targeting System

```json
{
  "name": "Multi-Targeting System",
  "type": "assetModule",
  "system": {
    "moduleType": "system",
    "subtype": "quirk",
    "tier": 1,
    "enabled": true,
    "source": {
      "origin": "canon-adapted",
      "family": "targeting",
      "canonicalId": "multiTargetingSystem"
    },
    "mounting": {
      "scope": "platform",
      "location": null,
      "weaponIds": [],
      "groupIds": []
    },
    "applicability": {
      "actorTypes": ["battlemech"],
      "weaponCategories": ["ranged"],
      "requiresTags": ["platform.mech"],
      "forbidsTags": [],
      "requiresModules": [],
      "forbidsModules": []
    },
    "tags": [
      "module.scope.platform",
      "module.family.targeting",
      "effect.action"
    ],
    "effects": {
      "diceMods": [],
      "cqMods": [],
      "actions": [
        {
          "id": "multiTargeting.splitFire",
          "label": "Split Fire",
          "actionType": "combatOption",
          "intent": "attack",
          "payload": {
            "mode": "splitFire"
          },
          "costs": [
            { "type": "sa", "value": 1 },
            { "type": "burn", "value": 1 }
          ],
          "when": {
            "intents": ["attack"],
            "domains": ["combat"],
            "requiresTags": ["attack.ranged"],
            "forbidsTags": []
          },
          "tags": ["effect.action", "targeting.multitarget"]
        }
      ],
      "constraints": [],
      "triggers": [],
      "passives": []
    },
    "ui": {
      "shortLabel": "Multi-Target",
      "summary": "Unlock Split Fire action",
      "sort": 200
    },
    "notes": ""
  }
}
```

---

## Ammo Feed Issues

```json
{
  "name": "Ammo Feed Issues",
  "type": "assetModule",
  "system": {
    "moduleType": "negative",
    "subtype": "flaw",
    "tier": 1,
    "enabled": true,
    "source": {
      "origin": "canon-adapted",
      "family": "failure",
      "canonicalId": "ammoFeedIssues"
    },
    "mounting": {
      "scope": "weapon",
      "location": null,
      "weaponIds": [],
      "groupIds": []
    },
    "applicability": {
      "actorTypes": ["battlemech", "vehicle"],
      "weaponCategories": ["ballistic", "missile"],
      "requiresTags": ["weapon.usesAmmo"],
      "forbidsTags": [],
      "requiresModules": [],
      "forbidsModules": []
    },
    "tags": [
      "module.scope.weapon",
      "module.family.failure",
      "effect.trigger",
      "failure.jam"
    ],
    "effects": {
      "diceMods": [],
      "cqMods": [],
      "actions": [],
      "constraints": [],
      "triggers": [
        {
          "id": "ammoFeed.jamCheck",
          "label": "Ammo Feed Issues",
          "trigger": "afterAttackResolved",
          "effect": "jamCheck",
          "params": {
            "threshold": 1,
            "severity": "weaponJam"
          },
          "when": {
            "intents": ["attack"],
            "domains": ["combat"],
            "requiresTags": ["weapon.usesAmmo"],
            "forbidsTags": []
          },
          "tags": ["effect.trigger", "failure.jam"]
        }
      ],
      "passives": []
    },
    "ui": {
      "shortLabel": "Ammo Feed",
      "summary": "Attack may jam after firing",
      "sort": 900
    },
    "notes": ""
  }
}
```

---

# 7) Implementation guidance

## Provider mapping

Map module effects into the resolver like this:

* `effects.diceMods` → DiceModProvider
* `effects.cqMods` → CQProvider
* `effects.actions` → action registry / intent injector
* `effects.constraints` → intent validation layer
* `effects.triggers` → post-resolution hook bus
* `effects.passives` → campaign/supply/repair services

That preserves your existing separation of responsibilities.

## Sheet behavior

The sheet should only:

* display installed asset modules
* expose any injected actions as payload-driven buttons
* never interpret the module mechanically

That is consistent with your “sheet does not do math” and clickable payload design. 

---

# 8) Recommended first-wave module set

These are the easiest to implement with this schema:

1. Fire Control Suite
2. Precision Targeting
3. Multi-Targeting System
4. Low Profile Frame
5. Stable Platform
6. Cooling System
7. Advanced Sensor Suite
8. Hardened Communications
9. Reinforced Cockpit
10. Ammo Feed Issues
11. Static Ammo Feed
12. Oversized Frame

These cover passive CQ, passive dice, one action injector, one constraint, and one trigger family without requiring exotic infrastructure.

