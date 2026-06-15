// src/modules/hooks-manager.js
// Purpose: Registers Foundry hooks: updateSetting, ready, getSceneControlButtons. Registers system settings. References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { LOG_HEAD, SYSTEM_NAME } from "../core/constants.js";
import { SETTING_ENABLE_PLAYER_GADGET } from "../player/mwd-player-gadget.js";

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
}

const ANARCHY_HOOK_PREFIX = 'anarchy-';

// export hooks for JS modules
globalThis.ANARCHY_HOOKS = ANARCHY_HOOKS;

export class HooksManager {

  constructor() {
    this.hooks = [];
    Hooks.on("getSceneControlButtons", (controls) => {
      // Foundry v13: controls often arrives as an Array of SceneControl,
      // and each SceneControl.tools is a Record<string, SceneControlTool>.
      const token = Array.isArray(controls) ? controls.find(c => c.name === "notes") : controls?.notes;

      if (!token) {
        const names = Array.isArray(controls) ? controls.map(c => c.name) : Object.keys(controls ?? {});
        console.warn("MWD: token controls not found. Available:", names);
        return;
      }

      token.tools = token.tools ?? {};

      if (game.user?.isGM) {
        if (token.tools["mwd-gm-gadget"]) return;

        token.tools["mwd-gm-gadget"] = {
          name: "mwd-gm-gadget",
          title: "Open GM Gadget",
          icon: "fa-solid fa-sliders",
          order: 990,
          button: true,
          visible: true,
          onChange: () => game.mwd?.gmGadget?.()
        };
        return;
      }

      if (!game.settings?.get?.(SYSTEM_NAME, SETTING_ENABLE_PLAYER_GADGET)) return;
      if (token.tools["mwd-player-gadget"]) return;

      token.tools["mwd-player-gadget"] = {
        name: "mwd-player-gadget",
        title: "Open Player Gadget",
        icon: "fa-solid fa-gamepad",
        order: 991,
        button: true,
        visible: true,
        onChange: () => game.mwd?.playerGadget?.toggle?.()
      };
    });
  }

  static instance() {
    return game.system.anarchy.hooks;
  }

  static register(name) {
    HooksManager.instance()._register(name);
  }

  _register(name) {
    console.log(LOG_HEAD + 'HooksManager.register', name);
    if (!name.startsWith(ANARCHY_HOOK_PREFIX)) {
      throw `For safety Anarchy Hooks names must be prefixed by '${ANARCHY_HOOK_PREFIX}'`;
    }
    this.hooks.push(name);
  }

}
