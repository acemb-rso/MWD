// src/modules/roll/renderers/render-acquire.js
// Enhances acquire roll card with EW detection-state transition details.

import { getDetectionStateLabel } from "../../mwd/machine-ew.js";
import { enhancePostEdge } from "./render-edge-post.js";

export function enhanceAcquire(resolved, vm) {
  const result = resolved?.ewAcquireResult ?? null;
  const acquire = resolved?.acquire ?? null;

  if (acquire?.currentState) {
    vm.metaRows.push({
      text: `Target State: ${getDetectionStateLabel(acquire.currentState)}`,
      title: "",
    });
  }

  const stealthParts = (Array.isArray(resolved?.dn?.parts) ? resolved.dn.parts : [])
    .filter(part => Array.isArray(part?.tags) && part.tags.includes("stealth"));
  if (stealthParts.length) {
    vm.metaRows.push({
      text: `Stealth: ${stealthParts.map(part => `${part.label} ${part.displayValue ?? fmt(part.value)}`).join(", ")}`,
      title: "",
    });
  }

  enhancePostEdge(resolved, vm);

  if (!result) return;

  if (result.ok) {
    vm.outcomeText = `${getDetectionStateLabel(result.previousState).toUpperCase()} → ${getDetectionStateLabel(result.newState).toUpperCase()}`;
    vm.footerRows.push({
      text: `Detection: ${getDetectionStateLabel(result.newState)}`,
      title: "",
    });
    if (result.hitCeiling) {
      vm.footerRows.push({
        text: `Ceiling: ${getDetectionStateLabel(result.ceiling)} (ECM active)`,
        title: "",
      });
    }
  } else {
    vm.outcomeText = "ACQUIRE FAILED";
    vm.footerRows.push({
      text: result.reason ?? "Acquire roll failed — state unchanged.",
      title: "",
    });
  }
}

function fmt(value) {
  const numeric = Number(value ?? 0) || 0;
  if (numeric > 0) return `+${numeric}`;
  if (numeric < 0) return String(numeric);
  return "0";
}
