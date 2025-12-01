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
import { VehicleActor } from './actor/vehicle-actor.js';
import { BattlemechActor } from './actor/battlemech-actor.js';
import { CharacterActorSheet } from './actor/character-sheet.js';
import { VehicleSheet } from './actor/vehicle-sheet.js';
import { BattlemechSheet } from './actor/battlemech-sheet.js';
import { CharacterNPCSheet } from './actor/character-npc-sheet.js';
import { SkillItem } from './item/skill-item.js';
import { WeaponItem } from './item/weapon-item.js';
import { ContactItemSheet } from './item/contact-item-sheet.js';
import { GearItemSheet } from './item/gear-item-sheet.js';
import { QualityItemSheet } from './item/quality-item-sheet.js';
import { AssetModuleItemSheet } from './item/asset-module-item-sheet.js';
import { SkillItemSheet } from './item/skill-item-sheet.js';
import { WeaponItemSheet } from './item/weapon-item-sheet.js';
import { ContactItem } from './item/contact-item.js';
import { GearItem } from './item/gear-item.js';
import { QualityItem } from './item/quality-item.js';
import { AssetModuleItem } from './item/asset-module-item.js';
import { Checkbars } from './common/checkbars.js';
import { RollParameters } from './roll/roll-parameters.js';
import { RollDialog } from './roll/roll-dialog.js';
import { AnarchyCombat } from './anarchy-combat.js';
import { HUDShortcuts } from './token/hud-shortcuts.js';
import { CombatManager } from './combat/combat-manager.js';
import { RollManager } from './roll/roll-manager.js';
import { CharacterTabbedSheet } from './actor/character-tabbed-sheet.js';
import { CharacterEnhancedSheet } from './actor/character-enhanced-sheet.js';
import { Modifiers } from './modifiers/modifiers.js';
import { ActorDamageManager } from './actor/actor-damage.js';
import { AttributeActions } from './attribute-actions.js';
import { DiceCursor } from './roll/dice-cursor.js';
import { SystemSettings } from './system-settings.js';

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
    game.system.mwd = this;
    game.system.anarchy = this;
    this.remoteCall = new RemoteCall(); // initialize remote calls registry first: used by other singleton managers

    this.actorClasses = {
      character: CharacterActor,
      vehicle: VehicleActor,
      battlemech: BattlemechActor
    }
    this.itemClasses = {
      contact: ContactItem,
      gear: GearItem,
      quality: QualityItem,
      assetModule: AssetModuleItem,
      skill: SkillItem,
      mechWeapon: WeaponItem,
      personalWeapon: WeaponItem
    }

    this.hooks = new HooksManager();
    this.styles = new Styles();
    this.handlebarsManager = new HandlebarsManager();
    this.gmAnarchy = new GMAnarchy();
    Enums.init();
    SystemSettings.register();

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
    this.gmManager = new GMManager(this.gmAnarchy);
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
    const { Actors } = foundry.documents.collections;
    Actors.unregisterSheet('core', foundry.appv1.sheets.ActorSheet);
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
    Actors.registerSheet(SYSTEM_NAME, BattlemechSheet, {
      label: game.i18n.localize(ANARCHY.actor.battlemechSheet),
      makeDefault: true,
      types: ['battlemech']
    });
  }

  loadItemSheets() {
    const { Items } = foundry.documents.collections;
    Items.unregisterSheet('core', foundry.appv1.sheets.ItemSheet);
    Items.registerSheet(SYSTEM_NAME, ContactItemSheet, { types: ["contact"], makeDefault: true });
    Items.registerSheet(SYSTEM_NAME, GearItemSheet, { types: ["gear"], makeDefault: true });
    Items.registerSheet(SYSTEM_NAME, QualityItemSheet, { types: ["quality"], makeDefault: true });
    Items.registerSheet(SYSTEM_NAME, AssetModuleItemSheet, { types: ["assetModule"], makeDefault: true });
    Items.registerSheet(SYSTEM_NAME, SkillItemSheet, { types: ["skill"], makeDefault: true });
    Items.registerSheet(SYSTEM_NAME, WeaponItemSheet, { types: ["mechWeapon", "personalWeapon"], makeDefault: true });
  }

}