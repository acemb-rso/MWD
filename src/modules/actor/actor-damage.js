import { Checkbars } from "../common/checkbars.js";
import { ANARCHY } from "../config.js";
import { SYSTEM_NAME, TEMPLATE } from "../constants.js";
import { ErrorManager } from "../error-manager.js";
import { ANARCHY_HOOKS, HooksManager } from "../hooks-manager.js";
import { Modifiers } from "../modifiers/anarchy-modifiers.js";
import { formatString } from "../strings.js";
import {
  applyArmorTagEffects,
  computePersonalArmorMitigation,
  getPersonalDamageTypeLabel,
  isPersonalDamageType,
  normalizePersonalDamageType,
} from "../mwd/personal-damage.js";

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
      damageModeChoices[code] = labelkey;
      damageModeMethods[code] = method;
    });
    game.settings.register(SYSTEM_NAME, DAMAGE_MODE, {
      scope: "world",
      name: ANARCHY.settings.damageMode.name,
      hint: ANARCHY.settings.damageMode.hint,
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
    if (ActorDamageManager._shouldUsePersonalDamageV2(defender, monitor, attackWeapon)) {
      await ActorDamageManager.sufferPersonalDamageV2(defender, monitor, damageType, damage, success, avoidArmor, attacker, attackWeapon);
      return;
    }
    const sufferDamageMethod = ActorDamageManager.damageModeMethod ?? ActorDamageManager.sufferDamageResistanceArmorMonitor;
    await sufferDamageMethod(defender, monitor, damageType, damage, success, avoidArmor, attacker);
    await defender.applyArmorDamage(monitor, damageType, Modifiers.sumModifiers([attackWeapon], 'other', 'damageArmor'));
  }

  static _shouldUsePersonalDamageV2(defender, monitor, attackWeapon) {
    if (!defender?.isCharacterLike?.()) return false;
    if (![TEMPLATE.monitors.physical, TEMPLATE.monitors.fatigue].includes(monitor)) return false;
    return Boolean(attackWeapon?.isPersonalWeapon?.() || attackWeapon?.canonicalType === TEMPLATE.itemType.personalWeapon || attackWeapon?.type === TEMPLATE.itemType.personalWeapon);
  }

  static async sufferPersonalDamageV2(actor, monitor, damageType, damage, success, avoidArmor, sourceActor, attackWeapon) {
    const weaponProfile = attackWeapon?.getCombatProfile?.() ?? attackWeapon ?? null;
    const normalizedDamageType = normalizePersonalDamageType(damageType ?? weaponProfile?.damageType);
    const baseDamage = Math.max(0, Number(damage ?? weaponProfile?.damage ?? 0) || 0);
    const netHits = Math.max(0, Number(success ?? 0) || 0);
    const effects = weaponProfile?.effects ?? {};
    const loadout = actor.getPersonalCombatLoadout?.({ refresh: true }) ?? null;
    const activeArmor = loadout?.activeArmor ?? null;
    const armorCurrentRating = Math.max(0, Number(activeArmor?.currentArmorRating ?? activeArmor?.durability?.current ?? 0) || 0);

    let damageIncoming = baseDamage + netHits;
    const baseIncoming = damageIncoming;
    const tagEffectResult = armorCurrentRating > 0
      ? applyArmorTagEffects({
          damageIncoming,
          armorTags: activeArmor?.tags ?? [],
          effects,
        })
      : { damageIncoming, applied: [] };
    damageIncoming = tagEffectResult.damageIncoming;

    const armorMitigation = computePersonalArmorMitigation({
      currentArmorRating: armorCurrentRating,
      mitigationByType: activeArmor?.mitigationByType ?? {},
      damageType: normalizedDamageType,
    });

    const effectArmorModifier = 0;
    const effectiveAp = Math.max(
      0,
      (Number(weaponProfile?.ap ?? 0) || 0) + (Number(effects?.ap ?? 0) || 0)
    );
    const netResistance = armorMitigation.isDestroyed
      ? 0
      : Math.max(0, armorMitigation.baseMitigation + armorMitigation.typeMitigationMod + effectArmorModifier - effectiveAp);
    const finalDamage = Math.max(0, Math.ceil(damageIncoming - netResistance));

    if (finalDamage > 0) {
      await Checkbars.addCounter(actor, monitor, finalDamage);
    }

    await ActorDamageManager._degradePersonalArmorOnHit(actor, activeArmor);

    ActorDamageManager._notifyPersonalArmorMitigation(actor, {
      damageType: normalizedDamageType,
      baseIncoming,
      adjustedIncoming: damageIncoming,
      finalDamage,
      armorMitigation,
      effectiveAp,
      tagEffectResult,
    });
  }

  static async _degradePersonalArmorOnHit(actor, activeArmor) {
    const item = activeArmor?.item ?? actor?.items?.get?.(activeArmor?.id ?? "");
    if (!item?.id) return;

    const current = Math.max(0, Number(item.system?.durability?.current ?? 0) || 0);
    const next = Math.max(0, current - 1);
    if (next === current) return;

    await item.update({ "system.durability.current": next });
  }

  static _notifyPersonalArmorMitigation(actor, detail = {}) {
    const armorMitigation = detail.armorMitigation ?? {};
    const damageTypeLabel = ActorDamageManager._localizeDamageType(detail.damageType);
    const mitigationLabel = armorMitigation.isDestroyed
      ? "Armor destroyed"
      : `Base ${Number(armorMitigation.baseMitigation ?? 0)} + Type ${Number(armorMitigation.typeMitigationMod ?? 0)} - AP ${Number(detail.effectiveAp ?? 0)}`;
    const adjustedIncoming = Number(detail.adjustedIncoming ?? detail.baseIncoming ?? 0);
    const finalDamage = Number(detail.finalDamage ?? 0);
    const tagSummary = (detail.tagEffectResult?.applied ?? [])
      .map(entry => `${entry.tag} +${Math.round((Number(entry.bonus ?? 0) || 0) * 100)}%`)
      .join(", ");
    const tagSuffix = tagSummary ? ` [${tagSummary}]` : "";

    ui.notifications.info(
      `${actor.name} mitigated ${damageTypeLabel}: ${mitigationLabel}${tagSuffix}. Incoming ${adjustedIncoming}, final ${finalDamage}.`
    );
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
    const monitorLabel = ANARCHY.actor.monitors[monitor] ?? monitor;
    const typeLabel = ActorDamageManager._localizeDamageType(damageType) ?? monitorLabel;
    const sourceKey = resistanceDetail.usedType ? 'type' : 'default';
    const sourceLabel = ANARCHY.actor.monitors.resistanceSources?.[sourceKey] ?? sourceKey;
    const content = formatString(ANARCHY.actor.monitors.resistanceApplied, {
      actor: actor.name,
      monitor: monitorLabel,
      damageType: typeLabel,
      value: resistanceDetail.value,
      source: sourceLabel,
    });
    ui.notifications.info(content);
  }

  static _localizeDamageType(damageType) {
    if (!damageType) {
      return undefined;
    }
    if (isPersonalDamageType(damageType)) {
      return getPersonalDamageTypeLabel(damageType);
    }
    return ANARCHY.mwd.weaponDamageType[damageType]
      ?? ANARCHY.mwd.personalDamageType[damageType]
      ?? ANARCHY.actor.monitors[damageType]
      ?? damageType;
  }

  static _computeArmorResistance(actor) {
    const armorMax = Checkbars.max(actor, 'armor');
    const armorDamage = Checkbars.getCounterValue(actor, 'armor');
    const armor = Math.max(0, armorMax - armorDamage);
    return Math.max(0, Math.ceil(armor / 3));
  }

  static _computeStrengthResistance(actor, monitor) {
    const strength = actor.getAttributeValue(TEMPLATE.actorAttributes.strength);
    return Math.max(0, Math.floor(strength / 4));
  }
}
