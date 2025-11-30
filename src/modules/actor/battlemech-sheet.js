import { VehicleSheet } from "./vehicle-sheet.js";

export class BattlemechSheet extends VehicleSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 600,
      height: 650
    });
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find('[data-quick-actions] .quick-action-button').click(async event => {
      event.stopPropagation();
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
  }
}
