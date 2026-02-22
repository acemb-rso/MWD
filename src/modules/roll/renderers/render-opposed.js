// modules/roll/renderers/render-opposed.js
export function enhanceOpposed(resolved, vm) {
  const r = resolved ?? {};
  const om = r?.outcomeModel ?? {};

  // Common opposed models expose attacker/defender/net
  const atk = Number(om?.attacker?.successes ?? om?.attackerHits ?? NaN);
  const def = Number(om?.defender?.successes ?? om?.defenderHits ?? NaN);
  const net = Number(om?.netHits ?? om?.net ?? NaN);

  if (Number.isFinite(atk) && Number.isFinite(def)) {
    vm.metaRows.push({ text: `Opposed: Att ${atk} vs Def ${def} • Net ${Number.isFinite(net) ? net : (atk - def)}` });
  }

  // Optional incoming line
  if (r?.incoming?.label) {
    vm.incoming = { label: r.incoming.label, value: r.incoming.value ?? "" };
    vm.footerRows.push({ text: `Incoming: ${vm.incoming.label} ${vm.incoming.value}` });
  }

  const earned = om?.edgeEarned?.amount > 0 ? om.edgeEarned : null;
  if (earned) vm.footerRows.push({ text: `Edge Earned: +${earned.amount}${earned.pool ? ` (${earned.pool})` : ""}` });
}