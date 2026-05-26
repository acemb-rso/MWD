// src/modules/modifiers/providers/life-modules.js
// Purpose: Contributes active life module bonuses through the shared modifier pipeline.
// How it fits: Keeps life module roll effects inspectable and resolved at execution time.

import { collectLifeModuleSkillRollModifiers } from "../../mwd/life-modules.js";

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

export class LifeModuleModifiersProvider {
  id = "mwd.lifeModules";
  label = "Life Modules";

  collect({ actor, rollActor, resolved } = {}) {
    return uniqueActors(rollActor, actor)
      .flatMap(sourceActor => collectLifeModuleSkillRollModifiers({ actor: sourceActor, resolved }));
  }
}
