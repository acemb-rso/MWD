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
import { SystemSettings } from './system-settings.js';
import { registerActorSheetsV2 } from "./sheets/register-actor-sheets-v2.js";
import { registerItemSheetsV2 } from "./sheets/register-item-sheets-v2.js";
import { preloadTemplatesV2 } from "./sheets/preload-templates.js";
import { MWDActor } from "./actor/mwd-actor.js";
import { MWDCombat } from "./mwd-combat.js";
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
import { MachineCriticalsProvider } from "../modules/modifiers/providers/machine-criticals.js";
import { MachineStateEffectsProvider } from "../modules/modifiers/providers/machine-state-effects.js";
import { EwTrackingPenaltyProvider } from "../modules/modifiers/providers/ew-tracking-penalty.js";
import { EwTargetingDataProvider } from "../modules/modifiers/providers/ew-targeting-data.js";
import { AssetModuleEffectsProvider } from "../modules/modifiers/providers/asset-module-effects.js";
import { FirstAidModifiersProvider } from "../modules/modifiers/providers/first-aid.js";
import { Modifiers } from "./modifiers/anarchy-modifiers.js";
import { PersonalCombatTracker } from "./combat/personal-combat-tracker.js";
import { PersonalCombatActions } from "./combat/personal-combat-actions.js";
import { backfillPersonalActionCatalogSetting } from "./combat/personal-action-catalog.js";
import { registerMWDChatActions } from "./chat/chat-actions.js";
import { registerMWDGMGadgetSettings } from "./gm/mwd-gmgadget.js";
import { getMWDGMGadget } from "./gm/mwd-gmgadget.js";
import {
  createMWDPlayerGadgetApi,
  maybeAutoOpenPlayerGadget,
  registerMWDPlayerGadgetSettings,
} from "./player/mwd-player-gadget.js";
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
import { QueuedAttackDamageActions } from "./harm/queued-attack-damage.js";
import { registerTokenStatusHudFilter } from "./dialog/token-status-dialog.js";
import { HeatFxController } from "./token/heat-fx-controller.js";
import { configureMWDStatusEffects, ensureStatusConditionCatalogDefaults } from "./status/status-condition-catalog.js";
import { AttributeActions } from "./attribute-actions.js";
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
import {
  adjustBattlemechPendingHeat,
  buildBattlemechHeatModel,
  recordBattlemechAttackHeat,
  resolveBattlemechPendingHeat,
  setBattlemechPendingHeat,
} from "./mwd/machine-heat.js";
import { registerMachineIntentGmOperations } from "./mwd/machine-intents.js";
import { MachineActions, registerMachineActionGmOperations } from "./mwd/machine-quick-actions.js";
import { registerMachinePilotVisionSync, syncAllMachinePilotVision } from "./mwd/machine-pilot-vision.js";
import { registerAssetModuleRuntimeHandlers } from "./mwd/asset-module-runtime-handlers.js";
import {
  canDetect as canMachineSensorDetect,
  getDetectionState as getMachineSensorDetectionState,
  registerMwdSensorDetectionMode,
  syncTokenDetectionModes,
} from "./canvas/machine-sensor-detection.js";
import {
  clearSensorOverlays,
  refreshSensorOverlays,
  registerMachineSensorOverlayHooks,
  renderContactOverlay,
  renderLockOverlay,
  renderTrackOverlay,
} from "./canvas/machine-sensor-overlays.js";

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
    registerMwdSensorDetectionMode();
    registerMachineSensorOverlayHooks();
    registerMWDChatActions();
    registerMWDGMGadgetSettings("mwd");
    registerMWDPlayerGadgetSettings("mwd");
    
    // Roll API (new AppV2 path)
    game.mwd.roll = MWDRoll;
    game.mwd.attacks = WeaponAttackActions;
    game.mwd.personalCombat = PersonalCombatTracker;
    game.mwd.personalCombatActions = PersonalCombatActions;
    game.mwd.playerGadget = createMWDPlayerGadgetApi({ systemId: SYSTEM_NAME });
    game.mwd.combat = {
      resolveActivationUnit: (...args) => PersonalCombatTracker.resolveActivationUnit(...args),
      resolveCombatantForActor: (...args) => PersonalCombatTracker.resolveCombatantForActor(...args),
      getActionEconomyActorForCombatant: (...args) => PersonalCombatTracker.getActionEconomyActorForCombatant(...args),
      getPlatformActorForCombatant: (...args) => PersonalCombatTracker.getPlatformActorForCombatant(...args),
    };
    game.mwd.machineActions = MachineActions;
    game.mwd.machineSensors = {
      canDetect: canMachineSensorDetect,
      getDetectionState: getMachineSensorDetectionState,
      syncTokenDetectionModes,
      refreshSensorOverlays,
      renderContactOverlay,
      renderTrackOverlay,
      renderLockOverlay,
      clearSensorOverlays,
    };
    game.mwd.harm = Object.assign(HarmEngine, QueuedAttackDamageActions);
    game.mwd.machineHeat = {
      adjustPendingHeat: adjustBattlemechPendingHeat,
      buildModel: buildBattlemechHeatModel,
      recordAttackHeat: recordBattlemechAttackHeat,
      resolvePendingHeat: resolveBattlemechPendingHeat,
      setPendingHeat: setBattlemechPendingHeat,
    };
    game.mwd.tokenHeatFx = new HeatFxController();
    game.mwd.tokenHeatFx.init();

    // Optional alias if you want it under the system object too:
      this.roll = MWDRoll;
      this.attacks = WeaponAttackActions;
      this.personalCombat = PersonalCombatTracker;
      this.combat = game.mwd.combat;
      this.machineActions = MachineActions;
      this.harm = game.mwd.harm;
      this.machineHeat = game.mwd.machineHeat;
      this.tokenHeatFx = game.mwd.tokenHeatFx;
    this.skills = createMWDSkillsService();
    this.lifeModules = createMWDLifeModulesService();
    this.traits = createMWDTraitsService();

    // initialize remote calls registry first: used by other singleton managers
    this.remoteCall = new RemoteCall();
    registerMachineActionGmOperations();
    registerMachineIntentGmOperations();
    registerMachinePilotVisionSync();
    registerAssetModuleRuntimeHandlers();
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
    modifierProviders.register(new MachineCriticalsProvider());
    modifierProviders.register(new MachineStateEffectsProvider());
    modifierProviders.register(new AssetModuleEffectsProvider());
    modifierProviders.register(new FirstAidModifiersProvider());
    modifierProviders.register(new EwTrackingPenaltyProvider());
    modifierProviders.register(new EwTargetingDataProvider());
    modifierProviders.register(new SceneModifiersProvider());

    //register handlebars helpers early
    AttributeActions.init();
    Handlebars.registerHelper("mwdClassList", (classes) => {
      if (Array.isArray(classes)) return classes.join(" ");
      if (typeof classes === "string") return classes;
   
      return "";
    });

    //Required for proper loading of sheets
    this.hooks = new HooksManager();
    this.styles = new Styles();
    this.handlebarsManager = new HandlebarsManager();
    PersonalCombatTracker.init();
    SystemSettings.register();
    Hooks.on("updateSetting", setting => {
      if (setting?.key === `${SYSTEM_NAME}.statusConditionCatalog`) configureMWDStatusEffects();
    });

    console.log(LOG_HEAD + 'AnarchySystem.onInit | loading system');
    CONFIG.ANARCHY = MWD;
    CONFIG.Combat.documentClass = MWDCombat;
    CONFIG.Combat.initiative = { formula: "2d6" }

    configureMWDStatusEffects();
    CONFIG.Actor.documentClass = MWDActor;
    CONFIG.Item.documentClass = MWDItem;
    MWDItem.init();
    registerWeaponAttackHotbarHook();
    registerTokenStatusHudFilter();

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
    game.mwd?.tokenHeatFx?.refreshAll?.();

    if (!game.user.isGM) {
      maybeAutoOpenPlayerGadget({ systemId: SYSTEM_NAME });
      return;
    }

    await ensureLifeModuleCatalogDefaults();
    await ensureStatusConditionCatalogDefaults();
    await backfillPersonalActionCatalogSetting();
    await syncAllMachinePilotVision();
    await syncTokenDetectionModes();

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
