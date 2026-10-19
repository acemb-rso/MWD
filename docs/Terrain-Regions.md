# Terrain Regions

Design for review item #1 (see [MaxTech-Review.md](MaxTech-Review.md)).
**Status:** 1a (occupancy) core implemented: catalog, terrain statuses, region
sources in the area-status controller, vehicle affinity. Authoring pending a
decision. 1b (line of effect) designed here, not yet built. All magnitudes are **provisional, to be set by playtesting**,
and live in data.

## Model

A GM marks a Foundry Region with a **terrain class** and optional
**conditions**. The terrain catalog (`terrain/terrain-catalog.js`) is the
single source of truth for what each one means:

| Field | Used by | Meaning |
| --- | --- | --- |
| `statusId` | 1a occupancy | Status projected onto machines inside the region; its mechanics live in `status-modifiers.js` |
| `vehicleTerrainClass` | 1a affinity | Maps to the vehicle profile vocabulary (road, open, rough, forest, urban, water) for favored/adverse terrain |
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
- **Vehicle terrain affinity** (activates `favoredTerrain` / `adverseTerrain`):
  terrain statuses declare their `vehicleTerrainClass`; a vehicle occupying
  favored terrain gains Piloting dice, adverse terrain costs Piloting dice
  (provisional ±1).
- Terrain *triggers* persistent consequences (bog-down, reckless movement:
  review #4) but does not own them.

### Provisional occupancy effects

Movement penalty is in movement steps (30 m each); Piloting DN applies to
piloting checks. Machines only for now; personal-scale terrain follows later
through the same data.

| Terrain | Movement | Piloting DN | Vehicle class | Obscuring (1b) |
| --- | --- | --- | --- | --- |
| Road | 0 | 0 | road | 0 |
| Open | 0 | 0 | open | 0 |
| Rough | −1 | 0 | rough | 0 |
| Light Woods | −1 | 0 | forest | 1 |
| Heavy Woods | −2 | +1 | forest | 2 |
| Jungle | −2 | +1 | forest | 2 |
| Urban | −1 | 0 | urban | 0 |
| Water | −1 | +1 | water | 0 |

| Condition | Movement | Piloting DN |
| --- | --- | --- |
| Mud | −1 | +1 |
| Deep Snow | −1 | +1 |
| Ice | 0 | +2 |
| Sand | 0 | +1 |
| Swamp | −1 | +1 |
| Rubble | −1 | 0 |

## 1b. Line of effect (designed, not built)

When an attack, Acquire, or spot resolves, a provider samples the attacker →
target segment at grid resolution, collects the terrain regions it crosses
(each once, including the endpoints' own regions), sums their `obscuring`
values, and emits a dice/DN part. Derived at resolve time, never stored.
Foundry walls stay the hard line-of-sight blocker. This replaces target-side
`obscuredLight` / `obscuredHeavy` for terrain-based obscuring.

Open: magnitude per obscuring point; whether a total of 3 blocks line of
effect; whether elevation clears an obstruction.

## Authoring (decision pending)

| Option | Pros | Cons |
| --- | --- | --- |
| **Native Region Behavior** (`documentTypes.RegionBehavior` + a behavior data model) | Native Region config form; idiomatic Foundry | New pattern in this codebase; v14 API unverified here, a wrong registration can break system load |
| **GM tool** writing a region flag (`flags.mwd.terrain`) | Uses known APIs only; no load risk | Extra UI to build; not in the native Region editor |

Both write data that `getRegionTerrain` reads.
