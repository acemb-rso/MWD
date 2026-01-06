import { MWD } from './config.js';
import { Enums } from './enums.js';
import { LOG_HEAD, SYSTEM_NAME } from './constants.js';
import { ChatManager } from './chat/chat-manager.js';
import { HandlebarsManager } from './handlebars-manager.js';
import { GMManager } from './app/gm-manager.js';
import { RemoteCall } from './remotecall.js';
import { Styles } from './styles.js';
import { AnarchyUsers } from './users.js';
import { HooksManager } from './hooks-manager.js';
import { AnarchyDice } from './roll/dice.js';
import { AnarchyRoll } from './roll/anarchy-roll.js';
import { Migrations } from './migrations.js';
import { AnarchyBaseItem } from './item/anarchy-base-item.js';
import { AnarchyBaseActor } from './actor/base-actor.js';
import { CharacterActor } from './actor/character-actor.js';
import { VehicleActor } from './actor/vehicle-actor.js';
import { BattlemechActor } from './actor/battlemech-actor.js';
import { SkillItem } from './item/skill-item.js';
import { WeaponItem } from './item/weapon-item.js';
import { ContactItem } from './item/contact-item.js';
import { GearItem } from './item/gear-item.js';
import { QualityItem } from './item/quality-item.js';
import { AssetModuleItem } from './item/asset-module-item.js';
import { LifeModuleItem } from './item/lifemodule-item.js';
import { Checkbars } from './common/checkbars.js';
import { RollParameters } from './roll/roll-parameters.js';
import { RollDialog } from './roll/roll-dialog.js';
import { AnarchyCombat } from './anarchy-combat.js';
import { HUDShortcuts } from './token/hud-shortcuts.js';
import { CombatManager } from './combat/combat-manager.js';
import { RollManager } from './roll/roll-manager.js';
import { Modifiers } from './modifiers/modifiers.js';
import { ActorDamageManager } from './actor/actor-damage.js';
import { AttributeActions } from './attribute-actions.js';
import { DiceCursor } from './roll/dice-cursor.js';
import { SystemSettings } from './system-settings.js';
import { GMAnarchyManager } from "./gm/gm-anarchy.js";
import { registerActorSheetsV2 } from "./sheets/register-actor-sheets-v2.js";
import { preloadTemplatesV2 } from "./sheets/preload-templates.js";
import { MWDActor } from "./actor/mwd-actor.js";
import { MWDRoll } from "./roll/mwd-roll.js";
//import { registerItemSheetsV2 } from "./sheets/register-item-sheets-v2.js";

/* -------------------------------------------- */
/*  Foundry VTT AnarchySystem Initialization    */
/* -------------------------------------------- */

export class AnarchySystem {

  static start() {
    const anarchySystem = new AnarchySystem();
    Hooks.once('init',  () => anarchySystem.onInit());
    Hooks.once('ready', () => anarchySystem.onReady());
  }

  async onInit() {
    console.log(LOG_HEAD + 'AnarchySystem.onInit');
    game.system.mwd = this;
    game.system.anarchy = this;
    game.mwd ??= {};

    // Roll API (new AppV2 path)
    game.mwd.roll = MWDRoll;

    // Optional alias if you want it under the system object too:
    this.roll = MWDRoll;

    // initialize remote calls registry first: used by other singleton managers
    this.remoteCall = new RemoteCall(); 

    //register handlebars helpers early
    Handlebars.registerHelper("mwdClassList", (classes) => {
      if (Array.isArray(classes)) return classes.join(" ");
      if (typeof classes === "string") return classes;
      return "";
    });

    this.actorClasses = {
      character: CharacterActor,
      npc: CharacterActor,
      vehicle: VehicleActor,
      battlemech: BattlemechActor
    }
    this.itemClasses = {
      contact: ContactItem,
      gear: GearItem,
      quality: QualityItem,
      assetModule: AssetModuleItem,
      skill: SkillItem,
      lifeModule: LifeModuleItem,
      mechWeapon: WeaponItem,
      personalWeapon: WeaponItem
    }

    this.hooks = new HooksManager();
    this.styles = new Styles();
    this.handlebarsManager = new HandlebarsManager();
    Enums.init();
    SystemSettings.register();

    this.modifiers = new Modifiers();
    this.rollParameters = new RollParameters();
    this.rollManager = new RollManager();
    this.hudShortcuts = new HUDShortcuts();
    this.combatManager = new CombatManager();

    console.log(LOG_HEAD + 'AnarchySystem.onInit | loading system');
    CONFIG.ANARCHY = MWD;
    CONFIG.Combat.documentClass = AnarchyCombat;
    CONFIG.Combat.initiative = { formula: "2d6" }
    CONFIG.Actor.documentClass = MWDActor;
    CONFIG.Item.documentClass = AnarchyBaseItem;

    Checkbars.init();

    // Register sheets (AppV2-only, no appv1 unregisters)
    registerActorSheetsV2();
    //registerItemSheetsV2();

    // Preload templates/partials to avoid first-render blank sheets
    await preloadTemplatesV2();

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
    console.log(LOG_HEAD + 'AnarchySystem.onInit | done');
  }

  async onReady() {
    console.log(LOG_HEAD + 'AnarchySystem.onReady');

    this.gmAnarchy = new GMAnarchyManager();

    if (!game.user.isGM) return;

    await new Migrations().migrate();

    const enabled = game.settings.get(SYSTEM_NAME, "enableGMManager");
    if (!enabled) {
      console.log(`${LOG_HEAD}GMManager render skipped (enableGMManager=false)`);
      return;
    }

    if (!game.gmManager) game.gmManager = new GMManager();
    game.gmManager.render({ force: true });
  }
}
