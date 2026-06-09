# Codebase Map

This document summarizes the active MechWarrior: Destiny system architecture. AppV2 sheets and canonical item types are the supported authoring path.

---

## Root metadata and tooling

- `system.json` - Foundry manifest: system ID, version, CSS entry, module entry, document types, and compendiums.
- `index.mjs` - Browser entry that boots `src/start.js`.
- `package.json` - Build, test, and compendium maintenance scripts.
- `vite.config.ts` - Vite build configuration for the bundled system module.

---

## Startup and registration

- `src/start.js` - Imports `AnarchySystem` and calls `AnarchySystem.start()`.
- `src/modules/anarchy-system.js` - Central initializer. Sets `CONFIG.Actor.documentClass = MWDActor` and `CONFIG.Item.documentClass = MWDItem`. Registers AppV2 actor sheets, AppV2 item sheets, handlebars helpers, fonts, combat hooks, and MWD services on `game.mwd`.
- `src/modules/sheets/register-actor-sheets-v2.js` - Registers all four AppV2 actor sheets.
- `src/modules/sheets/register-item-sheets-v2.js` - Registers the AppV2 item sheets.
- `src/modules/sheets/preload-templates.js` - Preloads V2 roots, layout partials, and reusable UI partials.

---

## Core configuration

- `src/modules/constants.js` - System constants, actor/item type keys, monitor IDs, attribute sets, icon paths, `ROLL_PARAMETER_CATEGORY`, and legacy compatibility constants.
- `src/modules/config.js` - User-facing labels and other display configuration.
- `src/modules/enums.js` - Enum builders used by sheets and dialogs.
- `src/modules/system-settings.js` - World settings for themes, GM tools, and runtime options.
- `src/modules/styles.js` - Theme selection helpers used by AppV2 sheets.
- `src/modules/document-type-defaults.js` - Resolves create-time actor/item defaults from an inlined JS constant.

---

## Actor framework

### Document classes

`CONFIG.Actor.documentClass = MWDActor`. All actors at runtime are `MWDActor` instances. There is no per-type class routing — `MWDActor` handles all four actor types (`character`, `npc`, `vehicle`, `battlemech`) with type-specific branches inside its methods.

- `src/modules/actor/mwd-actor.js` - **The single live actor document class.** Owns `prepareBaseData`, `prepareDerivedData`, edge pools, monitor derivation (including physical.max = 8+STR, fatigue.max = 8+WIL for character-like actors), armor loadout, personal combat derived data, and all actor helpers called by live sheets and roll code.

### AppV2 actor sheets

- `src/modules/sheets/base-actor-sheet-v2.js` - Shared AppV2 actor-sheet foundation. Provides edit/view mode, staged form submission, persistent actor/token writes, tab state, monitor actions, roll routing, and baseline owned-item actions.
- `src/modules/sheets/character-sheet-v2.js` - Character actor sheet. Edge console, burn state, condition monitors, life modules, skills, quick actions.
- `src/modules/sheets/npc-sheet-v2.js` - Layout-driven NPC sheet.
- `src/modules/sheets/vehicle-sheet-v2.js` - Layout-driven vehicle sheet.
- `src/modules/sheets/battlemech-sheet-v2.js` - Layout-driven BattleMech sheet.
- `src/modules/sheets/actor-sheet-support.js` - Shared field and owned-item record helpers used to keep the non-character sheets thin.

---

## Item framework

### Document classes

- `src/modules/item/anarchy-base-item.js` - **`MWDItem`: the single live item document class.** Shared item document base. Handles canonical type remapping, creation defaults, modifier helpers, and equipped-effect sync.
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

- `src/modules/item/base-item-sheet.js` - Shared AppV2 item-sheet foundation.
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

---

## Layout and shared form infrastructure

- `src/modules/layout/layout-registry.js` - Loads and normalizes JSON layout definitions for AppV2 sheets.
- `src/modules/sheets/document-sheet-form.js` - Shared helpers for collecting and coercing AppV2 form field updates.
- `templates/v2/layouts/` - Declarative layout JSON files for actor and item sheets.
- `templates/v2/ui/` - Shared AppV2 layout nodes and reusable actor/item UI partials.

---

## Rolling, harm, and combat

- `src/modules/roll/mwd-roll.js` - Primary MWD roll orchestration pipeline. **The canonical roll entry point.**
- `src/modules/roll/mwd-roll-dialog.js` - AppV2 roll dialog.
- `src/modules/roll/intent/` - Intent resolvers for skill, defense, attack, edge, initiative, and related flows.
- `src/modules/combat/personal-action-catalog.js` - Declarative personal combat action catalog. Normalizes legacy rows into the canonical `cost` / `resolver` / `prompt` / `implementation` shape and backfills newly shipped defaults into customized worlds.
- `src/modules/combat/personal-combat-actions.js` - Central personal combat action executor. Sheets emit `combatIntent`; this layer resolves prompts, spends/logs action cost, dispatches to resolver families, and hands off to the roll engine only when dice are required.
- `src/modules/combat/personal-combat-tracker.js` - Personal-combat activation and action-economy state: SA/FA/RA, Burn integration, activation log, reaction fallback, and tracker state used by the action executor.
- `src/modules/mwd/machine-action-catalog.js` - Declarative Vehicle/BattleMech action catalog. Machine actions carry canonical `actionCost`, resolver ownership, prompts, payload ids, and implementation state while preserving legacy cost fields used by remedies and EW.
- `src/modules/mwd/machine-quick-actions.js` - Central machine action executor. Existing sheet quick actions and catalog-driven `kind: "action"` payloads route through movement, attack, targeting/EW, remediation, recovery, interaction, heat danger, and pending heat/strain services.
- `src/modules/anarchy-combat.js` - System-level combat hooks and integration points used during combat lifecycle and activation.
- `src/modules/harm/harm-engine.js` - Harm application service for GM harm, chat-card damage apply, and queued machine attack consequences.
- `src/modules/harm/harm-engine-utils.js` - Pure harm helpers extracted for testing and easier debugging.

---

## Traits, modifiers, and MWD helpers

- `src/modules/mwd/skills.js` - Skill definitions and lookup helpers.
- `src/modules/mwd/battlemech-loadout.js` - Mech mount/loadout computation.
- `src/modules/mwd/rules.js` - Shared declarative rule contribution evaluator. Normalizes rule carriers, selectors, prerequisites, output packets, preview limits, usage commits, and summaries without applying domain outcomes.
- `src/modules/mwd/traits.js` - Trait normalization, trait facts, optional roll-dialog trait modifiers, derived personal-combat hooks, and the `system.traitMods.*` ActiveEffect bridge.
- `src/modules/mwd/asset-module-effects.js` - Asset-module rule/effect bridge. Native `system.rules[]` are primary; legacy `system.effects[]` are fallback compatibility data for existing helper APIs.
- `src/modules/modifiers/provider-registry.js` - Modifier provider aggregation.
- `src/modules/modifiers/providers/` - Individual modifier providers.

---

## Templates, styles, and localization

- `templates/v2/` - Active AppV2 templates for sheets, roll UI, and shared layout/UI partials.
- `src/styles/` - SCSS sources for the system styles.
- `styles/mwd.css` - Compiled CSS loaded by Foundry.
- `lang/en.json` - English localization strings.

---

## Tests and supporting tools

- `tests/` - Minimal Node-based tests for pure and near-pure modules such as layout normalization, default resolution, item type normalization, form coercion, and harm helpers.
- `tests/personal-action-catalog.test.mjs` - Declarative personal action catalog normalization, validation, and default-backfill coverage.
- `tests/machine-action-catalog.test.mjs` - Declarative machine action catalog coverage for resolver ownership, canonical cost shape, aliases, action anchors, and explicit stubs.
- `tools/` - Compendium maintenance and JSON validation scripts.
- `tools/generate-asset-module-pack.mjs` - Source of truth for generated asset-module compendium data. Emits primary `system.rules[]` plus temporary legacy compatibility mirrors.
- `src/packs/` - Source data for the packaged compendiums.
