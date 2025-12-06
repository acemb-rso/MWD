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
  `${TEMPLATES_PATH}/actor/character-limited.hbs`,
  `${TEMPLATES_PATH}/actor/character/capacity.hbs`,
  `${TEMPLATES_PATH}/actor/character/description.hbs`,
  `${TEMPLATES_PATH}/actor/character/essence.hbs`,
  `${TEMPLATES_PATH}/actor/character/name.hbs`,
  `${TEMPLATES_PATH}/actor/character/social-celebrity.hbs`,
  `${TEMPLATES_PATH}/actor/npc-parts/asset-module.hbs`,
  `${TEMPLATES_PATH}/actor/npc-parts/qualities.hbs`,
  `${TEMPLATES_PATH}/actor/npc-parts/quality.hbs`,
  `${TEMPLATES_PATH}/actor/npc-parts/skill.hbs`,
  `${TEMPLATES_PATH}/actor/npc-parts/skills.hbs`,
  `${TEMPLATES_PATH}/actor/npc-parts/weapon.hbs`,
  `${TEMPLATES_PATH}/actor/npc-parts/weapons.hbs`,
  `${TEMPLATES_PATH}/actor/parts/asset-module.hbs`,
  `${TEMPLATES_PATH}/actor/parts/asset-modules.hbs`,
  `${TEMPLATES_PATH}/actor/parts/attribute.hbs`,
  `${TEMPLATES_PATH}/actor/parts/attributebutton.hbs`,
  `${TEMPLATES_PATH}/actor/parts/attributebuttons.hbs`,
  `${TEMPLATES_PATH}/actor/parts/attributes.hbs`,
  `${TEMPLATES_PATH}/actor/parts/contact.hbs`,
  `${TEMPLATES_PATH}/actor/parts/contacts.hbs`,
  `${TEMPLATES_PATH}/actor/parts/description.hbs`,
  `${TEMPLATES_PATH}/actor/parts/gear.hbs`,
  `${TEMPLATES_PATH}/actor/parts/gears.hbs`,
  `${TEMPLATES_PATH}/actor/parts/gmnotes.hbs`,
  `${TEMPLATES_PATH}/actor/parts/life-module.hbs`,
  `${TEMPLATES_PATH}/actor/parts/life-modules.hbs`,
  `${TEMPLATES_PATH}/actor/parts/owned-actor.hbs`,
  `${TEMPLATES_PATH}/actor/parts/owned-actors.hbs`,
  `${TEMPLATES_PATH}/actor/parts/ownership.hbs`,
  `${TEMPLATES_PATH}/actor/parts/passport-details.hbs`,
  `${TEMPLATES_PATH}/actor/parts/qualities.hbs`,
  `${TEMPLATES_PATH}/actor/parts/quality.hbs`,
  `${TEMPLATES_PATH}/actor/parts/skill.hbs`,
  `${TEMPLATES_PATH}/actor/parts/skills.hbs`,
  `${TEMPLATES_PATH}/actor/parts/weapon-range.hbs`,
  `${TEMPLATES_PATH}/actor/parts/weapon.hbs`,
  `${TEMPLATES_PATH}/actor/parts/weapons.hbs`,
  `${TEMPLATES_PATH}/actor/parts/words.hbs`,
  `${TEMPLATES_PATH}/app/gm-anarchy.hbs`,
  `${TEMPLATES_PATH}/app/gm-convergence.hbs`,
  `${TEMPLATES_PATH}/app/gm-difficulty-buttons.hbs`,
  `${TEMPLATES_PATH}/app/gm-difficulty.hbs`,
  `${TEMPLATES_PATH}/chat/anarchy-roll-title.hbs`,
  `${TEMPLATES_PATH}/chat/edge-reroll-button.hbs`,
  `${TEMPLATES_PATH}/chat/parts/actor-image.hbs`,
  `${TEMPLATES_PATH}/chat/parts/generic-parameter.hbs`,
  `${TEMPLATES_PATH}/chat/parts/result-mode-weapon.hbs`,
  `${TEMPLATES_PATH}/chat/roll-modifier.hbs`,
  `${TEMPLATES_PATH}/common/actor-reference.hbs`,
  `${TEMPLATES_PATH}/common/check-element.hbs`,
  `${TEMPLATES_PATH}/common/checkbar.hbs`,
  `${TEMPLATES_PATH}/common/damage-armor.hbs`,
  `${TEMPLATES_PATH}/common/damage-code.hbs`,
  `${TEMPLATES_PATH}/common/enum-value-label.hbs`,
  `${TEMPLATES_PATH}/common/favorite.hbs`,
  `${TEMPLATES_PATH}/common/item-control-activate.hbs`,
  `${TEMPLATES_PATH}/common/item-control-add.hbs`,
  `${TEMPLATES_PATH}/common/item-controls.hbs`,
  `${TEMPLATES_PATH}/common/label.hbs`,
  `${TEMPLATES_PATH}/common/view-mode.hbs`,
  `${TEMPLATES_PATH}/item/parts/inactive.hbs`,
  `${TEMPLATES_PATH}/item/parts/itemname.hbs`,
  `${TEMPLATES_PATH}/item/parts/modifier.hbs`,
  `${TEMPLATES_PATH}/item/parts/modifiers.hbs`,
  `${TEMPLATES_PATH}/item/parts/references.hbs`,
  `${TEMPLATES_PATH}/monitors/anarchy-actor.hbs`,
  `${TEMPLATES_PATH}/monitors/anarchy-scene.hbs`,
  `${TEMPLATES_PATH}/monitors/anarchy.hbs`,
  `${TEMPLATES_PATH}/monitors/armor.hbs`,
  `${TEMPLATES_PATH}/monitors/edge-pool.hbs`,
  `${TEMPLATES_PATH}/monitors/edge.hbs`,
  `${TEMPLATES_PATH}/monitors/fatigue.hbs`,
  `${TEMPLATES_PATH}/monitors/physical.hbs`,
  `${TEMPLATES_PATH}/monitors/social-credibility.hbs`,
  `${TEMPLATES_PATH}/monitors/social-rumor.hbs`,
  `${TEMPLATES_PATH}/monitors/stun.hbs`,
  `${TEMPLATES_PATH}/roll/parts/dice-cursor.hbs`,
  `${TEMPLATES_PATH}/roll/parts/image-attribute.hbs`,
  `${TEMPLATES_PATH}/roll/parts/image-attributeAction.hbs`,
  `${TEMPLATES_PATH}/roll/parts/image-defense.hbs`,
  `${TEMPLATES_PATH}/roll/parts/image-skill.hbs`,
  `${TEMPLATES_PATH}/roll/parts/image-weapon.hbs`,
  `${TEMPLATES_PATH}/roll/parts/parameter-label.hbs`,
  `${TEMPLATES_PATH}/roll/roll-parameters-category.hbs`,
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
