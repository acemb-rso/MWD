# Character data model review

## Current character registration
- `AnarchySystem` registers both the `character` and `npc` actor types to the same `CharacterActor` class, so they share behavior and derived data paths rather than having isolated type-specific logic. 【F:src/modules/anarchy-system.js†L74-L110】

## Actor template definitions
- The `character` template in `template.json` only declares agility, strength, willpower, logic, charisma, and edge attributes; it does not include the Reflexes or Intelligence attributes listed in the desired sheet structure, and it lacks life modules, traits, cues, dispositions, personal weaponry, armor details, monitors, asset modules, inventory, and edge pool breakdowns beyond the basic counters. 【F:template.json†L203-L262】
- The `npc` template mirrors the same attribute set and counter structure as `character`, reinforcing that non-player actors inherit the same data footprint rather than a pared-down model. 【F:template.json†L263-L317】

## Attribute catalogs
- System attribute constants define agility and logic instead of reflexes and intelligence, so the schema does not presently align with the requested attribute names. 【F:src/modules/constants.js†L26-L37】
- Both `character` and `npc` actor attribute sets reference the same agility/logic configuration, further demonstrating that the data model does not isolate a unique character definition. 【F:src/modules/constants.js†L122-L151】

## Implications
- Because characters and NPCs share the same actor class and largely identical templates, and the attribute catalog diverges from the requested fields, the current data model does not enforce a single, specific definition of a character. Additional character-only structures (life modules, traits, cues, dispositions, personal weaponry, armor details, condition monitors, asset modules, inventory, edge pools, and experience) are absent from the base template, so sheets cannot draw solely from actor data without mixing in other sources or leaving gaps.
