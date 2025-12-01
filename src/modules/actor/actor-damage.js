import { Checkbars } from "../common/checkbars.js";
import { ANARCHY } from "../config.js";
import { SYSTEM_NAME, TEMPLATE } from "../constants.js";
import { ErrorManager } from "../error-manager.js";
import { ANARCHY_HOOKS, HooksManager } from "../hooks-manager.js";
import { Modifiers } from "../modifiers/modifiers.js";

const DAMAGE_MODE = 'damage-mode'
const SETTING_KEY_DAMAGE_MODE = `${SYSTEM_NAME}.${DAMAGE_MODE}`;

const damageModeChoices = {};
const damageModeMethods = {};

export class ActorDamageManager {

  static init() {
    HooksManager.register(ANARCHY_HOOKS.PROVIDE_DAMAGE_MODE);
    Hooks.on('updateSetting', async (setting, update, options, id) => ActorDamageManager.onUpdateSetting(setting, update, options, id));

    Hooks.on(ANARCHY_HOOKS.PROVIDE_DAMAGE_MODE, provide => {
      provide('resistanceArmorMonitor', ANARCHY.settings.damageMode.values.resistanceArmorMonitor, ActorDamageManager.sufferDamageResistanceArmorMonitor);
      provide('armorResistanceMonitor', ANARCHY.settings.damageMode.values.armorResistanceMonitor, ActorDamageManager.sufferDamageArmorResistanceMonitor);
      provide('armorGivesResistance', ANARCHY.settings.damageMode.values.armorGivesResistance, ActorDamageManager.sufferDamageArmorAsResistance_Earthdawn);
      provide('armorGiveResistanceHitsAvoid', ANARCHY.settings.damageMode.values.armorGiveResistanceHitsAvoid, ActorDamageManager.sufferDamageArmorAsResistance_Cyberpunk);
    });
    Hooks.once('ready', () => ActorDamageManager.onReady());
  }

  static onReady() {
    ActorDamageManager._registerDamageModeSetting();
    ActorDamageManager._selectDamageMode();
  }

  static _registerDamageModeSetting() {
    Hooks.callAll(ANARCHY_HOOKS.PROVIDE_DAMAGE_MODE, (code, labelkey, method) => {
      damageModeChoices[code] = game.i18n.localize(labelkey);
      damageModeMethods[code] = method;
    });
    game.settings.register(SYSTEM_NAME, DAMAGE_MODE, {
      scope: "world",
      name: game.i18n.localize(ANARCHY.settings.damageMode.name),
      hint: game.i18n.localize(ANARCHY.settings.damageMode.hint),
      config: true,
      default: Object.keys(damageModeChoices)[0],
      choices: damageModeChoices,
      type: String
    });
  }

  static async onUpdateSetting(setting, update, options, id) {
    if (setting.key == SETTING_KEY_DAMAGE_MODE) {
      ActorDamageManager._selectDamageMode();
    }
  }

  static _selectDamageMode() {
    let damageModeCode = game.settings.get(SYSTEM_NAME, DAMAGE_MODE)
    if (!damageModeMethods[damageModeCode]) {
      damageModeCode = Object.keys(damageModeChoices)[0];
    }
    ActorDamageManager.damageModeCode = damageModeCode;
    ActorDamageManager.damageModeMethod = damageModeMethods[damageModeCode];
  }

  static async sufferDamage(defender, damageInfo, damage, success, avoidArmor, attacker, attackWeapon) {
    const { monitor, damageType } = ActorDamageManager._resolveDamageContext(defender, damageInfo, attackWeapon);
    ErrorManager.checkActorCanReceiveDamage(damageType ?? monitor, monitor, defender);
    const sufferDamageMethod = ActorDamageManager.damageModeMethod ?? ActorDamageManager.sufferDamageResistanceArmorMonitor;
    await sufferDamageMethod(defender, monitor, damageType, damage, success, avoidArmor, attacker);
    await defender.applyArmorDamage(monitor, damageType, Modifiers.sumModifiers([attackWeapon], 'other', 'damageArmor'));
  }

  static async sufferDamageResistanceArmorMonitor(actor, monitor, damageType, damage, success, avoidArmor, sourceActor) {
    const resistanceDetail = Checkbars.resistanceDetail(actor, monitor, damageType);
    const resistance = resistanceDetail.value;
    let total = 0;

    if (avoidArmor) {
      const resisted1 = Math.min(resistance, damage);
      const resisted2 = Math.min(resistance - resisted1, success);
      total = damage - resisted1;
      if (Checkbars.useArmor(monitor)) {
        total -= await ActorDamageManager.damageToArmor(actor, damageType, total);
      }
      total += success - resisted2;
    }
    else {
      total = damage + success - resistance;
      if (Checkbars.useArmor(monitor)) {
        total -= await ActorDamageManager.damageToArmor(actor, damageType, total);
      }
    }
    if (total > 0) {
      await Checkbars.addCounter(actor, monitor, total);
    }
    ActorDamageManager._notifyResistanceUsage(actor, monitor, damageType, resistanceDetail);
  }

  static async sufferDamageArmorResistanceMonitor(actor, monitor, damageType, damage, success, avoidArmor, sourceActor) {
    let total = 0;
    if (Checkbars.useArmor(monitor)) {
      if (avoidArmor) {
        damage -= await ActorDamageManager.damageToArmor(actor, damageType, damage);
        total = success + damage;
      }
      else {
        total = success + damage;
        total -= await ActorDamageManager.damageToArmor(actor, damageType, total);
      }
    }
    else {
      total = damage + success;
    }
    const resistanceDetail = Checkbars.resistanceDetail(actor, monitor, damageType);
    total -= resistanceDetail.value;
    if (total > 0) {
      await Checkbars.addCounter(actor, monitor, total);
    }
    ActorDamageManager._notifyResistanceUsage(actor, monitor, damageType, resistanceDetail);
    return total;
  }

  static async sufferDamageArmorAsResistance_Cyberpunk(actor, monitor, damageType, damage, success, avoidArmor, sourceActor) {
    let total = damage + success;
    if (Checkbars.useArmor(monitor) && total > 0) {
      const ignoredArmor = avoidArmor ? success : 0;
      const armorResistance = Math.max(0, ActorDamageManager._computeArmorResistance(actor) - ignoredArmor)
      if (armorResistance > 0) {
        await Checkbars.addCounter(actor, 'armor', 1);
        total -= armorResistance;
      }
    }
    const resistanceDetail = Checkbars.resistanceDetail(actor, monitor, damageType);
    total -= resistanceDetail.value;
    if (total > 0) {
      await Checkbars.addCounter(actor, monitor, total);
    }
    ActorDamageManager._notifyResistanceUsage(actor, monitor, damageType, resistanceDetail);
    return Math.max(total, 0);
  }

  static async sufferDamageArmorAsResistance_Earthdawn(actor, monitor, damageType, damage, success, avoidArmor, sourceActor) {
    let total = damage + success;
    if (Checkbars.useArmor(monitor) && !avoidArmor && total > 0) {
      const armorResistance = ActorDamageManager._computeArmorResistance(actor);
      if (armorResistance > 0) {
        await Checkbars.addCounter(actor, 'armor', 1);
        total -= armorResistance;
      }
    }
    total -= ActorDamageManager._computeStrengthResistance(actor, monitor);
    const resistanceDetail = Checkbars.resistanceDetail(actor, monitor, damageType);
    total -= resistanceDetail.value;
    if (total > 0) {
      await Checkbars.addCounter(actor, monitor, total);
    }
    ActorDamageManager._notifyResistanceUsage(actor, monitor, damageType, resistanceDetail);
    return total;
  }

  static async damageToArmor(actor, damageType, value) {
    if (value > 0) {
      const armorMax = Checkbars.max(actor, TEMPLATE.monitors.armor);
      const armor = Checkbars.getCounterValue(actor, TEMPLATE.monitors.armor);
      const armorReduction = Math.min(armorMax - armor, value);
      const armorResistance = Checkbars.resistance(actor, TEMPLATE.monitors.armor, damageType);
      const armorDmg = Math.max(0, armorReduction - armorResistance);
      if (armorDmg > 0) {
        await Checkbars.addCounter(actor, TEMPLATE.monitors.armor, armorDmg);
      }
      return armorReduction;
    }
    else {
      return 0;
    }
  }

  static _resolveDamageContext(defender, damageInfo, attackWeapon) {
    const damageType = (typeof damageInfo === 'object'
      ? damageInfo?.damageType ?? damageInfo?.type
      : damageInfo) ?? attackWeapon?.system?.damageType;
    const monitorHint = typeof damageInfo === 'object' ? damageInfo?.monitor ?? damageType : damageType;
    const monitor = defender.getDamageMonitor(monitorHint);
    return { monitor, damageType };
  }

  static _notifyResistanceUsage(actor, monitor, damageType, resistanceDetail) {
    if (!resistanceDetail || monitor === undefined) {
      return;
    }
    const monitorLabel = game.i18n.localize(ANARCHY.actor.monitors[monitor] ?? monitor);
    const typeLabel = ActorDamageManager._localizeDamageType(damageType) ?? monitorLabel;
    const sourceKey = resistanceDetail.usedType ? 'type' : 'default';
    const sourceLabel = game.i18n.localize(ANARCHY.actor.monitors.resistanceSources?.[sourceKey] ?? sourceKey);
    ui.notifications.info(game.i18n.format(ANARCHY.actor.monitors.resistanceApplied, {
      actor: actor.name,
      monitor: monitorLabel,
      damageType: typeLabel,
      value: resistanceDetail.value,
      source: sourceLabel,
    }));
  }

  static _localizeDamageType(damageType) {
    if (!damageType) {
      return undefined;
    }
    return game.i18n.localize(
      ANARCHY.mwd.weaponDamageType[damageType]
      ?? ANARCHY.mwd.personalDamageType[damageType]
      ?? ANARCHY.actor.monitors[damageType]
      ?? damageType
    );
  }

  static _computeArmorResistance(actor) {
    const armorMax = Checkbars.max(actor, 'armor');
    const armorDamage = Checkbars.getCounterValue(actor, 'armor');
    const armor = Math.max(0, armorMax - armorDamage);
    return Math.max(0, Math.ceil(armor / 3));
  }

  static _computeStrengthResistance(actor, monitor) {
    const strength = actor.getAttributeValue(TEMPLATE.attributes.strength);
    return Math.max(0, Math.floor(strength / 4));
  }
}