import { ANARCHY } from "../config.js";
import { ICONS_PATH, TEMPLATE } from "../constants.js";
import { ErrorManager } from "../error-manager.js";
import { AnarchyUsers } from "../users.js";
import { AnarchyBaseActor } from "./base-actor.js";

const VEHICLE_ATTRIBUTES = [
  TEMPLATE.attributes.handling,
  TEMPLATE.attributes.system,
  TEMPLATE.attributes.chassis,
  TEMPLATE.attributes.condition,
]

export class VehicleActor extends AnarchyBaseActor {

  static get defaultIcon() {
    return `${ICONS_PATH}/shadowamps/drone.svg`
  }

  static get initiative() {
    return AnarchyBaseActor.initiative + " + max(@attributes.system.value, @attributes.handling.value)"
  }

  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    }
  }

  getAttributes() {
    return VEHICLE_ATTRIBUTES
  }

  getPhysicalAgility() { return TEMPLATE.attributes.handling }

  getDamageMonitor(damageType) {
    damageType = this.resolveDamageType(damageType);
    switch (damageType) {
      case TEMPLATE.monitors.physical: return TEMPLATE.monitors.structure
      case TEMPLATE.monitors.fatigue: return undefined
    }
    return super.getDamageMonitor(damageType)
  }

  getRightToDefend() {
    return CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER
  }

  async rollPilotDefense(attack) {
    const selectedActors = AnarchyUsers.getSelectedActors()
    ErrorManager.checkOutOfRange(ANARCHY.user.selectedTokenActors, selectedActors.length, 0, 1)

    const character = AnarchyUsers.getPlayerActor(game.user);
    const vehicleOwner = this.getOwnerActor();
    const pilot = [...selectedActors, character, vehicleOwner]
      .filter(actor => actor?.testUserPermission(game.user, this.getRightToDefend()))
      .find(actor => actor?.canPilotVehicle())
    if (pilot) {
      return await pilot.rollDefense(attack)
    }
    else {
      ui.notifications.warn(
        game.i18n.localize(ANARCHY.common.errors.noValidPilotForVehicle, {
          vehicle: this.name
        }))
    }
  }
  async _migrateHandlingToAttribute(actor) {
    const fromAttribute = this.system.attributes.handling?.value ?? 0
    const fromOldField = this.system.handling
    if (fromOldField && fromAttribute < fromOldField) {
      await this.update({
        'system.-=handling': null,
        'system.attributes.handling.value': fromOldField
      })
    }
  }

}