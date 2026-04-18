// src/modules/roll/renderers/render-targeting.js
// Enhances targeting-data roll card with packet value and cap details.

export function enhanceTargeting(resolved, vm) {
  const result = resolved?.ewTargetingResult ?? null;
  const targeting = resolved?.targeting ?? null;

  if (targeting?.contactStateLabel) {
    vm.metaRows.push({
      text: `State: ${targeting.contactStateLabel} | Cap: ${Number(targeting.cap ?? 0)}`,
      title: "",
    });
  }

  if (!result) return;

  if (result.ok) {
    const capped = result.rawHits !== result.packetValue;
    vm.outcomeText = `+${result.packetValue} dice${capped ? ` (capped from ${result.rawHits})` : ""}`;
    vm.footerRows.push({
      text: `Targeting data stored: +${result.packetValue} dice`,
      title: "",
    });
    if (result.hitCap) {
      vm.footerRows.push({
        text: `Packet capped at ${result.packetValue} (raw: ${result.rawHits})`,
        title: "",
      });
    }
  } else {
    vm.outcomeText = "TARGETING FAILED";
    vm.footerRows.push({
      text: result.reason ?? "Targeting roll failed — no data stored.",
      title: "",
    });
  }
}
