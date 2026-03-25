// src/modules/roll/renderers/render-net.js
// Purpose: System module or client script for render-net. Integrates with the system's JavaScript modules.

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
    vm.footerRows.push({
      text: `Edge Earned: +${earned.amount}${earned.pool ? ` (${earned.pool})` : ""}`,
      title: earned.reason ?? ""
    });
  }
}
