# Stabilization Plan

A concise implementation plan to modernize vehicles and BattleMechs without rewriting existing work. Use the structure references in `vehicle_sheet.txt`, `battlemech_sheet.txt`, and the item schema in `Items.txt` as the sources of truth for sheet wiring, actor data, and embedded item preparation.

## Inputs to respect
- **Vehicle sheet layout:** attributes (Handling/System/Condition/Chassis), movement & structure, armor, condition track, action buttons (defense/sensors/stealth/initiative), crew list, driver snapshot, and lists for vehicle skills, upgrade modules, and weapons.【F:docs/vehicle_sheet.txt†L1-L76】
- **BattleMech sheet layout:** mech overview with chassis class/tonnage, shared attribute row, performance (run/jump/heat dissipation), structure/armor monitors, heat track, mount summary, equipment slots, crew/pilot snapshot, mech actions, and the dedicated Weapons & Mounts tab for primary weapon selection and grouped mount editing.【F:docs/battlemech_sheet.txt†L1-L105】
- **Item schemas:** only the item types defined in `Items.txt` are expected (skills, traits, life modules, cues, dispositions, gear, modules, upgrades, equipment, and the weapon types/groups). Prepare embedded documents against these schemas and avoid reintroducing legacy Anarchy item templates.【F:docs/Items.txt†L1-L165】【F:docs/Items.txt†L200-L261】

## Stabilization stages
1. **Data model alignment**
   - Add or confirm MWD vehicle attribute blocks (`handling/system/condition/chassis`) and monitor fields for structure/heat per the sheet definitions.
   - Ensure actor prep populates crew/pilot snapshots, caches core stats used by the action buttons, and prepares embedded items using the canonical schemas (no legacy item flavors).

2. **Sheet wiring sanity pass**
   - Wire the vehicle and BattleMech sheets to expose the layout components above (attribute rows, monitors, action buttons, crew lists, and weapon/equipment lists) so the UI matches the documented structure.
   - Keep the BattleMech Weapons & Mounts tab focused on primary weapon selection and mount groups, leaving melee handling separate.
   - Surface item details according to their schema segments (base/module/weapon blocks and range bands) so embedded items render consistently across vehicles and ’Mechs.

3. **Rule mechanics integration**
   - Layer in MWD-specific logic (hit locations, crit workflows, heat handling, crew/catastrophic states) behind the structured data and sheet panels instead of ad hoc fields.
   - Reuse the cached pilot/driver stats in roll formulas to keep attack/defense/initiative consistent with the action buttons.
   - Apply item-driven modifiers (e.g., module effects, heat modifiers, weapon range bands) through prepared data rather than freeform sheet values.

4. **Validation and tests**
   - Add focused tests for hit-location mapping, crit triggers, heat bands, mount-slot validation, and item schema prep that mirror the documented sheet structures.
   - Include debug logging flags to help verify calculations during stabilization without cluttering normal play.

## Recommended next tasks
- **Add canonical data scaffolding**: create migrations and actor prep helpers that add the MWD vehicle attribute blocks, populate structure/heat monitors, and prepare embedded items exclusively with the schemas from `Items.txt` so later UI wiring has stable data.【F:docs/vehicle_sheet.txt†L1-L76】【F:docs/battlemech_sheet.txt†L1-L105】【F:docs/Items.txt†L1-L165】
- **Wire sheet layouts to references**: update vehicle and BattleMech sheet templates and classes to expose the documented panels—attribute rows, monitors, action buttons, crew/pilot snapshots, and the Weapons & Mounts tab focused on ranged groups—matching the layouts in their reference files.【F:docs/vehicle_sheet.txt†L1-L76】【F:docs/battlemech_sheet.txt†L1-L105】
- **Implement MWD mechanics on structured data**: hook hit-location rolls into attack resolution, route the location key into damage handling, and add crit/heat/status helpers that consume the prepared structure/heat fields and vehicle/mech attributes instead of ad hoc values.【F:docs/vehicle_sheet.txt†L1-L76】
- **Validate mount and item legality**: enforce mount-point and hardpoint budgets for BattleMech weapon groups (primary = 2 MP) and verify embedded item prep rejects unsupported legacy item types, aligning with the `Items.txt` definitions.【F:docs/battlemech_sheet.txt†L1-L105】【F:docs/Items.txt†L1-L165】
- **Add targeted tests and debug hooks**: cover hit-location mapping, crit triggers, heat thresholds, mount validation, and item prep, with optional debug logging to trace calculations during stabilization.
