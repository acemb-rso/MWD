// src/modules/roll/renderers/render-spot-indirect.js
// Enhances the Spot for Indirect Fire roll card. Success records a short-lived
// designation that lets allied units fire indirectly at a target they cannot see.

import { enhancePostEdge } from "./render-edge-post.js";

export function enhanceSpotIndirect(resolved, vm) {
  const result = resolved?.spotIndirectResult ?? null;
  const spot = resolved?.spotIndirect ?? null;

  if (spot?.targetName) {
    vm.metaRows.push({ text: `Target: ${spot.targetName}`, title: "" });
  }

  enhancePostEdge(resolved, vm);

  if (!result) return;

  if (result.ok) {
    vm.outcomeText = "SPOTTED";
    vm.footerRows.push({
      text: "Allied units may fire indirectly at this target until your next turn.",
      title: "",
    });
  } else {
    vm.outcomeText = "SPOT FAILED";
    vm.footerRows.push({
      text: result.reason ?? "Spot roll failed — no designation recorded.",
      title: "",
    });
  }
}
