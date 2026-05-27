// src/modules/roll/renderers/render-skill.js
// Purpose: Defines function `enhanceSkill`.
// How it fits: Describes role within src/modules or template rendering pipeline.

// modules/roll/renderers/render-skill.js
import { enhancePostEdge } from "./render-edge-post.js";
import {
  isFirstAidPayload,
  summarizeFirstAidForChat,
} from "../../mwd/first-aid.js";

/**
 * Enhancer for intent="skill".
 * Mutates vm (base card) to add skill-specific meta/actions/footer/edge details.
 */
export function enhanceSkill(resolved, vm) {
  let r = resolved ?? {};
  const firstAid = summarizeFirstAidForChat(r);

  if (firstAid?.applied && r.edge?.availableActions) {
    r = foundry.utils.deepClone(r);
    r.edge.availableActions.canSpendPost = false;
    r.edge.availableActions.canPostRerollFailures = false;
  }

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

  if (isFirstAidPayload(r?.originPayload ?? {})) {
    enhanceFirstAid(r, vm, firstAid);
  }
}

function enhanceFirstAid(_resolved, vm, firstAid) {
  if (!firstAid) return;

  const targetName = firstAid.targetName || "Target";
  const trackLabel = firstAid.trackLabel || "Track";
  const conditionLabel = firstAid.conditionLabel || "Conditions";
  const equipmentText = firstAid.equipmentRating > 0
    ? ` | Equipment +${Number(firstAid.equipmentRating ?? 0)}${firstAid.equipmentName ? ` (${firstAid.equipmentName})` : ""}`
    : "";
  const selfText = firstAid.selfTreatment ? " | Self -2" : "";

  vm.metaRows.push({
    text: `First Aid: ${targetName} | ${trackLabel} | ${conditionLabel}${equipmentText}${selfText}`,
    title: ""
  });

  if (firstAid.applied) {
    const result = firstAid.result ?? {};
    vm.footerRows.push({
      text: `First Aid applied: recovered ${Number(result.recovered ?? 0)} ${trackLabel} (${Number(result.before ?? 0)} -> ${Number(result.after ?? 0)})`,
      title: ""
    });
    return;
  }

  vm.footerRows.push({
    text: `First Aid recovery: ${Number(firstAid.netHits ?? 0)} net hit${Number(firstAid.netHits ?? 0) === 1 ? "" : "s"} -> ${Number(firstAid.requestedRecovery ?? 0)} ${trackLabel}`,
    title: ""
  });

  vm.actions.push({
    action: "applyFirstAid",
    label: "Apply First Aid",
    cssClass: "mwd-apply-first-aid",
    disabled: Number(firstAid.requestedRecovery ?? 0) <= 0,
    title: Number(firstAid.requestedRecovery ?? 0) <= 0 ? "No recovery from this result." : "",
  });
}

function fmt(n) {
  const num = Number(n ?? 0);
  return num >= 0 ? `+${num}` : `${num}`;
}
