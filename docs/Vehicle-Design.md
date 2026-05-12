# MWD Vehicle Combat Design Doctrine (Developer Planning Draft)

## Purpose

This document defines the intended gameplay identity, architectural role, and implementation direction for vehicles in the MWD / Few C-Bills system.

This is not a finalized rules specification.
This document exists to:

* align developer assumptions
* establish non-negotiable doctrine
* prevent “vehicles as worse mechs”
* guide future implementation planning

Vehicle implementation must follow the existing system architecture:

* UI emits intent
* resolvers normalize intent into RollContext
* execution is centralized
* HarmEngine remains the only writer for damage state

This document assumes and extends the existing combat pipeline and machine damage workflow.   

---

# 1. Vehicle Design Philosophy

## BLUF

> Vehicles are reliable, tactically valuable combined-arms support platforms that excel through positioning, coordination, terrain use, and battlefield leverage rather than raw survivability.

Vehicles are NOT:

* inferior BattleMechs
* disposable rolling coffins
* simplified mech reskins
* attritional frontline duelists

Vehicles ARE:

* force multipliers
* battlefield shapers
* ambush platforms
* support elements
* reconnaissance and EW assets
* fire support systems
* tactical leverage tools

BattleMechs dominate:

* breakthrough warfare
* aggressive maneuver
* sustained frontline combat
* thermal overdrive gameplay

Vehicles dominate:

* prepared positions
* support fire
* ambushes
* force projection
* battlefield control
* combined-arms synergy

---

# 2. Battlefield Ecology

The system is explicitly intended to support combined-arms warfare.

BattleMechs should be strongest individually.

However:

> unsupported mechs should become vulnerable to intelligent combined-arms tactics.

Examples:

* Savannah Master swarms exploiting rear arcs
* Hetzer ambushes from concealed urban positions
* VTOL spotting for indirect fire
* hovercraft flanking isolated targets
* infantry/NARC enabling missile saturation
* artillery punishing static formations
* EW vehicles degrading targeting networks

Vehicles should contribute through:

* tactical leverage
* battlefield shaping
* forcing bad positioning
* exploiting openings
* supporting mech operations

NOT through raw durability parity with BattleMechs.

---

# 3. Survivability Philosophy

## Core Rule

```text id="elw8k5"
Mission kill is common.
Crew kill is uncommon.
```

Vehicles should generally fail through:

* immobilization
* suppression
* turret disablement
* sensor degradation
* strain overload
* forced withdrawal
* abandonment

NOT:

* instant catastrophic destruction
* automatic crew death
* unavoidable reactor-style explosions

---

## Vehicle Outcome Hierarchy

Preferred failure order:

```text id="elb7m7"
Suppressed
→ Damaged
→ Mobility Kill
→ Mission Kill
→ Abandoned
→ Destroyed
→ Crew Fatality
```

Crew death should usually require:

* catastrophic body destruction
* ammo detonation
* severe fire
* VTOL crash
* secondary catastrophic escalation

---

# 4. Vehicle Reliability Philosophy

Vehicles should feel:

* dependable
* stable
* maintainable
* operationally resilient

Compared to BattleMechs, vehicles should:

* accumulate degradation pressure more slowly
* remediate problems more easily
* experience fewer cascading failures
* recover operationally more quickly

Reliability remains a core machine attribute.

However vehicle degradation pacing should be tuned separately from BattleMechs.

---

# 5. Vehicle Thermal Philosophy

## Core Decision

BattleMechs use:

```text id="el7oyw"
Heat
```

Vehicles use:

```text id="elz5gd"
Strain
```

Vehicles do NOT participate in full BattleMech thermal gameplay.

---

## Vehicle Strain Represents

* engine stress
* suspension load
* recoil burden
* powertrain overload
* electronics strain
* cooling burden
* VTOL lift stress

---

## Strain Design Goals

Vehicle strain should:

* be simpler than mech heat
* generate less bookkeeping
* reinforce “reliable military hardware”
* punish reckless operation
* support aggressive maneuvers sparingly

Vehicle strain should NOT:

* dominate gameplay loops
* create constant shutdown risk
* mimic reactor-management gameplay

---

## Recommended Strain States

```text id="el9qaz"
Normal
→ Strained
→ Overstressed
→ Critical
```

Likely consequences:

* mobility penalties
* handling penalties
* temporary system faults
* shutdown/stall risk

NOT frequent catastrophic explosions.

---

# 6. Vehicle Tactical Identity

Vehicles survive through:

* concealment
* terrain
* speed
* positioning
* support doctrine
* hull-down positions
* engagement discipline

NOT armor attrition.

---

## Vehicles Should Strongly Benefit From

* hull-down
* entrenched positions
* stabilization
* firing lanes
* prepared ambushes
* road mobility
* coordinated spotting
* supporting formations

Status and CQ systems should reinforce this identity.

---

# 7. CQ Philosophy

Vehicles use the same CQ architecture as the broader combat engine.

However vehicles should derive CQ from:

* positioning
* stabilization
* support
* hull-down
* firing discipline
* formation support

rather than aggressive maneuver dominance.

---

## BattleMech CQ Identity

* aggressive maneuver
* active dueling
* mobile offense
* overdrive pressure

---

## Vehicle CQ Identity

* positional warfare
* support fire
* stabilized firing
* area denial
* crossfire
* coordinated engagement

---

# 8. Vehicle Categories

Vehicles are not one homogeneous class.

The implementation must support multiple subfamilies.

Recommended baseline categories:

| Category        | Notes                        |
| --------------- | ---------------------------- |
| Ground Vehicle  | tanks, APCs, IFVs            |
| Hovercraft      | extreme mobility, fragile    |
| VTOL            | altitude and crash mechanics |
| Drone           | remote/networked operations  |
| Artillery       | indirect fire specialization |
| Support Vehicle | EW, logistics, command       |

Each category may:

* use different movement logic
* use different strain triggers
* use different crit outcomes
* expose different CQ modifiers

---

# 9. Facing Philosophy

Vehicles are more positional than BattleMechs.

Descriptive impact labels should remain meaningful:

* Front
* Side
* Rear
* Turret
* Rotor

Rules still normalize into grouped rules locations:

* body
* turret
* mobility

per the existing machine damage architecture. 

---

## Design Goal

Facing should:

* matter tactically
* influence positioning decisions
* reward flanking
* reinforce ambush gameplay

WITHOUT:

* creating excessive bookkeeping
* requiring hex-level simulation fidelity

---

# 10. Vehicle Location Philosophy

Vehicle rules locations remain:

```text id="el4on8"
body
turret
mobility
```

These are capability buckets, not literal armor facings.

---

## Intended Consequence Mapping

| Location | Gameplay Role                |
| -------- | ---------------------------- |
| Body     | core systems / crew / engine |
| Turret   | firepower                    |
| Mobility | movement and positioning     |

This aligns with the existing degradation model.

---

# 11. Vehicle Weapon Philosophy

Vehicle weapons should feel:

* mounted
* stabilized
* role-specific
* positional

NOT:

* mech-style alpha strike ecosystems

---

## Vehicles Should Emphasize

* turret weapons
* hull mounts
* firing arcs
* support batteries
* long-range support
* ambush firepower

---

## Vehicles Should De-Emphasize

* omnidirectional firing
* massive alpha strikes
* thermal overclocking
* weapon-group orchestration complexity

---

# 12. Crew Philosophy

Crew survival matters.

Vehicle crews are gameplay entities, not decorative flavor.

---

## Recommended Crew Model

Use:

```text id="elpm0q"
role-based crew abstraction
```

NOT:

```text id="el3gmb"
full actor-per-seat simulation
```

Suggested roles:

* Driver
* Gunner
* Commander
* Passengers
* Support Crew

---

## Crew Gameplay Importance

Crew damage should affect:

* movement
* targeting
* command capability
* recovery actions
* morale/bailout

without turning vehicles into hard simulation.

---

# 13. Recovery & Salvage Philosophy

Vehicles should be:

* salvageable
* repairable
* operationally recoverable

This is essential to preventing:

```text id="el1rvf"
vehicle = disposable asset
```

---

## Operational Tone

A mobility-killed vehicle should often become:

* recoverable after battle
* towable
* field repairable
* abandoned temporarily

rather than automatically destroyed.

---

# 14. EW & Support Specialization

Vehicles are expected to play major roles in:

* electronic warfare
* sensor warfare
* targeting support
* battlefield networking

The existing targetingData and detection-state architecture already supports this.

Vehicle support platforms should become:

* high-value force multipliers
* battlefield coordinators
* information warfare assets

---

# 15. Vehicle Weaknesses

Vehicles should be vulnerable to:

* exposure
* isolation
* flanking
* close assault
* concentrated mech aggression
* poor positioning

This vulnerability should emerge from:

* tactical ecology
* battlefield context
* positional mistakes

NOT arbitrary fragility.

---

# 16. UI & UX Goals

Vehicle UI should feel:

* cleaner
* more stable
* less overloaded than mech sheets

Vehicles should generally require:

* less thermal bookkeeping
* fewer cascading systems
* simpler maintenance overhead

BattleMechs remain the mechanically denser platform.

---

# 17. Architectural Requirements

Vehicle implementation must preserve core system doctrine:

```text id="elq26m"
UI emits intent
→ resolver builds RollContext
→ execution resolves
→ HarmEngine applies
```

No vehicle-specific bypass pipelines are permitted.

Vehicle systems must:

* reuse providers
* reuse CQ architecture
* reuse resolver flow
* reuse mutation workflows
* reuse chat interaction model

Vehicle-specific logic should enter through:

* resolvers
* providers
* data
* crit tables
* strain systems
* movement rules

NOT bespoke execution pipelines.

---

# 18. Explicit Non-Goals

Vehicle implementation is NOT intended to:

* simulate full BattleTech tabletop fidelity
* reproduce CBT armor bookkeeping
* turn vehicles into disposable deathtraps
* replace BattleMechs as primary heroic platforms
* create simulation-heavy crew management

---

# 19. Final Design Summary

## BattleMechs

Feel like:

```text id="elwghn"
overclocked battlefield titans
```

* durable
* thermally unstable
* progressively degrading
* tactically dominant
* individually terrifying

---

## Vehicles

Feel like:

```text id="elp4a7"
professional battlefield systems
```

* reliable
* tactically valuable
* support-oriented
* terrain-sensitive
* operationally recoverable
* dangerous through leverage rather than brute force

---

# 20. Implementation Priority Recommendations

## Phase 1

* vehicle actor/sheet modernization
* strain monitor
* movement profiles
* location consequence UI
* basic crit integration
* crew abstraction

## Phase 2

* facing-aware CQ modifiers
* hull-down systems
* stabilization logic
* vehicle-specific statuses
* recovery/bailout flow

## Phase 3

* advanced EW vehicles
* indirect fire integration
* support doctrine mechanics
* convoy/network mechanics
* advanced recovery/salvage systems
