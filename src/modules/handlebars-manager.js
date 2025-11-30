import { AnarchyBaseActor } from "./actor/base-actor.js";
import { CharacterEnhancedSheet } from "./actor/character-enhanced-sheet.js";
import { Damage } from "./damage.js";
import { Enums } from "./enums.js";
import { Grammar } from "./grammar.js";
import { Icons } from "./icons.js";
import { WeaponItem } from "./item/weapon-item.js";
import { Misc } from "./misc.js";

const { loadTemplates } = foundry.applications.handlebars;

const HBS_PARTIAL_TEMPLATES = [
  // -- monitors
  'systems/mwd/templates/monitors/anarchy-actor.hbs',
  'systems/mwd/templates/monitors/armor.hbs',
  'systems/mwd/templates/monitors/edge.hbs',
  'systems/mwd/templates/actor/parts/matrix-cyberdeck.hbs',
  'systems/mwd/templates/monitors/matrix.hbs',
  'systems/mwd/templates/monitors/physical.hbs',
  'systems/mwd/templates/monitors/social-credibility.hbs',
  'systems/mwd/templates/monitors/social-rumor.hbs',
  'systems/mwd/templates/monitors/structure.hbs',
  'systems/mwd/templates/monitors/fatigue.hbs',
  'systems/mwd/templates/actor/character/name.hbs',

  // character
  'systems/mwd/templates/actor/character/capacity.hbs',
  'systems/mwd/templates/actor/character/description.hbs',
  'systems/mwd/templates/actor/character/genre.hbs',
  'systems/mwd/templates/actor/character/karma.hbs',
  'systems/mwd/templates/actor/character/social-celebrity.hbs',
  // character parts
  'systems/mwd/templates/actor/character-limited.hbs',
  'systems/mwd/templates/actor/parts/words.hbs',
  'systems/mwd/templates/actor/parts/contact.hbs',
  'systems/mwd/templates/actor/parts/contacts.hbs',
  'systems/mwd/templates/actor/parts/gear.hbs',
  'systems/mwd/templates/actor/parts/gears.hbs',
  // character enhanced
  'systems/mwd/templates/actor/character-enhanced/attributes.hbs',
  'systems/mwd/templates/actor/character-enhanced/capacity.hbs',
  'systems/mwd/templates/actor/character-enhanced/attribute.hbs',
  'systems/mwd/templates/actor/character-enhanced/karma.hbs',
  'systems/mwd/templates/actor/character-enhanced/hexabox.hbs',
  'systems/mwd/templates/actor/character-enhanced/words.hbs',
  'systems/mwd/templates/actor/character-enhanced/skills.hbs',
  'systems/mwd/templates/actor/character-enhanced/skill.hbs',
  'systems/mwd/templates/actor/character-enhanced/shadowamp.hbs',
  'systems/mwd/templates/actor/character-enhanced/shadowamps.hbs',
  'systems/mwd/templates/actor/character-enhanced/quality.hbs',
  'systems/mwd/templates/actor/character-enhanced/qualities.hbs',
  'systems/mwd/templates/actor/character-enhanced/monitors.hbs',
  'systems/mwd/templates/actor/character-enhanced/armor.hbs',
  'systems/mwd/templates/actor/character-enhanced/fatigue.hbs',
  'systems/mwd/templates/actor/character-enhanced/physical.hbs',
  'systems/mwd/templates/actor/character-enhanced/checkbar.hbs',
  'systems/mwd/templates/actor/character-enhanced/check-element.hbs',
  'systems/mwd/templates/actor/character-enhanced/anarchy-actor.hbs',
  'systems/mwd/templates/actor/character-enhanced/social-credibility.hbs',
  'systems/mwd/templates/actor/character-enhanced/social-rumor.hbs',
  'systems/mwd/templates/actor/character-enhanced/edge.hbs',
  'systems/mwd/templates/actor/character-enhanced/actions.hbs',
  'systems/mwd/templates/actor/character-enhanced/attributebutton.hbs',
  'systems/mwd/templates/actor/character-enhanced/attributebuttons.hbs',
  'systems/mwd/templates/actor/character-enhanced/gears.hbs',
  'systems/mwd/templates/actor/character-enhanced/gear.hbs',
  'systems/mwd/templates/actor/character-enhanced/cyberdecks.hbs',
  'systems/mwd/templates/actor/character-enhanced/cyberdeck.hbs',
  'systems/mwd/templates/actor/character-enhanced/weapons.hbs',
  'systems/mwd/templates/actor/character-enhanced/weapon.hbs',
  'systems/mwd/templates/actor/character-enhanced/damage-code.hbs',
  'systems/mwd/templates/actor/character-enhanced/damage-armor.hbs',
  'systems/mwd/templates/actor/character-enhanced/story.hbs',
  'systems/mwd/templates/actor/character-enhanced/equipments.hbs',
  'systems/mwd/templates/actor/character-enhanced/contact.hbs',
  'systems/mwd/templates/actor/character-enhanced/contacts.hbs',
  'systems/mwd/templates/actor/character-enhanced/gmnotes.hbs',
  'systems/mwd/templates/actor/character-enhanced/description.hbs',
  'systems/mwd/templates/actor/character-enhanced/owned-actor.hbs',
  'systems/mwd/templates/actor/character-enhanced/owned-actors.hbs',
  // actor common
  'systems/mwd/templates/actor/parts/attributebutton.hbs',
  'systems/mwd/templates/actor/parts/attributebuttons.hbs',
  'systems/mwd/templates/actor/parts/attribute.hbs',
  'systems/mwd/templates/actor/parts/attributes.hbs',
  'systems/mwd/templates/actor/parts/description.hbs',
  'systems/mwd/templates/actor/parts/gmnotes.hbs',
  'systems/mwd/templates/actor/parts/owned-actor.hbs',
  'systems/mwd/templates/actor/parts/owned-actors.hbs',
  'systems/mwd/templates/monitors/marks-actor.hbs',
  'systems/mwd/templates/monitors/marks.hbs',
  'systems/mwd/templates/actor/parts/ownership.hbs',
  'systems/mwd/templates/actor/parts/qualities.hbs',
  'systems/mwd/templates/actor/parts/quality.hbs',
  'systems/mwd/templates/actor/parts/shadowamp.hbs',
  'systems/mwd/templates/actor/parts/shadowamps.hbs',
  'systems/mwd/templates/actor/parts/item-attribute.hbs',
  'systems/mwd/templates/actor/parts/cyberdeck.hbs',
  'systems/mwd/templates/actor/parts/cyberdecks.hbs',
  'systems/mwd/templates/actor/parts/skill.hbs',
  'systems/mwd/templates/actor/parts/skills.hbs',
  'systems/mwd/templates/actor/parts/weapon-range.hbs',
  'systems/mwd/templates/actor/parts/weapon.hbs',
  'systems/mwd/templates/actor/parts/weapons.hbs',
  //-- NPC
  'systems/mwd/templates/actor/npc-parts/quality.hbs',
  'systems/mwd/templates/actor/npc-parts/qualities.hbs',
  'systems/mwd/templates/actor/npc-parts/shadowamp.hbs',
  'systems/mwd/templates/actor/npc-parts/shadowamps.hbs',
  'systems/mwd/templates/actor/npc-parts/skill.hbs',
  'systems/mwd/templates/actor/npc-parts/skills.hbs',
  'systems/mwd/templates/actor/npc-parts/weapon.hbs',
  'systems/mwd/templates/actor/npc-parts/weapons.hbs',
  // Vehicles
  'systems/mwd/templates/actor/vehicle/vehicle-attributes.hbs',
  'systems/mwd/templates/actor/vehicle/vehicle-category.hbs',
  'systems/mwd/templates/actor/vehicle/vehicle-skill.hbs',
  // item
  'systems/mwd/templates/item/parts/inactive.hbs',
  'systems/mwd/templates/item/parts/itemname.hbs',
  'systems/mwd/templates/item/parts/modifier.hbs',
  'systems/mwd/templates/item/parts/modifiers.hbs',
  'systems/mwd/templates/item/parts/references.hbs',
  // common&technical partials
  'systems/mwd/templates/monitors/anarchy.hbs',
  'systems/mwd/templates/monitors/anarchy-scene.hbs',
  'systems/mwd/templates/common/view-mode.hbs',
  'systems/mwd/templates/common/check-element.hbs',
  'systems/mwd/templates/common/checkbar.hbs',
  'systems/mwd/templates/common/label.hbs',
  'systems/mwd/templates/common/damage-code.hbs',
  'systems/mwd/templates/common/damage-armor.hbs',
  'systems/mwd/templates/common/enum-value-label.hbs',
  'systems/mwd/templates/common/favorite.hbs',
  'systems/mwd/templates/common/item-control-add.hbs',
  'systems/mwd/templates/common/item-control-activate.hbs',
  'systems/mwd/templates/common/item-controls.hbs',
  'systems/mwd/templates/common/control-connectionMode.hbs',
  'systems/mwd/templates/common/actor-reference.hbs',
  // dialogs
  'systems/mwd/templates/dialog/roll-modifier.hbs',
  // chat
  'systems/mwd/templates/chat/anarchy-roll-title.hbs',
  'systems/mwd/templates/chat/edge-reroll-button.hbs',
  'systems/mwd/templates/chat/parts/actor-image.hbs',
  'systems/mwd/templates/chat/parts/generic-parameter.hbs',
  'systems/mwd/templates/chat/parts/result-mode-weapon.hbs',
  'systems/mwd/templates/chat/roll-modifier.hbs',
  // apps
  'systems/mwd/templates/app/gm-anarchy.hbs',
  'systems/mwd/templates/app/gm-difficulty.hbs',
  'systems/mwd/templates/app/gm-difficulty-buttons.hbs',
  'systems/mwd/templates/app/gm-convergence.hbs',
  // roll (roll rendering helpers)
  'systems/mwd/templates/roll/parts/dice-cursor.hbs',
  'systems/mwd/templates/roll/parts/parameter-label.hbs',
  'systems/mwd/templates/roll/roll-parameters-category.hbs',
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
    Handlebars.registerHelper('substring', (str, from, to) => str?.substring(from, to));
    Handlebars.registerHelper('toUpperCase', Grammar.toUpperCaseNoAccent);
    Handlebars.registerHelper('weaponDamageLetter', Damage.letter);
    Handlebars.registerHelper('weaponDamageCode', WeaponItem.damageCode);
    Handlebars.registerHelper('weaponDamageValue', WeaponItem.damageValue);
    Handlebars.registerHelper('weaponArmorMode', WeaponItem.armorMode);

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
    Handlebars.registerHelper('isInteger', a => a !== undefined && Number.isInteger(a));
    Handlebars.registerHelper('actorAttribute', (attribute, actor, item = undefined) => actor.getAttributeValue(attribute, item));
    Handlebars.registerHelper('localizeAttribute', Enums.localizeAttribute);
    Handlebars.registerHelper('iconFA', Icons.fontAwesome);
    Handlebars.registerHelper('iconSrc', Icons.iconSystemPath);
    Handlebars.registerHelper('iconPath', Icons.iconPath);
    Handlebars.registerHelper('iconD6', Icons.iconD6);
    Handlebars.registerHelper('getActor', id => game.actors.get(id));
    Handlebars.registerHelper('actorHasFavorite', (actorId, options) => HandlebarsManager.checkHasFavorite(actorId, options));
    Handlebars.registerHelper('padWordListToMin', AnarchyBaseActor.padWordListToMin);
    Handlebars.registerHelper('sortSkills', AnarchyBaseActor.sortSkills);
    Handlebars.registerHelper('sortShadowamps', AnarchyBaseActor.sortShadowamps);
    Handlebars.registerHelper('sortQualities', AnarchyBaseActor.sortQualities);
    Handlebars.registerHelper('sortAttributeButton', AnarchyBaseActor.sortAttributeButton);
    Handlebars.registerHelper('range', function (min, max) { let array = []; for (let i = min; i <= max; i++) { array.push(i); } return array; });
    Handlebars.registerHelper('ifGte', function (value, threshold, options) { if (value >= threshold) { return options.fn(this); } else { return options.inverse(this); } });
    Handlebars.registerHelper('ifTabClosed', CharacterEnhancedSheet.ifTabClosed);
    Handlebars.registerHelper('actorTabClosed', CharacterEnhancedSheet.actorTabClosed);
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