// src/modules/roll/renderers/render-extended.js
// Purpose: Defines function `enhanceExtended`.
// How it fits: Describes role within src/modules or template rendering pipeline.


// modules/roll/renderers/render-extended.js
export function enhanceExtended(resolved, vm) {
  const r = resolved ?? {};
  const om = r?.outcomeModel ?? {};
  const ext = om?.extended ?? null;

  if (!ext) return;
  vm.extended = ext;

  const progress = Number(ext?.progress ?? 0);
  const target = Number(ext?.target ?? 0);
  const remaining = Number(ext?.remaining ?? Math.max(0, target - progress));

  vm.metaRows.push({
    text: `Extended: ${progress}/${target} (Remaining ${remaining})`,
    title: ""
  });

  if (Boolean(ext?.completed)) {
    vm.footerRows.push({ text: `Completed in ${Number(ext?.rounds ?? ext?.attempts ?? 0) || "?"} attempts.` });
  }

  const earned = om?.edgeEarned?.amount > 0 ? om.edgeEarned : null;
  if (earned) vm.footerRows.push({ text: `Edge Earned: +${earned.amount}${earned.pool ? ` (${earned.pool})` : ""}` });
}
