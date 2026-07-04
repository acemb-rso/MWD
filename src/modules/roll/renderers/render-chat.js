// src/modules/roll/renderers/render-chat.js
/**
 * @pipeline ui-emitter
 * @role Chat renderer. Builds the base card view-model from the resolved payload,
 *   then applies the per-intent enhancer (skill/attack/net/opposed/…) via the
 *   ENHANCERS registry to produce the final chat card. Final step (8) of execute().
 * @invariants
 *   - INVARIANT(boundary): chat is a stateless view. This renders already-resolved
 *     data — it must not compute pools, apply modifiers, or decide outcomes.
 *     Buttons on the card emit new intents; they never re-run logic (§1.3, §5).
 *   - INVARIANT(canonical): a new intent gets rendered by adding an ENHANCERS
 *     entry — presentation is data entry, not a new pipeline (§2.2, §4.2).
 * @upstream   build-resolved.js (the model), mwd-roll.js execute() (step 8)
 * @downstream render-skill/attack/net/opposed/… (per-intent card enhancers)
 */

import { enhanceSkill } from "./render-skill.js";
import { enhanceAttack } from "./render-attack.js";
import { enhanceNet } from "./render-net.js";
import { enhanceOpposed } from "./render-opposed.js";
import { enhanceExtended } from "./render-extended.js";
import { enhanceMachineRemedy } from "./render-machine-remedy.js";
import { enhanceHeatDangerCheck } from "./render-heat-danger-check.js";
import { enhanceAcquire } from "./render-acquire.js";
import { enhanceTargeting } from "./render-targeting.js";
import { enhanceSpotIndirect } from "./render-spot-indirect.js";
import { getPersonalRangeBandName } from "../../mwd/personal-range-bands.js";
// import { enhanceDefense } from "./render-defense.js";
// import { enhanceEdge } from "./render-edge.js";

const ENHANCERS = {
  skill: enhanceSkill,
  attack: enhanceAttack,
  net: enhanceNet,
  opposed: enhanceOpposed,
  extended: enhanceExtended,
  machineRemedy: enhanceMachineRemedy,
  heatDangerCheck: enhanceHeatDangerCheck,
  acquire: enhanceAcquire,
  targeting: enhanceTargeting,
  spotIndirect: enhanceSpotIndirect,
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
  const dn   = Number(r?.dn?.total ?? r?.ctxSnapshot?.dn?.total ?? r?.ctxSnapshot?.difficulty?.dn ?? 0);
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

    diceGroups: Array.isArray(r?.roll?.diceGroups) ? r.roll.diceGroups : [],

    metaRows: [],
    targetRows: [],
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
    const rangeBand = (attack?.weapon?.type === "personalWeapon" || attack?.weapon?.isSynthetic)
      ? getPersonalRangeBandName(attack?.rangeBand ?? "")
      : String(attack?.rangeBand ?? "").trim();
    const damageType = String(attack?.weapon?.damageTypeLabel ?? attack?.weapon?.damageType ?? "").trim();
    const payloadLabel = String(attack?.payload?.label ?? attack?.weapon?.payloadLabel ?? "").trim();
    const fireModeLabel = String(attack?.fireMode?.label ?? "").trim();
    vm.metaRows.push({
      text: `Weapon: ${attack.weapon.name}${rangeBand ? ` • Range: ${rangeBand}` : ""}${damageType ? ` • Type: ${damageType}` : ""}${payloadLabel ? ` • Payload: ${payloadLabel}` : ""}`,
      title: ""
    });
    if (fireModeLabel) {
      vm.metaRows.push({
        text: `Mode: ${fireModeLabel}`,
        title: ""
      });
    }
    if (attack?.attackOptions?.hotLoad) {
      vm.metaRows.push({
        text: "Hot Load: minimum arming distance overridden",
        title: ""
      });
    }
    if (attack?.sourceState?.isTracked) {
      vm.footerRows.push({
        text: `Source: ${Number(attack.sourceState.current ?? 0)}/${Number(attack.sourceState.max ?? 0)}`,
        title: ""
      });
    }
  }

  return vm;
}
