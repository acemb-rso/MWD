# Codebase Map

This document summarizes each file in the MechWarrior: Destiny Foundry VTT system and highlights its role plus key dependencies.

## Root metadata & build tooling
- `system.json` – Foundry manifest describing the system ID, version, assets, data packs, and entry module (`index.mjs`).【F:system.json†L1-L107】
- `index.mjs` – Development entry that exposes `window.global` and boots the runtime by loading `src/start.js`.【F:index.mjs†L1-L6】
- `package.json` – Project scripts and dependencies (Vite build, compendium packing helpers, JSON validation).【F:package.json†L1-L21】
- `vite.config.ts` – Vite/Rollup configuration for building the ES module library from `src/start.js`, setting dev server proxies, and enabling bundle visualization.【F:vite.config.ts†L1-L37】

## Entry point
- `src/start.js` – Minimal bootstrap that imports `AnarchySystem` and kicks off initialization via `AnarchySystem.start()`.【F:src/start.js†L1-L3】

## Core system orchestration
- `src/modules/anarchy-system.js` – Central initializer wiring configuration, document classes, UI sheets, dice/roll handlers, chat, migrations, GM utilities, and hooks during Foundry’s `init`/`ready` lifecycle. It sets `CONFIG` bindings and registers actor/item sheets from module imports listed at the top of the file.【F:src/modules/anarchy-system.js†L1-L182】
- `src/modules/hooks-manager.js` – Declares extensibility hooks for hacks (e.g., registering alternate skill sets or styles), registers a world setting to select a hack, and applies the chosen behavior to checkbars; exported hook names are placed on `globalThis` for external modules.【F:src/modules/hooks-manager.js†L1-L108】
- `src/modules/constants.js` – Central constants such as log prefixes, template paths, and type identifiers referenced across modules.【F:src/modules/constants.js†L1-L120】
- `src/modules/config.js` – Localized keys and configuration enums for actors, items, settings, chat strings, and monitor labels used throughout the UI and rules logic.【F:src/modules/config.js†L1-L120】
- `src/modules/enums.js` – Enumerations and lookup helpers (e.g., damage types) used by actors, rolls, and UI templates; initialized by `AnarchySystem` via `Enums.init()`.【F:src/modules/enums.js†L1-L120】
- `src/modules/system-settings.js` – Registers world settings like default CSS class and damage mode options consumed by other managers during setup.【F:src/modules/system-settings.js†L1-L23】
- `src/modules/styles.js` – Determines available CSS themes/styles for the system and exposes selection helpers consumed by sheets and dialogs.【F:src/modules/styles.js†L1-L45】
- `src/modules/handlebars-manager.js` – Registers Handlebars helpers and partials to render templates used by sheets, dialogs, and chat messages.【F:src/modules/handlebars-manager.js†L1-L140】

## Actor framework
- `src/modules/actor/base-actor.js` – Core `AnarchyBaseActor` class that dispatches to specialized actor constructors, prepares derived data (monitors, modifiers), and provides utilities for permissions, sorting, and edge pools. Depends on attribute actions, checkbars, enums, modifier utilities, and actor damage manager.【F:src/modules/actor/base-actor.js†L1-L88】【F:src/modules/actor/base-actor.js†L94-L137】
- `src/modules/actor/character-actor.js` – Extends the base actor with character-specific preparation and helper methods for skills, items, and condition tracks.【F:src/modules/actor/character-actor.js†L1-L160】
- `src/modules/actor/vehicle-actor.js` – Vehicle actor subclass handling pilot links, armor/structure monitors, and item organization specific to vehicles.【F:src/modules/actor/vehicle-actor.js†L1-L128】
- `src/modules/actor/battlemech-actor.js` – Battlemech-specific actor logic including mount loadouts and heat/structure management.【F:src/modules/actor/battlemech-actor.js†L1-L200】
- `src/modules/actor/actor-damage.js` – Singleton `ActorDamageManager` for applying and tracking damage/resistance across actor monitor types.【F:src/modules/actor/actor-damage.js†L1-L140】
- `src/modules/actor/anarchy-actor-sheet.js` – Base sheet class shared by actor sheet variants, handling generic data preparation and UI listeners.【F:src/modules/actor/anarchy-actor-sheet.js†L1-L140】
- `src/modules/actor/character-sheet.js` – Default character sheet implementation with tab management and embedded item controls for a single-page view.【F:src/modules/actor/character-sheet.js†L1-L17】
- `src/modules/actor/character-npc-sheet.js` – NPC-oriented sheet built directly on the base actor sheet with its own layout and sizing defaults.【F:src/modules/actor/character-npc-sheet.js†L1-L17】
- `src/modules/actor/character-tabbed-sheet.js` – Character sheet that separates main/equipment/biography tabs; registered as an optional actor sheet.【F:src/modules/actor/character-tabbed-sheet.js†L1-L23】
- `src/modules/actor/character-base-sheet.js` – Shared utilities for character sheets (tab activation, rendering helpers) used by enhanced/tabbed variants.【F:src/modules/actor/character-base-sheet.js†L1-L96】
- `src/modules/actor/vehicle-sheet.js` – Vehicle actor sheet class handling pilot display, weapon groups, and vehicle monitors.【F:src/modules/actor/vehicle-sheet.js†L1-L64】
- `src/modules/actor/battlemech-sheet.js` – Battlemech sheet UI with loadout, heat, and chassis-specific controls.【F:src/modules/actor/battlemech-sheet.js†L1-L200】

## Item framework
- `src/modules/item/anarchy-base-item.js` – Base item document class adding common behaviors, initialization hooks, and creation helpers for all item types.【F:src/modules/item/anarchy-base-item.js†L1-L157】
- `src/modules/item/skill-item.js` – Skill item document with roll helpers and attribute links; registered for both skill sets.【F:src/modules/item/skill-item.js†L1-L53】
- `src/modules/item/weapon-item.js` – Weapon item logic used by mech and personal weapons (range, damage, attack rolls).【F:src/modules/item/weapon-item.js†L1-L285】
- `src/modules/item/gear-item.js` – Generic gear item data helpers and cost/availability handling.【F:src/modules/item/gear-item.js†L1-L9】
- `src/modules/item/contact-item.js` – Contact item behaviors such as loyalty/connection stats and attaching to actors.【F:src/modules/item/contact-item.js†L1-L9】
- `src/modules/item/asset-module-item.js` – Asset module items with level sorting and activation management.【F:src/modules/item/asset-module-item.js†L1-L10】
- `src/modules/item/lifemodule-item.js` – Life module item handling (qualities, attribute modifiers) for character creation options.【F:src/modules/item/lifemodule-item.js†L1-L18】
- `src/modules/item/quality-item.js` – Positive/negative quality definitions, favoriting, and effect hooks.【F:src/modules/item/quality-item.js†L1-L10】
- `src/modules/item/cyberdeck-item.js` – Legacy Matrix cyberdeck support kept for compatibility but not actively used in Destiny rules.【F:src/modules/item/cyberdeck-item.js†L1-L15】
- `src/modules/item/base-item-sheet.js` – Base sheet class for items, providing shared event handlers and rendering support.【F:src/modules/item/base-item-sheet.js†L1-L127】
- `src/modules/item/skill-item-sheet.js`, `weapon-item-sheet.js`, `gear-item-sheet.js`, `contact-item-sheet.js`, `quality-item-sheet.js`, `asset-module-item-sheet.js`, `lifemodule-item-sheet.js`, `cyberdeck-item-sheet.js` – Item sheet subclasses supplying templates and listeners for their respective item documents and registered by `AnarchySystem`.【F:src/modules/item/skill-item-sheet.js†L1-L17】【F:src/modules/item/weapon-item-sheet.js†L1-L25】

## Rolling & combat
- `src/modules/roll/dice.js` – Wrapper around Foundry dice evaluation tailored to Anarchy/Destiny mechanics.【F:src/modules/roll/dice.js†L1-L140】
- `src/modules/roll/anarchy-roll.js` – High-level roll flow, assembling dice pools, applying modifiers, and posting chat cards.【F:src/modules/roll/anarchy-roll.js†L1-L175】
- `src/modules/roll/roll-manager.js` – Coordinates attacker/defender rolls, integrates with tokens, and handles opposed roll messaging.【F:src/modules/roll/roll-manager.js†L1-L158】
- `src/modules/roll/roll-parameters.js` – Defines available roll parameters (attributes, modifiers) and exposes them for dialogs and hooks.【F:src/modules/roll/roll-parameters.js†L1-L160】
- `src/modules/roll/roll-dialog.js` – Builds the roll dialog UI, populates with parameters, and triggers dice rolls.【F:src/modules/roll/roll-dialog.js†L1-L160】
- `src/modules/roll/dice-cursor.js` – Manages the animated dice cursor overlay when hovering rollable elements.【F:src/modules/roll/dice-cursor.js†L1-L60】
- `src/modules/anarchy-combat.js` – Custom combat document class that extends Foundry combat with system-specific initiative and attack handling, initialized and registered via `AnarchySystem`.【F:src/modules/anarchy-combat.js†L1-L49】
- `src/modules/combat/combat-manager.js` – Coordinates combat-specific interactions such as defending attacks and informing defenders through templates.【F:src/modules/combat/combat-manager.js†L1-L180】

## Chat, GM, and token utilities
- `src/modules/chat/chat-manager.js` – Registers chat message hooks and renders chat cards for rolls, actor speech, and risk outcomes.【F:src/modules/chat/chat-manager.js†L1-L140】
- `src/modules/app/gm-anarchy.js` – Manages the shared anarchy/plot pool for GMs, synchronizing state with actor sheets and GM Manager UI.【F:src/modules/app/gm-anarchy.js†L1-L122】
- `src/modules/app/gm-difficulty.js` – Handles difficulty pool presets, rendering buttons, and triggering chat rolls from the GM Manager.【F:src/modules/app/gm-difficulty.js†L1-L79】
- `src/modules/app/gm-manager.js` – Floating GM dashboard application that injects chat toolbar buttons, renders `gm-manager.hbs`, and wires drag/resizing plus GM-specific listeners.【F:src/modules/app/gm-manager.js†L1-L160】
- `src/modules/app/handle-drag.js` – Helper to make applications draggable and persist positions in settings, used by GM Manager and dialogs.【F:src/modules/app/handle-drag.js†L1-L120】
- `src/modules/token/hud-shortcuts.js` – Adds token HUD buttons for quick rolls and targeted actions leveraging roll manager and actor data.【F:src/modules/token/hud-shortcuts.js†L1-L140】
- `src/modules/token/tokens.js` – Token helper utilities for resolving selected/targeted actors during rolls and actions.【F:src/modules/token/tokens.js†L1-L18】
- `src/modules/dialog/roll-celebrity.js`, `select-actor.js`, `resistance-by-type.js` – Modal dialogs for specific roll flows (celebrity edge pools, selecting actors, choosing resistance types) invoked by roll/actor utilities.【F:src/modules/dialog/roll-celebrity.js†L1-L130】
- `src/modules/remotecall.js` – Lightweight RPC/remote call registry enabling cross-client coordination for actions like GM updates.【F:src/modules/remotecall.js†L1-L61】
- `src/modules/users.js` – Tracks per-user state (selected token actors, permissions) and exposes helpers referenced by actors and roll manager.【F:src/modules/users.js†L1-L70】
- `src/modules/migrations.js` – Handles versioned world data migrations invoked on `ready` for GMs to upgrade actor/item data safely.【F:src/modules/migrations.js†L1-L140】

## Mechanics helpers
- `src/modules/skills.js` – Defines available skills, matrix skill set, and provides lookup helpers used by actors and roll parameters.【F:src/modules/skills.js†L1-L180】
- `src/modules/modifiers/modifiers.js` – Aggregates item modifiers, computes bonuses for monitors/attributes, and is consumed when preparing actor data.【F:src/modules/modifiers/modifiers.js†L1-L160】
- `src/modules/damage.js` – Damage calculation helpers including resistance application and armor interactions leveraged by attacks and actor damage manager.【F:src/modules/damage.js†L1-L10】
- `src/modules/attribute-actions.js` – Defines rollable attribute/skill buttons and actions exposed on actor sheets and HUD shortcuts.【F:src/modules/attribute-actions.js†L1-L119】
- `src/modules/common/checkbars.js` – Checkbar UI logic for resource tracks and hacks; globally initialized and modified via hooks manager.【F:src/modules/common/checkbars.js†L1-L160】
- `src/modules/grammar.js` – Utilities for grammatical formatting (e.g., pluralization) used in chat messages and UI labels.【F:src/modules/grammar.js†L1-L8】
- `src/modules/error-manager.js` – Centralized error/notification helper referenced by actor and roll modules to warn users.【F:src/modules/error-manager.js†L1-L106】
- `src/modules/icons.js` – Icon path utilities/constants shared by sheets and HUD components.【F:src/modules/icons.js†L1-L37】
- `src/modules/matrix-helper.js` – Legacy matrix-mode helpers maintained for compatibility but gated by settings/hacks.【F:src/modules/matrix-helper.js†L1-L140】
- `src/modules/confirmation.js` – Standard confirmation dialogs for item/attachment deletion and other destructive actions.【F:src/modules/confirmation.js†L1-L78】
- `src/modules/misc.js` – Small utility helpers reused across actors and items (e.g., array manipulations, formatting).【F:src/modules/misc.js†L1-L111】
- `src/modules/mwd/battlemech-loadout.js` – Battlemech mount/loadout utilities supporting weapon grouping on mech sheets.【F:src/modules/mwd/battlemech-loadout.js†L1-L160】

## Styles
- `src/styles/index.scss` – Root stylesheet that imports other SCSS partials for compilation via Vite.【F:src/styles/index.scss†L1-L3】
- `src/styles/global.scss`, `gm-manager.scss` – Theme/style definitions for global UI elements and the GM Manager overlay respectively.【F:src/styles/global.scss†L1-L200】【F:src/styles/gm-manager.scss†L1-L33】

## Templates & localization
- `templates/` – Handlebars templates for chat cards, dialogs, common partials, monitors, item sheets, roll UI, token HUD shortcuts, and actor sheets; referenced by sheet classes, dialogs, and chat manager when rendering views.【F:templates/chat/anarchy-roll.hbs†L1-L60】【F:templates/actor/character.hbs†L1-L40】
- `lang/en.json` – English localization strings for the system identifiers used across config and templates.【F:lang/en.json†L1-L200】

## Supporting docs & assets
- `docs/` – Design notes for quick-roll buttons, vehicle rules, and weapon mounting systems supporting future development decisions.【F:docs/mech-quick-roll-buttons.md†L1-L120】
- Asset folders (`icons/`, `img/`, `fonts/`, `style.css`, `style/`) – Images, fonts, and prebuilt CSS distributed with the system as declared in `system.json`.【F:system.json†L45-L51】
