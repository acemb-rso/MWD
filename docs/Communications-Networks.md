# Communications, C3, and Data Networks (future work)

**Status:** not yet designed. Recorded 2026-10-15 so items that depend on
networking have a home. Several pieces already exist without a shared model.
Design that model before adding more network items.

## Scope to design

- **Communications:** comm links between units and personnel; creating,
  boosting, and jamming communications networks (MechWarrior: Destiny
  *Communications* skill, INT); comms loss from critical hits.
- **C3 / data networks:** network membership, node range, sharing of best
  Detection State and best targeting packet (not stacked), network disruption
  and node loss.
- **Network electronic warfare:** jamming and suppression of shared data, IFF,
  beacon/designation sharing, and the counters (EPM, hold link).
- **Personal-scale:** Portable Jamming Device (rulebook gear), communication
  gear category on personal items.

## What already exists

| Piece | Where | State |
| --- | --- | --- |
| Share Sensor Feed / C3 Network Support (1 FA) | `machine-action-catalog.js` `shareTargetingData`; EW panel | Narrative action; requires a C3 module |
| C3 Unit module: best friendly detection state (capped at Track without own lock) and best shared packet | `src/packs/asset-modules` C3 Unit; asset-module runtime best-packet selection | Partial |
| C3 / shared lock counters stealth | `mwd/machine-stealth.js` (`c3SharedLock`, `c3`/`network` keys) | Implemented |
| IFF Jammer: suppresses shared targetingData, C3, IFF-assisted fire, beacon and contact sharing | asset-module pack | Effect text; consumers not verified |
| SLIC Suite: network-wide initiative and sensor dice within 500 m | asset-module pack | Effect text; consumers not verified |
| Suppress Beacon (suppress NARC/TAG/beacon packets) | `machine-action-catalog.js`, `roll/ew-execution.js` | Implemented |
| **Hold Link**: modules grant it dice (Electronic Protection Array, Watchdog CEWS, AR14, SLIC) | asset-module packs | **No action exists** |
| Communicate (free action, personal and machine) | both action catalogs | Narrative |
| Communications / Sensor Suite Out critical hit | `mwd/critical-hits.js` | Crit record and remedy only |
| Vehicle `network` affordance | `mwd/vehicle-profiles.js` | Tag only |
| Communication gear category | `item/gear-item-sheet.js` | Category only |
| C3 rules text | `docs/EW-Systems.md` § C3, TAG, and NARC | Design notes |

## Open questions

1. Is a network an explicit group (roster, range from a master node) or derived
   from installed modules each time it is read?
2. What does losing comms do to a unit that is not on a C3 network?
3. Which skill rolls network actions (Hold Link, network jamming):
   System Operations, or a new Communications skill?
4. How does network jamming relate to ECM Spike / ECM Jamming (machine sensor
   lane) — the same status family or a separate "network" lane?
