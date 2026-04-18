// src/modules/roll/renderers/render-acquire.js
// Enhances acquire roll card with EW contact-state transition details.

import { getContactStateLabel } from "../../mwd/machine-ew.js";

export function enhanceAcquire(resolved, vm) {
  const result = resolved?.ewAcquireResult ?? null;
  const acquire = resolved?.acquire ?? null;

  if (acquire?.currentState) {
    vm.metaRows.push({
      text: `Target State: ${getContactStateLabel(acquire.currentState)}`,
      title: "",
    });
  }

  if (!result) return;

  if (result.ok) {
    vm.outcomeText = `${getContactStateLabel(result.previousState).toUpperCase()} → ${getContactStateLabel(result.newState).toUpperCase()}`;
    vm.footerRows.push({
      text: `Contact: ${getContactStateLabel(result.newState)}`,
      title: "",
    });
    if (result.hitCeiling) {
      vm.footerRows.push({
        text: `Ceiling: ${getContactStateLabel(result.ceiling)} (ECM active)`,
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
