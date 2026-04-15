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
  const pendingQueuedMutations = targetResults.filter(result =>
    result?.queuedMutation && !result.queuedMutation.applied
  );
  const isAreaEffect = Boolean(r?.attack?.capabilityReport?.isTemplated);

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

  if (isAreaEffect) {
    vm.targetRows = targetResults.map((result, index) => {
      const previewState = r?.areaEffectPreviewState?.[result?.previewKey] ?? {};
      const exposure = result?.damage?.exposure ?? result?.exposure ?? null;
      const initialExposure = String(exposure?.initialLabel ?? "NONE").trim() || "NONE";
      const finalExposure = String(exposure?.finalLabel ?? initialExposure).trim() || initialExposure;
      const damageBefore = Number(result?.damage?.incoming ?? 0);
      const damageAfter = Number(result?.damage?.scaledIncoming ?? damageBefore);
      const queuedMutation = result?.queuedMutation ?? null;
      const isApplied = Boolean(queuedMutation?.applied || result?.damageResult?.applied);
      const reactionPreview = previewState?.reactionPreview ?? null;
      const rowActions = [];

      if (!isApplied && initialExposure !== "NONE" && result?.damageResult?.ok && !result?.damageResult?.skipped) {
        rowActions.push({
          action: "toggleEvade",
          label: result?.evadeActive ? "Clear Evade" : "Use Reaction",
          dataset: { "preview-key": result.previewKey },
          cssClass: `mwd-target-row__action ${result?.evadeActive ? "is-active" : ""}`
        });
      }

      if (result?.evadeActive && reactionPreview?.canSpendEdge && Array.isArray(reactionPreview.edgePools)) {
        for (const pool of reactionPreview.edgePools) {
          rowActions.push({
            action: "toggleEvadeEdge",
            label: previewState?.edgePoolKey === pool.key ? `Edge: ${pool.key}` : `Use ${pool.key}`,
            dataset: {
              "preview-key": result.previewKey,
              "pool-key": pool.key,
            },
            cssClass: `mwd-target-row__action ${previewState?.edgePoolKey === pool.key ? "is-active" : ""}`
          });
        }
      }

      if (queuedMutation && !isApplied) {
        rowActions.push({
          action: "applyAttackDamage",
          label: "Apply Damage",
          dataset: { "result-index": String(index) },
          cssClass: "mwd-target-row__action mwd-apply-attack-damage"
        });
      }

      return {
        targetName: result?.target?.name ?? "Target",
        applied: isApplied,
        outcomeLabel: String(result?.outcome ?? "miss").toUpperCase(),
        exposureLabel: initialExposure === finalExposure
          ? initialExposure
          : `${initialExposure} -> ${finalExposure}`,
        damageLabel: damageBefore === damageAfter
          ? String(damageAfter)
          : `${damageBefore} -> ${damageAfter}`,
        reactionHint: result?.evadeActive
          ? (previewState?.edgePoolKey
            ? "Evade active. Reaction Burn canceled by Edge."
            : (reactionPreview?.burnDelta > 0 ? `Evade active. This reaction adds +${reactionPreview.burnDelta} Burn.` : "Evade active."))
          : "",
        rowActions
      };
    });
  }

  if (targetResults.length > 1 && pendingQueuedMutations.length > 1) {
    vm.actions.push({
      action: "applyAllAttackDamage",
      label: `Apply All Damage (${pendingQueuedMutations.length})`,
      cssClass: "mwd-apply-all-attack-damage"
    });
  }

  if (!isAreaEffect) {
    for (const result of targetResults) {
      const arTotal = Number(result?.cq?.ar?.total ?? 0);
      const drTotal = Number(result?.cq?.dr?.total ?? 0);
      vm.metaRows.push({
        text: `${result?.target?.name ?? "Target"}: ${String(result?.outcome ?? "miss").toUpperCase()} | CQ ${fmt(result?.cq?.value ?? 0)} (AR ${arTotal} - DR ${drTotal}) | Net ${Number(result?.netHits ?? 0)}`,
        title: cqTooltip(result?.cq)
      });
    }
  }

  if (!isAreaEffect) {
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
        if (damageResult.mode === "machineAttackDamage") {
          const machine = damageResult.machine ?? {};
          const hitLocation = damageResult.hitLocation ?? {};
          vm.footerRows.push({
            text: `${result?.target?.name ?? "Target"}: Location ${hitLocation.locationLabel ?? "Location"}${hitLocation.rollTotal ? ` (${hitLocation.rollTotal})` : ""} | Armor ${Number(machine.armorBefore ?? 0)} -> ${Number(machine.armorAfter ?? 0)} | Structure ${Number(machine.structureBefore ?? 0)} -> ${Number(machine.structureAfter ?? 0)}`,
            title: ""
          });
          if (damageResult.critical?.automatic) {
            vm.footerRows.push({
              text: `${result?.target?.name ?? "Target"}: Automatic critical pending`,
              title: ""
            });
          } else if (damageResult.critical?.optional) {
            vm.footerRows.push({
              text: `${result?.target?.name ?? "Target"}: Chaos Edge can convert this location hit to a critical`,
              title: ""
            });
          } else {
            vm.footerRows.push({
              text: `${result?.target?.name ?? "Target"}: Location hit is descriptive only`,
              title: ""
            });
          }
          for (const crit of damageResult.critical?.records ?? []) {
            vm.footerRows.push({
              text: `${result?.target?.name ?? "Target"}: Critical - ${crit.label}${crit.locationLabel ? ` (${crit.locationLabel})` : ""}`,
              title: ""
            });
            if (crit.active !== false && crit.remedyKey !== "none") {
              vm.actions.push({
                action: "machineCritRemedy",
                label: `Remedy: ${crit.label}`,
                dataset: {
                  "machine-actor-uuid": result?.target?.actorUuid ?? "",
                  "crit-id": crit.id,
                  "remedy-key": crit.remedyKey,
                  "gm-override": "true"
                },
                cssClass: "mwd-machine-crit-remedy"
              });
            }
          }
        }
        if (queuedMutation && !isApplied && damageResult?.critical?.optional) {
          vm.actions.push({
            action: "toggleMachineChaosCrit",
            label: queuedMutation.payload?.chaosCriticalSelected ? `Clear Chaos Critical: ${damageResult.actorName ?? result?.target?.name ?? "Target"}` : `Spend Chaos Edge: ${damageResult.actorName ?? result?.target?.name ?? "Target"}`,
            dataset: { "result-index": String(index) },
            cssClass: `mwd-toggle-machine-chaos ${queuedMutation.payload?.chaosCriticalSelected ? "is-active" : ""}`
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
