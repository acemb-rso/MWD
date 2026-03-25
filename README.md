# MechWarrior: Destiny for Foundry VTT

This is a fan-built Foundry VTT system for **MechWarrior: Destiny**. The project is actively moving away from its older Shadowrun/Anarchy roots toward a dedicated MWD rules implementation, so some parts of the system are already modernized while others are still in transition.

If you are starting a campaign today, the strongest support is for **characters and personal-scale play**. NPCs, vehicles, and BattleMechs are present and usable, but they are not all at the same level of polish yet.

## Current status

- Foundry compatibility: **minimum v11**, **verified through v13**
- Actor types: `character`, `npc`, `vehicle`, `battlemech`
- Item types: `contact`, `gear`, `quality`, `assetModule`, `skill`, `lifeModule`, `personalWeapon`, `mechWeapon`
- Active modernized systems: the **V2 character sheet**, **MWD roll engine**, **GM Gadget**, and **personal combat tracker**
- Transitional areas: NPC/vehicle/BattleMech sheets still lean on older templates in places, and item sheets are still using older implementations

## What works well today

### Characters and personal combat

- Destiny-style character attributes are in place: **Strength, Reflexes, Intelligence, Willpower, Charisma, and Edge**
- Characters track **Physical**, **Fatigue**, and **Armor** monitors plus **Burn** and **Overloaded** state
- The character V2 sheet includes a clickable **six-pool Edge console**:
  `Grit`, `Insight`, `Legend`, `Chaos`, `Rumor`, and `Credibility`
- The personal combat dashboard tracks **SA / FA / RA**, active statuses, Burn pressure, and overload readiness
- Equipped personal weapons can roll directly into the active combat and chat flow

### Rolling and chat flow

- The active roll pipeline supports `attribute`, `skill`, `attack`, `defense`, `resistance`, `initiative`, `edge`, and `overload` intents
- Rolls use the new AppV2 dialog and chat card flow
- Modifier collection already supports manual modifiers, condition penalties, status-based modifiers, item-based modifiers, and Edge spending
- Chat cards support **post-roll Edge rerolls** for failed dice when allowed
- The GM Gadget manages **DN presets** for the next roll and can optionally announce changes in chat

### Vehicles and BattleMechs

- Vehicle and BattleMech actors have dedicated document types and derived data for **structure**, **armor**, and **heat**
- BattleMechs already prepare **weapon groups**, **primary group selection**, **melee profiles**, and **heat state bands**
- This side of the project is still being stabilized, so expect more legacy UI and more unfinished workflows than on the character side

## Known limitations

- The V2 character sheet is the most complete sheet in the system
- The V2 **inventory**, **armor**, **assigned systems**, and **bio** panels on the character sheet are still placeholders
- NPC, vehicle, and BattleMech V2 sheets are registered as defaults, but they are not yet as fully wired as the character sheet
- Item V2 registration exists in the codebase, but it is not the active path yet
- Some code, docs, and settings still use older **Anarchy** naming while the system continues to migrate toward MWD terminology
- The repository includes only lightweight compendium support; no licensed game content is distributed

## Compendiums

The repository currently ships with compendiums for:

- **Skills**
- **Macros**
- **Gamemaster information**

You will still need your own copy of **MechWarrior: Destiny** for the actual game rules and setting content.

## Installing the system

1. In Foundry VTT, open **Configuration and Setup -> Game Systems -> Install System**
2. Paste the manifest URL:
   `https://raw.githubusercontent.com/acemb-rso/MWD/main/system.json`
3. Or download the latest archive:
   `https://github.com/acemb-rso/MWD/archive/refs/heads/main.zip`
4. Extract it to `Data/systems/mwd` if you are installing manually

After installation, select **MechWarrior: Destiny** when creating a world.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) LTS
- `npm`

### Common tasks

- Install dependencies: `npm install`
- Start the Vite dev server: `npm run run`
- Build production assets: `npm run build`
- Watch SCSS: `npm run css`
- Validate JSON manifests: `npm run validate:json`
- Pack compendiums to `dist/`: `npm run packCompendiumsToDist`
- Pack compendiums to the public directory: `npm run packCompendiumsToPublic`
- Unpack compendiums from the public directory: `npm run unpackCompendiumsFromPublic`

## Repository layout

- `system.json` - Foundry manifest and compatibility data
- `template.json` - actor and item data templates
- `src/modules/` - actor classes, items, rolls, combat flow, GM utilities, and migrations
- `templates/v2/` - active AppV2 UI work
- `templates/` - older legacy templates still used in transitional areas
- `docs/` - design notes, sheet references, and stabilization plans

## License and attribution

This project is released under [Creative Commons Attribution 4.0](LICENSE.md).

MechWarrior, BattleTech, and MechWarrior: Destiny are trademarks of their respective owners. This repository is a fan project and does not distribute licensed rulebook content.
