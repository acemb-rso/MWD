// src/modules/item/weapon-payload-item-sheet.js
// Purpose: Provides a compact editor for reusable weapon payload items.

import { BaseItemSheet } from "./base-item-sheet.js";
import {
  AREA_EFFECT_KINDS,
  EXPOSURE_TIERS,
} from "../area-effects/area-effect-engine.js";
import {
  PERSONAL_DAMAGE_TYPES,
  getPersonalDamageTypeLabel,
} from "../mwd/personal-damage.js";
import {
  PERSONAL_WEAPON_PAYLOAD_CAPABILITY_OPTIONS,
  PERSONAL_WEAPON_TEMPLATE_PLACEMENTS,
  PERSONAL_WEAPON_TEMPLATE_SHAPES,
} from "../mwd/personal-weapon-capabilities.js";
import {
  getWeaponPayloadFamilyCatalog,
  getWeaponPayloadTagCatalog,
  payloadCatalogToOptions,
} from "../mwd/weapon-payload-catalogs.js";
import { TEMPLATES_PATH } from "../constants.js";

export class WeaponPayloadItemSheet extends BaseItemSheet {
  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/weapon-payload.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const system = this.item.system ?? {};
    const profile = system.profile ?? {};

    context.payloadEditor = {
      familiesText: Array.isArray(system.families) ? system.families.join(", ") : String(system.families ?? ""),
      tagsText: Array.isArray(system.tags) ? system.tags.join(", ") : String(system.tags ?? ""),
      traitsText: Array.isArray(profile.traits) ? profile.traits.join(", ") : String(profile.traits ?? ""),
      keywordsText: Array.isArray(profile.keywords) ? profile.keywords.join(", ") : String(profile.keywords ?? ""),
      familyOptions: payloadCatalogToOptions(getWeaponPayloadFamilyCatalog()),
      tagOptions: payloadCatalogToOptions(getWeaponPayloadTagCatalog()),
      damageTypes: [
        { value: "", label: "Weapon Default" },
        ...PERSONAL_DAMAGE_TYPES.map(option => ({
          value: option.value,
          label: getPersonalDamageTypeLabel(option.value),
        })),
      ],
      capabilityOptions: PERSONAL_WEAPON_PAYLOAD_CAPABILITY_OPTIONS,
      resolverKeys: [
        { value: "standard", label: "Standard" },
        { value: "template", label: "Template" },
      ],
      templateShapes: PERSONAL_WEAPON_TEMPLATE_SHAPES,
      templatePlacements: PERSONAL_WEAPON_TEMPLATE_PLACEMENTS,
      areaEffectKinds: [
        { value: AREA_EFFECT_KINDS.none, label: "None" },
        { value: AREA_EFFECT_KINDS.discrete, label: "Discrete" },
        { value: AREA_EFFECT_KINDS.persistent, label: "Persistent" },
      ],
      exposureTiers: [
        { value: EXPOSURE_TIERS.none, label: "None" },
        { value: EXPOSURE_TIERS.minor, label: "Minor" },
        { value: EXPOSURE_TIERS.major, label: "Major" },
        { value: EXPOSURE_TIERS.full, label: "Full" },
      ],
    };

    context.itemSheet = {
      ...(context.itemSheet ?? {}),
      summaryChips: [
        { label: "Qty", value: String(system.quantity ?? 0) },
        { label: "Families", value: context.payloadEditor.familiesText || "None" },
        { label: "Tags", value: context.payloadEditor.tagsText || "None" },
      ],
    };

    return context;
  }
}
