import { AttributeActions } from "../attribute-actions.js";
import { ANARCHY } from "../config.js";
import { TEMPLATE } from "../constants.js";
import { Enums } from "../enums.js";
import { Misc } from "../misc.js";

const SHADOWAMP_TYPES = [TEMPLATE.itemType.shadowamp, TEMPLATE.itemType.weapon, TEMPLATE.itemType.cyberdeck];
/**
 * Modifier: {group, effect, category, subCategory, value, condition, id}
 */
export class Modifiers {
  constructor() {
    this.modifiers = {
      groups: Enums.mapObjetToKeyValue(ANARCHY.modifier.group, 'key', 'label'),
      roll: Modifiers._buildGroupOptions('roll'),
      attribute: Modifiers._buildGroupOptions('attribute'),
      monitor: Modifiers._buildGroupOptions('monitor'),
      other: Modifiers._buildGroupOptions('other'),
    }
    Hooks.once('ready', () => this.onReady());
  }

  static _buildGroupOptions(group) {
    switch (group) {
      case 'attribute':
        return {
          label: ANARCHY.modifier.group[group],
          effects: Enums.hbsAttributes.map(it => { return { key: it['value'], label: it['labelkey'] } }),
          categories: [],
        }
    }
    return {
      label: ANARCHY.modifier.group[group],
      effects: Enums.mapObjetToKeyValue(ANARCHY.modifier[group].effect, 'key', 'label'),
      categories: Enums.mapObjetToKeyValue(ANARCHY.modifier[group].category, 'key', 'label'),
    };
  }

  async onReady() {
    Handlebars.registerHelper('modifierHasSubCategory', (group, effect, category) => this.hasSubCategory(group, effect, category));
    Handlebars.registerHelper('modifierSelectOption', (value, options) => this.getSelectOptions(value, options));
  }

  hasSubCategory(group, effect, category) {
    switch (group) {
      case 'roll':
        return true;
    }
    return false;
  }

  getSelectOptions(select, options) {
    switch (select) {
      case 'group': return this.modifiers.groups;
      case 'effect': return this.modifiers[options.hash.group]?.effects;
      case 'category': return this.modifiers[options.hash.group]?.categories;
      case 'subCategory':
        switch (options.hash.group) {
          case 'roll': {
            return this.getSelectRollSubCategories(options.hash.category);
          }
        }
        return [];
    }
    return [];
  }

  getSelectRollSubCategories(category) {
    switch (category) {
      case 'attribute':
        return Enums.getAttributes().map(attr => { return { key: attr.value, label: attr.labelkey } });
      case 'skill':
        return game.system.anarchy.skills.getSkills()
          .map(it => { return { key: it.code, label: it.labelkey } });
      case 'attributeAction':
        const actions = AttributeActions.all().map(action => { return { key: action.code, label: action.labelkey }; });
        return Misc.distinct(actions.map(it => it.key)).map(key => actions.find(it => it.key == key))
    }
    return [];
  }

  getEnums() {
    return { modifiers: this.modifiers };
  }

  static buildRollModifiersFilter(context, effect) {
    return m => {
      if (m.group == 'roll' && m.effect == effect) {
        switch (m.category) {
          case 'attribute': return [context.attribute1, context.attribute2].includes(m.subCategory);
          case 'skill': return m.subCategory == context.skill?.system.code;
          case 'attributeAction': return m.subCategory == context.attributeAction || m.subCategory == AttributeActions.getDefenseAttributeAction(context.defenseAction)
        }
      }
      return false
    }
  }

  static computeRollModifiers(items, context, effect) {
    const contextFilter = Modifiers.buildRollModifiersFilter(context, effect)
    const filter = m => m.group == 'roll' && m.effect == effect && contextFilter(m)

    const itemModifiers = Modifiers._activeItems(items).map(item => Modifiers.itemModifiers(item, filter))
      .reduce((a, b) => a.concat(b), [])
      .sort(Misc.descending(im => im.modifier.value))

    const sumShadowamp = Modifiers.$sumShadowampModifiers(itemModifiers.filter(it => SHADOWAMP_TYPES.includes(it.item.type)).map(im => im.modifier.value))
    const sumOthers = Misc.sumValues(itemModifiers.filter(it => !SHADOWAMP_TYPES.includes(it.item.type)).map(im => im.modifier.value))
    return {
      value: sumShadowamp + sumOthers,
      sources: itemModifiers
    }
  }

  static $sumShadowampModifiers(shadowampModifiers) {
    const maxPositive = shadowampModifiers.find(v => v > 3) ?? 0
    const negative = Misc.sumValues(shadowampModifiers.filter(v => v < 0))
    const positive = Math.min(3, Misc.sumValues(shadowampModifiers.filter(v => v > 0 && v <= 3)))
    // allow only one item with modifier above 3 that replaces usual max of 3 to positive modifiers (for deltaware option in French rulebook)
    return negative + Math.max(positive, maxPositive)
  }

  static computeModifiers(items, group, effect = undefined, category = undefined) {
    const filter = Modifiers._createFilter(group, effect, category);
    const itemModifiers = Modifiers._activeItems(items).map(item => Modifiers.itemModifiers(item, filter))
      .reduce((a, b) => a.concat(b), []);
    const value = Misc.sumValues(itemModifiers, m => m.modifier.value);
    return {
      value: value,
      sources: itemModifiers
    }
  }

  static sumMonitorModifiers(items, monitor, category) {
    return Modifiers.sumModifiers(Modifiers._activeItems(items), 'monitor', monitor, category);
  }

  static sumModifiers(items, group, effect, category) {
    const filter = Modifiers._createFilter(group, effect, category);
    const itemModifiers = Modifiers._activeItems(items).map(item => Modifiers.itemModifiers(item, filter))
      .reduce((a, b) => a.concat(b), []);

    return Misc.sumValues(itemModifiers, m => m.modifier.value);
  }

  static _createFilter(group, effect, category) {
    return m => m.group == group
      && m.effect == (effect == undefined ? m.effect : effect)
      && m.category == (category == undefined ? m.category : category);
  }

  static countModifiers(items, group, effect = undefined, category = undefined) {
    const filter = Modifiers._createFilter(group, effect, category);
    const itemModifiers = Modifiers._activeItems(items).map(item => Modifiers.itemModifiers(item, filter))
      .reduce((a, b) => a.concat(b), []);

    return itemModifiers.count;
  }

  static itemModifiers(item, filter) {
    return Modifiers._listItemModifiers(item, filter).map(m => Modifiers._itemModifier(item, m));
  }

  static _listItemModifiers(item, filter = m => true) {
    return (item.system.modifiers ?? []).filter(filter);
  }

  static _itemModifier(item, modifier) {
    return {
      item: item,
      modifier: modifier
    };
  }

  static _activeItems(items) {
    return items.filter(it => it.isActive());
  }

}