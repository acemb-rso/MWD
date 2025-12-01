# Welcome to MechWarrior: Destiny

This Foundry VTT system is an early conversion of the Shadowrun Anarchy codebase to support Catalyst Game Labs' **MechWarrior: Destiny** roleplaying game. The first pass focuses on renaming core identifiers, attributes, and condition tracks to match Destiny while we continue iterating on rules-specific features.

## Installation

- In Foundry VTT go to **Configuration and Setup → Game Systems → Install System** and paste the manifest URL:
  `https://raw.githubusercontent.com/acemb-rso/MWD/main/system.json`.
- If you prefer a manual install, download the latest build from the repository (`https://github.com/acemb-rso/MWD/archive/refs/heads/main.zip`) and extract it into `Data/systems/mwd`.

## Characters

- Player characters and NPCs share the same core sheet options (full, tabbed, and limited views).
- Destiny traits are mapped onto the existing attribute framework: Reflexes replaces Agility and Intelligence replaces Logic, alongside Strength, Willpower, Charisma, and Edge.
- Condition monitors now track **Physical** and **Fatigue** damage instead of Physical and Stun. Armor remains available for absorbing incoming harm.
- Items retain the Anarchy-compatible categories for now (skills, weapons, gear, shadow amps, and contacts) while we transition them to Destiny equipment. Cyberdecks, sprites, IC, and other Matrix artifacts are intentionally unused in this system.

Rolls can be triggered directly from the sheet (attributes, skills, and weapons) or via token HUD shortcuts. Weapon rolls prompt targeted defenders to respond with an opposed roll.

![Sample of a character ](./img/sample-character.webp)

## Vehicles and BattleMechs

- **Vehicles** represent personal-scale transports (including drones). They use simple Structure and Armor tracks and avoid heat or mount-point management.
- **Battlemechs** cover full mech-scale units. Their sheets include heat tracking, mount-point-aware weapon groups, and other chassis-specific systems.

## Gamemaster tools

The GM Manager icon appears in the chat bar for GMs (an eye-shaped button at the top of the chat sidebar). Clicking it opens a small always-on-top dashboard with two key helpers:

- **Anarchy/plot tracker:** a row of clickable boxes at the top of the GM Manager that mirrors the plot/anarchy pool. Click an empty box to add a point or a filled box to spend one; changes sync to NPC sheets so you can spend or award points without opening actor sheets. (The boxes only appear in the GM Manager overlay—clicking the plot counter on an actor sheet will not change the shared pool.)
- **Difficulty pool buttons:** configurable shortcuts that roll preset difficulty pools (e.g., *Trivial:4, Easy:6* by default) and post the results to chat. Adjust the pool list in **Settings → Configure Settings → System Settings → Default difficulty pools** using comma-separated `Label:Pool` entries.

The plot/anarchy pool is stored as a world setting and only changed through the GM Manager checkboxes (ticking a box increases the pool, clearing one spends a point). Difficulty rolls are informational; they post a standalone pool result to chat but are not linked to opposed rolls. Players can still oppose rolls normally from their sheets, or you can treat the posted difficulty total as a target number for their action.

Close the manager with the eye-slash button, or toggle it again from the chat bar. Matrix-specific utilities have been removed from the primary workflow.

## Compendiums

No compendiums are provided to avoid distributing licensed content. You will need your own copy of the MechWarrior: Destiny rules to play.

## Legal mentions

### License

The system is developed under [Creative Commons BY-SA]("http://creativecommons.org/licenses/by/4.0/); see [LICENSE.md](LICENSE.md) for details.

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.

### Trademarks

MechWarrior, BattleTech, and MechWarrior: Destiny are trademarks and/or registered trademarks of The Topps Company, Inc. Catalyst Game Labs and the Catalyst Game Labs logo are trademarks of InMediaRes Productions, LLC. This fan project is not affiliated with or endorsed by The Topps Company, Inc. or Catalyst Game Labs.

## Credits & attributions

Icons are derived from original icons provided under [Creative Commons 3.0 BY license](http://creativecommons.org/licenses/by/3.0/), on [game-icons.net](game-icons.net):
- by Lorc
- by Delapouite
- by Skoll

See [game-icons-sources.txt](./game-icons-sources.txt) for the list of used icons and the original names in case files were renamed.

# The Destiny development team

- Half (Development)
- Los Brutos (Documentation and support)
- Pretre (Rules insights and contributor)
- VincentVK (Development)
