import { ANARCHY } from "./config.js";
import { ACTOR_ATTRIBUTE_SETS } from "./constants.js";
import { Misc } from "./misc.js";

const actorWordTypes = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
}

export class Enums {
  static ENUMS;
  static hbsAttributes;
  static hbsItemTypes;
  static hbsMonitors;
  static hbsMonitorLetters;
  static hbsAssetModuleCategories;
  static hbsLifeModuleTypes;
  static hbsAreas;
  static hbsRanges;
  static hbsMwdWeightClasses;
  static hbsMwdHardpointTypes;
  static hbsMwdHardpointSizes;
  static hbsMwdHardpointLocations;
  static hbsMwdPrimaryModes;
  static hbsMwdWeaponCategories;
  static hbsMwdWeaponDamageTypes;
  static hbsPersonalWeaponDamageTypes;
  static hbsPersonalWeaponDamageCategories;
  static hbsDamageTypes;
  static hbsMwdMeleeLocations;

  static sortedAttributeKeys;

  // this method is the place to add settings-based entries in the enums
  static init() {
    Enums.hbsAttributes = Enums.mapObjetToKeyValue(ANARCHY.attributes)
      .filter(a => a.value != 'knowledge' && a.value != 'noAttribute');
    Enums.hbsItemTypes = Enums.mapObjetToKeyValue(ANARCHY.itemType);
    Enums.hbsMonitors = Enums.mapObjetToKeyValue(ANARCHY.monitor);
    Enums.hbsMonitorLetters = Enums.mapObjetToKeyValue(ANARCHY.monitorLetter);
    Enums.hbsAssetModuleCategories = Enums.mapObjetToKeyValue(ANARCHY.assetModuleCategory);

// Life modules are not wired up yet; keep this from blowing up init.
if (ANARCHY.lifeModule?.type) {
  Enums.hbsLifeModuleTypes = Enums.mapObjetToKeyValue(ANARCHY.lifeModule.type);
} else {
  console.warn("MWD | ANARCHY.lifeModule.type is missing; life module enums disabled.");
  Enums.hbsLifeModuleTypes = [];
}

    Enums.hbsAreas = Enums.mapObjetToKeyValue(ANARCHY.area);
    Enums.hbsRanges = Enums.mapObjetToKeyValue(ANARCHY.range);
    Enums.hbsVehicleCategories = Enums.mapObjetToKeyValue(ANARCHY.vehicleCategory);
    Enums.hbsMwdWeightClasses = Enums.mapObjetToKeyValue(ANARCHY.mwd.weightClass);
    Enums.hbsMwdHardpointTypes = Enums.mapObjetToKeyValue(ANARCHY.mwd.hardpointType);
    Enums.hbsMwdHardpointSizes = Enums.mapObjetToKeyValue(ANARCHY.mwd.hardpointSize);
    Enums.hbsMwdHardpointLocations = Enums.mapObjetToKeyValue(ANARCHY.mwd.hardpointLocation);
    Enums.hbsMwdPrimaryModes = Enums.mapObjetToKeyValue(ANARCHY.mwd.primarySlotMode);
    Enums.hbsMwdWeaponCategories = Enums.mapObjetToKeyValue(ANARCHY.mwd.weaponCategory);
    Enums.hbsMwdWeaponDamageTypes = Enums.mapObjetToKeyValue(ANARCHY.mwd.weaponDamageType);
    Enums.hbsPersonalWeaponDamageTypes = Enums.mapObjetToKeyValue(ANARCHY.mwd.personalDamageType);
    Enums.hbsPersonalWeaponDamageCategories = Enums.mapObjetToKeyValue(ANARCHY.mwd.personalDamageCategory);
    Enums.hbsDamageTypes = Misc.distinct(
      Enums.hbsMwdWeaponDamageTypes.concat(Enums.hbsPersonalWeaponDamageTypes),
      dt => dt.value
    );
    Enums.hbsMwdMeleeLocations = Enums.mapObjetToKeyValue(ANARCHY.mwd.meleeLocation);

    const attributeOrder = Object.values(ACTOR_ATTRIBUTE_SETS).flat();
    Enums.sortedAttributeKeys = Misc.distinct(attributeOrder.concat(Object.keys(ANARCHY.attributes)));

    Enums.registerHandleBarHelpers();
  }

  static registerHandleBarHelpers() {
    Handlebars.registerHelper('sortedAttributes', map => Misc.sortedMap(map, Misc.ascendingBySortedArray(Enums.sortedAttributeKeys)));
  }

  static getEnums(filterAttributes = it => true, withKnowledge = false) {
    return {
      attributes: Enums.getAttributes(filterAttributes),
      itemTypes: Enums.hbsItemTypes,
      monitors: Enums.hbsMonitors,
      assetModuleCategories: Enums.hbsAssetModuleCategories,
      skills: game.system.anarchy.skills.getSkills({ withKnowledge })
        .map(it => { return { value: it.code, label: it.labelkey, labelkey: it.labelkey }; }),
      areas: Enums.hbsAreas,
      ranges: Enums.hbsRanges,
      lifeModuleTypes: Enums.hbsLifeModuleTypes,
      vehicleCategories: Enums.hbsVehicleCategories,
      mwdWeightClasses: Enums.hbsMwdWeightClasses,
      mwdHardpointTypes: Enums.hbsMwdHardpointTypes,
      mwdHardpointSizes: Enums.hbsMwdHardpointSizes,
      mwdHardpointLocations: Enums.hbsMwdHardpointLocations,
      mwdPrimaryModes: Enums.hbsMwdPrimaryModes,
      mwdWeaponCategories: Enums.hbsMwdWeaponCategories,
      mwdWeaponDamageTypes: Enums.hbsMwdWeaponDamageTypes,
      personalWeaponDamageTypes: Enums.hbsPersonalWeaponDamageTypes,
      personalWeaponDamageCategories: Enums.hbsPersonalWeaponDamageCategories,
      damageTypes: Enums.hbsDamageTypes,
      mwdMeleeLocations: Enums.hbsMwdMeleeLocations,
    };
  }

  static getDamageTypes() {
    return Enums.hbsDamageTypes ?? [];
  }

  static getAttributes(filterAttributes = it => true) {
    return Enums.hbsAttributes.filter(it => filterAttributes(it.value));
  }

  static getActorWordTypes() {
    return actorWordTypes;
  }

  static getMonitors() {
    return Enums.hbsMonitors;
  }

  static getMonitorLetters() {
    return Enums.hbsMonitorLetters;
  }

  static getActorWordTypePlural(wordType) {
    return actorWordTypes[wordType];
  }

  static localizeAttribute(attribute) {
    if (!ANARCHY.attributes[attribute]) {
      return ANARCHY.attributes['noAttribute'];
    }
    return ANARCHY.attributes[attribute];
  }

static getFromList(list, key, keyName = "value", valueName = "label") {
  const found = list?.find(m => m[keyName] == key);
  if (!found) return undefined;

  // Prefer requested field, then label, then labelkey
  return found[valueName] ?? found.label ?? found.labelkey;
}


static mapObjetToKeyValue(object, keyName = "value") {
  // Safety: if the config isn't defined, just return an empty list.
  if (!object || typeof object !== "object") {
    console.warn("MWD | mapObjetToKeyValue called with invalid object:", object);
    return [];
  }

  return Object.entries(object).map(([key, raw]) => {
    const ret = {};
    ret[keyName] = key;

    // Derive a readable label from whatever the config uses now
    let labelText;
    if (typeof raw === "string") {
      // e.g. { strength: "Strength" }
      labelText = raw;
    } else if (raw && typeof raw === "object") {
      // e.g. { label: "Strength" } or legacy { labelkey: "Strength" }
      labelText = raw.label ?? raw.labelkey ?? raw.name ?? String(key);
    } else {
      labelText = String(raw ?? key);
    }

    // Support both new & legacy callers
    ret.label = labelText;
    ret.labelkey = labelText;

    return ret;
  });
}


}

