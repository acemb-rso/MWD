# MechWarrior: Destiny for Foundry VTT

This is a fan-built Foundry VTT system for **MechWarrior: Destiny**. The project began with Shadowrun/Anarchy roots and is being actively refit into a dedicated MWD rules implementation. The strongest support today is for characters, personal-scale gear, personal combat, and the newer AppV2 sheet and roll pipeline.

NPCs, vehicles, and BattleMechs are present and registered, but they are not all at the same level of completion as the character and personal-combat workflows.

## Current Status

- System version: **0.4.8**
- Foundry compatibility: **minimum v11**, **verified through v13**
- Actor types: `character`, `npc`, `vehicle`, `battlemech`
- Item types: `contact`, `gear`, `quality`, `assetModule`, `skill`, `lifeModule`, `personalWeapon`, `mechWeapon`, `weaponPayload`, `armor`
- Active modernized systems: AppV2 actor sheets, AppV2 item sheets, MWD roll engine, GM Gadget, declarative personal and machine combat actions, personal combat tracker, personal weapon and armor data models, reusable weapon payload items, queued machine hit-location and critical-hit resolution
- Main transition areas: broader mech/vehicle combat automation, broad weapon trait automation, and older Anarchy naming that still appears in some code and templates

## What Works Today

### Characters

- Destiny-style character attributes are in place: **Strength**, **Reflexes**, **Intelligence**, **Willpower**, **Charisma**, and **Edge**
- Characters track **Physical**, **Fatigue**, and **Armor** monitors, plus **Burn** and **Overloaded** state
- The character sheet includes a six-pool Edge console:
  `Grit`, `Insight`, `Legend`, `Chaos`, `Rumor`, and `Credibility`
- Life modules, skills, specializations, qualities/traits, personal weapons, armor, gear, contacts, and asset modules have AppV2 item workflows

### Personal Combat

- The personal combat dashboard tracks **SA / FA / RA**, activation action logs, Burn pressure, overload readiness, active statuses, and common combat checks
- Personal combat buttons are declarative catalog entries: sheets emit `combatIntent`, and the central executor owns prompts, cost, logs, state changes, and roll handoff
- Combat-panel attacks spend and log **2 SA** after a successful attack roll is created
- If no equipped personal weapon is available, the combat attack path can fall back to unarmed:
  - DV = `ceil(Strength / 2)`
  - Close AR = `Reflexes`
  - skill = `meleeCombat`
  - damage type = `concussive`
- Equipped personal weapons can be attacked from the character inventory

### Attack Flow

The first end-to-end personal attack loop is implemented:

- attack payload from an item or declarative combat action
- resolver derives weapon, skill, range, payload/ammo, target snapshots, and target armor
- roll dialog and roll execution
- per-target CQ and outcome resolution
- damage and resistance preview
- chat card output
- queued state mutation
- per-target `Apply Damage`
- multi-target `Apply All Damage`
- post-roll Edge reroll before damage is applied

Personal CQ currently uses:

```text
AR = weapon AR at selected range
DR = target Reflexes + Reflexes

if attacker weapon skill > defender Tactics:
  AR += difference

if defender Tactics > attacker weapon skill:
  DR += difference

if target armor has defenseBonus:
  DR += armor defenseBonus

CQ = AR - DR
```

Damage application is queued on the chat card. Applying damage uses the shared harm engine so armor mitigation, damage type mitigation, armor durability, and track changes use the same path as GM-applied harm.

Machine targets use the same deliberate chat-apply doctrine. Successful vehicle and BattleMech hits queue a canonical `machineAttackDamage` mutation with impact label, grouped rules location, damage preview, critical state, reliability choice preview, and any prepared critical records. Chat can toggle pending Chaos and Reliability choices, but armor, structure, stress, shock/pressure, Reliability, degradation, crit records, and status are written only when `HarmEngine.applyMachineAttackDamage` applies the queued mutation.

### Area And Multi-Target Attacks

- Multiple targeted tokens are resolved as separate target results from one attack roll
- Supported templated personal attacks can place an area and derive target snapshots from the template
- Executable template shapes currently include `blast`, `cone`, and `line`
- Damage can be applied per target or in bulk with `Apply All Damage`

### GM Tools

- The GM Gadget manages DN presets and can optionally announce DN changes to chat
- The GM Gadget includes a **GM Harm** panel for direct adjudication:
  - physical/fatigue deltas
  - optional armor mitigation
  - damage type selection
  - Burn changes
  - status apply/remove
  - source and notes
- GM Harm is the current manual override path for damage; attack cards do not yet have inline editable damage fields

## Known Limitations

- Weapon and payload standard trait rules are intentionally not automated yet; the current weapon trait registry is disabled until the rules are backed by concrete behavior
- Actor quality/trait roll modifiers are active through the shared trait modifier provider, but that is separate from weapon standard-trait automation
- Payload/profile modifiers are active for things like damage type, AP, attack rating band changes, and templated payload capabilities
- Area support is limited to the currently executable template shapes
- Multi-target attacks use one roll result with per-target CQ/resistance/damage previews
- Attack damage application is queued from chat, not automatically pushed to targets on roll
- Mech and vehicle combat systems now have declarative action anchors and central routing, but some high-impact verbs such as charge/DFA, shielding, indirect spotting, and ejection remain explicit stubs until their mechanics are implemented
- Some code, settings, docs, and templates still use older Anarchy terminology while the migration continues
- No licensed MechWarrior: Destiny rulebook content is distributed

## Compendiums

The repository currently ships with compendiums for:

- **Skills**
- **Macros**
- **Gamemaster information**

You will still need your own copy of **MechWarrior: Destiny** for the actual game rules and setting content.

## Installing The System

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

### Common Tasks

- Install dependencies: `npm install`
- Start the Vite dev server: `npm run run`
- Build production assets: `npm run build`
- Watch SCSS: `npm run css`
- Validate JSON manifests: `npm run validate:json`
- Pack compendiums to `dist/`: `npm run packCompendiumsToDist`
- Pack compendiums to the public directory: `npm run packCompendiumsToPublic`
- Unpack compendiums from the public directory: `npm run unpackCompendiumsFromPublic`

## Repository Layout

- `system.json` - Foundry manifest and compatibility data
- `template.json` - actor and item data templates
- `src/modules/` - actor classes, item models, sheets, rolls, combat flow, GM utilities, and migrations
- `templates/v2/` - active AppV2 UI templates
- `templates/` - older legacy templates still used in transitional areas
- `styles/` and `src/styles/` - compiled CSS and SCSS sources
- `packs/` - source compendium content
- `dist/` - build output
- `docs/` - design notes, codebase maps, and stabilization plans

## License And Attribution

This project is released under [Creative Commons Attribution 4.0](LICENSE.md).

MechWarrior, BattleTech, and MechWarrior: Destiny are trademarks of their respective owners. This repository is a fan project and does not distribute licensed rulebook content.
