import { AnarchyBaseActor } from "./actor/base-actor.js";
import { CharacterActorSheet } from "./actor/character-sheet.js";
import { Damage } from "./damage.js";
import { Enums } from "./enums.js";
import { Grammar } from "./grammar.js";
import { Icons } from "./icons.js";
import { WeaponItem } from "./item/weapon-item.js";
import { Misc } from "./misc.js";
import { TEMPLATES_PATH } from "./constants.js";

const { loadTemplates } = foundry.applications.handlebars;

const HBS_PARTIAL_TEMPLATES = [
  `${TEMPLATES_PATH}/app/gm-anarchy.hbs`,
];

export class HandlebarsManager {

  constructor() {
    Hooks.once('ready', () => this.onReady());
  }

  async onReady() {
    this.registerBasicHelpers();
    await loadTemplates(Misc.distinct(HBS_PARTIAL_TEMPLATES))
  }

  registerBasicHelpers() {
    Handlebars.registerHelper('concat', (...args) => Misc.join(args.slice(0, -1)));
    Handlebars.registerHelper('eq', (a, b) => a === b);
    Handlebars.registerHelper('ne', (a, b) => a !== b);
    Handlebars.registerHelper('substring', (str, from, to) => str?.substring(from, to));
    Handlebars.registerHelper('toUpperCase', Grammar.toUpperCaseNoAccent);
    Handlebars.registerHelper('weaponDamageLetter', Damage.letter);
    Handlebars.registerHelper('weaponDamageCode', WeaponItem.damageCode);
    Handlebars.registerHelper('weaponDamageValue', WeaponItem.damageValue);
    Handlebars.registerHelper('weaponArmorMode', WeaponItem.armorMode);
    Handlebars.registerHelper('weaponRangeList', WeaponItem.getRangeList);

    Handlebars.registerHelper('skillValue', (actor, skillId) => actor.getSkillValue(skillId, false));
    Handlebars.registerHelper('specializationValue', (actor, skillId) => actor.getSkillValue(skillId, true));
    Handlebars.registerHelper('for', HandlebarsManager.hbsForLoop);
    Handlebars.registerHelper('modulo', (value, divisor) => value % divisor);
    Handlebars.registerHelper('divint', Misc.divint);
    Handlebars.registerHelper('divup', Misc.divup);
    Handlebars.registerHelper('sum', (v1, v2) => v1 + v2);
    Handlebars.registerHelper('times', (v1, v2) => v1 * v2);
    Handlebars.registerHelper('diff', (v1, v2) => v1 - v2);
    Handlebars.registerHelper('min', (v1, v2) => Math.min(v1, v2));
    Handlebars.registerHelper('max', (v1, v2) => Math.max(v1, v2));
    Handlebars.registerHelper('either', (a, b) => a ? a : b);
    Handlebars.registerHelper('includes', (list, value) => list?.includes(value));
    Handlebars.registerHelper('isInteger', a => a !== undefined && Number.isInteger(a));
    Handlebars.registerHelper('actorAttribute', (attribute, actor, item = undefined) => {
      if (!actor || typeof actor.getAttributeValue !== 'function') {
        console.warn('ANARCHY | actorAttribute helper: invalid actor', { attribute, actor });
        return 0;
      }
      return actor.getAttributeValue(attribute, item);
    });
    Handlebars.registerHelper('localizeAttribute', Enums.localizeAttribute);
    Handlebars.registerHelper('iconFA', Icons.fontAwesome);
    Handlebars.registerHelper('iconSrc', Icons.iconSystemPath);
    Handlebars.registerHelper('iconPath', Icons.iconPath);
    Handlebars.registerHelper('iconD6', Icons.iconD6);
    Handlebars.registerHelper('getActor', id => game.actors.get(id));
    Handlebars.registerHelper('actorHasFavorite', (actorId, options) => HandlebarsManager.checkHasFavorite(actorId, options));
    Handlebars.registerHelper('padWordListToMin', AnarchyBaseActor.padWordListToMin);
    Handlebars.registerHelper('sortSkills', AnarchyBaseActor.sortSkills);
    Handlebars.registerHelper('sortAssetModules', AnarchyBaseActor.sortAssetModules);
    Handlebars.registerHelper('sortQualities', AnarchyBaseActor.sortQualities);
    Handlebars.registerHelper('sortAttributeButton', AnarchyBaseActor.sortAttributeButton);
    Handlebars.registerHelper('range', function (min, max) { let array = []; for (let i = min; i <= max; i++) { array.push(i); } return array; });
    Handlebars.registerHelper('ifGte', function (value, threshold, options) { if (value >= threshold) { return options.fn(this); } else { return options.inverse(this); } });
    Handlebars.registerHelper('ifTabClosed', CharacterActorSheet.ifTabClosed);
    Handlebars.registerHelper('actorTabClosed', CharacterActorSheet.actorTabClosed);
    Handlebars.registerHelper('length', function(context) { return context?.length || 0; }); }

  static hbsForLoop(start, end, options) {
    let accum = '';
    for (let i = start; i < end; ++i) {
      accum += options.fn(i);
    }
    return accum;
  }

  static checkHasFavorite(actorId, options) {
    const actor = game.actors.get(actorId);
    return actor?.hasFavorite(options.hash.type, options.hash.id);
  }

}