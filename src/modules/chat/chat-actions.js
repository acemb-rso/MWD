// src/modules/chat/chat-actions.js
// Purpose: Registers Foundry hooks: renderChatMessageHTML.
// How it fits: Wires chat-card post-roll and queued attack mutation actions.

import { HarmEngine } from "../harm/harm-engine.js";
import { TEMPLATE } from "../constants.js";
import { getPersonalDamageTypeLabel } from "../mwd/personal-damage.js";
import { resolveAttackExecution, summarizeAttackDamageResult } from "../roll/attack-resolution.js";
import { interpretOutcome } from "../roll/outcome/interpret-outcome.js";
import { renderChat } from "../roll/renderers/render-chat.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import {
  applyEvadeToExposure,
  createExposureData,
  normalizeExposureTier,
  scaleDamageByExposure,
} from "../area-effects/area-effect-engine.js";
import {
  normalizeHazardCard,
  renderHazardCard,
} from "../area-effects/hazard-chat.js";
import { resolveMachineOperator } from "../mwd/machine-operator.js";
import { prepareMachineRemedyRoll } from "../mwd/machine-intents.js";
import { buildMachineCriticalChatSummary } from "../mwd/machine-crit-effects.js";

export function registerMWDChatActions() {
  Hooks.on("renderChatMessageHTML", (message, htmlElement) => {
    htmlElement.addEventListener("click", (ev) => {
      const btn = ev.target.closest("[data-mwd-action]");
      if (!btn) return;

      const action = String(btn.dataset.mwdAction || "").trim();
      if (!action) return;

      if (action === "edgePostReroll") void onEdgePostReroll(ev, message);
      if (action === "toggleEvade") void onToggleEvade(ev, message);
      if (action === "toggleEvadeEdge") void onToggleEvadeEdge(ev, message);
      if (action === "toggleHazardEvade") void onToggleHazardEvade(ev, message);
      if (action === "toggleHazardEvadeEdge") void onToggleHazardEvadeEdge(ev, message);
      if (action === "applyHazardTick") void onApplyHazardTick(ev, message);
      if (action === "toggleMachineChaosCrit") void onToggleMachineChaosCrit(ev, message);
      if (action === "toggleMachineReliabilitySpend") void onToggleMachineReliabilitySpend(ev, message);
      if (action === "machineCritRemedy") void onMachineCritRemedy(ev, message);
      if (action === "applyAttackDamage") void onApplyAttackDamage(ev, message);
      if (action === "applyAllAttackDamage") void onApplyAllAttackDamage(ev, message);
    });
  });
}

function hasAppliedAttackMutation(resolved = {}) {
  const results = Array.isArray(resolved?.attackResult?.results) ? resolved.attackResult.results : [];
  return results.some(result => Boolean(result?.queuedMutation?.applied));
}

function isMachineDamageMutation(mutation = {}) {
  return mutation?.type === "machineAttackDamage" || mutation?.payload?.mode === "machineAttackDamage";
}

function getMutationTargetActorUuid(mutation = {}) {
  return mutation?.targetActorUuid ?? mutation?.target?.actorUuid ?? null;
}

function getMutationTargetTokenUuid(mutation = {}) {
  return mutation?.targetTokenUuid ?? mutation?.target?.tokenUuid ?? null;
}

function syncMachineMutationPreview(mutation = {}, summary = {}) {
  if (!isMachineDamageMutation(mutation)) return mutation;
  const previewRevision = Math.max(0, Math.trunc(Number(mutation?.payload?.previewRevision ?? mutation?.previewRevision ?? summary?.previewRevision ?? 0) || 0));
  const preparedCriticalRecords = Array.isArray(summary?.critical?.records)
    ? foundry.utils.deepClone(summary.critical.records).map(record => ({ ...record, previewRevision }))
    : [];
  mutation.type = "machineAttackDamage";
  mutation.targetActorUuid = getMutationTargetActorUuid(mutation);
  mutation.targetTokenUuid = getMutationTargetTokenUuid(mutation);
  mutation.hitLocation = summary?.hitLocation ?? mutation.hitLocation ?? mutation.payload?.hitLocation ?? null;
  mutation.damagePreview = summary?.damagePreview ?? null;
  mutation.critical = summary?.critical ?? null;
  mutation.preparedCriticalRecords = preparedCriticalRecords;
  mutation.reliabilityOptions = summary?.reliabilityOptions ?? null;
  mutation.previewRevision = previewRevision;
  mutation.preview = summary;
  mutation.payload ??= {};
  mutation.payload.previewRevision = previewRevision;
  mutation.payload.hitLocation = mutation.hitLocation;
  mutation.payload.preparedCriticalRecords = preparedCriticalRecords;
  return mutation;
}

async function rebuildMachineMutationPreview({ mutation = {}, result = {}, targetActor = null, targetToken = null } = {}) {
  if (!isMachineDamageMutation(mutation)) return null;
  mutation.previewRevision = Math.max(0, Math.trunc(Number(mutation.previewRevision ?? mutation.payload?.previewRevision ?? 0) || 0)) + 1;
  mutation.payload ??= {};
  mutation.payload.previewRevision = mutation.previewRevision;
  delete mutation.payload.preparedCriticalRecords;
  mutation.preparedCriticalRecords = [];
  mutation.damagePreview = null;
  mutation.critical = null;
  mutation.reliabilityOptions = null;

  const previewResult = await HarmEngine.apply({
    actor: targetActor,
    token: targetToken,
    payload: mutation.payload,
    options: {
      actorId: targetActor?.id ?? "",
      dryRun: true,
      logToChat: false
    }
  });

  const summary = summarizeAttackDamageResult(
    previewResult,
    result?.target ?? mutation.target ?? {},
    result?.damage ?? {},
    { queued: true, applied: false }
  );
  syncMachineMutationPreview(mutation, summary);
  return summary;
}

function getTrackLabel(track) {
  if (track === TEMPLATE.monitors.physical) return "Physical";
  if (track === TEMPLATE.monitors.fatigue) return "Fatigue";
  return String(track ?? "").trim() || "Track";
}

function getDamageTypeTheme(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (normalized === "penetrating") return "is-penetrating";
  if (normalized === "energy") return "is-energy";
  if (normalized === "thermal") return "is-thermal";
  if (normalized === "electrical") return "is-electrical";
  return "is-concussive";
}

function getDamageSeverity(finalDamage) {
  const amount = Math.max(0, Number(finalDamage ?? 0) || 0);
  if (amount <= 0) return { key: "is-none", label: "No Penetration" };
  if (amount <= 2) return { key: "is-light", label: "Light Damage" };
  if (amount <= 4) return { key: "is-medium", label: "Moderate Damage" };
  if (amount <= 7) return { key: "is-heavy", label: "Heavy Damage" };
  return { key: "is-critical", label: "Critical Damage" };
}

function getPortraitSource({ actor = null, token = null } = {}) {
  const tokenDoc = token?.document ?? token ?? null;
  const tokenTexture = String(tokenDoc?.texture?.src ?? "").trim();
  const actorImage = String(actor?.img ?? "").trim();
  return tokenTexture || actorImage || "icons/svg/mystery-man.svg";
}

function applyChatVisibility(chatData) {
  const rollMode = game.settings?.get?.("core", "rollMode");
  if (typeof ChatMessage.applyRollMode === "function") {
    ChatMessage.applyRollMode(chatData, rollMode);
  }
  return chatData;
}

function buildDamageApplicationCardVM({ summary = {}, actor = null, token = null } = {}) {
  const damageType = String(summary?.damageType ?? "").trim();
  const damageTypeLabel = getPersonalDamageTypeLabel(damageType || "concussive") || "Damage";
  const trackLabel = getTrackLabel(summary?.track);
  const finalDamage = Math.max(0, Number(summary?.finalDamage ?? summary?.appliedDelta ?? 0) || 0);
  const severity = getDamageSeverity(finalDamage);
  const appliedAmountLabel = finalDamage === 1 ? "1 point" : `${finalDamage} points`;
  const targetName = String(summary?.actorName ?? actor?.name ?? "Target").trim() || "Target";
  const rows = [];

  if (summary?.beforeLabel && summary?.afterLabel) {
    rows.push({
      label: "Monitor",
      value: `${summary.beforeLabel} -> ${summary.afterLabel}`
    });
  }

  rows.push({
    label: "Final Damage",
    value: appliedAmountLabel
  });

  if (Number.isFinite(Number(summary?.damageIncoming))) {
    rows.push({
      label: "Incoming",
      value: String(Number(summary.damageIncoming ?? 0))
    });
  }

  if (summary?.usedArmor && summary?.mitigation) {
    rows.push({
      label: "Resistance",
      value: String(Number(summary.mitigation.netResistance ?? 0))
    });

    rows.push({
      label: "AP",
      value: String(Number(summary.effectiveAp ?? 0))
    });

    rows.push({
      label: "Armor",
      value: `${Number(summary.mitigation.armorBefore ?? 0)} -> ${Number(summary.mitigation.armorAfter ?? 0)}`
    });

    if (Number(summary.mitigation.reinforcedMax ?? 0) > 0) {
      rows.push({
        label: "Reinforced",
        value: `${Number(summary.mitigation.reinforcedBefore ?? 0)} -> ${Number(summary.mitigation.reinforcedAfter ?? 0)}`
      });
    }
  }

  if (summary?.source) {
    rows.push({
      label: "Source",
      value: String(summary.source).trim()
    });
  }

  if (summary?.notes) {
    rows.push({
      label: "Notes",
      value: String(summary.notes).trim()
    });
  }

  const criticalRecords = Array.isArray(summary?.critical?.records) ? summary.critical.records : [];
  if (criticalRecords.length) {
    rows.push({
      label: "Critical Effects",
      value: criticalRecords
        .map(crit => `${crit.label}${crit.locationLabel ? ` (${crit.locationLabel})` : ""}: ${buildMachineCriticalChatSummary(crit)}`)
        .join(" ; ")
    });
  }

  return {
    classes: ["mwd-damage-card", getDamageTypeTheme(damageType), severity.key].join(" "),
    header: {
      left: "Damage Applied",
      right: trackLabel
    },
    target: {
      name: targetName,
      image: getPortraitSource({ actor, token })
    },
    damageTypeLabel,
    severityLabel: severity.label,
    impactValue: finalDamage,
    impactText: finalDamage > 0
      ? `${damageTypeLabel} damage applied to ${trackLabel}.`
      : `${damageTypeLabel} damage did not penetrate.`,
    rows
  };
}

async function createDamageApplicationMessage({ summary = {}, actor = null, token = null } = {}) {
  const content = await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-damage-application-card",
    buildDamageApplicationCardVM({ summary, actor, token })
  );

  const chatData = applyChatVisibility({
    speaker: ChatMessage.getSpeaker({ actor, token }),
    content
  });

  return ChatMessage.create(chatData);
}

function buildOutcomeContext(resolved = {}) {
  const snapshot = resolved?.ctxSnapshot ?? {};
  const dnTotal = Number(resolved?.dn?.total ?? snapshot?.dn?.total ?? snapshot?.difficulty?.dn ?? 1);

  return {
    intent: resolved?.intent ?? "unknown",
    rollType: snapshot?.rollType ?? "simple",
    difficulty: {
      ...((snapshot?.difficulty && typeof snapshot.difficulty === "object") ? snapshot.difficulty : {}),
      dn: Number.isFinite(dnTotal) ? dnTotal : 1
    },
    dn: resolved?.dn ?? snapshot?.dn ?? null,
    opposed: snapshot?.opposed ?? null,
    net: snapshot?.net ?? null,
    edge: snapshot?.edge ?? null,
    domains: Array.isArray(resolved?.domains) ? resolved.domains : [],
    attack: resolved?.attack ?? null,
  };
}

async function recomputeResolvedOutcomeAndAttack(resolved = {}, actor = null) {
  const ctx = buildOutcomeContext(resolved);
  const successes = Number(resolved?.outcome?.hits ?? 0) || 0;
  const edgeEarned = resolved?.outcomeModel?.edgeEarned ?? null;
  resolved.outcomeModel = interpretOutcome(ctx, { successes, raw: resolved?.roll?.json }, null);
  resolved.outcomeModel.edgeEarned = edgeEarned;

  if (ctx.intent === "attack" && actor && ctx.attack) {
    resolved.attackResult = await resolveAttackExecution({
      attacker: actor,
      ctx,
      outcomeModel: resolved.outcomeModel,
      previewState: resolved.areaEffectPreviewState ?? {},
      existingAttackResult: resolved.attackResult ?? null,
    });
  }

  return resolved;
}

async function onApplyAttackDamage(ev, message) {
  ev.preventDefault();

  const btn = ev.target.closest("[data-mwd-action='applyAttackDamage']");
  const resultIndex = Number(btn?.dataset?.resultIndex);
  if (!Number.isInteger(resultIndex) || resultIndex < 0) return;

  const resolved = foundry.utils.deepClone(message?.flags?.mwd?.resolved);
  if (!resolved) return;

  const result = await applyQueuedAttackDamageAtIndex(resolved, resultIndex);
  if (!result.ok) {
    ui.notifications?.warn?.(result.reason ?? "Unable to apply attack damage.");
    return;
  }
  if (result.skipped) {
    ui.notifications?.info?.(result.reason ?? "That attack damage has already been applied.");
    return;
  }

  const htmlContent = await renderChat({ resolved });
  await message.update({
    content: htmlContent,
    "flags.mwd.resolved": resolved
  });

  await createDamageApplicationMessage({
    summary: result.summary,
    actor: result.targetActor,
    token: result.targetToken
  });
}

async function buildEvadeReactionPreview(result = {}) {
  const targetActor = result?.target?.actorUuid ? await fromUuid(result.target.actorUuid) : null;
  const targetToken = result?.target?.tokenUuid ? await fromUuid(result.target.tokenUuid) : null;
  return buildReactionPreviewForTarget({
    actor: targetActor,
    token: targetToken,
    edgePoolKey: result?.evadeEdgePoolKey ?? ""
  });
}

function getMessageById(messageId = "") {
  return game.messages?.get?.(String(messageId ?? "").trim()) ?? null;
}

async function buildReactionPreviewForTarget({ actor = null, token = null, actorUuid = "", tokenUuid = "", edgePoolKey = "" } = {}) {
  const targetActor = actor ?? (actorUuid ? await fromUuid(actorUuid) : null);
  const targetToken = token ?? (tokenUuid ? await fromUuid(tokenUuid) : null);
  if (!targetActor) return null;
  return {
    ...(PersonalCombatTracker.getReactionSpendPreview(targetActor, { token: targetToken, edgePoolKey }) ?? {}),
    actor: targetActor,
    token: targetToken,
  };
}

async function updateAreaEffectPreview(message, mutateResolved) {
  const resolved = foundry.utils.deepClone(message?.flags?.mwd?.resolved);
  if (!resolved) return;

  await mutateResolved(resolved);

  const actor = await fromUuid(resolved.actorUuid);
  if (!actor) return;
  await recomputeResolvedOutcomeAndAttack(resolved, actor);

  const htmlContent = await renderChat({ resolved });
  await message.update({
    content: htmlContent,
    "flags.mwd.resolved": resolved
  });

  return resolved;
}

async function setAttackPendingReaction(message, result, { active = false, edgePoolKey = "" } = {}) {
  const targetActor = result?.target?.actorUuid ? await fromUuid(result.target.actorUuid) : null;
  const targetToken = result?.target?.tokenUuid ? await fromUuid(result.target.tokenUuid) : null;
  if (!targetActor) return;

  if (!active) {
    const snapshot = PersonalCombatTracker.getSnapshot(targetActor, { token: targetToken });
    const pending = snapshot?.pendingReaction ?? null;
    if (pending?.sourceKind === "attack" && pending?.messageId === message.id && pending?.sourceId === result?.previewKey) {
      await PersonalCombatTracker.clearPendingReaction(targetActor, { token: targetToken });
    }
    return;
  }

  await PersonalCombatTracker.setPendingReaction(targetActor, {
    token: targetToken,
    pendingReaction: {
      type: "evade",
      sourceKind: "attack",
      sourceId: result?.previewKey ?? null,
      messageId: message.id,
      resultIndex: result?.resultIndex ?? null,
      exposureBefore: result?.damage?.exposure?.initialTier ?? result?.exposure?.initialTier ?? "none",
      exposureAfterPreview: result?.damage?.exposure?.finalTier ?? result?.exposure?.initialTier ?? "none",
      edgePoolKey,
      allowCurrentTurn: false,
    }
  });
}

async function onToggleEvade(ev, message) {
  ev.preventDefault();

  const btn = ev.target.closest("[data-mwd-action='toggleEvade']");
  const previewKey = String(btn?.dataset?.previewKey ?? "").trim();
  if (!previewKey) return;

  const resolved = await updateAreaEffectPreview(message, async (resolved) => {
    resolved.areaEffectPreviewState ??= {};
    const current = resolved.areaEffectPreviewState[previewKey] ?? {};
    const nextActive = !Boolean(current.evadeActive);
    if (!nextActive) {
      delete resolved.areaEffectPreviewState[previewKey];
      return;
    }

    resolved.areaEffectPreviewState[previewKey] = {
      evadeActive: true,
      edgePoolKey: null,
    };

    const result = (Array.isArray(resolved?.attackResult?.results) ? resolved.attackResult.results : [])
      .find(entry => entry?.previewKey === previewKey) ?? null;
    const reactionPreview = result ? await buildEvadeReactionPreview({ ...result, evadeEdgePoolKey: null }) : null;
    if (reactionPreview) {
      resolved.areaEffectPreviewState[previewKey].reactionPreview = {
        burnDelta: Number(reactionPreview.burnDelta ?? 0),
        canSpendEdge: Boolean(reactionPreview.canSpendEdge),
        edgePools: (reactionPreview.edgePools ?? []).map(pool => ({
          key: pool.key,
          label: pool.label,
          value: pool.value,
        })),
      };
    }
  });

  const updatedResult = (Array.isArray(resolved?.attackResult?.results) ? resolved.attackResult.results : [])
    .find(entry => entry?.previewKey === previewKey) ?? null;
  if (resolved && updatedResult) {
    await setAttackPendingReaction(message, updatedResult, {
      active: Boolean(updatedResult?.evadeActive),
      edgePoolKey: String(updatedResult?.evadeEdgePoolKey ?? "").trim(),
    });
  }
}

async function onToggleEvadeEdge(ev, message) {
  ev.preventDefault();

  const btn = ev.target.closest("[data-mwd-action='toggleEvadeEdge']");
  const previewKey = String(btn?.dataset?.previewKey ?? "").trim();
  const edgePoolKey = String(btn?.dataset?.poolKey ?? "").trim();
  if (!previewKey) return;

  const resolved = await updateAreaEffectPreview(message, async (resolved) => {
    resolved.areaEffectPreviewState ??= {};
    const current = resolved.areaEffectPreviewState[previewKey] ?? {};
    const nextEdgePoolKey = current.edgePoolKey === edgePoolKey ? null : edgePoolKey;
    resolved.areaEffectPreviewState[previewKey] = {
      ...current,
      evadeActive: true,
      edgePoolKey: nextEdgePoolKey,
    };

    const result = (Array.isArray(resolved?.attackResult?.results) ? resolved.attackResult.results : [])
      .find(entry => entry?.previewKey === previewKey) ?? null;
    const reactionPreview = result ? await buildEvadeReactionPreview({ ...result, evadeEdgePoolKey: nextEdgePoolKey }) : null;
    if (reactionPreview) {
      resolved.areaEffectPreviewState[previewKey].reactionPreview = {
        burnDelta: Number(reactionPreview.burnDelta ?? 0),
        canSpendEdge: Boolean(reactionPreview.canSpendEdge),
        edgePools: (reactionPreview.edgePools ?? []).map(pool => ({
          key: pool.key,
          label: pool.label,
          value: pool.value,
        })),
      };
    }
  });

  const updatedResult = (Array.isArray(resolved?.attackResult?.results) ? resolved.attackResult.results : [])
    .find(entry => entry?.previewKey === previewKey) ?? null;
  if (resolved && updatedResult) {
    await setAttackPendingReaction(message, updatedResult, {
      active: Boolean(updatedResult?.evadeActive),
      edgePoolKey: String(updatedResult?.evadeEdgePoolKey ?? "").trim(),
    });
  }
}

async function onApplyAllAttackDamage(ev, message) {
  ev.preventDefault();

  const resolved = foundry.utils.deepClone(message?.flags?.mwd?.resolved);
  if (!resolved) return;

  const results = Array.isArray(resolved?.attackResult?.results) ? resolved.attackResult.results : [];
  const pendingIndexes = results
    .map((result, index) => ({ result, index }))
    .filter(({ result }) => result?.queuedMutation && !result.queuedMutation.applied)
    .map(({ index }) => index);

  if (!pendingIndexes.length) {
    ui.notifications?.info?.("No queued attack damage remains to apply.");
    return;
  }

  let applied = 0;
  const failures = [];
  const appliedResults = [];
  for (const resultIndex of pendingIndexes) {
    const result = await applyQueuedAttackDamageAtIndex(resolved, resultIndex);
    if (result.ok && result.applied) {
      applied += 1;
      appliedResults.push(result);
    } else if (!result.ok) {
      failures.push(result.reason ?? `Target ${resultIndex + 1} failed.`);
    }
  }

  if (applied <= 0) {
    ui.notifications?.warn?.(failures[0] ?? "Unable to apply queued attack damage.");
    return;
  }

  const htmlContent = await renderChat({ resolved });
  await message.update({
    content: htmlContent,
    "flags.mwd.resolved": resolved
  });

  for (const result of appliedResults) {
    await createDamageApplicationMessage({
      summary: result.summary,
      actor: result.targetActor,
      token: result.targetToken
    });
  }

  if (failures.length) {
    ui.notifications?.warn?.(`Applied ${applied} queued damage result${applied === 1 ? "" : "s"}; ${failures.length} failed.`);
  }
}

async function applyQueuedAttackDamageAtIndex(resolved, resultIndex) {
  const result = resolved?.attackResult?.results?.[resultIndex] ?? null;
  const mutation = result?.queuedMutation ?? null;
  if (!mutation) {
    return { ok: false, reason: "No queued attack damage to apply." };
  }
  if (mutation.applied) {
    return { ok: true, skipped: true, reason: "That attack damage has already been applied." };
  }

  let applyResult = null;
  let targetActor = null;
  let targetToken = null;
  try {
    targetActor = getMutationTargetActorUuid(mutation) ? await fromUuid(getMutationTargetActorUuid(mutation)) : null;
    targetToken = getMutationTargetTokenUuid(mutation) ? await fromUuid(getMutationTargetTokenUuid(mutation)) : null;
    if (result?.evadeActive && targetActor) {
      const spend = await PersonalCombatTracker.commitReactionSpend(targetActor, {
        token: targetToken,
        actionId: "evade",
        actionLabel: "Evade",
        actionCategory: "reaction",
        logLabel: `Evade: ${mutation.target?.name ?? result?.target?.name ?? "Target"}`,
        edgePoolKey: String(result?.evadeEdgePoolKey ?? "").trim(),
      });
      if (!spend?.ok) {
        return { ok: false, reason: spend?.reason ?? "Unable to spend the Evade reaction." };
      }
      await PersonalCombatTracker.clearPendingReaction(targetActor, { token: targetToken });
    }
    if (isMachineDamageMutation(mutation) && mutation.payload?.chaosCriticalSelected) {
      const spend = await spendMachineChaosCriticalEdge({
        machineActor: targetActor,
        operatorActorUuid: mutation.payload?.operatorActorUuid,
      });
      if (!spend.ok) return spend;
    }
    if (isMachineDamageMutation(mutation)) {
      mutation.payload ??= {};
      mutation.payload.applied = Boolean(mutation.applied);
      mutation.payload.previewRevision = Math.max(0, Math.trunc(Number(mutation.previewRevision ?? mutation.payload.previewRevision ?? 0) || 0));
      mutation.payload.preparedCriticalRecords = Array.isArray(mutation.preparedCriticalRecords)
        ? foundry.utils.deepClone(mutation.preparedCriticalRecords)
        : (Array.isArray(mutation.payload.preparedCriticalRecords) ? mutation.payload.preparedCriticalRecords : []);
    }
    applyResult = await HarmEngine.apply({
      actor: targetActor,
      token: targetToken,
      payload: mutation.payload ?? {},
      options: {
        actorId: targetActor?.id ?? "",
        logToChat: false
      }
    });
  } catch (error) {
    console.warn("MWD | Unable to apply queued attack damage", error);
    return { ok: false, reason: "Unable to apply attack damage to that target." };
  }

  const summary = summarizeAttackDamageResult(
    applyResult,
    result?.target ?? mutation.target ?? {},
    result?.damage ?? {},
    { queued: false, applied: Boolean(applyResult?.ok) }
  );

  if (!applyResult?.ok) {
    return { ok: false, reason: summary.reason ?? "Unable to apply attack damage." };
  }

  mutation.applied = true;
  mutation.appliedResult = summary;
  if (isMachineDamageMutation(mutation)) {
    mutation.payload.applied = true;
    mutation.payload.appliedResult = summary;
    syncMachineMutationPreview(mutation, summary);
    mutation.applied = true;
    mutation.appliedResult = summary;
  }
  result.queuedMutation = mutation;
  result.damageResult = summary;
  result.evadeApplied = Boolean(result.evadeActive);

  resolved.edge ??= {};
  resolved.edge.availableActions = {
    ...(resolved.edge.availableActions ?? {}),
    canSpendPost: false,
    canPostRerollFailures: false
  };

  return {
    ok: true,
    applied: true,
    summary,
    targetActor,
    targetToken
  };
}

async function spendMachineChaosCriticalEdge({ machineActor = null, operatorActorUuid = "" } = {}) {
  const operator = await resolveMachineOperator({ machineActor, operatorActorUuid });
  if (!operator.actor) {
    if (game.user?.isGM) return { ok: true, gmOverride: true };
    return { ok: false, reason: operator.reason || "No linked operator or pilot actor for Chaos Edge." };
  }

  const pool = TEMPLATE.counters.edgePools.chaos;
  const remaining = Number(operator.actor.getRemainingEdge?.(pool) ?? operator.actor.getEdgePoolValue?.(pool) ?? 0);
  if (remaining <= 0 && !game.user?.isGM) {
    return { ok: false, reason: `${operator.actor.name ?? "Operator"} has no Chaos Edge remaining.` };
  }

  if (remaining > 0) {
    await operator.actor.spendEdge?.(pool, 1, { source: "machineChaosCritical" });
  }
  return { ok: true, operatorActor: operator.actor };
}

async function onToggleMachineChaosCrit(ev, message) {
  ev.preventDefault();
  const btn = ev.target.closest("[data-mwd-action='toggleMachineChaosCrit']");
  const resultIndex = Number(btn?.dataset?.resultIndex ?? -1);
  const resolved = foundry.utils.deepClone(message.getFlag("mwd", "resolved"));
  const result = resolved?.attackResult?.results?.[resultIndex] ?? null;
  const mutation = result?.queuedMutation ?? null;
  if (!mutation || mutation.applied || !isMachineDamageMutation(mutation)) return;

  mutation.payload.chaosCriticalSelected = !Boolean(mutation.payload.chaosCriticalSelected);
  mutation.payload.reliabilitySpendSelections = [];

  const targetActor = getMutationTargetActorUuid(mutation) ? await fromUuid(getMutationTargetActorUuid(mutation)) : null;
  const targetToken = getMutationTargetTokenUuid(mutation) ? await fromUuid(getMutationTargetTokenUuid(mutation)) : null;
  const summary = await rebuildMachineMutationPreview({ mutation, result, targetActor, targetToken });

  result.queuedMutation = mutation;
  result.damageResult = summary;

  const htmlContent = await renderChat({ resolved });
  await message.update({
    content: htmlContent,
    "flags.mwd.resolved": resolved
  });
}

async function onToggleMachineReliabilitySpend(ev, message) {
  ev.preventDefault();
  const btn = ev.target.closest("[data-mwd-action='toggleMachineReliabilitySpend']");
  const resultIndex = Number(btn?.dataset?.resultIndex ?? -1);
  const spendIndex = Number(btn?.dataset?.spendIndex ?? -1);
  if (!Number.isInteger(resultIndex) || resultIndex < 0 || !Number.isInteger(spendIndex) || spendIndex < 0) return;

  const resolved = foundry.utils.deepClone(message.getFlag("mwd", "resolved"));
  const result = resolved?.attackResult?.results?.[resultIndex] ?? null;
  const mutation = result?.queuedMutation ?? null;
  if (!mutation || mutation.applied || !isMachineDamageMutation(mutation)) return;

  const selections = new Set(
    Array.isArray(mutation.payload?.reliabilitySpendSelections)
      ? mutation.payload.reliabilitySpendSelections.map(value => Number(value)).filter(Number.isInteger)
      : []
  );
  if (selections.has(spendIndex)) selections.delete(spendIndex);
  else selections.add(spendIndex);
  mutation.payload.reliabilitySpendSelections = Array.from(selections).sort((left, right) => left - right);

  const targetActor = getMutationTargetActorUuid(mutation) ? await fromUuid(getMutationTargetActorUuid(mutation)) : null;
  const targetToken = getMutationTargetTokenUuid(mutation) ? await fromUuid(getMutationTargetTokenUuid(mutation)) : null;
  const summary = await rebuildMachineMutationPreview({ mutation, result, targetActor, targetToken });

  result.queuedMutation = mutation;
  result.damageResult = summary;

  const htmlContent = await renderChat({ resolved });
  await message.update({
    content: htmlContent,
    "flags.mwd.resolved": resolved
  });
}

async function onMachineCritRemedy(ev, message) {
  ev.preventDefault();
  const btn = ev.target.closest("[data-mwd-action='machineCritRemedy']");
  const request = await prepareMachineRemedyRoll({
    machineActorUuid: btn?.dataset?.machineActorUuid ?? "",
    critId: btn?.dataset?.critId ?? "",
    remedyKey: btn?.dataset?.remedyKey ?? "",
    operatorActorUuid: btn?.dataset?.operatorActorUuid ?? "",
  }, {
    gmOverride: Boolean(game.user?.isGM && btn?.dataset?.gmOverride === "true"),
  });
  if (!request.ok) {
    ui.notifications?.warn?.(request.reason ?? "Unable to launch the machine remedy roll.");
    return;
  }

  const rollApi = game.mwd?.roll ?? game.system?.mwd?.roll;
  if (!rollApi?.execute) {
    ui.notifications?.error?.("MWD roll system not initialized.");
    return;
  }

  await rollApi.execute({
    actor: request.actor,
    payload: request.payload,
    event: ev,
  });
}

async function renderAndPersistHazardMessage(message, card) {
  const targetActor = card?.actorUuid ? await fromUuid(card.actorUuid) : null;
  const targetToken = card?.tokenUuid ? await fromUuid(card.tokenUuid) : null;
  const content = await renderHazardCard(card, { actor: targetActor, token: targetToken });
  await message.update({
    content,
    "flags.mwd.hazardCard": card
  });
  return card;
}

async function updateHazardCard(message, mutateCard) {
  const current = normalizeHazardCard(foundry.utils.deepClone(message?.flags?.mwd?.hazardCard ?? {}));
  if (!current?.actorUuid) return null;
  await mutateCard(current);
  await renderAndPersistHazardMessage(message, current);
  return current;
}

async function setHazardPendingReaction(message, card, { active = false, edgePoolKey = "" } = {}) {
  const targetActor = card?.actorUuid ? await fromUuid(card.actorUuid) : null;
  const targetToken = card?.tokenUuid ? await fromUuid(card.tokenUuid) : null;
  if (!targetActor) return;

  if (!active) {
    const snapshot = PersonalCombatTracker.getSnapshot(targetActor, { token: targetToken });
    const pending = snapshot?.pendingReaction ?? null;
    if (pending?.sourceKind === "hazard" && pending?.messageId === message.id && pending?.sourceId === card?.regionId) {
      await PersonalCombatTracker.clearPendingReaction(targetActor, { token: targetToken });
    }
    return;
  }

  await PersonalCombatTracker.setPendingReaction(targetActor, {
    token: targetToken,
    pendingReaction: {
      type: "evade",
      sourceKind: "hazard",
      sourceId: card?.regionId ?? null,
      messageId: message.id,
      exposureBefore: card?.exposure?.initialTier ?? "none",
      exposureAfterPreview: card?.preview?.finalTier ?? card?.exposure?.initialTier ?? "none",
      edgePoolKey,
      allowCurrentTurn: true,
    }
  });
}

async function onToggleHazardEvade(ev, message) {
  ev.preventDefault();

  const card = await updateHazardCard(message, async (current) => {
    const nextActive = !Boolean(current?.preview?.evadeActive);
    const exposure = applyEvadeToExposure(createExposureData({
      tier: current?.exposure?.initialTier ?? "none",
    }), {
      active: nextActive,
      locked: Boolean(current?.exposure?.evadeLocked),
    });

    current.preview ??= {};
    current.preview.evadeActive = nextActive;
    current.preview.edgePoolKey = null;
    current.preview.finalTier = exposure.finalTier;
    current.damageAfter = scaleDamageByExposure(current.baseDamage ?? 0, exposure.finalTier);
    if (nextActive) {
      const reactionPreview = await buildReactionPreviewForTarget({
        actorUuid: current.actorUuid,
        tokenUuid: current.tokenUuid,
        edgePoolKey: ""
      });
      current.preview.reactionPreview = reactionPreview ? {
        burnDelta: Number(reactionPreview.burnDelta ?? 0),
        canSpendEdge: Boolean(reactionPreview.canSpendEdge),
        edgePools: (reactionPreview.edgePools ?? []).map(pool => ({
          key: pool.key,
          label: pool.label,
          value: pool.value,
        })),
      } : {};
    } else {
      current.preview.reactionPreview = {};
    }
  });

  if (card) {
    await setHazardPendingReaction(message, card, {
      active: Boolean(card?.preview?.evadeActive),
      edgePoolKey: String(card?.preview?.edgePoolKey ?? "").trim(),
    });
  }
}

async function onToggleHazardEvadeEdge(ev, message) {
  ev.preventDefault();

  const btn = ev.target.closest("[data-mwd-action='toggleHazardEvadeEdge']");
  const edgePoolKey = String(btn?.dataset?.poolKey ?? "").trim();

  const card = await updateHazardCard(message, async (current) => {
    current.preview ??= {};
    current.preview.evadeActive = true;
    current.preview.edgePoolKey = current.preview.edgePoolKey === edgePoolKey ? null : edgePoolKey;
    const reactionPreview = await buildReactionPreviewForTarget({
      actorUuid: current.actorUuid,
      tokenUuid: current.tokenUuid,
      edgePoolKey: current.preview.edgePoolKey ?? ""
    });
    current.preview.reactionPreview = reactionPreview ? {
      burnDelta: Number(reactionPreview.burnDelta ?? 0),
      canSpendEdge: Boolean(reactionPreview.canSpendEdge),
      edgePools: (reactionPreview.edgePools ?? []).map(pool => ({
        key: pool.key,
        label: pool.label,
        value: pool.value,
      })),
    } : {};
  });

  if (card) {
    await setHazardPendingReaction(message, card, {
      active: Boolean(card?.preview?.evadeActive),
      edgePoolKey: String(card?.preview?.edgePoolKey ?? "").trim(),
    });
  }
}

async function onApplyHazardTick(ev, message) {
  ev.preventDefault();

  const card = normalizeHazardCard(foundry.utils.deepClone(message?.flags?.mwd?.hazardCard ?? {}));
  if (!card?.actorUuid) return;
  if (card.applied) {
    ui.notifications?.info?.("That hazard has already been applied.");
    return;
  }

  const targetActor = await fromUuid(card.actorUuid);
  const targetToken = card.tokenUuid ? await fromUuid(card.tokenUuid) : null;
  if (!targetActor) {
    ui.notifications?.warn?.("Unable to resolve the hazard target.");
    return;
  }

  if (card.preview?.evadeActive) {
    const spend = await PersonalCombatTracker.commitReactionSpend(targetActor, {
      token: targetToken,
      actionId: "evade",
      actionLabel: "Evade",
      actionCategory: "reaction",
      logLabel: `Evade: ${card.regionName}`,
      edgePoolKey: String(card.preview?.edgePoolKey ?? "").trim(),
      allowCurrentTurn: true,
    });
    if (!spend?.ok) {
      ui.notifications?.warn?.(spend?.reason ?? "Unable to spend the Evade reaction.");
      return;
    }
  }

  const payload = {
    mode: "attackDamage",
    track: TEMPLATE.monitors.physical,
    damage: Number(card.damageAfter ?? card.damageBefore ?? 0) || 0,
    netHits: 0,
    damageType: card.damageType,
    ap: Number(card.ap ?? 0) || 0,
    source: card.source,
    notes: `Hazard exposure ${card.exposure.initialLabel}${card.preview?.evadeActive ? ` -> ${String(card.preview.finalTier ?? card.exposure.initialTier).toUpperCase()}` : ""}`.trim(),
  };

  const applyResult = await HarmEngine.apply({
    actor: targetActor,
    token: targetToken,
    payload,
    options: {
      actorId: targetActor.id,
      logToChat: false
    }
  });

  if (!applyResult?.ok) {
    ui.notifications?.warn?.(applyResult?.reason ?? "Unable to apply hazard damage.");
    return;
  }

  const snapshot = PersonalCombatTracker.getSnapshot(targetActor, { token: targetToken });
  const currentState = snapshot?.hazards?.[card.regionId] ?? {};
  const nextTier = normalizeExposureTier(card.nextTier, card.exposure.finalTier);
  await PersonalCombatTracker.setHazardState(targetActor, {
    token: targetToken,
    regionId: card.regionId,
    hazardState: {
      ...currentState,
      tier: nextTier,
      turnsExposed: Math.max(Number(currentState?.turnsExposed ?? 0), Number(card.turnsExposed ?? 0)) + 1,
      lastProcessedRound: Number(snapshot?.combat?.round ?? 0) || 0,
      evadeLocked: Boolean(currentState?.evadeLocked)
        || Boolean(card.exposure?.initialTier === "full" && card.preview?.finalTier === "major" && card.preview?.evadeActive),
    }
  });

  if (nextTier === "full" && Number(card?.onFullBurnDelta ?? 0) > 0) {
    await targetActor.update({
      "system.burn.value": Math.max(0, Number(targetActor.system?.burn?.value ?? 0) + Number(card.onFullBurnDelta ?? 0))
    });
  }

  await PersonalCombatTracker.clearPendingReaction(targetActor, { token: targetToken });

  card.applied = true;
  card.applyReason = "Applied";
  await renderAndPersistHazardMessage(message, card);

  await createDamageApplicationMessage({
    summary: {
      ok: true,
      actorName: targetActor.name,
      track: applyResult.track,
      finalDamage: Number(applyResult.finalDamage ?? applyResult.appliedDelta ?? 0),
      damageIncoming: Number(applyResult.damageIncoming ?? card.damageAfter ?? 0),
      damageType: applyResult.damageType ?? card.damageType,
      usedArmor: Boolean(applyResult.usedArmor),
      effectiveAp: Number(applyResult.effectiveAp ?? card.ap ?? 0),
      mitigation: applyResult.mitigation ?? null,
      beforeLabel: String(applyResult.beforeLabel ?? "").trim(),
      afterLabel: String(applyResult.afterLabel ?? "").trim(),
      source: card.source,
      notes: `Hazard exposure ${card.exposure.initialLabel}${card.preview?.evadeActive ? ` -> ${String(card.preview.finalTier ?? "").toUpperCase()}` : ""}`
    },
    actor: targetActor,
    token: targetToken
  });
}

export async function activatePendingEvadeFromCombatMenu(actor, { token = null } = {}) {
  const snapshot = PersonalCombatTracker.getSnapshot(actor, { token });
  const pending = snapshot?.pendingReaction ?? null;
  if (!pending?.messageId) {
    return { ok: false, reason: "Use an area effect or hazard card to trigger Evade." };
  }

  const message = getMessageById(pending.messageId);
  if (!message) {
    await PersonalCombatTracker.clearPendingReaction(actor, { token });
    return { ok: false, reason: "The pending Evade card is no longer available." };
  }

  if (pending.sourceKind === "attack") {
    const previewKey = String(pending.sourceId ?? "").trim();
    if (!previewKey) return { ok: false, reason: "Pending Evade target is missing." };
    const resolved = await updateAreaEffectPreview(message, async (nextResolved) => {
      nextResolved.areaEffectPreviewState ??= {};
      nextResolved.areaEffectPreviewState[previewKey] = {
        ...(nextResolved.areaEffectPreviewState[previewKey] ?? {}),
        evadeActive: true,
        edgePoolKey: pending.edgePoolKey ?? null,
      };

      const result = (Array.isArray(nextResolved?.attackResult?.results) ? nextResolved.attackResult.results : [])
        .find(entry => entry?.previewKey === previewKey) ?? null;
      const reactionPreview = result ? await buildEvadeReactionPreview({ ...result, evadeEdgePoolKey: pending.edgePoolKey ?? "" }) : null;
      if (reactionPreview) {
        nextResolved.areaEffectPreviewState[previewKey].reactionPreview = {
          burnDelta: Number(reactionPreview.burnDelta ?? 0),
          canSpendEdge: Boolean(reactionPreview.canSpendEdge),
          edgePools: (reactionPreview.edgePools ?? []).map(pool => ({
            key: pool.key,
            label: pool.label,
            value: pool.value,
          })),
        };
      }
    });

    const updatedResult = (Array.isArray(resolved?.attackResult?.results) ? resolved.attackResult.results : [])
      .find(entry => entry?.previewKey === previewKey) ?? null;
    if (updatedResult) {
      await setAttackPendingReaction(message, updatedResult, {
        active: true,
        edgePoolKey: String(updatedResult?.evadeEdgePoolKey ?? pending.edgePoolKey ?? "").trim(),
      });
    }

    return { ok: true };
  }

  if (pending.sourceKind === "hazard") {
    const card = await updateHazardCard(message, async (current) => {
      const exposure = applyEvadeToExposure(createExposureData({
        tier: current?.exposure?.initialTier ?? "none",
      }), {
        active: true,
        locked: Boolean(current?.exposure?.evadeLocked),
      });
      current.preview ??= {};
      current.preview.evadeActive = true;
      current.preview.edgePoolKey = current.preview.edgePoolKey ?? pending.edgePoolKey ?? null;
      current.preview.finalTier = exposure.finalTier;
      current.damageAfter = scaleDamageByExposure(current.baseDamage ?? 0, exposure.finalTier);
      const reactionPreview = await buildReactionPreviewForTarget({
        actorUuid: current.actorUuid,
        tokenUuid: current.tokenUuid,
        edgePoolKey: current.preview.edgePoolKey ?? ""
      });
      current.preview.reactionPreview = reactionPreview ? {
        burnDelta: Number(reactionPreview.burnDelta ?? 0),
        canSpendEdge: Boolean(reactionPreview.canSpendEdge),
        edgePools: (reactionPreview.edgePools ?? []).map(pool => ({
          key: pool.key,
          label: pool.label,
          value: pool.value,
        })),
      } : {};
    });

    if (card) {
      await setHazardPendingReaction(message, card, {
        active: true,
        edgePoolKey: String(card?.preview?.edgePoolKey ?? pending.edgePoolKey ?? "").trim(),
      });
    }
    return { ok: true };
  }

  return { ok: false, reason: "That Evade source is not supported." };
}

async function onEdgePostReroll(ev, message) {
  ev.preventDefault();

  const btn = ev.target.closest("[data-mwd-action='edgePostReroll']");
  const poolKey = String(btn?.dataset?.poolKey ?? "").trim();
  if (!poolKey) return;

  const resolved = foundry.utils.deepClone(message?.flags?.mwd?.resolved);
  if (!resolved) return;

  if (hasAppliedAttackMutation(resolved)) {
    ui.notifications?.warn?.("Post-roll Edge is disabled after attack damage has been applied.");
    return;
  }

  if (Number(resolved?.edge?.post?.spent ?? 0) === 1) return;

  const allowed = Array.isArray(resolved?.edge?.allowed?.postPools)
    ? resolved.edge.allowed.postPools
    : [];

  if (!allowed.includes(poolKey)) {
    ui.notifications?.warn?.(`Post-spend pool not allowed: ${poolKey}`);
    return;
  }

  const failureRefs = Array.isArray(resolved?.roll?.failureDiceRefs)
    ? resolved.roll.failureDiceRefs
    : [];

  if (failureRefs.length <= 0) {
    ui.notifications?.info?.("No failures to reroll.");
    return;
  }

  const actor = await fromUuid(resolved.actorUuid);
  if (!actor) {
    ui.notifications?.warn?.("Actor not found for this roll.");
    return;
  }

  await actor.spendEdge?.(poolKey, 1);

  const tn = Number(resolved?.roll?.target ?? 5);
  const reroll = await new Roll(`${failureRefs.length}d6cs>=${tn}`).evaluate();
  const term = reroll.dice?.[0];
  const results = Array.isArray(term?.results) ? term.results : [];
  const addHits = results.filter(r => r.success).length;

  resolved.outcome = resolved.outcome ?? {};
  resolved.outcome.hits = Number(resolved.outcome.hits ?? 0) + addHits;

  resolved.edge = resolved.edge ?? {};
  resolved.edge.post = { poolKey, spent: 1 };

  resolved.edge.availableActions = {
    ...(resolved.edge.availableActions ?? {}),
    canSpendPost: false,
    canPostRerollFailures: false
  };

  resolved.roll = resolved.roll ?? {};
  resolved.roll.diceGroups = Array.isArray(resolved.roll.diceGroups) ? resolved.roll.diceGroups : [];
  resolved.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: results.map((r, i) => {
      const face = Number(r.result);
      const isSuccess = Boolean(r.success);
      return {
        ref: `post:${i}`,
        face,
        isSuccess,
        isFailure: !isSuccess,
        tooltip: isSuccess
          ? `Post die ${i + 1}: ${face} (Success vs TN ${tn})`
          : `Post die ${i + 1}: ${face} (Failure vs TN ${tn})`
      };
    })
  });

  await recomputeResolvedOutcomeAndAttack(resolved, actor);

  const htmlContent = await renderChat({ resolved });

  await message.update({
    content: htmlContent,
    "flags.mwd.resolved": resolved,
    "flags.mwd.payload.edge.post": { poolKey, spent: 1 }
  });
}
