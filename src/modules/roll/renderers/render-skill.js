// src/modules/roll/renderers/render-skill.js
// Purpose: Defines function `enhanceSkill`.
// How it fits: Describes role within src/modules or template rendering pipeline.

// modules/roll/renderers/render-skill.js
import { enhancePostEdge } from "./render-edge-post.js";

/**
 * Enhancer for intent="skill".
 * Mutates vm (base card) to add skill-specific meta/actions/footer/edge details.
 */
export function enhanceSkill(resolved, vm) {
  const r = resolved ?? {};

  // ---- Mods summary (as a meta row with tooltip) ----
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

  enhancePostEdge(r, vm, { separator: " - " });
}

function fmt(n) {
  const num = Number(n ?? 0);
  return num >= 0 ? `+${num}` : `${num}`;
}
