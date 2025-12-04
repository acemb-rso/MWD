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
      selected: game.i18n.localize(ranges[0].labelkey)
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

  static init() {
    Hooks.once(ANARCHY_HOOKS.REGISTER_ROLL_PARAMETERS, register => {
      register(WEAPON_AREA_PARAMETER);
      register(WEAPON_RANGE_PARAMETER);
    });
  }

  static get defaultIcon() {
    return `${ICONS_PATH}/weapons/mac-10.svg`;
  }

  isWeaponSkill(item) {
    return item.type == 'skill' && item.system.code === this.system.skill;
  }

  get hasDrain() {
    const skill = this.getWeaponSkill()
    return skill.system.hasDrain
  }

  get hasConvergence() {
    const skill = this.getWeaponSkill()
    return skill.system.hasConvergence
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
    return AttributeActions.fixedDefenseCode(this.system.defense);
  }

  getDamage() {
    if (!this.parent) {
      return undefined;
    }
    const damageAttributeValue = this.system.damageAttribute
      ? (this.parent.getAttributeValue(this.system.damageAttribute) ?? 0)
      : 0;
    return {
      value: WeaponItem.damageValue(
        this.system.monitor,
        this.system.damage,
        this.system.damageAttribute,
        damageAttributeValue
      ),
      monitor: this.system.monitor,
      noArmor: this.system.noArmor,
      armorMode: WeaponItem.armorMode(this.system.monitor, this.system.noArmor)
    }
  }

  static damageValue(monitor, damage, damageAttribute, actorAttribute) {
    if (monitor == TEMPLATE.monitors.marks) {
      return 1;
    }
    damage = Number(damage);
    if (damageAttribute) {
      if (actorAttribute !== undefined) {
        damage = damage + Math.ceil(Number(actorAttribute) / 2);
      }
      else {
        console.warn('Weapon not attached to an actor');
        return game.i18n.localize(ANARCHY.item.weapon.weaponWithoutActor);
      }
    }
    return damage;
  }

  getDamageCode() {
    return WeaponItem.damageCode(
      this.system.monitor,
      this.system.damage,
      this.system.damageAttribute,
    );
  }

  static damageCode(monitor, damage, damageAttribute) {
    if (monitor == TEMPLATE.monitors.marks) {
      return '1';
    }
    let code = '';
    if (damageAttribute && ANARCHY.attributes[damageAttribute]) {
      code += game.i18n.localize(ANARCHY.attributes[damageAttribute]).substring(0, 3).toUpperCase() + '/2 + ';
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

  getRanges() {
    let ranges = [
      this._getRange('short'),
    ]
    if (this.system.range.max != 'short') {
      ranges.push(this._getRange('medium'));
    }
    if (this.system.range.max == 'long') {
      ranges.push(this._getRange('long'));
    }
    return ranges
  }

  _getRange(range) {
    return { value: this.system.range[range], labelkey: Enums.getFromList(Enums.getEnums().ranges, range) };
  }

  prepareShortcut() {
    return {
      img: this.img,
      label: this.name,
      callback: token => token.actor.rollWeapon(this)
    };
  }

  validateTargets(actor) {
    // TODO: add a weapon "plane" to define if attack is in matrix/astral/physical world
    // use actorCannotApplyDamage?
    const monitor = this.getDamage()?.monitor
    const targets = AnarchyUsers.getTargetTokens(game.user);
    const validTargets = targets.filter(token => token.actor?.canReceiveDamage(monitor))
    const invalidTargets = targets.filter(token => !token.actor?.canReceiveDamage(monitor))
      .map(token => token.name)

    if (invalidTargets.length > 0) {
      ui.notifications.info(game.i18n.format(ANARCHY.common.errors.ignoredTargets, {
        targets: invalidTargets.reduce(Misc.joiner(', ')),
      }));
    }
    if (validTargets.length == 0) {
      ui.notifications.info(game.i18n.format(ANARCHY.common.errors.noTargetSelected, {
        weapon: this.name ?? game.i18n.localize(ANARCHY.itemType.singular.weapon)
      }));
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
}