// src/modules/actor/vehicle-actor.js
// Purpose: References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { ACTOR_ATTRIBUTE_SETS, ICONS_PATH, TEMPLATE } from "../constants.js";
import { AnarchyBaseActor } from "./base-actor.js";
import { resistanceFromArmor } from "../mwd/derive-monitors.js";

function forcedDeletion() {
  return foundry.data.operators.ForcedDeletion;
}

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

  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    }
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

  async _migrateHandlingToAttribute(actor) {
    const fromAttribute = this.system.attributes.handling?.value ?? 0
    const fromOldField = this.system.handling
    if (fromOldField && fromAttribute < fromOldField) {
      await this.update({
        "system.handling": forcedDeletion(),
        "system.attributes.handling.value": fromOldField
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

    // --- Armor ---
    // Normalize armor first; its max value drives structure resistance (like personal
    // armor item baseMitigation drives armor monitor resistance for characters).
    const defaultArmorMax = this.type === TEMPLATE.actorTypes.battlemech ? 15 : 12;
    const armorMax = Math.max(0, Number(monitors.armor?.max ?? defaultArmorMax));

    monitors.armor = foundry.utils.mergeObject(
      { value: 0, max: armorMax, resistance: AnarchyBaseActor.normalizeResistance(monitors.armor?.resistance) },
      monitors.armor ?? {},
      { inplace: false, recursive: true }
    );
    // Always override: resistance is derived from armor rating, not stored.
    monitors.armor.resistance = {
      default: resistanceFromArmor(armorMax),
      byType: monitors.armor.resistance?.byType ?? {}
    };

    // --- Structure ---
    // Structure resistance is derived from armor max (same formula as personal armor),
    // so that armor automatically provides resistance to structural damage.
    const derivedStructureResistance = resistanceFromArmor(armorMax);

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
    // Always override: derived from armor, not stored value.
    monitors.structure.resistance = {
      default: derivedStructureResistance,
      byType: monitors.structure.resistance?.byType ?? {}
    };

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
      // Consumables ride the same inventory rail as general gear for the
      // legacy actor-side item catalog until those callers move to explicit
      // canonical buckets.
      gear: ['gear', 'consumable'],
      assetModules: ['assetModule'],
      vehicleUpgrades: ['vehicleUpgrade'],
      mechEquipment: ['mechEquipment'],
      personalWeapons: ['personalWeapon', 'weapon'],
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
