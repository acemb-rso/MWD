// src/modules/chat/chat-actions.js
// Purpose: Registers Foundry hooks: renderChatMessageHTML.
// How it fits: Wires chat-card post-roll and queued attack mutation actions.

import { HarmEngine } from "../harm/harm-engine.js";
import { resolveAttackExecution, summarizeAttackDamageResult } from "../roll/attack-resolution.js";
import { interpretOutcome } from "../roll/outcome/interpret-outcome.js";
import { renderChat } from "../roll/renderers/render-chat.js";

export function registerMWDChatActions() {
  Hooks.on("renderChatMessageHTML", (message, htmlElement) => {
    htmlElement.addEventListener("click", (ev) => {
      const btn = ev.target.closest("[data-mwd-action]");
      if (!btn) return;

      const action = String(btn.dataset.mwdAction || "").trim();
      if (!action) return;

      if (action === "edgePostReroll") void onEdgePostReroll(ev, message);
      if (action === "applyAttackDamage") void onApplyAttackDamage(ev, message);
    });
  });
}

function hasAppliedAttackMutation(resolved = {}) {
  const results = Array.isArray(resolved?.attackResult?.results) ? resolved.attackResult.results : [];
  return results.some(result => Boolean(result?.queuedMutation?.applied));
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
      outcomeModel: resolved.outcomeModel
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

  const result = resolved?.attackResult?.results?.[resultIndex] ?? null;
  const mutation = result?.queuedMutation ?? null;
  if (!mutation) {
    ui.notifications?.warn?.("No queued attack damage to apply.");
    return;
  }
  if (mutation.applied) {
    ui.notifications?.info?.("That attack damage has already been applied.");
    return;
  }

  let applyResult = null;
  try {
    const targetActor = mutation.target?.actorUuid ? await fromUuid(mutation.target.actorUuid) : null;
    const targetToken = mutation.target?.tokenUuid ? await fromUuid(mutation.target.tokenUuid) : null;
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
    ui.notifications?.warn?.("Unable to apply attack damage to that target.");
    return;
  }

  const summary = summarizeAttackDamageResult(
    applyResult,
    result?.target ?? mutation.target ?? {},
    result?.damage ?? {},
    { queued: false, applied: Boolean(applyResult?.ok) }
  );

  if (!applyResult?.ok) {
    ui.notifications?.warn?.(summary.reason ?? "Unable to apply attack damage.");
    return;
  }

  mutation.applied = true;
  mutation.appliedResult = summary;
  result.queuedMutation = mutation;
  result.damageResult = summary;

  resolved.edge ??= {};
  resolved.edge.availableActions = {
    ...(resolved.edge.availableActions ?? {}),
    canSpendPost: false,
    canPostRerollFailures: false
  };

  const htmlContent = await renderChat({ resolved });
  await message.update({
    content: htmlContent,
    "flags.mwd.resolved": resolved
  });
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
