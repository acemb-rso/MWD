export async function resolveAttack({ actor, payload, event } = {}) {
  return {
    title: "Attack",
    intent: "attack",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
