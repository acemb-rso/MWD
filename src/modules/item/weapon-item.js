import { ICONS_PATH, TEMPLATE, TEMPLATES_PATH } from "../constants.js";
import { ANARCHY } from "../config.js";
import { Enums } from "../enums.js";
import { AnarchyBaseItem } from "./anarchy-base-item.js";
import { Checkbars } from "../common/checkbars.js";
import { AnarchyUsers } from "../users.js";
import { ROLL_PARAMETER_CATEGORY } from "../roll/roll-parameters.js";
import { ANARCHY_HOOKS } from "../hooks-manager.js";
import { AttributeActions } from "../attribute-actions.js";
import { ErrorManager } from "../error-manager.js";
import { Misc } from "../misc.js";
import { SkillItem } from "./skill-item.js";
import { formatString } from "../strings.js";

const AREA_TARGETS = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: undefined },
  cone: { targets: undefined },
  rect: { targets: undefined },
  ray: { targets: undefined },
}

// weapon range
const WEAPON_RANGE_PARAMETER = {
  code: 'weapon-range',
  options: {
    flags: { editable: true, },
    order: 20, category: ROLL_PARAMETER_CATEGORY.pool,
    labelkey: ANARCHY.common.roll.modifiers.weaponRange,
    hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/select-option.hbs`,
    hbsTemplateChat: undefined, //``
  },
  isUsed: (p) => true,
  condition: context => context.weapon,
  factory: context => {
    const ranges = context.weapon.getRanges();
    const rangeValues = ranges.map(it => it.value);
    return {
      value: ranges[0].value,
      min: Math.min(...rangeValues),
      max: Math.max(...rangeValues),
      choices: ranges,
      selected: ranges[0].labelkey
    }
  }
}
const WEAPON_AREA_PARAMETER = {
  code: 'weapon-area',
  options: {
    used: true,
    order: 20, category: ROLL_PARAMETER_CATEGORY.pool,
    labelkey: ANARCHY.common.roll.modifiers.weaponArea,
    hbsTemplateRoll: `${TEMPLATES_PATH}/roll/parts/input-numeric.hbs`,
    hbsTemplateChat: undefined, //``
  },
  isUsed: (p) => p.used,
  condition: context => context.weapon && context.weapon.getArea() != TEMPLATE.area.none,
  factory: context => {
    const countTargets = context.targeting.targetedTokenIds?.length ?? 1;
    const areaModifier = context.weapon.getAreaModifier(countTargets);
    return {
      value: areaModifier,
      min: Math.min(0, areaModifier),
      max: Math.max(0, areaModifier),
      used: countTargets > 1,
    }
  }
}

export class WeaponItem extends AnarchyBaseItem {

  static RANGE_ORDER = ['close', 'near', 'far', 'extreme'];

  static init() {
    Hooks.once(ANARCHY_HOOKS.REGISTER_ROLL_PARAMETERS, register => {
      register(WEAPON_AREA_PARAMETER);
      register(WEAPON_RANGE_PARAMETER);
    });
  }

  static maxIndex(maxKey) {
    const idx = WeaponItem.RANGE_ORDER.indexOf(maxKey);
    return idx >= 0 ? idx : WeaponItem.RANGE_ORDER.indexOf("near");
  }

 /**
   * Compute UI-friendly range band data:
   * - cap: normalized max band
   * - bands: [{key, allowed, value}]
   * - optimalKey: highest value among allowed (tie -> closest)
   */
  static getRangeBands(range) {
    const r = range ?? {};
    const cap = WeaponItem.normalizeRangeKey(r.max ?? "near");
    const capIdx = WeaponItem.maxIndex(cap);

    const bands = WeaponItem.RANGE_ORDER.map((key, idx) => ({
      key,
      allowed: idx <= capIdx,
      value: Number(r[key] ?? (key === "extreme" && r.long !== undefined ? r.long : 0))
    }));

    // Compute optimal: highest value among allowed; tie -> earliest (closest)
    let optimalKey = "close";
    let best = -Infinity;
    for (const b of bands) {
      if (!b.allowed) continue;
      if (b.value > best) { best = b.value; optimalKey = b.key; }
    }

    return { cap, bands, optimalKey };
  }
  
  static get defaultIcon() {
    return `${ICONS_PATH}/weapons/mac-10.svg`;
  }

  static defaultIconForType(type) {
    if (type === TEMPLATE.itemType.mechWeapon) {
      return `${ICONS_PATH}/weapons/cannon.svg`;
    }
    return this.defaultIcon;
  }

  isWeaponSkill(item) {
    return item.type == 'skill' && item.system.code === this.system.skill;
  }

  getWeaponSkill() {
    const actorSkill = this.actor?.items.find(skill => this.isWeaponSkill(skill))
    if (actorSkill) {
      return actorSkill
    }
    const worldSkill = game.items.find(skill => this.isWeaponSkill(skill))
    if (worldSkill) {
      return worldSkill
    }
    return SkillItem.prepareSkill(this.system.skill)
  }

  getDefense() {
    if (this.type !== TEMPLATE.itemType.personalWeapon) {
      return this.system.defense ? AttributeActions.fixedDefenseCode(this.system.defense) : undefined;
    }
    return AttributeActions.fixedDefenseCode(this.system.defense);
  }

  getDamage() {
    if (!this.parent) {
      return undefined;
    }
    const monitor = this._getMonitor();
    const damageAttributeValue = this.system.damageAttribute
      ? (this.parent.getAttributeValue(this.system.damageAttribute) ?? 0)
      : 0;
    return {
      value: WeaponItem.damageValue(
        monitor,
        this.system.damage,
        this.system.damageAttribute,
        damageAttributeValue
      ),
      monitor: monitor,
      damageType: this.system.damageType,
      damageTypeLabel: this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: WeaponItem.armorMode(monitor, this.system.noArmor ?? this.system.armorAvoidance)
    }
  }

  static damageValue(monitor, damage, damageAttribute, actorAttribute) {
    damage = Number(damage);
    if (damageAttribute) {
      if (actorAttribute !== undefined) {
        damage = damage + Math.ceil(Number(actorAttribute) / 2);
      }
      else {
        console.warn('Weapon not attached to an actor');
        return ANARCHY.item.personalWeapon.weaponWithoutActor;
      }
    }
    return damage;
  }

  getDamageCode() {
    return WeaponItem.damageCode(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute,
    );
  }

  static damageCode(monitor, damage, damageAttribute) {
    let code = '';
    if (damageAttribute && ANARCHY.attributes[damageAttribute]) {
      code += ANARCHY.attributes[damageAttribute].substring(0, 3).toUpperCase() + '/2 + ';
    }
    code += String(damage);
    return code;
  }

  static armorMode(monitor, noArmor) {
    if (Checkbars.useArmor(monitor)) {
      return noArmor ? 'noArmor' : 'withArmor'
    }
    return '';
  }

  getDamageTypeLabel() {
    const labelKey = ANARCHY.mwd.weaponDamageType[this.system.damageType]
      ?? ANARCHY.mwd.personalDamageType[this.system.damageType];
    return labelKey ? labelKey : this.system.damageType;
  }

  getRanges() {
    return WeaponItem.getRangeList(this.system.range)
      .filter(it => it.allowed)
      .map(it => ({ value: it.value, labelkey: it.labelkey }));
  }

  _getRange(range) {
    return { value: this.system.range[range], labelkey: Enums.getFromList(Enums.getEnums().ranges, range) };
  }

  static getRangeList(range) {
    const normalizedMax = WeaponItem.normalizeRangeKey(range?.max);
    const maxIndex = WeaponItem.RANGE_ORDER.indexOf(normalizedMax);
    return WeaponItem.RANGE_ORDER.map((key, index) => {
      return {
        key,
        allowed: maxIndex >= 0 ? index <= maxIndex : index === 0,
        value: range?.[key] ?? (key === 'extreme' && range?.long !== undefined ? range.long : undefined),
        labelkey: Enums.getFromList(Enums.getEnums().ranges, key)
      };
    });
  }

  static normalizeRangeKey(rangeKey) {
    if (rangeKey === 'long') {
      return 'extreme';
    }
    return rangeKey;
  }

  prepareShortcut() {
    return {
      img: this.img,
      label: this.name,
      callback: token => token.actor.rollWeapon(this)
    };
  }

  validateTargets(actor) {
    const monitor = this.getDamage()?.monitor
    const targets = AnarchyUsers.getTargetTokens(game.user);
    const validTargets = targets.filter(token => token.actor?.canReceiveDamage(monitor))
    const invalidTargets = targets.filter(token => !token.actor?.canReceiveDamage(monitor))
      .map(token => token.name)

    if (invalidTargets.length > 0) {
      const content = formatString(ANARCHY.common.errors.ignoredTargets, {
        targets: invalidTargets.reduce(Misc.joiner(', ')),
      });
      ui.notifications.info(content);
    }
    if (validTargets.length == 0) {
      const content = formatString(ANARCHY.common.errors.noTargetSelected, {
        weapon: this.name ?? ANARCHY.itemType.singular.weapon
      });
      ui.notifications.info(content);
    }
    else {
      this.checkWeaponTargetsCount(validTargets)
      // TODO: could check LOS, distance? ...
    }
    return validTargets;
  }

  checkWeaponTargetsCount(targets) {
    const area = this.system.area;
    const areaTargets = AREA_TARGETS[area] ?? {};
    ErrorManager.checkTargetsCount(areaTargets.targets ?? 0, targets, area);
  }

  getAreaModifier(countTargets) {
    const area = this.getArea();
    const areaTargets = AREA_TARGETS[area] ?? {};
    if (areaTargets.targets && areaTargets.adjust && countTargets <= areaTargets.targets) {
      return areaTargets.adjust[countTargets - 1] ?? 0;
    }
    return 0;
  }

  getArea() {
    if (this.system.area == '') {
      return TEMPLATE.area.none;
    }
    return this.system.area ?? TEMPLATE.area.none;
  }

  _getMonitor() {
    if (this.type === TEMPLATE.itemType.personalWeapon) {
      return this.system.damageCategory === 'fatigue'
        ? TEMPLATE.monitors.fatigue
        : TEMPLATE.monitors.physical;
    }
    return this.system.monitor || TEMPLATE.monitors.physical;
  }
}