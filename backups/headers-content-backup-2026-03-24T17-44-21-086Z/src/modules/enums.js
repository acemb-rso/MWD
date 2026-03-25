// src/modules/enums.js
// Purpose: System module or client script for enums. Integrates with the system's JavaScript modules.

// enums.js (refactored away from anarchy namespace)

import { ANARCHY as MWD } from "./config.js";
import { ACTOR_ATTRIBUTE_SETS } from "./constants.js";
import { Misc } from "./misc.js";

const actorWordTypes = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
};

export class Enums {
  static ENUMS;

  // HBS-friendly arrays of { value, label } (or key/value depending on caller)
  static hbsAttributes;
  static hbsItemTypes;
  static hbsMonitors;
  static hbsMonitorLetters;
  static hbsAssetModuleCategories;
  static hbsLifeModuleTypes;
  static hbsAreas;
  static hbsRanges;
  static hbsVehicleCategories;

  // MWD-specific enum groups
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

  /**
   * Initialize enum caches.
   * Call once during system init/setup after config/constants are available.
   */
  static init() {
    // Attributes (filter out legacy pseudo-attributes if present)
    Enums.hbsAttributes = Enums.mapObjectToKeyValue(MWD.attributes)
      .filter(a => a.value !== "knowledge" && a.value !== "noAttribute");

    Enums.hbsItemTypes = Enums.mapObjectToKeyValue(MWD.itemType);
    Enums.hbsMonitors = Enums.mapObjectToKeyValue(MWD.monitor);
    Enums.hbsMonitorLetters = Enums.mapObjectToKeyValue(MWD.monitorLetter);
    Enums.hbsAssetModuleCategories = Enums.mapObjectToKeyValue(MWD.assetModuleCategory);

    // Life modules not always present yet; keep init resilient
    if (MWD.item?.lifeModule?.type) {
      Enums.hbsLifeModuleTypes = Enums.mapObjectToKeyValue(MWD.item.lifeModule.type);
    } else {
      console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled.");
      Enums.hbsLifeModuleTypes = [];
    }

    Enums.hbsAreas = Enums.mapObjectToKeyValue(MWD.area);
    Enums.hbsRanges = Enums.mapObjectToKeyValue(MWD.range);
    Enums.hbsVehicleCategories = Enums.mapObjectToKeyValue(MWD.vehicleCategory);

    // MWD block enums
    Enums.hbsMwdWeightClasses = Enums.mapObjectToKeyValue(MWD.mwd?.weightClass);
    Enums.hbsMwdHardpointTypes = Enums.mapObjectToKeyValue(MWD.mwd?.hardpointType);
    Enums.hbsMwdHardpointSizes = Enums.mapObjectToKeyValue(MWD.mwd?.hardpointSize);
    Enums.hbsMwdHardpointLocations = Enums.mapObjectToKeyValue(MWD.mwd?.hardpointLocation);
    Enums.hbsMwdPrimaryModes = Enums.mapObjectToKeyValue(MWD.mwd?.primarySlotMode);
    Enums.hbsMwdWeaponCategories = Enums.mapObjectToKeyValue(MWD.mwd?.weaponCategory);
    Enums.hbsMwdWeaponDamageTypes = Enums.mapObjectToKeyValue(MWD.mwd?.weaponDamageType);
    Enums.hbsPersonalWeaponDamageTypes = Enums.mapObjectToKeyValue(MWD.mwd?.personalDamageType);
    Enums.hbsPersonalWeaponDamageCategories = Enums.mapObjectToKeyValue(MWD.mwd?.personalDamageCategory);
    Enums.hbsMwdMeleeLocations = Enums.mapObjectToKeyValue(MWD.mwd?.meleeLocation);

    // Combined damage types (distinct by .value)
    Enums.hbsDamageTypes = Misc.distinct(
      (Enums.hbsMwdWeaponDamageTypes ?? []).concat(Enums.hbsPersonalWeaponDamageTypes ?? []),
      dt => dt.value
    );

    // Sorted attribute order: first by configured sets, then any remaining keys
    const attributeOrder = Object.values(ACTOR_ATTRIBUTE_SETS).flat();
    Enums.sortedAttributeKeys = Misc.distinct(
      attributeOrder.concat(Object.keys(MWD.attributes ?? {}))
    );

    Enums.registerHandleBarHelpers();

    // Convenience “all enums” object for quick sheet context injection if desired
    Enums.ENUMS = Enums.getEnums();
  }

  static registerHandleBarHelpers() {
    if (typeof Handlebars === "undefined") return;

    /**
     * {{#each (sortedAttributes system.attributes) as |attr|}} ... {{/each}}
     * - Returns an array of entries in the preferred attribute order.
     * - Each entry is { key, ...value } if value is an object, else { key, value }.
     */
    Handlebars.registerHelper("sortedAttributes", (map) => {
      if (!map || typeof map !== "object") return [];

      const keys = Object.keys(map);
      const order = Enums.sortedAttributeKeys ?? [];
      const keyRank = new Map(order.map((k, i) => [k, i]));

      keys.sort((a, b) => {
        const ra = keyRank.has(a) ? keyRank.get(a) : 9999;
        const rb = keyRank.has(b) ? keyRank.get(b) : 9999;
        if (ra !== rb) return ra - rb;
        return String(a).localeCompare(String(b));
      });

      return keys.map((key) => {
        const v = map[key];
        if (v && typeof v === "object") return { key, ...v };
        return { key, value: v };
      });
    });
  }

  static getDamageTypes() {
    return Enums.hbsDamageTypes ?? [];
  }

  static getAttributes(filterAttributes = () => true) {
    return (Enums.hbsAttributes ?? []).filter(it => filterAttributes(it.value));
  }

  static getActorWordTypes() {
    return actorWordTypes;
  }

  static getMonitors() {
    return Enums.hbsMonitors ?? [];
  }

  /**
   * Returns a big blob of enums suitable for sheet contexts.
   * `withKnowledge` is passed through to the skills service.
   */
  static getEnums(filterAttributes = () => true, withKnowledge = false) {
    return {
      attributes: Enums.getAttributes(filterAttributes),
      itemTypes: Enums.hbsItemTypes ?? [],
      monitors: Enums.hbsMonitors ?? [],
      monitorLetters: Enums.hbsMonitorLetters ?? [],
      assetModuleCategories: Enums.hbsAssetModuleCategories ?? [],
      lifeModuleTypes: Enums.hbsLifeModuleTypes ?? [],
      areas: Enums.hbsAreas ?? [],
      ranges: Enums.hbsRanges ?? [],
      vehicleCategories: Enums.hbsVehicleCategories ?? [],

      // Skills: now sourced from MWD namespace (with safe fallback)
      skills: Enums.getSkillsEnum({ withKnowledge }),

      // MWD enums
      mwdWeightClasses: Enums.hbsMwdWeightClasses ?? [],
      mwdHardpointTypes: Enums.hbsMwdHardpointTypes ?? [],
      mwdHardpointSizes: Enums.hbsMwdHardpointSizes ?? [],
      mwdHardpointLocations: Enums.hbsMwdHardpointLocations ?? [],
      mwdPrimaryModes: Enums.hbsMwdPrimaryModes ?? [],
      mwdWeaponCategories: Enums.hbsMwdWeaponCategories ?? [],
      mwdWeaponDamageTypes: Enums.hbsMwdWeaponDamageTypes ?? [],
      personalWeaponDamageTypes: Enums.hbsPersonalWeaponDamageTypes ?? [],
      personalWeaponDamageCategories: Enums.hbsPersonalWeaponDamageCategories ?? [],
      damageTypes: Enums.hbsDamageTypes ?? [],
      mwdMeleeLocations: Enums.hbsMwdMeleeLocations ?? []
    };
  }

  static getSkillsEnum({ withKnowledge = false } = {}) {
    const svc =
      game?.system?.mwd?.skills
      ?? game?.system?.anarchy?.skills; // temporary fallback while migrating

    const skills = svc?.getSkills?.({ withKnowledge }) ?? [];
    return skills.map(it => ({
      value: it.code,
      label: it.label ?? it.code
    }));
  }

  /**
   * Convert an object map into an array like [{ value, label }, ...]
   * Accepts:
   * - { key: "Label" }
   * - { key: { label: "Label" } }
   */
  static mapObjectToKeyValue(obj, keyName = "value", valueName = "label") {
    if (!obj || typeof obj !== "object") return [];

    return Object.keys(obj).map((key) => {
      const raw = obj[key];

      let label;
      if (raw && typeof raw === "object") label = raw.label ?? raw.name ?? raw.value ?? String(key);
      else if (raw != null) label = String(raw);
      else label = String(key);

      return {
        [keyName]: key,
        [valueName]: label
      };
    });
  }

  // Backwards-compat alias (the legacy file misspelled this)
  static mapObjetToKeyValue(obj, keyName = "value", valueName = "label") {
    return Enums.mapObjectToKeyValue(obj, keyName, valueName);
  }
}
