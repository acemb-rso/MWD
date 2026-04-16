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
  SETTING_MACHINE_CRIT_TABLE_GENERAL,
  SETTING_MACHINE_CRIT_TABLE_MECH_ARMS,
  SETTING_MACHINE_CRIT_TABLE_MECH_HEAD,
  SETTING_MACHINE_CRIT_TABLE_MECH_LEGS,
  SETTING_MACHINE_CRIT_TABLE_MECH_TORSO,
  SETTING_MACHINE_CRIT_TABLE_VEHICLE_BODY,
  SETTING_MACHINE_CRIT_TABLE_VEHICLE_MOBILITY,
  SETTING_MACHINE_CRIT_TABLE_VEHICLE_TURRET,
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
      hint: "2d6 RollTable UUID that chooses the general type of machine critical problem.",
      scope: "world",
      config: true,
      type: String,
      default: DEFAULT_MACHINE_CRIT_TABLE_UUIDS.general,
    });

    game.settings.register(SYSTEM_NAME, SETTING_MACHINE_CRIT_TABLE_MECH_HEAD, {
      name: "Machine Critical Table: BattleMech Head",
      hint: "Location interpretation table for BattleMech head criticals.",
      scope: "world",
      config: true,
      type: String,
      default: DEFAULT_MACHINE_CRIT_TABLE_UUIDS.mechHead,
    });

    game.settings.register(SYSTEM_NAME, SETTING_MACHINE_CRIT_TABLE_MECH_TORSO, {
      name: "Machine Critical Table: BattleMech Torso",
      hint: "Location interpretation table for BattleMech torso and forced critical hits.",
      scope: "world",
      config: true,
      type: String,
      default: DEFAULT_MACHINE_CRIT_TABLE_UUIDS.mechTorso,
    });

    game.settings.register(SYSTEM_NAME, SETTING_MACHINE_CRIT_TABLE_MECH_ARMS, {
      name: "Machine Critical Table: BattleMech Arms",
      hint: "Location interpretation table for BattleMech arm criticals.",
      scope: "world",
      config: true,
      type: String,
      default: DEFAULT_MACHINE_CRIT_TABLE_UUIDS.mechArms,
    });

    game.settings.register(SYSTEM_NAME, SETTING_MACHINE_CRIT_TABLE_MECH_LEGS, {
      name: "Machine Critical Table: BattleMech Legs",
      hint: "Location interpretation table for BattleMech leg criticals.",
      scope: "world",
      config: true,
      type: String,
      default: DEFAULT_MACHINE_CRIT_TABLE_UUIDS.mechLegs,
    });

    game.settings.register(SYSTEM_NAME, SETTING_MACHINE_CRIT_TABLE_VEHICLE_BODY, {
      name: "Machine Critical Table: Vehicle Body",
      hint: "Location interpretation table for vehicle body criticals.",
      scope: "world",
      config: true,
      type: String,
      default: DEFAULT_MACHINE_CRIT_TABLE_UUIDS.vehicleBody,
    });

    game.settings.register(SYSTEM_NAME, SETTING_MACHINE_CRIT_TABLE_VEHICLE_TURRET, {
      name: "Machine Critical Table: Vehicle Turret",
      hint: "Location interpretation table for vehicle turret and weapon criticals.",
      scope: "world",
      config: true,
      type: String,
      default: DEFAULT_MACHINE_CRIT_TABLE_UUIDS.vehicleTurret,
    });

    game.settings.register(SYSTEM_NAME, SETTING_MACHINE_CRIT_TABLE_VEHICLE_MOBILITY, {
      name: "Machine Critical Table: Vehicle Mobility",
      hint: "Location interpretation table for vehicle mobility criticals.",
      scope: "world",
      config: true,
      type: String,
      default: DEFAULT_MACHINE_CRIT_TABLE_UUIDS.vehicleMobility,
    });
  }

static getSystemProperty(property, fallback) {
  return game.settings.get(SYSTEM_NAME, property) ?? fallback;
}


}
