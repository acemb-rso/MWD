// src/modules/roll/renderers/render-attack.js
// Purpose: Enhances attack roll cards with CQ, outcome, and damage details.
// How it fits: Keeps attack presentation as a pure render step over resolved engine data.

export function enhanceAttack(resolved, vm) {
  const r = resolved ?? {};
  const attackResult = r?.attackResult ?? null;
  if (!attackResult) return;

  const targetResults = Array.isArray(attackResult?.results) ? attackResult.results : [];
  const summary = attackResult?.summary ?? summarizeTargetResults(targetResults);
  const hasAppliedMutation = targetResults.some(result => Boolean(result?.queuedMutation?.applied));

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

  const edge = r?.edge ?? null;
  const failureRefs = Array.isArray(r?.roll?.failureDiceRefs) ? r.roll.failureDiceRefs : [];
  const canPost = Boolean(edge?.availableActions?.canPostRerollFailures) && !hasAppliedMutation;
  const postPools = Array.isArray(edge?.allowed?.postPools) ? edge.allowed.postPools : [];

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

    vm.metaRows.push({
      text: `Edge: ${edge.domain} | pre ${vm.edge.preSpent} | post ${vm.edge.postSpent}`,
      title: ""
    });
  }

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

  const outcome = String(summary?.overallOutcome ?? "").trim();
  vm.outcomeText = targetResults.length > 1
    ? `ATTACK ${summary.hits} HIT / ${summary.grazes} GRAZE / ${summary.misses} MISS`
    : (outcome === "hit" ? "HIT!" : outcome === "graze" ? "GRAZE!" : "MISS!");

  vm.metaRows.push({
    text: `Targets: ${targetResults.length || 0}`,
    title: ""
  });

  for (const result of targetResults) {
    const arTotal = Number(result?.cq?.ar?.total ?? 0);
    const drTotal = Number(result?.cq?.dr?.total ?? 0);
    vm.metaRows.push({
      text: `${result?.target?.name ?? "Target"}: ${String(result?.outcome ?? "miss").toUpperCase()} | CQ ${fmt(result?.cq?.value ?? 0)} (AR ${arTotal} - DR ${drTotal}) | Net ${Number(result?.netHits ?? 0)}`,
      title: cqTooltip(result?.cq)
    });
  }

  for (const [index, result] of targetResults.entries()) {
    const damage = result?.damage ?? null;
    if (damage && result?.outcome !== "miss") {
      vm.footerRows.push({
        text: `${result?.target?.name ?? "Target"}: ${damage.damageTypeLabel} ${fmt(damage.effectiveWeaponDamage)} weapon${damage.netHits ? ` + ${damage.netHits} net` : ""}`,
        title: ""
      });
    }

    const damageResult = result?.damageResult ?? null;
    if (damageResult?.ok && !damageResult?.skipped) {
      const queuedMutation = result?.queuedMutation ?? damageResult?.queuedMutation ?? null;
      const isApplied = Boolean(queuedMutation?.applied || damageResult?.applied);
      vm.footerRows.push({
        text: `${damageResult.actorName ?? result?.target?.name ?? "Target"}: ${isApplied ? "Applied" : "Queued"} ${Number(damageResult.finalDamage ?? damageResult.appliedDelta ?? 0)}`,
        title: ""
      });
      if (damageResult.beforeLabel && damageResult.afterLabel) {
        vm.footerRows.push({
          text: `${damageResult.actorName ?? result?.target?.name ?? "Target"} Track: ${damageResult.beforeLabel} -> ${damageResult.afterLabel}`,
          title: ""
        });
      }
      if (damageResult.usedArmor && damageResult.mitigation) {
        vm.footerRows.push({
          text: `${damageResult.actorName ?? result?.target?.name ?? "Target"} Mitigation: ${Number(damageResult.mitigation.baseMitigation ?? 0)} + ${Number(damageResult.mitigation.typeMitigationMod ?? 0)} - ${Number(damageResult.effectiveAp ?? 0)} = ${Number(damageResult.mitigation.netResistance ?? 0)}`,
          title: ""
        });
      }
      if (queuedMutation && !isApplied) {
        vm.actions.push({
          action: "applyAttackDamage",
          label: `Apply Damage: ${damageResult.actorName ?? result?.target?.name ?? "Target"}`,
          dataset: { "result-index": String(index) },
          cssClass: "mwd-apply-attack-damage"
        });
      }
    } else if (damageResult?.reason) {
      vm.footerRows.push({
        text: `${result?.target?.name ?? "Target"}: ${damageResult.reason}`,
        title: ""
      });
    }
  }
}

function cqTooltip(cq = {}) {
  const ar = Array.isArray(cq?.ar?.parts) ? cq.ar.parts : [];
  const dr = Array.isArray(cq?.dr?.parts) ? cq.dr.parts : [];
  return [
    ...ar.map(part => `AR - ${part.label}: ${fmt(part.value)}`),
    ...dr.map(part => `DR - ${part.label}: ${fmt(part.value)}`)
  ].join("\n");
}

function summarizeTargetResults(results = []) {
  const summary = { hits: 0, grazes: 0, misses: 0 };
  for (const result of results) {
    if (result?.outcome === "hit") summary.hits += 1;
    else if (result?.outcome === "graze") summary.grazes += 1;
    else summary.misses += 1;
  }

  return {
    ...summary,
    overallOutcome: summary.hits > 0 ? "hit" : (summary.grazes > 0 ? "graze" : "miss")
  };
}

function fmt(n) {
  const num = Number(n ?? 0);
  return num >= 0 ? `+${num}` : `${num}`;
}
