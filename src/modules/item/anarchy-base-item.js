import { Checkbars } from '../common/checkbars.js';
import { Misc } from '../misc.js';
import { TEMPLATE } from '../constants.js';
import { RollDialog } from '../roll/roll-dialog.js';
import { NO_MATRIX_MONITOR } from '../matrix-helper.js';

export class AnarchyBaseItem extends Item {

  static init() {
    Hooks.on('createItem', (item, options, id) => item.onCreateItem(options, id));
  }

  async onCreateItem(options, id) {
  }

  constructor(docData, context = {}) {
    if (!context.anarchy?.ready) {
      foundry.utils.mergeObject(context, { anarchy: { ready: true } });
      const ItemConstructor = game.system.anarchy.itemClasses[docData.type];
      if (ItemConstructor) {
        if (!docData.img) {
          docData.img = ItemConstructor.defaultIcon;
        }
        return new ItemConstructor(docData, context);
      }
    }
    context.anarchy = undefined
    super(docData, context);
  }

  static get defaultIcon() {
    return undefined;
  }

  getAttributes() {
    return [];
  }

  getUsableAttributes() {
    return this.isActive() ? this.getAttributes() : []
  }

  getAttributeValue(attribute) {
    if (this.system.attributes) {
      return this.system.attributes[attribute]?.value ?? 0;
    }
    return 0;
  }

  hasOwnAnarchy() { return false; }
  hasGMAnarchy() { return false; }

  hasMatrixMonitor() { return false; }
  getMatrixMonitor() { return NO_MATRIX_MONITOR }

  async nextConnectionMode() { }

  async setCheckbarValue(checkbarPath, value) {
    return await this.update({ [checkbarPath]: value })
  }

  isMetatype() { return this.type == TEMPLATE.itemType.metatype; }
  isCyberdeck() { return this.type == TEMPLATE.itemType.cyberdeck; }
  isWeapon() { return this.type == TEMPLATE.itemType.weapon; }

  isActive() { return !this.system.inactive; }

  canReceiveMarks() { return this.system.monitors?.matrix?.canMark; }

  async rollAttribute(attribute) {
    if (this.parent) {
      await RollDialog.itemAttributeRoll(this, attribute);
    }
  }

  async switchMonitorCheck(monitor, index, checked, sourceActorId = undefined) {
    await Checkbars.switchMonitorCheck(this.parent, monitor, index, checked, sourceActorId, this);
  }

  async setCounter(monitor, value) {
    await Checkbars.setCounter(this, monitor, value);
  }


  async addActorMark(sourceActorId) {
    await Checkbars.addActorMark(this, sourceActorId);
  }

  async createModifier(modifier = {}) {
    modifier = foundry.utils.mergeObject(modifier, {
      group: 'roll',
      effect: 'pool',
      category: 'skill',
      subCategory: '',
      value: 0,
      condition: ''
    });
    this._mutateModifiers(values => values.concat([modifier]));
  }

  async deleteModifier(modifierId) {
    await this._mutateModifiers(modifiers => modifiers.filter(it => it.id != modifierId));
  }

  async changeModifierSelection(modifierId, select, value) {
    let impact = this._computeModifierImpact(select, value);

    this._applyModifierUpdate(modifierId, impact);
  }

  _computeModifierImpact(select, value) {
    switch (select) {
      case 'group': return m => {
        if (m.group != value) {
          m.group = value;
          m.effect = '';
          m.category = '';
          m.subCategory = '';
        }
      };
      case 'effect': return m => m.effect = value;
      case 'category': return m => {
        if (m.category != value) {
          m.category = value;
          m.subCategory = '';
        }
      };
      case 'subCategory': return m => m.subCategory = value;
    }
    return m => { };
  }

  async changeModifierValue(modifierId, value) {
    this._applyModifierUpdate(modifierId, m => m.value = Number(value));
  }

  async changeModifierCondition(modifierId, value) {
    this._applyModifierUpdate(modifierId, m => m.condition = value);
  }

  async _applyModifierUpdate(id, updateFunction = m => { }) {
    await this._mutateModifiers(values => values.map(it => {
      if (it.id == id) {
        updateFunction(it);
      }
      return it;
    }));
  }

  async _mutateModifiers(mutation = values => values) {
    const modifiers = mutation(this.system.modifiers);
    Misc.reindexIds(modifiers);
    await this.update({ 'system.modifiers': modifiers });
  }

  prepateShortcut() {
    return undefined;
  }
}

