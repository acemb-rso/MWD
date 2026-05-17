# Critical Hit System

> **Summary:** Armor delays damage, conditions define degradation, crits create fixable problems, and pilot injury only happens when the cockpit or core is threatened.

---

## Core Damage Model

**Armor (Global Pool)** — Absorbs incoming damage first; prevents condition degradation. While Armor > 0, only critical hits can affect systems.

**Structure (Global Pool)** — Takes damage after armor is depleted; represents actual integrity loss. Does NOT automatically degrade conditions.

---

## Hit Locations

**BattleMech:** Head · Torso · Arms · Legs

BattleMech crit and degradation locations are grouped into these four buckets only. Older split labels such as Rear Torso, Front Torso, Core, Left Arm, Right Arm, Left Leg, and Right Leg are not separate crit locations — treat them as subsystem language inside the grouped bucket, not additional hit locations.

**Vehicle:** Body · Turret · Mobility

---

## Condition Tracks

Each location has: **Intact → Impaired → Damaged → Crippled → Disabled**

| Stage | Meaning |
|-------|---------|
| Intact | No effect |
| Impaired | Minor friction |
| Damaged | Meaningful penalty |
| Crippled | Penalties + restrictions |
| Disabled | Function lost |

Conditions own **all** persistent penalties (dice penalties, CQ penalties, capability restrictions) and define system degradation. They do **not** come from crit spam — condition advancement is controlled.

| Location | Degradation Affects |
|----------|-------------------|
| Arms | Weapons |
| Legs | Movement |
| Torso | Core systems |
| Head | Sensors / pilot |

---

## Critical Hits

Crits create **persistent problems** that must be actively resolved. They do NOT expire automatically.

**Allowed crit effect types:**
- Temporary modifier (until fixed)
- Forced check
- Resource spike (heat, etc.)
- Capability lock (cannot fire / move / etc.)

Crits do **not** apply permanent penalties directly, duplicate condition effects, or destroy systems outright (except via escalation).

---

## General Critical Hit Table (2d6)

Roll this table first to determine *what kind of problem* occurred. This table also functions as a standalone quick-play fallback when location tables are not in use.

| 2d6 | General Result | Result |Status Name| Remedy |
|-----|---------------|--------|--------|-------|
| 2 | Catastrophic Cascade | **Full System Cascade:** severe failure cascades through the location; apply location cascade effect and roll one additional crit (treat further 2s as 12) | — | — |
| 3 | Hard Lock | **Guidance System Lock:** the controls are locking up, mobility functions seizes and is unusable until brought under control | Skidding | Pilot Recovery |
| 4 | Power Surge | **Energy Spike:** electrical and plasma surge; immediate 2 heat | Overheating | Coolant Dump |
| 5 | Feed / Flow Disruption | **Weapon Supply Interruption:** one resource feed — ammo, coolant, or power routing — is cut; dependent systems go offline | Weapon Failure | Reload / Feed Reset |
| 6 | Control Fault | **Response Lag:** input or signal faults the neuro control loops generating feedback | Staggered | System Reset |
| 7 | System Desync | **Sync Failure:** fire control, timing, or sensor alignment lost; -5 penalty to AR and DR | — | Reboot |
| 8 | Structural Shock | **Impact Jolt:** violent physical shock to the location; must pass a stability or piloting test or suffer secondary consequences | Unstable | Pilot Recovery |
| 9 | Overload | **Operational Overload:** system remains functional but under strain | Reactor Instability | Coolant Dump |
| 10 | Degradation Spike | **Performance Crash:** sharp capability loss | Stalled | Emergency Repair |
| 11 | Partial Outage | **Function Dropout:** one Asset Module or Upgrade goes entirely offline | — | Reboot |
| 12 | Critical Breach | **Structural Compromise:** Voltile equipment explosion, location condition advances +2 | — | — |

**Notes:**
- **12** is the only result that directly advances condition.
- **2** is the wild spike — the only result that generates an additional roll.
- Everything else is a problem to manage, not a second penalty track.

### Universal Result Rules

**2 — Catastrophic Cascade:** Apply the location-specific cascade effect, then roll one additional crit on this table. Ignore further 2s; treat additional 2s as 12.

**12 — Critical Breach:** Advance the hit location's condition by 1 step. If already Crippled, it becomes Disabled. If already Disabled, convert to the location's catastrophic fallback instead.

---

## Crit Resolution Flow

1. Determine hit location
2. Roll 2d6 on the General Crit Table
3. Apply the location-specific version of that result
4. If the result says so, apply pilot damage
5. The crit remains until cleared by its remedy

---

## Implementation Contract

The live attack pipeline uses a queued mutation model:

1. Sheets and quick actions emit `intent: "attack"`.
2. `resolveAttackExecution` resolves the attack and attaches one queued mutation to each non-miss machine target.
3. Chat renders the resolved result and previews pending consequences.
4. `HarmEngine.applyMachineAttackDamage` is the only writer for armor, structure, stress, shock/pressure, Reliability, degradation, crit records, and status sync.

Machine hit consequences are represented by one canonical queued mutation:

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

`hitLocation` stores both descriptive impact text and rules location data:

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

`impactLabel` preserves flavor such as `Rear Torso`, `Front`, or `Side`. `rulesLocation` is the grouped rules bucket used by degradation and critical tables: `head`, `torso`, `arms`, or `legs` for BattleMechs, and `body`, `turret`, or `mobility` for vehicles.

`critical` is state, not just result data:

```js
{
  eligible: boolean,
  mode: "none" | "automatic" | "chaosOptional" | "chaosSelected",
  source: "hitLocation" | "criticalBreach" | "manual" | null,
  selected: boolean,
  reason: string
}
```

`chaosOptional` means the chat card shows the Chaos conversion control. `chaosSelected` and `automatic` require prepared critical records. `none` must not carry prepared critical records.

Prepared critical records are drawn during preview only when required, pinned to the current preview revision, and reused on apply:

```js
{
  id,
  previewRevision,
  table,
  rollTotal,
  rulesLocation,
  resultKey,
  label,
  remedy,
  effects
}
```

Apply refuses stale prepared records if any `record.previewRevision !== mutation.previewRevision`.

Reliability is also a pending preview choice:

```js
{
  canSpend: boolean,
  selected: boolean,
  cost: 1,
  prevents: ["conditionAdvance"],
  pressureDeltaPreview,
  stressDeltaPreview
}
```

Preview shows the effect of the choice, but does not mutate actor state. Chaos toggle, Reliability toggle, or damage recalculation creates a new preview state by incrementing `previewRevision`, clearing derived preview fields, recalculating `damagePreview`, `critical`, and `reliabilityOptions`, and rebuilding `preparedCriticalRecords` when required.

`applyMachineAttackDamage` is idempotent. If the queued mutation is already applied, the apply path returns the already-applied result or refuses without applying additional damage, stress, degradation, Reliability spend, or critical records.

---

## BattleMech Location Crit Tables

### Head

Head crits are the main pilot-danger location.

| 2d6 | General Result | Head Result | Remedy | Pilot Damage |
|-----|---------------|-------------|--------|-------------|
| 2 | Catastrophic Cascade | **Cockpit Shock:** immediate sensor blackout (Status= Sensors Degraded); roll another crit | — | 3 Physical |
| 3 | Hard Lock | **Targeting Processor Lock:** All Fire modes require 1 extra SA to attack | Reboot | 2 Physical |
| 4 | Power Surge | **Neural Feedback:** pilot interface spikes (Status= Staggered) | System Reset | 1 Fatigue |
| 5 | Feed / Flow Disruption | **Optics Coolant Fogging:** no attacks beyond Close | Coolant Dump | — |
| 6 | Control Fault | **Command Input Delay:** Random input delays degrade control (Status= Stalled) | Reboot | 2 Fatigue |
| 7 | System Desync | **Fire-Control Desync:** no CQ bonuses to attacks | System Reset | — |
| 8 | Structural Shock | **Cockpit Impact:** must make control/piloting test or lose footing / aim (Status= Unstable) | Pilot Recovery | 2 Physical |
| 9 | Overload | **Sensor Overload:** Sensors contacts are capped at 'Track' | System Reset | 2 Fatigue |
| 10 | Degradation Spike | **Optics Fracture:** All targets are considered 'Obscured' until fixed | Emergency Repair | — |
| 11 | Partial Outage | **Comms / Sensor Suite Out:** no sensor or ECM actions | System Reset | — |
| 12 | Critical Breach | Head condition +1 | — | 2 Physical |

**Catastrophic fallback (Head already Disabled):** Pilot Incapacitation Check or immediate severe cockpit failure at GM discretion.

---

### Torso

Torso is core systems, reactor, gyro, and internal structure.

| 2d6 | General Result | Torso Result |Status Name| Remedy | Pilot Damage |
|-----|---------------|--------------|-|--------|-------------|
| 2 | Catastrophic Cascade | **Reactor / Gyro Cascade:** immediate extra crit and stability test | —| — | 3 Fatigue |
| 3 | Hard Lock | **Gyro Lock:** cannot sprint / jump; piloting tests worsened |— | Emergency Repair | — |
| 4 | Power Surge | **Reactor Unstable:** +1 heat when firing energy weapons | Reactor Instability | Coolant Dump | 2 Fatigue |
| 5 | Feed / Flow Disruption | **Power Routing Fault:** one chosen weapon group offline | Weapon Failure | Emergency Repair | — |
| 6 | Control Fault | **Core Response Delay:** Core moderating controls are not responsive | Staggered | Reboot | 2 Fatigue |
| 7 | System Desync | **Targeting/Movement Sync Fault:** no combined movement-fire advantages |—| System Reset | — |
| 8 | Structural Shock | **Internal Shock:** Balance processors are overwhelmed | Unstable | Pilot Recovery | 1 Physical |
| 9 | Overload | **Heat Sink Saturation:** Heat Sinks are Overloaded| Overheating | Coolant Dump | — |
| 10 | Degradation Spike | **Gyro Drift:** cannot take high-mobility maneuvers until fixed |—| Emergency Repair | — |
| 11 | Partial Outage | **Power Bus Outage:** one major subsystem unavailable |—| Emergency Repair | — |
| 12 | Critical Breach | Torso condition +1 |—| — | — |

**Catastrophic fallback (Torso already Disabled):** Catastrophic Core Failure — immediate major shutdown, immobilization, or destruction event depending on tone.

---

### Arms

Arms hurt capability, not the pilot.

| 2d6 | General Result | Arms Result |Status Name| Remedy | Pilot Damage |
|-----|---------------|-------------|-|--------|-------------|
| 2 | Catastrophic Cascade | **Weapon Mount Cascade:** affected arm loses all mounted weapons until repaired; plus extra crit |—| Emergency Repair | — |
| 3 | Hard Lock | **Actuator Lock:** arm-mounted weapons unusable |Weapon Failure| Emergency Repair | — |
| 4 | Power Surge | **Weapon Feedback:** next attack from this arm generates +1 heat or is blocked |—| Emergency Repair | — |
| 5 | Feed / Flow Disruption | **Ammo Feed Fault:** one ballistic weapon group jams |Jammed Ballistic| Reload / Feed Reset | — |
| 6 | Control Fault | **Fine Actuation Error:** cannot Aim or use precision fire |—| Emergency Repair | — |
| 7 | System Desync | **Targeting Misalignment:** arm ranged attacks have an additional 2 tracking penalty  |—| System Reset | — |
| 8 | Structural Shock | **Recoil Shock:** Attack from arm weapon groups add +1 Global Shock |—| Piloting Recovery | — |
| 9 | Overload | **Servo Strain:** Attacks from arm weapon groups add +1 Location Stress to the arms|—| Emergency Repair | — |
| 10 | Degradation Spike | **Stabilizer Damage:** Attacks from arm weapon groups suffer -5 AR penalty|—| Emergency Repair | — |
| 11 | Partial Outage | **Local Power Loss:** one arm subsystem offline |—| System Reset | — |
| 12 | Critical Breach | Arms condition +1 |—| — | — |

**Catastrophic fallback (Arms already Disabled):** Destroy one arm-mounted weapon or render it unusable until full repair.

---

### Legs

Legs threaten mobility and falls, but not direct pilot damage unless impact follows.

| 2d6 | General Result | Legs Result |Status| Remedy | Pilot Damage |
|-----|---------------|-------------|-|--------|-------------|
| 2 | Catastrophic Cascade | **Mobility Cascade:** immediate fall/stability check; plus extra crit | Prone | Emergency Repair | 1 Physical, 1 Fatigue|
| 3 | Hard Lock | **Leg Actuator Lock:** cannot sprint |Limping| Emergency Repair | — |
| 4 | Power Surge | **Myomer Surge:** movement actions causes +1 heat || Coolant Dump  | — |
| 5 | Feed / Flow Disruption | **Jump Jet / Mobility Feed Fault:** jump jets, MASC, or other motive boost disabled || System Reset | — |
| 6 | Control Fault | **Gait Fault:**  Gait coordinators errors |Unstable| Reboot | — |
| 7 | System Desync | **Balance Timing Fault:** Movement does not add DN to attacks targeting the mech || System Reset | — |
| 8 | Structural Shock | **Forced Stability Test** or fall || Emergency Repair | Only from resulting fall/impact |
| 9 | Overload | **Mobility Overstress:** +1 DN for any Handling based Roll || Emergency Repair | — |
| 10 | Degradation Spike | **Leg Stabilizer Damage:** no charge, push, pull, or melee actions || Emergency Repair | — |
| 11 | Partial Outage | **Joint Motivator Failure:** -30 m movement || System Reset | — |
| 12 | Critical Breach | Legs condition +1 || — | — |

**Catastrophic fallback (Legs already Disabled):** Mech collapses hard or becomes completely immobile beyond field recovery.

---

## Vehicle Location Crit Tables

### Body

| 2d6 | Body Result | Remedy | Crew Damage |
|-----|-------------|--------|------------|
| 2 | Internal Systems Cascade | — | Only if open-topped or catastrophic |
| 3 | Core Systems Lock | System Reset | — |
| 4 | Engine / Power Surge | Coolant Dump | 2 Fatigue to operator (if applicable) |
| 5 | Fuel / Feed Disruption | Emergency Repair | — |
| 6 | Control Fault | System Reset | — |
| 7 | Systems Desync | System Reset | — |
| 8 | Structural Shock | Emergency Repair | 2 Physical only on crash/impact |
| 9 | Overload | Coolant Dump | — |
| 10 | Hull Stress Spike | Emergency Repair | — |
| 11 | Partial Outage | Emergency Repair or System Reset | — |
| 12 | Body condition +1 | — | — |

### Turret

| 2d6 | Turret Result | Remedy |
|-----|--------------|--------|
| 2 | **Turret Weapon Cascade** + extra crit | Emergency Repair |
| 3 | **Traverse Lock:** turret cannot rotate | Emergency Repair |
| 4 | **Fire-Control Surge:** attacks cause extra heat/strain or misfire risk | System Reset |
| 5 | **Ammo / Feed Fault:** turret weapon jammed | Reload / Feed Reset |
| 6 | **Control Fault:** turret attacks cost extra effort / lose an action option | System Reset |
| 7 | **Tracking Desync:** no CQ bonuses from turret attacks | System Reset |
| 8 | **Mount Shock:** next turret attack impossible | Emergency Repair |
| 9 | **Overload:** turret attacks impose extra stress | Emergency Repair |
| 10 | **Stabilizer Damage:** inaccurate or limited arc fire | Emergency Repair |
| 11 | Turret Subsystem Outage | Emergency Repair |
| 12 | Turret condition +1 | — |

### Mobility

| 2d6 | Mobility Result | Remedy |
|-----|----------------|--------|
| 2 | **Mobility Cascade:** skid, stall, or crash risk; plus extra crit | Emergency Repair |
| 3 | **Drive/Track/Wheel Lock:** cannot accelerate or maneuver properly | Emergency Repair |
| 4 | **Powertrain Surge:** moving causes extra strain/heat | Coolant Dump or Emergency Repair |
| 5 | **Transmission / Rotor Feed Fault** | Emergency Repair |
| 6 | **Steering Fault:** reduced control; lose maneuver option | Emergency Repair |
| 7 | **Handling Desync:** no mobility-based CQ benefits | System Reset |
| 8 | **Chassis Shock:** control test or skid/crash | Emergency Repair |
| 9 | **Overload:** extra cost to move repeatedly | Emergency Repair |
| 10 | **Suspension / Lift Damage:** major handling impairment | Emergency Repair |
| 11 | **Partial Mobility Outage:** reduced speed / no boost mode | Emergency Repair |
| 12 | Mobility condition +1 | — |

---

## Remediation

Crits persist until the player spends actions to fix them, creating real decisions, action economy pressure, and tactical tradeoffs.

| Remedy | Typical Cost | Used For |
|--------|-------------|----------|
| Emergency Repair | 2 SA / Complex | Mechanical faults, jams, locks, damaged mounts |
| System Reset | 1–2 SA | Sensors, fire control, command/input faults |
| Coolant Dump | 1 SA | Reactor unstable, heat sink overload, thermal issues |
| Reload / Feed Reset | 1 SA | Ammo/feed disruptions |

---

## Pilot Damage

Pilot damage uses existing Physical / Fatigue tracks only. Apply to **one track only** — never split damage.

| Source | Track |
|--------|-------|
| Head crits | Physical |
| Reactor / heat / feedback | Fatigue |
| Falls / impact | Physical |

| Severity | Amount |
|----------|--------|
| Standard | 2 damage |
| Escalated (location ≥ Crippled or catastrophic event) | 3 damage |

**Hard constraint:** A single crit cannot deal more than 3 pilot damage.

**Pilot damage triggers:**
- **Always:** Head crits
- **Sometimes:** Torso power/heat events; catastrophic results; falls / violent impacts
- **Never:** Arms damage; legs damage (unless a fall occurs)

---

## Escalation Rules

If a location is **Crippled or worse**, crit effects escalate:

- Temporary → Persistent
- Impairment → Disabled
- Mild → Catastrophic

---

## System Boundaries

| System | Role |
|--------|------|
| Conditions | Persistent degradation; define long-term capability loss |
| Crits | Create problems; require actions to fix |
| Pilot Damage | Rare; location/logically triggered; uses existing tracks |

**No overlap:** no double penalties, no conflicting mechanics.

---

## Implementation Rule of Thumb

Each crit entry should produce at most **one** of:

- One gating effect, **or**
- One strong operational penalty, **or**
- One condition advance

Not multiple stacked penalties.

**Implemented baseline:**

1. Roll General Table
2. Apply location interpretation
3. Track the result as a named crit condition
4. Clear it only with its listed remedy
5. Only 12 advances condition directly
6. Only Head / Torso / catastrophic fall can hurt the pilot
