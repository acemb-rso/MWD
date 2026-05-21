// src/modules/mwd/asset-module-hooks.js
// Purpose: Shared hook names for asset-module runtime participation.
// How it fits: Owning subsystems dispatch these hooks at lifecycle points;
// asset-module handlers subscribe without owning heat, EW, or harm flow.

export const ASSET_MODULE_HOOKS = Object.freeze({
  ew: Object.freeze({
    beforeAcquireSolution: "mwd.beforeAcquireSolution",
    afterAcquireSolution: "mwd.afterAcquireSolution",
    beforeGenerateTargetingData: "mwd.beforeGenerateTargetingData",
    afterGenerateTargetingData: "mwd.afterGenerateTargetingData",
    beforeAttackTargeting: "mwd.beforeAttackTargeting",
    consumeTargetingData: "mwd.consumeTargetingData",
    suppressTargetingNetwork: "mwd.suppressTargetingNetwork",
  }),
  harm: Object.freeze({
    beforeMachineDamagePreview: "mwd.beforeMachineDamagePreview",
    beforeMachineDamageApply: "mwd.beforeMachineDamageApply",
    afterMachineDamageApply: "mwd.afterMachineDamageApply",
    beforePilotDamageApply: "mwd.beforePilotDamageApply",
    beforeCatastrophicEventApply: "mwd.beforeCatastrophicEventApply",
  }),
  heat: Object.freeze({
    collectHeatProfile: "mwd.collectHeatProfile",
    beforeHeatGenerated: "mwd.beforeHeatGenerated",
    afterHeatGenerated: "mwd.afterHeatGenerated",
    beforeHeatDissipation: "mwd.beforeHeatDissipation",
    afterHeatDissipation: "mwd.afterHeatDissipation",
    beforeDangerCheck: "mwd.beforeDangerCheck",
  }),
});

export function dispatchAssetModuleHook(hookName = "", context = {}) {
  const name = String(hookName ?? "").trim();
  if (!name || !globalThis.Hooks) return true;
  if (typeof globalThis.Hooks.call === "function") return globalThis.Hooks.call(name, context);
  if (typeof globalThis.Hooks.callAll === "function") {
    globalThis.Hooks.callAll(name, context);
    return true;
  }
  return true;
}
