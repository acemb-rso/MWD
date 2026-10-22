# Maximum Tech Review — Environment & Tactical Maneuvering

**Status:** design review, 2026-10-19. Nothing here is implemented; each
recommendation needs a decision before work starts.

**Source:** *Maximum Tech (Revised)*, FASA BattleTech Level 3 rules
(chapters: Terrain and Movement pp. 7–16, Combat pp. 17–27, Vehicles pp. 28–35,
Smoke p. 50). The underwater-operations page (p. 42) did not extract and is
not reviewed.

## Framing

BattleTech and MWD depict the same world with different machinery. Max Tech
answers "how does this behave on a hex map, to the turn?"; MWD answers "what
does this mean at the table, in dice parts, DN, CQ and statuses?". So the
question for each Max Tech rule is not "do we have this rule?" but "does MWD
represent the *idea*, and should it?"

Constraints from MWD's own docs that shape the verdicts:

- **Design Principles:** mechanics are declarative data (statuses, catalog
  entries, rule packets) consumed by resolvers and providers; everything is
  expressed as dice / DN / CQ parts; the UI only emits intents.
- **Vehicle-Design.md:** vehicles live by concealment, terrain, hull-down,
  firing lanes, flanking and support doctrine — but explicitly *not* "full
  BattleTech tabletop fidelity" or "hex-level simulation fidelity".
- **Heat, EW, area effects** already have their own MWD-native models; Max Tech
  equivalents are compared to those, not imported.

Verdict key: **Handled** (MWD covers the idea, possibly differently) ·
**Partial** · **Gap** (idea is wanted by MWD's own doctrine but missing) ·
**Not a fit** (simulation detail MWD deliberately avoids).

---

## The structural gap

**MWD has no model of the ground a unit is standing in or the conditions
around it.**

- Vehicle profiles declare `favoredTerrain` / `adverseTerrain` (road, open,
  rough, forest, urban, water) — but these are **display-only**: the sheet
  shows them and no mechanic reads them.
- Weather and visibility exist only as GM **scene modifiers**: a flat dice
  bonus/penalty filtered by intent or attribute, with no type ("fog", "rain").
- Cover exists only as **roll-dialog presets** the player picks by hand
  (Light −1 … Full −4 dice).
- Heat has no environmental input; the heat doc says to adjust Pending Heat
  manually "for environmental effects".

Almost every Max Tech environment rule lands on this gap.

## Design rule: environment modifies, the task sets the DN

**Adopted 2026-10-21.** MWD's established convention is that the *task* sets
the DN and *circumstances* modify the dice pool or other mechanics (EW: Acquire
Contact DN 1, Track DN 2, Lock DN 3; interference and tracking penalties
affect dice).

> Environmental conditions modify the dice pool, movement capabilities,
> resource costs, or consequences of an action. The action or task
> establishes its DN. Environmental conditions do not ordinarily alter that DN
> unless a specific rule explicitly requires it.

| Situation | Task DN | Circumstantial modifier |
| --- | --- | --- |
| Drive across ordinary ground | Normal movement rules | None |
| Perform a difficult maneuver | Set by the maneuver | Mud: Piloting dice penalty |
| Recover from a skid | Set by the recovery task | Ice: dice penalty |
| Acquire a sensor contact | Set by the acquisition task | Fog / obscuring: dice penalty |
| Fire a weapon | Existing attack resolution | Wind / obscuring: attack dice |
| Escape being Bogged | Set by the recovery task | Vehicle capabilities modify the roll |

A hazardous feature may introduce a **new task** (a Piloting check to avoid
becoming Bogged) with its own DN; conditions then contribute dice to it.

This keeps a maneuver's difficulty recognizable wherever it is attempted,
keeps the roll breakdown transparent, and stops ordinary weather from imposing
large difficulty jumps on inexperienced characters.

**Existing DN-raising effects, against this rule:**

| Effect | Status |
| --- | --- |
| Crit consequences (e.g. Limping, Gyro Damage: +1 Piloting DN) | Allowed: specific mechanical consequences |
| Target movement raises attack DN by actions taken | Core attack rule; review separately |
| ECM cloud: +1 Acquire DN | Circumstance raising DN; review against this rule |
| Stealth: Acquire DN parts (`getStealthDnParts`) | Circumstance raising DN; review against this rule |

Terrain (#1a) shipped in 0.7.0 with Piloting DN and was converted to Piloting
dice under this rule.

## Environmental effect classes (design prerequisite)

Environmental effects relate to units in four different ways. Each needs its
own mechanism; forcing all of them into actor statuses gets the spatial
relationship wrong (a shot crossing a smoke cloud is penalized even when
neither combatant stands in it).

| Class | Spatial question | Examples | Mechanism |
| --- | --- | --- | --- |
| **Occupancy** | What is this unit standing in? | Mud, deep snow, water depth, hazardous ground, local temperature (magma, fire) | Region membership projects declarative statuses onto occupants (area-status projection; hazard regions for damage). Effects live in `status-modifiers.js`. |
| **Line of effect** | What does this attack or sensor sweep pass through? | Smoke, intervening woods/jungle, other visibility obstructions | Computed **at resolve time** for the attacker → target pair: test the segment between the two tokens against obstruction regions and emit dice parts from a provider (Design Principles §6.1, §4). Never persisted on either actor. |
| **Scene-wide** | What applies to everyone here? | Weather, wind, gravity, ambient light, ambient temperature | A typed scene condition read by providers (the scene-modifier flag pattern, but typed). Not written as statuses onto every token. |
| **Persistent actor consequence** | What has happened to this unit? | Bogged, Skidding, On Fire, Unstable, Prone | Real statuses with their own lifetime: created by outcomes (a failed bog-down or reckless-move check, a hazard), cleared by actions, remedies, or `clearsOnActions` — not by leaving a region. |

The classes chain but stay separate: occupancy can *trigger* a persistent
consequence (entering mud prompts a bog-down check; failure applies *Bogged*,
which persists after leaving the mud until cleared), and scene conditions can
*scale* the other classes (high wind strengthens smoke drift).

**One mechanic, one meaning (§11) — avoid double counting.** Today's
`obscuredLight` / `obscuredHeavy` statuses put smoke on the **target** as an
occupancy effect. If smoke becomes a line-of-effect obstruction, a target
standing inside a cloud would be penalized twice. Decide before building:
smoke regions are line-of-effect only (an endpoint inside the cloud counts as
crossing it, once), and the obscured statuses become either manual GM
overrides or retire.

Existing MWD pieces per class: statuses as declarative mechanics and region
projection (occupancy, consequences); the provider pipeline and scene-flag
pattern (scene-wide); line of effect has **no** existing mechanism and is new
work (segment-vs-region test; Foundry Regions expose shapes and point tests,
and sampling the segment at grid resolution is adequate at MWD fidelity).

---

## Environment

| Max Tech rule | MWD today | Verdict |
| --- | --- | --- |
| Expanded terrain table (MP cost, piloting mod, to-hit mod per terrain) | Vehicle terrain classes declared but unused; no terrain on the map | **Gap** |
| New terrain: jungle, ultra-heavy woods, tundra, sand, magma | None | **Gap** (as terrain classes) |
| Terrain conditions stacked on base terrain (mud, deep snow, ice, rapids, swamp, rubble) | None | **Gap** |
| Bog down (stuck in mud/snow/tundra/magma; piloting to free) | None | **Gap** |
| Careful movement (pay extra to cross fog/ice safely, or roll to avoid a fall/crash) | Personal *Careful Move* exists; machines have none | **Partial** |
| Weather: rain, snow, blizzard, fog, blowing sand, winds | Generic scene modifiers only | **Partial** |
| Weather by weapon type (wind hurts ballistic/missile; sand/fog hurt energy) | Damage types exist; no environmental lane | **Gap** |
| Dusk/dawn, night | Foundry vision only; no mechanic | **Gap** |
| Earthquake (to-hit penalty, piloting each turn, fissures) | None | **Gap** (scenario-level) |
| High/low gravity (movement, falls, weapon calibration) | None | **Gap** (low priority) |
| Ambient temperature, rain/snow cooling, water cooling | None (manual Pending Heat) | **Gap** |
| Magma / fire heat and damage | Fire as a persistent hazard (exposure tiers, Evade) | **Partial** |
| Geysers (random eruptions, obscuring) | None | Not a fit (GM narration) |
| Smoke: light/heavy as LOS & to-hit modifiers | `obscuredLight` / `obscuredHeavy` statuses (+1/+3 tracking) | **Handled** |
| Smoke drift & dissipation each turn | Manual | **Partial** |
| Minefields (vehicles take motive damage; hovercraft rarely trigger) | Hazard regions exist; minefield template shape offered but not executable | **Partial** |

## Tactical maneuvering

| Max Tech rule | MWD today | Verdict |
| --- | --- | --- |
| Sprinting (×2 speed, no attacks, easier to hit, piloting +2) | *Sprint* (3 SA, +2 heat, "stability roll required" — notice only) | **Partial** (roll not automated) |
| Evading (+1 to-hit against, no attacks) | *Evasive Maneuver* (+3 DR / −2 AR) | **Handled** |
| Expanded target movement modifiers for very fast units | Target motion DN by action count + tracking dice by hexes (to 9+) | **Handled** |
| Hull-down (only helps with partial cover; vehicles need suitable terrain) | *Hull Down* posture, DR bonus anywhere; ends on movement | **Partial** (not tied to terrain/cover) |
| Partial cover (¼, ¾, vertical; cover absorbs hits) | Player-picked cover presets | **Partial** |
| Taking cover (active cover behind a chosen side) | None | **Gap** |
| Line of sight dead zones / elevation | Detection ladder + spotting; no elevation advantage | **Partial**; dead-zone math **Not a fit** |
| Called shots (high/low/left/right) | Chaos crit selection chooses location | **Partial** |
| Facing-driven hit location / flanking | Hit location is rolled; facing is descriptive only | **Not adopted** (harm engine has no facing); positional advantage via a maneuver instead (#5) |
| Careful aim | *Careful Aim* / personal *Aim* | **Handled** |
| Opportunity fire (watch, interrupt movement) | Personal *Prepare* / *Interrupt* | **Handled** (verify it covers machine attacks) |
| Glancing blows (exact roll = half damage) | Graze outcome | **Handled** |
| Linked weapons | Weapon groups | **Handled** |
| Extreme range | Range bands incl. extreme | **Handled** |
| Damage-threshold piloting check (fall after 20+ damage) | Instability comes from crits (Unstable, Skidding) | **Handled** (by crits) |
| Skidding with terrain (woods shorten skids, buildings, water) | *Skidding* status (forced movement reminder) | **Partial** |
| Climbing, leaping, dangle-and-drop, backward elevation change | *Climb / Evade Terrain / Difficult Maneuver* (generic piloting check) | **Handled** (abstracted) |
| Physical: push, trip | Charge *control* intents (prone, forced movement, skidding, stalled) | **Handled** |
| Physical: grapple, grab, mule kick, jump-jet attack | Generic physical attack | Not a fit (rare; GM narration) |
| Charging damage scaled by target weight | Charge/Ram/DFA with recoil | **Partial** (recoil still chat-only; plan Phase 6) |
| DFA wreckage still hitting if attacker destroyed | None | Not a fit |
| Expanded heat scale / avoid shutdown with skill | Heat danger checks; *Avoid Shutdown* reaction | **Handled** |

## Vehicles

| Max Tech rule | MWD today | Verdict |
| --- | --- | --- |
| Turn modes, acceleration, declared speed | Strain / *Redline* abstract pushing a vehicle | **Not a fit** (hex fidelity is a non-goal) |
| Failed maneuver table (fishtail → skid → flip) | Strain thresholds; *Skidding* status | **Partial** |
| Sideslip, bootlegger | *Tactical Reposition* | **Handled** (abstracted) |
| Firing arcs, turrets, sponsons | Turret location; *Rotate Turret* narrative | **Partial** |
| Crew firing without movement penalty; commander hit | Stabilized-fire affordance (tracked); crew data not automated | **Partial** (crew is plan Phase 5) |
| VTOL strafing / bombing | `fastPass` affordance placeholder | **Gap** (future) |
| Minefields vs hovercraft | See Minefields | **Partial** |

---

## Recommendations

Priority order (agreed 2026-10-19): terrain and condition regions, cover as
tactical state, typed environmental conditions, movement-risk completion.
Facing-based flanking was dropped (no harm-engine change); the positional
maneuver (#5) replaces it. Then smoke/minefields and later items.

**Dependencies.** Cover (#2) builds on regions (#1a occupancy, #1b line of
effect). Hazardous-terrain checks and bogging in #4 need occupancy regions,
but the **Sprint stability roll** and the decided reckless-movement ladder in
#4 do not depend on terrain and can ship first. Typed conditions (#3) are
independent of regions. The positional maneuver (#5) interacts with cover
(#2) and line of effect (#1b). Smoke (#6) needs line of effect
(#1b).

### 1. Environment regions (foundation)

A GM-authored Region declares a **terrain class**, optional **conditions**, and
which effect classes it takes part in. One region can serve more than one
class: a Heavy Woods region slows units inside it (occupancy) *and* obstructs
attacks passing through it (line of effect).

**1a. Occupancy.** Membership projects declarative statuses onto tokens inside
the region (reusing the area-status projection), with effects in
`status-modifiers.js`:

- Terrain classes start from the existing vehicle vocabulary — road, open,
  rough, forest (light/heavy), urban, water — plus jungle, sand, snow, ice,
  mud/swamp as conditions.
- Effects map to existing fields: movement penalty (`movement`), Piloting
  dice (`dice` with selector `pilotingDice`), heat (`heat` / `startTurn`), cover DR for the
  occupant (`cq`).
- **Activates the dead data:** vehicle `favoredTerrain` / `adverseTerrain`
  compares the vehicle's profile to the occupied region's terrain class
  (favored: Handling bonus or strain relief; adverse: Handling/piloting penalty
  or extra strain).
- Occupancy may *trigger* persistent consequences (entering mud prompts a
  bog-down check) but does not *own* them (see #4).

**1b. Line of effect.** New mechanism: when an attack or sensor action
resolves, test the attacker → target segment against obstruction regions and
emit dice parts from a provider, derived at resolve time and never stored
on either actor. Each obstruction counts once per segment, including when an
endpoint is inside it. Consumers: ranged attacks, Acquire / sensor tracking,
and indirect-fire spotting (which already treats line of sight as a gate).

**Terrain is the single source of truth.** Each terrain class (and smoke)
declares an **obscuring value** next to its occupancy effects, so the same
authored regions drive both 1a and 1b and obscuring is calculated
automatically: the provider sums the obscuring values of the regions the
attack line crosses (each once, including the target's own region). This
replaces the hand-picked cover presets for obscured shots and the
target-side `obscuredLight` / `obscuredHeavy` statuses, and gives attacks,
Acquire / tracking and spotting one shared answer. Smoke is a temporary region
with an obscuring value that decays on dissipation. Foundry walls (buildings,
cliffs) remain the hard line-of-sight blocker the canvas already uses.

*Decisions:* obstruction magnitudes per region type; whether enough obstruction
blocks line of effect outright (Max Tech: three "points" of woods/smoke block
LOS); whether elevation (token elevation vs. region height) lets a shot clear
an obstruction.

### 2. Cover as state, not a dialog preset

Turn cover into something the system knows: from terrain regions (#1) and a
**Take Cover** posture (machine and personal) that grants cover DR and ends on
movement — the same `clearsOnActions` pattern now used by Braced and Hull Down.
Then **Hull Down** can require cover or suitable terrain, as in Max Tech (and
as the tracked-vehicle `hullDown` affordance implies).

Cover spans the classes, and each part uses its class's mechanism:

- Standing **in** covering terrain (woods, rubble) is occupancy (#1a).
- Being **behind** an obstacle is directional: it protects only against
  attacks whose line crosses the obstacle, so it is line of effect (#1b), not
  a status on the target.
- **Take Cover** / **Hull Down** are deliberate postures, i.e. persistent actor
  states that end on movement.

Every cover and defensive effect must declare whether it is **directional**
(protects against attacks from particular directions: Hull Down, Take Cover,
directional line-of-effect cover) or **general** (e.g. Shield's guarded
stance). The positional maneuver (#5) bypasses only directional effects.

*Decision:* keep manual cover presets as a GM override, or retire them.

### 3. Battlefield conditions (weather, light, gravity, temperature)

Replace generic scene modifiers for environment with **typed scene
conditions** read directly by providers. These are scene-wide by nature, so
they are *not* written as statuses onto every token:

- Visibility: dusk, night, fog, rain, snow, blizzard, blowing sand → tracking
  penalty / Acquire dice, using the existing EW tracking lane.
- Weapon lanes: wind penalizes kinetic/missile attacks; sand/fog penalize
  energy — keyed to MWD damage types, not BT weapon classes.
- Heat: ambient temperature and rain/snow adjust dissipation through the heat
  model (no more manual Pending Heat edits for weather).
- Gravity: movement and fall consequences as a scene condition (low priority).
- Conditions can scale other classes (wind strengthens smoke drift, #6).

*Decision:* which conditions ship first; magnitudes in MWD dice terms (Max Tech
numbers are to-hit/MP and do not translate 1:1).

### 4. Movement risk automation (persistent consequences)

**Superseded in detail by** the movement-risk procedure in
[Environment-Catalog.md](Environment-Catalog.md) (decided 2026-10-22):
hazard-triggered Careful/Reckless choice, fixed-DN check with environmental
dice, BattleMech and vehicle failure ladders, Bogged as a separate terrain
consequence, one shared fall event.

The outcomes here are persistent actor statuses with their own lifetime; they
outlive the terrain or condition that caused them.


- Automate the **Sprint stability roll** (currently a notice).
- **Careful vs. reckless movement** in hazardous terrain/conditions: careful
  costs speed (or SA); reckless needs a piloting check, failing into the
  existing *Unstable* / *Skidding* / *Prone* outcomes — the same consequence
  vocabulary Charge already uses.

  **Decided (2026-10-19)** — a failed reckless BattleMech move escalates with
  speed:

  | Reckless movement | Failure result |
  | --- | --- |
  | Walk | *Unstable* |
  | Run | *Skidding* |
  | Sprint | *Prone*, plus falling damage |

  Falling damage does not exist yet for machines. Decided as a shared fall
  event with fixed damage by weight class (2/3/4/5), through HarmEngine; see
  the movement-risk procedure in [Environment-Catalog.md](Environment-Catalog.md). The Sprint stability roll becomes the reckless-Sprint check.
- **Bog down**: mud/snow/swamp terrain can apply a *Bogged* status (no
  movement) cleared by a piloting check — a status with `clearsOnSuccess`.

### 5. Positional maneuver: find the vulnerable arc

Facing-based flanking is **not adopted**: the harm engine has no facing-driven
hit location, and that change is out of scope. Positional advantage is instead
an intentional tactical action, and attacks still resolve through the
established combat and harm pipelines.

**Status:** approved for further design (2026-10-19). Before implementation:
settle the cover-bypass definition (needs #2) and the action-economy balance.
All magnitudes are unknown and set by playtesting, implemented as declarative
data with provisional values clearly marked.

#### Proposed contract (not an implemented rule)

| Property | Proposed behavior |
| --- | --- |
| Action | 1 SA; a movement action that actually moves (`includesMovement`) |
| Test | Handling + Piloting against a target-dependent DN |
| Target | One identified enemy |
| Success | Gain **Vulnerable Arc** against that target |
| Effect | Positional AR bonus; ignore **eligible directional** defensive modifiers |
| Scope | That attacker → target pair only (stored like an EW targeting packet, not a status on the target) |
| Duration | Expires at the **start** of the attacker's next activation if unused (so it cannot be banked across turns) |
| Consumption | The next eligible attack against that target |
| Stacking | Replace, never accumulate |
| Harm resolution | Unchanged |
| Defender action restriction | Deferred (see below) |

**Positional opportunity.** The maneuver must involve real repositioning so a
stationary unit cannot repeatedly declare it. Making it a movement action that
moves (like Evasive Maneuver) establishes this through the movement resolver,
with no facing calculation, and brings the right side effects for free: it
ends the attacker's own Braced / Hull Down and, once they exist, triggers
terrain and reckless-movement checks (#4).

#### What it bypasses

The maneuver ignores **eligible defensive modifiers**; it never overrides
attack legality.

| Protection | Bypassed? | Reason |
| --- | --- | --- |
| Hull Down | Yes | Directional protection; the attacker finds an exposed angle |
| Take Cover | Yes (its directional benefit) | The attacker obtains a better firing lane |
| Shield | **No** | Its DR is a general guarded stance, and its first-hit damage reduction is applied at damage time, which stays unchanged |
| Intervening cover (line of effect) | Conditional | An angle does not let attacks pass through solid obstructions; only cover flagged directional |
| Complete line-of-sight blockage | No | The maneuver creates no visibility or firing lane |

This requires cover and defensive effects to declare whether they are
**directional** (see #2), which is why cover comes first.

#### Deferred: defender consequences

Requiring the defender to Torso Twist / Rotate Turret before returning fire is
deferred. It would impose an action cost without an opposed reaction, which
could be disproportionate against vehicles with limited action economy on top
of the AR bonus and cover bypass. The first version grants the attack
advantage only; defender-facing consequences can be added if playtesting shows
a need.

#### Implementation notes

- Expiry uses the machine start-of-activation processor (the hook that ends an
  unused Shield). The advantage is pair-stored, so it needs explicit cleanup
  there, like other per-combatant EW state.
- Balance target: it must compete with simply attacking (not so weak it is
  never used, not so strong it is the default opener against every protected
  target).

### 6. Smoke and minefields on the area-effect system

- Smoke payloads create a persistent **line-of-effect obstruction region**
  (#1b), not occupant statuses, with per-round dissipation (and optional drift
  with a wind condition from #3). Fixes the "cloud shape offered but not
  executable" gap. Resolves the double-counting question with today's
  `obscuredLight` / `obscuredHeavy` target statuses (see "Environmental effect
  classes").
- Minefields as hazard regions triggered on entry; vehicles roll motive damage;
  hover profiles rarely trigger.

### 7. Later

- VTOL strafing/bombing (needs the aerospace/fast-pass design).
- Elevation advantage as a simple CQ part from token elevation (no dead-zone
  geometry).
- Underwater operations (water depth terrain, heat-sink cooling) once #1 exists.

## Deliberately not adopted

Facing-based flanking and facing-driven hit location (harm engine has no
facing; positional advantage comes from the #5 maneuver instead).


Turn modes and acceleration, dead-zone line-of-sight math, hex-by-hex skid
paths and flip sequences, geysers, weapon miscalibration tables, grappling /
grabbing / mule kicks / jump-jet attacks, DFA wreckage — all either hex-fidelity
simulation (an explicit MWD non-goal) or rare enough to leave to GM narration
using existing actions (Difficult Maneuver, Charge control intents, hazards).
