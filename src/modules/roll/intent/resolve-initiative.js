// mwd/src/modules/roll/intent/resolve-initiative.js

export async function resolveInitiative({ actor } = {}) {
  const ref  = Number(actor.system?.attributes?.reflexes?.value ?? 0);
  const edge = Number(actor.system?.attributes?.edge?.value ?? 0);

  return {
    intent: "initiative",
    title: "Initiative",
    rollType: "sum",                 // <- tells executor how to roll
    domains: ["combat"],           // <- for organizational/filtering purposes
    sum: {
      formula: "2d6 + @ref + @edge",
      data: { ref, edge }
    },
    breakdown: [
      { id: "base", label: "2d6", value: 0 },
      { id: "ref",  label: "REF", value: ref },
      { id: "edge", label: "EDGE", value: edge }
    ],
    // keep pool numeric to satisfy normalizeResolvedContext (if still used)
    pool: { attribute: 0, skill: 0, bonus: 0 }
  };
}