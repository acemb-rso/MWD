// src/modules/roll/intent/resolve-attribute.js
// Purpose: System module or client script for resolve-attribute. Integrates with the system's JavaScript modules.

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
