// src/modules/modifiers/providers/traits.js
// Purpose: Contributes quality-backed trait roll modifiers through the shared provider pipeline.
// How it fits: Keeps trait roll effects inspectable and resolved from declarative item data.

import { evaluateTraitPhase, buildRollTraitFacts } from "../../mwd/traits.js";

export class TraitModifiersProvider {
  id = "mwd.traits";
  label = "Traits";

  collect({ actor, resolved, payload } = {}) {
    if (!actor) return [];

    const runtime = {
      snapshot: game.mwd?.personalCombat?.getSnapshot?.(actor) ?? null,
    };

    return evaluateTraitPhase({
      actor,
      phase: "onBuildRoll",
      facts: buildRollTraitFacts({ actor, resolved, payload, runtime }),
      packet: {},
      options: { runtime, consumeUsage: false },
    }).modifiers;
  }
}
