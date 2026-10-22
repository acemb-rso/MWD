# Terrain Regions

Design for review item #1 (see [MaxTech-Review.md](MaxTech-Review.md)).
**Status:** 1a (occupancy) core implemented: catalog, terrain statuses, region
sources in the area-status controller, the mobility matrix and traction
stacking from [Environment-Catalog.md](Environment-Catalog.md) (§5, §6), and
the flight exemption. Authored through a native Region Behavior. 1b (line of effect) designed here, not yet built. All magnitudes are **provisional, to be set by playtesting**,
and live in data.

## Model

A GM marks a Foundry Region with a **terrain class** and optional
**conditions**. The terrain catalog (`terrain/terrain-catalog.js`) is the
single source of truth for what each one means:

| Field | Used by | Meaning |
| --- | --- | --- |
| `statusId` | 1a occupancy | Status projected onto machines inside the region; its mechanics live in `status-modifiers.js` |
| `movementCost` / `category` / `hazardous` | Movement cost | Path cost multiplier (×1 / ×2 / ×3), base terrain vs. condition, control hazard (Careful doubles) |
| `pilotingDice` / `diceFunction` | 1a occupancy | Handling dice for piloting rolls, in the `traction` environment function |
| `pilotingDiceMobility` | 1a occupancy | Mobility types the dice apply to (e.g. sand: wheeled, tracked) |
| `obscuring` | 1b line of effect | How much the region obscures an attack or sensor line crossing it |

Terrain region data (one shape, whatever the authoring path):

```js
{ terrainClass: "woodsHeavy", conditions: ["mud"] }
```

Read through one adapter, `getRegionTerrain(region)`, so the core does not
depend on how terrain is authored.

## 1a. Occupancy

Terrain regions are a new **source kind** in the existing area-status
controller, alongside token auras:

```
GM terrain Region ──collectTerrainRegionAreaStatusSources──▶ source { kind: "region", regionUuid, statusIds, allegiance: "any" }
                                                                │
                      getAffectedTokensForSource: token centre inside region shape
                                                                ▼
                     desired vs. actual contributions ──▶ AreaStatusOwnership (source-owned statuses)
```

- Membership uses a shared region helper (`utils/region.js`,
  `isTokenInRegion`), also used by hazard regions.
- Reconciliation reuses the existing hooks (token moves, region changes) and
  ownership, so terrain statuses never delete manual or unrelated statuses and
  leave as soon as the token leaves the region.
- Terrain statuses are not shown as manual toggles; they are projections.
- Terrain statuses are **occupancy markers** with no mechanics of their own.
  **Movement** is a path cost (see "Movement cost" below). **Dice** depend on
  who occupies the terrain, so the machine rule state computes them
  (`terrain/terrain-mobility.js`):
  - Mobility: BattleMech → `walker`; ground vehicle → its movement profile
    (wheeled, tracked, hover); flight vehicles (VTOL, drone, aerospace) →
    `flight`, which ignores ground terrain. Terrain sources are `groundOnly`,
    so the controller never projects terrain statuses onto flight units.
  - `TERRAIN_MOBILITY_MATRIX` (catalog §5) relates each mobility to terrain:
    **favored** ignores the terrain's penalty and gains +1; **adverse** takes
    the stronger of the terrain's penalty and −1; **restricted** (traversal
    needs a capability, not yet modeled) counts as adverse for dice;
    **normal** takes the terrain's own penalty.
  - Contributions combine in `terrain/environment-dice.js` (catalog §6):
    per function the strongest penalty applies and a bonus applies once;
    functions add; the routine combined penalty is capped at −2. Terrain is
    all `traction` for now; weather adds `visibility`, `wind`, `electronic`.
  - The vehicle sheet shows favored / adverse terrain derived from the matrix
    (read-only). Per-vehicle `system.mwd.favoredTerrain` / `adverseTerrain`
    are inert legacy data.
- Terrain *triggers* persistent consequences (bog-down, reckless movement:
  review #4) but does not own them.

### Movement cost (decided 2026-10-22)

Terrain affects the part of a route that crosses it, not the machine's whole
allowance. Walk / Run / Sprint (and vehicle actions) show unpenalized
allowances; Foundry's token ruler prices the path.

- **Cost:** ×1 clear, ×2 difficult, ×3 severe. 30 m of ×2 terrain consumes
  60 m of allowance; the ruler totals segments, never one multiplier per route.
- **Composition** (`resolveTerrainMovementCost`, the single canonical
  resolver for the ruler preview and later enforcement):
  `M = 1 + Σ excess`, never multiplied (Heavy Woods ×3 + Mud ×2 = ×4; + Deep Mud
  ×3 = ×5). The same terrain counts once (overlapping Heavy Woods Regions stay
  ×3); one base terrain per location (the more costly applies); superseded
  conditions drop out (Deep Mud replaces Mud). Other behaviors' Foundry
  `difficulty` adds as excess (`d − 1`; null is impassable).
- **Mobility:** favored ignores that terrain contribution's excess (per
  contribution, so it never cancels an unrelated condition); adverse +1 to its
  multiplier; **restricted is impassable** (∞) unless a capability permits
  traversal (none modeled yet); flight, and the `fly` / `jump` / `blink` /
  `displace` movement actions, pay no ground cost (jump launch and landing
  hazards belong to the movement-risk procedure).
- **Careful / Reckless:** Careful doubles the cost of **hazardous** stretches
  (Mud, Deep Mud, Deep Snow, Ice, Swamp) after composition (10 m of Heavy
  Woods + Mud: 40 m Reckless, 80 m Careful). The choice is the Token HUD
  **Careful movement** toggle (`flags.mwd.carefulMovement`). Careful does not
  negate Bogged, exposure or other terrain consequences; Reckless pays normal
  cost and the hazard-triggered DN 1 check.
- **Ruler (show-only, interim):** the route is coloured green within the
  smallest movement allowance, amber within the largest, red beyond it, dark
  red where impassable. Nothing blocks an over-budget move yet; impassable
  stretches are unreachable to Foundry's pathing.
- **Adapters** (`terrain/terrain-movement-cost.js`): the Terrain behavior's
  `_getTerrainEffects` emits `mwdTerrain` effects for the moving token;
  `MwdTerrainData` (`CONFIG.Token.movement.TerrainData`) composes them and
  prices segments; the token ruler subclass colours them. Only the native
  behavior participates, not the `flags.mwd.terrain` fallback.
- **Later (acceptance criteria):** validate the route against the declared
  action's allowance at movement commit with the same resolver (scripted
  updates can bypass the ruler), including action extensions and GM
  overrides; detect route-wide hazards for the movement-risk check (a route
  can start and end clear but cross ice); Walk / Run / Sprint use their own
  allowances against the same path cost.

### Provisional occupancy effects

Piloting dice apply to piloting rolls. Terrain is a circumstance, so it never changes a task's DN
(design rule in MaxTech-Review.md). Machines only for now; personal-scale terrain follows later
through the same data.

Piloting dice below are the terrain's own (normal-relation) value before the
mobility matrix and stacking.

| Terrain | Movement cost | Piloting dice | Obscuring (1b) |
| --- | --- | --- | --- |
| Road | ×1 | 0 | 0 |
| Open | ×1 | 0 | 0 |
| Rough | ×2 | −1 | 0 |
| Light Woods | ×2 | 0 | 1 |
| Heavy Woods | ×3 | −1 | 2 |
| Light Jungle | ×2 | −1 | 1 |
| Heavy Jungle | ×3 | −1 | 2 |
| Urban | ×2 | 0 | 0 |
| Shallow Water | ×2 | 0 | 0 |

| Condition | Movement cost | Hazardous | Piloting dice |
| --- | --- | --- | --- |
| Mud | ×2 | Yes | −1 |
| Deep Mud (replaces Mud) | ×3 | Yes | −2 |
| Deep Snow | ×2 | Yes | −1 |
| Ice | ×1 | Yes | −1 |
| Sand | ×1 | No | −1 (wheeled, tracked only) |
| Swamp | ×2 | Yes | −1 |
| Rubble | ×2 | No | −1 |

## 1b. Line of effect (designed, not built)

When an attack, Acquire, or spot resolves, a provider samples the attacker →
target segment at grid resolution, collects the terrain (and smoke) regions it
crosses (each distinct Region once, including the endpoints' own regions),
**accumulates** their `obscuring` values, and converts the total to the **EW
tracking penalty**: 1 → +1, 2 → +3, 3+ blocks **visual** line of sight (not
physical line of effect; the targeting method and sensors decide whether an
attack is still possible). Dice, never DN; decided 2026-10-22, see
Environment-Catalog.md. Manual `obscuredLight` / `obscuredHeavy` remain as GM
overrides: effective obscuring = max(spatial, manual). Applied once per roll,
with no separate attack-dice obscuration. Derived at resolve time, never stored. Foundry walls
stay the hard line-of-sight blocker.

Open: whether elevation clears an obstruction.

## Authoring

**Native Region Behavior** (decided 2026-10-20). The GM adds a **Terrain
(MWD)** behavior on a Region's Behaviors tab (Region config → Behaviors →
create) and picks the terrain and conditions in its form, which Foundry
generates from the behavior's schema.

- `system.json` declares `documentTypes.RegionBehavior.terrain`;
  `terrain/terrain-region-behavior.js` registers the data model on `init`
  (`RegionBehaviorType` subclass with `terrainClass` and `conditions`) under
  whichever type key Foundry generated (`terrain` or `mwd.terrain`), with a
  plain English label (the system has no localization).
- Registration feature-detects the API and never throws, so it cannot break
  system load.
- The behavior stores data only and handles no Region events; disabling it
  removes the terrain. Behavior create/update/delete hooks trigger
  reconciliation.
- `flags.mwd.terrain` remains a fallback (macros, or if the behavior type is
  unavailable). `getRegionTerrain` prefers an enabled behavior.
- Movement cost uses Foundry v14's terrain movement-cost system
  (`_getTerrainEffects`, `TerrainData`); see "Movement cost".
