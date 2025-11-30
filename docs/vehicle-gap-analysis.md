# Vehicle Handling Gap Analysis

## Mech-scale vehicle rules from MWD.pdf (transcribed excerpts)
> "If a 'Mech's head or torso location is destroyed, if the MechWarrior is killed, or the 'Mech suffers either an ammo explosion critical hit or two engine critical hits ... the 'Mech is out of commission for the rest of the battle."
> "Combat Vehicle: If any of a combat vehicle's locations loses all its Structure, or if the unit suffers an ammo explosion, then the vehicle is destroyed."
> "Whenever a unit takes Structure damage in any location or a 2 is rolled for a hit location, roll 2D6. On a result of 8+, that location suffers one critical hit."
> "Combat vehicles can suffer critical hits in the following locations: Front ... Crew Compartment hit (3 Physical Damage to all crew) ... Front Weapon Group is destroyed ... Motive system damaged (–2 maximum Movement) ... Turret ... Rotor (VTOLs only ... destroying the Structure of a VTOL's rotor destroys the unit) ... Rear ... Ammo explosion (vehicle destroyed) ... –1 maximum Movement."
> "Catastrophic damage ... Combat Vehicle: Crash damage, ammo explosion."

## Current Anarchy vehicle handling
- Vehicle actors largely mirror characters: they expose initiative and defense helpers but only compute total Structure as a single monitor without location tracking or critical modeling.【F:src/modules/actor/vehicle-actor.js†L19-L57】
- Attack resolution simply compares hits, subtracts armor/resistance, and applies aggregate monitor damage via `ActorDamageManager.sufferDamage`, with no hit-location rolls, location Structure tracking, or critical-hit hooks for vehicles or 'Mechs.【F:src/modules/combat/combat-manager.js†L13-L89】【F:src/modules/actor/actor-damage.js†L19-L108】

## Gap list: Anarchy vs. MDW vehicle rules
1. **Hit locations**: MDW requires every damage group to roll a location (with special head rules), but the current system never rolls or stores hit locations for vehicles or 'Mechs.【F:docs/vehicle-gap-analysis.md†L5-L9】【F:src/modules/combat/combat-manager.js†L13-L89】
2. **Location-based Structure**: Vehicles in MDW track Structure per facing (front/turret/rear) and lose the unit when any location is stripped, while the system only has a single Structure monitor with no per-location thresholds.【F:docs/vehicle-gap-analysis.md†L4-L9】【F:src/modules/actor/vehicle-actor.js†L19-L57】
3. **Automatic critical resolution**: MDW calls for an automatic 2D6 critical check on Structure loss or a hit roll of 2, plus tables of effects by location, but the current damage flow applies raw damage and stops—no critical check or effect application exists.【F:docs/vehicle-gap-analysis.md†L7-L9】【F:src/modules/actor/actor-damage.js†L19-L108】
4. **Crew consequences and catastrophic damage**: MDW distinguishes vehicle destruction from crew fate (catastrophic damage triggers ejection/abandonment options), whereas the system ties damage only to vehicle monitors and offers no crew injury or bailout handling.【F:docs/vehicle-gap-analysis.md†L4-L8】【F:src/modules/combat/combat-manager.js†L13-L89】
5. **Movement/weapon degradation**: MDW critical tables explicitly reduce Movement and destroy weapon groups based on hit location; current combat resolution cannot alter vehicle Movement or weapon state when damage is applied.【F:docs/vehicle-gap-analysis.md†L6-L8】【F:src/modules/actor/actor-damage.js†L19-L108】

## How existing damage thresholds relate to criticals
The current vehicle track already imposes negative modifiers at damage thresholds, but those penalties are **not** the same as MDW-style criticals. Threshold penalties can remain as a universal “system strain” mechanic that applies to every vehicle; criticals layer on top to represent **location-specific failures** (weapon groups, motive systems, crew hits, ammo). In play: keep the existing threshold penalties as a baseline degradation, and add critical checks when location-tagged rules say so (Structure loss, hit roll of 2, or catastrophic results).

## Middle-ground “cue-lite” vehicle handling
A compact drop-in that preserves Anarchy’s single pools while adding Destiny-flavored hit locations and crits:

1. **Shared Armor/Structure**: Keep one Armor and one Structure track per vehicle. Damage is applied to these pools after a **hit location roll** (Front/Sides/Rear/Core for vehicles; add Head/Torso for ’Mechs) so you can tag the impact even without per-location pools.
2. **Thresholds + critical triggers**:
   - Keep the existing **Structure thresholds** that impose global penalties as a simple degradation curve.
   - Add a **critical check** whenever Structure is reduced (or on a hit roll of 2). Roll 2D6; on 8+ apply an effect based on the rolled location: weapon group disabled, motive/rotor penalty, crew compartment harm, ammo risk, or catastrophic result. This makes location matter without extra tracks.
3. **Soft location stress (optional)**: Track a small stress counter per location (Front/Sides/Rear/Core/Head/Turret/Rotor). Hitting the same location repeatedly escalates its effects (e.g., second Motive hit = –2 Movement, third = immobilized), but still draws from the shared Structure pool.
4. **Catastrophic endpoints**: Hitting 0 Structure, rolling an ammo explosion, or maxing out a location’s stress ends the vehicle (immobilized/destroyed) and hands the crew an eject/abandon/injury decision. No location Structure bookkeeping required.
5. **Minimal data model changes**:
   - Store the **rolled hit location** with each attack resolution.
   - Keep the existing Structure thresholds for global penalties; add a **critical resolver** keyed by location to adjust movement caps, disable weapon groups, and surface crew outcomes.
   - Surface catastrophic flags to the combat manager so initiative/turn order can retire destroyed or abandoned units cleanly.

## How heat is handled and how to hybridize it
- **MWD heat loop (summary)**: Mech-Scale attacks list a **Heat rating**; firing adds that many heat points. Each unit has a **Heat Capacity** and loses a fixed amount in the **End Phase**. Crossing key thresholds imposes **attack/defense penalties**, with high heat triggering **shutdown/ammo risk checks** or forcing a **shutdown to vent**, and catastrophic spikes can cook off ammunition. The loop is: declare attacks → add heat tokens → apply weapon damage → end phase dissipates heat → if current heat exceeds thresholds, apply penalties/checks.
- **Hybrid proposal for single-pool vehicles**:
  - Give every vehicle/’Mech a short **Heat track** (0–3/4 tokens) and a **Vent value** (tokens removed at end of turn). Weapons keep a **Heat cost** tag.
  - **Heat bands**: 0–1 = nominal (no effect); 2 = running hot (–1 die on attacks); 3 = overheated (attack/defense –1 die and mandatory **Overheat check**: Piloting vs TN 2 or pick *Shutdown next action* or take a **critical check**). 4+ immediately forces **shutdown** and a critical check.
  - **Shutdown**: skip actions next turn, clear to 1 Heat, then reboot as a simple action (no per-location tracking needed). If an ammo-carrying weapon fired while at 3+ Heat, roll a **catastrophic ammo check**: on failure, treat as ammo explosion critical.
  - **End of turn**: remove **Vent** tokens (default 1) to return toward safe bands; Shadow Amps/tags can raise Vent or add situational cooling (e.g., +1 Vent if no weapons fired this round).
  - This keeps the **decision loop** (heat budgeting, shutdown risk, ammo danger) without needing location heat sinks or per-weapon bookkeeping beyond a single Heat cost.

## Applicability: 'Mechs vs. other vehicles
- **'Mechs**: Use Head, Torso, Sides, Rear, and Core as locations. Threshold penalties keep a familiar degradation track, while location-tagged crits handle cockpit/torso destruction, ammo/engine failures, and weapon-group losses without per-location Structure.
- **Standard combat vehicles (tanks, ships, aircraft, VTOLs)**: Roll Front/Side/Rear/Turret/Rotor as appropriate. Threshold penalties apply universally, and location-tagged crits cover crew compartment injury, turret/weapon disablement, motive/rotor penalties, ammo explosions, and catastrophic immobilization. The same single Armor/Structure pools power both use cases.
