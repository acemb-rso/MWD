# MWD Macro & Scripting Reference

Everything a macro or module author needs to interact with the MWD system
programmatically. All public entry points live under `game.mwd` once the system
is ready.

---

## Table of Contents

1. [game.mwd Namespace](#1-gamemwd-namespace)
2. [Triggering Rolls — game.mwd.roll](#2-triggering-rolls--gamemwdroll)
3. [Applying Harm — game.mwd.harm](#3-applying-harm--gamemwdharm)
4. [Machine Heat — game.mwd.machineHeat](#4-machine-heat--gamemwdmachineheat)
5. [Personal Combat Tracker — game.mwd.personalCombat](#5-personal-combat-tracker--gamemwdpersonalcombat)
6. [Weapon Data Authoring Reference](#6-weapon-data-authoring-reference)
7. [Status Effect IDs](#7-status-effect-ids)
8. [Actor & Item Type Constants](#8-actor--item-type-constants)
9. [Roll Payload Intent Reference](#9-roll-payload-intent-reference)
10. [Asset Module Hooks](#10-asset-module-hooks)

---

## 1. game.mwd Namespace

| Property | Type | Description |
|---|---|---|
| `game.mwd.roll` | Object | Roll execution API |
| `game.mwd.harm` | Object | HarmEngine + queued damage actions |
| `game.mwd.machineHeat` | Object | BattleMech heat management |
| `game.mwd.personalCombat` | Class | PersonalCombatTracker (static methods) |
| `game.mwd.tokenHeatFx` | Object | Token heat visual effects controller |
| `game.mwd.skills` | Object | Skill catalog service |
| `game.mwd.lifeModules` | Object | Life module catalog service |

---

## 2. Triggering Rolls — game.mwd.roll

### `game.mwd.roll.execute({ actor, payload, event? })`

The single entry point for all rolls. Resolves intent, shows the roll dialog,
rolls dice, and posts the result to chat.

```js
await game.mwd.roll.execute({ actor, payload });
```

Returns the created `ChatMessage`, or `null` if the user cancelled.

#### Core payload fields

| Field | Type | Required | Description |
|---|---|---|---|
| `intent` | string | ✓ | What kind of roll this is (see §9) |
| `key` | string | skill rolls | Skill code, e.g. `"gunnery"`, `"athletics"` |
| `weaponId` | string | attack | ID of the weapon item on the actor |
| `payloadId` | string | — | ID of the active payload/ammo type |
| `tags` | string[] | — | Descriptive tags attached to the roll card |
| `edge` | Object | — | `{ pool: "grit", allowed: ["pre","post"] }` |

#### Common examples

```js
// Simple skill roll
await game.mwd.roll.execute({
  actor,
  payload: { intent: "skill", key: "piloting", domains: ["physical"] }
});

// Personal weapon attack (auto-selects equipped weapon)
await game.mwd.roll.execute({
  actor,
  payload: { intent: "attack", mode: "auto", tags: ["combat", "attack"] }
});

// Attack with a specific weapon
const weapon = actor.items.find(i => i.name === "Mauser 960");
await game.mwd.roll.execute({
  actor,
  payload: {
    intent: "attack",
    weaponId: weapon.id,
    edge: { pool: "physical.grit", allowed: ["pre", "post"] },
    tags: ["combat", "attack"]
  }
});

// BattleMech weapon group attack
await game.mwd.roll.execute({
  actor,   // battlemech actor
  payload: {
    intent: "attack",
    sourceType: "weaponGroup",
    sourceId: "alpha"   // weapon group ID from the mech sheet
  }
});

// Initiative
await game.mwd.roll.execute({
  actor,
  payload: { intent: "initiative" }
});

// Heat Danger Check
await game.mwd.roll.execute({
  actor,   // battlemech actor
  payload: { intent: "heatDangerCheck" }
});
```

---

## 3. Applying Harm — game.mwd.harm

`game.mwd.harm` exposes `HarmEngine` (static apply methods) merged with the
queued attack damage helpers.

### `game.mwd.harm.apply({ actor, token?, payload, options? })`

Universal harm entry point. Routes to the correct sub-handler based on
`payload.mode`.

```js
const result = await game.mwd.harm.apply({ actor, payload, options });
// result.ok — boolean
// result.actorName — target display name
// result.beforeLabel / afterLabel — human-readable state change
```

#### options

| Field | Type | Default | Description |
|---|---|---|---|
| `dryRun` | boolean | false | Preview without applying |
| `logToChat` | boolean | false | Post a GM notice to chat |
| `actorId` | string | — | Fallback actor ID if no actor passed |
| `preferSceneTarget` | boolean | false | Use the currently controlled token |

---

### Harm modes

#### `"trackDelta"` — adjust a Personal damage track

```js
await game.mwd.harm.apply({
  actor,
  payload: {
    mode: "trackDelta",
    track: "physical",   // "physical" | "fatigue"
    delta: 3,            // positive = damage, negative = heal
    source: "Environmental hazard"
  }
});
```

With armor-aware routing (personal armor applies):

```js
await game.mwd.harm.apply({
  actor,
  payload: {
    mode: "trackDelta",
    track: "physical",
    delta: 5,
    useArmor: true,
    damageType: "thermal",   // see §6.2
    ap: 1,
    source: "Flamethrower splash"
  }
});
```

---

#### `"burnDelta"` — adjust a Personal actor's Burn

```js
await game.mwd.harm.apply({
  actor,
  payload: {
    mode: "burnDelta",
    delta: 2,      // positive = add Burn, negative = reduce Burn
    source: "Winded critical"
  }
});
```

---

#### `"status"` — toggle a status effect

```js
await game.mwd.harm.apply({
  actor,
  payload: {
    mode: "status",
    statusId: "onFire",   // see §7 for all valid IDs
    active: true,
    source: "Incendiary round"
  }
});
```

---

#### `"machineAttackDamage"` — apply damage to a BattleMech or vehicle

Typically generated by the attack pipeline, but callable directly for GM tools.

```js
await game.mwd.harm.apply({
  actor,   // battlemech or vehicle
  payload: {
    mode: "machineAttackDamage",
    damage: 8,
    damageType: "energy",
    ap: 0,
    attackQuality: "hit",   // "hit" | "graze" | "highMargin"
    outcome: "hit",
    netHits: 2,
    source: "Medium Laser",
    requirePreparedCriticalRecords: false
  }
});
```

---

### Queued attack damage helpers

These operate on existing chat message roll data.

```js
// Apply damage for one target result by index
await game.mwd.harm.applyQueuedAttackDamageFromMessage({
  message,       // ChatMessage document
  resultIndex: 0
});

// Apply all pending target results at once
await game.mwd.harm.applyAllQueuedAttackDamageFromMessage({ message });

// Rebuild the machine damage preview (e.g. after changing hit-location options)
await game.mwd.harm.rebuildQueuedAttackDamagePreview({
  mutation,      // from resolved.attackResult.results[n].queuedMutation
  result,
  targetActor,
  targetToken
});
```

---

## 4. Machine Heat — game.mwd.machineHeat

All methods require the actor to be a `battlemech`.

```js
// Add heat to the actor's Pending Heat queue
await game.mwd.machineHeat.adjustPendingHeat(actor, +3, { reason: "plasma blast" });

// Set Pending Heat to an exact value
await game.mwd.machineHeat.setPendingHeat(actor, 5, { reason: "manual override" });

// Resolve Pending Heat at end of activation (applies dissipation, posts checks)
await game.mwd.machineHeat.resolvePendingHeat(actor);

// Read the current heat model (no writes)
const model = game.mwd.machineHeat.buildModel(actor);
// model.currentHeat, model.pendingHeat, model.dissipation,
// model.effectiveDissipation, model.thresholds, model.penalties
```

---

## 5. Personal Combat Tracker — game.mwd.personalCombat

`game.mwd.personalCombat` is the `PersonalCombatTracker` class; all methods are
static.

### Reading state

```js
// Full combat snapshot for a combatant
const snap = game.mwd.personalCombat.getSnapshot(actor, { token });
// snap.hasCombatant — in combat
// snap.resources.sa / fa / ra — current / max
// snap.state.actionState.aim — aim active
// snap.state.burnValue — current Burn
```

### Spending resources

```js
// Spend Standard Actions (or fa / ra)
await game.mwd.personalCombat.spendResource(actor, {
  token,
  resource: "sa",        // "sa" | "fa" | "ra"
  cost: 2,
  actionId: "attack",
  actionLabel: "Attack",
  actionCostLabel: "2 SA",
  actionCategory: "complex"   // "simple" | "complex" | "free" | "reaction"
});
```

### Combat state helpers

```js
// Execute a declared personal action by ID (spends cost, runs resolver)
await game.mwd.personalCombat.executeAction(actor, {
  token,
  actionId: "reduceBurn"   // see personal-action-catalog for all IDs
});

// Clear the actor's Aim state
await game.mwd.personalCombat.clearAim(actor, { token });

// Mark a BattleMech weapon group as fired this activation
await game.mwd.personalCombat.markWeaponGroupUsed(actor, { token, groupId: "alpha" });

// Commit a reaction spend (e.g. Evade)
await game.mwd.personalCombat.commitReactionSpend(actor, {
  token,
  actionId: "evade",
  actionLabel: "Evade",
  actionCategory: "reaction",
  logLabel: "Evade: Target Name"
});
```

---

## 6. Weapon Data Authoring Reference

### 6.1 Standard Weapon Traits (`system.standardTraits`)

Authored on the weapon item sheet via the Standard Traits picker. Each trait
resolves into `effects` at attack-resolution time.

| Trait key | Effect produced | Notes |
|---|---|---|
| `fatigue` | Damage routes to Fatigue track | Stun / nonlethal weapons |
| `concealable` | `flags: ["concealable"]` | Display only |
| `singleShot` | Enables single fire mode only | |
| `automatic` | Enables single, burst, full-auto fire modes | |
| `spread` | `flags: ["spread"]` | Display / future AoE use |
| `spaceCapable` | `flags: ["spaceCapable"]` | Display / environment rules |
| `armorBypass` | `flags: ["armorBypass"]` | Damage bypasses armor to Physical/Fatigue directly |

---

### 6.2 Payload Capability Traits (`payload.traits`)

Authored on inline payloads (weapon sheet → Payloads section) or on standalone
payload items via the **Add Trait** picker. Some capabilities have live engine
logic; others are reserved for future use.

| Trait key | Live? | Effect |
|---|---|---|
| `templated` | ✓ | Routes attack through template placement workflow |
| `armorBypass` | ✓ | Damage bypasses armor (merges into `effects.flags`) |
| `incendiary` | reserved | No engine logic yet |
| `emp` | reserved | No engine logic yet |
| `clustered` | reserved | No engine logic yet |
| `mineLayer` | reserved | No engine logic yet |
| `smoke` | reserved | No engine logic yet |

**Note:** `armorBypass` is the only capability trait that currently propagates
into `effects.flags` for the personal-weapon damage path. Additional capability
traits that need engine effects must be added to `PAYLOAD_EFFECT_FLAG_TRAITS` in
`personal-damage.js`.

---

### 6.3 Effects Flags (`effects.flags`)

Populated automatically from standard traits and certain payload capability
traits. Read by the damage engine at apply time.

| Flag | Applies to | Effect |
|---|---|---|
| `armorBypass` | Personal & machine | Personal: `netResistance = 0`, armor wear skipped. Machine: `armorAbsorbed = 0`, full damage routes to structure |
| `fatigue` | Personal | Routes damage to Fatigue track |
| `concealable` | — | Display only |
| `spread` | — | Display only (future AoE) |
| `spaceCapable` | — | Display only |

For **machine weapons**, `armorBypass` is authored as the keyword `armorBypass`
on the weapon item's Keywords field. The weapon group attack profile reads it
from all member weapons.

---

### 6.4 On-Hit Effects (`resolution.onHitEffect`)

A string authored on a payload's resolution field. Applied to the target after
damage is confirmed, on a hit or graze.

| Value | Target | Effect |
|---|---|---|
| `burn+N` | character, npc | Adds N Burn to the target |
| `heat+N` | battlemech, vehicle | Adds N to the target's Pending Heat |
| `onFire` | any | Applies the `onFire` status to the target |

Example: an incendiary payload item would set `system.profile.resolution.onHitEffect = "burn+2"`.

---

### 6.5 Damage Types

#### Personal scale

| Key | Description |
|---|---|
| `penetrating` | Pierce, cut, tear (focused force) |
| `concussive` | Blunt force, shockwave |
| `energy` | Directed non-thermal beam/particle |
| `thermal` | Heat, burning, plasma |
| `electrical` | Electrical / EM disruption |

Armor standard traits (`ablative`, `flak`, `padded`, `insulated`) add
`mitigationByType` bonuses for specific damage types.

#### Machine scale

Machine weapons use three base types: `penetrating`, `concussive`, `energy`.
The subtypes `thermal` and `electrical` are valid as payload `modifies.damageType`
overrides (mapped to `energy` for armor purposes).

---

### 6.6 Armor Standard Traits (`armor.system.standardTraits`)

| Trait key | Effect |
|---|---|
| `ablative` | +2 mitigation vs `energy` |
| `flak` | +1 mitigation vs `penetrating` |
| `padded` | +1 mitigation vs `concussive` |
| `insulated` | +2 mitigation vs `thermal` |
| `reinforced` | Rated — adds a Reinforced buffer that absorbs hits before rating degrades |

---

## 7. Status Effect IDs

Pass these to `game.mwd.harm.apply` with `mode: "status"`.

### Personal actors (`character`, `npc`)

| ID | Label | Notes |
|---|---|---|
| `prone` | Prone | |
| `blinded` | Blinded | |
| `frightened` | Frightened | |
| `deafened` | Deafened | |
| `hidden` | Hidden | |
| `suppressed` | Suppressed | |
| `grappled` | Grappled | |
| `stunned` | Stunned | |
| `knockedOut` | Knocked Out | |
| `drugged` | Drugged | |
| `radiation` | Radiation | |

### All actors

| ID | Label | Notes |
|---|---|---|
| `onFire` | On Fire | +1 Heat/turn (machine) or escalating Burn (personal hazard) |
| `overloaded` | Overloaded | Managed — set via `system.burn.overloaded`; cleared when Burn = 0 |

### Personal critical band statuses (managed — set by the crit engine)

| ID | Label |
|---|---|
| `windedMinor` / `windedModerate` / `windedSevere` | Winded I / II / III |
| `concussionMinor` / `concussionModerate` / `concussionSevere` | Concussion I / II / III |
| `crippledMinor` / `crippledModerate` / `crippledSevere` | Crippled I / II / III |
| `hamperedMinor` / `hamperedModerate` / `hamperedSevere` | Hampered I / II / III |
| `offbalanceMinor` / `offbalanceModerate` / `offbalanceSevere` | Off Balance I / II / III |
| `shakenMinor` / `shakenModerate` / `shakenSevere` | Shaken I / II / III |

### Machine actors (`battlemech`, `vehicle`)

**Stability / Movement**

| ID | Label |
|---|---|
| `unstable` | Unstable |
| `staggeredMechanical` | Staggered |
| `proneMechFall` | Prone (BattleMech only) |
| `skidding` | Skidding |
| `stalled` | Stalled |
| `limping` | Limping |
| `jumpJetFailure` | Jump Jet Failure (BattleMech only) |
| `actuatorFailure` | Actuator Failure |
| `gyroDamage` | Gyro Damage (BattleMech only) |

**Weapons**

| ID | Label |
|---|---|
| `weaponFailure` | Weapon Failure |
| `jammedBallistic` | Jammed (Ballistic) |
| `armDestroyed` | Arm Destroyed (BattleMech only) |

**Sensors / EW**

| ID | Label |
|---|---|
| `sensorDegraded` | Sensor Degraded |
| `sensorBlind` | Sensor Blind |
| `ecmJamming` | ECM Jamming |
| `ecmShrouded` | ECM Shrouded |
| `epmBoosted` | EPM Boosted |
| `sensorLocked` | Sensor Locked |
| `trackingLost` | Tracking Lost |

**Reactor / Heat**

| ID | Label |
|---|---|
| `reactorInstability` | Reactor Instability |
| `shutdown` | Shutdown |
| `overheating` | Thermal Surge |
| `coolingFailure` | Cooling Failure |
| `reactorBreach` | Reactor Breach |

**Damage / Tactical**

| ID | Label |
|---|---|
| `legDestroyed` | Leg Destroyed (BattleMech only) |
| `destroyed` | Destroyed |
| `exposed` | Exposed |
| `entrenchedHullDown` | Entrenched / Hull Down |
| `obscured` / `obscuredLight` / `obscuredHeavy` | Obscured variants |
| `evasiveWeave` | Evasive |
| `braced` | Braced |
| `overextended` | Overextended |
| `targetFocused` | Target Focused |
| `suppressedMechanical` | Suppressed |

---

## 8. Actor & Item Type Constants

```js
// Actor types
"character"   // Player character
"npc"         // Non-player character
"vehicle"     // Ground / air vehicle
"battlemech"  // BattleMech

// Item types
"personalWeapon"
"mechWeapon"
"weaponPayload"
"armor"
"skill"
"quality"
"assetModule"
"gear"
"consumable"
"contact"
"lifeModule"
"mechEquipment"
"vehicleUpgrade"

// Monitor keys (system.monitors.<key>.value / .max)
"physical"    // Personal damage track
"fatigue"     // Personal fatigue track
"armor"       // Machine armor track
"structure"   // Machine structure track
"heat"        // BattleMech heat track

// Edge pool keys
"grit"         // Physical domain A
"chaos"        // Physical domain B
"insight"      // Mental domain A
"rumor"        // Mental domain B
"legend"       // Social domain A
"credibility"  // Social domain B
```

---

## 9. Roll Payload Intent Reference

| Intent | Actor | Key required | Notes |
|---|---|---|---|
| `"attack"` | any | — | Requires `weaponId` or `mode: "auto"` for personal; `sourceType: "weaponGroup"` + `sourceId` for mech |
| `"skill"` | any | ✓ skill code | e.g. `key: "piloting"` |
| `"initiative"` | any | — | Sets combatant initiative |
| `"overload"` | character, npc | — | Overload check at Burn ≥ 6 |
| `"heatDangerCheck"` | battlemech | — | Shutdown + explosion checks |
| `"machineRemedy"` | battlemech, vehicle | — | Requires additional remedy context |
| `"acquire"` | battlemech, vehicle | — | EW acquire target action |
| `"targeting"` | battlemech, vehicle | — | EW fire solution action |

### Skill codes (common)

| Code | Attribute | Domain |
|---|---|---|
| `athletics` | STR | physical |
| `firearms` | REF | physical |
| `meleeWeapons` | STR | physical |
| `piloting` | REF | physical |
| `stealth` | REF | physical |
| `gunnery` | REF | physical |
| `tactics` | INT | mental |
| `perception` | INT | mental |
| `medicine` | INT | mental |
| `technician` | INT | mental |
| `negotiation` | CHA | social |
| `leadership` | CHA | social |

---

## 10. Asset Module Hooks

Hooks fired by the system that modules and macros can listen to via
`Hooks.on("mwd.<hook>", handler)`.

| Hook | When fired | Context object |
|---|---|---|
| `mwd.beforeMachineDamagePreview` | Before machine damage preview is computed | `{ actor, payload, damageIncoming, adjustedIncoming }` |
| `mwd.beforeMachineDamageApply` | Before machine damage is written to the actor | `{ actor, token, payload, options, preview }` — return `false` to cancel |
| `mwd.beforeHeatDissipation` | Before end-of-activation heat resolution | `{ actor, pendingHeat, dissipation }` |
| `mwd.beforeAttackTargeting` | Before EW targeting modifiers are applied | `{ actor, resolved, payload }` |
| `mwd.beforeTargetingPacketConsume` | Before an EW targeting packet is consumed | `{ attacker, targetTokenUuid, packetId, ctx }` |

---

## Quick-Reference: Macro Patterns

### Deal 5 fire damage directly to a targeted token's Physical track

```js
const target = [...game.user.targets][0]?.actor;
if (target) {
  await game.mwd.harm.apply({
    actor: target,
    payload: { mode: "trackDelta", track: "physical", delta: 5,
               damageType: "thermal", useArmor: true, source: "Macro: fire damage" },
    options: { logToChat: true }
  });
}
```

### Set a machine on fire

```js
const target = [...game.user.targets][0]?.actor;
if (target) {
  await game.mwd.harm.apply({
    actor: target,
    payload: { mode: "status", statusId: "onFire", active: true,
               source: "Macro: incendiary" },
    options: { logToChat: true }
  });
}
```

### Add Burn to a character

```js
const actor = game.actors.getName("Kai");
await game.mwd.harm.apply({
  actor,
  payload: { mode: "burnDelta", delta: 2, source: "Overexertion" },
  options: { logToChat: true }
});
```

### Add heat to a BattleMech

```js
const mech = game.actors.getName("Atlas AS7-D");
await game.mwd.machineHeat.adjustPendingHeat(mech, 4, { reason: "Macro: external heat" });
```

### Roll a skill check for the selected token's actor

```js
const actor = canvas.tokens.controlled[0]?.actor;
if (actor) {
  await game.mwd.roll.execute({
    actor,
    payload: { intent: "skill", key: "perception", domains: ["mental"] }
  });
}
```
