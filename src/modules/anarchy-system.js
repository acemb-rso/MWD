import { ANARCHY } from './config.js';
import { Enums } from './enums.js';
import { LOG_HEAD, SYSTEM_NAME } from './constants.js';
import { ChatManager } from './chat/chat-manager.js';
import { GMAnarchy } from './app/gm-anarchy.js';
import { GMManager } from './app/gm-manager.js';
import { HandlebarsManager } from './handlebars-manager.js';
import { RemoteCall } from './remotecall.js';
import { Styles } from './styles.js';
import { AnarchyUsers } from './users.js';
import { HooksManager } from './hooks-manager.js';
import { AnarchyDice } from './roll/dice.js';
import { AnarchyRoll } from './roll/anarchy-roll.js';
import { Migrations } from './migrations.js';
import { Skills } from './skills.js';
import { AnarchyBaseItem } from './item/anarchy-base-item.js';
import { AnarchyBaseActor } from './actor/base-actor.js';
import { CharacterActor } from './actor/character-actor.js';
import { DeviceActor } from './actor/device-actor.js';
import { VehicleActor } from './actor/vehicle-actor.js';
import { CharacterActorSheet } from './actor/character-sheet.js';
import { DeviceSheet } from './actor/device-sheet.js';
import { VehicleSheet } from './actor/vehicle-sheet.js';
import { CharacterNPCSheet } from './actor/character-npc-sheet.js';
import { SkillItem } from './item/skill-item.js';
import { MetatypeItem } from './item/metatype-item.js';
import { CyberdeckItem } from './item/cyberdeck-item.js';
import { WeaponItem } from './item/weapon-item.js';
import { ContactItemSheet } from './item/contact-item-sheet.js';
import { CyberdeckItemSheet } from './item/cyberdeck-item-sheet.js';
import { GearItemSheet } from './item/gear-item-sheet.js';
import { MetatypeItemSheet } from './item/metatype-item-sheet.js';
import { QualityItemSheet } from './item/quality-item-sheet.js';
import { ShadowampItemSheet } from './item/shadowamp-item-sheet.js';
import { SkillItemSheet } from './item/skill-item-sheet.js';
import { WeaponItemSheet } from './item/weapon-item-sheet.js';
import { ContactItem } from './item/contact-item.js';
import { GearItem } from './item/gear-item.js';
import { QualityItem } from './item/quality-item.js';
import { ShadowampItem } from './item/shadowamp-item.js';
import { Checkbars } from './common/checkbars.js';
import { RollParameters } from './roll/roll-parameters.js';
import { RollDialog } from './roll/roll-dialog.js';
import { GMConvergence } from './app/gm-convergence.js';
import { AnarchyCombat } from './anarchy-combat.js';
import { ICSheet } from './actor/ic-sheet.js';
import { SpriteActorSheet } from './actor/sprite-sheet.js';
import { SpriteActor } from './actor/sprite-actor.js';
import { ICActor } from './actor/ic-actor.js';
import { HUDShortcuts } from './token/hud-shortcuts.js';
import { CombatManager } from './combat/combat-manager.js';
import { RollManager } from './roll/roll-manager.js';
import { CharacterTabbedSheet } from './actor/character-tabbed-sheet.js';
import { CharacterEnhancedSheet } from './actor/character-enhanced-sheet.js';
import { Modifiers } from './modifiers/modifiers.js';
import { ActorDamageManager } from './actor/actor-damage.js';
import { AttributeActions } from './attribute-actions.js';
import { DiceCursor } from './roll/dice-cursor.js';

/* -------------------------------------------- */
/*  Foundry VTT AnarchySystem Initialization    */
/* -------------------------------------------- */

export class AnarchySystem {

  static start() {
    const anarchySystem = new AnarchySystem();
    Hooks.once('init', async () => await anarchySystem.onInit());
  }

  async onInit() {
    console.log(LOG_HEAD + 'AnarchySystem.onInit');
    game.system.anarchy = this;
    this.remoteCall = new RemoteCall(); // initialize remote calls registry first: used by other singleton managers

    this.actorClasses = {
      character: CharacterActor,
      vehicle: VehicleActor,
      device: DeviceActor,
      sprite: SpriteActor,
      ic: ICActor
    }
    this.itemClasses = {
      contact: ContactItem,
      cyberdeck: CyberdeckItem,
      gear: GearItem,
      metatype: MetatypeItem,
      quality: QualityItem,
      shadowamp: ShadowampItem,
      skill: SkillItem,
      weapon: WeaponItem
    }

    this.hooks = new HooksManager();
    this.styles = new Styles();
    this.handlebarsManager = new HandlebarsManager();
    this.gmAnarchy = new GMAnarchy();
    this.gmConvergence = new GMConvergence();
    Enums.init();

    this.skills = new Skills();
    this.modifiers = new Modifiers();
    this.rollParameters = new RollParameters();
    this.rollManager = new RollManager();
    this.hudShortcuts = new HUDShortcuts();
    this.combatManager = new CombatManager();

    console.log(LOG_HEAD + 'AnarchySystem.onInit | loading system');
    CONFIG.ANARCHY = ANARCHY;
    CONFIG.Combat.documentClass = AnarchyCombat;
    CONFIG.Combat.initiative = { formula: "2d6" }
    CONFIG.Actor.documentClass = AnarchyBaseActor;
    CONFIG.Item.documentClass = AnarchyBaseItem;

    Checkbars.init();
    this.loadActorSheets();
    this.loadItemSheets();

    WeaponItem.init();
    DiceCursor.init();
    RollDialog.init();
    AttributeActions.init();
    AnarchyCombat.init();
    AnarchyUsers.init();
    AnarchyDice.init();
    AnarchyRoll.init();
    AnarchyBaseItem.init()
    AnarchyBaseActor.init()
    ActorDamageManager.init();
    ChatManager.init();
    this.gmManager = new GMManager(this.gmAnarchy, this.gmConvergence);
    console.log(LOG_HEAD + 'AnarchySystem.onInit | done');
    Hooks.once('ready', () => this.onReady());
  }

  async onReady() {
    console.log(LOG_HEAD + 'AnarchySystem.onReady');
    if (game.user.isGM) {
      new Migrations().migrate();
    }
  }

  loadActorSheets() {
    Actors.unregisterSheet('core', ActorSheet);
    Actors.registerSheet(SYSTEM_NAME, CharacterActorSheet, {
      label: game.i18n.localize(ANARCHY.actor.characterSheet),
      makeDefault: false,
      types: ['character']
    });
    Actors.registerSheet(SYSTEM_NAME, CharacterNPCSheet, {
      label: game.i18n.localize(ANARCHY.actor.characterNPCSheet),
      makeDefault: false,
      types: ['character']
    });
    Actors.registerSheet(SYSTEM_NAME, CharacterTabbedSheet, {
      label: game.i18n.localize(ANARCHY.actor.characterTabbedSheet),
      makeDefault: false,
      types: ['character']
    });
    Actors.registerSheet(SYSTEM_NAME, CharacterEnhancedSheet, {
      label: game.i18n.localize(ANARCHY.actor.characterEnhancedSheet),
      makeDefault: true,
      types: ['character']
    });
    Actors.registerSheet(SYSTEM_NAME, VehicleSheet, {
      label: game.i18n.localize(ANARCHY.actor.vehicleSheet),
      makeDefault: true,
      types: ['vehicle']
    });
    Actors.registerSheet(SYSTEM_NAME, DeviceSheet, {
      label: game.i18n.localize(ANARCHY.actor.deviceSheet),
      makeDefault: true,
      types: ['device']
    });
    Actors.registerSheet(SYSTEM_NAME, SpriteActorSheet, {
      label: game.i18n.localize(ANARCHY.actor.spriteSheet),
      makeDefault: true,
      types: ['sprite']
    });
    Actors.registerSheet(SYSTEM_NAME, ICSheet, {
      label: game.i18n.localize(ANARCHY.actor.icSheet),
      makeDefault: true,
      types: ['ic']
    });
  }

  loadItemSheets() {
    Items.unregisterSheet('core', ItemSheet);
    Items.registerSheet(SYSTEM_NAME, ContactItemSheet, { types: ["contact"], makeDefault: true });
    Items.registerSheet(SYSTEM_NAME, CyberdeckItemSheet, { types: ["cyberdeck"], makeDefault: true });
    Items.registerSheet(SYSTEM_NAME, GearItemSheet, { types: ["gear"], makeDefault: true });
    Items.registerSheet(SYSTEM_NAME, MetatypeItemSheet, { types: ["metatype"], makeDefault: true });
    Items.registerSheet(SYSTEM_NAME, QualityItemSheet, { types: ["quality"], makeDefault: true });
    Items.registerSheet(SYSTEM_NAME, ShadowampItemSheet, { types: ["shadowamp"], makeDefault: true });
    Items.registerSheet(SYSTEM_NAME, SkillItemSheet, { types: ["skill"], makeDefault: true });
    Items.registerSheet(SYSTEM_NAME, WeaponItemSheet, { types: ["weapon"], makeDefault: true });
  }

}