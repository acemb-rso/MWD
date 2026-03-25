// src/modules/roll/intent/resolve-resistance.js
// Purpose: Defines function `resolveResistance`.
// How it fits: Describes role within src/modules or template rendering pipeline.


export async function resolveResistance({ actor, payload, event } = {}) {
  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
