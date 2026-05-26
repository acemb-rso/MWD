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
