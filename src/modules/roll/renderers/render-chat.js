// src/modules/roll/renderers/render-chat.js
// Purpose: Renders Handlebars templates at runtime.
// How it fits: Describes role within src/modules or template rendering pipeline.


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

  const vm = {
    header: { left: r?.title ?? "Roll", right: r?.subtitle ?? "" },
    formula: String(r?.formula ?? "").trim(),
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

  const attack = r?.attack ?? null;
  if (r?.specialization?.label) {
    vm.metaRows.push({
      text: `Specialization: ${r.specialization.label} (+${Number(r.specialization.value ?? 0)})`,
      title: ""
    });
  }
  if (attack?.weapon?.name) {
    const rangeBand = String(attack?.rangeBand ?? "").trim();
    const damageType = String(attack?.weapon?.damageTypeLabel ?? attack?.weapon?.damageType ?? "").trim();
    const payloadLabel = String(attack?.payload?.label ?? attack?.weapon?.payloadLabel ?? "").trim();
    vm.metaRows.push({
      text: `Weapon: ${attack.weapon.name}${rangeBand ? ` • Range: ${rangeBand}` : ""}${damageType ? ` • Type: ${damageType}` : ""}${payloadLabel ? ` • Payload: ${payloadLabel}` : ""}`,
      title: ""
    });
    if (attack?.sourceState?.isTracked) {
      vm.footerRows.push({
        text: `Source: ${Number(attack.sourceState.current ?? 0)}/${Number(attack.sourceState.max ?? 0)}`,
        title: ""
      });
    }
  }

  return vm;
}
