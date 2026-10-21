// src/modules/item/armor-item.js
// Purpose: References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { MWDItem } from "./anarchy-base-item.js";
import {
  computeArmorBaseMitigation,
  getArmorTraitLabels,
  normalizeArmorDurabilityForRating,
  normalizeArmorMitigationByType,
  normalizeArmorStandardTraits,
  normalizeArmorTags,
  normalizeWeaponTraits,
  resolveArmorTraitEffects,
} from "../mwd/personal-damage.js";
import { normalizeBattleArmorProfile } from "../mwd/battle-armor.js";

function normalizeTraits(value) {
  return normalizeWeaponTraits(value);
}

export class ArmorItem extends MWDItem {
  static get defaultIcon() {
    return "systems/mwd/img/default/Default_Armor.svg";
  }

  prepareBaseData() {
    super.prepareBaseData();

    const system = this.system ?? {};
    system.equipped = Boolean(system.equipped);
    system.isPrimary = Boolean(system.isPrimary);
    system.rating = Math.max(0, Number(system.rating ?? 0));
    system.defenseBonus = Number(system.defenseBonus ?? 0) || 0;
    system.mitigationByType = normalizeArmorMitigationByType(system.mitigationByType ?? system.mitigation);
    delete system.mitigation;
    system.availability = String(system.availability ?? "").trim();
    system.durability = normalizeArmorDurabilityForRating(system.rating, system.durability);
    system.battleArmor = normalizeBattleArmorProfile(system.battleArmor);
    system.tags = normalizeArmorTags(system.tags);
    system.traits = normalizeTraits(system.traits);
    system.standardTraits = normalizeArmorStandardTraits(system.standardTraits);
    system.traitState = resolveArmorTraitEffects({
      standardTraits: system.standardTraits,
      traitState: system.traitState,
    }).traitState;
    system.notes = String(system.notes ?? "").trim();
  }

  getArmorProfile({ actor = this.actor } = {}) {
    const system = this.system ?? {};
    const rating = Math.max(0, Number(system.rating ?? 0));
    const durability = normalizeArmorDurabilityForRating(rating, system?.durability);
    const maxDurability = durability.max;
    const currentDurability = Math.min(
      maxDurability,
      Math.max(0, Number(durability.current ?? maxDurability))
    );
    const currentArmorRating = Math.min(rating, currentDurability);
    const mitigationByType = normalizeArmorMitigationByType(system?.mitigationByType ?? system?.mitigation);
    const armorTraitEffects = resolveArmorTraitEffects({
      standardTraits: normalizeArmorStandardTraits(system?.standardTraits),
      traitState: system?.traitState,
    });
    const tags = normalizeArmorTags(system?.tags);
    const baseMitigation = computeArmorBaseMitigation(currentArmorRating);

    return {
      id: this.id ?? "armor",
      uuid: this.uuid ?? null,
      name: this.name ?? "Armor",
      img: this.img,
      type: this.canonicalType ?? this.type,
      item: this,
      actor,
      equipped: Boolean(system.equipped),
      isPrimary: Boolean(system.isPrimary),
      rating,
      defenseBonus: Number(system.defenseBonus ?? 0) || 0,
      currentArmorRating,
      ratingCurrent: currentArmorRating,
      remainingDurability: currentDurability,
      baseMitigation,
      baseResistance: baseMitigation,
      mitigationByType,
      tags,
      availability: String(system.availability ?? "").trim(),
      isDestroyed: currentDurability <= 0,
      durability: {
        current: currentDurability,
        max: maxDurability,
      },
      battleArmor: normalizeBattleArmorProfile(system.battleArmor),
      traitState: armorTraitEffects.traitState,
      traitEffects: armorTraitEffects.traitEffects,
      effects: armorTraitEffects.effects,
      standardTraits: normalizeArmorStandardTraits(system.standardTraits),
      traits: getArmorTraitLabels({
        standardTraits: normalizeArmorStandardTraits(system.standardTraits),
      }),
      notes: String(system.notes ?? "").trim(),
    };
  }
}
