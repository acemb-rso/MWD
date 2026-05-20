// src/modules/roll/renderers/render-edge-post.js
// Purpose: Shared post-roll Edge presentation for roll chat cards.
// How it fits: Intent-specific renderers call this to expose reroll-failures
// actions without duplicating the Edge VM/action shape.

export function enhancePostEdge(resolved, vm, { canPost = true, separator = " | " } = {}) {
  const r = resolved ?? {};
  const edge = r?.edge ?? null;
  const failureRefs = Array.isArray(r?.roll?.failureDiceRefs) ? r.roll.failureDiceRefs : [];
  const postPools = Array.isArray(edge?.allowed?.postPools) ? edge.allowed.postPools : [];
  const canPostReroll = Boolean(edge?.availableActions?.canPostRerollFailures)
    && Boolean(canPost)
    && failureRefs.length > 0
    && postPools.length > 0;

  if (!edge?.domain) return false;

  vm.edge = {
    domain: edge.domain,
    earned: r?.outcomeModel?.edgeEarned ?? null,
    preSpent: Number(edge?.pre?.spent ?? 0),
    postSpent: Number(edge?.post?.spent ?? 0),
    canPost: canPostReroll,
    failureCount: failureRefs.length,
    postPools
  };

  vm.metaRows.push({
    text: `Edge: ${edge.domain}${separator}pre ${vm.edge.preSpent}${separator}post ${vm.edge.postSpent}`,
    title: ""
  });

  if (!vm.edge.canPost) return false;

  vm.footerRows.push({
    text: `Post-spend: Reroll ${vm.edge.failureCount} failure${vm.edge.failureCount === 1 ? "" : "s"}`
  });

  for (const poolKey of vm.edge.postPools) {
    vm.actions.push({
      action: "edgePostReroll",
      label: `Spend ${poolKey}`,
      dataset: { "pool-key": poolKey },
      cssClass: "mwd-edge-post"
    });
  }

  return true;
}
