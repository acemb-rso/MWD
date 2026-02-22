// modules/roll/renderers/render-skill.js

/**
 * Enhancer for intent="skill".
 * Mutates vm (base card) to add skill-specific meta/actions/footer/edge details.
 */
export function enhanceSkill(resolved, vm) {
  const r = resolved ?? {};

  // ---- Mods summary (as a meta row with tooltip) ----
  const modsApplied = Array.isArray(r?.modifiers?.applied) ? r.modifiers.applied : [];
  const modTotal = Number(r?.modifiers?.total ?? 0);

  if (modsApplied.length) {
    const modsRow = Array.isArray(r?.breakdownRows)
      ? r.breakdownRows.find(x => x.id === "mods.total")
      : null;

    vm.metaRows.push({
      text: `Mods: ${modsApplied.map(m => `${m.label} ${fmt(m.value)}`).join(", ")} (Total ${fmt(modTotal)})`,
      title: modsRow?.tooltip ?? ""
    });
  }

  // ---- Edge info + post-spend actions ----
  const edge = r?.edge ?? null;
  const failureRefs = Array.isArray(r?.roll?.failureDiceRefs) ? r.roll.failureDiceRefs : [];

  const canPost = Boolean(edge?.availableActions?.canPostRerollFailures);
  const postPools = Array.isArray(edge?.allowed?.postPools) ? edge.allowed.postPools : [];

  // Put a normalized edge block on the VM (template can choose how to show it)
  if (edge?.domain) {
    vm.edge = {
      domain: edge.domain,
      earned: r?.outcomeModel?.edgeEarned ?? null,
      preSpent: Number(edge?.pre?.spent ?? 0),
      postSpent: Number(edge?.post?.spent ?? 0),
      canPost: canPost && failureRefs.length > 0 && postPools.length > 0,
      failureCount: failureRefs.length,
      postPools
    };

    // Optional: show a small meta line for visibility (non-intrusive)
    vm.metaRows.push({
      text: `Edge: ${edge.domain} • pre ${vm.edge.preSpent} • post ${vm.edge.postSpent}`,
      title: ""
    });
  }

  // Post-spend footer + buttons (generic action schema)
  if (vm.edge?.canPost) {
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
  }
}

function fmt(n) {
  const num = Number(n ?? 0);
  return num >= 0 ? `+${num}` : `${num}`;
}
