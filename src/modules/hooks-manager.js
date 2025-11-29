import { CharacterActorEssence } from "./actor/character-actor-essence.js";
import { CHECKBARS, Checkbars } from "./common/checkbars.js";
import { ANARCHY } from "./config.js";
import { LOG_HEAD, SYSTEM_NAME } from "./constants.js";

export const ANARCHY_HOOKS = {
  /**
   * Hook to declare template data migrations
   */
  DECLARE_MIGRATIONS: 'anarchy-declareMigration',
  /**
   * Hook used to declare additional styles available
   */
  REGISTER_STYLES: 'anarchy-registerStyles',
  /**
   * Hook allowing to register additional roll parameters
   */
  REGISTER_ROLL_PARAMETERS: 'anarchy-registerRollParameters',
  /**
   * Hook allowing to modify some parameters (from Anarchy hacks modules).
   * Setting property ignore=true allows to remove the parameter.
   */
  MODIFY_ROLL_PARAMETER: 'anarchy-forbidRollParameter',
  /**
   * Hook allowing to provide alternate skill sets for Anarchy hack modules
   */
  PROVIDE_SKILL_SET: 'anarchy-provideSkillSet',
  /**
   * Hook allowing to provide alternate way to apply damages for Anarchy hack modules
   */
  PROVIDE_DAMAGE_MODE: 'anarchy-provideDamageMode',
  /**
   * Hook allowing to define base essence
   */
  PROVIDE_BASE_ESSENCE: 'anarchy-provideBaseEssence',
  /**
   * Hook allowing to define base essence
   */
  PROVIDE_MALUS_ESSENCE: 'anarchy-provideMalusEssence',
  /**
   * Hook allowing to provide alternate anarchy hack (TODO: document)
   */
  ANARCHY_HACK: 'anarchy-hack',
}

const SETTING_KEY_ANARCHY_HACK = `${SYSTEM_NAME}.${ANARCHY_HOOKS.ANARCHY_HACK}`;

const SHADOWRUN_ANARCHY_NO_HACK = {
  id: SYSTEM_NAME,
  name: 'Standard Shadowrun Anarchy',
  hack: {
    checkbars: () => CHECKBARS
  }
};

// export hooks and settings for JS hacks
globalThis.ANARCHY_HOOKS = ANARCHY_HOOKS;
globalThis.SETTING_KEY_ANARCHY_HACK = SETTING_KEY_ANARCHY_HACK;
globalThis.SHADOWRUN_ANARCHY_NO_HACK = SHADOWRUN_ANARCHY_NO_HACK;

export class HooksManager {

  constructor() {
    this.hooks = [];
    this.hacks = {};
    this.hackNames = {};
    this.hookMethods = {}
    this._register(ANARCHY_HOOKS.ANARCHY_HACK);
    this._register(ANARCHY_HOOKS.PROVIDE_BASE_ESSENCE);
    Hooks.on(ANARCHY_HOOKS.ANARCHY_HACK, register => register(SHADOWRUN_ANARCHY_NO_HACK));
    Hooks.on(ANARCHY_HOOKS.PROVIDE_BASE_ESSENCE, provide => provide(SHADOWRUN_ANARCHY_NO_HACK, actor => 6));
    Hooks.on(ANARCHY_HOOKS.PROVIDE_MALUS_ESSENCE, provide => provide(SHADOWRUN_ANARCHY_NO_HACK, (actor, essence) => CharacterActorEssence.getMalus(actor, essence)));
    Hooks.on('updateSetting', async (setting, update, options, id) => this.onUpdateSetting(setting, update, options, id));
    Hooks.once('ready', () => this.onReady());
  }

  async onReady() {
    Hooks.callAll(ANARCHY_HOOKS.ANARCHY_HACK, (hack) => {
      this.hacks[hack.id] = hack;
      this.hackNames[hack.id] = hack.name;
    });
    game.settings.register(SYSTEM_NAME, ANARCHY_HOOKS.ANARCHY_HACK, {
      scope: "world",
      name: game.i18n.localize(ANARCHY.settings.anarchyHack.name),
      hint: game.i18n.localize(ANARCHY.settings.anarchyHack.hint),
      config: true,
      default: SHADOWRUN_ANARCHY_NO_HACK.id,
      choices: this.hackNames,
      type: String
    });
    this.applySelectedAnarchyHack();
  }

  async onUpdateSetting(setting, update, options, id) {
    if (setting.key == SETTING_KEY_ANARCHY_HACK) {
      this.applySelectedAnarchyHack();
    }
  }

  applySelectedAnarchyHack() {
    const selectedHack = this.getSelectedHack();
    if (selectedHack) {
      Checkbars.hackCheckbars(selectedHack.hack.checkbars());
      const overridableMethods = [
        ANARCHY_HOOKS.PROVIDE_BASE_ESSENCE,
        ANARCHY_HOOKS.PROVIDE_MALUS_ESSENCE
      ];
      overridableMethods.forEach(hookMethod => this.selectHookMethod(selectedHack, hookMethod))
    }
  }

  selectHookMethod(selectedHack, hookMethod) {
    Hooks.callAll(hookMethod, (hack, callback) => {
      if (hack == selectedHack) {
        this.hookMethods[hookMethod] = callback
      }
    });
  }

  getSelectedHack() {
    return this.hacks[game.settings.get(SYSTEM_NAME, ANARCHY_HOOKS.ANARCHY_HACK)];
  }

  getHookMethod(hookMethod, fallback) {
    return this.hookMethods[hookMethod] ?? fallback;
  }

  callHookMethod(hookMethod, ...args) {
    const method = this.hookMethods[hookMethod];
    return method ? method(...args) : undefined;
  }

  static instance() {
    return game.system.anarchy.hooks;
  }

  static register(name) {
    HooksManager.instance()._register(name);
  }

  _register(name) {
    console.log(LOG_HEAD + 'HooksManager.register', name);
    if (!name.startsWith(SYSTEM_NAME + '-')) {
      throw "For safety Anarchy Hooks names must be prefixed by anarchy'-'"
    }
    this.hooks.push(name);
  }

}