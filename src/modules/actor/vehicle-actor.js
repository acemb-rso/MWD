import { ANARCHY } from "../config.js";
import { ACTOR_ATTRIBUTE_SETS, ICONS_PATH, TEMPLATE } from "../constants.js";
import { ErrorManager } from "../error-manager.js";
import { AnarchyUsers } from "../users.js";
import { AnarchyBaseActor } from "./base-actor.js";

export class VehicleActor extends AnarchyBaseActor {

  prepareDerivedData() {
    this._prepareMwdAttributes();
    this._prepareMwdMonitors();
    this._prepareMwdItems();
    super.prepareDerivedData();
  }

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

  _prepareMwdAttributes() {
    const mwd = this.system.mwd = this.system.mwd ?? {};

    const defaults = {
      [TEMPLATE.actorAttributes.handling]: { value: 0 },
      [TEMPLATE.actorAttributes.system]: { value: 0 },
      [TEMPLATE.actorAttributes.condition]: { value: 0 },
      [TEMPLATE.actorAttributes.chassis]: { value: 0 },
    };

    const mergedAttributes = foundry.utils.mergeObject(
      foundry.utils.duplicate(defaults),
      this.system.attributes ?? {},
      { inplace: false, recursive: true }
    );

    this.system.attributes = mergedAttributes;
    mwd.attributes = foundry.utils.mergeObject(
      foundry.utils.duplicate(defaults),
      mwd.attributes ?? {},
      { inplace: false, recursive: true }
    );

    Object.entries(mwd.attributes).forEach(([key, data]) => {
      if (mergedAttributes[key]?.value === undefined) {
        mergedAttributes[key] = mergedAttributes[key] ?? {};
        mergedAttributes[key].value = data?.value ?? 0;
      }
    });
  }

  _prepareMwdMonitors() {
    const mwd = this.system.mwd = this.system.mwd ?? {};
    const monitors = this.system.monitors = this.system.monitors ?? {};

    const structureDefaults = {
      value: monitors.structure?.value ?? 0,
      max: monitors.structure?.max ?? (this.type === TEMPLATE.actorTypes.battlemech ? 18 : 15),
      resistance: AnarchyBaseActor.normalizeResistance(monitors.structure?.resistance),
    };

    monitors.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(structureDefaults),
      monitors.structure ?? {},
      { inplace: false, recursive: true }
    );

    mwd.monitors = mwd.monitors ?? {};
    mwd.monitors.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(structureDefaults),
      mwd.monitors.structure ?? {},
      { inplace: false, recursive: true }
    );

    if (this.type === TEMPLATE.actorTypes.battlemech) {
      const heatDefaults = {
        value: monitors.heat?.value ?? mwd.heat?.current ?? 0,
        max: monitors.heat?.max ?? mwd.heat?.hardMax ?? 4,
        resistance: AnarchyBaseActor.normalizeResistance(monitors.heat?.resistance),
      };

      monitors.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(heatDefaults),
        monitors.heat ?? {},
        { inplace: false, recursive: true }
      );

      mwd.monitors.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(heatDefaults),
        mwd.monitors.heat ?? {},
        { inplace: false, recursive: true }
      );
    }
  }

  _prepareMwdItems() {
    const mwd = this.system.mwd = this.system.mwd ?? {};

    const schemaItemTypes = {
      skills: ['skill'],
      traits: ['trait', TEMPLATE.itemType.quality],
      lifeModules: ['lifeModule'],
      cues: ['cue'],
      dispositions: ['disposition'],
      gear: ['gear'],
      assetModules: ['assetModule'],
      vehicleUpgrades: ['vehicleUpgrade'],
      mechEquipment: ['mechEquipment'],
      personalWeapons: ['personalWeapon'],
      vehicleWeapons: ['vehicleWeapon'],
      mechWeapons: ['mechWeapon'],
      weaponGroups: ['weaponGroup'],
    };

    mwd.items = Object.fromEntries(
      Object.entries(schemaItemTypes).map(([key, types]) => [
        key,
        this.items.filter(it => types.includes(it.type)),
      ])
    );
  }

}