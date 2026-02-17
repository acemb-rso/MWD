// src/modules/roll/mwd-roll.js
import { resolveIntent } from "./intent/resolve-intent.js";
import { collectModifiers } from "./collect-modifiers.js";
import { buildResolved } from "./build-resolved.js";
import { renderChat } from "./renderers/render-chat.js";
import { getSkillDef } from "../mwd/skills.js";
import { MWDRollDialog } from "./mwd-roll-dialog.js";
import { interpretOutcome } from "./outcome/interpret-outcome.js";


/**
 * Public roll API.
 * Sheets call: game.mwd.roll.execute({ actor, payload, event, quick })
 */
export const MWDRoll = { execute };

function normalizeManualMods(payload) {
  const rows = Array.isArray(payload?.manualModifiers) ? payload.manualModifiers : [];
  const mods = rows
    .map(r => ({
      id: r.id ?? foundry.utils.randomID(),
      label: (r.label ?? "Manual").trim() || "Manual",
      value: Number(r.value ?? 0),
      source: "Manual"
    }))
    .filter(m => Number.isFinite(m.value) && m.value !== 0);

  const total = mods.reduce((a, m) => a + m.value, 0);
  return { mods, total };
}

function normalizePayload(payload = {}) {
  const toggles = payload.toggles ?? {};

  return {
    ...payload,
    toggles: {
      useEdge: !!toggles.useEdge,
      takeRisks: !!toggles.takeRisks,
      opponentRoll: !!toggles.opponentRoll
    },
    manualModifiers: normalizeManualModifierRows(payload.manualModifiers)
  };
}

function normalizeManualModifierRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map(r => ({
    id: r?.id ?? foundry.utils.randomID(),
    label: typeof r?.label === "string" ? r.label : "Manual",
    value: Number(r?.value ?? 0)
  }));
}

async function execute({ actor, payload, event, quick = false } = {}) {
  console.log("MWD.roll.execute reached - quick: ", { quick })
  // Allow token docs/objects to be passed accidentally
  if (actor?.actor) actor = actor.actor;
  if (actor?.document?.actor) actor = actor.document.actor;

  if (!actor) throw new Error("MWD.roll.execute requires actor");
  if (!payload?.intent) throw new Error("MWD.roll.execute requires payload.intent");
  payload = normalizePayload(payload);

  /* -------------------------------- */
  /* 1) Resolve intent (always first) */
  /* -------------------------------- */

  const ctx = await resolveIntent({ actor, payload, event });

  /* --------------------------------------------------- */
  /* 2) Collect modifiers (items, status, etc — no UI)  */
  /* --------------------------------------------------- */

  const collected = await collectModifiers({
    actor,
    rollType: payload.intent,
    skillId: payload.key,
    domains: ctx.domains,
    payload,
    resolved: ctx,
    context: { event, quick }
  });

  /* -------------------------------------- */
  /* 3) Dialog fork (BEFORE rolling)         */
  /* -------------------------------------- */

  if (shouldOpenDialog({ payload, quick })) {
    const updatedPayload = await MWDRollDialog.prompt({
      actor,
      basePayload: payload,
      resolved: ctx,
      diceParts: {
        attribute: ctx?.pool?.attribute ?? 0,
        skill: ctx.pool?.skill ?? 0,
        bonus: ctx.pool?.bonus ?? 0
      },
      mods: collected.mods,
      modTotal: collected.total
    });


    // Cancel = abort roll entirely
    if (!updatedPayload) return null;

    // Re-enter engine with edited payload; force quick to avoid loop
    return execute({
      actor,
      payload: updatedPayload,
      event,
      quick: true
    });
  }

  /* -------------------------------- */
  /* 4) Final modifier collection     */
  /*    (now includes manual mods)    */
  /* -------------------------------- */

  const { mods: providerMods, total: providerTotal } = collected;

  // Manual mods come from the payload editor (dialog)
  const { mods: manualMods, total: manualTotal } = normalizeManualMods(payload);

  // Final mods used for roll + chat
  const mods = [...providerMods, ...manualMods];
  const modTotal = Number(providerTotal ?? 0) + Number(manualTotal ?? 0);

  const basePool =
  Number(ctx?.pool?.attribute ?? 0) +
  Number(ctx?.pool?.skill ?? 0) +
  Number(ctx?.pool?.bonus ?? 0);

  const pool = Math.max(0, basePool + Number(modTotal ?? 0));


  /* --------------------------- */
  /* 5) Edge + target number    */
  /* --------------------------- */

  const edgeInfo = computeEdgeInfo({ actor, ctx, payload });
  const diceTarget = edgeInfo.pre.spent ? 4 : Number(ctx.diceTarget ?? ctx.target ?? 5);

  // Spend pre-edge (once) before rolling
  if (edgeInfo?.pre?.spent && edgeInfo?.pre?.poolKey) {
    await actor.spendEdge?.(edgeInfo.pre.poolKey, 1);
  }


  /* --------------------------- */
  /* 6) Roll dice (once)        */
  /* --------------------------- */

  const roll = await new Roll(`${pool}d6cs>=${diceTarget}`).evaluate();
  const dice = roll.dice?.[0];

  const hits = Array.isArray(dice?.results)
    ? dice.results.filter(r => r.success).length
    : 0;

  const ones = Array.isArray(dice?.results)
    ? dice.results.filter(r => r.result === 1).length
    : 0;

  /* -------------------------------- */
  /* 6.5) Interpret roll outcome      */
  /* -------------------------------- */

  const outcomeModel = interpretOutcome(
    ctx,
    { successes: hits, raw: roll?.toJSON?.() },
    null // opposed rolls can pass defender result later
  );

  /* --------------------------- */
  /* 7) Build resolved payload  */
  /* --------------------------- */

  const resolved = buildResolved({
    actor,
    payload,
    ctx,
    roll,
    target: diceTarget,
    pool,
    mods,
    modTotal,
    hits,
    ones,
    edge: edgeInfo,
    outcomeModel
  });

  /* --------------------------- */
  /* 8) Render chat             */
  /* --------------------------- */

  const html = await renderChat({ resolved });

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: html,
    flags: {
      mwd: {
        payload,
        resolved
      }
    }
  });
}


/* ----------------------------- */
/* Edge computation (MVP local) */
/* ----------------------------- */

function computeEdgeInfo({ actor, ctx, payload }) {
  const domain = pickEdgeDomain(ctx?.domains);
  const pair = EDGE_POOLS_BY_DOMAIN[domain] ?? null;

  const a = pair?.a ?? null;
  const b = pair?.b ?? null;

  const allowedPrePools = [a, b].filter(Boolean);

  // ---- PRE ----
  const wantsPre = Boolean(payload?.toggles?.useEdge) || Boolean(payload?.useEdge);
  let prePoolKey = String(payload?.edge?.pre?.poolKey ?? "").trim() || null;

  // validate pre poolKey against domain
  if (prePoolKey && !allowedPrePools.includes(prePoolKey)) prePoolKey = null;

  // pre spent is driven by "wantsPre" AND having a valid poolKey
  const preSpent = wantsPre && prePoolKey ? 1 : 0;

  // ---- POST (Option B) ----
  // if preSpent, post must be the other pool; else user can choose either later.
  let allowedPostPools = [...allowedPrePools];
  if (preSpent && prePoolKey) allowedPostPools = allowedPostPools.filter(k => k !== prePoolKey);

  // keep payload-selected post if present (used by chat post actions)
  let postPoolKey = String(payload?.edge?.post?.poolKey ?? "").trim() || null;
  if (postPoolKey && !allowedPostPools.includes(postPoolKey)) postPoolKey = null;

  const postSpent = Number(payload?.edge?.post?.spent ?? 0) ? 1 : 0;

  return {
    domain,
    pools: pair ? { a, b } : null,
    pre: { poolKey: prePoolKey, spent: preSpent },
    post: { poolKey: postPoolKey, spent: postSpent },
    allowed: { prePools: allowedPrePools, postPools: allowedPostPools }
  };
}


function pickEdgeDomain(domains) {
  if (!Array.isArray(domains)) return null;
  if (domains.includes("physical")) return "physical";
  if (domains.includes("mental")) return "mental";
  if (domains.includes("social")) return "social";
  return null;
}

const EDGE_POOLS_BY_DOMAIN = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};

function shouldOpenDialog({ payload, quick }) {
  if (quick) return false;

  // Later you can refine this:
  // - payload.mode === "quick"
  // - attacks always open dialog
  // - GM setting
  return true;
}

