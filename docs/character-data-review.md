# Character data model review

> **Status:** Updated to reflect current implementation. The original version of this document described stale Anarchy-derived gaps that have since been resolved.

## Current character registration

- `AnarchySystem` sets `CONFIG.Actor.documentClass = MWDActor`. All actors — character, npc, vehicle, battlemech — are `MWDActor` instances. There is no per-type class routing. `MWDActor` handles all four types with internal type-specific branches. 【F:src/modules/actor/mwd-actor.js】

## Actor template definitions

- The `character` type in `src/modules/document-type-defaults.js` declares the correct MWD attribute set: **reflexes, strength, willpower, intelligence, charisma, edge**. The former Anarchy values (`agility`, `logic`) have been replaced.
- Condition monitors are defined for character actors: **physical** (max = 8 + STR), **fatigue** (max = 8 + WIL), **armor** (9-box track). These are prepared as derived data in `MWDActor._prepareMonitors()`. 【F:src/modules/actor/mwd-actor.js】
- Edge pools are structured with both a **rating** (advancement ceiling) and **value** (current spendable tokens): `grit`, `chaos` (physical), `insight`, `rumor` (mental), `legend`, `credibility` (social). Pool hygiene (clamping values to rating, zeroing depleted pools) runs in `MWDActor.prepareBaseData()`. 【F:src/modules/actor/mwd-actor.js†L1-L60】
- The `npc` template mirrors the character attribute and monitor structure, which is correct given the shared class. The NPC sheet simply exposes a smaller subset of those fields.

## Attribute constants

- `constants.js` correctly defines the character attribute set as `reflexes, strength, willpower, intelligence, charisma, edge`. Both `character` and `npc` actor attribute sets reference this configuration. 【F:src/modules/constants.js†L26-L37】

## Known remaining gaps

The following fields documented in `character_sheet.txt` exist as **item types** (embedded documents) rather than scalar template fields, which is the correct approach—but embedding support needs to be verified in character sheet rendering:

| Feature | Current state |
|---------|---------------|
| Life modules | `lifeModule` item type registered; sheet rendering of embedded list TBD |
| Traits / Qualities | `quality` item type registered; quality items now act as item-backed traits with declarative effect packets |
| Cues & Dispositions | No dedicated item type or structured field; currently free-text in description |
| Personal weapons | `personalWeapon` item type registered; rendered in combat section |
| Asset modules | `assetModule` item type registered; rendered as embedded list |
| Gear / Inventory | `gear` item type registered; rendered as embedded list |
| XP tracker | No dedicated field in document-type-defaults.js; not yet implemented |
| Words / Keywords | No structured field; stored in free text if at all |

The `MWDActor` base class prepares `mwd.items` groupings (skills, traits, gear, weapons, etc.) for use by V2 sheets. Character-specific preparation runs in `CharacterActor.prepareDerivedData()`.

## Implications

- Character and NPC sheets can render correctly because the data model is now aligned with MWD attribute requirements.
- The primary outstanding gap is cues/dispositions and XP tracker, which have no template field yet.
- Cues/dispositions should be added to the `character` block in `src/modules/document-type-defaults.js` as structured arrays when the character sheet tab is being wired up, rather than as free-text fields.
