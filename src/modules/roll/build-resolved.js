// src/modules/roll/build-resolved.js
// Purpose: Defines function `buildResolved`.
// How it fits: Describes role within src/modules or template rendering pipeline.


// systems/mwd/module/roll/build-resolved.js

/**
 * Build the stateless chat-card render model.
 * Output-shaped: UI-ready rows + tooltips + dice groups,
 * plus replay hooks (originPayload + roll.json + stable refs).
 *
 * Key principle:
 * - row.id identifies a UI row (stable layout)
 * - mod.id identifies a modifier instance (stable domain object)
 * - rows may reference mods via row.modIds[]
 */
export function buildResolved({
  actor,
  payload,
  ctx,
  roll,
  target,
  pool,
  mods = [],
  modTotal = 0,
  hits = null,
  ones = null,
  edge = null,
  outcomeModel = null
} = {}) {
  if (!actor) throw new Error("buildResolved requires actor");
  if (!payload?.intent) throw new Error("buildResolved requires payload.intent");
  if (!roll) throw new Error("buildResolved requires roll");

  const resolvedId = foundry.utils.randomID();

  // -----------------------------
  // Dice groups (group-based refs)
  // -----------------------------
  const diceTerm = roll.dice?.[0];
  const results = Array.isArray(diceTerm?.results) ? diceTerm.results : [];

  const dice = results.map((r, i) => {
    const ref = `pool:${i}`; // stable group-based addressing
    const face = Number(r.result);
    const isSuccess = Boolean(r.success);

    return {
      ref,
      face,
      isSuccess,
      isFailure: !isSuccess,
      tooltip: isSuccess
        ? `Die ${i + 1}: ${face} (Success vs TN ${Number(target ?? 5)})`
        : `Die ${i + 1}: ${face} (Failure vs TN ${Number(target ?? 5)})`
    };
  });

  const failureDiceRefs = dice.filter(d => d.isFailure).map(d => d.ref);

  const diceGroups = [{
    id: "pool",
    label: "Pool",
    faces: 6,
    termIndex: 0, // informational only
    dice
  }];

  // -----------------------------
  // Mods (prefer mod.id)
  // -----------------------------
  const appliedMods = (Array.isArray(mods) ? mods : []).map((m, idx) => {
    const value = Number(m.value ?? 0);

    // Fallback is only stable within this single message.
    // For true stability across messages, set mod.id in your providers.
    const fallbackId = `mod:${slug(m.label ?? "mod")}:${idx}`;

    return {
      id: m.id ?? fallbackId,
      label: m.label ?? "Modifier",
      value,
      domain: m.domain ?? null,
      source: m.source ?? null,
      tooltip: m.tooltip ?? `${m.label ?? "Modifier"} ${fmt(value)}`
    };
  });

  const modIds = appliedMods.map(m => m.id);

  // -----------------------------
  // Breakdown rows (row.id + modIds)
  // -----------------------------
  const baseRows = Array.isArray(ctx?.breakdown) ? ctx.breakdown : [];

  const breakdownRows = baseRows.map(r => ({
    id: `pool.${r.id ?? foundry.utils.randomID()}`,
    label: r.label ?? r.id ?? "Row",
    value: Number(r.value ?? 0),
    tooltip: `Contribution from ${r.label ?? r.id}: ${Number(r.value ?? 0)}`
  }));

  breakdownRows.push({
    id: "mods.total",
    label: "Mods",
    value: Number(modTotal ?? 0),
    modIds,
    tooltip: appliedMods.length
      ? appliedMods.map(m => `${m.label}: ${fmt(m.value)}`).join("\n")
      : "No roll-time modifiers."
  });

  breakdownRows.push({
    id: "pool.final",
    label: "Final Pool",
    value: Number(pool ?? 0),
    tooltip: `Final dice pool rolled: ${Number(pool ?? 0)}d6`
  });

  // -----------------------------
  // Outcome
  // -----------------------------
  const computedHits = Number.isFinite(Number(hits))
    ? Number(hits)
    : dice.filter(d => d.isSuccess).length;

  const computedOnes = Number.isFinite(Number(ones))
    ? Number(ones)
    : dice.filter(d => d.face === 1).length;

  // -----------------------------
  // Edge (engine-declared affordances)
  // -----------------------------
  const edgeSnapshot = normalizeEdgeSnapshot(edge, { payload });

  return {
    version: 2,
    id: resolvedId,

    actorUuid: actor.uuid,

    // Re-entry
    originPayload: payload,

    // Render header
    title: ctx?.title ?? "Roll",
    subtitle: ctx?.subtitle ?? (actor.name ?? "Actor"),
    formula: String(ctx?.formula ?? "").trim(),
    intent: ctx?.intent ?? payload.intent,
    domains: Array.isArray(ctx?.domains) ? ctx.domains : [],
    attack: ctx?.attack ?? null,
    machineRemedy: ctx?.machineRemedy ?? null,
    specialization: ctx?.specialization ?? null,
    dn: ctx?.dn ?? (
      ctx?.difficulty?.dn !== undefined
        ? {
            parts: [{
              id: "difficulty.current",
              label: "DN",
              value: Number(ctx.difficulty.dn ?? 0),
              tags: ["manual"]
            }],
            total: Number(ctx.difficulty.dn ?? 0)
          }
        : null
    ),

    // Minimal context snapshot so chat-actions can recompute interpretation
    // after post-spend rerolls mutate hits.
    ctxSnapshot: {
       rollType: ctx?.rollType ?? "simple",
       difficulty: ctx?.difficulty ?? null,
       dn: ctx?.dn ?? null,
       opposed: ctx?.opposed ?? null,
       net: ctx?.net ?? null,
       edge: {
        pool: ctx?.edge?.pool ?? null,
        earn: ctx?.edge?.earn ?? null
       }
     },

    // Roll + dice
    roll: {
      json: roll.toJSON(),
      formula: roll.formula,
      target: Number(target ?? 5),
      pool: Number(pool ?? 0),
      diceGroups,
      failureDiceRefs
    },

    // Outcome numbers
    outcome: {
      hits: computedHits,
      ones: computedOnes
    },

    // New: engine-interpreted outcome (margin/net/converted/edgeEarned/etc
    outcomeModel: outcomeModel,
    
    // Breakdown + modifiers
    breakdownRows,
    modifiers: {
      applied: appliedMods,
      total: Number(modTotal ?? 0)
    },

    areaEffectPreviewState: foundry.utils.deepClone(payload?.areaEffectPreviewState ?? {}),

    // Edge snapshot / affordances
    edge: edgeSnapshot
  };
}

function normalizeEdgeSnapshot(edge, { payload } = {}) {
  // edge is expected to be computed by the engine (mwd-roll.js)
  // but we keep compatibility with legacy payload.edge.enabled.
  const legacyPre = Boolean(payload?.edge?.enabled);

  const domain = edge?.domain ?? null;
  const pools = edge?.pools ?? null;

  const prePoolKey =
    edge?.pre?.poolKey ??
    payload?.edge?.pre?.poolKey ??
    (legacyPre ? (payload?.edge?.poolKey ?? null) : null);

  const preSpent =
    Number(edge?.pre?.spent ?? payload?.edge?.pre?.spent ?? (legacyPre ? 1 : 0)) ? 1 : 0;

  const postPoolKey =
    edge?.post?.poolKey ??
    payload?.edge?.post?.poolKey ??
    null;

  const postSpent =
    Number(edge?.post?.spent ?? payload?.edge?.post?.spent ?? 0) ? 1 : 0;

  const a = pools?.a ?? null;
  const b = pools?.b ?? null;

  // Allowed pools logic per your clarified rule:
  // - Pre: either of the two pools
  // - Post: if pre spent, must be the other; else either
  const allowedPrePools = [a, b].filter(Boolean);

  let allowedPostPools = [a, b].filter(Boolean);
  if (preSpent && prePoolKey) {
    allowedPostPools = allowedPostPools.filter(k => k !== prePoolKey);
  }

  // Engine-declared affordances (UI should trust these, not infer)
  const availableActions = {
    canSpendPre: allowedPrePools.length > 0 && !preSpent, // spending pre after roll is not a thing
    canSpendPost: allowedPostPools.length > 0 && !postSpent,
    canPostRerollFailures: allowedPostPools.length > 0 && !postSpent
  };

  return {
    domain,
    pools: pools ? { a, b } : null,

    pre: { poolKey: prePoolKey, spent: preSpent },
    post: { poolKey: postPoolKey, spent: postSpent },

    allowed: {
      prePools: allowedPrePools,
      postPools: allowedPostPools
    },

    availableActions
  };
}

function fmt(n) {
  const num = Number(n ?? 0);
  return num >= 0 ? `+${num}` : `${num}`;
}

function slug(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
