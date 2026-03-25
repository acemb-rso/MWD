// src/modules/chat/chat-actions.js
import { renderChat } from "../roll/renderers/render-chat.js";

export function registerMWDChatActions() {
  Hooks.on("renderChatMessageHTML", (message, htmlElement) => {
    htmlElement.addEventListener("click", (ev) => {
      const btn = ev.target.closest("[data-mwd-action]");
      if (!btn) return;

      const action = String(btn.dataset.mwdAction || "").trim();
      if (!action) return;

      if (action === "edgePostReroll") onEdgePostReroll(ev, message);
    });
  });
}

async function onEdgePostReroll(ev, message) {
  ev.preventDefault();

  const btn = ev.target.closest("[data-mwd-action='edgePostReroll']");
  const poolKey = String(btn?.dataset?.poolKey ?? "").trim();
  if (!poolKey) return;

  const resolved = foundry.utils.deepClone(message?.flags?.mwd?.resolved);
  if (!resolved) return;

  // already spent post? ignore
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

  // Actor lookup
  const actor = await fromUuid(resolved.actorUuid);
  if (!actor) {
    ui.notifications?.warn?.("Actor not found for this roll.");
    return;
  }

  // Spend 1 Edge from selected pool (should clamp/validate internally)
  await actor.spendEdge?.(poolKey, 1);

  // Reroll failures (TN is roll target)
  const tn = Number(resolved?.roll?.target ?? 5);
  const reroll = await new Roll(`${failureRefs.length}d6cs>=${tn}`).evaluate();
  const term = reroll.dice?.[0];
  const results = Array.isArray(term?.results) ? term.results : [];
  const addHits = results.filter(r => r.success).length;

  // Update resolved model
  resolved.outcome = resolved.outcome ?? {};
  resolved.outcome.hits = Number(resolved.outcome.hits ?? 0) + addHits;

  // mark post spend + disable further post actions
  resolved.edge = resolved.edge ?? {};
  resolved.edge.post = { poolKey, spent: 1 };

  resolved.edge.availableActions = {
    ...(resolved.edge.availableActions ?? {}),
    canSpendPost: false,
    canPostRerollFailures: false
  };

  // Optional: record reroll dice as an extra diceGroup for future UI
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

  // ✅ IMPORTANT: await renderChat (async)
  const htmlContent = await renderChat({ resolved });

  await message.update({
    content: htmlContent,
    "flags.mwd.resolved": resolved,
    "flags.mwd.payload.edge.post": { poolKey, spent: 1 }
  });
}
