// src/modules/roll/renderers/render-attack.js
// Purpose: Enhances attack roll cards with CQ, outcome, and damage details.
// How it fits: Keeps attack presentation as a pure render step over resolved engine data.

import { startCase } from "../../core/constants.js";
import { buildMachineCriticalChatSummary } from "../../mwd/machine-crit-effects.js";
import { buildPersonalCriticalChatSummary } from "../../mwd/personal-criticals.js";
import { enhancePostEdge } from "./render-edge-post.js";

export function enhanceAttack(resolved, vm) {
  const r = resolved ?? {};
  const attackResult = r?.attackResult ?? null;
  if (!attackResult) return;
  const groupSummary = r?.attack?.weapon?.attackSummary ?? null;
  const machineGroup = r?.attack?.weapon?.machineWeaponGroup ?? null;

  const targetResults = Array.isArray(attackResult?.results) ? attackResult.results : [];
  const summary = attackResult?.summary ?? summarizeTargetResults(targetResults);
  const hasAppliedMutation = targetResults.some(result => Boolean(result?.queuedMutation?.applied));
  const pendingQueuedMutations = targetResults.filter(result =>
    result?.queuedMutation && !result.queuedMutation.applied
  );
  const isAreaEffect = Boolean(r?.attack?.capabilityReport?.isTemplated);

  const ewCtx = r?.attack?.ewContext ?? null;
  if (ewCtx?.detectionState && ewCtx.detectionState !== "contact") {
    const ewParts = [`EW: ${ewCtx.detectionStateLabel ?? ewCtx.detectionState}`];
    if (ewCtx.targetingDataValue) ewParts.push(`+${ewCtx.targetingDataValue} targeting`);
    vm.metaRows.push({ text: ewParts.join(" | "), title: "" });
  }

  const clusterDice = Math.max(0, Number(r?.attack?.weapon?.clusteringDice ?? 0) || 0);
  const clusterTargetNumber = Number(r?.attack?.weapon?.clusteringTargetNumber ?? 5) || 5;
  if (clusterDice > 0) {
    const clusterSources = Array.isArray(r?.attack?.weapon?.clusteringModifiers?.sourceNames)
      ? r.attack.weapon.clusteringModifiers.sourceNames.filter(Boolean)
      : [];
    vm.metaRows.push({
      text: `Clustering: ${clusterDice}d6 @ ${clusterTargetNumber}+${clusterSources.length ? ` | Control: ${clusterSources.join(", ")}` : ""}`,
      title: ""
    });
  }

  if (machineGroup?.id) {
    const memberNames = Array.isArray(machineGroup?.weaponNames) ? machineGroup.weaponNames.filter(Boolean) : [];
    vm.metaRows.push({
      text: `Group: ${r?.attack?.weapon?.name ?? "Weapon Group"}${memberNames.length ? ` | Members: ${memberNames.join(", ")}` : ""}`,
      title: ""
    });

    if (groupSummary) {
      vm.metaRows.push({
        text: `Profile: ${groupSummary.damage ?? 0} damage${Number(groupSummary.clusteringDice ?? 0) ? ` | ${Number(groupSummary.clusteringDice ?? 0)}d6 cluster @ ${clusterTargetNumber}+` : ""} | AP ${groupSummary.ap ?? 0} | Heat ${groupSummary.heat ?? 0} | ${groupSummary.damageTypeLabel ?? groupSummary.damageType ?? "Damage"} | Range Cap ${startCase(groupSummary.rangeCap ?? "")}`,
        title: ""
      });
      vm.footerRows.push({
        text: `Attack Ratings: ${formatAttackRatings(groupSummary.attackRatings ?? {})}`,
        title: ""
      });
    }
  }

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

  enhancePostEdge(r, vm, { canPost: !hasAppliedMutation });

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
        const reactionBlocked = Boolean(reactionPreview?.disabled);
        rowActions.push({
          action: "toggleEvade",
          label: reactionBlocked
            ? (reactionPreview?.reason || "Reaction Disabled")
            : (result?.evadeActive ? "Clear Evade" : "Use Reaction"),
          dataset: { "preview-key": result.previewKey },
          cssClass: `mwd-target-row__action ${result?.evadeActive ? "is-active" : ""}`,
          disabled: reactionBlocked
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
        const clusterHits = Number(damage?.clustering?.damageBonus ?? damage?.clustering?.hits ?? 0);
        const netDamageBonus = Number(damage?.netDamageBonus ?? 0);
        vm.footerRows.push({
          text: `${result?.target?.name ?? "Target"}: ${damage.damageTypeLabel} ${fmt(damage.effectiveWeaponDamage)} weapon${clusterHits ? ` + ${clusterHits} cluster` : ""}${netDamageBonus ? ` + ${netDamageBonus} net` : ""}`,
          title: ""
        });
        if (Number(damage?.clustering?.dice ?? 0) > 0) {
          vm.footerRows.push({
            text: `${result?.target?.name ?? "Target"}: Cluster ${Number(damage.clustering.dice ?? 0)}d6 @ ${Number(damage.clustering.targetNumber ?? 5) || 5}+ -> ${Number(damage.clustering.hits ?? 0)} hit${Number(damage.clustering.hits ?? 0) === 1 ? "" : "s"}`,
            title: ""
          });
        }
      }

      const damageResult = result?.damageResult ?? null;
      if (damageResult?.ok && !damageResult?.skipped) {
        const queuedMutation = result?.queuedMutation ?? damageResult?.queuedMutation ?? null;
        const isApplied = Boolean(queuedMutation?.applied || damageResult?.applied);
        if (damageResult.mode === "machineAttackDamage") {
          const machine = damageResult.machine ?? {};
          const hitLocation = damageResult.hitLocation ?? {};
          const degradation = damageResult.degradation ?? null;
          const criticalState = damageResult.critical ?? {};
          const impactLabel = hitLocation.impactLabel ?? hitLocation.locationLabel ?? "Location";
          const rulesLocation = hitLocation.rulesLocationLabel ?? hitLocation.rulesLocation ?? "";
          vm.footerRows.push({
            text: `${result?.target?.name ?? "Target"}: Impact ${impactLabel}${rulesLocation && rulesLocation !== impactLabel ? ` | Rules ${rulesLocation}` : ""}${hitLocation.rollTotal ? ` (${hitLocation.rollTotal})` : ""} | Armor ${Number(machine.armorBefore ?? 0)} -> ${Number(machine.armorAfter ?? 0)} | Structure ${Number(machine.structureBefore ?? 0)} -> ${Number(machine.structureAfter ?? 0)}`,
            title: ""
          });
          if (degradation?.summary) {
            vm.footerRows.push({
              text: `${result?.target?.name ?? "Target"}: Shock ${Number(degradation.summary.shockBefore ?? 0)} -> ${Number(degradation.summary.shockAfter ?? 0)} | Threshold ${Number(degradation.summary.threshold ?? 0)} | Reliability ${Number(degradation.summary.reliability ?? 0)} | Reserve ${Number(degradation.summary.reliabilitySpendableBefore ?? 0)} -> ${Number(degradation.summary.reliabilitySpendableAfter ?? 0)}`,
              title: ""
            });
          }
          if (criticalState.mode === "automatic" || damageResult.critical?.automatic) {
            vm.footerRows.push({
              text: `${result?.target?.name ?? "Target"}: Automatic critical pending`,
              title: ""
            });
          } else if (criticalState.mode === "chaosSelected") {
            vm.footerRows.push({
              text: `${result?.target?.name ?? "Target"}: Chaos critical selected`,
              title: ""
            });
          } else if (criticalState.mode === "chaosOptional" || damageResult.critical?.optional) {
            vm.footerRows.push({
              text: `${result?.target?.name ?? "Target"}: Chaos Edge can convert this location hit to a critical`,
              title: ""
            });
          }
          for (const crit of damageResult.critical?.records ?? []) {
            vm.footerRows.push({
              text: `${result?.target?.name ?? "Target"}: Critical - ${crit.label}${crit.locationLabel ? ` (${crit.locationLabel})` : ""} | ${buildMachineCriticalChatSummary(crit)}`,
              title: ""
            });
            if (isApplied && crit.active !== false && crit.remedyKey !== "none") {
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
          if (queuedMutation && !isApplied && Array.isArray(degradation?.spendOpportunities)) {
            for (const opportunity of degradation.spendOpportunities) {
              if (!opportunity?.canSpend) continue;
              vm.actions.push({
                action: "toggleMachineReliabilitySpend",
                label: opportunity.selected
                  ? `Clear Reliability Spend: ${opportunity.location}`
                  : `Spend Reliability: ${opportunity.location}`,
                dataset: {
                  "result-index": String(index),
                  "spend-index": String(opportunity.index),
                },
                cssClass: `mwd-toggle-machine-reliability ${opportunity.selected ? "is-active" : ""}`
              });
            }
          }
        } else {
          const criticalState = damageResult.critical ?? {};
          if (criticalState.selected || criticalState.band) {
            const severity = Number(criticalState.severity ?? 0);
            const outcomeLabel = criticalState.selected
              ? `${criticalState.bandLabel ?? startCase(criticalState.band ?? "")} ${criticalState.familyLabel ?? ""}`.trim()
              : "No Critical";
            vm.footerRows.push({
              text: `${result?.target?.name ?? "Target"}: Critical Threat (severity ${severity}) -> ${outcomeLabel}`,
              title: ""
            });
          }
          for (const crit of criticalState.records ?? []) {
            vm.footerRows.push({
              text: `${result?.target?.name ?? "Target"}: Critical - ${crit.label} | ${buildPersonalCriticalChatSummary(crit)}`,
              title: ""
            });
          }
        }
        if (queuedMutation && !isApplied && damageResult?.critical?.mode === "chaosOptional") {
          vm.actions.push({
            action: "toggleMachineChaosCrit",
            label: `Spend Chaos Edge: ${damageResult.actorName ?? result?.target?.name ?? "Target"}`,
            dataset: { "result-index": String(index) },
            cssClass: "mwd-toggle-machine-chaos"
          });
        } else if (queuedMutation && !isApplied && damageResult?.critical?.mode === "chaosSelected") {
          vm.actions.push({
            action: "toggleMachineChaosCrit",
            label: `Clear Chaos Critical: ${damageResult.actorName ?? result?.target?.name ?? "Target"}`,
            dataset: { "result-index": String(index) },
            cssClass: "mwd-toggle-machine-chaos is-active"
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


function formatAttackRatings(bands = {}) {
  return ["close", "near", "far", "extreme"]
    .map(band => `${startCase(band)} ${Number(bands?.[band] ?? 0) || 0}`)
    .join(" | ");
}
