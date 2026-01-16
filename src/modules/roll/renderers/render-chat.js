// modules/roll/renderers/render-chat.js
import { renderSkill } from "./render-skill.js";

/**
 * Router renderer.
 * Keeps the call-site stable: renderChat({ resolved })
 */
export function renderChat({ resolved } = {}) {
  const intent = resolved?.originPayload?.intent ?? resolved?.intent ?? null;

  switch (intent) {
    case "skill":
      return renderSkill({ resolved });

    // future: attribute/attack/defense/resistance
    default:
      return renderFallback({ resolved });
  }
}

function renderFallback({ resolved } = {}) {
  const title = escapeHtml(resolved?.title ?? "Roll");
  const pool = Number(resolved?.roll?.pool ?? 0);
  const target = Number(resolved?.roll?.target ?? 5);
  const hits = Number(resolved?.outcome?.hits ?? 0);

  return `
  <div class="mwd-chat-roll mwd-chat-roll--fallback">
    <header><b>${title}</b></header>
    <hr/>
    <div><b>Pool:</b> ${pool} vs <b>TN</b> ${target}</div>
    <div><b>Hits:</b> ${hits}</div>
  </div>`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
