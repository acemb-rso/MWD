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

  collect({ actor, rollActor, domains } = {}) {
    const mods = [];
    const rollDomains = Array.isArray(domains)
      ? domains.map(domain => String(domain ?? "").trim()).filter(Boolean)
      : [];

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
          const matchedDomain = entryDomains.find(domain => rollDomains.includes(domain)) ?? entryDomains[0] ?? "";
          if (rollDomains.length && entryDomains.length && !matchedDomain) continue;
          if (rollDomains.length && entryDomains.length && !entryDomains.some(domain => rollDomains.includes(domain))) continue;

          mods.push({
            label: def.label ?? statusId,
            value,
            source: "Status",
            ...(matchedDomain ? { domain: matchedDomain } : {}),
          });
        }
      }
    }

    return mods;
  }
}
