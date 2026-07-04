// src/modules/item/weapon-item.js
/**
 * @pipeline shared
 * @role Weapon Item document (extends MWDItem). Normalizes weapon system data —
 *   damage type/scale, traits/keywords, range bands, mount profile, machine vs.
 *   personal weapon fields — into the canonical shape resolvers and sheets read.
 *   Imported wherever weapons are inspected or attacked with.
 * @invariants
 *   - INVARIANT(normalize): weapon fields are normalized at prep time; the sheet
 *     and resolvers consume normalized data, they don't re-parse raw input (§6.1).
 *   - INVARIANT(boundary): describes the weapon as declarative facts (damage,
 *     range, traits). It does not compute the attack pool or roll — resolve-attack
 *     assembles that from these facts (Design Principles §1.2, §3.1, §3.3).
 *   - INVARIANT(canonical): one weapon model. Extend MWDItem here; don't duplicate
 *     weapon normalization elsewhere (§6.2).
 * @extends   anarchy-base-item.js (MWDItem)
 * @downstream personal-damage.js, machine-weapon-types.js, battle-armor.js, personal-range-bands.js
 */


import { TEMPLATE, TEMPLATES_PATH, ROLL_PARAMETER_CATEGORY } from "../core/constants.js";
import { MWD } from "../core/config.js";
import { Enums } from "../core/enums.js";
import { MWDItem } from "./anarchy-base-item.js";
import { Checkbars } from "../common/checkbars.js";
import { AnarchyUsers } from "../system/users.js";
import { ANARCHY_HOOKS } from "../system/hooks-manager.js";
import { AttributeActions } from "../combat/attribute-actions.js";
import { ErrorManager } from "../system/error-manager.js";
import { Misc } from "../utils/misc.js";
import { formatString } from "../utils/strings.js";
import { getSkillDef } from "../mwd/skills.js";
import {
  getPersonalDamageTypeLabel,
  normalizePersonalDamageType,
  normalizeWeaponTraits,
  normalizeWeaponStandardTraits,
  normalizeWeaponKeywords,
} from "../mwd/personal-damage.js";
import {
  normalizeDamageSourceScale,
  normalizeMountProfile,
} from "../mwd/battle-armor.js";
import {
  getMachineWeaponDamageTypeLabel,
  normalizeMachineWeaponDamageType,
} from "../mwd/machine-weapon-types.js";
import {
  getPersonalRangeBandLabel,
  normalizePersonalRangeData,
} from "../mwd/personal-range-bands.js";

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
  static DEFAULT_UNARMED = MWDItem.DEFAULT_UNARMED;

  static buildDefaultUnarmedProfile(actor = null) {
    const strength = Math.max(0, Number(
      actor?.getAttributeValue?.(TEMPLATE.actorAttributes.strength)
        ?? actor?.system?.attributes?.strength?.value
        ?? 0
    ) || 0);
    const reflexes = Math.max(0, Number(
      actor?.getAttributeValue?.(TEMPLATE.actorAttributes.reflexes)
        ?? actor?.system?.attributes?.reflexes?.value
        ?? 0
    ) || 0);

    return {
      ...foundry.utils.deepClone(this.DEFAULT_UNARMED),
      damage: Math.ceil(strength / 2),
      attackRatingBand: {
        ...this.DEFAULT_UNARMED.attackRatingBand,
        close: reflexes
      },
      range: {
        ...this.DEFAULT_UNARMED.range,
        max: "close"
      },
      uuid: null,
      img: null,
      item: null,
      equipped: true,
      isPrimary: false,
      defaultRangeBand: "close",
      isSynthetic: true
    };
  }

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
    system.range = WeaponItem.normalizePersonalRangeData(system.range);
    system.scale = normalizeDamageSourceScale(system.scale, "personal");
    system.mount = normalizeMountProfile(system.mount);
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
      return "systems/mwd/img/icons/systems/upgrades/grenade_launcher_underbarrel.svg";
    }
    return this.defaultIcon;
  }

  static normalizeTraits(value) {
    return normalizeWeaponTraits(value);
  }

  static normalizePersonalRangeData(range) {
    const normalized = normalizePersonalRangeData(range);
    normalized.max = WeaponItem.normalizeRangeKey(normalized.max ?? range?.max ?? "extreme");
    return normalized;
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

  getCombatProfile(options = {}) {
    if ((this.canonicalType ?? this.type) === TEMPLATE.itemType.personalWeapon) {
      return super.getCombatProfile(options);
    }

    const system = this.system ?? {};
    const canonicalType = this.canonicalType ?? this.type;
    const range = canonicalType === TEMPLATE.itemType.personalWeapon
      ? WeaponItem.normalizePersonalRangeData(system.range)
      : WeaponItem.normalizeRangeData(system.range);
    const skillCode = String(system.skill ?? "").trim();
    const skillDef = getSkillDef(skillCode);
    const damage = Number(system.damage ?? 0) || 0;
    const ap = Number(system.ap ?? system.armorPiercing ?? 0) || 0;
    const category = String(system.category ?? system.weaponCategory ?? "ranged").trim() || "ranged";
    const traits = WeaponItem.normalizeTraits(system.traits);
    const baseDamageType = canonicalType === TEMPLATE.itemType.personalWeapon
      ? normalizePersonalDamageType(system.damageType)
      : normalizeMachineWeaponDamageType(system.damageType, "energy");

    return {
      id: this.id ?? "weapon",
      uuid: this.uuid ?? null,
      name: this.name ?? "Weapon",
      img: this.img,
      item: this,
      type: canonicalType,
      equipped: Boolean(system.equipped),
      isPrimary: Boolean(system.isPrimary),
      scale: canonicalType === TEMPLATE.itemType.personalWeapon ? normalizeDamageSourceScale(system.scale, "personal") : "machine",
      mount: normalizeMountProfile(system.mount),
      category,
      skill: skillCode || "firearms",
      skillDef,
      damage,
      ap,
      baseDamageType,
      baseDamageTypeLabel: canonicalType === TEMPLATE.itemType.personalWeapon
        ? getPersonalDamageTypeLabel(baseDamageType)
        : getMachineWeaponDamageTypeLabel(baseDamageType),
      damageType: baseDamageType,
      damageTypeLabel: canonicalType === TEMPLATE.itemType.personalWeapon
        ? getPersonalDamageTypeLabel(baseDamageType)
        : getMachineWeaponDamageTypeLabel(baseDamageType),
      attackRatingBand: WeaponItem.normalizeAttackRatingBand(system.attackRatingBand),
      range,
      defaultRangeBand: this.getDefaultRangeBand(range),
      traits,
      // Machine weapons author standard traits through the Keywords field; surface
      // them (and standardTraits, if present) so the attack resolver and trait helpers
      // can read them. Without this, keywords never reach the resolver for a lone
      // mech weapon (only weapon-group profiles previously carried keywords).
      keywords: normalizeWeaponKeywords(system.keywords),
      standardTraits: normalizeWeaponStandardTraits(system.standardTraits),
      effects: {},
      notes: String(system.notes ?? system.description ?? "").trim()
    };
  }

  getDefaultRangeBand(range = WeaponItem.normalizeRangeData(this.system?.range)) {
    const preferred = ["near", "close", "far", "extreme"];
    const maxIndex = WeaponItem.maxIndex(range.max);
    return preferred.find(key => WeaponItem.RANGE_ORDER.indexOf(key) <= maxIndex) ?? "close";
  }

  getWeaponSkill() {
    const actorSkill = this.actor?.items.find(skill =>
      skill.type === TEMPLATE.itemType.skill && skill.system.code === this.system.skill
    );
    if (actorSkill) return actorSkill;

    const skillDef = getSkillDef(String(this.system.skill ?? "").trim());
    if (!skillDef) return null;

    return {
      name: skillDef.label,
      system: {
        code: skillDef.code,
        attribute: skillDef.attribute,
        value: 0
      }
    };
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
    const normalized = normalizeMachineWeaponDamageType(this.system.damageType, "energy");
    return getMachineWeaponDamageTypeLabel(normalized);
  }

  getRanges() {
    const personalScale = (this.canonicalType ?? this.type) === TEMPLATE.itemType.personalWeapon;
    const range = personalScale
      ? WeaponItem.normalizePersonalRangeData(this.system.range)
      : WeaponItem.normalizeRangeData(this.system.range);
    return WeaponItem.getRangeList(range, {
      personalScale
    })
      .filter(it => it.allowed)
      .map(it => ({ value: it.value, labelkey: it.labelkey }));
  }

  _getRange(range) {
    return { value: this.system.range[range], labelkey: Enums.getFromList(Enums.getEnums().ranges, range) };
  }

  static getRangeList(range, { personalScale = false } = {}) {
    const normalizedMax = WeaponItem.normalizeRangeKey(range?.max);
    const maxIndex = WeaponItem.RANGE_ORDER.indexOf(normalizedMax);
    return WeaponItem.RANGE_ORDER.map((key, index) => {
      return {
        key,
        allowed: maxIndex >= 0 ? index <= maxIndex : index === 0,
        value: range?.[key] ?? (key === 'extreme' && range?.long !== undefined ? range.long : undefined),
        labelkey: personalScale ? getPersonalRangeBandLabel(key) : Enums.getFromList(Enums.getEnums().ranges, key)
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
