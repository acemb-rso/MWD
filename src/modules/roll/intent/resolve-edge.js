// src/modules/roll/intent/resolve-edge.js
// Purpose: Defines function `resolveEdge`.
// How it fits: Describes role within src/modules or template rendering pipeline.


// modules/roll/intent/resolve-edge.js
const EDGE_POOLS = new Set([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility"
]);

const EDGE_DOMAIN = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social"
};

export async function resolveEdge({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveEdge requires actor");

  const poolKey = String(payload?.pool ?? "").trim();
  if (!EDGE_POOLS.has(poolKey)) throw new Error(`Invalid edge pool: ${poolKey}`);

  const p = actor.getEdgePool(poolKey);
  const usable = Math.max(0, Number(p?.effectiveValue ?? 0));

  return {
    intent: "edge",
    title: `Edge — ${poolKey}`,
    subtitle: actor.name ?? "Actor",
    domains: [EDGE_DOMAIN[poolKey] ?? "unknown"], // drop "edge" tag unless you truly want it

    // Make it directly rollable by the core roll pipeline
    target: 5,
    poolTotal: usable,

    breakdown: [
      { id: "current", label: "Current", value: Number(p?.value ?? 0) },
      { id: "rating",  label: "Rating",  value: Number(p?.rating ?? 0) },
      { id: "cap",     label: "Edge Cap", value: Number(p?.cap ?? 0) },
      { id: "usable",  label: "Usable",   value: usable }
    ],

    data: { poolKey }
  };
}

