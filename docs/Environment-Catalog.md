# Environment Catalog

**Status:** proposed design catalog (2026-10-21) plus an implementation plan
for the first 12 presets. Values are proposed MWD values, **not** numerical
conversions of Maximum Tech (BattleTech uses movement points, to-hit and
Piloting target-number modifiers with different statistics), and all remain
playtest-tuned data.

**Design baseline:** the task establishes DN. Terrain and weather modify dice
pools, movement, resources, or consequences (see the design rule in
[MaxTech-Review.md](MaxTech-Review.md)). **−1 die is the ordinary environmental
unit; −2 dice is substantial interference.** More extreme conditions introduce
restrictions, risks, and hazards rather than larger dice penalties.

Related: [Terrain-Regions.md](Terrain-Regions.md) (implementation of terrain
Regions), [MaxTech-Review.md](MaxTech-Review.md) (effect classes, priorities).

---

## 1. Base terrain

| Terrain | Combat / targeting | Movement / Handling | Other effects |
| --- | --- | --- | --- |
| Clear / open | None | None | Baseline |
| Paved road | None | +1 Handling die for high-speed maneuvers | Wheeled vehicles benefit most |
| Rough ground | None | −1 Handling die during risky movement | Difficult traversal for wheeled vehicles |
| Rubble | Potential light cover | −1 Handling die; reduced movement | Risk of becoming immobilized for vulnerable mobility types |
| Light woods | −1 tracking die through vegetation | Reduced movement for large machines | Concealment, limited cover |
| Heavy woods | −2 tracking dice through vegetation | −1 Handling die; reduced movement | Strong concealment; substantial cover |
| Ultra-heavy woods | LOS may be blocked | Severe movement restriction | Large machines may be unable to enter |
| Light jungle | −1 tracking die | −1 Handling die; reduced movement | Infantry concealment |
| Heavy jungle | −2 tracking dice | −1 Handling die; substantial movement restriction | Dense concealment and cover |
| Ultra-heavy jungle | LOS blocked through dense sections | Restricted or impassable for large units | Infantry may retain access |
| Sand | None | −1 Handling die for wheeled/tracked vehicles during risky movement | Bogging risk |
| Tundra | None | −1 Handling die | Bogging risk |
| Swamp / marsh | None | −1 Handling die; reduced movement | Bogging and water exposure |
| Shallow water | None | Reduced movement for susceptible units | Potential cooling benefit |
| Deep water | Underwater weapon restrictions | Requires suitable mobility/equipment | Submersion and heat interactions |
| Urban terrain | Cover depends on structures | Restricted movement for large vehicles | Ambush opportunities and firing lanes |
| Light building / structure | Cover if interposed | Entry restrictions by unit size | Structure can be damaged |
| Fortified / hardened structure | Heavy cover or blocked LOS | Restricted access | Structural protection |

Woods do not penalize every attack made by a unit standing in them: the
question is whether the attack's sightline passes through vegetation (line of
effect).

## 2. Terrain conditions

Layered onto base terrain (an icy road, a muddy forest, snow-covered ruins).

| Condition | Combat | Movement / Handling | Consequence |
| --- | --- | --- | --- |
| Mud | None | −1 Handling die; reduced movement | Bogging risk |
| Deep mud | None | −2 Handling dice during risky movement | Significant bogging risk |
| Ice | None | −1 Handling die for risky movement | Failed control check may cause Skidding or Prone |
| Black ice | None | −2 Handling dice for risky movement | Increased skid risk; potentially concealed |
| Deep snow | None | −1 Handling die; reduced movement | Bogging risk; cooling opportunity |
| Loose gravel | None | −1 Handling die during sharp maneuvers | Skidding or loss of control |
| Flooded ground | None | Reduced movement; −1 Handling die | Bogging, water ingress |
| Rapids | None | −2 Handling dice when crossing | Forced movement or loss of control |
| Loose scree | None | −1 Handling die when climbing | Sliding or falling |
| Steep slope | Possible positional cover | −1 Handling die during difficult maneuvers | Falls or uncontrolled descent |
| Cratered ground | Cover from crater edges | −1 Handling die; reduced movement | Vehicles may become stuck |
| Collapsed roadway | Cover from debris | Movement restrictions | Falls or structural collapse |
| Minefield | None | No routine dice penalty | Entry or movement triggers hazard resolution |
| Magma crust | None | −1 Handling die | Heat exposure; possible crust failure |
| Liquid magma | None | Restricted traversal | Severe heat and damage exposure |

Handling penalties apply **when a Handling test is actually required**.
Crossing mud at normal speed does not demand a roll every movement; terrain
reduces movement, restricts maneuvers, or introduces a test when the unit
attempts something risky.

## 3. Weather and visibility

Scene-wide by default; localized weather Regions should also be possible.

| Condition | Combat / EW modifier | Movement / Handling | Other effects |
| --- | --- | --- | --- |
| Clear weather | None | None | Baseline |
| Light rain | −1 visual attack die | None | Minor cooling benefit |
| Heavy rain | −1 visual attack die | −1 Handling die for risky movement | Increased cooling; slippery ground |
| Light snowfall | None | None | Minor cooling |
| Heavy snowfall | −1 visual attack die | −1 Handling die | Cooling; snow accumulation |
| Blizzard | −2 visual attack dice | −1 Handling die; reduced movement | Cooling, drifting snow, poor visibility |
| Light fog / mist | −1 visual tracking die | None | Reduced detection range |
| Dense fog | −2 visual tracking dice | −1 Handling die during high-speed movement | Careful movement useful |
| Moderate wind | −1 die for wind-sensitive weapons | None | Smoke drift; missile interference |
| High wind | −2 dice for wind-sensitive weapons | −1 Handling die for susceptible units | Smoke drift; hovercraft and VTOL instability |
| Blowing sand | −1 kinetic, −2 energy attack dice | None | Sensor obscuration; equipment contamination |
| Dust storm | −2 visual tracking dice | −1 Handling die | Severe visibility reduction |
| Smoke, light | −1 tracking die | None | Concealment |
| Smoke, heavy | −2 tracking dice | None | Strong concealment; LOS may be blocked |
| Dusk / dawn | −1 visual tracking die | None | Sensor capabilities may mitigate |
| Night | −2 visual tracking dice | None | Depends on available sensors |
| Extreme darkness | −2 visual tracking dice or visual LOS restriction | None | Nonvisual sensors may remain functional |
| Electrical storm | −1 sensor-operation die for susceptible systems | None | Intermittent electronic interference |
| Ashfall | −1 visual tracking die | −1 Handling die if heavy | Equipment contamination; possible heat effects |

### Weapon-specific weather effects

Weapon interference is separate from target visibility (a blizzard impairs
visual acquisition for every weapon; its wind affects projectiles more).

| Effect | Energy | Ballistic / artillery | Missiles | Sensor / EW |
| --- | --- | --- | --- | --- |
| High wind | — | −2 dice | −1 die or reduced effectiveness | Usually none |
| Blowing sand | −2 dice | −1 die | −1 die | Visual sensors impaired |
| Dense fog | −1 die if relevant | — | — | −2 visual tracking dice |
| Heavy rain | −1 visual attack die | −1 visual attack die | −1 visual attack die | Visual acquisition impaired |
| Electrical storm | Usually none | Usually none | Guided systems potentially impaired | −1 die for susceptible sensors |
| Smoke | Depends on sightline | Depends on sightline | Depends on guidance | Tracking and LOS effects |

A dash means no additional weapon-specific penalty, not immunity. Where an
attack-pool and a tracking-pool penalty describe the same visibility problem,
apply one, not both.

## 4. Temperature, gravity, and hazards

Better expressed through resources and special rules than dice.

| Environment | Dice modifier | Mechanical effect |
| --- | --- | --- |
| Extreme cold | Usually none | Increased cooling; possible equipment malfunction checks |
| Extreme heat | Usually none | Reduced effective cooling or additional heat |
| Submerged in water | Depends on weapon and sensor | Additional cooling; weapon restrictions |
| Fire | None by default | Heat accumulation, damage, possible On Fire |
| Magma | None by default | Severe heat and damage |
| Low gravity | Task-specific | Altered jump distance, falls, and movement |
| High gravity | Task-specific | Reduced movement or increased movement strain |
| Zero gravity | −1 Handling die for unfamiliar maneuvering, if applicable | Requires appropriate mobility and anchoring |
| Earthquake, mild | −1 Handling die during exposed maneuvers | Possible stability checks |
| Earthquake, severe | −2 Handling dice | Falls, structural damage, terrain changes |
| Toxic atmosphere | None by default | Exposure, life-support dependency |
| Corrosive atmosphere | None by default | Equipment degradation and exposure |
| Radiation field | None by default | Exposure and system effects where applicable |
| Vacuum | None by default | Environmental protection requirements; cooling behavior |
| EMP disturbance | −1 or −2 dice for susceptible electronics | EW interference or temporary system disruption |

Temperature modifies Pending Heat or dissipation, not dice.

## 5. Mobility-specific terrain interaction

Compatibility matrix, implemented as `TERRAIN_MOBILITY_MATRIX` in
`terrain/terrain-catalog.js` (replaces the per-vehicle `favoredTerrain` /
`adverseTerrain` lists, which are now inert).

| Terrain | Wheeled | Tracked | Hover | Walker / BattleMech | VTOL |
| --- | --- | --- | --- | --- | --- |
| Paved road | Favored | Normal | Normal | Normal | Unaffected |
| Open ground | Favored | Favored | Favored | Normal | Unaffected |
| Rough terrain | Adverse | Normal | Adverse | Normal | Unaffected |
| Mud | Adverse | Normal | Normal | Normal | Unaffected |
| Deep snow | Adverse | Adverse | Normal | Normal | Unaffected |
| Ice | Adverse | Adverse | Adverse | Normal | Unaffected |
| Swamp | Adverse | Adverse | Favored | Adverse | Unaffected |
| Shallow water | Adverse | Adverse | Favored | Normal | Unaffected |
| Dense forest | Restricted | Restricted | Restricted | Adverse | Restricted at low altitude |
| Urban ruins | Adverse | Adverse | Adverse | Normal | Restricted at low altitude |
| Steep slopes | Restricted | Adverse | Restricted | Normal | Unaffected |

Favored: +1 Handling die for relevant tests or reduced terrain Strain.
Adverse: −1 Handling die or a movement restriction. Restricted: traversal
requires a specific capability, route, or maneuver. The mobility profile
determines how strongly terrain affects a unit; it does **not** stack on top
of the terrain's general Handling penalty.

## 6. Stacking and severity

| Rule | Default |
| --- | --- |
| Same-function environmental penalties | Strongest applies |
| Different mechanical effects | Apply independently |
| Terrain + weather Handling penalties | Combined routine penalty capped at −2 dice |
| Extreme interference | Restricted actions, risk, or hazards over larger penalties |
| Favored terrain | Mitigates terrain penalties, not unrelated weather |
| Task DN | Set by the action or task |
| Minimum dice pool | Existing MWD dice-pool rules; no separate environmental minimum |
| Cover | Existing cover/CQ mechanics, not duplicate attack penalties |
| Sensors | Modifiers per sensor capability and the EW operation |

Example: a tracked vehicle in mud during heavy rain takes −1 Handling die for
the terrain and no additional rain Handling penalty (both are lost traction),
but the rain's cooling still applies.

## Definition shape

Every environmental definition has four parts:

1. **Applicability** — which actors, mobility types, sensors, weapons, or
   actions it affects.
2. **Modifiers** — dice-pool adjustments or existing CQ effects, each tagged
   with its **function** (traction, visibility, wind, …) for stacking.
3. **Consequences** — heat, movement restrictions, hazards, status changes.
4. **Lifecycle** — scene-wide, Region-based (occupancy or line of effect),
   persistent, or event-triggered.

## Movement-risk procedure (decided 2026-10-22)

A procedure on existing movement, not a new action family and not statuses.
Normal movement outside hazards is unchanged.

1. The actor declares a movement action and route.
2. The system identifies the terrain and weather hazards the route touches.
3. **Only if** the movement is hazardous, the actor chooses **Careful** or
   **Reckless**. The choice is never offered otherwise.
4. **Careful:** movement distance through the hazard is **halved**; the
   ordinary terrain-risk check is skipped. No extra SA. Careful avoids the
   movement-risk check only, not other environmental consequences (a
   BattleMech carefully crossing fire still takes heat and exposure).
5. **Reckless:** full distance; a **Handling + Piloting** check at **DN 1**
   (decided 2026-10-22, see balance below), with environmental conditions
   adding or removing **dice** (Ice −1, Deep Mud −2, Dense Fog at speed −1,
   favored/adverse terrain ±1).
6. On failure, apply the consequence for the **declared movement mode and
   machine type** (not the margin of failure).

**Trigger rule (decided 2026-10-22).** Risky movement is a classification made
during movement resolution, not a new action. One hazard never imposes the
same penalty twice or forces two control checks for one maneuver. A generic
hazardous-movement check happens only when **all** of these hold:

1. the route meets an active hazard that can cause loss of control;
2. the machine's mobility type is susceptible to it;
3. the action does not already resolve that hazard through its own control
   test;
4. the player chooses Reckless rather than Careful.

| Machine action | Careful / Reckless choice |
| --- | --- |
| Walk / Safe Thrust | Yes, when applicable |
| Run | Yes |
| Sprint | Yes; the existing Sprint stability hook *becomes* this check (never both) |
| Vehicle normal Move | Yes |
| Vehicle Redline | Yes |
| Jump Move | Only for applicable landing or terrain hazards (no ground traction in flight) |
| Difficult Maneuver | No generic check: keeps its task DN, terrain modifies its Handling + Piloting dice, its own result resolves success or failure |
| Climb | No; its own climbing rules |
| Controlled Descent | No; the controlled-descent rules |
| Charge / Ram | No; existing control and collision resolution |
| Tactical Reposition | No; its established movement test where applicable |

Action costs, heat and Strain are unchanged.

**BattleMech failure ladder** (unchanged from MaxTech-Review #4):

| Movement | Failed reckless check |
| --- | --- |
| Walk | Unstable |
| Run | Skidding |
| Sprint | Prone + falling damage |

The Sprint stability notice becomes the reckless-Sprint check when applicable.

**Vehicle failure ladder** (by mobility and action):

| Vehicle movement | Failed check |
| --- | --- |
| Normal Move | Skidding |
| Redline | Skidding + Strain |
| Hover high-speed maneuver | Skidding or forced displacement |
| VTOL risky maneuver | Unstable or a control-loss event; never ground Prone |

Stalled is not a Redline failure (it is a specific engine failure, not loss of
traction). Overturning and crashing can come later as specialized hazards.

**DN does not scale with speed:** the ladder already scales the consequence,
so scaling DN too would double-penalize faster movement.

**Bogged is separate:** a terrain-specific consequence (e.g. deep mud), not a
rung of the ladder. Hazardous terrain may define a general reckless risk, a
specific consequence, or both; when a terrain-specific consequence is
configured to, it **replaces** the generic failure result, so one failed roll
never imposes several unrelated conditions.

**Falls and descents (decided 2026-10-22):** the movement resolver only decides
*what kind* of descent happened. MWD has no machine fall-damage rule yet (falls
today only apply Prone), so one **fall impact** is defined once and shared by
reckless Sprint, crit-driven falls, knockdowns, and descents from elevation.
The resolver keeps these separate:

| Situation | Resolution |
| --- | --- |
| Planned Jump Jet movement or descent | Normal movement; no fall damage |
| Emergency Jump Jet Arrest | 1 Reaction, Handling + Piloting DN 2; success negates fall damage |
| Controlled unpowered descent | First 10 m exempt from height damage; the rest takes damage and Chassis mitigation |
| Uncontrolled or forced fall (fall impact) | Full weight-class and height damage, then automatic Chassis mitigation |

| Event | Classification | First 10 m exempt | Fall damage |
| --- | --- | --- | --- |
| Deliberately going Prone | Posture change | N/A | None |
| Rolling or dropping to the ground | Deliberate movement | N/A | None |
| Leaping down from elevation | Controlled descent | Yes | Based on remaining height |
| Successful Climb and Drop | Controlled descent | Yes | Based on remaining height |
| Dangle and Drop | Controlled descent | Yes | Based on remaining height |
| Planned Jump Jet movement or descent | Powered movement | Entire fall | None |
| Emergency Jump Jet Arrest (success) | Powered descent | Entire fall | None |
| Failed reckless Sprint | Uncontrolled fall | No | Full |
| Failed stability check | Uncontrolled fall | No | Full |
| Pushed off a ledge | Forced fall | No | Full |

**Damage** (weight class, not tonnage):

```text
D = max(0, B + I × ceil(max(0, H − A) / 10) − S)
```

| Variable | Meaning |
| --- | --- |
| D | Final fall damage |
| B | Base damage by weight class |
| I | Increment per 10 m by weight class |
| H | Fall distance in meters, judged by the GM (the system does not measure elevation) |
| A | Controlled-descent allowance: 10 m for a controlled descent, otherwise 0 |
| S | Successes on the automatic Chassis + Chassis mitigation roll |

| Weight class | Tonnage | Base damage B | Increment I per 10 m |
| --- | --- | --- | --- |
| Light | 20–35 t | 2 | +1 |
| Medium | 40–55 t | 3 | +2 |
| Heavy | 60–75 t | 4 | +3 |
| Assault | 80–100 t | 5 | +4 |

- **Each 10 m or fraction thereof** of effective height adds the increment.
  A machine that falls where it stands (H = 0) takes base damage only. Since H
  is the GM's judgement, an insignificant uncontrolled drop (a meter or two)
  can simply be played as 0 m.
- **Controlled descent:** the first 10 m are subtracted from the height
  calculation. Base damage still applies to an actual drop, so a controlled
  descent of 10 m or less takes base damage: the allowance exempts only the
  height damage. This keeps dropping from a ledge distinct from a Jump Jet
  landing.
- **Uncontrolled or forced fall:** no height allowance.
- **Automatic impact mitigation:** roll Chassis + Chassis; every success
  reduces the damage by 1, whatever caused the fall. No action cost; it does
  not prevent Prone or displacement. Unnecessary when an Emergency Jump Jet
  Arrest succeeds.

Worked example, Warhammer (Heavy, Chassis 5) falling 30 m:

| Step | Uncontrolled fall | Controlled descent |
| --- | --- | --- |
| Base damage | 4 | 4 |
| Effective height | 30 m | 20 m |
| Height damage | +9 | +6 |
| Incoming damage | 13 | 10 |
| Mitigation (example: 3 successes) | −3 | −3 |
| Final damage | 10 | 7 |

A successful Emergency Jump Jet Arrest makes the final damage 0, with no
mitigation roll.
- The fall impact makes the machine Prone and applies the damage through
  HarmEngine. Existing Armor and Structure rules (and criticals) resolve it as
  ordinary damage.
- Pilot harm only when the originating rule specifies a catastrophic fall or a
  qualifying violent impact (`critical-hit.md`). There is no new pilot-damage
  rule.

**Emergency Jump Jet Arrest:**

| Property | Rule |
| --- | --- |
| Trigger | Involuntary fall from elevation |
| Cost | 1 Reaction Action; generates 1 heat |
| Prerequisite | Installed, functional Jump Jets |
| Roll | Handling + Piloting (environmental dice apply) |
| DN | 2 (Difficult) |
| Success | Controlled landing; no fall damage |
| Failure | Normal fall damage |
| Impact mitigation | Automatic Chassis + Chassis if the fall occurs |
| Forced displacement | Preserved; a successful arrest does not reverse knockback |

- **Functional Jump Jets are sufficient.** Jump rating is not compared with
  fall height, so lighter and heavier BattleMechs need no exception.
  "Functional" is the derived jumping state (`mwd/battlemech-mobility.js`):
  installed jump modules, with no Jump Jet Failure status and no crit gating
  jump.
- **One control attempt:** the arrest is for an unexpected forced fall (pushed
  off a ledge, for example). It is not a second chance after a failed reckless
  movement or stability check; those falls resolve directly as a fall impact.
- **Catastrophic failure:** a fall caused by catastrophic machine failure
  (e.g. the Legs catastrophic fallback, "collapses hard") is forced but sudden,
  with little or no chance for control, so it cannot be arrested. With the
  one-control-attempt rule, no crit-driven fall is eligible: crit results
  either call a stability check first or are catastrophic.

**Invariants:**
- **Prone never implies a fall:** applying Prone (Drop Prone, other knockdown
  mechanics) never triggers fall damage on its own; only a fall impact does.
- **One impact per action:** an originating action produces at most one
  impact-damage event. It never duplicates damage already resolved by a
  collision.
- No new statuses. The only new action cost is the optional Emergency Jump
  Jet Arrest Reaction.

**Still to confirm in play:**
- **Calibration:** the mitigation pool (Chassis + Chassis) was set from a
  representative sample. Playtest how falls come up in play: an uncontrolled
  30 m fall deals 5 (Light) vs. 17 (Assault) before mitigation.

### Balance: DN 2 vs. starting pools

Dice succeed on 5+ (4+ with pre-roll Edge). Default Handling is 4 for
BattleMechs and 3 for vehicles; pools of Handling + Piloting are typically 5–6
for a new pilot.

| Pool | DN 2 | DN 2, −1 die | DN 2, −2 dice | DN 2 with Edge | DN 1 |
| --- | --- | --- | --- | --- | --- |
| 4 | 41% | 26% | 11% | 69% | 80% |
| 5 | 54% | 41% | 26% | 81% | 87% |
| 6 | 65% | 54% | 41% | 89% | 91% |
| 7 | 74% | 65% | 54% | 94% | 94% |
| 8 | 80% | 74% | 65% | 96% | 96% |

At DN 2 a new pilot fails a reckless move on ice about half the time and in
deep mud about two times in three, which makes Careful the default choice. At
DN 1 the base risk is about 1 in 10, and environmental dice alone make
hazards meaningful (ice ~1 in 5, deep mud ~1 in 3).

**Decided (2026-10-22): DN 1** for ordinary Reckless movement, with the
existing failure ladders. Veteran pilots run about 7–8 dice, so DN 1 keeps
them capable while hazards still bite Green pilots; raising the universal DN
to 2 would mostly punish Green pilots without addressing environmental
severity. Severity is carried by **terrain** (dice penalties, restrictions,
consequences); harder maneuvers are **separate tasks** with their own DN (2 for
difficult control tasks). Severe hazards stay dangerous to Elite pilots through
specialized tasks, terrain-specific consequences, and movement restrictions.
Benchmarks: `rules conventions.md`, "Task DN and Environmental Modifiers".

---

## Scene conditions (decided 2026-10-22; slice 1 implemented)

Typed scene conditions live on the scene, not in Regions: the GM ticks them in
**Scene Configuration → Environment → MWD Conditions** (stored as
`flags.mwd.sceneConditions`, `{id: true}`). Catalog and resolution:
`terrain/scene-conditions.js`.

- **Kinds:** *light* (Dusk / Dawn, Night), *weather* (Rain, Heavy Rain, Heavy
  Snowfall, Dense Fog, Moderate Wind, High Wind, Blizzard, Blowing Sand),
  *ambient* (Extreme Heat). Dusk and Night are GM-picked conditions, not
  derived from Foundry's darkness level, because in-play lighting is often
  adjusted for player visibility or scene simplicity.
- **Mechanical only:** independent of Foundry's weather animation.
- **Shelter** uses Foundry's native Region behaviors at the token's position:

  | Shelter | Suppresses |
  | --- | --- |
  | Enabled **Suppress Weather** Region | Weather and ambient (e.g. a climate-controlled building) |
  | Overhead **Define Surface** (roof) | Weather only; a roof does not cool the air |
  | — | Light conditions are never suppressed |

  An overhead surface is a Define Surface above the token's elevation, over
  its centre, restricting movement, sight or light. A token on or above the
  roof is exposed.
- **Replacement:** a more severe or compound condition replaces what it
  includes (Night → Dusk, Heavy Rain → Rain, High Wind → Moderate Wind,
  Blizzard → Heavy Snowfall / High Wind / Moderate Wind), shared with terrain
  (`withoutReplaced`, `environment-dice.js`).
- **Effect packets:** each condition carries `{group, lane, value, mobility}`.
  Lanes: `handling` (consumed now: joins terrain in the machine rule state's
  capped Handling combiner), `visual`, `windSensitiveAttack`, `energyAttack`
  (declared, consumed by slices 3–4). Weather traction applies to ground
  mobility only; High Wind's Handling −1 applies to hover and VTOL.

Slices: (1) data, authoring, shelter, Handling ✔; (2) heat (cooling, Extreme
Heat; total heat and capacity, values pending); (3) wind on attacks; (4) visibility and targeting method.

**Heat (slice 2), pending the user's rework:** temperature effects will act on
**total heat and heat capacity**, not on dissipation (dissipation defaults to 1
and never drops below 1, so dissipation modifiers barely register). Slice 2
waits for those values.

## Implementation plan: initial 12 presets

### What exists today and must change to match this catalog

**Step 1 done (0.7.1):** terrain values, traction stacking
(`terrain/environment-dice.js`), the §5 matrix including Walker
(`terrain/terrain-mobility.js`), and the flight exemption now match this
catalog; see [Terrain-Regions.md](Terrain-Regions.md). Restricted traversal is
still deferred (counts as adverse for dice). The table below records what
changed.

The terrain Regions shipped in 0.7.0 (`terrain/terrain-catalog.js`) were
built before this catalog. Differences resolved:

| Area | Shipped | Catalog | Change |
| --- | --- | --- | --- |
| Values | Rough −1 movement only; Ice −2 dice; Heavy Woods −1; Light Woods no dice | Rough −1 Handling; Ice −1; Heavy Woods −1 | Update catalog values |
| Stacking | Status dice **add up** (status `stacking` only prevents the same status counting twice) | Same function: strongest applies; routine combined cap −2 | Add a `function` tag to environmental dice and a strongest-per-function + cap rule in the rule state |
| Vehicle affinity | Additive ±1 on top of terrain dice | Profile decides strength; no stacking with terrain's own penalty | Rework affinity: favored mitigates the terrain traction penalty (+1), adverse replaces it with the stronger of −1 / terrain |
| Matrix | `vehicle-profiles.js` defaults (e.g. tracked favors rough/urban) | §5 matrix, including a Walker column | Replace profile defaults with the §5 matrix; add a BattleMech profile |
| Flight | VTOL / flight vehicles receive ground-terrain statuses | VTOL unaffected | Exempt flight-family vehicles from ground terrain |
| Restricted | Not modeled | Traversal needs capability | Defer (movement legality) |

### Presets mapped to mechanisms

| Preset | Class | Mechanism | Builds on | Depends on |
| --- | --- | --- | --- | --- |
| Heavy Woods | Terrain | Occupancy (Handling −1, movement); line of effect (−2 tracking dice through it) | Terrain Regions (1a) | 1b line of effect |
| Rough Ground | Terrain | Occupancy (Handling −1, movement) | 1a | — |
| Mud | Condition | Occupancy (Handling −1, movement); bogging risk | 1a | Bogged (#4) |
| Ice | Condition | Occupancy (Handling −1 risky movement); skid risk | 1a | Reckless / risky movement (#4) |
| Deep Snow | Condition | Occupancy (Handling −1, movement); bogging; cooling | 1a, heat dissipation lane | Bogged (#4) |
| Smoke | Area | Temporary obscuring Region (−1 / −2 tracking dice, LOS) with dissipation | 1b | 1b |
| Fire | Hazard | Existing persistent hazard Regions (heat, damage, On Fire) | Hazard regions, `onFire` status | Verify only |
| Heavy Rain | Weather | Scene condition: −1 visual attack die; −1 Handling (traction) for risky movement; cooling | New typed scene conditions (#3) | Stacking rule |
| Dense Fog | Visibility | Scene condition: −2 visual tracking dice; Handling at high speed | #3 | — |
| High Wind | Weather | Scene condition: −2 wind-sensitive weapon dice (ballistic/artillery; missiles −1); hover/VTOL Handling; smoke drift | #3; weapon damage-type lanes | 1b for drift |
| Blizzard | Weather | Scene condition: −2 visual attack dice; Handling −1; movement; cooling | #3 | Stacking rule |
| Extreme Heat | Environment | Scene condition: dissipation adjustment, no dice | `dissipationModifier` / `beforeHeatDissipation` | #3 |

### Proposed order

1. **Align terrain with this catalog** — values, function tags with the
   strongest-per-function + −2 cap rule, affinity rework and the §5 matrix,
   flight exemption. Corrects shipped behavior and is a prerequisite for
   weather stacking.
2. **Typed scene conditions (#3)** — Heavy Rain, Dense Fog, High Wind,
   Blizzard, Extreme Heat as GM-selected scene presets (applicability +
   modifiers + consequences), read by attack, EW, piloting, and heat code.
3. **Line of effect (#1b)** — Heavy Woods sightlines, then Smoke as a
   temporary obscuring Region.
4. **Movement risk (#4)** — risky-movement tests on Ice / Mud / Deep Snow,
   Bogged and recovery, reckless ladder.
5. **Fire** — verify existing hazard Regions against this catalog.

### Weather and combat decisions (decided 2026-10-22)

Guiding principle: keep Maximum Tech's differentiation of terrain, atmosphere,
weapons and sensors, expressed through MWD's existing task DN, dice and EW
systems, **without charging the same difficulty twice**. Effects are typed
environmental modifier packets consumed by the existing attack, targeting and
movement providers; there is no separate environmental combat resolver.

Maximum Tech (expanded weather table, pp. 8, 11–12) modifies the attack roll
directly; MWD's detection and tracking system absorbs part of that. Its
"ballistic" weather class is broad (autocannons, artillery, Gauss, machine
guns, missiles, NARC, flamers) and is **not** MWD's kinetic damage type.

| Issue | Decision |
| --- | --- |
| Visual vs. sensor targeting | The attack's actual **targeting method** (visual/manual, sensor-assisted, indirect/guided), resolved at attack time from the firing solution and available sensor capability; not the weapon's damage type, and not detection state alone. The default preserves existing attack behavior. |
| Wind-sensitive weapons | An explicit weapon/payload property, initially following Maximum Tech's broad ballistic class. Guided or homing payloads override through payload traits. Not keyed to damage type. |
| Visibility destination | Friction in finding or keeping a firing solution goes to **tracking/acquisition**. Physical interference with the weapon (wind, beam attenuation) and direct visual aiming go to **attack dice**. The same visibility problem is never charged twice. |
| Stacking groups | `traction`, `visibility`, `wind`, `electronic`. Strongest environmental effect within a group, and independent groups combine. **Electronic keeps the existing EW composition rules** (stealth, ECM, sensor degradation, tracking friction can coexist), never strongest-only. |

**Targeting methods:**

| Method | Description | Environmental interactions |
| --- | --- | --- |
| Visual/manual | Direct sight, or manual aim without a usable sensor solution | Visual obscuration and sightline |
| Sensor-assisted | Uses an active Track or Lock sensor solution | Sensor interference and relevant atmospheric effects |
| Indirect/guided | Indirect fire, spotting, or guidance support | Whatever the actual guidance or spotting mechanism is |

**Evaluation order:**
1. Resolve the targeting method.
2. Apply targeting friction (visibility, smoke, ECM, stealth, sensor
   degradation).
3. Apply weapon interference (wind, beam attenuation, atmosphere).
4. Build the attack dice pool, with one normalized modifier per applicable
   effect.

**Primary effect per condition:**

| Condition | Acquisition / tracking | Attack dice |
| --- | --- | --- |
| Dusk / night | Visual sensors only | Visual/manual attacks |
| Rain, snowfall | Visual acquisition | Visual/manual attacks only |
| Fog | Visual acquisition | Energy attacks, where modeled as atmospheric interference |
| Smoke | LOS / tracking impairment | No additional generic penalty |
| Moderate / high wind | Usually none | Wind-sensitive weapons |
| Blowing sand | Visual acquisition | Weapon-specific atmospheric interference (energy) |
| Electronic interference | Sensor acquisition / tracking | No additional generic penalty |
| Earthquake | Usually none | Attack dice when firing during tremors |

**Compound conditions** (e.g. Blizzard) replace their constituents within each
group. Blizzard + High Wind gives Blizzard's wind effect, not both.

**Stacking examples:**

| Conditions | Result |
| --- | --- |
| Heavy rain + icy ground | Rain visibility + strongest traction |
| Dense fog + light smoke | The stronger visibility effect only |
| Dust storm + ECM | Visibility + applicable electronic interference |
| Heavy fog + wind-sensitive missile | Visibility where relevant + wind on the missile attack |
| ECM + degraded sensors | Existing EW aggregation |

**Provisional weather values** (to playtest; dice, never DN):

| Environment | Visibility | Wind | Traction | Additional |
| --- | --- | --- | --- | --- |
| Dusk / dawn | −1 visual | — | — | Nonvisual sensors may bypass |
| Night | −2 visual | — | — | Appropriate sensors may bypass |
| Rain | −1 visual | — | Heavy rain −1 | Cooling |
| Heavy snowfall | −1 visual | — | −1 | Cooling |
| Dense fog | −2 visual | — | — | Hazardous movement; careful option |
| Moderate wind | — | −1 | — | Missile guidance interaction |
| High wind | — | −2 | −1 for susceptible units | Smoke drift |
| Blizzard | −1 visual | −2 wind-sensitive | −1 | Cooling; compound |
| Blowing sand | −1 visual | — | — | −2 on susceptible energy attacks |
| Light smoke | Existing `obscuredLight` +1 tracking penalty | — | — | LOS interaction |
| Heavy smoke | Existing `obscuredHeavy` +3 tracking penalty | — | — | LOS interaction |
| ECM interference | — | — | — | Existing EW mechanics |

Terrain movement consequences stay separate from these dice penalties.

**Implementation guardrails:**
- **No visual escape hatch:** a player cannot declare an attack visual to
  dodge ECM. A visual/manual attack needs its own LOS and visibility check
  (`machine-stealth.js` already has a visual-contact test based on token
  visibility).
- **No global tracking penalty:** weather is not folded into one
  `trackingPenalty`. Some effects hit acquisition, some the attack, some only
  certain weapons.
- A targeting-method selector never bypasses the Track/Lock permission and
  TargetingData gates.

**Integration decisions (decided 2026-10-22):**

| # | Issue | Decision |
| --- | --- | --- |
| 1 | Ice and Mud | Keep the shipped −1 dice. **Deep Mud** is a separate, more severe condition (−2 Handling dice, greater movement restriction and Bogged risk). Mud and Deep Mud are mutually exclusive in one location; Deep Mud replaces Mud, never stacks with it. |
| 2 | Obscuring scale | One scale, the EW tracking scale: obscuring 0 = 0, 1 (light) = +1, 2 (heavy) = +3 tracking penalty (dice, never DN). Retires the competing per-point attack-dice obscuration. |
| 3 | Wind-sensitive weapons | Default from existing hardpoint types and weapon categories; a normalized environmental weapon/payload trait overrides it. No migration. |
| 4 | Targeting method | Indirect when the attack uses indirect fire or spotting; otherwise sensor-assisted when it has applicable Track/Lock **and** a permitted sensor solution for this attack; otherwise visual/manual. |
| 5 | −2 cap | Per roll, on ordinary environmental dice penalties only. |
| 6 | Risky movement | Hazardous Walk / Run / Sprint / vehicle movement triggers Careful / Reckless; actions with their own control test use it instead (see the movement-risk trigger rule). |

1. **Ice, Mud, Deep Mud:**

   | Condition | Handling | Additional |
   | --- | --- | --- |
   | Ice | −1 | Loss-of-control risk |
   | Mud | −1 (movement −1 step) | Movement restriction; possible Bogged risk |
   | Deep Mud | −2 (movement −2 steps) | Greater movement restriction and Bogged risk |
   | Deep Snow | −1 (proposed) | Movement restriction and Bogged risk |

2. **Obscuring as line of effect:** evaluate the obscuring Regions the
   relevant sightline crosses, determine the effective obscuring level, convert
   it to the EW tracking penalty and apply it **once**. No additional
   environmental attack-dice penalty for the same obscuration.
   - Heavy (+3) is a deliberate exception to the −2 environmental cap: it is
     EW tracking friction, outside that cap.
   - Acquisition and the later attack are separate rolls, and each may feel
     the obscuration. Within one roll it is never applied twice.
   - Retiring the `obscuredLight` / `obscuredHeavy` statuses must keep
     unrelated EW penalties (ECM, stealth, degraded sensors, target motion).
   - The 0/1/2 level is **severity, not a count of Regions**: two light smoke
     Regions do not become heavy unless the area design explicitly makes
     obscuring additive.
3. **Wind sensitivity defaults:**

   | Hardpoint / category | Wind-sensitive |
   | --- | --- |
   | Machine ballistic | Yes |
   | Machine missile | Yes |
   | Machine energy | No |
   | Personal ballistic projectile | Yes |
   | Personal thrown projectile | Yes |
   | Personal missile / rocket | Yes |
   | Personal energy | No |
   | Melee | No |

   Personal weapons use their existing category and traits where possible,
   and fall back to the broad type only when nothing more specific exists.
   Exceptions (flamers, guided projectiles, specialized ammunition, unusual
   atmospheric behavior) are a normalized environmental trait, not a list of
   weapon names. That trait also covers where Maximum Tech's ballistic class
   is broader than MWD's hardpoint taxonomy.
4. **Targeting method:**
   - A visual/manual attack uses the visual-contact test in
     `machine-stealth.js`. If it fails, the attack is not permitted by that
     method, and the system never invents a sensor solution.
   - Sensor-assisted attacks keep the Track/Lock permissions, and electronic
     interference applies normally.
   - Sensor-assisted does not mean immune to physical obscuration (an optical
     sensor still suffers in fog or smoke).
   - **Sensor bypass is configurable, capability-driven data**, not hardcoded:
     not every sensor defeats darkness, fog, smoke or blowing sand the same
     way.
5. **Cap scope examples:**

   | Roll | Effects | Environmental penalty |
   | --- | --- | --- |
   | Handling + Piloting | Mud −1, rain-slicked −1 (both traction) | −1 |
   | Handling + Piloting | Ice −1, high wind −1 (independent groups) | −2 |
   | Visual acquisition | Fog −2, light smoke | Obscuration/EW rules, not a second generic visibility penalty |
   | Ballistic attack | High wind −2 | −2 |
   | Attack through heavy obscuration | EW tracking +3 | −3 (EW, outside the cap) |

   The cap never suppresses EW, status effects, Burn, damage penalties or
   other independent systems. It is not a cap on all of a roll's negative
   modifiers, which would make a badly damaged machine immune to further
   environmental penalties.

**Implementation cautions:**
- Stacking groups are not resolver lanes. Electronic keeps EW's richer
  composition model.
- Normalize a condition once. A Blizzard supplies wind, visibility and
  traction effects that coexist, but it replaces overlapping constituent
  weather (separately selected High Wind, Heavy Snowfall) rather than
  stacking with it.

**Follow-up decisions (decided 2026-10-22):**

| Item | Resolution | Implementation timing |
| --- | --- | --- |
| Deep Mud | −2 movement steps (60 m), −2 Handling dice, replaces Mud | Shipped with this decision (terrain catalog) |
| Several obscuring areas | Accumulate along the sightline: 1 = +1, 2 = +3, 3+ blocks **visual** LOS | Line of effect (1b) |
| Manual Obscured statuses | Kept as GM overrides, normalized into the same obscuration | Line of effect (1b) |

- **Deep Mud** is a more severe Mud for both movement and Handling (Bogged,
  with greater susceptibility). It replaces Mud and never stacks with it,
  even across overlapping Regions (`replaces` in the terrain catalog). The
  existing movement floor applies: penalized movement never drops below 10 m
  unless the machine is immobile. Bogged stays separate from the movement
  penalty; Deep Mud slows a unit whether or not it bogs down.
- **Accumulated obscuring** (replaces the strongest-only rule *for line of
  effect only*; overlapping scene-wide visibility such as fog and rain stays
  strongest-only). Each Region's `obscuring` value is its contribution.
  - Count **distinct** contributions, not polygon intersections: a sightline
    crossing one irregular woods Region several times counts it once.
  - Woods and smoke feed the **same** accumulator.
  - **Blocked visual LOS is not blocked line of effect.** Three light woods
    may prevent visual identification without making the terrain physically
    impenetrable to weapons. The targeting method and sensor capability decide
    whether an attack is still possible (a sensor-guided shot may be). Foundry
    walls remain the physical blocker.

  | Accumulated obscuring | Visibility | Tracking penalty |
  | --- | --- | --- |
  | 0 | Clear | 0 |
  | 1 | Light | +1 |
  | 2 | Heavy | +3 |
  | 3+ | Blocked | No visual line of sight |

- **Manual Obscured statuses as GM overrides**, for concealment the map
  geometry does not represent (an unusual concealment effect, a scripted
  encounter). Manual and spatial obscuration feed **one** resolver:
  `O_effective = max(O_spatial, O_manual)` (Obscured Light = 1, Obscured
  Heavy = 2, Heavy wins when both are present), then the shared EW scale. A
  manual Heavy never adds a second +3 on top of terrain. The status
  establishes obscuration; sensor capability still decides whether it impairs
  a given targeting method. No migration needed.
