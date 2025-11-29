import { Misc } from "../misc.js";


const DICE_FAS_ICONS = {
  highlighted: ['far fa-times-circle', 'fas fa-dice-one', 'fas fa-dice-two', 'fas fa-dice-three', 'fas fa-dice-four', 'fas fa-dice-five', 'fas fa-dice-six'],
  dimmed: ['far fa-times-circle', 'far fa-dice-one', 'far fa-dice-two', 'far fa-dice-three', 'far fa-dice-four', 'far fa-dice-five', 'far fa-dice-six'],
}

export class DiceCursor {
  static init() {
    Hooks.once('ready', async () => await this.onReady());
    Handlebars.registerHelper('dice-cursor-array', (min, max) => DiceCursor.array(min ?? 0, max ?? 5));
    Handlebars.registerHelper('dice-cursor-fas', (dice, value) => DiceCursor.fasClass(dice, value));
    Handlebars.registerHelper('dice-cursor-active', (dice, value) => DiceCursor.activeClass(dice, value));
    Handlebars.registerHelper('dice-cursor-color', (dice, editable) => DiceCursor.colorClass(dice, editable));
  }

  static async onReady() {
    await loadTemplates([
      'systems/anarchy/templates/roll/parts/dice-cursor.hbs',
    ]);
  }

  static array(min, max) {
    if (min > max) throw `min>max: ${min} > ${max}`
    return Array(max - min + 1).fill().map((item, index) => min + index)
  }

  static isActive(dice, value) {
    return (value <= dice && dice < 0) || (0 < dice && dice <= value);
  }

  static activeClass(dice, value) {
    return DiceCursor.isActive(dice, value) ? 'active' : 'inactive';
  }

  static fasClass(dice, value) {
    const fasSource = DiceCursor.isActive(dice, value) ? DICE_FAS_ICONS.highlighted : DICE_FAS_ICONS.dimmed;
    return DiceCursor.$getFas(fasSource, Math.abs(dice));
    return fas;
  }

  static colorClass(dice, editable) {
    if (dice == 0 || !editable) {
      return dice < 0 ? 'fixed-dice-malus' : 'fixed-dice-bonus';
    }
    return dice < 0 ? 'variable-dice-malus' : 'variable-dice-bonus';
  }

  static $getFas(fasArray, dice) {
    return fasArray[dice > 6 ? dice % 6 : dice];
  }

  static async diceCursor({ value, min, max, editable }) {
    return await renderTemplate('systems/anarchy/templates/roll/parts/dice-cursor.hbs', {
      value, min, max, editable
    })
  }
}