# MechWarrior: Destiny for Foundry VTT

This system brings Catalyst Game Labs' **MechWarrior: Destiny** ruleset to Foundry VTT with support for characters, vehicles, and full BattleMechs. It began as a Shadowrun: Anarchy fork and now ships with Destiny-specific terminology, condition tracks, and sheet layouts.

## What you get

- **Multiple actor types** for characters, vehicles, and BattleMechs with dedicated sheets and resource tracking.
- **Streamlined rolls** for attributes, skills, and weapons that can be launched from sheets or the token HUD, including opposed rolls for targeted tokens.
- **GM Manager overlay** with shared plot/anarchy pool controls and configurable difficulty pool shortcuts.
- **Customization hooks** for alternate skill sets and hacks exposed through Foundry settings.
- **Styling options** via bundled themes (light/dark variants) and SCSS sources for deeper customization.

## Installing the system

1. In Foundry VTT, open **Configuration and Setup → Game Systems → Install System**.
2. Paste the manifest URL: `https://raw.githubusercontent.com/acemb-rso/MWD/main/system.json`.
3. Alternatively, download the latest archive (`https://github.com/acemb-rso/MWD/archive/refs/heads/main.zip`) and extract it into `Data/systems/mwd`.

The system targets Foundry **v11** and has been verified against **v13**. After installation, you can select MechWarrior: Destiny when creating a new world.

## Using the system

### Characters

- Sheets offer full, enhanced, tabbed, and limited views to fit different table needs.
- Destiny attributes replace the Anarchy set (e.g., **Reflexes** for Agility, **Intelligence** for Logic) alongside Strength, Willpower, Charisma, and Edge.
- Condition monitors track **Physical** and **Fatigue** damage; armor is used when applicable.
- Items currently mirror the Anarchy categories (skills, weapons, gear, asset modules, contacts) while Destiny-specific equipment work continues. Matrix artifacts such as cyberdecks or sprites are kept only for backward compatibility.

### Vehicles and BattleMechs

- **Vehicles** manage structure and armor with simplified loadouts aimed at personal-scale play.
- **BattleMechs** include heat management, mount-aware weapon grouping, and chassis systems tailored for mech engagements.

### Rolling and GM tools

- Roll attributes, skills, and weapons directly from sheets or via token HUD shortcuts; targeted rolls prompt defenders for opposed checks.
- Open the **GM Manager** from the chat sidebar to adjust the shared plot/anarchy pool and trigger predefined difficulty pools. These settings sync across clients through world data.

### Compendiums

The repository includes stub packs for macros, GM information, and skills. No licensed game content is distributed; you will need your own copy of MechWarrior: Destiny to play.

## Developing and contributing

### Prerequisites

- [Node.js](https://nodejs.org/) LTS
- [Yarn](https://yarnpkg.com/) or npm

### Common tasks

- **Install dependencies:** `npm install`
- **Start a dev server with hot reload:** `npm run run`
- **Build production assets:** `npm run build`
- **Validate JSON manifests:** `npm run validate:json`
- **Pack/unpack compendiums:**
  - To public directory: `npm run packCompendiumsToPublic`
  - To `dist/` for release builds: `npm run packCompendiumsToDist`
  - Unpack from public directory: `npm run unpackCompendiumsFromPublic`

### Repository structure highlights

- `system.json` – Foundry manifest with compatibility info, assets, languages, and data packs.
- `index.mjs` and `src/start.js` – Entry point that boots the system.
- `src/` – Core logic for actors, items, rolls, GM utilities, and styling.
- `templates/` – Handlebars templates for sheets, dialogs, and chat cards.
- `style/` and `src/styles/` – Prebuilt CSS themes and SCSS sources.
- `docs/` – Additional design notes and a codebase map.

### License and attribution

This project is released under [Creative Commons Attribution 4.0](LICENSE.md). MechWarrior, BattleTech, and MechWarrior: Destiny are trademarks of their respective owners and are used here under fan project guidelines.
