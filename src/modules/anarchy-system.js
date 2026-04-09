// src/modules/anarchy-system.js
// Purpose: Registers Foundry hooks: init, ready. Registers custom actor/item sheets. Preloads or manages Handlebars templates. References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { MWD } from './config.js';
import { Enums } from './enums.js';
import { LOG_HEAD, SYSTEM_NAME } from './constants.js';
import { HandlebarsManager } from './handlebars-manager.js';
import { RemoteCall } from './remotecall.js';
import { Styles } from './styles.js';
import { HooksManager } from './hooks-manager.js';
import { MWDItem } from './item/anarchy-base-item.js';
import { CharacterActor } from './actor/character-actor.js';
import { VehicleActor } from './actor/vehicle-actor.js';
import { BattlemechActor } from './actor/battlemech-actor.js';
import { SystemSettings } from './system-settings.js';
import { registerActorSheetsV2 } from "./sheets/register-actor-sheets-v2.js";
import { registerItemSheetsV2 } from "./sheets/register-item-sheets-v2.js";
import { preloadTemplatesV2 } from "./sheets/preload-templates.js";
import { MWDActor } from "./actor/mwd-actor.js";
import { MWDRoll } from "./roll/mwd-roll.js";
import { WeaponAttackActions, registerWeaponAttackHotbarHook } from "./roll/weapon-attack-actions.js";
import { modifierProviders } from "../modules/modifiers/index.js";
import { ItemModifiersProvider } from "../modules/modifiers/providers/item-modifiers.js";
import { StatusEffectsProvider } from "../modules/modifiers/providers/status-effects.js";
import { BaseRollModifiersProvider } from "../modules/modifiers/providers/base-modifiers.js";
import { ConditionModifiersProvider } from "../modules/modifiers/providers/conditions.js";
import { burnModifier } from "../modules/modifiers/providers/burn-modifier.js";
import { LifeModuleModifiersProvider } from "../modules/modifiers/providers/life-modules.js";
import { SceneModifiersProvider } from "../modules/modifiers/providers/scene-modifiers.js";
import { TraitModifiersProvider } from "../modules/modifiers/providers/traits.js";
import { Modifiers } from "./modifiers/anarchy-modifiers.js";
import { PersonalCombatTracker } from "./combat/personal-combat-tracker.js";
import { registerMWDChatActions } from "./chat/chat-actions.js";
import { registerMWDGMGadgetSettings } from "./gm/mwd-gmgadget.js";
import { getMWDGMGadget } from "./gm/mwd-gmgadget.js";
import {
  ensureLifeModuleCatalogDefaults,
  evaluateActorLifeModules,
  getLifeModuleCatalogEntry,
  getLifeModuleTypeLabel,
  listLifeModuleCatalogEntries,
  listLifeModuleCatalogEntriesByType,
} from "./mwd/life-modules.js";
import { getSkillDef, listSkillDefs } from "./mwd/skills.js";
import { HarmEngine } from "./harm/harm-engine.js";
import {
  applyTraitMutations,
  buildActionCostTraitFacts,
  buildBurnTraitFacts,
  buildDamageTraitFacts,
  buildEdgeTraitFacts,
  buildEndOfActivationTraitFacts,
  buildInitiativeTraitFacts,
  buildRollTraitFacts,
  evaluateTraitPhase,
  getTraitEditorConfig,
  normalizeQualityTraitSystem,
} from "./mwd/traits.js";

/* -------------------------------------------- */
/*  Foundry VTT AnarchySystem Initialization    */
/* -------------------------------------------- */
function configureMWDFonts() {
  Object.assign(CONFIG.fontDefinitions, {
    "MWD UI": {
      editor: true,
      fonts: [
        { urls: ["systems/mwd/fonts/Exo2/Exo2-Regular.woff2"], weight: 400, style: "normal" },
        { urls: ["systems/mwd/fonts/Exo2/Exo2-Italic.woff2"],  weight: 400, style: "italic" },
        { urls: ["systems/mwd/fonts/Exo2/Exo2-Bold.woff2"],     weight: 700, style: "normal" }
      ]
    },
    "MWD Display": {
      editor: false,
      fonts: [
        { urls: ["systems/mwd/fonts/btclassic/BattletechOldStyle.woff2"], weight: 400, style: "normal" }
      ]
    },
    "MWD Body": {
      editor: true,
      fonts: [
        { urls: ["systems/mwd/fonts/bitter/Bitter-Regular.woff2"], weight: 400, style: "normal" },
        { urls: ["systems/mwd/fonts/bitter/Bitter-Bold.woff2"],    weight: 700, style: "normal" }
      ]
    },
    "MWD Numeric": {
      editor: false,
      fonts: [
        { urls: ["systems/mwd/fonts/anta/Anta-Regular.woff2"], weight: 400, style: "normal" }
      ]
    },
    "Material Symbols Rounded": {
      editor: false,
      fonts: [
        { urls: ["systems/mwd/fonts/Icons/MaterialSymbolsRounded.woff2"], weight: 400, style: "normal" }
      ]
    },
    "MWD Logo": {
      editor: false,
      fonts: [
        { urls: ["systems/mwd/fonts/btclassic/BTLogo_old.woff2"], weight: 400, style: "normal" }
      ]
    }

  });
}

function createMWDSkillsService() {
  return {
    get(code) {
      return getSkillDef(code);
    },
    getSkills({ withKnowledge = false } = {}) {
      void withKnowledge;
      return listSkillDefs();
    },
    list() {
      return listSkillDefs();
    }
  };
}

function createMWDLifeModulesService() {
  return {
    get(catalogId) {
      return getLifeModuleCatalogEntry(catalogId);
    },
    list() {
      return listLifeModuleCatalogEntries();
    },
    listByType(moduleType) {
      return listLifeModuleCatalogEntriesByType(moduleType);
    },
    getTypeLabel(moduleType) {
      return getLifeModuleTypeLabel(moduleType);
    },
    evaluate(actor) {
      return evaluateActorLifeModules(actor);
    }
  };
}

function createMWDTraitsService() {
  return {
    normalizeQualitySystem(system) {
      return normalizeQualityTraitSystem(system);
    },
    getEditorConfig() {
      return getTraitEditorConfig();
    },
    evaluatePhase(args) {
      return evaluateTraitPhase(args);
    },
    applyMutations(args) {
      return applyTraitMutations(args);
    },
    buildRollFacts(args) {
      return buildRollTraitFacts(args);
    },
    buildActionCostFacts(args) {
      return buildActionCostTraitFacts(args);
    },
    buildBurnFacts(args) {
      return buildBurnTraitFacts(args);
    },
    buildInitiativeFacts(args) {
      return buildInitiativeTraitFacts(args);
    },
    buildDamageFacts(args) {
      return buildDamageTraitFacts(args);
    },
    buildEdgeFacts(args) {
      return buildEdgeTraitFacts(args);
    },
    buildEndOfActivationFacts(args) {
      return buildEndOfActivationTraitFacts(args);
    }
  };
}

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

    configureMWDFonts();
    registerMWDChatActions();
    registerMWDGMGadgetSettings("mwd");
    
    // Roll API (new AppV2 path)
    game.mwd.roll = MWDRoll;
    game.mwd.attacks = WeaponAttackActions;
    game.mwd.personalCombat = PersonalCombatTracker;
    game.mwd.harm = HarmEngine;

    // Optional alias if you want it under the system object too:
      this.roll = MWDRoll;
      this.attacks = WeaponAttackActions;
      this.personalCombat = PersonalCombatTracker;
      this.harm = HarmEngine;
    this.skills = createMWDSkillsService();
    this.lifeModules = createMWDLifeModulesService();
    this.traits = createMWDTraitsService();

    // initialize remote calls registry first: used by other singleton managers
    this.remoteCall = new RemoteCall();
    game.system.mwd.skills = this.skills;
    game.system.mwd.lifeModules = this.lifeModules;
    game.system.mwd.traits = this.traits;
    game.mwd.skills = this.skills;
    game.mwd.lifeModules = this.lifeModules;
    game.mwd.traits = this.traits;
    Enums.init();
    this.modifiers = new Modifiers();

    modifierProviders.register(new ItemModifiersProvider());
    modifierProviders.register(new StatusEffectsProvider());
    modifierProviders.register(new BaseRollModifiersProvider());
    modifierProviders.register(new ConditionModifiersProvider());
    modifierProviders.register(burnModifier);
    modifierProviders.register(new LifeModuleModifiersProvider());
    modifierProviders.register(new TraitModifiersProvider());
    modifierProviders.register(new SceneModifiersProvider());

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
    //Required for proper loading of sheets
    this.hooks = new HooksManager();
    this.styles = new Styles();
    this.handlebarsManager = new HandlebarsManager();
    PersonalCombatTracker.init();
    SystemSettings.register();

    console.log(LOG_HEAD + 'AnarchySystem.onInit | loading system');
    CONFIG.ANARCHY = MWD;
    //CONFIG.Combat.documentClass = AnarchyCombat;
    CONFIG.Combat.initiative = { formula: "2d6" }

    if (!(CONFIG.statusEffects ?? []).some(effect => effect?.id === "overloaded")) {
      CONFIG.statusEffects.push({
        id: "overloaded",
        name: "Overloaded",
        icon: "systems/mwd/img/icons/status/surge.svg"
      });
    }
    if (!(CONFIG.statusEffects ?? []).some(effect => effect?.id === "preparedInterrupt")) {
      CONFIG.statusEffects.push({
        id: "preparedInterrupt",
        name: "Prepared",
        icon: "systems/mwd/img/icons/status/readied_action.svg"
      });
    }
    CONFIG.Actor.documentClass = MWDActor;
    CONFIG.Item.documentClass = MWDItem;
    MWDItem.init();
    registerWeaponAttackHotbarHook();

    // Register sheets (AppV2-only, no appv1 unregisters)
    registerActorSheetsV2();
    registerItemSheetsV2();

    // Preload templates/partials to avoid first-render blank sheets
    await preloadTemplatesV2();

    console.log(LOG_HEAD + 'AnarchySystem.onInit | done');
  }

  async onReady() {
    console.log(LOG_HEAD + 'AnarchySystem.onReady');

    await PersonalCombatTracker.onReady();

    if (!game.user.isGM) return;

    await ensureLifeModuleCatalogDefaults();

    const enabled = game.settings.get(SYSTEM_NAME, "enableGMGadget");

    if (!enabled) {
      console.log(`${LOG_HEAD}GMManager render skipped (enableGMGadget=false)`);
      return;
    }

    game.mwd = game.mwd ?? {};
    game.mwd.gmGadget = () => getMWDGMGadget({ systemId: SYSTEM_NAME }).render({ force: true });
    if (enabled) game.mwd.gmGadget();
  }
}
