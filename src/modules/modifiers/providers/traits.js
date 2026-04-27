// src/modules/modifiers/providers/traits.js
// Purpose: Contributes quality-backed trait roll modifiers through the shared provider pipeline.
// How it fits: Keeps trait roll effects inspectable and resolved from declarative item data.

import { evaluateTraitPhase, buildRollTraitFacts } from "../../mwd/traits.js";

function uniqueActors(...actors) {
  const seen = new Set();
  return actors.filter(actor => {
    if (!actor) return false;
    const key = actor.uuid ?? actor.id ?? actor;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export class TraitModifiersProvider {
  id = "mwd.traits";
  label = "Traits";

  collect({ actor, rollActor, resolved, payload } = {}) {
    return uniqueActors(rollActor, actor).flatMap(sourceActor => {
      const runtime = {
        snapshot: game.mwd?.personalCombat?.getSnapshot?.(sourceActor) ?? null,
      };

      return evaluateTraitPhase({
        actor: sourceActor,
        phase: "onBuildRoll",
        facts: buildRollTraitFacts({ actor: sourceActor, resolved, payload, runtime }),
        packet: {},
        options: { runtime, consumeUsage: false },
      }).modifiers;
    });
  }
}
