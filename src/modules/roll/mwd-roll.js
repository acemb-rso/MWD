// src/modules/roll/mwd-roll.js
import { getSkillDef } from "../mwd/skills.js"; // adjust path if your skills.js is elsewhere

/**
 * Public roll API.
 * Sheets call: game.mwd.roll.execute({ actor, payload, event, quick })
 */
export const MWDRoll = {
  execute
};

async function execute({ actor, payload, event, quick = false } = {}) {
  if (!actor) throw new Error("MWD.roll.execute requires actor");
  if (!payload?.intent) throw new Error("MWD.roll.execute requires payload.intent");

  // Later: if (!quick && shouldOpenDialog(payload)) return openDialog(...)
  // For now: always immediate.

  const ctx = await resolveIntent({ actor, payload, event });

  // Roll-time modifiers (MVP): payload.modifiers only; providers later.
  const mods = normalizeModifiers(payload?.modifiers);
  const modTotal = sumModifiers(mods);

  const pool = Math.max(0, Number(ctx.pool ?? 0) + modTotal);

  // Edge/target rules (MVP): default target 5; if payload.edge?.enabled then 4
  const target = payload?.edge?.enabled ? 4 : (ctx.target ?? 5);

  const roll = await new Roll(`${pool}d6`).evaluate({ async: true });

  const hits = countHits(roll, target);
  const ones = countOnes(roll);

  const html = renderSimpleChat({
    actor,
    title: ctx.title,
    subtitle: ctx.subtitle,
    pool,
    target,
    hits,
    ones,
    breakdown: ctx.breakdown,
    mods,
    modTotal
  });

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: html,
    flags: {
      mwd: {
        payload,
        resolved: { ...ctx, pool, target, hits, ones, mods, modTotal }
      }
    }
  });
}

/* ----------------------------- */
/* Intent resolution (now: skill) */
/* ----------------------------- */

async function resolveIntent({ actor, payload }) {
  switch (payload.intent) {
    case "skill":
      return resolveSkill({ actor, payload });
    // next:
    // case "attribute": return resolveAttribute(...)
    // case "defense": ...
    // case "resistance": ...
    // case "mech": ...
    default:
      throw new Error(`Unsupported roll intent: ${payload.intent}`);
  }
}

function resolveSkill({ actor, payload }) {
  const code = payload.key;
  const def = getSkillDef(code);
  if (!def) throw new Error(`Unknown skill: ${code}`);

  const sys = actor.system ?? {};
  const attrKey = def.attribute;
  const base = Number(sys?.attributes?.[attrKey]?.value ?? 0);
  const rating = Number(sys?.skills?.[code]?.rating ?? 0);
  const bonus = Number(sys?.skills?.[code]?.bonus ?? 0);

  const pool = base + rating + bonus;

  return {
    title: `${def.label} (${attrKey})`,
    subtitle: actor.name ?? "Actor",
    pool,
    target: 5,
    breakdown: { base, rating, bonus }
  };
}

/* ----------------------------- */
/* Modifiers (roll-time MVP)     */
/* ----------------------------- */

function normalizeModifiers(mods) {
  if (!Array.isArray(mods)) return [];
  return mods
    .map(m => ({
      key: String(m?.key ?? "mod"),
      label: String(m?.label ?? m?.key ?? "Modifier"),
      value: Number(m?.value ?? 0)
    }))
    .filter(m => Number.isFinite(m.value) && m.value !== 0);
}

function sumModifiers(mods) {
  return mods.reduce((n, m) => n + m.value, 0);
}

/* ----------------------------- */
/* Dice helpers                  */
/* ----------------------------- */

function countHits(roll, target) {
  let hits = 0;
  for (const term of roll.terms) {
    if (!term?.results) continue;
    for (const r of term.results) {
      const v = Number(r.result);
      if (Number.isFinite(v) && v >= target) hits++;
    }
  }
  return hits;
}

function countOnes(roll) {
  let ones = 0;
  for (const term of roll.terms) {
    if (!term?.results) continue;
    for (const r of term.results) {
      if (Number(r.result) === 1) ones++;
    }
  }
  return ones;
}

/* ----------------------------- */
/* Chat (MVP — swap to legacy HBS later) */
/* ----------------------------- */

function renderSimpleChat({ actor, title, subtitle, pool, target, hits, breakdown, mods, modTotal }) {
  const modLine = mods.length
    ? `<div><b>Mods:</b> ${mods.map(m => `${escapeHtml(m.label)} ${fmt(m.value)}`).join(", ")} (Total ${fmt(modTotal)})</div>`
    : "";

  return `
  <div class="mwd-chat-roll">
    <header>
      <div><b>${escapeHtml(title)}</b></div>
      <div class="muted">${escapeHtml(subtitle ?? "")}</div>
    </header>
    <hr/>
    <div><b>Pool:</b> ${pool} vs <b>TN</b> ${target}</div>
    <div><b>Hits:</b> ${hits}</div>
    <div class="mwd-chat-roll__breakdown">
      <div><b>Base</b>: ${breakdown?.base ?? 0}</div>
      <div><b>Rating</b>: ${breakdown?.rating ?? 0}</div>
      <div><b>Bonus</b>: ${breakdown?.bonus ?? 0}</div>
    </div>
    ${modLine}
  </div>`;
}

function fmt(n) {
  return n >= 0 ? `+${n}` : `${n}`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
