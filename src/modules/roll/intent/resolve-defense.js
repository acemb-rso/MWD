// src/modules/roll/intent/resolve-defense.js
// Purpose: Defines function `resolveDefense`.
// How it fits: Describes role within src/modules or template rendering pipeline.


export async function resolveDefense({ actor, payload, event } = {}) {
  return {
    title: "Defense",
    intent: "defense",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
