# Codebase Map

This document summarizes the active MechWarrior: Destiny system architecture. AppV2 sheets and canonical item types are the supported authoring path. Legacy Anarchy-era files may still exist for compatibility, but they are not the preferred place for new behavior.

---

## Root metadata and tooling

- `system.json` - Foundry manifest: system ID, version, CSS entry, module entry, document types, and compendiums.
- `index.mjs` - Browser entry that boots `src/start.js`.
- `package.json` - Build, test, and compendium maintenance scripts.
- `vite.config.ts` - Vite build configuration for the bundled system module.

---

## Startup and registration

- `src/start.js` - Imports `AnarchySystem` and calls `AnarchySystem.start()`.
- `src/modules/anarchy-system.js` - Central initializer. Registers document classes, AppV2 actor sheets, AppV2 item sheets, handlebars helpers, fonts, combat hooks, and the MWD services on `game.mwd`.
- `src/modules/sheets/register-actor-sheets-v2.js` - Registers all four AppV2 actor sheets.
- `src/modules/sheets/register-item-sheets-v2.js` - Registers the AppV2 item sheets. This is called during init and is now the default item-sheet path.
- `src/modules/sheets/preload-templates.js` - Preloads V2 roots, layout partials, and reusable UI partials.

---

## Core configuration

- `src/modules/constants.js` - System constants, actor/item type keys, monitor IDs, attribute sets, icon paths, and legacy compatibility constants.
- `src/modules/config.js` - User-facing labels and other display configuration.
- `src/modules/enums.js` - Enum builders used by sheets and dialogs.
- `src/modules/system-settings.js` - World settings for themes, GM tools, and runtime options.
- `src/modules/styles.js` - Theme selection helpers used by AppV2 sheets.
- `src/modules/document-type-defaults.js` - Resolves create-time actor/item defaults from an inlined JS constant. The data previously lived in `template.json`; it was moved here to eliminate the deprecated Foundry `template.json` mechanism.

---

## Actor framework

### Document classes

- `src/modules/actor/mwd-actor.js` - MWD base actor class. Owns edge pools, shared actor helpers, and create-time defaults.
- `src/modules/actor/base-actor.js` - Lower-level actor base with shared Anarchy/MWD mechanics helpers.
- `src/modules/actor/character-actor.js` - Character/NPC actor preparation.
- `src/modules/actor/vehicle-actor.js` - Vehicle actor preparation.
- `src/modules/actor/battlemech-actor.js` - BattleMech actor preparation, loadout helpers, and mech-specific rolls.
- `src/modules/actor/actor-damage.js` - Legacy damage helper retained for older flow compatibility; machine attack consequences use queued mutations and HarmEngine.

### AppV2 actor sheets

- `src/modules/sheets/base-actor-sheet-v2.js` - Shared AppV2 actor-sheet foundation. Provides edit/view mode, staged form submission, persistent actor/token writes, tab state, monitor actions, roll routing, and baseline owned-item actions.
- `src/modules/sheets/character-sheet-v2.js` - Reference actor sheet. Richest actor-specific context shaping, edge console, burn state, and monitor prep.
- `src/modules/sheets/npc-sheet-v2.js` - Layout-driven NPC sheet using `templates/v2/actor/npc-sheet.hbs` plus `templates/v2/layouts/npc.layout.json`.
- `src/modules/sheets/vehicle-sheet-v2.js` - Layout-driven vehicle sheet using `templates/v2/actor/vehicle-sheet.hbs` plus `templates/v2/layouts/vehicle.layout.json`.
- `src/modules/sheets/battlemech-sheet-v2.js` - Layout-driven BattleMech sheet using `templates/v2/actor/battlemech-sheet.hbs` plus `templates/v2/layouts/battlemech.layout.json`.
- `src/modules/sheets/actor-sheet-support.js` - Shared field and owned-item record helpers used to keep the non-character sheets thin.

### Legacy actor sheets

- `src/modules/actor/anarchy-actor-sheet.js`
- `src/modules/actor/character-sheet.js`
- `src/modules/actor/character-npc-sheet.js`
- `src/modules/actor/character-tabbed-sheet.js`
- `src/modules/actor/character-base-sheet.js`
- `src/modules/actor/vehicle-sheet.js`
- `src/modules/actor/battlemech-sheet.js`

These remain for compatibility and historical reference, but the supported authoring path is the AppV2 sheet stack under `src/modules/sheets`.

---

## Item framework

### Document classes

- `src/modules/item/anarchy-base-item.js` - Shared item document base. Handles canonical type remapping, creation defaults, modifier helpers, and equipped-effect sync.
- `src/modules/item/item-type-utils.js` - Pure helpers for canonical item types, legacy type detection, and default icons.
- `src/modules/item/skill-item.js` - Skill items.
- `src/modules/item/weapon-item.js` - Personal and mech weapon items.
- `src/modules/item/armor-item.js` - Armor item mechanics and armor profile access.
- `src/modules/item/gear-item.js` - Generic gear items.
- `src/modules/item/contact-item.js` - Contact items.
- `src/modules/item/asset-module-item.js` - Asset module items.
- `src/modules/item/lifemodule-item.js` - Life module items.
- `src/modules/item/quality-item.js` - Trait/quality items.

### AppV2 item sheets

- `src/modules/item/base-item-sheet.js` - Shared AppV2 item-sheet foundation. Provides the single root-template selector, incremental field syncing, full-form submission, effect management, layout loading, and shared sheet context.
- `src/modules/item/weapon-item-sheet.js` - Weapon-sheet specialization shared by personal and mech weapons.
- `src/modules/item/personal-weapon-item-sheet.js` - Personal weapon sheet with attack/reload affordances.
- `src/modules/item/mech-weapon-item-sheet.js` - Mech weapon sheet.
- `src/modules/item/armor-item-sheet.js` - Armor sheet with active armor/loadout context.
- `src/modules/item/skill-item-sheet.js`
- `src/modules/item/gear-item-sheet.js`
- `src/modules/item/contact-item-sheet.js`
- `src/modules/item/quality-item-sheet.js`
- `src/modules/item/asset-module-item-sheet.js`
- `src/modules/item/lifemodule-item-sheet.js`

Every supported item sheet now has one authoritative AppV2 root template under `templates/v2/item/` and a matching layout definition under `templates/v2/layouts/` when it is layout-driven.

---

## Layout and shared form infrastructure

- `src/modules/layout/layout-registry.js` - Loads and normalizes JSON layout definitions for AppV2 sheets.
- `src/modules/sheets/document-sheet-form.js` - Shared helpers for collecting and coercing AppV2 form field updates.
- `templates/v2/layouts/` - Declarative layout JSON files for actor and item sheets.
- `templates/v2/ui/` - Shared AppV2 layout nodes and reusable actor/item UI partials.

---

## Rolling, harm, and combat

- `src/modules/roll/mwd-roll.js` - Primary MWD roll orchestration pipeline.
- `src/modules/roll/mwd-roll-dialog.js` - AppV2 roll dialog.
- `src/modules/roll/intent/` - Intent resolvers for skill, defense, attack, edge, initiative, and related flows.
- `src/modules/combat/combat-manager.js` - Attack/defend/apply-damage flow.
- `src/modules/harm/harm-engine.js` - Harm application service for GM harm, chat-card damage apply, and queued machine attack consequences.
- `src/modules/harm/harm-engine-utils.js` - Pure harm helpers extracted for testing and easier debugging.

---

## Traits, modifiers, and MWD helpers

- `src/modules/mwd/skills.js` - Skill definitions and lookup helpers.
- `src/modules/mwd/battlemech-loadout.js` - Mech mount/loadout computation.
- `src/modules/mwd/traits.js` - Trait normalization, trait facts, and trait mutation hooks.
- `src/modules/modifiers/provider-registry.js` - Modifier provider aggregation.
- `src/modules/modifiers/providers/` - Individual modifier providers.

---

## Templates, styles, and localization

- `templates/v2/` - Active AppV2 templates for sheets, roll UI, and shared layout/UI partials.
- `templates/` - Legacy templates that still support legacy dialogs, chat, or old sheet classes.
- `src/styles/` - SCSS sources for the system styles.
- `styles/mwd.css` - Compiled CSS loaded by Foundry.
- `lang/en.json` - English localization strings.

---

## Tests and supporting tools

- `tests/` - Minimal Node-based tests for pure and near-pure modules such as layout normalization, default resolution, item type normalization, form coercion, and harm helpers.
- `tools/` - Compendium maintenance and JSON validation scripts.
- `src/packs/` - Source data for the packaged compendiums.
