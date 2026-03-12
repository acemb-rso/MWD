# Codebase Map

This document summarizes the key files in the MechWarrior: Destiny Foundry VTT system and their roles. The V2 (AppV2-based) architecture is the active development target. Legacy Anarchy-era files are noted where they still exist but should not be extended.

---

## Root metadata & build tooling

- `system.json` – Foundry manifest: system ID (`mwd`), version, CSS entry (`/styles/mwd.css`), entry module (`index.mjs`), actor/item type declarations, and compendiums.
- `index.mjs` – Dev entry: exposes `window.global` and bootstraps via `src/start.js`.
- `package.json` – Build scripts (Vite), compendium pack/unpack helpers, JSON schema validation.
- `vite.config.ts` – Vite/Rollup config: ES module library build from `src/start.js`, dev server proxy to localhost:30000, bundle visualizer.

---

## Entry point

- `src/start.js` – Imports `AnarchySystem` and calls `AnarchySystem.start()`.
- `src/modules/anarchy-system.js` – Central initializer. Registers actor/item document classes, modifier providers, V2 actor sheets, handlebars helpers, fonts, and combat class during Foundry's `init` hook. Renders GM Gadget on `ready` if the setting is enabled.

---

## Core configuration

- `src/modules/constants.js` – All system constants: `TEMPLATE` (actor types, item types, attribute names, monitor keys), `ANARCHY_SYSTEM` (roll types, action/defense codes), `ACTOR_ATTRIBUTE_SETS` (per-type attribute arrays), `MONITOR_DEFS`, `EDGE_POOLS`, `ICONS_PATH`, etc.
- `src/modules/config.js` – Localized label strings for actors, items, rolls, monitors, and chat messages. All user-visible text comes from here or `lang/en.json`.
- `src/modules/enums.js` – Enumeration helpers (damage type lookups, etc.), initialized by `AnarchySystem.init()`.
- `src/modules/system-settings.js` – Registers world settings: CSS theme selection, damage mode, GM Gadget toggle.
- `src/modules/styles.js` – Available CSS themes and selection helpers consumed by sheets and dialogs.
- `src/modules/handlebars-manager.js` – Registers Handlebars helpers (iconCheckbarHit, weaponDamageLetter, formatString, etc.) and legacy partials.
- `src/modules/hooks-manager.js` – Extensibility hooks for checkbar registration and style overrides; puts hook names on `globalThis` for external modules.

---

## Actor framework

### Document classes

- `src/modules/actor/mwd-actor.js` – **MWDActor**: the MWD base class (extends AnarchyBaseActor). Owns edge pool API (`getEdgePool`, `spendEdge`, `gainEdge`, `adjustEdgePoolValue`), monitor penalty derivation, skill scaffolding (`_prepareMwdSkills`), and item grouping (`mwd.items`). Type guards: `isCharacterLike()`, `hasSkills()`, `hasEdgePools()`.
- `src/modules/actor/base-actor.js` – **AnarchyBaseActor**: lower-level base providing attribute lookups, damage monitor routing, permission helpers, and the defense roll entry point (`rollDefense`). Does not own edge or MWD-specific logic.
- `src/modules/actor/character-actor.js` – **CharacterActor**: derives physical/fatigue monitor maxes from STR/WIL, computes wound penalties, prepares edge pools. Used for both `character` and `npc` actor types.
- `src/modules/actor/vehicle-actor.js` – **VehicleActor**: prepares MWD attribute block (handling/system/chassis/condition), structure/heat monitors, and item type collections. No dynamic pilot-actor linking.
- `src/modules/actor/battlemech-actor.js` – **BattlemechActor** (extends VehicleActor): adds weapon group management, melee profiles, heat state tracking (safe/runningHot/overheated/shutdown), and quick-action roll methods (ranged attack, melee, dodge, piloting check, sensor sweep, emergency repair).
- `src/modules/actor/actor-damage.js` – **ActorDamageManager**: applies damage through one of four selectable modes (resistanceArmorMonitor, armorResistanceMonitor, armorGivesResistance, armorGiveResistanceHitsAvoid). Entry point: `ActorDamageManager.sufferDamage(...)`.

### V2 sheets

**`CharacterSheetV2` is the reference implementation.** It is the only fully wired V2 sheet. The NPC, Vehicle, and BattleMech V2 sheet classes are shells that will be built out using the character sheet as the pattern.

- `src/modules/sheets/register-actor-sheets-v2.js` – Registers all four V2 actor sheets with Foundry.
- `src/modules/sheets/register-item-sheets-v2.js` – Item V2 sheet registration (defined but currently not called in `anarchy-system.js`; item sheets still use legacy AppV1).
- `src/modules/sheets/base-actor-sheet-v2.js` – **BaseActorSheetV2**: shared AppV2 foundation. Provides: edit/view toggle, CSB tab state, roll action routing (`data-action="roll"` → `game.mwd.roll.execute`), monitor setting, image editing, `_commitEditsToActor`, skill display prep, and item classification. All actor sheets inherit this.
- `src/modules/sheets/character-sheet-v2.js` – ✅ **Fully implemented**. Has own `_prepareContext` with edge console (6 pools, pip rendering, toggle behavior), condition monitors (physical/fatigue/armor), burn state, layout registry integration, and `_onEdgeSet` action. Uses `templates/v2/actor/character-sheet.hbs`.
- `src/modules/sheets/npc-sheet-v2.js` – 🔲 Shell only. Registers as AppV2 but still renders the legacy `templates/actor/npc.hbs`. No `_prepareContext` override. Pending conversion following the character sheet pattern.
- `src/modules/sheets/vehicle-sheet-v2.js` – 🔲 Shell only. Still renders legacy `templates/actor/vehicle.hbs`. Pending conversion.
- `src/modules/sheets/battlemech-sheet-v2.js` – 🔲 Shell only. Still renders legacy `templates/actor/battlemech.hbs`. Pending conversion.
- `src/modules/sheets/preload-templates.js` – Preloads ~30 V2 Handlebars templates to avoid first-render blanks.

### Legacy sheets (AppV1 — do not extend)

- `src/modules/actor/anarchy-actor-sheet.js` – AppV1 base sheet, still parent of legacy vehicle/battlemech sheets.
- `src/modules/actor/character-sheet.js`, `character-npc-sheet.js`, `character-tabbed-sheet.js`, `character-base-sheet.js` – Legacy AppV1 character sheets.
- `src/modules/actor/vehicle-sheet.js` – Legacy AppV1 vehicle sheet (stub only; inherits `defaultOptions` from AnarchyActorSheet).
- `src/modules/actor/battlemech-sheet.js` – Legacy AppV1 BattleMech sheet with loadout and quick-action listeners.

---

## Item framework

### Document classes

- `src/modules/item/anarchy-base-item.js` – Base item document (creation hooks, common initialization).
- `src/modules/item/skill-item.js` – Skill item: attribute link, roll helpers.
- `src/modules/item/weapon-item.js` – Weapon item: range bands, damage config, attack roll, target validation.
- `src/modules/item/gear-item.js` – Generic gear.
- `src/modules/item/contact-item.js` – Contact: loyalty/connection stats.
- `src/modules/item/asset-module-item.js` – Asset module: level sorting, activation.
- `src/modules/item/lifemodule-item.js` – Life module: attribute modifiers for character creation.
- `src/modules/item/quality-item.js` – Quality/trait: positive/negative, favoriting.

### Item sheets (AppV1 — pending V2 migration)

- `src/modules/item/base-item-sheet.js` – Shared AppV1 item sheet base.
- Individual AppV1 item sheets: `skill-item-sheet.js`, `weapon-item-sheet.js`, `gear-item-sheet.js`, `contact-item-sheet.js`, `quality-item-sheet.js`, `asset-module-item-sheet.js`, `lifemodule-item-sheet.js`.

---

## Rolling & combat

### MWD roll system (active)

- `src/modules/roll/mwd-roll.js` – **MWDRoll**: main entry point. Orchestrates the full pipeline: resolve intent → collect modifiers → dialog → re-collect → compute edge → execute dice → interpret outcome → render chat.
- `src/modules/roll/mwd-roll-dialog.js` – Pre-roll dialog (AppV2): displays dice pool breakdown, modifier toggles, edge spend selector.
- `src/modules/roll/collect-modifiers.js` – Invokes the modifier provider registry and merges results.
- `src/modules/roll/build-resolved.js` – Packages all roll data into the `flags.mwd.resolved` shape stored on chat messages.
- `src/modules/roll/intent/resolve-intent.js` – Dispatcher: maps intent string to the correct resolver.
- `src/modules/roll/intent/resolve-skill.js` – Skill roll resolver.
- `src/modules/roll/intent/resolve-attribute.js` – Attribute roll resolver.
- `src/modules/roll/intent/resolve-defense.js` – Defense roll resolver.
- `src/modules/roll/intent/resolve-resistance.js` – Resistance roll resolver.
- `src/modules/roll/intent/resolve-attack.js` – Attack roll resolver.
- `src/modules/roll/intent/resolve-edge.js` – Edge-spend resolver.
- `src/modules/roll/intent/resolve-initiative.js` – Initiative roll resolver.
- `src/modules/roll/intent/resolve-overload.js` – Overload roll resolver.

### Legacy roll system (Anarchy-era — do not extend)

- `src/modules/roll/anarchy-roll.js` – Legacy AnarchyRoll class (pre-MWD pipeline).
- `src/modules/roll/roll-manager.js` – Legacy coordinator for attacker/defender flows.
- `src/modules/roll/roll-parameters.js` – Legacy parameter definitions.
- `src/modules/roll/roll-dialog.js` – Legacy AppV1 roll dialog.
- `src/modules/roll/dice.js` – Dice pool wrapper (used by both legacy and MWD paths).
- `src/modules/roll/dice-cursor.js` – Animated dice cursor overlay.

### Combat

- `src/modules/combat/combat-manager.js` – **CombatManager**: handles attack→defend→damage flow. Routes `weapon` roll to notify defender, `defense` roll to compare and display damage button. Entry points: `onClickDefendAttack`, `onClickApplyAttackDamage`.
- `src/modules/anarchy-combat.js` – Custom Foundry Combat document class (initiative formula: `2d6`).

---

## Modifier system

- `src/modules/modifiers/provider-registry.js` – Registry: collects modifiers from all registered providers, filtered by domain tag.
- `src/modules/modifiers/providers/item-modifiers.js` – **ItemModifiersProvider**: reads `flags.mwd.modifiers[]` from actor items.
- `src/modules/modifiers/providers/status-effects.js` – **StatusEffectsProvider**: maps active status effect IDs to modifier entries.
- `src/modules/modifiers/providers/base-modifiers.js` – **BaseRollModifiersProvider**: manual modifiers from roll dialog.
- `src/modules/modifiers/providers/conditions.js` – **ConditionModifiersProvider**: physical/fatigue track penalties (`floor(damage/3)`).
- `src/modules/modifiers/providers/burn-modifier.js` – **BurnModifier**: reads `actor.system.burn.value`, applies `−floor(burn/2)` globally. Not auto-registered; burn field not yet in `template.json`.
- `src/modules/modifiers/anarchy-modifiers.js` – Legacy modifier aggregator (Anarchy-era). Not used by MWD roll pipeline.

---

## Skill definitions

- `src/modules/mwd/skills.js` – 27 core skill definitions: code, label, attribute, icon path, optional defense hint, and domain tags (physical/mental/social). Source of truth for the skills compendium.
- `src/modules/mwd/battlemech-loadout.js` – BattleMech mount/loadout utilities: weapon group management, slot accounting, primary weapon handling.

---

## Attribute actions & defenses

- `src/modules/attribute-actions.js` – Defines rollable attribute-pair actions: defense (reflexes+intelligence for characters; handling+chassis for vehicles/mechs), resistTorture, perception, composure, judgeIntentions, memory, catch, lift. Each entry specifies attribute functions and eligible actor types.

---

## Chat, GM, and token utilities

- `src/modules/chat/chat-manager.js` – Registers chat hooks, renders roll cards and actor speech.
- `src/modules/app/gm-manager.js` – Floating GM dashboard: plot/anarchy pool, difficulty presets, drag/resize.
- `src/modules/app/gm-anarchy.js` – Shared anarchy/plot pool state management and sync.
- `src/modules/app/gm-difficulty.js` – Difficulty pool presets and GM roll triggers.
- `src/modules/app/handle-drag.js` – Draggable position persistence for floating apps.
- `src/modules/token/hud-shortcuts.js` – Token HUD buttons for quick rolls.
- `src/modules/token/tokens.js` – Helpers for resolving selected/targeted actors.
- `src/modules/dialog/roll-celebrity.js` – Celebrity edge pool roll dialog.
- `src/modules/dialog/select-actor.js` – Actor selection dialog.
- `src/modules/dialog/resistance-by-type.js` – Resistance type selection dialog.
- `src/modules/remotecall.js` – Lightweight cross-client RPC registry.
- `src/modules/users.js` – Per-user state: selected token actors, player character reference.
- `src/modules/migrations.js` – Versioned world data migrations run on `ready` (GM only).

---

## Utility modules

- `src/modules/error-manager.js` – Centralized error/notification helper (`ErrorManager.checkOutOfRange`, etc.).
- `src/modules/misc.js` – Small utilities: `divint`, array helpers, formatting.
- `src/modules/icons.js` – Icon path constants.
- `src/modules/confirmation.js` – Standard confirmation dialogs for destructive actions.
- `src/modules/common/checkbars.js` – Checkbar track logic: monitor box toggling, counter updates, cross-actor sourcing.

---

## Styles

- `src/styles/mwd.scss` – Root SCSS entry: imports global, tokens, base, components, themes, and modules partials.
- `src/styles/global.scss` – Variables, font faces, resets.
- `src/styles/appv2/` – Modular AppV2 SCSS: `tokens.scss`, `base.scss`, `components.scss`, `themes/` (default, sra), `modules/` (edge-console, roll-dialog, gm-gadget, chat-roll-card).
- Compiled output: `styles/mwd.css` (loaded by Foundry via `system.json`).

---

## Templates & localization

- `templates/v2/` – **Active** Handlebars templates for AppV2 sheets, roll dialog, and chat cards.
  - `actor/` – Character, NPC, vehicle, BattleMech sheet roots + `_sheet-root.hbs`
  - `components/` – Reusable partials: `attributes.hbs`, `edge-console.hbs`, `status-dashboard.hbs`, `condition-monitors.hbs`, `skill-row.hbs`, `combat-actions.hbs`, `view-mode.hbs`, etc.
  - `roll/` – `mwd-roll-dialog.hbs`, `_mwd-roll-card.hbs`
  - `ui/` – GM gadget, layout node types (stack, panel, tabs, include, hexabox)
- `templates/` (root) – Legacy AppV1 templates for actor/item sheets, chat, dialogs, and combat. Still referenced by legacy sheet classes and `combat-manager.js` (`inform-defender.hbs`).
- `lang/en.json` – English localization strings keyed under `MWD.*`.

---

## Supporting tools & assets

- `tools/` – Compendium management scripts: pack, unpack, validate YAML ↔ LevelDB.
- `src/packs/` – YAML source files for compendiums (skills, macros, GM info).
- `icons/`, `img/`, `fonts/` – Distributed static assets declared in `system.json`.
- `docs/` – Design and architecture documentation (this file and its siblings).
