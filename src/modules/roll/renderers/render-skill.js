// modules/roll/renderers/render-skill.js

export function renderSkill({ resolved } = {}) {
  const title = escapeHtml(resolved?.title ?? "Skill Roll");
  const subtitle = escapeHtml(resolved?.subtitle ?? "");
  const pool = Number(resolved?.roll?.pool ?? 0);
  const target = Number(resolved?.roll?.target ?? 5);
  const hits = Number(resolved?.outcome?.hits ?? 0);

  const breakdownRows = Array.isArray(resolved?.breakdownRows) ? resolved.breakdownRows : [];
  const modsApplied = Array.isArray(resolved?.modifiers?.applied) ? resolved.modifiers.applied : [];
  const modTotal = Number(resolved?.modifiers?.total ?? 0);

  const poolRowsHtml = breakdownRows
    .filter(r => String(r.id ?? "").startsWith("pool."))
    .map(r => rowHtml(r))
    .join("");

  const modsRow = breakdownRows.find(r => r.id === "mods.total");
  const modsHtml = modsApplied.length
    ? `<div class="mwd-chat-roll__mods" title="${escapeHtml(modsRow?.tooltip ?? "")}">
         <b>Mods:</b>
         ${modsApplied.map(m => `${escapeHtml(m.label)} ${fmt(m.value)}`).join(", ")}
         <span class="muted">(Total ${fmt(modTotal)})</span>
       </div>`
    : "";

  const edge = resolved?.edge;
  const edgeHtml = edge?.domain
    ? `<div class="mwd-chat-roll__edge muted">
         <b>Edge:</b> ${escapeHtml(edge.domain)}
         &nbsp; pre=${escapeHtml(edge.pre?.poolKey ?? "—")}(${Number(edge.pre?.spent ?? 0)})
         &nbsp; post=${escapeHtml(edge.post?.poolKey ?? "—")}(${Number(edge.post?.spent ?? 0)})
       </div>`
    : "";

  return `
  <div class="mwd-chat-roll mwd-chat-roll--skill" data-intent="skill">
    <header>
      <div><b>${title}</b></div>
      <div class="muted">${subtitle}</div>
    </header>

    <hr/>

    <div class="mwd-chat-roll__summary">
      <div><b>Pool:</b> ${pool} vs <b>TN</b> ${target}</div>
      <div><b>Hits:</b> ${hits}</div>
    </div>

    <div class="mwd-chat-roll__breakdown">
      ${poolRowsHtml}
    </div>

    ${modsHtml}
    ${edgeHtml}
  </div>`;
}

function rowHtml(r) {
  const label = escapeHtml(r?.label ?? "");
  const tooltip = escapeHtml(r?.tooltip ?? "");
  const value = Number(r?.value ?? 0);
  return `<div class="mwd-chat-roll__row" title="${tooltip}"><b>${label}</b>: ${value}</div>`;
}

function fmt(n) {
  const num = Number(n ?? 0);
  return num >= 0 ? `+${num}` : `${num}`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
