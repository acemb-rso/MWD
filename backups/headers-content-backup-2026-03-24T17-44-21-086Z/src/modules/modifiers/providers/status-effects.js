// src/modules/modifiers/providers/status-effects.js
// Purpose: System module or client script for status-effects. Integrates with the system's JavaScript modules.

// modules/modifiers/providers/status-effects.js
import { STATUS_MAP } from "../../roll/config/status-modifiers.js"; 

export class StatusEffectsProvider {
  id = "mwd.statusEffects";
  label = "Status Effects";

  collect({ actor } = {}) {
    const statuses = actor?.statuses;
    if (!actor || !statuses) return [];

    const mods = [];

    for (const statusId of statuses) {
      const def = STATUS_MAP?.[statusId];
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

    return mods;
  }
}
