# MechWarrior: Destiny for Foundry VTT

This is a fan-built Foundry VTT system for **MechWarrior: Destiny**. The project began with Shadowrun/Anarchy roots and is being actively refit into a dedicated MWD rules implementation. Character and personal-scale combat are feature-complete. Machine (vehicle and BattleMech) combat — including heat, degradation, EW/targeting, and critical hits — is substantially implemented and playable. Some high-impact machine verbs (charge, DFA, shielding, indirect spotting, ejection) remain stubs.

## Current Status

- System version: **0.5.0**
- Foundry compatibility: **minimum v14**, **verified v14**
- Actor types: `character`, `npc`, `vehicle`, `battlemech`
- Item types: `contact`, `gear`, `quality`, `assetModule`, `skill`, `lifeModule`, `personalWeapon`, `mechWeapon`, `weaponPayload`, `armor`
- Active systems: AppV2 actor and item sheets, MWD roll engine, declarative personal and machine combat actions, personal combat tracker, battle armor, area effects and Evade, personal criticals, machine heat and degradation, machine EW and targeting, machine critical hits, damage scale conversion, GM Gadget and harm panel, asset modules, macro scripting API
- Main transition areas: weapon standard-trait automation, and older Anarchy naming still present in some code and templates

---

## What Works Today

### Characters

- Destiny-style attributes: **Strength**, **Reflexes**, **Intelligence**, **Willpower**, **Charisma**, **Edge**
- Monitors: **Physical** (8 + STR), **Fatigue** (8 + WIL), **Armor**, **Burn**, **Overloaded**
- Six Edge pools on the character sheet: `Grit`, `Insight`, `Legend`, `Chaos`, `Rumor`, `Credibility` — each has a rating (cap) and a current value; trait mods can adjust caps
- Life modules, skills, specializations, qualities/traits, personal weapons, armor, gear, contacts, and asset modules all have AppV2 item sheets

### Action Economy and Burn

Characters have three action pools per activation: **SA** (Standard Actions), **FA** (Free Actions), **RA** (Reactions). The personal combat tracker manages pool state, spend logging, and activation lifecycle.

- Most combat actions cost 2 SA; the catalog defines each action's cost
- Spending more SA than available generates **Burn**: one point per SA overspent
- When RA is exhausted, reaction fallback rules apply
- Trait modifiers via `system.traitMods` can adjust SA/FA/RA caps and Edge pool caps

### Battle Armor

- Characters can equip a battle armor item that intercepts incoming damage before it reaches the physical track
- The armor pool absorbs hits; once depleted, incoming damage begins degrading the structure track and bleeds through to the wearer
- Machine-scale weapon hits bypass the battle armor shell and are eligible to trigger personal criticals against the wearer
- The damage card shows separate Battle Armor and BA Structure monitor rows alongside the wearer track, and applies the full armor-absorbed total to the impact summary

### Personal Combat

- The personal combat dashboard tracks SA / FA / RA, activation action logs, Burn pressure, overload readiness, active statuses, and common combat checks
- Personal combat buttons are declarative catalog entries: sheets emit `combatIntent`, the central executor owns prompts, cost, logs, and roll handoff
- Unarmed fallback: DV = `ceil(Strength / 2)`, Close AR = `Reflexes`, skill = `meleeCombat`, type = concussive
- Equipped personal weapons can be attacked from the character inventory

### Personal Criticals

Personal criticals are triggered on hit based on the attack margin (net hits):

- A severity roll (2d6 + severity modifier) determines whether a critical lands and how severe it is
- Six critical families: **Winded**, **Concussion**, **Crippled**, **Hampered**, **Off Balance**, **Shaken**
- Each record carries a remedy action (First Aid, Reduce Burn, Ready Item, etc.) and a remedy DN
- Persistent statuses set by criticals do not auto-expire; they require the remedy action to clear
- Personal damage uses a **flat damage model**: net hits do not add to damage

### Attack Flow

The end-to-end personal attack loop:

1. Attack payload from an item or declarative combat action
2. Resolver derives weapon, skill, range, payload/ammo, target snapshots, and target armor
3. Roll dialog and roll execution
4. Per-target CQ and outcome resolution
5. Damage and resistance preview
6. Chat card output
7. Queued state mutation
8. Per-target `Apply Damage` / `Apply All Damage`
9. Post-roll Edge reroll before damage is applied
10. Personal critical trauma on eligible hits

**Personal CQ:**

```
AR = weapon AR at selected range
DR = target Reflexes + Reflexes

if attacker weapon skill > defender Tactics:  AR += difference
if defender Tactics > attacker weapon skill:  DR += difference
if target armor has defenseBonus:             DR += armor defenseBonus

CQ = AR - DR
```

Damage application runs through the shared harm engine: armor mitigation, damage type resistances, armor durability wear, battle armor absorption, damage scale conversion, and track changes all share one path.

### Damage Types

Five closed personal damage types, each with distinct armor interactions:

- **Penetrating** — bypasses partial armor mitigation; triggers the penetration UI on the damage card
- **Concussive** — standard physical impact
- **Energy** — directed energy; some armor types have type-specific resistance
- **Thermal** — heat-based; interacts with thermal resistance traits
- **Electrical** — electrical discharge; interacts with electrical resistance traits

Armor items carry per-type mitigation modifiers in addition to their base resistance rating. The sealed armor trait grants bonus resistance dice against gas and chemical hazards.

### Damage Scale Conversion

Damage is scaled at the target boundary:

- **Machine weapon → personal actor**: ×10 before armor and battle armor mitigation
- **Personal weapon → machine actor**: ÷10 (floor) before machine structure calculations
- `sourceScale` is derived automatically: machine actors always produce machine-scale damage; personal actors use the weapon's `scale` field, defaulting to personal

### Area and Multi-Target Attacks

- Multiple targeted tokens produce separate CQ/resistance/damage previews from one attack roll
- Templated personal attacks place an area template and derive target snapshots from it
- Executable template shapes: `blast`, `cone`, `line`
- Damage can be applied per target or in bulk with `Apply All Damage`

**Exposure and Evade:**

Area attacks assign an exposure tier to each target: **Full / Major / Minor / None**, based on template coverage. Targets may attempt to Evade:

- A successful Evade reduces exposure by one tier
- Against a **persistent hazard** at Full exposure, Evade is locked out — the target cannot reduce exposure until the hazard clears
- Persistent hazards can escalate exposure over time; discrete hazards do not

### Machine Combat

Machine attacks queue a `machineAttackDamage` mutation on the chat card. Armor, structure, stress, shock/pressure, Reliability, degradation, critical records, and status are written only when the mutation is applied — never on roll.

The queued mutation carries:
- Impact label and grouped rules location
- Armor and structure damage preview
- Critical state (none / automatic / chaosOptional / chaosSelected) and prepared critical records pinned to the current preview revision
- Reliability spend options (preview only; committed on apply)
- Chaos and Reliability toggle UI

**Machine attributes:**

- **Chassis** — resistance to knockdown, collision mitigation, forced displacement
- **Reliability** — controls degradation frequency, stress recovery, remediation roll modifiers, and Burn spending in extremis

### Machine Heat

BattleMechs have a four-band heat track: **Safe → Hot → Overheat → Danger**

- Weapons and actions generate pending heat during activation; dissipation is applied end-of-activation (FILO stack model)
- **Hot** and **Overheat** impose escalating roll and action penalties
- **Danger** triggers a shutdown check and potential explosion; condition modifiers from criticals and degradation apply to the danger roll
- Critical hits and degradation can impair cooling systems, halving dissipation capacity

Vehicles use **Strain** instead of Heat for thermal management.

### Machine Degradation

BattleMechs and vehicles track condition through five stages: **Intact → Impaired → Damaged → Crippled → Disabled**

Stage advancement is driven by accumulated location stress and shock/pressure thresholds, modulated by Reliability. Per-location consequences:

- **Arms** — weapon group availability and accuracy
- **Legs** — movement modes and speed
- **Torso** — core system availability
- **Head** — sensor capability and pilot effects

Shock/pressure accumulation and location stress are tracked per activation. Remediation actions can reduce stress and recover condition stages when rules allow.

### Machine EW and Targeting

Machine combat uses a four-state detection model: **Blind → Contact → Track → Lock**

- **Sensor rolls** (System + Perception) advance detection state against a target
- **Targeting data** is a short-lived dice bonus capped by System rating, generated by gunnery rolls (System + Gunnery)
- Lock enables advanced systems: fire-control CQ bonuses, Artemis guidance, and indirect fire
- **Break Lock** (Handling + Stealth) downgrades enemy detection state one step; **Defensive Jink** (Handling + Piloting) reduces a fresh targetingData packet by 1
- **ECM** creates tracking/interference pressure; **EPM** provides protection against ECM
- Integrated C3, TAG, and NARC systems allow target designation to be shared or passed between units
- Breaking lock, EMP effects, and tracking penalties from movement are all modeled

### Machine Critical Hits

Machine critical hits use a two-table resolution system (General table + location-specific table):

- Hit location data carries both an `impactLabel` (flavor) and a `rulesLocation` (rules bucket) — these can differ for grouped locations
- 12 special critical results per table, with location escalation and catastrophic fallbacks when a location is already Disabled
- Critical records are prepared and pinned to a preview revision; the apply step is idempotent — replaying the same revision produces the same result
- Chaos crits and Reliability spends are toggled on the chat card before applying

### Asset Modules

Asset modules attach declarative rule contributions to actors and machines. The primary authoring surface is `system.rules[]` — each rule entry is a contribution packet with:

- A **selector** (scope, domain, platform, weapon, sensor, mobility tags) controlling when the rule fires
- An **output type** (dicePart, dnPart, cqPart, damagePart, constraint, trigger, passive, action)
- **Prerequisite** conditions and **usage** caps (one-shot vs. sustained)

A readiness model with six factors (installed, enabled, active, suppressed, offline, destroyed) controls whether each module contributes at roll time. Modules integrate directly with the roll engine modifier pipeline.

### GM Tools

**GM Gadget**
- DN presets with optional chat announcement on change
- Quick status toggles for targeted tokens

**GM Harm Panel**

Direct damage adjudication without a roll:

- Track delta (physical or fatigue) with optional armor-aware routing
- Damage type and AP selection for mitigation calculation
- Source-scale selection (personal or machine) for cross-scale harm
- Burn delta
- Status apply/remove with actor-appropriate status list
- Source label and notes for the chat log

---

## Macro and Scripting API

The system exposes a scripting surface at `game.mwd`:

- `game.mwd.roll.execute(payload)` — enter the MWD roll pipeline with a full intent payload
- `game.mwd.harm.apply({ actor, token, payload })` — apply harm directly (modes: `trackDelta`, `burnDelta`, `status`, `attackDamage`, `machineAttackDamage`)
- `game.mwd.machineHeat` — adjust and resolve machine heat outside of the normal activation flow
- `game.mwd.personalCombat` — static methods for activation state and action economy
- `game.mwd.traits`, `game.mwd.skills`, `game.mwd.lifeModules` — data lookup helpers

See [docs/macro-scripting-reference.md](docs/macro-scripting-reference.md) for the full payload reference, mode options, status effect ID list, and example macros.

---

## Known Limitations

- Weapon standard-trait rules are not automated; the trait registry is disabled until the rules are backed by concrete behavior. Trait roll modifiers (from qualities and asset modules) are active through the modifier provider pipeline, which is separate.
- Vehicle combat is implemented but some machine verbs remain stubs: charge/DFA, shielding, indirect spotting, and ejection
- Area support is limited to the executable template shapes (blast, cone, line)
- Attack damage application is queued from chat cards, not automatically pushed to targets
- Some code, settings, docs, and templates still use older Anarchy-era naming during the ongoing migration
- No licensed MechWarrior: Destiny rulebook content is distributed

---

## Compendiums

The repository ships with:

- **Skills**
- **Qualities**
- **Gear**
- **Armor**
- **Weapons**
- **Asset Modules**
- **Machine Critical Hit Tables**
- **Macros**
- **Gamemaster information**

You will still need your own copy of **MechWarrior: Destiny** for the actual rules and setting content.

---

## Installing The System

1. In Foundry VTT, open **Configuration and Setup → Game Systems → Install System**
2. Paste the manifest URL:
   `https://raw.githubusercontent.com/acemb-rso/MWD/main/system.json`
3. Or download the latest archive:
   `https://github.com/acemb-rso/MWD/archive/refs/heads/main.zip`
4. Extract to `Data/systems/mwd` if installing manually

After installation, select **MechWarrior: Destiny** when creating a world.

---

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
- Run tests: `npm test`
- Pack compendiums to `dist/`: `npm run packCompendiumsToDist`
- Pack compendiums to public directory: `npm run packCompendiumsToPublic`
- Unpack compendiums from public directory: `npm run unpackCompendiumsFromPublic`

---

## Repository Layout

```
system.json           Foundry manifest and compatibility data
template.json         Actor and item data templates
src/modules/          Actor classes, item models, sheets, rolls, combat, GM utilities, migrations
templates/v2/         Active AppV2 UI templates
templates/            Older legacy templates still used in transitional areas
styles/               Compiled CSS
src/styles/           SCSS sources
packs/                Source compendium content
dist/                 Build output
tests/                Node-based unit tests for pure and near-pure modules
tools/                Compendium maintenance and JSON validation scripts
docs/                 Design notes, codebase map, feature plans, and scripting reference
```

See [docs/codebase-map.md](docs/codebase-map.md) for a full module-by-module breakdown of the source tree.

---

## License And Attribution

This project is released under [Creative Commons Attribution 4.0](LICENSE.md).

MechWarrior, BattleTech, and MechWarrior: Destiny are trademarks of their respective owners. This repository is a fan project and does not distribute licensed rulebook content.
