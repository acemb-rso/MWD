// src/modules/modifiers/providers/asset-module-effects.js
// Purpose: Emits dice-pool modifiers from data-driven AssetModule effects.
// How it fits: Keeps module-authored dice effects on the same provider rail as
// machine state, EW targeting data, traits, and scene modifiers.

import { getApplicableAssetModuleEffects } from "../../mwd/asset-module-effects.js";
import { isMachineActor } from "../../utils/actor-guards.js";

export class AssetModuleEffectsProvider {
  id = "mwd.assetModuleEffects";
  label = "Asset Module Effects";

  collect({ actor, resolved, payload, context } = {}) {
    if (!isMachineActor(actor)) return [];

    const { effects } = getApplicableAssetModuleEffects(actor, { resolved, payload, context });
    return effects
      .filter(effect => Number(effect.modifies?.dice ?? 0))
      .map(effect => ({
        id: `assetModule.${effect.sourceId}.${effect.id}.dice`,
        label: effect.label,
        value: Number(effect.modifies?.dice ?? 0) || 0,
        source: effect.sourceName || "Asset Module",
      }));
  }
}
