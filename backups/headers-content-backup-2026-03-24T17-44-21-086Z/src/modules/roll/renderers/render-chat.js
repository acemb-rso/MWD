// src/modules/roll/renderers/render-chat.js
// Purpose: System module or client script for render-chat. Integrates with the system's JavaScript modules.

// modules/roll/renderers/render-chat.js
import { enhanceSkill } from "./render-skill.js";
import { enhanceNet } from "./render-net.js";
import { enhanceOpposed } from "./render-opposed.js";
import { enhanceExtended } from "./render-extended.js";
// import { enhanceDefense } from "./render-defense.js";
// import { enhanceEdge } from "./render-edge.js";

const ENHANCERS = {
  skill: enhanceSkill,
  net: enhanceNet,
  opposed: enhanceOpposed,
  extended: enhanceExtended,
  // defense: enhanceDefense,
  // edge: enhanceEdge,
};

export async function renderChat({ resolved } = {}) {
  const r = resolved ?? {};
  const vm = buildBaseCardVM(r);

  const fn = ENHANCERS[vm.intent];
  if (typeof fn === "function") fn(r, vm);

  return await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-roll-card",
    vm
  );
}

function buildBaseCardVM(resolved) {
  const r = resolved ?? {};

  const tn   = Number(r?.roll?.target ?? 5);
  const dn   = Number(r?.ctxSnapshot?.difficulty?.dn ?? 0);
  const pool = Number(r?.roll?.pool ?? 0);
  const hits = Number(r?.outcome?.hits ?? 0);

  const om = r?.outcomeModel ?? {};
  const passed = (typeof om.passed === "boolean") ? om.passed : (hits >= dn);
  const margin = Number.isFinite(Number(om.margin)) ? Number(om.margin) : (hits - dn);
  const tier   = om.tier ?? null;

  const breakdownTooltip = Array.isArray(r?.breakdownRows)
    ? r.breakdownRows.map(x => `${x.label}: ${x.value}`).join("\n")
    : "";

  return {
    header: { left: r?.title ?? "Roll", right: r?.subtitle ?? "" },
    intent: r?.intent ?? "unknown",
    domains: Array.isArray(r?.domains) ? r.domains : [],

    tn, dn, pool, hits,
    passed, margin, tier,

    breakdownTooltip,

    metaRows: [],
    actions: [],
    footerRows: [],

    incoming: null,
    edge: null,
    net: null,
    opposed: null,
    extended: null,
  };
}
