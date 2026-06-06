// src/modules/item/armor-item.js
// Purpose: References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { MWDItem } from "./anarchy-base-item.js";
import {
  computeArmorBaseMitigation,
  normalizeArmorMitigationByType,
  normalizeArmorTags,
  normalizeWeaponTraits,
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
    system.durability ??= {};
    const rating = system.rating;
    const rawMax = Number(system.durability.max);
    const maxWasUninitialized = !Number.isFinite(rawMax) || (rawMax <= 0 && rating > 0);
    system.durability.max = maxWasUninitialized
      ? rating
      : Math.max(0, rawMax);

    const rawCurrent = Number(system.durability.current);
    const currentLooksUninitialized = !Number.isFinite(rawCurrent) || (rawCurrent <= 0 && maxWasUninitialized && rating > 0);
    system.durability.current = currentLooksUninitialized
      ? system.durability.max
      : Math.min(system.durability.max, Math.max(0, rawCurrent));
    system.battleArmor = normalizeBattleArmorProfile(system.battleArmor);
    system.tags = normalizeArmorTags(system.tags);
    system.traits = normalizeTraits(system.traits);
    system.notes = String(system.notes ?? "").trim();
  }

  getArmorProfile({ actor = this.actor } = {}) {
    const system = this.system ?? {};
    const rating = Math.max(0, Number(system.rating ?? 0));
    const maxDurability = Math.max(0, Number(system?.durability?.max ?? rating));
    const currentDurability = Math.min(
      maxDurability,
      Math.max(0, Number(system?.durability?.current ?? maxDurability))
    );
    const currentArmorRating = Math.min(rating, currentDurability);
    const mitigationByType = normalizeArmorMitigationByType(system?.mitigationByType ?? system?.mitigation);
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
      traits: normalizeTraits(system.traits),
      notes: String(system.notes ?? "").trim(),
    };
  }
}
