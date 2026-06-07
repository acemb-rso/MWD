// src/modules/roll/intent/resolve-resistance.js
// Purpose: Defines function `resolveResistance`.
// How it fits: Describes role within src/modules or template rendering pipeline.

import { getActiveArmorTraitEffects } from "../../mwd/personal-damage.js";

export async function resolveResistance({ actor, payload, event } = {}) {
  const tags = collectResistanceTags(payload);
  const armorEffects = getActiveArmorTraitEffects(actor);
  const sealedBonus = getSealedResistanceBonus(tags, armorEffects);
  const breakdown = [];
  if (sealedBonus > 0) breakdown.push({ label: "Sealed Armor", value: sealedBonus });

  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: sealedBonus },
    breakdown,
    mods: []
  };
}

function collectResistanceTags(payload = {}) {
  const source = payload && typeof payload === "object" ? payload : {};
  const values = [
    source.damageType,
    source.resistanceType,
    source.hazardType,
    source.type,
    source.category,
    ...(Array.isArray(source.tags) ? source.tags : []),
    ...(Array.isArray(source.keywords) ? source.keywords : []),
    ...(Array.isArray(source.damageTags) ? source.damageTags : []),
    ...(Array.isArray(source.hazardTags) ? source.hazardTags : []),
  ];
  return new Set(values.map(value => String(value ?? "").trim().toLowerCase()).filter(Boolean));
}

function getSealedResistanceBonus(tags, armorEffects = {}) {
  const gasBonus = tags.has("gas") || tags.has("gases")
    ? Number(armorEffects?.resistanceDice?.gas ?? 0) || 0
    : 0;
  const chemicalBonus = tags.has("chemical") || tags.has("chemicals")
    ? Number(armorEffects?.resistanceDice?.chemical ?? 0) || 0
    : 0;
  return Math.max(0, gasBonus, chemicalBonus);
}
