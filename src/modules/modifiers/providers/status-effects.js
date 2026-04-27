// src/modules/modifiers/providers/status-effects.js
// Purpose: Provides module-level utilities or helpers.
// How it fits: Describes role within src/modules or template rendering pipeline.


// modules/modifiers/providers/status-effects.js
import { STATUS_MAP } from "../../roll/config/status-modifiers.js"; 
import {
  getStatusConditionDefinition,
  isStatusConditionApplicableToActor,
} from "../../status/status-condition-catalog.js";

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

export class StatusEffectsProvider {
  id = "mwd.statusEffects";
  label = "Status Effects";

  collect({ actor, rollActor } = {}) {
    const mods = [];

    for (const sourceActor of uniqueActors(actor, rollActor)) {
      const statuses = sourceActor?.statuses;
      if (!statuses) continue;

      for (const statusId of statuses) {
        const statusEntry = getStatusConditionDefinition(statusId);
        const modifierKey = statusEntry
          ? (isStatusConditionApplicableToActor(statusEntry, sourceActor) ? statusEntry.modifierKey : "")
          : statusId;
        const def = STATUS_MAP?.[modifierKey];
        if (!def?.mods?.length) continue;

        for (const entry of def.mods) {
          const entryDomains = Array.isArray(entry.domains) ? entry.domains : [];
          const value = entry.value;

          // Emit one mod per domain tag (so central filtering works)
          if (entryDomains.length) {
            for (const domain of entryDomains) {
              mods.push({
                label: def.label ?? statusId,
                value,
                source: "Status",
                domain
              });
            }
          } else {
            mods.push({
              label: def.label ?? statusId,
              value,
              source: "Status"
            });
          }
        }
      }
    }

    return mods;
  }
}
