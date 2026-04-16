// src/modules/roll/renderers/render-machine-remedy.js
// Purpose: Machine remedy roll card enhancer.
// How it fits: Adds machine- and remedy-specific context to the shared roll card.

export function enhanceMachineRemedy(resolved, vm) {
  const remedy = resolved?.machineRemedy ?? null;
  const result = resolved?.machineRemedyResult ?? null;
  if (!remedy) return;

  vm.metaRows.push({
    text: `Problem: ${remedy.critLabel}${remedy.locationLabel ? ` | ${remedy.locationLabel}` : ""}`,
    title: "",
  });
  vm.metaRows.push({
    text: `Pool: Reliability + ${remedy.skillLabel}`,
    title: "",
  });
  vm.footerRows.push({
    text: `DN ${Number(remedy.baseDn ?? 0)} base + ${Number(remedy.conditionModifier ?? 0)} condition (${remedy.conditionLabel})`,
    title: "",
  });

  if (!result) return;

  if (result.ok && result.passed && result.applied) {
    vm.outcomeText = "REMEDY SUCCESS!";
    vm.footerRows.push({
      text: `${remedy.remedyLabel} cleared ${remedy.critLabel}.`,
      title: "",
    });
    return;
  }

  if (result.ok && !result.passed) {
    vm.outcomeText = "REMEDY FAILED";
    vm.footerRows.push({
      text: `${remedy.critLabel} remains active.`,
      title: "",
    });
    return;
  }

  if (!result.ok) {
    vm.footerRows.push({
      text: result.reason ?? "Machine remedy could not be applied.",
      title: "",
    });
  }
}
