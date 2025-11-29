import { ANARCHY_SYSTEM, LOG_HEAD, SYSTEM_NAME, TEMPLATE } from "./constants.js";
import { ANARCHY_SKILLS } from "./skills.js";
import { ANARCHY_HOOKS, HooksManager } from "./hooks-manager.js";
import { Misc } from "./misc.js";
import { AttributeActions } from "./attribute-actions.js";

export const DECLARE_MIGRATIONS = 'anarchy-declareMigration';
const SYSTEM_MIGRATION_CURRENT_VERSION = "systemMigrationVersion";

export class Migration {
  get code() { return "sample"; }

  get version() { return "0.0.0"; }

  async migrate() { return () => { } };

  async applyItemsUpdates(computeUpdates) {
    await game.actors.forEach(async (actor) => {
      const actorItemUpdates = computeUpdates(actor.items);
      if (actorItemUpdates.length > 0) {
        console.log(this.code, `Applying updates on actor ${actor.name} items`, actorItemUpdates);
        await actor.updateEmbeddedDocuments('Item', actorItemUpdates);
      }
    });

    const itemUpdates = computeUpdates(game.items);
    if (itemUpdates.length > 0) {
      console.log(this.code, 'Applying updates on items', itemUpdates);
      await Item.updateDocuments(itemUpdates);
    }
  }
}

class _0_3_1_MigrationMoveWordsInObjects extends Migration {
  get version() { return '0.3.1' }
  get code() { return 'move-words-in-objects'; }

  async migrate() {
    game.actors.forEach(async actor => {
      await actor.update({
        ['system.keywords']: this._createWordObject(actor.system.keywords),
        ['system.cues']: this._createWordObject(actor.system.cues),
        ['system.dispositions']: this._createWordObject(actor.system.dispositions),
      });
    });
  }

  _createWordObject(current) {
    return Misc.reindexIds((current ?? []).map(k => this._keywordToObject(k)));
  }
  _keywordToObject(k) {
    if (k instanceof String) {
      return { word: k }
    }
    return k
  }
}

class _0_3_8_MigrateWeaponDamage extends Migration {
  get version() { return '0.3.8' }
  get code() { return 'migrate-weapons-strength-damage'; }

  async migrate() {

    const isStrengthDamageItem = it => it.type == TEMPLATE.itemType.weapon && it.system.strength;
    const fixItemDamage = it => {
      return {
        _id: it.id,
        'system.damageAttribute': TEMPLATE.attributes.strength,
        'system.strength': undefined,
      }
    };

    this.applyItemsUpdates(items => items.filter(isStrengthDamageItem).map(fixItemDamage));
  }

}

class _0_3_14_MigrateSkillDrainConvergence extends Migration {
  get version() { return '0.3.14' }
  get code() { return 'migrate-skill-drain-convergence'; }

  async migrate() {
    const withDrain = ANARCHY_SKILLS.filter(it => it.hasDrain).map(it => it.code);
    const hasDrain = it => it.type == TEMPLATE.itemType.skill && withDrain.includes(it.system.code);
    const setDrain = it => { return { _id: it.id, 'system.hasDrain': true } };

    const withConvergence = ANARCHY_SKILLS.filter(it => it.hasConvergence).map(it => it.code);
    const hasConvergence = it => it.type == TEMPLATE.itemType.skill && withConvergence.includes(it.system.code);
    const setConvergence = it => { return { _id: it.id, 'system.hasConvergence': true } };

    const computeUpdates = items => items.filter(hasDrain).map(setDrain)
      .concat(items.filter(hasConvergence).map(setConvergence))

    await this.applyItemsUpdates(computeUpdates);
  }
}

class _0_4_0_SelectWeaponDefense extends Migration {
  get version() { return '0.4.0' }
  get code() { return 'migrate-select-weapon-defense'; }

  async migrate() {
    const findWeaponSkillWithDefense = weapon => ANARCHY_SKILLS.find(it => it.defense && it.code == weapon.system.skill);
    const setDefense = weapon => {
      return {
        _id: weapon.id,
        'system.defense': AttributeActions.fixedDefenseCode(findWeaponSkillWithDefense(weapon)?.defense)
      }
    };

    await this.applyItemsUpdates(items =>
      items.filter(it => it.isWeapon())
        .filter(findWeaponSkillWithDefense)
        .map(setDefense));
  }
}

class _0_5_0_MigrationBaseResistanceIsZero extends Migration {
  get version() { return '0.5.0' }
  get code() { return 'base-resistance-is-zero'; }

  async migrate() {
    game.actors.forEach(async actor => await actor.update(this._resistanceUpdates(actor)));
  }

  _resistanceUpdates(actor) {
    const updates = {};
    Object.entries(actor.system.monitors).forEach(
      kv => {
        if (kv[1].resistance) {
          updates[`system.monitors.${kv[0]}.resistance`] = 0;
        }
      });
    return updates;
  }
}

class _0_6_0_MigrateSkillSocial extends Migration {
  get version() { return '0.6.0' }
  get code() { return 'migrate-skill-social' }

  async migrate() {
    const socialSkills = ANARCHY_SKILLS.filter(it => it.isSocial).map(it => it.code)
    const isSocial = it => it.type == TEMPLATE.itemTypeskill && socialSkills.includes(it.system.code)
    const setSocial = it => { return { _id: it.id, 'system.isSocial': true } }
    await this.applyItemsUpdates(items => items.filter(isSocial).map(setSocial))
  }
}

class _11_1_0_MigrateAndWarnAboutDefenseModifiers extends Migration {
  get version() { return '11.1.0' }
  get code() { return 'migrate-defense-roll-modifiers' }

  constructor() {
    super()
    this.isDefenseModifier = modifier => (modifier.group == 'roll'
      && modifier.category == 'defense');
    this.isCorrespondingActionModifier = (modifier, defense) => (modifier.group == 'roll'
      && modifier.effect == defense.effect
      && modifier.category == 'attributeAction'
      && modifier.subCategory == defense.subCategory)
    this.hasDefenseModifiers = it => (it.system.modifiers ?? [])
      .filter(this.isDefenseModifier).length > 0
  }

  async migrate() {
    const actualUpdates = []
    await this.applyItemsUpdates(items => {
      const itemsWithDefenseModifiers = items.filter(this.hasDefenseModifiers);
      return itemsWithDefenseModifiers.map(item => this.getItemModifiersUpdate(item, actualUpdates));
    })
    if (actualUpdates.length > 0)
      ChatMessage.create({
        whisper: ChatMessage.getWhisperRecipients('GM'),
        content: `${this.version} - Migration of defense modifiers:<ul>` + actualUpdates.reduce((a, b) => a + b) + `</ul></li>`
      })
  }

  getItemModifiersUpdate(item, actualUpdates) {
    const itemNotes = []
    function addNote(action, d, m) {
      itemNotes.push(`<li> ${action}: ${d.group}/${d.effect}/${d.subCategory} : ${d.category}/${d.value} ${d.condition} => ${m.category}/${m.value} ${m.condition}</li>`)
    }

    const newModifiers = {}
    item.system.modifiers.forEach(m => newModifiers[m.id] = duplicate(m))

    Object.values(newModifiers).filter(m => this.isDefenseModifier(m))
      .forEach(defense => {
        const oldDefense = duplicate(defense)
        let actionAttributes = Object.values(newModifiers).filter(other => this.isCorrespondingActionModifier(other, defense))
        switch (actionAttributes.length) {
          case 0: {
            defense.category = ANARCHY_SYSTEM.rollType.attributeAction
            addNote('Changed category', oldDefense, defense)
            break
          }
          case 1: {
            const other = actionAttributes[0]
            foundry.utils.mergeObject(other, {
              value: Math.max(defense.value, other.value),
              condition: (other.condition ? other.condition + (defense.condition ?? '') : defense.condition)
            }, { overwrite: true })
            delete newModifiers[defense.id]
            addNote('Merged with existing', defense, other)
            break
          }
          default: {
            delete newModifiers[defense.id]
            addNote('Removed', defense, { category: '-', value: '-', condition: '-' })
            break
          }
        }
      })
    if (itemNotes.length > 0) {
      actualUpdates.push(`<li> ${item.actor ? item.actor.name : '-standalone-'} Item ${item.name} modifiers changed:
        <ul>${itemNotes.reduce(Misc.joiner())}</ul>
        </li>`)
    }
    return { _id: item.id, 'system.modifiers': Object.values(newModifiers) }
  }
}

class _11_1_9_MigrateVehicleHandlingToAttribute extends Migration {
  get version() { return '11.1.9' }
  get code() { return 'migrate-vehicle-handling' }

  async migrate() {
    game.actors.filter(it => it.isVehicle()).forEach(async actor => await actor._migrateHandlingToAttribute())
  }
}

class _11_1_12_MigrateBackWords extends Migration {
  get version() { return '11.1.12' }
  get code() { return 'migrate-back-words' }
  async migrate() {
    game.actors.forEach(async actor => {
      await actor.update({
        ['system.keywords']: this._migrateBackWords(actor.system.keywords),
        ['system.cues']: this._migrateBackWords(actor.system.cues),
        ['system.dispositions']: this._migrateBackWords(actor.system.dispositions),
      });
    });
  }

  _migrateBackWords(current) {
    if (current) {
      return Misc.reindexIds(current.map(k => this._migrateBackWord(k)));
    }
    return []
  }

  _migrateBackWord(k) {
    while (k.word != undefined && !Misc.isString(k.word)) {
      k = k.word
    }
    return k
  }
}

class _11_1_16_MigrateSkillsAttributes extends Migration {
  get version() { return '11.1.16' }
  get code() { return 'migrate-skills-attributes' }
  async migrate() {
    this.applyItemsUpdates(items => items.filter(it => it.type == TEMPLATE.itemType.skill)
      .filter(it => it.system.attribute == '' || it.system.code == '')
      .map(it => {
        return {
          _id: it.id,
          'system.attribute': '',
          'system.code': TEMPLATE.attributes.knowledge
        }
      }));
  }
}

class _12_0_1_MigrateChatMessageFlags extends Migration {
  get version() { return '12.0.1' }
  get code() { return 'migrate-chatmessage-flags-messagedata' }
  async migrate() {
    await Promise.all(
      game.messages.map(async message => {
        const json = message.getFlag(SYSTEM_SCOPE, MESSAGE_DATA)
        if (json) {
          await message.setFlag(SYSTEM_SCOPE, MESSAGE_DATA, JSON.parse(json))
        }
      })
    )
  }
}

class _12_0_4_MigrateWeaponDrain extends Migration {
  get version() { return '12.0.2' }
  get code() { return 'migrate-weapon-drain' }
  async migrate() {
    this.applyItemsUpdates(items => items.filter(it => it.type = TEMPLATE.itemType.weapon)
      .filter(it => it.hasDrain)
      .map(it => {
        return {
          _id: it.id,
          'system.drain': 1
        }
      }))
  }
}

export class Migrations {
  constructor() {
    HooksManager.register(ANARCHY_HOOKS.DECLARE_MIGRATIONS);

    Hooks.once(ANARCHY_HOOKS.DECLARE_MIGRATIONS, addMigrations => addMigrations(
      new _0_3_1_MigrationMoveWordsInObjects(),
      new _0_3_8_MigrateWeaponDamage(),
      new _0_3_14_MigrateSkillDrainConvergence(),
      new _0_4_0_SelectWeaponDefense(),
      new _0_5_0_MigrationBaseResistanceIsZero(),
      new _0_6_0_MigrateSkillSocial(),
      new _11_1_0_MigrateAndWarnAboutDefenseModifiers(),
      new _11_1_9_MigrateVehicleHandlingToAttribute(),
      new _11_1_12_MigrateBackWords(),
      new _11_1_16_MigrateSkillsAttributes(),
      new _12_0_1_MigrateChatMessageFlags(),
      new _12_0_4_MigrateWeaponDrain(),
    ));

    game.settings.register(SYSTEM_NAME, SYSTEM_MIGRATION_CURRENT_VERSION, {
      name: "System Migration Version",
      scope: "world",
      config: false,
      type: String,
      default: "0.0.0"
    });
  }

  migrate() {
    const currentVersion = game.settings.get(SYSTEM_NAME, SYSTEM_MIGRATION_CURRENT_VERSION);
    if (foundry.utils.isNewerVersion(game.system.version, currentVersion)) {
      //if (true) {
      let migrations = [];
      Hooks.callAll(ANARCHY_HOOKS.DECLARE_MIGRATIONS, (...addedMigrations) =>
        migrations = migrations.concat(addedMigrations.filter(m => foundry.utils.isNewerVersion(m.version, currentVersion)))
      );
      Hooks.off(ANARCHY_HOOKS.DECLARE_MIGRATIONS, () => { });

      if (migrations.length > 0) {

        migrations.sort((a, b) => foundry.utils.isNewerVersion(a.version, b.version) ? 1 : foundry.utils.isNewerVersion(b.version, a.version) ? -1 : 0);
        migrations.forEach(async m => {
          ui.notifications.info(`Executing migration ${m.code}: version ${currentVersion} is lower than ${m.version}`);
          await m.migrate();
        });
        ui.notifications.info(`Migrations done, version will change to ${game.system.version}`);
      }
      else {
        console.log(LOG_HEAD + `No migration needeed, version will change to ${game.system.version}`)
      }
      game.settings.set(SYSTEM_NAME, SYSTEM_MIGRATION_CURRENT_VERSION, game.system.version);
    }
    else {
      console.log(LOG_HEAD + `No system version changed`);
    }
  }

}
