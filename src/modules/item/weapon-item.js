// src/modules/item/weapon-item.js
// Purpose: Registers Foundry hooks. References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { TEMPLATE, TEMPLATES_PATH } from "../constants.js";
import { MWD } from "../config.js";
import { Enums } from "../enums.js";
import { MWDItem } from "./anarchy-base-item.js";
import { Checkbars } from "../common/checkbars.js";
import { AnarchyUsers } from "../users.js";
import { ROLL_PARAMETER_CATEGORY } from "../roll/roll-parameters.js";
import { ANARCHY_HOOKS } from "../hooks-manager.js";
import { AttributeActions } from "../attribute-actions.js";
import { ErrorManager } from "../error-manager.js";
import { Misc } from "../misc.js";
import { SkillItem } from "./skill-item.js";
import { formatString } from "../strings.js";
import { getSkillDef } from "../mwd/skills.js";
import {
  deriveWeaponEffectsFromTraits,
  getPersonalDamageTypeLabel,
  normalizePersonalDamageType,
  normalizeWeaponTraits,
} from "../mwd/personal-damage.js";

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
    labelkey: MWD.common.roll.modifiers.weaponRange,
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
    labelkey: MWD.common.roll.modifiers.weaponArea,
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

export class WeaponItem extends MWDItem {

  static RANGE_ORDER = ['close', 'near', 'far', 'extreme'];
  static DEFAULT_UNARMED = Object.freeze({
    id: "unarmed",
    name: "Unarmed",
    category: "melee",
    skill: "meleeCombat",
    damage: 1,
    ap: 0,
    damageType: "concussive",
    attackRatingBand: { close: 0, near: 0, far: 0, extreme: 0 },
    range: { max: "close", close: 0, near: 0, far: 0, extreme: 0 },
    traits: [],
    notes: ""
  });

  static init() {
    Hooks.once(ANARCHY_HOOKS.REGISTER_ROLL_PARAMETERS, register => {
      register(WEAPON_AREA_PARAMETER);
      register(WEAPON_RANGE_PARAMETER);
    });
  }

  prepareBaseData() {
    super.prepareBaseData();

    if ((this.canonicalType ?? this.type) !== TEMPLATE.itemType.personalWeapon) return;

    const system = this.system ?? {};
    system.equipped = Boolean(system.equipped);
    system.isPrimary = Boolean(system.isPrimary);
    system.category = String(system.category ?? system.weaponCategory ?? "ranged").trim() || "ranged";
    system.skill = String(system.skill ?? "firearms").trim() || "firearms";
    system.ap = Number(system.ap ?? system.armorPiercing ?? 0) || 0;
    system.damage = Number(system.damage ?? 0) || 0;
    system.damageType = normalizePersonalDamageType(system.damageType);
    system.attackRatingBand = WeaponItem.normalizeAttackRatingBand(system.attackRatingBand);
    system.range = WeaponItem.normalizeRangeData(system.range);
    system.traits = WeaponItem.normalizeTraits(system.traits);
    system.notes = String(system.notes ?? "").trim();
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
    return "systems/mwd/img/colt-m1911.svg";
  }

  static defaultIconForType(type) {
    if (type === TEMPLATE.itemType.mechWeapon) {
      return "systems/mwd/img/default/Default_Weapon.svg";
    }
    return this.defaultIcon;
  }

  static normalizeTraits(value) {
    return normalizeWeaponTraits(value);
  }

  static normalizeRangeData(range) {
    const max = WeaponItem.normalizeRangeKey(range?.max ?? "near");
    return {
      max,
      close: Number(range?.close ?? range?.short ?? 0) || 0,
      near: Number(range?.near ?? range?.medium ?? 0) || 0,
      far: Number(range?.far ?? range?.long ?? 0) || 0,
      extreme: Number(range?.extreme ?? 0) || 0
    };
  }

  static normalizeAttackRatingBand(bands) {
    return {
      close: Number(bands?.close ?? bands?.short ?? 0) || 0,
      near: Number(bands?.near ?? bands?.medium ?? 0) || 0,
      far: Number(bands?.far ?? bands?.long ?? 0) || 0,
      extreme: Number(bands?.extreme ?? 0) || 0
    };
  }

  getCombatProfile() {
    const system = this.system ?? {};
    const canonicalType = this.canonicalType ?? this.type;
    const range = WeaponItem.normalizeRangeData(system.range);
    const skillCode = String(system.skill ?? "").trim();
    const skillDef = getSkillDef(skillCode);
    const damage = Number(system.damage ?? 0) || 0;
    const ap = Number(system.ap ?? system.armorPiercing ?? 0) || 0;
    const category = String(system.category ?? system.weaponCategory ?? "ranged").trim() || "ranged";
    const traits = WeaponItem.normalizeTraits(system.traits);
    const effects = deriveWeaponEffectsFromTraits(traits);

    return {
      id: this.id ?? "weapon",
      uuid: this.uuid ?? null,
      name: this.name ?? "Weapon",
      img: this.img,
      item: this,
      type: canonicalType,
      equipped: Boolean(system.equipped),
      isPrimary: Boolean(system.isPrimary),
      category,
      skill: skillCode || "firearms",
      skillDef,
      damage,
      ap,
      damageType: canonicalType === TEMPLATE.itemType.personalWeapon
        ? normalizePersonalDamageType(system.damageType)
        : String(system.damageType ?? "kinetic").trim() || "kinetic",
      attackRatingBand: WeaponItem.normalizeAttackRatingBand(system.attackRatingBand),
      range,
      defaultRangeBand: this.getDefaultRangeBand(range),
      traits,
      effects: canonicalType === TEMPLATE.itemType.personalWeapon ? effects : {},
      notes: String(system.notes ?? system.description ?? "").trim()
    };
  }

  getDefaultRangeBand(range = WeaponItem.normalizeRangeData(this.system?.range)) {
    const preferred = ["near", "close", "far", "extreme"];
    const maxIndex = WeaponItem.maxIndex(range.max);
    return preferred.find(key => WeaponItem.RANGE_ORDER.indexOf(key) <= maxIndex) ?? "close";
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
    if ((this.canonicalType ?? this.type) !== TEMPLATE.itemType.personalWeapon) {
      return this.system.defense ? AttributeActions.fixedDefenseCode(this.system.defense) : undefined;
    }
    if (this.system.defense) {
      return AttributeActions.fixedDefenseCode(this.system.defense);
    }

    const skillDef = getSkillDef(String(this.system.skill ?? "").trim());
    return skillDef?.defense ? AttributeActions.fixedDefenseCode(skillDef.defense) : undefined;
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
        return MWD.item.personalWeapon.weaponWithoutActor;
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
    if (damageAttribute && MWD.attributes[damageAttribute]) {
      code += MWD.attributes[damageAttribute].substring(0, 3).toUpperCase() + '/2 + ';
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
    if ((this.canonicalType ?? this.type) === TEMPLATE.itemType.personalWeapon) {
      return getPersonalDamageTypeLabel(this.system.damageType);
    }
    const labelKey = MWD.mwd.weaponDamageType[this.system.damageType]
      ?? MWD.mwd.personalDamageType[this.system.damageType];
    return labelKey ? labelKey : this.system.damageType;
  }

  getRanges() {
    return WeaponItem.getRangeList(WeaponItem.normalizeRangeData(this.system.range))
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
      const content = formatString(MWD.common.errors.ignoredTargets, {
        targets: invalidTargets.reduce(Misc.joiner(', ')),
      });
      ui.notifications.info(content);
    }
    if (validTargets.length == 0) {
      const content = formatString(MWD.common.errors.noTargetSelected, {
        weapon: this.name ?? MWD.itemType.singular.weapon
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
    if ((this.canonicalType ?? this.type) === TEMPLATE.itemType.personalWeapon) {
      return TEMPLATE.monitors.physical;
    }
    return this.system.monitor || TEMPLATE.monitors.physical;
  }
}
