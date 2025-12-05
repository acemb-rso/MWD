import { ANARCHY_SYSTEM, LOG_HEAD, SYSTEM_NAME, SYSTEM_SCOPE, TEMPLATE } from "./constants.js";
import { ANARCHY_SKILLS } from "./skills.js";
import { ANARCHY_HOOKS, HooksManager } from "./hooks-manager.js";
import { Misc } from "./misc.js";
import { AttributeActions } from "./attribute-actions.js";
import { MESSAGE_DATA } from "./chat/chat-manager.js";

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

    const isStrengthDamageItem = it => it.isWeapon?.() && it.system.strength;
    const fixItemDamage = it => {
      return {
        _id: it.id,
        'system.damageAttribute': TEMPLATE.actorAttributes.strength,
        'system.strength': undefined,
      }
    };

    this.applyItemsUpdates(items => items.filter(isStrengthDamageItem).map(fixItemDamage));
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
          'system.code': TEMPLATE.itemAttributes.knowledge
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

class _13_2_2_AddMwdVehicleModel extends Migration {
  get version() { return '13.2.2' }
  get code() { return 'migrate-mwd-vehicle-model' }

  async migrate() {
    const vehicles = game.actors.filter(it => it.isVehicle());
    for (const actor of vehicles) {
      const updates = this._collectVehicleUpdates(actor);
      if (Object.keys(updates).length > 0) {
        await actor.update(updates);
      }
    }
  }

  _collectVehicleUpdates(actor) {
    const updates = {};

    const autopilot = actor.system.attributes?.autopilot?.value ?? 0;
    const handling = actor.system.attributes?.handling?.value ?? 0;
    const desiredHandling = handling || autopilot || 3;
    if (!actor.system.attributes?.handling || handling !== desiredHandling) {
      updates['system.attributes.handling.value'] = desiredHandling;
    }

    const systemValue = actor.system.attributes?.system?.value ?? 0;
    if (!actor.system.attributes?.system) {
      updates['system.attributes.system.value'] = systemValue || 3;
    }

    const chassis = actor.system.attributes?.chassis?.value;
    if (chassis === undefined) {
      updates['system.attributes.chassis.value'] = 3;
    }

    const condition = actor.system.attributes?.condition?.value;
    if (condition === undefined) {
      updates['system.attributes.condition.value'] = 3;
    }

    if (!actor.system.mwd) {
      updates['system.mwd'] = this._defaultMwdData(actor.type);
    }

    return updates;
  }

  _defaultMwdData(actorType) {
    const isMech = actorType === TEMPLATE.actorTypes.battlemech;
    const base = {
      unitType: isMech ? 'mech' : 'vehicle',
      weightClass: isMech ? 'medium' : 'vehicle',
      heat: {
        current: 0,
        safeMax: 1,
        hardMax: 4,
        ventPerTurn: 1,
        coolingImpaired: false,
      },
      locations: {},
      hardpoints: [],
      weaponGroups: [],
      primarySlot: {
        mode: 'normal',
        allowedWeaponIds: [],
        typeRestriction: '',
      },
      melee: {
        baseProfile: {
          name: 'Unarmed',
          damage: '',
          notes: '',
        },
        maxWeapons: 0,
        allowedLocations: [],
      },
      crits: [],
      crew: {
        count: isMech ? 1 : 3,
        effectiveCount: isMech ? 1 : 3,
        injuryLevel: 0,
        bailedOut: false,
      },
      status: {
        state: 'operational',
        reasons: [],
      },
      config: {
        critTargetNumber: 8,
        critOnSnakeEyes: true,
        maxLocationStress: 3,
        heatBands: {
          safe: 1,
          runningHot: 2,
          overheated: 3,
          shutdown: 4,
        },
      },
    };

    base.locations = isMech ? this._defaultMechLocations() : this._defaultVehicleLocations();
    return base;
  }

  _defaultVehicleLocations() {
    return {
      front: { enabled: true, stress: 0, tags: ['weaponGroup', 'motiveSystem'], destroyed: false },
      side: { enabled: true, stress: 0, tags: ['weaponGroup', 'motiveSystem'], destroyed: false },
      rear: { enabled: true, stress: 0, tags: ['weaponGroup', 'motiveSystem', 'ammoStore'], destroyed: false },
      turret: { enabled: true, stress: 0, tags: ['turret', 'weaponGroup'], destroyed: false },
      rotor: { enabled: false, stress: 0, tags: ['rotor'], destroyed: false },
      core: { enabled: true, stress: 0, tags: ['crewCompartment', 'engine', 'ammoStore'], destroyed: false },
    };
  }

  _defaultMechLocations() {
    return {
      head: { enabled: true, stress: 0, tags: ['cockpit', 'sensor'], destroyed: false },
      torsoFront: { enabled: true, stress: 0, tags: ['weaponGroup', 'engine'], destroyed: false },
      torsoRear: { enabled: true, stress: 0, tags: ['weaponGroup', 'ammoStore'], destroyed: false },
      leftArm: { enabled: true, stress: 0, tags: ['weaponGroup'], destroyed: false },
      rightArm: { enabled: true, stress: 0, tags: ['weaponGroup'], destroyed: false },
      leftLeg: { enabled: true, stress: 0, tags: ['motiveSystem'], destroyed: false },
      rightLeg: { enabled: true, stress: 0, tags: ['motiveSystem'], destroyed: false },
      core: { enabled: true, stress: 0, tags: ['engine', 'gyro', 'ammoStore'], destroyed: false },
    };
  }
}

class _13_2_3_AddBattlemechLoadout extends Migration {
  get version() { return '13.2.3' }
  get code() { return 'migrate-mwd-battlemech-loadout' }

  async migrate() {
    const mechs = game.actors.filter(it => it.type === TEMPLATE.actorTypes.battlemech);
    for (const actor of mechs) {
      const updates = {};
      this._ensure(actor, updates, 'system.mwd.weightClass', 'medium');
      this._ensure(actor, updates, 'system.mwd.hardpoints', []);
      this._ensure(actor, updates, 'system.mwd.weaponGroups', []);
      this._ensure(actor, updates, 'system.mwd.primarySlot.mode', 'normal');
      this._ensure(actor, updates, 'system.mwd.primarySlot.allowedWeaponIds', []);
      this._ensure(actor, updates, 'system.mwd.primarySlot.typeRestriction', '');
      this._ensure(actor, updates, 'system.mwd.melee.baseProfile.name', 'Unarmed');
      this._ensure(actor, updates, 'system.mwd.melee.baseProfile.damage', '');
      this._ensure(actor, updates, 'system.mwd.melee.baseProfile.notes', '');
      this._ensure(actor, updates, 'system.mwd.melee.maxWeapons', 0);
      this._ensure(actor, updates, 'system.mwd.melee.allowedLocations', []);
      if (Object.keys(updates).length > 0) {
        await actor.update(updates);
      }
    }

    const worldWeapons = game.items.filter(it => it.isWeapon?.());
    for (const weapon of worldWeapons) {
      const updates = this._collectWeaponUpdates(weapon);
      if (Object.keys(updates).length > 0) {
        await weapon.update(updates);
      }
    }

    for (const actor of game.actors) {
      const updates = actor.items
        .filter(it => it.isWeapon?.())
        .map(it => ({ _id: it.id, ...this._collectWeaponUpdates(it) }))
        .filter(update => Object.keys(update).length > 1);
      if (updates.length > 0) {
        await actor.updateEmbeddedDocuments('Item', updates);
      }
    }
  }

  _ensure(actor, updates, path, defaultValue) {
    const value = foundry.utils.getProperty(actor, path);
    if (value === undefined) {
      updates[path] = defaultValue;
    }
  }

  _collectWeaponUpdates(item) {
    const updates = {};
    this._ensureItem(item, updates, 'system.weaponCategory', 'ranged');
    this._ensureItem(item, updates, 'system.hardpointType', 'energy');
    this._ensureItem(item, updates, 'system.hardpointSize', 'small');
    this._ensureItem(item, updates, 'system.mountLocation', '');
    return updates;
  }

  _ensureItem(item, updates, path, defaultValue) {
    if (foundry.utils.getProperty(item, path) === undefined) {
      updates[path] = defaultValue;
    }
  }
}

class _13_3_3_SimplifyPersonalVehicles extends Migration {
  get version() { return '13.3.3' }
  get code() { return 'simplify-personal-vehicles' }

  async migrate() {
    const vehicles = game.actors.filter(actor => actor.type === TEMPLATE.actorTypes.vehicle);
    for (const actor of vehicles) {
      const updates = {};

      if (actor.system.monitors?.heat !== undefined) {
        updates['system.monitors.-=heat'] = null;
      }
      if (actor.system.hybrid !== undefined) {
        updates['system.-=hybrid'] = null;
      }
      if (actor.system.mwd !== undefined) {
        updates['system.-=mwd'] = null;
      }

      if (Object.keys(updates).length > 0) {
        await actor.update(updates);
      }
    }
  }
}

class _13_4_0_MigrateEdgePools extends Migration {
  get version() { return '13.4.0' }
  get code() { return 'edge-pools' }

  async migrate() {
    for (const actor of game.actors) {
      if (actor.type !== TEMPLATE.actorTypes.character) {
        continue;
      }
      const updates = {};
      const pools = actor.system?.counters?.edgePools ?? {};
      const oldSocial = actor.system?.counters?.social ?? {};
      const edgeValue = actor.system?.counters?.edge?.value ?? pools?.grit?.value ?? 0;

      updates['system.counters.edgePools.grit.value'] = pools?.grit?.value ?? edgeValue ?? 0;
      updates['system.counters.edgePools.insight.value'] = pools?.insight?.value ?? 0;
      updates['system.counters.edgePools.legend.value'] = pools?.legend?.value ?? oldSocial?.celebrity?.value ?? 0;
      updates['system.counters.edgePools.credibility.value'] = pools?.credibility?.value ?? oldSocial?.credibility?.value ?? 0;
      updates['system.counters.edgePools.rumor.value'] = pools?.rumor?.value ?? oldSocial?.rumor?.value ?? 0;
      updates['system.counters.edgePools.chaos.value'] = pools?.chaos?.value ?? actor.system?.counters?.sceneAnarchy?.value ?? 0;

      updates['system.counters.-=edge'] = null;
      updates['system.counters.-=social'] = null;
      updates['system.counters.-=sceneAnarchy'] = null;

      await actor.update(updates);
    }
  }
}

class _13_4_1_DefaultEdgePoolValues extends Migration {
  get version() { return '13.4.1' }
  get code() { return 'edge-pool-defaults' }

  async migrate() {
    for (const actor of game.actors) {
      if (actor.type !== TEMPLATE.actorTypes.character) {
        continue;
      }

      const edgeValue = actor.system?.attributes?.edge?.value ?? actor.system?.counters?.edge?.value ?? 0;
      if (!edgeValue) {
        continue;
      }

      const pools = actor.system?.counters?.edgePools ?? {};
      const updates = {};

      Object.values(TEMPLATE.counters.edgePools).forEach(code => {
        const current = pools?.[code]?.value;
        const hasValue = current !== undefined && current !== null;
        const needsUpdate = !hasValue || current < edgeValue;

        if (needsUpdate) {
          updates[`system.counters.edgePools.${code}.value`] = edgeValue;
        }
      });

      if (Object.keys(updates).length > 0) {
        await actor.update(updates);
      }
    }
  }
}

class _13_6_0_MigrateTypedResistance extends Migration {
  get version() { return '13.6.0' }
  get code() { return 'typed-resistance' }

  async migrate() {
    for (const actor of game.actors) {
      const updates = this._buildResistanceUpdates(actor);
      if (Object.keys(updates).length > 0) {
        await actor.update(updates);
      }
    }
  }

  _buildResistanceUpdates(actor) {
    const updates = {};
    Object.entries(actor.system.monitors ?? {}).forEach(([monitor, data]) => {
      const resistance = data?.resistance;
      const basePath = `system.monitors.${monitor}.resistance`;
      switch (typeof resistance) {
        case 'number':
          updates[basePath] = { default: resistance, byType: {} };
          break;
        case 'object':
          if (resistance?.default === undefined) {
            updates[`${basePath}.default`] = resistance?.default ?? 0;
          }
          if (resistance?.byType === undefined) {
            updates[`${basePath}.byType`] = resistance?.byType ?? {};
          }
          break;
        default:
          updates[basePath] = { default: 0, byType: {} };
      }
    });
    return updates;
  }
}

class _13_6_1_RenameShadowampsToAssetModules extends Migration {
  get version() { return '13.6.1' }
  get code() { return 'rename-shadowamps-asset-modules' }

  async migrate() {
    await this.applyItemsUpdates(items => items
      .filter(it => it.type === 'shadowamp')
      .map(it => ({ _id: it.id, type: TEMPLATE.itemType.assetModule }))
    );
  }
}

class _13_6_2_AddMwdVehicleScaffold extends Migration {
  get version() { return '13.6.2' }
  get code() { return 'mwd-vehicle-scaffold' }

  async migrate() {
    const vehicles = game.actors.filter(it => [TEMPLATE.actorTypes.vehicle, TEMPLATE.actorTypes.battlemech].includes(it.type));
    for (const actor of vehicles) {
      const updates = this._collectScaffoldUpdates(actor);
      if (Object.keys(updates).length > 0) {
        await actor.update(updates);
      }
    }
  }

  _collectScaffoldUpdates(actor) {
    const updates = {};
    const mwdAttributesPath = 'system.mwd.attributes';
    const mwdMonitorPath = 'system.mwd.monitors';

    if (!actor.system.mwd) {
      updates['system.mwd'] = {};
    }

    [TEMPLATE.actorAttributes.handling, TEMPLATE.actorAttributes.system,
      TEMPLATE.actorAttributes.condition, TEMPLATE.actorAttributes.chassis]
      .forEach(attribute => {
        const current = actor.system.attributes?.[attribute]?.value;
        const existing = actor.system.mwd?.attributes?.[attribute]?.value ?? current;

        if (current === undefined) {
          updates[`system.attributes.${attribute}.value`] = existing ?? 0;
        }

        if (actor.system.mwd?.attributes?.[attribute]?.value === undefined) {
          updates[`${mwdAttributesPath}.${attribute}.value`] = existing ?? 0;
        }
      });

    const structure = actor.system.monitors?.structure ?? {};
    if (structure.value === undefined) {
      updates['system.monitors.structure.value'] = 0;
    }
    if (structure.max === undefined) {
      updates['system.monitors.structure.max'] = this._defaultStructureMax(actor.type);
    }
    if (structure.resistance === undefined) {
      updates['system.monitors.structure.resistance'] = { default: 0, byType: {} };
    }

    if (actor.system.mwd?.monitors?.structure === undefined) {
      updates[`${mwdMonitorPath}.structure`] = {
        value: structure.value ?? 0,
        max: structure.max ?? this._defaultStructureMax(actor.type),
        resistance: structure.resistance ?? { default: 0, byType: {} },
      };
    }

    if (actor.type === TEMPLATE.actorTypes.battlemech) {
      const heat = actor.system.monitors?.heat ?? {};
      const mwdHeat = actor.system.mwd?.heat ?? {};
      if (heat.value === undefined) {
        updates['system.monitors.heat.value'] = mwdHeat.current ?? 0;
      }
      if (heat.max === undefined) {
        updates['system.monitors.heat.max'] = mwdHeat.hardMax ?? 4;
      }
      if (heat.resistance === undefined) {
        updates['system.monitors.heat.resistance'] = { default: 0, byType: {} };
      }

      if (actor.system.mwd?.monitors?.heat === undefined) {
        updates[`${mwdMonitorPath}.heat`] = {
          value: heat.value ?? mwdHeat.current ?? 0,
          max: heat.max ?? mwdHeat.hardMax ?? 4,
          resistance: heat.resistance ?? { default: 0, byType: {} },
        };
      }
    }

    return updates;
  }

  _defaultStructureMax(actorType) {
    return actorType === TEMPLATE.actorTypes.battlemech ? 18 : 15;
  }
}

export class Migrations {
  constructor() {
    HooksManager.register(ANARCHY_HOOKS.DECLARE_MIGRATIONS);

    Hooks.once(ANARCHY_HOOKS.DECLARE_MIGRATIONS, addMigrations => addMigrations(
      new _0_3_1_MigrationMoveWordsInObjects(),
      new _0_3_8_MigrateWeaponDamage(),
      new _0_4_0_SelectWeaponDefense(),
      new _0_5_0_MigrationBaseResistanceIsZero(),
      new _0_6_0_MigrateSkillSocial(),
      new _11_1_0_MigrateAndWarnAboutDefenseModifiers(),
      new _11_1_9_MigrateVehicleHandlingToAttribute(),
      new _11_1_12_MigrateBackWords(),
      new _11_1_16_MigrateSkillsAttributes(),
      new _12_0_1_MigrateChatMessageFlags(),
      new _13_2_2_AddMwdVehicleModel(),
      new _13_2_3_AddBattlemechLoadout(),
      new _13_3_3_SimplifyPersonalVehicles(),
      new _13_4_0_MigrateEdgePools(),
      new _13_4_1_DefaultEdgePoolValues(),
      new _13_6_0_MigrateTypedResistance(),
      new _13_6_1_RenameShadowampsToAssetModules(),
      new _13_6_2_AddMwdVehicleScaffold(),
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
