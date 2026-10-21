// src/modules/roll/renderers/render-net.js
// Purpose: Defines function `enhanceNet`.
// How it fits: Describes role within src/modules or template rendering pipeline.


// modules/roll/renderers/render-net.js
export function enhanceNet(resolved, vm) {
  const r = resolved ?? {};
  const om = r?.outcomeModel ?? {};
  const net = om?.net ?? null; // assuming interpret-net returns { net: {...} }

  if (!net) return;

  vm.net = net;

  // compact meta row
  const converted = Number(net?.converted ?? 0);
  const value = Number(net?.value ?? 0);
  const rate = Number(net?.rate ?? 4);
  vm.metaRows.push({
    text: `Net: ${value} • Converted: ${converted} • Rate: ${rate}`,
    title: ""
  });

  // edge earned visibility
  const earned = om?.edgeEarned?.amount > 0 ? om.edgeEarned : null;
  if (earned) {
    const targetLabel = earned.targetLabel ?? earned.pool ?? (Array.isArray(earned.pools) ? earned.pools.join(", ") : "");
    vm.footerRows.push({
      text: `Edge Earned: +${earned.amount}${targetLabel ? ` (${targetLabel})` : ""}`,
      title: earned.reason ?? ""
    });
  }
}
