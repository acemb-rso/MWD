import { ANARCHY } from "./config.js";
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
  static hbsCapacities;
  static hbsMonitors;
  static hbsMonitorLetters;
  static hbsShadowampCategories;
  static hbsAreas;
  static hbsRanges;

  static sortedAttributeKeys;

  // this method is the place to add settings-based entries in the enums
  static init() {
    Enums.hbsAttributes = Enums.mapObjetToKeyValue(ANARCHY.attributes)
      .filter(a => a.value != 'knowledge' && a.value != 'noAttribute');
    Enums.hbsItemTypes = Enums.mapObjetToKeyValue(ANARCHY.itemType);
    Enums.hbsCapacities = Enums.mapObjetToKeyValue(ANARCHY.capacity);
    Enums.hbsMonitors = Enums.mapObjetToKeyValue(ANARCHY.monitor);
    Enums.hbsMonitorLetters = Enums.mapObjetToKeyValue(ANARCHY.monitorLetter);
    Enums.hbsShadowampCategories = Enums.mapObjetToKeyValue(ANARCHY.shadowampCategory);
    Enums.hbsAreas = Enums.mapObjetToKeyValue(ANARCHY.area);
    Enums.hbsRanges = Enums.mapObjetToKeyValue(ANARCHY.range);
    Enums.hbsVehicleCategories = Enums.mapObjetToKeyValue(ANARCHY.vehicleCategory);

    Enums.sortedAttributeKeys = Object.keys(ANARCHY.attributes);

    Enums.registerHandleBarHelpers();
  }

  static registerHandleBarHelpers() {
    Handlebars.registerHelper('sortedAttributes', map => Misc.sortedMap(map, Misc.ascendingBySortedArray(Enums.sortedAttributeKeys)));
  }

  static getEnums(filterAttributes = it => true, withKnowledge = false) {
    return {
      attributes: Enums.getAttributes(filterAttributes),
      itemTypes: Enums.hbsItemTypes,
      capacities: Enums.hbsCapacities,
      monitors: Enums.hbsMonitors,
      shadowampCategories: Enums.hbsShadowampCategories,
      skills: game.system.anarchy.skills.getSkills({ withKnowledge })
        .map(it => { return { value: it.code, label: game.i18n.localize(it.labelkey), labelkey: it.labelkey }; }),
      areas: Enums.hbsAreas,
      ranges: Enums.hbsRanges,
      vehicleCategories: Enums.hbsVehicleCategories
    };
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
      return game.i18n.localize(ANARCHY.attributes['noAttribute']);
    }
    return game.i18n.localize(ANARCHY.attributes[attribute]);
  }

  static getFromList(list, key, keyName = 'value', valueName = 'labelkey') {
    const found = list.find(m => m[keyName] == key);
    return found ? found[valueName] : undefined
  }

  static mapObjetToKeyValue(object, keyName = 'value', valueName = 'labelkey') {
    return Object.entries(object).map(
      entry => {
        const ret = {};
        ret[keyName] = entry[0];
        ret[valueName] = entry[1];
        return ret;
      });
  }

}

