// src/modules/roll/intent/resolve-attribute.js
// Purpose: Defines function `resolveAttribute`.
// How it fits: Describes role within src/modules or template rendering pipeline.


export async function resolveAttribute({ actor, payload, event } = {}) {
  return {
    title: "Attribute",
    intent: "attribute",
    domainTags: ["general"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
