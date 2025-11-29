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

## Gamemaster tools

The gamemaster dashboard provides quick access to plot resources, configurable difficulty pools, and combat helpers. Matrix-specific utilities have been removed from the primary workflow.

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
