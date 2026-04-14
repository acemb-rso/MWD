# Feature Prioritization: MWD Next Steps

## Context
Analysis of design docs (25 files in /docs/) and codebase state to identify the highest-value next features to implement. The system architecture is mature; the gaps are primarily game mechanics and sheet wiring.

One important correction to memory: system.mwd block IS already in template.json (lines 101-201 cover heat, locations, crew, weapons, hardpoints). The memory note saying it's missing is stale.

## __Recommended Feature Order__

## Tier 1 — Core Gameplay Blockers
These block meaningful vehicle/mech play entirely.

1. Vehicle & BattleMech Sheet Layout Wiring

The sheet classes exist and are registered (V2), but render as shells
No _prepareContext override; still using legacy .hbs templates
Fix: port NpcSheetV2, VehicleSheetV2, BattlemechSheetV2 to layout-driven rendering following CharacterSheetV2 pattern
Files: src/modules/sheets/npc-sheet-v2.js, vehicle-sheet-v2.js, battlemech-sheet-v2.js
Design doc: docs/codebase-map.md lines 54-56

2. Hit Location & Critical Hit Workflow

Per-attack hit location rolls (3d6 table) are not yet implemented
Critical hits (triggered on Structure loss or natural 2 hits) have no workflow
Crit effects: weapon disabled, motive penalty, crew injury, ammo explosion, turret lock, engine/gyro/sensor damage
system.mwd data is in template.json; just needs roll + resolution logic
Files: new src/modules/combat/hit-location.js; extend actor-damage.js
Design doc: docs/vehicle-gap-analysis.md, docs/combat-flow-design.md
Tier 2 — High Value, Standalone
These can be done in any order; each delivers visible player-facing value.

3. Item Sheet Layouts — Remaining 7 Types

Only personalWeapon and armor have JSON layout definitions
7 types still use direct .hbs: skill, quality, gear, contact, assetModule, lifeModule, mechWeapon
mechWeapon is particularly important given mech play focus
Files: src/modules/item/layouts/ (add 7 new .layout.json files); update item sheet classes
Design doc: docs/item-data-review.md lines 259-273

4. Area Effects — Exposure UI & Hazard Tools

Backend exposure logic added (per recent commit), but hazard visualization and GM creation tool not yet built
Four-tier exposure system: Full/Major/Minor/None
Persistent hazard state tracking (escalation, evade lockout)
Token overlay for exposure tier
Design doc: docs/Area-Effects.md
5. Character Data Completions

XP tracker: no template field; add to template.json + expose in character sheet
Cues & Dispositions: free-text only; design doc calls for structured array or item type
Keywords/Words: same — no structured field
Files: template.json, src/modules/sheets/character-sheet-v2.js
Design doc: docs/character-data-review.md lines 20-41

## Tier 3 — Polish & Completeness

6. firstAid Combat Action Handler

The only unimplemented action in the personal combat tracker
personal-action-catalog.js line 46 notes "Recovery resolver not yet implemented"
Small self-contained implementation once hit/damage rules are solid

7. Weapon Mounting Validation

MP budget enforcement, primary legality, hardpoint availability not enforced at actor update time
Design is fully specified; just needs validation code wired into actor update hooks
Files: src/modules/actor/battlemech-actor.js, docs/weapon-mounting-system.md
8. Dead Code Cleanup

Legacy .hbs templates (templates/v2/item/personal-weapon.hbs, etc.) can be deleted once layout-driven sheets land

Minor but reduces confusion

Verification (per feature)
Sheet wiring: Open a vehicle/mech actor; all stat panels and monitors should render, no template errors in console
Hit locations: Make an attack against a vehicle; hit location roll fires, location receives damage, crit check triggers on Structure loss
Item layouts: Open each item type; fields display correctly, modifiers section works
Area effects: GM places hazard zone; tokens in zone show exposure overlay; Evade action reduces tier
Character data: XP field visible and editable on character sheet; Cues/Dispositions structured entries work

Current State — Why They're Shells
Both sheets are ~15 lines. They extend BaseActorSheetV2 but only configure a window size and point at legacy .hbs templates. No _prepareContext(), no action handlers, no layout JSON.

The legacy templates (templates/actor/vehicle.hbs, battlemech.hbs) use the old Anarchy partial/tab system — they're functional but not V2-native.

What the Actor Classes Already Provide
The actors actually prepare a lot of derived data that just isn't surfaced:

VehicleActor: system.mwd.attributes (handling/system/chassis/condition), system.mwd.monitors (structure), system.mwd.items (classified item buckets)
BattlemechActor (extends VehicleActor): adds system.mwd.heat, system.mwd.loadout, system.mwd.weaponGroupDetails, system.weaponGroups, system.meleeProfiles, system.quickActions
The data is ready — the sheet just isn't consuming it through the V2 system.

What Needs to Be Built
Piece	Details
Layout JSON (2 files)	vehicle.layout.json, battlemech.layout.json — define tabs, panels, partial slots
Root HBS templates (2 files)	Follow character sheet pattern: {{> "mwd.v2.ui.layout-root" node=layout.root}}
_prepareContext() overrides	Build semantic models (attribute pips, monitor segments, weapon group data, heat bands) from already-prepared actor data
HBS partials (~6-8 files)	Vehicle attributes, monitors, weapon list; Mech heat track, weapon groups with attack buttons, hardpoints display, quick-action buttons
Action handlers	mechAttack, mechRoll for mech; editOwnedItem/deleteOwnedItem for both
The character sheet (character-sheet-v2.js) is the complete reference — _buildMonitorModel(), action handler signatures, inventory accordion patterns all transfer directly.

Recommended Sequence
Do BattlemechSheetV2 first — it's the flagship type and has the richest data to surface. VehicleSheetV2 is a subset of the same work. Within each: layout JSON → root template + partials → _prepareContext() → action handlers.

# Implementation Plan: Mech/Vehicle Sheets + First-Pass Hit/Crit Workflow

## Summary

Implement this as **two linked milestones**, with **NPC sheet work out of scope** for now.

- **Milestone 1: Vehicle/BattleMech AppV2 sheet wiring**  
  Effort: **medium**. Mostly layout/context/template work.
- **Milestone 2: generic 3d6 hit-location + crit workflow for mech/vehicle attacks**  
  Effort: **large**. This is not just `actor-damage.js`; it must hook the live attack pipeline, queued damage preview, and final damage application flow.

The repo already helps here:
- `template.json` and `migrations.js` already provide most `system.mwd` scaffolding.
- `BattlemechActor` already prepares heat, weapon groups, melee profiles, and quick actions.
- The biggest missing pieces are **AppV2 sheet context/rendering** and **combat pipeline integration**.

## Implementation Changes

### 1. Vehicle / BattleMech AppV2 sheet wiring
- Port `src/modules/sheets/vehicle-sheet-v2.js` and `battlemech-sheet-v2.js` to the `CharacterSheetV2` pattern:
  - add `_prepareContext`
  - use layout-driven rendering
  - expose prepared `system.mwd`, monitors, crew/pilot snapshot, quick actions, weapon groups, melee profiles
- Add real AppV2 templates/layout JSON for vehicle and BattleMech sheets; the current BattleMech V2 template is effectively empty, so this requires template work, not only sheet-class work.
- Keep quick-action buttons as intent emitters only; route them through existing actor helpers / roll payloads.
- Leave `npc-sheet-v2.js` untouched in this milestone.

### 2. Hit-location engine
- Add a new mech/vehicle hit-location helper, e.g. `src/modules/combat/hit-location.js`, that owns:
  - generic first-pass 3d6 table
  - mapping result to a normalized location key
  - “critical-result” outcomes from the table
  - helper output shape for chat/render/damage application
- First-pass table assumption:
  - use the generic 3d6 rules from `docs/rules conventions.md`
  - translate results into the existing `system.mwd.locations` keys for mechs/vehicles
  - if a rolled generic location does not map cleanly to the actor’s enabled locations, fall back deterministically to the nearest valid location for that unit type

### 3. Crit workflow and damage integration
- Do **not** bolt this only onto `actor-damage.js`; the active path is:
  - `resolve-attack.js`
  - `attack-resolution.js`
  - `chat-actions.js`
  - `harm-engine.js`
- Extend attack resolution so each mech/vehicle target result carries:
  - rolled hit location
  - whether a crit check is required
  - provisional crit preview/result metadata
- Expand harm/damage application to support mech/vehicle actors, because `HarmEngine` currently supports character/npc harm only.
- On final damage application:
  - detect structure loss
  - trigger crit checks on structure loss and forced critical results from the hit table
  - mutate `system.mwd.locations[*].stress`, `system.mwd.crits`, and `system.mwd.status`
  - apply first-pass crit effects:
    - weapon disabled
    - motive penalty
    - crew injury
    - ammo explosion
    - turret lock
    - engine/gyro/sensor damage
- Keep the first version declarative:
  - crit records are written to `system.mwd.crits`
  - actor prep/sheet context derives displayable effects from those records
  - avoid hardcoding rules into sheet templates

### 4. Chat card and sheet surfacing
- Update attack card rendering so mech/vehicle results show:
  - hit location
  - crit trigger/check result
  - queued or applied crit outcome
- Add lightweight sheet display for:
  - active crits
  - location stress/destroyed state
  - current status
- Keep first-pass UX simple: visible and inspectable, but not yet deep interactive management.

## Test Plan

- Sheet context tests:
  - vehicle and BattleMech sheets render with populated monitors, heat, loadout, and quick actions
  - no dependency on legacy actor templates
- Hit-location tests:
  - 3d6 results map correctly to first-pass generic outcomes
  - mapping from generic result to enabled actor locations is deterministic
- Crit workflow tests:
  - structure loss triggers crit check
  - forced critical hit results produce crit records
  - ammo explosion / motive / turret / crew / engine-style crits update `system.mwd` correctly
- Damage pipeline tests:
  - attack preview includes location/crit metadata
  - apply-damage step persists stress/crits/status
  - character/personal combat flow remains unchanged

## Assumptions and Defaults

- Scope is **vehicle + BattleMech only**; NPC AppV2 migration is deferred.
- First pass uses the **generic 3d6 hit table**, even though the longer-term target is likely richer unit-specific location behavior.
- Existing `system.mwd` scaffolding in `template.json` and migrations is retained and extended, not redesigned.
- The hit/crit work is implemented in the **current resolver/chat/harm pipeline**, not as a sidecar combat subsystem.
- `actor-damage.js` may still be touched, but it is **not** the main integration point for this milestone.
