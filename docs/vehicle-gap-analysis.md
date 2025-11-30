# MWD Vehicle Handling – System Gap Analysis & Attribute Redesign

This document outlines the mechanical gaps between **MechWarrior: Destiny (MWD)** and our current **Anarchy-derived vehicle implementation**, and defines a new, BattleTech-appropriate attribute set for all ‘Mechs and vehicles. This attribute set replaces Shadowrun-oriented stats (Autopilot, Firewall) with values that matter in a BattleTech context (piloting behavior, mechanical robustness, electronics, redundancy).

The goal:

> **MWD-style hit locations, crits, and catastrophic results without re-creating full BattleTech.**

---

## 1. Mech-Scale Rules from MWD (Reference Excerpts)

> **‘Mechs:** A ‘Mech is disabled if the head or torso is destroyed, if the pilot is killed, or if it suffers an ammo explosion or two engine crits.
> **Vehicles:** A combat vehicle is destroyed if *any* location loses all its Structure or if it suffers an ammo explosion.
> **Criticals:** Whenever a unit takes Structure damage in a location **or the hit-location roll is 2**, roll 2D6; on 8+, apply a critical effect.
> **Vehicle Crit Effects:** Crew-compartment hits, destroyed weapon groups, motive system damage (–2 Movement), turret damage, rotor hits (2nd hit destroys VTOL), ammo explosions, etc.
> **Catastrophic Damage:** Crash impacts, ammo detonations, total immobilization, or location destruction may result in total vehicle loss.

MWD assumptions:

* Location always matters.
* Structure is location-specific.
* Criticals drive gameplay.
* Catastrophic failures can end a vehicle instantly.

---

## 2. Current Anarchy Vehicle Implementation (Summary)

The current system mirrors metahuman actors:

* Vehicle actors expose **initiative** and **defense** helpers but only track **a single shared Structure monitor**.
* No hit-location table, no per-location stress, no critical-hit workflow.
* Attack resolution applies aggregate damage to a single monitor via `ActorDamageManager.sufferDamage`.
* No logic for weapon group loss, motive damage, turret/rotor status, crew compartment harm, or catastrophic outcomes.
* Vehicle attributes are **Autopilot, Handling, Firewall, System**, which reflect Shadowrun’s rigging/hacking model and do not match BattleTech concepts.

---

## 3. Gap List: MWD Requirements vs Current System

### Gap 1 — Hit Locations (Missing)

MWD requires **per-attack hit-location rolls** and location-dependent outcomes. Current system: *no hit-location roll*, no data structure for location state.

### Gap 2 — Location-Based Structure / Damage Consequences

MWD vehicles lose the entire unit if **any location** hits 0 Structure. Current system: only one shared Structure track exists.

### Gap 3 — Critical Hit Workflow

MWD triggers crit checks on Structure loss or hit roll of 2. Current system: *no critical checks*, no tracking of crit effects, no escalation mechanics.

### Gap 4 — Crew Effects & Catastrophic Damage

MWD distinguishes:

* Vehicle destroyed
* Crew damaged
* Crew forced to bail

Current system: no crew subsystem and no catastrophic-damage logic.

### Gap 5 — Movement, Weapon, and System Degradation

MWD crits degrade:

* Weapon groups
* Motive systems
* Turrets / rotors
* Engines

Current system: crits cannot modify Movement, weapons, targeting, or startup logic.

### Gap 6 — Attribute Mismatch

Current attributes (Autopilot, Firewall) assume hacking, rigging, rigger safety, and drones—none of which exist in BattleTech. We need **physical, mechanical, and reliability-based attributes** instead.

---

## 4. New Vehicle Attribute Set (BattleTech-Appropriate)

We replace “Autopilot” and “Firewall” with attributes reflecting BattleTech’s realities: **piloting**, **electronics**, **mechanical frame**, and **maintenance quality**.

### Final Attribute Set

#### 1. Handling

*How maneuverable the vehicle is under stress.*

Used for piloting checks, movement stability, resisting motive crits, jump-jet landings (for ’Mechs), crash/fall mitigation.

#### 2. System

*Quality of electronics, sensors, fire-control, and onboard computers.*

Used for target acquisition, sensor penalties, shutdown/startup checks, resolving sensor or engine crit effects.

#### 3. Chassis (or “Tonnage”)

**Choose one depending on desired flavor:**

##### ▸ Chassis (recommended)

Represents structural durability, frame stability, and physical resilience.

Used for knockdown resistance, crash mitigation, resisting catastrophic torsos/head failures, and absorbing physical crits.

##### ▸ Tonnage (alternative)

Used only as a mass-based resistance factor: heavier = more stable, lighter = easier to topple.

Works well if you want stability tied strongly to ‘Mech weight. Less universal across hovertanks and VTOLs.

#### 4. Condition

*Reliability, maintenance quality, redundancy, and risk of catastrophic failure.*

Used for critical hit resistance, heat overload checks, avoiding shutdown loops, resisting ammo cook-off, and determining escalation from repeated location stress.

**Condition is the attribute that differentiates:**

* SLDF pristine hardware
* Well-maintained merc machines
* Field-repaired FrankenMechs
* “Firestarter we welded together in a barn”

---

## 5. How Existing Thresholds Interact with Condition & Chassis

The current Anarchy system uses **Structure thresholds** that impose global penalties. We keep these as an abstraction of “general system strain.”

MWD criticals are **location-specific** and escalate via stress. We layer crits on top of the existing thresholds:

* **Threshold penalties** = global degradation
* **Crits + Condition** = local failures and catastrophic risks
* **Chassis/Tonnage** = physical stability
* **System** = electronics stability
* **Handling** = piloting agility

---

## 6. Proposed “MWD-Lite” Vehicle Handling Model

This model keeps gameplay simple while being fully MWD-flavored.

### 1. Shared Armor + Structure (No Per-Location Pools)

We do **not** add per-location Structure to the actor. Damage still reduces a shared Structure track.

But each incoming damage packet rolls a **hit location**, which determines:

* which **location’s stress** increases
* which **crit table** to use

Location stress escalates independently of Structure.

### 2. Critical Triggers

A crit check is rolled when:

* Structure is reduced
* Hit roll shows **natural 2**
* Heat overload requires a check
* Certain catastrophic outcomes occur (ammo, rotor, engine hits)

Condition modifies crit resistance.

### 3. Critical Effects

Effects depend on location tags:

* Weapon Group disabled
* Motive penalty (–2 Movement)
* Crew compartment harm
* Turret lock
* Rotor hit (VTOL: 2nd hit = destroyed)
* Engine hit
* Ammo explosion
* Gyro hit
* Cockpit damage

Chassis/Tonnage mitigates collapse, knockdown, and Frame destruction.

### 4. Heat (Simplified Track)

0–4 heat tokens:

* 2 = running hot (–1 die)
* 3 = overheated (Condition check to avoid shutdown or crit)
* 4 = forced shutdown + crit check

System modifies startup checks after shutdown. Condition modifies heat danger.

### 5. Crew Abstraction

Store:

* crew count
* crew injury level
* bailout flag

Crew effects occur through crew-compartment crits or catastrophic failures.

### 6. Catastrophic Outcomes

A vehicle is destroyed if:

* Structure hits 0
* Ammo explosion crit triggers
* Head/Torso location destroyed (for ’Mechs)
* Rotor destroyed (VTOL)
* Condition check fails at critical stress threshold
* Location stress reaches its max

---

## 7. Summary of Required Code Additions

### Actor Data Model

Add:

* `system.mwd.locations` (each with stress, tags, destroyed flag)
* `system.mwd.crits[]` (active crit effects)
* `system.mwd.heat` (heat track)
* `system.mwd.crew` (crew abstraction)
* `system.mwd.status` (operational/impaired/destroyed)
* New attributes:
  * `handling`
  * `system`
  * `chassis` *or* `tonnage`
  * `condition`

### Combat Manager

Add:

* hit-location roll
* crit-check workflow
* location-stress escalation
* catastrophic outcome evaluation
* Movement / weapon / system adjustments from crits
* heat-gain and heat-resolution logic

---

## MWD Vehicle Data Model & Implementation Tasks

This document defines the **data model** for MWD-style vehicles/’Mechs and the **tasks** required to implement them in the Anarchy-based system.

We assume the MWD-specific state lives under:

* `actor.system.mwd` (preferred)
  or
* `actor.flags["<your-module-id>"].mwd`

Below is written as `actor.system.mwd`, but you can rename the root path as needed.

---

## 1. Vehicle Attribute Redesign

We replace Anarchy’s Shadowrun-centric attributes:

* `Autopilot` (rigging)
* `Firewall` (Matrix defense)

With BattleTech-appropriate attributes:

* **Handling** – agility and maneuverability under stress
* **System** – electronics, sensors, and fire-control quality
* **Chassis** – structural durability and physical stability
* **Condition** – reliability, maintenance quality, and redundancy

These attributes are **vehicle/’Mech properties**, not pilot stats.

### 1.1. Attribute Interface

TypeScript-style pseudo-schema for the vehicle attributes:

```ts
interface MwdVehicleAttributes {
  /**
   * How maneuverable the unit is under stress.
   * Used for piloting checks, stability, resisting motive crits, etc.
   */
  handling: number;   // 1–5

  /**
   * Quality of sensors, targeting, fire-control, onboard computers.
   * Used for target acquisition, sensor penalties, startup/shutdown checks.
   */
  system: number;     // 1–5

  /**
   * Frame strength and physical stability.
   * Used for knockdown resistance, crash/fall mitigation, torso/head destruction resistance.
   */
  chassis: number;    // 1–5

  /**
   * Reliability, maintenance quality, internal redundancy.
   * Used for crit resistance, heat overload checks, and catastrophic failure rolls.
   */
  condition: number;  // 1–5
}
```

Suggested ranges:

* **5** – factory-fresh / SLDF / top-tier hardware
* **4** – well-built, well-maintained military-grade
* **3** – decent merc gear
* **2** – worn, quirks, unreliable under stress
* **1** – FrankenMech / junkyard rebuild / “this will probably explode”

Where to store:

```ts
interface VehicleActorSystemData {
  // existing fields...
  attributes: {
    // existing attributes...
    mwdVehicle?: MwdVehicleAttributes;
  };

  mwd?: MwdSystemData;
}
```

---

## 2. MWD System Block

The MWD block captures **heat, locations, crits, crew, and high-level status**.

### 2.1. Enumerations

```ts
type MwdUnitType = "mech" | "vehicle" | "vtol" | "naval" | "aero";

type MwdLocationKey =
  | "head"
  | "torsoFront"
  | "torsoRear"
  | "leftArm"
  | "rightArm"
  | "leftLeg"
  | "rightLeg"
  | "front"
  | "side"
  | "rear"
  | "turret"
  | "rotor"
  | "core";

type MwdLocationTag =
  | "crewCompartment"
  | "weaponGroup"
  | "motiveSystem"
  | "engine"
  | "ammoStore"
  | "sensor"
  | "cockpit"
  | "gyro"
  | "rotor"
  | "turret";

type MwdUnitStatus =
  | "operational"
  | "impaired"
  | "immobilized"
  | "shutdown"
  | "destroyed"
  | "abandoned";

type MwdCritType =
  | "weaponDisabled"
  | "motiveHit"
  | "engineHit"
  | "crewInjury"
  | "ammoExplosion"
  | "sensorDamage"
  | "turretLock"
  | "rotorHit"
  | "cockpitHit"
  | "gyroHit"
  | "generic";
```

### 2.2. Heat State

```ts
interface MwdHeatState {
  current: number;       // current heat tokens (0–4+)
  safeMax: number;       // usually 1
  hardMax: number;       // usually 4
  ventPerTurn: number;   // tokens removed at end of turn (default 1)
  coolingImpaired: boolean; // set by crits
}
```

### 2.3. Locations & Stress

```ts
interface MwdLocationState {
  enabled: boolean;            // false if this location not used on this unit
  stress: number;              // 0–3, soft escalation
  tags: MwdLocationTag[];      // what can break here
  destroyed: boolean;          // this location has catastrophically failed
  note?: string;               // GM / system notes
}

type MwdLocationMap = Record<MwdLocationKey, MwdLocationState>;
```

### 2.4. Critical Effects

```ts
interface MwdCritEffect {
  id: string;                 // unique id
  location: MwdLocationKey;
  type: MwdCritType;

  effects: {
    movementDelta?: number;
    attackDiceDelta?: number;
    defenseDiceDelta?: number;
    heatDeltaPerTurn?: number;
  };

  catastrophic: boolean;      // if true, may end/cripple unit
  label: string;              // human-readable description

  source?: {
    attackId?: string;
    timestamp?: number;
    causedBy?: string;        // weapon name / rule id / actor id
  };
}
```

### 2.5. Crew

```ts
interface MwdCrewState {
  count: number;           // total crew
  effectiveCount: number;  // currently able to operate
  injuryLevel: number;     // 0–3 abstraction
  bailedOut: boolean;      // true if crew abandoned vehicle
}
```

### 2.6. Status

```ts
interface MwdUnitStatusState {
  state: MwdUnitStatus;
  reasons: string[];       // e.g. ["structureZero", "ammoExplosion"]
  sinceRound?: number;
}
```

### 2.7. Configuration

```ts
interface MwdConfig {
  critTargetNumber: number;     // default 8+ on 2D6
  critOnSnakeEyes: boolean;     // crit check on natural 2 to-hit
  maxLocationStress: number;    // default 3

  heatBands: {
    safe: number;       // 1
    runningHot: number; // 2
    overheated: number; // 3
    shutdown: number;   // 4
  };
}
```

### 2.8. Top-Level MWD Data

```ts
interface MwdSystemData {
  unitType: MwdUnitType;     // mech / vehicle / vtol / etc.

  heat: MwdHeatState;
  locations: MwdLocationMap;
  crits: MwdCritEffect[];
  crew: MwdCrewState;
  status: MwdUnitStatusState;
  config: MwdConfig;
}
```

---

## 3. Example: ‘Mech Actor JSON Snippet

```json
{
  "system": {
    "attributes": {
      "mwdVehicle": {
        "handling": 4,
        "system": 3,
        "chassis": 4,
        "condition": 3
      }
    },
    "mwd": {
      "unitType": "mech",
      "heat": {
        "current": 2,
        "safeMax": 1,
        "hardMax": 4,
        "ventPerTurn": 1,
        "coolingImpaired": false
      },
      "locations": {
        "head": {
          "enabled": true,
          "stress": 1,
          "tags": ["cockpit", "sensor"],
          "destroyed": false,
          "note": "Cracked canopy; pilot rattled."
        },
        "torsoFront": {
          "enabled": true,
          "stress": 0,
          "tags": ["weaponGroup", "engine", "ammoStore"],
          "destroyed": false
        },
        "torsoRear": {
          "enabled": true,
          "stress": 0,
          "tags": ["engine"],
          "destroyed": false
        },
        "leftArm": {
          "enabled": true,
          "stress": 0,
          "tags": ["weaponGroup"],
          "destroyed": false
        },
        "rightArm": {
          "enabled": true,
          "stress": 0,
          "tags": ["weaponGroup"],
          "destroyed": false
        },
        "leftLeg": {
          "enabled": true,
          "stress": 0,
          "tags": ["motiveSystem"],
          "destroyed": false
        },
        "rightLeg": {
          "enabled": true,
          "stress": 1,
          "tags": ["motiveSystem"],
          "destroyed": false,
          "note": "Knee actuator hit (–2 max Movement)."
        },
        "front":  { "enabled": false, "stress": 0, "tags": [], "destroyed": false },
        "side":   { "enabled": false, "stress": 0, "tags": [], "destroyed": false },
        "rear":   { "enabled": false, "stress": 0, "tags": [], "destroyed": false },
        "turret": { "enabled": false, "stress": 0, "tags": [], "destroyed": false },
        "rotor":  { "enabled": false, "stress": 0, "tags": [], "destroyed": false },
        "core": {
          "enabled": true,
          "stress": 0,
          "tags": ["engine", "gyro"],
          "destroyed": false
        }
      },
      "crits": [
        {
          "id": "crit-001",
          "location": "rightLeg",
          "type": "motiveHit",
          "effects": {
            "movementDelta": -2
          },
          "catastrophic": false,
          "label": "Right leg motive hit (–2 max Movement)",
          "source": {
            "attackId": "atk-2025-11-30-001",
            "timestamp": 1764470400000,
            "causedBy": "PPC"
          }
        }
      ],
      "crew": {
        "count": 1,
        "effectiveCount": 1,
        "injuryLevel": 1,
        "bailedOut": false
      },
      "status": {
        "state": "impaired",
        "reasons": ["locationStress", "critActive"],
        "sinceRound": 3
      },
      "config": {
        "critTargetNumber": 8,
        "critOnSnakeEyes": true,
        "maxLocationStress": 3,
        "heatBands": {
          "safe": 1,
          "runningHot": 2,
          "overheated": 3,
          "shutdown": 4
        }
      }
    }
  }
}
```

---

## 4. Developer Task List

Implementation order is important. Below is a suggested sequence.

### 4.1. Data Model & Migration

* [ ] **Add MWD attribute block** to vehicle/’Mech actors
  * `system.attributes.mwdVehicle.handling/system/chassis/condition`
* [ ] **Add `system.mwd` block** to actors
  * Default sensible values for `unitType`, `heat`, `locations`, `config`
* [ ] **Write a migration script**
  * For existing vehicle actors:
    * Initialize `mwdVehicle` attributes with defaults based on chassis type
    * Enable only relevant locations (e.g., front/side/rear/turret for tanks; head/torso/arms/legs/core for ’Mechs)
    * Set default `heat.safeMax/hardMax/ventPerTurn`
    * Set `config` to default crit TNs and heat bands

### 4.2. Actor Sheet UI

* [ ] **Expose new attributes** on vehicle/’Mech sheets
  * Handling, System, Chassis, Condition
  * Editable by GMs; optionally by players for custom Mechs
* [ ] **Add MWD panel** for:
  * Heat track (display current, safe, overheated, shutdown band)
  * Location list with stress and destroyed flag
  * List of active crits (labels)
  * Crew info (count, injuryLevel, bailedOut)
  * Status state (operational/impaired/shutdown/etc.)

### 4.3. Hit Location & Damage Flow

* [ ] **Extend combat resolution** to:
  * Roll a hit location per damage packet for MWD-enabled actors
  * Store the rolled `locationKey` for that attack
* [ ] **Hook into damage application (`sufferDamage`)**:
  * After Structure change, if damage > 0:
    * Call MWD crit workflow with `locationKey` and updated Structure
* [ ] **Update destruction logic**:
  * If Structure reaches 0 → mark `status.state = "destroyed"`
  * If catastrophic crit → also set destroyed/immobilized as appropriate

### 4.4. Critical Hit Workflow

* [ ] Implement a **`resolveMwdCrit` helper** that:
  * Accepts `actor`, `locationKey`, context (attack, roll, etc.)
  * Rolls crit check (2D6 vs `config.critTargetNumber`)
  * Applies modifiers from **Condition** (better Condition can:
    * raise TN, or
    * allow rerolls, or
    * downgrade catastrophic results)
  * On success:
    * Increment `locations[locationKey].stress` (to a max of `maxLocationStress`)
    * Create `MwdCritEffect` and push into `mwd.crits`
    * If stress == max → mark `destroyed = true` and possibly update `status.state` to “immobilized”/“destroyed”
* [ ] Tie **Handling / Chassis / System** into crit resolution where appropriate:
  * Motive hits → Handling + Chassis checks to avoid immobilization
  * Engine / sensor / turret hits → System checks to mitigate effects
  * Crash / knockdown logic → Handling + Chassis

### 4.5. Heat Handling

* [ ] Add **heat gain** to attack resolution:
  * Each weapon has heat cost → increment `mwd.heat.current`
* [ ] Add **end-of-turn heat resolution**:
  * Subtract `ventPerTurn`
  * Compare to heat bands
* [ ] When entering higher heat bands:
  * At `runningHot`: apply global minor penalty (e.g., –1 die on ranged)
  * At `overheated`: require **Condition-based check**
    * Fail → either shutdown next turn or resolve crit
  * At `shutdown`: force shutdown + critical check
* [ ] Implement **startup check** using **System + Condition**:
  * On reboot, roll vs TN (e.g., 2)
  * Fail → remain shutdown, maybe increase stress or apply minor crit

### 4.6. Crew & Catastrophic Damage

* [ ] On crew-compartment crit:
  * Increment `crew.injuryLevel`
  * If > threshold → reduce `crew.effectiveCount` or force bailout
* [ ] On catastrophic events (ammo explosion, rotor destroyed, etc.):
  * Set `status.state` to “destroyed”
  * Set `crew.bailedOut` depending on roll (Handling + Condition check or custom rule)

### 4.7. Status Recalculation Helper

* [ ] Implement a **`recalculateMwdStatus(actor)` function** that:
  * Looks at Structure, heat, location `destroyed` flags, crits, and crew
  * Sets `status.state` and `status.reasons`
  * Is called after:
    * damage resolution
    * crit resolution
    * heat step
    * crew/bailout changes

### 4.8. Testing & Tools

* [ ] Write **unit tests** for:
  * Hit location mapping per unit type
  * Crit trigger conditions (Structure loss, snake-eyes, heat)
  * Heat band transitions
  * Condition/Chassis/Handling/System modifiers
* [ ] Add **debug logging** (behind a module setting) for:
  * Hit location rolls
  * Crit rolls and results
  * Heat transitions
  * Status changes
