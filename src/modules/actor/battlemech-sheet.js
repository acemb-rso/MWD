import { ANARCHY } from "../config.js";
import { VehicleSheet } from "./vehicle-sheet.js";

export class BattlemechSheet extends VehicleSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 780,
      height: 750
    });
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find('[data-quick-actions] .quick-action-button').click(async event => {
      event.stopPropagation();
      event.preventDefault();
      if (event.currentTarget.dataset.disabled === "true") return;
      const action = event.currentTarget.dataset.action;
      switch (action) {
        case 'ranged':
          await this.actor.rollRangedAttack();
          break;
        case 'melee':
          await this.actor.rollMeleeAttack();
          break;
        case 'dodge':
          await this.actor.rollDodge();
          break;
        case 'piloting':
          await this.actor.rollPilotingCheck();
          break;
        case 'sensor':
          await this.actor.rollSensorSweep();
          break;
        case 'repair':
          await this.actor.rollEmergencyRepair();
          break;
      }
    });

    html.find('.click-add-hardpoint').click(async event => {
      event.stopPropagation();
      const hardpoints = foundry.utils.deepClone(this.actor.system.mwd.hardpoints ?? []);
      hardpoints.push({
        id: foundry.utils.randomID(),
        type: Object.keys(ANARCHY.mwd.hardpointType)[0],
        size: Object.keys(ANARCHY.mwd.hardpointSize)[0],
        location: Object.keys(ANARCHY.mwd.hardpointLocation)[0],
      });
      await this.actor.update({ 'system.mwd.hardpoints': hardpoints });
    });

    html.find('.click-delete-hardpoint').click(async event => {
      event.stopPropagation();
      const index = Number($(event.currentTarget).attr('data-index'));
      const hardpoints = foundry.utils.deepClone(this.actor.system.mwd.hardpoints ?? []);
      hardpoints.splice(index, 1);
      await this.actor.update({ 'system.mwd.hardpoints': hardpoints });
    });

    html.find('.click-add-weapon-group').click(async event => {
      event.stopPropagation();
      const weaponGroups = foundry.utils.deepClone(this.actor.system.mwd.weaponGroups ?? []);
      weaponGroups.push({
        id: foundry.utils.randomID(),
        name: game.i18n.localize(ANARCHY.mwd.loadout.newGroup),
        weaponIds: [],
        isPrimary: weaponGroups.length === 0,
      });
      await this.actor.update({ 'system.mwd.weaponGroups': weaponGroups });
    });

    html.find('.click-delete-weapon-group').click(async event => {
      event.stopPropagation();
      const index = Number($(event.currentTarget).attr('data-index'));
      const weaponGroups = foundry.utils.deepClone(this.actor.system.mwd.weaponGroups ?? []);
      weaponGroups.splice(index, 1);
      await this.actor.update({ 'system.mwd.weaponGroups': weaponGroups });
    });

    html.find('.input-primary-group').change(async event => {
      const index = Number($(event.currentTarget).attr('data-index'));
      const weaponGroups = foundry.utils.deepClone(this.actor.system.mwd.weaponGroups ?? []);
      weaponGroups.forEach((group, idx) => group.isPrimary = idx === index ? event.currentTarget.checked : false);
      await this.actor.update({ 'system.mwd.weaponGroups': weaponGroups });
    });
  }
}
