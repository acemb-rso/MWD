// src/modules/chat/chat-actions.js
// Purpose: Registers Foundry hooks: renderChatMessageHTML.
// How it fits: Wires chat-card post-roll and queued attack mutation actions.

import { TEMPLATE } from "../core/constants.js";
import { getPersonalDamageTypeLabel } from "../mwd/personal-damage.js";
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
import { buildMachineCriticalChatSummary } from "../mwd/machine-crit-effects.js";
import { applyFirstAidRecovery } from "../mwd/first-aid.js";
import { applyManagedStatusUpdate } from "../dialog/token-status-dialog.js";

export function registerMWDChatActions() {
  Hooks.on("renderChatMessageHTML", (message, htmlElement) => {
    htmlElement.addEventListener("click", (ev) => {
      const btn = ev.target.closest("[data-mwd-action]");
      if (!btn) return;

      const action = String(btn.dataset.mwdAction || "").trim();
      if (!action) return;

      if (action === "toggleDice") { btn.closest(".mwd-roll-card")?.classList.toggle("is-dice-open"); return; }
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
      if (action === "applySuppression") void onApplySuppression(ev, message);
      if (action === "applyAllSuppression") void onApplyAllSuppression(ev, message);
      if (action === "applyFirstAid") void onApplyFirstAid(ev, message);
    });
  });
}

function getHarmService() {
  return game.mwd?.harm ?? game.system?.mwd?.harm ?? null;
}

function getRollService() {
  return game.mwd?.roll ?? game.system?.mwd?.roll ?? null;
}

function getMachineActionService() {
  return game.mwd?.machineActions ?? game.system?.mwd?.machineActions ?? null;
}

function isMachineDamageMutation(mutation = {}) {
  return Boolean(getHarmService()?.isMachineDamageMutation?.(mutation));
}

function getMutationTargetActorUuid(mutation = {}) {
  return getHarmService()?.getMutationTargetActorUuid?.(mutation) ?? null;
}

function getMutationTargetTokenUuid(mutation = {}) {
  return getHarmService()?.getMutationTargetTokenUuid?.(mutation) ?? null;
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

function getAppliedDamageBreakdown(summary = {}) {
  const machine = summary?.machine ?? summary?.damagePreview?.machine ?? null;
  if (machine) {
    const armor = Math.max(0, Number(machine.armorAbsorbed ?? 0) || 0);
    const structure = Math.max(0, Number(machine.structureDamage ?? summary?.finalDamage ?? summary?.appliedDelta ?? 0) || 0);
    return {
      isMachine: true,
      armor,
      structure,
      total: armor + structure,
    };
  }

  const battleArmor = summary?.battleArmor ?? null;
  if (battleArmor) {
    const armor = Math.max(0, Number(battleArmor.armorAbsorbed ?? 0) || 0);
    const structure = Math.max(0, Number(
      battleArmor.structureDamage
      ?? (Number(battleArmor.structureBefore ?? 0) - Number(battleArmor.structureAfter ?? 0))
    ) || 0);
    const wearer = Math.max(0, Number(battleArmor.wearerDamage ?? summary?.finalDamage ?? summary?.appliedDelta ?? 0) || 0);
    return {
      isMachine: false,
      isBattleArmor: true,
      armor,
      structure,
      wearer,
      total: armor + structure + wearer,
    };
  }

  const total = Math.max(0, Number(summary?.finalDamage ?? summary?.appliedDelta ?? 0) || 0);
  return {
    isMachine: false,
    isBattleArmor: false,
    armor: 0,
    structure: total,
    wearer: total,
    total,
  };
}

function formatDamagePoints(amount) {
  const value = Math.max(0, Number(amount ?? 0) || 0);
  return value === 1 ? "1 point" : `${value} points`;
}

function buildDamageImpactText({ damageTypeLabel = "Damage", trackLabel = "Track", breakdown = {} } = {}) {
  const total = Math.max(0, Number(breakdown.total ?? 0) || 0);
  if (total <= 0) return `${damageTypeLabel} damage did not affect the target.`;

  if (breakdown.isMachine) {
    const parts = [];
    if (breakdown.armor > 0) parts.push(`${formatDamagePoints(breakdown.armor)} to armor`);
    if (breakdown.structure > 0) parts.push(`${formatDamagePoints(breakdown.structure)} to structure`);
    if (parts.length) return `${damageTypeLabel} damage applied: ${parts.join(", ")}.`;
  }

  if (breakdown.isBattleArmor) {
    const parts = [];
    if (breakdown.armor > 0) parts.push(`${formatDamagePoints(breakdown.armor)} to battle armor`);
    if (breakdown.structure > 0) parts.push(`${formatDamagePoints(breakdown.structure)} to battle armor structure`);
    if (breakdown.wearer > 0) parts.push(`${formatDamagePoints(breakdown.wearer)} to ${trackLabel}`);
    if (parts.length) return `${damageTypeLabel} damage applied: ${parts.join(", ")}.`;
  }

  return `${damageTypeLabel} damage applied to ${trackLabel}.`;
}

function formatMonitorValue(current, max) {
  return `${Math.max(0, Number(current ?? 0) || 0)}/${Math.max(0, Number(max ?? 0) || 0)}`;
}

function buildMachineMonitorRows(machine = null) {
  if (!machine) return [];
  return [
    {
      label: "Armor",
      value: `${formatMonitorValue(machine.armorBefore, machine.armorMax)} -> ${formatMonitorValue(machine.armorAfter, machine.armorMax)}`,
      class: "is-monitor"
    },
    {
      label: "Structure",
      value: `${formatMonitorValue(machine.structureBefore, machine.structureMax)} -> ${formatMonitorValue(machine.structureAfter, machine.structureMax)}`,
      class: "is-monitor"
    }
  ];
}

function buildBattleArmorMonitorRows(battleArmor = null) {
  if (!battleArmor) return [];
  const armorMax = Math.max(
    0,
    Number(battleArmor.armorPoolMax ?? battleArmor.armorMax ?? battleArmor.armorBefore ?? battleArmor.armorAfter ?? 0) || 0
  );
  const structureMax = Math.max(
    0,
    Number(battleArmor.structureMax ?? battleArmor.structureBefore ?? battleArmor.structureAfter ?? 0) || 0
  );
  return [
    {
      label: "Battle Armor",
      value: `${formatMonitorValue(battleArmor.armorBefore, armorMax)} -> ${formatMonitorValue(battleArmor.armorAfter, armorMax)}`,
      class: "is-monitor"
    },
    {
      label: "BA Structure",
      value: `${formatMonitorValue(battleArmor.structureBefore, structureMax)} -> ${formatMonitorValue(battleArmor.structureAfter, structureMax)}`,
      class: "is-monitor"
    }
  ];
}

function getHitLocationLabel(hitLocation = null) {
  if (!hitLocation || typeof hitLocation !== "object") return "";
  const impactLabel = String(hitLocation.impactLabel ?? hitLocation.locationLabel ?? "").trim();
  const rulesLabel = String(hitLocation.rulesLocationLabel ?? "").trim();
  if (impactLabel && rulesLabel && impactLabel !== rulesLabel) return `${impactLabel} (${rulesLabel})`;
  return impactLabel || rulesLabel || String(hitLocation.locationKey ?? hitLocation.rulesLocation ?? "").trim();
}

function formatSignedAmount(amount) {
  const value = Number(amount ?? 0) || 0;
  if (value > 0) return `+${value}`;
  return String(value);
}

function getStressDeltaTotal(summary = {}, machine = null) {
  const entries = Object.values(summary?.degradation?.stressDelta ?? {});
  if (entries.length) {
    return entries.reduce((sum, value) => sum + Number(value ?? 0), 0);
  }
  return Number(machine?.locationStressGain ?? 0) || 0;
}

function getShockDelta(summary = {}) {
  if (Number.isFinite(Number(summary?.degradation?.shockDelta))) return Number(summary.degradation.shockDelta);
  const before = Number(summary?.degradation?.summary?.shockBefore);
  const after = Number(summary?.degradation?.summary?.shockAfter);
  if (Number.isFinite(before) && Number.isFinite(after)) return after - before;
  return 0;
}

function formatClusterRoll(summary = {}) {
  const clustering = summary?.attackDamage?.clustering ?? null;
  const dice = Math.max(0, Number(clustering?.dice ?? 0) || 0);
  if (!dice) return "";

  const targetNumber = Number(clustering?.targetNumber ?? 5) || 5;
  const hits = Math.max(0, Number(clustering?.hits ?? clustering?.damageBonus ?? 0) || 0);
  const resultText = Array.isArray(clustering?.results) && clustering.results.length
    ? ` (${clustering.results.map(entry => Number(entry?.result ?? 0) || 0).join(", ")})`
    : "";
  return `${dice}d6 @ ${targetNumber}+ -> ${hits} hit${hits === 1 ? "" : "s"}${resultText}`;
}

function buildCriticalInfo(summary = {}) {
  const criticalRecords = Array.isArray(summary?.critical?.records) ? summary.critical.records : [];
  if (criticalRecords.length) {
    return criticalRecords
      .map(crit => `${crit.label}${crit.locationLabel ? ` (${crit.locationLabel})` : ""}: ${buildMachineCriticalChatSummary(crit)}`)
      .join(" ; ");
  }
  if (summary?.critical?.drawOk === false) {
    return String(summary.critical.reason ?? "Critical effect was not resolved.").trim();
  }
  return "None";
}

function getPortraitSource({ actor = null, token = null } = {}) {
  const tokenDoc = token?.document ?? token ?? null;
  const tokenTexture = String(tokenDoc?.texture?.src ?? "").trim();
  const actorImage = String(actor?.img ?? "").trim();
  return tokenTexture || actorImage || "icons/svg/mystery-man.svg";
}

function applyChatVisibility(chatData) {
  const rollMode = game.settings?.get?.("core", "messageMode");
  if (typeof ChatMessage.applyMode === "function") {
    ChatMessage.applyMode(chatData, rollMode);
  }
  return chatData;
}

// Landed personal criticals deserve a prominent banner on the applied-damage
// card (the attack card keeps only a faint threat line). Machine criticals are
// already surfaced through their own detail row, so this stays personal-only.
function buildPersonalCriticalCards(summary = {}) {
  if (summary?.mode === "machineAttackDamage" || summary?.machine) return [];
  const records = Array.isArray(summary?.critical?.records) ? summary.critical.records : [];
  return records
    .map(record => {
      const label = String(
        record?.label ?? `${record?.familyLabel ?? ""} ${record?.bandRoman ?? ""}`
      ).trim();
      if (!label) return null;
      const remedyKey = String(record?.remedyKey ?? "").trim();
      const remedyLabel = String(record?.remedyLabel ?? "").trim();
      const remedyDn = Math.max(0, Number(record?.remedyBaseDn ?? 0) || 0);
      return {
        label,
        effectText: String(record?.effectText ?? "").trim(),
        remedy: remedyLabel && remedyKey !== "none"
          ? `${remedyLabel}${remedyDn ? ` (DN ${remedyDn})` : ""}`
          : ""
      };
    })
    .filter(Boolean);
}

function buildDamageApplicationCardVM({ summary = {}, actor = null, token = null } = {}) {
  const damageType = String(summary?.damageType ?? "").trim();
  const damageTypeLabel = getPersonalDamageTypeLabel(damageType || "concussive") || "Damage";
  const trackLabel = getTrackLabel(summary?.track);
  const appliedDamage = getAppliedDamageBreakdown(summary);
  const severity = getDamageSeverity(appliedDamage.total);
  const appliedAmountLabel = formatDamagePoints(appliedDamage.total);
  const targetName = String(summary?.actorName ?? actor?.name ?? "Target").trim() || "Target";
  const rows = [];
  const machine = summary?.machine ?? summary?.damagePreview?.machine ?? null;
  const battleArmor = summary?.battleArmor ?? null;

  const machineMonitorRows = buildMachineMonitorRows(machine);
  const battleArmorMonitorRows = buildBattleArmorMonitorRows(battleArmor);
  if (machineMonitorRows.length) {
    rows.push(...machineMonitorRows);
  } else if (battleArmorMonitorRows.length) {
    rows.push(...battleArmorMonitorRows);
    if (summary?.beforeLabel && summary?.afterLabel) {
      rows.push({
        label: "Wearer",
        value: `${summary.beforeLabel} -> ${summary.afterLabel}`,
        class: "is-monitor"
      });
    }
  } else if (summary?.beforeLabel && summary?.afterLabel) {
    rows.push({
      label: "Monitor",
      value: `${summary.beforeLabel} -> ${summary.afterLabel}`,
      class: "is-monitor"
    });
  }

  if (appliedDamage.isMachine) {
    const hitLocationLabel = getHitLocationLabel(summary?.hitLocation);
    if (hitLocationLabel) {
      rows.push({
        label: "Hit Location",
        value: hitLocationLabel
      });
    }
  }

  rows.push({
    label: "Applied Damage",
    value: appliedAmountLabel
  });

  const clusterRoll = formatClusterRoll(summary);
  if (clusterRoll) {
    rows.push({
      label: "Cluster Roll",
      value: clusterRoll
    });
  }

  if (appliedDamage.isMachine) {
    rows.push({
      label: "Shock",
      value: formatSignedAmount(getShockDelta(summary))
    });

    rows.push({
      label: "Location Stress",
      value: formatSignedAmount(getStressDeltaTotal(summary, machine))
    });

    rows.push({
      label: "Critical",
      value: buildCriticalInfo(summary)
    });
  }

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

  return {
    classes: ["mwd-damage-card", getDamageTypeTheme(damageType), severity.key].join(" "),
    header: {
      left: "Damage Applied",
      right: appliedDamage.isBattleArmor ? "Battle Armor" : trackLabel
    },
    target: {
      name: targetName,
      image: getPortraitSource({ actor, token })
    },
    damageTypeLabel,
    severityLabel: severity.label,
    impactValue: appliedDamage.total,
    impactText: buildDamageImpactText({ damageTypeLabel, trackLabel, breakdown: appliedDamage }),
    criticals: buildPersonalCriticalCards(summary),
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

async function onApplyAttackDamage(ev, message) {
  ev.preventDefault();

  const btn = ev.target.closest("[data-mwd-action='applyAttackDamage']");
  const resultIndex = Number(btn?.dataset?.resultIndex);
  if (!Number.isInteger(resultIndex) || resultIndex < 0) return;

  const result = await getHarmService()?.applyQueuedAttackDamageFromMessage?.({ message, resultIndex });
  if (!result.ok) {
    ui.notifications?.warn?.(result.userMessage ?? result.reason ?? "Unable to apply attack damage.");
    return;
  }
  if (result.skipped) {
    ui.notifications?.info?.(result.userMessage ?? result.reason ?? "That attack damage has already been applied.");
    return;
  }

  await message.update(result.updateData);

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
  const rollService = getRollService();
  if (!rollService?.recomputeResolvedOutcomeAndAttack) throw new Error("MWD roll recompute service not initialized.");
  await rollService.recomputeResolvedOutcomeAndAttack(resolved, actor);

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
  const preview = PersonalCombatTracker.getReactionSpendPreview(targetActor, { token: targetToken, edgePoolKey });
  if (active && preview?.disabled) return;

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
        disabled: Boolean(reactionPreview.disabled),
        reason: String(reactionPreview.reason ?? ""),
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
        disabled: Boolean(reactionPreview.disabled),
        reason: String(reactionPreview.reason ?? ""),
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

  const result = await getHarmService()?.applyAllQueuedAttackDamageFromMessage?.({ message });
  if (!result?.ok) {
    const notify = result?.reason === "none-pending" ? "info" : "warn";
    ui.notifications?.[notify]?.(result?.userMessage ?? result?.reason ?? "Unable to apply queued attack damage.");
    return;
  }

  await message.update(result.updateData);

  for (const appliedResult of result.appliedResults ?? []) {
    await createDamageApplicationMessage({
      summary: appliedResult.summary,
      actor: appliedResult.targetActor,
      token: appliedResult.targetToken
    });
  }

  if (result.failures?.length) {
    ui.notifications?.warn?.(`Applied ${result.applied} queued damage result${result.applied === 1 ? "" : "s"}; ${result.failures.length} failed.`);
  }
}

async function applySuppressionResult(resolved, resultIndex) {
  const results = Array.isArray(resolved?.attackResult?.results) ? resolved.attackResult.results : [];
  const result = results[resultIndex] ?? null;
  if (!result?.suppression?.pending || result?.suppression?.applied) return { ok: false, reason: "No pending suppression effect." };

  const targetActor = result?.target?.actorUuid ? await fromUuid(result.target.actorUuid) : null;
  if (!targetActor) return { ok: false, reason: "Unable to resolve suppression target." };

  const applied = await applyManagedStatusUpdate({
    actor: targetActor,
    statusId: result.suppression.statusId ?? "suppressed",
    active: true,
    metadata: result.suppression.metadata ?? { source: "suppressionFire" },
  });

  result.suppression.applied = Boolean(applied);
  result.suppression.pending = !applied;
  return { ok: Boolean(applied), result, targetActor };
}

async function rerenderResolvedMessage(message, resolved) {
  const htmlContent = await renderChat({ resolved });
  await message.update({
    content: htmlContent,
    "flags.mwd.resolved": resolved
  });
}

async function onApplySuppression(ev, message) {
  ev.preventDefault();

  const btn = ev.target.closest("[data-mwd-action='applySuppression']");
  const resultIndex = Number(btn?.dataset?.resultIndex);
  if (!Number.isInteger(resultIndex) || resultIndex < 0) return;

  const resolved = foundry.utils.deepClone(message?.getFlag?.("mwd", "resolved") ?? message?.flags?.mwd?.resolved);
  if (!resolved) return;

  const result = await applySuppressionResult(resolved, resultIndex);
  if (!result.ok) {
    ui.notifications?.warn?.(result.reason ?? "Unable to apply suppression.");
    return;
  }

  await rerenderResolvedMessage(message, resolved);
}

async function onApplyAllSuppression(ev, message) {
  ev.preventDefault();

  const resolved = foundry.utils.deepClone(message?.getFlag?.("mwd", "resolved") ?? message?.flags?.mwd?.resolved);
  if (!resolved) return;

  const results = Array.isArray(resolved?.attackResult?.results) ? resolved.attackResult.results : [];
  let applied = 0;
  for (let index = 0; index < results.length; index += 1) {
    const result = await applySuppressionResult(resolved, index);
    if (result.ok) applied += 1;
  }

  if (!applied) {
    ui.notifications?.info?.("No pending suppression effects.");
    return;
  }

  await rerenderResolvedMessage(message, resolved);
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
  const preview = await getHarmService()?.rebuildQueuedAttackDamagePreview?.({ mutation, result, targetActor, targetToken });
  if (!preview?.ok) return;
  const summary = preview.summary;

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
  const preview = await getHarmService()?.rebuildQueuedAttackDamagePreview?.({ mutation, result, targetActor, targetToken });
  if (!preview?.ok) return;
  const summary = preview.summary;

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
  const machineActorUuid = String(btn?.dataset?.machineActorUuid ?? "").trim();
  const machineActor = machineActorUuid ? await fromUuid(machineActorUuid) : null;
  if (!machineActor) {
    ui.notifications?.warn?.("Machine actor could not be resolved.");
    return;
  }

  const result = await getMachineActionService()?.execute?.(machineActor, {
    kind: "repair",
    issueKind: "crit",
    issueId: btn?.dataset?.critId ?? "",
    critId: btn?.dataset?.critId ?? "",
    remedyKey: btn?.dataset?.remedyKey ?? "",
    operatorActorUuid: btn?.dataset?.operatorActorUuid ?? "",
    gmOverride: Boolean(game.user?.isGM && btn?.dataset?.gmOverride === "true"),
    event: ev,
  });
  if (!result?.ok) {
    ui.notifications?.warn?.(result?.userMessage ?? result?.reason ?? "Unable to launch the machine remedy roll.");
    return;
  }
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
  const preview = PersonalCombatTracker.getReactionSpendPreview(targetActor, { token: targetToken, edgePoolKey });
  if (active && preview?.disabled) return;

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
        disabled: Boolean(reactionPreview.disabled),
        reason: String(reactionPreview.reason ?? ""),
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
      disabled: Boolean(reactionPreview.disabled),
      reason: String(reactionPreview.reason ?? ""),
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

  const applyResult = await getHarmService()?.apply?.({
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
          disabled: Boolean(reactionPreview.disabled),
          reason: String(reactionPreview.reason ?? ""),
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

  const result = await getRollService()?.applyPostRerollFailures?.({ message, poolKey });
  if (!result?.ok) {
    const notify = result?.reason === "no-failures" ? "info" : "warn";
    ui.notifications?.[notify]?.(result?.userMessage ?? result?.reason ?? "Unable to spend post-roll Edge.");
    return;
  }

  await message.update(result.updateData);
}

async function onApplyFirstAid(ev, message) {
  ev.preventDefault();

  const resolved = foundry.utils.deepClone(message?.flags?.mwd?.resolved);
  if (!resolved) {
    ui.notifications?.warn("Roll data is no longer available.");
    return;
  }

  const result = await applyFirstAidRecovery(resolved);
  if (!result?.ok) {
    const notify = result?.reason === "First Aid has already been applied." ? "info" : "warn";
    ui.notifications?.[notify]?.(result?.reason ?? "Unable to apply First Aid.");
    return;
  }

  resolved.firstAidResult = result;
  if (resolved.edge?.availableActions) {
    resolved.edge.availableActions.canSpendPost = false;
    resolved.edge.availableActions.canPostRerollFailures = false;
  }

  const content = await renderChat({ resolved });
  await message.update({
    content,
    "flags.mwd.resolved": resolved,
  });

  ui.notifications?.info?.(`Recovered ${Number(result.recovered ?? 0)} ${result.trackLabel ?? "damage"} for ${result.targetName ?? "target"}.`);
}
