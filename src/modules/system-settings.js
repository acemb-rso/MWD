// src/modules/system-settings.js
// Purpose: Registers system settings. References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { ANARCHY } from "./config.js";
import { SYSTEM_NAME } from "./constants.js";
import { registerGMDnPresetSettingsEditor } from "./settings/gm-dn-preset-settings.js";
import { registerLifeModuleSettingsEditor } from "./settings/life-module-settings.js";
import { registerPersonalActionCatalogSettingsEditor } from "./settings/personal-action-catalog-settings.js";
import { registerSkillSpecializationSettingsEditor } from "./settings/skill-specialization-settings.js";
import { registerSceneModifierTemplateSettingsEditor } from "./settings/scene-modifier-template-settings.js";
import { registerStatusConditionCatalogSettingsEditor } from "./settings/status-condition-catalog-settings.js";
import {
  DEFAULT_MACHINE_CRIT_TABLE_UUIDS,
  SETTING_MACHINE_CRIT_TABLE_BATTLEMECH,
  SETTING_MACHINE_CRIT_TABLE_GENERAL,
  SETTING_MACHINE_CRIT_TABLE_VEHICLE,
} from "./mwd/critical-hits.js";


export class SystemSettings {

  static register() {
    registerGMDnPresetSettingsEditor();
    registerLifeModuleSettingsEditor();
    registerPersonalActionCatalogSettingsEditor();
    registerSkillSpecializationSettingsEditor();
    registerSceneModifierTemplateSettingsEditor();
    registerStatusConditionCatalogSettingsEditor();

    game.settings.register(SYSTEM_NAME, "useDestinyMechanics", {
      name: ANARCHY.settings.useDestinyMechanics.name,
      hint: ANARCHY.settings.useDestinyMechanics.hint,
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
    });

    game.settings.register(SYSTEM_NAME, "enableGMGadget", {
      name: "Enable GM Gadget",
      hint: "If enabled, renders the new AppV2 GM Gadget UI on startup.",
      scope: "world",
      config: true,
      type: Boolean,
      default: true
    });

    game.settings.register(SYSTEM_NAME, SETTING_MACHINE_CRIT_TABLE_GENERAL, {
      name: "Machine Critical Table: General",
      hint: "RollTable UUID used when no actor-specific machine critical table is configured.",
      scope: "world",
      config: true,
      type: String,
      default: DEFAULT_MACHINE_CRIT_TABLE_UUIDS.general,
    });

    game.settings.register(SYSTEM_NAME, SETTING_MACHINE_CRIT_TABLE_BATTLEMECH, {
      name: "Machine Critical Table: BattleMech",
      hint: "RollTable UUID used for BattleMech critical hits.",
      scope: "world",
      config: true,
      type: String,
      default: DEFAULT_MACHINE_CRIT_TABLE_UUIDS.battlemech,
    });

    game.settings.register(SYSTEM_NAME, SETTING_MACHINE_CRIT_TABLE_VEHICLE, {
      name: "Machine Critical Table: Vehicle",
      hint: "RollTable UUID used for vehicle critical hits.",
      scope: "world",
      config: true,
      type: String,
      default: DEFAULT_MACHINE_CRIT_TABLE_UUIDS.vehicle,
    });
  }

static getSystemProperty(property, fallback) {
  return game.settings.get(SYSTEM_NAME, property) ?? fallback;
}


}
