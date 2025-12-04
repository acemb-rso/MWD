import { ANARCHY } from "../config.js";
import { ACTOR_ATTRIBUTE_SETS, ICONS_PATH, TEMPLATE } from "../constants.js";
import { ErrorManager } from "../error-manager.js";
import { AnarchyUsers } from "../users.js";
import { AnarchyBaseActor } from "./base-actor.js";

export class VehicleActor extends AnarchyBaseActor {

  static get defaultIcon() {
    return `${ICONS_PATH}/default/Default_Vehicle.svg`
  }

  static get initiative() {
    return AnarchyBaseActor.initiative + " + max(@attributes.system.value, @attributes.handling.value)"
  }

  getPilotUuid() {
    return this.system?.pilot?.uuid;
  }

  getPilotDocument() {
    const pilotUuid = this.getPilotUuid();
    return pilotUuid ? fromUuidSync(pilotUuid) : undefined;
  }

  getPilotActor() {
    const pilotDocument = this.getPilotDocument();
    if (pilotDocument?.actor) {
      return pilotDocument.actor;
    }
    return pilotDocument;
  }

  getPilotReference() {
    const pilotDocument = this.getPilotDocument();
    if (!pilotDocument) {
      return undefined;
    }

    const pilotActor = this.getPilotActor();
    const isToken = pilotDocument.documentName === 'Token';
    return {
      id: pilotActor?.id,
      uuid: pilotDocument.uuid,
      name: pilotDocument.name,
      img: pilotDocument.img ?? pilotActor?.img,
      isToken,
      scene: isToken ? pilotDocument.parent?.name : undefined
    };
  }

  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    }
  }

  getAttributeValue(attribute, item = undefined) {
    if (!this.getAttributes().includes(attribute)) {
      const pilot = this.getPilotActor();
      if (pilot) {
        return pilot.getAttributeValue(attribute, item);
      }
    }
    return super.getAttributeValue(attribute, item);
  }

  getSkillRating(skillId) {
    const skill = typeof skillId === 'string' ? this.items.get(skillId) : skillId;
    const pilot = this.getPilotActor();

    if (pilot && skill?.system?.code) {
      const pilotSkill = pilot.items.find(it => it.type === TEMPLATE.itemType.skill && it.system.code === skill.system.code);
      return pilotSkill?.system?.value ?? 0;
    }

    return super.getSkillRating(skill);
  }

  getSkillValue(skillId, specialization = undefined) {
    const skill = typeof skillId === 'string' ? this.items.get(skillId) : skillId;
    const pilot = this.getPilotActor();

    if (pilot && skill?.system?.code) {
      const pilotSkill = pilot.items.find(it => it.type === TEMPLATE.itemType.skill && it.system.code === skill.system.code);
      const attribute = pilot.getAttributeValue(skill.system.attribute);
      const specializationBonus = specialization && pilotSkill?.system?.specialization ? 2 : 0;
      return attribute + (pilotSkill?.system?.value ?? 0) + specializationBonus;
    }

    return super.getSkillValue(skill, specialization);
  }

  getRollPilotReference() {
    const pilot = this.getPilotReference();
    return pilot ? pilot : undefined;
  }

  getAttributes() { return ACTOR_ATTRIBUTE_SETS[this.type] ?? ACTOR_ATTRIBUTE_SETS[TEMPLATE.actorTypes.vehicle]; }

  getPhysicalAgility() { return TEMPLATE.actorAttributes.handling }

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