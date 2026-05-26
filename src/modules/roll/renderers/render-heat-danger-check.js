// src/modules/roll/renderers/render-heat-danger-check.js
// Purpose: Adds BattleMech heat danger outcome details to roll cards.
// How it fits: Keeps Shutdown and Explosion checks readable after sheet buttons roll them.

export function enhanceHeatDangerCheck(resolved, vm) {
  const check = resolved?.heatDangerCheck ?? null;
  if (!check) return;
  const result = resolved?.heatDangerResult ?? null;

  vm.metaRows.push({
    text: `Danger Level ${Number(check.dangerLevel ?? 0)} | Pool ${Number(check.pool ?? 0)}d6 vs DN ${Number(check.dn ?? 0)}`,
    title: "",
  });

  if (check.kind === "shutdown" && result?.systemOpsRating !== null && result?.systemOpsRating !== undefined) {
    const operator = result.operatorName ? `${result.operatorName} ` : "";
    vm.metaRows.push({
      text: `${operator}System Operations ${Number(result.systemOpsRating ?? 0)}`,
      title: "",
    });
  }

  if (check.kind === "explosion" && !check.volatile) {
    vm.metaRows.push({
      text: "No volatile components detected.",
      title: "",
    });
  }

  if (result) {
    applyResolvedOutcome(check, result, vm);
    return;
  }

  if (vm.passed) {
    vm.outcomeText = check.kind === "shutdown" ? "SHUTDOWN AVOIDED" : "EXPLOSION AVOIDED";
    vm.footerRows.push({ text: check.successText, title: "" });
    return;
  }

  vm.outcomeText = check.kind === "shutdown" ? "SHUTDOWN CHECK FAILED" : "EXPLOSION CHECK FAILED";
  vm.footerRows.push({ text: check.failureText, title: "" });
}

function applyResolvedOutcome(check, result, vm) {
  if (check.kind === "shutdown") {
    applyShutdownOutcome(result, vm);
    return;
  }

  applyExplosionOutcome(result, vm);
}

function applyShutdownOutcome(result, vm) {
  if (result.passed) {
    vm.outcomeText = "SHUTDOWN AVOIDED";
  } else if (result.overrideAvailable) {
    vm.outcomeText = "SHUTDOWN OVERRIDE AVAILABLE";
  } else {
    vm.outcomeText = "SHUTDOWN APPLIED";
  }

  if (!result.passed) {
    vm.metaRows.push({
      text: `Failure Margin ${Number(result.failureMargin ?? 0)}`,
      title: "",
    });
  }

  if (result.statusApplied || result.statusAlreadyActive) {
    vm.metaRows.push({
      text: "Shutdown status active.",
      title: "",
    });
  }

  if (result.effectText) vm.footerRows.push({ text: result.effectText, title: "" });
  if (result.nextStep) vm.footerRows.push({ text: result.nextStep, title: "" });
}

function applyExplosionOutcome(result, vm) {
  if (result.passed) {
    vm.outcomeText = "EXPLOSION AVOIDED";
  } else if (result.explosionTriggered) {
    vm.outcomeText = "EXPLOSION TRIGGERED";
  } else {
    vm.outcomeText = "EXPLOSION NOT APPLIED";
  }

  if (!result.passed) {
    vm.metaRows.push({
      text: `Failure Margin ${Number(result.failureMargin ?? 0)}`,
      title: "",
    });
  }

  if (result.effectText) vm.footerRows.push({ text: result.effectText, title: "" });
  if (result.nextStep) vm.footerRows.push({ text: result.nextStep, title: "" });
}
