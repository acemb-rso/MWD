// src/modules/modifiers/providers/status-effects.js
// Purpose: Emits roll modifiers from active catalog-backed actor statuses.
// Workflow: modifier collection -> actor and roll-actor statuses are matched
// against the status catalog -> applicable status dice modifiers join the roll.


// modules/modifiers/providers/status-effects.js
import { collectStatusRollModifiers } from "../../status/status-mechanics.js";

export class StatusEffectsProvider {
  id = "mwd.statusEffects";
  label = "Status Effects";

  collect({ actor, rollActor, domains } = {}) {
    const mods = [];
    for (const entry of collectStatusRollModifiers(actor, { rollActor, domains })) {
      mods.push({
        id: entry.id,
        label: entry.sourceStatusLabel ?? entry.statusId ?? "Status",
        value: Number(entry.value ?? 0),
        source: "Status",
        statusId: entry.statusId,
        mechanicId: entry.mechanicId,
        sourceChannel: entry.sourceChannel,
        ...(entry.domain ? { domain: entry.domain } : {}),
      });
    }

    return mods;
  }
}
