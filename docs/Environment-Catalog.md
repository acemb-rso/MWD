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

**Falling damage (decided 2026-10-22):** the movement resolver only decides
that a fall happened. MWD has no machine fall-damage rule yet (falls today only
apply Prone), so one **fall event** is defined once and shared by reckless
Sprint, crit-driven falls and knockdowns:

1. A qualifying event (failed reckless Sprint, a critical-hit result, ...)
   triggers a fall.
2. The machine becomes Prone.
3. The fall event applies fixed damage by BattleMech weight class through
   HarmEngine.
4. Existing Armor and Structure rules (and criticals) resolve it as ordinary
   damage.
5. Pilot harm only when the originating rule specifies a catastrophic fall or
   qualifying violent impact (`critical-hit.md`); no new pilot-damage rule.

| Weight class | Tonnage | Fall damage |
| --- | --- | --- |
| Light | 20–35 t | 2 |
| Medium | 40–55 t | 3 |
| Heavy | 60–75 t | 4 |
| Assault | 80–100 t | 5 |

- **Weight class, not tonnage:** predictable, consistent per class, no
  arithmetic in play; matches MWD's abstracted damage and durability. Falls
  from significant height can add damage later without changing the base rule.
- **No Chassis reduction** for now: mass already sets the damage, so using
  Chassis to reduce it would count mass twice.
- **Prone never implies a fall:** applying Prone (Drop Prone, other knockdown
  mechanics) never triggers fall damage on its own; only the fall event does.
- **One impact per action:** an originating action produces at most one
  impact-damage event and never duplicates damage already resolved by a
  collision.
- **Provisional:** weight class measures mass, not resilience. Validate the
  2/3/4/5 scale against typical Armor and Structure totals per class (a
  comparable consequence across classes) **before enabling the fall event**.

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

### Decisions needed

- **Visual vs. non-visual:** "visual attack/tracking dice" implies sensors can
  mitigate. Which MWD fact decides it — machine sensor modules, active-probe
  style capabilities, or a simple "machine attacks use sensors, personal
  attacks are visual" default?
- **Wind-sensitive weapons:** map to MWD damage types / weapon tags
  (kinetic and missile payloads), or an explicit weapon keyword?
- **Attack pool vs. tracking pool:** for visibility weather, pick one lane per
  condition (the catalog lists both columns).
- **"Risky movement":** which machine actions count (Run, Sprint, reckless
  moves, Difficult Maneuver)? Shared with #4.
- **Stacking functions:** proposed set — `traction`, `visibility`, `wind`,
  `electronic`; confirm.
